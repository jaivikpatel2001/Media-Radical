# Media Radical

Marketing site for an IT services and consulting company. Next.js 16 (App
Router), TypeScript, custom CSS, GSAP + Lenis + Motion.

**Phase 1 scope: the Home page and the 404 page.** The architecture is built for
all 17 page groups, so the remaining 16 are added as data and composition rather
than as a refactor. See `app/ROUTES.md`.

---

## Getting started

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open <http://localhost:3000>.

The site runs with no configuration — every variable in `.env.example` has a
working fallback or belongs to a feature that is not built yet.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build. Runs the type check too. |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check on its own |

---

## Documentation

**Documentation is part of the Definition of Done in this repo.** Any code
change requires the matching doc change in the same piece of work. The rules and
the file-by-file mapping are in `CLAUDE.md`.

| File | What it is for |
|---|---|
| `DONE.md` | Chronological log of completed work. **Read this first** — it records what exists and which approaches were tried and rejected. |
| `CLAUDE.md` | Working rules, project constraints, the documentation and SEO policy. |
| `PLAN.md` | The architecture plan Phase 1 was built from. Historical — the folder structure, component architecture, data layer and routing sections are still the reference for adding page groups 2–17. |
| `AGENTS.md` | This is Next.js 16 — read the bundled docs before writing code. |
| `app/ROUTES.md` | How to add one of the 16 unbuilt page groups. |
| `imagegeneration.md` | The 14 images the design expects: prompts, exact paths and sizes. |
| `.env.example` | Every environment variable, with placeholders. |

---

## Architecture

```
app/            Routes. Only "/" and not-found.tsx are built.
components/
  ui/           Atoms — no domain knowledge, no data imports
  layout/       Header, Footer, search, theme toggle
  icons/        Hand-drawn SVG icons + extracted brand logo paths
  providers/    Client boundaries: theme, smooth scroll, ScrollScene
sections/
  shared/       Prop-driven, reused across page groups
  home/         Home-only sections
styles/         tokens -> themes -> typography/utilities/motion
animations/     core (GSAP + Lenis bridge), presets, per-section scenes
data/           ALL copy. entities/ + pages/ + selectors + images.ts
types/          Content models
public/images/  Optimized WebP, filed by section
```

### The decisions that shape everything else

**No Tailwind.** It was removed from the scaffold deliberately. Styling is CSS
Modules plus custom properties.

**Every image is declared once, in `data/images.ts`.** Entities reference
`images.someKey` rather than writing a path inline, so renaming or resizing a
file is one edit. Each entry carries its real dimensions, which is what keeps
layout shift at zero, and an inlined base64 blur placeholder. Assets that are
referenced but not yet generated live in `plannedImages` in the same file and
render a placeholder instead of breaking. See `imagegeneration.md`.

**Three-layer design tokens.** Primitives (`styles/tokens.css`) → semantic
(`styles/themes.css`) → components. A component that references a raw `--ink-*`
or `--accent-*` token will not survive a theme flip.

**All copy lives in `/data`.** There are no literal user-facing strings in
`.tsx` files. Entities are normalised and referenced by slug, so one service
record feeds the nav dropdown, the footer, the Home grid and its own future
detail page. This is what makes the remaining page groups additive.

**Server Components by default.** Sections render plain markup carrying
`data-anim` attributes; a thin `ScrollScene` client wrapper runs the GSAP
scenes. Complex scroll animation, almost no component JavaScript shipped.

**Light is the default theme.** Dark is opt-in via `data-theme="dark"`, set
before first paint. There is deliberately no `prefers-color-scheme` auto-switch.

**Reduced motion leaves nothing hidden.** Initial hidden states are gated on a
`.js-motion` class that is withheld when motion is reduced or JS is unavailable,
so content never depends on a script running.

### Next.js 16 notes

- Turbopack is the default bundler. **Never add a webpack config** — it fails
  the build.
- `typedRoutes` is explicitly `false`. It validates every `<Link href>` against
  routes that exist, and the nav deliberately links ahead of the build. Turn it
  on once the other page groups land.
