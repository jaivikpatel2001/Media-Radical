import type { CTA, MediaAsset, SectionIntro, SeoMeta, Slug } from './common';
import type { Metric } from './content';

/* ==========================================================================
   Page-level content models.

   A page model never embeds an entity — it references entities by slug/id and
   supplies only the copy that is specific to that page's framing. The same
   ServicesGrid section therefore renders on Home, on /services and on
   /industries/[slug] from three different slices of the same records.
   ========================================================================== */

/* -------------------------------------------------------------------------
   Section slices — reusable across page groups
   ------------------------------------------------------------------------- */

export interface HeroContent {
  /** Small pill above the headline, e.g. "Now booking Q3 engagements". */
  announcement?: { label: string; href?: string };
  /** Split into lines by SplitText; keep it to 2–4 lines at desktop width. */
  headline: string;
  /** Rendered in serif italic within the headline. Must appear in `headline`. */
  emphasis?: string;
  lede: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  /** Three short proof chips under the CTAs. */
  proofPoints: string[];
  /** Single figure on the card overlapping the hero art. */
  highlight?: Metric;
  /**
   * Ambient art, composed for the light theme. Optional — the section falls
   * back to the CSS gradient mesh, so the page is complete without it.
   *
   * One asset, not a light/dark pair: dark mode applies a CSS filter to the
   * same file rather than doubling the art direction.
   */
  media?: MediaAsset;
}

export interface TrustedByContent {
  heading: string;
  logoIds: string[];
}

export interface IntroContent extends SectionIntro {
  /** Two to three paragraphs. */
  body: string[];
  media: MediaAsset;
  /** Small metrics rail beside the media. */
  highlights: Metric[];
}

export interface ServicesContent extends SectionIntro {
  serviceSlugs: Slug[];
}

export interface IndustriesContent extends SectionIntro {
  industrySlugs: Slug[];
}

export interface WhyChooseUsContent extends SectionIntro {
  /** Value-prop ids resolved from data/entities/valueProps.ts. */
  valuePropIds: string[];
  media: MediaAsset;
}

export interface TechnologiesContent extends SectionIntro {
  /** Category groups rendered as filter tabs. */
  groupIds: string[];
  /** Closing line under the tab panel. */
  note?: string;
}

export interface ProcessContent extends SectionIntro {
  stepIds: string[];
  /** Heading above each step's deliverable list. */
  deliverablesLabel: string;
  /** Shown under the progress rail on the pinned desktop layout. */
  scrollHint: string;
}

export interface CaseStudiesContent extends SectionIntro {
  caseStudySlugs: Slug[];
  /** Per-card link label. */
  itemCtaLabel: string;
}

export interface TestimonialsContent extends SectionIntro {
  testimonialIds: string[];
  /** Affordance label under the scroll-snap rail. */
  railHint: string;
}

export interface StatsContent extends SectionIntro {
  statIds: string[];
}

export interface InsightsContent extends SectionIntro {
  postSlugs: Slug[];
}

export interface FaqContent extends SectionIntro {
  faqIds: string[];
  /** "Still have questions?" panel. */
  fallback: { title: string; description: string; cta: CTA };
}

export interface CtaContent {
  eyebrow: string;
  heading: string;
  emphasis?: string;
  lede: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  /** Short reassurance line under the buttons. */
  note?: string;
}

/* -------------------------------------------------------------------------
   Home page
   ------------------------------------------------------------------------- */

export interface HomePageContent {
  seo: SeoMeta;
  hero: HeroContent;
  trustedBy: TrustedByContent;
  intro: IntroContent;
  services: ServicesContent;
  industries: IndustriesContent;
  whyChooseUs: WhyChooseUsContent;
  technologies: TechnologiesContent;
  process: ProcessContent;
  caseStudies: CaseStudiesContent;
  testimonials: TestimonialsContent;
  stats: StatsContent;
  insights: InsightsContent;
  faq: FaqContent;
  cta: CtaContent;
}

/* -------------------------------------------------------------------------
   404 — the only other page in Phase 1
   ------------------------------------------------------------------------- */

export interface NotFoundContent {
  code: string;
  heading: string;
  emphasis?: string;
  lede: string;
  primaryCta: CTA;
  helpfulLinksTitle: string;
  helpfulLinks: { label: string; href: string; description: string }[];
}
