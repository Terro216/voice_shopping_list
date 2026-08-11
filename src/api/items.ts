import { request, ApiError, NetworkError } from './client';
import { enqueueMutation } from './offlineQueue';

export type Item = {
  id: string;
  name: string;
  count: number;
  username: string;
  bought: boolean;
  bought_at?: number | null;
};

export type Suggestion = {
  name: string;
  uses: number;
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
    if (err instanceof NetworkError) {
      enqueueMutation({ url, method, body });
      return;
    }
    throw err;
  }
};

export const fetchItems = (username: string): Promise<Item[]> =>
  request<Item[]>(`/api/items?username=${encodeURIComponent(username)}`);

export const fetchSuggestions = (username: string, q = ''): Promise<Suggestion[]> =>
  request<Suggestion[]>(
    `/api/items/suggestions?username=${encodeURIComponent(username)}&q=${encodeURIComponent(q)}`,
  );

export const createItem = (item: Item): Promise<void> => sendOrQueue('/api/items', 'POST', item);

export const changeItemCount = (id: string, username: string, delta: number): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}/count`, 'PATCH', { username, delta });

export const renameItem = (id: string, username: string, name: string): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}`, 'PATCH', { username, name });

export const setItemBought = (id: string, username: string, bought: boolean): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}/bought`, 'PATCH', { username, bought });

export const clearBoughtItems = (username: string): Promise<void> =>
  sendOrQueue(`/api/items/bought?username=${encodeURIComponent(username)}`, 'DELETE');

export const deleteItem = (id: string, username: string): Promise<void> =>
  sendOrQueue(
    `/api/items/${encodeURIComponent(id)}?username=${encodeURIComponent(username)}`,
    'DELETE',
  );
