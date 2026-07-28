import { authHeaders } from './client';

export type QueuedMutation = {
  url: string;
  method: string;
  body?: unknown;
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

export const enqueueMutation = (mutation: QueuedMutation) => {
  writeQueue([...readQueue(), mutation]);
};

export const queuedMutationCount = () => readQueue().length;

let syncInFlight = false;

/**
 * Replays queued mutations in order. Returns true if anything was sent.
 *
 * Once the server has replied — success or error — the mutation is settled and
 * dropped: replaying an HTTP error forever would never succeed and could
 * double-apply. Only a network failure keeps the entry (and everything after
 * it, to preserve ordering) for the next attempt.
 */
export const syncOfflineQueue = async (): Promise<boolean> => {
  if (syncInFlight) return false;
  syncInFlight = true;
  try {
    localStorage.removeItem(LEGACY_KEY); // v1 entries carried stale tokens — not replayable
    let queue = readQueue();
    let sentAnything = false;

    while (queue.length > 0) {
      const next = queue[0];
      try {
        await fetch(next.url, {
          method: next.method,
          headers: authHeaders(),
          body: next.body === undefined ? undefined : JSON.stringify(next.body),
        });
      } catch {
        break; // still offline — retry the remainder later
      }
      queue = queue.slice(1);
      writeQueue(queue);
      sentAnything = true;
    }

    return sentAnything;
  } finally {
    syncInFlight = false;
  }
};
