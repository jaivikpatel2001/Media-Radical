'use client';

import { gsap } from '../core/gsap';

/**
 * Seamless horizontal marquee for the client-logo strip.
 *
 * One tween with a `modifiers` wrap, rather than a CSS keyframe on a
 * duplicated DOM: the track holds two copies of the list (the minimum for a
 * seam-free loop) and `wrap` folds the x value back, so there is no restart
 * stutter and no third copy to pay for.
 *
 * Returns a cleanup function. Speed is px/second, so the visual pace is the
 * same whether the strip holds six logos or sixteen.
 */
export function createMarquee(
  track: HTMLElement,
  { speed = 42, reverse = false } = {},
): () => void {
  // The track renders the list twice; one copy's width is the loop distance.
  const loopDistance = track.scrollWidth / 2;
  if (loopDistance <= 0) return () => {};

  const wrap = gsap.utils.wrap(-loopDistance, 0);
  const direction = reverse ? 1 : -1;

  const tween = gsap.to(track, {
    x: direction * loopDistance,
    duration: loopDistance / speed,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: (value: string) => `${wrap(parseFloat(value))}px`,
    },
  });

  // Pausing on hover lets a visitor actually read a logo they recognised.
  const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
  const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });

  track.addEventListener('pointerenter', pause);
  track.addEventListener('pointerleave', resume);
  track.addEventListener('focusin', pause);
  track.addEventListener('focusout', resume);

  return () => {
    track.removeEventListener('pointerenter', pause);
    track.removeEventListener('pointerleave', resume);
    track.removeEventListener('focusin', pause);
    track.removeEventListener('focusout', resume);
    tween.kill();
  };
}
