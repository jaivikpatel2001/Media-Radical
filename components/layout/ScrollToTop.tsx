'use client';

import { ArrowUp } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLenisRef } from '@/components/providers/SmoothScrollProvider';
import { site } from '@/data/site';
import { cx } from '@/utils/cx';

import styles from './ScrollToTop.module.css';

/** Roughly one viewport down before the control is worth offering. */
const SHOW_AFTER_RATIO = 0.9;

/**
 * Back-to-top control, bottom right.
 *
 * Two details worth knowing:
 *
 * 1. It scrolls through Lenis when Lenis is running, so the trip back up has
 *    the same easing as every other scroll on the site. A raw
 *    `window.scrollTo` would fight the smooth scroller and land with a jolt.
 *    When Lenis is absent — which is the case under reduced motion, where it
 *    is never instantiated — it falls back to a native jump with `behavior`
 *    set from the user's own preference.
 *
 * 2. The ring around it traces scroll progress. It is a conic gradient masked
 *    to a 2px band rather than an SVG, so it is one element and one custom
 *    property, updated from a rAF-throttled scroll listener that only writes
 *    to the DOM when the rounded value actually changes.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lenisRef = useLenisRef();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastProgress = useRef(-1);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrolled > window.innerHeight * SHOW_AFTER_RATIO);

      // Write the ring only when the value changes at the precision the eye
      // can resolve, so a full-page scroll is a few dozen writes, not hundreds.
      const progress = max > 0 ? Math.min(1, scrolled / max) : 0;
      const rounded = Math.round(progress * 100);
      if (rounded !== lastProgress.current) {
        lastProgress.current = rounded;
        buttonRef.current?.style.setProperty('--progress', String(rounded / 100));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = useCallback(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }, [lenisRef]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={cx(styles.button, visible && styles.visible)}
      onClick={toTop}
      // Hidden from AT while off-screen, so it is not announced or reachable
      // until it is genuinely available.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label={site.ui.scrollToTop}
    >
      <span className={styles.ring} aria-hidden="true" />
      <ArrowUp className={styles.arrow} size={19} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
