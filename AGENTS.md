# docs/ — Public Docs Conventions

Per-repo addendum for `docs/` — the public user-facing documentation (Fumadocs) deployed to **persate.com/docs/**. Read this before editing any `.mdx` or `meta.json` here. Workspace-wide rules live in [`../internal-docs/AGENTS.md`](../internal-docs/AGENTS.md); the operational traps live in the [`mdx-docs-gotchas`](../internal-docs/skills/mdx-docs-gotchas/SKILL.md) skill — this file is the conventions layer (audience, voice, EN/PL, redaction) that the skill links back to.

---

## 1. What this repo is

- Fumadocs (Next.js App Router) site. Content is MDX under `content/docs/`, organized into sections (`alerts/`, `advisor/`, `repository/`, …).
- Audience: **Persate end users** (analysts, public-affairs professionals) — not engineers. They want to accomplish tasks in the product, not understand its internals.
- Verify interface behavior and labels against the **frontend code** (`../FE/src`) and access/processing behavior against the corresponding backend contract. Record the source revision and distinguish it from deployed behavior; branch tips alone are not release evidence.

---

## 2. Content structure

```
content/docs/
├── meta.json            # EN section order
├── meta.pl.json         # PL section order (titles in Polish)
├── <section>/
│   ├── index.mdx        # section landing (EN)
│   ├── index.pl.mdx     # section landing (PL)
│   ├── <page>.mdx       # EN page
│   └── <page>.pl.mdx    # PL sibling
```

- A new section = new folder + `index.mdx` + `index.pl.mdx`, then register the folder slug in **both** `meta.json` and `meta.pl.json` `pages` arrays.
- Section ordering must match between `meta.json` and `meta.pl.json`.

---

## 3. The two build traps (see the skill for detail)

1. **No bare `{...}` in MDX prose** — MDX evaluates them as JSX and the build explodes. Wrap in a code span `` `{id}` `` or escape `\{ \}`. Applies to placeholders, JSON snippets, URL patterns like `/users/{id}`.
2. **Never list `"index"` in a `meta.json` `pages` array** — Fumadocs then treats the landing page as an ordinary child and drops it from the folder header (`delete node.index` in the page-tree builder). The page still builds and is reachable by URL, but the sidebar section header stops linking to it and turns into a plain expand/collapse button, with the landing page repeated as a child entry. Verified on the live PL sidebar in PER-533. The index is implicit; only list siblings.

Validate before declaring done:

```bash
rg -n '\{[^`]*\}' docs/content/docs --type mdx | rg -v '```'   # bare braces — review each
rg '"index"' docs/content/docs --type json                     # must be empty
cd docs && npm run build                                       # catches both
```

---

## 4. EN + PL pairing

Every page exists as a pair: `<page>.mdx` (English) and `<page>.pl.mdx` (Polish). They are kept in sync:

- Same headings, same section order, same frontmatter keys (`title`, `description`).
- When you change one language, update the other in the same change — **or** explicitly record the drift so it can be reconciled later.
- The interface supports English and Polish; English is the default for accounts without a saved choice. Authored/source content keeps its original language. If a task scopes to PL-only, list which EN siblings now drift instead of silently leaving them.

---

## 5. Voice & tone

Match the house voice — exemplar: [`content/docs/advisor/best-practices.mdx`](content/docs/advisor/best-practices.mdx) and its `.pl.mdx` sibling.

- **Impersonal, factual, instructional.** Describe what the product does and how to use it. No marketing, no hype, no exclamation.
- **Polish:** bezosobowy, rzeczowy, polski techniczny. Unikać form „Ty/Twój" i kalek z angielskiego. Terminologia jak w polskim interfejsie (`FE/packages/ui/src/i18n/messages/pl.json`): **Advisor** jako odmieniana nazwa własna (Advisora, Advisorem), „alert", „interesariusz", moduły pod nazwami z nawigacji (Kokpit, Monitorowanie, Repozytorium, Inteligentne foldery, Redaktor, Legislacja, Nagrania, Głosowania, Interesariusze, Media, Laboratoria).
- **English:** plain, direct, present tense. Prefer the active product as subject ("Advisor returns…", "Entering `@` opens…").
- Tables for option/comparison matrices; short paragraphs; bold for the key term, italics for example phrasings.
- Use real UI labels and steps — verify them against FE, don't invent. Section titles and the root sidebar groups mirror the app's sidebar (`FE/src/components/platform/sidebar/navigation.ts`).
- Quote labels exactly as the interface shows them, and don't add remarks that a label "is shown in English" in the Polish interface. That is an FE translation gap: report it, or describe the element in plain Polish.

---

## 6. Redaction policy

Public documentation explains user tasks, visible controls and verified access rules. Include only the information needed to understand or use those features.

Keep these details in internal documentation:

- Infrastructure and model vendors, model pins, budgets and private contract terms.
- Internal service names, producer/tool inventories, storage engines, database layouts and resource URI formats.
- Hostnames or endpoints used only by operators, private IPs, ports, keys, configuration variables and release procedures.
- Infrastructure diagrams or descriptions that reveal service topology, even after vendor names are removed.
- Scraping intervals, internal source endpoint inventories and roadmap dates.

Names of sign-in providers or applications the user explicitly connects may remain where needed to complete that action. The public MCP server URL, OAuth scopes and connection steps are also a user-facing contract. This exception does not permit a backend/provider inventory or unnecessary internal namespaces in task examples.

Apply the same boundary to MDX, screenshots, downloadable assets, scripts that generate public assets, and generated search/LLM feeds. Removing an image from a page is insufficient if it remains served under `public/`. Organization-specific technical assurance belongs in the agreed private review channel. Do not replace technical detail with unsupported promises about encryption, retention or compliance.

---

## 7. Don't

- Don't ship internal architecture, implementation inventories, budgets or operational details in user copy or public assets; apply the functional-connection exception in §6 narrowly.
- Don't break EN/PL pairing or section ordering.
- Don't use bare curly braces in MDX prose. Ever.
- Don't list `"index"` in `meta.json` `pages`.
- Don't invent UI labels or behavior — read FE.
- Don't `git commit` without explicit instruction.

---

## 8. Tooling

- Install with `npm ci`, not `npm install`, so `node_modules` matches `package-lock.json`.
- ESLint stays on 9.x: `eslint-config-next@16.2.4` bundles `eslint-plugin-react` 7.x, which crashes on ESLint 10 (`scopeManager.addGlobals is not a function`, `contextOrFilename.getFilename is not a function`). If `npm run lint` crashes with either error, `node_modules` has drifted from the lockfile — run `npm ci`.
- `npm run lint` must exit 0 with no warnings and `npm run build` must pass before declaring done.


## 9. In-product screenshots

- Screenshots live in `public/persate/screenshots/<area>/<name>.jpg` (English) and `<name>-pl.jpg` (Polish): 1440×900 JPEG, light theme, referenced from both pages of the pair with `<img src="/docs/persate/screenshots/…" alt="…" />` and an alt text in the page's language.
- Regenerate them with `npm run screenshots` (all shots) or `npm run screenshots -- --only <id,…>`; ids and targets are in `scripts/screenshots.json`. A browser window opens on persate.com: sign in yourself, and the script captures every shot in both languages and signs out. It never handles credentials, and it forces language and theme only in the browser, so the account's settings stay unchanged.
- Only screens with public data (legislation, votes, recordings, public figures, media) belong in the manifest. Screens showing an organization's alerts, files, conversations or members need a dedicated demo tenant first.
- When a UI change makes a shot outdated, rerun the script for that id rather than editing images by hand.

## 10. Bilingual interface controls

The Fumadocs 16.8.5 package includes several hardcoded control labels outside its built-in translation keys. `scripts/patch-fumadocs-i18n.mjs` connects those labels to the existing locale context during `npm ci`; Polish labels live in `src/app/[lang]/layout.tsx`, with the original English fallbacks. The patch is version-checked and idempotent. Review it when upgrading Fumadocs; do not remove a failing patch without replacing its bilingual behavior. Verify sidebar, theme, search, copy and page-opening controls in both languages and at mobile widths. This is a source patch, never a runtime DOM text replacement.
