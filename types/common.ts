import type { ReactNode } from 'react';

/** Primitive shapes shared by every content model and every section. */

export type Slug = string;

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface CTA {
  label: string;
  href: string;
  variant?: ButtonVariant;
  /** Opens in a new tab and gets rel="noopener noreferrer". */
  external?: boolean;
  /** Overrides the visible label for screen readers when the label is terse. */
  ariaLabel?: string;
}

export interface MediaAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Base64 LQIP. Optional — sections fall back to a generated gradient. */
  blurDataURL?: string;
}

/** A light/dark pair. The hero and any art-directed image use this. */
export interface ThemedMedia {
  light: MediaAsset;
  dark: MediaAsset;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: MediaAsset;
  canonical?: string;
  keywords?: string[];
  noindex?: boolean;
}

/**
 * Every section takes exactly one `content` prop plus layout-only extras.
 * Adding a field is therefore a change in `/types`, which the compiler then
 * enforces at every call site — including the future pages that reuse the
 * same section.
 */
export type SectionVariant = 'default' | 'subtle' | 'inverted';

export interface SectionProps<TContent> {
  content: TContent;
  /** Anchor target, e.g. "services". */
  id?: string;
  className?: string;
  variant?: SectionVariant;
}

/** Standard header block: eyebrow, heading, optional lede and CTA. */
export interface SectionIntro {
  eyebrow: string;
  heading: string;
  /** Rendered in serif italic inside the heading, if present. */
  emphasis?: string;
  lede?: string;
  cta?: CTA;
}

export interface WithChildren {
  children?: ReactNode;
}
