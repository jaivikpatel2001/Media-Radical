import { images, plannedImages } from '@/data/images';
import type { CaseStudy } from '@/types/content';

/* =============================================================================
   ⚠️  ILLUSTRATIVE PLACEHOLDER CONTENT. The companies below are invented.

   Replace with real engagements before launch. They are written to be
   plausible for an Ahmedabad agency serving Indian businesses, so the layout
   and section rhythm hold until real work goes in.

   STYLE RULES (see CLAUDE.md):
   • Indian companies, cities, currency and business scenarios only.
   • No em dash as a separator anywhere a visitor reads.
   • Plain English. Say what was wrong, what changed, and the number.
   ============================================================================= */

export const caseStudies: CaseStudy[] = [
  {
    slug: 'shreeji-textiles-store',
    client: 'Shreeji Textiles',
    title: 'An online store that finally sells on mobile',
    summary:
      'A Surat textile wholesaler selling direct to retailers. Checkout took eleven seconds on a mid-range phone and most carts never made it through.',
    industrySlug: 'retail-and-ecommerce',
    serviceSlugs: ['ecommerce-and-crm', 'web-development', 'ui-ux-design'],
    cover: images.textileStore,
    challenge:
      'Nearly all their buyers shop on a phone over patchy 4G. The old store loaded slowly, the payment step failed often on UPI, and stock counts on the site rarely matched the godown.',
    solution:
      'We rebuilt the storefront around a mobile-first checkout, added UPI and net banking through a single gateway, and connected stock to their existing Tally data so both show the same number.',
    results: [
      { label: 'Checkout speed', value: '3.2x', detail: 'On a mid-range Android phone' },
      { label: 'Abandoned carts', value: '31% lower', detail: 'Compared to the previous year' },
      { label: 'Orders from mobile', value: '68%', detail: 'Up from 41%' },
    ],
    technologyIds: ['nextjs', 'react', 'typescript', 'postgres', 'redis', 'shopify'],
    testimonialId: 'testimonial-03',
    durationLabel: '14 weeks',
    year: 2025,
    featured: true,
    seo: {
      title: 'Shreeji Textiles: a faster mobile store',
      description:
        'Rebuilding a Surat wholesaler’s online store around mobile checkout and UPI, cutting abandoned carts by 31%.',
    },
  },
  {
    slug: 'anand-diagnostics-booking',
    client: 'Anand Diagnostics',
    title: 'Bookings that stopped going through the front desk',
    summary:
      'A diagnostics chain across Ahmedabad and Gandhinagar. Every appointment was a phone call, and the phones were busy all morning.',
    industrySlug: 'healthcare',
    serviceSlugs: ['web-development', 'mobile-app-development', 'maintenance-and-support'],
    cover: images.diagnosticsBooking,
    challenge:
      'Six centres shared one booking phone line. Patients gave up waiting, slots went unfilled, and reports were collected in person because there was nowhere to read them online.',
    solution:
      'We built online booking with slot availability per centre, added SMS and WhatsApp reminders, and gave patients a login to download reports. Front desk staff kept the same workflow for walk-ins.',
    results: [
      { label: 'Bookings made online', value: '54%', detail: 'Within four months' },
      { label: 'Missed appointments', value: '22% lower', detail: 'After reminders went live' },
      { label: 'Calls to the front desk', value: '1,900 fewer', detail: 'Every month' },
    ],
    technologyIds: ['nextjs', 'react-native', 'postgres', 'firebase', 'gcp'],
    testimonialId: 'testimonial-01',
    durationLabel: '18 weeks',
    year: 2025,
    featured: true,
    seo: {
      title: 'Anand Diagnostics: online appointment booking',
      description:
        'Online booking, WhatsApp reminders and downloadable reports for a six-centre diagnostics chain in Ahmedabad.',
    },
  },
  {
    slug: 'vardhman-engineering-seo',
    client: 'Vardhman Engineering',
    title: 'Page three to the top three for their main search',
    summary:
      'A Rajkot valve manufacturer whose enquiries came almost entirely from trade fairs and word of mouth.',
    industrySlug: 'manufacturing',
    serviceSlugs: ['seo', 'web-development', 'ppc-and-google-ads'],
    cover: images.engineeringSeo,
    challenge:
      'Buyers searching for their exact product category found competitors first. The site had no product pages worth ranking, and nothing was tracked, so nobody knew which enquiries came from where.',
    solution:
      'We rebuilt the site around one page per product category, fixed the technical issues holding it back, set up proper conversion tracking, and ran a small Google Ads budget on the terms worth buying while the rankings caught up.',
    results: [
      { label: 'Enquiries from search', value: '48%', detail: 'Up from almost none' },
      { label: 'Main keyword', value: 'Top 3', detail: 'From page three in nine months' },
      { label: 'Cost per enquiry', value: '₹340', detail: 'Down from ₹1,150' },
    ],
    technologyIds: ['nextjs', 'wordpress', 'typescript', 'gcp'],
    testimonialId: 'testimonial-02',
    durationLabel: '9 months',
    year: 2025,
    featured: true,
    seo: {
      title: 'Vardhman Engineering: SEO for a valve manufacturer',
      description:
        'Product-led pages, technical fixes and paid search that took a Rajkot manufacturer from page three to the top three.',
    },
  },
  {
    slug: 'rasoi-fresh-delivery',
    client: 'Rasoi Fresh',
    title: 'Delivery problems that flag themselves',
    summary:
      'A Pune grocery delivery business running three vehicle partners. Customers usually reported a late order before the team knew about it.',
    industrySlug: 'logistics-and-supply-chain',
    serviceSlugs: ['custom-software-development', 'ai-and-automation', 'cloud-and-devops'],
    // Not generated yet, so this slot renders a placeholder. See data/images.ts.
    cover: plannedImages.groceryDelivery,
    challenge:
      'Each delivery partner sent updates in a different format, some by WhatsApp. Nobody had one view of the day, and late orders were discovered by complaint.',
    solution:
      'We put every partner feed into one dispatch screen and added alerts for orders running behind. Anything the system is unsure about goes to a person, and every decision is recorded.',
    results: [
      { label: 'Manual chasing', value: '41% lower', detail: 'Within two quarters' },
      { label: 'Time to spot a delay', value: '11 minutes', detail: 'Down from around six hours' },
      { label: 'On-time deliveries', value: '7.4 points up', detail: 'Across the city' },
    ],
    technologyIds: ['python', 'typescript', 'kafka', 'postgres', 'gcp', 'langchain'],
    testimonialId: 'testimonial-04',
    durationLabel: '22 weeks',
    year: 2025,
    featured: false,
    seo: {
      title: 'Rasoi Fresh: one dispatch screen for three delivery partners',
      description:
        'Normalised partner feeds and automatic alerts that cut manual chasing by 41% for a Pune grocery service.',
    },
  },
];
