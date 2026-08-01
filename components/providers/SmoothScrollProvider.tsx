'use client';

import type Lenis from 'lenis';
import { createContext, useContext, useEffect, useRef } from 'react';

import { createLenis } from '@/animations/core/lenis';
import { ScrollTrigger } from '@/animations/core/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type LenisRef = { current: Lenis | null };

const LenisContext = createContext<LenisRef>({ current: null });

/**
 * The Lenis instance, as a stable ref.
 *
 * A ref rather than state on purpose: consumers only ever drive Lenis
 * imperatively (`stop`, `start`, `scrollTo`) from inside effects and event
 * handlers. Nothing renders differently because the instance exists, so
 * putting it in state would mean an extra render of the entire tree on mount
 * to communicate something no component displays.
 *
 * Read `.current` inside an effect or a handler, never during render.
 */
export const useLenisRef = (): LenisRef => useContext(LenisContext);

/**
 * Owns the one and only Lenis instance, mounted in the root layout so every
 * route inherits it. Lenis adds its own `lenis*` classes to <html>; the
 * matching rules live in app/globals.css.
 *
 * Under reduced motion no instance is created at all — native scrolling is
 * the correct behaviour, and even a stopped Lenis still intercepts wheel
 * events.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const instance = createLenis();
    lenisRef.current = instance;

    return () => {
      instance.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    // Every trigger position measured before the webfont swaps is wrong by a
    // few pixels of line height. One refresh once fonts settle fixes the lot.
    if (!document.fonts) return;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
