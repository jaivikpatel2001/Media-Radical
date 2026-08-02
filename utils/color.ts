/**
 * Colour maths for brand logos.
 *
 * Shared by the hero icon cloud (canvas) and the technology tiles (CSS), so
 * both apply the same visibility rules to the same brand colours. It lives
 * here rather than inside either component because the two would otherwise
 * drift apart.
 */

export type Rgb = [number, number, number];

/** Backgrounds the logos are drawn on, per theme. Keep in sync with --color-bg. */
export const LIGHT_BG: Rgb = [255, 255, 255];
export const DARK_BG: Rgb = [11, 11, 14];

export function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export const toHex = ([r, g, b]: Rgb): string =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

const channelLuminance = (channel: number): number => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export const luminance = ([r, g, b]: Rgb): number =>
  0.2126 * channelLuminance(r) +
  0.7152 * channelLuminance(g) +
  0.0722 * channelLuminance(b);

export const contrast = (a: Rgb, b: Rgb): number => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const mix = (from: Rgb, to: Rgb, amount: number): Rgb =>
  [0, 1, 2].map((i) =>
    Math.round(from[i] + (to[i] - from[i]) * amount),
  ) as Rgb;

/**
 * Nudges a brand colour until it is visible against `background`.
 *
 * Blends toward whichever of black or white opposes the background, in
 * tenths, and stops the moment it clears `minRatio`. A colour that is already
 * visible is returned untouched; one that is not is changed as little as
 * possible, so the hue — and therefore the brand — survives.
 *
 * 1.25 is deliberately just above "invisible". These are large solid glyphs,
 * not text — a text-grade 4.5:1, or even 2.0, would repaint half the set and
 * lose the official colours that make each mark recognisable. Measured, this
 * threshold leaves EVERY logo at its exact brand hex on the light canvas,
 * including the two palest: JavaScript #F7DF1E (1.35:1) and React #61DAFB
 * (1.62:1).
 *
 * What it still catches — marks that would otherwise disappear completely:
 *   pure black (Next.js, Vercel, Express) on the dark canvas — 1.07:1
 *   near-black (Kafka #231F20) on the dark canvas — 1.21:1
 */
export function ensureVisible(
  colour: Rgb,
  background: Rgb,
  minRatio = 1.25,
): Rgb {
  const toward: Rgb = luminance(background) > 0.5 ? [0, 0, 0] : [255, 255, 255];
  let result = colour;

  for (let step = 0; step <= 10; step += 1) {
    if (contrast(result, background) >= minRatio) break;
    result = mix(colour, toward, step / 10);
  }

  return result;
}

/**
 * Both theme-adjusted variants of a brand colour, memoised.
 *
 * Returning both lets CSS switch by theme with no JavaScript at runtime — the
 * tile sets two custom properties and a `[data-theme]` rule picks one.
 */
export interface BrandVariants {
  light: string;
  dark: string;
  /** Space-separated channels, for `rgb(var(--x) / 0.4)` glows. */
  lightRgb: string;
  darkRgb: string;
}

const cache = new Map<string, BrandVariants>();

export function brandVariants(hex: string): BrandVariants {
  const cached = cache.get(hex);
  if (cached) return cached;

  const rgb = hexToRgb(hex);
  const light = ensureVisible(rgb, LIGHT_BG);
  const dark = ensureVisible(rgb, DARK_BG);

  const variants: BrandVariants = {
    light: toHex(light),
    dark: toHex(dark),
    lightRgb: light.join(' '),
    darkRgb: dark.join(' '),
  };
  cache.set(hex, variants);
  return variants;
}
