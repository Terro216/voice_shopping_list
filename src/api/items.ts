import { request, ApiError } from './client';
import { enqueueMutation } from './offlineQueue';

export type Item = {
  id: string;
  name: string;
  count: number;
  username: string;
};

export const generateItemId = () =>
  typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

/**
 * Mutations are optimistic-friendly: when the network is down (or the request
 * dies in transit) they land in the offline queue instead of failing. An HTTP
 * error is a real answer from the server and is thrown to the caller.
 */
const sendOrQueue = async (url: string, method: string, body?: unknown): Promise<void> => {
  if (!navigator.onLine) {
    enqueueMutation({ url, method, body });
    return;
  }
  try {
    await request(url, { method, body });
  } catch (err) {
    if (err instanceof ApiError) throw err;
    enqueueMutation({ url, method, body });
  }
};

export const fetchItems = (username: string): Promise<Item[]> =>
  request<Item[]>(`/api/items?username=${encodeURIComponent(username)}`);

export const createItem = (item: Item): Promise<void> => sendOrQueue('/api/items', 'POST', item);

export const changeItemCount = (id: string, username: string, delta: number): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}/count`, 'PATCH', { username, delta });

export const deleteItem = (id: string, username: string): Promise<void> =>
  sendOrQueue(
    `/api/items/${encodeURIComponent(id)}?username=${encodeURIComponent(username)}`,
    'DELETE',
  );
