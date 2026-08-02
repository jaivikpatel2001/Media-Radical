import Image from 'next/image';

import type { MediaAsset } from '@/types/common';
import { assetExists, placeholderHue } from '@/utils/assets';
import { cx } from '@/utils/cx';

import styles from './Media.module.css';

interface MediaProps {
  asset: MediaAsset;
  /** Responsive `sizes`. Always pass it — it decides which file is fetched. */
  sizes: string;
  /** Only the hero image should be priority; it is the LCP element. */
  priority?: boolean;
  className?: string;
  /** CSS aspect-ratio, e.g. "16 / 9". Omit to use the asset's own ratio. */
  ratio?: string;
  /** Shown in the placeholder corner while the real file is missing. */
  placeholderLabel?: string;
}

/**
 * An image slot that is complete whether or not the file exists yet.
 *
 * Existence is resolved on the server at build time (see utils/assets.ts), so
 * this stays a Server Component: no client JavaScript, no broken-image flash,
 * no 404 request. Missing files render a gradient-mesh placeholder in the same
 * visual language as the rest of the page.
 */
export function Media({
  asset,
  sizes,
  priority = false,
  className,
  ratio,
  placeholderLabel,
}: MediaProps) {
  const style = ratio
    ? ({ aspectRatio: ratio } as React.CSSProperties)
    : undefined;

  if (!assetExists(asset.src)) {
    return (
      <div
        className={cx(styles.wrap, className)}
        style={{
          ...style,
          ['--ph-hue' as string]: placeholderHue(asset.src),
        }}
        // Decorative until it holds a real image; the alt text belongs to the
        // asset, not to a stand-in for it.
        aria-hidden="true"
      >
        <div className={styles.placeholder}>
          <div className={styles.placeholderGrid} />
          {placeholderLabel ? (
            <span className={cx(styles.placeholderMark, 'label')}>
              {placeholderLabel}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cx(styles.wrap, className)} style={style}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        quality={80}
        className={styles.image}
        placeholder={asset.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={asset.blurDataURL}
      />
    </div>
  );
}
