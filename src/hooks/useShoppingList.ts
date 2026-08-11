import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import {
  Item,
  ItemEdit,
  fetchItems,
  createItem,
  changeItemCount,
  updateItem as updateItemRequest,
  setItemBought,
  clearBoughtItems,
  deleteItem,
  generateItemId,
} from '../api/items';
import { readSnapshot, writeSnapshot } from '../api/listCache';
import {
  QUEUE_CHANGED_EVENT,
  queuedMutationCount,
  syncOfflineQueue,
} from '../api/offlineQueue';
import { ApiError, CLIENT_ID, getToken, notifyAuthExpired } from '../api/client';
import { useT } from '../i18n';

const MAX_COUNT = 999;
const UNDO_STACK_LIMIT = 20;

type UndoEntry = {
  label: string;
  run: () => Promise<void>;
};

const sameList = (a: Item[], b: Item[]) =>
  a.length === b.length &&
  a.every(
    (item, i) =>
      item.id === b[i].id &&
      item.name === b[i].name &&
      (item.note ?? null) === (b[i].note ?? null) &&
      item.count === b[i].count &&
      item.bought === b[i].bought,
  );

export const useShoppingList = (username: string, viewer: string) => {
  const { t } = useT();
  // Start from the last known contents so a shop with no signal shows the list
  // instead of an empty screen; the network refresh replaces it when it lands.
  const [items, setItems] = useState<Item[]>(() => readSnapshot(username)?.items ?? []);
  const [viewers, setViewers] = useState<string[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingCount, setPendingCount] = useState(queuedMutationCount);
  const [accessDenied, setAccessDenied] = useState(false);

  // Mutation callbacks read the latest items through this ref, and every write
  // goes through `applyItems` so the ref is current *synchronously* — two adds
  // fired from one utterance both have to see the first one's result, which a
  // ref synced in an effect could not guarantee.
  const itemsRef = useRef(items);

  const applyItems = useCallback(
    (updater: (prev: Item[]) => Item[]) => {
      const next = updater(itemsRef.current);
      itemsRef.current = next;
      setItems(next);
      writeSnapshot(username, next);
    },
    [username],
  );

  const undoStackRef = useRef<UndoEntry[]>([]);
  const pushUndo = (label: string, run: () => Promise<void>) => {
    undoStackRef.current.push({ label, run });
    if (undoStackRef.current.length > UNDO_STACK_LIMIT) undoStackRef.current.shift();
  };

  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  const loadItems = useCallback(
    async (notifyOnChange = false) => {
      try {
        const data = await fetchItems(username);
        setAccessDenied(false);
        if (notifyOnChange && !sameList(itemsRef.current, data)) {
          toast(tRef.current('listUpdated'), { icon: '🔄', id: 'remote-update' });
        }
        applyItems(() => data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 403) {
          setAccessDenied(true);
          return;
        }
        // Anything else (offline, server hiccup) keeps whatever is on screen —
        // the cached list is far more useful than a blank one.
        console.error('Error fetching items:', err);
      }
    },
    [username, applyItems],
  );

  const runSync = useCallback(async () => {
    const result = await syncOfflineQueue();
    setPendingCount(queuedMutationCount());
    if (result.rejected > 0) {
      toast.error(tRef.current('syncFailed', { count: result.rejected }));
    }
    if (result.sent > 0 || result.rejected > 0) await loadItems();
  }, [loadItems]);

  useEffect(() => {
    loadItems();
    if (navigator.onLine && queuedMutationCount() > 0) void runSync();

    // A callback, not a fixed object: reconnects then present whatever token is
    // stored now, including one the server renewed since this socket was made.
    const socket = io({ auth: (cb) => cb({ token: getToken() }) });
    let firstConnect = true;
    socket.on('connect', () => {
      // Room membership dies with the connection — re-join on every (re)connect
      // and catch up on whatever was missed while disconnected.
      socket.emit('join_list', { list: username });
      if (firstConnect) {
        firstConnect = false;
        return;
      }
      loadItems(true);
    });
    socket.on('connect_error', (err: Error) => {
      if (err.message === 'unauthorized') notifyAuthExpired();
    });
    socket.on('list_updated', (payload: { actor?: string | null } | undefined) => {
      // Our own change is already on screen optimistically; refetching it would
      // only risk flashing the pre-update value back at the user.
      if (payload?.actor && payload.actor === CLIENT_ID) return;
      loadItems(true);
    });
    socket.on('presence', (users: unknown) => {
      setViewers(
        Array.isArray(users) ? users.filter((u): u is string => typeof u === 'string') : [],
      );
    });

    const handleOnline = () => {
      setIsOffline(false);
      toast.success(tRef.current('backOnline'), { id: 'connectivity' });
      void runSync().then(() => loadItems());
    };
    const handleOffline = () => {
      setIsOffline(true);
      toast(tRef.current('offlineMode'), { icon: '📴', id: 'connectivity' });
    };
    const handleQueueChange = () => setPendingCount(queuedMutationCount());

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener(QUEUE_CHANGED_EVENT, handleQueueChange);

    return () => {
      socket.disconnect();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener(QUEUE_CHANGED_EVENT, handleQueueChange);
    };
  }, [loadItems, runSync, username]);

  // ---- raw operations: optimistic update + request, no undo recording ----

  const applyAdd = useCallback(
    async (item: Item) => {
      applyItems((prev) => [...prev, item]);
      try {
        await createItem(item);
      } catch {
        toast.error(tRef.current('addFailed', { name: item.name }));
        loadItems();
      }
    },
    [applyItems, loadItems],
  );

  const applyRemove = useCallback(
    async (id: string) => {
      applyItems((prev) => prev.filter((item) => item.id !== id));
      try {
        await deleteItem(id, username);
      } catch {
        loadItems();
      }
    },
    [username, applyItems, loadItems],
  );

  const applyCount = useCallback(
    async (id: string, delta: number) => {
      applyItems((prev) =>
        prev
          .map((item) =>
            item.id === id
              ? { ...item, count: Math.min(MAX_COUNT, Math.max(0, item.count + delta)) }
              : item,
          )
          .filter((item) => item.count > 0),
      );
      try {
        await changeItemCount(id, username, delta);
      } catch {
        loadItems();
      }
    },
    [username, applyItems, loadItems],
  );

  const applyBought = useCallback(
    async (id: string, bought: boolean) => {
      applyItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, bought, bought_at: bought ? Date.now() : null } : item,
        ),
      );
      try {
        await setItemBought(id, username, bought);
      } catch {
        loadItems();
      }
    },
    [username, applyItems, loadItems],
  );

  const applyEdit = useCallback(
    async (id: string, edit: ItemEdit) => {
      applyItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...edit } : item)));
      try {
        await updateItemRequest(id, username, edit);
      } catch {
        loadItems();
      }
    },
    [username, applyItems, loadItems],
  );

  // ---- public operations: record an undo entry, then apply ----

  const changeCount = useCallback(
    async (id: string, delta: number) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item) return;
      const snapshot = { ...item };
      if (item.count + delta <= 0) {
        pushUndo(item.name, () => applyAdd(snapshot));
      } else {
        pushUndo(item.name, () => applyCount(id, -delta));
      }
      await applyCount(id, delta);
    },
    [applyAdd, applyCount],
  );

  const addItem = useCallback(
    async (name: string, count = 1) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      // Saying "молоко" twice should bump the existing entry, not duplicate it.
      const existing = itemsRef.current.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (existing) {
        if (existing.bought) {
          // Re-adding something already checked off puts it back on the list.
          pushUndo(existing.name, () => applyBought(existing.id, true));
          await applyBought(existing.id, false);
          return;
        }
        return changeCount(existing.id, count);
      }

      const newItem: Item = {
        id: generateItemId(),
        name: trimmed,
        note: null,
        count,
        username,
        bought: false,
        bought_at: null,
      };
      pushUndo(trimmed, () => applyRemove(newItem.id));
      await applyAdd(newItem);
    },
    [username, changeCount, applyAdd, applyRemove, applyBought],
  );

  const removeItem = useCallback(
    async (id: string) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item) return;
      const snapshot = { ...item };
      pushUndo(item.name, () => applyAdd(snapshot));
      await applyRemove(id);
    },
    [applyAdd, applyRemove],
  );

  const editItem = useCallback(
    async (id: string, edit: ItemEdit) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item) return;

      const next: ItemEdit = {};
      if (edit.name !== undefined) {
        const trimmed = edit.name.trim();
        if (!trimmed) return; // a nameless item is not an edit, it is a deletion
        if (trimmed !== item.name) next.name = trimmed;
      }
      if (edit.note !== undefined) {
        const trimmed = edit.note?.trim() || null;
        if (trimmed !== (item.note ?? null)) next.note = trimmed;
      }
      if (Object.keys(next).length === 0) return;

      const previous: ItemEdit = {};
      if (next.name !== undefined) previous.name = item.name;
      if (next.note !== undefined) previous.note = item.note ?? null;

      pushUndo(item.name, () => applyEdit(id, previous));
      await applyEdit(id, next);
    },
    [applyEdit],
  );

  const setBought = useCallback(
    async (id: string, bought: boolean) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item || item.bought === bought) return;
      pushUndo(item.name, () => applyBought(id, !bought));
      await applyBought(id, bought);
    },
    [applyBought],
  );

  const toggleBought = useCallback(
    (id: string) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (item) return setBought(id, !item.bought);
    },
    [setBought],
  );

  const clearBought = useCallback(async () => {
    const boughtItems = itemsRef.current.filter((item) => item.bought).map((item) => ({ ...item }));
    if (boughtItems.length === 0) return;

    pushUndo(`${tRef.current('bought')} (${boughtItems.length})`, async () => {
      for (const item of boughtItems) {
        await applyAdd(item);
      }
    });

    applyItems((prev) => prev.filter((item) => !item.bought));
    try {
      await clearBoughtItems(username);
    } catch {
      loadItems();
    }
  }, [username, applyAdd, applyItems, loadItems]);

  /** Reverts the most recent action; returns its label, or null if nothing to undo. */
  const undo = useCallback(async () => {
    const entry = undoStackRef.current.pop();
    if (!entry) return null;
    await entry.run();
    return entry.label;
  }, []);

  const otherViewers = viewers.filter((user) => user !== viewer);

  return {
    items,
    otherViewers,
    isOffline,
    pendingCount,
    accessDenied,
    addItem,
    removeItem,
    editItem,
    changeCount,
    setBought,
    toggleBought,
    clearBought,
    undo,
  };
};
