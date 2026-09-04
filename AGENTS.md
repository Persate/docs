# docs/ — Public Docs Conventions

Per-repo addendum for `docs/` — the public user-facing documentation (Fumadocs) deployed to **docs.persate.com**. Read this before editing any `.mdx` or `meta.json` here. Workspace-wide rules live in [`../internal-docs/AGENTS.md`](../internal-docs/AGENTS.md); the operational traps live in the [`mdx-docs-gotchas`](../internal-docs/skills/mdx-docs-gotchas/SKILL.md) skill — this file is the conventions layer (audience, voice, EN/PL, redaction) that the skill links back to.

---

## 1. What this repo is

- Fumadocs (Next.js App Router) site. Content is MDX under `content/docs/`, organized into sections (`alerts/`, `advisor/`, `repository/`, …).
- Audience: **Persate end users** (analysts, public-affairs professionals) — not engineers. They want to accomplish tasks in the product, not understand its internals.
- Source of truth for *behavior* is the **frontend code** (`../FE/src`). When docs and FE disagree, FE wins; update the docs.

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
- Polish is the primary product language; English mirrors it. If a task scopes to PL-only, list which EN siblings now drift instead of silently leaving them.

---

## 5. Voice & tone

Match the house voice — exemplar: [`content/docs/advisor/best-practices.mdx`](content/docs/advisor/best-practices.mdx) and its `.pl.mdx` sibling.

- **Impersonal, factual, instructional.** Describe what the product does and how to use it. No marketing, no hype, no exclamation.
- **Polish:** bezosobowy, rzeczowy, polski techniczny. Unikać form „Ty/Twój" i kalek z angielskiego; spójna terminologia (np. konsekwentnie „asystent", „alert", „interesariusz").
- **English:** plain, direct, present tense. Prefer the active product as subject ("The advisor returns…", "Entering `@` opens…").
- Tables for option/comparison matrices; short paragraphs; bold for the key term, italics for example phrasings.
- Use real UI labels and steps — verify them against FE, don't invent.

---

## 6. Redaction policy

User docs **never** mention:

- Vendor names (cloud provider, model/transcription vendors, etc.)
- Budgets, pricing, contract terms
- Roadmap dates
- Enumerated data sources (endpoint URLs, scraping intervals)
- Internal microservice names (`transcription_service`, `feature_worker`, …)
- Internal architecture that exposes service topology

User docs **may** mention: MCP and public namespaces (e.g. `persate.alerts`), tier names, capabilities in plain English, public UI behavior.

When in doubt: *would this leak to a competitor's eyes?* Redact. Internal engineering knowledge belongs in `internal-docs/`, not here.

---

## 7. Don't

- Don't ship internal architecture, vendors, budgets, dates, or service names in user copy.
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
