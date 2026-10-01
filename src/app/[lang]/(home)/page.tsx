/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { publicUrl } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

type Lang = 'en' | 'pl';

const copy = {
  en: {
    title: 'Persate user guide',
    metaTitle: 'Persate | Documentation',
    branding: 'Persate | Documentation',
    lead: 'Persate is a public-affairs intelligence platform for monitoring the Polish parliament. This guide explains how to operate every section of the application, end to end.',
    primary: 'Open the documentation',
    secondary: 'Switch to Polish',
    secondaryHref: '/pl',
    available: 'Guides',
    feedback:
      'Each documentation page provides a "View source on GitHub" link. Corrections and suggestions are welcome via pull request or issue.',
  },
  pl: {
    title: 'Przewodnik użytkownika Persate',
    metaTitle: 'Persate | Dokumentacja',
    branding: 'Persate | Dokumentacja',
    lead: 'Persate to platforma analityki public affairs przeznaczona do monitorowania prac polskiego parlamentu. Niniejszy przewodnik opisuje pełną obsługę wszystkich sekcji aplikacji.',
    primary: 'Otwórz dokumentację',
    secondary: 'Przełącz na angielski',
    secondaryHref: '/',
    available: 'Przewodniki',
    feedback:
      'Każda strona dokumentacji zawiera odnośnik "View source on GitHub". Uwagi i propozycje korekt prosimy zgłaszać poprzez pull request lub issue.',
  },
} satisfies Record<Lang, Record<string, string>>;

type Tile = { title: string; description: string; href: string; icon: string };

