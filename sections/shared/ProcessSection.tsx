import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getProcessSteps } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { ProcessContent } from '@/types/pages';
import { padIndex } from '@/utils/format';
import { cx } from '@/utils/cx';

import styles from './ProcessSection.module.css';

function Tick() {
  return (
    <svg
      className={styles.tick}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m2 6.2 2.6 2.6L10 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Process — SHARED, and the page's one pinned scroll sequence.
 *
 * The markup is a plain ordered list. Whether it reads as a horizontal
 * pinned track or a vertical stack is decided entirely by
 * animations/scenes/process.ts, which branches on `gsap.matchMedia`. That
 * means the semantic order is correct for a screen reader and for a crawler
 * in both cases, and `deferPaint` is off because the pin needs to measure the
 * section before it is scrolled into view.
 */
export function ProcessSection({
  content,
  id,
  variant,
}: SectionProps<ProcessContent>) {
  const steps = getProcessSteps(content.stepIds);

  return (
    <Section
      id={id}
      variant={variant}
      className={styles.section}
      deferPaint={false}
      aria-labelledby="process-heading"
    >
      <ScrollScene scene="process">
        <Container>
          <SectionHeading
            content={content}
            id="process-heading"
            className={styles.head}
          />

          <div className={styles.viewport} data-process-viewport>
            <ol className={styles.track} data-process-track>
              {steps.map((step) => (
                <li key={step.id} className={styles.card} data-process-card>
                  <span className={styles.ghostIndex} aria-hidden="true">
                    {padIndex(step.index)}
                  </span>

                  <div className={styles.cardHead}>
                    <span className={styles.step}>{padIndex(step.index)}</span>
                    {step.durationLabel ? (
                      <span className={cx(styles.duration, 'label')}>
                        {step.durationLabel}
                      </span>
                    ) : null}
                  </div>

                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.summary}>{step.summary}</p>

                  <div className={styles.deliverables}>
                    <p className={cx(styles.deliverablesTitle, 'label')}>
                      {content.deliverablesLabel}
                    </p>
                    <ul>
                      {step.deliverables.map((deliverable) => (
                        <li key={deliverable} className={styles.deliverable}>
                          <Tick />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            className={styles.progressRail}
            role="presentation"
            aria-hidden="true"
          >
            <span className={styles.progressBar} data-process-progress />
          </div>

          <p className={styles.hint} aria-hidden="true">
            {content.scrollHint}
          </p>
        </Container>
      </ScrollScene>
    </Section>
  );
}
