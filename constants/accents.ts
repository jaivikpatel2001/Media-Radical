import type { AccentToken } from '@/types/content';

/**
 * Per-entity accent variables, consumed by service cards and industry rows.
 *
 * Two properties with different jobs and different rules:
 *
 *   --accent-wash    a background tint. Backgrounds are non-text, so the
 *                    per-category variety lives here and costs nothing.
 *   --accent-colour  used for TEXT ("Explore", the industry proof chips) and
 *                    for icons. It is therefore the SAME AA-safe brand tone
 *                    for every category.
 *
 * The variety used to live in `--accent-colour` too, which measured 1.78:1
 * for amber and 3.07:1 for rose against the 4.5:1 floor for small text. The
 * split keeps the colour interest and fixes the contrast.
 */
const wash = (rgb: string): React.CSSProperties => ({
  ['--accent-colour' as string]: 'var(--color-accent-text)',
  ['--accent-wash' as string]: `rgb(${rgb} / 0.12)`,
});

export const ACCENT_VARS: Record<AccentToken, React.CSSProperties> = {
  indigo: wash('0 141 210'),
  cyan: wash('95 189 234'),
  violet: wash('181 123 255'),
  teal: wash('46 230 182'),
  amber: wash('255 179 64'),
  rose: wash('234 105 129'),
};
