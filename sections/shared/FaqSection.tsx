import { ScrollScene } from '@/components/providers/ScrollScene';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Emphasis } from '@/components/ui/Emphasis';
import { Section } from '@/components/ui/Section';
import { getFaqs } from '@/data/selectors';
import type { SectionProps } from '@/types/common';
import type { FaqContent } from '@/types/pages';
import { cx } from '@/utils/cx';

import styles from './FaqSection.module.css';

/**
 * FAQ — SHARED.
 *
 * The section resolves the questions and hands the client Accordion plain
 * items, so every answer is in the server HTML — which is what makes the
 * FAQPage JSON-LD added in Stage 7 truthful, and what lets a crawler index
 * answers that are visually collapsed.
 */
export function FaqSection({ content, id, variant }: SectionProps<FaqContent>) {
  const faqs = getFaqs(content.faqIds);

  return (
    <Section id={id} variant={variant} aria-labelledby="faq-heading">
      <ScrollScene>
        <Container className={styles.inner}>
          <div className={styles.aside}>
            <p className={cx(styles.eyebrow, 'eyebrow')} data-anim="fade-up-sm">
              {content.eyebrow}
            </p>

            <h2
              id="faq-heading"
              className={cx(styles.heading, 'display-sm')}
              data-anim="lines"
            >
              <Emphasis text={content.heading} emphasis={content.emphasis} />
            </h2>

            <div className={styles.fallback} data-anim="fade-up">
              <p className={styles.fallbackTitle}>{content.fallback.title}</p>
              <p className={styles.fallbackBody}>
                {content.fallback.description}
              </p>
              <div className={styles.fallbackAction}>
                <Button
                  href={content.fallback.cta.href}
                  variant={content.fallback.cta.variant ?? 'secondary'}
                  size="sm"
                >
                  {content.fallback.cta.label}
                </Button>
              </div>
            </div>
          </div>

          <div data-anim="fade-up">
            <Accordion
              items={faqs.map((faq) => ({
                id: faq.id,
                question: faq.question,
                answer: faq.answer,
              }))}
            />
          </div>
        </Container>
      </ScrollScene>
    </Section>
  );
}
