export type ParsedItem = {
  name: string;
  count: number;
};

export type SpeechCommand =
  | { type: 'add'; items: ParsedItem[] }
  | { type: 'check'; queries: string[] }
  | { type: 'remove'; queries: string[] }
  | { type: 'clearBought' }
  | { type: 'undo' };

// Filler phrases stripped before single-word triggers so that e.g. "в список"
// disappears as a whole instead of leaving "список" behind.
const TRIGGER_PHRASES = [
  'в список покупок',
  'в список',
  'to the shopping list',
  'to the list',
  'to my list',
];

const TRIGGER_WORDS = [
  'добавь',
  'добавить',
  'купи',
  'купить',
  'надо',
  'нужно',
  'пожалуйста',
  'ещё',
  'еще',
  'add',
  'buy',
  'need',
  'to',
  'please',
];

// Deliberately NOT splitting on " с " — it tears apart names like "сок с мякотью".
const SEPARATOR_RE = /(?:\s+и\s+|\s+да\s+|\s+and\s+|\s+plus\s+|,)/;

const NUMBER_WORDS: Record<string, number> = {
  один: 1, одна: 1, одну: 1,
  два: 2, две: 2, пара: 2,
  три: 3,
  четыре: 4,
  пять: 5,
  шесть: 6,
  семь: 7,
  восемь: 8,
  девять: 9,
  десять: 10,
  one: 1,
  two: 2, couple: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

// Only treat small numbers as quantities: in "500 грамм сыра" the number is a
// measure, not a count of list entries, so it stays part of the name.
const MAX_SPOKEN_COUNT = 20;

const parseCountToken = (token: string): number | null => {
  const value = /^\d+$/.test(token) ? Number(token) : NUMBER_WORDS[token];
  if (value === undefined || value < 1 || value > MAX_SPOKEN_COUNT) return null;
  return value;
};

/**
 * One run of speech between separators, which may still hold several items:
 * people dictate «молоко 4 хлеб 2» in one breath, without an "and" anywhere.
 * Read as a single item that used to become «молоко 4 хлеб» ×2.
 *
 * A number is read as belonging to the name it touches: before a name it
 * counts that name, after one it closes it. A name already carrying a leading
 * count is finished by the next number, which then starts the item after it.
 */
const parseSegmentItems = (segment: string): ParsedItem[] => {
  const tokens = segment.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  // A segment that is nothing but a number is a name: saying «2» on its own
  // asks for an item called «2», not for a quantity of nothing.
  if (tokens.length === 1) return [{ name: tokens[0], count: 1 }];

  const items: ParsedItem[] = [];
  let words: string[] = [];
  let leading: number | null = null;

  for (const token of tokens) {
    const count = parseCountToken(token);
    if (count === null) {
      words.push(token);
      continue;
    }
    if (words.length === 0) {
      leading = count; // nothing to attach it to yet — it counts what follows
      continue;
    }
    items.push({ name: words.join(' '), count: leading ?? count });
    words = [];
    leading = leading === null ? null : count;
  }

  if (words.length > 0) {
    items.push({ name: words.join(' '), count: leading ?? 1 });
  } else if (items.length === 0) {
    // Numbers and nothing else: keep the words rather than drop the utterance.
    return [{ name: tokens.join(' '), count: 1 }];
  }

  return items;
};

export const parseSpeechText = (text: string): ParsedItem[] => {
  let cleaned = text.toLowerCase();

  for (const phrase of TRIGGER_PHRASES) {
    cleaned = cleaned.split(phrase).join(' ');
  }
  for (const word of TRIGGER_WORDS) {
    cleaned = cleaned.replace(new RegExp(`(^|\\s)${word}(?=\\s|$)`, 'gu'), ' ');
  }

  return cleaned.split(SEPARATOR_RE).flatMap(parseSegmentItems);
};

// Bullets and numbering people paste along with their lists.
const LIST_MARKER_RE = /^\s*(?:[-*•·–—]+|\d+[.)])\s*/;

const MAX_BULK_COUNT = 999;

/**
 * Pasted or shared multi-line text → items. Each line goes through the same
 * pipeline as speech (so "2 молока" and "хлеб, яйца" both work), and repeats
 * across lines are merged into one entry rather than added twice.
 */
export const parseBulkText = (text: string): ParsedItem[] => {
  const merged = new Map<string, ParsedItem>();

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(LIST_MARKER_RE, '').trim();
    // A link shared from a browser comes through as a line of its own.
    if (!line || /^[a-z][a-z0-9+.-]*:\/\//i.test(line)) continue;

    for (const item of parseSpeechText(line)) {
      const key = item.name.toLowerCase();
      const existing = merged.get(key);
      if (existing) {
        existing.count = Math.min(MAX_BULK_COUNT, existing.count + item.count);
      } else {
        merged.set(key, { ...item });
      }
    }
  }

  return [...merged.values()];
};

// Command verbs. Note the tense distinction: "купи" (imperative) adds,
// "купил/купила" (past — "I bought it") checks off.
const UNDO_RE = /^(отмена|отмени|отменить|верни как было|undo|cancel)[.!]?$/;

const CLEAR_BOUGHT_RE = /(очисти|очистить|убери|убрать|clear)\s+(всё\s+|все\s+)?(купленн\S*|bought)/;

const CHECK_RE =
  /^(вычеркни|вычеркнуть|зачеркни|отметь|купила|купили|купил|взяла|взяли|взял|check off|check|bought|got)\s+(.+)$/;

const REMOVE_RE = /^(убери|убрать|удали|удалить|выкинь|remove|delete)\s+(.+)$/;

// The rest of a command utterance is parsed with the item pipeline and the
// names become search queries ("вычеркни 2 молока и хлеб" → ["молока", "хлеб"]).
const toQueries = (rest: string): string[] => parseSpeechText(rest).map((item) => item.name);

export const parseSpeechCommand = (text: string): SpeechCommand => {
  const cleaned = text.toLowerCase().trim();

  if (UNDO_RE.test(cleaned)) return { type: 'undo' };
  if (CLEAR_BOUGHT_RE.test(cleaned)) return { type: 'clearBought' };

  const check = cleaned.match(CHECK_RE);
  if (check) return { type: 'check', queries: toQueries(check[2]) };

  const remove = cleaned.match(REMOVE_RE);
  if (remove) return { type: 'remove', queries: toQueries(remove[2]) };

  return { type: 'add', items: parseSpeechText(cleaned) };
};
