'use client';

import { MEDIA } from '@/constants/breakpoints';

import { gsap, ScrollTrigger } from '../core/gsap';

/**
 * Process — pinned horizontal scroll.
 *
 * On desktop the section pins and vertical wheel input drives the step track
 * sideways. This is the page's one genuinely scroll-driven moment, and it
 * earns its cost: six sequential steps are exactly the content that benefits
 * from being paced by the reader rather than listed.
 *
 * Below the desktop breakpoint it degrades to a plain vertical list with no
 * pin at all — horizontal pinning on a touch device fights the native scroll
 * axis and always feels broken.
 *
 * `gsap.matchMedia` is what makes the two branches safe: it disposes of every
 * tween and trigger in a branch when its query stops matching, so resizing
 * across the breakpoint cannot leave a stale pin behind.
 */
export function processScene(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('[data-process-track]');
  const viewport = root.querySelector<HTMLElement>('[data-process-viewport]');
  const progress = root.querySelector<HTMLElement>('[data-process-progress]');

  if (!track || !viewport) return;

  const mm = gsap.matchMedia();

  mm.add(MEDIA.desktop, () => {
    // Distance the track must travel to bring its last card flush right.
    const distance = () => track.scrollWidth - viewport.clientWidth;
    if (distance() <= 0) return;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        pin: true,
        // Anti-aliasing on a pinned element differs from an unpinned one;
        // this keeps text from shifting weight the moment the pin engages.
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.7,
        // Scroll distance is the horizontal distance, so the pace of the
        // sideways movement matches the wheel one-to-one.
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true,
      },
    });

    if (progress) {
      gsap.fromTo(
        progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        },
      );
    }

    return () => {
      tween.kill();
    };
  });

  mm.add(MEDIA.mobile, () => {
    // No pin. Cards stack and reveal individually.
    const cards = gsap.utils.toArray<HTMLElement>('[data-process-card]', root);
    gsap.set(track, { clearProps: 'x' });

    const tweens = cards.map((card) =>
      gsap.fromTo(
        card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        },
      ),
    );

    return () => tweens.forEach((tween) => tween.kill());
  });

  // Card widths depend on the fluid gutter, so a resize changes the travel.
  ScrollTrigger.addEventListener('refreshInit', () =>
    gsap.set(track, { x: 0 }),
  );
}
