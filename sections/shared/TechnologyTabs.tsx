'use client';

import { motion } from 'motion/react';
import { Children, useId, useState } from 'react';

import { EASE } from '@/constants/motion';
import { cx } from '@/utils/cx';

import styles from './TechnologiesSection.module.css';

interface TabMeta {
  label: string;
  count: number;
}

interface TechnologyTabsProps {
  tabs: TabMeta[];
  /** One pre-rendered panel per tab, in the same order. */
  children: React.ReactNode;
}

/**
 * Tab chrome only.
 *
 * This component deliberately knows nothing about logos. The panels arrive as
 * children already rendered on the server, which buys two things:
 *
 *  1. **Bundle.** Importing the logo registry here put a 140 KB chunk of SVG
 *     path data into the client bundle for a section below the fold. None of
 *     it ships now.
 *  2. **Discoverability.** Previously only the active panel existed in the
 *     DOM, so 76 of 84 technologies were absent from the rendered HTML — the
 *     exact factual content a search or answer engine would want. Every panel
 *     is now in the markup; inactive ones are `hidden`, which is the correct
 *     tabpanel pattern and keeps them out of the accessibility tree.
 *
 * Keyboard: arrow keys move between tabs, Home and End jump to the ends.
 * Roving `tabIndex` means Tab enters and leaves the group in one step rather
 * than walking all eight.
 */
export function TechnologyTabs({ tabs, children }: TechnologyTabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const panels = Children.toArray(children);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = tabs.length - 1;
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

  return (
    <>
      <div
        role="tablist"
        aria-label="Technology categories"
        className={styles.tabs}
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.label}
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
              <span className={styles.tabLabel}>
                {tab.label}
                <span className={styles.count}>{tab.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      {panels.map((panel, index) => (
        <div
          key={tabs[index]?.label ?? index}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          tabIndex={0}
          hidden={index !== active}
          className={styles.panel}
        >
          {panel}
        </div>
      ))}
    </>
  );
}
