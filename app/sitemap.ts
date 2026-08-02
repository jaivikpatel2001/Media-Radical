import type { MetadataRoute } from 'next';

import { IMPLEMENTED_ROUTES } from '@/constants/routes';
import { site } from '@/data/site';

/**
 * Sitemap.
 *
 * Lists only routes that actually resolve. Listing the 16 unbuilt page groups
 * would submit URLs that return a 404 — actively harmful, not merely useless.
 *
 * When those pages land, add their static paths to IMPLEMENTED_ROUTES and map
 * the dynamic ones off the same entity arrays the pages generate from, e.g.
 *
 *   ...services.map((s) => ({ url: `${site.url}${ROUTES.service(s.slug)}`, ... }))
 *
 * so a new service appears here without anyone remembering to add it.
 */
/**
 * Required by `output: 'export'`. Without it the build fails outright: a route
 * handler is dynamic by default, and there is no server to run it on.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return IMPLEMENTED_ROUTES.map((route) => ({
    url: `${site.url}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
