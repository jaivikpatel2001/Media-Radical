'use client';

import { MEDIA } from '@/constants/breakpoints';

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(MEDIA.motionReduced).matches;
}

/**
 * Restores every declarative initial state inside `root`.
 *
 * styles/motion.css hides `[data-anim]` elements, but only under `.js-motion`
 * — which the inline head script withholds when motion is reduced. This is
 * the belt-and-braces pass: if a scene bails out for any other reason, this
 * guarantees nothing is left at opacity 0.
 */
export function revealImmediately(root: HTMLElement | null): void {
  if (!root) return;

  const targets = root.querySelectorAll<HTMLElement>(
    '[data-anim], [data-anim-stagger] > *',
  );

  targets.forEach((element) => {
    element.style.opacity = '1';
    element.style.transform = 'none';
    element.style.clipPath = 'none';
    element.style.willChange = 'auto';
  });
}
