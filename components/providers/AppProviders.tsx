'use client';

import { MotionConfig } from 'motion/react';

import { EASE } from '@/constants/motion';

import { SmoothScrollProvider } from './SmoothScrollProvider';
import { ThemeProvider } from './ThemeProvider';

/**
 * The single client boundary wrapping the app.
 *
 * `reducedMotion="user"` makes every Motion component in the tree honour the
 * OS preference without a per-component check — layer 2 of the four-layer
 * reduced-motion strategy described in styles/motion.css.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.32, ease: [...EASE.outExpo] }}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
