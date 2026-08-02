import { ROUTES } from '@/constants/routes';
import { images } from '@/data/images';
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
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    keywords: [
      'digital marketing agency Ahmedabad',
      'website development company',
      'SEO services India',
      'Google Ads management',
      'mobile app development',
      'ecommerce website development',
    ],
  },

  /* ------------------------------------------------------------------ hero */
  hero: {
    announcement: {
      label: 'Now taking new projects for Q4 2026',
      href: ROUTES.contact,
    },
    headline: 'Websites, apps and the marketing to match.',
    emphasis: 'and the marketing',
    lede: 'A digital agency in Ahmedabad, working with businesses across India since 2013. We design and build the thing, then run the SEO, ads and social that bring people to it.',
    primaryCta: { label: 'Start your project', href: ROUTES.contact, variant: 'primary' },
    secondaryCta: { label: 'See our work', href: ROUTES.portfolio, variant: 'secondary' },
    proofPoints: [
      'Over a decade in business',
      'In-house team, nothing outsourced',
      'Build and marketing under one roof',
    ],
    highlight: { label: 'of clients hire us again', value: '94%' },
    // Grounded in the twelve real clients listed on mediaradical.in.
    highlightSecondary: { label: 'businesses trust us', value: '12+' },
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
    // No `media` here on purpose. HeroSection renders the icon cloud whenever
    // `techCloud` has logos, so a hero image would be unreachable data and a
    // prompt somebody would waste time generating. See imagegeneration.md.
  },

  /* ------------------------------------------------------------- trusted by */
  trustedBy: {
    // Real client names from mediaradical.in. The heading avoids naming
    // sectors, because the source gives none for any of them.
    heading: 'Trusted by businesses across India for over a decade',
    logoIds: [
      'philbrick',
      'simplex',
      'tte',
      'jasco',
      'akvalve',
      'mazda',
      'hpauto',
      'hv',
      'abdhruv',
      'awatech',
      'rotary',
      'friends',
    ],
  },

  /* ----------------------------------------------------------------- intro */
  intro: {
    eyebrow: 'About us',
    heading: 'A digital partner that feels like your own team.',
    emphasis: 'your own team',
    body: [
      `${site.name} is a digital media agency based in Ahmedabad. For over a decade we have worked with corporates, MSMEs and small businesses across India, building the website or app and then running the marketing that brings people to it.`,
      'Design, development and marketing sit in one team. That matters more than it sounds: the person running your ads can walk over to the person who built the landing page, and a problem gets fixed the same day instead of the next sprint.',
    ],
    cta: { label: 'More about us', href: ROUTES.about, variant: 'link' },
    media: images.studioTeam,
    highlights: [
      { label: 'Working since', value: '2013' },
      { label: 'Based in', value: 'Ahmedabad' },
      { label: 'Services offered', value: '14' },
    ],
  },

  /* -------------------------------------------------------------- services */
  services: {
    eyebrow: 'What we do',
    heading: 'Eight services. One team.',
    emphasis: 'One team',
    lede: 'Build and marketing in the same place, which means the people running your ads can talk to the people who built the page they point at.',
    cta: { label: 'See all services', href: ROUTES.services, variant: 'secondary' },
    /**
     * The home page shows the eight services Media Radical leads with. The
     * other six still exist in data/entities/services.ts and still appear in
     * navigation, the sitemap and on /services. This is a display slice, not
     * a catalogue change, which is exactly what the serviceSlugs list is for.
     */
    serviceSlugs: [
      'web-development',
      'mobile-app-development',
      'seo',
      'ppc-and-google-ads',
      'social-media-marketing',
      'domain-and-hosting',
      'email-solutions',
      'ecommerce-and-crm',
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
    media: images.planningMeeting,
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
      'vardhman-engineering-seo',
      'anand-diagnostics-booking',
      'shreeji-textiles-store',
    ],
  },

  /* ---------------------------------------------------------- testimonials */
  testimonials: {
    eyebrow: 'Client feedback',
    heading: 'What clients say after we finish.',
    emphasis: 'after we finish',
    testimonialIds: [
      'testimonial-01',
      'testimonial-02',
      'testimonial-03',
      'testimonial-04',
      'testimonial-05',
    ],
  },

  /* ----------------------------------------------------------------- stats */
  stats: {
    eyebrow: 'The numbers',
    heading: 'A decade of work, counted.',
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
