import type { MetadataRoute } from 'next';

import { site } from '@/data/site';

/**
 * Required by `output: 'export'`. Without it the build fails outright: a route
 * handler is dynamic by default, and there is no server to run it on.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
