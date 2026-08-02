import type { IconName, IconProps } from '@/types/icons';

/**
 * Hand-authored icon set.
 *
 * Drawn on a 24×24 grid with a single stroke weight so the whole set reads as
 * one family — which a mixed general-purpose icon library never quite does.
 * Every icon is decorative: the accessible name always lives in adjacent
 * text, so each is `aria-hidden` and `focusable="false"`.
 *
 * The registry is typed `Record<IconName, …>`, so adding a name to
 * types/icons.ts without drawing it is a compile error rather than a blank
 * space at runtime.
 */

type IconComponent = (props: IconProps) => React.ReactElement;

function Svg({
  size = 24,
  className,
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ services */

const WebDevelopment: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="M2.5 8.5h19" />
    <path d="m9.5 12.5-2 2 2 2M14.5 12.5l2 2-2 2" />
  </Svg>
);

const MobileApp: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10.5 5.5h3" />
    <circle cx="12" cy="17.5" r="1.1" />
  </Svg>
);

const UiUxDesign: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="2.5" width="10" height="10" rx="2" />
    <circle cx="16.5" cy="16.5" r="5" />
    <path d="M12.5 7.5h1.5a3 3 0 0 1 3 3v1" />
  </Svg>
);

const CustomSoftware: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="2.5" width="8" height="8" rx="2" />
    <rect x="13.5" y="13.5" width="8" height="8" rx="2" />
    <path d="M10.5 6.5h4a3 3 0 0 1 3 3v4" />
    <path d="M6.5 10.5v4a3 3 0 0 0 3 3h4" />
  </Svg>
);

const CloudDevops: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M7 17.5a4 4 0 0 1 .3-8 5.2 5.2 0 0 1 9.8 1.4A3.6 3.6 0 0 1 17 17.5H7Z" />
    <path d="M9.5 20.5h5" />
    <path d="M12 13v4" />
  </Svg>
);

const AiAutomation: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="4.5" cy="6" r="1.8" />
    <circle cx="19.5" cy="6" r="1.8" />
    <circle cx="4.5" cy="18" r="1.8" />
    <circle cx="19.5" cy="18" r="1.8" />
    <path d="m6 7 4 3.4M18 7l-4 3.4M6 17l4-3.4M18 17l-4-3.4" />
  </Svg>
);

const ItConsulting: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m15.8 8.2-2 5.6-5.6 2 2-5.6 5.6-2Z" />
  </Svg>
);

const MaintenanceSupport: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3" />
  </Svg>
);

const Seo: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
    <path d="M7.5 11.5 10 9l2 2 2.5-3" />
  </Svg>
);

const Ads: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M3.5 9.5h3l8-4.5v14l-8-4.5h-3a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5Z" />
    <path d="M18.5 9a4 4 0 0 1 0 6" />
    <path d="M6.5 14.5v4.5" />
  </Svg>
);

const SocialMedia: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="18" cy="5.5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="18.5" r="2.6" />
    <path d="m8.4 10.8 7.2-4M8.4 13.2l7.2 4" />
  </Svg>
);

const DomainHosting: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
  </Svg>
);

const Email: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
);

const Ecommerce: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M2.5 3.5h2.2l2.1 10.6a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.3l1.3-6.6H6" />
    <circle cx="9" cy="19.5" r="1.4" />
    <circle cx="17" cy="19.5" r="1.4" />
  </Svg>
);

/* ---------------------------------------------------------------- industries */

const Fintech: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="3.5" width="19" height="17" rx="2.5" />
    <path d="m6.5 15 3.5-3.8 3 2.6 4.5-5.3" />
    <path d="M17.5 8.5h-3" />
  </Svg>
);

const Healthcare: IconComponent = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="M6 12h3l1.5-3 3 6 1.5-3h3" />
  </Svg>
);

const Retail: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M4.5 7.5h15l-1.2 12a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8L4.5 7.5Z" />
    <path d="M8.5 10V6.8a3.5 3.5 0 0 1 7 0V10" />
  </Svg>
);

const Logistics: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M2.5 8.2 12 3.5l9.5 4.7v7.6L12 20.5l-9.5-4.7V8.2Z" />
    <path d="m2.5 8.2 9.5 4.7 9.5-4.7M12 12.9v7.6" />
  </Svg>
);

