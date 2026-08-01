# Image Generation Brief — Media Radical

Everything the site needs from you, in one place. **14 images.** Each entry below gives the exact save path, the exact pixel size, a full prompt, a negative prompt, and notes on what the layout does to the image.

Nothing here is blocking. Every slot already renders a generated gradient placeholder, so the site is complete without these files — dropping a file at the given path is a no-code change that swaps the placeholder for the real thing.

---

## 1. The rule that matters most

**The site is light-themed by default.** Near-white backgrounds, generous whitespace, dark text. Every image must be composed for that page — **bright, airy, high-key.**

A dark, moody image dropped onto this page reads as a hole punched in it. What you want instead is an image that looks like it belongs on the same sheet of paper as the text: **light background, mid-tone subject, one accent colour, plenty of empty space.**

Dark mode exists as an opt-in and applies a small CSS brightness adjustment to these same files. You do **not** need to generate dark variants.

### The four things every prompt below enforces

| | |
|---|---|
| **Bright, high-key** | Light dominates. Shadows are soft and grey, never black. Think a studio with white walls at midday, not a bar at night. |
| **One accent colour** | Electric indigo, `#5B53F5`. It appears as a glow, a highlight or a single object. Never as the background. |
| **Real negative space** | Each entry names where the empty area must be. Text or a card sits there in the layout. An edge-to-edge busy image breaks the composition. |
| **No text, ever** | Generators produce garbled lettering, and the layout supplies all real text. No words, no logos, no UI labels, no signage. |

---

## 2. Global settings

Prepend or append this to every prompt (most tools accept it inline; if yours has a separate "style" field, put it there):

> Bright high-key photography, light and airy, near-white background, soft diffused daylight, gentle grey shadows, clean minimal composition, generous negative space, premium editorial technology aesthetic, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, sharp focus on subject, 8k, highly detailed.

**Negative prompt** — use on every image:

> dark, black background, moody, low-key lighting, night, neon, cyberpunk, heavy vignette, oversaturated, cluttered, busy, text, words, letters, typography, logos, watermarks, signage, UI labels, numbers, charts with labels, distorted hands, extra fingers, deformed faces, blurry, low resolution, jpeg artifacts, stock-photo cheesiness, fisheye distortion.

**Palette to steer toward**

| Role | Hex | Where it should appear |
|---|---|---|
| Background | `#FBFBFD` – `#F5F5F7` | The dominant field of the image |
| Mid grey | `#D8D8E0` | Surfaces, edges, soft shadow |
| Deep ink | `#1D1D23` | The darkest point — sparing, for contrast only |
| **Accent indigo** | `#5B53F5` | Glow, highlight, one object. Never dominant |
| Support cyan | `#0FB5EC` | Optional secondary highlight |
| Support violet | `#9333EA` | Optional secondary highlight |

**Export settings**

