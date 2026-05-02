import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Mounted as a subdirectory of the main marketing site (persate.com/docs)
  // so search authority consolidates onto a single property and the docs
  // can appear as sitelinks under persate.com.
  basePath: '/docs',
  // Don't auto-redirect /docs/ -> /docs; the Nginx /docs -> /docs/ rule
  // handles the canonical form, and this prevents a redirect loop.
  skipTrailingSlashRedirect: true,
};

export default withMDX(config);
