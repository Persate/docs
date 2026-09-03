// Generates the public (redacted, vendor-neutral) security architecture SVG for the Trust Center page,
// in EN and PL. Source of truth for the topology: internal-docs/security/architecture-diagram.md (PER-332).
// Usage (from docs/): node scripts/security-architecture-svg.mjs public/persate/trust-center
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2] ?? ".";

const L = {
  en: {
    title: "Persate — data flow and encryption points",
    subtitle:
      "Simplified view for security reviewers. Blue arrows: TLS-encrypted in transit. Orange dashed area: private network, not reachable from the internet.",
    users: "Users",
    browser: ["Web browser", "persate.com"],
    mobile: ["Mobile app", "same session model"],
    operators: ["Persate operators", "VPN + TLS, restricted"],
    platform: "Persate platform — EU hosting",
    webTier: "Web application tier",
    webApp: ["Web application server", "sign-in, pages, session checks"],
    docs: ["Public documentation", "read-only"],
    webCaption: "TLS termination · HSTS · Secure, SameSite session cookies · no browser-readable tokens",
    apiTier: "API tier — EU (Poland)",
    gateway: ["API gateway", "TLS termination · rate limiting · security headers"],
    services: ["Application services", "authentication · documents · search · alerts · AI assistant · legislation · administration"],
    workers: ["Background workers", "processing, alerts, indexing"],
    inference: ["Self-hosted AI inference", "embeddings · OCR · reranking"],
    privNet: "Private data network — no internet exposure",
    cache: ["Cache and", "task queues"],
    fts: ["Full-text", "search index"],
    vec: ["Vector", "index"],
    corpus: ["Public legal", "corpus database"],
    privCaption: "Reachable only from application services and workers",
    managed: "Managed services — EU",
    db: ["Managed PostgreSQL", "Tenant isolation (row-level security)", "Encrypted at rest (provider-managed AES-256)", "Daily backups"],
    idp: ["Identity provider", "Password or SSO sign-in", "Two-factor authentication (TOTP)"],
    storage: ["Object storage — EU (Poland)", "Uploaded documents and previews", "Vector segments, database backups"],
    providers: ["AI and email providers", "Called over TLS per request", "Listed as sub-processors in the DPA"],
    tls: "TLS",
    vpn: "VPN + TLS",
    legendTls: "TLS 1.2+ in transit",
    legendRest: "Encrypted at rest (provider-managed)",
    legendPriv: "Private network, no public access",
  },
  pl: {
    title: "Persate — przepływ danych i punkty szyfrowania",
    subtitle:
      "Widok uproszczony dla zespołów bezpieczeństwa. Niebieskie strzałki: szyfrowanie TLS w tranzycie. Pomarańczowy obszar przerywany: sieć prywatna, niedostępna z internetu.",
    users: "Użytkownicy",
    browser: ["Przeglądarka", "persate.com"],
    mobile: ["Aplikacja mobilna", "ten sam model sesji"],
    operators: ["Operatorzy Persate", "VPN + TLS, dostęp ograniczony"],
    platform: "Platforma Persate — hosting w UE",
    webTier: "Warstwa aplikacji webowej",
    webApp: ["Serwer aplikacji webowej", "logowanie, strony, weryfikacja sesji"],
    docs: ["Dokumentacja publiczna", "tylko odczyt"],
    webCaption: "Terminacja TLS · HSTS · ciasteczka sesji Secure, SameSite · brak tokenów czytelnych w przeglądarce",
    apiTier: "Warstwa API — UE (Polska)",
    gateway: ["Brama API", "terminacja TLS · limity żądań · nagłówki bezpieczeństwa"],
    services: ["Usługi aplikacyjne", "uwierzytelnianie · dokumenty · wyszukiwanie · alerty · asystent AI · legislacja · administracja"],
    workers: ["Procesy w tle", "przetwarzanie, alerty, indeksowanie"],
    inference: ["Własna inferencja AI", "embeddingi · OCR · reranking"],
    privNet: "Prywatna sieć danych — bez dostępu z internetu",
    cache: ["Pamięć podręczna", "i kolejki zadań"],
    fts: ["Indeks", "pełnotekstowy"],
    vec: ["Indeks", "wektorowy"],
    corpus: ["Baza publicznego", "korpusu prawnego"],
    privCaption: "Dostępna wyłącznie dla usług aplikacyjnych i procesów w tle",
    managed: "Usługi zarządzane — UE",
    db: ["Zarządzany PostgreSQL", "Izolacja najemców (RLS)", "Szyfrowane w spoczynku (AES-256, dostawca)", "Codzienne kopie zapasowe"],
    idp: ["Dostawca tożsamości", "Logowanie hasłem lub SSO", "Uwierzytelnianie dwuskładnikowe (TOTP)"],
    storage: ["Magazyn obiektów — UE (Polska)", "Przesłane dokumenty i podglądy", "Segmenty wektorów, kopie baz danych"],
    providers: ["Dostawcy AI i poczty", "Wywoływani przez TLS per żądanie", "Wymienieni jako podprocesorzy w DPA"],
    tls: "TLS",
    vpn: "VPN + TLS",
    legendTls: "TLS 1.2+ w tranzycie",
    legendRest: "Szyfrowanie w spoczynku (po stronie dostawcy)",
    legendPriv: "Sieć prywatna, bez dostępu publicznego",
  },
};

