'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

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
 * Tabbed technology browser.
 *
 * A real tablist: arrow keys move between tabs, Home and End jump to the
 * ends, and each panel is associated with its tab. Roving `tabIndex` means
 * Tab enters and leaves the group in one step rather than walking all seven.
 *
 * The active pill is one element moved by Motion's shared layout, so it
 * genuinely travels between tabs.
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
          return (
            <button
              key={item.category}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
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
              <span style={{ position: 'relative' }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className={styles.panel}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [...EASE.outExpo] }}
            className={styles.panel}
          >
            <p className={cx(styles.description, 'body-md')}>
              {group.description}
            </p>

            <ul className={styles.chips}>
              {technologies.map((technology) => (
                <li key={technology.id} className={styles.chip}>
                  <span className={styles.chipDot} aria-hidden="true" />
                  {technology.name}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
