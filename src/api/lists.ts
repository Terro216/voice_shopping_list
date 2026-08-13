import { request } from './client';

/**
 * A list has an opaque id and a name its owner chose. The account's own first
 * list still has `id === username`, which is why invite links handed out before
 * lists had names keep working.
 */
export type ListSummary = {
  id: string;
  name: string;
  owner: string;
  owned: boolean;
  members: string[];
};

export const fetchLists = () => request<ListSummary[]>('/api/lists');

export const createList = (name: string) =>
  request<ListSummary>('/api/lists', { method: 'POST', body: { name } });

export const renameList = (id: string, name: string) =>
  request<{ id: string; name: string }>(`/api/lists/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { name },
  });

/** Deletes the list when the caller owns it, otherwise gives up their access. */
export const dropList = (id: string) =>
  request<{ left?: boolean; deleted?: boolean }>(`/api/lists/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });

export const fetchShareToken = (list: string) =>
  request<{ token: string }>(`/api/lists/share?list=${encodeURIComponent(list)}`);

export const rotateShareToken = (list: string) =>
  request<{ token: string }>('/api/lists/share/rotate', { method: 'POST', body: { list } });

/** Redeems an invite token; the caller becomes a member of the list it names. */
export const joinList = (token: string) =>
  request<{ list: string; name: string }>('/api/lists/join', { method: 'POST', body: { token } });

export const leaveList = (list: string) =>
  request('/api/lists/leave', { method: 'POST', body: { list } });

export const removeMember = (list: string, member: string) =>
  request('/api/lists/members', { method: 'DELETE', body: { list, member } });

export const fetchMembers = (list: string) =>
  request<{ owner: string; members: string[] }>(
    `/api/lists/members?list=${encodeURIComponent(list)}`,
  );
