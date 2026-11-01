# Implementation checklist

Status is updated from verification evidence, not elapsed effort.

## Task 1: Establish project records

- [x] Complete

**Description:** Save the approved plan, task checklist and project conventions without overwriting existing work.

**Acceptance criteria:** Plan and task records match the approved scope; commands and source locations are recorded.

**Verification:** Review the records and target folder.

**Dependencies:** None

**Files likely touched:** tasks/plan.md, tasks/todo.md, AGENTS.md

**Estimated scope:** S (1-5 source/document files per slice; related media excluded).

## Task 2: Measure reference behavior

- [x] Complete

**Description:** Record observed UI states, sampled transitions and uncertainty from the supplied recordings.

**Acceptance criteria:** Ledger distinguishes observation/inference/proposal; includes timestamped transitions; missing behavior remains unknown.

**Verification:** Recheck measured frame windows against the recordings.

**Dependencies:** 1

**Files likely touched:** docs/reference-ledger.md, docs/design-contract.md, docs/assets.md

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 3: Bootstrap the content-driven site

- [x] Complete

**Description:** Configure the static application, validated content and repeatable commands.

**Acceptance criteria:** Pinned dependencies; validated example content; production routes build.

**Verification:** npm run check; npm run build; invalid-content fixture.

**Dependencies:** 1

**Files likely touched:** package/config, content schema, shared layout, project loader

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Checkpoint A

- [x] Evidence reviewed; appropriate checks/build pass; core flow verified; limitations recorded.

## Task 4: Deliver the landing menu

- [x] Complete

**Description:** Implement the original responsive landing composition and immediate project navigation.

**Acceptance criteria:** Readable responsive layout; keyboard/pointer menu; original illustration.

**Verification:** Browser screenshot and keyboard checks at 360/768/1440px.

**Dependencies:** 2,3

**Files likely touched:** home page, scene component, navigation, theme styles

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 5: Deliver project discovery

- [x] Complete

**Description:** Provide a selectable project index with preview and URL-based technology filters.

**Acceptance criteria:** Three labeled examples; correct filter/history state; clear empty state.

**Verification:** Browser filter, direct-query and Back/Forward checks.

**Dependencies:** 4

**Files likely touched:** project index, preview, discovery controller, browser tests

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 6: Deliver case studies

- [x] Complete

**Description:** Render readable full Markdown articles and section-anchor navigation.

**Acceptance criteria:** Direct routes; complete case-study sections; absent optional links omitted.

**Verification:** Direct loading, article anchors, long content and history checks.

**Dependencies:** 5

**Files likely touched:** case-study route, article styles, Markdown examples, tests

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Checkpoint B

- [x] Evidence reviewed; appropriate checks/build pass; core flow verified; limitations recorded.

## Task 7: Deliver profile and contact

- [x] Complete

**Description:** Expose editable identity, skills and contact links without invented personal facts.

**Acceptance criteria:** Explicit sample profile; optional résumé hidden when absent; usable configured links.

**Verification:** Profile/contact route and absent-field checks.

**Dependencies:** 6

**Files likely touched:** profile content, about page, contact page, layout

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 8: Implement the motion system

- [x] Complete

**Description:** Share short transition tokens and robust route lifecycle behavior.

**Acceptance criteria:** Reduced motion respected; rapid navigation safe; focus restored appropriately.

**Verification:** Cross-browser navigation, system preference and explicit reduction checks.

**Dependencies:** 2,6

**Files likely touched:** motion tokens, route controller, preference controller, tests

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 9: Implement sound preferences

- [x] Complete

**Description:** Add short original opt-in interface feedback with persistent settings.

**Acceptance criteria:** Silent first visit; deliberate user actions only; storage failure is safe.

**Verification:** Sound opt-in/mute, route persistence and unavailable-storage checks.

**Dependencies:** 8

**Files likely touched:** audio controller, settings UI, tests

**Estimated scope:** S (1-5 source/document files per slice; related media excluded).

## Checkpoint C

- [x] Evidence reviewed; appropriate checks/build pass; core flow verified; limitations recorded.

## Task 10: Verify and optimize

- [x] Complete

**Description:** Resolve observed browser, responsive, accessibility and loading problems; complete metadata/recovery.

**Acceptance criteria:** Check/build and three-engine suite pass; measured performance and accessibility reported; sitemap/404 work.

**Verification:** npm run check; npm run build; npm test; npm run audit:site.

