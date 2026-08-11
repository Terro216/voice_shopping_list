import { adoptRenewedToken, authHeaders, notifyAuthExpired } from './client';

export type QueuedMutation = {
  url: string;
  method: string;
  body?: unknown;
};

export type SyncResult = {
  /** Mutations the server accepted. */
  sent: number;
  /** Mutations the server rejected outright — they will never succeed. */
  rejected: number;
  /** Still queued: retryable failures, or everything after a stopped replay. */
  remaining: number;
};

// v2: entries store only url/method/body — auth headers are built at send time,
// so replays use the current token instead of whatever was stored back then.
const STORAGE_KEY = 'offline_queue_v2';
const LEGACY_KEY = 'offline_queue';

const readQueue = (): QueuedMutation[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeQueue = (queue: QueuedMutation[]) => {
  if (queue.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  }
};

export const QUEUE_CHANGED_EVENT = 'offline-queue-changed';

const announceQueueChange = () => window.dispatchEvent(new Event(QUEUE_CHANGED_EVENT));

export const enqueueMutation = (mutation: QueuedMutation) => {
  writeQueue([...readQueue(), mutation]);
  announceQueueChange();
};

export const queuedMutationCount = () => readQueue().length;

/** Statuses worth another attempt later rather than discarding the change. */
const isRetryable = (status: number) => status === 408 || status === 429 || status >= 500;

let syncInFlight = false;

/**
 * Replays queued mutations in order, stopping at the first entry that cannot be
 * settled so ordering is never broken.
 *
 * Only a real answer from the server settles a mutation: 2xx means applied, and
 * a 4xx that will never change (400/403/404/409) means dropping it is the only
 * honest option. Anything else — no connection, a rate limit, a server error,
 * or an expired token — keeps the entry queued. Silently discarding those was
 * how a week's offline shopping list could vanish the moment the token aged
 * out while the phone was in a basement.
 */
export const syncOfflineQueue = async (): Promise<SyncResult> => {
  if (syncInFlight) return { sent: 0, rejected: 0, remaining: queuedMutationCount() };
  syncInFlight = true;
  try {
    localStorage.removeItem(LEGACY_KEY); // v1 entries carried stale tokens — not replayable
    let queue = readQueue();
    let sent = 0;
    let rejected = 0;

    while (queue.length > 0) {
      const next = queue[0];
      let res: Response;
      try {
        res = await fetch(next.url, {
          method: next.method,
          headers: authHeaders(),
          body: next.body === undefined ? undefined : JSON.stringify(next.body),
        });
      } catch {
        break; // still offline — retry the remainder later
      }

      adoptRenewedToken(res);

      if (res.status === 401) {
        // The queue outlived the session. Keep everything and let the user log
        // back in; the replay resumes with a fresh token.
        notifyAuthExpired();
        break;
      }
      if (!res.ok && isRetryable(res.status)) break;

      if (res.ok) sent++;
      else rejected++;

      queue = queue.slice(1);
      writeQueue(queue);
    }

    if (sent > 0 || rejected > 0) announceQueueChange();
    return { sent, rejected, remaining: queue.length };
  } finally {
    syncInFlight = false;
  }
};
