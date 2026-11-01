import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { withBase } from '../lib/paths';
export const GET: APIRoute = ({site}) => new Response(`User-agent: *\n${profile.example?'Disallow: /':'Allow: /'}\nSitemap: ${new URL(withBase('/sitemap.xml'),site).href}\n`,{headers:{'Content-Type':'text/plain'}});
