import { describe, expect, it } from 'vitest';
import { parseSpeechUtterance } from './speechParser';
import { conversationMatches, correctionEdit, destinationMatches } from './conversation';
import type { Item } from '../api/items';

describe('conversational speech grammar', () => {
  it.each(['добавь два молока… нет, три', 'добавь два молока нет три', 'добавь два молока, нет, три'])('splits an inline correction: %s', (text) => {
    expect(parseSpeechUtterance(text)).toEqual([
      { type: 'add', items: [{ name: 'молока', count: 2 }] },
      { type: 'correct', query: null, change: { kind: 'quantity', count: 3 } },
    ]);
  });
  it.each([
    ['нет, три', 3, undefined], ['не два а три', 3, undefined],
    ['нет, не два, а три', 3, undefined], ['точнее 0,75', 0.75, undefined],
    ['нет 500г', 500, 'g'], ['сделай его полтора литра', 1.5, 'l'],
    ['нет 0', 0, undefined], ['нет -2', -2, undefined], ['нет 1000', 1000, undefined],
    ['нет двадцать пять', 25, undefined], ['сделай его двести пятьдесят', 250, undefined],
    ['no, three', 3, undefined], ['make it half a kilo', 0.5, 'kg'],
  ])('parses an absolute amount: %s', (text, count, unit) => {
    expect(parseSpeechUtterance(String(text))).toEqual([{ type: 'correct', query: null, change: { kind: 'quantity', count, ...(unit ? { unit } : {}) } }]);
  });
  it('addresses a named item and preserves replacement names', () => {
    expect(parseSpeechUtterance('измени количество молока на три')).toEqual([{ type: 'correct', query: 'молока', change: { kind: 'quantity', count: 3 } }]);
    expect(parseSpeechUtterance('замени молоко на овсяное молоко')).toEqual([{ type: 'correct', query: 'молоко', change: { kind: 'name', name: 'овсяное молоко' } }]);
    expect(parseSpeechUtterance('сделай его безлактозным')).toEqual([{ type: 'correct', query: null, change: { kind: 'qualifier', value: 'безлактозным' } }]);
  });
  it.each([
    ['перенеси кофе в список для дачи', 'кофе', 'для дачи'],
    ['перемести его в список «Дача»', null, 'дача'],
    ['move coffee to list Weekend', 'coffee', 'weekend'],
  ])('parses transfers: %s', (text, query, destination) => {
    expect(parseSpeechUtterance(text!)).toEqual([{ type: 'move', query, destination }]);
  });
  it('never interprets notes as corrections', () => {
    expect(parseSpeechUtterance('добавь молоко, заметка — нет, три не надо, перенеси кофе в список Дача')).toEqual([
      { type: 'add', items: [{ name: 'молоко', count: 1, note: 'нет, три не надо, перенеси кофе в список Дача' }] },
    ]);
  });
  it.each(['нет', 'сделай', 'перенеси молоко', 'замени молоко', 'нет 3 непонятных единицы'])('does not add malformed commands as products: %s', (text) => {
    expect(parseSpeechUtterance(text)).toEqual([{ type: 'unrecognized' }]);
  });
  it('keeps plain shopping text and existing commands', () => {
    expect(parseSpeechUtterance('молоко и хлеб')).toEqual([{ type: 'add', items: [{ name: 'молоко', count: 1 }, { name: 'хлеб', count: 1 }] }]);
    expect(parseSpeechUtterance('отмена')).toEqual([{ type: 'undo' }]);
  });
});

describe('conservative correction targets', () => {
  it('returns tied rows and qualified products without choosing arbitrarily', () => {
    const rows = [{ name: 'молоко', note: 'Красное' }, { name: 'молоко', note: 'Синее' }, { name: 'молоко овсяное' }, { name: 'молоток' }];
    expect(conversationMatches(rows, 'молока')).toEqual(rows.slice(0, 3));
    expect(conversationMatches([{ name: 'сырок' }], 'сыр')).toEqual([]);
    expect(conversationMatches([{ name: 'чайник' }], 'чай')).toEqual([]);
  });
  it('finds an inflected destination without a fuzzy guess', () => {
    const lists = [{ name: 'Дача' }, { name: 'Дача' }, { name: 'Дача соседей' }];
    expect(destinationMatches(lists, 'для дачи')).toEqual(lists.slice(0, 2));
    expect(destinationMatches(lists, 'дома')).toEqual([]);
  });
  const milk: Item = { id: 'm', name: 'молока обычное', count: 2, unit: 'l', note: 'Красная пачка', list_id: 'ann', bought: false };
  it('keeps the unit when only a number was corrected', () => {
    expect(correctionEdit(milk, { kind: 'quantity', count: 0.75 })).toEqual({ count: 0.75, unit: 'l' });
  });
  it('changes a dairy qualifier while preserving the noun', () => {
    expect(correctionEdit(milk, { kind: 'qualifier', value: 'безлактозным' })).toEqual({ name: 'молоко безлактозное' });
    expect(correctionEdit({ ...milk, name: 'сметана' }, { kind: 'qualifier', value: 'безлактозной' })).toEqual({ name: 'сметана безлактозная' });
    expect(correctionEdit({ ...milk, name: 'молоко безлактозное' }, { kind: 'qualifier', value: 'обезжиренным' })).toEqual({ name: 'молоко безлактозное обезжиренное' });
    expect(correctionEdit(milk, { kind: 'name', name: 'безлактозное' })).toEqual({ name: 'молоко безлактозное' });
    expect(correctionEdit({ ...milk, name: 'неизвестный товар' }, { kind: 'qualifier', value: 'странным' })).toBeNull();
  });
});
