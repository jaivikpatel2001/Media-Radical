import type { ValueProp } from '@/types/content';

/**
 * Why clients pick us. Referenced by id so any page can show a subset.
 *
 * WRITING STYLE — plain English. Each one is a promise a client could repeat
 * back to their boss in a single sentence.
 */
export const valueProps: ValueProp[] = [
  {
    id: 'value-senior',
    title: 'You get our best people',
    description:
      'The developers you meet are the ones who do the work. Most have nine years or more of experience, and we never hand your project to another agency.',
    icon: 'people',
  },
  {
    id: 'value-fixed-scope',
    title: 'A price before we start',
    description:
      'You get a clear plan and a real number before any code is written. If the honest answer is smaller than what you asked for, that is what we quote.',
    icon: 'target',
  },
  {
    id: 'value-own-it',
    title: 'You own everything',
    description:
      'The code, the accounts and the documents are yours from day one. There is no licence to keep paying and nothing that locks you to us.',
    icon: 'shield',
  },
  {
    id: 'value-measured',
    title: 'We prove it worked',
    description:
      'We write down how things work before we start, then show you the difference afterwards. A project that changed nothing is a project that failed.',
    icon: 'growth',
  },
  {
    id: 'value-security',
    title: 'Security from day one',
    description:
      'We build to the rules your industry follows, starting in week one. Nobody has to scramble the month before an audit.',
    icon: 'shield',
  },
  {
    id: 'value-handover',
    title: 'We hand it over properly',
    description:
      'You get written instructions, recorded walkthroughs and time working alongside your team. The goal is that you stop needing us.',
    icon: 'handshake',
  },
];
