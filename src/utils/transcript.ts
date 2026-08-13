/**
 * Stitching the pieces a speech engine hands back into one utterance.
 *
 * Chrome (on Android especially) does not deliver one final result per phrase.
 * It re-delivers a *growing prefix* of the same phrase, each marked final:
 *
 *   "три" → "три" → "три пакета" → "три пакета с" → "три пакета с маршмеллоу"
 *
 * Applied one at a time — which is what the app used to do — a single
 * «три пакета с маршмеллоу» became four half-parsed rows («три», «пакета ×12»,
 * «пакета с», «пакета с маршмеллоу») and a screen full of toasts. So finals are
 * merged here first and the utterance is only acted on once it has settled.
 */

const clean = (text: string) => text.replace(/\s+/g, ' ').trim();

/** Case- and punctuation-insensitive form used only for comparing fragments. */
const key = (text: string) => text.toLowerCase().replace(/[.,!?;:…]/g, '');

const words = (text: string) => (text ? key(text).split(' ') : []);

/** Does `text` open with exactly the words of `head`? */
const startsWith = (text: string[], head: string[]) =>
  head.length <= text.length && head.every((word, i) => text[i] === word);

/**
 * Longest tail of `a` that is also a head of `b`, counted in whole words — the
 * overlap between "три пакета" and "пакета с маршмеллоу".
 */
const overlapWords = (a: string[], b: string[]): number => {
  for (let size = Math.min(a.length, b.length); size > 0; size--) {
    if (startsWith(b, a.slice(a.length - size))) return size;
  }
  return 0;
};

/**
 * Folds one final fragment into the utterance built so far.
 *
 * - a fragment that extends what we have replaces it ("три" + "три пакета")
 * - a fragment we already contain is dropped (a plain re-delivery)
 * - a fragment that overlaps the tail is joined without repeating the overlap
 * - anything else is appended, because it is genuinely new speech
 */
export const mergeTranscript = (buffer: string, fragment: string): string => {
  const next = clean(fragment);
  if (!next) return buffer;
  const current = clean(buffer);
  if (!current) return next;

  const a = words(current);
  const b = words(next);

  // `next` opens with everything we have: the same phrase, extended.
  if (startsWith(b, a)) return next;
  // We already open with `next`: a re-delivery of a shorter take of it.
  if (startsWith(a, b)) return current;

  const shared = overlapWords(a, b);
  if (shared > 0) {
    return `${current} ${next.split(' ').slice(shared).join(' ')}`.trim();
  }
  return `${current} ${next}`;
};
