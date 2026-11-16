import type { APIRoute } from 'astro';
import { ROUTES, absPageUrl, type RouteKey } from '../data/site';

const ROUTES_KEYS = Object.keys(ROUTES) as RouteKey[];

export const GET: APIRoute = () => {
  const entries = ROUTES_KEYS.map((key) => {
    const en = absPageUrl(key, 'en');
    const zh = absPageUrl(key, 'zh');
    return `  <url>
    <loc>${en}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
  </url>
  <url>
    <loc>${zh}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${zh}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
  </url>`;
  }).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<!-- URLs use the current GitHub Pages origin and project-page base path. This is not a custom domain. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
