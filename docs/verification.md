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
