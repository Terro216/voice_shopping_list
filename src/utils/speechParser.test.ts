import { describe, it, expect } from 'vitest';
import { parseSpeechText, parseSpeechCommand, parseBulkText } from './speechParser';

describe('speechParser', () => {
  it('parses simple russian sentences with "и"', () => {
    expect(parseSpeechText('добавь хлеб и молоко')).toEqual([
      { name: 'хлеб', count: 1 },
      { name: 'молоко', count: 1 },
    ]);
  });

  it('strips trigger words in english', () => {
    expect(parseSpeechText('please add apples and bananas')).toEqual([
      { name: 'apples', count: 1 },
      { name: 'bananas', count: 1 },
    ]);
  });

  it('handles commas', () => {
    expect(parseSpeechText('купить сыр, яйца, мясо')).toEqual([
      { name: 'сыр', count: 1 },
      { name: 'яйца', count: 1 },
      { name: 'мясо', count: 1 },
    ]);
  });

  it('strips "в список" as a whole phrase', () => {
    expect(parseSpeechText('добавь в список молоко')).toEqual([{ name: 'молоко', count: 1 }]);
  });

  it('reads a leading digit as a count', () => {
    expect(parseSpeechText('добавь 2 молока и хлеб')).toEqual([
      { name: 'молока', count: 2 },
      { name: 'хлеб', count: 1 },
    ]);
  });

  it('reads a trailing digit as a count', () => {
    expect(parseSpeechText('хлеб 3')).toEqual([{ name: 'хлеб', count: 3 }]);
  });

  it('understands russian number words', () => {
    expect(parseSpeechText('купи две пачки масла')).toEqual([{ name: 'пачки масла', count: 2 }]);
  });

  it('understands english number words', () => {
    expect(parseSpeechText('buy three eggs')).toEqual([{ name: 'eggs', count: 3 }]);
  });

  it('keeps large numbers as part of the name', () => {
    expect(parseSpeechText('500 грамм сыра')).toEqual([{ name: '500 грамм сыра', count: 1 }]);
  });

  it('does not split names on " с "', () => {
    expect(parseSpeechText('добавь сок с мякотью')).toEqual([{ name: 'сок с мякотью', count: 1 }]);
  });

  it('returns nothing for trigger-only input', () => {
    expect(parseSpeechText('добавь пожалуйста')).toEqual([]);
  });

  it('a bare number stays a name, not a count', () => {
    expect(parseSpeechText('2')).toEqual([{ name: '2', count: 1 }]);
  });
});

describe('parseSpeechCommand', () => {
  it('treats plain speech as add', () => {
    expect(parseSpeechCommand('добавь молоко и хлеб')).toEqual({
      type: 'add',
      items: [
        { name: 'молоко', count: 1 },
        { name: 'хлеб', count: 1 },
      ],
    });
  });

  it('parses check-off commands', () => {
    expect(parseSpeechCommand('вычеркни молоко и хлеб')).toEqual({
      type: 'check',
      queries: ['молоко', 'хлеб'],
    });
  });

  it('past tense "купил" checks off, imperative "купи" adds', () => {
    expect(parseSpeechCommand('купил молоко')).toEqual({ type: 'check', queries: ['молоко'] });
    expect(parseSpeechCommand('купи молоко')).toEqual({
      type: 'add',
      items: [{ name: 'молоко', count: 1 }],
    });
  });

  it('parses remove commands', () => {
    expect(parseSpeechCommand('удали сыр')).toEqual({ type: 'remove', queries: ['сыр'] });
    expect(parseSpeechCommand('remove cheese')).toEqual({ type: 'remove', queries: ['cheese'] });
  });

  it('drops counts from command queries', () => {
    expect(parseSpeechCommand('вычеркни 2 молока')).toEqual({
      type: 'check',
      queries: ['молока'],
    });
  });

  it('recognizes undo', () => {
    expect(parseSpeechCommand('отмена')).toEqual({ type: 'undo' });
    expect(parseSpeechCommand('Отмени!')).toEqual({ type: 'undo' });
    expect(parseSpeechCommand('undo')).toEqual({ type: 'undo' });
  });

  it('recognizes clearing bought items', () => {
    expect(parseSpeechCommand('очисти купленное')).toEqual({ type: 'clearBought' });
    expect(parseSpeechCommand('убери всё купленное')).toEqual({ type: 'clearBought' });
    expect(parseSpeechCommand('clear bought')).toEqual({ type: 'clearBought' });
  });

  it('does not mistake "убери купленное" for a remove query', () => {
    expect(parseSpeechCommand('убери купленное').type).toBe('clearBought');
    expect(parseSpeechCommand('убери молоко')).toEqual({ type: 'remove', queries: ['молоко'] });
  });

  it('english check-off works', () => {
    expect(parseSpeechCommand('check off milk and bread')).toEqual({
      type: 'check',
      queries: ['milk', 'bread'],
    });
  });
});

describe('parseBulkText', () => {
  it('takes one item per line', () => {
    expect(parseBulkText('молоко\nхлеб\nяйца')).toEqual([
      { name: 'молоко', count: 1 },
      { name: 'хлеб', count: 1 },
      { name: 'яйца', count: 1 },
    ]);
  });

  it('strips bullets and numbering', () => {
    expect(parseBulkText('- молоко\n* хлеб\n1. яйца\n2) сыр')).toEqual([
      { name: 'молоко', count: 1 },
      { name: 'хлеб', count: 1 },
      { name: 'яйца', count: 1 },
      { name: 'сыр', count: 1 },
    ]);
  });

  it('keeps quantities and splits a line with several items', () => {
    expect(parseBulkText('2 молока\nсыр, яйца')).toEqual([
      { name: 'молока', count: 2 },
      { name: 'сыр', count: 1 },
      { name: 'яйца', count: 1 },
    ]);
  });

  it('merges repeats across lines instead of duplicating them', () => {
    expect(parseBulkText('молоко\n2 молоко\nхлеб')).toEqual([
      { name: 'молоко', count: 3 },
      { name: 'хлеб', count: 1 },
    ]);
  });

  it('skips blank lines and shared links', () => {
    expect(parseBulkText('молоко\n\nhttps://example.com/recipe\n   \nхлеб')).toEqual([
      { name: 'молоко', count: 1 },
      { name: 'хлеб', count: 1 },
    ]);
  });

  it('returns nothing for text without items', () => {
    expect(parseBulkText('\n  \n')).toEqual([]);
  });
});
