import { registerSW } from 'virtual:pwa-register';

/**
 * Service-worker updates used to install themselves in the background and then
 * sit there until the app happened to be closed and reopened — so a fix could
 * be live for days without reaching a phone that never fully quits the PWA.
 * Now the new version announces itself and reloading is one tap.
 */
export const watchForUpdates = (onUpdateReady: (applyUpdate: () => void) => void) => {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh: () => onUpdateReady(() => updateSW(true)),
  });
};
