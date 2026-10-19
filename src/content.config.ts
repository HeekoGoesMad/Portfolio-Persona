import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    role: z.string().min(1),
    technologies: z.array(z.string().min(1)).min(1),
    date: z.coerce.date(),
    thumbnail: z.string().startsWith('/').optional(),
    thumbnailAlt: z.string().min(1).optional(),
    order: z.number().int().nonnegative().default(99),
    featured: z.boolean().default(false),
    repository: z.url().optional(),
    demo: z.url().optional(),
    example: z.boolean().default(true),
    draft: z.boolean().default(false),
    category: z.string().min(1),
    accent: z.enum(['cyan','pink','lime']).default('cyan'),
  }).refine(p => !p.thumbnail || !!p.thumbnailAlt, { message: 'thumbnailAlt is required when thumbnail is supplied', path: ['thumbnailAlt'] }),
});

export const collections = { projects };
