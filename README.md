# Persate documentation

Bilingual user documentation, published at [persate.com/docs/](https://persate.com/docs/). Content describes product tasks and controls; internal engineering material belongs in the separate internal documentation repository.

Read [AGENTS.md](AGENTS.md) before editing, especially the language-pairing and public-disclosure rules.

## Content and routes

- `content/docs/`: paired English `.mdx` and Polish `.pl.mdx` pages, with section ordering in `meta.json` and `meta.pl.json`.
- `src/lib/source.ts`: Fumadocs content loader.
- `src/app/[lang]/(docs)/[...slug]/page.tsx`: documentation pages.
- `src/app/api/search/route.ts`: documentation search.
- `src/app/[lang]/llms.txt/`, `llms-full.txt/` and `llms.mdx/`: text views generated from the same public content.
- `public/persate/`: publicly served assets. Do not place internal diagrams or private screenshots here.

The site uses the `/docs` base path. English is at `/docs/`; Polish is at `/docs/pl/`.

## Local verification

Use Node.js 20 or newer and the checked-in lockfile:

```bash
npm ci
npm run lint -- --max-warnings=0
npm run build
```

For a local content preview:

```bash
npm run dev
```

Open [the English preview](http://localhost:3000/docs/) or [the Polish preview](http://localhost:3000/docs/pl/). A successful build does not publish changes. Review both languages, links and served assets before release.
