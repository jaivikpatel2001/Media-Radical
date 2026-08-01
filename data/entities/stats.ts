import type { Stat } from '@/types/content';

/**
 * Company numbers.
 *
 * `value` is the counter target; the section renders the formatted figure in
 * the server HTML so the real number is always in the markup for crawlers and
 * for anyone whose JavaScript never runs.
 */
export const stats: Stat[] = [
  {
    id: 'stat-projects',
    value: 240,
    suffix: '+',
    label: 'Projects finished',
    description: 'Across ten years and six industries.',
  },
  {
    id: 'stat-retention',
    value: 94,
    suffix: '%',
    label: 'Clients who come back',
    description: 'They hire us again within eighteen months.',
  },
  {
    id: 'stat-engineers',
    value: 68,
    label: 'Developers and designers',
    description: 'All full-time staff. We never outsource your work.',
  },
  {
    id: 'stat-uptime',
    value: 99.98,
    suffix: '%',
    precision: 2,
    label: 'Uptime',
    description: 'Average across everything we look after.',
  },
];
