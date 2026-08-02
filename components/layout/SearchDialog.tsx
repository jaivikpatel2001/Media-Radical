'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { EASE } from '@/constants/motion';
import { searchEntries, type SearchEntry } from '@/data/search';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cx } from '@/utils/cx';

import styles from './SearchDialog.module.css';

/**
 * The panel. Mounted only while the dialog is open, which is what keeps the
 * query and cursor fresh on every open without an effect resetting them.
 */
function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  // The cursor is stored with the query it belongs to, so a new query resets
  // the highlight during render rather than in an effect one frame later.
  const [cursorState, setCursorState] = useState({ query: '', index: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => searchEntries(query), [query]);
  const cursor = cursorState.query === query ? cursorState.index : 0;

  const moveCursor = (index: number) => setCursorState({ query, index });

  // Grouped for display, but the flat list is what the cursor indexes — so
  // arrow keys move in visual order across group boundaries.
  const grouped = useMemo(() => {
    const map = new Map<string, { entry: SearchEntry; index: number }[]>();
    results.forEach((entry, index) => {
      const bucket = map.get(entry.group) ?? [];
      bucket.push({ entry, index });
      map.set(entry.group, bucket);
    });
    return [...map.entries()];
  }, [results]);

  useEffect(() => {
    // Focus once the entry animation is under way; focusing on the first
    // frame makes the browser scroll the still-moving dialog into place.
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, []);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveCursor((cursor + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveCursor((cursor - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(results[cursor].href);
    }
  };

  return (
    <motion.div
      className={styles.dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Search this site"
      initial={{ opacity: 0, y: -14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.32, ease: [...EASE.outExpo] }}
      onKeyDown={onKeyDown}
    >
      <div className={styles.field}>
        <Search
          size={18}
          strokeWidth={1.7}
          className={styles.fieldIcon}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          className={styles.input}
          placeholder="Search services, work and answers"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          aria-activedescendant={
            results.length > 0 ? `search-option-${cursor}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="button"
          className={styles.kbd}
          onClick={onClose}
          aria-label="Close search"
        >
          <X size={12} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div
        id="search-results"
        role="listbox"
        aria-label="Search results"
        className={styles.results}
      >
        {query.trim().length < 2 ? (
          <p className={styles.empty}>
            Start typing to search our services, work and answers.
          </p>
        ) : results.length === 0 ? (
          <p className={styles.empty}>
            Nothing found for “{query}”. Try another word.
          </p>
        ) : (
          grouped.map(([group, items]) => (
            <div key={group}>
              <p className={cx(styles.groupLabel, 'label')}>{group}</p>
              {items.map(({ entry, index }) => (
                <button
                  key={entry.id}
                  id={`search-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === cursor}
                  className={cx(
                    styles.result,
                    index === cursor && styles.resultActive,
                  )}
                  onMouseEnter={() => moveCursor(index)}
                  onClick={() => go(entry.href)}
                >
                  <span className={styles.resultTitle}>{entry.title}</span>
                  <span className={styles.resultDescription}>
                    {entry.description}
                  </span>
                </button>
              ))}
            </div>
          ))
        )}
      </div>

      <div className={styles.foot}>
        <span>↑ ↓ to move</span>
        <span>↵ to open</span>
        <span>esc to close</span>
      </div>
    </motion.div>
  );
}

/**
 * Site search.
 *
 * No backend and no third-party service: every page's content is local
 * TypeScript, so the index in data/search.ts is built at module scope and
 * queried in memory.
 *
 * Implemented as a combobox: the input keeps focus while ArrowUp/ArrowDown
 * move a virtual cursor through the list, `aria-activedescendant` tells a
 * screen reader which option is current, and Enter opens it. Moving real
 * focus into the list instead would mean the visitor could no longer type.
 */
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useLockBodyScroll(open);

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
            transition={{ duration: 0.24 }}
            aria-hidden="true"
          />

          <div className={styles.shell}>
            <SearchPanel onClose={onClose} />
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
