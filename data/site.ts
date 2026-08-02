/**
 * Brand and contact facts.
 *
 * These are the REAL Media Radical details, taken from mediaradical.in.
 * The company is a digital media agency in Ahmedabad with over a decade of
 * trading history — that positioning is genuine and should not be softened
 * into generic "IT consultancy" language.
 *
 * Everything else on the site (case studies, testimonials, client names,
 * statistics) is illustrative placeholder content written to fit this brand.
 * See DONE.md for which is which.
 */

/**
 * Resolves the public origin, and refuses to guess it on a real deployment.
 *
 * This used to be `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mediaradical.in'`.
 * That fallback caused a live incident: the Render staging site built with the
 * variable unset, did not fail, and served
 * `<link rel="canonical" href="https://mediaradical.in">` plus a sitemap
 * pointing at production. A staging site claiming to be production is how a
 * domain gets deduplicated out of an index.
 *
 * A wrong canonical URL is invisible until it has already done damage, so the
 * fallback is gone and a misconfigured deploy now fails at build instead.
 *
 * `RENDER` is set to "true" on every Render service, which is what separates
 * "deploying" from "someone running npm run build on a laptop". Local builds
 * keep working without any .env file.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // Trailing slash stripped: `${site.url}/sitemap.xml` must not produce a
  // double slash, and canonical URLs have to match byte for byte.
  if (configured) return configured.replace(/\/+$/, '');

  if (process.env.RENDER) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL is not set.\n\n' +
        'Set it in the Render dashboard under Environment, then redeploy:\n' +
        '  production  https://mediaradical.in\n' +
        '  staging     https://mediaradical.onrender.com\n\n' +
        'It is inlined at build time, so a restart will not pick it up. ' +
        'This build was stopped on purpose: without it the site would publish ' +
        'canonical URLs and a sitemap pointing at the wrong domain.',
    );
  }

  return 'http://localhost:3000';
}

export const site = {
  name: 'Media Radical',
  legalName: 'Media Radical',
  tagline: 'Digital work that moves the numbers.',
  description:
    'Media Radical is a digital media agency in Ahmedabad. For over a decade we have built websites, apps and online stores, and run the SEO, ads and social campaigns that bring people to them.',
  // Note: no em dash anywhere in visitor-facing copy. See CLAUDE.md.
  founded: 2013,

  /**
   * Absolute site origin. Feeds `metadataBase`, the canonical link, the
   * sitemap, robots.txt and every JSON-LD `@id`.
   */
  url: resolveSiteUrl(),

  contact: {
    email: 'contact@mediaradical.in',
    salesEmail: 'contact@mediaradical.in',
    careersEmail: 'contact@mediaradical.in',
    phone: '+91 972 344 6969',
    phoneHref: 'tel:+919723446969',
  },

  address: {
    lines: ['Unit No. 304, Block B-1', 'SSC Compound, New Ranip'],
    city: 'Ahmedabad',
    region: 'Gujarat',
    postalCode: '382470',
    country: 'India',
  },

  hours: {
    weekdays: 'Monday to Saturday, 10am – 7pm IST',
    response: 'We reply within one working day.',
  },

  /** Global chrome strings. Kept here so no literal copy lives in a .tsx. */
  ui: {
    preloader: {
      /** Announced to assistive tech while the first paint settles. */
      status: 'Loading Media Radical',
      /** Sits under the mark. Short enough to read in under a second. */
      caption: 'Digital work that moves the numbers',
    },
    /** Accessible name for the back-to-top control. It has no visible label. */
    scrollToTop: 'Back to top',
  },

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/media-radical', platform: 'linkedin' },
    { label: 'X', href: 'https://x.com/mediaradical', platform: 'x' },
    { label: 'Instagram', href: 'https://www.instagram.com/mediaradical', platform: 'instagram' },
    { label: 'GitHub', href: 'https://github.com/mediaradical', platform: 'github' },
  ],
} as const;

export type Site = typeof site;
