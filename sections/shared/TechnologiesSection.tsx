import {
  TECH_COLOR_LOGOS,
  TECH_LOGOS,
} from '@/components/icons/techLogos';
import { ScrollScene } from '@/components/providers/ScrollScene';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTechnologies, getTechnologyGroups } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { Technology } from '@/types/content';
import type { TechnologiesContent } from '@/types/pages';
import { brandVariants } from '@/utils/color';
import { cx } from '@/utils/cx';

import { TechnologyTabs } from './TechnologyTabs';
import styles from './TechnologiesSection.module.css';

/** Up to three letters, so acronyms like "AWS" survive intact. */
function monogramOf(name: string): string {
  const words = name.split(/[\s.]+/).filter(Boolean);

  if (words.length === 1) {
    const word = words[0].replace(/[^A-Za-z0-9]/g, '');
    return (word.length <= 3 ? word : word.slice(0, 2)).toUpperCase();
  }

  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/**
 * One technology tile. Server-rendered — no logo data crosses the client
 * boundary, so none of it reaches the browser bundle.
 *
 * Three rendering paths, in order of preference:
 *
 *  1. A full-colour multi-path mark (TECH_COLOR_LOGOS) — the eight brands
 *     with no usable single-path version. The markup carries its own fills.
 *  2. A single-path mark (TECH_LOGOS), filled with that brand's own colour.
 *  3. A lettermark, only if an id matches nothing. Nothing hits this today; it
 *     exists so a typo degrades visibly rather than leaving an empty tile.
 *
 * Colours are emitted as four custom properties rather than one. A few brands
 * are pure black — correct on the white canvas, invisible on the dark one — so
 * `brandVariants` pre-computes a corrected value per theme, and a
 * `[data-theme]` rule picks between them. The `-rgb` pair feeds the hover
 * glow. All of it is computed at build time; none costs runtime JavaScript.
 */
function TechTile({ technology }: { technology: Technology }) {
  const colorLogo = technology.logoId
    ? TECH_COLOR_LOGOS[technology.logoId]
    : undefined;
  const logo = technology.logoId ? TECH_LOGOS[technology.logoId] : undefined;

  const brandHex = colorLogo?.hex ?? logo?.hex;
  const brand = brandHex ? brandVariants(brandHex) : undefined;
  const style = brand
    ? ({
        ['--brand-light' as string]: brand.light,
        ['--brand-dark' as string]: brand.dark,
        ['--brand-rgb-light' as string]: brand.lightRgb,
        ['--brand-rgb-dark' as string]: brand.darkRgb,
      } as React.CSSProperties)
    : undefined;

  return (
    <li className={styles.tile} style={style}>
      {colorLogo ? (
        <svg
          className={styles.logo}
          viewBox={colorLogo.viewBox}
          aria-hidden="true"
          focusable="false"
          // Generated at build time from vendored CC0 icon sets, never from
          // user input.
          dangerouslySetInnerHTML={{ __html: colorLogo.body }}
        />
      ) : logo ? (
        <svg
          className={styles.logo}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={logo.path} />
        </svg>
      ) : (
        <span className={styles.monogram} aria-hidden="true">
          {monogramOf(technology.name)}
        </span>
      )}
      <span className={styles.name}>{technology.name}</span>
    </li>
  );
}

/**
 * Technologies — SHARED.
 *
 * Every panel is rendered here, on the server, and handed to the client tab
 * component as children. The client half manages which one is visible and
 * nothing else, so all 84 technologies are in the server HTML — the factual
 * content a search or answer engine is most likely to want from this page —
 * while the browser downloads no logo data at all.
 */
export function TechnologiesSection({
  content,
  id,
  variant,
}: SectionProps<TechnologiesContent>) {
  const groups = getTechnologyGroups(content.groupIds);
  const resolved = groups.map((group) => ({
    group,
    technologies: getTechnologies(group.technologyIds),
  }));

  return (
    <Section id={id} variant={variant} aria-labelledby="technologies-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="technologies-heading" />

          <div data-anim="fade-up">
            <TechnologyTabs
              tabs={resolved.map(({ group, technologies }) => ({
                label: group.label,
                count: technologies.length,
              }))}
            >
              {resolved.map(({ group, technologies }) => (
                <div key={group.category} className={styles.panelInner}>
                  <p className={cx(styles.description, 'body-md')}>
                    {group.description}
                  </p>
                  <ul className={styles.grid}>
                    {technologies.map((technology) => (
                      <TechTile key={technology.id} technology={technology} />
                    ))}
                  </ul>
                </div>
              ))}
            </TechnologyTabs>
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
