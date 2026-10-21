import { readLocal, writeLocal, transactLocal } from './localStore';
import { getAccountId } from './client';
import { Item, ItemEdit, type ItemExpectation } from './items';
import type { Unit } from '../../shared/quantity.js';

/**
 * Undo entries as data rather than closures.
 *
 * The stack used to hold functions, which meant it died with the page: closing
 * the app in a shop, or a reload after the phone woke up, silently threw away
 * every safety net. Describing each undo as a plain value lets it be written to
 * IndexedDB and picked up by the next session.
 */
export type UndoAction =
  | { kind: 'group'; entries: UndoEntry[] }
  | { kind: 'removeItem'; id: string; expected?: ItemExpectation }
  | { kind: 'restoreItems'; items: Item[] }
  | { kind: 'changeCount'; id: string; delta: number; unit?: Unit | null }
  | { kind: 'setBought'; id: string; bought: boolean; expected?: ItemExpectation }
  | { kind: 'editItem'; id: string; edit: ItemEdit; expected?: ItemExpectation }
  | { kind: 'moveItem'; item: Item; from: string; to: string }
  | { kind: 'reorder'; ids: string[] };

export type UndoEntry = {
  id: string;
  label: string;
  action: UndoAction;
  summary?: string;
};

export type UndoGroup = { id: string; label: string };

export const UNDO_STACK_LIMIT = 20;

const KEY_PREFIX = 'undo_stack_v2:';

export const undoKey = (list: string) => `${KEY_PREFIX}${getAccountId()}:${list}`;

const isEntry = (value: unknown): value is UndoEntry => {
  if (!value || typeof value !== 'object') return false;
  const entry = value as UndoEntry;
  return typeof entry.label === 'string' && typeof entry.action?.kind === 'string';
};

export const readUndoStack = (list: string): UndoEntry[] => {
  try {
    const parsed = JSON.parse(readLocal(undoKey(list)) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(isEntry).slice(-UNDO_STACK_LIMIT) : [];
  } catch {
    return [];
  }
};

export const writeUndoStack = (list: string, stack: UndoEntry[]) => writeLocal(undoKey(list),stack.length ? JSON.stringify(stack.slice(-UNDO_STACK_LIMIT)) : null);

export const clearUndoStacks = () => {
  const prefix=`${KEY_PREFIX}${getAccountId()}:`;
  return transactLocal(records=>({result:undefined,changes:[...records.keys()].filter(key=>key.startsWith(prefix)).map(key=>[key,null])}));
};

/** Update against the latest committed stack so another tab cannot lose its tail. */
export const updateUndoStack = (list:string, update:(stack:UndoEntry[])=>UndoEntry[]) => {
  const key=undoKey(list);
  return transactLocal(records=>{
    const stack=update(JSON.parse(records.get(key) ?? '[]') as UndoEntry[]).slice(-UNDO_STACK_LIMIT);
    return {result:undefined,changes:[[key,stack.length?JSON.stringify(stack):null]]};
  });
};
