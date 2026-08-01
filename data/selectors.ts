import type {
  CaseStudy,
  ClientLogo,
  FaqItem,
  Industry,
  Post,
  ProcessStep,
  Service,
  Stat,
  Technology,
  TechnologyGroup,
  Testimonial,
  ValueProp,
} from '@/types/content';

import { caseStudies } from './entities/caseStudies';
import { clientLogos } from './entities/clientLogos';
import { faqs } from './entities/faqs';
import { industries } from './entities/industries';
import { posts } from './entities/posts';
import { processSteps } from './entities/processSteps';
import { services } from './entities/services';
import { stats } from './entities/stats';
import { technologies, technologyGroups } from './entities/technologies';
import { testimonials } from './entities/testimonials';
import { valueProps } from './entities/valueProps';

/* ==========================================================================
   Selectors — the resolution layer between normalized entities and the
   sections that render them.

   Page content references entities by slug or id; a section receives resolved
   records. This is the seam that lets the identical CaseStudiesSection serve
   the Home page, /portfolio, /industries/[slug] and /services/[slug] without
   knowing which one it is inside.

   `byIds` preserves the order of the requested ids rather than the order of
   the source array — the page decides sequence, not the entity file.
   ========================================================================== */

function byIds<T>(source: T[], ids: readonly string[], key: keyof T): T[] {
  const index = new Map(source.map((item) => [String(item[key]), item]));
  return ids
    .map((id) => index.get(id))
    .filter((item): item is T => item !== undefined);
}

/* ---------------------------------------------------------------- services */

export const getServices = (slugs: readonly string[]): Service[] =>
  byIds(services, slugs, 'slug');

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getFeaturedServices = (): Service[] =>
  services.filter((service) => service.featured).sort((a, b) => a.order - b.order);

export const getAllServices = (): Service[] =>
  [...services].sort((a, b) => a.order - b.order);

/* -------------------------------------------------------------- industries */

export const getIndustries = (slugs: readonly string[]): Industry[] =>
  byIds(industries, slugs, 'slug');

export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((industry) => industry.slug === slug);

export const getAllIndustries = (): Industry[] =>
  [...industries].sort((a, b) => a.order - b.order);

/* ------------------------------------------------------------ case studies */

export const getCaseStudies = (slugs: readonly string[]): CaseStudy[] =>
  byIds(caseStudies, slugs, 'slug');

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug);

export const getFeaturedCaseStudies = (limit?: number): CaseStudy[] => {
  const featured = caseStudies.filter((study) => study.featured);
  return limit ? featured.slice(0, limit) : featured;
};

/** Used by /services/[slug] and /industries/[slug] from Phase 2 onward. */
export const getCaseStudiesByService = (serviceSlug: string): CaseStudy[] =>
  caseStudies.filter((study) => study.serviceSlugs.includes(serviceSlug));

export const getCaseStudiesByIndustry = (industrySlug: string): CaseStudy[] =>
  caseStudies.filter((study) => study.industrySlug === industrySlug);

/* ------------------------------------------------------------ testimonials */

export const getTestimonials = (ids: readonly string[]): Testimonial[] =>
  byIds(testimonials, ids, 'id');

export const getTestimonialById = (id: string): Testimonial | undefined =>
  testimonials.find((testimonial) => testimonial.id === id);

/* ------------------------------------------------------------ technologies */

export const getTechnologies = (ids: readonly string[]): Technology[] =>
  byIds(technologies, ids, 'id');

export const getTechnologyGroups = (
  categories: readonly string[],
): TechnologyGroup[] => byIds(technologyGroups, categories, 'category');

/* ----------------------------------------------------------------- process */

export const getProcessSteps = (ids: readonly string[]): ProcessStep[] =>
  byIds(processSteps, ids, 'id');

/* ------------------------------------------------------------------- misc  */

export const getStats = (ids: readonly string[]): Stat[] =>
  byIds(stats, ids, 'id');

export const getValueProps = (ids: readonly string[]): ValueProp[] =>
  byIds(valueProps, ids, 'id');

export const getFaqs = (ids: readonly string[]): FaqItem[] =>
  byIds(faqs, ids, 'id');

export const getClientLogos = (ids: readonly string[]): ClientLogo[] =>
  byIds(clientLogos, ids, 'id');

export const getPosts = (slugs: readonly string[]): Post[] =>
  byIds(posts, slugs, 'slug');

export const getFeaturedPosts = (limit = 3): Post[] =>
  [...posts]
    .filter((post) => post.featured)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
