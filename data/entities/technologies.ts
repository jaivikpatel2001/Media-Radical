import type { Technology, TechnologyGroup } from '@/types/content';

/**
 * The working stack.
 *
 * `logoId` keys into TECH_LOGOS (components/icons/techLogos.ts). An empty
 * string means no logo exists for that brand — simple-icons removed AWS,
 * Azure, Canva, the Adobe suite and OpenAI over trademark policy — and the
 * grid renders a lettermark tile instead of dropping the entry.
 */
export const technologies: Technology[] = [
  /* ---------------------------------------------------------------- design */
  { id: 'figma', name: 'Figma', category: 'design', logoId: 'figma' },
  { id: 'canva', name: 'Canva', category: 'design', logoId: '' },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'design', logoId: '' },
  { id: 'photoshop', name: 'Photoshop', category: 'design', logoId: '' },
  { id: 'illustrator', name: 'Illustrator', category: 'design', logoId: '' },
  { id: 'sketch', name: 'Sketch', category: 'design', logoId: 'sketch' },
  { id: 'framer', name: 'Framer', category: 'design', logoId: 'framer' },
  { id: 'storybook', name: 'Storybook', category: 'design', logoId: 'storybook' },

  /* -------------------------------------------------------------- frontend */
  { id: 'html', name: 'HTML5', category: 'frontend', logoId: 'html' },
  { id: 'css', name: 'CSS3', category: 'frontend', logoId: 'css' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', logoId: 'javascript' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', logoId: 'typescript' },
  { id: 'react', name: 'React', category: 'frontend', logoId: 'react' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', logoId: 'nextjs' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', logoId: 'vue' },
  { id: 'nuxt', name: 'Nuxt', category: 'frontend', logoId: 'nuxt' },
  { id: 'angular', name: 'Angular', category: 'frontend', logoId: 'angular' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', logoId: 'svelte' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', logoId: 'tailwind' },
  { id: 'sass', name: 'Sass', category: 'frontend', logoId: 'sass' },
  { id: 'redux', name: 'Redux', category: 'frontend', logoId: 'redux' },
  { id: 'vite', name: 'Vite', category: 'frontend', logoId: 'vite' },

  /* --------------------------------------------------------------- backend */
  { id: 'node', name: 'Node.js', category: 'backend', logoId: 'node' },
  { id: 'express', name: 'Express', category: 'backend', logoId: 'express' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', logoId: 'nestjs' },
  { id: 'python', name: 'Python', category: 'backend', logoId: 'python' },
  { id: 'django', name: 'Django', category: 'backend', logoId: 'django' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', logoId: 'fastapi' },
  { id: 'php', name: 'PHP', category: 'backend', logoId: 'php' },
  { id: 'laravel', name: 'Laravel', category: 'backend', logoId: 'laravel' },
  { id: 'go', name: 'Go', category: 'backend', logoId: 'go' },
  { id: 'spring', name: 'Spring', category: 'backend', logoId: 'spring' },
  { id: 'dotnet', name: '.NET', category: 'backend', logoId: 'dotnet' },
  { id: 'rails', name: 'Ruby on Rails', category: 'backend', logoId: 'rails' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', logoId: 'graphql' },

  /* -------------------------------------------------------------- database */
  { id: 'mongodb', name: 'MongoDB', category: 'database', logoId: 'mongodb' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database', logoId: 'postgres' },
  { id: 'mysql', name: 'MySQL', category: 'database', logoId: 'mysql' },
  { id: 'redis', name: 'Redis', category: 'database', logoId: 'redis' },
  { id: 'sqlite', name: 'SQLite', category: 'database', logoId: 'sqlite' },
  { id: 'firebase', name: 'Firebase', category: 'database', logoId: 'firebase' },
  { id: 'supabase', name: 'Supabase', category: 'database', logoId: 'supabase' },
  { id: 'prisma', name: 'Prisma', category: 'database', logoId: 'prisma' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'database', logoId: 'elasticsearch' },
  { id: 'kafka', name: 'Kafka', category: 'database', logoId: 'kafka' },
  { id: 'snowflake', name: 'Snowflake', category: 'database', logoId: 'snowflake' },

  /* ------------------------------------------------------------------- cms */
  { id: 'wordpress', name: 'WordPress', category: 'cms', logoId: 'wordpress' },
  { id: 'shopify', name: 'Shopify', category: 'cms', logoId: 'shopify' },
  { id: 'strapi', name: 'Strapi', category: 'cms', logoId: 'strapi' },
  { id: 'contentful', name: 'Contentful', category: 'cms', logoId: 'contentful' },
  { id: 'sanity', name: 'Sanity', category: 'cms', logoId: 'sanity' },
  { id: 'drupal', name: 'Drupal', category: 'cms', logoId: 'drupal' },
  { id: 'ghost', name: 'Ghost', category: 'cms', logoId: 'ghost' },
  { id: 'webflow', name: 'Webflow', category: 'cms', logoId: 'webflow' },

  /* ---------------------------------------------------------------- mobile */
  { id: 'react-native', name: 'React Native', category: 'mobile', logoId: 'react-native' },
  { id: 'flutter', name: 'Flutter', category: 'mobile', logoId: 'flutter' },
  { id: 'swift', name: 'Swift', category: 'mobile', logoId: 'swift' },
  { id: 'kotlin', name: 'Kotlin', category: 'mobile', logoId: 'kotlin' },
  { id: 'android', name: 'Android', category: 'mobile', logoId: 'android' },
  { id: 'ionic', name: 'Ionic', category: 'mobile', logoId: 'ionic' },
  { id: 'expo', name: 'Expo', category: 'mobile', logoId: 'expo' },

  /* ----------------------------------------------------------------- cloud */
  { id: 'aws', name: 'AWS', category: 'cloud', logoId: '' },
  { id: 'azure', name: 'Azure', category: 'cloud', logoId: '' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', logoId: 'gcp' },
  { id: 'docker', name: 'Docker', category: 'cloud', logoId: 'docker' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'cloud', logoId: 'kubernetes' },
  { id: 'terraform', name: 'Terraform', category: 'cloud', logoId: 'terraform' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'cloud', logoId: 'github-actions' },
  { id: 'jenkins', name: 'Jenkins', category: 'cloud', logoId: 'jenkins' },
  { id: 'nginx', name: 'Nginx', category: 'cloud', logoId: 'nginx' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'cloud', logoId: 'cloudflare' },
  { id: 'vercel', name: 'Vercel', category: 'cloud', logoId: 'vercel' },
  { id: 'netlify', name: 'Netlify', category: 'cloud', logoId: 'netlify' },
  { id: 'digitalocean', name: 'DigitalOcean', category: 'cloud', logoId: 'digitalocean' },
  { id: 'grafana', name: 'Grafana', category: 'cloud', logoId: 'grafana' },

  /* -------------------------------------------------------------------- ai */
  { id: 'openai', name: 'OpenAI', category: 'ai', logoId: '' },
  { id: 'langchain', name: 'LangChain', category: 'ai', logoId: 'langchain' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai', logoId: 'huggingface' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', logoId: 'tensorflow' },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', logoId: 'pytorch' },
  { id: 'scikit-learn', name: 'scikit-learn', category: 'ai', logoId: 'scikit-learn' },
  { id: 'pandas', name: 'pandas', category: 'ai', logoId: 'pandas' },
  { id: 'numpy', name: 'NumPy', category: 'ai', logoId: 'numpy' },
  { id: 'ollama', name: 'Ollama', category: 'ai', logoId: 'ollama' },
];

/**
 * Filter tabs. Descriptions stay in plain English — this section is often the
 * first place a non-technical visitor meets these names.
 */
export const technologyGroups: TechnologyGroup[] = [
  {
    category: 'design',
    label: 'UI/UX Design',
    description:
      'How your product looks and feels. We design it, test it with real people, then hand over pieces your developers can use.',
    technologyIds: [
      'figma',
      'canva',
      'adobe-xd',
      'photoshop',
      'illustrator',
      'sketch',
      'framer',
      'storybook',
    ],
  },
  {
    category: 'frontend',
    label: 'Frontend',
    description:
      'Everything your customers see and click. Built once as reusable pieces, so every new page looks right.',
    technologyIds: [
      'html',
      'css',
      'javascript',
      'typescript',
      'react',
      'nextjs',
      'vue',
      'nuxt',
      'angular',
      'svelte',
      'tailwind',
      'sass',
      'redux',
      'vite',
    ],
  },
  {
    category: 'backend',
    label: 'Backend',
    description:
      'The engine behind the screen. It handles your logic, your rules and your integrations with other systems.',
    technologyIds: [
      'node',
      'express',
      'nestjs',
      'python',
      'django',
      'fastapi',
      'php',
      'laravel',
      'go',
      'spring',
      'dotnet',
      'rails',
      'graphql',
    ],
  },
  {
    category: 'database',
    label: 'Database',
    description:
      'Where your information lives. We pick the type that matches your data, then make sure it is backed up and fast to read.',
    technologyIds: [
      'mongodb',
      'postgres',
      'mysql',
      'redis',
      'sqlite',
      'firebase',
      'supabase',
      'prisma',
      'elasticsearch',
      'kafka',
      'snowflake',
    ],
  },
  {
    category: 'cms',
    label: 'CMS',
    description:
      'So your team can update the site without calling a developer. We set it up around how you actually publish.',
    technologyIds: [
      'wordpress',
      'shopify',
      'strapi',
      'contentful',
      'sanity',
      'drupal',
      'ghost',
      'webflow',
    ],
  },
  {
    category: 'mobile',
    label: 'Mobile Apps',
    description:
      'iPhone and Android. One shared codebase where that saves you money, separate builds where a phone feature needs it.',
    technologyIds: [
      'react-native',
      'flutter',
      'swift',
      'kotlin',
      'android',
      'ionic',
      'expo',
    ],
  },
  {
    category: 'cloud',
    label: 'Cloud & DevOps',
    description:
      'Where your software runs and how updates get there safely. Whichever cloud you already use.',
    technologyIds: [
      'aws',
      'azure',
      'gcp',
      'docker',
      'kubernetes',
      'terraform',
      'github-actions',
      'jenkins',
      'nginx',
      'cloudflare',
      'vercel',
      'netlify',
      'digitalocean',
      'grafana',
    ],
  },
  {
    category: 'ai',
    label: 'AI',
    description:
      'Search, chat and automation — plus the testing setup that proves the answers are actually right.',
    technologyIds: [
      'openai',
      'langchain',
      'huggingface',
      'tensorflow',
      'pytorch',
      'scikit-learn',
      'pandas',
      'numpy',
      'ollama',
    ],
  },
];
