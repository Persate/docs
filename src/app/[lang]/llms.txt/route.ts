import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';
import { docsUrl } from '@/lib/shared';

export const revalidate = false;

// Fumadocs links pages relative to the app root ('/'), but the app is served
// under persate.com/docs, so a relative link resolves to the product app and
// lands an agent on its login page. llms.txt is read out of context — make
// every link absolute.
function absoluteLinks(markdown: string): string {
  return markdown.replace(
    /\]\((\/[^)\s]*)\)/g,
    (_match, path: string) => `](${docsUrl}${path === '/' ? '' : path})`,
  );
}

export async function GET(_req: Request, { params }: RouteContext<'/[lang]/llms.txt'>) {
  const { lang } = await params;
  return new Response(absoluteLinks(llms(source).index(lang)));
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
