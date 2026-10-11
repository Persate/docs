'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Page statistics with Umami, the same first-party tracker as the rest of persate.com: nginx
 * serves it at /_s/s.js and collects at /_s/api/e on the docs' own origin. It sets no cookie and
 * stores nothing on the device, so it needs no consent banner (Privacy Policy § 2(4)(h)).
 *
 * Automatic tracking is off. Each page view is sent from here with the page path only (no query,
 * no fragment), and the referrer reduced to the origin of another website or, for a persate.com
 * page, to its path with ids removed. The tracker sends nothing while Do Not Track is on.
 *
 * No `NEXT_PUBLIC_UMAMI_WEBSITE_ID` at build time → nothing loads.
 */

const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim() ?? '';
const SCRIPT_SRC = '/_s/s.js';

type Payload = Record<string, unknown>;
type UmamiWindow = Window & { umami?: { track: (build: (defaults: Payload) => Payload) => unknown } };

let script: HTMLScriptElement | null = null;
let pending: Payload[] = [];
let counted: string | null = null;
let previous: string | null = null;

const withoutIds = (path: string) =>
  path
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, ':id')
    .replace(/\/\d+(?=\/|$)/g, '/:id');

function referrerOf(raw: string): string {
  try {
    const url = new URL(raw);
    return url.origin === window.location.origin ? withoutIds(url.pathname) : `${url.origin}/`;
  } catch {
    return '';
  }
}

function send(overrides: Payload) {
  const tracker = (window as UmamiWindow).umami;
  if (tracker) void tracker.track((defaults) => ({ ...defaults, ...overrides }));
  else if (pending.length < 20) pending.push(overrides);
}

function load() {
  if (script) return;
  const element = document.createElement('script');
  element.async = true;
  element.src = SCRIPT_SRC;
  element.setAttribute('data-website-id', WEBSITE_ID);
  element.setAttribute('data-host-url', `${window.location.origin}/_s`);
  element.setAttribute('data-auto-track', 'false');
  element.setAttribute('data-do-not-track', 'true');
  element.setAttribute('data-exclude-search', 'true');
  element.setAttribute('data-exclude-hash', 'true');
  element.addEventListener('load', () => {
    const queued = pending;
    pending = [];
    if ((window as UmamiWindow).umami) queued.forEach(send);
  });
  element.addEventListener('error', () => {
    pending = [];
  });
  script = element;
  document.head.appendChild(element);
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!WEBSITE_ID) return;
    // The full path, basePath included (/docs/...): the docs share the site's statistics.
    const page = window.location.pathname;
    if (page === counted) return;
    const referrer = previous ?? referrerOf(document.referrer);
    previous = page;
    counted = page;
    load();
    send({ url: page, referrer, title: document.title });
  }, [pathname]);

  return null;
}
