// Fuzzy matching of a spoken query against list items. Dictation produces
// inflected forms ("вычеркни молока" vs item "молоко"), so exact comparison is
// not enough; a crude "drop the ending" stemmer covers most Russian/English
// noun forms without pulling in a real morphology library.

const normalize = (s: string) => s.toLowerCase().trim();

const stemWord = (word: string) => (word.length > 4 ? word.slice(0, -2) : word);

const stemPhrase = (s: string) =>
  s
    .split(/\s+/)
    .map(stemWord)
    .join(' ');

export const matchScore = (name: string, query: string): number => {
  const n = normalize(name);
  const q = normalize(query);
  if (!n || !q) return 0;
  if (n === q) return 100;

  const ns = stemPhrase(n);
  const qs = stemPhrase(q);
  if (ns === qs) return 90;
  if (n.startsWith(q) || q.startsWith(n)) return 70;
  if (ns.startsWith(qs) || qs.startsWith(ns)) return 60;
  if (n.includes(q)) return 40;
  return 0;
};

const MIN_SCORE = 40;

export const findBestMatch = <T extends { name: string }>(items: T[], query: string): T | null => {
  let best: T | null = null;
  let bestScore = 0;
  for (const item of items) {
    const score = matchScore(item.name, query);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return bestScore >= MIN_SCORE ? best : null;
};
