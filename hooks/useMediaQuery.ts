'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * SSR-safe media query subscription.
 *
 * `useSyncExternalStore` rather than useState + useEffect: it reads the match
 * during the same commit that hydrates, so there is no first-frame render at
 * the wrong breakpoint. The server snapshot is always `false`, which means
 * markup must be written so the false branch is the safe one.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
