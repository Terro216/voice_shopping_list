import { getAccountId, getToken } from './client';
import { Item } from './items';

/**
 * Last known contents of each list, so opening the app in a shop with no signal
 * shows the list instead of an empty screen. The offline queue already survives
 * a reload; without this the items it refers to did not.
 */
const KEY_PREFIX = 'list_snapshot_v2:';


const key = (list: string) => `${KEY_PREFIX}${getAccountId()}:${list}`;

export type Snapshot = {
  items: Item[];
  savedAt: number;
};

export const readSnapshot = (list: string): Snapshot | null => {
  try {
    const legacy = getToken() && localStorage.getItem('username') && getAccountId().startsWith('legacy:');
    const raw = localStorage.getItem(key(list)) ?? (legacy ? localStorage.getItem(`list_snapshot_v1:${list}`) : null);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return null;
    // Snapshots written before the column rename call the list `username`.
    // Reading them is what keeps a phone that updates offline, in a shop, from
    // opening onto an empty list.
    const items = (parsed.items as (Item & { username?: string })[]).map((item) => ({
      ...item,
      list_id: item.list_id ?? item.username ?? list,
    }));
    return { items, savedAt: Number(parsed.savedAt) || 0 };
  } catch {
    return null;
  }
};

export const writeSnapshot = (list: string, items: Item[]) => {
  try {
    const payload: Snapshot = { items: items, savedAt: Date.now() };
    localStorage.setItem(key(list), JSON.stringify(payload));
  } catch {
    // Quota exceeded or storage disabled — the cache is an optimisation, not a
    // requirement, so a failure here must not break the mutation that caused it.
  }
};

export const removeSnapshot = (list: string) => localStorage.removeItem(key(list));

export const clearSnapshots = () => {
  for (const name of Object.keys(localStorage)) {
    if (name.startsWith(`${KEY_PREFIX}${getAccountId()}:`) || name.startsWith('list_snapshot_v1:')) localStorage.removeItem(name);
  }
};
