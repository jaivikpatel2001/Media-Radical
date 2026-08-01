'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { subscribeToNewsletter, type NewsletterState } from '@/app/actions';
import type { FooterConfig } from '@/types/navigation';
import { cx } from '@/utils/cx';

import styles from './FooterNewsletter.module.css';

const INITIAL: NewsletterState = { status: 'idle', message: '' };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? 'Sending…' : label}
    </button>
  );
}

/**
 * Progressive-enhancement form: it posts to a Server Action, so it still works
 * with JavaScript disabled. Result messages go through `aria-live` so a screen
 * reader hears them without the focus moving.
 */
export function FooterNewsletter({
  content,
}: {
  content: FooterConfig['newsletter'];
}) {
  const [state, formAction] = useActionState(subscribeToNewsletter, INITIAL);

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{content.title}</p>
      <p className={styles.description}>{content.description}</p>

      <form action={formAction} className={styles.form}>
        <label htmlFor="newsletter-email" className="visuallyHidden">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={content.placeholder}
          className={styles.input}
          aria-describedby="newsletter-note"
        />
        <SubmitButton label={content.submitLabel} />
      </form>

      <p
        id="newsletter-note"
        className={cx(
          styles.note,
          state.status === 'error' && styles.error,
          state.status === 'success' && styles.success,
        )}
        aria-live="polite"
      >
        {state.status === 'idle' ? content.consentNote : state.message}
      </p>
    </div>
  );
}
