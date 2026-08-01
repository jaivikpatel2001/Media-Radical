'use client';

import { TRIGGER } from '@/constants/motion';
import { formatNumber } from '@/utils/format';

import { gsap } from '../core/gsap';

/**
 * Counts `[data-count]` elements up to their target when scrolled into view.
 *
 * The element's server-rendered text is already the final formatted value, so
 * the real number is in the HTML for crawlers and for anyone without JS. The
 * tween only overwrites it while running.
 *
 * Accessibility: the animating text is `aria-hidden` in the markup and the
 * final value is repeated in a visually-hidden sibling, so a screen reader
 * announces "128" once rather than reading a blur of intermediate numbers.
 *
 *   <span data-count="128" data-count-precision="0">128</span>
 */
export function countScope(scope: HTMLElement): void {
  const targets = gsap.utils.toArray<HTMLElement>('[data-count]', scope);

  targets.forEach((element) => {
    const target = Number(element.dataset.count ?? 0);
    if (!Number.isFinite(target)) return;

    const precision = Number(element.dataset.countPrecision ?? 0);
    const state = { value: 0 };

    const render = () => {
      element.textContent =
        precision > 0
          ? state.value.toFixed(precision)
          : formatNumber(Math.round(state.value));
    };

    gsap.to(state, {
      value: target,
      duration: 2.1,
      // Decelerating rather than easing out hard: the last few digits should
      // still be readable as they settle.
      ease: 'power2.out',
      onUpdate: render,
      scrollTrigger: {
        trigger: element,
        start: TRIGGER.reveal,
        once: true,
        // Zero the display only as the counter enters, so the server-rendered
        // value stays on screen until the moment it starts moving.
        onEnter: render,
      },
    });
  });
}
