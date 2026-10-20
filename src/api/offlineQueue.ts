import { ApiError, getAccountId, request, sessionKey } from './client';
import { writeSnapshot } from './listCache';
import type { Item } from './items';

export type QueuedMutation = { url: string; method: string; body?: unknown };
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
export const readMutations = (account = getAccountId()): StoredMutation[] => {
  const entries: StoredMutation[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const name = localStorage.key(i);
    if (!name?.startsWith(`${PREFIX}${account}:`)) continue;
    try {
      const entry = JSON.parse(localStorage.getItem(name) ?? 'null');
      if (entry?.account === account && typeof entry.id === 'string' && typeof entry.url === 'string') entries.push(entry);
    } catch { /* A damaged entry is retained for recovery, never sent blindly. */ }
  }
  return entries.sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id));
};
export const queuedMutationCount = () => readMutations().filter(entry => !entry.failure).length;
export const failedMutations = () => readMutations().filter(entry => entry.failure);
export const discardMutation = (id: string) => {
  localStorage.removeItem(key({ account: getAccountId(), id }));
  epoch++;
  announce();
};

export const enqueueMutation = (mutation: QueuedMutation) => {
  const account = getAccountId();
  const pending = readMutations(account);
  const entry: StoredMutation = {
    ...mutation, account, id: crypto.randomUUID(),
    createdAt: Math.max(Date.now(), (pending.at(-1)?.createdAt ?? 0) + 1),
  };
  // Storage failure must reach the caller: claiming "saved offline" would lose data.
  localStorage.setItem(key(entry), JSON.stringify(entry));
  epoch++;
  announce();
  return entry;
};

let flight: { session: string; promise: Promise<SyncResult> } | undefined;

export const syncOfflineQueue = (): Promise<SyncResult> => {
  const session = sessionKey();
  if (flight?.session === session) return flight.promise;
  const account = getAccountId();
  const replay = async (): Promise<SyncResult> => {
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
        localStorage.removeItem(key(entry));
        sent++;
      } catch (error) {
        if (sessionKey() !== session) break;
        if (!(error instanceof ApiError) || error.status === 401 || error.status === 408 || error.status === 429 || error.status >= 500) {
          if (error instanceof ApiError && error.retryAfterMs) nextAttemptAt = Date.now() + error.retryAfterMs;
          break;
        }
        // Preserve rejected intent for review instead of silently losing it.
        localStorage.setItem(key(entry), JSON.stringify({ ...entry, failure: { status: error.status, message: error.message } }));
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
          if (sessionKey() === session && epoch === version && queuedMutationCount() === 0) writeSnapshot(list, items);
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
export const submitMutation = async <T = void>(url: string, method: string, body?: unknown): Promise<T | undefined> => {
  const entry = enqueueMutation({ url, method, body });
  if (navigator.onLine) await syncOfflineQueue();
  const raw = localStorage.getItem(key(entry));
  const settled: StoredMutation | null = raw ? JSON.parse(raw) : null;
  if (settled?.failure) {
    throw new ApiError(settled.failure.status, settled.failure.message);
  }
  return undefined;
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
