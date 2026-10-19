import type { APIRoute } from 'astro';
import { getProjects } from '../lib/projects';
export const GET: APIRoute = async ({ site }) => {
  const paths=['','projects/','about/','contact/',...(await getProjects()).map(p=>`projects/${p.id}/`)];
  const xml=paths.map(path=>`<url><loc>${new URL(path,site).href.replaceAll('&','&amp;')}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xml}</urlset>`,{headers:{'Content-Type':'application/xml'}});
};
