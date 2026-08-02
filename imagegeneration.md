# Image Generation Brief — Media Radical

**Status: the 11 Home page images have been generated, optimized and
integrated.** This file is now both the record of what is on disk and the brief
for regenerating any of it.

Media Radical is an Ahmedabad agency, and the images have to say that on sight.
This brief was rewritten because the previous version described a generic
Western tech company, and it also described the wrong subjects: it asked for a
fintech trading desk and a robotic warehouse for case studies whose real
clients are an engineering manufacturer, a diagnostics lab and a textile
business.

---

## Where the paths live

**Do not hardcode an image path.** Every asset is defined once in
[`data/images.ts`](data/images.ts) and referenced by name:

```ts
import { images } from '@/data/images';
cover: images.textileStore,
```

Each entry carries `src`, `alt`, real `width`/`height` and an inlined base64
`blurDataURL`. Renaming or resizing a file is therefore one edit in that file,
not a hunt through the entity files.

`plannedImages` in the same file holds assets that are referenced but not yet
generated. They render a placeholder rather than breaking.

---

## What is on disk

Generated at 1536px or 1400px wide for the photographic slots, 1200px for the
abstract covers, 256px for the portraits. WebP at quality 82. All metadata is
stripped by the conversion; the sources carried no EXIF or ICC to begin with.

| File | Size | Source subject |
|---|---|---|
| `images/about/digital-agency-team-ahmedabad.webp` | 1536×1024 · 100 KB | Intro section |
| `images/about/project-planning-meeting-india.webp` | 1400×933 · 73 KB | Why choose us |
| `images/case-studies/engineering-manufacturer-seo-india.webp` | 1400×933 · 95 KB | Vardhman Engineering |
| `images/case-studies/diagnostics-centre-booking-india.webp` | 1400×876 · 70 KB | Anand Diagnostics |
| `images/case-studies/textile-showroom-ecommerce-india.webp` | 1400×876 · 121 KB | Shreeji Textiles |
| `images/testimonials/anjali-anand-clinic-owner.webp` | 256×256 · 7 KB | Testimonial portrait |
| `images/testimonials/karan-joshi-business-owner.webp` | 256×256 · 8 KB | Testimonial portrait |
| `images/testimonials/neha-desai-marketing-lead.webp` | 256×256 · 7 KB | Testimonial portrait |
| `images/insights/ai-testing-abstract.webp` | 1200×675 · 39 KB | Insight cover |
| `images/insights/cloud-cost-abstract.webp` | 1200×675 · 23 KB | Insight cover |
| `images/insights/design-systems-abstract.webp` | 1200×675 · 35 KB | Insight cover |

**19.11 MB of PNG became 0.56 MB of WebP, 97% smaller**, with no visible
quality loss at the sizes these are displayed. The originals were deleted after
conversion.

The portraits are displayed at 46px. They are stored at 256px, which covers 3x
retina with headroom for a future team page, and costs single digit kilobytes.
Everything else was sized from the live layout measured at 1280px, doubled for
retina and rounded up for wider viewports.

### The conversion

```
sharp(src)
  .resize({ width, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
```

The `blurDataURL` for each is a 16px-wide WebP at quality 45, inlined as base64.
Each is roughly 100 to 230 bytes, small enough to cost no extra request while
still giving `next/image` a real low-quality placeholder.

Next.js re-encodes on demand from these files and serves AVIF where the browser
accepts it, which takes the largest of them down to about 25 KB at 640px wide.
Nothing further is needed at build time.

---

## Three prompts that were dropped

| Dropped | Why |
|---|---|
| `hero/hero-ambient.webp` | The hero renders the interactive icon cloud, not a photograph. `HeroSection` only falls back to `media` when `techCloud` has no logos, which never happens, so the entry was unreachable. Removed from `data/pages/home.ts`. |
| `hero/hero-ambient-light.webp` | Same reason, and a light/dark pair is moot now that light is the only baseline. |
| `og/og-default.webp` | `app/opengraph-image.tsx` draws the social card at build time with `next/og`. No file needed. |

---

## The two rules that matter most

