# DONE — completed work log

Chronological record of everything already built, newest section last.

**Purpose:** this file is the project's memory. Read it before starting work so
you know what exists without scanning the whole codebase. It answers "has this
already been done, and why is it the way it is?"

**Rules for this file**
- Append only. Never rewrite or delete history — if something was later
  reverted or replaced, add a new entry saying so.
- Newest entries go at the **bottom** of the current date's section.
- Every entry needs: **time**, **what changed**, and **why** when the reason is
  not obvious from the change itself.
- Log reverts and abandoned approaches too. Knowing what was tried and rejected
  is often more valuable than knowing what shipped.

Times are IST (UTC+05:30).

---

## 2026-08-01

### Phase 1 — Home page build

| Time | What was completed |
|---|---|
| 09:12 | Inspected the existing `create-next-app` scaffold. Next.js 16.2.12, React 19.2.4, TypeScript, Tailwind v4 pre-installed. Read the bundled Next.js 16 docs in `node_modules/next/dist/docs/` as `AGENTS.md` requires. |
| 09:20 | Wrote the architecture plan covering all 17 page groups, with Phase 1 scoped to the Home page plus `not-found.tsx`. Approved. |
| 09:25 | **Removed Tailwind** (`tailwindcss`, `@tailwindcss/postcss`), deleted `postcss.config.mjs`, deleted the five scaffold SVGs in `public/`. Project is custom CSS only. |
| 09:26 | Installed the animation stack: `gsap`, `@gsap/react`, `lenis`, `motion`, `lucide-react`. |
| 09:29–09:33 | Built the CSS foundation: `reset.css`, `tokens.css` (primitives), `themes.css` (semantic, light + dark), `typography.css` (fluid scale), `utilities.css`, `motion.css`. Three-layer token architecture — components consume semantic tokens only. |
| 09:33 | Added `constants/` (routes, breakpoints, motion) and `utils/` (`cx`, `format`, `math`). Every URL in the site originates from `constants/routes.ts`. |
| 09:34 | Added the TypeScript content models in `types/` — `common`, `content`, `navigation`, `pages`, `icons`. |
| 09:35–09:37 | Animation core and presets: GSAP plugin registration, the **Lenis ↔ GSAP ticker bridge**, reduced-motion helpers, and the reveal / splitLines / parallax / counter / marquee presets. |
| 09:38 | Providers: `AppProviders`, `SmoothScrollProvider`, `ThemeProvider`, and `ScrollScene` (the client boundary that keeps sections as Server Components). |
| 09:39–09:43 | Authored the data layer — `site.ts`, entity files (services, industries, technologies, case studies, testimonials, stats, FAQs, posts, value props, client logos, process steps), `navigation.ts` and `selectors.ts`. |
| 09:45–09:48 | UI primitives: `Container`, `Section`, `Button`, `SectionHeading`, `Emphasis`, `Logo`, plus 24 hand-drawn SVG icons and the social icon set. |
| 09:48–09:52 | Site shell: `Header` (mega-menu, mobile drawer, theme toggle), `Footer`, `SkipLink`, newsletter Server Action, and a styled `not-found.tsx`. |
| 09:57 | Added `Media` + `utils/assets.ts` — image slots resolve file existence **on the server at build time**, so a missing image renders a gradient placeholder with no client JS and no 404. |
| 09:58–10:12 | Built all 14 Home sections. Nine live in `sections/shared/` and are prop-driven so future page groups reuse them: ServicesGrid, IndustriesSection, TechnologiesSection, ProcessSection, CaseStudiesSection, TestimonialsSection, StatsSection, FaqSection, CtaSection. |
| 10:14–10:15 | Fixed two `react-hooks/set-state-in-effect` lint errors properly rather than suppressing them: `SmoothScrollProvider` now exposes Lenis as a stable ref, `ThemeProvider` uses `useSyncExternalStore` against the `data-theme` attribute. |
| 10:16 | SEO: `sitemap.ts`, `robots.ts`, and `JsonLd` + `utils/schema.ts` (Organization, WebSite, FAQPage) built from the same records the page renders. |
| 10:17 | Created empty route folders for the 16 unbuilt page groups and documented how to add one in `app/ROUTES.md`. |
| 10:19–10:21 | Built site search — a local index over the entity arrays, no backend. Combobox pattern, opens with Cmd/Ctrl-K. |
| 10:22–10:26 | **Rewrote all copy in plain English** after feedback that it read too dense. Short sentences, everyday words, no insider jargon. Every `/data` file now carries a WRITING STYLE comment so future edits stay in register. |

