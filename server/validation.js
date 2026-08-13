export const MAX_ITEM_NAME_LENGTH = 200;
export const MAX_ITEM_NOTE_LENGTH = 200;
export const MAX_COUNT = 999;
export const MAX_LIST_NAME_LENGTH = 60;
// Generous enough that nobody sane hits it, low enough that a scripted loop
// cannot fill the database with empty lists.
export const MAX_LISTS_PER_OWNER = 50;
// One reorder request carries the whole visible order, so this bounds it.
export const MAX_ORDER_IDS = 1000;

// New usernames: latin letters, digits, _ and -, 3..32 chars. Only enforced on
// registration — pre-existing accounts with other names must still be able to
// log in and be referenced as list owners.
export const isValidNewUsername = (username) =>
  typeof username === "string" && /^[a-zA-Z0-9_-]{3,32}$/.test(username);

// A username used as a lookup key (login, list owner) just has to be a sane string.
export const isPlausibleUsername = (username) =>
  typeof username === "string" && username.length > 0 && username.length <= 64;

export const isValidPassword = (password) =>
  // bcrypt silently truncates input at 72 bytes, hence the upper bound.
  typeof password === "string" && password.length >= 8 && Buffer.byteLength(password) <= 72;

/**
 * A list id. Lists created since they became first-class carry a random token,
 * but an account's original list is still identified by its owner's username —
 * which for pre-existing accounts can be any string — so this stays permissive.
 */
export const isValidListId = isPlausibleUsername;

export const normalizeListName = (name) => {
  if (typeof name !== "string") return null;
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0 || trimmed.length > MAX_LIST_NAME_LENGTH) return null;
  return trimmed;
};

export const isValidItemId = (id) =>
  typeof id === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(id);

export const normalizeItemName = (name) => {
  if (typeof name !== "string") return null;
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0 || trimmed.length > MAX_ITEM_NAME_LENGTH) return null;
  return trimmed;
};

/**
 * Item notes are optional: `undefined` means "leave it alone", anything that
 * trims to nothing means "clear it". Returns `false` when the value is not a
 * usable note, which callers turn into a 400.
 */
export const normalizeItemNote = (note) => {
  if (note === null) return null;
  if (typeof note !== "string") return false;
  const trimmed = note.trim().replace(/\s+/g, " ");
  if (trimmed.length > MAX_ITEM_NOTE_LENGTH) return false;
  return trimmed.length === 0 ? null : trimmed;
};

export const isValidCount = (count) =>
  Number.isInteger(count) && count >= 1 && count <= MAX_COUNT;

// Invite tokens are 18 random bytes in base64url.
export const isValidShareToken = (token) =>
  typeof token === "string" && /^[A-Za-z0-9_-]{16,64}$/.test(token);

// Suggestion history is keyed on this: lowercase, single spaces, and ё folded
// into е so «ёлка» and «елка» stay one entry instead of two rival suggestions.
export const historyKey = (name) => name.toLowerCase().replace(/ё/g, "е");
