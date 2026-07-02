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

// Long-form writing. Body is Markdown; the article page renders title/description
// from frontmatter and emits BlogPosting JSON-LD.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(), // optimized in-article cover (WebP) in /public
    coverAlt: z.string().optional(),
    ogImage: z.string().optional(), // 1200×630 JPEG for social/link previews
    alsoOn: z.string().url().optional(), // canonical elsewhere (e.g. LinkedIn cross-post)
  }),
});

export const collections = { projects, posts };
