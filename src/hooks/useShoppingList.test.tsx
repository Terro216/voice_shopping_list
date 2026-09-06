import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useShoppingList } from './useShoppingList';
import type { Item } from '../api/items';

vi.mock('socket.io-client', () => ({
  io: () => ({ on: () => {}, emit: () => {}, disconnect: () => {} }),
}));

const LIST = 'ann';

const item = (id: string, over: Partial<Item> = {}): Item => ({
  id,
  name: id,
  note: null,
  count: 1,
  list_id: LIST,
  bought: false,
  bought_at: null,
  ...over,
});

let served: Item[] = [];
let calls: { url: string; method: string; body: unknown }[] = [];

const respond = (url: string, init?: RequestInit) => {
  calls.push({
    url,
    method: init?.method ?? 'GET',
    body: init?.body ? JSON.parse(String(init.body)) : undefined,
  });
  const path = new URL(url, 'http://localhost').pathname;
  const reading = !init?.method || init.method === 'GET';
  const data = reading
    ? path === '/api/items'
      ? served
      : [] // suggestions and the deleted drawer
    : { ok: true };
  return { ok: true, status: 200, headers: new Headers(), json: async () => data };
};

const sent = (method: string, match: string) =>
  calls.filter((c) => c.method === method && c.url.includes(match));

