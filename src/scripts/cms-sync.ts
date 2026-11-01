// Stale-While-Revalidate (SWR) Live CMS Synchronizer & Transition Token Hydrator
// Serves fast static HTML first, then checks Sanity CDN (or Creator local preview overrides)
// so published edits in /admin appear immediately on the live GitHub Pages site.

export interface CmsSiteSettings {
  siteTitle?: string;
  siteSubtitle?: string;
  projectsHeading?: string;
  projectsEyebrow?: string;
  aboutHeading?: string;
  aboutEyebrow?: string;
  contactHeading?: string;
  contactEyebrow?: string;
  defaultTheme?: 'p3r' | 'p4g' | 'p5r';
  defaultColorMode?: 'dark' | 'light' | 'system';
  splashStyle?: 'wipe' | 'curtain' | 'slash';
  selectionDurationMs?: number;
  panelDurationMs?: number;
  pageDurationMs?: number;
  easingCurve?: string;
  ogImageUrl?: string;
  umamiWebsiteId?: string;
  umamiScriptUrl?: string;
  contactEndpoint?: string;
  turnstileSiteKey?: string;
}

export interface CmsProfileOverride {
  name?: string;
  handle?: string;
  role?: string;
  introduction?: string;
  biography?: string;
  email?: string;
  resume?: string;
  resumeFileUrl?: string;
  portraitImageUrl?: string;
}

export interface CmsProjectOverride {
  slug?: string;
  title?: string;
  summary?: string;
  category?: string;
  technologies?: string[];
  hidden?: boolean;
  featured?: boolean;
  coverImageUrl?: string;
  thumbnail?: string;
  repository?: string;
  demo?: string;
}

const SANITY_PROJECT_ID = '4zq18q5c';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = 'v2026-10-19';
const CACHE_KEY = 'portfolio-cms-swr-v1';
const CREATOR_OVERRIDE_KEY = 'portfolio-creator-overrides-v1';

interface SwrBundle {
  fetchedAt: number;
  settings?: CmsSiteSettings | null;
  profile?: CmsProfileOverride | null;
  projects?: CmsProjectOverride[] | null;
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Optional storage */
  }
}

export function getCreatorOverrides(): Partial<SwrBundle> {
  return readJson<Partial<SwrBundle>>(CREATOR_OVERRIDE_KEY) || {};
}

export function saveCreatorOverrides(next: Partial<SwrBundle>) {
  writeJson(CREATOR_OVERRIDE_KEY, next);
  applyCmsBundle({
    fetchedAt: Date.now(),
    ...readJson<SwrBundle>(CACHE_KEY),
    ...next,
  });
}

export function clearCreatorOverrides() {
  try {
    localStorage.removeItem(CREATOR_OVERRIDE_KEY);
  } catch {
    /* Optional storage */
  }
}

export function applyTransitionTokens(settings?: CmsSiteSettings | null) {
  if (!settings) return;
  const root = document.documentElement;
  if (settings.selectionDurationMs && settings.selectionDurationMs >= 40) {
    root.style.setProperty('--selection', `${settings.selectionDurationMs}ms`);
  }
  if (settings.panelDurationMs && settings.panelDurationMs >= 80) {
    root.style.setProperty('--panel', `${settings.panelDurationMs}ms`);
  }
  if (settings.pageDurationMs && settings.pageDurationMs >= 100) {
    root.style.setProperty('--page', `${settings.pageDurationMs}ms`);
  }
  if (settings.easingCurve) {
    root.style.setProperty('--ease', settings.easingCurve);
  }
  if (settings.splashStyle) {
    root.dataset.splashStyle = settings.splashStyle;
  }
}

