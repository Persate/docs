'use client';

import type { ComponentProps } from 'react';

/**
 * The docs navbar logo. Links to the marketing landing in the same tab.
 * Fumadocs' default Link wrapper would auto-apply target='_blank' for
 * external URLs; rendering our own <a> avoids that.
 */
export function NavTitle({ className }: ComponentProps<'a'>) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href="https://persate.com/" className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/docs/persate/persate.svg"
        alt="Persate"
        className="h-5 w-auto dark:invert"
      />
      <span className="sr-only">Persate documentation</span>
    </a>
  );
}
