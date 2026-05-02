import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Link from 'next/link';
import { gitConfig } from './shared';
import { NavTitle } from '@/components/NavTitle';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: NavTitle,
    },
    links: [
      {
        type: 'custom',
        secondary: true,
        children: (
          <Link
            href="https://persate.com/dashboard"
            className="flex items-center justify-center gap-2 rounded border border-lighter bg-secondary px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-bg hover:rounded-4xl"
          >
            Try Persate
          </Link>
        ),
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
