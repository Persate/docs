#!/usr/bin/env node
/**
 * Captures the in-product screenshots used by the docs, in English and Polish.
 *
 *   npm run screenshots                          every shot in scripts/screenshots.json
 *   npm run screenshots -- --only votes-sejm     a subset, comma-separated ids
 *   npm run screenshots -- --list                print the shot ids and exit
 *
 * Options: --base <origin> (default from the manifest), --channel <msedge|chrome>,
 * --locales en,pl, --wait <minutes to wait for sign-in, default 15>.
 *
 * A browser window opens on the Persate sign-in page and waits for a person to
 * sign in there. The script never handles passwords or two-factor codes. It then
 * captures each shot at the manifest viewport in the light theme, once per
 * language, writes `public/persate/screenshots/<file>.jpg` (English) and
 * `<file>-pl.jpg` (Polish), and signs out. The session lives only in memory.
 *
 * Language and theme are forced in the browser's copy of the account profile
 * response, so the account's saved preferences do not change. The avatar,
 * unread counters, toasts and the cookie notice are neutralised before each
 * capture. Only shots of public data belong in the manifest.
 */
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'public', 'persate', 'screenshots');
const manifest = JSON.parse(await readFile(path.join(root, 'scripts', 'screenshots.json'), 'utf8'));

const args = parseArgs(process.argv.slice(2));
if (args.list) {
  for (const shot of manifest.shots) console.log(`${shot.id.padEnd(24)} ${shot.file}`);
  process.exit(0);
}

const base = (args.base ?? manifest.base).replace(/\/$/, '');
const locales = (args.locales ?? 'en,pl').split(',');
const only = args.only?.split(',');
const shots = only ? manifest.shots.filter((shot) => only.includes(shot.id)) : manifest.shots;
const unknown = only?.filter((id) => !manifest.shots.some((shot) => shot.id === id)) ?? [];
if (unknown.length) throw new Error(`Unknown shot id: ${unknown.join(', ')}`);

const SIGN_IN_TIMEOUT = Number(args.wait ?? 15) * 60_000;
// The platform sidebar's Votes entry exists only in the signed-in application.
const PLATFORM_READY = 'a[href="/ledger"]';
const USER_MENU_LABELS = ['Open user menu', 'Otwórz menu użytkownika'];

const browser = await chromium.launch({ channel: args.channel ?? 'msedge', headless: false });
let locale = locales[0];
let signedIn = false;
const failures = [];

try {
  const context = await browser.newContext({
    viewport: manifest.viewport,
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  });
  await context.addInitScript(() => {
    try {
      localStorage.setItem('theme', 'light');
      const match = document.cookie.match(/(?:^|; )persate-language=(en|pl)/);
      if (match) localStorage.setItem('persate-language', match[1]);
    } catch {
      // Storage can be unavailable before the first navigation.
    }
  });
  await context.route(/\/common\/me(\?.*)?$/, async (route) => {
    if (route.request().method() !== 'GET') return route.continue();
    // Drop validators so the profile always arrives with a body to rewrite.
    const headers = { ...route.request().headers() };
    delete headers['if-none-match'];
    delete headers['if-modified-since'];
    const response = await route.fetch({ headers });
    let body;
    try {
      body = await response.json();
    } catch {
      return route.fulfill({ response });
    }
    body.preferences = { ...(body.preferences ?? {}), language: locale, theme: 'light' };
    return route.fulfill({ response, json: body });
  });

  const page = await context.newPage();
  await setLanguage(context, locale);
  await page.goto(`${base}/login`);
  console.log(`Sign in to Persate in the browser window. Waiting up to ${SIGN_IN_TIMEOUT / 60_000} minutes…`);
  await page.waitForSelector(PLATFORM_READY, { timeout: SIGN_IN_TIMEOUT });
  signedIn = true;
  console.log('Signed in. Capturing…');

  for (const nextLocale of locales) {
    locale = nextLocale;
    await setLanguage(context, locale);
    for (const shot of shots) {
      const file = path.join(outputDir, `${shot.file}${locale === 'en' ? '' : `-${locale}`}.jpg`);
      try {
        await openShot(page, shot);
        await settle(page, shot);
        await neutralise(page);
        await mkdir(path.dirname(file), { recursive: true });
        await page.screenshot({ path: file, type: 'jpeg', quality: manifest.quality ?? 82 });
        console.log(`  ${locale}  ${shot.id.padEnd(24)} ${path.relative(root, file)}  ${page.url()}`);
      } catch (error) {
        failures.push(`${locale} ${shot.id}: ${error.message.split('\n')[0]}`);
        console.error(`  ${locale}  ${shot.id.padEnd(24)} FAILED — ${error.message.split('\n')[0]}`);
      }
    }
  }

  await signOut(page);
} finally {
  if (!signedIn) console.error('No session was established; nothing was captured.');
  await browser.close();
}

