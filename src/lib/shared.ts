export const appName = 'Persate Docs';

// With basePath '/docs' on the Next.js app, the docs are mounted at
// persate.com/docs/* externally. Internally the app sees URLs without the
// /docs prefix, so all internal route helpers below stay rooted at "/".
export const docsRoute = '/';
export const docsImageRoute = '/og';
export const docsContentRoute = '/llms.mdx';

// Public-facing absolute origin (used by sitemap, JSON-LD, canonical URLs).
export const siteUrl = 'https://persate.com';
export const docsUrl = `${siteUrl}/docs`;

export const gitConfig = {
  user: 'Persate',
  repo: 'docs',
  branch: 'main',
};
