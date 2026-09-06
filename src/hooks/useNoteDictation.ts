import { useCallback, useEffect, useRef, useState } from 'react';
import { cue } from '../utils/feedback';
import { mergeTranscript } from '../utils/transcript';

type Recognition = InstanceType<NonNullable<Window['SpeechRecognition']>>;

/** Plain text dictation into a draft. No shopping parser, commands or restarts. */
export const useNoteDictation = (onText: (text: string) => void, language: string) => {
  const [status, setStatus] = useState<'idle' | 'listening' | 'stopping'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(() => Boolean(window.SpeechRecognition ?? window.webkitSpeechRecognition));
  const recognition = useRef<Recognition | null>(null);
  const stopPromise = useRef<Promise<void> | null>(null);
  const stopped = useRef<(() => void) | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onTextRef = useRef(onText);
  onTextRef.current = onText;

  const finish = useCallback((rec: Recognition) => {
    if (recognition.current !== rec) return;
    rec.onresult = rec.onerror = rec.onend = null;
    recognition.current = null;
    clearTimeout(stopTimer.current);
    setStatus('idle');
    stopped.current?.();
    stopped.current = null;
    stopPromise.current = null;
  }, []);

  const cancel = useCallback(() => {
    const rec = recognition.current;
    if (!rec) return;
    finish(rec);
    try {
      if (rec.abort) rec.abort();
      else rec.stop();
    } catch { /* already stopped */ }
  }, [finish]);

  useEffect(() => cancel, [cancel]);

  const start = useCallback((existingNote: string) => {
    const Constructor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Constructor || recognition.current) return;
    const rec = new Constructor();
    recognition.current = rec;
    rec.lang = language;
    rec.continuous = true;
    rec.interimResults = true;
    setError(null);
    setStatus('listening');
    const prefix = existingNote.trimEnd();

    rec.onresult = (event) => {
      if (recognition.current !== rec) return;
      // `results` is the current session, including revised interim results.
      // Rebuild it instead of appending every event's growing transcript.
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text = mergeTranscript(text, event.results[i][0].transcript);
      }
      onTextRef.current([prefix, text].filter(Boolean).join(' '));
    };
    rec.onend = () => finish(rec);
    rec.onerror = (event) => {
      if (recognition.current !== rec) return;
      setError(event.error);
      cancel();
    };
    try {
      rec.start();
      cue('listenStart');
    } catch {
      setError('start-failed');
      cancel();
    }
  }, [language, finish, cancel]);

  const stop = useCallback((): Promise<void> => {
    if (stopPromise.current) return stopPromise.current;
    const rec = recognition.current;
    if (!rec) return Promise.resolve();
    setStatus('stopping');
    const promise = new Promise<void>((resolve) => { stopped.current = resolve; });
    stopPromise.current = promise;
    // stop() delivers its final result asynchronously. Save waits for onend;
    // a stalled engine is aborted, keeping the text already shown for review.
    stopTimer.current = setTimeout(cancel, 3000);
    try { rec.stop(); } catch { cancel(); }
    cue('listenStop');
    return promise;
  }, [cancel]);

  return { status, isSupported, error, start, stop, cancel };
};