- Format **WebP**, quality **82–88**. If your tool only exports PNG or JPG, generate at the listed size and convert — [Squoosh](https://squoosh.app) does this in the browser.
- Generate at the listed pixel size or larger, then downscale. Never upscale.
- Filenames and folders below are exact and case-sensitive. Create the folders under `public/`.

---

## 3. The images

### Group A — Hero and page features (3)

---

#### 1. Hero ambient

- **Save as** `public/images/hero/hero-ambient.webp`
- **Size** 2400 × 1400 (landscape, 12:7)
- **Appears** Behind and to the right of the main headline, at the very top of the home page. The largest image on the site.
- **Layout note** The headline, paragraph and two buttons sit over the **left 45%**. That area must be near-empty and very light, or the text becomes unreadable. Put all visual interest in the **right third**.

> Abstract architectural composition of translucent frosted glass planes floating in bright white space, arranged in a layered stepped formation receding into soft haze. Thin luminous edge-lighting in electric indigo traces the outer contours of each plane. Pale grey soft shadows fall beneath. The left third of the frame is almost entirely empty bright white atmosphere with only faint haze; all structure is concentrated in the right third. Extremely clean, weightless, precise. Bright high-key photography, light and airy, near-white background, soft diffused daylight, gentle grey shadows, clean minimal composition, generous negative space, premium editorial technology aesthetic, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, 8k, highly detailed.

**Check before saving:** cover the left 45% with your thumb — is what remains still a complete composition? Is the left side light enough that dark text would sit comfortably on it?

---

#### 2. Company introduction — the studio

- **Save as** `public/images/intro-workspace.webp`
- **Size** 1600 × 1200 (portrait-ish landscape, 4:3)
- **Appears** Beside the "Who we are" paragraphs, roughly a third of the way down.
- **Layout note** Displayed in a rounded rectangle, cropped to fill. Keep the subject centred — the extreme edges may be trimmed.

> Bright modern consulting studio interior in daytime. A floor-to-ceiling glass wall covered in abstract system diagrams drawn in thin indigo marker, backlit by large windows filled with soft white daylight. Two people stand in soft focus in the middle distance, out of focus enough that faces are not readable, gesturing toward the glass. Pale oak floors, white walls, light grey furniture, one indigo chair as the accent. Wide architectural framing, calm and uncluttered. Bright high-key photography, light and airy, soft diffused daylight, gentle grey shadows, generous negative space, premium editorial technology aesthetic, subtle film grain, professional commercial photography, 8k, highly detailed.

**Check before saving:** no readable text on the glass — abstract marks only. Faces indistinct.

---

#### 3. Why choose us — the desk

- **Save as** `public/images/why-choose-us.webp`
- **Size** 1400 × 1000 (landscape, 7:5)
- **Appears** Beside the six commitments.
- **Layout note** Empty space must be on the **right half** — a card overlaps it.

> Overhead flat-lay on a pale warm-grey desk surface. An open laptop sits in the upper left, its screen showing a soft indigo glow with no readable content. Beside it: a brushed aluminium ruler, two precision drafting pencils arranged at a clean angle, a white ceramic cup of black coffee, and a closed grey notebook. The entire right half of the frame is empty desk surface. Soft directional daylight from the upper left casts long gentle grey shadows. Minimal, precise, expensive. Bright high-key photography, light and airy, clean minimal composition, generous negative space, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, 8k, highly detailed.

**Check before saving:** right half genuinely empty. Laptop screen glowing but blank — no interface.

---

### Group B — Case study covers (4)

All four are **1600 × 1000** (landscape, 8:5), shown in a card with rounded corners. Keep the subject centred; edges may be cropped. These should feel like a matched set — same brightness, same treatment.

---

#### 4. Financial services — Northwind Capital

- **Save as** `public/images/case-studies/fintech-platform.webp`

> Bright modern financial trading desk in a white-walled office flooded with daylight. A large curved monitor displays abstract data visualisation — smooth indigo and cyan gradient line graphs and soft node networks, with no readable text or numbers. Light reflects off a pale glass desk surface. A second monitor sits out of focus behind. Clean, calm, precise, almost clinical. Bright high-key photography, light and airy, near-white background, soft diffused daylight, gentle grey shadows, generous negative space, premium editorial technology aesthetic, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, 8k, highly detailed.

---

#### 5. Healthcare — Helix Health

- **Save as** `public/images/case-studies/health-cloud.webp`

> Bright clinical technology environment with white surfaces and pale grey equipment, lit by soft even daylight. A tablet lies on a white counter displaying an abstract translucent data visualisation in soft indigo and cyan — flowing curves and gentle waveforms, no readable text or numbers. A single small green plant sits at the edge of frame. Calm, precise, reassuring, spotlessly clean. Bright high-key photography, light and airy, near-white background, soft diffused daylight, gentle grey shadows, generous negative space, premium editorial technology aesthetic, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, 8k, highly detailed.

---

#### 6. Retail & e-commerce — Meridian

- **Save as** `public/images/case-studies/retail-commerce.webp`

> Bright modern retail fulfilment facility with white walls and pale concrete floors, flooded with daylight from high skylights. Clean white and light grey conveyor systems curve through the frame carrying plain unbranded pale cardboard boxes. A robotic arm in brushed aluminium sits in soft focus in the middle distance. One indigo indicator light glows as the single accent. Spacious, orderly, calm. Bright high-key photography, light and airy, soft diffused daylight, gentle grey shadows, generous negative space, premium editorial technology aesthetic, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, 8k, highly detailed.

---

#### 7. Logistics — Atlas Freight

- **Save as** `public/images/case-studies/logistics-control.webp`

> Bright logistics control room with white walls and pale desks, lit by large windows. A wide wall display shows an abstract network map — smooth indigo and cyan connection lines over a very light grey field, with soft glowing nodes and no readable text, labels or place names. An empty ergonomic chair in light grey sits in the foreground. Spacious, quiet, well ordered. Bright high-key photography, light and airy, near-white background, soft diffused daylight, gentle grey shadows, generous negative space, premium editorial technology aesthetic, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, professional commercial photography, 8k, highly detailed.

---

### Group C — Insight article covers (3)

All three are **1600 × 900** (16:9), shown as small cards. **Abstract, not photographic** — these need to read instantly at roughly 400px wide, so keep them bold and simple. Treat them as a matched trio.

---

#### 8. AI & automation

- **Save as** `public/images/insights/ai-automation.webp`

> Abstract 3D render on a bright white background. Delicate luminous filaments in electric indigo and soft cyan branch and converge toward a single bright glowing core slightly right of centre. Filaments are thin, precise and evenly lit, casting no hard shadows. The outer thirds fade to clean white emptiness. Weightless, scientific, elegant. Bright high-key render, light and airy, near-white background, clean minimal composition, generous negative space, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, 8k, highly detailed.

---

#### 9. Cloud cost

- **Save as** `public/images/insights/cloud-cost.webp`

> Abstract isometric 3D render on a bright white background. Matte white and pale grey cubes float in a descending stepped arrangement from upper left to lower right, evenly spaced with soft grey contact shadows beneath each. Three cubes glow faintly indigo from within. Clean, architectural, weightless, plenty of white space around the arrangement. Bright high-key render, light and airy, near-white background, clean minimal composition, generous negative space, single electric indigo accent (#5B53F5), subtle film grain, 8k, highly detailed.

---

#### 10. Design systems

- **Save as** `public/images/insights/design-systems.webp`

> Abstract 3D render on a bright white background. Translucent frosted glass panels in various rectangular sizes float in a loose overlapping grid, each catching soft daylight at a slightly different angle. Two panels carry a faint indigo tint; the rest are clear and pale. Soft grey shadows fall between layers. Geometric, editorial, calm, with clean white space at the edges. Bright high-key render, light and airy, near-white background, clean minimal composition, generous negative space, single electric indigo accent (#5B53F5), subtle film grain, shallow depth of field, 8k, highly detailed.

---

### Group D — Testimonial portraits (3)

All three are **400 × 400**, square, displayed as a small circle roughly 56px across. Detail is lost at that size — what survives is the silhouette and the background tone, so keep backgrounds pale and the framing tight.

These are attributed to invented people; they are illustrative placeholders and should be replaced with real client photographs before launch.

---

#### 11. Portrait — Elena Vasquez, CTO

- **Save as** `public/images/team/avatar-01.webp`

> Professional corporate headshot of a woman in her mid-thirties with dark hair worn back, wearing a charcoal knit top, against a plain pale grey studio backdrop. Soft large key light from the front left, gentle fill, no harsh shadows. Calm confident expression, slight smile, looking directly at camera. Head and shoulders, tightly framed, centred, square crop. Bright high-key studio photography, light and airy, clean seamless background, natural skin tones, sharp focus on eyes, professional commercial portrait photography, 8k.

---

#### 12. Portrait — Dr. Marcus Chen, VP Clinical Systems

- **Save as** `public/images/team/avatar-02.webp`

> Professional corporate headshot of a man in his forties with short dark hair and glasses, wearing a charcoal blazer over a white shirt, against a plain warm pale grey studio backdrop. Soft large key light from the front right, gentle fill, no harsh shadows. Composed, approachable expression, looking directly at camera. Head and shoulders, tightly framed, centred, square crop. Bright high-key studio photography, light and airy, clean seamless background, natural skin tones, sharp focus on eyes, professional commercial portrait photography, 8k.

---

#### 13. Portrait — Priya Raghunathan, Director of Digital

- **Save as** `public/images/team/avatar-03.webp`

> Professional corporate headshot of a woman in her late twenties with long dark hair, wearing a crisp light blue shirt, against a plain bright off-white studio backdrop. Soft even frontal lighting, minimal shadow. Warm confident expression, looking directly at camera. Head and shoulders, tightly framed, centred, square crop. Bright high-key studio photography, light and airy, clean seamless background, natural skin tones, sharp focus on eyes, professional commercial portrait photography, 8k.

---

### Group E — Social sharing card (1)

---

#### 14. Default Open Graph image

- **Save as** `public/images/og/og-default.webp`
- **Size** 1200 × 630 (exactly — this is the ratio LinkedIn, Slack and X expect)
- **Appears** As the preview thumbnail whenever a page is shared.
- **Layout note** The site name and page title are overlaid in code across the **lower two-thirds**. That region must be near-empty and light.

> Abstract composition on a bright near-white field. A soft luminous gradient mesh in electric indigo, cyan and violet blooms across the upper right corner and dissolves smoothly into clean white. Very faint thin grey geometric grid lines run beneath. The lower two-thirds of the frame is almost entirely empty bright white space. Extremely minimal, premium, spacious. Bright high-key render, light and airy, near-white background, clean minimal composition, generous negative space, single electric indigo accent (#5B53F5), subtle film grain, 8k.

**Check before saving:** the bottom two-thirds must be light and empty enough that dark text placed there is legible.

---

## 4. Not needed — these are drawn in code

Do **not** generate these. They already exist as vector graphics, which stay razor-sharp at any size, adapt to the theme, and cost nothing to load. AI generators also mangle lettering, so logos in particular come out wrong.

- The **Media Radical logo** and mark
- The **eight client logos** in the "trusted by" strip
- All **service and industry icons** (24 hand-drawn SVG icons)
- All **technology logos** (React, AWS, Terraform, and the rest)
- The **hero background gradient**, grid and grain — CSS, and theme-aware

---

## 5. Where the files go

```
public/
└── images/
    ├── hero/
    │   └── hero-ambient.webp              2400 × 1400
    ├── intro-workspace.webp               1600 × 1200
    ├── why-choose-us.webp                 1400 × 1000
    ├── case-studies/
    │   ├── fintech-platform.webp          1600 × 1000
    │   ├── health-cloud.webp              1600 × 1000
    │   ├── retail-commerce.webp           1600 × 1000
    │   └── logistics-control.webp         1600 × 1000
    ├── insights/
    │   ├── ai-automation.webp             1600 × 900
    │   ├── cloud-cost.webp                1600 × 900
    │   └── design-systems.webp            1600 × 900
    ├── team/
    │   ├── avatar-01.webp                 400 × 400
    │   ├── avatar-02.webp                 400 × 400
    │   └── avatar-03.webp                 400 × 400
    └── og/
        └── og-default.webp                1200 × 630
```

Drop the files in and refresh — no code change, no rebuild step, no configuration. If a file is missing, that slot keeps its gradient placeholder and everything else still works.

---

## 6. Final check on every image

1. Would this look at home on a white page? If it darkens the layout, regenerate it brighter.
2. Is there any text, lettering or logo anywhere in it? Regenerate — this is the most common failure.
3. Is the named empty area actually empty?
4. Is indigo an accent rather than the background?
5. Does it sit at the exact path and pixel size listed?
6. Do the four case-study covers look like a set? Do the three insight covers?

If you want a different look overall — warmer, more photographic, more abstract — tell me and I will rewrite the whole set to match. Consistency across the fourteen matters far more than any single image.
