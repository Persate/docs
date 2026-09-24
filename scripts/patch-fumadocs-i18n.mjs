import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Fumadocs 16.8.5 leaves these controls outside its translation context.
// Keep its components and interactions, and connect only their owned labels.
// A dependency upgrade must review this patch; never silently omit a label.
const root = resolve(import.meta.dirname, '../node_modules/fumadocs-ui');
assert.equal(JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).version, '16.8.5');

function patch(file, replacements, importPath) {
  const path = resolve(root, 'dist', file);
  let source = readFileSync(path, 'utf8');
  if (importPath) replacements.unshift([
    '"use client";',
    `"use client";\nimport { useI18n } from "${importPath}";`,
  ]);
  for (const [before, after] of replacements) {
    if (source.includes(after)) continue;
    assert.equal(source.split(before).length - 1, 1, `${file}: translation patch drift: ${before}`);
    source = source.replace(before, () => after);
  }
  writeFileSync(path, source);
}

const label = (key, fallback) => `text.${key} ?? ${JSON.stringify(fallback)}`;

patch('components/sidebar/base.js', [
  ['function SidebarTrigger({ children, ...props }) {', 'function SidebarTrigger({ children, ...props }) {\n\tconst { text } = useI18n();'],
  ['function SidebarCollapseTrigger(props) {', 'function SidebarCollapseTrigger(props) {\n\tconst { text } = useI18n();'],
  ['"aria-label": "Open Sidebar"', '"aria-label": ' + label('openSidebar', 'Open Sidebar')],
  ['"aria-label": "Collapse Sidebar"', '"aria-label": collapsed ? (text.expandSidebar ?? "Expand Sidebar") : (text.collapseSidebar ?? "Collapse Sidebar")'],
], '../../contexts/i18n.js');

patch('layouts/shared/slots/theme-switch.js', [
  ['function ThemeSwitch({ className, mode = "light-dark", ...props }) {', 'function ThemeSwitch({ className, mode = "light-dark", ...props }) {\n\tconst { text } = useI18n();'],
  ['"aria-label": `Toggle Theme`', '"aria-label": ' + label('toggleTheme', 'Toggle Theme')],
  ['"aria-label": key,', '"aria-label": text[`theme_${key}`] ?? key,'],
], '../../../contexts/i18n.js');

patch('layouts/shared/slots/search-trigger.js', [
  ['function SearchTrigger({ hideIfDisabled, size = "icon-sm", color = "ghost", ...props }) {', 'function SearchTrigger({ hideIfDisabled, size = "icon-sm", color = "ghost", ...props }) {\n\tconst { text } = useI18n();'],
  ['"aria-label": "Open Search"', '"aria-label": ' + label('openSearch', 'Open Search')],
]);

patch('layouts/home/slots/header.js', [
  ['function Header(props) {', 'function Header(props) {\n\tconst { text } = useI18n();'],
  ['"aria-label": "Toggle Menu"', '"aria-label": ' + label('toggleMenu', 'Toggle Menu')],
], '../../../contexts/i18n.js');

patch('components/codeblock.js', [
  ['function CopyButton({ className, containerRef, ...props }) {', 'function CopyButton({ className, containerRef, ...props }) {\n\tconst { text } = useI18n();'],
  ['"aria-label": checked ? "Copied Text" : "Copy Text"', '"aria-label": checked ? (text.copiedText ?? "Copied Text") : (text.copyText ?? "Copy Text")'],
], '../contexts/i18n.js');

patch('components/accordion.js', [
  ['function CopyButton({ id }) {', 'function CopyButton({ id }) {\n\tconst { text } = useI18n();'],
  ['"aria-label": "Copy Link"', '"aria-label": ' + label('copyLink', 'Copy Link')],
], '../contexts/i18n.js');

patch('components/banner.js', [
  ['], ...props }) {\n\tconst [open, setOpen]', '], ...props }) {\n\tconst { text } = useI18n();\n\tconst [open, setOpen]'],
  ['"aria-label": "Close Banner"', '"aria-label": ' + label('closeBanner', 'Close Banner')],
], '../contexts/i18n.js');

patch('layouts/shared/page-actions.js', [
  ['function MarkdownCopyButton({ markdownUrl, ...props }) {', 'function MarkdownCopyButton({ markdownUrl, ...props }) {\n\tconst { text } = useI18n();'],
  ['props.children ?? "Copy Markdown"', 'props.children ?? text.copyMarkdown ?? "Copy Markdown"'],
  ['function ViewOptionsPopover({ markdownUrl, githubUrl, ...props }) {', 'function ViewOptionsPopover({ markdownUrl, githubUrl, ...props }) {\n\tconst { text } = useI18n();'],
  ['const q = `Read ${typeof window === "undefined" ? pathname : new URL(pathname, window.location.origin)}, I want to ask questions about it.`;', 'const q = (text.pageQuestion ?? "Read {url}, I want to ask questions about it.").replace("{url}", () => String(props["data-page-url"] ?? (typeof window === "undefined" ? pathname : window.location.href)));'],
  ...[
    ['openGitHub', 'Open in GitHub'], ['viewMarkdown', 'View as Markdown'],
    ['openScira', 'Open in Scira AI'], ['openChatGPT', 'Open in ChatGPT'],
    ['openClaude', 'Open in Claude'], ['openCursor', 'Open in Cursor'],
  ].map(([key, fallback]) => [`title: ${JSON.stringify(fallback)}`, `title: ${label(key, fallback)}`]),
  ['\t\tmarkdownUrl,\n\t\tpathname\n\t]);', '\t\tmarkdownUrl,\n\t\tpathname,\n\t\ttext,\n\t\tprops["data-page-url"]\n\t]);'],
  ['props.children ?? "Open"', 'props.children ?? text.openPage ?? "Open"'],
], '../../contexts/i18n.js');

console.log('Fumadocs interface labels connected to the locale context.');
