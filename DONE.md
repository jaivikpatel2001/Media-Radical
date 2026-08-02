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

### Media Radical 2.0 — real brand identity adopted

| Time | What was completed |
|---|---|
| 20:30 | Added **`PLAN.md`** to the repo — the architecture plan Phase 1 was built from. Annotated at the top as a historical document: sections 2, 4, 5 and 7 (folder structure, component architecture, data layer, routing) are still accurate and are what you want when adding page groups 2–17. The palette, fonts and several section designs have moved on since; `DONE.md` is the source of truth for what exists. |
| 20:35 | **Analysed mediaradical.in.** WebFetch strips CSS, so the palette was read from the live site's computed styles in the browser. Findings: primary **`#008DD2`** blue (logo, section headings, tick marks — 64 uses), secondary **`#EA6981`** rose (bullets and chevrons — 28 uses), pale wash `#FDEFF2`, and `#0178B4` as the existing hover state. |
| 20:36 | **Positioning correction.** The real company is a *digital media agency* in Ahmedabad — SEO, PPC, social media, hosting, email, ecommerce — not an IT consultancy. Our copy had it wrong. Updated `site.ts` with the genuine details: Ahmedabad address, +91 972 344 6969, contact@mediaradical.in, trading since 2013, and `mediaradical.in` as the origin. |
| 20:40 | **Adopted the brand palette across the design system.** `--accent-*` rebuilt around `#008DD2`, `--rose-*` around `#EA6981`, meshes and the brand gradient now run blue → rose. Zero indigo references remain. |
| 20:42 | **Split the accent into three roles**, because one blue cannot do all three accessibly: white text on `#008DD2` measures **3.66:1** and fails AA. So `--color-accent` is the brand blue for icons and decoration (passes the 3:1 non-text bar), `--color-accent-strong` (`#0178B4`, 4.83:1) takes any fill carrying white text — buttons, active tab pill, newsletter submit — and `--color-accent-text` (`#016A9E`, 5.9:1) carries links and small text. |
| 20:46 | **Added the six missing services** the original site leads with: SEO, PPC & Google Ads, Social Media Marketing, Domain & Hosting, Email Solutions, Ecommerce & CRM. Copy rewritten and expanded, not lifted — the source gives one sentence each. Six new hand-drawn icons. **14 services total**, and the header dropdown now splits "Build & run" / "Grow & market" from the `order` field rather than a hardcoded index. |
| 20:50 | Rewrote the Home hero, intro, services and stats framing to the real positioning — build *and* marketing under one roof, which is the genuine differentiator. |
| 20:55 | **Removed the blue bloom behind the hero icon cloud.** Once the logos took their own brand colours the blurred radial read as a smudge competing with them rather than as light. |

### Hero layout, real client list, testimonials

| Time | What was completed |
|---|---|
| 21:05 | **Hero split 50/50** on screens ≥900px (was 0.92fr / 1.08fr) and the headline reduced from a 92px ceiling to **68px** (`--display-lg`, 40px → 68px). `display-lg` is used only by the hero headline, so the token itself was reduced rather than adding a component override — the type scale stays the single source. |
| 21:08 | Investigated the hero art reading 613px inside a 547px track. **Not a bug:** `offsetWidth` is 547 (an exact 50/50 layout); `getBoundingClientRect` includes the entry animation's `scale(1.12)`, which is frozen mid-tween because rAF is paused in the hidden preview pane. A defensive `min/max-inline-size` guard was kept, and the comment corrected to say what it actually does. |
| 21:15 | **Replaced the invented client list with the twelve real clients** listed on mediaradical.in: Philbrick India, Simplex, TTE, Jasco, AK Valve, Mazda, HP Auto, HV, AB & Dhruv, Awatech, Rotary, Friends. Sector descriptors were deliberately dropped — the source gives none, and inventing one would put an unverified claim about a real, identifiable company on the page. |
| 21:20 | **mediaradical.in has no testimonials section** — only About, Services, Technologies, Clients and Contact — so there was nothing to carry across. Testimonials were rewritten around the services the agency actually sells (websites, SEO, ads, ecommerce, email) and are clearly labelled placeholders. |

