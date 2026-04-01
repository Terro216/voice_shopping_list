import { describe, it, expect } from 'vitest';
import { parseSpeechText } from './speechParser';

describe('speechParser', () => {
  it('should parse simple russian sentences with "и"', () => {
    const result = parseSpeechText('добавь хлеб и молоко');
    expect(result).toEqual(['хлеб', 'молоко']);
  });

  it('should strip trigger words in english', () => {
    const result = parseSpeechText('please add apples and bananas');
    expect(result).toEqual(['apples', 'bananas']);
  });

  it('should handle commas', () => {
    const result = parseSpeechText('купить сыр, яйца, мясо');
    expect(result).toEqual(['сыр', 'яйца', 'мясо']);
  });
});
