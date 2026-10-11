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
  // The Cloud integrations page (Google Drive, OneDrive) was removed on
  // 2026-10-11 because no backend served it. Old links land on the Repository
  // section; drop these when a real cloud-storage integration is documented.
  async redirects() {
    return [
      {
        source: '/repository/cloud-integrations',
        destination: '/repository',
        permanent: false,
      },
      {
        source: '/:lang(en|pl)/repository/cloud-integrations',
        destination: '/:lang/repository',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
