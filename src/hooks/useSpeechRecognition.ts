import { useState, useEffect, useRef, useCallback } from 'react';
import { cue } from '../utils/feedback';
import { mergeTranscript } from '../utils/transcript';

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

/**
 * How long an utterance has to stay quiet before it is acted on. The engine
 * delivers one phrase as several overlapping "final" results, so they are
 * merged (see utils/transcript) and applied once, together — that is what turns
 * «три пакета с маршмеллоу» into one row instead of four.
 *
 * It is a compromise: long enough to catch a revised take, short enough that
 * dictating a list does not feel like waiting. Anyone who finds it slow can say
 * "дальше" (or press the button) and not wait at all.
 */
const SETTLE_MS = 550;

/**
 * Spoken full stop. Ends the phrase at once and leaves the mic listening, so a
 * long list can be dictated at speaking pace instead of at the pace of the
 * silence detector.
 */
const TERMINATORS = ['дальше', 'далее', 'следующее', 'next'];

const endsWithTerminator = (text: string) => {
  const words = text.toLowerCase().replace(/[.,!?;:…]/g, '').split(/\s+/);
  return TERMINATORS.includes(words[words.length - 1]);
};

const dropTerminator = (text: string) =>
  text.replace(/\s*[^\s]+\s*[.,!?;:…]*$/, '').trim();

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

  // The utterance being assembled, and the timer that decides it is finished.
  const utteranceRef = useRef('');
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

  /** Hands the assembled utterance over — once — and starts a fresh one. */
  const flushUtterance = useCallback(() => {
    clearTimeout(settleTimerRef.current);
    const text = utteranceRef.current.trim();
    utteranceRef.current = '';
    setInterimText('');
    if (text) onFinalTextRef.current(text);
  }, []);

  const flushRef = useRef(flushUtterance);
  useEffect(() => {
    flushRef.current = flushUtterance;
  }, [flushUtterance]);

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
          final += `${event.results[i][0].transcript} `;
        } else {
          interim += `${event.results[i][0].transcript} `;
        }
      }

      if (final) utteranceRef.current = mergeTranscript(utteranceRef.current, final);

      // "…и хлеб — дальше" means the phrase is over; take it now rather than
      // sitting out the silence timer.
      if (final && endsWithTerminator(utteranceRef.current)) {
        utteranceRef.current = dropTerminator(utteranceRef.current);
        flushRef.current();
        return;
      }

      // What is on screen is always the whole phrase so far, not just the tail
      // the engine happens to be working on.
      setInterimText(`${utteranceRef.current} ${interim.trim()}`.trim());

      if (final) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = setTimeout(() => flushRef.current(), SETTLE_MS);
      }
    };

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (FATAL_ERRORS.has(event.error)) {
        setIsListening(false);
        // Whatever was already understood should still be applied.
        flushRef.current();
        // The mic button silently going quiet looks like a broken app; say why.
        onFatalErrorRef.current?.(event.error);
      }
    };

    // Chrome stops continuous recognition after silence; restart while the
    // user still wants to listen.
    rec.onend = () => {
      // Deliberately NOT flushing when a restart is coming. The engine ends a
      // session on any pause, including one in the middle of a phrase, and it
      // routinely re-delivers what it already said in a revised form after the
      // restart ("молоко" then "молока"). Flushing here applied the first take
      // and left the revision looking like a brand new item; letting the settle
      // timer decide keeps both takes in one utterance, where merging can see
      // that they are the same words.
      if (!isListeningRef.current) {
        flushRef.current();
        return;
      }

      // The revision arrives in the *next* session, so a phrase still being
      // assembled gets its settle window started again from the restart rather
      // than expiring during it.
      if (utteranceRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = setTimeout(() => flushRef.current(), RESTART_DELAY_MS + SETTLE_MS);
      }
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
      clearTimeout(settleTimerRef.current);
      utteranceRef.current = '';
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
    if (next) {
      utteranceRef.current = '';
      setInterimText('');
      cue('listenStart');
      try {
        recognitionRef.current?.start();
      } catch {
        // already started — fine
      }
    } else {
      cue('listenStop');
      clearTimeout(restartTimerRef.current);
      // Stopping mid-phrase must not throw away what was already understood.
      flushUtterance();
      try {
        recognitionRef.current?.stop();
      } catch {
        // never started — fine
      }
    }
  }, [isListening, flushUtterance]);

  return { isListening, toggleListening, interimText, isSupported, flushNow: flushUtterance };
};
