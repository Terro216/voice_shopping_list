import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import {
  Item,
  fetchItems,
  createItem,
  changeItemCount,
  deleteItem,
  generateItemId,
} from '../api/items';
import { syncOfflineQueue } from '../api/offlineQueue';

const MAX_COUNT = 999;

const sameList = (a: Item[], b: Item[]) =>
  a.length === b.length && a.every((item, i) => item.id === b[i].id && item.count === b[i].count);

export const useShoppingList = (username: string) => {
  const [items, setItems] = useState<Item[]>([]);

  // Mutation callbacks read the latest items through this ref so they can stay
  // referentially stable instead of being re-created on every list change.
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

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
      socket.emit('join_list', username);
      if (firstConnect) {
        firstConnect = false;
        return;
      }
      loadItems(true);
    });
    socket.on('list_updated', () => loadItems(true));

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
  }, [loadItems, username]);

  const changeCount = useCallback(
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

  const addItem = useCallback(
    async (name: string, count = 1) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      // Saying "молоко" twice should bump the existing entry, not duplicate it.
      const existing = itemsRef.current.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (existing) {
        return changeCount(existing.id, count);
      }

      const newItem: Item = { id: generateItemId(), name: trimmed, count, username };
      setItems((prev) => [...prev, newItem]);
      try {
        await createItem(newItem);
      } catch {
        toast.error(`Failed to add "${trimmed}"`);
        loadItems();
      }
    },
    [username, changeCount, loadItems],
  );

  const removeItem = useCallback(
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

  return { items, addItem, removeItem, changeCount };
};
