'use client';

import { DURATION, GSAP_EASE, TRIGGER } from '@/constants/motion';

import { gsap, SplitText } from '../core/gsap';

/**
 * Headline line-reveal — each line rises out of its own mask.
 *
 * Uses SplitText's `autoSplit`, which re-splits when the element reflows or a
 * webfont finishes loading. Without it, a heading split before Inter swaps in
 * keeps the fallback font's line breaks and the masks land in the wrong
 * places. The animation is returned from `onSplit` so GSAP disposes of the
 * previous one on every re-split.
 *
 * `mask: 'lines'` builds the clipping wrappers, so there is no hand-rolled
 * markup and the element's DOM is restored exactly on revert.
 */
export function splitLines(scope: HTMLElement): SplitText[] {
  const targets = gsap.utils.toArray<HTMLElement>('[data-anim="lines"]', scope);

  return targets.map((element) => {
    const delay = Number(element.dataset.animDelay ?? 0);
    // The hero fires on load; everything below the fold waits for scroll.
    const immediate = element.dataset.animTrigger === 'load';

    return SplitText.create(element, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'splitLine',
      autoSplit: true,
      onSplit(self) {
        // Raise the container only once the lines are already translated out
        // of their masks — otherwise the untransformed text flashes.
        gsap.set(element, { opacity: 1 });

        return gsap.from(self.lines, {
          yPercent: 108,
          duration: DURATION.cinematic,
          ease: GSAP_EASE.outExpo,
          stagger: 0.09,
          delay,
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: element,
                  start: element.dataset.animStart ?? TRIGGER.reveal,
                  once: true,
                },
              }),
        });
      },
    });
  });
}
