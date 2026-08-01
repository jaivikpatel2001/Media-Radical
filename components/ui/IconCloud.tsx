'use client';

import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '@/animations/core/reducedMotion';
import type { TechLogo } from '@/components/icons/techLogos';
import { cx } from '@/utils/cx';

import styles from './IconCloud.module.css';

interface IconCloudProps {
  logos: TechLogo[];
  className?: string;
  /** Degrees per second of idle rotation. */
  speed?: number;
  /** Announced to screen readers in place of the canvas. */
  label: string;
}

interface Point {
  x: number;
  y: number;
  z: number;
  logo: TechLogo;
  glyph: Path2D;
  /** Brand colour, parsed once. */
  rgb: [number, number, number];
  /** Brand colour adjusted for the current background. Recomputed on theme change. */
  fill: string;
}

/* -------------------------------------------------------------------------
   Colour helpers.

   Every icon is drawn in its own brand colour. A handful of brands are pure
   black (Next.js, Vercel) or near-black (Kafka) — correct on the white canvas
   and invisible on the dark one, where they measure 1.07:1. Rather than drop
   the branding, the colour is nudged toward the background's opposite only as
   far as it takes to become visible, so the hue is preserved and the mark
   stays recognisable.
   ------------------------------------------------------------------------- */

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

const channelLuminance = (channel: number): number => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgb): number =>
  0.2126 * channelLuminance(r) +
  0.7152 * channelLuminance(g) +
  0.0722 * channelLuminance(b);

const contrast = (a: Rgb, b: Rgb): number => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const mix = (from: Rgb, to: Rgb, amount: number): Rgb =>
  [0, 1, 2].map((i) =>
    Math.round(from[i] + (to[i] - from[i]) * amount),
  ) as Rgb;

/**
 * Blends `colour` toward white or black — whichever opposes the background —
 * in small steps, stopping the moment it clears `minRatio`. Because it steps
 * in tenths and exits early, a colour that is already visible is returned
 * untouched, and one that is not is changed as little as possible.
 *
 * 2.0 is deliberately low. These are large decorative glyphs, not text, and
 * the goal is to preserve official branding — a text-grade ratio would wash
 * every hue out. At this threshold 21 of the 22 hero logos render at their
 * exact brand hex on the light canvas.
 *
 * The exceptions, measured:
 *   React  #61DAFB  1.62:1 on white — the one light-theme adjustment
 *   Next.js / Vercel #000000  1.07:1 on the dark canvas
 *   Kafka  #231F20  1.21:1 on the dark canvas
 */
function ensureVisible(colour: Rgb, background: Rgb, minRatio = 2.0): string {
  const toward: Rgb = luminance(background) > 0.5 ? [0, 0, 0] : [255, 255, 255];
  let result = colour;

  for (let step = 0; step <= 10; step += 1) {
    if (contrast(result, background) >= minRatio) break;
    result = mix(colour, toward, step / 10);
  }

  return `rgb(${result[0]} ${result[1]} ${result[2]})`;
}

/** Simple-icons paths are drawn on a 24x24 grid. */
const GRID = 24;
const DRAG_INERTIA = 0.94;

/**
 * A rotating sphere of technology logos.
 *
 * Modelled on Magic UI's Icon Cloud, but rewritten rather than installed —
 * that component ships as a shadcn/Tailwind registry entry, and this project
 * uses CSS Modules with no utility framework. Two other things changed in the
 * port, both deliberate:
 *
 *  1. Magic UI rasterises each icon by calling `renderToString` from
 *     `react-dom/server` inside a Client Component, which pulls the whole
 *     server renderer into the browser bundle. Here the icons are plain SVG
 *     path strings turned into `Path2D` objects, so nothing extra ships.
 *  2. It fetches brand logos from a CDN. These are local (see
 *     components/icons/techLogos.ts) — no external request, and they inherit
 *     the theme instead of arriving in fixed brand colours.
 *
 * Points are distributed with a Fibonacci sphere, which spaces them evenly
 * without the clustering at the poles that naive spherical coordinates give.
 * Depth is conveyed by scale and opacity, so icons at the back recede rather
 * than overlapping the front ones at full strength.
 */
