import { Icon } from '@/components/icons/registry';
import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/data/site';
import { getValueProps } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { WhyChooseUsContent } from '@/types/pages';
import { padIndex } from '@/utils/format';
import { cx } from '@/utils/cx';

import styles from './WhyChooseUsSection.module.css';

/**
 * Why choose us.
 *
 * The image is one cell of the same grid as the commitments rather than a
 * column beside them — the intro section already uses copy-plus-image, and
 * repeating that layout is what makes a long page feel like a template.
 */
export function WhyChooseUsSection({
  content,
  id,
}: SectionProps<WhyChooseUsContent>) {
  const values = getValueProps(content.valuePropIds);

  return (
    <Section id={id} variant="subtle" aria-labelledby="why-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="why-heading" />

          <ul className={styles.grid} data-anim-stagger="0.06">
            <li className={styles.mediaCell}>
              <Media
                asset={content.media}
                className={styles.media}
                sizes="(min-width: 780px) 33vw, 100vw"
                placeholderLabel="desk"
              />
              <div className={styles.mediaOverlay}>
                <span className={styles.mediaValue}>{site.tagline}</span>
                <span className={styles.mediaLabel}>
                  {site.hours.response}
                </span>
              </div>
            </li>

            {values.map((value, index) => (
              <li key={value.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.iconTile}>
                    <Icon name={value.icon} size={19} />
                  </span>
                  <span className={cx(styles.index, 'label')}>
                    {padIndex(index + 1)}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardBody}>{value.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </ScrollScene>
    </Section>
  );
}
