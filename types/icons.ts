/**
 * The icon registry's key space.
 *
 * Declared as a union here rather than inferred from the registry so that
 * `/data` can reference an icon without importing React components, and so
 * that `components/icons/registry.tsx` can be typed as
 * `Record<IconName, IconComponent>` — which makes a missing icon a build
 * error rather than an undefined render.
 */

export type ServiceIconName =
  | 'web-development'
  | 'mobile-app'
  | 'ui-ux-design'
  | 'custom-software'
  | 'cloud-devops'
  | 'ai-automation'
  | 'it-consulting'
  | 'maintenance-support';

export type IndustryIconName =
  | 'fintech'
  | 'healthcare'
  | 'retail'
  | 'logistics'
  | 'saas'
  | 'manufacturing';

export type ValueIconName =
  | 'shield'
  | 'gauge'
  | 'people'
  | 'layers'
  | 'spark'
  | 'target'
  | 'clock'
  | 'compass'
  | 'growth'
  | 'handshake';

export type IconName = ServiceIconName | IndustryIconName | ValueIconName;

export interface IconProps {
  /** Rendered size in px. Icons are drawn on a 24×24 grid and scale cleanly. */
  size?: number;
  className?: string;
  /** Icons here are always decorative; the label lives in adjacent text. */
  strokeWidth?: number;
}
