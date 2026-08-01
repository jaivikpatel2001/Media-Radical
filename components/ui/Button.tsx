import Link from 'next/link';

import type { ButtonSize, ButtonVariant } from '@/types/common';
import { cx } from '@/utils/cx';

import styles from './Button.module.css';

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Trailing arrow that animates on hover. On by default for `link`. */
  withArrow?: boolean;
  'aria-label'?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ActionButtonProps extends BaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7h10m0 0L8 3m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The one button.
 *
 * Renders an anchor when given `href`, a real `<button>` otherwise — never a
 * div with a click handler, so keyboard and AT behaviour is free. Stays a
 * Server Component; hover and press states are pure CSS. The hero's
 * pointer-following variant is a separate client wrapper.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    withArrow,
    ...rest
  } = props;

  const showArrow = withArrow ?? variant === 'link';

  const classNames = cx(
    styles.button,
    styles[variant],
    size !== 'md' && styles[size],
    className,
  );

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {showArrow ? <Arrow /> : null}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as LinkButtonProps;

    if (external) {
      return (
        <a
          href={href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={anchorRest['aria-label']}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classNames} aria-label={anchorRest['aria-label']}>
        {content}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled, ...buttonRest } =
    rest as ActionButtonProps;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={classNames}
      aria-label={buttonRest['aria-label']}
    >
      {content}
    </button>
  );
}
