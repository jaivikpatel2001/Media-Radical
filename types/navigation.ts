import type { CTA } from './common';
import type { IconName } from './icons';

/* ==========================================================================
   Navigation models.

   The Header and Footer read these trees and nothing else. Adding a service
   to data/entities/services.ts regenerates the dropdown and the footer column
   automatically, because data/navigation.ts derives both from the entity
   array rather than restating the links.
   ========================================================================== */

export interface NavLink {
  label: string;
  href: string;
  /** Second line inside a mega-menu row. */
  description?: string;
  icon?: IconName;
  /** e.g. "New". */
  badge?: string;
  external?: boolean;
}

/** A promoted panel pinned to the side of a mega-menu. */
export interface NavFeature {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export interface NavGroup {
  label: string;
  /** Present when the group itself is a destination as well as a trigger. */
  href?: string;
  /** Absent for a plain link; present for a dropdown. */
  columns?: NavColumn[];
  feature?: NavFeature;
}

export interface NavColumn {
  title?: string;
  links: NavLink[];
}

export interface HeaderConfig {
  groups: NavGroup[];
  phone: { label: string; href: string };
  cta: CTA;
  searchEnabled: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  /** Key into the social icon registry. */
  platform: 'linkedin' | 'x' | 'github' | 'dribbble' | 'youtube' | 'instagram';
}

export interface FooterConfig {
  tagline: string;
  columns: FooterColumn[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    submitLabel: string;
    consentNote: string;
  };
  socials: SocialLink[];
  legal: NavLink[];
  copyright: string;
}
