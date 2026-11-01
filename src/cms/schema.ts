import { defineArrayMember, defineField, defineType } from 'sanity';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectSchema = defineType({
  name: 'project',
  title: 'Project Case Study',
  type: 'document',
  groups: [
    { name: 'overview', title: '1. Overview & Categorization', default: true },
    { name: 'media', title: '2. Images & Deliverables' },
    { name: 'story', title: '3. Deep-Dive Case Study' },
    { name: 'links', title: '4. Links & Visibility' },
  ],
  initialValue: {
    example: false,
    featured: true,
    hidden: false,
    order: 1,
    accent: 'cyan',
    category: 'Mobile & Full-Stack',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'overview',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title', maxLength: 96 },
      validation: (r) =>
        r.required().custom((val) => !val?.current || slugPattern.test(val.current) || 'Use lowercase words separated by hyphens.'),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary / Card Description',
      type: 'text',
      rows: 3,
      group: 'overview',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      group: 'overview',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category (e.g., Web App, Mobile & Full-Stack, AI & Analytics, UI Design)',
      type: 'string',
      group: 'overview',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'technologies',
      title: 'Tech Stack Tags',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'string', validation: (r) => r.required().min(1) })],
      validation: (r) => r.required().min(1).unique(),
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'date',
      group: 'overview',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Upload Thumbnail / Cover Image (Cloud Hosted & Auto-WebP)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Or Local Cover Path (Fallback, e.g., /art/betogether.svg)',
      type: 'string',
      group: 'media',
    }),
    defineField({
      name: 'thumbnailAlt',
      title: 'Cover Alt Text (Accessibility & SEO)',
      type: 'string',
      group: 'media',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'deliverables',
      title: 'Key Deliverables & Outcomes',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'architectureOverview',
      title: 'System Architecture Overview',
      type: 'text',
      rows: 4,
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Interactive Project Gallery (Screenshots & Diagrams)',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Upload Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'localSrc', title: 'Or Local Image Path', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Case Study Content',
      type: 'array',
      group: 'story',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading (H2)', value: 'h2' },
            { title: 'Subheading (H3)', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Inline Code', value: 'code' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'repository',
      title: 'GitHub / Repository URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'demo',
      title: 'Live Demo URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'order',
      title: 'Display Order (Lower appears first)',
      type: 'number',
      group: 'links',
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      group: 'links',
    }),
    defineField({
      name: 'hidden',
      title: 'Hide Project (Keep saved without deleting)',
      type: 'boolean',
      group: 'links',
    }),
    defineField({
      name: 'example',
      title: 'Mark as Illustrative Example',
      type: 'boolean',
      group: 'links',
    }),
    defineField({
      name: 'accent',
      title: 'Card Accent Color',
      type: 'string',
      group: 'links',
      options: { list: ['cyan', 'pink', 'lime'], layout: 'radio' },
    }),
  ],
});

