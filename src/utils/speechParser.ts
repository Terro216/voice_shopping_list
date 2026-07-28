export type ParsedItem = {
  name: string;
  count: number;
};

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

const parseSegment = (segment: string): ParsedItem | null => {
  const tokens = segment.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  if (tokens.length > 1) {
    const leading = parseCountToken(tokens[0]);
    if (leading !== null) {
      return { name: tokens.slice(1).join(' '), count: leading };
    }
    const trailing = parseCountToken(tokens[tokens.length - 1]);
    if (trailing !== null) {
      return { name: tokens.slice(0, -1).join(' '), count: trailing };
    }
  }

  return { name: tokens.join(' '), count: 1 };
};

export const parseSpeechText = (text: string): ParsedItem[] => {
  let cleaned = text.toLowerCase();

  for (const phrase of TRIGGER_PHRASES) {
    cleaned = cleaned.split(phrase).join(' ');
  }
  for (const word of TRIGGER_WORDS) {
    cleaned = cleaned.replace(new RegExp(`(^|\\s)${word}(?=\\s|$)`, 'gu'), ' ');
  }

  return cleaned
    .split(SEPARATOR_RE)
    .map(parseSegment)
    .filter((item): item is ParsedItem => item !== null);
};
