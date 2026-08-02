import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Whether a `/images/...` asset actually exists in `public/`.
 *
 * Checked on the server at build time, which is the right place for a fully
 * static site: the answer is baked into the HTML, so a missing image costs no
 * client JavaScript, produces no broken-image flash and no 404 request. When
 * a real file is dropped in, the next build picks it up with no code change.
 *
 * The alternative — an onError handler — would force every image slot to
 * become a Client Component for a condition known at build time.
 */
const cache = new Map<string, boolean>();

export function assetExists(src: string): boolean {
  if (!src.startsWith('/')) return false;

  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  const exists = existsSync(join(process.cwd(), 'public', src));
  cache.set(src, exists);
  return exists;
}

/**
 * A stable 0–360 hue derived from the path, so each placeholder gets its own
 * tint and a grid of them reads as deliberate rather than broken.
 */
export function placeholderHue(src: string): number {
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) {
    hash = (hash * 31 + src.charCodeAt(i)) % 100000;
  }
  // Bias toward the indigo–cyan–violet arc the palette already uses.
  return 210 + (hash % 90);
}
