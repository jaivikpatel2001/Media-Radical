'use client';

import { DURATION, GSAP_EASE, STAGGER, TRIGGER } from '@/constants/motion';

import { gsap } from '../core/gsap';

/**
 * The generic scroll reveal.
 *
 * Markup declares intent with `data-anim="fade-up"`; styles/motion.css sets
 * the matching initial state at first paint; this preset animates to the
 * resting state. Sections therefore stay Server Components — they ship
 * attributes, not animation code.
 *
 * Optional per-element attributes:
 *   data-anim-delay="0.2"   seconds
 *   data-anim-start="top 70%"  overrides the trigger point
 */

type RestingState = Record<string, string | number>;

const RESTING: Record<string, RestingState> = {
  fade: { opacity: 1 },
  'fade-up': { opacity: 1, y: 0 },
  'fade-up-sm': { opacity: 1, y: 0 },
  'fade-down': { opacity: 1, y: 0 },
  'fade-left': { opacity: 1, x: 0 },
  'fade-right': { opacity: 1, x: 0 },
  'scale-in': { opacity: 1, scale: 1 },
  'clip-up': { clipPath: 'inset(0% 0 0 0)' },
  'clip-right': { clipPath: 'inset(0 0% 0 0)' },
};

const durationFor = (kind: string): number =>
  kind.startsWith('clip') ? DURATION.cinematic : DURATION.slower;

/**
 * Reveals every `[data-anim]` and `[data-anim-stagger]` descendant of `scope`.
 * Call inside a `useGSAP` with `{ scope }` so cleanup is automatic.
 */
export function revealScope(scope: HTMLElement): void {
  const singles = gsap.utils.toArray<HTMLElement>('[data-anim]', scope);

  singles.forEach((element) => {
    const kind = element.dataset.anim ?? 'fade-up';
    // `lines` is owned by the splitLines preset.
    if (kind === 'lines') return;

    const resting = RESTING[kind];
    if (!resting) return;

    gsap.to(element, {
      ...resting,
      duration: durationFor(kind),
      delay: Number(element.dataset.animDelay ?? 0),
      ease: GSAP_EASE.outExpo,
      // Drop the compositor hint once the element is at rest; leaving
      // will-change on dozens of nodes costs real memory.
      onComplete: () => gsap.set(element, { willChange: 'auto' }),
      scrollTrigger: {
        trigger: element,
        start: element.dataset.animStart ?? TRIGGER.reveal,
        once: true,
      },
    });
  });

  const groups = gsap.utils.toArray<HTMLElement>('[data-anim-stagger]', scope);

  groups.forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[];
    if (children.length === 0) return;

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: DURATION.slower,
      ease: GSAP_EASE.outExpo,
      stagger: Number(group.dataset.animStagger ?? STAGGER.base),
      delay: Number(group.dataset.animDelay ?? 0),
      onComplete: () => gsap.set(children, { willChange: 'auto' }),
      scrollTrigger: {
        trigger: group,
        start: group.dataset.animStart ?? TRIGGER.reveal,
        once: true,
      },
    });
  });
}
