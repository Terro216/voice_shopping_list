/**
 * Stands in for `virtual:pwa-register`, which only exists when the PWA plugin
 * is part of the build. Tests run without it.
 */
export const registerSW = () => () => Promise.resolve();
