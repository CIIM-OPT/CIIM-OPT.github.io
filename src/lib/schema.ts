import type { Publication } from './i18n';

export function scholarlyArticleSchema(pub: Publication): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    description: pub.description,
    author: { '@type': 'Person', name: pub.author },
    datePublished: pub.year,
    publisher: { '@type': 'Organization', name: 'MDPI' },
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'PublicationIssue',
      isPartOf: { '@type': 'Journal', name: pub.journal },
    },
    url: pub.url,
    doi: `https://doi.org/${pub.doi}`,
    keywords: pub.keywords,
  });
}