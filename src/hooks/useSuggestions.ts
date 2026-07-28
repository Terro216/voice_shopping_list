import { useState, useEffect, useCallback } from 'react';
import { Suggestion, fetchSuggestions } from '../api/items';

const TYPEAHEAD_DEBOUNCE_MS = 250;

/**
 * Purchase-history suggestions: `frequent` for the idle state, `matches` while
 * the user is typing (≥2 chars, debounced). Both fail silently to empty — the
 * feature should never get in the way.
 */
export const useSuggestions = (username: string, query: string) => {
  const [frequent, setFrequent] = useState<Suggestion[]>([]);
  const [matches, setMatches] = useState<Suggestion[]>([]);

  const refreshFrequent = useCallback(async () => {
    try {
      setFrequent(await fetchSuggestions(username));
    } catch {
      setFrequent([]);
    }
  }, [username]);

  useEffect(() => {
    refreshFrequent();
  }, [refreshFrequent]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setMatches([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        setMatches(await fetchSuggestions(username, q));
      } catch {
        setMatches([]);
      }
    }, TYPEAHEAD_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [username, query]);

  return { frequent, matches, refreshFrequent };
};
