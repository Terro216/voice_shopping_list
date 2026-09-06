import { request } from './client';
import type { Item } from './items';

export type GuestItem = Pick<Item, 'id' | 'name' | 'note' | 'count' | 'unit' | 'bought'>;
export type GuestListData = { name: string; items: GuestItem[] };

export const fetchGuestList = (token: string, signal: AbortSignal) =>
  request<GuestListData>(`/api/guest/list?token=${encodeURIComponent(token)}`, {
    auth: false,
    cache: 'no-store',
    signal,
  });
