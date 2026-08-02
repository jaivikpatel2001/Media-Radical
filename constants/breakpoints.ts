/**
 * Breakpoints, in px. Mirrors the media queries used inside CSS modules.
 * Exported for `gsap.matchMedia()` and `useMediaQuery`, which need the value
 * in JavaScript rather than CSS.
 */
export const BREAKPOINT = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINT;

export const above = (key: BreakpointKey): string =>
  `(min-width: ${BREAKPOINT[key]}px)`;

export const below = (key: BreakpointKey): string =>
  `(max-width: ${BREAKPOINT[key] - 0.02}px)`;

/** The media queries every gsap.matchMedia() context branches on. */
export const MEDIA = {
  desktop: above('lg'),
  tablet: `${above('md')} and ${below('lg')}`,
  mobile: below('md'),
  motionOk: '(prefers-reduced-motion: no-preference)',
  motionReduced: '(prefers-reduced-motion: reduce)',
  hover: '(hover: hover) and (pointer: fine)',
} as const;