beforeEach(() => {
  served = [];
  calls = [];
  localStorage.clear();
  vi.stubGlobal('fetch', vi.fn(respond));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const mount = () => renderHook(() => useShoppingList(LIST, LIST));

/**
 * Mounts and waits for the opening fetch to land. Without this an assertion can
 * race that response, which would arrive later and overwrite whatever the test
 * did in the meantime.
 */
const mountLoaded = async () => {
  const view = mount();
  await waitFor(() => expect(view.result.current.items).toHaveLength(served.length));
  return view;
};

describe('useShoppingList undo', () => {
  it('undoes an add by removing the item again', async () => {
    const { result } = await mountLoaded();
    await act(async () => {
      await result.current.addItem('молоко');
    });
    expect(result.current.items.map((i) => i.name)).toEqual(['молоко']);

    await act(async () => {
      expect(await result.current.undo()).toBe('молоко');
    });
    expect(result.current.items).toEqual([]);
  });

  it('survives a reload: a stack written by one session is used by the next', async () => {
    served = [item('a', { name: 'молоко' })];

    const first = await mountLoaded();
    await act(async () => {
      await first.result.current.removeItem('a');
    });
    expect(first.result.current.items).toEqual([]);
    first.unmount();

    // A fresh mount is what a reload looks like from here: new state, new refs,
    // and only localStorage carried across.
    calls = [];
    served = [];
    const second = await mountLoaded();
    await act(async () => {
      expect(await second.result.current.undo()).toBe('молоко');
    });

    // Undoing a delete re-posts the item under its original id, which is what
    // brings the row back out of the deleted drawer server-side.
    const posted = sent('POST', '/api/items');
    expect(posted).toHaveLength(1);
    expect(posted[0].body).toMatchObject({ id: 'a', name: 'молоко', list: LIST });
    expect(second.result.current.items.map((i) => i.id)).toEqual(['a']);
  });

  it('skips entries whose item somebody else has since removed', async () => {
    served = [item('a', { name: 'молоко' }), item('b', { name: 'хлеб' })];
    const first = await mountLoaded();

    await act(async () => {
      await first.result.current.setBought('b', true); // undo: un-check "хлеб"
      await first.result.current.removeItem('a'); // undo: restore "молоко"
    });
    first.unmount();

    // Reopened later, "хлеб" is gone from the list entirely.
    served = [];
    const second = await mountLoaded();

    // The top entry points at a vanished item, so undo reaches past it rather
    // than reporting a failure nobody can act on.
    await act(async () => {
      expect(await second.result.current.undo()).toBe('молоко');
    });
    expect(second.result.current.items.map((i) => i.name)).toEqual(['молоко']);
  });

  it('reports nothing to undo once the stack is spent', async () => {
    const { result } = await mountLoaded();
    await act(async () => {
      expect(await result.current.undo()).toBeNull();
    });
  });

  it('keeps each list’s stack to itself', async () => {
    const { result } = await mountLoaded();
    await act(async () => {
      await result.current.addItem('молоко');
    });

    const other = renderHook(() => useShoppingList('dacha', 'ann'));
    await act(async () => {
      expect(await other.result.current.undo()).toBeNull();
    });
  });
});

describe('useShoppingList deleted drawer', () => {
  it('only refreshes the drawer while it is open', async () => {
    served = [item('a')];
    const { result } = await mountLoaded();

    // Closed: refreshing the list must not fetch the drawer.
    calls = [];
    await act(async () => {
      await result.current.addItem('хлеб');
    });
    expect(sent('GET', '/api/items/deleted')).toHaveLength(0);

    await act(async () => {
      result.current.watchDeleted(true);
    });
    expect(sent('GET', '/api/items/deleted')).toHaveLength(1);

    await act(async () => {
      result.current.watchDeleted(false);
    });
    calls = [];
    await act(async () => {
      await result.current.removeItem('a');
    });
    expect(sent('GET', '/api/items/deleted')).toHaveLength(0);
  });

  it('shows a counted-down item in the open drawer straight away', async () => {
    served = [item('a', { name: 'молоко', count: 1 })];
    const { result } = await mountLoaded();

    await act(async () => {
      result.current.watchDeleted(true);
    });
    await act(async () => {
      await result.current.changeCount('a', -1);
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.deletedItems.map((i) => i.name)).toEqual(['молоко']);
  });
});

describe('useShoppingList adding', () => {
  it('bumps the existing row when the same thing is said in another form', async () => {
    const { result } = await mountLoaded();
    await act(async () => {
      await result.current.addItem('молоко', 4);
      await result.current.addItem('молока', 2);
    });

    // «молоко 4» then «два молока» is one product said twice, not two rows.
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ name: 'молоко', count: 6 });
  });

  it('still keeps genuinely different things apart', async () => {
    const { result } = await mountLoaded();
    await act(async () => {
      await result.current.addItem('сыр');
      await result.current.addItem('сырок');
      await result.current.addItem('молоко');
      await result.current.addItem('молоко безлактозное');
    });
    expect(result.current.items.map((i) => i.name)).toEqual([
      'сыр',
      'сырок',
      'молоко',
      'молоко безлактозное',
    ]);
  });
});

describe('measured quantities and inline notes', () => {
  it('persists notes and units and merges compatible quantities without floating-point drift', async () => {
    served = [item('a', { name: 'сыра', count: 0.5, unit: 'kg', note: 'Без тмина' })];
    const { result } = await mountLoaded();
    await act(async () => { await result.current.addItem('сыра', 200, { unit: 'g', note: 'Без тмина' }); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ count: 0.7, unit: 'kg', note: 'Без тмина' });
    expect(sent('PATCH', '/count')[0].body).toMatchObject({ delta: 0.2, expectedUnit: 'kg' });
    await act(async () => { await result.current.undo(); });
    expect(result.current.items[0].count).toBe(0.5);
  });

  it('keeps incompatible units and different notes separate', async () => {
    served = [item('a', { name: 'молоко', count: 1.5, unit: 'l', note: 'Без сахара' })];
    const { result } = await mountLoaded();
    await act(async () => {
      await result.current.addItem('молоко', 2, { unit: 'pack', note: 'Без сахара' });
      await result.current.addItem('молоко', 1, { unit: 'l', note: 'Шоколадное' });
    });
    expect(result.current.items).toHaveLength(3);
    expect(sent('POST', '/api/items').map(call => call.body)).toEqual(expect.arrayContaining([
      expect.objectContaining({ count: 2, unit: 'pack', note: 'Без сахара' }),
      expect.objectContaining({ count: 1, unit: 'l', note: 'Шоколадное' }),
    ]));
  });

  it('undoes a unit edit after reloading with both original quantity and unit', async () => {
    served = [item('a', { count: 500, unit: 'g' })];
    const first = await mountLoaded();
    await act(async () => { await first.result.current.editItem('a', { count: 0.5, unit: 'kg' }); });
    served = first.result.current.items;
    first.unmount();
    const second = await mountLoaded();
    await act(async () => { await second.result.current.undo(); });
    expect(second.result.current.items[0]).toMatchObject({ count: 500, unit: 'g' });
    expect(sent('PATCH', '/api/items/a').slice(-1)[0]?.body).toMatchObject({ count: 500, unit: 'g' });
  });

  it('skips a quantity undo after someone changes its unit', async () => {
    served = [item('a', { count: 0.5, unit: 'kg' })];
    const first = await mountLoaded();
    await act(async () => { await first.result.current.changeCount('a', 0.1); });
    first.unmount();
    served = [item('a', { count: 600, unit: 'g' })];
    const second = await mountLoaded();
    calls = [];
    await act(async () => { expect(await second.result.current.undo()).toBeNull(); });
    expect(sent('PATCH', '/count')).toHaveLength(0);
    expect(second.result.current.items[0].count).toBe(600);
  });

  it('undoes the actual capped delta and creates no undo for a no-op at the limit', async () => {
    served = [item('a', { count: 998.9, unit: 'kg' })];
    const { result } = await mountLoaded();
    await act(async () => {
      await result.current.changeCount('a', 0.2);
      await result.current.changeCount('a', 0.1);
    });
    expect(result.current.items[0].count).toBe(999);
    expect(sent('PATCH', '/count')).toHaveLength(1);
    await act(async () => { await result.current.undo(); });
    expect(result.current.items[0].count).toBe(998.9);
  });

  it('restores a fractional item removed by the minus button', async () => {
    served = [item('a', { count: 0.05, unit: 'kg', note: 'Свежий' })];
    const { result } = await mountLoaded();
    await act(async () => { await result.current.changeCount('a', -0.1); });
    expect(result.current.items).toHaveLength(0);
    await act(async () => { await result.current.undo(); });
    expect(result.current.items[0]).toMatchObject({ count: 0.05, unit: 'kg', note: 'Свежий' });
  });
});
