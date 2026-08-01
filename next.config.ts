import type { NextConfig } from 'next';

/**
 * Next.js 16 notes:
 *  - Turbopack is the default bundler for `dev` AND `build`. There is no
 *    webpack config here, and there must never be one: a stray webpack option
 *    fails the production build outright.
 *  - `images.qualities` now defaults to [75]; any quality prop not in this
 *    array is coerced to the nearest listed value.
 *  - `images.minimumCacheTTL` now defaults to 4 hours, which suits this site.
 */
const nextConfig: NextConfig = {
  images: {
    // AVIF first: roughly 20–30% smaller than WebP for the photographic
    // covers, with WebP as the fallback for older Safari.
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80, 90],
  },

  // Trailing slashes off keeps canonical URLs unambiguous for SEO.
  trailingSlash: false,

  poweredByHeader: false,

  // OFF for Phase 1, and it must be explicit. Typed routes validate every
  // <Link href> against the routes that actually exist — and the header and
  // footer deliberately link to the 16 page groups not yet built, so leaving
  // it on fails the type check on every nav link. Turn it on once they land;
  // at that point it becomes a useful guard rather than a blocker.
  typedRoutes: false,
};

export default nextConfig;
