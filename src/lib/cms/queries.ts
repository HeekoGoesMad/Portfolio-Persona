import {defineQuery} from 'groq';

export const PROJECTS_QUERY = defineQuery(`*[
  _type == "project" &&
  !(_id in path("drafts.**")) && !(_id in path("versions.**")) &&
  !defined(archivedAt) && !defined(trashedAt)
] | order(order asc, date desc) {
  _id, title, slug, summary, role, category, technologies, date,
  order, featured, example, accent, thumbnail, thumbnailAlt,
  repository, demo, archivedAt, trashedAt, body
}`);
