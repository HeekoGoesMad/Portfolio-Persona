# Implementation checklist

Status is updated from verification evidence, not elapsed effort.

## Task 1: Establish project records

- [ ] Complete

**Description:** Save the approved plan, task checklist and project conventions without overwriting existing work.

**Acceptance criteria:** Plan and task records match the approved scope; commands and source locations are recorded.

**Verification:** Review the records and target folder.

**Dependencies:** None

**Files likely touched:** tasks/plan.md, tasks/todo.md, AGENTS.md

**Estimated scope:** S (1-5 source/document files per slice; related media excluded).

## Task 2: Measure reference behavior

- [ ] Complete

**Description:** Record observed UI states, sampled transitions and uncertainty from the supplied recordings.

**Acceptance criteria:** Ledger distinguishes observation/inference/proposal; includes timestamped transitions; missing behavior remains unknown.

**Verification:** Recheck measured frame windows against the recordings.

**Dependencies:** 1

**Files likely touched:** docs/reference-ledger.md, docs/design-contract.md, docs/assets.md

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 3: Bootstrap the content-driven site

- [ ] Complete

**Description:** Configure the static application, validated content and repeatable commands.

**Acceptance criteria:** Pinned dependencies; validated example content; production routes build.

**Verification:** npm run check; npm run build; invalid-content fixture.

**Dependencies:** 1

**Files likely touched:** package/config, content schema, shared layout, project loader

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Checkpoint A

- [ ] Evidence reviewed; appropriate checks/build pass; core flow verified; limitations recorded.

## Task 4: Deliver the landing menu

- [ ] Complete

**Description:** Implement the original responsive landing composition and immediate project navigation.

**Acceptance criteria:** Readable responsive layout; keyboard/pointer menu; original illustration.

**Verification:** Browser screenshot and keyboard checks at 360/768/1440px.

**Dependencies:** 2,3

**Files likely touched:** home page, scene component, navigation, theme styles

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 5: Deliver project discovery

- [ ] Complete

**Description:** Provide a selectable project index with preview and URL-based technology filters.

**Acceptance criteria:** Three labeled examples; correct filter/history state; clear empty state.

**Verification:** Browser filter, direct-query and Back/Forward checks.

**Dependencies:** 4

**Files likely touched:** project index, preview, discovery controller, browser tests

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 6: Deliver case studies

- [ ] Complete

**Description:** Render readable full Markdown articles and section-anchor navigation.

**Acceptance criteria:** Direct routes; complete case-study sections; absent optional links omitted.

**Verification:** Direct loading, article anchors, long content and history checks.

**Dependencies:** 5

**Files likely touched:** case-study route, article styles, Markdown examples, tests

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Checkpoint B

- [ ] Evidence reviewed; appropriate checks/build pass; core flow verified; limitations recorded.

## Task 7: Deliver profile and contact

- [ ] Complete

**Description:** Expose editable identity, skills and contact links without invented personal facts.

**Acceptance criteria:** Explicit sample profile; optional résumé hidden when absent; usable configured links.

**Verification:** Profile/contact route and absent-field checks.

**Dependencies:** 6

**Files likely touched:** profile content, about page, contact page, layout

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 8: Implement the motion system

- [ ] Complete

**Description:** Share short transition tokens and robust route lifecycle behavior.

**Acceptance criteria:** Reduced motion respected; rapid navigation safe; focus restored appropriately.

**Verification:** Cross-browser navigation, system preference and explicit reduction checks.

**Dependencies:** 2,6

**Files likely touched:** motion tokens, route controller, preference controller, tests

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 9: Implement sound preferences

- [ ] Complete

**Description:** Add short original opt-in interface feedback with persistent settings.

**Acceptance criteria:** Silent first visit; deliberate user actions only; storage failure is safe.

**Verification:** Sound opt-in/mute, route persistence and unavailable-storage checks.

**Dependencies:** 8

**Files likely touched:** audio controller, settings UI, tests

**Estimated scope:** S (1-5 source/document files per slice; related media excluded).

## Checkpoint C

- [ ] Evidence reviewed; appropriate checks/build pass; core flow verified; limitations recorded.

## Task 10: Verify and optimize

- [ ] Complete

**Description:** Resolve observed browser, responsive, accessibility and loading problems; complete metadata/recovery.

**Acceptance criteria:** Check/build and three-engine suite pass; measured performance and accessibility reported; sitemap/404 work.

**Verification:** npm run check; npm run build; npm test; npm run audit:site.

**Dependencies:** 7,8,9

**Files likely touched:** browser suite, audit script, metadata routes, verification report

**Estimated scope:** M (1-5 source/document files per slice; related media excluded).

## Task 11: Complete maintenance handoff

- [ ] Complete

**Description:** Document content editing, theme changes, upgrades, deployment and rollback.

**Acceptance criteria:** Content-only new-project rehearsal succeeds; guide and verification results are accurate.

**Verification:** Add a temporary Markdown project, build, verify route, remove fixture and rebuild.

**Dependencies:** 10

**Files likely touched:** README.md, docs/maintenance.md, docs/deployment.md, verification report

**Estimated scope:** S (1-5 source/document files per slice; related media excluded).

## Delivery checkpoint

- [ ] All implemented behavior verified; remaining content/publishing actions explicitly handed off.
