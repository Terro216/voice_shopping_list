import { useState } from 'react';
import toast from 'react-hot-toast';
import { changePassword, deleteAccount } from '../api/auth';
import { cue, isSoundEnabled, setSoundEnabled } from '../utils/feedback';
import { LANGUAGES, useT, type Lang } from '../i18n';
import type { ThemeChoice } from '../hooks/useTheme';
import { Sheet } from './Sheet';
import styles from '../App.module.css';

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: ThemeChoice;
  setTheme: (theme: ThemeChoice) => void;
  onOpenHelp: () => void;
  onClose: () => void;
  onLogout: () => void;
};

export const SettingsSheet = ({
  lang,
  setLang,
  theme,
  setTheme,
  onOpenHelp,
  onClose,
  onLogout,
}: Props) => {
  const { t } = useT();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sound, setSound] = useState(isSoundEnabled);

  const toggleSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    setSound(enabled);
    if (enabled) cue('added'); // let them hear what they just switched on
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const result = await changePassword(currentPassword, newPassword);
      localStorage.setItem('token', result.token);
      setCurrentPassword('');
      setNewPassword('');
      toast.success(t('passwordChanged'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  const submitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await deleteAccount(deletePassword);
      toast.success(t('accountDeleted'));
      onLogout();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  const themeOptions: { value: ThemeChoice; label: string }[] = [
    { value: 'auto', label: t('themeAuto') },
    { value: 'light', label: t('themeLight') },
    { value: 'dark', label: t('themeDark') },
  ];

  return (
    <Sheet title={t('settings')} onClose={onClose}>
      <label className={styles.settingRow}>
        <span>{t('language')}</span>
        <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
          {LANGUAGES.map((option) => (
            <option key={option.lang} value={option.lang}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.settingRow}>
        <span>{t('theme')}</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeChoice)}>
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.settingRow}>
        <span>{t('soundCues')}</span>
        <input
          type="checkbox"
          className={styles.toggle}
          checked={sound}
          onChange={(e) => toggleSound(e.target.checked)}
        />
      </label>
      <p className={styles.sheetHint}>{t('soundCuesHint')}</p>

      <div className={styles.sheetActions}>
        <button type="button" onClick={onOpenHelp}>
          ❓ {t('help')}
        </button>
      </div>

      <h3 className={styles.sheetSubtitle}>{t('changePassword')}</h3>
      <form className={styles.sheetForm} onSubmit={submitPassword}>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder={t('currentPassword')}
          autoComplete="current-password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t('newPassword')}
          autoComplete="new-password"
        />
        <button type="submit" disabled={busy || !currentPassword || newPassword.length < 8}>
          {t('save')}
        </button>
      </form>

      <h3 className={styles.sheetSubtitle}>{t('deleteAccount')}</h3>
      <p className={styles.sheetHint}>{t('deleteAccountHint')}</p>
      {confirmingDelete ? (
        <form className={styles.sheetForm} onSubmit={submitDelete}>
          <input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder={t('deleteAccountConfirm')}
            autoComplete="current-password"
          />
          <button type="submit" className={styles.dangerButton} disabled={busy || !deletePassword}>
            {t('deleteAccount')}
          </button>
          <button type="button" onClick={() => setConfirmingDelete(false)}>
            {t('cancel')}
          </button>
        </form>
      ) : (
        <div className={styles.sheetActions}>
          <button type="button" className={styles.dangerButton} onClick={() => setConfirmingDelete(true)}>
            {t('deleteAccount')}
          </button>
        </div>
      )}

      <div className={styles.sheetActions}>
        <button type="button" onClick={onLogout}>
          {t('logout')}
        </button>
      </div>
    </Sheet>
  );
};
