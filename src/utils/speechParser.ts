import { quantityLimit, roundQuantity, type Unit } from '../../shared/quantity.js';

export type ParsedItem = {
  name: string;
  count: number;
  unit?: Unit;
  note?: string;
};

export type SpeechCommand =
  | { type: 'add'; items: ParsedItem[] }
  | { type: 'check'; queries: string[] }
  | { type: 'remove'; queries: string[] }
  | { type: 'clearBought' }
  | { type: 'undo' };

export type Correction =
  | { kind: 'quantity'; count: number; unit?: Unit }
  | { kind: 'name'; name: string }
  | { kind: 'qualifier'; value: string };

export type ConversationCommand = SpeechCommand
  | { type: 'correct'; query: string | null; change: Correction }
  | { type: 'move'; query: string | null; destination: string }
  | { type: 'unrecognized' };

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
  ноль: 0, один: 1, одна: 1, одну: 1,
  два: 2, две: 2, пара: 2,
  три: 3,
  четыре: 4,
  пять: 5,
  шесть: 6,
  семь: 7,
  восемь: 8,
  девять: 9,
  десять: 10, одиннадцать: 11, двенадцать: 12, тринадцать: 13, четырнадцать: 14,
  пятнадцать: 15, шестнадцать: 16, семнадцать: 17, восемнадцать: 18, девятнадцать: 19,
  двадцать: 20, тридцать: 30, сорок: 40, пятьдесят: 50, шестьдесят: 60,
  семьдесят: 70, восемьдесят: 80, девяносто: 90,
  сто: 100, двести: 200, триста: 300, четыреста: 400, пятьсот: 500,
  шестьсот: 600, семьсот: 700, восемьсот: 800, девятьсот: 900,
  тысяча: 1000, полтора: 1.5, полторы: 1.5, половина: 0.5, пол: 0.5,
  zero: 0, one: 1,
  two: 2, couple: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10, half: 0.5, a: 1, an: 1,
};

// Keep large bare numbers in product names, but allow full numeric quantities
// next to an explicit unit (including grams and millilitres above 999).
const MAX_SPOKEN_COUNT = 20;
const UNIT_WORDS: Record<Unit, string[]> = {
  pcs: ['шт', 'штука', 'штуки', 'штук', 'штуку', 'pcs', 'pc', 'piece', 'pieces'],
  g: ['г', 'гр', 'грамм', 'грамма', 'граммов', 'g', 'gram', 'grams'],
  kg: ['кг', 'кило', 'килограмм', 'килограмма', 'килограммов', 'kg', 'kilo', 'kilos', 'kilogram', 'kilograms'],
  ml: ['мл', 'миллилитр', 'миллилитра', 'миллилитров', 'ml', 'milliliter', 'milliliters', 'millilitre', 'millilitres'],
  l: ['л', 'литр', 'литра', 'литров', 'l', 'liter', 'liters', 'litre', 'litres'],
  pack: ['уп', 'упак', 'упаковка', 'упаковки', 'упаковок', 'упаковку', 'пачка', 'пачки', 'пачек', 'пачку', 'pack', 'packs', 'package', 'packages'],
};
const unitOf = (token: string | undefined): Unit | undefined =>
  (Object.keys(UNIT_WORDS) as Unit[]).find((unit) => UNIT_WORDS[unit].includes((token ?? '').replace(/\.$/, '')));

type QuantityToken = { count: number; unit?: Unit; size: number };

const readQuantity = (tokens: string[], index: number, allowBare = false): QuantityToken | null => {
  const first = tokens[index];
  if (['полкило', 'полкилограмма', 'полкилограммов'].includes(first)) return { count: 0.5, unit: 'kg', size: 1 };
  if (['поллитра', 'пол-литра'].includes(first)) return { count: 0.5, unit: 'l', size: 1 };
  const bareUnit = unitOf(first);
  if (bareUnit) return { count: 1, unit: bareUnit, size: 1 };

  let count: number;
  let size = 1;
  if (/^-?\d+(?:\.\d+)?$/.test(first)) count = Number(first);
  else {
    if (NUMBER_WORDS[first] === undefined) return null;
    count = NUMBER_WORDS[first];
    let previous = count;
    // «двести пятьдесят» and «двадцать пять», without eating two counts
    // belonging to adjacent products.
    while (previous >= 20 && NUMBER_WORDS[tokens[index + size]] > 0 && NUMBER_WORDS[tokens[index + size]] < previous) {
      previous = NUMBER_WORDS[tokens[index + size]];
      count += previous;
      size++;
    }
  }
  if (tokens[index + size] === 'с' && ['половиной', 'половиною'].includes(tokens[index + size + 1])) {
    count += 0.5;
    size += 2;
  }
  // "half a kilo", "half an ..."
  if (count === 0.5 && ['a', 'an'].includes(tokens[index + size])) size++;
  const unit = unitOf(tokens[index + size]);
  if (unit) return { count, unit, size: size + (tokens[index + size + 1] === 'of' ? 2 : 1) };
  if (!allowBare && (!Number.isInteger(count) || count < 1 || count > MAX_SPOKEN_COUNT)) return null;
  return { count, size };
};

