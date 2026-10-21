import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Toaster, ToastBar, toast, useToasterStore } from 'react-hot-toast';
import { Login } from './components/Login';
import { ShoppingList } from './components/ShoppingList';
import { GuestList } from './components/GuestList';
import { ApiError, AUTH_EXPIRED_EVENT, RATE_LIMITED_EVENT, CATALOG_CHANGED_EVENT, SESSION_CHANGED_EVENT, sessionKey, getAccountId, announceSessionChange } from './api/client';
import { fetchLists, joinList, type ListSummary } from './api/lists';
import { clearSnapshots } from './api/listCache';
import { readCatalog, writeCatalog, clearCatalog } from './api/catalogCache';
import { readMutations } from './api/offlineQueue';
import { storageFailed, LOCAL_STORE_CHANGED } from './api/localStore';
import { clearUndoStacks } from './api/undoStack';
import { useTheme } from './hooks/useTheme';
import { watchForUpdates } from './pwa';
import { LangProvider, translator, type Lang } from './i18n';
import styles from './App.module.css';

type Session = {
  username: string;
  token: string;
};

// Read synchronously so a stored session doesn't flash the login screen first.
const readStoredSession = (): Session | null => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  return username && token ? { username, token } : null;
};

const readStoredLang = (): Lang => (localStorage.getItem('lang') === 'en' ? 'en' : 'ru');

const readListParam = () => new URLSearchParams(window.location.search).get('list');

/** Keeps the address bar in step with the list on screen, without a reload. */
const writeListParam = (list: string | null) => {
  const url = new URL(window.location.href);
  url.searchParams.delete('join');
  if (list) url.searchParams.set('list', list);
  else url.searchParams.delete('list');
  window.history.replaceState({}, '', url);
};

// More than a few toasts at once is not information, it is a wall. Anything
// beyond this is dropped oldest-first as new ones arrive.
const TOAST_LIMIT = 3;

/** Keeps the stack of visible toasts short. */
const useToastLimit = () => {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((entry) => entry.visible)
      .slice(TOAST_LIMIT)
      .forEach((entry) => toast.dismiss(entry.id));
  }, [toasts]);
};

/**
 * Toasts that go away when tapped. In a shop they pile up over exactly the row
 * somebody is trying to read, and waiting out a timer with wet hands and a
 * basket is not a real option.
 */
const Notifications = () => {
  useToastLimit();
  return (
    <Toaster position="top-right" toastOptions={{ duration: 3500 }}>
      {(entry) => (
        <div
          className={styles.toastShell}
          onClick={() => toast.dismiss(entry.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) toast.dismiss(entry.id); }}
        >
          <ToastBar toast={entry} />
        </div>
      )}
    </Toaster>
  );
};

