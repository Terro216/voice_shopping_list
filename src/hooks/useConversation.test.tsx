import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useShoppingList } from './useShoppingList';
import { useConversation } from './useConversation';
import { readSnapshot } from '../api/listCache';
import { queuedMutationCount, syncOfflineQueue } from '../api/offlineQueue';
import type { Item } from '../api/items';
import type { ListSummary } from '../api/lists';

vi.mock('socket.io-client', () => ({ io: () => ({ on() {}, emit() {}, disconnect() {} }) }));
vi.mock('../utils/feedback', () => ({ cue: vi.fn() }));
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

const lists: ListSummary[] = [
  { id: 'ann', name: 'Продукты', owner: 'ann', owned: true, members: [] },
  { id: 'dacha', name: 'Дача', owner: 'ann', owned: true, members: [] },
];
const milk = (id = 'milk', extra: Partial<Item> = {}): Item => ({ id, name: 'молоко', count: 2, unit: 'l', note: 'Красная пачка', bought: false, list_id: 'ann', ...extra });
let rows: Item[];
const json = (data: unknown, status = 200) => ({ ok: status < 400, status, headers: new Headers(), json: async () => data }) as Response;

beforeEach(() => {
  rows = [];
  localStorage.clear();
  vi.stubGlobal('fetch', vi.fn(async (input: string, init?: RequestInit) => {
    const url = new URL(input, 'http://localhost');
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    const method = init?.method ?? 'GET';
    const id = decodeURIComponent(url.pathname.split('/')[3] ?? '');
    if (method === 'GET') { const items=rows.filter(item => item.list_id === url.searchParams.get('list')); return json(url.pathname==='/api/items/sync'?{version:0,items}:items); }
    if (method === 'POST' && url.pathname.endsWith('/move')) {
      rows = rows.map((item) => item.id === id ? { ...item, list_id: body.destination } : item);
      return json(rows.find((item) => item.id === id));
    }
    if (method === 'POST') rows = [...rows.filter((item) => item.id !== body.id), { ...body, list_id: body.list }];
    if (method === 'PATCH') rows = rows.map((item) => item.id === id ? {
      ...item, ...(body.name !== undefined ? { name: body.name } : {}),
      ...(body.count !== undefined ? { count: body.count } : {}),
      ...(body.unit !== undefined ? { unit: body.unit } : {}),
      ...(body.delta !== undefined ? { count: item.count + body.delta } : {}),
    } : item);
    if (method === 'DELETE') rows = rows.filter((item) => item.id !== id);
    return json({ success: true });
  }));
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

const mount = async (catalog = lists) => {
  const view = renderHook(({ list }) => {
    const shopping = useShoppingList(list, 'ann');
    const conversation = useConversation({
      list, lang: 'ru', lists: catalog, ...shopping,
      executeBasic: async (command) => {
        if (command.type === 'add') {
          let last: Item | undefined;
          for (const item of command.items) last = await shopping.addItem(item.name, item.count, item);
          return last;
        }
        if (command.type === 'undo') await shopping.undo();
      },
    });
    return { ...shopping, ...conversation };
  }, { initialProps: { list: 'ann' } });
  await waitFor(() => expect(view.result.current.loading).toBe(false));
  await waitFor(() => expect(view.result.current.items).toHaveLength(rows.filter((item) => item.list_id === 'ann').length));
  const say = async (text: string) => { await act(async () => { await view.result.current.handleSpeech(text); }); };
  return { ...view, say };
};

describe('voice corrections through the real list hook', () => {
  it('corrects an inline add, keeps one id, and undoes the correction', async () => {
    const { result, say } = await mount();
    await say('добавь два молока… нет, три');
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ name: 'молока', count: 3 });
    const id = result.current.items[0].id;
    await say('отмена');
    expect(result.current.items[0]).toMatchObject({ id, count: 2 });
  });
  it('uses the actual merged row and sets the total instead of adding a delta', async () => {
    rows = [milk('milk', { unit: null, note: null, count: 5 })];
    const { result, say } = await mount();
    await say('добавь два молока');
    await say('нет, три');
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ id: 'milk', count: 3 });
  });
  it('preserves notes and quantities while applying a qualifier then a unit correction', async () => {
    const { result, say } = await mount();
    await say('добавь два литра молока, заметка — Красная пачка');
    await say('сделай его безлактозным');
    await say('нет 750 мл');
    expect(result.current.items[0]).toMatchObject({ name: 'молоко безлактозное', count: 750, unit: 'ml', note: 'Красная пачка' });
    await say('нет 500');
    expect(result.current.items[0]).toMatchObject({ count: 500, unit: 'ml' });
  });
  it('serializes a correction arriving before the add response', async () => {
    const { result } = await mount();
    const respond = vi.mocked(fetch).getMockImplementation()!;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      if (init?.method === 'POST') await gate;
      return respond(input, init);
    });
    await act(async () => {
      const added = result.current.handleSpeech('добавь два молока');
      const corrected = result.current.handleSpeech('нет три');
      release();
      await added;
      await corrected;
    });
    expect(result.current.items[0].count).toBe(3);
  });
  it.each(['нет 0', 'нет -2', 'нет 0,5', 'нет 1000'])('does not turn an invalid quantity into an item or change: %s', async (text) => {
    const { result, say } = await mount();
    await say('добавь два молока');
    await say(text);
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].count).toBe(2);
  });
  it('waits for a choice between identical names and edits only that row', async () => {
    rows = [milk('red'), milk('blue', { note: 'Синяя пачка' })];
    const { result } = await mount();
    let pending: Promise<void> | undefined;
    act(() => { pending = result.current.handleSpeech('замени молоко на овсяное молоко'); });
    await waitFor(() => expect(result.current.choice?.options).toHaveLength(2));
    expect(result.current.choice?.options[1].label).toContain('Синяя пачка');
    expect(rows.every((item) => item.name === 'молоко')).toBe(true);
    await act(async () => { result.current.choose('blue'); await pending; });
    expect(result.current.items.find((item) => item.id === 'red')?.name).toBe('молоко');
    expect(result.current.items.find((item) => item.id === 'blue')?.name).toBe('овсяное молоко');
  });
  it('cancels ambiguity without applying a command', async () => {
    rows = [milk()];
    const { result } = await mount();
    let pending: Promise<void> | undefined;
    act(() => { pending = result.current.handleSpeech('нет три'); });
    await waitFor(() => expect(result.current.choice).not.toBeNull());
    await act(async () => { result.current.choose(null); await pending; });
    expect(result.current.items[0].count).toBe(2);
  });
  it('rejects a stale conversational reference', async () => {
    const { result, say } = await mount();
    await say('добавь два молока');
    const id = result.current.items[0].id;
    await act(async () => { await result.current.editItem(id, { count: 4 }); });
    await say('нет три');
    expect(result.current.items[0].count).toBe(4);
    expect(result.current.contextName).toBeNull();
  });
  it('rejects a row changed while the choice was open', async () => {
    rows = [milk('red'), milk('blue', { note: 'Синяя пачка' })];
    const { result } = await mount();
    let pending: Promise<void> | undefined;
    act(() => { pending = result.current.handleSpeech('замени молоко на овсяное молоко'); });
    await waitFor(() => expect(result.current.choice).not.toBeNull());
    await act(async () => { await result.current.editItem('blue', { count: 4 }); });
    await act(async () => { result.current.choose('blue'); await pending; });
    expect(result.current.items.find((item) => item.id === 'blue')).toMatchObject({ count: 4, name: 'молоко' });
  });
  it('discards a pending choice when leaving the list', async () => {
    rows = [milk()];
    const { result, unmount } = await mount();
    let pending: Promise<void> | undefined;
    act(() => { pending = result.current.handleSpeech('нет три'); });
    await waitFor(() => expect(result.current.choice).not.toBeNull());
    unmount();
    await pending;
    expect(rows[0].count).toBe(2);
    expect(vi.mocked(fetch).mock.calls.some(([, init]) => init?.method === 'PATCH')).toBe(false);
  });
  it('refuses to report a rejected server edit as successful or record its undo', async () => {
    const { result, say } = await mount();
    await say('добавь два молока');
    const respond = vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation(async (input, init) => init?.method === 'PATCH' ? json({ error: 'Changed' }, 409) : respond(input, init));
    await say('нет три');
    expect(result.current.items[0].count).toBe(2);
    expect(result.current.contextName).toBeNull();
    await say('отмена');
    expect(result.current.items).toHaveLength(0);
  });
  it('moves one row without losing details, then undoes after remount', async () => {
    rows = [milk()];
    const first = await mount();
    await first.say('перенеси молоко в список для дачи');
    expect(first.result.current.items).toHaveLength(0);
    expect(readSnapshot('dacha')?.items[0]).toMatchObject({ ...milk(), list_id: 'dacha' });
    first.unmount();
    const second = await mount();
    await second.say('отмена');
    expect(second.result.current.items[0]).toMatchObject(milk());
    expect(readSnapshot('dacha')?.items).toEqual([]);
  });
  it('does not create a destination or move to the current list', async () => {
    rows = [milk()];
    const { result, say } = await mount();
    await say('перенеси молоко в список Несуществующий');
    await say('перенеси молоко в список Продукты');
    expect(result.current.items).toEqual(rows);
    expect(vi.mocked(fetch).mock.calls.some(([, init]) => init?.method === 'POST')).toBe(false);
  });
  it('durably queues move undo and retries after temporary unavailability', async () => {
    rows = [milk()];
    const { result, say } = await mount();
    await say('перенеси молоко в список Дача');
    const respond = vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation(async (input, init) => init?.method === 'POST' ? json({ error: 'Unavailable' }, 503) : respond(input, init));
    await act(async () => { expect(await result.current.undo()).toBe('молоко'); });
    expect(queuedMutationCount()).toBe(1);
    vi.mocked(fetch).mockImplementation(respond);
    await act(async () => { await result.current.retrySync(); });
    expect(queuedMutationCount()).toBe(0);
    expect(result.current.items[0]).toMatchObject(milk());
  });
  it('queues add, correction, move and undo in order offline and survives reload', async () => {
    const first = await mount();
    const online = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    await first.say('добавь два литра молока');
    await first.say('нет три');
    await first.say('перенеси его в список Дача');
    expect(queuedMutationCount()).toBe(3);
    first.unmount();
    const second = await mount();
    await second.say('отмена');
    expect(second.result.current.items[0]).toMatchObject({ count: 3, unit: 'l' });
    expect(queuedMutationCount()).toBe(4);
    online.mockReturnValue(true);
    await act(async () => { expect((await syncOfflineQueue()).sent).toBe(4); });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ count: 3, unit: 'l', list_id: 'ann' });
  });
  it('expires context and asks instead of guessing after two minutes', async () => {
    const { result, say } = await mount();
    await say('добавь молоко');
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 121_000);
    let pending: Promise<void> | undefined;
    act(() => { pending = result.current.handleSpeech('нет три'); });
    await waitFor(() => expect(result.current.choice).not.toBeNull());
    await act(async () => { result.current.choose(null); await pending; });
    expect(result.current.items[0].count).toBe(1);
  });
});
