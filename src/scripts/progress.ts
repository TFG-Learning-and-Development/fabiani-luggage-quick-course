import { config, sections } from '../config';
import { questions } from '../content/course';

export interface ResponseState { selected: number | null }
export interface Progress {
  version: number;
  lastSection: string;
  questionIndex: number;
  responses: ResponseState[];
}

export function freshProgress(): Progress {
  return {
    version: config.storageVersion, lastSection: 'overview', questionIndex: 0,
    responses: questions.map(() => ({ selected: null })),
  };
}

export function readProgress(): Progress {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(config.storageKey) || 'null');
    if (!raw || typeof raw !== 'object') return freshProgress();
    const value = raw as Partial<Progress>;
    if (value.version !== config.storageVersion || !sections.some(section => section.id === value.lastSection)
      || !Number.isInteger(value.questionIndex) || value.questionIndex! < 0 || value.questionIndex! >= questions.length
      || !Array.isArray(value.responses) || value.responses.length !== questions.length) return freshProgress();
    for (const [index, response] of value.responses.entries()) {
      if (!response || !(response.selected === null || (Number.isInteger(response.selected)
        && response.selected >= 0 && response.selected < questions[index].answers.length))) return freshProgress();
    }
    return value as Progress;
  } catch {
    return freshProgress();
  }
}

export function saveProgress(progress: Progress): void {
  try { localStorage.setItem(config.storageKey, JSON.stringify(progress)); } catch { /* Browsing and assessment remain available without storage. */ }
}
