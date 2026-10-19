# 001 - Preserve the scene and stage screen content
- Status: DONE; verified across three browser engines
- Baseline commit:4ed489b
- Severity:HIGH for keyboard-driven preview motion; MEDIUM for cohesion and pointer gating
- Stack:Astro7, native CSS, WAAPI. No animation framework.

## Confirmed audit
| # | Severity | Category | Baseline location | Finding | Fix summary |
|---|---|---|---|---|---|
|1|HIGH|Frequency|src/scripts/projects.ts:57|focusin invokes the same240ms preview entrance as a deliberate pointer click|Keyboard/focus/hover selection updates immediately; reserve240ms panel entrance for a deliberate pointer preview|
|2|MEDIUM|Cohesion|src/styles/global.css:7|Whole-root page translation moves the shared background; game recordings show background continuity|Persist fixed classroom scene; animate only screen-content with280ms enter and120ms exit|
|3|MEDIUM|Accessibility|src/styles/global.css:2-7|Hover translations are not pointer-gated|Apply moving hover states only under `(hover:hover) and (pointer:fine)`|

## Target
Use `--ease:cubic-bezier(0.23,1,0.32,1)`,120ms selection,240ms panels,280ms screen entry,120ms exit. Menu groups stagger40ms, per-item entrance240ms. Decorative character staging420ms is intentional, occasional game-scene composition; it never blocks interaction. Keyboard selection has no motion. All movement uses transform/opacity; system and explicit reduction stop scene/art movement.

## Missed opportunities addressed
- Persistent environmental scene and foreground character/white mask convey a game screen rather than an ordinary hero.
- Menu selection uses a sharp white/pink slash and context description.
- Optional real cursor/decision/cancel feedback and opt-in soundtrack provide a cohesive local game experience.

## Steps and boundaries
Implement scene/screen CSS in src/styles/persona.css; root data-input keyboard branch in site.ts; avoid translating shared scene or animating every focus event. Keep Markdown content, URLs, ordinary links and history. No new motion library. Repeated selection must not reset art entry.

## Verification
Run npm run check/build/test. At1440px and360px, switch menu entries rapidly with pointer and arrows. Scene remains stationary; selected labels update immediately; no animation gates actions. Open/close Config repeatedly, mute audio, toggle reduction, and navigate Back/Forward. Inspect source-frame screenshots and slowed route captures for staging. Reduced mode removes travel and retains visible selection/color. Final verdict in docs/animation-review.md.
