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
    // Read once per frame from the live computed style, so the sphere
    // follows a theme change without being rebuilt.
    const styleOf = getComputedStyle(canvas);
    const readColours = () => ({
      base: styleOf.getPropertyValue('--cloud-icon').trim() || '#0b0b0e',
      accent: styleOf.getPropertyValue('--cloud-icon-front').trim() || '#5b53f5',
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

      const { base, accent } = readColours();
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
        context.globalAlpha = 0.2 + depth * 0.8;
        // The frontmost icons pick up the accent; the rest stay neutral, so
        // the sphere reads as one object rather than a bag of brand colours.
        context.fillStyle = depth > 0.82 ? accent : base;
        context.fill(item.point.glyph);
        context.restore();
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
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
