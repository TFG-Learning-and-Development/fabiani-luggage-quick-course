import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { course, questions, cases, conversation } from '../src/content/course';
import { config } from '../src/config';

const start = async (page: Page) => {
  await page.goto('./');
  await expect(page.locator('[data-assessment]')).toHaveAttribute('data-enhanced', 'true');
  await expect(page.locator('[data-benefits]')).toHaveAttribute('data-enhanced', 'true');
};
const answer = async (page: Page, index: number, option: number) => {
  await page.locator(`[data-question="${index}"] .answer-option`).nth(option).click();
};
const overflowingElements = async (page: Page) => page.evaluate(() => [...document.querySelectorAll<HTMLElement>('body *')].filter(element => {
  const box = element.getBoundingClientRect();
  return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1) && getComputedStyle(element).position !== 'fixed';
}).map(element => `${element.tagName}.${element.className}`));
const suppliedFeedback = [
  {
    correct: 'Correct. A two-night business trip needs a refined, easy-to-move case for essentials. The cabin case supports organised packing and a polished Fabiani look.',
    incorrect: 'Incorrect. Review the Customer’s journey. The trip is short, so the Customer needs a compact, organised and easy-to-move case.',
  },
  {
    correct: 'Correct. The Customer needs space and organisation for formalwear, casualwear and footwear. The recommendation should support the occasion and help protect the Customer’s wardrobe.',
    incorrect: 'Incorrect. Review what the Customer needs to pack. The recommendation should not focus only on size or price. It should support wardrobe protection, space and organisation for the occasion.',
  },
  {
    correct: 'Correct. Easy mobility is the strongest first focus because the Customer needs practical support while moving between airports, hotels and city meetings. You can also connect the TSA-approved lock to secure travel where applicable, and the USB port to keeping a device charged using the Customer’s own power bank.',
    incorrect: 'Incorrect. Review the Customer’s main needs. The scenario focuses on movement, safe storage and staying connected while travelling, not extra space, occasionwear protection or buying more than one case.',
  },
];

test('all supplied instructional content and local assets render', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await start(page);
  for (const paragraph of course.overview.paragraphs) await expect(page.getByText(paragraph, { exact: true })).toBeVisible();
  for (const row of course.features.rows) await expect(page.locator(`[data-connection-slot="${row.id}"]`).getByText(row.feature, { exact: true })).toBeVisible();
  for (const step of course.selling.steps) {
    await expect(page.getByText(step.action, { exact: true })).toBeVisible();
    await expect(page.getByText(step.benefit, { exact: true })).toBeVisible();
  }
  const keyMessage = page.getByRole('heading', { name: 'Key message:' }).locator('..');
  const customerExample = page.locator('.customer-discovery');
  const keyMessageTop = await keyMessage.evaluate(element => element.getBoundingClientRect().top);
  const customerExampleTop = await customerExample.evaluate(element => element.getBoundingClientRect().top);
  const journeyFlowTop = await page.locator('.travel-flow').evaluate(element => element.getBoundingClientRect().top);
  expect(journeyFlowTop).toBeLessThan(keyMessageTop);
  expect(keyMessageTop).toBeLessThan(customerExampleTop);
  await expect(keyMessage).toContainText(course.travel.keyMessage);
  await expect(keyMessage).not.toContainText(course.travel.askIntroduction);
  await expect(customerExample).toContainText(course.travel.askIntroduction);
  await expect(page.getByText(course.range.instruction, { exact: true })).toBeVisible();
  await expect(page.getByText(course.conversation.instruction, { exact: true })).toBeVisible();
  await expect(page.getByText('I’m looking for a case that will work for my next trip and I want it to fit in with what I’m wearing.', { exact: true })).toHaveCount(0);
  await expect(page.getByText(course.range.warning, { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to People Connect to continue' })).toHaveCount(0);
  await expect(page.locator('.return-label')).toHaveText('Return to People Connect to continue');
  const images = await page.locator('img').evaluateAll(async elements => {
    const images = elements as HTMLImageElement[];
    await Promise.all(images.map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); }));
    return images.map(image => ({ src: image.src, good: image.naturalWidth > 0, width: image.getAttribute('width'), height: image.getAttribute('height') }));
  });
  expect(images.every(image => image.good && image.width && image.height)).toBe(true);
  expect(images.every(image => new URL(image.src).origin === new URL(page.url()).origin)).toBe(true);
  expect(errors).toEqual([]);
});

