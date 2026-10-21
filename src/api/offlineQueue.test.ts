import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { enqueueMutation, syncOfflineQueue, queuedMutationCount } from './offlineQueue';
import { AUTH_EXPIRED_EVENT } from './client';

const jsonResponse = (status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify({}), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

describe('offlineQueue', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('replays queued mutations in order with current auth headers', async () => {
    localStorage.setItem('token', 'fresh-token');
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    await enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200));
    vi.stubGlobal('fetch', fetchMock);

    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 2, rejected: 0, remaining: 0 });
    expect(queuedMutationCount()).toBe(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe('/api/items');
    expect(fetchMock.mock.calls[1][0]).toBe('/api/items/1/count');
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer fresh-token');
  });

  it('drops a mutation the server rejected for good', async () => {
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(400)));
    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 0, rejected: 1, remaining: 0 });
    expect(queuedMutationCount()).toBe(0);
  });

  it('keeps a correction appended while its preceding add is being replayed', async () => {
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: 'milk' } });
    let release!: (response: Response) => void;
    const first = new Promise<Response>((resolve) => { release = resolve; });
    const fetchMock = vi.fn().mockReturnValueOnce(first).mockResolvedValue(jsonResponse(200));
    vi.stubGlobal('fetch', fetchMock);
    const syncing = syncOfflineQueue();
    await enqueueMutation({ url: '/api/items/milk', method: 'PATCH', body: { count: 3 } });
    release(jsonResponse(200));
    expect(await syncing).toEqual({ sent: 2, rejected: 0, remaining: 0 });
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual(['/api/items', '/api/items/milk']);
  });

  it('preserves measured item payloads and rejects a stale unit delta on replay', async () => {
    const body = { id: 'measured', name: 'молоко', list: 'ann', count: 1.5, unit: 'l', note: 'Безлактозное' };
    await enqueueMutation({ url: '/api/items', method: 'POST', body });
    await enqueueMutation({ url: '/api/items/measured/count', method: 'PATCH', body: { list: 'ann', delta: 0.1, expectedUnit: 'l' } });
    const fetchMock = vi.fn().mockResolvedValueOnce(jsonResponse(200)).mockResolvedValueOnce(jsonResponse(409));
    vi.stubGlobal('fetch', fetchMock);
    expect(await syncOfflineQueue()).toEqual({ sent: 1, rejected: 1, remaining: 0 });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(body);
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toMatchObject({ delta: 0.1, expectedUnit: 'l' });
  });

  it('keeps a rate-limited mutation queued for the next attempt', async () => {
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    await enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(429));
    vi.stubGlobal('fetch', fetchMock);

    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 0, rejected: 0, remaining: 2 });
    expect(queuedMutationCount()).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(1); // stops at the first retryable failure
  });

  it('keeps a server error queued rather than losing the change', async () => {
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(503)));
    const result = await syncOfflineQueue();

    expect(result.remaining).toBe(1);
    expect(queuedMutationCount()).toBe(1);
  });

  it('keeps everything and signals an expired session on 401', async () => {
    localStorage.setItem('token', 'stale-token');
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '2' } });

    const onExpired = vi.fn();
    window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(401)));

    const result = await syncOfflineQueue();
    window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired);

    expect(result).toEqual({ sent: 0, rejected: 0, remaining: 2 });
    expect(queuedMutationCount()).toBe(2);
    expect(onExpired).toHaveBeenCalledTimes(1);
  });

  it('stores a token the server refreshed during the replay', async () => {
    localStorage.setItem('token', 'old-token');
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(200, { 'X-Renewed-Token': 'renewed-token' })),
    );
    await syncOfflineQueue();

    expect(localStorage.getItem('token')).toBe('renewed-token');
  });

  it('keeps the mutation and the rest of the queue on network failure', async () => {
    await enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    await enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);

    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 0, rejected: 0, remaining: 2 });
    expect(queuedMutationCount()).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(1); // stops at the first failure, keeps order
  });

  it('retains unowned legacy data for explicit recovery', async () => {
    localStorage.setItem('offline_queue', JSON.stringify([{ url: '/x', options: {} }]));
    vi.stubGlobal('fetch', vi.fn());

    await syncOfflineQueue();

    expect(localStorage.getItem('offline_queue')).not.toBeNull();
  });
});
