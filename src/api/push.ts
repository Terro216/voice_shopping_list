import { request } from './client';

export const getPushPublicKey = () =>
  request<{ key: string | null }>('/api/push/public-key', { auth: false });

export const getPushStatus = (endpoint: string) =>
  request<{ list: string | null }>(`/api/push/status?endpoint=${encodeURIComponent(endpoint)}`);

export const savePushSubscription = (subscription: PushSubscriptionJSON, list: string) =>
  request('/api/push/subscribe', { method: 'POST', body: { subscription, list } });

export const removePushSubscription = (endpoint: string) =>
  request('/api/push/subscribe', { method: 'DELETE', body: { endpoint } });

// applicationServerKey wants raw bytes, VAPID keys travel as URL-safe base64.
export const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  return Uint8Array.from(raw, (ch) => ch.charCodeAt(0));
};
