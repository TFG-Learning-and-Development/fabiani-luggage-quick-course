import { config, sections } from '../config';
import { questions } from '../content/course';

export interface ResponseState { selected: number | null; submitted: boolean }
export interface Progress {
  version: number;
  lastSection: string;
  questionIndex: number;
  responses: ResponseState[];
  showResults: boolean;
}

export function freshProgress(): Progress {
  return {
    version: config.storageVersion, lastSection: 'overview', questionIndex: 0,
    responses: questions.map(() => ({ selected: null, submitted: false })), showResults: false,
  };
}

export function readProgress(): Progress {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(config.storageKey) || 'null');
    if (!raw || typeof raw !== 'object') return freshProgress();
    const value = raw as Partial<Progress>;
    if (value.version !== config.storageVersion || !sections.some(section => section.id === value.lastSection)
      || !Number.isInteger(value.questionIndex) || value.questionIndex! < 0 || value.questionIndex! >= questions.length
      || typeof value.showResults !== 'boolean' || !Array.isArray(value.responses) || value.responses.length !== questions.length) return freshProgress();
    for (const [index, response] of value.responses.entries()) {
      if (!response || typeof response.submitted !== 'boolean'
        || !(response.selected === null || (Number.isInteger(response.selected) && response.selected >= 0 && response.selected < questions[index].answers.length))
        || (response.submitted && response.selected === null)) return freshProgress();
    }
    if (value.showResults && !value.responses.every(response => response.submitted)) return freshProgress();
    return value as Progress;
  } catch {
    return freshProgress();
  }
}

export function saveProgress(progress: Progress): void {
  try { localStorage.setItem(config.storageKey, JSON.stringify(progress)); } catch { /* Browsing and assessment remain available without storage. */ }
}
