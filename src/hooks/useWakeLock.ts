import { useEffect } from 'react';

/**
 * Keeps the screen awake while `active` (e.g. during a voice session in the
 * store). Re-acquires the lock when the tab becomes visible again, because the
 * browser silently releases it on tab switch.
 */
export const useWakeLock = (active: boolean) => {
  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) return;

    let lock: WakeLockSentinel | null = null;
    let cancelled = false;

    const acquire = async () => {
      try {
        lock = await navigator.wakeLock.request('screen');
      } catch {
        // denied (battery saver etc.) — not worth surfacing
      }
    };

    void acquire();

    const onVisibilityChange = () => {
      if (!cancelled && document.visibilityState === 'visible') void acquire();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      lock?.release().catch(() => {});
    };
  }, [active]);
};
