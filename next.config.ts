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
  /**
   * Static export: `next build` emits a folder of plain files in `out/` and
   * there is no Node server at runtime. Deployed as a Render Static Site.
   *
   * WHAT THIS COSTS, so nobody rediscovers it the hard way:
   *
   *  - Server Actions are unsupported. The footer newsletter used to post to
   *    one and worked without JavaScript; it now validates and submits in the
   *    browser instead.
   *  - `headers()` is unsupported. Cache-Control and the security headers
   *    moved to the `headers:` block in render.yaml.
   *  - Image Optimization with the default loader is unsupported, hence
   *    `unoptimized` below.
   *
   * The full list is in node_modules/next/dist/docs/01-app/02-guides/
   * static-exports.md under "Unsupported Features". Check it before adding
   * anything dynamic, because these fail at build, not at review.
   */
  output: 'export',

  images: {
    /**
     * Required by `output: 'export'`: the optimizer is a server route, and
     * there is no server.
     *
     * The consequence is that every device now receives the original file,
     * so a phone gets the full 1536px WebP rather than a ~25 KB AVIF. That is
     * why the files in public/images were sized to their real display slots
     * rather than left at source resolution; it is the only thing keeping
     * this reasonable. Re-check those sizes before adding a new image.
     */
    unoptimized: true,
  },

  // Trailing slashes off keeps canonical URLs unambiguous for SEO.
  trailingSlash: false,

  poweredByHeader: false,

  // No headers() here. It is unsupported under `output: 'export'` and would
  // be silently ignored, which is worse than absent. The rules live in the
  // `headers:` block of render.yaml instead.

  // OFF for Phase 1, and it must be explicit. Typed routes validate every
  // <Link href> against the routes that actually exist — and the header and
  // footer deliberately link to the 16 page groups not yet built, so leaving
  // it on fails the type check on every nav link. Turn it on once they land;
  // at that point it becomes a useful guard rather than a blocker.
  typedRoutes: false,
};

export default nextConfig;
