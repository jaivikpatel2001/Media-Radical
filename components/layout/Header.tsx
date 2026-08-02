'use client';

import { Phone, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { header } from '@/data/navigation';
import { cx } from '@/utils/cx';

import { HeaderNav } from './HeaderNav';
import { MobileDrawer } from './MobileDrawer';
import { SearchDialog } from './SearchDialog';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

/** Distance scrolled before the header takes on its glass surface. */
const SURFACE_AT = 24;
/** Ignore direction changes smaller than this, or the header flickers. */
const DIRECTION_THRESHOLD = 8;
/** Never hide within this distance of the top. */
const HIDE_AFTER = 220;

/**
 * Fixed header.
 *
 * Reads window.scrollY directly rather than subscribing to Lenis: Lenis
 * scrolls the window natively, so the native value is authoritative and this
 * keeps working unchanged when smooth scrolling is off under reduced motion.
 *
 * The scroll handler writes to a ref on every event and only calls setState
 * when a threshold is actually crossed, so a full page scroll causes a
 * handful of renders rather than hundreds.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const lastY = useRef(0);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY.current;

        setScrolled(y > SURFACE_AT);

        if (Math.abs(delta) > DIRECTION_THRESHOLD) {
          setHidden(delta > 0 && y > HIDE_AFTER);
          lastY.current = y;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    // Return focus to the control that opened it.
    burgerRef.current?.focus();
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    searchRef.current?.focus();
  }, []);

  // Cmd/Ctrl-K opens search from anywhere — except while typing in a field,
  // where it would steal a legitimate keystroke.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'k' || !(event.metaKey || event.ctrlKey)) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      event.preventDefault();
      setSearchOpen((open) => !open);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cx(
          styles.header,
          scrolled ? styles.scrolled : styles.atTop,
          hidden && !menuOpen && !drawerOpen && styles.hidden,
          menuOpen && styles.menuOpen,
        )}
      >
        <Container className={styles.inner}>
          <Logo />

          <HeaderNav groups={header.groups} onOpenChange={setMenuOpen} />

          <div className={styles.actions}>
            {header.searchEnabled ? (
              <button
                ref={searchRef}
                type="button"
                className={cx(styles.iconButton, styles.searchButton)}
                aria-label="Search this site"
                aria-haspopup="dialog"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen(true)}
              >
                <Search size={17} strokeWidth={1.7} aria-hidden="true" />
              </button>
            ) : null}

            <a
              href={header.phone.href}
              className={styles.phone}
              aria-label={`Call us on ${header.phone.label}`}
            >
              <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>{header.phone.label}</span>
            </a>

            <ThemeToggle className={styles.iconButton} />

            <Button
              href={header.cta.href}
              variant="primary"
              size="sm"
              className={styles.ctaDesktop}
            >
              {header.cta.label}
            </Button>

            <button
              ref={burgerRef}
              type="button"
              className={cx(styles.burger, drawerOpen && styles.burgerOpen)}
              aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((open) => !open)}
            >
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
              <span className={styles.burgerBar} />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} config={header} />
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}