- `params` and `searchParams` are Promises. `middleware.ts` is now `proxy.ts`.

---

## Assets

All 11 Home page images are in the repo, optimized and integrated: WebP, sized
to the slots they actually occupy, filed under `public/images/<section>/`. They
total 604 KB, down from 19 MB of source PNG.

Every image slot resolves file existence on the server at build time and renders
a gradient placeholder when a file is missing, so a not-yet-generated asset is
never a broken image, a 404 or a client-side check. One slot uses this today:
the Rasoi Fresh case study cover, which belongs to `/portfolio`.

Paths are declared once in `data/images.ts`. See `imagegeneration.md` for the
prompts, the conversion recipe and how to add a new image.

---

## Deployment (Render)

The repo root is this folder, so `render.yaml` sits beside `package.json` and
**no Root Directory setting is needed**.

**Deploy:** Render dashboard → **New + → Blueprint** → pick this repo → Apply.
Then set `NEXT_PUBLIC_SITE_URL` in the dashboard when prompted.

| | |
|---|---|
| Service type | **Static Site** |
| Build | `npm ci && npm run build` |
| Publish directory | `out` |
| Node | 22, pinned three ways: `.nvmrc`, `engines`, and `NODE_VERSION` |

### What static export costs

`next.config.ts` sets `output: 'export'`, so the build emits `out/` and no
server runs. Three capabilities are given up, and they are not obvious from the
dashboard:

1. **No Server Actions.** The footer newsletter used to post to one and worked
   with JavaScript disabled. It now validates and submits in the browser, and
   needs `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` to reach anywhere.
2. **No `next/image` optimisation.** `images.unoptimized` is on, so every
   device receives the original file. A phone gets the full 1536px WebP rather
   than a resized AVIF. This is survivable only because `public/images` was
   sized to real display slots; check those sizes before adding an image.
3. **No `headers()` or `redirects()` in `next.config.ts`.** They are silently
   ignored under export, so the rules live in `render.yaml` instead.

Route handlers also need `export const dynamic = 'force-static'`, which
`robots.ts`, `sitemap.ts` and `opengraph-image.tsx` all carry. Without it the
build fails outright.

Adding anything dynamic later means moving back to a Web Service. The full
unsupported list is in
`node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.

### Environment

Two variables, both declared in `render.yaml` with `sync: false` so Render
prompts rather than storing them in git.

`NEXT_PUBLIC_SITE_URL` has a production fallback, which is exactly why it must
be set: an unset deployment does not fail, it quietly publishes canonical URLs
and sitemap entries pointing at production.

`NEXT_PUBLIC_NEWSLETTER_ENDPOINT` is where the footer form posts. Unset is a
supported state. Because there is no server, this request happens in the
browser and the value is public, so a provider API key cannot be used here.

Both are `NEXT_PUBLIC_*`, so they are inlined at **build** time. Changing
either needs a redeploy, not a restart.

### Response headers

Set in `render.yaml`, because `next.config.ts` cannot set them under a static
export. Verified by serving `out/` locally exactly as Render does:

| Path | `Cache-Control` |
|---|---|
| `/_next/static/*` | `public, max-age=31536000, immutable` (content-hashed) |
| `/images/*` | `public, max-age=2592000` (stable names, so bounded) |
| HTML | short-lived, so deploys appear immediately |

`X-Content-Type-Options: nosniff` and `Referrer-Policy` are sent on everything.
Compression is handled at Render's edge.

There is deliberately **no catch-all rewrite**. That pattern is for single-page
apps served from one `index.html`. This export pre-renders a real `.html` per
route, so a catch-all would mask genuine 404s and serve the home page instead.
Render serves `out/404.html` on its own.

---

## Status

- **Built:** Home page (14 sections), `not-found.tsx`, sitemap, robots, JSON-LD,
  site search. Both routes prerender static.
- **Not built:** the other 16 page groups. Empty route folders exist.
- **Verified:** type check, lint and build all clean. No horizontal scroll at
  375px or 1440px. Reduced-motion path leaves no element hidden.
