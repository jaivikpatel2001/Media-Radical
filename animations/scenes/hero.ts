'use client';

import { DURATION, GSAP_EASE } from '@/constants/motion';

import { gsap } from '../core/gsap';

/**
 * Hero-specific timeline.
 *
 * Two distinct jobs, deliberately separated:
 *
 *  1. On load — the art unmasks upward while easing out of a slight scale.
 *     Deferred behind the headline (which the shared splitLines preset drives)
 *     so the eye reads the words first and the image resolves underneath.
 *
 *  2. On scroll — the copy drifts up and dissolves faster than the page moves
 *     while the art drifts down. That divergence is what gives the top of an
 *     Apple product page its sense of depth; a uniform parallax does not.
 */
export function heroScene(root: HTMLElement): void {
  const art = root.querySelector<HTMLElement>('[data-hero-art]');
  const copy = root.querySelector<HTMLElement>('[data-hero-copy]');
  const cue = root.querySelector<HTMLElement>('[data-hero-cue]');

  if (art) {
    gsap.fromTo(
      art,
      { clipPath: 'inset(14% 0% 0% 0%)', scale: 1.12, opacity: 0 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        opacity: 1,
        duration: DURATION.cinematic * 1.25,
        delay: 0.24,
        ease: GSAP_EASE.outExpo,
        onComplete: () => gsap.set(art, { willChange: 'auto' }),
      },
    );
  }

  if (copy) {
    gsap.to(copy, {
      y: -70,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        // Fully gone by the time the hero is two-thirds scrolled past, so the
        // next section arrives to a clean stage.
        end: 'bottom 55%',
        scrub: 0.5,
      },
    });
  }

  if (cue) {
    gsap.to(cue, {
      opacity: 0,
      y: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=220',
        scrub: true,
      },
    });
  }
}
