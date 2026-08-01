import type { Metadata } from 'next';
import Link from 'next/link';

import { ScrollScene } from '@/components/providers/ScrollScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Emphasis } from '@/components/ui/Emphasis';
import { notFoundPage } from '@/data/pages/notFound';
import { cx } from '@/utils/cx';

import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/**
 * 404 handler.
 *
 * Carries unusual weight during Phase 1: the header and footer link to all 17
 * page groups and only the Home page exists, so this is where most
 * exploratory clicks land. It has to read as deliberate, not broken.
 */
export default function NotFound() {
  const content = notFoundPage;

  return (
    <ScrollScene as="section" className={styles.wrap}>
      <div className={styles.mesh} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Container className={styles.inner}>
        <div>
          <p className={styles.code} data-anim="fade-up-sm">
            Error {content.code}
          </p>

          <h1 className={cx(styles.heading, 'display-md')} data-anim="lines" data-anim-trigger="load">
            <Emphasis text={content.heading} emphasis={content.emphasis} />
          </h1>

          <p className={cx(styles.lede, 'body-lg')} data-anim="fade-up" data-anim-delay="0.1">
            {content.lede}
          </p>

          <div data-anim="fade-up" data-anim-delay="0.16">
            <Button href={content.primaryCta.href} size="lg" withArrow>
              {content.primaryCta.label}
            </Button>
          </div>
        </div>

        <div>
          <p className={cx(styles.linksTitle, 'eyebrow')} data-anim="fade-up-sm">
            {content.helpfulLinksTitle}
          </p>

          <nav className={styles.links} aria-label="Suggested pages" data-anim-stagger>
            {content.helpfulLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkDescription}>{link.description}</span>
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </ScrollScene>
  );
}