const parseSegmentItems = (segment: string): ParsedItem[] => {
  const tokens = segment.trim().replace(/[.!?,:]+$/, '').split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  if (tokens.length === 1) return [{ name: tokens[0], count: 1 }];
  const items: ParsedItem[] = [];
  let words: string[] = [];
  let leading: Omit<QuantityToken, 'size'> | null = null;
  for (let index = 0; index < tokens.length;) {
    // A package size is part of the description: "2 пачки масла по 200 г".
    if (tokens[index] === 'по') { words.push(...tokens.slice(index)); break; }
    const quantity = readQuantity(tokens, index);
    if (!quantity) { words.push(tokens[index++]); continue; }
    const { size, ...value } = quantity;
    index += size;
    if (!words.length) { leading = value; continue; }
    items.push({ name: words.join(' '), ...(leading ?? value) });
    words = [];
    leading = leading === null ? null : value;
  }
  if (words.length) items.push({ name: words.join(' '), ...(leading ?? { count: 1 }) });
  else if (!items.length) return [{ name: tokens.join(' '), count: 1 }];
  return items;
};

// Explicit marker: everything after it belongs to the last item's note,
// including commas, conjunctions and words that otherwise trigger commands.
const NOTE_MARKER = /(?:^|[\s,])(?:с\s+заметкой|заметка|примечание|note)(?=\s|[:—–-]|$)\s*[:—–-]?\s*/iu;
const splitNote = (text: string) => {
  const match = NOTE_MARKER.exec(text);
  return match
    ? { body: text.slice(0, match.index), note: text.slice(match.index + match[0].length).trim().replace(/,\s*$/, '') }
    : { body: text, note: undefined };
};

export const parsedItemKey = (item: ParsedItem) => JSON.stringify([item.name.toLowerCase(), item.unit ?? '', item.note ?? '']);

export const parseSpeechText = (text: string): ParsedItem[] =>
  text.split(/;|\s+(?:следующий товар|next item)\s+/iu).flatMap((phrase) => {
    const { body, note } = splitNote(phrase);
    // Decimal commas must be protected before commas become item separators.
    let cleaned = body.toLowerCase().replace(/(\d),(\d)/g, '$1.$2')
      .replace(/(\d)(?=(?:кг|гр|г|мл|л|kg|ml|g|l)(?:\s|[.,!?]|$))/gu, '$1 ');
    for (const trigger of TRIGGER_PHRASES) cleaned = cleaned.split(trigger).join(' ');
    for (const word of TRIGGER_WORDS) {
      cleaned = cleaned.replace(new RegExp(`(^|\\s)${word}(?=\\s|$)`, 'gu'), ' ');
    }
    const items = cleaned.split(SEPARATOR_RE).flatMap(parseSegmentItems);
    if (note !== undefined && items.length) items[items.length - 1].note = note;
    return items;
  });

