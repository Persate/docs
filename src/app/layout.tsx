import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://persate.com'),
  title: {
    template: '%s | Persate | Documentation',
    default: 'Persate | Documentation',
  },
  description:
    'User guide for Persate, the public-affairs intelligence platform for monitoring the Polish parliament.',
};

// The actual <html><body> wrapper lives in [lang]/layout.tsx so the lang
// attribute can be set from the route param at build time.
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return children;
}