**Dependencies:** 7,8,9

**Files likely touched:** browser suite, audit script, metadata routes, verification report

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 11: Complete maintenance handoff

- [x] Complete

**Description:** Document content editing, theme changes, upgrades, deployment and rollback.

**Acceptance criteria:** Content-only new-project rehearsal succeeds; guide and verification results are accurate.

**Verification:** Add a temporary Markdown project, build, verify route, remove fixture and rebuild.

**Dependencies:** 10

**Files likely touched:** README.md, docs/maintenance.md, docs/deployment.md, verification report

**Estimated scope:** S (1-5 source/document files per slice; related media excluded).

## Delivery checkpoint

- [x] All implemented behavior verified; remaining content/publishing actions explicitly handed off.

## Persona revision delivery

- [x] Recovered material and provenance integrated.
- [x] Game screen composition and reviewed motion implemented.
- [x] Actual menu effects and opt-in two-track player verified.
- [x]51 full browser checks plus12 affected follow-up checks passed.
- [x] Content maintenance rehearsal completed; no temporary content remains.
- [x] Local mobile performance/accessibility targets met.

Remaining owner actions:replace sample content and contact/résumé details. Live screen-reader speech, physical-device review and publication are explicitly not claimed.

## Route splash revision

- [x] Add a shared Persona splash for route activation and history navigation.
- [x] Preserve immediate anchors/filters, focus, opt-in audio and reduced motion.
- [x] Add focused browser coverage and preserve the 404 navigation safeguard.

**Description:** Bridge route changes with a short blue/white destination wipe. **Acceptance:** responsive, interruptible, no initial gate, no extra sound, ordinary-link fallback. **Dependencies:** existing shared layout and router. **Files:** RouteSplash component, route-splash controller, layout, browser checks, docs/route-splash.md. **Size:** M. Verification evidence is appended to docs/verification.md after the final run.

## Project preview bug fix and minimalist refinement revision
- [x] Fix XML entity escaping in Form & Function project preview SVG.
- [x] Remove unwanted subtitle box on `/projects/` and declutter preview typography.
- [x] Reverse engineer and verify soundtrack and artbook executables using REA.
- [x] Integrate 6 authentic Persona 3 Reload Artbook spreads into the `/about/` gallery.
- [x] Wire genuine menu cursor audio feedback to project row interactions.
- [x] Pass all 72 automated browser tests (Chromium, Firefox, WebKit) and Lighthouse baseline.


## Minimal splash refinement
- [x] Remove oversized typography, angled panels and decorative shapes.
- [x] Keep a small destination label and a cyan line on solid blue.
- [x] Validate build and all 21 focused browser checks; update previews.



---

# Online administration task checklist

Status: proposed, awaiting implementation approval. All tasks below are pending; the earlier completed portfolio checklist remains intact. Project commands are the existing `npm run check`, `npm run build` and `npm test`, extended with focused CMS/import/restore checks when those tools exist. No hypothetical command is reported as already implemented or passed.

## Task CMS-01: Define the editable content contract

**Description:** Inventory every current content field and map it to a CMS document, supported block or protected application setting. Confirm owner-only access and free-first requirements.

**Acceptance criteria:**
- [ ] Every visible content/media area has an edit location and optional/required behavior.
- [ ] Project IDs/slugs, example labels, lifecycle states and migration mappings are recorded.
- [ ] Account/host/backup prerequisites and content/layout boundaries are explicit.

**Verification:** Review mapping against all existing routes and `profile.ts`/`persona.ts`; inspect current build baseline. **Dependencies:** None. **Files likely touched:** `docs/cms-content-map.md`, `docs/cms-decisions.md`, `tasks/todo.md`. **Estimated scope:** M, 3 files.

## Task CMS-02: Prove private admin compatibility

**Description:** Add the smallest functional Studio at `/admin` using an owner-controlled Sanity project and supported pinned integrations. Keep it isolated from the public layout and splash.

**Acceptance criteria:**
- [ ] Owner can sign in and edit an initial project document; signed-out users cannot mutate content.
- [ ] `/admin` and nested refresh work in the chosen local/test configuration; public pages do not load Studio code.
- [ ] Astro 7 compatibility, controlled CORS origins and package/runtime requirements are verified.

