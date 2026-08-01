import type { CaseStudy } from '@/types/content';

/**
 * Featured projects.
 *
 * WRITING STYLE — plain English. Say what was wrong, what we did, and what
 * changed. Numbers in the results, not in the prose.
 *
 * Cover images are the assets listed in imagegeneration.md. Until those files
 * exist at these paths, sections render a gradient placeholder — dropping the
 * real file in is a no-code change.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'northwind-capital-platform',
    client: 'Northwind Capital',
    title: 'End-of-day reports that finish in minutes',
    summary:
      'Their books used to close overnight. Now balances update as trades happen, and the morning report is ready before anyone arrives.',
    industrySlug: 'financial-services',
    serviceSlugs: ['web-development', 'custom-software-development', 'ui-ux-design'],
    cover: {
      src: '/images/case-studies/fintech-platform.webp',
      alt: 'A trading dashboard on a wide monitor',
      width: 1600,
      height: 1000,
    },
    challenge:
      'Everything was processed in one overnight batch. If it failed at 2am, traders started the day with no numbers. Every report for the regulator was then rebuilt by hand.',
    solution:
      'We rebuilt the core so every trade updates the balance straight away, and put a live view on top of it. Reports for the regulator now come from the same data, so there is nothing to reconcile.',
    results: [
      { label: 'Time to close the books', value: '−94%', detail: 'From 8 hours to 27 minutes' },
      { label: 'Analyst time saved', value: '31 hrs', detail: 'Every month, per person' },
      { label: 'Numbers that did not match', value: '−78%', detail: 'Quarter on quarter' },
    ],
    technologyIds: ['typescript', 'node', 'postgres', 'kafka', 'aws', 'nextjs'],
    testimonialId: 'testimonial-northwind',
    durationLabel: '22 weeks',
    year: 2025,
    featured: true,
    seo: {
      title: 'Northwind Capital — Faster end-of-day reporting',
      description:
        'How an overnight batch process became live reporting, cutting the daily close from 8 hours to 27 minutes.',
    },
  },
  {
    slug: 'helix-health-cloud',
    client: 'Helix Health',
    title: 'Twelve systems, one patient record',
    summary:
      'Patient data was spread across twelve systems that could not talk to each other. Now it is one record, and the audit paperwork fills itself in.',
    industrySlug: 'healthcare',
    serviceSlugs: ['cloud-and-devops', 'mobile-app-development', 'maintenance-and-support'],
    cover: {
      src: '/images/case-studies/health-cloud.webp',
      alt: 'A clinical workspace with a tablet showing patient data',
      width: 1600,
      height: 1000,
    },
    challenge:
      'Twelve systems held overlapping records with no shared patient ID. Getting the evidence together for the annual audit took four people most of a month.',
    solution:
      'We built one layer that all twelve systems connect to, with a single ID per patient behind it. We moved everything onto properly monitored hosting and automated the audit paperwork.',
    results: [
      { label: 'Uptime', value: '99.98%', detail: 'Over the last twelve months' },
      { label: 'Audit preparation', value: '−87%', detail: 'From 4 weeks to 3 days' },
      { label: 'Adding a new system', value: '2 days', detail: 'Down from several weeks' },
    ],
    technologyIds: ['aws', 'terraform', 'kubernetes', 'postgres', 'react-native', 'typescript'],
    testimonialId: 'testimonial-helix',
    durationLabel: '30 weeks',
    year: 2025,
    featured: true,
    seo: {
      title: 'Helix Health — One patient record across twelve systems',
      description:
        'Joining twelve clinical systems into one record, and cutting audit preparation from four weeks to three days.',
    },
  },
  {
    slug: 'meridian-commerce-replatform',
    client: 'Meridian Retail Group',
    title: 'A checkout that survived Black Friday',
    summary:
      'Checkout took eleven seconds on a normal phone and the site could not be touched for three months a year. We fixed both.',
    industrySlug: 'retail-and-ecommerce',
    serviceSlugs: ['web-development', 'ui-ux-design', 'it-consulting'],
    cover: {
      src: '/images/case-studies/retail-commerce.webp',
      alt: 'An automated retail warehouse',
      width: 1600,
      height: 1000,
    },
    challenge:
      'The old site could not be changed between October and January without risking the busiest weeks of the year. Checkout took eleven seconds on a mid-range phone, and shoppers were giving up.',
    solution:
      'We replaced the site one section at a time so it kept running throughout. Checkout was rebuilt from scratch, and we added an automatic speed check that blocks any release that would slow it down again.',
    results: [
      { label: 'Checkout speed', value: '3.2×', detail: 'On a mid-range Android phone' },
      { label: 'Abandoned carts', value: '−23%', detail: 'Compared to last year' },
      { label: 'Updates shipped', value: '40×', detail: 'Monthly, now several a day' },
    ],
    technologyIds: ['nextjs', 'react', 'typescript', 'vercel', 'redis', 'postgres'],
    testimonialId: 'testimonial-meridian',
    durationLabel: '18 weeks',
    year: 2024,
    featured: true,
    seo: {
      title: 'Meridian Retail Group — A faster online store',
      description:
        'Rebuilding an online store one piece at a time: 3.2× faster checkout and 23% fewer abandoned carts.',
    },
  },
  {
    slug: 'atlas-logistics-control',
    client: 'Atlas Freight',
    title: 'Delays that find you first',
    summary:
      'Fourteen carriers sent data fourteen different ways. Now it is one screen, and problem deliveries flag themselves before the customer calls.',
    industrySlug: 'logistics-and-supply-chain',
    serviceSlugs: ['custom-software-development', 'ai-and-automation', 'cloud-and-devops'],
    cover: {
      src: '/images/case-studies/logistics-control.webp',
      alt: 'A logistics control room screen showing delivery routes',
      width: 1600,
      height: 1000,
    },
    challenge:
      'Fourteen carriers each sent updates in their own format. The team usually found out about a problem when the customer rang, and planning happened in a spreadsheet nobody could check.',
    solution:
      'We put every carrier feed into one format and built a screen that flags deliveries going wrong. Anything the system is unsure about goes to a person, and every decision is recorded.',
    results: [
      { label: 'Manual chasing', value: '−41%', detail: 'Within six months' },
      { label: 'Time to spot a problem', value: '11 min', detail: 'Down from 6 hours' },
      { label: 'On-time deliveries', value: '+7.4pt', detail: 'Across the network' },
    ],
    technologyIds: ['python', 'typescript', 'kafka', 'postgres', 'aws', 'langchain'],
    testimonialId: 'testimonial-atlas',
    durationLabel: '26 weeks',
    year: 2025,
    featured: false,
    seo: {
      title: 'Atlas Freight — Spotting delivery problems early',
      description:
        'One screen for fourteen carrier feeds, with automatic alerts that cut manual chasing by 41%.',
    },
  },
];
