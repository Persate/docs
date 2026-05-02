import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';

const i18nProxy = createI18nMiddleware(i18n);

const { rewrite: rewriteSuffix } = rewritePath(
  '/{*path}.mdx',
  '/llms.mdx/{*path}/content.md',
);

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  const suffixResult = rewriteSuffix(path);
  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const isAsset =
      path.startsWith('/_next') ||
      path.startsWith('/api') ||
      path.startsWith('/og') ||
      path.startsWith('/llms') ||
      path === '/sitemap.xml' ||
      path === '/robots.txt' ||
      /\.[a-z0-9]+$/i.test(path);
    if (!isAsset) {
      return NextResponse.rewrite(
        new URL(`/llms.mdx${path}/content.md`, request.nextUrl),
      );
    }
  }

  return i18nProxy(request, event);
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|persate|sitemap.xml|robots.txt|icon.svg|manifest.webmanifest).*)',
  ],
};
