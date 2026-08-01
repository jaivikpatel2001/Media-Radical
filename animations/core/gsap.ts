'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import { DURATION, GSAP_EASE } from '@/constants/motion';

/**
 * Single registration point for GSAP and its plugins.
 *
 * Registering at module scope is safe during SSR — the plugins defer all
 * window access — and it guarantees that any scene importing `gsap` from here
 * gets a fully configured instance. Importing `gsap` directly from the
 * package anywhere else would bypass these defaults, so don't.
 *
 * SplitText and ScrollTrigger are both free as of GSAP 3.13; no licence gate.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({
  ease: GSAP_EASE.outExpo,
  duration: DURATION.slower,
});

gsap.config({
  // Scenes select by data-attribute within a scope; an absent optional
  // element is expected, not a bug worth logging on every mount.
  nullTargetWarn: false,
});

if (typeof window !== 'undefined') {
  ScrollTrigger.config({
    // Mobile browsers fire resize when the URL bar collapses. Recalculating
    // every pinned trigger on that is the classic source of scroll jump.
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
