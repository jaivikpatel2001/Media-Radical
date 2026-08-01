import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTestimonials } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { TestimonialsContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './TestimonialsSection.module.css';

const initialsOf = (name: string): string =>
  name
    .split(' ')
    .filter((part) => !part.endsWith('.'))
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

function QuoteMark() {
  return (
    <svg
      className={styles.mark}
      width="30"
      height="24"
      viewBox="0 0 30 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 24V13.2C0 5.9 3.9 1.5 11.6 0l1.2 3.9C8.2 5 5.9 7.4 5.9 11h5.3v13H0Zm17.5 0V13.2C17.5 5.9 21.4 1.5 29.1 0l1.2 3.9C25.7 5 23.4 7.4 23.4 11h5.3v13h-11.2Z" />
    </svg>
  );
}

/**
 * Testimonials — SHARED.
 *
 * A native scroll-snap rail rather than a JavaScript carousel: it works with
 * a trackpad, a touch swipe, arrow keys and a screen reader's own navigation
 * without a line of carousel logic, and every quote is in the DOM at once for
 * crawlers. `overscroll-behavior-x: contain` stops the horizontal gesture
 * from bubbling out to the page.
 */
export function TestimonialsSection({
  content,
  id,
  variant,
}: SectionProps<TestimonialsContent>) {
  const testimonials = getTestimonials(content.testimonialIds);

  return (
    <Section
      id={id}
      variant={variant}
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="testimonials-heading" />
        </Container>

        <Container>
          <ul
            className={styles.rail}
            data-lenis-prevent
            tabIndex={0}
            role="list"
            aria-label="Client testimonials"
            data-anim-stagger="0.06"
          >
            {/* figure/figcaption is the correct pairing for an attributed
                quote — figcaption is only valid inside a figure. */}
            {testimonials.map((testimonial) => (
              <li key={testimonial.id}>
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

                  <figcaption className={styles.author}>
                    {testimonial.author.avatar ? (
                      <Media
                        asset={testimonial.author.avatar}
                        className={styles.avatar}
                        sizes="46px"
                      />
                    ) : (
                      <span className={styles.initials} aria-hidden="true">
                        {initialsOf(testimonial.author.name)}
                      </span>
                    )}

                    <span className={styles.authorText}>
                      <span className={styles.authorName}>
                        {testimonial.author.name}
                      </span>
                      <span className={styles.authorRole}>
                        {testimonial.author.role}, {testimonial.author.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <p className={styles.hint} aria-hidden="true">
            <span className={styles.hintLine} />
            <span className={cx('label')}>{content.railHint}</span>
            <span className={styles.hintLine} />
          </p>
        </Container>
      </ScrollScene>
    </Section>
  );
}
