import type { SectionIntro } from '@/types/common';
import { cx } from '@/utils/cx';

import { Button } from './Button';
import { Emphasis } from './Emphasis';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  content: SectionIntro;
  /** `split` is the editorial default; `centred` for short, punchy sections. */
  align?: 'split' | 'stacked' | 'centred';
  /** Heading level. Every page has exactly one h1, so sections default to h2. */
  as?: 'h2' | 'h3';
  /** Type scale for the heading. */
  size?: 'md' | 'sm';
  /** Links the section landmark to this heading. */
  id?: string;
  className?: string;
}

/**
 * The standard section header: eyebrow, heading with optional serif emphasis,
 * lede and CTA. Used by every section on every page group, which is what
 * keeps the vertical rhythm identical from Home to a service detail page.
 */
export function SectionHeading({
  content,
  align = 'split',
  as: Tag = 'h2',
  size = 'md',
  id,
  className,
}: SectionHeadingProps) {
  const { eyebrow, heading, emphasis, lede, cta } = content;

  return (
    <header
      className={cx(
        styles.header,
        align === 'split' && styles.split,
        align === 'centred' && styles.centred,
        className,
      )}
    >
      <p className={cx(styles.eyebrow, 'eyebrow')} data-anim="fade-up-sm">
        {eyebrow}
      </p>

      <Tag
        id={id}
        className={cx(
          styles.heading,
          size === 'md' ? 'display-sm' : 'display-xs',
        )}
        data-anim="lines"
      >
        <Emphasis text={heading} emphasis={emphasis} />
      </Tag>

      {lede || cta ? (
        <div className={styles.body}>
          {lede ? (
            <p className={cx(styles.lede, 'body-lg')} data-anim="fade-up">
              {lede}
            </p>
          ) : null}

          {cta ? (
            <div className={styles.actions} data-anim="fade-up">
              <Button href={cta.href} variant={cta.variant ?? 'link'}>
                {cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