// Bullets and numbering people paste along with their lists.
const LIST_MARKER_RE = /^\s*(?:[-*•·–—]+\s+|\d+[.)](?:\s+|$))/;

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
      const key = parsedItemKey(item);
      const existing = merged.get(key);
      if (existing) {
        existing.count = Math.min(quantityLimit(item.unit), roundQuantity(existing.count + item.count));
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

const CLEAR_BOUGHT_RE = /^(очисти|очистить|убери|убрать|clear)\s+(всё\s+|все\s+)?(купленн\S*|bought)/;

const CHECK_RE =
  /^(вычеркни|вычеркнуть|зачеркни|отметь|купила|купили|купил|взяла|взяли|взял|check off|check|bought|got)\s+(.+)$/;

const REMOVE_RE = /^(убери|убрать|удали|удалить|выкинь|remove|delete)\s+(.+)$/;

// The rest of a command utterance is parsed with the item pipeline and the
// names become search queries ("вычеркни 2 молока и хлеб" → ["молока", "хлеб"]).
const toQueries = (rest: string): string[] => parseSpeechText(rest).map((item) => item.name);

export const parseSpeechCommand = (text: string): SpeechCommand => {
  const cleaned = splitNote(text).body.toLowerCase().trim();

  if (UNDO_RE.test(cleaned)) return { type: 'undo' };
  if (CLEAR_BOUGHT_RE.test(cleaned)) return { type: 'clearBought' };

  const check = cleaned.match(CHECK_RE);
  if (check) return { type: 'check', queries: toQueries(check[2]) };

  const remove = cleaned.match(REMOVE_RE);
  if (remove) return { type: 'remove', queries: toQueries(remove[2]) };

  return { type: 'add', items: parseSpeechText(text) };
};

const cleanCommand = (text: string) => text.toLowerCase().trim().replace(/\s+/g, ' ')
  .replace(/(\d),(\d)/g, '$1.$2')
  .replace(/(\d)(?=(?:кг|гр|г|мл|л|kg|ml|g|l)(?:\s|$))/gu, '$1 ')
  .replace(/[.!?…]+$/u, '').trim();

/** Unlike item names, correction quantities may be bare fractions or >20. */
const correctionQuantity = (text: string): Extract<Correction, { kind: 'quantity' }> | null => {
  const tokens = text.split(/\s+/);
  const quantity = readQuantity(tokens, 0, true);
  if (quantity?.size === tokens.length) {
    return { kind: 'quantity', count: quantity.count, ...(quantity.unit ? { unit: quantity.unit } : {}) };
  }
  if (tokens.length === 1 && (/^-?\d+(?:\.\d+)?$/.test(text) || NUMBER_WORDS[text] !== undefined)) {
    return { kind: 'quantity', count: NUMBER_WORDS[text] ?? Number(text) };
  }
  return null;
};

const targetQuery = (text: string): string | null =>
  /^(его|её|ее|их|это|этот|эту|последний|последнее|последнюю|it|that|them)$/u.test(text.trim())
    ? null : text.trim();

const parseConversationCommand = (text: string): ConversationCommand => {
  // A note owns the rest of its phrase, even when it contains correction verbs.
  const cleaned = cleanCommand(splitNote(text).body);
  const move = cleaned.match(/^(?:перенеси|перемести|move)\s+(.+?)\s+(?:в\s+(?:список\s+)?|to\s+(?:(?:the\s+)?list\s+)?)(.+)$/u);
  if (move) return { type: 'move', query: targetQuery(move[1]), destination: move[2].replace(/^[«"“]|[»"”]$/gu, '').trim() };

  const count = cleaned.match(/^(?:измени|поменяй|установи)\s+количество\s+(.+?)\s+на\s+(.+)$/u);
  if (count) {
    const change = correctionQuantity(count[2]);
    return change ? { type: 'correct', query: targetQuery(count[1]), change } : { type: 'unrecognized' };
  }
  const rename = cleaned.match(/^(?:замени|переименуй|назови|rename|replace)\s+(.+?)\s+(?:на|в|to|with)\s+(.+)$/u);
  if (rename) return { type: 'correct', query: targetQuery(rename[1]), change: { kind: 'name', name: rename[2] } };

  const make = cleaned.match(/^(?:сделай|make)\s+(.+?)\s+(.+)$/u);
  if (make) {
    const quantity = correctionQuantity(make[2]);
    if (quantity) return { type: 'correct', query: targetQuery(make[1]), change: quantity };
    if (targetQuery(make[1]) === null) return { type: 'correct', query: null, change: { kind: 'qualifier', value: make[2] } };
  }
  const correction = cleaned.match(/^(?:нет|точнее|no|actually)[,\s]+(.+)$/u)
    ?? cleaned.match(/^не\s+.+?\s+а\s+(.+)$/u);
  if (correction) {
    const value = correction[1].replace(/^не\s+.+?\s+а\s+/u, '').trim();
    const change = correctionQuantity(value);
    // A numeric-looking failed correction must never rename milk to "3 foo".
    if (change) return { type: 'correct', query: null, change };
    if (/^(?:-?\d|не\s)/u.test(value) || readQuantity(value.split(/\s+/), 0)) return { type: 'unrecognized' };
    return { type: 'correct', query: null, change: { kind: 'name', name: value } };
  }
  // Failed command grammar is reported instead of adding a product named
  // "перенеси...", "нет..." or "сделай...".
  if (/^(?:нет|точнее|не|сделай|измени|поменяй|установи|замени|переименуй|назови|перенеси|перемести|no|actually|make|rename|replace|move)(?=\s|,|$)/u.test(cleaned)) {
    return { type: 'unrecognized' };
  }
  return parseSpeechCommand(text);
};

/** Corrections can follow an add in the same breath or in the next utterance. */
export const parseSpeechUtterance = (text: string): ConversationCommand[] => {
  const note = NOTE_MARKER.exec(text);
  const boundary = note?.index ?? text.length;
  const body = text.slice(0, boundary);
  const parts = body.split(/(?:\s*[,;.!?…—–]+\s*|\s+)(?=(?:нет|точнее|сделай|замени|переименуй|перенеси|перемести|измени|no|actually|make|rename|replace|move)(?=[,\s]))/iu);
  parts[parts.length - 1] += text.slice(boundary);
  return parts.filter((part) => part.trim()).map(parseConversationCommand);
};
