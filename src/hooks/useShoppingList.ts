import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import {
  Item,
  fetchItems,
  createItem,
  changeItemCount,
  setItemBought,
  clearBoughtItems,
  deleteItem,
  generateItemId,
} from '../api/items';
import { syncOfflineQueue } from '../api/offlineQueue';

const MAX_COUNT = 999;
const UNDO_STACK_LIMIT = 20;

type UndoEntry = {
  label: string;
  run: () => Promise<void>;
};

const sameList = (a: Item[], b: Item[]) =>
  a.length === b.length &&
  a.every(
    (item, i) => item.id === b[i].id && item.count === b[i].count && item.bought === b[i].bought,
  );

export const useShoppingList = (username: string, viewer: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [viewers, setViewers] = useState<string[]>([]);

  // Mutation callbacks read the latest items through this ref so they can stay
  // referentially stable instead of being re-created on every list change.
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const undoStackRef = useRef<UndoEntry[]>([]);
  const pushUndo = (label: string, run: () => Promise<void>) => {
    undoStackRef.current.push({ label, run });
    if (undoStackRef.current.length > UNDO_STACK_LIMIT) undoStackRef.current.shift();
  };

  const loadItems = useCallback(
    async (notifyOnChange = false) => {
      try {
        const data = await fetchItems(username);
        setItems((prev) => {
          if (notifyOnChange && !sameList(prev, data)) {
            toast('List was updated by someone else', { icon: '🔄', id: 'remote-update' });
          }
          return data;
        });
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    },
    [username],
  );

  useEffect(() => {
    loadItems();

    const socket = io();
    let firstConnect = true;
    socket.on('connect', () => {
      // Room membership dies with the connection — re-join on every (re)connect
      // and catch up on whatever was missed while disconnected.
      socket.emit('join_list', { list: username, user: viewer });
      if (firstConnect) {
        firstConnect = false;
        return;
      }
      loadItems(true);
    });
    socket.on('list_updated', () => loadItems(true));
    socket.on('presence', (users: unknown) => {
      setViewers(Array.isArray(users) ? users.filter((u): u is string => typeof u === 'string') : []);
    });

    const handleOnline = () => {
      toast.success('Back online! Syncing data...');
      syncOfflineQueue().then(() => loadItems());
    };
    const handleOffline = () => {
      toast.error('Offline mode. Changes will be saved locally.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      socket.disconnect();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadItems, username, viewer]);

  // ---- raw operations: optimistic update + request, no undo recording ----

  const applyAdd = useCallback(
    async (item: Item) => {
      setItems((prev) => [...prev, item]);
      try {
        await createItem(item);
      } catch {
        toast.error(`Failed to add "${item.name}"`);
        loadItems();
      }
    },
    [loadItems],
  );

  const applyRemove = useCallback(
    async (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      try {
        await deleteItem(id, username);
      } catch {
        loadItems();
      }
    },
    [username, loadItems],
  );

  const applyCount = useCallback(
    async (id: string, delta: number) => {
      setItems((prev) =>
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
    [username, loadItems],
  );

  const applyBought = useCallback(
    async (id: string, bought: boolean) => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, bought } : item)));
      try {
        await setItemBought(id, username, bought);
      } catch {
        loadItems();
      }
    },
    [username, loadItems],
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

      const newItem: Item = { id: generateItemId(), name: trimmed, count, username, bought: false };
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

    pushUndo(`bought items (${boughtItems.length})`, async () => {
      for (const item of boughtItems) {
        await applyAdd(item);
      }
    });

    setItems((prev) => prev.filter((item) => !item.bought));
    try {
      await clearBoughtItems(username);
    } catch {
      loadItems();
    }
  }, [username, applyAdd, loadItems]);

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
    addItem,
    removeItem,
    changeCount,
    setBought,
    toggleBought,
    clearBought,
    undo,
  };
};
