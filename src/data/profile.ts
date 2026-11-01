export interface SkillGroup {
  domain: string;
  items: string[];
}

export const profile = {
  name: 'Adrienne Lie',
  handle: 'HeekoGoesMad',
  role: 'Full-Stack, Mobile & Creative Developer',
  introduction: 'Crafting expressive interfaces, real-time mobile experiences, and intelligent full-stack systems inspired by stylized game direction.',
  biography: 'I build end-to-end applications across mobile, web, and machine learning—from real-time Flutter social maps (BeTogether) and offline-first Kotlin GPS telemetry (Running Tracker) to transformer-powered sentiment intelligence dashboards (iSpy). My frontend work blends kinetic typography, reverse-engineered game UI motion, and strict WCAG accessibility.',
  skills: [
    'TypeScript & Next.js',
    'Astro & Kinetic UI',
    'Flutter & Dart',
    'Kotlin & Jetpack Compose',
    'Python & FastAPI',
    'HuggingFace NLP',
    'Firebase & MongoDB',
    'UI Reverse Engineering',
  ],
  skillGroups: [
    {
      domain: 'Frontend & Creative UI',
      items: ['TypeScript', 'Next.js', 'Astro', 'React', 'Tailwind CSS', 'Kinetic Game UI'],
    },
    {
      domain: 'Mobile & Native Systems',
      items: ['Flutter', 'Dart', 'Kotlin', 'Jetpack Compose', 'Room SQLite', 'MapLibre Native'],
    },
    {
      domain: 'AI, NLP & Backend',
      items: ['Python', 'FastAPI', 'HuggingFace Transformers (RoBERTa / DeBERTa)', 'Celery & Redis', 'Firebase', 'MongoDB'],
    },
    {
      domain: 'Reverse Engineering & Quality',
      items: ['REA Static/Binary Analysis', 'Playwright E2E', 'GitHub Actions CI/CD', 'WCAG 2.1 AA Accessibility'],
    },
  ] as SkillGroup[],
  email: 'adriennelie190505@gmail.com',
  socials: [
    { label: 'GitHub (@HeekoGoesMad)', url: 'https://github.com/HeekoGoesMad' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/adrienne-lie' },
    { label: 'Email Direct', url: 'mailto:adriennelie190505@gmail.com' },
  ] as { label: string; url: string }[],
  resume: '/resume.pdf',
  example: false,
};
