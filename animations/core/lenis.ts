'use client';

import Lenis from 'lenis';

import { gsap, ScrollTrigger } from './gsap';

/**
 * Creates the single Lenis instance and wires it to GSAP.
 *
 * The bridge below is the part that matters. Left to themselves, Lenis runs
 * its own requestAnimationFrame loop while ScrollTrigger listens to native
 * scroll events — two clocks, one frame apart, which is exactly what a
 * "slightly laggy" scrub looks like. Instead:
 *
 *   1. `autoRaf: false`  — Lenis stops driving itself.
 *   2. `gsap.ticker.add` — GSAP's clock advances Lenis, so both are on the
 *                          same frame. GSAP's ticker is in seconds, Lenis
 *                          wants milliseconds.
 *   3. `lenis.on('scroll', ScrollTrigger.update)` — ScrollTrigger reads the
 *                          smoothed position rather than the raw one.
 *   4. `lagSmoothing(0)`  — GSAP's default lag recovery jumps the playhead
 *                          after a stall, which would tear the scrub.
 */
export function createLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.15,
    // A long, flat curve: the page keeps gliding well after the wheel stops.
    easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    // Touch devices already have native inertia; overriding it feels wrong.
    syncTouch: false,
    touchMultiplier: 1.6,
    wheelMultiplier: 1,
    autoRaf: false,
  });

  const onScroll = () => ScrollTrigger.update();
  lenis.on('scroll', onScroll);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Teardown must undo all three couplings, or a fast route change leaves an
  // orphaned ticker callback holding a reference to a destroyed instance.
  const originalDestroy = lenis.destroy.bind(lenis);
  lenis.destroy = () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.off('scroll', onScroll);
    originalDestroy();
  };

  return lenis;
}
