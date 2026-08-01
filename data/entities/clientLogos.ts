import type { ClientLogo } from '@/types/content';

/**
 * The trust strip.
 *
 * Rendered as typographic wordmarks in SVG rather than image files: vector
 * generators mangle lettering, real client logos need permission, and drawn
 * text stays crisp and theme-aware at zero bytes.
 */
export const clientLogos: ClientLogo[] = [
  { id: 'northwind', name: 'Northwind Capital', wordmark: 'NORTHWIND', descriptor: 'Finance' },
  { id: 'helix', name: 'Helix Health', wordmark: 'HELIX', descriptor: 'Healthcare' },
  { id: 'meridian', name: 'Meridian Retail Group', wordmark: 'MERIDIAN', descriptor: 'Retail' },
  { id: 'atlas', name: 'Atlas Freight', wordmark: 'ATLAS', descriptor: 'Logistics' },
  { id: 'vector', name: 'Vector Labs', wordmark: 'VECTOR', descriptor: 'Software' },
  { id: 'kestrel', name: 'Kestrel Industrial', wordmark: 'KESTREL', descriptor: 'Manufacturing' },
  { id: 'lumen', name: 'Lumen Energy', wordmark: 'LUMEN', descriptor: 'Energy' },
  { id: 'arboretum', name: 'Arboretum Group', wordmark: 'ARBORETUM', descriptor: 'Real estate' },
];
