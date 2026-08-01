'use server';

export interface NewsletterState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter subscription.
 *
 * Validation only for now — there is no mailing-list provider wired up yet.
 * The signature is the shape a real integration would keep, so connecting one
 * later is a change inside this function and nowhere else.
 */
export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim();

  if (!email) {
    return { status: 'error', message: 'Enter an email address.' };
  }

  if (!EMAIL.test(email)) {
    return { status: 'error', message: 'That does not look like an email address.' };
  }

  // TODO: post to the mailing-list provider once one is chosen.

  return {
    status: 'success',
    message: 'Thanks — check your inbox to confirm.',
  };
}
