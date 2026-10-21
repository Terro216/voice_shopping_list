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

describe('listCache', async () => {
  it('round-trips a list', async () => {
    await writeSnapshot(LIST, [item]);
    expect(readSnapshot(LIST)?.items).toEqual([item]);
  });

  it('round-trips fractional quantities, units and notes for offline viewing', async () => {
    const measured: Item = { ...item, count: 1.5, unit: 'l', note: 'Безлактозное' };
    await writeSnapshot(LIST, [measured]);
    expect(readSnapshot(LIST)?.items).toEqual([measured]);
  });

  it('reads a snapshot written before the list column was renamed', async () => {
    // Exactly what the previous release wrote: the list was called `username`.
    localStorage.setItem(
      'list_snapshot_v2:legacy:anonymous:ann',
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

  it('falls back to the list being read when an old row named no list at all', async () => {
    localStorage.setItem(
      'list_snapshot_v2:legacy:anonymous:ann',
      JSON.stringify({ items: [{ id: 'a', name: 'молоко', count: 1, bought: false }], savedAt: 1 }),
    );
    expect(readSnapshot(LIST)?.items[0].list_id).toBe('ann');
  });

  it('answers null for a missing or unreadable snapshot', async () => {
    expect(readSnapshot('nobody')).toBeNull();
    localStorage.setItem('list_snapshot_v2:legacy:anonymous:broken', '{not json');
    expect(readSnapshot('broken')).toBeNull();
    localStorage.setItem('list_snapshot_v2:legacy:anonymous:odd', JSON.stringify({ items: 'nope' }));
    expect(readSnapshot('odd')).toBeNull();
  });

  it('keeps lists apart and clears them all on logout', async () => {
    await writeSnapshot(LIST, [item]);
    await writeSnapshot('dacha', [{ ...item, id: 'b', name: 'грабли', list_id: 'dacha' }]);
    expect(readSnapshot('dacha')?.items[0].name).toBe('грабли');

    await clearSnapshots();
    expect(readSnapshot(LIST)).toBeNull();
    expect(readSnapshot('dacha')).toBeNull();
  });
});

it('does not expose an unowned legacy snapshot to a new immutable account', async () => {
  localStorage.setItem('username', 'ann');
  localStorage.setItem('token', 'legacy-token');
  localStorage.setItem('list_snapshot_v1:ann', JSON.stringify({ items: [item], savedAt: 1 }));
  expect(readSnapshot(LIST)?.items).toHaveLength(1);
  localStorage.setItem('token', `x.${btoa(JSON.stringify({ sub: 'new-account-id' }))}.x`);
  expect(readSnapshot(LIST)).toBeNull();
});
