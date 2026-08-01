import type { Testimonial } from '@/types/content';

/**
 * WRITING STYLE — these should read like someone talking, not like marketing.
 * Short sentences. One specific detail each. No superlatives.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-northwind',
    quote:
      'They spent the first two weeks asking questions instead of writing code. By the end of it they understood our process better than we did. The plan they came back with was smaller and cheaper than what we had asked for.',
    author: {
      name: 'Elena Vasquez',
      role: 'Chief Technology Officer',
      company: 'Northwind Capital',
      avatar: {
        src: '/images/team/avatar-01.webp',
        alt: 'Photo of Elena Vasquez',
        width: 400,
        height: 400,
      },
    },
    caseStudySlug: 'northwind-capital-platform',
    highlight: { label: 'faster settlement', value: '94%' },
  },
  {
    id: 'testimonial-helix',
    quote:
      'Our last audit took four weeks and three people. This one took three days, because the paperwork now fills itself in. That one change paid for the whole project.',
    author: {
      name: 'Dr. Marcus Chen',
      role: 'VP of Clinical Systems',
      company: 'Helix Health',
      avatar: {
        src: '/images/team/avatar-02.webp',
        alt: 'Photo of Dr. Marcus Chen',
        width: 400,
        height: 400,
      },
    },
    caseStudySlug: 'helix-health-cloud',
    highlight: { label: 'less audit work', value: '87%' },
  },
  {
    id: 'testimonial-meridian',
    quote:
      'We were told a rebuild meant freezing the site from October to January. They did it in small pieces instead, and we shipped updates right through Black Friday for the first time in ten years.',
    author: {
      name: 'Priya Raghunathan',
      role: 'Director of Digital',
      company: 'Meridian Retail Group',
      avatar: {
        src: '/images/team/avatar-03.webp',
        alt: 'Photo of Priya Raghunathan',
        width: 400,
        height: 400,
      },
    },
    caseStudySlug: 'meridian-commerce-replatform',
    highlight: { label: 'faster checkout', value: '3.2×' },
  },
  {
    id: 'testimonial-atlas',
    quote:
      'The clever part was not the software. It was that they built the review screen and the audit trail first, so our operations team actually trusted it enough to use it.',
    author: {
      name: 'Tom Bergstrom',
      role: 'Head of Network Operations',
      company: 'Atlas Freight',
    },
    caseStudySlug: 'atlas-logistics-control',
    highlight: { label: 'less manual chasing', value: '41%' },
  },
  {
    id: 'testimonial-vector',
    quote:
      'Handover is usually where these things fall apart. We got written instructions, a recorded walkthrough and two weeks working alongside their team. We have run it ourselves since without calling them once.',
    author: {
      name: 'Sarah Okonkwo',
      role: 'Engineering Manager',
      company: 'Vector Labs',
    },
  },
];
