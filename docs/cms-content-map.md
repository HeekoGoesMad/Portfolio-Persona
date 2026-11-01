# Editable content map — CMS-01

Owner confirmed online editing with a private login, free-first operation and the existing Persona appearance. First implementation increment: CMS-01–03 only; later tasks retain their saved order.

| Existing location | Managed document / fields | Behavior |
|---|---|---|
| `src/content/projects/*.md` | `project`: title, slug, summary, role, technologies, date, category, order, featured, accent, example, body | Required core fields; native Sanity drafts. Published slug is stable when title changes. Archive/trash controls follow in CMS-06. |
| Project covers and screenshots | Project image references, alt/caption/credit | Existing local cover paths retained during phase 1. Uploaded covers and image blocks follow in CMS-04–05. |
| `src/data/profile.ts` | Profile singleton: name, role, introduction, biography, skills, public email, socials, résumé, example state | Missing optional contact/résumé links stay hidden. CMS-07. |
| Home/shared layout strings | Page-copy records: menu labels/descriptions, headings, footer, settings labels, accessible actions | Stable internal route/action IDs; required action labels. CMS-08. |
| About/contact page strings | About/contact copy: headings, introductions, gallery caption, contact placeholders | Long content and optional sections tested. CMS-08a. |
| Project/recovery page strings | Collection/article copy, empty states, 404 recovery text | Existing filters, heading anchors and recovery destinations stay intact. CMS-08b. |
| `persona.artbook` | Gallery entries: title, role, image, alt text, attribution, order, visibility | Add/edit/hide/order/remove entries. CMS-09. |
| `persona.background`, portrait, classroom loop/poster | Scene singleton and asset references | Every responsive source must use the selected image, with poster fallback. CMS-10/10a. |
| `persona.tracks`, sound map | Track names/files and sound cue assignments | Preserve stable cue IDs, silent first visit and opt-in playback. CMS-10. |
| Theme tokens, optional sections | Supported palette preset and visibility settings | No arbitrary CSS/JavaScript or deletion of essential controls. CMS-11. |
| Layout metadata, robots, sitemap | Search/share settings, image, explicit indexing preference | Domain and secrets remain deployment configuration. CMS-11a. |

## Project contract for the first increment

- Provider `_id` identifies a document. `slug.current` is the public route and is unique, required, lowercase and hyphenated. Existing project slugs remain `afterhours`, `common-ground`, `form-and-function`.
- Native Sanity draft IDs remain private and are never included in the public adapter. Archive/trash flags are also excluded defensively before lifecycle UI is added.
- The public adapter retains `{ id, data }` for existing list/sitemap consumers and adds an explicit source discriminator for local Markdown versus CMS rich text.
- Required content: title, summary, role, category, at least one technology, valid date and a nonempty rich-text body. Default new content remains honestly labeled as an example.
- Optional external links accept only HTTP(S). Inline text links accept HTTP(S), mailto, relative site paths and fragments. No executable HTML, arbitrary custom rich-text objects or unknown mark definitions.
- Native document validation assists editors; independent build-time validation rejects malformed API content, drafts, duplicated slugs and unsafe links. Invalid CMS content fails the build with document/field context.
- Initial rich text supports paragraphs, second/third-level headings, block quotes, emphasis, strong text, code marks and lists. Stable heading IDs use an explicit anchor when supplied, otherwise the stable block key. Media/code blocks arrive in CMS-05.

## Migration and authority

Phase 1 defaults to the current local content. `CONTENT_SOURCE=sanity` explicitly tests CMS-published content. There is no automatic fallback to local examples if the CMS is empty or unavailable. Full import and authoritative cutover remain CMS-12. Nothing is published to a public website during this increment.
