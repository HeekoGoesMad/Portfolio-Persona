# Static deployment guide

No site has been published. The first delivery is local. The static build is portable to any host that serves HTML/CSS/JavaScript and supports directory-style URLs and a custom404 page.

## Prepare real content

Replace the profile, three illustrative projects, professional links and résumé with actual material. Set each project's example flag correctly. Set `profile.example` to false when the identity is real; this removes the global sample notice, allows robots crawling and changes page indexing metadata. This is a deliberate publication step, not something the build does automatically.

## Set the public origin

In PowerShell, set your actual HTTPS origin for the build:

```powershell
$env:SITE_URL='https://your-actual-domain.com'
npm run check
npm run build
npm test
```

Replace the sample domain before running the command. Without SITE_URL, the local origin is used for sitemap/share metadata and canonical links are omitted. Setting this environment variable on the hosting provider's build settings is preferable to committing deployment-specific configuration.

The `.env.example` file is a reference only; the production config reads the build process's SITE_URL environment. Keep private environment files out of Git.

## Publish the static output

For a Git-connected static host, use Node24, install with `npm ci`, build with `npm run build`, and publish `dist/`. Configure the real SITE_URL in the host environment. For a manual static host, upload the contents of dist while preserving `_astro/`, image paths and nested route directories.

Keep directory index behavior (`/projects/afterhours/` serves its index.html). Use the generated404.html for unknown paths. Do not configure an SPA catch-all that returns the home page for every unknown URL; this is a static multi-page website.

If using Sites later, follow its supported static-source preparation and registration workflow, use dist as the static directory, and keep the private preview audience until a public launch is explicitly requested. No Sites project, domain, credentials or remote repository is required for this local deliverable.

## Post-deployment verification

Open home, project index and a direct case-study URL in a fresh browser. Refresh a case study and an article anchor. Test filter links, Back/Forward, contact/résumé links, mobile menu, preferences and a nonexistent URL. Confirm canonical URLs, sitemap.xml, robots.txt and the share image point to the real origin. Some social crawlers do not support SVG share images; replace public/art/share.svg with a1200x630PNG/JPEG and update its reference before a public launch if broad social previews are needed.

Run mobile Lighthouse against the deployed origin too; local measurements are a reproducible baseline, not a guarantee about a future host or visitor connection. No analytics are included.

## Rollback and backups

Keep the Git source and package-lock.json backed up. Commit content and related media together. Before publishing, record the commit and retain the previous dist archive or the hosting provider's previous version. To roll back, redeploy that known-good artifact/version; alternatively check out the prior commit into a separate directory, run npm ci/check/build and deploy its output. Avoid destructive resets in a working folder with unsaved content.
