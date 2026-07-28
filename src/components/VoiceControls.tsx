import styles from '../App.module.css';

type Props = {
  isSupported: boolean;
  isListening: boolean;
  toggleListening: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  interimText: string;
};

export const VoiceControls = ({
  isSupported,
  isListening,
  toggleListening,
  language,
  setLanguage,
  interimText,
}: Props) => {
  if (!isSupported) {
    return (
      <div className={styles.voiceControls}>
        <span className={styles.error}>⚠️ Speech recognition is not supported in this browser.</span>
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
        {isListening ? '🎙 Listening...' : '🎤 Start Voice'}
      </button>

      <select
        value={language}
        aria-label="Recognition language"
        onChange={(e) => {
          setLanguage(e.target.value);
          if (isListening) toggleListening(); // engine restarts with the new language off
        }}
      >
        <option value="ru-RU">Русский</option>
        <option value="en-US">English</option>
      </select>

      <div className={styles.interimText} aria-live="polite">
        {interimText}
      </div>
    </div>
  );
};
