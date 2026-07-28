import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  getPushPublicKey,
  getPushStatus,
  savePushSubscription,
  removePushSubscription,
  urlBase64ToUint8Array,
} from '../api/push';

type Props = {
  list: string;
};

type State = 'hidden' | 'off' | 'on' | 'busy';

const pushSupported = () =>
  'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

/**
 * Bell that subscribes THIS device to push notifications about the current
 * list. Renders nothing when push is unavailable (unsupported browser, no
 * service worker in dev, VAPID not configured on the server).
 */
export const PushToggle = ({ list }: Props) => {
  const [state, setState] = useState<State>('hidden');
  const publicKeyRef = useRef<string | null>(null);

  useEffect(() => {
    let stale = false;
    (async () => {
      if (!pushSupported()) return;
      try {
        const { key } = await getPushPublicKey();
        const registration = await navigator.serviceWorker.getRegistration();
        if (!key || !registration || stale) return;
        publicKeyRef.current = key;

        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          const { list: subscribedTo } = await getPushStatus(subscription.endpoint);
          if (!stale) setState(subscribedTo === list ? 'on' : 'off');
        } else if (!stale) {
          setState('off');
        }
      } catch {
        // leave hidden
      }
    })();
    return () => {
      stale = true;
    };
  }, [list]);

  const enable = async () => {
    setState('busy');
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast.error('Notifications are blocked in the browser');
        setState('off');
        return;
      }
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration || !publicKeyRef.current) throw new Error('no service worker');

      let subscription = await registration.pushManager.getSubscription();
      subscription ??= await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKeyRef.current) as BufferSource,
      });

      await savePushSubscription(subscription.toJSON(), list);
      setState('on');
      toast.success(`Notifications on for "${list}"`);
    } catch {
      toast.error('Could not enable notifications');
      setState('off');
    }
  };

  const disable = async () => {
    setState('busy');
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await removePushSubscription(subscription.endpoint).catch(() => {});
        await subscription.unsubscribe();
      }
      setState('off');
      toast('Notifications off', { icon: '🔕' });
    } catch {
      setState('on');
    }
  };

  if (state === 'hidden') return null;

  return (
    <button
      type="button"
      onClick={state === 'on' ? disable : enable}
      disabled={state === 'busy'}
      title={state === 'on' ? 'Disable notifications for this list' : 'Notify me about this list'}
      aria-label="Toggle push notifications"
    >
      {state === 'on' ? '🔔' : '🔕'}
    </button>
  );
};
