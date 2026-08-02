'use client';

import { useEffect } from 'react';

import { useLenisRef } from '@/components/providers/SmoothScrollProvider';

/**
 * Freezes the page behind a drawer or modal.
 *
 * Two things must happen together: Lenis has to stop — `overflow: hidden`
 * alone does nothing to a smooth scroller that is driving its own rAF loop —
 * and the scrollbar's width has to be compensated, or the page visibly jumps
 * sideways as the bar disappears.
 *
 * The Lenis instance is read from the ref inside the effect, so this hook
 * does not need to re-run when the instance is created.
 */
export function useLockBodyScroll(locked: boolean): void {
  const lenisRef = useLenisRef();

  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    body.classList.add('scrollLocked');
    lenisRef.current?.stop();

    return () => {
      body.classList.remove('scrollLocked');
      body.style.removeProperty('--scrollbar-width');
      // Reading `.current` at cleanup rather than a captured copy is the
      // point: if the preference flipped to reduced motion while the drawer
      // was open, the instance we stopped no longer exists, and calling
      // start() on the destroyed one would resurrect a dead rAF loop. We
      // want whichever instance is live now — or none.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      lenisRef.current?.start();
    };
  }, [locked, lenisRef]);
}
