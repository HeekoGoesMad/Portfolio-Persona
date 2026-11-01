import { z } from 'zod';

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.');
const webUrl = z.url().refine(value => ['https:', 'http:'].includes(new URL(value).protocol), 'Use an HTTP(S) URL.');
export function safeTextLink(value: string) {
  if (value.startsWith('#') || (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\'))) return true;
  try { return ['https:', 'http:', 'mailto:'].includes(new URL(value).protocol); } catch { return false; }
}
const block = z.object({
  _type: z.literal('block'), _key: text,
  style: z.enum(['normal', 'h2', 'h3', 'blockquote']).default('normal'),
  anchor: slug.optional(),
  children: z.array(z.object({
    _type: z.literal('span'), _key: text, text: z.string(), marks: z.array(z.string()).default([]),
  })).min(1),
  markDefs: z.array(z.object({
    _type: z.literal('link'), _key: text, href: text.refine(safeTextLink, 'Use a safe web, email or internal link.'),
  })).default([]),
  listItem: z.enum(['bullet', 'number']).optional(), level: z.number().int().min(1).max(6).optional(),
});
export type CmsBlock = z.infer<typeof block>;
export const headingId = (value: { _key: string; anchor?: string }) => value.anchor || `section-${value._key}`;

const document = z.object({
  _id: text.refine(id => !id.startsWith('drafts.') && !id.startsWith('versions.'), 'Only published documents may enter the website.'),
  title: text, slug: z.object({ current: slug }), summary: text, role: text,
  technologies: z.array(text).min(1), date: z.coerce.date(), category: text,
  order: z.number().int().nonnegative().default(99), featured: z.boolean().default(false),
  example: z.boolean().default(true), accent: z.enum(['cyan', 'pink', 'lime']).default('cyan'),
  thumbnail: z.string().regex(/^\/(?:art|persona)\//, 'Select an existing local portfolio cover.').nullish(),
  thumbnailAlt: text.nullish(), repository: webUrl.nullish(), demo: webUrl.nullish(),
  archivedAt: z.null().optional(), trashedAt: z.null().optional(),
  body: z.array(block).min(1).refine(blocks => blocks.some(b => b.children.some(s => s.text.trim())), 'Write some case-study content.'),
}).superRefine((project, context) => {
  if (project.thumbnail && !project.thumbnailAlt) context.addIssue({ code: 'custom', path: ['thumbnailAlt'], message: 'Add alt text for the cover.' });
  const keys = new Set<string>();
  const anchors = new Set<string>();
  project.body.forEach((item, index) => {
    if (keys.has(item._key)) context.addIssue({ code: 'custom', path: ['body', index, '_key'], message: 'Duplicate block key.' });
    keys.add(item._key);
    if (item.style === 'h2' || item.style === 'h3') {
      const anchor = headingId(item);
      if (anchors.has(anchor)) context.addIssue({ code: 'custom', path: ['body', index], message: 'Duplicate heading anchor.' });
      anchors.add(anchor);
    }
    const marks = new Set(['strong', 'em', 'code', ...item.markDefs.map(mark => mark._key)]);
    if (item.children.some(span => span.marks.some(mark => !marks.has(mark)))) context.addIssue({ code: 'custom', path: ['body', index], message: 'Unsupported text mark.' });
  });
});

export function parseCmsProjects(input: unknown) {
  const result = z.array(document).safeParse(input);
  if (!result.success) throw new Error(`Invalid CMS project content:\n${z.prettifyError(result.error)}`);
  const slugs = new Set<string>();
  return result.data.map(project => {
    const id = project.slug.current;
    if (slugs.has(id)) throw new Error(`Duplicate CMS project slug: ${id}`);
    slugs.add(id);
    const { _id, slug: _slug, body, archivedAt: _archivedAt, trashedAt: _trashedAt, ...metadata } = project;
    return {
      id, documentId: _id, source: 'sanity' as const, body,
      data: { ...metadata, draft: false, thumbnail: metadata.thumbnail ?? undefined,
        thumbnailAlt: metadata.thumbnailAlt ?? undefined, repository: metadata.repository ?? undefined, demo: metadata.demo ?? undefined },
    };
  });
}
export type CmsProject = ReturnType<typeof parseCmsProjects>[number];
