---
version: alpha
name: Stripe Modern
description: A bright, editorial, high-contrast financial platform with bold color accents and lightweight UI chrome.
colors:
  primary: "#533AFD"
  secondary: "#0A2540"
  tertiary: "#B9B9F9"
  neutral: "#FFFFFF"
  surface: "#F6F9FC"
  on-surface: "#0A2540"
  muted: "#6B7C93"
  border: "#E6EBF1"
  accent: "#FF9900"
  accent-2: "#F95FA2"
  success: "#81B81A"
  error: "#D93B3B"
typography:
  headline-display:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 64px
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline-lg:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  body-sm:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  label-lg:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0em"
  label-md:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0em"
  label-sm:
    fontFamily: "sohne-var, SF Pro Display, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 12px
  xl: 24px
  full: 9999px
spacing:
  xs: 6px
  sm: 14px
  md: 24px
  lg: 40px
  xl: 96px
  gutter: 24px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: 15px 24px
    height: 48px
  button-primary-hover:
    backgroundColor: "#4630F0"
    textColor: "{colors.neutral}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: 15px 24px
    height: 48px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: 15px 24px
    height: 48px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 8px
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 14px 16px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px 12px
---

# Stripe Modern

## Overview
Stripe’s visual language feels polished, optimistic, and technically confident. The page balances enterprise credibility with a vibrant, almost celebratory energy through a large white canvas, delicate blue rules, and sweeping gradient ribbons. It reads as spacious and editorial rather than dense, aimed at product-led businesses and developers who value clarity and trust.

## Colors
- **Primary (#533AFD):** The signature electric violet used for primary actions, links, and key emphasis. It gives the system its modern, digital energy.
- **Secondary (#0A2540):** A deep ink-blue used for prominent text, navigation, and brand credibility. It anchors the brighter accent colors.
- **Tertiary (#B9B9F9):** A soft periwinkle support color that works for borders, subtle highlights, and hover-friendly contrast.
- **Neutral (#FFFFFF):** The dominant background color that keeps the interface airy and gives the hero artwork room to breathe.
- **Surface (#F6F9FC):** A very light cool tint for cards and section backgrounds when separation is needed without heaviness.
- **On-surface (#0A2540):** The default readable text color for content on white and pale surfaces.
- **Muted (#6B7C93):** A softened blue-gray for secondary copy, metadata, and de-emphasized labels.
- **Border (#E6EBF1):** A faint divider color used for rules, nav separators, and quiet structural lines.
- **Accent (#FF9900):** A warm orange from the gradient spectrum that adds momentum and energy to the brand visuals.
- **Accent-2 (#F95FA2):** A vivid pink accent used in the ribbon artwork and playful highlights.
- **Success (#81B81A):** A clear green reserved for positive states and trusted confirmations.
- **Error (#D93B3B):** A firm red for validation errors and destructive feedback.

## Typography
The system uses a clean sans-serif stack led by `sohne-var`, with `SF Pro Display` and generic sans-serif fallbacks. Headings are light-weight and tightly tracked, which makes the copy feel elegant, contemporary, and editorial rather than loud. Body text is also light, but slightly more open in leading to preserve readability across long marketing paragraphs.

`headline-display`, `headline-lg`, and `headline-md` should be used for hero and section messaging, with the light 300 weight creating Stripe’s signature refined tone. `body-lg`, `body-md`, and `body-sm` support explanatory copy, legal text, and long-form content without visual clutter. `label-lg`, `label-md`, and `label-sm` are better for buttons, nav items, and small metadata, where a more neutral weight improves legibility.

Letter spacing is subtly negative on headlines and body copy, matching the compressed, premium feel in the screenshot. Labels remain close to neutral tracking, while smaller labels can use a slight positive adjustment for clarity. Uppercase styling is not dominant; the system relies more on weight, scale, and color than on all-caps treatment.

## Layout & Spacing
The layout is built around a fixed, centered content column with wide outer margins and generous whitespace. The hero area feels like a carefully framed editorial spread: navigation sits at the top, content aligns left, and a large abstract ribbon spans the right side for visual drama. Section rhythm is spacious, with large vertical gaps between major blocks and restrained spacing inside smaller UI elements.

Use the spacing scale to preserve that calm pacing: `xs` and `sm` for tight UI details, `md` for standard component padding, and `lg` to `xl` for section separation. The `section` token should be reserved for major transitions between page bands. Cards and panels should remain lightly padded rather than heavily boxed, so the page continues to feel open and fluid.

## Elevation & Depth
The interface is intentionally flat, with depth expressed through contrast, layering, and faint dividers rather than heavy shadows. The main hero artwork overlaps the page to create motion, but the surrounding content remains visually lightweight. When elevation is needed, it should be subtle and ambient, not dramatic.

Use the `card` shadow sparingly and only for content that needs separation from the white canvas. Borders are thin and pale, especially in navigation and structural separators. Avoid stacking multiple shadow styles; Stripe’s hierarchy comes more from typography, spacing, and color accents than from pronounced depth.

## Shapes
The shape language is soft and restrained, with small radii on interactive controls and slightly more rounded cards. Buttons feel precise and engineered at `4px`, while cards can move to `6px` for a calmer container treatment. The overall impression is clean and controlled, with no pill-heavy or overly bubbly forms except for chip-like UI when necessary.

## Components
**Buttons**
- Primary buttons should use `button-primary`: violet fill, white text, `rounded.sm`, and a 48px height. They are the main conversion action and should feel compact but confident.
- Secondary buttons should use `button-secondary`: white fill, violet text, and a subtle cool border. They work well for alternate actions like sign-in or sign-up variants.
- Tertiary buttons and links should use `button-tertiary` for minimal, text-only interactions.
- Hover states should deepen the primary violet slightly, but keep the same shape and size.
- Button padding should stay balanced and modest; the visual weight comes from color and contrast, not oversized chrome.

**Cards**
- Cards are mostly white, lightly padded, and only softly elevated.
- Use `card` for content modules, logos, and supporting sections where a quiet boundary is needed.
- Keep card corners modest; do not introduce large radii or strong shadows.

**Inputs**
- Inputs should feel simple, airy, and bordered rather than boxed.
- Use `input` with white background, subtle border treatment, and the body text style for field values.
- Focus states should rely on clear color changes and border emphasis, not heavy glow effects.

**Chips**
- Chips should use `chip` with a soft surface fill and fully rounded ends.
- Keep chip labels small and restrained so they support content rather than compete with it.

**Navigation and Links**
- Top-level navigation uses quiet text links with small chevrons for disclosure.
- Links should default to the primary violet and remain visually light.
- The sign-in treatment can be a secondary button, while the conversion CTA should remain the primary filled button.

**Hero and Marketing Modules**
- Large headlines should be set in `headline-lg` or `headline-md` with generous line height and negative letter spacing.
- Highlight words can shift into the primary violet or a gradient-adjacent accent, but the paragraph structure should stay highly readable.
- Supporting logos and trust marks should be centered within a calm, low-contrast band.

## Do's and Don'ts
- Do keep layouts spacious, centered, and editorial.
- Do use the primary violet for calls to action and interactive emphasis.
- Do rely on typography scale and whitespace for hierarchy.
- Do keep borders thin and shadows minimal.
- Don't introduce heavy gradients into standard UI components; reserve them for hero artwork and special brand moments.
- Don't use dark fills broadly across the page; the canvas should stay predominantly white.
- Don't make buttons overly rounded or oversized; keep the compact, engineered feel.
- Don't overuse decorative effects that compete with the clean financial-brand presentation.
