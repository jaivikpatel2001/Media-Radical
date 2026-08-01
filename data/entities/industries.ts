import type { Industry } from '@/types/content';

/**
 * Industries we have worked in often enough to claim real experience.
 *
 * WRITING STYLE — plain English. Name the problem the way the client would
 * say it out loud, not the way a consultant would write it down.
 */
export const industries: Industry[] = [
  {
    slug: 'financial-services',
    name: 'Finance & Banking',
    summary:
      'Payment, lending and trading systems where the numbers have to be right and the rules are strict.',
    icon: 'fintech',
    accent: 'indigo',
    challenges: [
      'Reports take days to put together by hand',
      'Overnight processing finishes too late',
      'Nobody left at the company understands the old system',
    ],
    solutions: [
      'Balances that update as they happen',
      'Systems built to pass a security audit',
      'Replacing old software piece by piece, safely',
    ],
    caseStudySlugs: ['vardhman-engineering-seo'],
    proofPoint: 'Built to pass security audits',
    order: 1,
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary:
      'Patient and clinic systems that protect private data and stay online when people need them.',
    icon: 'healthcare',
    accent: 'cyan',
    challenges: [
      'Patient records spread across systems that do not talk',
      'Staff doing by hand what software should do',
      'Proving you follow the rules takes weeks every year',
    ],
    solutions: [
      'One place to see a patient’s full record',
      'Patient data stored safely, with tracked access',
      'Compliance paperwork that fills itself in',
    ],
    caseStudySlugs: ['anand-diagnostics-booking'],
    proofPoint: 'Patient data handled properly',
    order: 2,
  },
  {
    slug: 'retail-and-ecommerce',
    name: 'Retail & Online Shops',
    summary:
      'Online stores that stay fast through the Diwali rush and keep stock counts accurate afterwards.',
    icon: 'retail',
    accent: 'violet',
    challenges: [
      'The site cannot be touched during festive season',
      'Customers leave because checkout is slow',
      'Stock levels on the site do not match the warehouse',
    ],
    solutions: [
      'A store you can update any day of the year',
      'Checkout that loads in a couple of seconds',
      'Stock that updates everywhere at once',
    ],
    caseStudySlugs: ['shreeji-textiles-store'],
    proofPoint: '3.2× faster checkout',
    order: 3,
  },
  {
    slug: 'logistics-and-supply-chain',
    name: 'Logistics & Delivery',
    summary:
      'Tracking systems that pull every carrier and warehouse into one screen your team can act on.',
    icon: 'logistics',
    accent: 'teal',
    challenges: [
      'Every carrier sends data in a different format',
      'You find out about a delay when the customer calls',
      'Planning happens in a spreadsheet nobody can check',
    ],
    solutions: [
      'All carrier updates in one place',
      'Automatic alerts when a delivery goes wrong',
      'Forecasts your planners can adjust and trust',
    ],
    caseStudySlugs: ['rasoi-fresh-delivery'],
    proofPoint: '41% less manual chasing',
    order: 4,
  },
  {
    slug: 'saas-and-technology',
    name: 'Software & Tech',
    summary:
      'Products that need to win bigger customers without rebuilding everything to do it.',
    icon: 'saas',
    accent: 'indigo',
    challenges: [
      'Big deals stall over single sign-on and audit logs',
      'Every new customer needs a developer to set up',
      'Hosting costs grow faster than revenue',
    ],
    solutions: [
      'Enterprise login and permissions',
      'Customers who can sign up on their own',
      'Knowing what each customer costs you to run',
    ],
    caseStudySlugs: [],
    proofPoint: 'Enterprise-ready in one quarter',
    order: 5,
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    summary:
      'Factory systems that bring machine data and business data onto the same screen.',
    icon: 'manufacturing',
    accent: 'amber',
    challenges: [
      'Machine data never leaves the factory floor',
      'Maintenance happens on a calendar, not when needed',
      'Nobody dares upgrade the old business system',
    ],
    solutions: [
      'Live readings from your machines',
      'Repairs planned before something fails',
      'Upgrades that no longer break everything else',
    ],
    caseStudySlugs: [],
    proofPoint: 'All your plant data in one view',
    order: 6,
  },
];