export const profileSchema = defineType({
  name: 'profile',
  title: 'Creator Profile & Skills',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'handle', title: 'Handle / Username', type: 'string' }),
    defineField({ name: 'role', title: 'Headline / Role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'introduction', title: 'Hero Introduction', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'biography', title: 'Full Biography', type: 'text', rows: 5, validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Public Contact Email', type: 'string' }),
    defineField({ name: 'resumeFile', title: 'Upload Résumé PDF', type: 'file', options: { accept: '.pdf' } }),
    defineField({ name: 'resumeUrl', title: 'Or External/Local Résumé URL', type: 'string' }),
    defineField({
      name: 'portraitImage',
      title: 'Upload Hero Portrait / Avatar Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'skillGroups',
      title: 'Skills & Tech Stack Grouped by Domain',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'domain', title: 'Domain Name (e.g., Frontend & UI, Mobile & Systems, AI & Backend)', type: 'string' }),
            defineField({ name: 'items', title: 'Skills', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Profiles (GitHub, LinkedIn, etc.)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Platform Label', type: 'string' }),
            defineField({ name: 'url', title: 'Profile URL', type: 'url' }),
          ],
        }),
      ],
    }),
  ],
});

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings, Motion & Transitions Editor',
  type: 'document',
  groups: [
    { name: 'copy', title: '1. Dynamic Titles & Copy', default: true },
    { name: 'transitions', title: '2. Transition & Animation Editor' },
    { name: 'theme', title: '3. Theme & Color Mode' },
    { name: 'seo', title: '4. SEO, OG Share & Analytics' },
    { name: 'contact', title: '5. Contact Form & Spam Protection' },
  ],
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string', group: 'copy' }),
    defineField({ name: 'heroDecal', title: 'Vertical Hero Decal Text (Default: PORTFOLIO)', type: 'string', group: 'copy' }),
    defineField({ name: 'projectsHeading', title: 'Projects Page Heading', type: 'string', group: 'copy' }),
    defineField({ name: 'aboutHeading', title: 'About Page Heading', type: 'string', group: 'copy' }),
    defineField({ name: 'contactHeading', title: 'Contact Page Heading', type: 'string', group: 'copy' }),
    defineField({
      name: 'transitionStyle',
      title: 'Route Splash Transition Style',
      type: 'string',
      group: 'transitions',
      options: {
        list: [
          { title: 'Diagonal Blade Wipe (Persona 3 Reload)', value: 'wipe' },
          { title: 'Midnight TV Curtain (Persona 4 Golden)', value: 'curtain' },
          { title: 'Phantom Diagonal Slash (Persona 5 Royal)', value: 'slash' },
        ],
        layout: 'radio',
      },
      initialValue: 'wipe',
    }),
    defineField({
      name: 'selectionDurationMs',
      title: 'Menu Selection Speed (ms, default 120)',
      type: 'number',
      group: 'transitions',
      initialValue: 120,
    }),
    defineField({
      name: 'panelDurationMs',
      title: 'Route Splash / Panel Speed (ms, default 240)',
      type: 'number',
      group: 'transitions',
      initialValue: 240,
    }),
    defineField({
      name: 'pageDurationMs',
      title: 'Page Entrance Speed (ms, default 280)',
      type: 'number',
      group: 'transitions',
      initialValue: 280,
    }),
    defineField({
      name: 'easingCurve',
      title: 'CSS Easing Curve (default cubic-bezier(0.23, 1, 0.32, 1))',
      type: 'string',
      group: 'transitions',
      initialValue: 'cubic-bezier(0.23, 1, 0.32, 1)',
    }),
    defineField({
      name: 'defaultPersonaTheme',
      title: 'Default Persona Theme',
      type: 'string',
      group: 'theme',
      options: { list: ['p3r', 'p4g', 'p5r'] },
      initialValue: 'p3r',
    }),
    defineField({
      name: 'defaultColorMode',
      title: 'Default Dark / Light Mode',
      type: 'string',
      group: 'theme',
      options: { list: ['system', 'dark', 'light'] },
      initialValue: 'dark',
    }),
    defineField({ name: 'seoDescription', title: 'Default Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage', title: 'Upload Social Share Image (Open Graph 1200x630)', type: 'image', group: 'seo' }),
    defineField({ name: 'umamiWebsiteId', title: 'Umami Analytics Website ID (Optional)', type: 'string', group: 'seo' }),
    defineField({ name: 'umamiScriptUrl', title: 'Umami Script URL', type: 'url', group: 'seo' }),
    defineField({ name: 'contactEndpoint', title: 'Contact Form Webhook / Endpoint URL (e.g., Formspree / Web3Forms)', type: 'url', group: 'contact' }),
    defineField({ name: 'turnstileSiteKey', title: 'Cloudflare Turnstile Site Key (Spam Protection)', type: 'string', group: 'contact' }),
  ],
});

export const schemaTypes = [projectSchema, profileSchema, siteSettingsSchema];
