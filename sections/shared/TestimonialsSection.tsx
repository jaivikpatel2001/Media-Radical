import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTestimonials } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { Testimonial } from '@/types/content';
import type { TestimonialsContent } from '@/types/pages';

import styles from './TestimonialsSection.module.css';

const initialsOf = (name: string): string =>
  name
    .split(' ')
    .filter((part) => !part.endsWith('.'))
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

function QuoteMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      className={styles.mark}
      width={size}
      height={(size / 30) * 24}
      viewBox="0 0 30 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 24V13.2C0 5.9 3.9 1.5 11.6 0l1.2 3.9C8.2 5 5.9 7.4 5.9 11h5.3v13H0Zm17.5 0V13.2C17.5 5.9 21.4 1.5 29.1 0l1.2 3.9C25.7 5 23.4 7.4 23.4 11h5.3v13h-11.2Z" />
    </svg>
  );
}

/** Shared attribution block. `figcaption` is only valid inside a `figure`. */
function Author({ author }: { author: Testimonial['author'] }) {
  return (
    <figcaption className={styles.author}>
      {author.avatar ? (
        <Media asset={author.avatar} className={styles.avatar} sizes="46px" />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initialsOf(author.name)}
        </span>
      )}
      <span className={styles.authorText}>
        <span className={styles.authorName}>{author.name}</span>
        <span className={styles.authorRole}>
          {author.role}, {author.company}
        </span>
      </span>
    </figcaption>
  );
}

/**
 * Testimonials — SHARED.
 *
 * The first quote is featured full width with its metric set large; the rest
 * form a masonry wall below.
 *
 * This replaced a horizontal scroll-snap rail, which had two problems: it
 * relied on a sideways gesture desktop visitors rarely discover, and four of
 * the five quotes sat off-screen. Everything is visible here with no
 * scrolling of its own and no JavaScript.
 */
export function TestimonialsSection({
  content,
  id,
  variant,
}: SectionProps<TestimonialsContent>) {
  const testimonials = getTestimonials(content.testimonialIds);
  if (testimonials.length === 0) return null;

  const [featured, ...rest] = testimonials;

  return (
    <Section id={id} variant={variant} aria-labelledby="testimonials-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="testimonials-heading" />

          <figure className={styles.featured} data-anim="fade-up">
            <div>
              <QuoteMark size={34} />
              <blockquote className={styles.featuredQuote}>
                {featured.quote}
              </blockquote>
            </div>

            <div className={styles.featuredAside}>
              {featured.highlight ? (
                <p className={styles.bigMetric}>
                  <span className={styles.bigMetricValue}>
                    {featured.highlight.value}
                  </span>
                  <span className={styles.bigMetricLabel}>
                    {featured.highlight.label}
                  </span>
                </p>
              ) : null}
              <Author author={featured.author} />
            </div>
          </figure>

          <div className={styles.wall} data-anim-stagger="0.07">
            {rest.map((testimonial) => (
              <div key={testimonial.id} className={styles.wallItem}>
                <figure className={styles.card}>
                  <QuoteMark />
                  <blockquote className={styles.quote}>
                    {testimonial.quote}
                  </blockquote>

                  {testimonial.highlight ? (
                    <p className={styles.highlight}>
                      <span className={styles.highlightValue}>
                        {testimonial.highlight.value}
                      </span>
                      <span className={styles.highlightLabel}>
                        {testimonial.highlight.label}
                      </span>
                    </p>
                  ) : null}

                  <Author author={testimonial.author} />
                </figure>
              </div>
            ))}
          </div>
        </Container>
      </ScrollScene>
    </Section>
  );
}
