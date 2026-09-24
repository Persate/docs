'use client';

import type { ComponentProps } from 'react';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

/**
 * The docs navbar logo. Links to the marketing landing in the same tab.
 * Fumadocs' default Link wrapper would auto-apply target='_blank' for
 * external URLs; rendering our own <a> avoids that.
 */
export function NavTitle({ className }: ComponentProps<'a'>) {
  const { locale } = useI18n();
  return (
    <a href="https://persate.com/" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/docs/persate/persate.svg"
        alt="Persate"
        className="h-5 w-auto dark:invert"
      />
      <span className="sr-only">{locale === 'pl' ? 'Dokumentacja Persate' : 'Persate documentation'}</span>
    </a>
  );
}