**Verification:** Check/build; signed-in/out API smoke tests and public bundle inspection. **Dependencies:** CMS-01, owner account setup. **Files likely touched:** `package.json`, `package-lock.json`, `astro.config.mjs`, `sanity.config.ts`, `src/cms/schema.ts`. **Estimated scope:** M, 5 files.

## Task CMS-03: Edit one project end to end

**Description:** Complete a working text-editing path from Studio to a built case-study page through a typed CMS adapter. Keep content-source selection explicit during migration.

**Acceptance criteria:**
- [ ] Title, summary, role, technologies and rich-text content can be edited and published to a local/test build.
- [ ] Draft changes stay private; the published version is validated and rendered with stable slug/heading anchors.
- [ ] Missing required data produces actionable validation; CMS failure fails the build.

**Verification:** Focused publish/render/draft-isolation checks; check/build and a direct case-study route. **Dependencies:** CMS-02. **Files likely touched:** `src/cms/schema.ts`, `src/lib/cms/projects.ts`, `src/lib/projects.ts`, `src/pages/projects/[...slug].astro`, `tests/cms-projects.spec.ts`. **Estimated scope:** M, 5 files.

## Checkpoint A: CMS-01–03
- [ ] Private login and one complete project edit → publish → build → page flow work.
- [ ] Checks/build pass and anonymous draft/write access is rejected.
- [ ] Owner reviews the editor and content contract before expansion.

## Task CMS-04: Manage project cover photos

**Description:** Add reusable upload/selection, crop/focal point, alt text and replacement for project covers.

**Acceptance criteria:**
- [ ] Owner can upload, replace and reuse an image; all responsive URLs use the selected asset.
- [ ] Missing covers have a useful fallback; meaningful image usage requires alt text.
- [ ] Unsupported/oversized uploads and upload failure have clear messages; remote image hosts are constrained.

**Verification:** Upload/replace/failure checks and visual checks at 360/768/1440px; check/build. **Dependencies:** CMS-03. **Files likely touched:** `src/cms/fields/media.ts`, `src/cms/schema.ts`, `src/lib/cms/media.ts`, `src/pages/projects/index.astro`, `tests/cms-media.spec.ts`. **Estimated scope:** M, 5 files; reuse the case-study renderer rather than creating a second media contract.

## Task CMS-05: Edit case-study content blocks

**Description:** Add ordered headings, text, lists, links, code and screenshot/gallery blocks to case studies.

**Acceptance criteria:**
- [ ] Owner can add, remove and reorder supported blocks, including image captions and credits.
- [ ] Long content, lists/code and section navigation remain readable with stable anchors.
- [ ] Unsafe markup/URLs are rejected or safely rendered; optional links stay optional.

**Verification:** Rich-text rendering, anchor and adversarial-content checks; keyboard/manual article review; check/build. **Dependencies:** CMS-04. **Files likely touched:** `src/cms/fields/case-study.ts`, `src/cms/schema.ts`, `src/components/CaseStudyBody.astro`, `src/pages/projects/[...slug].astro`, `tests/cms-body.spec.ts`. **Estimated scope:** M, 5 files.

## Task CMS-06: Manage project lifecycle

**Description:** Complete project creation/duplication, order/featured controls, archive/trash/restore and deliberate slug changes.

**Acceptance criteria:**
- [ ] Published, draft, archived and trashed projects appear in the correct public/admin lists; deleting the last project gives an empty state.
- [ ] Trash is recoverable, referenced/featured items are handled, and permanent deletion is separate and confirmed.
- [ ] Slugs stay stable on title edits; duplicates are rejected and explicit slug changes generate tested redirects.

**Verification:** Create → publish → archive/trash → restore flow, zero-project state and old/new URL tests; check/build. **Dependencies:** CMS-03–05. **Files likely touched:** `src/cms/actions/project-actions.ts`, `src/cms/schema.ts`, `src/lib/cms/projects.ts`, `src/lib/cms/redirects.ts`, `tests/cms-lifecycle.spec.ts`. **Estimated scope:** M, 5 files; the eventual host consumes the redirect contract in CMS-13.

## Checkpoint B: CMS-04–06
- [ ] The owner can manage a complete project with photos and recover a removed project.
- [ ] Rendering and lifecycle checks pass; the website builds without missing references.
- [ ] Owner reviews the everyday project workflow.

## Task CMS-07: Edit profile and contact details

**Description:** Connect identity, biography, skills, public contacts and résumé to one singleton editor and shared data adapter.