function App() {
  const [session, setSession] = useState<Session | null>(readStoredSession);
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const { theme, setTheme } = useTheme();
  const [lists, setLists] = useState<ListSummary[]>(readCatalog);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState(false);
  const catalogRequest = useRef(0);
  const [activeList, setActiveList] = useState<string | null>(() => readListParam() ?? localStorage.getItem(`last_list:${getAccountId()}`));
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const invite = new URLSearchParams(window.location.search).get('join');

  const t = useMemo(() => translator(lang), [lang]);
  const langValue = useMemo(() => ({ lang, t }), [lang, t]);

  const setLang = useCallback((next: Lang) => {
    localStorage.setItem('lang', next);
    setLangState(next);
  }, []);

  const handleLogin = (username: string, token: string) => {
    localStorage.setItem('session_generation', crypto.randomUUID());
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    // Deliberately keep the query string: someone opening a share link must
    // land on that list after logging in, not on their own.
    setLists(readCatalog());
    setSession({ username, token });
    announceSessionChange();
    setAuthMode(null);
  };

  const handleLogout = useCallback((preserveInvite = false) => {

    // The cached lists are somebody's shopping habits — they should not sit in
    // storage for whoever logs in on this device next. Same for the undo stacks,
    // which quote item names.
    if (!preserveInvite && readMutations().length === 0) { void Promise.all([clearSnapshots(), clearUndoStacks(), clearCatalog()]).catch(storageFailed); }
    localStorage.setItem('session_generation', crypto.randomUUID());
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    announceSessionChange();
    setSession(null);
    setLists([]);
    setActiveList(null);
    setAuthMode(null);
    if (!preserveInvite) writeListParam(null);
  }, []);

  // Returns the request so a caller that needs the catalog to be current before
  // its next step — creating a list and opening it — can wait for it.
  const refreshLists = useCallback(() => {
    if (!session) return Promise.resolve();
    const requestedSession = sessionKey();
    const requestId = ++catalogRequest.current;
    setCatalogLoading(true);
    return fetchLists()
      .then(async (data) => {
        if (sessionKey() !== requestedSession || requestId !== catalogRequest.current) return;
        setLists(data);
        await writeCatalog(data);
        setCatalogError(false);
      })
      .catch(() => { if (sessionKey() === requestedSession && requestId === catalogRequest.current) setCatalogError(true); })
      .finally(() => { if (requestId === catalogRequest.current) setCatalogLoading(false); });
  }, [session]);

  useEffect(() => {
    const refresh = () => { void refreshLists(); };
    const changed = () => {
      const next = readStoredSession();
      setSession(current => current?.username === next?.username && current?.token === next?.token ? current : next);
      setLists(readCatalog());
      if (next?.username !== session?.username) setActiveList(localStorage.getItem(`last_list:${getAccountId()}`));
    };
    const storage = (event: StorageEvent) => {
      if (event.key === 'token' || event.key === 'username' || event.key === 'session_generation') changed();
    };
    const local = (event: Event) => { if ((event as CustomEvent<{keys:string[]}>).detail.keys.includes(`list_catalog_v1:${getAccountId()}`)) setLists(readCatalog()); };
    window.addEventListener(LOCAL_STORE_CHANGED, local);
    window.addEventListener('storage', storage);
    window.addEventListener(CATALOG_CHANGED_EVENT, refresh);
    window.addEventListener(SESSION_CHANGED_EVENT, changed);
    window.addEventListener('focus', refresh);
    window.addEventListener('online', refresh);
    return () => {
      window.removeEventListener(LOCAL_STORE_CHANGED, local);
      window.removeEventListener('storage', storage);
      window.removeEventListener(CATALOG_CHANGED_EVENT, refresh);
      window.removeEventListener(SESSION_CHANGED_EVENT, changed);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('online', refresh);
    };
  }, [refreshLists, session?.username]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onAuthExpired = () => {
      handleLogout(true);
      toast.error(t('sessionExpired'));
    };
    // One id: a burst of throttled requests is still one thing to say.
    const onRateLimited = () => toast.error(t('rateLimited'), { id: 'rate-limited' });

    window.addEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
    window.addEventListener(RATE_LIMITED_EVENT, onRateLimited);
    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
      window.removeEventListener(RATE_LIMITED_EVENT, onRateLimited);
    };
  }, [handleLogout, t]);

  // Registering the worker is a once-per-page act, but the toast it eventually
  // shows has to be in whatever language is current *then* — hence the ref. An
  // effect that simply depended on `t` would register the worker again every
  // time somebody switched language.
  const tRef = useRef(t);
  tRef.current = t;

  // A new build is waiting: say so and let them take it when convenient.
  useEffect(() => {
    watchForUpdates((applyUpdate) => {
      toast(
        (instance) => (
          <span className={styles.toastWithAction}>
            {tRef.current('updateAvailable')}
            <button
              type="button"
              onClick={() => {
                toast.dismiss(instance.id);
                applyUpdate();
              }}
            >
              {tRef.current('updateAction')}
            </button>
          </span>
        ),
        { icon: '⬆️', id: 'sw-update', duration: Infinity },
      );
    });
  }, []);

  // Redeeming an invite is what grants access now, so it has to happen before
  // the list is opened — the list id alone no longer lets anyone in.
  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    const token = new URLSearchParams(window.location.search).get('join');
    if (!token) {
      refreshLists();
      return;
    }
    joinList(token)
      .then(({ list, name }) => {
        if (cancelled) return;
        toast.success(t('joinedList', { list: name || list }));
        setActiveList(list);
        writeListParam(list);
      })
      .catch((err) => {
        // Expired sessions fall back to the guest preview with the link intact.
        if (cancelled || (err instanceof ApiError && err.status === 401)) return;
        toast.error(t('joinFailed'));
        writeListParam(readListParam());
      })
      .finally(() => { if (!cancelled) void refreshLists(); });
    return () => { cancelled = true; };
  }, [session, refreshLists, t]);

  const selectList = useCallback(
    (list: string) => {
      const next = session && list === session.username ? null : list;
      setActiveList(next);
      localStorage.setItem(`last_list:${getAccountId()}`, list);
      writeListParam(list);
    },
    [session],
  );

  useEffect(() => {
    if (session && invite === null) writeListParam(activeList || session.username);
  }, [session, activeList, invite]);

  if (!session) {
    return (
      <LangProvider value={langValue}>
        <Notifications />
        {invite !== null && authMode === null ? (
          <GuestList key={invite} token={invite} lang={lang} setLang={setLang} onAuthenticate={setAuthMode} />
        ) : (
          <Login
            onLogin={handleLogin}
            lang={lang}
            setLang={setLang}
            initialMode={authMode ?? 'login'}
            onBackToGuest={invite !== null ? () => setAuthMode(null) : undefined}
          />
        )}
      </LangProvider>
    );
  }

  const currentList = activeList || session.username;

  return (
    <LangProvider value={langValue}>
      <div className={styles.appWrapper}>
        <Notifications />
        <ShoppingList
          key={`${sessionKey()}:${currentList}`}
          list={currentList}
          viewer={session.username}
          lists={lists}
          catalogLoading={catalogLoading}
          catalogError={catalogError}
          onSelectList={selectList}
          onListsChanged={refreshLists}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onLogout={() => {
            handleLogout();
            toast(t('loggedOut'), { icon: '👋' });
          }}
        />
      </div>
    </LangProvider>
  );
}

export default App;
