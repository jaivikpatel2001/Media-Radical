'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/animations/core/gsap';
import { prefersReducedMotion, revealImmediately } from '@/animations/core/reducedMotion';
import { countScope } from '@/animations/presets/counter';
import { parallaxScope } from '@/animations/presets/parallax';
import { revealScope } from '@/animations/presets/reveal';
import { splitLines } from '@/animations/presets/splitLines';
import { heroScene } from '@/animations/scenes/hero';
import { processScene } from '@/animations/scenes/process';

export type SceneName = 'hero' | 'process' | 'stats' | 'caseStudies';

/** Bespoke timelines, keyed by the `scene` prop. */
const SCENES: Partial<Record<SceneName, (root: HTMLElement) => void>> = {
  hero: heroScene,
  process: processScene,
};

interface ScrollSceneProps {
  children: React.ReactNode;
  /** Runs a bespoke timeline in addition to the shared presets. */
  scene?: SceneName;
  className?: string;
  /** Rendered element. Sections pass `section`; wrappers keep the default. */
  as?: 'div' | 'section';
  id?: string;
  /**
   * Forwarded explicitly. When `as="section"` this element IS the landmark,
   * so without these it would be an unnamed region — which is exactly what
   * happened before they were added.
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

/**
 * The client boundary for scroll animation.
 *
 * This is what keeps sections as Server Components: the section renders plain
 * markup carrying `data-anim` / `data-parallax` / `data-count` attributes,
 * and this thin wrapper is the only part shipped to the browser. It holds the
 * ref, runs the presets against that scope, and lets `useGSAP` handle
 * teardown — which is what makes it safe under React 19's StrictMode double
 * invoke, where hand-rolled cleanup reliably leaves duplicate ScrollTriggers.
 */
export function ScrollScene({
  children,
  scene,
  className,
  as: Tag = 'div',
  id,
  ...aria
}: ScrollSceneProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      if (prefersReducedMotion()) {
        revealImmediately(element);
        return;
      }

      const splits = splitLines(element);
      revealScope(element);
      parallaxScope(element);
      countScope(element);

      if (scene) SCENES[scene]?.(element);

      // `useGSAP` reverts tweens and triggers created in this scope, but
      // SplitText mutates the DOM and must be reverted explicitly.
      return () => splits.forEach((split) => split.revert());
    },
    { scope: root, dependencies: [scene] },
  );

  return (
    <Tag
      ref={root as React.Ref<HTMLDivElement & HTMLElement>}
      className={className}
      id={id}
      data-scene={scene}
      {...aria}
    >
      {children}
    </Tag>
  );
}

export { gsap };