test('all four product tabs and keyboard boundaries work', async ({ page }) => {
  await start(page);
  const tabs = page.getByRole('tab');
  for (let i = 0; i < cases.length; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(page.getByText(cases[i].story, { exact: true })).toBeVisible();
  }
  await tabs.last().press('Home');
  await expect(tabs.first()).toBeFocused();
  await tabs.first().press('ArrowDown');
  await expect(tabs.nth(1)).toBeFocused();
  await tabs.nth(1).press('End');
  await expect(tabs.last()).toBeFocused();
  await tabs.last().press('ArrowDown');
  await expect(tabs.first()).toBeFocused();
});

test('customer connection activity supports ordering and editable feedback', async ({ page }) => {
  await start(page);
  const activity = page.locator('[data-benefits]');
  const slots = activity.locator('[data-connection-slot]');
  const check = activity.getByRole('button', { name: 'Check matches', exact: true });
  const usbCard = activity.locator('[data-connection-card="usb-port"]');
  await usbCard.getByRole('button', { name: /Move customer connection .* up/ }).click();
  const usbBox = await usbCard.boundingBox();
  const functionalBox = await activity.locator('[data-connection-slot="lightweight"] .functional-cell').boundingBox();
  expect(usbBox!.x).toBeGreaterThan(functionalBox!.x + functionalBox!.width);
  await activity.getByRole('button', { name: 'Reset', exact: true }).click();

  await page.setViewportSize({ width: 320, height: 740 });
  await check.click();
  await expect(activity.locator('[data-benefits-feedback]')).toHaveText(`You have 0 of ${course.features.rows.length} correct Customer connections. Review the highlighted cards and try again.`);
  await expect(activity.locator('[data-connection-slot][data-outcome="incorrect"]')).toHaveCount(course.features.rows.length);
  await expect(activity.locator('[data-connection-slot][data-outcome="incorrect"] .connection-card').first()).toHaveCSS('background-color', 'rgb(249, 238, 238)');

  for (const row of course.features.rows) {
    const card = activity.locator(`[data-connection-card="${row.id}"]`);
    while (await card.locator('xpath=ancestor::li[@data-connection-slot]').getAttribute('data-connection-slot') !== row.id) {
      await card.getByRole('button', { name: /Move customer connection .* up/ }).dispatchEvent('click');
    }
  }
  await check.click();
  await expect(activity.locator('[data-benefits-feedback]')).toHaveText('Correct. You have aligned every Customer connection with its feature and functional benefit.');
  await expect(activity.locator('[data-connection-slot][data-outcome="correct"]')).toHaveCount(course.features.rows.length);
  expect(await overflowingElements(page)).toEqual([]);
  await activity.screenshot({ path: 'test-results/mobile-benefits-reordered.png' });

  await activity.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(slots.first().locator('[data-connection-card]')).toHaveAttribute('data-connection-card', 'luggage-tag');
  await expect(activity.locator('[data-benefits-feedback]')).toBeHidden();
});

