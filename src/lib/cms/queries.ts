import {defineQuery} from 'groq';

export const PROJECTS_QUERY = defineQuery(`*[
  _type == "project" &&
  !(_id in path("drafts.**")) && !(_id in path("versions.**")) &&
  !defined(archivedAt) && !defined(trashedAt) &&
  coalesce(hidden, false) == false
] | order(order asc, date desc) {
  _id, title, slug, summary, role, category, technologies, date,
  order, featured, hidden, example, accent, thumbnail, thumbnailAlt,
  "coverImageUrl": coverImage.asset->url,
  "gallery": gallery[]{
    alt, caption, localSrc,
    "imageUrl": image.asset->url
  },
  architectureOverview, deliverables,
  repository, demo, archivedAt, trashedAt, body
}`);

export const PROFILE_QUERY = defineQuery(`*[_type == "profile" && !(_id in path("drafts.**"))][0]{
  name, handle, role, introduction, biography, email, resume,
  "resumeFileUrl": resumeFile.asset->url,
  "portraitImageUrl": portraitImage.asset->url,
  skills,
  skillGroups[]{ domain, items },
  socials[]{ label, url }
}`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
  siteTitle, siteSubtitle,
  projectsHeading, projectsEyebrow,
  aboutHeading, aboutEyebrow,
  contactHeading, contactEyebrow,
  defaultTheme, defaultColorMode,
  splashStyle, selectionDurationMs, panelDurationMs, pageDurationMs, easingCurve,
  "ogImageUrl": ogImage.asset->url,
  umamiWebsiteId, umamiScriptUrl,
  contactEndpoint, turnstileSiteKey
}`);
