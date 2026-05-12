import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18n } from '@/lib/i18n';

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
  },
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  return (
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
  );
}
