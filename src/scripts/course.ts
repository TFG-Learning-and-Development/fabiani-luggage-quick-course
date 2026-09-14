import { questions } from '../content/course';
import { sections } from '../config';
import { freshProgress, readProgress, saveProgress } from './progress';

const get = <T extends HTMLElement = HTMLElement>(selector: string, parent: ParentNode = document): T => {
  const element = parent.querySelector<T>(selector);
  if (!element) throw new Error(`Missing course element: ${selector}`);
  return element;
};
const all = <T extends HTMLElement = HTMLElement>(selector: string, parent: ParentNode = document) => Array.from(parent.querySelectorAll<T>(selector));
let progress = readProgress();
const persist = () => saveProgress(progress);

function initRange() {
  const root = get('[data-range]');
  const tablist = get('[data-tablist]', root);
  const tabs = all<HTMLButtonElement>('[data-tab]', root);
  const panels = all('[data-case]', root);
  tablist.setAttribute('role', 'tablist');
  tabs.forEach(tab => tab.setAttribute('role', 'tab'));
  panels.forEach((panel, index) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[index].id);
    panel.tabIndex = 0;
  });
  const stacked = matchMedia('(min-width: 801px)');
  const orient = () => tablist.setAttribute('aria-orientation', stacked.matches ? 'vertical' : 'horizontal');
  orient();
  stacked.addEventListener('change', orient);
  const select = (index: number, focus = false) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const forward = stacked.matches ? 'ArrowDown' : 'ArrowRight';
      const backward = stacked.matches ? 'ArrowUp' : 'ArrowLeft';
      let next: number;
      if (event.key === forward) next = (index + 1) % tabs.length;
      else if (event.key === backward) next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next, true);
    });
  });
  select(0);
  root.dataset.enhanced = 'true';
}

function initConversation() {
  const root = get('[data-conversation]');
  const steps = all('[data-conversation-step]', root);
  const previous = get<HTMLButtonElement>('[data-conversation-previous]', root);
  const next = get<HTMLButtonElement>('[data-conversation-next]', root);
  const content = get('.conversation-content', root);
  let index = 0;
  const render = () => {
    steps.forEach((step, i) => { step.hidden = i !== index; });
    get('[data-conversation-count]', root).textContent = `${index + 1} of ${steps.length}`;
    previous.disabled = index === 0;
    next.disabled = index === steps.length - 1;
  };
  previous.addEventListener('click', () => { if (index > 0) { index--; render(); if (previous.disabled) next.focus(); } });
  next.addEventListener('click', () => { if (index < steps.length - 1) { index++; render(); if (next.disabled) previous.focus(); } });
  render();
  root.dataset.enhanced = 'true';
  get('.conversation-controls', root).hidden = false;
  let measuredWidth = 0;
  const measure = () => {
    if (content.clientWidth === measuredWidth) return;
    measuredWidth = content.clientWidth;
    let tallest = 0;
    steps.forEach(step => {
      const wasHidden = step.hidden;
      step.hidden = false;
      tallest = Math.max(tallest, step.getBoundingClientRect().height);
      step.hidden = wasHidden;
    });
    content.style.minHeight = `${Math.ceil(tallest) + 24}px`;
  };
  measure();
  new ResizeObserver(measure).observe(content);
}