test('conversation preserves supplied exchange and traverses all four steps', async ({ page }) => {
  await start(page);
  const previous = page.getByRole('button', { name: 'Previous conversation step' });
  const next = page.getByRole('button', { name: 'Next conversation step' });
  await expect(previous).toBeDisabled();
  for (let i = 0; i < conversation.length; i++) {
    await expect(page.locator('[data-conversation-count]')).toHaveText(`${i + 1} of ${conversation.length}`);
    for (const turn of conversation[i].turns) {
      await expect(page.locator(`[data-conversation-step="${i}"]`)).toContainText(turn.text);
    }
    if (i < conversation.length - 1) await next.click();
  }
  await expect(next).toBeDisabled();
  for (let i = 0; i < conversation.length - 1; i++) await previous.click();
  await expect(previous).toBeDisabled();
  await expect(page.locator('[data-conversation-count]')).toHaveText(`1 of ${conversation.length}`);
});

for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
  for (let choice = 0; choice < 4; choice++) {
    test(`question ${questionIndex + 1}, option ${String.fromCharCode(65 + choice)}: exact feedback and editable response`, async ({ page }) => {
      await start(page);
      for (let index = 0; index < questionIndex; index++) await page.getByRole('button', { name: 'Next question', exact: true }).click();
      await answer(page, questionIndex, choice);
      const correct = choice === questions[questionIndex].correct;
      const feedback = page.locator(`[data-feedback="${questionIndex}"]`);
      await expect(feedback).toHaveText(correct ? suppliedFeedback[questionIndex].correct : suppliedFeedback[questionIndex].incorrect);
      await expect(feedback).toHaveAttribute('data-outcome', correct ? 'correct' : 'incorrect');
      await expect(page.locator(`[data-question="${questionIndex}"] [data-correct]`)).toHaveCount(correct ? 1 : 0);
      await expect(page.locator(`[data-question="${questionIndex}"] [data-incorrect]`)).toHaveCount(correct ? 0 : 1);
      for (const input of await page.locator(`[data-question="${questionIndex}"] input`).all()) await expect(input).toBeEnabled();

      const replacement = correct ? (choice + 1) % questions[questionIndex].answers.length : questions[questionIndex].correct;
      await answer(page, questionIndex, replacement);
      const replacementCorrect = replacement === questions[questionIndex].correct;
      await expect(feedback).toHaveText(replacementCorrect ? suppliedFeedback[questionIndex].correct : suppliedFeedback[questionIndex].incorrect);
      await expect(feedback).toHaveAttribute('data-outcome', replacementCorrect ? 'correct' : 'incorrect');
      await expect(page.locator(`[data-question="${questionIndex}"] [data-correct]`)).toHaveCount(replacementCorrect ? 1 : 0);
      await expect(page.locator(`[data-question="${questionIndex}"] [data-incorrect]`)).toHaveCount(replacementCorrect ? 0 : 1);
      for (const input of await page.locator(`[data-question="${questionIndex}"] input`).all()) await expect(input).toBeEnabled();
      await expect(page.getByRole('button', { name: 'Check answer', exact: true })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'View results', exact: true })).toHaveCount(0);
    });
  }
}

test('assessment restores editable answers and never opens a results screen', async ({ page }) => {
  await start(page);
  await expect(page.getByRole('button', { name: 'Previous question', exact: true })).toBeDisabled();
  await answer(page, 0, 0);
  await expect(page.locator('[data-feedback="0"]')).toHaveText(suppliedFeedback[0].incorrect);
  await expect(page.locator('[data-feedback="0"]')).toHaveCSS('background-color', 'rgb(149, 58, 52)');
  await answer(page, 0, questions[0].correct);
  await expect(page.locator('[data-feedback="0"]')).toHaveText(suppliedFeedback[0].correct);
  await expect(page.locator('[data-feedback="0"]')).toHaveCSS('background-color', 'rgb(34, 98, 68)');
  await page.getByRole('button', { name: 'Next question', exact: true }).click();
  await answer(page, 1, questions[1].correct);
  await page.reload();
  await expect(page.locator('[data-question-count]')).toHaveText(`Question 2 of ${questions.length}`);
  await expect(page.locator('[data-question="1"] input').nth(questions[1].correct)).toBeChecked();
  for (const input of await page.locator('[data-question="1"] input').all()) await expect(input).toBeEnabled();
  await answer(page, 1, 0);
  await expect(page.locator('[data-feedback="1"]')).toHaveText(suppliedFeedback[1].incorrect);
  await page.getByRole('button', { name: 'Previous question', exact: true }).click();
  await expect(page.locator('[data-question="0"] input').nth(questions[0].correct)).toBeChecked();
  for (const input of await page.locator('[data-question="0"] input').all()) await expect(input).toBeEnabled();
  await expect(page.locator('[data-results], [data-completed-actions], [data-view-results]')).toHaveCount(0);
});

