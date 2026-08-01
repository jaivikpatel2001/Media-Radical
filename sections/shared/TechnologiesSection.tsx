import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTechnologies, getTechnologyGroups } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { Technology } from '@/types/content';
import type { TechnologiesContent } from '@/types/pages';

import { TechnologyTabs } from './TechnologyTabs';
import styles from './TechnologiesSection.module.css';

/**
 * Technologies — SHARED.
 *
 * The section itself stays a Server Component and resolves every group's
 * technologies up front, handing the client tab component plain data. The
 * data layer is therefore never imported into the browser bundle, and the
 * full stack is in the server HTML for crawlers regardless of which tab is
 * selected.
 */
export function TechnologiesSection({
  content,
  id,
  variant,
}: SectionProps<TechnologiesContent>) {
  const groups = getTechnologyGroups(content.groupIds);

  const technologiesByCategory = groups.reduce<Record<string, Technology[]>>(
    (accumulator, group) => {
      accumulator[group.category] = getTechnologies(group.technologyIds);
      return accumulator;
    },
    {},
  );

  return (
    <Section id={id} variant={variant} aria-labelledby="technologies-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="technologies-heading" />

          <div data-anim="fade-up">
            <TechnologyTabs
              groups={groups}
              technologiesByCategory={technologiesByCategory}
            />
          </div>

          {content.note ? (
            <p className={styles.note} data-anim="fade-up">
              {content.note}
            </p>
          ) : null}
        </Container>
      </ScrollScene>
    </Section>
  );
}
