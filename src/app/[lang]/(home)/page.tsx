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
    upcoming: 'On the way',
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
    upcoming: 'W przygotowaniu',
    feedback:
      'Każda strona dokumentacji zawiera odnośnik "View source on GitHub". Uwagi i propozycje korekt prosimy zgłaszać poprzez pull request lub issue.',
  },
} satisfies Record<Lang, Record<string, string>>;

type Tile = { title: string; description: string; href: string; icon: string };
type Pending = { title: string; description: string; icon: string };

const sections: Record<Lang, Tile[]> = {
  en: [
    {
      title: 'Getting started',
      description: 'The guide explains the process of creating an account, configuring two-factor authentication, and signing in for the first time.',
      href: '/getting-started',
      icon: '/docs/persate/icons/book.svg',
    },
    {
      title: 'Cockpit',
      description: 'The main dashboard aggregates information about live proceedings, triggered alerts, and the current activity of stakeholders.',
      href: '/cockpit',
      icon: '/docs/persate/icons/dashboard.svg',
    },
    {
      title: 'Live proceedings',
      description: 'The view allows watching live sessions and recordings, tracking the session schedule, and analyzing the results of analytical pipelines.',
      href: '/live-proceedings',
      icon: '/docs/persate/icons/live.svg',
    },
    {
      title: 'Voting ledger',
      description: 'The ledger enables browsing the list of parliamentary votes, analyzing detailed results, and verifying the balance of power on the chamber map.',
      href: '/voting-ledger',
      icon: '/docs/persate/icons/voting.svg',
    },
    {
      title: 'Stakeholders and Public Pulse',
      description: 'The directory presents MP profiles and aggregates X stream activity for all tracked stakeholders.',
      href: '/stakeholders',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
    {
      title: 'Alerts and risks',
      description: 'The module allows configuring notifications for events in the legislative stream and sharing defined alerts with group members.',
      href: '/alerts',
      icon: '/docs/persate/icons/alert.svg',
    },
    {
      title: 'AI advisor',
      description: 'The advisor supports complex search and synthesis of legislative information based on built-in capability modules.',
      href: '/advisor',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Repository',
      description: 'The private document library allows uploading files, organizing them in a smart folder structure, and searching datasets.',
      href: '/repository',
      icon: '/docs/persate/icons/storage.svg',
    },
    {
      title: 'Account and settings',
      description: 'The settings modal allows managing the profile, verifying active sessions, configuring notifications, and adjusting appearance preferences.',
      href: '/account-and-settings',
      icon: '/docs/persate/icons/notification.svg',
    },
  ],
  pl: [
    {
      title: 'Pierwsze kroki',
      description: 'Przewodnik wyjaśnia proces zakładania konta, konfiguracji uwierzytelniania dwuskładnikowego oraz pierwszego logowania.',
      href: '/pl/getting-started',
      icon: '/docs/persate/icons/book.svg',
    },
    {
      title: 'Cockpit',
      description: 'Główny ekran agreguje informacje o posiedzeniach na żywo, wyzwolonych alertach oraz bieżącej aktywności interesariuszy.',
      href: '/pl/cockpit',
      icon: '/docs/persate/icons/dashboard.svg',
    },
    {
      title: 'Posiedzenia na żywo',
      description: 'Widok umożliwia oglądanie sesji na żywo i nagrań, śledzenie harmonogramu obrad oraz analizę wyników pipeline\'ów analitycznych.',
      href: '/pl/live-proceedings',
      icon: '/docs/persate/icons/live.svg',
    },
    {
      title: 'Rejestr głosowań',
      description: 'Rejestr pozwala przeglądać listę głosowań parlamentarnych, analizować szczegółowe wyniki oraz weryfikować układ sił na mapie sali.',
      href: '/pl/voting-ledger',
      icon: '/docs/persate/icons/voting.svg',
    },
    {
      title: 'Interesariusze i Public Pulse',
      description: 'Katalog prezentuje profile posłów oraz agreguje aktywność w strumieniu X dla wszystkich monitorowanych interesariuszy.',
      href: '/pl/stakeholders',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
    {
      title: 'Alerty i ryzyka',
      description: 'Moduł pozwala konfigurować powiadomienia o zdarzeniach w strumieniu legislacyjnym oraz udostępniać zdefiniowane alerty członkom grupy.',
      href: '/pl/alerts',
      icon: '/docs/persate/icons/alert.svg',
    },
    {
      title: 'Asystent AI',
      description: 'Asystent wspiera proces złożonego wyszukiwania i syntezy informacji legislacyjnych na podstawie wbudowanych modułów kompetencji.',
      href: '/pl/advisor',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Repozytorium',
      description: 'Prywatna biblioteka dokumentów pozwala wgrać pliki, organizować je w strukturze smart folderów oraz przeszukiwać zbiory danych.',
      href: '/pl/repository',
      icon: '/docs/persate/icons/storage.svg',
    },
    {
      title: 'Konto i ustawienia',
      description: 'Okno ustawień pozwala zarządzać profilem, weryfikować aktywne sesje, konfigurować powiadomienia oraz dostosować preferencje wyglądu.',
      href: '/pl/account-and-settings',
      icon: '/docs/persate/icons/notification.svg',
    },
  ],
};

const upcoming: Record<Lang, Pending[]> = {
  en: [
    { title: 'Daily reports', description: 'The tool automatically generates daily summaries of vote results, triggered alerts, and stakeholder activity.', icon: '/docs/persate/icons/report.svg' },
    { title: 'Legislation tracker', description: 'The module allows tracking bills from the beginning to the end of the legislative process, including readings, committee work, and amendments.', icon: '/docs/persate/icons/scan.svg' },
  ],
  pl: [
    { title: 'Raporty dzienne', description: 'Narzędzie automatycznie tworzy dzienne podsumowania wyników głosowań, wyzwolonych alertów oraz aktywności interesariuszy.', icon: '/docs/persate/icons/report.svg' },
    { title: 'Tracker legislacyjny', description: 'Moduł pozwala śledzić ustawy od początku do końca procesu legislacyjnego, obejmując czytania, prace w komisjach oraz poprawki.', icon: '/docs/persate/icons/scan.svg' },
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
        // eslint-disable-next-line react/no-danger
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
          {upcoming[lang].length > 0 && (
            <>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondarytxt">{t.upcoming}</h2>
              <ul className="mt-6 grid gap-x-6 gap-y-0 sm:grid-cols-2">
                {upcoming[lang].map(({ title, description, icon }) => (
                  <li key={title} className="flex gap-3 border-b border-separator/60 py-3 last:border-b-0">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-tileIconBorder bg-tileIconBg">
                      <PersateIcon src={icon} size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primarytxt">{title}</p>
                      <p className="text-sm text-secondarytxt">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className={`${upcoming[lang].length > 0 ? 'mt-10' : ''} max-w-3xl text-sm leading-relaxed text-secondarytxt`}>{t.feedback}</p>
        </div>
      </section>
    </main>
  );
}
