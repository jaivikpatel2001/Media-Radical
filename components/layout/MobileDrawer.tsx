'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { ChevronDown, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/icons/registry';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { EASE } from '@/constants/motion';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { HeaderConfig } from '@/types/navigation';
import { cx } from '@/utils/cx';

import styles from './MobileDrawer.module.css';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  config: HeaderConfig;
}

/**
 * Full-height drawer for small screens.
 *
 * Every destination in the site appears here flat — nothing is hidden behind
 * a hover the way it is on desktop. Focus is trapped while open and returned
 * to the trigger on close; Escape and a scrim tap both dismiss.
 */
export function MobileDrawer({ open, onClose, config }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    // Focus the drawer itself so the next Tab lands inside it.
    drawerRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className={styles.scrim}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.46, ease: [...EASE.outExpo] }}
          >
            <div className={styles.head}>
              <Logo />
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Close navigation"
              >
                <X size={19} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.body}>
              <ul>
                {config.groups.map((group) => {
                  const hasChildren = Boolean(group.columns?.length);
                  const isExpanded = expanded === group.label;
                  const panelId = `drawer-${group.label.toLowerCase()}`;

                  if (!hasChildren) {
                    return (
                      <li key={group.label}>
                        <Link
                          href={group.href ?? '#'}
                          className={styles.groupButton}
                          onClick={onClose}
                        >
                          {group.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={group.label}>
                      <button
                        type="button"
                        className={styles.groupButton}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        onClick={() =>
                          setExpanded(isExpanded ? null : group.label)
                        }
                      >
                        {group.label}
                        <ChevronDown
                          size={17}
                          strokeWidth={1.6}
                          className={cx(
                            styles.chevron,
                            isExpanded && styles.chevronOpen,
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      <motion.ul
                        id={panelId}
                        className={styles.subList}
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.34, ease: [...EASE.outExpo] }}
                        // Collapsed content must leave the tab order, not just
                        // become invisible.
                        aria-hidden={!isExpanded}
                      >
                        {group.columns?.flatMap((column) =>
                          column.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                className={styles.subLink}
                                onClick={onClose}
                                tabIndex={isExpanded ? undefined : -1}
                              >
                                {link.icon ? (
                                  <span className={styles.subIcon}>
                                    <Icon name={link.icon} size={16} />
                                  </span>
                                ) : (
                                  <span />
                                )}
                                {link.label}
                              </Link>
                            </li>
                          )),
                        )}
                      </motion.ul>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.foot}>
              <Button href={config.cta.href} variant="primary" withArrow>
                {config.cta.label}
              </Button>
              <a href={config.phone.href} className={styles.footPhone}>
                <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                {config.phone.label}
              </a>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
