# Route placeholders

The empty directories beside this file map the remaining 16 page groups. They
hold **no `page.tsx`** — Next.js only registers a route once one exists, so
today every one of these paths resolves to `app/not-found.tsx`. That is
deliberate: the header and footer link to the real future URLs, so no link
needs rewriting when a page lands.

## Adding a page group

Most of the work is already done. A typical page is a data file plus a
composition — the sections it needs already exist in `/sections/shared` and
are prop-driven.

1. **Add content** to `/data/pages/<name>.ts`, typed by a new interface in
   `/types/pages.ts` built from the existing section slices.
2. **Create `page.tsx`** composing shared sections from that slice. Only
   genuinely new sections need new components.
3. **Register the route** in `IMPLEMENTED_ROUTES` (`/constants/routes.ts`) so
   it enters `sitemap.ts`.

## Dynamic segments

`[slug]` routes generate from the entity arrays. Note the Next.js 16 change:
`params` is a **Promise**.

```tsx
export default async function Page(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params;   // Promise — sync access was removed in 16
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  // …compose shared sections from `service`
}

export const generateStaticParams = () =>
  services.map(({ slug }) => ({ slug }));
```

Run `npx next typegen` to regenerate the `PageProps` helper after adding a
route.

## `(legal)`

A route group: the parentheses keep it out of the URL, so these render at
`/privacy-policy` rather than `/legal/privacy-policy`. Add a
`(legal)/layout.tsx` for the shared prose layout when the first one is built.

## Maintenance mode

Group 17 is reached by a rewrite behind an environment flag, from **`proxy.ts`
at the project root — not `middleware.ts`**, which Next.js 16 renamed. The
`proxy` runtime is Node.js and is not configurable.

## When these are all built

Turn `typedRoutes` back on in `next.config.ts`. It is off only because it
validates every `<Link href>` against routes that exist, and the nav
deliberately points ahead of the build.