**Acceptance criteria:**
- [ ] Changes appear consistently on home/about/contact and shared footer/header content.
- [ ] A résumé PDF can be uploaded/replaced; missing optional email/social/résumé content is omitted cleanly.
- [ ] Example notices remain accurate and no personal facts are invented during migration.

**Verification:** Singleton edit/render and optional-field tests; résumé/contact links on desktop/mobile; check/build. **Dependencies:** CMS-04, CMS-06. **Files likely touched:** `src/cms/schema/profile.ts`, `src/data/profile.ts`, `src/lib/cms/profile.ts`, `src/pages/about.astro`, `tests/cms-profile.spec.ts`. **Estimated scope:** M, up to 5 files; preserve the existing public `profile` contract to limit template changes.

## Task CMS-08: Edit shared page copy

**Description:** Move page headings, descriptions, calls to action, navigation labels, settings copy, footer, empty states and recovery copy into grouped editable records.

**Acceptance criteria:**
- [ ] Shared-shell/home copy has working CMS fields and required action labels; remaining page copy is assigned to CMS-08a/b.
- [ ] Menu labels/descriptions change without breaking stable routes or keyboard behavior.
- [ ] Long/empty values and supported line breaks behave predictably.

**Verification:** Content-map coverage audit and affected route/navigation tests; check/build. **Dependencies:** CMS-01, CMS-07. **Files likely touched:** `src/cms/schema/page-copy.ts`, `src/lib/cms/page-copy.ts`, `src/layouts/Layout.astro`, `src/pages/index.astro`, `tests/cms-copy.spec.ts`. **Estimated scope:** M, 5 files. This slice covers shared shell/home copy; CMS-08a and CMS-08b complete the remaining page templates.

## Task CMS-08a: Connect profile-page and contact-page copy

**Description:** Wire the agreed about/contact copy fields into their public templates using the shared copy adapter.

**Acceptance criteria:**
- [ ] The owner can edit both pages' headings, introductions, captions and contact placeholders.
- [ ] Empty optional content and long headings remain readable without exposing raw markup.
- [ ] Existing contact links, résumé, heading structure and example notices remain correct.

**Verification:** Edit/build/render checks for both pages, narrow-width and keyboard review; check/build. **Dependencies:** CMS-08. **Files likely touched:** `src/cms/schema/page-copy.ts`, `src/pages/about.astro`, `src/pages/contact.astro`, `tests/cms-profile-copy.spec.ts`. **Estimated scope:** M, 4 files.

## Task CMS-08b: Connect discovery and recovery copy

**Description:** Wire editable collection/case-study labels, empty-state actions and 404 text into their templates.

**Acceptance criteria:**
- [ ] All remaining inventoried project/recovery labels have working editor fields.
- [ ] Filters, article anchors and recovery actions keep their stable behavior when labels change.
- [ ] Empty/long content preserves meaningful action names and a useful zero-project state.

**Verification:** Content-map coverage audit and filter/anchor/404 checks; check/build. **Dependencies:** CMS-08a. **Files likely touched:** `src/cms/schema/page-copy.ts`, `src/pages/projects/index.astro`, `src/pages/projects/[...slug].astro`, `src/pages/404.astro`, `tests/cms-discovery-copy.spec.ts`. **Estimated scope:** M, 5 files.

## Task CMS-09: Manage the concept gallery

**Description:** Replace the hardcoded concept archive list with editable gallery entries using the shared asset contract.

**Acceptance criteria:**
- [ ] Owner can add, edit, hide, remove and reorder gallery entries.
- [ ] Titles, descriptions/roles, images, alt text and attribution are editable.
- [ ] A hidden/empty gallery removes its optional section cleanly.

**Verification:** Gallery CRUD/order/empty-state tests and responsive review; check/build. **Dependencies:** CMS-04, CMS-07. **Files likely touched:** `src/cms/schema/gallery.ts`, `src/lib/cms/gallery.ts`, `src/pages/about.astro`, `tests/cms-gallery.spec.ts`. **Estimated scope:** M, 4 files.

## Checkpoint C: CMS-07–09
- [ ] Profile/contact, shared copy and gallery updates render correctly without code edits.
- [ ] Required navigation/accessibility text remains valid; checks/build pass.
- [ ] Owner reviews field names and editor organization.

## Task CMS-10: Manage scene and audio media

**Description:** Make background image/video/poster, portrait, soundtrack options and interface-sound assignments editable through the existing media contract.

