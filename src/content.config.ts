import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Level-1 metadata lives in frontmatter (scannable cards + JSON feed for the search island).
// Level-2/3 (architecture, code, evidence) lives in the markdown body via <details>.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    period: z.string(),
    org: z.string().optional(),
    role: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = { projects };
