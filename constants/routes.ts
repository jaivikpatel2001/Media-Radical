/**
 * Single source of truth for every URL on the site.
 *
 * No component may write a path literal. When a route moves, this file is the
 * only edit — which is what makes the remaining 16 page groups additive
 * rather than a find-and-replace across every nav, card and CTA.
 *
 * `implemented` marks what actually exists today. Phase 1 ships `/` and the
 * 404 handler; everything else resolves to the styled not-found page until
 * its stage lands.
 */

export const ROUTES = {
  home: '/',
  about: '/about',

  services: '/services',
  service: (slug: string) => `/services/${slug}`,

  industries: '/industries',
  industry: (slug: string) => `/industries/${slug}`,

  portfolio: '/portfolio',
  caseStudy: (slug: string) => `/portfolio/${slug}`,

  process: '/process',
  careers: '/careers',
  contact: '/contact',

  resources: '/resources',
  article: (slug: string) => `/resources/${slug}`,

  faq: '/faq',

  privacyPolicy: '/privacy-policy',
  terms: '/terms-and-conditions',
  cookiePolicy: '/cookie-policy',

  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
} as const;

/** Routes with a page.tsx today. Used by sitemap.ts and by nav affordances. */
export const IMPLEMENTED_ROUTES: readonly string[] = [ROUTES.home];

export const isImplemented = (href: string): boolean =>
  IMPLEMENTED_ROUTES.includes(href);

/** In-page anchors on the Home route. */
export const HOME_ANCHORS = {
  services: '#services',
  industries: '#industries',
  process: '#process',
  work: '#work',
  faq: '#faq',
  contact: '#contact',
} as const;
