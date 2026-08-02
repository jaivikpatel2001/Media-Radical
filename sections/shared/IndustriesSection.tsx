import Link from 'next/link';

import { Icon } from '@/components/icons/registry';
import { ScrollScene } from '@/components/providers/ScrollScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Emphasis } from '@/components/ui/Emphasis';
import { Section } from '@/components/ui/Section';
import { ACCENT_VARS } from '@/constants/accents';
import { ROUTES } from '@/constants/routes';
import { getIndustries } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { IndustriesContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './IndustriesSection.module.css';

/**
 * Industries — SHARED.
 *
 * Deliberately a hairline list rather than another card grid: the section
 * directly above is eight cards, and two grids in succession is what makes a
 * long page read as a template. The sticky heading against a scrolling list
 * also changes the pacing without any scroll-driven animation.
 */
export function IndustriesSection({
  content,
  id,
  variant,
}: SectionProps<IndustriesContent>) {
  const industries = getIndustries(content.industrySlugs);

  return (
    <Section id={id} variant={variant} aria-labelledby="industries-heading">
      <ScrollScene>
        <Container className={styles.inner}>
          <div className={styles.aside}>
            <p className={cx(styles.eyebrow, 'eyebrow')} data-anim="fade-up-sm">
              {content.eyebrow}
            </p>

            <h2
              id="industries-heading"
              className={cx(styles.heading, 'display-sm')}
              data-anim="lines"
            >
              <Emphasis text={content.heading} emphasis={content.emphasis} />
            </h2>

            {content.lede ? (
              <p className={cx(styles.lede, 'body-md')} data-anim="fade-up">
                {content.lede}
              </p>
            ) : null}

            {content.cta ? (
              <div className={styles.actions} data-anim="fade-up">
                <Button
                  href={content.cta.href}
                  variant={content.cta.variant ?? 'link'}
                >
                  {content.cta.label}
                </Button>
              </div>
            ) : null}
          </div>

          <ul className={styles.list} data-anim-stagger="0.07">
            {industries.map((industry) => (
              <li
                key={industry.slug}
                className={styles.row}
                style={ACCENT_VARS[industry.accent]}
              >
                <span className={styles.iconTile}>
                  <Icon name={industry.icon} size={22} />
                </span>

                <div className={styles.text}>
                  <h3 className={styles.name}>
                    <Link
                      href={ROUTES.industry(industry.slug)}
                      className={styles.stretch}
                    >
                      {industry.name}
                    </Link>
                  </h3>
                  <p className={styles.summary}>{industry.summary}</p>
                  {industry.proofPoint ? (
                    <span className={styles.proof}>{industry.proofPoint}</span>
                  ) : null}
                </div>

                <svg
                  className={styles.arrow}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9h12m0 0-4.5-4.5M15 9l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </Container>
      </ScrollScene>
    </Section>
  );
}
