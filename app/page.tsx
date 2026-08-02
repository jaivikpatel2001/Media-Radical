import type { Metadata } from 'next';

import { JsonLd } from '@/components/ui/JsonLd';
import { HOME_ANCHORS } from '@/constants/routes';
import { homePage } from '@/data/pages/home';
import { getFaqs, getServices } from '@/data/selectors';
import { faqSchema, organizationSchema, websiteSchema } from '@/utils/schema';
import { HeroSection } from '@/sections/home/HeroSection';
import { InsightsSection } from '@/sections/home/InsightsSection';
import { IntroSection } from '@/sections/home/IntroSection';
import { TrustedBySection } from '@/sections/home/TrustedBySection';
import { WhyChooseUsSection } from '@/sections/home/WhyChooseUsSection';
import { CaseStudiesSection } from '@/sections/shared/CaseStudiesSection';
import { CtaSection } from '@/sections/shared/CtaSection';
import { FaqSection } from '@/sections/shared/FaqSection';
import { IndustriesSection } from '@/sections/shared/IndustriesSection';
import { ProcessSection } from '@/sections/shared/ProcessSection';
import { ServicesGrid } from '@/sections/shared/ServicesGrid';
import { StatsSection } from '@/sections/shared/StatsSection';
import { TechnologiesSection } from '@/sections/shared/TechnologiesSection';
import { TestimonialsSection } from '@/sections/shared/TestimonialsSection';

export const metadata: Metadata = {
  title: homePage.seo.title,
  description: homePage.seo.description,
  keywords: homePage.seo.keywords,
};

/**
 * Home page — pure composition.
 *
 * Each section takes its own typed slice of `homePage` and nothing else. No
 * copy is written in this file, or in any section file.
 *
 * Nine of these fourteen sections live in /sections/shared and are already
 * prop-driven: a future /services or /industries/[slug] page composes the
 * same components from a different slice, which is what keeps page groups
 * 2–17 additive rather than a refactor.
 *
 * The `subtle` / default / `inverted` alternation is deliberate — it gives
 * the page a light-to-dark rhythm rather than fourteen identical bands.
 */
export default function Home() {
  return (
    <>
      {/* Built from the same records the page renders, so the structured data
          cannot drift from what a visitor actually sees. */}
      <JsonLd data={organizationSchema(getServices(homePage.services.serviceSlugs))} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={faqSchema(getFaqs(homePage.faq.faqIds))} />

      <HeroSection content={homePage.hero} />
      <TrustedBySection content={homePage.trustedBy} />
      <IntroSection content={homePage.intro} />

      <ServicesGrid
        content={homePage.services}
        id={HOME_ANCHORS.services.slice(1)}
        variant="subtle"
      />
      <IndustriesSection
        content={homePage.industries}
        id={HOME_ANCHORS.industries.slice(1)}
      />
      <WhyChooseUsSection content={homePage.whyChooseUs} />

      <TechnologiesSection content={homePage.technologies} />
      <ProcessSection
        content={homePage.process}
        id={HOME_ANCHORS.process.slice(1)}
        variant="subtle"
      />
      <CaseStudiesSection
        content={homePage.caseStudies}
        id={HOME_ANCHORS.work.slice(1)}
      />

      <TestimonialsSection content={homePage.testimonials} variant="subtle" />
      <StatsSection content={homePage.stats} />
      <InsightsSection content={homePage.insights} />

      <FaqSection content={homePage.faq} id={HOME_ANCHORS.faq.slice(1)} />
      <CtaSection content={homePage.cta} id={HOME_ANCHORS.contact.slice(1)} />
    </>
  );
}
