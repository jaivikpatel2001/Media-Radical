import { ScrollScene } from '@/components/providers/ScrollScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ROUTES } from '@/constants/routes';
import { getCaseStudies, getIndustryBySlug, getServices } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { CaseStudiesContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './CaseStudiesSection.module.css';

/**
 * Case studies — SHARED.
 *
 * Rows alternate sides, and the media parallaxes against its own frame, so
 * three long rows read as an editorial spread rather than a repeated block.
 *
 * The services and industry shown per study are resolved through the
 * selectors rather than restated on the case-study record — so renaming a
 * service updates every case study that references it.
 */
export function CaseStudiesSection({
  content,
  id,
  variant,
}: SectionProps<CaseStudiesContent>) {
  const studies = getCaseStudies(content.caseStudySlugs);

  return (
    <Section id={id} variant={variant} aria-labelledby="work-heading">
      <ScrollScene>
        <Container>
          <SectionHeading content={content} id="work-heading" />

          <ul className={styles.list}>
            {studies.map((study, index) => {
              const industry = getIndustryBySlug(study.industrySlug);
              const services = getServices(study.serviceSlugs);

              return (
                <li key={study.slug} className={styles.item}>
                  <div
                    className={styles.mediaFrame}
                    data-parallax-scope
                    data-anim={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  >
                    <div className={styles.mediaInner} data-parallax="0.12">
                      <Media
                        asset={study.cover}
                        className={styles.media}
                        sizes="(min-width: 900px) 55vw, 100vw"
                        placeholderLabel={study.client}
                      />
                    </div>
                    <span className={cx(styles.year, 'label')}>
                      {study.year}
                    </span>
                  </div>

                  <div className={styles.content}>
                    <div className={styles.meta} data-anim="fade-up-sm">
                      <span className={cx(styles.client, 'eyebrow')}>
                        {study.client}
                      </span>
                      {industry ? (
                        <>
                          <span
                            className={styles.metaDot}
                            aria-hidden="true"
                          />
                          <span className="label">{industry.name}</span>
                        </>
                      ) : null}
                      {study.durationLabel ? (
                        <>
                          <span
                            className={styles.metaDot}
                            aria-hidden="true"
                          />
                          <span className="label">{study.durationLabel}</span>
                        </>
                      ) : null}
                    </div>

                    <h3 className={styles.title} data-anim="lines">
                      {study.title}
                    </h3>

                    <p className={cx(styles.summary, 'body-md')} data-anim="fade-up">
                      {study.summary}
                    </p>

                    <ul className={styles.tags} data-anim="fade-up">
                      {services.map((service) => (
                        <li key={service.slug} className={styles.tag}>
                          {service.shortName}
                        </li>
                      ))}
                    </ul>

                    <dl className={styles.results} data-anim-stagger="0.07">
                      {study.results.map((result) => (
                        <div key={result.label} className={styles.result}>
                          <dd className={styles.resultValue}>{result.value}</dd>
                          <dt className={styles.resultLabel}>{result.label}</dt>
                          {result.detail ? (
                            <dd className={styles.resultDetail}>
                              {result.detail}
                            </dd>
                          ) : null}
                        </div>
                      ))}
                    </dl>

                    <div className={styles.actions} data-anim="fade-up">
                      <Button
                        href={ROUTES.caseStudy(study.slug)}
                        variant="link"
                        aria-label={`${content.itemCtaLabel}: ${study.title}`}
                      >
                        {content.itemCtaLabel}
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </ScrollScene>
    </Section>
  );
}
