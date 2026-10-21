import { getAccountId, getToken } from './client';
import { readLocal, transactLocal, writeLocal } from './localStore';
import { Item } from './items';

/**
 * Last known contents of each list, so opening the app in a shop with no signal
 * shows the list instead of an empty screen. The offline queue already survives
 * a reload; without this the items it refers to did not.
 */
const KEY_PREFIX = 'list_snapshot_v2:';


export const snapshotKey = (list: string, account = getAccountId()) => `${KEY_PREFIX}${account}:${list}`;
const key = snapshotKey;

export type Snapshot = {
  items: Item[];
  savedAt: number;
  version?: number;
  confirmedAt?: number;
  dirty?: boolean;
};

export const readSnapshot = (list: string): Snapshot | null => {
  try {
    const legacy = getToken() && localStorage.getItem('username') && getAccountId().startsWith('legacy:');
    const raw = readLocal(key(list)) ?? (legacy ? localStorage.getItem(`list_snapshot_v1:${list}`) : null);
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
    return { ...parsed, items, savedAt: Number(parsed.savedAt) || 0 };
  } catch {
    return null;
  }
};

export const writeSnapshot = (list: string, items: Item[], metadata: Partial<Omit<Snapshot,'items'|'savedAt'>> = {}) => {
  const account=getAccountId();
  const name=snapshotKey(list,account);
  return transactLocal(records => {
    if (metadata.confirmedAt) {
      const pending=[...records.entries()].some(([key,value])=> {
        if (!key.startsWith(`mutation_v3:${account}:`)) return false;
        let entry;
        try { entry=JSON.parse(value); } catch { return false; }
        if (!entry || typeof entry.url !== 'string') return false;
        if (entry.failure) return false;
        const url=new URL(entry.url,location.origin);
        return [entry.body?.list,entry.body?.username,entry.body?.destination,url.searchParams.get('list')].includes(list);
      });
      if (pending) return {result:false,changes:[]};
    }
    let previous: Partial<Snapshot> | null = null;
    try { previous=JSON.parse(records.get(name) ?? 'null'); } catch { /* A fresh server snapshot repairs a damaged cache. */ }
    if (metadata.version !== undefined && previous?.version !== undefined && previous.version > metadata.version) return {result:false,changes:[]};
    return {result:true,changes:[[name,JSON.stringify({ ...metadata, items, savedAt:Date.now() })]]};
  });
};

export const removeSnapshot = (list: string) => writeLocal(key(list),null);
export const clearSnapshots = () => {
  const prefix=`${KEY_PREFIX}${getAccountId()}:`;
  return transactLocal(records=>({result:undefined,changes:[...records.keys()].filter(key=>key.startsWith(prefix)).map(key=>[key,null])}));
};
