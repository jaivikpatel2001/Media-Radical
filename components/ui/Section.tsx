import type { SectionVariant } from '@/types/common';
import { cx } from '@/utils/cx';

import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: SectionVariant;
  spacing?: 'default' | 'large' | 'small';
  /** Draws the fading hairline on the leading edge. */
  divided?: boolean;
  /** Defers paint until near the viewport. Off for the hero and anything above the fold. */
  deferPaint?: boolean;
  /** Accessible name for the landmark, when the visible heading is not enough. */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * A full-bleed page section: vertical rhythm, background variant and landmark
 * semantics in one place, so every section on all 17 page groups shares the
 * same spacing scale.
 */
export function Section({
  children,
  id,
  className,
  variant = 'default',
  spacing = 'default',
  divided = false,
  deferPaint = true,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx(
        styles.section,
        variant === 'subtle' && styles.subtle,
        variant === 'inverted' && [styles.inverted, 'invertedSurface'].join(' '),
        spacing === 'large' && styles.spacingLarge,
        spacing === 'small' && styles.spacingSmall,
        divided && styles.divided,
        deferPaint && 'deferPaint',
        className,
      )}
      {...aria}
    >
      {children}
    </section>
  );
}
