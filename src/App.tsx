import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Login } from './components/Login';
import { ShoppingList } from './components/ShoppingList';
import styles from './App.module.css';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUsername(savedUser);
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (user: string, jwtToken: string) => {
    localStorage.setItem('username', user);
    localStorage.setItem('token', jwtToken);
    setUsername(user);
    setToken(jwtToken);
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    setToken(null);
    window.history.replaceState({}, '', window.location.pathname);
  };

  if (!username || !token) {
    return (
      <>
        <Toaster position="top-right" />
        <Login onLogin={handleLogin} />
      </>
    );
  }

  const params = new URLSearchParams(window.location.search);
  const listParam = params.get('list');
  const activeList = listParam || username;

  return (
    <div className={styles.appWrapper}>
      <Toaster position="top-right" />
      <ShoppingList username={activeList} onLogout={handleLogout} />
    </div>
  );
}

export default App;