for (const invalid of ['{bad json', 'null', '{"version":99}', JSON.stringify({ version: config.storageVersion, lastSection: 'assessment', questionIndex: 0, responses: [{ selected: 55 }] })]) {
  test(`invalid storage recovers: ${invalid.slice(0, 30)}`, async ({ page }) => {
    await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), { key: config.storageKey, value: invalid });
    await start(page);
    await expect(page.locator('[data-question-count]')).toHaveText(`Question 1 of ${questions.length}`);
    await answer(page, 0, 2);
    await expect(page.locator('[data-feedback="0"]')).toContainText('Correct');
  });
}

test('unavailable storage still permits assessment', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Unavailable', 'SecurityError'); } }));
  await start(page);
  await answer(page, 0, 2);
  await expect(page.locator('[data-feedback="0"]')).toContainText('Correct');
});

test('active navigation and last section restore independently of completion', async ({ page }) => {
  await start(page);
  await page.getByRole('link', { name: 'Product Basics', exact: true }).click();
  await expect(page.locator('[data-nav="product-basics"]')).toHaveAttribute('aria-current', 'location');
  await page.locator('#conversation').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelector('#conversation')!.scrollIntoView({ block: 'start' }));
  await expect(page.locator('[data-nav="how-to-sell"]')).toHaveAttribute('aria-current', 'location');
  await page.waitForFunction(key => JSON.parse(localStorage.getItem(key) || '{}').lastSection === 'conversation', config.storageKey);
  await page.reload();
  await expect(page.locator('[data-nav="how-to-sell"]')).toHaveAttribute('aria-current', 'location');
  const top = await page.locator('#conversation').evaluate(element => element.getBoundingClientRect().top);
  expect(top).toBeGreaterThan(90);
  expect(top).toBeLessThan(230);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect(page.locator('[data-nav="overview"]')).toHaveAttribute('aria-current', 'location');
  await page.waitForFunction(key => JSON.parse(localStorage.getItem(key) || '{}').lastSection === 'overview', config.storageKey);
  await page.reload();
  await expect(page.locator('[data-nav="overview"]')).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('[data-reading], [data-assessment-link]')).toHaveCount(0);
});

