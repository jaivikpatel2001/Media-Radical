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
 * Process — SHARED.
 *
 * The six steps stack into a deck as you scroll: each card is
 * `position: sticky` at a slightly lower offset than the one before, so the
 * previous step stays visible at the top edge while the next slides over it.
 *
 * This replaced a pinned horizontal scroll, which jittered against Lenis.
 * Nothing here is pinned and nothing is transformed on scroll, so the
 * sequence is handled entirely by the compositor — see the note in
 * animations/scenes/process.ts.
 *
 * The markup is a plain ordered list either way, so the reading order is
 * correct for a screen reader and a crawler regardless of the presentation.
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
      // The sticky stack must be laid out before it is scrolled into view.
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

          <div
            className={styles.progressRail}
            role="presentation"
            aria-hidden="true"
          >
            <span className={styles.progressBar} data-process-progress />
          </div>

          <ol className={styles.track} data-process-track>
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={styles.card}
                // Drives the stepped sticky offset that forms the deck.
                style={{ ['--i' as string]: index }}
              >
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
        </Container>
      </ScrollScene>
    </Section>
  );
}
