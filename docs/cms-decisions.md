# CMS decisions — first implementation increment

Date: 2026-10-19. User's “continue” starts CMS-01–03 of the saved plan. Public deployment remains unapproved.

- Reuse the existing owner project `Portfolio-Persona` (`4zq18q5c`) and its public `production` dataset. Initial inspection found no project documents or deployed schema. Do not create another account, project or dataset.
- Local Studio schema files own the schema. Do not create an MCP-managed schema or deploy a remote schema/Studio without an explicit deployment request. Local Studio reads its own schema and does not need remote schema deployment to show forms.
- Use the supported `@sanity/astro` integration and React only for `/admin`. Preserve the existing static website and isolate Studio from its layout, motion and audio.
- Prefer the integration's hash router for this static local increment. Editor deep links stay under `/admin/`, so a refresh does not require a new server or a broad SPA rewrite. Verify this against the installed integration before relying on it.
- Only the actual loopback development origin `http://127.0.0.1:4321` is added to credentialed CORS. No wildcards or public-domain permission changes.
- Project ID, dataset and API date are public configuration. No editor API tokens are placed in frontend code. Studio uses Sanity's own login; the connected MCP identity is not silently copied into browser storage.
- The first public adapter uses an explicit content source and only the `published` perspective. Draft rendering, full-page previews, automatic publication and migration are later slices.
- Existing example content and all earlier unfinished working-tree changes are preserved. First-phase tests distinguish simulated published records from real owner editing/publishing.
- Owner login and any first publication must be exercised honestly. If browser authentication requires owner action, present the working editor and exact remaining verification step; do not mark a simulated save as a real authenticated save.
