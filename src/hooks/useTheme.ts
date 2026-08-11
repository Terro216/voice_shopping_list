import { useEffect, useState } from 'react';

export type ThemeChoice = 'auto' | 'light' | 'dark';

const STORAGE_KEY = 'theme';

const isThemeChoice = (value: string | null): value is ThemeChoice =>
  value === 'auto' || value === 'light' || value === 'dark';

const readStoredTheme = (): ThemeChoice => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isThemeChoice(stored) ? stored : 'auto';
};

const stamp = (theme: ThemeChoice) => {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
};

/**
 * Called before the first render so an explicitly chosen theme is already on
 * <html> when the page paints — a flash of light UI is exactly what someone
 * checking a list in a dark shop picked dark mode to avoid. A CSP without
 * 'unsafe-inline' rules out the usual inline <script> for this.
 */
export const applyStoredTheme = () => stamp(readStoredTheme());

/**
 * Stores the theme preference and stamps it on <html>, where the stylesheet
 * picks it up. "auto" removes the attribute so the OS setting decides — an
 * evening list should not be a floodlight.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeChoice>(readStoredTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    stamp(theme);
  }, [theme]);

  return { theme, setTheme };
};