const sections: Record<Lang, Tile[]> = {
  en: [
    {
      title: 'Getting started',
      description: 'How access to Persate works, from an invitation to the first session, and how to set up two-step verification.',
      href: '/getting-started',
      icon: '/docs/persate/icons/book.svg',
    },
    {
      title: 'Using Persate',
      description: 'The sidebar, header, global search, messages and settings shared across the platform.',
      href: '/using-persate',
      icon: '/docs/persate/icons/data.svg',
    },
    {
      title: 'Cockpit',
      description: 'The start screen: ranked developments from alerts, project stages and consultation positions in one view.',
      href: '/cockpit',
      icon: '/docs/persate/icons/dashboard.svg',
    },
    {
      title: 'Advisor',
      description: "Research across legislation, votes, recordings, Media, stakeholders and the organization's documents, with answers linked to their sources.",
      href: '/advisor',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Tracker',
      description: 'Monitor legislation, people, institutions and topics with alerts, and review every match in one place.',
      href: '/alerts',
      icon: '/docs/persate/icons/alert.svg',
    },
    {
      title: 'Repository',
      description: 'Upload and share files, find and preview them, and organize them with Smart Folders.',
      href: '/repository',
      icon: '/docs/persate/icons/storage.svg',
    },
    {
      title: 'Editor',
      description: 'Write articles with Advisor edits, fact and language checks, numbered sources and document history.',
      href: '/editor',
      icon: '/docs/persate/icons/report.svg',
    },
    {
      title: 'Legislation',
      description: 'Government drafts and their legislative journey, parliamentary questions, published acts and institution publications.',
      href: '/legislation-tracker',
      icon: '/docs/persate/icons/scan.svg',
    },
    {
      title: 'Recordings',
      description: 'Recordings of Sejm proceedings with transcripts, speakers, the official stenogram and analysis status.',
      href: '/live-proceedings',
      icon: '/docs/persate/icons/live.svg',
    },
    {
      title: 'Votes',
      description: 'Sejm and Senate votes, presidential decisions and Constitutional Tribunal cases.',
      href: '/voting-ledger',
      icon: '/docs/persate/icons/voting.svg',
    },
    {
      title: 'Stakeholders',
      description: 'Institutions, parties and people: organization pages, person profiles, Sejm committees and connections.',
      href: '/stakeholders',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
    {
      title: 'Media',
      description: 'Public posts on X by tracked stakeholders, grouped into events, stories and topics.',
      href: '/public-pulse',
      icon: '/docs/persate/icons/pulse.svg',
    },
    {
      title: 'Labs',
      description: 'Research tools built on a reviewed data release and assigned to selected organizations.',
      href: '/labs',
      icon: '/docs/persate/icons/data.svg',
    },
    {
      title: 'AI apps (MCP)',
      description: 'Connect ChatGPT, Claude and other MCP clients to Persate with a Persate account.',
      href: '/mcp',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Account and settings',
      description: 'Personal settings, notifications, security, connected AI apps and the Sources catalogue.',
      href: '/account-and-settings',
      icon: '/docs/persate/icons/notification.svg',
    },
    {
      title: 'Administration',
      description: 'For administrators: organization settings, members, access groups, usage and processing permissions.',
      href: '/administration',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
  ],
  pl: [
    {
      title: 'Pierwsze kroki',
      description: 'Zasady dostępu do Persate — od zaproszenia do pierwszej sesji pracy — oraz konfiguracja weryfikacji dwuetapowej.',
      href: '/pl/getting-started',
      icon: '/docs/persate/icons/book.svg',
    },
    {
      title: 'Korzystanie z Persate',
      description: 'Panel boczny, górny pasek, wyszukiwanie globalne, wiadomości i ustawienia wspólne dla całej platformy.',
      href: '/pl/using-persate',
      icon: '/docs/persate/icons/data.svg',
    },
    {
      title: 'Kokpit',
      description: 'Ekran startowy: uszeregowane zdarzenia z alertów, etapy projektów i stanowiska konsultacyjne w jednym widoku.',
      href: '/pl/cockpit',
      icon: '/docs/persate/icons/dashboard.svg',
    },
    {
      title: 'Advisor',
      description: 'Analizy legislacji, głosowań, nagrań, Mediów, interesariuszy i dokumentów organizacji z odpowiedziami powiązanymi ze źródłami.',
      href: '/pl/advisor',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Monitorowanie',
      description: 'Śledzenie legislacji, osób, instytucji i tematów za pomocą alertów oraz przegląd dopasowań w jednym miejscu.',
      href: '/pl/alerts',
      icon: '/docs/persate/icons/alert.svg',
    },
    {
      title: 'Repozytorium',
      description: 'Przesyłanie i udostępnianie plików, wyszukiwanie i podgląd oraz porządkowanie ich w inteligentnych folderach.',
      href: '/pl/repository',
      icon: '/docs/persate/icons/storage.svg',
    },
    {
      title: 'Redaktor',
      description: 'Pisanie artykułów z edycjami Advisora, sprawdzaniem faktów i języka, ponumerowanymi źródłami i historią dokumentu.',
      href: '/pl/editor',
      icon: '/docs/persate/icons/report.svg',
    },
    {
      title: 'Legislacja',
      description: 'Projekty rządowe i ich ścieżka legislacyjna, pytania parlamentarne, opublikowane akty i publikacje instytucji.',
      href: '/pl/legislation-tracker',
      icon: '/docs/persate/icons/scan.svg',
    },
    {
      title: 'Nagrania',
      description: 'Nagrania obrad Sejmu z transkrypcją, mówcami, oficjalnym stenogramem i statusem analizy.',
      href: '/pl/live-proceedings',
      icon: '/docs/persate/icons/live.svg',
    },
    {
      title: 'Głosowania',
      description: 'Głosowania Sejmu i Senatu, decyzje Prezydenta oraz sprawy Trybunału Konstytucyjnego.',
      href: '/pl/voting-ledger',
      icon: '/docs/persate/icons/voting.svg',
    },
    {
      title: 'Interesariusze',
      description: 'Instytucje, ugrupowania i osoby: strony organizacji, profile osób, komisje sejmowe i powiązania.',
      href: '/pl/stakeholders',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
    {
      title: 'Media',
      description: 'Publiczne wpisy obserwowanych interesariuszy w serwisie X pogrupowane w wydarzenia, wątki i tematy.',
      href: '/pl/public-pulse',
      icon: '/docs/persate/icons/pulse.svg',
    },
    {
      title: 'Laboratoria',
      description: 'Narzędzia badawcze oparte na przejrzanym wydaniu danych i przypisywane wybranym organizacjom.',
      href: '/pl/labs',
      icon: '/docs/persate/icons/data.svg',
    },
    {
      title: 'Aplikacje AI (MCP)',
      description: 'Łączenie ChatGPT, Claude i innych klientów MCP z Persate za pomocą konta Persate.',
      href: '/pl/mcp',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Konto i ustawienia',
      description: 'Ustawienia osobiste, powiadomienia, bezpieczeństwo, połączone aplikacje AI i katalog źródeł.',
      href: '/pl/account-and-settings',
      icon: '/docs/persate/icons/notification.svg',
    },
    {
      title: 'Administracja',
      description: 'Dla administratorów: ustawienia organizacji, członkowie, grupy dostępu, wykorzystanie i uprawnienia przetwarzania.',
      href: '/pl/administration',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
  ],
};


function PersateIcon({ src, size = 22 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="opacity-90 dark:invert"
      style={{ width: size, height: size }}
    />
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export async function generateMetadata(props: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang: rawLang } = await props.params;
  const lang: Lang = rawLang === 'pl' ? 'pl' : 'en';
  const t = copy[lang];
  const url = publicUrl(lang, []);
  const localeOg = lang === 'pl' ? 'pl_PL' : 'en_US';

  return {
    title: { absolute: t.metaTitle },
    description: t.lead,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        i18n.languages
          .map<[string, string]>((l) => [l, publicUrl(l, [])])
          .concat([['x-default', publicUrl(i18n.defaultLanguage, [])]]),
      ),
    },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Persate Documentation',
      title: t.metaTitle,
      description: t.lead,
      locale: localeOg,
      images: [{ url: '/persate/persate.svg', alt: 'Persate' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metaTitle,
      description: t.lead,
    },
  };
}

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang: rawLang } = await props.params;
  const lang: Lang = rawLang === 'pl' ? 'pl' : 'en';
  const t = copy[lang];
  const docsHref = lang === 'pl' ? '/pl/getting-started' : '/getting-started';

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.metaTitle,
    description: t.lead,
    url: publicUrl(lang, []),
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'Persate',
      url: siteUrl,
    },
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Persate',
    url: siteUrl,
    logo: `${siteUrl}/docs/persate/persate.svg`,
    sameAs: ['https://www.linkedin.com/company/persate/'],
  };

  return (
    <main className="flex flex-col flex-1 bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd, orgJsonLd]) }}
      />
      <section className="border-b border-separator">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <h1 className="bg-gradient-to-r from-primarytxt to-primary to-60% bg-clip-text text-transparent text-5xl md:text-6xl tracking-tight uppercase">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-secondarytxt">
            {t.lead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={docsHref}
              className="flex items-center justify-center gap-2 rounded border border-lighter bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-radiant"
            >
              {t.primary}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href={t.secondaryHref}
              className="flex items-center justify-center gap-2 rounded border border-lighter px-4 py-2 text-sm text-primarytxt transition-colors hover:bg-foreground/5"
            >
              {t.secondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-separator">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondarytxt">{t.available}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections[lang].map(({ title, description, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex h-full flex-col rounded-xl border border-separator bg-lighterbg p-4 shadow-sm transition-colors hover:bg-foreground/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-tileIconBorder bg-tileIconBg">
                  <PersateIcon src={icon} size={20} />
                </div>
                <h3 className="mt-4 text-base font-medium text-primarytxt">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondarytxt">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-secondarytxt transition-colors group-hover:text-primarytxt">
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="max-w-3xl text-sm leading-relaxed text-secondarytxt">{t.feedback}</p>
        </div>
      </section>
    </main>
  );
}
