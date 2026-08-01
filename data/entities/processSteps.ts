import type { ProcessStep } from '@/types/content';

/**
 * The six steps of a project.
 *
 * WRITING STYLE — plain English, second person. Tell the client what happens
 * and what they get, in the order it happens.
 *
 * Reused by the Home process section, /process, and the "How we work" block
 * on every service detail page — each passes a different subset of ids.
 */
export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    index: 1,
    title: 'Understand',
    summary:
      'We talk to the people who deal with the problem every day. Your team, your customers, and whoever is currently holding it together with a spreadsheet.',
    deliverables: [
      'Interviews with your team and users',
      'A map of what you have now',
      'A list of risks we can see',
    ],
    durationLabel: '1–2 weeks',
  },
  {
    id: 'define',
    index: 2,
    title: 'Plan',
    summary:
      'We agree what gets built, in what order, and what it costs. All before anyone writes a line of code. If a smaller version would do, we will say so.',
    deliverables: [
      'A clear plan of what we will build',
      'The order we will build it in',
      'A price, with what it does and does not cover',
    ],
    durationLabel: '1–2 weeks',
  },
  {
    id: 'design',
    index: 3,
    title: 'Design',
    summary:
      'We design the screens and test them with real users. You can click through the whole thing before we build it.',
    deliverables: [
      'A clickable version you can try',
      'A reusable kit of buttons and layouts',
      'Designs checked for accessibility',
    ],
    durationLabel: '2–4 weeks',
  },
  {
    id: 'build',
    index: 4,
    title: 'Build',
    summary:
      'We build in two-week rounds and show you the result at the end of each one. Not a progress report — the actual working software.',
    deliverables: [
      'Something new to try every two weeks',
      'Automatic testing on every change',
      'Documentation kept up to date as we go',
    ],
    durationLabel: '6–20 weeks',
  },
  {
    id: 'launch',
    index: 5,
    title: 'Launch',
    summary:
      'We release to a few users first, then everyone. Alerts, backups and a tested way to undo it are all in place before the first customer arrives.',
    deliverables: [
      'A staged release you control',
      'Alerts when something goes wrong',
      'Written instructions for your team',
    ],
    durationLabel: '1–2 weeks',
  },
  {
    id: 'evolve',
    index: 6,
    title: 'Improve',
    summary:
      'We check the numbers we agreed at the start. Then we keep improving what worked and fix what did not.',
    deliverables: [
      'Results measured against the starting point',
      'A plan reviewed with you every quarter',
      'Ongoing support if you want it',
    ],
    durationLabel: 'Ongoing',
  },
];
