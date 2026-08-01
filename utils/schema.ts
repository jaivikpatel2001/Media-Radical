import { ROUTES } from '@/constants/routes';
import { site } from '@/data/site';
import type { FaqItem, Service } from '@/types/content';

/**
 * Schema.org builders.
 *
 * Every field is derived from `/data`, so the structured data and the visible
 * page are the same content by construction. Only markup that is genuinely on
 * the page is emitted — an FAQPage block describing questions the visitor
 * cannot see is exactly the mismatch search engines act on.
 */

const absolute = (path: string) => `${site.url}${path === '/' ? '' : path}`;

export function organizationSchema(services: Service[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.lines.join(', '),
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: site.socials.map((social) => social.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT services and consulting',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.summary,
          url: absolute(ROUTES.service(service.slug)),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}#organization` },
    inLanguage: 'en-US',
  };
}

/** Only call this with the questions actually rendered on the page. */
export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
