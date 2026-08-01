import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getStats } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { StatsContent } from '@/types/pages';
import { formatNumber } from '@/utils/format';
import { cx } from '@/utils/cx';

import styles from './StatsSection.module.css';

/**
 * Company statistics — SHARED.
 *
 * Counters, done accessibly. Three details matter:
 *
 *  1. The server HTML already contains the final formatted figure, so the
 *     real number is what a crawler and a no-JS visitor see. The tween only
 *     overwrites it while running.
 *  2. The animating number is `aria-hidden`, with the real value repeated in
 *     a visually-hidden sibling — otherwise a screen reader announces a
 *     stream of intermediate values as the count runs.
 *  3. Tabular figures, so digits do not jitter sideways mid-count.
 *
 * Rendered on the inverted surface, which with the closing CTA bookends the
 * light page in dark the way an Apple product page does.
 */
export function StatsSection({ content, id }: SectionProps<StatsContent>) {
  const stats = getStats(content.statIds);

  return (
    <Section
      id={id}
      variant="inverted"
      className={styles.section}
      aria-labelledby="stats-heading"
    >
      <div className={styles.bloom} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <ScrollScene className={styles.inner}>
        <Container>
          <SectionHeading
            content={content}
            id="stats-heading"
            className={styles.head}
          />

          <dl className={styles.grid} data-anim-stagger="0.09">
            {stats.map((stat) => {
              const formatted =
                stat.precision && stat.precision > 0
                  ? stat.value.toFixed(stat.precision)
                  : formatNumber(stat.value);

              const spoken = `${stat.prefix ?? ''}${formatted}${stat.suffix ?? ''}`;

              return (
                <div key={stat.id} className={styles.stat}>
                  <dd className={cx(styles.value, 'tabular')}>
                    <span aria-hidden="true">
                      {stat.prefix ? (
                        <span className={styles.affix}>{stat.prefix}</span>
                      ) : null}
                      <span
                        data-count={stat.value}
                        data-count-precision={stat.precision ?? 0}
                      >
                        {formatted}
                      </span>
                      {stat.suffix ? (
                        <span className={styles.affix}>{stat.suffix}</span>
                      ) : null}
                    </span>
                    <span className="visuallyHidden">{spoken}</span>
                  </dd>

                  <dt className={styles.label}>{stat.label}</dt>

                  {stat.description ? (
                    <dd className={styles.description}>{stat.description}</dd>
                  ) : null}
                </div>
              );
            })}
          </dl>
        </Container>
      </ScrollScene>
    </Section>
  );
}
