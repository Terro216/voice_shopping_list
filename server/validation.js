export const MAX_ITEM_NAME_LENGTH = 200;
export const MAX_COUNT = 999;

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

export const isValidItemId = (id) =>
  typeof id === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(id);

export const normalizeItemName = (name) => {
  if (typeof name !== "string") return null;
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0 || trimmed.length > MAX_ITEM_NAME_LENGTH) return null;
  return trimmed;
};

export const isValidCount = (count) =>
  Number.isInteger(count) && count >= 1 && count <= MAX_COUNT;
