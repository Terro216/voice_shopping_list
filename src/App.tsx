import { useState, useEffect, useCallback, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Login } from './components/Login';
import { ShoppingList } from './components/ShoppingList';
import { AUTH_EXPIRED_EVENT } from './api/client';
import { fetchLists, joinList, type ListSummary } from './api/lists';
import { clearSnapshots } from './api/listCache';
import { useTheme } from './hooks/useTheme';
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

function App() {
  const [session, setSession] = useState<Session | null>(readStoredSession);
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const { theme, setTheme } = useTheme();
  const [lists, setLists] = useState<ListSummary[]>([]);
  const [activeList, setActiveList] = useState<string | null>(readListParam);

  const t = useMemo(() => translator(lang), [lang]);
  const langValue = useMemo(() => ({ lang, t }), [lang, t]);

  const setLang = useCallback((next: Lang) => {
    localStorage.setItem('lang', next);
    setLangState(next);
  }, []);

  const handleLogin = (username: string, token: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    // Deliberately keep the query string: someone opening a share link must
    // land on that list after logging in, not on their own.
    setSession({ username, token });
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    // The cached lists are somebody's shopping habits — they should not sit in
    // storage for whoever logs in on this device next.
    clearSnapshots();
    setSession(null);
    setLists([]);
    setActiveList(null);
    writeListParam(null);
  }, []);

  const refreshLists = useCallback(() => {
    if (!session) return;
    fetchLists()
      .then(setLists)
      .catch(() => setLists([]));
  }, [session]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onAuthExpired = () => {
      handleLogout();
      toast.error(t('sessionExpired'));
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
  }, [handleLogout, t]);

  // Redeeming an invite is what grants access now, so it has to happen before
  // the list is opened — the list name alone no longer lets anyone in.
  useEffect(() => {
    if (!session) return;
    const token = new URLSearchParams(window.location.search).get('join');
    if (!token) {
      refreshLists();
      return;
    }
    joinList(token)
      .then(({ list }) => {
        toast.success(t('joinedList', { list }));
        setActiveList(list);
        writeListParam(list);
      })
      .catch(() => {
        toast.error(t('joinFailed'));
        writeListParam(readListParam());
      })
      .finally(refreshLists);
  }, [session, refreshLists, t]);

  const selectList = useCallback(
    (list: string) => {
      const next = session && list === session.username ? null : list;
      setActiveList(next);
      writeListParam(next);
    },
    [session],
  );

  if (!session) {
    return (
      <LangProvider value={langValue}>
        <Toaster position="top-right" />
        <Login onLogin={handleLogin} lang={lang} setLang={setLang} />
      </LangProvider>
    );
  }

  const currentList = activeList || session.username;

  return (
    <LangProvider value={langValue}>
      <div className={styles.appWrapper}>
        <Toaster position="top-right" />
        <ShoppingList
          key={currentList}
          username={currentList}
          viewer={session.username}
          lists={lists}
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
