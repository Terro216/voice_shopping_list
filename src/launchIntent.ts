/**
 * How the app was opened, read once at startup: from the home-screen "mic"
 * shortcut, or as the target of a "Share" from another app.
 *
 * Read at module load and stripped from the URL immediately, so a reload — or a
 * component remounting when the active list changes — cannot replay the intent.
 */
const params = new URLSearchParams(window.location.search);

const state = {
  mic: params.get('mic') === '1',
  // A share carries a title and/or a body; both may hold list lines, and the
  // shared `url` is dropped because a link is never a shopping item.
  sharedText: [params.get('title'), params.get('text')].filter(Boolean).join('\n') || null,
};

if (state.mic || state.sharedText) {
  const url = new URL(window.location.href);
  for (const key of ['mic', 'title', 'text', 'url']) url.searchParams.delete(key);
  window.history.replaceState({}, '', url);
}

/** True at most once: the first caller acts on the intent, later ones get false. */
export const takeMicIntent = () => {
  const wanted = state.mic;
  state.mic = false;
  return wanted;
};

/** The shared text at most once, then null. */
export const takeSharedText = () => {
  const text = state.sharedText;
  state.sharedText = null;
  return text;
};
