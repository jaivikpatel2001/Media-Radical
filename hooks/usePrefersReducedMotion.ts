'use client';

import { MEDIA } from '@/constants/breakpoints';

import { useMediaQuery } from './useMediaQuery';

/**
 * Reactive reduced-motion preference.
 *
 * Defaults to `false` on the server, which is correct here: the markup that
 * renders under `false` is the animated one, and styles/motion.css only hides
 * anything once `.js-motion` is present — a class the inline head script
 * withholds when the preference is set. A visitor who prefers reduced motion
 * therefore never sees a hidden element, regardless of what this returns
 * during SSR.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(MEDIA.motionReduced);
}
