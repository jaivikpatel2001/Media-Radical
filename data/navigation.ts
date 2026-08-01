import { ROUTES } from '@/constants/routes';
import type { FooterConfig, HeaderConfig, NavLink } from '@/types/navigation';

import { industries } from './entities/industries';
import { services } from './entities/services';
import { site } from './site';

/**
 * Navigation is DERIVED, not restated.
 *
 * The services and industries entity arrays generate their own menu columns
 * and footer lists, so a new service appears in the header dropdown, the
 * footer and the Home grid from a single edit — the property that keeps page
 * groups 2–17 additive.
 *
 * Deviation from the brief's flat nav list: nine top-level items plus search,
 * phone and a CTA cannot be laid out at 1280px without the cramped look this
 * site exists to avoid. About Us, Careers and Contact Us are grouped under a
 * "Company" dropdown instead — every destination in the brief is still one
 * click from the header, and all of them appear flat in the mobile drawer.
 */

const serviceLinks: NavLink[] = [...services]
  .sort((a, b) => a.order - b.order)
  .map((service) => ({
    label: service.name,
    href: ROUTES.service(service.slug),
    description: service.tagline,
    icon: service.icon,
  }));

/** Services with order 1–8 are delivery; 9+ are marketing and infrastructure. */
const buildServiceCount = services.filter((service) => service.order <= 8).length;

const industryLinks: NavLink[] = [...industries]
  .sort((a, b) => a.order - b.order)
  .map((industry) => ({
    label: industry.name,
    href: ROUTES.industry(industry.slug),
    description: industry.proofPoint,
    icon: industry.icon,
  }));

export const header: HeaderConfig = {
  groups: [
    {
      label: 'Services',
      href: ROUTES.services,
      // Build vs Grow, split at the boundary between the eight delivery
      // services and the six marketing ones (order >= 9). Derived rather than
      // hardcoded, so adding a service lands in the right column by itself.
      columns: [
        {
          title: 'Build & run',
          links: serviceLinks.slice(0, buildServiceCount),
        },
        {
          title: 'Grow & market',
          links: serviceLinks.slice(buildServiceCount),
        },
      ],
      feature: {
        eyebrow: 'Start here',
        title: 'Not sure what you need?',
        description:
          'A two-week review gives you a clear plan with real costs. Take it straight to your budget meeting.',
        href: ROUTES.service('it-consulting'),
        ctaLabel: 'See how a review works',
      },
    },
    {
      label: 'Industries',
      href: ROUTES.industries,
      columns: [
        { links: industryLinks.slice(0, 3) },
        { links: industryLinks.slice(3) },
      ],
    },
    { label: 'Work', href: ROUTES.portfolio },
    { label: 'Process', href: ROUTES.process },
    {
      label: 'Company',
      columns: [
        {
          links: [
            {
              label: 'About us',
              href: ROUTES.about,
              description: 'Who we are and how we work',
            },
            {
              label: 'Careers',
              href: ROUTES.careers,
              description: 'Open jobs and life on the team',
            },
            {
              label: 'Contact us',
              href: ROUTES.contact,
              description: 'Where we are and how to reach us',
            },
          ],
        },
      ],
    },
    {
      label: 'Resources',
      href: ROUTES.resources,
      columns: [
        {
          links: [
            {
              label: 'Insights',
              href: ROUTES.resources,
              description: 'Things we have learned',
            },
            {
              label: 'Case studies',
              href: ROUTES.portfolio,
              description: 'Real projects, real numbers',
            },
            {
              label: 'FAQs',
              href: ROUTES.faq,
              description: 'Straight answers to common questions',
            },
          ],
        },
      ],
    },
  ],
  phone: { label: site.contact.phone, href: site.contact.phoneHref },
  cta: { label: 'Get a quote', href: ROUTES.contact, variant: 'primary' },
  // Search filters the same local entity arrays the pages render from, so it
  // needs no backend. See data/search.ts.
  searchEnabled: true,
};

export const footer: FooterConfig = {
  tagline: site.tagline,
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About us', href: ROUTES.about },
        { label: 'Careers', href: ROUTES.careers },
        { label: 'Insights', href: ROUTES.resources },
        { label: 'Contact us', href: ROUTES.contact },
      ],
    },
    {
      title: 'Services',
      links: serviceLinks.map(({ label, href }) => ({ label, href })),
    },
    {
      title: 'Industries',
      links: industryLinks.map(({ label, href }) => ({ label, href })),
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: ROUTES.resources },
        { label: 'Case studies', href: ROUTES.portfolio },
        { label: 'Our process', href: ROUTES.process },
        { label: 'FAQs', href: ROUTES.faq },
      ],
    },
  ],
  newsletter: {
    title: 'One useful email a month',
    description:
      'What we have learned building software, including the things that went wrong. No sales pitches.',
    placeholder: 'you@company.com',
    submitLabel: 'Subscribe',
    consentNote: 'Unsubscribe any time. We never share your email.',
  },
  socials: [...site.socials],
  legal: [
    { label: 'Privacy policy', href: ROUTES.privacyPolicy },
    { label: 'Terms & conditions', href: ROUTES.terms },
    { label: 'Cookie policy', href: ROUTES.cookiePolicy },
  ],
  copyright: `© ${site.founded}–{{year}} ${site.legalName}. All rights reserved.`,
};
