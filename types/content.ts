import type { IconName, IndustryIconName, ServiceIconName } from './icons';
import type { CTA, MediaAsset, SeoMeta, Slug } from './common';

/* ==========================================================================
   Content entities — normalized and page-agnostic.

   Entities reference each other by slug/id, never by embedding. A Service
   appears in the header dropdown, the Home grid, the footer list and its own
   detail page from this one record; the selectors in data/selectors.ts do the
   resolution. That normalization is what keeps page groups 2–17 additive.
   ========================================================================== */

/* -------------------------------------------------------------------------
   Shared fragments
   ------------------------------------------------------------------------- */

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

/** A quantified outcome. Value is a string so "3.2×" and "-41%" both work. */
export interface Metric {
  label: string;
  value: string;
  detail?: string;
}

/* -------------------------------------------------------------------------
   Services
   ------------------------------------------------------------------------- */

export type AccentToken = 'indigo' | 'cyan' | 'violet' | 'teal' | 'amber' | 'rose';

export interface Service {
  slug: Slug;
  /** Full name, used as a page title and card heading. */
  name: string;
  /** Compact name for nav and chips. */
  shortName: string;
  /** One line, sentence case, no trailing period. */
  tagline: string;
  summary: string;
  icon: ServiceIconName;
  accent: AccentToken;
  /** Capability bullets shown on the card and the detail page. */
  capabilities: string[];
  benefits: ValueProp[];
  technologyIds: string[];
  processStepIds: string[];
  caseStudySlugs: Slug[];
  faqIds: string[];
  /** Ordering in nav and grids. Lower first. */
  order: number;
  featured: boolean;
  seo: SeoMeta;
}

/* -------------------------------------------------------------------------
   Industries
   ------------------------------------------------------------------------- */

export interface Industry {
  slug: Slug;
  name: string;
  summary: string;
  icon: IndustryIconName;
  accent: AccentToken;
  image?: MediaAsset;
  /** What goes wrong in this sector without the right partner. */
  challenges: string[];
  solutions: string[];
  caseStudySlugs: Slug[];
  /** Headline proof point for the card, e.g. "PCI-DSS & SOC 2 delivery". */
  proofPoint?: string;
  order: number;
}

/* -------------------------------------------------------------------------
   Case studies
   ------------------------------------------------------------------------- */

export interface CaseStudy {
  slug: Slug;
  client: string;
  /** Short outcome-led title. */
  title: string;
  summary: string;
  industrySlug: Slug;
  serviceSlugs: Slug[];
  cover: MediaAsset;
  challenge: string;
  solution: string;
  results: Metric[];
  technologyIds: string[];
  testimonialId?: string;
  /** Engagement window, e.g. "14 weeks". */
  durationLabel?: string;
  year: number;
  featured: boolean;
  seo: SeoMeta;
}

/* -------------------------------------------------------------------------
   Testimonials
   ------------------------------------------------------------------------- */

export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: MediaAsset;
  };
  caseStudySlug?: Slug;
  /** Optional single metric shown beside the quote. */
  highlight?: Metric;
}

/* -------------------------------------------------------------------------
   Technologies
   ------------------------------------------------------------------------- */

export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'cloud'
  | 'data'
  | 'ai'
  | 'devops';

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  /** Inline SVG path data or a wordmark id resolved by the tech logo registry. */
  logoId: string;
}

export interface TechnologyGroup {
  category: TechCategory;
  label: string;
  description: string;
  technologyIds: string[];
}

/* -------------------------------------------------------------------------
   Process
   ------------------------------------------------------------------------- */

export interface ProcessStep {
  id: string;
  /** 1-based; rendered as 01, 02, … */
  index: number;
  title: string;
  summary: string;
  deliverables: string[];
  durationLabel?: string;
}

/* -------------------------------------------------------------------------
   Stats
   ------------------------------------------------------------------------- */

export interface Stat {
  id: string;
  /** Numeric target for the counter tween. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places to hold while counting. */
  precision?: number;
  label: string;
  description?: string;
}

/* -------------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------------- */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  categoryId?: string;
}

export interface FaqCategory {
  id: string;
  label: string;
}

/* -------------------------------------------------------------------------
   Editorial
   ------------------------------------------------------------------------- */

export interface Post {
  slug: Slug;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover: MediaAsset;
  author: string;
  /** ISO 8601 date. */
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
  seo: SeoMeta;
}

/* -------------------------------------------------------------------------
   Client logos — code-authored SVG wordmarks, not image files.
   ------------------------------------------------------------------------- */

export interface ClientLogo {
  id: string;
  name: string;
  /** Wordmark text rendered in the logo strip. */
  wordmark: string;
  /** Optional descriptor line, e.g. "Series C · Fintech". */
  descriptor?: string;
}

/* ==========================================================================
   Declared now, populated when their page group is built.
   Present so the shared sections and selectors already type-check against
   the final shape.
   ========================================================================== */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: MediaAsset;
  links?: { label: string; href: string }[];
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year?: number;
}

export interface EngagementModel {
  id: string;
  name: string;
  summary: string;
  bestFor: string[];
  icon: IconName;
  cta?: CTA;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  summary: string;
  postedAt: string;
}

export interface Office {
  id: string;
  city: string;
  country: string;
  addressLines: string[];
  phone?: string;
  email?: string;
  mapUrl?: string;
  isHeadquarters: boolean;
}
