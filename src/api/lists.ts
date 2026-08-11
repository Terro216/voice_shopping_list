import { request } from './client';

export type ListSummary = {
  name: string;
  owned: boolean;
  members: string[];
};

export const fetchLists = () => request<ListSummary[]>('/api/lists');

export const fetchShareToken = () => request<{ token: string }>('/api/lists/share');

export const rotateShareToken = () =>
  request<{ token: string }>('/api/lists/share/rotate', { method: 'POST' });

/** Redeems an invite token; the caller becomes a member of the list it names. */
export const joinList = (token: string) =>
  request<{ list: string }>('/api/lists/join', { method: 'POST', body: { token } });

export const leaveList = (list: string) =>
  request('/api/lists/leave', { method: 'POST', body: { list } });

export const removeMember = (list: string, member: string) =>
  request('/api/lists/members', { method: 'DELETE', body: { list, member } });

export const fetchMembers = (list: string) =>
  request<{ owner: string; members: string[] }>(
    `/api/lists/members?list=${encodeURIComponent(list)}`,
  );