function initAssessment() {
  const root = get('[data-assessment]');
  const form = get<HTMLFormElement>('[data-quiz-form]', root);
  const panels = all('[data-question]', root);
  const check = get<HTMLButtonElement>('[data-check]', root);
  const previous = get<HTMLButtonElement>('[data-question-previous]', root);
  const next = get<HTMLButtonElement>('[data-question-next]', root);
  const results = get('[data-results]', root);
  const isComplete = () => progress.responses.every(response => response.submitted);
  const render = (focus = false) => {
    const completed = isComplete();
    const score = progress.responses.filter((response, index) => response.submitted && response.selected === questions[index].correct).length;
    const showResults = completed && progress.showResults;
    form.hidden = showResults;
    results.hidden = !showResults;
    get('[data-completed-actions]', root).hidden = !completed || showResults;
    panels.forEach((panel, index) => {
      panel.hidden = index !== progress.questionIndex;
      const response = progress.responses[index];
      const question = questions[index];
      get<HTMLFieldSetElement>('fieldset', panel).disabled = response.submitted;
      all<HTMLInputElement>('input', panel).forEach((input, answerIndex) => {
        input.checked = response.selected === answerIndex;
        const label = input.closest('label')!;
        label.removeAttribute('data-correct');
        label.removeAttribute('data-incorrect');
        if (response.submitted && answerIndex === question.correct) label.dataset.correct = 'true';
        if (response.submitted && answerIndex === response.selected && answerIndex !== question.correct) label.dataset.incorrect = 'true';
      });
      const feedback = get('[data-feedback]', panel);
      feedback.hidden = !response.submitted;
      if (response.submitted && response.selected !== null) {
        get('[data-feedback-title]', feedback).textContent = response.selected === question.correct ? 'Correct' : 'Consider this';
        get('[data-feedback-text]', feedback).textContent = question.answers[response.selected].feedback;
      }
    });
    const current = progress.responses[progress.questionIndex];
    check.disabled = current.selected === null || current.submitted;
    get('span', check).textContent = current.submitted ? 'Answer checked' : 'Check answer';
    previous.disabled = progress.questionIndex === 0;
    next.disabled = progress.questionIndex === questions.length - 1;
    get('[data-question-count]', root).textContent = `Question ${progress.questionIndex + 1} of ${questions.length}`;
    if (completed) {
      get('[data-score]', root).textContent = `${score} / ${questions.length} correct`;
      all('[data-review]', root).forEach((item, index) => {
        const question = questions[index];
        const selected = progress.responses[index].selected!;
        const correct = selected === question.correct;
        get('[data-review-outcome]', item).textContent = correct ? 'Correct' : 'Incorrect';
        get('[data-review-answer]', item).textContent = `${String.fromCharCode(65 + selected)}. ${question.answers[selected].text}`;
        get('[data-review-correct]', item).textContent = correct ? '' : `Recommended answer: ${String.fromCharCode(65 + question.correct)}. ${question.answers[question.correct].text}`;
        get('[data-review-feedback]', item).textContent = question.answers[selected].feedback;
      });
    }
    if (focus) (showResults ? get('[data-results-heading]', root) : get('h3', panels[progress.questionIndex])).focus({ preventScroll: true });
  };
  panels.forEach((panel, index) => {
    panel.addEventListener('change', event => {
      if (!(event.target instanceof HTMLInputElement) || progress.responses[index].submitted) return;
      progress.responses[index].selected = Number(event.target.value);
      persist();
      render();
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const response = progress.responses[progress.questionIndex];
    if (response.selected === null || response.submitted) return;
    response.submitted = true;
    progress.showResults = isComplete();
    persist();
    render(progress.showResults);
    if (progress.showResults) results.scrollIntoView({ block: 'start' });
    else {
      const feedback = get('[data-feedback]', panels[progress.questionIndex]);
      feedback.focus({ preventScroll: true });
      feedback.scrollIntoView({ block: 'start' });
    }
  });
  const move = (delta: number) => {
    const index = progress.questionIndex + delta;
    if (index < 0 || index >= questions.length) return;
    progress.questionIndex = index;
    persist();
    render(true);
    panels[index].scrollIntoView({ block: 'start' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  get('[data-retry]', root).addEventListener('click', () => {
    progress = { ...freshProgress(), lastSection: 'assessment' };
    persist();
    render(true);
    panels[0].scrollIntoView({ block: 'start' });
  });
  get('[data-view-results]', root).addEventListener('click', () => {
    progress.showResults = true; persist(); render(true); results.scrollIntoView({ block: 'start' });
  });
  get('[data-review-questions]', root).addEventListener('click', () => {
    progress.showResults = false; progress.questionIndex = 0; persist(); render(true); panels[0].scrollIntoView({ block: 'start' });
  });
  render();
  root.dataset.enhanced = 'true';
  get('.assessment-controls', root).hidden = false;
}

function initNavigation() {
  const header = get('.site-header');
  const navigation = get<HTMLElement>('#course-navigation', header);
  const toggle = get<HTMLButtonElement>('[data-nav-toggle]', header);
  const nodes = sections.map(section => get(`#${section.id}`));
  const links = all<HTMLAnchorElement>('[data-nav]');
  const savedSection = progress.lastSection;
  const explicitHash = location.hash;
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const restoring = !explicitHash || navigationEntry?.type === 'reload';
  const setMenuOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close course navigation' : 'Open course navigation');
    toggle.title = open ? 'Close course navigation' : 'Open course navigation';
    navigation.toggleAttribute('data-open', open);
    if (returnFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenuOpen(false, true);
  });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) setMenuOpen(false); });
  header.dataset.navEnhanced = 'true';
  const update = () => {
    const offset = header.getBoundingClientRect().height + 70;
    let index = 0;
    nodes.forEach((node, i) => { if (node.getBoundingClientRect().top <= offset) index = i; });
    const current = sections[index];
    links.forEach(link => {
      if (link.dataset.nav === current.nav) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (progress.lastSection !== current.id) { progress.lastSection = current.id; persist(); }
  };
  const setOffset = () => document.documentElement.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height) + 16}px`);
  new ResizeObserver(setOffset).observe(header);
  setOffset();
  // A fresh deep link wins; a reload resumes the most recently read section.
  requestAnimationFrame(() => {
    if (restoring) {
      if (savedSection === 'overview') scrollTo({ top: 0, behavior: 'instant' });
      else get(`#${savedSection}`).scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    update();
    let scheduled = false;
    addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { update(); scheduled = false; });
    }, { passive: true });
    addEventListener('resize', update);
  });
  // A section link remains shareable; persisted reading position takes over on reload.
  links.forEach(link => link.addEventListener('click', () => {
    const id = link.hash.slice(1);
    if (sections.some(section => section.id === id)) { progress.lastSection = id; persist(); }
    setMenuOpen(false);
  }));
}

initRange();
initConversation();
initAssessment();
initNavigation();
