import Link from 'next/link';

import { TECH_LOGOS } from '@/components/icons/techLogos';
import { ScrollScene } from '@/components/providers/ScrollScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Emphasis } from '@/components/ui/Emphasis';
import { IconCloud } from '@/components/ui/IconCloud';
import { Media } from '@/components/ui/Media';
import type { SectionProps } from '@/types/common';
import type { HeroContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './HeroSection.module.css';

function Tick() {
  return (
    <svg
      className={styles.proofTick}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m2.6 7.4 2.8 2.8 6-6.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hero.
 *
 * A Server Component: the headline is in the server HTML, so it is both the
 * LCP element and the first thing a crawler reads. All motion is driven by
 * the `data-anim` attributes below, interpreted by the client ScrollScene
 * wrapper — no animation code is shipped for this section itself.
 *
 * Load sequence is staged by explicit delays rather than left to the shared
 * reveal defaults: headline first, then lede, buttons, proof rail. The art
 * unmasks underneath from animations/scenes/hero.ts.
 */
export function HeroSection({ content }: SectionProps<HeroContent>) {
  // Resolved here, on the server, so the logo path data never has to travel
  // through the client component's props as a hardcoded list. Ids without a
  // logo are dropped rather than leaving a hole in the sphere.
  const cloudLogos = content.techCloud
    ? content.techCloud.technologyIds
        .map((id) => TECH_LOGOS[id])
        .filter(Boolean)
    : [];

  return (
    <ScrollScene
      as="section"
      scene="hero"
      className={styles.hero}
      aria-label="Introduction"
    >
      <div className={styles.mesh} aria-hidden="true" />
      <div className="gridLines" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.copy} data-hero-copy>
          {content.announcement ? (
            <Link
              href={content.announcement.href ?? '#'}
              className={styles.announcement}
              data-anim="fade-up-sm"
            >
              <span className={styles.pulse} aria-hidden="true" />
              {content.announcement.label}
              <svg
                className={styles.announcementArrow}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6h8m0 0L7 3m3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : null}

          <h1
            className={cx(styles.headline, 'display-lg')}
            data-anim="lines"
            data-anim-trigger="load"
            data-anim-delay="0.12"
          >
            <Emphasis text={content.headline} emphasis={content.emphasis} />
          </h1>

          <p
            className={cx(styles.lede, 'body-lg')}
            data-anim="fade-up"
            data-anim-delay="0.42"
          >
            {content.lede}
          </p>

          <div className={styles.actions} data-anim="fade-up" data-anim-delay="0.52">
            <Button href={content.primaryCta.href} size="lg" withArrow>
              {content.primaryCta.label}
            </Button>
            {content.secondaryCta ? (
              <Button
                href={content.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {content.secondaryCta.label}
              </Button>
            ) : null}
          </div>

        </div>

        {content.techCloud && cloudLogos.length > 0 ? (
          <div className={cx(styles.art, styles.artCloud)} data-hero-art>
            <IconCloud
              logos={cloudLogos}
              label={content.techCloud.label}
              speed={8}
            />
            {content.highlightSecondary ? (
              <div className={cx(styles.floatCard, styles.floatCardTop)}>
                <span className={styles.floatValue}>
                  {content.highlightSecondary.value}
                </span>
                <span className={styles.floatLabel}>
                  {content.highlightSecondary.label}
                </span>
              </div>
            ) : null}
            {content.highlight ? (
              <div className={styles.floatCard}>
                <span className={styles.floatValue}>
                  {content.highlight.value}
                </span>
                <span className={styles.floatLabel}>
                  {content.highlight.label}
                </span>
              </div>
            ) : null}
          </div>
        ) : content.media ? (
          <div className={styles.art} data-hero-art>
            <Media
              asset={content.media}
              className={styles.artMedia}
              sizes="(min-width: 900px) 55vw, 100vw"
              priority
              placeholderLabel="hero"
            />
            {content.highlight ? (
              <div className={styles.floatCard}>
                <span className={styles.floatValue}>
                  {content.highlight.value}
                </span>
                <span className={styles.floatLabel}>
                  {content.highlight.label}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>

      {/* Proof points, lifted out of the copy column and set as a full-width
          band under both halves. They read as evidence for the whole hero
          rather than as a footnote to the left-hand text, and the row gives
          the section a base line to sit on. */}
      <Container className={styles.proofBand}>
        <ul className={styles.proof} data-anim-stagger data-anim-delay="0.6">
          {content.proofPoints.map((point) => (
            <li key={point} className={styles.proofItem}>
              <span className={styles.proofTickWrap}>
                <Tick />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Container>

      <div className={styles.cue} data-hero-cue aria-hidden="true">
        <span className="label">Scroll</span>
        <span className={styles.cueLine} />
      </div>
    </ScrollScene>
  );
}
