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
      description: 'Account creation, two-factor authentication, and first sign-in.',
      href: '/getting-started',
      icon: '/docs/persate/icons/book.svg',
    },
    {
      title: 'Cockpit',
      description: 'The unified dashboard: live proceedings, alerts, and recent activity.',
      href: '/cockpit',
      icon: '/docs/persate/icons/dashboard.svg',
    },
    {
      title: 'Live proceedings',
      description: 'Watching live and recorded sessions, scheduled agendas, and analysis pipelines.',
      href: '/live-proceedings',
      icon: '/docs/persate/icons/live.svg',
    },
    {
      title: 'Voting ledger',
      description: 'Browsing parliamentary votes, inspecting results, and reading the seat-by-seat chamber map.',
      href: '/voting-ledger',
      icon: '/docs/persate/icons/voting.svg',
    },
    {
      title: 'Stakeholders and Public Pulse',
      description: 'The MP directory and the aggregated X feed across every tracked stakeholder.',
      href: '/stakeholders',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
    {
      title: 'Alerts and risks',
      description: 'Standing watches over the legislative stream, with trigger events and group sharing.',
      href: '/alerts',
      icon: '/docs/persate/icons/alert.svg',
    },
    {
      title: 'AI advisor',
      description: 'The in-app legislative-intelligence agent: skills, conversations, worked examples, and best practices.',
      href: '/advisor',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Repository',
      description: 'Uploading, organising, and searching the document library.',
      href: '/repository',
      icon: '/docs/persate/icons/storage.svg',
    },
    {
      title: 'Account and settings',
      description: 'The settings modal: profile, security and 2FA, sessions, notifications, and appearance.',
      href: '/account-and-settings',
      icon: '/docs/persate/icons/notification.svg',
    },
  ],
  pl: [
    {
      title: 'Pierwsze kroki',
      description: 'Założenie konta, uwierzytelnianie dwuskładnikowe oraz pierwsze logowanie.',
      href: '/pl/getting-started',
      icon: '/docs/persate/icons/book.svg',
    },
    {
      title: 'Cockpit',
      description: 'Pulpit zbiorczy: posiedzenia na żywo, alerty oraz bieżąca aktywność.',
      href: '/pl/cockpit',
      icon: '/docs/persate/icons/dashboard.svg',
    },
    {
      title: 'Posiedzenia na żywo',
      description: 'Oglądanie sesji na żywo i nagrań, harmonogram obrad oraz pipeline\'y analityczne.',
      href: '/pl/live-proceedings',
      icon: '/docs/persate/icons/live.svg',
    },
    {
      title: 'Rejestr głosowań',
      description: 'Przeglądanie głosowań parlamentarnych, analiza wyników oraz mandatowa mapa sali.',
      href: '/pl/voting-ledger',
      icon: '/docs/persate/icons/voting.svg',
    },
    {
      title: 'Interesariusze i Public Pulse',
      description: 'Katalog posłów oraz zagregowany strumień X obejmujący wszystkich monitorowanych interesariuszy.',
      href: '/pl/stakeholders',
      icon: '/docs/persate/icons/stakeholders.svg',
    },
    {
      title: 'Alerty i ryzyka',
      description: 'Stałe obserwatoria nad strumieniem legislacyjnym, ze zdarzeniami wyzwalającymi i udostępnianiem grupowym.',
      href: '/pl/alerts',
      icon: '/docs/persate/icons/alert.svg',
    },
    {
      title: 'Asystent AI',
      description: 'Wewnątrzaplikacyjny agent inteligencji legislacyjnej: umiejętności, konwersacje, przykłady robocze i dobre praktyki.',
      href: '/pl/advisor',
      icon: '/docs/persate/icons/chat.svg',
    },
    {
      title: 'Repozytorium',
      description: 'Wgrywanie, porządkowanie i przeszukiwanie biblioteki dokumentów.',
      href: '/pl/repository',
      icon: '/docs/persate/icons/storage.svg',
    },
    {
      title: 'Konto i ustawienia',
      description: 'Modal ustawień: profil, bezpieczeństwo i 2FA, sesje, powiadomienia oraz wygląd.',
      href: '/pl/account-and-settings',
      icon: '/docs/persate/icons/notification.svg',
    },
  ],
};

const upcoming: Record<Lang, Pending[]> = {
  en: [
    { title: 'Daily reports', description: 'Auto-generated end-of-day summaries of votes, alerts, and stakeholder activity.', icon: '/docs/persate/icons/report.svg' },
    { title: 'Legislation tracker', description: 'Following bills end-to-end through the legislative process — readings, committees, and amendments.', icon: '/docs/persate/icons/scan.svg' },
  ],
  pl: [
    { title: 'Raporty dzienne', description: 'Automatycznie generowane podsumowania głosowań, alertów oraz aktywności interesariuszy z końca dnia.', icon: '/docs/persate/icons/report.svg' },
    { title: 'Tracker legislacyjny', description: 'Śledzenie ustaw od początku do końca procesu legislacyjnego — czytania, komisje i poprawki.', icon: '/docs/persate/icons/scan.svg' },
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