export function applyCmsBundle(bundle: SwrBundle | null) {
  if (!bundle) return;
  const overrides = getCreatorOverrides();
  const settings: CmsSiteSettings = { ...(bundle.settings || {}), ...(overrides.settings || {}) };
  const profile: CmsProfileOverride = { ...(bundle.profile || {}), ...(overrides.profile || {}) };
  const projects = overrides.projects || bundle.projects || [];

  applyTransitionTokens(settings);

  // Sync dynamic profile fields
  if (profile.name) {
    document.querySelectorAll('[data-cms-profile="name"]').forEach(el => { el.textContent = profile.name!; });
  }
  if (profile.role) {
    document.querySelectorAll('[data-cms-profile="role"]').forEach(el => { el.textContent = profile.role!; });
  }
  if (profile.introduction) {
    document.querySelectorAll('[data-cms-profile="introduction"]').forEach(el => { el.textContent = profile.introduction!; });
  }
  if (profile.biography) {
    document.querySelectorAll('[data-cms-profile="biography"]').forEach(el => { el.textContent = profile.biography!; });
  }
  if (profile.email) {
    document.querySelectorAll<HTMLAnchorElement>('[data-cms-profile="email"]').forEach(el => {
      el.href = `mailto:${profile.email}`;
      const textNode = el.querySelector('[data-cms-email-text]');
      if (textNode) textNode.textContent = profile.email!;
    });
  }
  const resumeHref = profile.resumeFileUrl || profile.resume;
  if (resumeHref) {
    document.querySelectorAll<HTMLAnchorElement>('[data-cms-profile="resume"]').forEach(el => {
      el.href = resumeHref;
    });
  }
  if (profile.portraitImageUrl) {
    document.querySelectorAll<HTMLImageElement>('[data-cms-profile="portrait"]').forEach(img => {
      img.src = `${profile.portraitImageUrl}?auto=format&w=1200&q=85`;
      img.removeAttribute('srcset');
    });
  }

  // Sync dynamic section headings
  if (settings.projectsEyebrow) {
    document.querySelectorAll('[data-cms-setting="projectsEyebrow"]').forEach(el => { el.textContent = settings.projectsEyebrow!; });
  }
  if (settings.aboutEyebrow) {
    document.querySelectorAll('[data-cms-setting="aboutEyebrow"]').forEach(el => { el.textContent = settings.aboutEyebrow!; });
  }
  if (settings.contactEyebrow) {
    document.querySelectorAll('[data-cms-setting="contactEyebrow"]').forEach(el => { el.textContent = settings.contactEyebrow!; });
  }
  if (settings.contactEndpoint) {
    document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(form => {
      form.dataset.contactEndpoint = settings.contactEndpoint;
    });
  }

  // Sync project card overrides (titles, summaries, visibility toggles, cover images)
  if (Array.isArray(projects) && projects.length > 0) {
    projects.forEach(proj => {
      if (!proj.slug) return;
      const row = document.querySelector<HTMLElement>(`[data-project-row][data-project-id="${proj.slug}"]`);
      const panel = document.querySelector<HTMLElement>(`[data-preview-panel="${proj.slug}"]`);
      if (proj.hidden) {
        if (row) row.dataset.cmsHidden = 'true';
        if (row) row.hidden = true;
        if (panel) panel.hidden = true;
        return;
      }
      if (row) {
        delete row.dataset.cmsHidden;
        if (proj.title) {
          const h2 = row.querySelector('.project-title-link h2');
          if (h2) h2.textContent = proj.title;
        }
        if (proj.summary) {
          const p = row.querySelector(':scope > p');
          if (p) p.textContent = proj.summary;
        }
        if (proj.category) {
          const cat = row.querySelector('.project-category');
          if (cat) cat.textContent = proj.category;
        }
      }
      if (panel) {
        if (proj.title) {
          const h2 = panel.querySelector('h2');
          if (h2) h2.textContent = proj.title;
        }
        if (proj.summary) {
          const p = panel.querySelector('p');
          if (p) p.textContent = proj.summary;
        }
        const imgUrl = proj.coverImageUrl ? `${proj.coverImageUrl}?auto=format&w=1200&q=85` : proj.thumbnail;
        if (imgUrl) {
          const img = panel.querySelector<HTMLImageElement>('.preview-frame img');
          if (img) img.src = imgUrl;
        }
      }
    });
  }
}

export async function revalidateFromSanityCdn() {
  // 1. Immediately apply cached SWR bundle + creator local overrides
  const cached = readJson<SwrBundle>(CACHE_KEY);
  applyCmsBundle(cached || { fetchedAt: 0 });

  // Skip network call in automated headless tests unless explicitly requested
  if (navigator.webdriver) return;

  const query = `{
    "settings": *[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
      siteTitle, siteSubtitle, projectsHeading, projectsEyebrow, aboutHeading, aboutEyebrow,
      contactHeading, contactEyebrow, defaultTheme, defaultColorMode,
      splashStyle, selectionDurationMs, panelDurationMs, pageDurationMs, easingCurve,
      "ogImageUrl": ogImage.asset->url, umamiWebsiteId, umamiScriptUrl, contactEndpoint, turnstileSiteKey
    },
    "profile": *[_type == "profile" && !(_id in path("drafts.**"))][0]{
      name, handle, role, introduction, biography, email, resume,
      "resumeFileUrl": resumeFile.asset->url,
      "portraitImageUrl": portraitImage.asset->url
    },
    "projects": *[_type == "project" && !(_id in path("drafts.**")) && !defined(archivedAt) && !defined(trashedAt)] | order(order asc) {
      "slug": slug.current, title, summary, category, technologies, hidden, featured,
      thumbnail, "coverImageUrl": coverImage.asset->url, repository, demo
    }
  }`;

  const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return;
    const payload = await res.json();
    if (payload?.result) {
      const fresh: SwrBundle = {
        fetchedAt: Date.now(),
        settings: payload.result.settings ?? null,
        profile: payload.result.profile ?? null,
        projects: payload.result.projects ?? null,
      };
      writeJson(CACHE_KEY, fresh);
      applyCmsBundle(fresh);
    }
  } catch {
    /* Offline or blocked CDN leaves static build intact */
  }
}
