import type { MetadataRoute } from 'next';

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
