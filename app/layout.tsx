import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Poppins } from 'next/font/google';

import { AppProviders } from '@/components/providers/AppProviders';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { site } from '@/data/site';

import './globals.css';

/**
 * Fonts are self-hosted by next/font — no external request, no layout shift,
 * and the CSS variables below are what styles/typography.css builds its
 * stacks from.
 *
 * Three faces, each with one job:
 *
 *   Poppins        headings, buttons, nav — geometric, friendly, distinctive.
 *                  Deliberately NOT used for body copy: its wide, perfectly
 *                  circular letterforms and short descenders are what make it
 *                  striking at 60px and tiring at 16px over a full paragraph.
 *
 *   Inter          body copy. Neutral on purpose — it stays out of the way so
 *                  Poppins carries the personality, and it is the best-drawn
 *                  free face for text at reading sizes.
 *
 *   IBM Plex Mono  eyebrows, labels, figures. Slightly warm and rounded,
 *                  which sits with Poppins better than a colder grotesque
 *                  mono would.
 */
const poppins = Poppins({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  // Poppins is not variable, so every weight is a separate file. Four is the
  // most the design actually uses — do not add more without a reason.
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // The SEO audit found no canonical tag on the page. Relative values are
  // resolved against `metadataBase` above, and each route can override this
  // with its own path as the remaining page groups land.
  alternates: { canonical: '/' },
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Light is the default theme, so the browser chrome matches it. Dark is
  // opt-in and swaps `data-theme`, which carries its own `color-scheme`.
  themeColor: '#ffffff',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Runs before first paint. Two jobs, both of which React is structurally too
 * late to do:
 *
 *  1. Apply the theme. Light is the default and the design baseline — the OS
 *     preference is deliberately not consulted, so every visitor sees the
 *     light composition until they opt into dark, and that choice persists.
 *  2. Add `.js-motion`, which is what arms every initial hidden state in
 *     styles/motion.css. Withholding it means a no-JS or reduced-motion
 *     visitor is served fully painted content that never depends on a script.
 */
const bootScript = `
(function(){
  var d=document.documentElement;
  var t='light';
  try{
    var s=localStorage.getItem('mr-theme');
    if(s==='dark'){t='dark'}
  }catch(e){}
  d.setAttribute('data-theme',t);
  try{
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      d.classList.add('js-motion')
    }
  }catch(e){}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <AppProviders>
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
