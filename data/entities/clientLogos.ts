import type { ClientLogo } from '@/types/content';

/**
 * The trust strip.
 *
 * These are the twelve REAL clients listed on mediaradical.in, read from the
 * client logo filenames on that page. The names are factual.
 *
 * `descriptor` is deliberately left off. The source site gives no sector for
 * any of them, and inventing one ("Manufacturing", "Automotive") would be
 * putting a claim about a real, identifiable company on the page. Add them
 * only once someone at Media Radical confirms each.
 *
 * Rendered as typographic wordmarks rather than image files: they stay crisp
 * at any size, follow the theme, and cost nothing to download. Swap in the
 * real logo artwork when it is available.
 */
export const clientLogos: ClientLogo[] = [
  { id: 'philbrick', name: 'Philbrick India', wordmark: 'PHILBRICK' },
  { id: 'simplex', name: 'Simplex', wordmark: 'SIMPLEX' },
  { id: 'tte', name: 'TTE', wordmark: 'TTE' },
  { id: 'jasco', name: 'Jasco', wordmark: 'JASCO' },
  { id: 'akvalve', name: 'AK Valve', wordmark: 'AK VALVE' },
  { id: 'mazda', name: 'Mazda', wordmark: 'MAZDA' },
  { id: 'hpauto', name: 'HP Auto', wordmark: 'HP AUTO' },
  { id: 'hv', name: 'HV', wordmark: 'HV' },
  { id: 'abdhruv', name: 'AB & Dhruv', wordmark: 'AB & DHRUV' },
  { id: 'awatech', name: 'Awatech', wordmark: 'AWATECH' },
  { id: 'rotary', name: 'Rotary', wordmark: 'ROTARY' },
  { id: 'friends', name: 'Friends', wordmark: 'FRIENDS' },
];
