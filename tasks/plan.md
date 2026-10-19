# Persona Portfolio - Long-Term Development Plan

Approved for implementation on 2026-10-19. Project root: `D:\Job Related\Portfolio\Portfolio Persona`.

## Goal and delivery
Build a recruiter-focused frontend / creative developer portfolio led by Persona 3 Reload. Pair expressive menus and motion with readable case studies, shareable URLs, and quick contact/résumé access. First delivery is local with a deployment guide. Use three clearly labeled editable examples, original artwork, optional original interface sounds (silent by default), and local content files without a database or subscription.

## Reference investigation
The 167-second 30fps Pause Menu recording and 90-second 60fps personal recording are the visual references. The installed game contains packaged resources and a native executable. REA's Windows-resource inspection is recorded as `ev_1ee6d50814b6fd6a11930c46298e9d903aac5289d5728687908e88aafbaba786`; internal UI code and exact easing curves have NOT been recovered.

Keep a ledger of navigation states, selected/unselected treatments, confirm/back behavior, tabs, lists, dialogs, layout proportions, type, palette, layering and control hints. Record timestamps, frame counts, direction, staggering and uncertainty. Mark conclusions observed, inferred, or proposed. Inspect relevant game resources only where supported; exhaustive native decompilation is not a build prerequisite.

## Architecture decisions
- Astro 7, TypeScript, scoped/native CSS and small browser scripts; static output. Markdown content collections provide validated project content.
- Astro ClientRouter provides navigation transitions. Normal links, direct loading, refresh and browser history remain functional. Reinitialize behavior through documented lifecycle events and restore appropriate focus.
- Routes: `/`, `/projects/`, `/projects/[slug]/`, `/about/`, `/contact/`, `/404/`.
- Profile contract: name, role, intro, biography, skills, socials, optional résumé. Project contract: slug, title, summary, role, technologies, date, thumbnail and alt, order, optional source/demo, example/draft flags, Markdown body.
- Exclude drafts. Label examples. Omit absent optional links. Fail required invalid content with actionable errors.
- Theme tokens hold colors, type, spacing, angles, layers and motion. Deep blues/cyan, white display type, dark selection strips and restrained pink accents. Original silhouette art and project imagery. One Reload-led theme; mobile stacks the layout.
- Keyboard: arrows within focused lists, Enter activates, Tab remains standard, Escape closes overlays and restores focus. Technology filters use query parameters and an explicit empty state. Case-study navigation uses anchors.
- Motion defaults: 120ms selection, 240ms panels, 360ms pages. Respect system reduced motion plus a local reduction setting. Optional audio begins only after opt-in and intentional interactions. Storage failure must not break the site.
- Essential content is readable without JavaScript. No intro gate. Projects immediately accessible.

## Dependency-ordered tasks
1. Project records and conventions.
2. Reference/state/timing ledger.
3. Static site and content validation.
Checkpoint A: coverage recorded and site builds.
4. Responsive landing menu.
5. Project selection, preview and filtering.
6. Markdown case studies.
Checkpoint B: home > projects > case study > contact works.
7. Editable profile and contact.
8. Shared motion and navigation lifecycle.
9. Optional interface sounds and preferences.
Checkpoint C: desktop/mobile visual and accessibility review.
10. Cross-browser checks, metadata, sitemap, recovery and optimization.
11. Maintenance/deployment/rollback handoff and add-project rehearsal.

Each task is a focused slice, normally no more than five source/document files. Detailed acceptance criteria, verification, dependencies and scope live in `tasks/todo.md`. Checkpoints are evidence reviews; the user's implementation request authorizes continuing through them.

## Acceptance checks
- `npm run check` and `npm run build` pass.
- Automated browser checks cover navigation/history, filters, direct routes, sound/motion settings and reduced motion in Chromium, Firefox and WebKit.
- Inspect 360px, 768px, 1440px and 200% zoom, long titles, many technologies, absent optional links, unavailable storage and no JavaScript.
- No keyboard traps, hidden focus, contrast failures or horizontal overflow. Check accessibility tree; manually confirm keyboard and report any screen-reader verification limit.
- Target mobile Lighthouse performance >=90 and accessibility >=95. Report actual measurements.
- Adding a project changes content/media only. Output is independent of installed game and original video paths.

## Defaults and risks
English initially. No invented biography, achievements, employers or real-project results. No accounts, CMS, backend, analytics, controller support or music. Public hosting/domain is a later phase. Retain original/licensed asset provenance and concise design decisions. Missing real profile data stays visibly editable; examples never pass as real work. Unobserved input behavior and animation internals remain explicit unknowns. Runtime/tool failures are reported, not converted into successful checks.

## Authorized visual revision,2026-10-19
The user requested stronger Persona resemblance with the game's actual backgrounds, animation, sounds, soundtrack and artbook material. This supersedes the original-art-only/no-music defaults for this local deliverable. Preserve the initial verified foundation in Git4ed489b. Use recovered assets and the supplied screenshots, record provenance and exact recovery limits, keep playback opt-in, and keep the project local. Apply the review-animations and improve-animations audit to keyboard frequency, shared scene continuity, pointer gating and staged entrances. Re-run affected browser and accessibility checks.
