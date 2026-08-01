import type { AccentToken } from '@/types/content';

/**
 * Maps an entity's accent token to the two CSS custom properties every
 * accented card reads: a solid colour and a translucent wash.
 *
 * Returned as an inline style rather than a class per accent, so adding a
 * seventh accent is a change here and nowhere in CSS. The values reference
 * primitives from styles/tokens.css, which keeps them theme-aware.
 */
export const ACCENT_VARS: Record<AccentToken, React.CSSProperties> = {
  indigo: {
    ['--accent-colour' as string]: 'var(--accent-500)',
    ['--accent-wash' as string]: 'rgb(91 83 245 / 0.11)',
  },
  cyan: {
    ['--accent-colour' as string]: 'var(--cyan-500)',
    ['--accent-wash' as string]: 'rgb(15 181 236 / 0.12)',
  },
  violet: {
    ['--accent-colour' as string]: 'var(--violet-500)',
    ['--accent-wash' as string]: 'rgb(147 51 234 / 0.11)',
  },
  teal: {
    ['--accent-colour' as string]: 'var(--teal-400)',
    ['--accent-wash' as string]: 'rgb(46 230 182 / 0.14)',
  },
  amber: {
    ['--accent-colour' as string]: 'var(--amber-400)',
    ['--accent-wash' as string]: 'rgb(255 179 64 / 0.15)',
  },
  rose: {
    ['--accent-colour' as string]: 'var(--rose-400)',
    ['--accent-wash' as string]: 'rgb(255 107 129 / 0.13)',
  },
};
