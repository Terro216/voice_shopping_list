import { useState } from 'react';
import styles from '../App.module.css';
import { login, register } from '../api/auth';

type Props = {
  onLogin: (username: string, token: string) => void;
};

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setError('');
      if (isRegistering) {
        const { token, username } = await register(inputUsername, password);
        onLogin(username, token);
      } else {
        const { token, username } = await login(inputUsername, password);
        onLogin(username, token);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Voice Shopping List</h1>
      <p>Please log in or register to manage your list.</p>
      
      <form className={styles.form} onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
        <input 
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Username"
          autoFocus
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" style={{ marginTop: '0.5rem' }}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      
      <p style={{ marginTop: '1rem' }}>
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
        <button 
          type="button" 
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {isRegistering ? 'Log in here' : 'Register here'}
        </button>
      </p>
    </div>
  );
};
