import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { siteUrl } from '@/lib/shared';

/**
 * Builds the public URL for a given (locale, slugs[]) pair, accounting for
 * basePath '/docs' and the hideLocale: 'default-locale' setting.
 *
 *  ('en', [])                       -> https://persate.com/docs
 *  ('en', ['getting-started'])      -> https://persate.com/docs/getting-started
 *  ('pl', [])                       -> https://persate.com/docs/pl
 *  ('pl', ['getting-started'])      -> https://persate.com/docs/pl/getting-started
 */
function urlFor(locale: string, slugs: string[]): string {
  const langPart = locale === i18n.defaultLanguage ? '' : `/${locale}`;
  const slugPart = slugs.length > 0 ? `/${slugs.join('/')}` : '';
  return `${siteUrl}/docs${langPart}${slugPart}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Group pages by slug (joined) so we can emit one sitemap entry per page,
  // each carrying alternates.languages for the en/pl pair.
  const bySlug = new Map<
    string,
    { slugs: string[]; perLocale: Map<string, Date | undefined> }
  >();

  for (const lang of i18n.languages) {
    for (const page of source.getPages(lang)) {
      const key = page.slugs.join('/');
      const entry =
        bySlug.get(key) ?? { slugs: page.slugs, perLocale: new Map() };
      entry.perLocale.set(lang, undefined);
      bySlug.set(key, entry);
    }
  }

  const lastModified = new Date();

  // Home pages (one per locale).
  const homeEntries = i18n.languages.map((lang) => ({
    url: urlFor(lang, []),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: lang === i18n.defaultLanguage ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        i18n.languages.map((l) => [l, urlFor(l, [])]),
      ),
    },
  }));

  // Guide pages, with alternates for each locale that has the page.
  const pageEntries = Array.from(bySlug.values()).map(
    ({ slugs, perLocale }) => {
      const localesWithPage = Array.from(perLocale.keys());
      const primaryLocale =
        localesWithPage.find((l) => l === i18n.defaultLanguage) ??
        localesWithPage[0];

      return {
        url: urlFor(primaryLocale, slugs),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            localesWithPage.map((l) => [l, urlFor(l, slugs)]),
          ),
        },
      };
    },
  );

  return [...homeEntries, ...pageEntries];
}