**Acceptance criteria:**
- [ ] Replacing background image/video/poster works; portrait references are ready for CMS-10a and missing optional video uses its poster.
- [ ] Track names/files and sound-cue assignments can be changed without losing their stable internal IDs.
- [ ] Playback stays opt-in, muted by default, and compatible with saved preferences and reduced motion.

**Verification:** Asset replacement, route persistence, soundtrack switching/mute and reduction tests; check/build. **Dependencies:** CMS-04, CMS-09. **Files likely touched:** `src/cms/schema/scene.ts`, `src/data/persona.ts`, `src/layouts/Layout.astro`, `src/scripts/audio.ts`, `tests/cms-scene.spec.ts`. **Estimated scope:** M, 5 files. Portrait template wiring is explicitly assigned to CMS-10a.

## Task CMS-10a: Apply responsive portrait replacements

**Description:** Connect the selected portrait to home/about image variants using the shared media adapter.

**Acceptance criteria:**
- [ ] A portrait replacement appears on both pages at every supported width, including responsive srcsets.
- [ ] Removing optional artwork has an intentional fallback and retains readable content.
- [ ] The existing Persona composition, keyboard focus and reduced-motion behavior remain intact.

**Verification:** Replace portrait and compare 360/768/1440px screenshots; check/build and affected public tests. **Dependencies:** CMS-10. **Files likely touched:** `src/pages/index.astro`, `src/pages/about.astro`, `src/lib/cms/media.ts`, `tests/cms-portrait.spec.ts`. **Estimated scope:** M, 4 files.

## Task CMS-11: Edit supported site settings

**Description:** Add safe palette choices and optional-section visibility, with metadata fields defined for the next slice.

**Acceptance criteria:**
- [ ] Supported theme/visibility choices work across pages without arbitrary executable code or layout injection.
- [ ] Site settings have validated metadata/indexing fields ready for CMS-11a; domain and credentials remain deployment settings.
- [ ] Required navigation survives; hidden content does not create broken links or inaccessible focus targets.

**Verification:** Settings/metadata/hidden-section checks, contrast review and reduced-motion/navigation regression; check/build. **Dependencies:** CMS-08, CMS-10. **Files likely touched:** `src/cms/schema/settings.ts`, `src/lib/cms/settings.ts`, `src/layouts/Layout.astro`, `src/styles/persona.css`, `tests/cms-settings.spec.ts`. **Estimated scope:** M, 5 files.

## Task CMS-11a: Connect search and share metadata

**Description:** Apply editable titles, descriptions, share artwork and explicit indexing preference consistently across page metadata, robots and sitemap output.

**Acceptance criteria:**
- [ ] Page/site overrides produce valid titles, descriptions, canonical URLs and share-image URLs.
- [ ] Indexing is an explicit owner choice; admin routes remain excluded and drafts/trashed content never enter the sitemap.
- [ ] Missing optional metadata uses a documented fallback; the public origin comes from deployment configuration.

**Verification:** Inspect generated metadata/robots/sitemap after edits and lifecycle changes; check/build. **Dependencies:** CMS-11. **Files likely touched:** `src/layouts/Layout.astro`, `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts`, `src/lib/cms/settings.ts`, `tests/cms-metadata.spec.ts`. **Estimated scope:** M, 5 files.

## Task CMS-12: Import existing content and cut over

**Description:** Rehearse a repeatable import, compare every existing route/media reference and make the CMS the authoritative source only after comparison passes.

**Acceptance criteria:**
- [ ] All three projects, profile, copy, gallery, scene/audio and attribution migrate with stable IDs/slugs and accurate example labels.
- [ ] Re-running import does not duplicate or overwrite newer owner edits without an explicit migration choice.
- [ ] CMS builds do not silently fall back to local samples; a documented rollback restores the former content source.

**Verification:** Import/dry-run/re-run fixtures, complete route comparison and production check/build. **Dependencies:** CMS-06–11, including CMS-08a, CMS-08b, CMS-10a and CMS-11a. **Files likely touched:** `scripts/import-cms-content.mjs`, `scripts/validate-content.mjs`, `src/lib/cms/content-source.ts`, `docs/cms-migration.md`, `tests/cms-migration.spec.ts`. **Estimated scope:** M, 5 files.

## Checkpoint D: CMS-10–12
- [ ] Every agreed content/media area is editable and migrated without losing behavior.
- [ ] Media replacement, audio, metadata, public navigation and build validation pass.
- [ ] Owner approves the migration comparison before online cutover.

