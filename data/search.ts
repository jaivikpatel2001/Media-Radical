import { ROUTES } from '@/constants/routes';

import { caseStudies } from './entities/caseStudies';
import { faqs } from './entities/faqs';
import { industries } from './entities/industries';
import { posts } from './entities/posts';
import { services } from './entities/services';

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  href: string;
  group: string;
  /** Extra terms matched but not displayed. */
  keywords: string;
}

/**
 * The search index.
 *
 * Every page's content is local TypeScript, so search needs no backend, no
 * API route and no third-party service — the index is built at module scope
 * and shipped as part of the bundle that already contains the data.
 *
 * Built once per process rather than per keystroke.
 */
export const searchIndex: SearchEntry[] = [
  ...services.map((service) => ({
    id: `service-${service.slug}`,
    title: service.name,
    description: service.tagline,
    href: ROUTES.service(service.slug),
    group: 'Services',
    keywords: [service.summary, ...service.capabilities].join(' '),
  })),

  ...industries.map((industry) => ({
    id: `industry-${industry.slug}`,
    title: industry.name,
    description: industry.summary,
    href: ROUTES.industry(industry.slug),
    group: 'Industries',
    keywords: [...industry.challenges, ...industry.solutions].join(' '),
  })),

  ...caseStudies.map((study) => ({
    id: `case-${study.slug}`,
    title: study.title,
    description: `${study.client}: ${study.summary}`,
    href: ROUTES.caseStudy(study.slug),
    group: 'Case studies',
    keywords: [study.client, study.challenge, study.solution].join(' '),
  })),

  ...posts.map((post) => ({
    id: `post-${post.slug}`,
    title: post.title,
    description: post.excerpt,
    href: ROUTES.article(post.slug),
    group: 'Insights',
    keywords: [post.category, ...post.tags].join(' '),
  })),

  ...faqs.map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    description: faq.answer.slice(0, 120),
    href: ROUTES.faq,
    group: 'Questions',
    keywords: faq.answer,
  })),
];

/**
 * Ranked substring search.
 *
 * Not fuzzy matching: for an index of this size (roughly 30 entries of known,
 * curated copy) a fuzzy library would add a dependency to solve a problem
 * that does not exist. A title match outranks a description match, which
 * outranks a hidden-keyword match.
 */
export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const term = query.trim().toLowerCase();
  if (term.length < 2) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of searchIndex) {
    const title = entry.title.toLowerCase();
    let score = 0;

    if (title.startsWith(term)) score = 100;
    else if (title.includes(term)) score = 70;
    else if (entry.description.toLowerCase().includes(term)) score = 40;
    else if (entry.keywords.toLowerCase().includes(term)) score = 20;

    if (score > 0) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((item) => item.entry);
}
