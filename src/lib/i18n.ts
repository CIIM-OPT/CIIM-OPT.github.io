import esData from './data/es.json';
import enData from './data/en.json';
import { site } from './config';

export type Locale = 'es' | 'en';

export interface ResearchArea {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface IfmsaProject {
  name: string;
  description: string;
  features: string[];
  link: string;
  popular: boolean;
  color: string;
}

export interface Publication {
  id: string;
  title: string;
  description: string;
  year: string;
  author: string;
  journal: string;
  url: string;
  doi: string;
  keywords: string[];
}

export type LocaleDict = {
  meta: { defaultTitle: string; defaultDescription: string };
  nav: { home: string; research: string; ifmsa: string; publications: string; team: string; contact: string; language: string };
  footer: { tagline: string; rights: string; privacy: string; terms: string; followUs: string };
  home: {
    hero: { titleStart: string; titleEnd: string; subtitle: string; contact: string; repo: string };
    research: { badge: string; title: string; description: string; exploreAll: string };
  };
  researchPage: { title: string; description: string; badge: string; heroTitle: string; heroHighlight: string; heroSubtitle: string };
  researchAreas: ResearchArea[];
  ifmsaPage: { title: string; description: string; badge: string; heroTitle: string; heroHighlight: string; heroSubtitle: string; cta: string; needAdvice: string; contactTeam: string };
  ifmsaProjects: IfmsaProject[];
  publicationsPage: { title: string; description: string; badge: string; heroTitle: string; heroHighlight: string; heroSubtitle: string; filterAll: string };
  publications: Publication[];
  publicationDetail: { back: string; publishedIn: string; abstract: string; keywords: string; viewFullArticle: string };
  teamPage: { title: string; description: string; badge: string; heroTitle: string; heroHighlight: string; heroSubtitle: string; directorLabel: string; assistantsLabel: string; teamLabel: string; members: { name: string; role: string; roleKey: string; image: string; linkedin: string }[] };
  contactPage: { title: string; description: string; badge: string; heroTitle: string; heroHighlight: string; heroSubtitle: string; getInTouch: string; heading: string; inquiry: string; emailTitle: string; visitTitle: string; visitAddress: string; followUs: string };
  legal: {
    privacy: { title: string; description: string; heading: string; sections: { title: string; body: string }[] };
    terms: { title: string; description: string; heading: string; sections: { title: string; body: string }[] };
  };
  notFound: { title: string; description: string; heading: string; message: string; returnHome: string; contact: string };
};

export const locales: Locale[] = ['es', 'en'];

const dicts: Record<Locale, LocaleDict> = {
  es: esData as LocaleDict,
  en: enData as LocaleDict,
};

export function getDict(locale: Locale): LocaleDict {
  return dicts[locale];
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'es';
}

/** Returns the localized path for a given internal path (es: no prefix, en: /en prefix). */
export function getPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const normalized = clean === '' ? '/' : clean;
  if (locale === 'es') return normalized;
  return normalized === '/' ? '/en' : `/en${normalized}`;
}

/** Map a current pathname to its (es, en) absolute URLs for hreflang/canonical. */
export function getAlternateUrls(pathname: string): { es: string; en: string } {
  const isEn = pathname.startsWith('/en');
  const esPath = isEn ? (pathname.slice(3) || '/') : pathname;
  const enPath = isEn ? pathname : pathname === '/' ? '/en' : `/en${pathname}`;
  return {
    es: new URL(esPath, site.url).toString(),
    en: new URL(enPath, site.url).toString(),
  };
}

export function getCurrentUrl(pathname: string): string {
  return new URL(pathname, site.url).toString();
}