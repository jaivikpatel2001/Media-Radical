import Link from 'next/link';

import { SocialIcon } from '@/components/icons/SocialIcon';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { footer } from '@/data/navigation';
import { site } from '@/data/site';
import { cx } from '@/utils/cx';

import { FooterNewsletter } from './FooterNewsletter';
import styles from './Footer.module.css';

/**
 * Site footer. Server Component — only the newsletter form is interactive,
 * and that is its own client island.
 *
 * The copyright year is resolved at build time. The site is fully static, so
 * a rebuild is what refreshes it; that is the correct trade against making
 * the whole footer dynamic for one integer.
 */
export function Footer() {
  const copyright = footer.copyright.replace(
    '{{year}}',
    String(new Date().getFullYear()),
  );

  return (
    <footer className={cx(styles.footer, 'invertedSurface')}>
      <div className={styles.bloom} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>{footer.tagline}</p>

            <address className={styles.contact}>
              <a href={site.contact.phoneHref} className={styles.contactLink}>
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className={styles.contactLink}
              >
                {site.contact.email}
              </a>
              <span>
                {site.address.lines.join(', ')}, {site.address.city},{' '}
                {site.address.region} {site.address.postalCode}
              </span>
              <span>{site.hours.weekdays}</span>
            </address>
          </div>

          <FooterNewsletter content={footer.newsletter} />
        </div>

        <div className={styles.columns}>
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={cx(styles.columnTitle, 'label')}>{column.title}</p>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyright}</p>

          <nav className={styles.legal} aria-label="Legal">
            {footer.legal.map((link) => (
              <Link key={link.href} href={link.href} className={styles.legalLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <ul className={styles.socials}>
            {footer.socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  className={styles.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${social.label}`}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
