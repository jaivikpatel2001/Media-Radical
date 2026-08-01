import type { FaqCategory, FaqItem } from '@/types/content';

export const faqCategories: FaqCategory[] = [
  { id: 'engagement', label: 'Working with us' },
  { id: 'delivery', label: 'Your project' },
  { id: 'commercial', label: 'Money and contracts' },
  { id: 'technical', label: 'Technical' },
];

/**
 * One FAQ pool for the whole site.
 *
 * WRITING STYLE — answer the question in the first sentence. Then add the
 * detail. Short paragraphs, plain words, no hedging.
 *
 * The Home section shows six; /faq will show all of them grouped by category;
 * each service detail page pulls the ids listed on its own record.
 */
export const faqs: FaqItem[] = [
  {
    id: 'faq-engagement',
    categoryId: 'engagement',
    question: 'How do we get started?',
    answer:
      'It starts with a free call. If it looks like a fit, we do one to two weeks of paid discovery. At the end you get a plan, a timeline and a price. That plan is yours to keep, even if you decide not to work with us. A few clients have taken it and built the project in-house, and that is a fine outcome.',
  },
  {
    id: 'faq-timeline',
    categoryId: 'delivery',
    question: 'How long will my project take?',
    answer:
      'Most projects take twelve to twenty weeks from first call to launch. Rebuilding an existing system usually takes twenty to thirty. You will not wait that long to see something, though. We show you working software every two weeks, starting around week three.',
  },
  {
    id: 'faq-pricing',
    categoryId: 'commercial',
    question: 'How much does it cost?',
    answer:
      'Discovery is a fixed price, so you know that number up front. After that, most clients pay a fixed monthly fee for a set team. We will quote a fixed price for a whole project when the scope is clear enough to do that honestly. When it is not, we will tell you, because a fixed price on a vague scope just moves the risk onto you.',
  },
  {
    id: 'faq-team',
    categoryId: 'engagement',
    question: 'Who actually does the work?',
    answer:
      'The people you meet on the first call. All 68 of our developers and designers are full-time employees and we never pass your project to another agency. You get their names, a project lead, and a shared chat channel with all of them in it. No account manager passing messages back and forth.',
  },
  {
    id: 'faq-handover',
    categoryId: 'delivery',
    question: 'What happens when the project ends?',
    answer:
      'You get everything: the code, the accounts, written instructions and a recorded walkthrough. Then we spend time working alongside your developers so they are comfortable running it. A good handover means you do not need to call us. That is the point.',
  },
  {
    id: 'faq-ip',
    categoryId: 'commercial',
    question: 'Who owns the code?',
    answer:
      'You do, from the first day. It is written into the contract, not handed over at the end. There is no framework of ours that you have to keep licensing, and nothing that stops another company picking the work up later.',
  },
  {
    id: 'faq-support',
    categoryId: 'delivery',
    question: 'Do you look after it after launch?',
    answer:
      'Yes, if you want us to. You choose a support plan with agreed response times written into it. That covers emergency fixes, security updates on a schedule, and a monthly report on uptime, speed and cost. It is optional. Plenty of clients take the handover and run it themselves.',
  },
  {
    id: 'faq-security',
    categoryId: 'technical',
    question: 'How do you handle security?',
    answer:
      'We build to your industry’s rules from the first week, not the month before an audit. In practice that means limiting who can access what, encrypting your data, scanning for known problems automatically, and keeping a record of every change. We have worked under SOC 2, HIPAA and PCI-DSS, and we are happy to talk to your auditor directly.',
  },
  {
    id: 'faq-existing-team',
    categoryId: 'engagement',
    question: 'Can you work with our own developers?',
    answer:
      'Yes, and we often do. We join your meetings, use your tools, and agree up front which decisions are ours and which are yours. If you want your team to take it over, we pair with them along the way and hand over one piece at a time.',
  },
  {
    id: 'faq-legacy',
    categoryId: 'technical',
    question: 'Our system is old and nobody here built it. Can you help?',
    answer:
      'Yes. That is a common starting point. We map out what you have and add monitoring first, so we can see what it actually does. Then we replace it piece by piece while the old system keeps running. Rebuilding everything at once almost always goes badly, so we do not do it that way.',
  },
  {
    id: 'faq-ai-scope',
    categoryId: 'technical',
    question: 'Do we need AI?',
    answer:
      'Sometimes, and often not. We start with the job that is costing you hours and work out the simplest thing that fixes it. If ordinary automation does the job, we will say so — it is cheaper to run and easier to explain. When AI genuinely fits, we build the tests before the feature so we can show you how accurate it is.',
  },
  {
    id: 'faq-design-handover',
    categoryId: 'delivery',
    question: 'What do we get from a design project?',
    answer:
      'A clickable version of your product that we have tested with real users, plus a kit of reusable buttons, forms and layouts already built in code. Not a folder of pictures with a document explaining them. Your developers use the same pieces the designers did, which is why your fifth screen still looks like your first.',
  },
  {
    id: 'faq-consulting-scope',
    categoryId: 'commercial',
    question: 'What do I get from a consulting review?',
    answer:
      'A written report listing what to fix, in order, with a cost against each item. Something you can take straight into a budget meeting. Reviews take two to four weeks. We have no follow-on work to protect, so if your current setup is fine, the report will say that.',
  },
];
