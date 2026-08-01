import type { Post } from '@/types/content';

/**
 * Blog posts.
 *
 * WRITING STYLE — a title someone would actually click, and an excerpt that
 * says what they will learn. No teasing.
 *
 * Phase 1 renders the three featured posts as cards; the article bodies
 * arrive with page group 10 (/resources).
 */
export const posts: Post[] = [
  {
    slug: 'evaluation-harness-before-the-feature',
    title: 'Test your AI before you ship it',
    excerpt:
      'A good demo proves nothing. Here is how we check an AI feature is actually accurate, and why we do it before writing the feature.',
    category: 'AI & Automation',
    tags: ['AI', 'Testing', 'How we work'],
    cover: {
      src: '/images/insights/ai-automation.webp',
      alt: 'Abstract illustration of connected nodes',
      width: 1600,
      height: 900,
    },
    author: 'Elena Marchetti',
    publishedAt: '2026-06-18',
    readingMinutes: 8,
    featured: true,
    seo: {
      title: 'Test your AI before you ship it',
      description:
        'How to check an AI feature is accurate before it reaches customers, and why the tests should come first.',
    },
  },
  {
    slug: 'cloud-spend-nobody-owns',
    title: 'The third of your cloud bill nobody is watching',
    excerpt:
      'Unused servers, oversized machines and forgotten backups. What we usually find in two weeks of looking, and how to stop it coming back.',
    category: 'Cloud & DevOps',
    tags: ['Cloud', 'Costs', 'AWS'],
    cover: {
      src: '/images/insights/cloud-cost.webp',
      alt: 'Abstract illustration of stacked blocks',
      width: 1600,
      height: 900,
    },
    author: 'Daniel Osei',
    publishedAt: '2026-05-27',
    readingMinutes: 6,
    featured: true,
    seo: {
      title: 'The third of your cloud bill nobody is watching',
      description:
        'Where wasted cloud spend hides, how to find it, and the simple habits that stop it returning.',
    },
  },
  {
    slug: 'design-systems-that-survive-handover',
    title: 'Why most design systems fall apart',
    excerpt:
      'Most stop being used within six months of the agency leaving. The ones that survive share three things, and none of them are about the design.',
    category: 'UI/UX Design',
    tags: ['Design', 'Handover'],
    cover: {
      src: '/images/insights/design-systems.webp',
      alt: 'Abstract illustration of layered panels',
      width: 1600,
      height: 900,
    },
    author: 'Priya Nair',
    publishedAt: '2026-04-09',
    readingMinutes: 7,
    featured: true,
    seo: {
      title: 'Why most design systems fall apart',
      description:
        'The three things shared by design systems still in use two years after the agency left.',
    },
  },
];
