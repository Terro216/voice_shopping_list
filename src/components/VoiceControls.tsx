import React from 'react';
import styles from '../App.module.css';

type Props = {
  isSupported: boolean;
  isListening: boolean;
  toggleListening: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  interimText: string;
};

export const VoiceControls: React.FC<Props> = ({
  isSupported,
  isListening,
  toggleListening,
  language,
  setLanguage,
  interimText
}) => {
  if (!isSupported) {
    return (
      <div className={styles.voiceControls}>
        <span style={{ color: 'red' }}>⚠️ Speech Recognition not supported in this browser.</span>
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
        onChange={(e) => {
          setLanguage(e.target.value);
          if (isListening) toggleListening(); 
        }}
      >
        <option value="ru-RU">Русский</option>
        <option value="en-US">English</option>
      </select>

      <div className={styles.interimText}>
        {interimText}
      </div>
    </div>
  );
};
