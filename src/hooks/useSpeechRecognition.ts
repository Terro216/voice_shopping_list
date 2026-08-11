import { useState, useEffect, useRef, useCallback } from 'react';
import { cue } from '../utils/feedback';

// lib.dom has no SpeechRecognition types; minimal structural typing of what we use.
type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type SpeechRecognitionErrorEventLike = { error: string };

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const getSpeechRecognition = (): SpeechRecognitionConstructor | undefined =>
  typeof window === 'undefined' ? undefined : window.SpeechRecognition ?? window.webkitSpeechRecognition;

// Errors after which the engine will not deliver results until the user acts,
// so keeping the "listening" state would just lie to them.
const FATAL_ERRORS = new Set(['not-allowed', 'service-not-allowed', 'audio-capture']);

const RESTART_DELAY_MS = 300;

export const useSpeechRecognition = (
  onFinalText: (text: string) => void,
  language: string,
  onFatalError?: (error: string) => void,
) => {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSupported] = useState(() => Boolean(getSpeechRecognition()));

  const isListeningRef = useRef(isListening);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Latest-ref: handlers below always see the current callback while the
  // recognition instance itself is only re-created on language change.
  const onFinalTextRef = useRef(onFinalText);
  useEffect(() => {
    onFinalTextRef.current = onFinalText;
  }, [onFinalText]);

  const onFatalErrorRef = useRef(onFatalError);
  useEffect(() => {
    onFatalErrorRef.current = onFatalError;
  }, [onFatalError]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = language;

    rec.onresult = (event) => {
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
        onFinalTextRef.current(final);
        setInterimText('');
      }
    };

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (FATAL_ERRORS.has(event.error)) {
        setIsListening(false);
        setInterimText('');
        // The mic button silently going quiet looks like a broken app; say why.
        onFatalErrorRef.current?.(event.error);
      }
    };

    // Chrome stops continuous recognition after silence; restart while the
    // user still wants to listen.
    rec.onend = () => {
      if (!isListeningRef.current) return;
      restartTimerRef.current = setTimeout(() => {
        if (isListeningRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch {
            // already started — fine
          }
        }
      }, RESTART_DELAY_MS);
    };

    recognitionRef.current = rec;

    return () => {
      clearTimeout(restartTimerRef.current);
      rec.onend = null;
      rec.onresult = null;
      rec.onerror = null;
      try {
        rec.stop();
      } catch {
        // never started — fine
      }
    };
  }, [language]);

  const toggleListening = useCallback(() => {
    const next = !isListening;
    setIsListening(next);
    setInterimText('');
    if (next) {
      cue('listenStart');
      try {
        recognitionRef.current?.start();
      } catch {
        // already started — fine
      }
    } else {
      cue('listenStop');
      clearTimeout(restartTimerRef.current);
      try {
        recognitionRef.current?.stop();
      } catch {
        // never started — fine
      }
    }
  }, [isListening]);

  return { isListening, toggleListening, interimText, isSupported };
};
