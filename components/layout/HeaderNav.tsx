'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/icons/registry';
import { EASE } from '@/constants/motion';
import type { NavGroup } from '@/types/navigation';
import { cx } from '@/utils/cx';

import styles from './HeaderNav.module.css';

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m2 4 3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

interface HeaderNavProps {
  groups: NavGroup[];
  onOpenChange: (open: boolean) => void;
}

/**
 * Desktop navigation with mega-menu dropdowns.
 *
 * Keyboard and pointer are handled as the different things they are: pointer
 * users get hover-to-open with a short close delay so a diagonal path to the
 * panel does not dismiss it, keyboard users get explicit Enter/Space toggling
 * with Escape to close and focus returned to the trigger. The panel closes on
 * focus leaving the group entirely, which is what makes Tab behave.
 */
export function HeaderNav({ groups, onOpenChange }: HeaderNavProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = useCallback((index: number) => {
    clearCloseTimer();
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setOpenIndex(null);
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenIndex(null), 140);
  }, []);

  useEffect(() => onOpenChange(openIndex !== null), [openIndex, onOpenChange]);
  useEffect(() => clearCloseTimer, []);

  // Escape closes and hands focus back to the trigger that opened the panel.
  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const index = openIndex;
      close();
      triggerRefs.current[index]?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openIndex, close]);

  // A click anywhere outside the nav dismisses an open panel.
  useEffect(() => {
    if (openIndex === null) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openIndex, close]);

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      aria-label="Primary"
      onBlur={(event) => {
        // Focus left the nav subtree entirely — not merely moved within it.
        if (!event.currentTarget.contains(event.relatedTarget as Node)) close();
      }}
    >
      <ul className={styles.list}>
        {groups.map((group, index) => {
          const hasPanel = Boolean(group.columns?.length);
          const isOpen = openIndex === index;
          const panelId = `nav-panel-${index}`;
          // The last two groups are near the right edge; anchoring their
          // panels to that edge keeps them inside the viewport.
          const alignEnd = index >= groups.length - 2;

          if (!hasPanel) {
            return (
              <li key={group.label} className={styles.item}>
                <Link
                  href={group.href ?? '#'}
                  className={styles.trigger}
                  onMouseEnter={close}
                >
                  {group.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={group.label}
              className={styles.item}
              onMouseEnter={() => open(index)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                ref={(node) => {
                  triggerRefs.current[index] = node;
                }}
                className={cx(styles.trigger, isOpen && styles.triggerOpen)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => (isOpen ? close() : open(index))}
              >
                {group.label}
                <Chevron />
              </button>

              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    className={cx(
                      styles.panel,
                      alignEnd ? styles.panelEnd : styles.panelStart,
                    )}
                    initial={{ opacity: 0, y: -8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.99 }}
                    transition={{ duration: 0.26, ease: [...EASE.outExpo] }}
                  >
                    <div className={styles.panelInner}>
                      <div
                        className={styles.columns}
                        style={
                          {
                            '--column-count': group.columns?.length ?? 1,
                          } as React.CSSProperties
                        }
                      >
                        {group.columns?.map((column, columnIndex) => (
                          <div key={column.title ?? columnIndex}>
                            {column.title ? (
                              <p className={cx(styles.columnTitle, 'label')}>
                                {column.title}
                              </p>
                            ) : null}
                            <ul>
                              {column.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link href={link.href} className={styles.link}>
                                    {link.icon ? (
                                      <span className={styles.linkIcon}>
                                        <Icon name={link.icon} size={17} />
                                      </span>
                                    ) : null}
                                    <span className={styles.linkText}>
                                      <span className={styles.linkLabel}>
                                        {link.label}
                                      </span>
                                      {link.description ? (
                                        <span className={styles.linkDescription}>
                                          {link.description}
                                        </span>
                                      ) : null}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {group.feature ? (
                        <Link href={group.feature.href} className={styles.feature}>
                          <span className="eyebrow">{group.feature.eyebrow}</span>
                          <span className={styles.featureTitle}>
                            {group.feature.title}
                          </span>
                          <span className={styles.featureDescription}>
                            {group.feature.description}
                          </span>
                          <span className={styles.featureCta}>
                            {group.feature.ctaLabel}
                            <Arrow className={styles.featureArrow} />
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
