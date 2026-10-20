import { getAccountId } from './client';
import type { ListSummary } from './lists';

const key = () => `list_catalog_v1:${getAccountId()}`;
export const readCatalog = (): ListSummary[] => {
  try {
    const value = JSON.parse(localStorage.getItem(key()) ?? '[]');
    return Array.isArray(value) ? value.filter(entry => typeof entry?.id === 'string' && typeof entry.name === 'string') : [];
  } catch { return []; }
};
export const writeCatalog = (lists: ListSummary[]) => {
  try { localStorage.setItem(key(), JSON.stringify(lists)); } catch { /* Keep the session usable. */ }
};
export const clearCatalog = () => localStorage.removeItem(key());
