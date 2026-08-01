/**
 * Conditional className joiner.
 *
 * Deliberately not `clsx` — with CSS Modules there is no class-conflict
 * problem to solve, so a dependency would buy nothing.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>;

export function cx(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;

    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
      continue;
    }

    for (const [key, active] of Object.entries(value)) {
      if (active) out.push(key);
    }
  }

  return out.join(' ');
}
