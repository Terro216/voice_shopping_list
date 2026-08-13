import { request, ApiError, NetworkError } from './client';
import { enqueueMutation } from './offlineQueue';

export type Item = {
  id: string;
  name: string;
  /** Which one to grab: "тот, в красной пачке". */
  note?: string | null;
  count: number;
  /** The list this belongs to. Named `username` because a list used to be one. */
  username: string;
  bought: boolean;
  bought_at?: number | null;
  /** Manual order among the active items; rewritten by dragging a row. */
  position?: number | null;
  /** Set on items sitting in the list's "deleted" drawer. */
  deleted_at?: number | null;
};

/** Fields of an item that can be edited; omitting one leaves it untouched. */
export type ItemEdit = {
  name?: string;
  note?: string | null;
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

export const updateItem = (id: string, username: string, edit: ItemEdit): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}`, 'PATCH', { username, ...edit });

export const setItemBought = (id: string, username: string, bought: boolean): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}/bought`, 'PATCH', { username, bought });

export const clearBoughtItems = (username: string): Promise<void> =>
  sendOrQueue(`/api/items/bought?username=${encodeURIComponent(username)}`, 'DELETE');

export const deleteItem = (id: string, username: string): Promise<void> =>
  sendOrQueue(
    `/api/items/${encodeURIComponent(id)}?username=${encodeURIComponent(username)}`,
    'DELETE',
  );

/** Items in the list's "deleted" drawer, most recently removed first. */
export const fetchDeletedItems = (username: string): Promise<Item[]> =>
  request<Item[]>(`/api/items/deleted?username=${encodeURIComponent(username)}`);

export const restoreItem = (id: string, username: string): Promise<void> =>
  sendOrQueue(`/api/items/${encodeURIComponent(id)}/restore`, 'POST', { username });

export const purgeDeletedItems = (username: string): Promise<void> =>
  sendOrQueue(`/api/items/deleted?username=${encodeURIComponent(username)}`, 'DELETE');

/**
 * Rewrites the manual order. The whole visible order is sent, not a move, so a
 * request that gets replayed late cannot shuffle the list into something the
 * user never asked for — it is simply out of date and harmless.
 */
export const reorderItems = (username: string, ids: string[]): Promise<void> =>
  sendOrQueue('/api/items/order', 'PUT', { username, ids });
