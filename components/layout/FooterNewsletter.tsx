'use client';

import { useState, type FormEvent } from 'react';

import type { FooterConfig } from '@/types/navigation';
import { cx } from '@/utils/cx';

import styles from './FooterNewsletter.module.css';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Where the address is sent. Any endpoint that accepts a POST works: a form
 * relay such as FormSubmit or Formspree, or a mailing-list provider's own URL.
 *
 * Unset is a supported state, not a broken one. The form then says signup is
 * not connected and points at the contact address, rather than thanking
 * someone for a subscription that went nowhere.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * Newsletter signup.
 *
 * This validates and submits in the browser. It used to post to a Server
 * Action, which was better: it worked with JavaScript disabled. That is not
 * available here, because the site is built as a static export and static
 * exports cannot run Server Actions at all. The trade is deliberate and
 * recorded in DONE.md.
 *
 * Result messages go through `aria-live`, so a screen reader hears them
 * without the focus moving.
 */
export function FooterNewsletter({
  content,
}: {
  content: FooterConfig['newsletter'];
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const { messages } = content;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();

    if (!email) {
      setStatus('error');
      setMessage(messages.empty);
      return;
    }

    if (!EMAIL.test(email)) {
      setStatus('error');
      setMessage(messages.invalid);
      return;
    }

    if (!ENDPOINT) {
      setStatus('error');
      setMessage(messages.notConfigured);
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus('success');
      setMessage(messages.success);
      form.reset();
    } catch {
      setStatus('error');
      setMessage(messages.failure);
    }
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{content.title}</p>
      <p className={styles.description}>{content.description}</p>

      <form onSubmit={onSubmit} className={styles.form} noValidate>
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
        <button
          type="submit"
          className={styles.submit}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? messages.sending : content.submitLabel}
        </button>
      </form>

      <p
        id="newsletter-note"
        className={cx(
          styles.note,
          status === 'error' && styles.error,
          status === 'success' && styles.success,
        )}
        aria-live="polite"
      >
        {status === 'idle' ? content.consentNote : message}
      </p>
    </div>
  );
}
