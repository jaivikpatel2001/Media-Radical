/**
 * Brand and contact facts.
 *
 * PLACEHOLDER DATA. Every value below is invented. This is the single file to
 * edit when the real details arrive — nothing else in the codebase restates a
 * phone number, address or social handle.
 */

export const site = {
  name: 'Media Radical',
  legalName: 'Media Radical Technologies, Inc.',
  tagline: 'We build software that works.',
  description:
    'Media Radical is an IT company. We design and build web apps, mobile apps and cloud systems for growing businesses — and we look after them once they are live.',
  founded: 2014,

  url: 'https://www.mediaradical.com',

  contact: {
    email: 'hello@mediaradical.com',
    salesEmail: 'newbusiness@mediaradical.com',
    careersEmail: 'careers@mediaradical.com',
    phone: '+1 (415) 555-0142',
    phoneHref: 'tel:+14155550142',
  },

  address: {
    lines: ['2 Marina Boulevard', 'Suite 300'],
    city: 'San Francisco',
    region: 'CA',
    postalCode: '94123',
    country: 'United States',
  },

  hours: {
    weekdays: 'Monday to Friday, 9am – 6pm PT',
    response: 'We reply within one working day.',
  },

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/media-radical', platform: 'linkedin' },
    { label: 'X', href: 'https://x.com/mediaradical', platform: 'x' },
    { label: 'GitHub', href: 'https://github.com/mediaradical', platform: 'github' },
    { label: 'Dribbble', href: 'https://dribbble.com/mediaradical', platform: 'dribbble' },
  ],
} as const;

export type Site = typeof site;