## Task CMS-13: Connect automatic online publication

**Description:** Connect an owner-approved host/repository and CMS publication events, including routing and a clear deployment-status link.

**Acceptance criteria:**
- [ ] Publish/unpublish/trash events trigger builds; draft saves do not. Credentials/hooks stay outside public bundles.
- [ ] Successful deployments update the website; failed builds preserve the previous version; duplicate/rapid events converge on current published content.
- [ ] `/admin/*` refresh, public deep links/404s, redirects and HTTPS work on the chosen host; publish-to-live delay is measured.

**Verification:** Hosted test-project end-to-end publication/failure/retry checks and hook inspection; check/build. **Dependencies:** CMS-12, owner account/host selection and explicit deployment authorization. **Files likely touched:** provider routing/build config, `.env.example`, `sanity.config.ts`, `docs/deployment.md`, `tests/cms-publishing.spec.ts`. **Estimated scope:** M, up to 5 files. Select the actual provider-specific file after reviewing its current free plan.

## Task CMS-14: Verify access and failure handling

**Description:** Exercise anonymous/expired sessions and malformed content/uploads against the real CMS boundary and public artifacts.

**Acceptance criteria:**
- [ ] Anonymous users cannot mutate content or read drafts; logout/expired sessions stop edits and explain recovery.
- [ ] Unsafe links/markup, malformed API content and disallowed media cannot produce unsafe public output.
- [ ] API/upload/build failures remain understandable and do not erase drafts or replace the last working deployment.

**Verification:** Provider API access checks, public-bundle/secret inspection and targeted failure/security tests. **Dependencies:** CMS-13. **Files likely touched:** `tests/cms-access.spec.ts`, `tests/cms-failures.spec.ts`, `src/lib/cms/validation.ts`, `docs/cms-security.md`. **Estimated scope:** M, 4 files.

## Task CMS-15: Prove backup and restore

**Description:** Establish owner-controlled exports of documents and media, recoverable deletion, and separate content/deployment rollback instructions.

**Acceptance criteria:**
- [ ] Export and retention fit the selected free storage; backups include assets and exclude secrets.
- [ ] A deleted project with photos restores into a separate test environment and builds correctly.
- [ ] Referenced/live-deployment assets are protected from casual removal; retention and permanent-delete steps are documented.

**Verification:** Export → removal → restore rehearsal using disposable test content; compare records/media hashes and build. **Dependencies:** CMS-12–14, owner backup destination. **Files likely touched:** `scripts/cms-backup.mjs`, `scripts/cms-restore.mjs`, optional chosen CI export workflow, `docs/cms-recovery.md`, `tests/cms-recovery.spec.ts`. **Estimated scope:** M, up to 5 files.

## Checkpoint E: CMS-13–15
- [ ] Owner can publish online without commands; access and failure tests pass.
- [ ] Restore rehearsal succeeds and the last working deployment can be restored.
- [ ] Owner reviews account ownership, free-tier limits and the proposed public launch separately.

## Task CMS-16: Complete owner handoff

**Description:** Finish a practical editing guide and run the final public/admin verification, including an owner-style exercise on a narrow browser.

**Acceptance criteria:**
- [ ] Following the guide alone, create a project, upload photos, publish, edit profile/résumé, reorder the gallery, trash and restore an item.
- [ ] Chromium/Firefox/WebKit, mobile widths, keyboard, 200% text enlargement, draft isolation and public motion/audio regression pass.
- [ ] Check/build and measured public performance/accessibility meet the existing targets; remaining limitations and upgrade costs are recorded.

**Verification:** Full relevant browser suite, production build, Lighthouse and documented editing/recovery rehearsal; do not claim physical-device or live screen-reader verification unless actually performed. **Dependencies:** CMS-15. **Files likely touched:** `docs/admin-guide.md`, `docs/verification.md`, `README.md`, `tests/admin-workflow.spec.ts`, `tasks/todo.md`. **Estimated scope:** M, 5 files.

## Completion checkpoint
- [ ] All agreed content can be managed through the authenticated browser editor.
- [ ] Automated publication and recovery are demonstrated on owner-approved services.
- [ ] Owner reviews the result; public launch is performed only when explicitly authorized.

Future full-page draft previews, scheduling, collaborator roles and additional layout types are separately scoped extensions. No implementation tasks are marked complete by this planning document.




