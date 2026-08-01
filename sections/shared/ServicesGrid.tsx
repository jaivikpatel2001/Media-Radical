import Link from 'next/link';

import { Icon } from '@/components/icons/registry';
import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ACCENT_VARS } from '@/constants/accents';
import { ROUTES } from '@/constants/routes';
import { getServices } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { ServicesContent } from '@/types/pages';
import { padIndex } from '@/utils/format';
import { cx } from '@/utils/cx';

import styles from './ServicesGrid.module.css';

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7h10m0 0L8 3m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Services grid — SHARED.
 *
 * Rendered on Home from eight slugs; the same component will render
 * /services from all of them, and an industry page from the three relevant
 * to that sector. It knows nothing about which page it is on, which is the
 * whole point: adding those pages adds data, not components.
 *
 * Only the service name is a link. The card-wide `::after` overlay makes the
 * rest of the card clickable without putting a paragraph of text into the
 * link's accessible name.
 */
export function ServicesGrid({
  content,
  id,
  variant,
}: SectionProps<ServicesContent>) {
  const services = getServices(content.serviceSlugs);

  return (
    <Section id={id} variant={variant} aria-labelledby="services-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="services-heading" />

          {/* The attribute carries the stagger interval as well as marking
              the group — see animations/presets/reveal.ts. */}
          <ul className={styles.grid} data-anim-stagger="0.06">
            {services.map((service, index) => (
              <li
                key={service.slug}
                className={cx(styles.card)}
                style={ACCENT_VARS[service.accent]}
              >
                <div className={styles.head}>
                  <span className={styles.iconTile}>
                    <Icon name={service.icon} size={21} />
                  </span>
                  <span className={cx(styles.index, 'label')}>
                    {padIndex(index + 1)}
                  </span>
                </div>

                <h3 className={styles.name}>
                  <Link href={ROUTES.service(service.slug)} className={styles.stretch}>
                    {service.name}
                  </Link>
                </h3>

                <p className={styles.tagline}>{service.tagline}</p>

                <div className={styles.capabilities}>
                  {service.capabilities.slice(0, 2).map((capability) => (
                    <span key={capability} className={styles.capability}>
                      {capability}
                    </span>
                  ))}
                </div>

                <span className={styles.foot} aria-hidden="true">
                  Explore
                  <Arrow />
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </ScrollScene>
    </Section>
  );
}
