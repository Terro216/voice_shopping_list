// Web Push handlers, pulled into the generated service worker via
// workbox `importScripts` (see vite.config.ts).

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    // ignore malformed payloads
  }

  event.waitUntil(
    (async () => {
      // If the app is focused, the live socket sync already shows the change —
      // a notification would just be noise.
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const target = new URL(data.url || '/', self.location.origin);
      if (windows.some((w) => w.focused && new URL(w.url).searchParams.get('list') === target.searchParams.get('list'))) return;

      await self.registration.showNotification(data.title || 'Shopping list', {
        body: data.body || '',
        icon: '/icon.svg',
        badge: '/icon.svg',
        tag: data.tag || 'shopping-list',
        data: { url: data.url || '/' },
      });
    })(),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      if (windows.length > 0) {
        const win = windows[0];
        await win.focus();
        if (win.navigate) await win.navigate(url);
        return;
      }
      await self.clients.openWindow(url);
    })(),
  );
});
