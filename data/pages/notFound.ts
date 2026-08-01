import { ROUTES } from '@/constants/routes';
import type { NotFoundContent } from '@/types/pages';

/**
 * 404 content.
 *
 * This page matters more than usual right now: the header and footer link to
 * pages that have not been built yet, so this is where most clicks land. It
 * needs to feel intentional, not broken.
 */
export const notFoundPage: NotFoundContent = {
  code: '404',
  heading: 'This page is not ready yet.',
  emphasis: 'not ready yet',
  lede: 'Either the address is wrong, or you have found a part of the site we are still building. Here is where you probably wanted to go.',
  primaryCta: { label: 'Back to home', href: ROUTES.home, variant: 'primary' },
  helpfulLinksTitle: 'Try one of these',
  helpfulLinks: [
    {
      label: 'Services',
      href: ROUTES.services,
      description: 'Everything we can build for you',
    },
    {
      label: 'Our work',
      href: ROUTES.portfolio,
      description: 'Real projects and real results',
    },
    {
      label: 'How we work',
      href: ROUTES.process,
      description: 'What happens on a project, step by step',
    },
    {
      label: 'Contact',
      href: ROUTES.contact,
      description: 'Book a free call with us',
    },
  ],
};
