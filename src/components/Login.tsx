import { useState } from 'react';
import { LANGUAGES, useT, type Lang } from '../i18n';
import styles from '../App.module.css';
import { login, register } from '../api/auth';

type Props = {
  onLogin: (username: string, token: string) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const Login = ({ onLogin, lang, setLang }: Props) => {
  const { t } = useT();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError(t('fillBoth'));
      return;
    }
    if (isRegistering && password.length < 8) {
      setError(t('passwordTooShort'));
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const action = isRegistering ? register : login;
      const result = await action(username.trim(), password);
      onLogin(result.username, result.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('somethingWrong'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('appName')}</h1>
        <select
          value={lang}
          aria-label={t('language')}
          onChange={(e) => setLang(e.target.value as Lang)}
        >
          {LANGUAGES.map((option) => (
            <option key={option.lang} value={option.lang}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p>{t('loginIntro')}</p>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('username')}
          autoComplete="username"
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isRegistering ? t('passwordMin') : t('password')}
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '…' : isRegistering ? t('register') : t('login')}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.switchMode}>
        {isRegistering ? t('haveAccount') : t('noAccount')}
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
        >
          {isRegistering ? t('loginHere') : t('registerHere')}
        </button>
      </p>
    </div>
  );
};
