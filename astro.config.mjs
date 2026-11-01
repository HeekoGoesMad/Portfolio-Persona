import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const basePath = process.env.BASE_PATH || env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || env.SITE_URL || 'https://heekogoesmad.github.io',
  base: basePath,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sanity({
    projectId: env.PUBLIC_SANITY_PROJECT_ID || '4zq18q5c',
    dataset: env.PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2026-10-19',
    useCdn: false,
    perspective: 'published',
  })],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
});
