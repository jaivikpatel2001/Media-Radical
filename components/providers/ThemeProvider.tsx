'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'mr-theme';
export const DEFAULT_THEME: Theme = 'light';

/* -------------------------------------------------------------------------
   The theme store.

   `data-theme` on <html> is the single source of truth, not React state. The
   inline script in app/layout.tsx sets it before first paint — React cannot
   run early enough to prevent a flash — so mirroring it into state would mean
   two sources that can disagree.

   `useSyncExternalStore` subscribes to that attribute instead. It reads the
   real value during the same commit that hydrates, which is why this needs no
   effect and no `ready` flag: there is no window in which React believes the
   theme is something other than what is on screen.
   ------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
};

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';

/** Light is the design baseline, so it is also what the server renders. */
const getServerSnapshot = (): Theme => DEFAULT_THEME;

function applyTheme(next: Theme): void {
  document.documentElement.setAttribute('data-theme', next);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Private mode or blocked storage — the choice simply will not survive
    // a reload, which is not worth failing the interaction over.
  }

  listeners.forEach((listener) => listener());
}

/* ---------------------------------------------------------------- context */

interface ThemeContextValue {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>');
  return value;
}

/**
 * Theme state.
 *
 * Light is the default and the design baseline — the OS preference is
 * deliberately not consulted. A visitor on a dark-mode machine still sees the
 * light composition the site was designed around until they choose otherwise,
 * and that choice then persists.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);
  const toggle = useCallback(
    () => applyTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggle }),
    [theme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
