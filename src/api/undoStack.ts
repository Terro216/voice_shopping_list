import { Item, ItemEdit } from './items';

/**
 * Undo entries as data rather than closures.
 *
 * The stack used to hold functions, which meant it died with the page: closing
 * the app in a shop, or a reload after the phone woke up, silently threw away
 * every safety net. Describing each undo as a plain value lets it be written to
 * localStorage and picked up by the next session.
 */
export type UndoAction =
  | { kind: 'removeItem'; id: string }
  | { kind: 'restoreItems'; items: Item[] }
  | { kind: 'changeCount'; id: string; delta: number }
  | { kind: 'setBought'; id: string; bought: boolean }
  | { kind: 'editItem'; id: string; edit: ItemEdit }
  | { kind: 'reorder'; ids: string[] };

export type UndoEntry = {
  label: string;
  action: UndoAction;
};

export const UNDO_STACK_LIMIT = 20;

const KEY_PREFIX = 'undo_stack_v1:';

const key = (list: string) => `${KEY_PREFIX}${list}`;

const isEntry = (value: unknown): value is UndoEntry => {
  if (!value || typeof value !== 'object') return false;
  const entry = value as UndoEntry;
  return typeof entry.label === 'string' && typeof entry.action?.kind === 'string';
};

export const readUndoStack = (list: string): UndoEntry[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key(list)) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(isEntry).slice(-UNDO_STACK_LIMIT) : [];
  } catch {
    return [];
  }
};

export const writeUndoStack = (list: string, stack: UndoEntry[]) => {
  try {
    if (stack.length === 0) localStorage.removeItem(key(list));
    else localStorage.setItem(key(list), JSON.stringify(stack.slice(-UNDO_STACK_LIMIT)));
  } catch {
    // Storage full or disabled: undo still works for this session, it just will
    // not outlive it. Never worth failing the action that is being recorded.
  }
};

export const clearUndoStacks = () => {
  for (const name of Object.keys(localStorage)) {
    if (name.startsWith(KEY_PREFIX)) localStorage.removeItem(name);
  }
};
