import { ScrollScene } from '@/components/providers/ScrollScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Emphasis } from '@/components/ui/Emphasis';
import { Media } from '@/components/ui/Media';
import { Section } from '@/components/ui/Section';
import { site } from '@/data/site';
import type { SectionProps } from '@/types/common';
import type { IntroContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './IntroSection.module.css';

/**
 * Company introduction.
 *
 * The image drifts against the scroll at a fifth of the page's speed —
 * enough to register as depth, far short of the wallowing that a heavier
 * parallax produces. The frame is `data-parallax-scope` so the drift is
 * measured against the section rather than the image's own box.
 */
export function IntroSection({ content, id }: SectionProps<IntroContent>) {
  return (
    <Section id={id} aria-labelledby="intro-heading">
      <ScrollScene>
        <Container className={styles.inner}>
          <div className={styles.mediaFrame} data-parallax-scope data-anim="clip-up">
            <div className={styles.mediaInner} data-parallax="0.16">
              <Media
                asset={content.media}
                className={styles.media}
                sizes="(min-width: 900px) 45vw, 100vw"
                placeholderLabel="studio"
              />
            </div>
            <span className={cx(styles.mediaBadge, 'label')}>
              Building since {site.founded}
            </span>
          </div>

          <div className={styles.copy}>
            <p className={cx(styles.eyebrow, 'eyebrow')} data-anim="fade-up-sm">
              {content.eyebrow}
            </p>

            <h2
              id="intro-heading"
              className={cx(styles.heading, 'display-sm')}
              data-anim="lines"
            >
              <Emphasis text={content.heading} emphasis={content.emphasis} />
            </h2>

            <div className={cx(styles.body, 'prose')} data-anim-stagger>
              {content.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="body-md">
                  {paragraph}
                </p>
              ))}
            </div>

            {content.cta ? (
              <div className={styles.actions} data-anim="fade-up">
                <Button href={content.cta.href} variant={content.cta.variant ?? 'link'}>
                  {content.cta.label}
                </Button>
              </div>
            ) : null}

            <dl className={styles.highlights} data-anim-stagger>
              {content.highlights.map((highlight) => (
                <div key={highlight.label} className={styles.highlight}>
                  <dt className={styles.highlightLabel}>{highlight.label}</dt>
                  <dd className={styles.highlightValue}>{highlight.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </ScrollScene>
    </Section>
  );
}
