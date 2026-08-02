'use client';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/providers/ThemeProvider';

/**
 * Light ⇄ dark toggle.
 *
 * The icon advertises the action rather than the current state: light is the
 * default, so the resting icon is the moon. The button occupies the same box
 * in both states, so nothing shifts when it flips.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Moon size={17} strokeWidth={1.6} aria-hidden="true" />
      )}
    </button>
  );
}
