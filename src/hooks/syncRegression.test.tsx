import { IDBObjectStore } from 'fake-indexeddb';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { useShoppingList } from './useShoppingList';
import { readSnapshot } from '../api/listCache';
import { readUndoStack } from '../api/undoStack';
import { enqueueMutation, queuedMutationCount, readMutations } from '../api/offlineQueue';
import type { Item } from '../api/items';

const sockets = vi.hoisted(() => ({ handlers: {} as Record<string, () => void> }));
vi.mock('socket.io-client', () => ({ io: () => ({ on: (name: string, fn: () => void) => { sockets.handlers[name] = fn; }, emit() {}, disconnect() {}, connect() {} }) }));
const row = (id: string, fields: Partial<Item> = {}): Item => ({ id, name: id, count: 1, bought: false, list_id: 'ann', ...fields });
const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
let rows: Item[];
const serve = async (url: string | URL | Request, init?: RequestInit) => {
  const path = new URL(String(url), 'http://localhost').pathname;
  const method = init?.method ?? 'GET';
  const body = init?.body ? JSON.parse(String(init.body)) : {};
  const id = path.split('/')[3];
  if (method === 'GET') return response(path === '/api/items/sync' ? {version:0,items:rows} : rows);
  if (method === 'POST') rows = [...rows.filter(item => item.id !== body.id), { ...body, list_id: body.list }];
  if (method === 'DELETE') rows = rows.filter(item => item.id !== id);
  if (method === 'PATCH') rows = rows.map(item => item.id === id ? { ...item, ...body, ...(body.delta ? { count: item.count + body.delta } : {}) } : item);
  return response({ success: true });
};
beforeEach(() => { localStorage.clear(); rows = []; sockets.handlers = {}; vi.stubGlobal('fetch', vi.fn(serve)); });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });
const mount = async () => { const view = renderHook(() => useShoppingList('ann', 'ann')); await waitFor(() => expect(view.result.current.loading).toBe(false)); return view; };

describe('shopping data regressions', () => {
  it('ignores an initial GET that arrives after a successful add', async () => {
    let release!: (response: Response) => void;
    const first = new Promise<Response>(resolve => { release = resolve; });
    vi.mocked(fetch).mockImplementationOnce(() => first);
    const { result } = renderHook(() => useShoppingList('ann', 'ann'));
    await act(async () => { await result.current.addItem('молоко'); });
    await act(async () => { release(response({version:0,items:[]})); });
    expect(result.current.items.map(item => item.name)).toEqual(['молоко']);
    expect(readSnapshot('ann')?.items).toHaveLength(1);
  });

  it('re-adds a bought item with the requested quantity', async () => {
    rows = [row('milk', { name: 'молоко', count: 7, bought: true })];
    const { result } = await mount();
    await act(async () => { await result.current.addItem('молоко', 2); });
    expect(result.current.items[0]).toMatchObject({ count: 2, bought: false });
    await act(async () => { await result.current.undo(); });
    expect(result.current.items[0]).toMatchObject({ count: 7, bought: true });
  });

  it('undo by action id leaves a later unrelated edit intact', async () => {
    rows = [row('milk'), row('bread')];
    const { result } = await mount();
    let removed: string | undefined;
    await act(async () => { removed = await result.current.removeItem('milk'); });
    await act(async () => { await result.current.changeCount('bread', 1); });
    await act(async () => { expect(await result.current.undo(removed)).toBe('milk'); });
    expect(result.current.items.find(item => item.id === 'milk')).toBeTruthy();
    expect(result.current.items.find(item => item.id === 'bread')?.count).toBe(2);
  });

  it('preserves a rejected undo for retry and never reports success', async () => {
    const { result } = await mount();
    await act(async () => { await result.current.addItem('milk'); });
    vi.mocked(fetch).mockImplementation((url, init) => init?.method === 'DELETE' ? Promise.resolve(response({ error: 'Conflict' }, 409)) : serve(String(url), init));
    await act(async () => { await expect(result.current.undo()).rejects.toThrow(); });
    expect(readUndoStack('ann')).toHaveLength(1);
    expect(result.current.items).toHaveLength(1);
    vi.mocked(fetch).mockImplementation(serve);
    await act(async () => { expect(await result.current.undo()).toBe('milk'); });
    expect(result.current.items).toHaveLength(0);
  });

  it('captures only bought ids when clearing offline', async () => {
    rows = [row('milk', { bought: true }), row('bread')];
    const { result } = await mount();
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    await act(async () => { await result.current.clearBought(); });
    expect(readMutations()[0].body).toEqual({ ids: ['milk'] });
    expect(result.current.items.map(item => item.id)).toEqual(['bread']);
  });

  it('does not repeat a successful add when only saving undo fails',async()=>{
    const {result}=await mount();
    const put=IDBObjectStore.prototype.put;
    const spy=vi.spyOn(IDBObjectStore.prototype,'put').mockImplementation(function(this:IDBObjectStore,value:unknown,...args:[IDBValidKey?]) {
      if((value as {key:string}).key.startsWith('undo_stack_v2:')) throw new DOMException('Full','QuotaExceededError');
      return put.call(this,value,...args);
    });
    await act(async()=>{expect(await result.current.addItem('milk')).toMatchObject({name:'milk'});});
    expect(rows).toHaveLength(1);expect(readSnapshot('ann')?.items).toHaveLength(1);spy.mockRestore();
  });

  it('restarts a stalled queue on socket reconnect', async () => {
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: 'milk', name: 'milk', count: 1, list: 'ann', bought: false } });
    vi.mocked(fetch).mockRejectedValue(new TypeError('offline'));
    renderHook(() => useShoppingList('ann', 'ann'));
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await act(async () => { await Promise.resolve(); });
    vi.mocked(fetch).mockImplementation(serve);
    await act(async () => { sockets.handlers.connect(); });
    await waitFor(() => expect(queuedMutationCount()).toBe(0));
    expect(rows).toHaveLength(1);
  });
});
