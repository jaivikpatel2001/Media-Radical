/**
 * Motion constants shared by GSAP scenes and Motion components.
 *
 * These mirror the CSS custom properties in styles/tokens.css. Both layers
 * need the same curves, and JavaScript cannot read a CSS variable cheaply
 * inside a tween, so the values are declared once here and once there.
 * If you change a curve, change it in both places.
 */

/** cubic-bezier control points, for Motion's `ease` array form. */
export const EASE = {
  /** --ease-out-expo — the signature curve. Fast out, long glide. */
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOutQuint: [0.83, 0, 0.17, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

/** GSAP eases. GSAP's built-ins are closer to these curves than CustomEase. */
export const GSAP_EASE = {
  outExpo: 'expo.out',
  outQuart: 'quart.out',
  inOutQuint: 'quint.inOut',
  outBack: 'back.out(1.7)',
  none: 'none',
} as const;

/** Seconds — GSAP's unit. */
export const DURATION = {
  instant: 0.09,
  fast: 0.18,
  base: 0.32,
  slow: 0.56,
  slower: 0.9,
  cinematic: 1.4,
} as const;

export const STAGGER = {
  tight: 0.045,
  base: 0.08,
  loose: 0.13,
} as const;

/**
 * Where a reveal fires. "85%" means: start when the element's top reaches
 * 85% down the viewport — i.e. just as it enters, not once it is centred.
 */
export const TRIGGER = {
  reveal: 'top 85%',
  revealLate: 'top 72%',
  enter: 'top bottom',
  centre: 'center center',
  exit: 'bottom top',
} as const;
