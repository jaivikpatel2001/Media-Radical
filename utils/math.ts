/** Numeric helpers shared by animation scenes and layout logic. */

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const lerp = (from: number, to: number, t: number): number =>
  from + (to - from) * t;

/** Remap a value from one range to another, clamped to the output range. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => {
  if (inMax === inMin) return outMin;
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
};

/** Frame-rate independent smoothing factor for a rAF lerp. */
export const damp = (lambda: number, delta: number): number =>
  1 - Math.exp(-lambda * delta);
