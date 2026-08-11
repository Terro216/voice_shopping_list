import { LANGUAGES, useT, type Lang } from '../i18n';
import styles from '../App.module.css';

type Props = {
  isSupported: boolean;
  isListening: boolean;
  toggleListening: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  interimText: string;
};

export const VoiceControls = ({
  isSupported,
  isListening,
  toggleListening,
  lang,
  setLang,
  interimText,
}: Props) => {
  const { t } = useT();

  if (!isSupported) {
    return (
      <div className={styles.voiceControls}>
        <span className={styles.error}>{t('voiceUnsupported')}</span>
      </div>
    );
  }

  return (
    <div className={styles.voiceControls}>
      <button
        type="button"
        className={`${styles.micButton} ${isListening ? styles.active : ''}`}
        onClick={toggleListening}
      >
        {isListening ? t('listening') : t('startVoice')}
      </button>

      <select
        value={lang}
        aria-label={t('recognitionLanguage')}
        onChange={(e) => {
          setLang(e.target.value as Lang);
          if (isListening) toggleListening(); // engine restarts with the new language off
        }}
      >
        {LANGUAGES.map((option) => (
          <option key={option.lang} value={option.lang}>
            {option.label}
          </option>
        ))}
      </select>

      <div className={styles.interimText} aria-live="polite">
        {interimText}
      </div>
    </div>
  );
};
