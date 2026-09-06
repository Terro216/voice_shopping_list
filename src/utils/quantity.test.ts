import { describe, expect, it } from 'vitest';
import { convertQuantity, isValidQuantity } from '../../shared/quantity.js';
import { formatQuantity } from './quantity';

describe('quantity validation and conversion', () => {
  it('accepts measured decimals but only whole pieces and packs', () => {
    expect(isValidQuantity(1.25, 'kg')).toBe(true);
    expect(isValidQuantity(1500, 'ml')).toBe(true);
    for (const unit of [null, 'pcs', 'pack'] as const) expect(isValidQuantity(1.5, unit)).toBe(false);
    for (const count of [0, -1, NaN, Infinity, 1.0001, 1e-10, 1000]) expect(isValidQuantity(count, 'kg')).toBe(false);
    expect(isValidQuantity('2', 'kg')).toBe(false);
  });
  it('converts only compatible units without silently losing precision', () => {
    expect(convertQuantity(500, 'g', 'kg')).toBe(0.5);
    expect(convertQuantity(1.25, 'l', 'ml')).toBe(1250);
    expect(convertQuantity(2, null, 'pcs')).toBe(2);
    expect(convertQuantity(2, 'pack', 'pcs')).toBeNull();
    expect(convertQuantity(2, 'kg', 'l')).toBeNull();
    expect(convertQuantity(0.5, 'g', 'kg')).toBeNull();
  });
  it('formats fractional amounts and legacy counts for the selected language', () => {
    expect(formatQuantity({ count: 1.5, unit: 'l' }, 'ru')).toBe('1,5 л');
    expect(formatQuantity({ count: 1.5, unit: 'l' }, 'en')).toBe('1.5 l');
    expect(formatQuantity({ count: 2 }, 'ru')).toBe('×2');
  });
});
