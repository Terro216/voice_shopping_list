import { getAccountId } from './client';
import { readLocal, writeLocal } from './localStore';
import type { ListSummary } from './lists';

const key = () => `list_catalog_v1:${getAccountId()}`;
export const readCatalog = (): ListSummary[] => {
  try {
    const value = JSON.parse(readLocal(key()) ?? '[]');
    return Array.isArray(value) ? value.filter(entry => typeof entry?.id === 'string' && typeof entry.name === 'string') : [];
  } catch { return []; }
};
export const writeCatalog = (lists: ListSummary[]) => {
  return writeLocal(key(),JSON.stringify(lists));
};
export const clearCatalog = () => writeLocal(key(),null);
