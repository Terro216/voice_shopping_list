import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { enqueueMutation, syncOfflineQueue, queuedMutationCount, failedMutations, readMutations, submitMutation } from './offlineQueue';
import { request, AUTH_EXPIRED_EVENT } from './client';
import { readSnapshot, writeSnapshot } from './listCache';

const response = (body: unknown = {}, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });
const account = (id: string) => {
  localStorage.setItem('username', id);
  localStorage.setItem('token', `prefix.${btoa(JSON.stringify({ sub: id }))}.signature`);
};
beforeEach(() => { localStorage.clear(); account('alice'); });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('sync regressions', () => {
  it('never sends another account’s queued intent', async () => {
    enqueueMutation({ url: '/api/items/milk/count', method: 'PATCH', body: { delta: 1 } });
    account('bob');
    const fetch = vi.fn().mockResolvedValue(response());
    vi.stubGlobal('fetch', fetch);
    expect((await syncOfflineQueue()).sent).toBe(0);
    expect(fetch).not.toHaveBeenCalled();
    account('alice');
    await syncOfflineQueue();
    expect(fetch.mock.calls[0][1].headers.Authorization).toContain(localStorage.getItem('token'));
    expect(queuedMutationCount()).toBe(0);
  });

  it('retains the same operation id after an ambiguous response', async () => {
    enqueueMutation({ url: '/api/items/milk/count', method: 'PATCH', body: { delta: 1 } });
    const fetch = vi.fn().mockRejectedValueOnce(new TypeError('lost response')).mockResolvedValue(response());
    vi.stubGlobal('fetch', fetch);
    await syncOfflineQueue();
    expect(queuedMutationCount()).toBe(1);
    await syncOfflineQueue();
    expect(fetch.mock.calls[0][1].headers['X-Mutation-Id']).toBe(fetch.mock.calls[1][1].headers['X-Mutation-Id']);
    expect(queuedMutationCount()).toBe(0);
  });

  it('serializes rapid online writes', async () => {
    let release!: (value: Response) => void;
    const fetch = vi.fn().mockImplementationOnce(() => new Promise(resolve => { release = resolve; })).mockResolvedValue(response());
    vi.stubGlobal('fetch', fetch);
    const first = submitMutation('/first', 'PATCH', { bought: true });
    const second = submitMutation('/second', 'PATCH', { bought: false });
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    release(response());
    await Promise.all([first, second]);
    expect(fetch.mock.calls.map(call => call[0])).toEqual(['/first', '/second']);
  });

  it('stops an in-flight replay on session switch without adopting the old token', async () => {
    enqueueMutation({ url: '/head', method: 'POST' });
    enqueueMutation({ url: '/tail', method: 'POST' });
    let release!: (value: Response) => void;
    const fetch = vi.fn().mockImplementation(() => new Promise(resolve => { release = resolve; }));
    vi.stubGlobal('fetch', fetch);
    const replay = syncOfflineQueue();
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    account('bob');
    const token = localStorage.getItem('token');
    release(response({}, 200, { 'X-Renewed-Token': 'alice-renewed' }));
    await replay;
    expect(localStorage.getItem('token')).toBe(token);
    expect(readMutations('alice')).toHaveLength(2);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('retains rejected intent and isolates cached contents by immutable account', async () => {
    enqueueMutation({ url: '/edit', method: 'PATCH', body: { name: 'новая покупка' } });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({ error: 'Conflict' }, 409)));
    await syncOfflineQueue();
    expect(failedMutations()[0].body).toEqual({ name: 'новая покупка' });
    writeSnapshot('shared', [{ id: 'x', name: 'alice draft', count: 1, bought: false, list_id: 'shared' }]);
    account('bob');
    expect(failedMutations()).toHaveLength(0);
    expect(readSnapshot('shared')).toBeNull();
  });

  it('does not expire a newer session when an older request returns 401', async () => {
    let release!: (value: Response) => void;
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(resolve => { release = resolve; })));
    const expired = vi.fn();
    window.addEventListener(AUTH_EXPIRED_EVENT, expired);
    const pending = request('/api/lists').catch(error => error);
    account('bob');
    release(response({}, 401));
    await pending;
    expect(expired).not.toHaveBeenCalled();
    window.removeEventListener(AUTH_EXPIRED_EVENT, expired);
  });
});

it('two runtimes never discard an unacknowledged tail even without Web Locks', async () => {
  vi.resetModules();
  const first = await import('./offlineQueue');
  vi.resetModules();
  const second = await import('./offlineQueue');
  const deliveries: { url: string; resolve: (response: Response) => void; reject: (error: Error) => void }[] = [];
  vi.stubGlobal('fetch', vi.fn((url: string) => new Promise<Response>((resolve, reject) => deliveries.push({ url, resolve, reject }))));
  first.enqueueMutation({ url: '/head', method: 'POST' });
  first.enqueueMutation({ url: '/tail', method: 'POST' });
  const a = first.syncOfflineQueue();
  const b = second.syncOfflineQueue();
  await vi.waitFor(() => expect(deliveries).toHaveLength(2));
  deliveries[0].resolve(response());
  await vi.waitFor(() => expect(deliveries).toHaveLength(3));
  deliveries[1].resolve(response());
  await vi.waitFor(() => expect(deliveries).toHaveLength(4));
  expect(deliveries.map(item => item.url)).toEqual(['/head', '/head', '/tail', '/tail']);
  deliveries[2].reject(new TypeError('offline'));
  deliveries[3].reject(new TypeError('offline'));
  await Promise.all([a, b]);
  expect(first.queuedMutationCount()).toBe(1);
  expect(first.readMutations()[0].url).toBe('/tail');
});

it('times out a stalled response body while retaining an ambiguous operation', async () => {
  vi.useFakeTimers();
  try {
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => ({
      ok: true, status: 200, headers: new Headers(),
      json: () => new Promise((_resolve, reject) => init?.signal?.addEventListener('abort', () => reject(new TypeError('body aborted')))),
    })));
    const pending = submitMutation('/api/items/milk/count', 'PATCH', { delta: 1 });
    await vi.advanceTimersByTimeAsync(15_100);
    await pending;
    expect(queuedMutationCount()).toBe(1);
  } finally { vi.useRealTimers(); }
});
