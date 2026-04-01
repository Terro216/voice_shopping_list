import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const playBeep = (frequency: number, type: OscillatorType, duration: number) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const useSpeechRecognition = (onFinalText: (text: string) => void, language: string = 'ru-RU') => {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  const isListeningRef = useRef(isListening);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = language;

    rec.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setInterimText(interim);
      if (final) {
        onFinalText(final);
        setInterimText('');
      }
    };

    rec.onerror = (e: any) => {
      console.error("Speech recognition error:", e.error);
    };

    rec.onend = () => {
      if (isListeningRef.current) {
        setTimeout(() => {
          if (isListeningRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (err) {}
          }
        }, 300);
      }
    };

    recognitionRef.current = rec;

    return () => {
      rec.onend = null;
      try {
        rec.stop();
      } catch (e) {}
    };
  }, [language, onFinalText]);

  const toggleListening = useCallback(() => {
    const nextState = !isListening;
    setIsListening(nextState);
    if (nextState) {
      playBeep(880, 'sine', 0.1); // High beep
      setInterimText('');
      try {
        recognitionRef.current?.start();
      } catch (err) {}
    } else {
      playBeep(440, 'sine', 0.2); // Low boop
      try {
        recognitionRef.current?.stop();
      } catch (err) {}
    }
  }, [isListening]);

  return { isListening, toggleListening, interimText, isSupported };
};