### Key decisions and fixes

| Time | What was completed |
|---|---|
| 09:33 | Discovered `typedRoutes` defaults to **on** in Next.js 16.2 and rejected every nav link to the 16 unbuilt routes. Set `typedRoutes: false` explicitly in `next.config.ts`, with a note in `app/ROUTES.md` to re-enable once those pages land. |
| 09:40 | **Light became the default theme** (was: follow OS). Removed the `prefers-color-scheme` auto-switch entirely — dark is opt-in only, via `data-theme="dark"` set pre-paint. |
| 09:57 | Wrote `imagegeneration.md` — 14 AI image prompts, all composed light/high-key to sit on a white page, each with exact save path, pixel size and a shared negative prompt. |
| 10:30 | Verified the no-JS / reduced-motion guarantee: with `.js-motion` absent, **zero** elements are hidden. Content never depends on a script running. |
| 17:43–17:44 | **Font change to Poppins** (display) + Inter (body) + IBM Plex Mono (labels). Fixed two bugs it surfaced: `Button` rendered as `<a>` skipped the display face, and the 700-weight process numerals were faux-bolding on a font loaded at 400–600. |
| 18:03 | Replaced the hero image with a **canvas Icon Cloud** (Fibonacci sphere, drag + inertia). Ported from Magic UI rather than installed — theirs is shadcn/Tailwind and pulls `react-dom/server` into the client bundle to rasterise icons. Logo paths extracted from `simple-icons` into `components/icons/techLogos.ts`; the 23 MB dependency was then removed. |
| 18:05–18:06 | **Redesigned the Process section.** The pinned horizontal scroll jittered against Lenis — pinning swaps to `position: fixed` and re-measures while Lenis interpolates on its own clock. Replaced with sticky stacked cards (no pin, compositor-driven, jitter structurally impossible). Also found `overflow: hidden` on the section was silently disabling `position: sticky` for its descendants. |
| 18:20 | **Redesigned the Testimonials section.** Fixed a real bug first: moving the card to `<figure>` for a valid `figcaption` left the flex sizing on the figure while the `<li>` became the flex item with no width, collapsing every card. Replaced the horizontal scroll rail with a featured quote + masonry wall — everything visible, no sideways gesture. |
| 18:35 | Expanded the technology section to **8 categories / 84 technologies** with real brand logos. Monochrome at rest, brand colour on hover. Brands simple-icons removed over trademark policy (AWS, Azure, Canva, Adobe, OpenAI) render as lettermark tiles rather than being dropped. Fixed `monogramOf("AWS")` returning `"AW"`, and removed `AnimatePresence mode="wait"` which gated panel *content* on an exit animation completing. |
| 18:45 | Applied a Stripe-derived design system (violet `#533AFD`, ink `#0A2540`, 4px buttons, flat shadows, weight-300 headlines). Audited every rendered text node for contrast: 75 failing nodes → 0. |
| 18:52 | **Reverted the Stripe design system** at the user's request — the source document's structure was not satisfactory. Tokens, themes, typography, `Button`, `HeaderNav`, `accents.ts` and `layout.tsx` returned to the indigo `#5B53F5` / Apple-Linear register. Verified the revert left no dangling references. |

### Documentation system

| Time | What was completed |
|---|---|
| 18:55 | Created **`DONE.md`** (this file) — the chronological work log, reconstructed from file modification times rather than from memory so the timeline is accurate. |
| 18:56 | Rewrote **`CLAUDE.md`**. Added the mandatory rule that documentation updates are part of the Definition of Done, with a table mapping each kind of code change to the documents it requires. Recorded the settled project constraints so they are not accidentally reversed. Kept the `@AGENTS.md` import. |
| 18:57 | Created **`.env.example`**. Found the project reads **zero** `process.env` variables, so rather than list variables nothing consumes, wired one real one: `NEXT_PUBLIC_SITE_URL` in `data/site.ts`. A hardcoded origin makes preview deployments publish canonical URLs and sitemap entries pointing at production. Every remaining variable is marked PLANNED and commented out, so the file cannot drift into describing features that do not exist. |
| 18:58 | Rewrote **`README.md`** — it was still `create-next-app` boilerplate crediting Geist, a font this project does not use. Replaced with setup, scripts, the documentation map, architecture, the Next.js 16 constraints and current status. |
| 18:59 | **Fixed a real bug found while verifying:** `.gitignore` had a blanket `.env*` rule, which silently ignored `.env.example` itself — the one env file that must be committed. Added a `!.env.example` negation and confirmed with `git ls-files --others --exclude-standard` that it is now committable. Without this, the template would never have reached the repository. |

