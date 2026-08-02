import Link from 'next/link';

import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ROUTES } from '@/constants/routes';
import { getPosts } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { InsightsContent } from '@/types/pages';
import { formatDate, formatReadingTime } from '@/utils/format';
import { cx } from '@/utils/cx';

import styles from './InsightsSection.module.css';

/**
 * Blog teasers.
 *
 * `<time dateTime>` carries the machine-readable date; the visible string is
 * formatted with a pinned locale so server and client agree and hydration
 * stays quiet.
 */
export function InsightsSection({ content, id }: SectionProps<InsightsContent>) {
  const posts = getPosts(content.postSlugs);

  return (
    <Section id={id} aria-labelledby="insights-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="insights-heading" />

          <ul className={styles.grid} data-anim-stagger="0.08">
            {posts.map((post) => (
              <li key={post.slug} className={styles.card}>
                <div className={styles.mediaFrame}>
                  <span className={cx(styles.category, 'label')}>
                    {post.category}
                  </span>
                  <Media
                    asset={post.cover}
                    className={styles.media}
                    sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                    placeholderLabel={post.category}
                  />
                </div>

                <p className={cx(styles.meta, 'label')}>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className={styles.metaDot} aria-hidden="true" />
                  {formatReadingTime(post.readingMinutes)}
                </p>

                <h3 className={styles.title}>
                  <Link href={ROUTES.article(post.slug)} className={styles.stretch}>
                    {post.title}
                  </Link>
                </h3>

                <p className={styles.excerpt}>{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </Container>
      </ScrollScene>
    </Section>
  );
}
