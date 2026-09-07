import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import {
  Item,
  ItemEdit,
  fetchItems,
  fetchDeletedItems,
  createItem,
  changeItemCount,
  updateItem as updateItemRequest,
  setItemBought,
  clearBoughtItems,
  deleteItem,
  restoreItem as restoreItemRequest,
  purgeDeletedItems,
  reorderItems,
  generateItemId,
  moveItem as moveItemRequest,
  itemExpectation,
  type ItemExpectation,
} from '../api/items';
import { readSnapshot, writeSnapshot } from '../api/listCache';
import {
  UndoAction,
  UndoEntry,
  UNDO_STACK_LIMIT,
  readUndoStack,
  writeUndoStack,
} from '../api/undoStack';
import {
  QUEUE_CHANGED_EVENT,
  queuedMutationCount,
  syncOfflineQueue,
} from '../api/offlineQueue';
import { ApiError, CLIENT_ID, getToken, notifyAuthExpired } from '../api/client';
import { sameName } from '../utils/wordForms';
import { itemFingerprint } from '../utils/conversation';
import { useT } from '../i18n';

import { convertQuantity, isValidQuantity, quantityLimit, roundQuantity, type Unit } from '../../shared/quantity.js';

const sameList = (a: Item[], b: Item[]) =>
  a.length === b.length &&
  a.every(
    (item, i) =>
      item.id === b[i].id &&
      item.name === b[i].name &&
      (item.note ?? null) === (b[i].note ?? null) &&
      item.count === b[i].count &&
      (item.unit ?? null) === (b[i].unit ?? null) &&
      item.bought === b[i].bought,
  );

