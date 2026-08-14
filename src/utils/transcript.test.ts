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

  it('takes a re-delivery that only changed the ending as the same phrase', () => {
    // «молоко 5» came back as «молока 5» after the engine restarted mid-phrase,
    // and the list gained a second row for the same thing.
    expect(mergeTranscript('молоко', 'молока 5')).toBe('молока 5');
    expect(mergeTranscript('хлеб', 'хлеба два')).toBe('хлеба два');
  });

  it('keeps genuinely different words apart', () => {
    expect(mergeTranscript('молоко', 'молоток')).toBe('молоко молоток');
    expect(mergeTranscript('сок', 'сыр')).toBe('сок сыр');
    expect(mergeTranscript('чай', 'чайник')).toBe('чай чайник');
  });

  it('«молоко 5» ends up as one item with a count, not two rows', () => {
    const text = ['молоко', 'молока 5'].reduce(mergeTranscript, '');
    expect(parseSpeechCommand(text)).toEqual({
      type: 'add',
      items: [{ name: 'молока', count: 5 }],
    });
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