const FONT = `-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
const C = {
  ink: "#1f2937",
  muted: "#6b7280",
  border: "#cbd5e1",
  panel: "#f8fafc",
  blue: "#2563eb",
  blueBg: "#dbeafe",
  blueInk: "#1e3a8a",
  green: "#059669",
  greenBg: "#ecfdf5",
  orange: "#ea580c",
  orangeBg: "#fff7ed",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function box(x, y, w, h, lines, opts = {}) {
  const { fill = "#fff", stroke = C.border, rx = 8, dash = "", titleSize = 13, bodySize = 11 } = opts;
  const n = lines.length;
  const lineH = 15;
  const totalH = titleSize + 4 + (n - 1) * lineH;
  let ty = y + h / 2 - totalH / 2 + titleSize - 1;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  lines.forEach((t, i) => {
    const size = i === 0 ? titleSize : bodySize;
    const weight = i === 0 ? 600 : 400;
    const color = i === 0 ? C.ink : C.muted;
    out += `<text x="${x + w / 2}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(t)}</text>`;
    ty += lineH;
  });
  return out;
}

function label(x, y, text, opts = {}) {
  const { size = 14, weight = 600, color = C.ink, anchor = "start" } = opts;
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(text)}</text>`;
}

function pill(cx, cy, text, kind = "tls") {
  const w = text.length * 6.4 + 14;
  const fill = kind === "tls" ? C.blueBg : C.orangeBg;
  const ink = kind === "tls" ? C.blueInk : C.orange;
  return `<rect x="${(cx - w / 2).toFixed(1)}" y="${cy - 9}" width="${w.toFixed(1)}" height="18" rx="9" fill="${fill}"/>` +
    `<text x="${cx}" y="${cy + 3.5}" text-anchor="middle" font-size="10" font-weight="600" fill="${ink}">${esc(text)}</text>`;
}

// Straight or elbow arrow. pts = [[x,y],...]
function arrow(pts, kind = "tls") {
  const stroke = kind === "tls" ? C.blue : kind === "priv" ? C.orange : C.muted;
  const dash = kind === "priv" ? ` stroke-dasharray="5 4"` : "";
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.6"${dash} marker-end="url(#arrow-${kind})"/>`;
}

function render(t) {
  const W = 1180, H = 720;
  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="title desc" font-family='${FONT}'>`);
  parts.push(`<title id="title">${esc(t.title)}</title>`);
  parts.push(`<desc id="desc">${esc(t.subtitle)}</desc>`);
  parts.push(`<defs>
  <marker id="arrow-tls" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.blue}"/></marker>
  <marker id="arrow-priv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.orange}"/></marker>
  <marker id="arrow-plain" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.muted}"/></marker>
