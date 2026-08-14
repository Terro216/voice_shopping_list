import { describe, it, expect, beforeEach } from 'vitest';
import { readSnapshot, writeSnapshot, clearSnapshots } from './listCache';
import type { Item } from './items';

const LIST = 'ann';

const item: Item = {
  id: 'a',
  name: 'молоко',
  note: null,
  count: 1,
  list_id: LIST,
  bought: false,
  bought_at: null,
};

beforeEach(() => localStorage.clear());

describe('listCache', () => {
  it('round-trips a list', () => {
    writeSnapshot(LIST, [item]);
    expect(readSnapshot(LIST)?.items).toEqual([item]);
  });

  it('reads a snapshot written before the list column was renamed', () => {
    // Exactly what the previous release wrote: the list was called `username`.
    localStorage.setItem(
      'list_snapshot_v1:ann',
      JSON.stringify({
        items: [{ id: 'a', name: 'молоко', note: null, count: 1, username: 'ann', bought: false }],
        savedAt: 1,
      }),
    );

    const snapshot = readSnapshot(LIST);
    expect(snapshot?.items).toHaveLength(1);
    expect(snapshot?.items[0].list_id).toBe('ann');
    expect(snapshot?.items[0].name).toBe('молоко');
  });

  it('falls back to the list being read when an old row named no list at all', () => {
    localStorage.setItem(
      'list_snapshot_v1:ann',
      JSON.stringify({ items: [{ id: 'a', name: 'молоко', count: 1, bought: false }], savedAt: 1 }),
    );
    expect(readSnapshot(LIST)?.items[0].list_id).toBe('ann');
  });

  it('answers null for a missing or unreadable snapshot', () => {
    expect(readSnapshot('nobody')).toBeNull();
    localStorage.setItem('list_snapshot_v1:broken', '{not json');
    expect(readSnapshot('broken')).toBeNull();
    localStorage.setItem('list_snapshot_v1:odd', JSON.stringify({ items: 'nope' }));
    expect(readSnapshot('odd')).toBeNull();
  });

  it('keeps lists apart and clears them all on logout', () => {
    writeSnapshot(LIST, [item]);
    writeSnapshot('dacha', [{ ...item, id: 'b', name: 'грабли', list_id: 'dacha' }]);
    expect(readSnapshot('dacha')?.items[0].name).toBe('грабли');

    clearSnapshots();
    expect(readSnapshot(LIST)).toBeNull();
    expect(readSnapshot('dacha')).toBeNull();
  });
});
