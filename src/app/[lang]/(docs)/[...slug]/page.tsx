import {
  getPageImage,
  getPageMarkdownUrl,
  pageAlternates,
  publicUrl,
  source,
} from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig, siteUrl } from '@/lib/shared';

export default async function Page(props: PageProps<'/[lang]/[...slug]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const url = publicUrl(page.locale ?? 'en', page.slugs);
  const breadcrumbs = breadcrumbList(page);

  // JSON-LD: TechArticle + BreadcrumbList for richer SERP rendering.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: page.data.title,
      description: page.data.description,
      inLanguage: page.locale ?? 'en',
      url,
      image: `${siteUrl}${getPageImage(page).url}`,
      publisher: {
        '@type': 'Organization',
        name: 'Persate',
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    },
  ];

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk' }}
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

function breadcrumbList(page: NonNullable<ReturnType<typeof source.getPage>>) {
  const locale = page.locale ?? 'en';
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Documentation',
      item: publicUrl(locale, []),
    },
  ];
  for (let i = 0; i < page.slugs.length; i++) {
    const partial = page.slugs.slice(0, i + 1);
    const ancestor = source.getPage(partial, locale);
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: ancestor?.data.title ?? partial[i],
      item: publicUrl(locale, partial),
    });
  }
  return items;
}

export async function generateStaticParams() {
  return source.generateParams('slug', 'lang').filter((p) => p.slug.length > 0);
}

export async function generateMetadata(
  props: PageProps<'/[lang]/[...slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const url = publicUrl(page.locale ?? 'en', page.slugs);
  const ogImage = getPageImage(page).url;
  const localeOg = page.locale === 'pl' ? 'pl_PL' : 'en_US';
  const branding = page.locale === 'pl' ? 'Persate | Dokumentacja' : 'Persate | Documentation';

  return {
    title: { absolute: `${page.data.title} | ${branding}` },
    description: page.data.description,
    alternates: pageAlternates(page),
    openGraph: {
      type: 'article',
      url,
      siteName: 'Persate Documentation',
      title: page.data.title,
      description: page.data.description,
      locale: localeOg,
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.data.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  };
}