</defs>`);
  parts.push(`<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="#ffffff" stroke="${C.border}"/>`);

  // Title
  parts.push(label(30, 36, t.title, { size: 18, weight: 700 }));
  parts.push(label(30, 56, t.subtitle, { size: 11.5, weight: 400, color: C.muted }));

  // ---- Users column
  parts.push(`<rect x="30" y="90" width="200" height="260" rx="10" fill="${C.panel}" stroke="${C.border}"/>`);
  parts.push(label(42, 112, t.users, { size: 13 }));
  parts.push(box(45, 130, 170, 62, t.browser));
  parts.push(box(45, 210, 170, 62, t.mobile));
  parts.push(box(45, 290, 170, 46, t.operators, { fill: C.panel, titleSize: 12, bodySize: 10 }));

  // ---- Platform column
  parts.push(`<rect x="270" y="90" width="560" height="560" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4"/>`);
  parts.push(label(282, 112, t.platform, { size: 13 }));

  // Web tier
  parts.push(`<rect x="290" y="126" width="520" height="108" rx="8" fill="#eff6ff" stroke="${C.blue}" stroke-opacity="0.5"/>`);
  parts.push(label(300, 145, t.webTier, { size: 12, color: C.blueInk }));
  parts.push(box(300, 156, 245, 48, t.webApp));
  parts.push(box(565, 156, 235, 48, t.docs));
  parts.push(label(550, 224, t.webCaption, { size: 10, weight: 500, color: C.blueInk, anchor: "middle" }));

  // API tier
  parts.push(`<rect x="290" y="250" width="520" height="384" rx="8" fill="${C.panel}" stroke="#94a3b8"/>`);
  parts.push(label(300, 269, t.apiTier, { size: 12 }));
  parts.push(box(300, 282, 500, 46, t.gateway, { fill: "#eff6ff", stroke: C.blue }));
  parts.push(box(300, 346, 500, 56, t.services));
  parts.push(box(300, 420, 240, 46, t.workers));
  parts.push(box(560, 420, 240, 46, t.inference));

  // Private data network
  parts.push(`<rect x="300" y="484" width="500" height="138" rx="8" fill="${C.orangeBg}" stroke="${C.orange}" stroke-dasharray="6 4"/>`);
  parts.push(label(310, 503, t.privNet, { size: 11.5, color: C.orange }));
  const dx = [310, 433, 556, 679];
  [t.cache, t.fts, t.vec, t.corpus].forEach((lines, i) => parts.push(box(dx[i], 514, 111, 52, lines, { titleSize: 11.5, bodySize: 11 })));
  parts.push(label(550, 604, t.privCaption, { size: 10, weight: 500, color: C.orange, anchor: "middle" }));

  // ---- Managed column
  parts.push(`<rect x="870" y="90" width="280" height="560" rx="10" fill="${C.panel}" stroke="${C.border}"/>`);
  parts.push(label(882, 112, t.managed, { size: 13 }));
  parts.push(box(885, 130, 250, 92, t.db, { fill: C.greenBg, stroke: C.green }));
  parts.push(box(885, 246, 250, 70, t.idp));
  parts.push(box(885, 340, 250, 74, t.storage));
  parts.push(box(885, 440, 250, 74, t.providers));

  // ---- Arrows: users -> platform
  parts.push(arrow([[215, 161], [300, 174]], "tls"));
  parts.push(pill(257, 160, t.tls));
  parts.push(arrow([[215, 241], [255, 241], [255, 190], [300, 186]], "tls"));
  parts.push(arrow([[215, 251], [255, 251], [255, 305], [300, 305]], "tls"));
  parts.push(pill(257, 280, t.tls));
  parts.push(arrow([[215, 313], [282, 313], [282, 373], [300, 373]], "tls"));
  parts.push(pill(282, 342, t.vpn));

  // web app -> gateway
  parts.push(arrow([[322, 204], [322, 282]], "tls"));
  parts.push(pill(322, 244, t.tls));

  // gateway -> services -> workers/inference -> private net
  parts.push(arrow([[550, 328], [550, 346]], "plain"));
  parts.push(arrow([[420, 402], [420, 420]], "plain"));
  parts.push(arrow([[680, 402], [680, 420]], "plain"));
  parts.push(arrow([[420, 466], [420, 484]], "priv"));
  parts.push(arrow([[640, 402], [640, 410], [520, 410], [520, 484]], "priv"));

  // platform -> managed
  parts.push(arrow([[800, 356], [840, 356], [840, 176], [885, 176]], "tls"));
  parts.push(pill(840, 265, t.tls));
  parts.push(arrow([[800, 372], [848, 372], [848, 281], [885, 281]], "tls"));
  parts.push(arrow([[800, 450], [840, 450], [840, 377], [885, 377]], "tls"));
  parts.push(pill(840, 413, t.tls));
  parts.push(arrow([[800, 388], [856, 388], [856, 477], [885, 477]], "tls"));
  parts.push(pill(856, 520, t.tls));
  parts.push(arrow([[790, 540], [830, 540], [830, 395], [885, 395]], "tls"));

  // ---- Legend
  const ly = 680;
  parts.push(`<line x1="40" y1="${ly}" x2="70" y2="${ly}" stroke="${C.blue}" stroke-width="1.6" marker-end="url(#arrow-tls)"/>`);
  parts.push(label(78, ly + 4, t.legendTls, { size: 11, weight: 500, color: C.muted }));
  parts.push(`<rect x="300" y="${ly - 8}" width="22" height="16" rx="4" fill="${C.greenBg}" stroke="${C.green}"/>`);
  parts.push(label(330, ly + 4, t.legendRest, { size: 11, weight: 500, color: C.muted }));
  parts.push(`<rect x="620" y="${ly - 8}" width="22" height="16" rx="4" fill="${C.orangeBg}" stroke="${C.orange}" stroke-dasharray="4 3"/>`);
  parts.push(label(650, ly + 4, t.legendPriv, { size: 11, weight: 500, color: C.muted }));

  parts.push(`</svg>`);
  return parts.join("\n");
}

for (const [lang, t] of Object.entries(L)) {
  const file = join(outDir, lang === "en" ? "security-architecture.svg" : "security-architecture.pl.svg");
  writeFileSync(file, render(t), "utf8");
  console.log("wrote", file);
}