**The site is light-themed by default.** Near-white backgrounds, generous
whitespace, dark text. Every image must be composed for that page: bright,
airy, high-key. A dark, moody image dropped onto this page reads as a hole
punched in it. Dark mode is an opt-in that applies a small CSS brightness
adjustment to these same files, so you do **not** need dark variants.

**Indian, and specifically contemporary Indian.** Say "Indian" in the subject
line of every prompt. Generators drift Caucasian by default, and when you only
say "India" they drift toward heritage tourism. What you want is an Ahmedabad
technology office in 2026, not a spice market. No flags, no monuments, no
clichéd cultural props.

### The five things every prompt below enforces

| | |
|---|---|
| **Bright, high-key** | Light dominates. Shadows are soft and grey, never black. |
| **Recognisably Indian** | Indian people, Indian workplaces, contemporary business dress. |
| **One accent colour** | Media Radical blue, `#008DD2`. A screen, a sign, a lit edge, clothing. Never the background. |
| **Real negative space** | Each entry names where the empty area must be. Text or a card sits there. |
| **No text, ever** | Generators produce garbled lettering, and the layout supplies all real text. |

---

## Shared style suffix

**Append this to every prompt below.**

> Premium Indian corporate photography. Photorealistic, full-frame camera at
> f/2.0, cinematic but natural lighting. Bright, airy, light-first palette:
> warm off-white and soft grey architecture, generous daylight, with a single
> confident accent of blue #008DD2 somewhere in the frame. Clean minimal
> composition with real negative space. Modern Indian professionals in smart
> contemporary business dress. No text, no logos, no watermarks, no visible
> brand names. Enterprise-grade and understated. Never stocky, never staged
> handshakes, never a group pointing at one monitor. 8k.

**Negative prompt**, for tools that take one:

> text, letters, words, logos, watermark, signage, UI labels, dark, moody, low
> key, night, neon, cluttered, busy background, distorted hands, extra fingers,
> deformed faces, oversaturated, HDR, fisheye, Caucasian models, Western office,
> New York skyline, London skyline, stock photo pose

---

## The prompts

### `about/digital-agency-team-ahmedabad.webp` · Intro section

Negative space: left third. Heading beside it: "A digital partner that feels
like your own team."

> A bright modern Indian digital agency studio in Ahmedabad during the working
> day. Four Indian colleagues, a mix of men and women in their late twenties
> and thirties, working along a long light-oak desk with dual monitors. One
> stands at a glass wall marked up with wireframes and site structure diagrams,
> mid-explanation. Large windows, abundant natural daylight, whitewashed walls,
> potted plants, pale exposed concrete ceiling. Wide architectural framing with
> the left third comfortably empty. Candid working atmosphere, nobody posing.

### `about/project-planning-meeting-india.webp` · Why choose us

Negative space: right third. Heading: "Six promises we put in writing."

> Two Indian professionals in a bright meeting room in an Indian office,
> reviewing a printed project plan and a laptop between them. A woman in her
> thirties in a smart blouse points at a line on the page while a man in his
> forties in a light shirt annotates it. Warm daylight from a window to the
> right, pale wood table, soft white walls. Slightly side-on at eye level,
> shallow depth of field, generous clean space on the right third.

### `case-studies/engineering-manufacturer-seo-india.webp` · Vardhman Engineering

Engineering manufacturer, search visibility work.

> The front office of a modern Indian precision engineering company. An Indian
> man in his forties in a clean light-blue shirt stands at a standing desk
> reviewing a website analytics dashboard on a large monitor, with the bright,
> orderly machine floor visible through a glass partition behind him. Daylight
> from high windows, pale industrial surfaces, everything clean and well kept.
> Wide shot, calm and precise, no clutter.

### `case-studies/diagnostics-centre-booking-india.webp` · Anand Diagnostics

Diagnostics lab, online booking.

> The reception of a modern Indian diagnostics centre, bright and spotlessly
> clean. An Indian woman in her late twenties in professional medical-office
> attire helps a patient check in at a counter with a tablet showing an
> appointment booking screen. Soft even daylight, white and pale blue surfaces,
> frosted glass, a calm waiting area softly out of focus behind. No patient
> faces in sharp focus, no medical procedures, no distress.

