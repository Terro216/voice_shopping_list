import { ApiError, getAccountId, request, sessionKey } from './client';
import { writeSnapshot } from './listCache';
import type { Item } from './items';
import { readLocal, localKeys, transactLocal, refreshLocal, type LocalChange } from './localStore';
import { projectMutation } from './projectMutation';

export type QueuedMutation = { url: string; method: string; body?: unknown; restoredItem?: Item };
export type StoredMutation = QueuedMutation & { id: string; account: string; createdAt: number; failure?: { status: number; message: string } };
export type SyncResult = { sent: number; rejected: number; remaining: number };
const PREFIX = 'mutation_v3:';
export const QUEUE_CHANGED_EVENT = 'offline-queue-changed';
const announce = () => window.dispatchEvent(new Event(QUEUE_CHANGED_EVENT));
const key = (entry: Pick<StoredMutation, 'account' | 'id'>) => `${PREFIX}${entry.account}:${entry.id}`;
let epoch = 0;
let nextAttemptAt = 0;
export const mutationEpoch = () => epoch;
export const retryDelay = () => Math.max(0, nextAttemptAt - Date.now());

// One storage key per operation: acknowledging a head never rewrites somebody
// else's tail. A browser lock serializes senders; server receipts also make a
// duplicate replay from older browsers harmless.
const parseMutations = (records: Iterable<[string,string]>, account: string): StoredMutation[] => {
  const entries: StoredMutation[]=[];
  for (const [name,value] of records) {
    if (!name.startsWith(`${PREFIX}${account}:`)) continue;
    try {
      const entry=JSON.parse(value);
      if (entry?.account===account && typeof entry.id==='string' && typeof entry.url==='string') entries.push(entry);
    } catch { /* Damaged records stay available for recovery. */ }
  }
  return entries.sort((a,b)=>a.createdAt-b.createdAt || a.id.localeCompare(b.id));
};
export const readMutations = (account=getAccountId()) => parseMutations(localKeys().map(name=>[name,readLocal(name) ?? 'null']),account);
export const queuedMutationCount = () => readMutations().filter(entry=>!entry.failure).length;
export const failedMutations = () => readMutations().filter(entry=>entry.failure);
export const discardMutation = async (id: string) => {
  const name=key({account:getAccountId(),id});
  await transactLocal(()=>({result:undefined,changes:[[name,null]]}));
  epoch++; announce();
};

export const enqueueMutation = async (mutation: QueuedMutation, replacing?: string) => {
  const account=getAccountId(), session=sessionKey();
  const entry=await transactLocal(records=>{
    if (sessionKey()!==session) throw new Error('Session changed');
    const pending=parseMutations(records,account);
    if (replacing && !pending.some(entry=>entry.id===replacing && entry.failure)) throw new Error('The rejected change is no longer available');
    const entry: StoredMutation={...mutation,account,id:crypto.randomUUID(),createdAt:Math.max(Date.now(),(pending.at(-1)?.createdAt ?? 0)+1)};
    const changes: LocalChange[]=[...(replacing?[[key({account,id:replacing}),null] as LocalChange]:[]),[key(entry),JSON.stringify(entry)],...projectMutation(records,entry)];
    return {result:entry,changes};
  });
  epoch++; announce();
  return entry;
};

let flight: { session: string; promise: Promise<SyncResult> } | undefined;

