'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { site } from '@/data/site';
import { cx } from '@/utils/cx';

import styles from './Preloader.module.css';

/**
 * Shortest time on screen. This is not an arbitrary "feels right" number: the
 * intro sequence is not finished until roughly 1360ms, because the third arc
 * starts at 440ms and takes 700ms to draw, and the caption settles at 1360ms.
 * Anything less and the mark fades out mid-draw and nobody ever sees it land.
 */
const MIN_VISIBLE_MS = 1400;
/**
 * Hard ceiling. Whatever happens with fonts or a slow network, the overlay is
 * gone by now. A preloader that can hang is worse than no preloader.
 */
const MAX_VISIBLE_MS = 2200;
/** Must match the transition duration in Preloader.module.css. */
const EXIT_MS = 420;

/**
 * The wordmark, split once at module scope rather than on every render.
 * Each character rises from behind its own mask, staggered by its index.
 */
const WORDMARK = Array.from(site.name);

/**
 * First-load preloader.
 *
 * The brand mark draws itself: the core lands, then three arcs sweep outward
 * in sequence. It is the logo from components/ui/Logo.tsx at display size,
 * so the first thing on screen is the identity, not a generic spinner.
 *
 * WHY THIS DOES NOT COST CORE WEB VITALS
 *
 * A preloader normally trades measurable performance for a first impression.
 * This one is built to avoid that trade:
 *
 * • It is a `position: fixed` overlay. The real page renders underneath at
 *   its normal speed and nothing is gated on this component, so the browser
 *   still paints and lays out the hero on the usual schedule.
 * • The markup ships in the server HTML, so there is no wait for hydration
 *   and no flash of unstyled page before it appears.
 * • Dismissal is driven by `document.fonts.ready`, not `window.onload`, so it
 *   never waits on below-the-fold images it does not care about.
 * • A hard `MAX_VISIBLE_MS` ceiling means it cannot hang the experience.
 * • It is removed from the DOM once it has left, so it can never intercept a
 *   pointer event or keep a layer alive.
 * • It runs on a document load, not on every page view. Moving between pages
 *   is a client-side navigation that keeps the root layout mounted, so this
 *   component never remounts and the overlay does not reappear.
 *
 * There is no percentage. Nothing here measures real progress, and a fake
 * number that snaps to 100 is worse than an honest indeterminate sweep.
 */
export function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const shownAt = useRef<number>(0);

  useEffect(() => {
    shownAt.current = performance.now();
    document.documentElement.classList.add('preloading');

    let exitTimer: number;
    let removeTimer: number;
    let cancelled = false;

    const dismiss = () => {
      if (cancelled) return;
      cancelled = true;

      // Hold for the remainder of the minimum, so a fast load does not
      // produce a flicker.
      const elapsed = performance.now() - shownAt.current;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      exitTimer = window.setTimeout(() => {
        setLeaving(true);
        document.documentElement.classList.remove('preloading');
        removeTimer = window.setTimeout(() => setRemoved(true), EXIT_MS);
      }, wait);
    };

    // Fonts are the thing worth waiting for: the headline reflows when Poppins
    // swaps in, and that is the reflow a visitor would actually notice.
    const fonts = document.fonts?.ready ?? Promise.resolve();
    void fonts.then(dismiss);

    const ceiling = window.setTimeout(dismiss, MAX_VISIBLE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(ceiling);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.documentElement.classList.remove('preloading');
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={cx(styles.root, leaving && styles.leaving)}
      // A live region rather than a dialog: it announces itself once and never
      // traps focus, so a keyboard user is not stuck behind it.
      role="status"
      aria-live="polite"
      aria-label={site.ui.preloader.status}
    >
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.markWrap} aria-hidden="true">
          <span className={styles.pulse} />
          <svg
            className={styles.mark}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              className={styles.core}
              cx="12"
              cy="12"
              r="3.2"
              fill="currentColor"
            />
            {/* pathLength="1" normalises each arc so one dash rule draws all
                three, whatever their real geometry. */}
            <path
              className={cx(styles.arc, styles.arc1)}
              d="M12 4.4a7.6 7.6 0 0 1 7.6 7.6"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              className={cx(styles.arc, styles.arc2)}
              d="M12 0.8a11.2 11.2 0 0 1 11.2 11.2"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              className={cx(styles.arc, styles.arc3)}
              d="M12 19.6A7.6 7.6 0 0 1 4.4 12"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Split into characters, hence aria-hidden: a screen reader spelling
            out "M e d i a" one letter at a time is worse than silence, and the
            region already announces itself by name. */}
        <p className={styles.wordmark} aria-hidden="true">
          {WORDMARK.map((char, i) => (
            <span key={`${char}-${i}`} className={styles.char}>
              {/* The gap between the words is a non-breaking space, so it keeps
                  its width inside an inline-block that clips its overflow. */}
              <span className={styles.charInner} style={{ '--i': i } as CSSProperties}>
                {char === ' ' ? ' ' : char}
              </span>
            </span>
          ))}
        </p>

        {/* Decorative to assistive tech: the region already carries an
            accessible name, so announcing this too would just repeat the
            brand at someone who only wants to know the page is loading. */}
        <p className={styles.caption} aria-hidden="true">
          {site.ui.preloader.caption}
        </p>

        <div className={styles.rail} aria-hidden="true">
          <span className={styles.railFill} />
        </div>
      </div>
    </div>
  );
}
