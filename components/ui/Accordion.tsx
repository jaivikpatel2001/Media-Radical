'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

import { EASE } from '@/constants/motion';
import { cx } from '@/utils/cx';

import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render. Pass -1 for all closed. */
  defaultOpen?: number;
  /** Allow several panels open at once. */
  multiple?: boolean;
}

/**
 * Disclosure list.
 *
 * The `height: auto` animation is the reason this uses Motion rather than
 * GSAP or CSS: animating to an unknown height is exactly the problem Motion
 * solves properly, and a CSS max-height hack either clips long answers or
 * eases at the wrong rate.
 *
 * Accessibility: real buttons with `aria-expanded` and `aria-controls`, and
 * the panel is unmounted rather than merely hidden — so collapsed answers are
 * out of the tab order and out of the accessibility tree entirely, which
 * `visibility: hidden` alone does not guarantee across screen readers.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  multiple = false,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(
    defaultOpen >= 0 ? [defaultOpen] : [],
  );

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index);
      if (multiple) {
        return isOpen
          ? current.filter((item) => item !== index)
          : [...current, index];
      }
      return isOpen ? [] : [index];
    });
  };

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;

        return (
          <div key={item.id} className={styles.item}>
            <h3>
              <button
                id={triggerId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className={styles.question}>{item.question}</span>
                <span
                  className={cx(
                    styles.indicator,
                    isOpen && styles.indicatorOpen,
                  )}
                  aria-hidden="true"
                >
                  <span className={styles.bar} />
                  <span className={cx(styles.bar, styles.barVertical)} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={styles.panel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [...EASE.outExpo] }}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
