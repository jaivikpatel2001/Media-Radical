import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/ui/Marquee';
import { getClientLogos } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { TrustedByContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './TrustedBySection.module.css';

/**
 * Client logo strip.
 *
 * Wordmarks are set in type rather than loaded as images: they stay crisp at
 * any size, follow the theme, need no permission to reproduce a mark, and
 * cost nothing to download. The row is a semantic list, so a screen reader
 * hears "8 items" rather than a run-on of company names.
 */
export function TrustedBySection({ content }: SectionProps<TrustedByContent>) {
  const logos = getClientLogos(content.logoIds);

  return (
    <ScrollScene as="section" className={styles.section} aria-label="Our clients">
      <Container>
        <p className={cx(styles.heading, 'eyebrow')} data-anim="fade-up-sm">
          {content.heading}
        </p>
      </Container>

      <div data-anim="fade" data-anim-delay="0.1">
        <Marquee className={styles.marquee} speed={38}>
          <ul style={{ display: 'contents' }}>
            {logos.map((logo) => (
              <li key={logo.id} className={styles.logo}>
                <span className={styles.wordmark}>{logo.wordmark}</span>
                {logo.descriptor ? (
                  <span className={styles.descriptor}>{logo.descriptor}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </ScrollScene>
  );
}
