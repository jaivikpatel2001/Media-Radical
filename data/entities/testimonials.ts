import { images } from '@/data/images';
import type { Testimonial } from '@/types/content';

/* =============================================================================
   ⚠️  PLACEHOLDER CONTENT. NOT REAL CLIENT QUOTES. DO NOT PUBLISH AS-IS.

   mediaradical.in has no testimonials section, so there was nothing to carry
   across. Every quote below is written, and every person and company named is
   invented.

   The companies are the same fictional ones used in the case studies, so the
   two sections agree. They are deliberately NOT the real clients listed in
   data/entities/clientLogos.ts: putting an invented quote in the mouth of a
   real, identifiable business is a claim that business never made, and a
   legal and reputational risk.

   To go live: collect real quotes with written permission, then replace the
   `quote` and `author` fields. The section, layout and schema are ready and
   need no code changes.

   STYLE (see CLAUDE.md): Indian names, cities, companies and currency. No em
   dash as a separator.
   ============================================================================= */

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    quote:
      'Our front desk phones were engaged all morning and patients simply gave up. Online booking took that load away in the first month, and the WhatsApp reminders cut the no-shows we had stopped even counting.',
    author: {
      name: 'Dr. Anjali Anand',
      role: 'Director',
      company: 'Anand Diagnostics, Ahmedabad',
      avatar: images.anjaliAnand,
    },
    highlight: { label: 'of bookings now online', value: '54%' },
  },
  {
    id: 'testimonial-02',
    quote:
      'We had been on page three for our main product search for years, and every enquiry came from trade fairs. Nine months in we are in the top three, and nearly half our enquiries now come from Google.',
    author: {
      name: 'Karan Joshi',
      role: 'Managing Director',
      company: 'Vardhman Engineering, Rajkot',
      avatar: images.karanJoshi,
    },
    highlight: { label: 'cost per enquiry', value: '₹340' },
  },
  {
    id: 'testimonial-03',
    quote:
      'Almost all our buyers order from a phone, and the old checkout kept failing on UPI. They rebuilt it around mobile and connected our stock to Tally, so the site finally shows what is actually in the godown.',
    author: {
      name: 'Neha Desai',
      role: 'Business Head',
      company: 'Shreeji Textiles, Surat',
      avatar: images.nehaDesai,
    },
    highlight: { label: 'faster checkout', value: '3.2x' },
  },
  {
    id: 'testimonial-04',
    quote:
      'What I remember is being told to stop. One campaign was not paying for itself and they said so, instead of quietly carrying on and charging us to manage it.',
    author: {
      name: 'Rahul Sharma',
      role: 'Operations Head',
      company: 'Rasoi Fresh, Pune',
    },
    highlight: { label: 'wasted ad spend saved', value: '₹4.2L' },
  },
  {
    id: 'testimonial-05',
    quote:
      'Our email had been half-broken for years, with messages going to spam and nobody sure why. They moved us to Google Workspace over a weekend and set the records up properly. It has simply worked since.',
    author: {
      name: 'Priya Shah',
      role: 'Founder',
      company: 'Kalrav Interiors, Vadodara',
    },
  },
];