### Brand colours for technology logos

| Time | What was completed |
|---|---|
| 19:10 | **Hero icon cloud now draws every logo in its official brand colour** instead of monochrome grey + violet. Colours come from the `hex` already stored on each `TECH_LOGOS` entry. Depth is now carried by scale and alpha alone, so the far side of the sphere recedes without desaturating. |
| 19:12 | Added a contrast guard to the cloud (`ensureVisible` in `IconCloud.tsx`). A few brands are pure black — Next.js and Vercel measure **1.07:1** on the dark canvas, Kafka 1.21:1 — and would simply vanish. The guard blends a colour toward the background's opposite in tenths and stops the moment it clears 2.0:1, so a visible colour is returned untouched and an invisible one is changed as little as possible. Measured result: **21 of 22 hero logos render at their exact brand hex** on the light default. The one exception is React `#61DAFB`, which is 1.62:1 on white and is nudged to `#57c4e2`. Threshold is deliberately low (2.0, not a text-grade 4.5) because these are large decorative glyphs and a text-grade ratio would wash every hue out. |
| 19:13 | Replaced the `--cloud-icon` / `--cloud-icon-front` tokens with a single `--cloud-bg` (a concrete rgb triple — canvas cannot resolve `var()` at fill time). A `MutationObserver` on `data-theme` re-derives the adjusted colours on a theme flip without rebuilding the sphere. |
| 19:25 | **Removed the lettermark placeholders from the technology tiles.** Canva, Adobe XD, Photoshop, Illustrator, AWS, Azure and OpenAI were rendering as "CA", "AX", "PH" etc. because simple-icons has removed those marks over trademark policy. Sourced real logos from the CC0 `logos` set (Gil Barbara) and `devicon`, added them as `TECH_COLOR_LOGOS` in `components/icons/techLogos.ts`, and extended `TechTile` with a third render path for full-colour multi-path SVG. Both icon packages were uninstalled after extraction — nothing new is in `package.json`. |
| 19:26 | Gradient and clip `id`s inside those bodies are namespaced per logo at extraction time (`azure-SVG4V795Kgq`), so two full-colour logos can never collide in one document. Verified in the DOM. |
| 19:28 | Verified across all 8 tabs: **84 technologies, 0 lettermarks remaining** — 7 full-colour, 77 monochrome. The lettermark branch is kept only so an unrecognised id degrades visibly instead of rendering an empty tile. |

### Colourful tiles, hover lift, and the performance/SEO gate

| Time | What was completed |
|---|---|
| 19:40 | **All technology tiles now render in their official brand colours** and at **2× size** (30px → 60px). Grid columns widened to 164px to suit. Extracted the colour maths from `IconCloud.tsx` into `utils/color.ts` so the canvas and the CSS tiles share one implementation instead of drifting. |
| 19:42 | **Lowered the contrast threshold from 2.0 to 1.25.** At 2.0 the guard was repainting JavaScript `#F7DF1E` (1.35:1 on white) to a muddy `#c6b218` and React `#61DAFB` to `#57c4e2`. At 1.25 **every logo renders at its exact brand hex on the light canvas**, while pure-black marks on the dark canvas (1.07:1) are still corrected. Verified in the DOM: JS, React, HTML5 and TypeScript all match their official values exactly. |
| 19:44 | Each tile emits four custom properties — `--brand-light`, `--brand-dark` and an rgb pair for the glow. A `[data-theme]` rule picks the right one, so the per-theme correction costs **zero runtime JavaScript**. |
| 19:46 | **CSS3 switched to the blue `#1572B6` shield.** simple-icons v16 ships only the newer purple CSS mark, so the blue one comes from devicon as a full-colour logo. **Added Git** (`#F03C2E`), which was missing from the stack entirely. |
| 19:48 | **Hover lift on the logos:** `scale(1.1)` plus a two-layer `drop-shadow` tinted to the brand colour, 240ms. `drop-shadow` follows the glyph's alpha rather than its bounding box, so the glow traces the actual mark. Both properties are composited and neither participates in layout, so there is **no layout shift**. Movement is dropped under reduced motion; the glow stays as the hover cue. |
| 19:50 | **Fixed the hero copy fading out while still on screen.** The scroll scrub ran `opacity: 0` over the hero, leaving the headline and CTAs hard to read. Now drifts to `0.72` over a longer distance — the fade hints at depth without costing legibility. |