> **⚠️ The testimonial quotes are invented and must not be published as-is.**
> Attributions use obviously-fake names ("Placeholder Name", "Example
> Manufacturing Co.") on purpose. They are deliberately NOT the real client
> names from the trust strip: putting an invented quote in the mouth of a
> real, identifiable business is a claim that business never made, and a legal
> and reputational risk. Collect real quotes with written permission and
> replace the `quote` and `author` fields — the section, layout and schema
> need no code changes. There is a loud warning at the top of the file.

### Hero cards, proof band, and two new writing rules

| Time | What was completed |
|---|---|
| 21:30 | **Second float card** added at the top-right of the hero art ("12+ businesses trust us", grounded in the twelve real clients), mirroring the existing bottom-left one. Needed a `.artCloud .floatCardTop` override, because `.artCloud .floatCard` has higher specificity and was dragging it back to the bottom-left corner. |
| 21:34 | **Proof points moved out of the copy column** into a full-width band below the split, redesigned as an evenly divided three-column row with hairline dividers and accent tick chips. The hero became a flex column to allow a second in-flow child. |
| 21:38 | **Icon cloud pause button hidden.** It is visually hidden and restored on focus, not deleted: WCAG 2.2.2 requires a way to stop motion that auto-starts and runs past five seconds, and the sphere does exactly that. A keyboard or screen-reader user can still reach and operate it. Same pattern as the skip link. |
| 21:50 | **Added the no-decorative-dash rule to `CLAUDE.md`**, then applied it to the existing copy. Rewrote every em dash in visitor-facing strings using commas, colons or separate sentences, including the metadata title template, Open Graph and Twitter titles, the OG image alt and the logo `aria-label`. **Verified: 0 em dashes in the delivered HTML.** Code comments are exempt. |
| 22:00 | **Added the Indian-market content rule to `CLAUDE.md`**, then applied it. Rewrote all four case studies as fictional Indian businesses with Indian scenarios: Shreeji Textiles (Surat, UPI checkout), Anand Diagnostics (Ahmedabad, WhatsApp reminders), Vardhman Engineering (Rajkot, ₹340 cost per enquiry) and Rasoi Fresh (Pune). Testimonials given Indian names, cities and ₹ figures. Blog authors changed to Indian names. "Black Friday" became the Diwali rush, HIPAA became the DPDP Act, and `og:locale` moved from `en_US` to `en_IN`. |
| 22:05 | Removed an invented "68 developers" headcount from the FAQ, which contradicted the rewritten intro and was never a known fact about the real company. |

### Hero cleanup and a site-wide descender fix

| Time | What was completed |
|---|---|
| 22:20 | **Removed the dark shadow from the hero stat cards.** They used `--shadow-lg`, a near-black drop shadow that worked over a photograph but read as a grey smudge on the near-white hero. Hairline ring only now; the frosted backdrop does the separating. |
| 22:22 | **Removed the hero's ambient colour mesh.** The cloud's own glow had already gone, but the hero still painted three blurred blooms behind the artwork and the blue one sat directly behind the logos. Left as `display: none` with a note, so it is one line to restore, ideally on the copy side well away from the cloud. Texture now comes from the grid and grain alone. |
| 22:35 | **Fixed clipped descenders across the whole site.** Two causes, both real: `--leading-display` was **0.98**, which makes the line box shorter than the em box so g, y, p, j and q fall outside it; and SplitText's `mask: 'lines'` wraps each line in an overflow-hidden box that then cuts them off. Raised the display leading to 1.08 (tight and 1.15), and gave `.splitLine` 0.18em of descender padding with an equal negative margin so spacing is unchanged. |
| 22:38 | Also widened the gradient-text padding from 0.06em to 0.22em. `background-clip: text` only paints within the padding box, so a descender reaching past it loses its fill and simply vanishes. |

**Measured against the rendered font rather than eyeballed.** The hero headline
has 73px of ink (54px ascent plus 19px below the baseline) at 68px. The old
line box was 0.98 × 68 = **66.6px**, clipping by 6.4px, which is exactly what
was visible. It is now 73.4px. Swept every text node at 375px and 1440px: no
element carrying a descender has a line-height ratio under 1.02, and no split
line overflows its mask.

### Preloader and back-to-top

| Time | What was completed |
|---|---|
| 22:50 | **Built the preloader.** The concept is the brand mark drawing itself: the solid core lands, then the three arcs sweep outward in sequence, echoed by an expanding ring. It is the logo from `components/ui/Logo.tsx` at display size, so the first thing on screen is the identity rather than a generic spinner. Pure CSS keyframes with `pathLength="1"` normalising the arcs so one dash rule draws all three. No images, no JS animation loop. |
| 22:52 | **Deliberately no percentage.** Nothing in the page measures real load progress, and a fake number that snaps to 100 is worse than an honest indeterminate sweep. |
| 22:55 | **Built to not cost Core Web Vitals**, which is the usual price of a preloader: it is a `position: fixed` overlay so the real page renders underneath on its normal schedule; the markup ships in the server HTML so nothing waits on hydration; dismissal keys off `document.fonts.ready` rather than `window.onload`, so it never waits on below-the-fold images; a hard 2200ms ceiling means it cannot hang; and it is removed from the DOM after leaving so it can never intercept a pointer event. |
| 22:57 | **Once per session.** The inline boot script checks `sessionStorage` before first paint and sets `data-preload="skip"`, which the stylesheet resolves to `display: none` — so a repeat visit or an in-app navigation never sees it, and it costs no paint or hit-testing when skipped. Scroll is locked while it is up, via a class set in the same pre-paint script. |
| 23:00 | **Back-to-top control**, bottom right. Scrolls through Lenis when Lenis is running so the trip up has the same easing as the rest of the site; falls back to a native scroll with `behavior` taken from the user's own motion preference when Lenis is absent, which is the case under reduced motion. |
| 23:02 | The ring around it traces scroll progress as a conic gradient masked to a 2px band, so it is one element rather than an SVG. The scroll listener is rAF-throttled and only writes to the DOM when the rounded percentage actually changes, so a full-page scroll is a few dozen writes rather than hundreds. While hidden it carries `visibility: hidden`, `tabIndex={-1}` and `aria-hidden`, so it cannot be focused or announced before it is available. |

**Reduced motion:** the preloader still appears and still fades, because a hard
cut is itself a jarring motion, but the arc drawing, the pulse ring and the
sweep are all disabled and the mark simply sits there.

**Verified:** both components present in the server HTML alongside the hero
headline, proving the page is not gated on the overlay. The progress ring maths
checks out (`--progress: 0.6` produces `conic-gradient(… 216deg)`). The
animation itself could not be watched in this environment, since the preview
pane does not composite frames.

| Time | What was completed |
|---|---|
| 23:10 | **Performance and SEO pass on the above, which caught two of my own mistakes.** First, `aria-label="Back to top"` was a literal string in `ScrollToTop.tsx`, which breaks the settled rule that all copy lives in `/data`. Moved to `site.ui.scrollToTop`. Second, the preloader caption sat inside a `role="status"` region that already carried an accessible name, so a screen reader would hear the brand twice for no reason. The caption is now `aria-hidden`, since it is decoration and the region name already says what is happening. |
| 23:12 | **Measured rather than assumed.** No new dependency: the arrow glyph comes from `lucide-react`, already used by five other components and tree-shaken per icon. The preloader adds 1.4 KB of markup to a 656 KB document. Neither element can cause layout shift, as both are `position: fixed` and therefore out of flow. Heading order is untouched, still exactly one `h1`, and the structured data is unchanged. |

| Time | What was completed |
|---|---|
| 23:30 | **Reported as not visible on refresh, and there were two causes, both mine.** The once-per-session gate meant the overlay showed on exactly one load and never again, so any reload during review showed nothing. Worse, `MIN_VISIBLE_MS` was 700ms while the intro sequence does not finish until about 1360ms: the third arc starts at 440ms and takes 700ms to draw. The mark was being faded out mid-draw, so even on the one load that did show it, the animation never completed. |
| 23:32 | **Removed the session gate entirely.** It was also close to pointless: the preloader sits in the root layout, so a client-side navigation never remounts it. The gate was only ever suppressing full document loads, which is precisely the case where showing it is correct. Deleted the `sessionStorage` write, the `data-preload="skip"` attribute and the CSS rule that consumed it. |
| 23:33 | **Raised `MIN_VISIBLE_MS` to 1400** so the mark finishes drawing and the caption settles before the exit begins. The 2200ms hard ceiling is unchanged, so the worst case is still bounded. |
| 23:35 | Fixed two comments that now contradicted the code, including one on `.leaving` that described the session gate rather than the exit transition it actually sits above. |

**Not verified visually.** The preview pane in this environment does not
composite, and a tool round-trip takes about 9 seconds against an overlay whose
maximum lifetime is 2.2 seconds, so there is no way to catch it mid-flight. What
was confirmed: the dev server serves the preloader markup, the boot script locks
scroll unconditionally, no trace of the old session gate remains anywhere, and
the end state is clean with the overlay gone, scroll unlocked and the hero
rendered. The timing itself is plain `setTimeout` logic. The animation still
wants a human eye on it.

### Wordmark reveal in the preloader, and why not a morphing text effect

| Time | What was completed |
|---|---|
| 23:50 | **Evaluated Magic UI's Morphing Text for the preloader and rejected it**, on the evidence of its source rather than taste. Its constants are `morphTime = 1.5` and `cooldownTime = 0.5`, so two seconds per word. Our whole preloader is 1.4 seconds with a 2.2 second ceiling, so a single morph does not fit, and three words would mean a six second preloader. It also sets `style.filter = blur(...)` on two spans every frame, scaling to `blur(100px)`, under an SVG `feColorMatrix` threshold. Animating a large blur forces a full raster of the layer on the main thread, at exactly the moment the browser is parsing and hydrating the real page. Its rAF loop also never stops, recursing even during cooldown. Aesthetically the gooey melt reads playful, which fights the crisp hairline geometry of the mark. |
| 23:55 | **Implemented a per-character mask reveal of the wordmark instead.** Each letter of `site.name` rises from behind its own `overflow: hidden` mask, staggered 32ms by index through a `--i` custom property. This is the masked-reveal idea the headlines already use via SplitText `mask: 'lines'`, brought down to the character, so the overlay reads as the first sentence of the site rather than a widget bolted on the front. It also puts the company name on screen, which the preloader previously never did. |
| 23:57 | Cost: no JavaScript and no new dependency. It is CSS keyframes on `transform` only, so it stays on the compositor, which is the specific thing the blur-morph could not do. The caption was demoted to `--text-sm` at normal weight so the name leads and the tagline supports it. |
| 23:58 | **Retimed the whole sequence to land inside the exit.** Last character finishes at 1324ms, arcs at 1140ms, caption at 1280ms, rail at 1360ms, against `MIN_VISIBLE_MS` of 1400. Verified by measuring the rendered markup rather than by reading the numbers back. |

**Verified by measurement**, injecting the served markup against the real
stylesheet: Poppins 600 at 25.6px, a 178px lockup on desktop and 153px at 22px
on mobile, both inside the viewport with no page overflow. Character start
transform computes to `translateY(38.25px)` against a 29px character, so every
glyph begins genuinely below its mask rather than merely appearing to. The
inter-word gap is a non-breaking space, measured at 6px, so it survives the
inline-block clipping.

Reduced motion needed an explicit `transform: none` on `.charInner`. Without it
the characters keep their 130% start offset and the wordmark sits invisible
below its own mask, which is the exact class of bug the project rule about
reduced motion leaving nothing hidden exists to catch.

The one thing worth knowing: the preloader caption is now the first text in the
body, ahead of the skip link. That is deliberate. The overlay has to be early
in the document to paint before the page it is covering, and moving it later
would let the page show through first, which defeats it. The cost is five words
of on-brand tagline ahead of everything else, which no crawler will hold
against us given the `h1` is still the first heading.

**Contrast pass after the palette swap — 133 failing text nodes → 3**, and all
three remaining are false positives (white text over a scrim or the accent
pill, which the measuring walker cannot resolve). Four real defects fixed:

- The per-category accent colours were used for small **text** — amber measured
  **1.78:1**, rose 3.07:1. `constants/accents.ts` now splits the two jobs: the
  per-category variety lives in `--accent-wash` (a background, so non-text and
  unconstrained) while `--accent-colour` is one AA-safe brand tone.
- `--color-text-faint` was `#9797A5` at **2.88:1** — below even the large-text
  floor, and it carried real content. Now resolves to the muted step.
- `--ink-500` was `#71717F`, which passed on white but measured **4.41:1** on
  the subtle section background where much of the muted text actually sits.
  Nudged to `#6A6A78`.
- On the dark island and dark theme, buttons were dark-on-mid-blue at
  **4.07:1**. Flipped to a light fill with a dark label — 9.32:1.

**Placeholder vs real:** the brand colours, positioning, services, address,
phone and email are genuine. Case studies, testimonials, client names and the
statistics remain illustrative placeholders written to fit the brand.

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
- **Images:** all 11 Home page images are supplied, optimized and integrated.
  One slot (`grocery-delivery-fulfilment-india.webp`, Rasoi Fresh) is still
  outstanding and renders a placeholder; it belongs to `/portfolio`, not Home.

---

### Home services trimmed, technologies section aligned, image brief rewritten

| Time | What was completed |
|---|---|
| 00:20 | **Home services section now shows eight, not fourteen**, matching the eight the real mediaradical.in leads with: web development, mobile apps, SEO, PPC, social media, domain and hosting, email, ecommerce and CRM. This is a display slice in `data/pages/home.ts`, not a catalogue change. The other six services still exist as entities and still appear in navigation, the footer and the sitemap, which is exactly what `serviceSlugs` is for. |
| 00:21 | Heading changed from "Fourteen services. One team." to "Eight services. One team." Leaving the old heading would have been a plain lie about what is on the page. |
| 00:26 | **Technology tiles now centre.** The grid used `repeat(auto-fill, minmax(148px, 1fr))`, and CSS grid cannot centre a partial last row: `1fr` tracks are fixed columns, so four tiles in a row built for seven always hug the left edge. Replaced with flex wrap plus `justify-content: center` and a fixed `flex: 0 1 148px` basis. Fixed basis with no grow matters, because letting tiles stretch would make the last row wider than the rows above it. |
| 00:30 | Panel description and the closing note centred, and `margin-block-start: var(--space-6)` added to the note so the hairline rule is not crowded against the last row of tiles. |
| 00:34 | **Removed the dead hero image reference.** `data/pages/home.ts` still carried `media: '/images/hero/hero-ambient.webp'`, but `HeroSection` only falls back to `media` when `techCloud` has no logos, which never happens. Unreachable data, and a prompt somebody would have wasted time generating. |
| 00:40 | **Rewrote `imagegeneration.md` from 14 prompts to 11**, for Indian market context. |

**Why the image brief needed rewriting, beyond the Indian context.** The old
prompts described the wrong subjects. `logistics-control.webp` asked for a
robotic fulfilment warehouse, but its case study is Vardhman Engineering, an
engineering manufacturer that came for search visibility.
`retail-commerce.webp` asked for the same warehouse idea again, but its client
is Shreeji Textiles. `fintech-platform.webp` asked for a trading desk, but its
client is Rasoi Fresh, a grocery delivery business. The shared style suffix was
also stale: it specified a dark charcoal palette with an electric-indigo accent
`#5B53F5`, from before the light-first baseline and the Media Radical blue
`#008DD2`.

Three prompts were dropped rather than rewritten: both hero images, because the
hero renders the icon cloud, and the OG image, because `app/opengraph-image.tsx`
draws it at build time with `next/og`. `fintech-platform.webp` is documented
separately, since it belongs to `/portfolio` rather than the Home page.

**Verified by measurement, not by eye:** the eight chosen services appear twice
in the served HTML (navigation plus card) while the other six appear once
(navigation only), which is what proves the section renders exactly eight. Tile
rows measured symmetric at 57px each side for a full row and 409px each side
for a partial one, with a uniform 164px tile width across both. Description
margins 239px each side, note 56px each side, 24px of new space above the rule.
- **Outstanding:** the newsletter Server Action (`app/actions.ts`) validates the
  address and returns — it does not send anywhere yet. There is a TODO on the
  line where the provider call belongs.

---

### Images delivered, optimized and integrated

| Time | What was completed |
|---|---|
| 01:10 | **11 PNGs arrived in `public/` root.** Converted to WebP, resized, renamed and filed under `public/images/<section>/`. **19.11 MB became 0.56 MB, 97% smaller**, with no visible loss at the sizes these are actually displayed. Originals deleted after conversion. |
| 01:12 | **Sized from the live layout, not from the source.** Slots were measured in the running page at 1280px, doubled for retina and rounded up for wider viewports. The portraits were the notable case: 1254×1254 files for a 46px slot, roughly 27x oversized. Stored at 256px, which covers 3x retina with headroom for a future team page, and dropped 1.8 MB each to about 7 KB. |
| 01:14 | **SEO-friendly kebab-case names.** `avatar-01.png` became `anjali-anand-clinic-owner.webp`, `logistics-control` became `engineering-manufacturer-seo-india`, and so on. Three filenames were actively misleading before this: `logistics-control` and `retail-commerce` both described a warehouse, and `fintech-platform` described a trading desk, none of which match their real clients. |
| 01:18 | **Created `data/images.ts` as the single source for every asset.** Paths used to be written inline across four files, so a rename was a hunt and nothing stopped a path drifting from what was on disk. Entities now reference `images.textileStore` and similar. `plannedImages` holds assets that are referenced but not yet generated, so outstanding work is visible rather than hidden in an entity file. |
| 01:20 | The file is **generated from the actual converted files**, not hand-written, so its dimensions and blur strings cannot drift from disk. |
| 01:22 | **Added `blurDataURL` to every asset**, which nothing had before although `Media.tsx` already supported it. Each is a 16px WebP inlined as base64 at roughly 100 to 230 bytes, so it costs no request. |
| 01:24 | **Fixed the alt text while rewiring.** Three testimonial portraits read "Placeholder portrait", and two case study covers described the wrong scene entirely (machined valve components for what is now a front-office analytics shot). Alt is visitor-facing copy, so it lives in `data/images.ts` with everything else. |
| 01:26 | Fixed `.claude/launch.json` at the repo root, which declared only a `url` and so could never start the dev server, only attach to one already running. It now runs `npm --prefix media-radical run dev`. |

**Verified, not assumed:** 11 `img` elements render, zero placeholders remain,
zero broken paths. Every image is lazy with a real `sizes` attribute and 9 to 15
srcset variants. The optimizer serves AVIF where accepted, taking the largest
image to about 25 KB at 640px wide. All 11 carry a blur placeholder.

**No `priority` on any image, deliberately.** The first image sits 1160px down a
720px viewport, so nothing is above the fold, and the LCP candidate is the hero
`h1` at 181px. The hero renders the icon cloud rather than a photograph, so this
page has no above-the-fold image to prioritise. Adding `priority` would have
fought the LCP element rather than helping it.

---

### Made deployable on Render

| Time | What was completed |
|---|---|
| 02:05 | **Established the service type on evidence, not preference.** Every route prerenders static, so a Render Static Site looks correct. It is not: `app/actions.ts` is a Server Action used by the footer newsletter on every page, and `output: 'export'` refuses to build when one is present. Separately, `next/image` optimisation is a server route, so a static export would mean sending the full 1536px source to a phone instead of a 25 KB AVIF, undoing the image work deliberately. **Web Service.** |
| 02:08 | **Verified `next start` needs no changes for Render.** Ran it with `PORT=10000` and confirmed it binds `0.0.0.0:10000`, which is exactly the "no open ports detected" failure mode Render deployments usually hit. No wrapper, no explicit host or port flags. |
| 02:10 | Pinned Node 22 three ways: `.nvmrc`, `engines` in `package.json`, and `NODE_VERSION` in the blueprint. |
| 02:12 | **Added response headers to `next.config.ts`** rather than the Render dashboard, so they are versioned with the code and survive the service being recreated. `/images/*` gets a bounded 30 day cache because those filenames are not content-hashed; `/_next/static` already gets an immutable year from Next. Added `X-Content-Type-Options: nosniff` and `Referrer-Policy`. |
| 02:14 | Wrote `render.yaml`, region `singapore` as the closest to the audience. `NEXT_PUBLIC_SITE_URL` is declared `sync: false` rather than committed, because it has a production fallback: an unset deployment does not fail, it quietly publishes canonical URLs and sitemap entries pointing at production. |

**Corrected my own mistake:** I first reported this was not a git repository.
That was wrong. I had checked the parent folder; the repo is this folder, with
8 commits and a GitHub remote at `jaivikpatel2001/Media-Radical`. It also means
the repo root is here, so `render.yaml` sits beside `package.json` and no Root
Directory setting is needed. The `git init` I ran was a harmless no-op re-init
on the existing repository; log, remote and history are intact.

**Two documentation bugs found and fixed while checking configuration.**
`.env.example` claimed the `NEXT_PUBLIC_SITE_URL` fallback was
`https://www.mediaradical.com`, but the code falls back to
`https://mediaradical.in`, and it listed Vercel preview URLs for a project being
deployed to Render. `README.md` still said the 14 images were not in the repo.

**Verified against a real production server**, not assumed: `npm ci` accepts the
lockfile, the build is clean, `/` returns 200, `/_next/static` sends
`immutable`, `/images/*` sends `max-age=2592000`, the optimizer serves
`image/avif`, `robots.txt` and `sitemap.xml` both return 200, and no
`X-Powered-By` header is sent.

**Not done, because it is the user's call:** nothing has been committed or
pushed. The working tree has 5 changed files. The current branch is `home-page`,
not `main`, which is the branch Render will ask to deploy from.

---

### Converted to a static export for Render Static Site

Reversal of the decision recorded two entries above. The Web Service reasoning
still stands on the merits, but the deployment target is the user's call and
they asked for a Static Site after the trade-offs were laid out twice. Recorded
here rather than quietly rewritten, per the rules at the top of this file.

**What the first attempt proved.** A Static Site was created with Publish
Directory `.next`. The build succeeded and Render reported "Your site is live",
but the URL returned `Not Found`. `.next` is a server bundle: there is no
`index.html` at its root, the HTML lives at `.next/server/app/index.html`, and
the rest is manifests and cache. Render reports success because it uploaded a
directory, not because that directory is servable.

| Time | What was completed |
|---|---|
| 12:40 | Read the unsupported list from `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` rather than guessing. Three things this project used are on it: Server Actions, `headers()`, and Image Optimization with the default loader. |
| 12:45 | **Deleted `app/actions.ts` and rewrote the footer newsletter to submit from the browser.** This is a genuine regression: the Server Action version worked with JavaScript disabled, and this does not. It posts to `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`. Unset is a supported state that says signup is not connected and points at the contact address, because thanking somebody for a subscription that went nowhere is worse than telling them to email. Result strings went into `data/navigation.ts`, since no literal copy lives in a `.tsx`. |
| 12:50 | Set `output: 'export'` and `images.unoptimized: true`. Every device now receives the original file: a phone gets the full 1536px WebP instead of a 25 KB AVIF. Survivable only because `public/images` was already sized to real display slots. |
| 12:52 | Moved the response headers out of `next.config.ts` into the `headers:` block of `render.yaml`. Under export they are not an error, they are **silently ignored**, which is worse. |
| 12:55 | **Build failed three times in a row, each on a different route handler.** `robots.txt`, then `sitemap.xml`, then `opengraph-image` each need `export const dynamic = 'force-static'`, because a route handler is dynamic by default and there is no server to run it on. Added to all three. |
| 13:00 | Rewrote `render.yaml` as `runtime: static` with `staticPublishPath: out`. Deliberately no catch-all rewrite: that is a single-page-app pattern, and this export pre-renders a real `.html` per route, so a catch-all would mask genuine 404s and serve the home page instead. |

**Verified by serving `out/` locally the way Render will**, not by reading the
build log: `/` returns 200 with the real `h1`, 11 `img` tags and 22 service
links; `/robots.txt`, `/sitemap.xml`, `/opengraph-image` (a real 1200x630 PNG)
and `/404.html` all return 200; an unknown path returns 404 rather than the home
page. Confirmed the markup now carries direct `/images/...` paths with no
`srcset` and no `/_next/image` URLs, which is the optimisation loss made visible.

**Standing consequence:** adding any dynamic feature later means moving back to
a Web Service. `output: 'export'` fails at build, not at review, so check the
unsupported list first.

---

### Staging published production canonical URLs. Fallback removed.

**The incident.** The Render staging site went live with
`NEXT_PUBLIC_SITE_URL` unset. It did not fail. `data/site.ts` fell back to
`https://mediaradical.in`, so `mediaradical.onrender.com` served
`<link rel="canonical" href="https://mediaradical.in">`, a sitemap whose only
`<loc>` was the production domain, `og:url` pointing at production, and every
JSON-LD `@id` likewise. A staging site asserting it is production is how a
domain gets deduplicated out of a search index, and none of it is visible
without looking at the response.

| Time | What was completed |
|---|---|
| 21:20 | **Deleted the production fallback.** `resolveSiteUrl()` in `data/site.ts` replaces `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mediaradical.in'`. Configured wins; otherwise `RENDER` (set to "true" on every Render service) decides between a hard build failure and the local default of `http://localhost:3000`. `RENDER` is what separates a deploy from someone running `npm run build` on a laptop, so local builds keep working with no `.env` file. |
| 21:22 | The thrown error carries the fix rather than the diagnosis: which dashboard field, the two correct values, and the fact that it is inlined at build time so a restart will not pick it up. |
| 21:24 | Trailing slashes are stripped, because `${site.url}/sitemap.xml` would otherwise produce a double slash and canonical URLs have to match byte for byte. |

**Verified all four paths, rather than reasoning about them:**

1. Local, unset: builds, `<loc>http://localhost:3000</loc>`.
2. `RENDER=true`, unset: **exit 1** with the intended message.
3. `RENDER=true` and set: canonical, sitemap and robots `Host` all read
   `https://mediaradical.onrender.com`.
4. Value with a trailing slash: `Sitemap: https://mediaradical.onrender.com/sitemap.xml`,
   no double slash.

**Why a failing build is the right trade.** A build that fails costs minutes and
names its own fix. A wrong canonical costs indexing on the production domain and
is silent. The asymmetry decides it.

**Also diagnosed and dismissed as not-bugs**, from the same deploy: the CSS and
JS 404s and the two missing insight images were stale browser cache from the
earlier broken `.next` deploy. All chunks and all 11 images return 200, and both
"missing" images were downloaded from the live host and decoded as valid WebP at
1200x675. Separately, nav links causing a full page reload is correct today:
`out/` contains only `index.html`, `404.html` and `_not-found.html`, so every nav
link targets an unbuilt route and hands off to the browser. That resolves itself
when those page groups are built.

| Time | What was completed |
|---|---|
| 21:40 | **Trimmed `.env.example` from 9 variables to 2.** It listed `NEWSLETTER_API_KEY`, `NEWSLETTER_LIST_ID`, `CONTACT_FORM_TO_EMAIL`, four `SMTP_*`, two `TURNSTILE_*`, `NEXT_PUBLIC_ANALYTICS_ID` and `MAINTENANCE_MODE`, all under a PLANNED heading. No code reads any of them. Verified by grepping every `process.env` access in the source: there are exactly three, and one of them is set by the platform. |
| 21:42 | Documented `RENDER` in its own section as platform-provided rather than as a settable key, with a warning not to set it locally, since doing so makes your own builds fail by design. |
| 21:43 | Several of the removed entries were also wrong, not merely unused: the newsletter ones described a server-side API key, which a static export cannot hold, and `MAINTENANCE_MODE` described a `proxy.ts` that does not exist. |
| 21:44 | Fixed a README line claiming the site "runs with no configuration", which stopped being true for Render builds once the fallback was removed. Confirmed no other file referenced any removed variable. |
