# Persona route splash

Requested on 2026-10-19: show a Persona-style splash whenever a visitor changes routes.

Following the owner’s minimalist revision, the persistent deep-blue screen crosses the viewport with only a small centered destination label and a short cyan rule. Oversized type, angled title strips, repeated lettering, branding and decorative shapes were removed. This is an original web adaptation of the supplied Persona menu references; these timings are not recovered native game animation curves.

## Behavior and maintenance
- Covers actual pathname changes, including keyboard activation and browser Back/Forward. No initial visit gate.
- Uses the shared `--panel` token for both phases (240ms cover + 240ms reveal) and `--ease`. Page fetching starts alongside the cover; a slow response stays covered until ready, without a fake loading timer.
- Another navigation retargets the current wipe. Aborted work and reduced-motion changes clear it safely. Redirected destinations update the target label.
- Anchors, project filters, external URLs, downloads and new tabs retain their normal behavior. The overlay is decorative, inert and does not capture pointer input.
- System reduced motion and the saved Reduce motion preference skip the splash. Keyboard menu selection remains immediate; the user explicitly requested the splash on route activation as well as pointer navigation.
- Astro still handles links, history, announcements and DOM swaps. The existing focus controller focuses the destination content. Native snapshot animations are disabled to avoid layering a second transition over the splash.
- The 404 page keeps its existing ordinary-navigation guard for a WebKit snapshot crash. Its internal links receive the cover animation, then load normally. No JavaScript means ordinary links with no overlay.

Edit `src/components/RouteSplash.astro` for artwork/layout, `src/scripts/route-splash.ts` for lifecycle and destination labels, and the shared tokens in `src/styles/persona.css` for timing/palette. Page sections supply the final label through the layout's `data-route-label` attribute.

## Verification
The focused suite in `tests/route-splash.spec.ts` checks delayed fetching, keyboard activation, interrupted navigation, Back/Forward, filters/anchors, both reduction settings, reduction during loading, mobile/404 recovery and rewritten destinations. Existing portfolio checks cover audio continuity, no JavaScript, accessible routes, responsive layout and normal content behavior.

Use a production preview on a separate port for browser verification. A live editing server can reload tests when source files change. An immutable build under ignored `reports/` also avoids interference from another concurrent build.