### Mandatory performance and SEO gate

| Time | What was completed |
|---|---|
| 19:55 | Added the **performance and SEO review** to `CLAUDE.md` as part of the Definition of Done, with a Next.js optimisation checklist and an SEO/GEO/AEO checklist. **Important:** the rule points at the bundled docs in `node_modules/next/dist/docs/`, not published Next.js 14 guides — 14-era guidance describes APIs this version has renamed or removed and will produce wrong code. |
| 20:00 | **Ran the review on this change and found two real problems.** First: `TechnologyTabs` was a Client Component importing the logo registry, so a **140 KB chunk of SVG path data shipped to every visitor** for a below-the-fold section. Second: only the active tab existed in the DOM, so **76 of 84 technologies were absent from the rendered HTML** — exactly the factual content an answer engine would want. |
| 20:05 | **Fixed both with one refactor.** Panels are now rendered on the server and passed to the client component as children; the client half manages visibility only and imports no logo data. Inactive panels use the `hidden` attribute, which is the correct tabpanel pattern and keeps them out of the accessibility tree. Verified: **no logo path data in any client chunk**, and 8 tabpanels / all 85 tiles in the server HTML. |
| 20:08 | Measured the trade honestly: HTML gzip went 73 KB → 177 KB (80 KB brotli, which is what a CDN serves) while ~100 KB left the JS bundle. Near-neutral on bytes, but JS costs parse and execute on the main thread where static HTML is CDN-cached and parse-only — plus the content became crawlable. |
| 20:12 | **SEO audit found two defects, both fixed.** No `<link rel="canonical">` anywhere — added via `alternates.canonical` in the root metadata, resolved against `metadataBase`. And no `og:image` or `twitter:image`, so every share rendered as a bare text link — added `app/opengraph-image.tsx` using `next/og`, statically generated at build time and derived from `data/site.ts`. Verified: canonical present, both image tags present with alt text, endpoint returns a real PNG. |

**Audit result for the rest:** title 47 chars, description 161, exactly one
`h1`, clean h2/h3 order, and structured data covering ProfessionalService,
WebSite, FAQPage plus 8 Services and Offers — all already in good shape.

**Constraint worth remembering:** the hero icon cloud draws with canvas `Path2D`
and can therefore only use **single-path** marks. That is why the full-colour
logos are a separate registry (`TECH_COLOR_LOGOS`) rather than extra fields on
`TechLogo` — the cloud consumes `TECH_LOGOS` only and is unaffected by them.

### Notes carried forward from that work

- The Stripe pass found a genuine accessibility issue worth remembering: a
  muted grey of `#6B7C93` measures **4.26:1** on white, just under the 4.5:1
  WCAG AA floor for normal text. Any future palette must be measured, not
  assumed.
- The ribbon/accent spectrum colours (teal, amber, cyan) fail badly as text —
  teal measured **1.45:1**. They are safe as background washes and artwork
  only.

---

## Current state

- **Built:** Home page (14 sections) and `not-found.tsx`. Both prerender static.
- **Not built:** the other 16 page groups. Route folders exist and are empty;
  see `app/ROUTES.md`.
- **Verification:** `npx tsc --noEmit`, `npm run lint` and `npm run build` all
  pass clean. No horizontal scroll at 375px or 1440px.
- **Configuration:** only `NEXT_PUBLIC_SITE_URL` is read by code. Everything
  else in `.env.example` is marked PLANNED. The site runs with no `.env` file.
- **Outstanding:** the 14 images in `imagegeneration.md` have not been supplied,
  so those slots render gradient placeholders. Dropping a file at the documented
  path is a no-code change.
- **Outstanding:** the newsletter Server Action (`app/actions.ts`) validates the
  address and returns — it does not send anywhere yet. There is a TODO on the
  line where the provider call belongs.