for (const viewport of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
  test(`responsive layout and screenshot ${viewport.width}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await start(page);
    await page.locator('img').evaluateAll(async elements => { await Promise.all((elements as HTMLImageElement[]).map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); })); });
    await expect(page.locator('.site-header')).toBeVisible();
    if (viewport.width <= 800) {
      const toggle = page.locator('[data-nav-toggle]');
      await expect(toggle).toBeVisible();
      await expect(toggle).toHaveAccessibleName('Open course navigation');
      await expect(page.locator('#course-navigation')).toBeHidden();
      await toggle.click();
      await expect(page.locator('#course-navigation')).toBeVisible();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(toggle).toHaveAccessibleName('Close course navigation');
      await page.keyboard.press('Escape');
      await expect(page.locator('#course-navigation')).toBeHidden();
      await expect(toggle).toBeFocused();
    }
    expect(await overflowingElements(page)).toEqual([]);
    await page.screenshot({ path: `test-results/course-${viewport.width}.png`, fullPage: true });
    await page.screenshot({ path: `test-results/first-viewport-${viewport.width}.png` });
    for (const tab of await page.getByRole('tab').all()) await tab.click();
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    if (viewport.width === 390 || viewport.width === 1440) {
      const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(scan.violations).toEqual([]);
    }
  });
}

test('no-JavaScript fallback exposes all teaching, panels, exchanges and questions', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.COURSE_TEST_URL || 'http://127.0.0.1:4321');
  await expect(page.locator('[data-case]:visible')).toHaveCount(4);
  await expect(page.locator('[data-conversation-step]:visible')).toHaveCount(4);
  await expect(page.locator('[data-question]:visible')).toHaveCount(questions.length);
  await expect(page.locator('.benefits-reference article')).toHaveCount(course.features.rows.length);
  await expect(page.getByText('Answer discussion', { exact: true })).toHaveCount(questions.length);
  await expect(page.locator('.range-selectors')).toBeHidden();
  await expect(page.locator('.assessment-controls')).toBeHidden();
  await context.close();
});

test('keyboard focus, reduced motion and answered assessment accessibility', async ({ page }) => {
  await start(page);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to course content' })).toBeFocused();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  const option = page.locator('[data-question="0"] input').nth(questions[0].correct);
  await option.focus();
  await option.press('Space');
  await expect(option).toBeChecked();
  await expect(option).toBeFocused();
  await expect(page.locator('[data-feedback="0"]')).toHaveAttribute('data-outcome', 'correct');
  const scan = await new AxeBuilder({ page }).include('#assessment').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
});

test('long mobile states stay within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await start(page);
  for (const tab of await page.getByRole('tab').all()) {
    await tab.click();
    const overflow = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('body *')].filter(element => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1) && getComputedStyle(element).position !== 'fixed';
    }).map(element => `${element.tagName}.${element.className}`));
    expect(overflow).toEqual([]);
  }
  await page.locator('#product-range').screenshot({ path: 'test-results/mobile-range.png' });
  await page.locator('#product-basics').screenshot({ path: 'test-results/mobile-benefits.png' });
  for (let index = 0; index < conversation.length; index++) {
    const bounds = await page.locator(`[data-conversation-step="${index}"]`).boundingBox();
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    if (index === conversation.length - 1) {
      await page.locator('#conversation').evaluate(element => element.scrollIntoView({ block: 'start' }));
      await page.screenshot({ path: 'test-results/mobile-conversation-4-viewport.png' });
      await page.locator('[data-conversation]').screenshot({ path: 'test-results/mobile-conversation-4.png', style: '.site-header, .skip-link { visibility: hidden !important; }' });
    }
    if (index < conversation.length - 1) await page.getByRole('button', { name: 'Next conversation step' }).click();
  }
  for (let index = 0; index < questions.length; index++) {
    await answer(page, index, (questions[index].correct + 1) % questions[index].answers.length);
    expect(await overflowingElements(page)).toEqual([]);
    if (index === 0) {
      await expect(page.locator('[data-feedback="0"]')).toHaveAttribute('data-outcome', 'incorrect');
      const feedback = (await page.locator('[data-feedback="0"]').boundingBox())!;
      const header = (await page.locator('.site-header').boundingBox())!;
      expect(feedback.y).toBeGreaterThanOrEqual(header.y + header.height);
      expect(feedback.y + feedback.height).toBeLessThan(740);
      await page.screenshot({ path: 'test-results/mobile-feedback-viewport.png' });
      await page.locator('[data-assessment]').screenshot({ path: 'test-results/mobile-feedback.png', style: '.site-header, .skip-link { visibility: hidden !important; }' });
    }
    if (index < questions.length - 1) await page.getByRole('button', { name: 'Next question', exact: true }).click();
  }
  await expect(page.getByRole('button', { name: 'View results', exact: true })).toHaveCount(0);
  const scan = await new AxeBuilder({ page }).include('#assessment').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(scan.violations).toEqual([]);
});
