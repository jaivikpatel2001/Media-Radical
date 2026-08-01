'use client';

import { gsap } from '../core/gsap';

/**
 * Process — sticky stacked cards.
 *
 * This section used to pin and scroll horizontally. That was replaced because
 * pinning is the one ScrollTrigger feature that genuinely fights a smooth
 * scroller: the pin swaps the element to `position: fixed` and re-measures,
 * while Lenis is interpolating the scroll position on its own clock. The two
 * disagree by a frame and the result is visible jitter. Two of the section's
 * own rules made it worse — `overflow: hidden` on the section broke the
 * containing block for the pinned element, and the same rule silently
 * disables `position: sticky` for anything inside it.
 *
 * The replacement uses no pin at all. The cards are `position: sticky` with a
 * stepped offset, so they stack into a deck as you scroll — handled entirely
 * by the compositor, which is why it stays smooth regardless of what the
 * scroll position is doing.
 *
 * All that is left for JavaScript is the progress rail. That is a `scaleX`
 * tween — a transform, so it composites too, and it cannot jitter the layout
 * even if it lags a frame.
 */
export function processScene(root: HTMLElement): void {
  const progress = root.querySelector<HTMLElement>('[data-process-progress]');
  const track = root.querySelector<HTMLElement>('[data-process-track]');

  if (!progress || !track) return;

  gsap.fromTo(
    progress,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: track,
        start: 'top 65%',
        end: 'bottom bottom',
        scrub: 0.4,
      },
    },
  );
}
