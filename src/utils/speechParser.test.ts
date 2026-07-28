import { describe, it, expect } from 'vitest';
import { parseSpeechText } from './speechParser';

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
