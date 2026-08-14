import { describe, it, expect } from 'vitest';
import { sameWord, sameName } from './wordForms';

describe('sameWord', () => {
  it('accepts a changed ending', () => {
    expect(sameWord('молоко', 'молока')).toBe(true);
    expect(sameWord('хлеб', 'хлеба')).toBe(true);
    expect(sameWord('сок', 'соки')).toBe(true);
  });

  it('keeps different products apart', () => {
    // The failure that matters: merging two things somebody meant to buy.
    expect(sameWord('молоко', 'молоток')).toBe(false);
    expect(sameWord('чай', 'чайник')).toBe(false);
    expect(sameWord('сок', 'сыр')).toBe(false);
    expect(sameWord('сыр', 'сырок')).toBe(false);
  });

  it('will not guess at very short words', () => {
    expect(sameWord('со', 'сы')).toBe(false);
    expect(sameWord('два', 'две')).toBe(false);
    expect(sameWord('ко', 'ко')).toBe(true); // identical is always the same
  });

  it('needs both tails to be short, not just the shared part to be whole', () => {
    // «сыр» is entirely contained in «сырок», which is exactly why the length
    // of the leftover matters.
    expect(sameWord('сыр', 'сырок')).toBe(false);
    expect(sameWord('чай', 'чайник')).toBe(false);
    expect(sameWord('сок', 'соки')).toBe(true);
  });
});

describe('sameName', () => {
  it('matches the same item in two grammatical forms', () => {
    expect(sameName('молоко', 'молока')).toBe(true);
    expect(sameName('Молоко', 'молока')).toBe(true);
    expect(sameName('пачка масла', 'пачки масла')).toBe(true);
  });

  it('never lets a qualifier be swallowed', () => {
    expect(sameName('молоко', 'молоко безлактозное')).toBe(false);
    expect(sameName('сок с мякотью', 'сок')).toBe(false);
  });

  it('is unbothered by punctuation and empty input', () => {
    expect(sameName('молоко,', 'молока')).toBe(true);
    expect(sameName('', 'молоко')).toBe(false);
  });
});
