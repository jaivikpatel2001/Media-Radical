'use client';

import { motion } from 'motion/react';
import { useId, useState } from 'react';

import { TECH_LOGOS } from '@/components/icons/techLogos';
import { EASE } from '@/constants/motion';
import type { Technology, TechnologyGroup } from '@/types/content';
import { cx } from '@/utils/cx';

import styles from './TechnologiesSection.module.css';

interface TechnologyTabsProps {
  groups: TechnologyGroup[];
  /** Pre-resolved so this client component never imports the data layer. */
  technologiesByCategory: Record<string, Technology[]>;
}

/**
 * Lettermark for brands with no usable logo.
 *
 * A short single word is kept whole so acronyms survive — "AWS" must not
 * become "AW". Longer single words take two letters, and multi-word names
 * take initials: "Adobe XD" reads "AX".
 */
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
 * One technology tile: brand logo, or a lettermark when no logo exists.
 *
 * Logos are monochrome at rest and take their brand colour on hover — the
 * grid reads as one considered set rather than a wall of competing brand
 * colours, but each mark is still recognisable when you look at it.
 */
function TechTile({ technology }: { technology: Technology }) {
  const logo = technology.logoId ? TECH_LOGOS[technology.logoId] : undefined;

  return (
    <li
      className={styles.tile}
      style={logo ? ({ ['--brand' as string]: logo.hex }) : undefined}
    >
      {logo ? (
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
 * Tabbed technology browser.
 *
 * A real tablist: arrow keys move between tabs, Home and End jump to the
 * ends, and each panel is associated with its tab. Roving `tabIndex` means
 * Tab enters and leaves the group in one step rather than walking all eight.
 */
export function TechnologyTabs({
  groups,
  technologiesByCategory,
}: TechnologyTabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = groups.length - 1;
    let next = active;

    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;

    event.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const group = groups[active];
  const technologies = technologiesByCategory[group.category] ?? [];

  return (
    <>
      <div
        role="tablist"
        aria-label="Technology categories"
        className={styles.tabs}
        onKeyDown={onKeyDown}
      >
        {groups.map((item, index) => {
          const selected = index === active;
          const count = technologiesByCategory[item.category]?.length ?? 0;

          return (
            <button
              key={item.category}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={cx(styles.tab, selected && styles.tabActive)}
              onClick={() => setActive(index)}
            >
              {selected ? (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className={styles.tabPill}
                  transition={{ duration: 0.42, ease: [...EASE.outExpo] }}
                />
              ) : null}
              <span className={styles.tabLabel}>
                {item.label}
                <span className={styles.count}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className={styles.panel}
      >
        {/* Keyed, but deliberately NOT wrapped in AnimatePresence with
            `mode="wait"`. That would hold the new panel back until the old
            one finished animating out — which makes the content of the page
            depend on an animation completing. Changing the key remounts the
            panel and Motion plays initial → animate; there is no exit to
            wait on, so the tiles are there the instant the tab is pressed. */}
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [...EASE.outExpo] }}
          className={styles.panel}
        >
          <p className={cx(styles.description, 'body-md')}>
            {group.description}
          </p>

          <ul className={styles.grid}>
            {technologies.map((technology) => (
              <TechTile key={technology.id} technology={technology} />
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
}
