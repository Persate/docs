import './global.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://persate.com'),
  title: {
    template: '%s | Persate | Documentation',
    default: 'Persate | Documentation',
  },
  description:
    'User guide for Persate, the public-affairs intelligence platform for monitoring the Polish parliament.',
};

// The root layout must include <html> and <body> tags.
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  return (
    <html
      lang={params?.lang ?? 'en'}
      className={`${montserrat.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-bg text-primarytxt">
        {children}
      </body>
    </html>
  );
}
