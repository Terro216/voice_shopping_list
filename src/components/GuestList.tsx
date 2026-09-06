import { useEffect, useState } from 'react';
import { ApiError } from '../api/client';
import { fetchGuestList, type GuestItem, type GuestListData } from '../api/guest';
import { LANGUAGES, useT, type Lang } from '../i18n';
import styles from '../App.module.css';
import { formatQuantity } from '../utils/quantity';

type Props = {
  token: string;
  lang: Lang;
  setLang: (lang: Lang) => void;
  onAuthenticate: (mode: 'login' | 'register') => void;
};

const GuestRow = ({ item, lang }: { item: GuestItem; lang: Lang }) => (
  <li className={`${styles.guestRow} ${item.bought ? styles.itemBought : ''}`}>
    <span className={styles.itemText}>
      <span className={styles.itemName}>{item.name}</span>
      {item.note && <span className={styles.itemNote}>{item.note}</span>}
    </span>
    <span className={styles.itemCount}>{formatQuantity(item, lang)}</span>
  </li>
);

// Separate from ShoppingList: guests never mount editing, voice, sockets,
// offline replay, purchase history or persistent list caches.
export const GuestList = ({ token, lang, setLang, onAuthenticate }: Props) => {
  const { t } = useT();
  const [data, setData] = useState<GuestListData | null>(null);
  const [error, setError] = useState<'unavailable' | 'network' | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let pending = false;
    let revoked = false;

    const refresh = async () => {
      if (pending || revoked || controller.signal.aborted) return;
      clearTimeout(timer);
      if (document.visibilityState === 'hidden') return;
      pending = true;
      try {
        const next = await fetchGuestList(token, controller.signal);
        if (controller.signal.aborted) return;
        setData(next);
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) return;
        revoked = err instanceof ApiError && [400, 403, 404].includes(err.status);
        // Do not keep displaying a snapshot after losing access to its link.
        setData(null);
        setError(revoked ? 'unavailable' : 'network');
      } finally {
        pending = false;
        if (!controller.signal.aborted && !revoked) timer = setTimeout(refresh, 15000);
      }
    };

    void refresh();
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('online', refresh);
    return () => {
      controller.abort();
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('online', refresh);
    };
  }, [token, retry]);

  const activeItems = data?.items.filter((item) => !item.bought) ?? [];
  const boughtItems = data?.items.filter((item) => item.bought) ?? [];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{data?.name ?? t('appName')}</h1>
        <select value={lang} aria-label={t('language')} onChange={(e) => setLang(e.target.value as Lang)}>
          {LANGUAGES.map((option) => (
            <option key={option.lang} value={option.lang}>{option.label}</option>
          ))}
        </select>
      </header>
      <p className={styles.listBar}>{t('guestMode')}</p>

      <aside className={styles.guestBanner} aria-label={t('guestUnlock')}>
        <strong>{t('guestUnlock')}</strong>
        <p>{t('guestBenefits')}</p>
        <div className={styles.guestActions}>
          <button type="button" className={styles.guestRegister} onClick={() => onAuthenticate('register')}>
            {t('registerHere')}
          </button>
          <button type="button" className={styles.linkButton} onClick={() => onAuthenticate('login')}>
            {t('login')}
          </button>
        </div>
      </aside>

      {error ? (
        <div className={styles.empty}>
          <p role="alert">{t(error === 'unavailable' ? 'guestUnavailable' : 'guestLoadFailed')}</p>
          {error === 'network' && (
            <button type="button" onClick={() => setRetry((value) => value + 1)}>{t('guestRetry')}</button>
          )}
        </div>
      ) : !data ? (
        <p role="status">{t('guestLoading')}</p>
      ) : (
        <div className={styles.list}>
          {data.items.length === 0 && <p className={styles.empty}>{t('guestEmpty')}</p>}
          {activeItems.length > 0 && (
            <ul className={styles.guestItems} aria-label={t('activeList')}>
              {activeItems.map((item) => <GuestRow key={item.id} item={item} lang={lang} />)}
            </ul>
          )}
          {boughtItems.length > 0 && (
            <>
              <h2 className={styles.boughtHeader}>{t('bought')} ({boughtItems.length})</h2>
              <ul className={styles.guestItems} aria-label={t('bought')}>
                {boughtItems.map((item) => <GuestRow key={item.id} item={item} lang={lang} />)}
              </ul>
            </>
          )}
        </div>
      )}
    </main>
  );
};
