/**
 * Comparing words the way dictation produces them.
 *
 * A speech engine has no idea it is filling in a shopping list, so the same
 * thing comes back in whatever grammatical form the sentence around it called
 * for: «молоко 4» and «два молока» are the same milk. Comparing the exact
 * strings meant one utterance could add a row that the next one would not find,
 * and the list grew two entries for one product.
 */

const strip = (text: string) => text.toLowerCase().replace(/[.,!?;:…]/g, '');

/**
 * Are these the same word, allowing for a changed ending?
 *
 * Deliberately narrow — the two have to agree on everything but the last letter
 * or two — so «молоко»/«молоток», «чай»/«чайник» and «сок»/«сыр» stay apart.
 * Getting this wrong in the generous direction silently merges two different
 * products, which is far worse than leaving two rows to be tidied by hand.
 */
export const sameWord = (a: string, b: string): boolean => {
  if (a === b) return true;

  const shorter = Math.min(a.length, b.length);
  let common = 0;
  while (common < shorter && a[common] === b[common]) common++;

  // A shared stem of real length, and at most one letter hanging off either
  // end. Measuring both tails is what keeps «сыр» out of «сырок»: agreeing on
  // the whole of the shorter word is not enough on its own.
  return common >= 3 && a.length - common <= 1 && b.length - common <= 1;
};

/**
 * The same item said twice, in two grammatical forms? Word counts have to
 * match, so «молоко» never absorbs «молоко безлактозное».
 */
export const sameName = (a: string, b: string): boolean => {
  if (!a || !b) return false;
  const left = strip(a).split(/\s+/).filter(Boolean);
  const right = strip(b).split(/\s+/).filter(Boolean);
  return left.length === right.length && left.every((word, i) => sameWord(word, right[i]));
};
