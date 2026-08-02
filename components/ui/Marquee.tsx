'use client';

import { useRef } from 'react';

import { useGSAP } from '@/animations/core/gsap';
import { prefersReducedMotion } from '@/animations/core/reducedMotion';
import { createMarquee } from '@/animations/presets/marquee';
import { cx } from '@/utils/cx';

import styles from './Marquee.module.css';

interface MarqueeProps {
  children: React.ReactNode;
  /** Pixels per second. Constant pace regardless of how many items there are. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontal scroller.
 *
 * Children are rendered twice — the minimum for a seamless loop — with the
 * second copy hidden from assistive technology so a screen reader hears the
 * list once. Under reduced motion the tween is never created and the row
 * renders as a static strip.
 */
export function Marquee({
  children,
  speed = 44,
  reverse = false,
  className,
}: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !track.current) return;
    return createMarquee(track.current, { speed, reverse });
  }, [speed, reverse]);

  return (
    <div className={cx(styles.viewport, className)}>
      <div ref={track} className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
