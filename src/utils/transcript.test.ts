import { describe, it, expect } from 'vitest';
import { mergeTranscript } from './transcript';
import { parseSpeechCommand } from './speechParser';

describe('mergeTranscript', () => {
  it('keeps the extended take when the engine re-delivers a growing prefix', () => {
    // The exact sequence behind «три пакета с маршмеллоу» turning into four rows.
    const fragments = ['три', 'три', 'три пакета', 'три пакета с', 'три пакета с маршмеллоу'];
    expect(fragments.reduce(mergeTranscript, '')).toBe('три пакета с маршмеллоу');
  });

  it('drops a plain re-delivery of the same phrase', () => {
    expect(mergeTranscript('молоко и хлеб', 'молоко и хлеб')).toBe('молоко и хлеб');
  });

  it('ignores case and trailing punctuation when comparing', () => {
    expect(mergeTranscript('добавь молоко', 'Добавь молоко, и хлеб')).toBe('Добавь молоко, и хлеб');
  });

  it('joins an overlapping tail without repeating it', () => {
    expect(mergeTranscript('три пакета', 'пакета с маршмеллоу')).toBe('три пакета с маршмеллоу');
  });

  it('appends genuinely new speech', () => {
    expect(mergeTranscript('молоко', 'и хлеб')).toBe('молоко и хлеб');
  });

  it('normalizes whitespace and survives empty fragments', () => {
    expect(mergeTranscript('', '  молоко  ')).toBe('молоко');
    expect(mergeTranscript('молоко', '   ')).toBe('молоко');
  });

  it('a re-delivered utterance still parses to a single item', () => {
    const text = ['три', 'три пакета', 'три пакета с маршмеллоу'].reduce(mergeTranscript, '');
    const command = parseSpeechCommand(text);
    expect(command).toEqual({ type: 'add', items: [{ name: 'пакета с маршмеллоу', count: 3 }] });
  });
});
