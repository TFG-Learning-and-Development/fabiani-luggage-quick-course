import { questions } from '../content/course';
import { sections } from '../config';
import { readProgress, saveProgress } from './progress';

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

function initBenefits() {
  const root = get('[data-benefits]');
  const activity = get<HTMLElement>('[data-benefits-activity]', root);
  const slots = all<HTMLElement>('[data-connection-slot]', root);
  const reset = get<HTMLButtonElement>('[data-benefits-reset]', root);
  const feedback = get<HTMLElement>('[data-benefits-feedback]', root);
  const cards = () => all<HTMLElement>('[data-connection-card]', root);
  const initialOptions = cards().map(card => card.dataset.connectionCard!);
  const optionsFor = (card: HTMLElement): { id: string; text: string }[] => JSON.parse(card.dataset.connectionOptions || '[]');
  const clearFeedback = () => {
    slots.forEach(slot => {
      slot.removeAttribute('data-outcome');
      get('[data-connection-status-label]', slot).textContent = '';
    });
    feedback.hidden = true;
    feedback.removeAttribute('data-outcome');
  };
  const updateMatches = () => {
    let matched = 0;
    slots.forEach(slot => {
      const card = get<HTMLElement>('[data-connection-card]', slot);
      const correct = card.dataset.connectionCard === slot.dataset.connectionSlot;
      slot.dataset.outcome = correct ? 'correct' : 'incorrect';
      get('[data-connection-status-label]', slot).textContent = correct ? 'Correct match' : 'Incorrect match';
      if (correct) matched++;
    });
    if (matched === slots.length) {
      feedback.hidden = false;
      feedback.dataset.outcome = 'correct';
      feedback.textContent = 'Correct. You have aligned every Customer connection with its feature and functional benefit.';
    } else {
      feedback.hidden = true;
      feedback.removeAttribute('data-outcome');
    }
  };
  const setOption = (card: HTMLElement, optionId: string) => {
    const option = optionsFor(card).find(item => item.id === optionId);
    if (!option) return;
    card.dataset.connectionCard = option.id;
    get<HTMLParagraphElement>('p', card).textContent = option.text;
  };
  const cycleOption = (card: HTMLElement, delta: number) => {
    const options = optionsFor(card);
    const index = options.findIndex(option => option.id === card.dataset.connectionCard);
    const nextIndex = (index + delta + options.length) % options.length;
    setOption(card, options[nextIndex].id);
    updateMatches();
  };
  cards().forEach(card => {
    get<HTMLButtonElement>('[data-option-previous]', card).addEventListener('click', () => cycleOption(card, -1));
    get<HTMLButtonElement>('[data-option-next]', card).addEventListener('click', () => cycleOption(card, 1));
  });
  reset.addEventListener('click', () => {
    cards().forEach((card, index) => setOption(card, initialOptions[index]));
    clearFeedback();
  });
  activity.hidden = false;
  root.dataset.enhanced = 'true';
}

function initConversation() {
  const root = get('[data-conversation]');
  const steps = all('[data-conversation-step]', root);
  const previous = get<HTMLButtonElement>('[data-conversation-previous]', root);
  const next = get<HTMLButtonElement>('[data-conversation-next]', root);
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
}

function initAssessment() {
  const root = get('[data-assessment]');
  const form = get<HTMLFormElement>('[data-quiz-form]', root);
  const panels = all('[data-question]', root);
  const previous = get<HTMLButtonElement>('[data-question-previous]', root);
  const next = get<HTMLButtonElement>('[data-question-next]', root);
  const render = (focus = false) => {
    form.hidden = false;
    panels.forEach((panel, index) => {
      panel.hidden = index !== progress.questionIndex;
      const response = progress.responses[index];
      const question = questions[index];
      all<HTMLInputElement>('input', panel).forEach((input, answerIndex) => {
        input.checked = response.selected === answerIndex;
        const label = input.closest('label')!;
        label.removeAttribute('data-correct');
        label.removeAttribute('data-incorrect');
        if (response.selected === answerIndex) {
          label.dataset[answerIndex === question.correct ? 'correct' : 'incorrect'] = 'true';
        }
      });
      const feedback = get('[data-feedback]', panel);
      feedback.hidden = response.selected === null;
      feedback.removeAttribute('data-outcome');
      if (response.selected !== null) {
        feedback.dataset.outcome = response.selected === question.correct ? 'correct' : 'incorrect';
        get('[data-feedback-text]', feedback).textContent = question.answers[response.selected].feedback;
      }
    });
    previous.disabled = progress.questionIndex === 0;
    next.disabled = progress.questionIndex === questions.length - 1;
    get('[data-question-count]', root).textContent = `Question ${progress.questionIndex + 1} of ${questions.length}`;
    if (focus) get('h3', panels[progress.questionIndex]).focus({ preventScroll: true });
  };
  panels.forEach((panel, index) => {
    panel.addEventListener('change', event => {
      if (!(event.target instanceof HTMLInputElement)) return;
      const response = progress.responses[index];
      response.selected = Number(event.target.value);
      persist();
      render();
      const feedback = get('[data-feedback]', panel);
      feedback.scrollIntoView({ block: 'start' });
    });
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
initBenefits();
initConversation();
initAssessment();
initNavigation();
