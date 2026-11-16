export type Locale = 'en' | 'zh';

export const LOCALES: Locale[] = ['en', 'zh'];

export const LOCALE_META: Record<Locale, { htmlLang: string; hreflang: string; label: string; prefix: string }> = {
  en: { htmlLang: 'en', hreflang: 'en', label: 'EN', prefix: '' },
  zh: { htmlLang: 'zh-Hans', hreflang: 'zh-Hans', label: '中文', prefix: 'zh/' },
};

import zhMap from './zh-map';

const ZH: Record<string, string> = zhMap as unknown as Record<string, string>;

/** Translate an exact English source string when locale is Chinese; otherwise return it unchanged. */
export function translator(locale: Locale) {
  return (s: string) => {
    if (locale !== 'zh') return s;
    return ZH[s] ?? s;
  };
}

export function htmlLang(locale: Locale) {
  return LOCALE_META[locale].htmlLang;
}
