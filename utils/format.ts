/** Presentation formatters. Locale is pinned so server and client agree. */

const LOCALE = 'en-US';

const numberFormatter = new Intl.NumberFormat(LOCALE);

export const formatNumber = (value: number): string =>
  numberFormatter.format(value);

/**
 * Counters animate through fractional values; round before formatting so the
 * digit count never jumps mid-tween.
 */
export const formatCount = (value: number): string =>
  numberFormatter.format(Math.round(value));

export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));

export const formatReadingTime = (minutes: number): string =>
  `${minutes} min read`;

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Two-digit step index: 01, 02, … */
export const padIndex = (index: number): string =>
  String(index).padStart(2, '0');