const Saas: IconComponent = (props) => (
  <Svg {...props}>
    <path d="m12 2.5 9 4.5-9 4.5-9-4.5 9-4.5Z" />
    <path d="m3 12 9 4.5 9-4.5" />
    <path d="m3 16.8 9 4.5 9-4.5" />
  </Svg>
);

const Manufacturing: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M2.5 20.5v-9l6 3.5v-3.5l6 3.5v-3.5l7 4v5H2.5Z" />
    <path d="M18 8.5V3.5h3.5v5" />
  </Svg>
);

/* -------------------------------------------------------------- value props */

const Shield: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M12 2.5 4 5.6v6c0 4.6 3.2 8.6 8 9.9 4.8-1.3 8-5.3 8-9.9v-6L12 2.5Z" />
    <path d="m8.8 11.8 2.3 2.3 4.1-4.4" />
  </Svg>
);

const Gauge: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M3 17.5a9 9 0 1 1 18 0" />
    <path d="m12 17.5 4.2-5.6" />
    <circle cx="12" cy="17.5" r="1.4" />
  </Svg>
);

const People: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="9" cy="8" r="3.3" />
    <path d="M2.8 20a6.4 6.4 0 0 1 12.4 0" />
    <path d="M16 5.2a3.3 3.3 0 0 1 0 6.2M17.6 14.4A6.4 6.4 0 0 1 21.2 20" />
  </Svg>
);

const Layers: IconComponent = (props) => (
  <Svg {...props}>
    <path d="m12 2.8 9 4.6-9 4.6-9-4.6 9-4.6Z" />
    <path d="m3 12.4 9 4.6 9-4.6" />
    <path d="m3 17 9 4.6 9-4.6" />
  </Svg>
);

const Spark: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M12 2.8c0 4.4 2.9 7.3 7.3 7.3-4.4 0-7.3 2.9-7.3 7.3 0-4.4-2.9-7.3-7.3-7.3 4.4 0 7.3-2.9 7.3-7.3Z" />
    <path d="M18.5 16.2c0 1.7 1.1 2.8 2.8 2.8-1.7 0-2.8 1.1-2.8 2.8 0-1.7-1.1-2.8-2.8-2.8 1.7 0 2.8-1.1 2.8-2.8Z" />
  </Svg>
);

const Target: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" />
  </Svg>
);

const Clock: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6.8V12l3.6 2.2" />
  </Svg>
);

const Compass: IconComponent = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.6 8.4-1.9 5.3-5.3 1.9 1.9-5.3 5.3-1.9Z" />
  </Svg>
);

const Growth: IconComponent = (props) => (
  <Svg {...props}>
    <path d="M3 20.5h18" />
    <path d="M6 20.5v-5.2M11 20.5v-9M16 20.5v-6M21 20.5V6.5" />
    <path d="m14.5 5 6.5-1.5L19.5 10" />
  </Svg>
);

const Handshake: IconComponent = (props) => (
  <Svg {...props}>
    <path d="m2.8 12.3 3.4-3.4 3.6 1.6 2.2-2.2 2.2 2.2 3.6-1.6 3.4 3.4" />
    <path d="m9.8 10.5-2.4 2.4a1.7 1.7 0 0 0 2.4 2.4l.9-.9.9.9a1.7 1.7 0 0 0 2.4-2.4" />
    <path d="M5 8.5 8.6 5l3.4 1.4L15.4 5 19 8.5" />
  </Svg>
);

export const ICONS: Record<IconName, IconComponent> = {
  // services
  'web-development': WebDevelopment,
  'mobile-app': MobileApp,
  'ui-ux-design': UiUxDesign,
  'custom-software': CustomSoftware,
  'cloud-devops': CloudDevops,
  'ai-automation': AiAutomation,
  'it-consulting': ItConsulting,
  'maintenance-support': MaintenanceSupport,
  seo: Seo,
  ads: Ads,
  'social-media': SocialMedia,
  'domain-hosting': DomainHosting,
  email: Email,
  ecommerce: Ecommerce,
  // industries
  fintech: Fintech,
  healthcare: Healthcare,
  retail: Retail,
  logistics: Logistics,
  saas: Saas,
  manufacturing: Manufacturing,
  // value props
  shield: Shield,
  gauge: Gauge,
  people: People,
  layers: Layers,
  spark: Spark,
  target: Target,
  clock: Clock,
  compass: Compass,
  growth: Growth,
  handshake: Handshake,
};

/** Renders an icon by name. Decorative — never the only label for a control. */
export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = ICONS[name];
  return <Component {...props} />;
}