if (failures.length) {
  console.error(`\n${failures.length} shot(s) failed:\n${failures.join('\n')}`);
  process.exit(1);
}

async function setLanguage(context, value) {
  const { hostname } = new URL(base);
  await context.addCookies([{ name: 'persate-language', value, domain: hostname, path: '/', sameSite: 'Lax' }]);
}

/**
 * Opens a fixed `path`, or opens the `from` list page and clicks the first element
 * matching one of the `open` selectors (tried in order) until the URL path and
 * query match `expect`. Lists navigate on row click, so links are not required.
 */
async function openShot(page, shot) {
  if (shot.path) {
    await page.goto(`${base}${shot.path}`, { waitUntil: 'domcontentloaded' });
    return;
  }
  await page.goto(`${base}${shot.from}`, { waitUntil: 'domcontentloaded' });
  await settle(page, {});
  const expected = new RegExp(shot.expect);
  for (const selector of shot.open) {
    const target = page.locator(selector).first();
    if (!(await target.count())) continue;
    await target.click({ timeout: 15_000 });
    await page.waitForURL((url) => expected.test(url.pathname + url.search), { timeout: 30_000 });
    return;
  }
  throw new Error(`no element matched ${shot.open.join(' | ')} on ${shot.from}`);
}

/** Waits for data and loading placeholders to finish, then runs the shot's own steps. */
async function settle(page, shot) {
  await page.waitForSelector(PLATFORM_READY, { timeout: 30_000 });
  if (shot.waitFor) await page.waitForSelector(shot.waitFor, { timeout: 30_000 });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await page
    .waitForFunction(() => !document.querySelector('.animate-pulse, [aria-busy="true"]'), undefined, { timeout: 20_000 })
    .catch(() => {});
  for (const selector of shot.click ?? []) {
    await page.click(selector, { timeout: 15_000 });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }
  await page.waitForTimeout(shot.delay ?? 1_200);
}

/** Hides personal and transient chrome so the capture shows the product only. */
async function neutralise(page) {
  await page.evaluate((labels) => {
    for (const label of labels) {
      for (const trigger of document.querySelectorAll(`[aria-label="${label}"]`)) {
        trigger.querySelectorAll('img').forEach((image) => image.remove());
        const walker = document.createTreeWalker(trigger, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (walker.currentNode.textContent.trim()) walker.currentNode.textContent = 'P';
        }
      }
    }
    for (const badge of document.querySelectorAll('span[aria-label]')) {
      if (/unread|nieprzeczytan/i.test(badge.getAttribute('aria-label'))) badge.style.display = 'none';
    }
    let style = document.getElementById('docs-capture-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'docs-capture-style';
      document.head.append(style);
    }
    style.textContent = [
      'section[aria-labelledby="cookie-consent-title"]',
      '[data-sonner-toaster]',
      'nextjs-portal',
    ].join(',') + '{display:none!important}';
  }, USER_MENU_LABELS);
}

async function signOut(page) {
  const status = await page.evaluate(async () => {
    const response = await fetch('/api/auth/session/logout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json', 'X-Persate-CSRF': '1' },
    });
    return response.status;
  });
  console.log(status < 300 ? 'Signed out.' : `Sign-out returned ${status}; sign out manually if the session is still listed.`);
}

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index].replace(/^--/, '');
    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) result[key] = true;
    else {
      result[key] = next;
      index += 1;
    }
  }
  return result;
}
