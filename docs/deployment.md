# Static & GitHub Pages Deployment Guide

The static build is portable to any host that serves HTML/CSS/JavaScript and supports directory-style URLs and a custom 404 page. An automated GitHub Pages workflow is configured in `.github/workflows/deploy.yml`.

## 1. Deploy to GitHub Pages (`HeekoGoesMad`)

1. Create a new repository on GitHub under your account (`HeekoGoesMad`), for example:
   - `heekogoesmad.github.io` (serves at `https://heekogoesmad.github.io/`)
   - Or `persona-portfolio` (serves at `https://heekogoesmad.github.io/persona-portfolio/`)
2. In your GitHub repository, navigate to **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Add the remote and push `main`:
   ```powershell
   Set-Location 'D:\Job Related\Portfolio\Portfolio Persona'
   git remote add origin https://github.com/HeekoGoesMad/persona-portfolio.git
   git push -u origin main
   ```
4. GitHub Actions will automatically execute `.github/workflows/deploy.yml`, running `npm ci`, `npm run check`, and `npm run build` with the repository's `SITE_URL` and `BASE_PATH`, then publishing `dist/` to GitHub Pages.

## 2. Local Preview & Verification

```powershell
Set-Location 'D:\Job Related\Portfolio\Portfolio Persona'
npm run check
npm run build
npm run preview
```

## 3. Rollback and Backups

Keep the Git source and `package-lock.json` backed up. Commit content and related media together. To roll back on GitHub Pages, revert the commit on `main` or re-run a prior successful workflow deployment in the GitHub Actions tab.
