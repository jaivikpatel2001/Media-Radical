'use client';

import { GSAP_EASE } from '@/constants/motion';

import { gsap } from '../core/gsap';

/**
 * Scroll-linked parallax for `[data-parallax]` descendants.
 *
 * `data-parallax` holds the strength: positive drifts the element up as the
 * page scrolls (it appears further away), negative pushes it down. Values are
 * a fraction of the element's own height, so the effect scales with the art
 * rather than needing a pixel figure per breakpoint.
 *
 *   <div data-parallax="0.18">
 *
 * Media using parallax must be over-sized by roughly the same fraction, or
 * the drift will expose an edge.
 */
export function parallaxScope(scope: HTMLElement): void {
  const targets = gsap.utils.toArray<HTMLElement>('[data-parallax]', scope);

  targets.forEach((element) => {
    const strength = Number(element.dataset.parallax ?? 0.15);
    if (!strength) return;

    gsap.fromTo(
      element,
      { yPercent: -strength * 50 },
      {
        yPercent: strength * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: element.closest('[data-parallax-scope]') ?? element,
          start: 'top bottom',
          end: 'bottom top',
          // A little smoothing keeps it from feeling mechanically welded to
          // the wheel; 0.6s is enough to read as inertia, short enough not
          // to lag behind Lenis.
          scrub: 0.6,
        },
      },
    );
  });
}

/**
 * Pointer-follow tilt for a single card or panel. Desktop pointers only —
 * callers gate this behind the `(hover: hover)` matchMedia branch.
 */
export function pointerTilt(
  element: HTMLElement,
  { maxDeg = 6, maxLift = 10 } = {},
): () => void {
  const rotateX = gsap.quickTo(element, 'rotationX', {
    duration: 0.5,
    ease: GSAP_EASE.outQuart,
  });
  const rotateY = gsap.quickTo(element, 'rotationY', {
    duration: 0.5,
    ease: GSAP_EASE.outQuart,
  });
  const lift = gsap.quickTo(element, 'y', {
    duration: 0.5,
    ease: GSAP_EASE.outQuart,
  });

  const onMove = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY(x * maxDeg * 2);
    rotateX(-y * maxDeg * 2);
    lift(-maxLift);
  };

  const onLeave = () => {
    rotateX(0);
    rotateY(0);
    lift(0);
  };

  element.addEventListener('pointermove', onMove);
  element.addEventListener('pointerleave', onLeave);

  return () => {
    element.removeEventListener('pointermove', onMove);
    element.removeEventListener('pointerleave', onLeave);
  };
}
