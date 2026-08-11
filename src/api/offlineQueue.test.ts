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
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

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
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(400)));
    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 0, rejected: 1, remaining: 0 });
    expect(queuedMutationCount()).toBe(0);
  });

  it('keeps a rate-limited mutation queued for the next attempt', async () => {
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(429));
    vi.stubGlobal('fetch', fetchMock);

    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 0, rejected: 0, remaining: 2 });
    expect(queuedMutationCount()).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(1); // stops at the first retryable failure
  });

  it('keeps a server error queued rather than losing the change', async () => {
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(503)));
    const result = await syncOfflineQueue();

    expect(result.remaining).toBe(1);
    expect(queuedMutationCount()).toBe(1);
  });

  it('keeps everything and signals an expired session on 401', async () => {
    localStorage.setItem('token', 'stale-token');
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '2' } });

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
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse(200, { 'X-Renewed-Token': 'renewed-token' })),
    );
    await syncOfflineQueue();

    expect(localStorage.getItem('token')).toBe('renewed-token');
  });

  it('keeps the mutation and the rest of the queue on network failure', async () => {
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);

    const result = await syncOfflineQueue();

    expect(result).toEqual({ sent: 0, rejected: 0, remaining: 2 });
    expect(queuedMutationCount()).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(1); // stops at the first failure, keeps order
  });

  it('discards the legacy v1 queue', async () => {
    localStorage.setItem('offline_queue', JSON.stringify([{ url: '/x', options: {} }]));
    vi.stubGlobal('fetch', vi.fn());

    await syncOfflineQueue();

    expect(localStorage.getItem('offline_queue')).toBeNull();
  });
});
