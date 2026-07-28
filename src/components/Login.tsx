import { useState } from 'react';
import styles from '../App.module.css';
import { login, register } from '../api/auth';

type Props = {
  onLogin: (username: string, token: string) => void;
};

export const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }
    if (isRegistering && password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const action = isRegistering ? register : login;
      const result = await action(username.trim(), password);
      onLogin(result.username, result.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Voice Shopping List</h1>
      <p>Please log in or register to manage your list.</p>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isRegistering ? 'Password (min. 8 characters)' : 'Password'}
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '…' : isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.switchMode}>
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
        >
          {isRegistering ? 'Log in here' : 'Register here'}
        </button>
      </p>
    </div>
  );
};
