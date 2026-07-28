import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { enqueueMutation, syncOfflineQueue, queuedMutationCount } from './offlineQueue';

const jsonResponse = (status: number) =>
  new Response(JSON.stringify({}), { status, headers: { 'Content-Type': 'application/json' } });

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

    const sent = await syncOfflineQueue();

    expect(sent).toBe(true);
    expect(queuedMutationCount()).toBe(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toBe('/api/items');
    expect(fetchMock.mock.calls[1][0]).toBe('/api/items/1/count');
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer fresh-token');
  });

  it('drops a mutation once the server has answered, even with an error status', async () => {
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(400)));
    await syncOfflineQueue();

    expect(queuedMutationCount()).toBe(0);
  });

  it('keeps the mutation and the rest of the queue on network failure', async () => {
    enqueueMutation({ url: '/api/items', method: 'POST', body: { id: '1' } });
    enqueueMutation({ url: '/api/items/1/count', method: 'PATCH', body: { delta: 1 } });

    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);

    const sent = await syncOfflineQueue();

    expect(sent).toBe(false);
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
