# Personal Portfolio / Persona-inspired

A static, content-driven portfolio for a frontend / creative developer. Actual recovered Persona artwork, a classroom scene from the supplied recording, clustered angled menus, staged screen transitions, readable Markdown case studies, original game menu effects and an opt-in two-track soundtrack.

The three projects and the profile are visibly marked examples. Add your own work and contact details before publishing.

## Start locally

Requirements: Node24.11.1+ in the24.x line and npm11. Dependencies are pinned in package-lock.json.

```powershell
Set-Location 'D:\Job Related\Portfolio\Portfolio Persona'
npm ci
npm run dev
```

Or double-click `Start-Portfolio.cmd`. Open the printed local URL, normally `http://127.0.0.1:4321/`. To stop, press Ctrl+C in that terminal.

For the production build:

```powershell
npm run check
npm run build
npm run preview
```

The distributable static website is in `dist/`. Serve that folder over HTTP; do not open its HTML files directly using file://.

## Make it yours

1. Edit `src/data/profile.ts`: name, role, biography, skills, email, social links and optional résumé path.
2. Replace the Markdown examples under `src/content/projects/`, retaining clear example flags until the content describes real work.
3. Put covers/screenshots in `public/art/` or `public/projects/` and use root-relative paths.
4. Run check/build and review the pages. Set `profile.example` to false only after replacing the example identity and reviewing publication readiness.

There is no database, account, API key or paid service requirement. The game and recordings are reference material only; the finished website does not read them.

## Verification

```powershell
npm run check
npm run build
npx playwright install chromium firefox webkit
npm test
```

The browser suite starts a local production preview when one is not already running. To run the Lighthouse mobile audit, first keep `npm run preview` running in another terminal, then run `npm run audit:site`. Screenshots, Lighthouse reports and summaries are saved in ignored `reports/`; browser failures use ignored `test-results/`.

## Documentation

- `tasks/plan.md` and `tasks/todo.md`: approved scope, ordered tasks and progress.
- `docs/reference-ledger.md`: observations, frame timings, evidence boundaries and unknowns.
- `docs/design-contract.md`: visual/interaction rules and motion tokens.
- `docs/maintenance.md`: content editing, theme changes, dependencies and safe updates.
- `docs/deployment.md`: static hosting, domain/metadata preparation and rollback.
- `docs/assets.md` and `docs/persona-assets.md`: asset provenance, original source hashes and recovery boundaries.
- `docs/animation-review.md` and `plans/`: reviewed motion findings and the implemented changes.
- `docs/verification.md`: actual results and remaining verification limits.

This local revision includes user-requested game-derived artwork, original menu effects and soundtrack selections. It is an independent personal portfolio. Asset recovery and source hashes are documented, and the original game installation is unchanged. Nothing has been published.
