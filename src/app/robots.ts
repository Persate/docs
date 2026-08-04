import type { MetadataRoute } from 'next';

/**
 * NOTE: this file is largely INERT.
 *
 * The app runs with basePath '/docs', so this is served at
 * /docs/robots.txt — and robots.txt is only honoured at the domain root.
 * No crawler reads it. The authoritative copy is FE's `src/app/robots.ts`,
 * which serves https://persate.com/robots.txt.
 *
 * The rules below are mirrored there (as `/docs/llms.mdx/` and `/docs/og/`),
 * and that mirror is what actually takes effect. Keep the two in sync: if you
 * add a rule here, add it there too, or it will do nothing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The /llms.mdx routes are intended for AI crawlers, not search
        // engines — exclude them so they don't dilute search rankings.
        disallow: ['/llms.mdx/', '/og/'],
      },
    ],
    sitemap: 'https://persate.com/docs/sitemap.xml',
    host: 'https://persate.com',
  };
}