export const useShoppingList = (list: string, viewer: string) => {
  const { t } = useT();
  // Start from the last known contents so a shop with no signal shows the list
  // instead of an empty screen; the network refresh replaces it when it lands.
  const [items, setItems] = useState<Item[]>(() => readSnapshot(list)?.items ?? []);
  const [deletedItems, setDeletedItems] = useState<Item[]>([]);
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
      writeSnapshot(list, next);
    },
    [list],
  );

  // ---- undo stack (persisted, so it survives a reload in the shop) ----

  const undoStackRef = useRef<UndoEntry[]>(readUndoStack(list));

  const pushUndo = useCallback(
    (label: string, action: UndoAction) => {
      undoStackRef.current.push({ label, action });
      if (undoStackRef.current.length > UNDO_STACK_LIMIT) undoStackRef.current.shift();
      writeUndoStack(list, undoStackRef.current);
    },
    [list],
  );

  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // The drawer costs a request per list refresh, so it is only kept in step
  // while it is actually open — not forever after the first time it was.
  const deletedVisibleRef = useRef(false);

  const loadDeleted = useCallback(async () => {
    try {
      const data = await fetchDeletedItems(list);
      // The drawer is a convenience — but it is rendered inside the list, so
      // anything other than an array here would take the whole screen down
      // with it rather than just showing nothing.
      setDeletedItems(Array.isArray(data) ? data : []);
    } catch {
      // An empty drawer is better than an error page.
    }
  }, [list]);

  /** Told by the drawer whether anyone is looking at it. */
  const watchDeleted = useCallback(
    (visible: boolean) => {
      deletedVisibleRef.current = visible;
      if (visible) void loadDeleted();
    },
    [loadDeleted],
  );

  /** Mirrors a deletion into the open drawer instead of waiting for a refetch. */
  const noteDeleted = useCallback((item: Item) => {
    if (!deletedVisibleRef.current) return;
    setDeletedItems((prev) => [{ ...item, deleted_at: Date.now() }, ...prev]);
  }, []);

  const loadItems = useCallback(
    async (notifyOnChange = false) => {
      if (queuedMutationCount() > 0) return;
      try {
        const data = await fetchItems(list);
        if (queuedMutationCount() > 0) return;
        setAccessDenied(false);
        if (notifyOnChange && !sameList(itemsRef.current, data)) {
          toast(tRef.current('listUpdated'), { icon: '🔄', id: 'remote-update' });
        }
        applyItems(() => data);
        if (deletedVisibleRef.current) void loadDeleted();
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
    [list, applyItems, loadDeleted],
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
      socket.emit('join_list', { list });
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
    const handleQueueChange = () => {
      setPendingCount(queuedMutationCount());
      if (navigator.onLine && queuedMutationCount() > 0) void runSync();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener(QUEUE_CHANGED_EVENT, handleQueueChange);

    return () => {
      socket.disconnect();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener(QUEUE_CHANGED_EVENT, handleQueueChange);
    };
  }, [loadItems, runSync, list]);

  // ---- raw operations: optimistic update + request, no undo recording ----

  const applyAdd = useCallback(
    async (item: Item) => {
      // Re-adding something that is in the deleted drawer takes it back out.
      setDeletedItems((prev) => prev.filter((entry) => entry.id !== item.id));
      applyItems((prev) => [...prev.filter((entry) => entry.id !== item.id), item]);
      try {
        await createItem(item);
        return true;
      } catch {
        toast.error(tRef.current('addFailed', { name: item.name }));
        loadItems();
        return false;
      }
    },
    [applyItems, loadItems],
  );

  const applyRemove = useCallback(
    async (id: string) => {
      const removed = itemsRef.current.find((item) => item.id === id);
      applyItems((prev) => prev.filter((item) => item.id !== id));
      // Deleting only moves the item to the drawer, so mirror that locally
      // instead of waiting for a refetch to reveal it.
      if (removed) noteDeleted(removed);
      try {
        await deleteItem(id, list);
      } catch {
        loadItems();
      }
    },
    [list, applyItems, loadItems, noteDeleted],
  );

  const applyCount = useCallback(
    async (id: string, delta: number, expectedUnit?: Unit | null) => {
      const before = itemsRef.current.find((item) => item.id === id);
      if (!before || (expectedUnit !== undefined && expectedUnit !== (before.unit ?? null))) return;
      applyItems((prev) =>
        prev
          .map((item) =>
            item.id === id
              ? { ...item, count: Math.min(quantityLimit(item.unit), Math.max(0, roundQuantity(item.count + delta))) }
              : item,
          )
          .filter((item) => item.count > 0),
      );
      // Counting down to zero is a deletion on the server, so it lands in the
      // drawer like any other — show it there rather than only after a refetch.
      if (before && before.count + delta <= 0) noteDeleted(before);
      try {
        await changeItemCount(id, list, delta, before.unit ?? null);
        return true;
      } catch {
        loadItems();
        return false;
      }
    },
    [list, applyItems, loadItems, noteDeleted],
  );

  const applyBought = useCallback(
    async (id: string, bought: boolean) => {
      applyItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, bought, bought_at: bought ? Date.now() : null } : item,
        ),
      );
      try {
        await setItemBought(id, list, bought);
        return true;
      } catch {
        loadItems();
        return false;
      }
    },
    [list, applyItems, loadItems],
  );

  const applyEdit = useCallback(
    async (id: string, edit: ItemEdit, expected?: ItemExpectation) => {
      const previous = itemsRef.current.find((item) => item.id === id);
      applyItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...edit } : item)));
      try {
        await updateItemRequest(id, list, edit, expected);
        return true;
      } catch {
        if (previous) applyItems((prev) => prev.map((item) => item.id === id ? previous : item));
        await loadItems();
        return false;
      }
    },
    [list, applyItems, loadItems],
  );

  /** Puts the active items in the given id order; anything else keeps its place. */
  const applyOrder = useCallback(
    async (ids: string[]) => {
      applyItems((prev) => {
        const byId = new Map(prev.map((item) => [item.id, item]));
        const ordered: Item[] = [];
        for (const id of ids) {
          const item = byId.get(id);
          if (item && !item.bought) {
            ordered.push(item);
            byId.delete(id);
          }
        }
        // Whatever the caller did not mention (bought items, a row added by a
        // collaborator mid-drag) keeps its relative order behind the rest.
        return [...ordered, ...prev.filter((item) => byId.has(item.id))];
      });
      try {
        await reorderItems(list, ids);
      } catch {
        loadItems();
      }
    },
    [list, applyItems, loadItems],
  );

  // ---- public operations: record an undo entry, then apply ----

  const changeCount = useCallback(
    async (id: string, delta: number) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item || !isValidQuantity(Math.abs(delta), item.unit)) return;
      const next = Math.min(quantityLimit(item.unit), Math.max(0, roundQuantity(item.count + delta)));
      const appliedDelta = roundQuantity(next - item.count);
      if (!appliedDelta) return;
      if (next <= 0) {
        pushUndo(item.name, { kind: 'restoreItems', items: [{ ...item }] });
      } else {
        pushUndo(item.name, { kind: 'changeCount', id, delta: -appliedDelta, unit: item.unit ?? null });
      }
      return applyCount(id, appliedDelta);
    },
    [applyCount, pushUndo],
  );

  const addItem = useCallback(
    async (name: string, count = 1, details: Pick<Item, 'unit' | 'note'> = {}) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const unit = details.unit ?? null;
      const note = details.note?.trim().replace(/\s+/g, ' ') || null;
      if (!isValidQuantity(count, unit)) { toast.error(tRef.current('invalidQuantity')); return; }
      if (note && note.length > 200) { toast.error(tRef.current('noteTooLong')); return; }
      const candidates = itemsRef.current.filter((item) =>
        (item.note ?? null) === note && isValidQuantity(convertQuantity(count, unit, item.unit), item.unit),
      );

      // Saying "молоко" twice should bump the existing entry, not duplicate it.
      // Dictation rarely repeats a word in the same grammatical form, so a
      // near-match on the ending counts too — «молоко 4» then «два молока» is
      // one product, and used to become two rows. An exact match still wins.
      const existing =
        candidates.find((item) => item.name.toLowerCase() === trimmed.toLowerCase()) ??
        candidates.find((item) => sameName(item.name, trimmed));
      if (existing) {
        if (existing.bought) {
          // Re-adding something already checked off puts it back on the list.
          pushUndo(existing.name, { kind: 'setBought', id: existing.id, bought: true });
          return await applyBought(existing.id, false) ? itemsRef.current.find((item) => item.id === existing.id) : undefined;
        }
        return await changeCount(existing.id, convertQuantity(count, unit, existing.unit)!)
          ? itemsRef.current.find((item) => item.id === existing.id) : undefined;
      }

      const newItem: Item = {
        id: generateItemId(),
        name: trimmed,
        note,
        unit,
        count,
        list_id: list,
        bought: false,
        bought_at: null,
      };
      pushUndo(trimmed, { kind: 'removeItem', id: newItem.id });
      return await applyAdd(newItem) ? itemsRef.current.find((item) => item.id === newItem.id) : undefined;
    },
    [list, changeCount, applyAdd, applyBought, pushUndo],
  );

  const removeItem = useCallback(
    async (id: string) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item) return;
      pushUndo(item.name, { kind: 'restoreItems', items: [{ ...item }] });
      await applyRemove(id);
    },
    [applyRemove, pushUndo],
  );

  const editItem = useCallback(
    async (id: string, edit: ItemEdit, expected?: Item) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item || (expected && itemFingerprint(item) !== itemFingerprint(expected))) return false;

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
      if (edit.count !== undefined || edit.unit !== undefined) {
        const count = edit.count ?? item.count;
        const unit = edit.unit === undefined ? (item.unit ?? null) : edit.unit;
        if (!isValidQuantity(count, unit)) { toast.error(tRef.current('invalidQuantity')); return; }
        if (count !== item.count || unit !== (item.unit ?? null)) { next.count = count; next.unit = unit; }
      }
      if (Object.keys(next).length === 0) return true;

      const previous: ItemEdit = {};
      if (next.name !== undefined) previous.name = item.name;
      if (next.note !== undefined) previous.note = item.note ?? null;
      if (next.count !== undefined || next.unit !== undefined) { previous.count = item.count; previous.unit = item.unit ?? null; }

      if (!await applyEdit(id, next, expected ? itemExpectation(expected) : undefined)) return false;
      pushUndo(item.name, { kind: 'editItem', id, edit: previous });
      return true;
    },
    [applyEdit, pushUndo],
  );

  const applyMove = useCallback(async (item: Item, from: string, to: string, expected?: ItemExpectation) => {
    const moved = await moveItemRequest(item.id, from, to, expected) ?? { ...item, list_id: to };
    const source = from === list ? itemsRef.current : (readSnapshot(from)?.items ?? []);
    const target = to === list ? itemsRef.current : (readSnapshot(to)?.items ?? []);
    const sourceNext = source.filter((entry) => entry.id !== item.id);
    const targetNext = [...target.filter((entry) => entry.id !== item.id), moved];
    writeSnapshot(from, sourceNext);
    writeSnapshot(to, targetNext);
    applyItems(() => list === from ? sourceNext : targetNext);
    return moved;
  }, [list, applyItems]);

  const moveItem = useCallback(async (id: string, destination: string, expected: Item) => {
    const item = itemsRef.current.find((entry) => entry.id === id);
    if (!item || destination === list || itemFingerprint(item) !== itemFingerprint(expected)) return false;
    try {
      const moved = await applyMove(item, list, destination, itemExpectation(item));
      pushUndo(item.name, { kind: 'moveItem', item: moved, from: destination, to: list });
      return true;
    } catch {
      await loadItems();
      return false;
    }
  }, [list, applyMove, pushUndo, loadItems]);

  const setBought = useCallback(
    async (id: string, bought: boolean) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (!item || item.bought === bought) return;
      pushUndo(item.name, { kind: 'setBought', id, bought: !bought });
      await applyBought(id, bought);
    },
    [applyBought, pushUndo],
  );

  const toggleBought = useCallback(
    (id: string) => {
      const item = itemsRef.current.find((i) => i.id === id);
      if (item) return setBought(id, !item.bought);
    },
    [setBought],
  );

  /** Called after a drag settles: `ids` is the active items in their new order. */
  const reorder = useCallback(
    async (ids: string[]) => {
      const before = itemsRef.current.filter((item) => !item.bought).map((item) => item.id);
      if (before.length === ids.length && before.every((id, i) => id === ids[i])) return;
      pushUndo(tRef.current('orderLabel'), { kind: 'reorder', ids: before });
      await applyOrder(ids);
    },
    [applyOrder, pushUndo],
  );

  const clearBought = useCallback(async () => {
    const boughtItems = itemsRef.current.filter((item) => item.bought).map((item) => ({ ...item }));
    if (boughtItems.length === 0) return;

    pushUndo(`${tRef.current('bought')} (${boughtItems.length})`, {
      kind: 'restoreItems',
      items: boughtItems,
    });

    applyItems((prev) => prev.filter((item) => !item.bought));
    try {
      await clearBoughtItems(list);
      if (deletedVisibleRef.current) void loadDeleted();
    } catch {
      loadItems();
    }
  }, [list, applyItems, loadItems, loadDeleted, pushUndo]);

  // ---- the deleted drawer ----

  const restoreDeleted = useCallback(
    async (id: string) => {
      const item = deletedItems.find((entry) => entry.id === id);
      setDeletedItems((prev) => prev.filter((entry) => entry.id !== id));
      if (item) {
        applyItems((prev) => [
          ...prev.filter((entry) => entry.id !== id),
          { ...item, bought: false, bought_at: null, deleted_at: null },
        ]);
        pushUndo(item.name, { kind: 'removeItem', id });
      }
      try {
        await restoreItemRequest(id, list);
      } catch {
        loadItems();
      }
    },
    [deletedItems, list, applyItems, loadItems, pushUndo],
  );

  const purgeDeleted = useCallback(async () => {
    setDeletedItems([]);
    try {
      await purgeDeletedItems(list);
    } catch {
      void loadDeleted();
    }
  }, [list, loadDeleted]);

  // ---- undo ----

  const runUndoAction = useCallback(
    async (action: UndoAction) => {
      switch (action.kind) {
        case 'removeItem':
          return applyRemove(action.id);
        case 'restoreItems':
          // Sequential on purpose: restoring a whole cleared cart must land in
          // the order it was in, and each POST assigns the next position.
          for (const item of action.items) await applyAdd(item);
          return;
        case 'changeCount':
          return applyCount(action.id, action.delta, action.unit ?? null);
        case 'setBought':
          return applyBought(action.id, action.bought);
        case 'editItem':
          return applyEdit(action.id, action.edit);
        case 'moveItem':
          await applyMove(action.item, action.from, action.to);
          return;
        case 'reorder':
          return applyOrder(action.ids);
      }
    },
    [applyAdd, applyRemove, applyCount, applyBought, applyEdit, applyOrder, applyMove],
  );

  /**
   * True when an entry can still be carried out. A stack restored from a
   * previous session can point at items somebody else has since removed;
   * skipping those beats reporting a failure the user cannot act on.
   */
  const isApplicable = (action: UndoAction) => {
    switch (action.kind) {
      case 'changeCount':
        return itemsRef.current.some((item) => item.id === action.id && (action.unit ?? null) === (item.unit ?? null));
      case 'removeItem':
      case 'setBought':
      case 'editItem':
        return itemsRef.current.some((item) => item.id === action.id);
      default:
        return true;
    }
  };

  /** Reverts the most recent action; returns its label, or null if nothing to undo. */
  const undo = useCallback(async () => {
    while (undoStackRef.current.length > 0) {
      const entry = undoStackRef.current.pop()!;
      writeUndoStack(list, undoStackRef.current);
      if (!isApplicable(entry.action)) continue;
      try {
        const result = await runUndoAction(entry.action);
        if (result === false) throw new Error('Undo failed');
      } catch (error) {
        undoStackRef.current.push(entry);
        writeUndoStack(list, undoStackRef.current);
        throw error;
      }
      return entry.label;
    }
    return null;
  }, [list, runUndoAction]);

  const otherViewers = viewers.filter((user) => user !== viewer);

  return {
    items,
    deletedItems,
    otherViewers,
    isOffline,
    pendingCount,
    accessDenied,
    addItem,
    removeItem,
    editItem,
    moveItem,
    getItems: () => itemsRef.current,
    changeCount,
    setBought,
    toggleBought,
    reorder,
    clearBought,
    watchDeleted,
    restoreDeleted,
    purgeDeleted,
    undo,
  };
};
