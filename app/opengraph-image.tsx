import { ImageResponse } from 'next/og';

import { site } from '@/data/site';

/**
 * Social sharing card.
 *
 * Generated rather than authored: the audit found the page had no `og:image`
 * or `twitter:image` at all, so every share on LinkedIn, Slack or X rendered
 * as a bare text link. Building it here means the card exists today, stays in
 * sync with `data/site.ts`, and needs no asset from the image manifest.
 *
 * Next.js statically optimises this at build time — it is generated once and
 * cached, not rendered per request. Next also derives `twitter:image` from
 * this same file convention, so both are covered.
 *
 * No custom font is loaded on purpose: reading a font file here would add a
 * build-time dependency on an asset for a surface nobody views at full size.
 */
export const alt = `${site.name}: ${site.tagline}`;

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#ffffff',
          // The accent bloom from the hero, flattened. Satori supports
          // gradients but not filters, so the softness is baked into the
          // colour stops instead of a blur.
          backgroundImage:
            'radial-gradient(900px 500px at 78% 12%, rgba(91,83,245,0.20), rgba(255,255,255,0) 70%), radial-gradient(700px 460px at 20% 96%, rgba(62,207,255,0.16), rgba(255,255,255,0) 70%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '999px',
              backgroundColor: '#5b53f5',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#0b0b0e',
              letterSpacing: '-0.02em',
            }}
          >
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '78px',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: '#0b0b0e',
            maxWidth: '900px',
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '28px',
            color: '#55555f',
            letterSpacing: '-0.01em',
          }}
        >
          Web · Mobile · Cloud · AI — built and supported in-house
        </div>
      </div>
    ),
    size,
  );
}
