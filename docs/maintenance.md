# Maintenance guide

## Edit your identity

Open `src/data/profile.ts`. Replace the sample display name, role, introduction, biography and skills with real information. Set `email` to your public professional email. Add social entries with a label and full HTTPS URL. Put a résumé PDF in `public/` and set `resume` to `/resume.pdf`. Leave optional fields empty to omit their controls entirely.

`profile.example: true` keeps the sample notice and prevents search-engine indexing. Set it to false only once the profile describes you. The site does not provide a contact form or collect visitor data.

## Add a project

Create `src/content/projects/my-project.md`. The filename becomes `/projects/my-project/`; use a stable, lowercase, hyphenated filename. A frontmatter `slug` can override it but must remain a safe URL path. Keep published slugs stable to preserve incoming links.

```markdown
---
title: "My project"
summary: "A clear sentence explaining the project."
role: "Frontend development"
technologies: [TypeScript, CSS]
date: 2026-10-19
thumbnail: /projects/my-project-cover.png
thumbnailAlt: "Describe what the project image shows"
order: 4
featured: false
category: "Web application"
accent: cyan
example: false
draft: false
---

## The idea
Explain the problem and who it serves.

## The approach
Describe your role and the constraints.

## Design decisions
Explain specific choices and their tradeoffs.

## Building it
Describe the implementation, with screenshots where useful.

## Reflection
Record actual results, lessons, and what you would improve.
```

Optional `repository` and `demo` fields accept complete URLs. Omit absent fields instead of adding dummy links. Thumbnail is optional; the site uses its original generic cover when absent. A supplied thumbnail requires meaningful alt text and an existing file in `public/`.

Use ordinary Markdown images for real screenshots, for example `![The keyboard-accessible project filter](/projects/my-project-filter.png)`. Prefer WebP/AVIF or optimized PNG/JPEG, provide sensible dimensions where possible, and keep each image around a few hundred KB rather than multi-megabyte originals. Concept covers should not be labeled as screenshots.

`draft: true` removes an entry from all lists, generated pages and sitemap. `example: true` labels illustrative material. `order` sorts ascending, then date descending; the first featured project appears on the home page. `accent` accepts cyan/pink/lime and is reserved for artwork treatments; the website palette stays coherent.

Run `npm run check` and `npm run build`. Visit the new direct route and the project index. Adding a project requires only content/media changes; component edits are unnecessary.

## Change the visual system

The shared content rules live in `src/styles/global.css`; the current game-scene layer and overriding palette/motion tokens live in `src/styles/persona.css`. Edit the current tokens in persona.css rather than introducing a third override layer. Use the display font for headings and upright DM Sans for reading. Maintain normal-text contrast >=4.5:1 and large-text contrast >=3:1.

Motion tokens: selection120ms, panels240ms, pages280ms. Selection should remain immediate. The preview controller uses the same panel duration from CSS. Retain the reduced-motion media query and explicit reduction selector. Avoid long blocking transitions and perpetual animation. The current scene assets and two tracks are selected in src/data/persona.ts. public/persona/protagonist.png is recovered game artwork; public/art/signal.svg is the original fallback. Keep decorative semantics and source provenance when replacing them.

Preferences are local to the visitor's browser. System reduced motion is always honored, even if the explicit reduction switch is off. Sound defaults to off, is loaded after opt-in, and never supplies essential feedback. Music is a separate opt-in player that continues through client navigation and stops on reload unless the visitor explicitly starts it again. Config provides two soundtrack choices. The silent classroom loop pauses under system or explicit reduced motion. If browser storage is unavailable, current-session controls still work.

## Update dependencies safely

1. Start from a clean Git working tree and create a short-lived branch.
2. Review official release notes, especially Astro/TypeScript compatibility.
3. Update one dependency family at a time using `npm install --save-exact package@version` or the dev-dependency equivalent.
4. Run check, build and the focused tests. Run all browser engines for framework, routing or animation updates.
5. Review screenshots, commit the package and lockfile changes together, and document any behavior change.

Use `npm ci` on another computer to reproduce the lockfile. Do not replace pinned versions with `latest` in committed manifests. Astro's checker currently uses TypeScript6; TypeScript7 was not peer-compatible at setup time.

## Useful commands and troubleshooting

- A dependency error after pulling source: use the pinned Node version and `npm ci`.
- Missing project image: check the root-relative thumbnail path and the matching public file.
- Invalid frontmatter: the build/check names the file and schema field; correct the content instead of weakening the schema.
- Old production preview after source edits: rebuild, or use the development server for live editing.
- Port4321 in use: stop the old local preview or specify another port for development. Tests/audits deliberately use4321.
- Browser executable missing: `npx playwright install chromium firefox webkit`.
- Review artifacts before deleting: `reports/`, `test-results/`, `playwright-report/`, `dist/` and `.astro/` are generated and ignored.

## Session continuity

Read AGENTS.md and the task/verification records. Preserve the reference ledger's distinction between observed footage and proposed web behavior. Record changed contracts in the decision log. Keep original and licensed asset provenance current.
