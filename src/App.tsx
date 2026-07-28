import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Login } from './components/Login';
import { ShoppingList } from './components/ShoppingList';
import { AUTH_EXPIRED_EVENT } from './api/client';
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

function App() {
  const [session, setSession] = useState<Session | null>(readStoredSession);

  const handleLogin = (username: string, token: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    // Deliberately keep the query string: someone opening a shared ?list= link
    // must land on that list after logging in, not on their own.
    setSession({ username, token });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setSession(null);
  };

  useEffect(() => {
    const onAuthExpired = () => {
      handleLogout();
      toast.error('Session expired — please log in again');
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, onAuthExpired);
  }, []);

  if (!session) {
    return (
      <>
        <Toaster position="top-right" />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  const listParam = new URLSearchParams(window.location.search).get('list');
  const activeList = listParam || session.username;

  return (
    <div className={styles.appWrapper}>
      <Toaster position="top-right" />
      <ShoppingList
        key={activeList}
        username={activeList}
        viewer={session.username}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
