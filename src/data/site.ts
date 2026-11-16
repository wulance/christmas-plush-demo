/* Site-wide data and URL helpers.
   Every internal link and absolute URL goes through these helpers so the
   /christmas-plush-demo/ base path from astro.config.mjs is applied everywhere. */

import { LOCALE_META, type Locale } from '../i18n/translate';

export type { Locale };
export const SITE_NAME = 'Snugglecraft';

/** Route keys used across the site. The value is the path below the base, with a trailing slash. */
export const ROUTES = {
  home: '',
  corporate: 'corporate-plush/',
  christmas: 'christmas-plush/',
  photo: 'photo-to-plush/',
} as const;
export type RouteKey = keyof typeof ROUTES;

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';

/** Root-relative URL including the base path, e.g. url('assets/x.svg') -> /christmas-plush-demo/assets/x.svg */
export const url = (path = '') => BASE + path.replace(/^\/+/, '');

/** Absolute URL (site origin + base path) for assets, the organization id, and other non-locale paths. */
export const absUrl = (path = '') => new URL(url(path), import.meta.env.SITE).href;

/** Path of a locale-specific page, below the base, with a trailing slash. */
export function pagePath(route: RouteKey, locale: Locale) {
  return LOCALE_META[locale].prefix + ROUTES[route];
}

export function pageUrl(route: RouteKey, locale: Locale) {
  return url(pagePath(route, locale));
}

export function absPageUrl(route: RouteKey, locale: Locale) {
  return new URL(pageUrl(route, locale), import.meta.env.SITE).href;
}

/**
 * Link to a route (optionally with a #hash) from the page `current` in the same locale.
 * Same-page hash links stay plain "#hash" so they scroll without a reload,
 * exactly like the original snapshot.
 */
export function link(to: RouteKey, current: RouteKey, locale: Locale, hash?: string) {
  if (hash && to === current) return '#' + hash;
  return pageUrl(to, locale) + (hash ? '#' + hash : '');
}

export const MAIN_NAV: { label: string; to: RouteKey; hash?: string; cta?: boolean; route?: boolean }[] = [
  { label: 'Corporate', to: 'corporate', route: true },
  { label: 'Christmas', to: 'christmas', route: true },
  { label: 'Photo to Plush', to: 'photo', route: true },
  { label: 'Design Studio', to: 'home', hash: 'studio' },
  { label: 'Get a quote', to: 'corporate', hash: 'quote', cta: true },
];

export const FOOTER_COLLECTIONS: { label: string; to: RouteKey }[] = [
  { label: 'Corporate custom plush', to: 'corporate' },
  { label: 'Christmas collection', to: 'christmas' },
  { label: 'Photo to plush', to: 'photo' },
];

export const FOOTER_STUDIO: { label: string; to: RouteKey; hash: string }[] = [
  { label: 'Design studio', to: 'home', hash: 'studio' },
  { label: 'How we work', to: 'home', hash: 'process' },
  { label: 'Request a quote', to: 'corporate', hash: 'quote' },
];

/* ---------- JSON-LD helpers ---------- */
export const ORG_ID = absUrl('#org');

export const breadcrumbLd = (name: string, route: RouteKey, locale: Locale, homeLabel: string, collectionsLabel: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: homeLabel, item: absPageUrl('home', locale) },
    { '@type': 'ListItem', position: 2, name: collectionsLabel, item: absPageUrl('home', locale) + '#collections' },
    { '@type': 'ListItem', position: 3, name, item: absPageUrl(route, locale) },
  ],
});