export const syncOfflineQueue = (): Promise<SyncResult> => {
  const session = sessionKey();
  if (flight?.session === session) return flight.promise;
  const account = getAccountId();
  const replay = async (): Promise<SyncResult> => {
    await refreshLocal();
    let sent = 0;
    let rejected = 0;
    const movedLists = new Set<string>();
    while (sessionKey() === session) {
      const entry = readMutations(account).find(entry => !entry.failure);
      if (!entry || retryDelay() > 0) break;
      try {
        await request(entry.url, { method: entry.method, body: entry.body, mutationId: entry.id });
        if (sessionKey() !== session) break;
        // Remove precisely the acknowledged id, even if another tab sent it too.
        await transactLocal(()=>({result:undefined,changes:[[key(entry),null]]}));
        sent++;
      } catch (error) {
        if (sessionKey() !== session) break;
        if (!(error instanceof ApiError) || error.status === 401 || error.status === 408 || error.status === 429 || error.status >= 500) {
          if (error instanceof ApiError && error.retryAfterMs) nextAttemptAt = Date.now() + error.retryAfterMs;
          break;
        }
        // Preserve rejected intent for review instead of silently losing it.
        await transactLocal(records=>({result:undefined,changes:records.has(key(entry)) ? [[key(entry),JSON.stringify({...entry,failure:{status:error.status,message:error.message}})]] : []}));
        rejected++;
      }
      epoch++;
      if (entry.url.endsWith('/move') && entry.body && typeof entry.body === 'object') {
        const body = entry.body as { list?: string; destination?: string };
        for (const list of [body.list, body.destination]) if (list) movedLists.add(list);
      }
    }
    if (sessionKey() === session && queuedMutationCount() === 0) {
      const version = epoch;
      await Promise.all([...movedLists].map(async list => {
        try {
          const items = await request<Item[]>(`/api/items?list=${encodeURIComponent(list)}`);
          if (sessionKey() === session && epoch === version && queuedMutationCount() === 0) await writeSnapshot(list, items, {confirmedAt:Date.now(),dirty:false});
        } catch { /* Keep the last snapshot. */ }
      }));
    }
    if (sent || rejected) announce();
    return { sent, rejected, remaining: readMutations(account).filter(entry => !entry.failure).length };
  };
  // Promise deferral publishes flight before any synchronous queue notification.
  const promise = Promise.resolve().then(() => navigator.locks
    ? navigator.locks.request(`shopping-sync:${account}`, replay)
    : replay()).finally(() => { if (flight?.promise === promise) flight = undefined; });
  flight = { session, promise };
  return promise;
};

/** All writes share one durable ordered path, including fast online taps. */
export const submitMutation = async <T = void>(url: string, method: string, body?: unknown, restoredItem?: Item): Promise<T | undefined> => {
  const entry = await enqueueMutation({ url, method, body, restoredItem });
  if (navigator.onLine) await syncOfflineQueue();
  const raw = readLocal(key(entry));
  const settled: StoredMutation | null = raw ? JSON.parse(raw) : null;
  if (settled?.failure) {
    throw new ApiError(settled.failure.status, settled.failure.message);
  }
  return undefined;
};

/** A reviewed conflict is a new intent; never reuse a rejected operation ID. */
export const replaceRejectedMutation = async (id: string, mutation: QueuedMutation) => {
  const entry=await enqueueMutation(mutation,id);
  if(navigator.onLine) await syncOfflineQueue();
  return entry;
};

// Pre-upgrade queues have no reliable account owner. Retain them for explicit
// recovery; assigning them to whichever account next logs in would be unsafe.
export const legacyMutations = (): QueuedMutation[] => {
  const entries: QueuedMutation[] = [];
  for (const name of Object.keys(localStorage)) {
    if (name !== 'offline_queue_v2' && name !== 'offline_queue' && !name.startsWith(`${PREFIX}legacy:`)) continue;
    try {
      const value = JSON.parse(localStorage.getItem(name) ?? 'null');
      for (const entry of Array.isArray(value) ? value : [value]) {
        if (!entry || typeof entry.url !== 'string') continue;
        let body = entry.body ?? entry.options?.body;
        if (typeof body === 'string') { try { body = JSON.parse(body); } catch { /* Retain literal draft. */ } }
        entries.push({ url: entry.url, method: entry.method ?? entry.options?.method ?? 'POST', body });
      }
    } catch { /* Keep damaged data in storage for recovery. */ }
  }
  return entries;
};
export const discardLegacyMutations = () => {
  for (const name of Object.keys(localStorage)) {
    if (name === 'offline_queue_v2' || name === 'offline_queue' || name.startsWith(`${PREFIX}legacy:`)) localStorage.removeItem(name);
  }
  announce();
};
