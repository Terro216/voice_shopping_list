import type { Item, ItemEdit } from '../api/items';
import type { Correction } from './speechParser';
import { sameName, sameWord } from './wordForms';

const words = (text: string) => text.toLowerCase().replace(/ё/g, 'е').trim().split(/\s+/);

/** Return every plausible row; tied names with different notes need a choice. */
export const conversationMatches = <T extends { name: string }>(entries: T[], query: string): T[] => {
  const wanted = words(query);
  return entries.filter(({ name }) => {
    const tokens = words(name);
    return sameName(tokens.join(' '), wanted.join(' ')) ||
      wanted.every((word) => tokens.some((token) => sameWord(token, word)));
  });
};

export const destinationMatches = <T extends { name: string }>(entries: T[], query: string): T[] => {
  const cleaned = query.toLowerCase().replace(/^(?:для|на|for|the)\s+/u, '').trim();
  const exact = entries.filter(({ name }) => words(name).join(' ') === words(query).join(' '));
  return exact.length ? exact : entries.filter(({ name }) => sameName(words(name).join(' '), words(cleaned).join(' ')));
};

export const itemFingerprint = (item: Item) =>
  JSON.stringify([item.id, item.name, item.note ?? null, item.count, item.unit ?? null, item.bought, item.list_id]);

const ADJECTIVE_RE = /^(безлактозн|обычн|овсян|соев|миндальн|кокосов|обезжиренн)(?:ым|ый|ое|ая|ой|ую|ые|ыми|ого)$/u;
const adjectiveGroup = (stem: string) => stem === 'безлактозн' ? 'lactose' : stem === 'обезжиренн' ? 'fat' : 'base';

/** A small explicit vocabulary for adjective-only corrections; no guessed nouns. */
const adjectiveName = (name: string, value: string): string | null => {
  if (/^[a-z][a-z -]*$/i.test(name) && /^[a-z][a-z -]*$/i.test(value)) return `${value} ${name}`;
  const nounForms: [RegExp, string, string][] = [
    [/^молок[оа]$/u, 'молоко', 'ое'], [/^масл[оа]$/u, 'масло', 'ое'],
    [/^кофе$/u, 'кофе', 'ый'], [/^хлеб[а]?$/u, 'хлеб', 'ый'],
    [/^сыр[а]?$/u, 'сыр', 'ый'], [/^йогурт[а]?$/u, 'йогурт', 'ый'],
    [/^кефир[а]?$/u, 'кефир', 'ый'], [/^сметан[ауы]$/u, 'сметана', 'ая'],
    [/^сливки$/u, 'сливки', 'ые'],
  ];
  const adjective = value.match(ADJECTIVE_RE);
  const tokens = words(name);
  const noun = nounForms.find(([pattern]) => tokens.some((token) => pattern.test(token)));
  if (!adjective || !noun) return null;
  const [pattern, canonical, ending] = noun;
  const kept = tokens.filter((token) => {
    const previous = token.match(ADJECTIVE_RE);
    return !previous || (previous[1] !== 'обычн' && adjectiveGroup(previous[1]) !== adjectiveGroup(adjective[1]));
  }).map((token) => pattern.test(token) ? canonical : token);
  return `${kept.join(' ')} ${adjective[1]}${ending}`;
};

export const correctionEdit = (item: Item, change: Correction): ItemEdit | null => {
  if (change.kind === 'quantity') return { count: change.count, unit: change.unit ?? item.unit ?? null };
  if (change.kind === 'name' && !ADJECTIVE_RE.test(change.name)) return { name: change.name };
  const name = adjectiveName(item.name, change.kind === 'name' ? change.name : change.value);
  return name ? { name } : null;
};
