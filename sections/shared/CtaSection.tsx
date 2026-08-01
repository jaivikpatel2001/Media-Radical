import { ScrollScene } from '@/components/providers/ScrollScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Emphasis } from '@/components/ui/Emphasis';
import { Section } from '@/components/ui/Section';
import type { SectionProps } from '@/types/common';
import type { CtaContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './CtaSection.module.css';

/**
 * Closing CTA — SHARED, and the last section of every page group.
 *
 * Rendered on the inverted surface directly above the footer, so the page
 * closes on a dark block. With the stats band that bookends the light body in
 * dark, which is the pacing an Apple product page uses.
 */
export function CtaSection({ content, id }: SectionProps<CtaContent>) {
  return (
    <Section
      id={id}
      variant="inverted"
      spacing="large"
      className={styles.section}
      deferPaint={false}
      aria-labelledby="cta-heading"
    >
      <div className={styles.mesh} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <ScrollScene>
        <Container className={styles.inner} width="narrow">
          <p className={cx(styles.eyebrow, 'eyebrow')} data-anim="fade-up-sm">
            {content.eyebrow}
          </p>

          <h2
            id="cta-heading"
            className={cx(styles.heading, 'display-md')}
            data-anim="lines"
          >
            <Emphasis text={content.heading} emphasis={content.emphasis} />
          </h2>

          <p className={cx(styles.lede, 'body-lg')} data-anim="fade-up">
            {content.lede}
          </p>

          <div className={styles.actions} data-anim="fade-up" data-anim-delay="0.08">
            <Button href={content.primaryCta.href} size="lg" withArrow>
              {content.primaryCta.label}
            </Button>
            {content.secondaryCta ? (
              <Button
                href={content.secondaryCta.href}
                variant="secondary"
                size="lg"
                aria-label={content.secondaryCta.ariaLabel}
              >
                {content.secondaryCta.label}
              </Button>
            ) : null}
          </div>

          {content.note ? (
            <p className={styles.note} data-anim="fade-up">
              {content.note}
            </p>
          ) : null}
        </Container>
      </ScrollScene>
    </Section>
  );
}
