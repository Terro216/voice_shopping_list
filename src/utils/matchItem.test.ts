import { describe, it, expect } from 'vitest';
import { findBestMatch, matchScore } from './matchItem';

const items = [
  { name: 'молоко' },
  { name: 'хлеб' },
  { name: 'сок с мякотью' },
  { name: 'milk' },
  { name: 'помидоры' },
];

describe('matchItem', () => {
  it('matches exact names', () => {
    expect(findBestMatch(items, 'хлеб')?.name).toBe('хлеб');
  });

  it('matches inflected russian forms', () => {
    expect(findBestMatch(items, 'молока')?.name).toBe('молоко');
    expect(findBestMatch(items, 'хлеба')?.name).toBe('хлеб');
    expect(findBestMatch(items, 'помидор')?.name).toBe('помидоры');
  });

  it('matches a multi-word name by its beginning', () => {
    expect(findBestMatch(items, 'сок')?.name).toBe('сок с мякотью');
  });

  it('returns null for something not on the list', () => {
    expect(findBestMatch(items, 'сыр')).toBeNull();
  });

  it('prefers the exact match over a prefix match', () => {
    const list = [{ name: 'молоко топлёное' }, { name: 'молоко' }];
    expect(findBestMatch(list, 'молоко')?.name).toBe('молоко');
  });

  it('is case-insensitive', () => {
    expect(matchScore('Молоко', 'молоко')).toBe(100);
  });
});