export function IconCloud({
  logos,
  className,
  speed = 9,
  label,
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  // Everything the animation loop touches lives in refs: reading it from
  // state would re-run the effect and rebuild the sphere on every frame.
  const rotation = useRef({ x: 0.32, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const drag = useRef<{ active: boolean; lastX: number; lastY: number }>({
    active: false,
    lastX: 0,
    lastY: 0,
  });
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const togglePaused = useCallback(() => setPaused((value) => !value), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reduced = prefersReducedMotion();

    /* ---------------------------------------------------------- geometry */
    const points: Point[] = logos.map((logo, index) => {
      // Fibonacci sphere: even spacing, no polar clustering.
      const offset = 2 / logos.length;
      const increment = Math.PI * (3 - Math.sqrt(5));
      const y = index * offset - 1 + offset / 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = index * increment;

      return {
        x: Math.cos(phi) * radius,
        y,
        z: Math.sin(phi) * radius,
        logo,
        glyph: new Path2D(logo.path),
        rgb: hexToRgb(logo.hex),
        // Filled in by refreshFills() below, which also reruns on theme change.
        fill: logo.hex,
      };
    });

    /* ------------------------------------------------------------ sizing */
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap the device pixel ratio: beyond 2 the extra pixels cost real
      // fill-rate on a canvas this size and nobody can see the difference.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    /* ------------------------------------------------------------ colour */
    const styleOf = getComputedStyle(canvas);

    const readBackground = (): Rgb => {
      const raw = styleOf.getPropertyValue('--cloud-bg').trim();
      const parts = raw.match(/[\d.]+/g);
      if (parts && parts.length >= 3) {
        return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
      }
      return [255, 255, 255];
    };

    // Adjusting every icon costs a few hundred operations, so it runs only
    // when the background actually changes — on mount and on a theme flip —
    // rather than on every frame.
    let lastBackground = '';
    const refreshFills = () => {
      const background = readBackground();
      const key = background.join(',');
      if (key === lastBackground) return;
      lastBackground = key;
      points.forEach((point) => {
        point.fill = ensureVisible(point.rgb, background);
      });
    };

    refreshFills();

    // The theme toggle rewrites data-theme on <html>; watch it so the sphere
    // re-derives its colours without being rebuilt.
    const themeObserver = new MutationObserver(() => {
      lastBackground = '';
      refreshFills();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    /* ------------------------------------------------------------- input */
    const onPointerDown = (event: PointerEvent) => {
      drag.current = { active: true, lastX: event.clientX, lastY: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = event.clientX - drag.current.lastX;
      const dy = event.clientY - drag.current.lastY;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;

      rotation.current.y += dx * 0.006;
      rotation.current.x += dy * 0.006;
      // Carry the throw into inertia when the pointer lifts.
      velocity.current = { x: dy * 0.0016, y: dx * 0.0016 };
    };

    const onPointerUp = (event: PointerEvent) => {
      drag.current.active = false;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    /* -------------------------------------------------------------- loop */
    let frame = 0;
    let last = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Idle spin, unless paused, being dragged, or motion is reduced.
      // `speed` is degrees per second; convert to radians for this frame.
      if (!pausedRef.current && !drag.current.active && !reduced) {
        rotation.current.y += ((speed * Math.PI) / 180) * delta;
      }

      // Inertia after a throw.
      if (!drag.current.active) {
        rotation.current.x += velocity.current.x;
        rotation.current.y += velocity.current.y;
        velocity.current.x *= DRAG_INERTIA;
        velocity.current.y *= DRAG_INERTIA;
      }

      // Stop the sphere tipping past its poles.
      rotation.current.x = Math.max(-1.1, Math.min(1.1, rotation.current.x));

      const cx0 = width / 2;
      const cy0 = height / 2;
      const sphereRadius = Math.min(width, height) * 0.38;
      const iconSize = Math.min(width, height) * 0.1;

      context.clearRect(0, 0, width, height);

      const sinX = Math.sin(rotation.current.x);
      const cosX = Math.cos(rotation.current.x);
      const sinY = Math.sin(rotation.current.y);
      const cosY = Math.cos(rotation.current.y);

      const projected = points.map((point) => {
        // Rotate about Y, then X.
        const x1 = point.x * cosY - point.z * sinY;
        const z1 = point.x * sinY + point.z * cosY;
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;
        return { point, x: x1, y: y2, z: z2 };
      });

      // Painter's algorithm: back to front, so near icons overlap far ones.
      projected.sort((a, b) => a.z - b.z);

      for (const item of projected) {
        // z runs -1 (back) to 1 (front).
        const depth = (item.z + 1) / 2;
        const scale = 0.55 + depth * 0.65;
        const size = iconSize * scale;

        context.save();
        context.translate(
          cx0 + item.x * sphereRadius,
          cy0 + item.y * sphereRadius,
        );
        context.scale(size / GRID, size / GRID);
        context.translate(-GRID / 2, -GRID / 2);
        // Each icon in its own brand colour. Depth is carried entirely by
        // scale and alpha, so the far side recedes without desaturating —
        // the colours stay recognisable all the way round.
        context.globalAlpha = 0.45 + depth * 0.55;
        context.fillStyle = item.point.fill;
        context.fill(item.point.glyph);
        context.restore();
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, [logos, speed]);

  return (
    <div className={cx(styles.wrap, className)}>
      {/* The canvas carries no information a screen reader can use, so the
          technology names are exposed as real text instead. */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <p className="visuallyHidden">
        {label} {logos.map((logo) => logo.title).join(', ')}.
      </p>

      <button
        type="button"
        className={styles.pause}
        onClick={togglePaused}
        aria-label={paused ? 'Resume the rotating logos' : 'Pause the rotating logos'}
      >
        {paused ? (
          <Play size={11} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Pause size={11} strokeWidth={2} aria-hidden="true" />
        )}
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
