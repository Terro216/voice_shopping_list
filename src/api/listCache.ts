import { Item } from './items';

/**
 * Last known contents of each list, so opening the app in a shop with no signal
 * shows the list instead of an empty screen. The offline queue already survives
 * a reload; without this the items it refers to did not.
 */
const KEY_PREFIX = 'list_snapshot_v1:';

// Enough for any realistic shopping list, small enough that a handful of shared
// lists cannot fill the localStorage quota.
const MAX_CACHED_ITEMS = 500;

const key = (list: string) => `${KEY_PREFIX}${list}`;

export type Snapshot = {
  items: Item[];
  savedAt: number;
};

export const readSnapshot = (list: string): Snapshot | null => {
  try {
    const raw = localStorage.getItem(key(list));
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
    const payload: Snapshot = { items: items.slice(0, MAX_CACHED_ITEMS), savedAt: Date.now() };
    localStorage.setItem(key(list), JSON.stringify(payload));
  } catch {
    // Quota exceeded or storage disabled — the cache is an optimisation, not a
    // requirement, so a failure here must not break the mutation that caused it.
  }
};

export const clearSnapshots = () => {
  for (const name of Object.keys(localStorage)) {
    if (name.startsWith(KEY_PREFIX)) localStorage.removeItem(name);
  }
};
