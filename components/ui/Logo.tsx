import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { site } from '@/data/site';
import { cx } from '@/utils/cx';

import styles from './Logo.module.css';

interface LogoProps {
  /** Hides the wordmark, leaving only the mark. */
  compact?: boolean;
  className?: string;
  /** The footer logo is not a link when it sits beside other home links. */
  asLink?: boolean;
}

/**
 * The mark is three arcs radiating from a solid core — drawn, not imported,
 * so it inherits the theme and costs nothing to load.
 */
function Mark() {
  return (
    <svg
      className={styles.mark}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <path
        className={styles.arc}
        d="M12 4.4a7.6 7.6 0 0 1 7.6 7.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        className={cx(styles.arc, styles.arcOuter)}
        d="M12 0.8a11.2 11.2 0 0 1 11.2 11.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        className={styles.arc}
        d="M12 19.6A7.6 7.6 0 0 1 4.4 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ compact = false, className, asLink = true }: LogoProps) {
  const content = (
    <>
      <Mark />
      <span className={styles.wordmark}>
        <span className={styles.name}>
          Media <span className={styles.suffix}>Radical</span>
        </span>
      </span>
    </>
  );

  if (!asLink) {
    return (
      <span className={cx(styles.logo, compact && styles.compact, className)}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={ROUTES.home}
      className={cx(styles.logo, compact && styles.compact, className)}
      aria-label={`${site.name} — home`}
    >
      {content}
    </Link>
  );
}
