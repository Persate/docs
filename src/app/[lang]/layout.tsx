import '../global.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18n } from '@/lib/i18n';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const documentation = lang === 'pl' ? 'Dokumentacja' : 'Documentation';
  return {
    metadataBase: new URL('https://persate.com'),
    title: { template: `%s | Persate | ${documentation}`, default: `Persate | ${documentation}` },
    description: lang === 'pl'
      ? 'Instrukcja obsługi Persate, platformy analitycznej do monitorowania polskiego parlamentu.'
      : 'User guide for Persate, the public-affairs intelligence platform for monitoring the Polish parliament.',
  };
}

const locales = [
  { name: 'English', locale: 'en' },
  { name: 'Polski', locale: 'pl' },
];

const translations: Record<string, Record<string, string>> = {
  pl: {
    search: 'Szukaj',
    searchNoResult: 'Brak wyników',
    toc: 'Na tej stronie',
    tocNoHeadings: 'Brak nagłówków',
    lastUpdate: 'Ostatnia aktualizacja',
    chooseLanguage: 'Wybierz język',
    nextPage: 'Następna strona',
    previousPage: 'Poprzednia strona',
    chooseTheme: 'Wybierz motyw',
    editOnGithub: 'Edytuj na GitHub',
    openSidebar: 'Otwórz panel boczny',
    collapseSidebar: 'Zwiń panel boczny',
    expandSidebar: 'Rozwiń panel boczny',
    toggleTheme: 'Zmień motyw',
    theme_light: 'Jasny',
    theme_dark: 'Ciemny',
    theme_system: 'Systemowy',
    openSearch: 'Otwórz wyszukiwanie',
    toggleMenu: 'Otwórz lub zamknij menu',
    copyText: 'Kopiuj tekst',
    copiedText: 'Tekst skopiowany',
    copyLink: 'Kopiuj link',
    closeBanner: 'Zamknij baner',
    copyMarkdown: 'Kopiuj Markdown',
    openPage: 'Otwórz',
    openGitHub: 'Otwórz w GitHub',
    viewMarkdown: 'Wyświetl jako Markdown',
    openScira: 'Otwórz w Scira AI',
    openChatGPT: 'Otwórz w ChatGPT',
    openClaude: 'Otwórz w Claude',
    openCursor: 'Otwórz w Cursor',
    pageQuestion: 'Przeczytaj {url}. Chcę zadać pytania dotyczące tej strony.',
  },
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${montserrat.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-bg text-primarytxt">
        <RootProvider
          i18n={{ locale: lang, locales, translations: translations[lang] }}
          search={{
            options: { api: '/docs/api/search' },
          }}
          theme={{
            attribute: 'class',
            defaultTheme: 'dark',
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
