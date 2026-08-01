@AGENTS.md

# Media Radical — working rules

## Read these first

Before starting any task, read **`DONE.md`**. It is the chronological record of
what has already been built and why, including approaches that were tried and
rejected. It exists so you do not have to scan the whole codebase to get
oriented, and so you do not redo or undo settled decisions.

Also relevant depending on the task:

| File | When it matters |
|---|---|
| `AGENTS.md` | Always. This is Next.js 16 — read the bundled docs in `node_modules/next/dist/docs/` before writing code. |
| `DONE.md` | Always. What exists, what was rejected, current state. |
| `README.md` | Setup, scripts, architecture overview. |
| `app/ROUTES.md` | Adding any of the 16 unbuilt page groups. |
| `imagegeneration.md` | Anything touching images or asset paths. |
| `.env.example` | Anything touching configuration. |

---

## Documentation is part of the Definition of Done

**Any change to code requires the matching documentation change in the same
piece of work.** A task is not complete until the docs reflect it. This is not
optional and it is not a follow-up.

This applies to every kind of change: new features, enhancements, bug fixes,
refactors, dependency changes, and configuration changes.

### What to update, and when

| You changed… | Then you must update… |
|---|---|
| Anything at all | `DONE.md` — append an entry with date, time, what and why |
| Setup, scripts, dependencies, architecture | `README.md` |
| A new or changed environment variable | `.env.example` **and** `README.md` |
| A route, or added a page group | `app/ROUTES.md` |
| Image paths, sizes or asset handling | `imagegeneration.md` |
| A rule about how to work in this repo | `CLAUDE.md` (this file) |
| A user-facing release, if `CHANGELOG.md` exists | `CHANGELOG.md` |
| A component's contract or a design token's meaning | The comment block in that file |

If a `CHANGELOG.md` is added later, treat it as required for anything
user-facing.

### Writing a `DONE.md` entry

Append to the current date's section, at the bottom. Include:

- **Time** (IST, 24-hour)
- **What changed** — concrete, not "improved things"
- **Why** — whenever the reason is not obvious from the change

Log reverts, dead ends and rejected approaches too. Knowing that something was
tried and did not work is often worth more than knowing what shipped, and it
stops the same thing being attempted twice.

Never rewrite history in `DONE.md`. If something is later undone, add a new
entry saying so.

---

## Performance and SEO review — also part of Definition of Done

Every code change gets a performance and SEO pass **before** it is called
complete. Not a follow-up task.

### 1. Next.js optimisation review

Review the optimisation guidance relevant to what you touched and apply what
fits. **Read it from `node_modules/next/dist/docs/`, not from the web.** This
project is Next.js 16; published guides for Next.js 14 describe APIs that have
since changed or been removed (`middleware` → `proxy`, sync → async `params`,
webpack → Turbopack, `next lint` removed). Using them will produce wrong code.

Check the areas your change actually touches:

| Area | Look at |
|---|---|
| Images | `next/image`, `sizes`, `priority` on the LCP image only, AVIF/WebP |
| Fonts | `next/font` self-hosting, subsetting, weight count, `display: swap` |
| Scripts | `next/script` strategy, third-party cost |
| Metadata | Metadata API, `metadataBase`, OG and Twitter, canonical |
| Static assets | Caching, what belongs in `public/` |
| Lazy loading | `next/dynamic`, client-bundle size, Server vs Client Components |
| Bundle | Whether a dependency earns its weight |

Standing rules for this repo: Server Components by default, one `priority`
image per page, never add a webpack config.

### 2. SEO / GEO / AEO review

Run the `seo-geo-aeo` skill against the affected page and act on what it finds.
Verify, where the change touches them:

- Metadata, Open Graph, Twitter cards, canonical URLs
- Structured data (`utils/schema.ts`) — it must describe what is actually on
  the page, never more
- `sitemap.ts` and `robots.ts` — only list routes that resolve
- Semantic HTML and heading order — exactly one `h1` per page
- Accessibility: contrast, keyboard paths, accessible names, reduced motion
- Core Web Vitals: LCP element, layout shift, long tasks
- Internal linking and content discoverability
- AI and answer-engine readability — is the answer in the server HTML?

**Content must be in the server-rendered HTML.** Anything that only appears
after hydration is invisible to most crawlers and answer engines.

### Before you call a task done

1. Code change made and verified.
2. `npx tsc --noEmit` clean.
3. `npm run lint` clean.
4. `npm run build` clean.
5. **Every affected document above updated.**
6. **Next.js optimisation review done** for the areas touched.
7. **SEO / GEO / AEO review done** via the `seo-geo-aeo` skill.
8. If docs contradict the code, the docs are a bug — fix them now, not later.

---

## Project constraints

These are settled decisions. Do not reverse them without being asked.

- **No Tailwind, no utility-first CSS.** CSS Modules plus custom properties.
  Tailwind was deliberately removed from the scaffold.
- **Three-layer tokens.** Primitives (`styles/tokens.css`) → semantic
  (`styles/themes.css`) → components. A component referencing a raw `--ink-*`
  or `--accent-*` token will not survive a theme flip.
- **All copy lives in `/data`.** No literal user-facing strings in `.tsx`.
  This is what lets the remaining page groups be added as data, not components.
- **Server Components by default.** `'use client'` only for providers,
  interactive chrome and animation wrappers.
- **Light is the default theme.** Dark is opt-in via `data-theme="dark"`; there
  is deliberately no `prefers-color-scheme` auto-switch.
- **Reduced motion must leave nothing hidden.** Initial hidden states are gated
  on a `.js-motion` class that is withheld when motion is reduced or JS is off.
- **Plain English copy.** Short sentences, everyday words, no insider jargon.
  Each `/data` file carries a WRITING STYLE comment.
- **Sections shared across pages live in `sections/shared/`** and take a single
  typed `content` prop.

## Verification

```bash
npm run build
```

`next build` runs the type check too. Turbopack is the default bundler in
Next.js 16 — never add a webpack config, it will fail the build.
