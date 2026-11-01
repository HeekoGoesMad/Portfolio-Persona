# Markdown-to-Sanity migration preview

Status: prepared for owner review; no content import or publication has run.

## Source and scope
The known source is `D:\Job Related\Portfolio\Portfolio Persona`: three English Markdown case studies with YAML frontmatter, a public profile object, scene/audio configuration and six concept-gallery entries. All three projects are illustrative examples. Phase 1 prepares project text and cover mappings; profile, scene, full asset management and later content types keep their existing scheduled slices.

## Target
Use the existing `Portfolio-Persona` project (`4zq18q5c`), `production` dataset, and the code-managed Studio at the sibling `studio-portfolio-persona` directory. `schemaTypes/project.ts` is authoritative. No embedded Studio route is created in Astro.

## Extraction and transform
- Read local frontmatter and Markdown directly; snapshot the source before conversion.
- Convert Markdown directly to Portable Text, retaining heading anchors, lists, inline marks and links. Unsupported constructs must fail validation instead of disappearing.
- Preserve public slugs: `afterhours`, `common-ground`, `form-and-function`.
- Keep stable source paths in `migrationMetadata.sourcePath`. Let Sanity allocate ordinary document IDs and persist a source-path-to-document-ID manifest; reruns resolve the existing record rather than creating duplicates. This follows the best-practices skill's global ID rule while providing the migration skill's repeatability requirement.
- Keep example flags and all supplied text intact. No fabricated biography, employment or outcomes.
- Generate reviewable draft payloads and a count/quality report before any remote writes. A future full asset migration uploads original covers before linking their returned references; no broken local URLs are passed off as migrated assets.

## Validation and approval
Validate all project fields, body blocks and heading anchors against the website boundary contract. Compare counts, slugs and representative rendered content. The initial three local SVG cover references are recorded explicitly as legacy references; remote asset import is a separate reviewed action.

Before writing migration content to Sanity, the owner reviews the schema, generated documents and validation report. Import creates unpublished drafts only. Publishing those documents and deploying a public website remain separate actions. No automatic overwrite or destructive bulk import is permitted.

## Cutover
Default public builds continue using local Markdown until a verified CMS-published path is explicitly selected. Test builds may select `CONTENT_SOURCE=sanity`; a failed CMS read fails that build rather than silently falling back. Keep the existing local files and a known-good website build for rollback. Full migration/cutover follows the saved CMS-12 acceptance criteria, including media, redirects, reference checks and owner review.
