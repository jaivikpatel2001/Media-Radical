import type { Technology, TechnologyGroup } from '@/types/content';

/**
 * The working stack. `logoId` keys into the wordmark registry in
 * components/icons — these are drawn, not downloaded, so the strip stays
 * theme-aware and costs no requests.
 */
export const technologies: Technology[] = [
  // frontend
  { id: 'nextjs', name: 'Next.js', category: 'frontend', logoId: 'nextjs' },
  { id: 'react', name: 'React', category: 'frontend', logoId: 'react' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', logoId: 'typescript' },
  { id: 'figma', name: 'Figma', category: 'frontend', logoId: 'figma' },
  { id: 'storybook', name: 'Storybook', category: 'frontend', logoId: 'storybook' },

  // backend
  { id: 'node', name: 'Node.js', category: 'backend', logoId: 'node' },
  { id: 'python', name: 'Python', category: 'backend', logoId: 'python' },
  { id: 'go', name: 'Go', category: 'backend', logoId: 'go' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', logoId: 'graphql' },
  { id: 'dotnet', name: '.NET', category: 'backend', logoId: 'dotnet' },

  // mobile
  { id: 'react-native', name: 'React Native', category: 'mobile', logoId: 'react-native' },
  { id: 'swift', name: 'Swift', category: 'mobile', logoId: 'swift' },
  { id: 'kotlin', name: 'Kotlin', category: 'mobile', logoId: 'kotlin' },
  { id: 'firebase', name: 'Firebase', category: 'mobile', logoId: 'firebase' },

  // cloud
  { id: 'aws', name: 'AWS', category: 'cloud', logoId: 'aws' },
  { id: 'azure', name: 'Azure', category: 'cloud', logoId: 'azure' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', logoId: 'gcp' },
  { id: 'vercel', name: 'Vercel', category: 'cloud', logoId: 'vercel' },

  // data
  { id: 'postgres', name: 'PostgreSQL', category: 'data', logoId: 'postgres' },
  { id: 'redis', name: 'Redis', category: 'data', logoId: 'redis' },
  { id: 'snowflake', name: 'Snowflake', category: 'data', logoId: 'snowflake' },
  { id: 'kafka', name: 'Kafka', category: 'data', logoId: 'kafka' },

  // ai
  { id: 'langchain', name: 'LangChain', category: 'ai', logoId: 'langchain' },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', logoId: 'pytorch' },
  { id: 'pinecone', name: 'Pinecone', category: 'ai', logoId: 'pinecone' },

  // devops
  { id: 'terraform', name: 'Terraform', category: 'devops', logoId: 'terraform' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', logoId: 'kubernetes' },
  { id: 'docker', name: 'Docker', category: 'devops', logoId: 'docker' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'devops', logoId: 'github' },
  { id: 'grafana', name: 'Grafana', category: 'devops', logoId: 'grafana' },
];

/** Filter tabs on the technologies section. */
export const technologyGroups: TechnologyGroup[] = [
  {
    category: 'frontend',
    label: 'Websites',
    description:
      'What your customers see and click. We build it once as a set of reusable pieces, so every new page looks right.',
    technologyIds: ['nextjs', 'react', 'typescript', 'storybook', 'figma'],
  },
  {
    category: 'backend',
    label: 'Servers',
    description:
      'The part that does the work behind the screen. We pick well-known tools, because someone has to maintain them for years.',
    technologyIds: ['node', 'python', 'go', 'dotnet', 'graphql'],
  },
  {
    category: 'mobile',
    label: 'Mobile',
    description:
      'One app for both iPhone and Android where that makes sense, and separate builds where a phone feature needs it.',
    technologyIds: ['react-native', 'swift', 'kotlin', 'firebase'],
  },
  {
    category: 'cloud',
    label: 'Hosting',
    description:
      'Whichever cloud you already use. We keep things portable, so you are not stuck if you want to move later.',
    technologyIds: ['aws', 'azure', 'gcp', 'vercel'],
  },
  {
    category: 'data',
    label: 'Data',
    description:
      'Where your information lives. A normal database for most things, and faster tools when there is a lot of it.',
    technologyIds: ['postgres', 'redis', 'kafka', 'snowflake'],
  },
  {
    category: 'ai',
    label: 'AI',
    description:
      'Tools for search, chat and automation — plus the testing setup that proves the answers are actually right.',
    technologyIds: ['langchain', 'pytorch', 'pinecone'],
  },
  {
    category: 'devops',
    label: 'Releases',
    description:
      'How updates reach your users safely, and how we spot a problem before your customers do.',
    technologyIds: ['terraform', 'kubernetes', 'docker', 'github-actions', 'grafana'],
  },
];
