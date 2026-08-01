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

export const site = {
  name: 'Media Radical',
  legalName: 'Media Radical',
  tagline: 'Digital work that moves the numbers.',
  description:
    'Media Radical is a digital media agency in Ahmedabad. For over a decade we have built websites, apps and online stores, and run the SEO, ads and social campaigns that bring people to them.',
  // Note: no em dash anywhere in visitor-facing copy. See CLAUDE.md.
  founded: 2013,

  /**
   * Absolute site origin. Feeds `metadataBase`, the sitemap, robots.txt and
   * every JSON-LD `@id`, so it must be the real public origin — a hardcoded
   * production URL makes preview deployments advertise canonical links that
   * point at production. Set NEXT_PUBLIC_SITE_URL per environment.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mediaradical.in',

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

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/media-radical', platform: 'linkedin' },
    { label: 'X', href: 'https://x.com/mediaradical', platform: 'x' },
    { label: 'Instagram', href: 'https://www.instagram.com/mediaradical', platform: 'instagram' },
    { label: 'GitHub', href: 'https://github.com/mediaradical', platform: 'github' },
  ],
} as const;

export type Site = typeof site;