### `case-studies/textile-showroom-ecommerce-india.webp` · Shreeji Textiles

Textile business, online store.

> A contemporary Indian textile showroom, bright and beautifully organised.
> Bolts of fabric in rich colours stacked on pale wooden shelving. An Indian
> woman in her thirties in a modern kurta photographs a folded fabric sample on
> a small lit table with a phone on a tripod, packing an online order beside
> her. Large windows, natural daylight, clean uncluttered composition.

### The three testimonial portraits

Square crop. Generate all three in one sitting and reject any that does not
match the others' light. Consistency across the three matters more than any
single one of them.

> Corporate headshot of an Indian professional, natural warm daylight from a
> large window at 45 degrees, softly blurred bright neutral office interior
> behind. Relaxed genuine expression, looking at the camera, head and
> shoulders, square crop. Modern contemporary Indian business dress. Not a
> studio backdrop, not harsh flash, not an over-retouched corporate portrait.

| File | Person | Direction |
|---|---|---|
| `testimonials/anjali-anand-clinic-owner.webp` | Dr. Anjali Anand | Indian woman, late forties, doctor and clinic owner. Composed, warm, quietly authoritative. |
| `testimonials/karan-joshi-business-owner.webp` | Karan Joshi | Indian man, mid thirties, business owner. Approachable and direct. Plain shirt, no tie. |
| `testimonials/neha-desai-marketing-lead.webp` | Neha Desai | Indian woman, early thirties, marketing lead. Bright, confident, modern. |

### The three insight covers

These are the one place to stay abstract. They head opinion articles, so a
photograph of people would over-promise a case study that is not there.

For these three only, replace "Premium Indian corporate photography" in the
style suffix with **"Premium abstract 3D render, soft studio lighting"**.

| File | Article | Prompt |
|---|---|---|
| `insights/ai-testing-abstract.webp` | "Test your AI before you ship it" | Abstract lattice of fine luminous filaments converging into a dense bright core, floating in a bright off-white field. Soft depth of field, delicate blue #008DD2 light along the filaments. |
| `insights/cloud-cost-abstract.webp` | "The third of your cloud bill nobody owns" | Isometric arrangement of floating matte off-white cubes in a descending stepped formation against a bright background, a few cubes drifting away. Cool blue #008DD2 under-lighting. |
| `insights/design-systems-abstract.webp` | "Why most design systems fall apart" | Overlapping translucent interface panels and component swatches arranged as a neat grid in bright dimensional space, one panel lifting cleanly out of alignment. |

---

## Still outstanding

**`images/case-studies/grocery-delivery-fulfilment-india.webp`** · 1400×876 ·
Rasoi Fresh, a grocery delivery business. Declared in `plannedImages` in
`data/images.ts` and referenced by its case study, but that case study is not
on the Home page, so it only becomes visible when `/portfolio` is built. Until
then the slot renders a placeholder.

> A bright modern Indian grocery fulfilment operation. An Indian man in his
> late twenties in a clean uniform polo checks a tablet showing a delivery
> route while fresh produce is packed into crates on a stainless steel bench
> behind him. Daylight, spotless pale surfaces, crates of vegetables adding
> natural colour. Organised and fast, not industrial or grim.

---

## Adding a new image

1. Generate it with the style suffix above.
2. Convert and resize with the recipe in "The conversion", sized from the slot
   it will actually occupy, not from the source.
3. Save under `public/images/<section>/<seo-friendly-kebab-name>.webp`.
4. Add an entry to `data/images.ts` with its real dimensions and blur string.
5. Reference it as `images.yourKey`. Never write the path inline.

### Checklist

- [ ] `.webp`, sized to the real slot, no larger.
- [ ] The image is bright and does not read as a dark rectangle on a light page.
- [ ] The people are recognisably Indian and contemporary.
- [ ] No text, no logos, no watermarks anywhere in the frame.
- [ ] Alt text says what the image shows rather than repeating the heading.
- [ ] Hands and faces are not distorted. Regenerate rather than retouch.
