# Verification report

Date:2026-10-19, Asia/Taipei. Local production build; no publication.

## Results
- `npm run check`:0 errors,0 warnings,0 hints; required content and local thumbnails validated.
- `npm run build`:8 static pages plus robots/sitemap generated successfully.
- Full browser suite:51/51 passed across Chromium156, Firefox157 and WebKit27.2.
- After responsive-media/header refinements, affected accessibility/layout/text-enlargement/soundtrack cases:12/12 passed across the same three engines.
- Tested360px/768px/1440px and200% text enlargement; a1280x720 game-screen capture also reviewed.
- Covered normal/keyboard navigation, focus restoration, direct case-study/hash refresh, filters/history/reset/empty states, previews, dialogs, optional links, no JavaScript, blocked storage, sound opt-in, actual soundtrack playback and route continuity, track switching/mute, immediate keyboard feedback, and reduced-motion video pause.
- Axe WCAG A/AA checks passed on home/projects/case-study/about/contact/404; accessibility tree snapshots and keyboard paths inspected.
- Content-only rehearsal:added one Markdown project, generated its direct route and missing-thumbnail fallback, rejected missing required summary, removed the temporary fixture. Results:{"content_only_project_build": true, "direct_route_generated": true, "missing_thumbnail_fallback": true, "invalid_required_content_rejected": true, "fixture_removed": true}.

## Final mobile Lighthouse baseline
|Route|Performance|Accessibility|LCP|CLS|
|---|---:|---:|---|---|
|/|97|100|2.4 s|0.006|
|/projects/|99|100|1.7 s|0|
|/projects/afterhours/|98|100|1.7 s|0.07|

All measured pages meet the approved performance>=90/accessibility>=95 targets. Full HTML/JSON reports live in ignored reports/. SEO scores are intentionally reduced by example-content noindex/robots restrictions; do not remove those until real profile content is ready.

## Reference and media verification
Recovered7 original menu effects and60 soundtrack streams in the investigation workspace. Integrated5 effects and2 full tracks, plus the protagonist and selected artbook pages. Selected audio decoded successfully with FFmpeg. Asset hashes and independent Artbook comparisons are in the provenance records. Original installation unchanged; no native menu code/easings recovered. Classroom loop comes from a silent region of the supplied recording.

## Practical limits
No live assistive-technology speech session, physical-phone gesture session, or public-host test was performed. Automated accessibility, accessibility-tree inspection and real-browser keyboard checks are evidence, not a substitute for those separate manual checks. Local Lighthouse is not a future-host performance guarantee. Profile/contact/résumé and project examples still need real owner content before a public launch.

## Route splash revision — 2026-10-19
- Source/content validation: 0 errors, 0 warnings, 0 hints. Production build: 8 pages generated.
- Final isolated production snapshot: 68/72 checks passed on the first run. One Firefox page-fixture startup timeout and three WebKit initial-page crashes passed when retried individually (4/4); all 72 checks therefore completed successfully across Chromium, Firefox and WebKit. No application change was needed for those four startup retries.
- Includes 21 new splash checks: delayed fetch/cover, keyboard focus, rapid replacement, Back/Forward, filters and anchors, system/saved reduction, mid-fetch reduction, mobile/404 recovery and rewritten destinations. Existing 51 checks include accessibility, 360/768/1440px layouts, 200% text enlargement, no JavaScript, blocked storage and opt-in audio continuity.
- Earlier runs were invalidated by live-server reloads and concurrent changes to the default build output. Final verification used a separate port and a fixed build under ignored reports/splash-build, with reports under reports/splash-verified. The redirect check uses Astro's destination rewrite event because WebKit cannot fulfill an intercepted request with a synthetic 302.
- The preview navigation test now activates the selected case-study link using Enter: moving the test pointer across another row intentionally changes the hover preview and made the former click sequence unreliable.
- Reviewed the full-cover screenshot and recorded a silent Chromium navigation preview. The route art is original CSS typography/geometry; no new game resource dependency, audio request or first-visit gate was introduced.
- Existing practical limits and earlier Lighthouse measurements remain as stated above; Lighthouse was not rerun for this route-only revision.

## Project preview bug fix and aesthetic refinement — 2026-10-19
- **Bug Fix**: Resolved the third project ("Form & Function") preview anomaly where selecting the project rendered a large black box with unstyled fallback text.
  - *Cause*: `public/art/form-and-function.svg` contained an unescaped ampersand (`FORM &`) in a `<text>` node. Browsers loading SVG images via `<img>` parse them strictly as XML; the parser failed, triggering fallback display.
  - *Fix*: Replaced with XML entity `FORM &amp;`. SVG now validates cleanly and renders the lime/navy design across all browsers.
- **Minimalist Cleanup**:
  - Removed the subtitle `<p>Experiments in how things look, feel, and work.</p>` and its dark pill container on `/projects/`, restoring a sleek, authentic Persona menu appearance.
  - Removed bulky dark background boxes behind `.project-preview h2` and `.project-preview p`, replacing them with high-contrast text and crisp drop shadows.
  - Enhanced `.skip-link` to remain tucked off-screen (`translateY(-200%)`) until explicitly keyboard-focused.
- **Authentic Material & Concept Artbook Integration**:
  - Inspected `P3R_Soundtrack.exe` (SHA-256 `e749f9b8e5a42d0b8757292a2a13d27a84351177b6c116a25739adc943196946`) and `P3R_Artbook.exe` (SHA-256 `1362369afdcbefa68344690e9854d66227fb4c19931c52d0c1ca6da687221b6b`) via reverse engineering analysis.
  - Integrated 6 authentic Artbook spreads with validated titles and arcana roles into `src/data/persona.ts` and `/about/` concept archive gallery.
  - Connected snappy cursor selection audio feedback to project row hover and click events.
- **Verification Evidence**:
  - `npm run check`: 0 errors, 0 warnings, 0 hints.
  - `npm run build`: 8 static pages built successfully.
  - Full Playwright suite: 72/72 passed across Chromium, Firefox, and WebKit (2.3m run).
  - Lighthouse mobile audit:
    - `/`: Performance 97, Accessibility 100, Best Practices 100, LCP 2.6s, CLS 0.006.
    - `/projects/`: Performance 100, Accessibility 100, Best Practices 100, LCP 1.5s, CLS 0.000.
    - `/projects/afterhours/`: Performance 99, Accessibility 100, Best Practices 100, LCP 1.7s, CLS 0.068.
  - Captured browser screenshots confirming correct SVG rendering, clean header composition, and responsive concept gallery.

## Minimal splash revision — 2026-10-19
Replaced the decorative splash with a solid deep-blue screen, a small centered destination label and one cyan rule. Source/content check passed with zero diagnostics; production build passed. All 21 focused splash checks passed across Chromium, Firefox and WebKit against an isolated production build. Reviewed a full-cover screenshot and updated the silent route preview. Route timings, focus behavior and reduced-motion support are preserved.

