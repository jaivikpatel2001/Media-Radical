import { ROUTES } from '@/constants/routes';
import type { HomePageContent } from '@/types/pages';

import { site } from '../site';

/**
 * Home page content.
 *
 * WRITING STYLE — keep to this when editing:
 *   • Short sentences. Aim for 8–14 words.
 *   • Everyday words. "We build" not "we architect and deliver".
 *   • Say the benefit, then the proof. No build-up.
 *   • No insider jargon on this page. Technical terms belong on the service
 *     detail pages, where the reader has already opted in.
 *
 * Entities are referenced by slug/id and resolved through data/selectors.ts —
 * this file supplies only the framing copy specific to the Home page. The
 * same sections consume a different slice on /services, /industries/[slug]
 * and the eight service detail pages.
 */
export const homePage: HomePageContent = {
  seo: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    keywords: [
      'IT company',
      'software development company',
      'web and mobile app development',
      'cloud and DevOps services',
      'IT consulting',
    ],
  },

  /* ------------------------------------------------------------------ hero */
  hero: {
    announcement: {
      label: 'Now taking new projects for Q4 2026',
      href: ROUTES.contact,
    },
    headline: 'We build software that works.',
    emphasis: 'that works',
    lede: 'Web apps, mobile apps and cloud systems for growing companies. You get a clear plan and a fixed price before we start. Then working software every two weeks.',
    primaryCta: { label: 'Start your project', href: ROUTES.contact, variant: 'primary' },
    secondaryCta: { label: 'See our work', href: ROUTES.portfolio, variant: 'secondary' },
    proofPoints: [
      '240+ projects done since 2014',
      '68 in-house developers and designers',
      '94% of clients come back',
    ],
    highlight: { label: 'of clients hire us again', value: '94%' },
    // The rotating logo sphere replaces the hero image. Swap back by deleting
    // `techCloud` — `media` below is still wired up and takes over.
    techCloud: {
      label: 'Technologies we work with:',
      technologyIds: [
        'react',
        'nextjs',
        'typescript',
        'node',
        'python',
        'go',
        'swift',
        'kotlin',
        'postgres',
        'redis',
        'kafka',
        'docker',
        'kubernetes',
        'terraform',
        'gcp',
        'vercel',
        'graphql',
        'figma',
        'firebase',
        'pytorch',
        'grafana',
        'github-actions',
      ],
    },
    media: {
      src: '/images/hero/hero-ambient.webp',
      // Decorative: the headline beside it carries the meaning.
      alt: '',
      width: 2400,
      height: 1400,
    },
  },

  /* ------------------------------------------------------------- trusted by */
  trustedBy: {
    heading: 'Trusted by companies in finance, healthcare, retail and logistics',
    logoIds: [
      'northwind',
      'helix',
      'meridian',
      'atlas',
      'vector',
      'kestrel',
      'lumen',
      'arboretum',
    ],
  },

  /* ----------------------------------------------------------------- intro */
  intro: {
    eyebrow: 'About us',
    heading: 'A tech partner that feels like your own team.',
    emphasis: 'your own team',
    body: [
      `${site.name} has built software for over ten years. We work with companies that need it done right the first time. Small senior teams. A clear price up front. Something you can click on every two weeks.`,
      'We hire our own people. All 68 developers and designers are full-time staff, and we never pass your project to an outside agency. When we finish, we hand everything over and show your team how it works.',
    ],
    cta: { label: 'More about us', href: ROUTES.about, variant: 'link' },
    media: {
      src: '/images/intro-workspace.webp',
      alt: 'Our team working together in the studio',
      width: 1600,
      height: 1200,
    },
    highlights: [
      { label: 'Started in', value: '2014' },
      { label: 'Full-time staff', value: '68' },
      { label: 'Clients who return', value: '94%' },
    ],
  },

  /* -------------------------------------------------------------- services */
  services: {
    eyebrow: 'What we do',
    heading: 'Eight services. One way of working.',
    emphasis: 'One way of working',
    lede: 'Most projects use two or three of these together. Every one follows the same steps and the same standards.',
    cta: { label: 'See all services', href: ROUTES.services, variant: 'secondary' },
    serviceSlugs: [
      'web-development',
      'mobile-app-development',
      'ui-ux-design',
      'custom-software-development',
      'cloud-and-devops',
      'ai-and-automation',
      'it-consulting',
      'maintenance-and-support',
    ],
  },

  /* ------------------------------------------------------------ industries */
  industries: {
    eyebrow: 'Who we work with',
    heading: 'We know these industries well.',
    emphasis: 'know these industries',
    lede: 'Each one has its own rules and its own problems. We have solved them enough times to quote you an honest price.',
    cta: { label: 'See all industries', href: ROUTES.industries, variant: 'link' },
    industrySlugs: [
      'financial-services',
      'healthcare',
      'retail-and-ecommerce',
      'logistics-and-supply-chain',
      'saas-and-technology',
      'manufacturing',
    ],
  },

  /* --------------------------------------------------------- why choose us */
  whyChooseUs: {
    eyebrow: 'Why choose us',
    heading: 'Six promises we put in writing.',
    emphasis: 'in writing',
    lede: 'Every company says they have great people and clear handovers. These are the ones we will sign our name to.',
    valuePropIds: [
      'value-senior',
      'value-fixed-scope',
      'value-own-it',
      'value-measured',
      'value-security',
      'value-handover',
    ],
    media: {
      src: '/images/why-choose-us.webp',
      alt: 'A desk with a laptop and design tools',
      width: 1400,
      height: 1000,
    },
  },

  /* ----------------------------------------------------------- technologies */
  technologies: {
    eyebrow: 'Our tools',
    heading: 'We pick tools that last.',
    emphasis: 'that last',
    lede: 'New is not always better. We choose proven technology, because you will live with it for years after launch.',
    groupIds: [
      'design',
      'frontend',
      'backend',
      'database',
      'cms',
      'mobile',
      'cloud',
      'ai',
    ],
    note: 'We use every tool here on live projects today, and we can support it for years to come.',
  },

  /* --------------------------------------------------------------- process */
  process: {
    eyebrow: 'How we work',
    heading: 'Six steps. You see progress in every one.',
    emphasis: 'You see progress',
    lede: 'No long gaps where nothing happens. From week three you can open your project and click through it.',
    cta: { label: 'See the full process', href: ROUTES.process, variant: 'link' },
    stepIds: ['discover', 'define', 'design', 'build', 'launch', 'evolve'],
    deliverablesLabel: 'What you get',
  },

  /* ---------------------------------------------------------- case studies */
  caseStudies: {
    eyebrow: 'Our work',
    heading: 'Real results, with real numbers.',
    emphasis: 'with real numbers',
    lede: 'We measure how things work before we start. That is the only way to prove what changed.',
    cta: { label: 'See all case studies', href: ROUTES.portfolio, variant: 'secondary' },
    itemCtaLabel: 'Read the full story',
    caseStudySlugs: [
      'northwind-capital-platform',
      'helix-health-cloud',
      'meridian-commerce-replatform',
    ],
  },

  /* ---------------------------------------------------------- testimonials */
  testimonials: {
    eyebrow: 'Client feedback',
    heading: 'What clients say after we finish.',
    emphasis: 'after we finish',
    testimonialIds: [
      'testimonial-northwind',
      'testimonial-helix',
      'testimonial-meridian',
      'testimonial-atlas',
      'testimonial-vector',
    ],
  },

  /* ----------------------------------------------------------------- stats */
  stats: {
    eyebrow: 'The numbers',
    heading: 'Ten years of work, counted.',
    statIds: ['stat-projects', 'stat-retention', 'stat-engineers', 'stat-uptime'],
  },

  /* -------------------------------------------------------------- insights */
  insights: {
    eyebrow: 'Insights',
    heading: 'Things we have learned.',
    lede: 'Written by the people doing the work. Short, useful and free of sales talk.',
    cta: { label: 'Read more', href: ROUTES.resources, variant: 'link' },
    postSlugs: [
      'evaluation-harness-before-the-feature',
      'cloud-spend-nobody-owns',
      'design-systems-that-survive-handover',
    ],
  },

  /* ------------------------------------------------------------------- faq */
  faq: {
    eyebrow: 'Questions',
    heading: 'What people ask us first.',
    faqIds: [
      'faq-engagement',
      'faq-timeline',
      'faq-pricing',
      'faq-team',
      'faq-handover',
      'faq-ip',
    ],
    fallback: {
      title: 'Still have a question?',
      description:
        'Send it over. A developer will answer you, not a sales rep.',
      cta: { label: 'Ask us', href: ROUTES.contact, variant: 'secondary' },
    },
  },

  /* ------------------------------------------------------------------- cta */
  cta: {
    eyebrow: 'Get started',
    heading: 'Tell us what you need.',
    emphasis: 'what you need',
    lede: 'Book a free 30-minute call. We will tell you honestly if we can help. If we cannot, we will point you to someone who can.',
    primaryCta: { label: 'Book a free call', href: ROUTES.contact, variant: 'primary' },
    secondaryCta: {
      label: site.contact.phone,
      href: site.contact.phoneHref,
      variant: 'secondary',
      ariaLabel: `Call ${site.name} on ${site.contact.phone}`,
    },
    note: site.hours.response,
  },
};
