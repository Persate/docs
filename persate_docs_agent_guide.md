# Persate Docs — Przewodnik dla agentów edytujących pliki `.pl.mdx`

> **Cel tego dokumentu:** Zestaw precyzyjnych wytycznych dla każdego agenta, który modyfikuje, pisze lub redaguje pliki polskiej wersji dokumentacji Persate (`*.pl.mdx`). Wszystkie zasady poniżej są wiążące i powinny być stosowane spójnie w każdym pliku.

---

## 1. Charakter dokumentacji i ton głosu

### Czym jest ta dokumentacja
- **Instrukcja obsługi dla użytkownika końcowego**, nie dokumentacja techniczna dla programistów.
- Czytelnik to analityk, prawnik lub specjalista ds. public affairs — wykształcony, ale niekoniecznie techniczny. Może mieć 25 lub 55 lat.
- Każde zdanie powinno odpowiedzieć na pytanie: *„Co mam zrobić / co się tutaj dzieje / po co mi to?"*

### Ton
- **Profesjonalny i neutralny** — unikamy bezpośredniego zwracania się do czytelnika.
- **Forma bezosobowa lub bezokolicznik** — stosujemy konstrukcje takie jak „wybrać”, „kliknąć”, „tworzy się”, „można wykonać”.
- **Zakaz używania „Ty/Twój/Twoje” oraz trybu rozkazującego** (np. „kliknij”, „wybierz”). Nie używamy też „Pan/Pani”.
- **Zakaz używania średników (;)** — zastępujemy je kropką (dzieląc zdanie na dwa krótsze) lub przecinkiem.
- **Precyzja przed elegancją** — jeśli zdanie eleganckie jest niejednoznaczne, zastąp je prostszym.
- **Nie piszemy pełnych zdań zawierających samo „itd.”/„itp.”** — lista z punktorami jest zawsze lepsza.

### Czego unikamy
| ❌ Nie używamy | ✅ Zamiast tego |
|---|---|
| „kliknij przycisk” / „Wybierz” | „Wybrać **Create alert**” / „Wybranie **Create alert**” |
| „funkcjonalność”, „opcjonalność” | „funkcja”, „opcja” |
| „użytkownik może wykonać” / „Możesz” | „Można wykonać” / „Wykonuje się” |
| „W chwili obecnej” | „Teraz” / „Aktualnie” |
| „interfejs użytkownika” | nazwa konkretnego widoku / panelu |
| „system” (ogólnie) | „platforma”, „Persate”, lub nazwa konkretnego modułu |
| słowa zakończone na „-yzacja”, „-izacja” | przeformułuj na czasownik: „zarządzanie” → „zarządza się” |
| zdania pasywne bez podmiotu | podmiot zawsze znany: „Asystent wysyła…”, „Platforma rejestruje…” |

---

## 2. Słownictwo — słownik obowiązujących terminów

Poniżej lista terminów używanych spójnie we wszystkich plikach. Pisownia i forma są wiążące.

| Termin w UI (EN) | Obowiązujące tłumaczenie PL | Uwagi |
|---|---|---|
| Cockpit | **Cockpit** | Bez tłumaczenia; nazwa własna |
| Advisor | **Asystent AI** | W pełnej nazwie; w skrócie „Asystent" |
| Live Proceedings | **Posiedzenia na żywo** | |
| Voting Ledger | **Rejestr głosowań** | |
| Stakeholders | **Interesariusze** | Zawsze l.mn.; jedna osoba: „interesariusz" |
| Public Pulse | **Public Pulse** | Bez tłumaczenia; nazwa własna |
| Alerts & Risks | **Alerty i ryzyka** | |
| Repository | **Repozytorium** | |
| Alert | **alert** | Małą literą, chyba że nazwa własna konkretnego alertu |
| trigger event | **zdarzenie wyzwalające** | |
| depth selector | **selektor głębokości** | |
| Surface / Balanced / Deep | **Surface / Balanced / Deep** | Bez tłumaczenia; w tekście opcjonalnie w nawiasie: *(Powierzchniowa)* |
| smart folder | **smart folder** | Małymi literami, bez tłumaczenia |
| sidebar | **pasek boczny** | |
| feed | **feed** | Bez tłumaczenia, małymi literami |
| timeline | **oś czasu** | Gdy opisuje widok UI — nie tłumaczymy nazwy trybu: „tryb Timeline" |
| tool call badge | **plakietka wywołania narzędzia** | |
| reasoning block | **blok rozumowania** | |
| elicitation form | **formularz elicytacji** | |
| citation | **cytowanie** | Nie: „cytat" (cytat to fragment tekstu, cytowanie to odniesienie) |
| chunk | **fragment** | Nie: „kawałek", „porcja" |
| proceeding | **posiedzenie** | |
| session | **sesja** (konwersacji) / **posiedzenie** (sejmowe) | Zależnie od kontekstu |
| Settings | **Ustawienia** | |
| TOTP | **TOTP** | Nie tłumaczymy skrótu |
| SSO | **SSO** | Nie tłumaczymy skrótu |
| banner | **banner** | Nie: baner; ujednolicono z plikami referencyjnymi |
| card | **karta** | |
| tile | **kafelek** | |
| panel | **panel** | |
| modal | **modal** | Nie tłumaczymy |
| hover | **najedź kursorem** | Nie: „zawisnąć", „najechać" |
| drag & drop | **przeciągnij i upuść** | Małymi literami w prozie |
| scroll | **przewiń** | |
| dropdown | **menu rozwijane** | Nie: „dropdown" |
| checkbox | **pole wyboru** | Nie: „checkbox" |
| toggle | **przełącznik** | Nie: „toggle" |
| tooltip | **podpowiedź** | Nie: „tooltip" |

---

## 3. Formatowanie MDX

### Frontmatter (nagłówek YAML)
Każdy plik musi zaczynać się od:
```yaml
---
title: [Tytuł widoczny w pasku bocznym i w tytule karty]
description: [Jedno zdanie — co opisuje strona. Nie zaczynamy od słowa "Strona".]
---
```
- `description` jest wyświetlany w listach i metadanych — musi być samodzielnym, informacyjnym zdaniem.
- `title` powinien być krótki (1–4 słowa); unika się słów takich jak „Opis", „Dokumentacja", „Informacje o".
- **Dodatkowe pola YAML** (np. `order:`, `slug:`, `draft:`, `date:`): jeśli istnieją w pliku — agent **zostawia je bez żadnych modyfikacji**, nawet jeśli ich nie rozumie.

### Multimedia (obrazki, wideo)
Aktualne pliki `.pl.mdx` nie zawierają obrazków ani osadzonych mediów. Jeśli jednak agent napotka tag `![alt text](...)` lub komponent `<Image />` — **nie usuwa go i nie zmienia ścieżki do pliku**. Jedyna dopuszczalna zmiana to przetłumaczenie atrybutu `alt` na język polski, jeśli jest po angielsku.

### Nagłówki
- `## H2` — sekcje główne strony. Każda strona ma 3–8 sekcji H2.
- `### H3` — podsekcje wewnątrz sekcji H2.
- Nie używamy `#### H4` ani głębiej — jeśli pojawia się potrzeba H4, treść powinna być przeorganizowana.
- **Nagłówki nie kończą się kropką.** Nie są pytaniami (bez „?").

### Pogrubienie (`**...**`)
- Nazwy elementów UI: przyciski, przełączniki, pola, zakładki, pozycje menu — zawsze pogrubione.
- Kluczowe terminy przy pierwszym wprowadzeniu — pogrubione.
- Nie pogrubiamy całych zdań ani dłuższych fraz.

### Kursywa (`*...*`)
- Etykiety interfejsu wyświetlane jako tekst na ekranie (np. komunikaty, podpisy, stany): *„No alerts triggered yet"*.
- Nazwy trybów przy wzmiankach pobocznych (np. tryb *Feed*).
- Nie używamy kursywy do emfazy — od tego jest pogrubienie.

### Kod inline (`` `...` ``)
- Kody błędów: `turn_budget_exhausted`
- URI i schematy: `legislation://voting/{proceeding}/{id}`
- Skróty klawiaturowe: `Shift + Enter`, `Enter`
- Nazwa narzędzia technicznego: `documents.hybrid_search`

### Tabele
- Używamy gdy mamy ≥ 3 elementy z co najmniej dwoma atrybutami (np. lista błędów + znaczenie, tabela modułów + zakres).
- Nagłówki kolumn są krótkie.
- Każda komórka jest kompletna — nie stosujemy „jak wyżej".

### Listy punktowane
- `*` dla punktorów nieuporządkowanych (opisów równoległych opcji).
- `1.` dla list kroków — gdy kolejność ma znaczenie.
- Każdy punkt zaczyna się wielką literą i nie kończy się kropką, chyba że jest to pełne zdanie.
- Zagnieżdżone listy (drugi poziom) stosujemy oszczędnie — maks. jeden poziom zagłębienia.

### Callout / Uwaga
Wzorzec dla ważnych zastrzeżeń:
```
**Uwaga:** Treść zastrzeżenia.
```
Lub dla ostrzeżenia dotyczącego destrukcji:
```
**Ważne:** Operacja jest nieodwracalna.
```
Nie używamy formatu `> [!NOTE]` — nie jest stosowany w tym projekcie.

### Nazwy komponentów technicznych — opisujemy zachowanie, nie typ elementu

Agent **nie używa** nazw technicznych komponentów UI jako terminów dokumentacyjnych. Słowa takie jak `popover`, `toast`, `badge`, `chip`, `drawer` (gdy nie są dosłowną etykietą widoczną w interfejsie) są pojęciami deweloperskimi — użytkownik końcowy ich nie zna i nie szuka.

Wyjątkiem są terminy skodyfikowane w słowniku (Sekcja 2): `modal`, `tooltip` → tam obowiązuje forma ze słownika (`modal`, `podpowiedź`).

| ❌ Nie piszemy | ✅ Zamiast tego |
|---|---|
| „popover atrybucji" | „ikona informacji — po najechaniu kursorem wyświetla źródło ilustracji" |
| „plakietka statusu" | „oznaczenie statusu **ACTIVE** / **PAUSED**" |
| „toast z potwierdzeniem" | „komunikat potwierdzający, który pojawia się chwilowo po zapisie" |
| „drawer wyszukiwania" | „panel wyszukiwania wysuwany z boku ekranu" |

Jeśli element ma widoczną etykietę tekstową w UI — używamy tej etykiety (pogrubionej). Jeśli etykiety brak — opisujemy co robi, nie jak się nazywa technicznie.

### Układ i responsywność — nie opisujemy

Agent **nie opisuje** szczegółów układu przestrzennego ani responsywności: liczby kolumn, przełamań siatki, zachowania na różnych rozdzielczościach. Te informacje są nieistotne dla użytkownika — nie pomagają wykonać zadania i zaśmiecają treść technicznym żargonem.

| ❌ Nie piszemy | ✅ Zamiast tego |
|---|---|
| „Karty w układzie dwukolumnowym na desktopie, jednokolumnowym na wąskich ekranach" | *(pomiń całkowicie — układ widoczny gołym okiem)* |
| „Widok otwiera się siatką kart" | „Widok prezentuje listę kart alertów" |
| „panel zajmuje prawą kolumnę" | „panel dostępny jest po prawej stronie ekranu" |

Jeśli pozycja elementu jest potrzebna do wykonania akcji (np. „wybierz ikonę w prawym górnym rogu banneru"), opisujemy tę pozycję — ale nie strukturę siatki ani liczbę kolumn.

---

## 4. Schemat struktury sekcji — co zawiera `index.mdx` a co podstrony

### Zasada podziału
```
index.mdx (strona główna sekcji)
├── Co to jest i do czego służy (wprowadzenie)
├── Jak wejść do tej sekcji (ścieżka w UI)
├── Przegląd kluczowych funkcji / komponentów (bez wchodzenia w szczegóły)
├── Stany pustego widoku i błędu (ogólne)
├── Zalecany sposób pracy (opcjonalnie)
└── Strony w tej sekcji (lista linków do podstron)

podstrona.pl.mdx (konkretna funkcja / ekran)
├── Dokładny opis UI ekran po ekranie / sekcja po sekcji
├── Jak używać każdego elementu
├── Stany puste, stany błędu specyficzne dla tego ekranu
└── Powiązania z innymi sekcjami (linki)
```

### Sekcja „Strony w tej sekcji"
Każdy `index.mdx` **musi** kończyć się sekcją `## Strony w tej sekcji` zawierającą listę linków do wszystkich podstron z jednozdaniowym opisem każdej.

Format:
```md
## Strony w tej sekcji

- **[Tytuł podstrony](/pl/sciezka/podstrony)** — co opisuje ta podstrona.
```

---

## 5. Schemat każdej sekcji — szczegółowe wytyczne

### 5.1 `getting-started/` — Pierwsze kroki

**`index.pl.mdx`** — skrócony przewodnik (max 25 linii treści):
- Krótkie zdanie czym jest ta sekcja.
- Numerowana lista 3 kroków (każdy krok = link do podstrony).
- Szacowany czas całej procedury.
- `## Wymagania wstępne` — lista wymagań sprzętu/konta.

**Podstrony:**
- `create-account.pl.mdx` — rejestracja krok po kroku; każdy krok numerowany; screenshoty zastąpione opisem tego, co widać na ekranie.
- `set-up-two-factor.pl.mdx` — instalacja aplikacji TOTP + sparowanie; sekcja dla każdej fazy (skanowanie kodu QR, weryfikacja jednorazowego kodu).
- `first-login.pl.mdx` — co użytkownik widzi po raz pierwszy; jak wygląda Cockpit; co powinien zrobić jako pierwsze.

---

### 5.2 `cockpit/` — Cockpit

**`index.pl.mdx`** (jedyna strona w sekcji, bez podstron):
- Czym jest Cockpit (domyślny ekran startowy).
- Opis każdego komponentu (`### Nazwa komponentu`).
- Sekcja `## Wskaźnik synchronizacji`.
- Sekcja `## Zalecany sposób pracy`.
- **Błędy i stany puste:** Opisać w każdym komponencie (np. „W przypadku braku alertów panel wyświetla…").
- Sekcja `## Znane ograniczenia` jeśli istnieją funkcje oznaczone jako SOON / WIP.

*Uwaga: Cockpit nie ma podstron — jest to jedyna strona w katalogu.*

---

### 5.3 `live-proceedings/` — Posiedzenia na żywo

**`index.pl.mdx`**:
- Czym jest widok.
- Jak wejść.
- Komponenty widoku (pasek tytułowy, odtwarzacz, panel analizy) — skrótowo.
- Stany: brak transmisji, transmisja aktywna, błąd połączenia.
- Link do `analysis.pl.mdx`.

**Podstrony:**
- `analysis.pl.mdx` — szczegółowy opis panelu analizy na żywo: jak włączyć, jak czytać wyniki, jak eksportować. Błędy specyficzne dla pipeline Record Analysis.

---

### 5.4 `voting-ledger/` — Rejestr głosowań

**`index.pl.mdx`**:
- Czym jest rejestr.
- Opis listy głosowań (filtry, układ kolumn, paginacja).
- Stany pustego widoku i błędu rejestru.
- Link do `voting-detail.pl.mdx`.

**Podstrony:**
- `voting-detail.pl.mdx` — widok szczegółowy pojedynczego głosowania: co zawiera każda sekcja (metadane, wyniki, lista głosów posłów). Opis eksportu i linków do interesariuszy.

---

### 5.5 `stakeholders/` — Interesariusze

**`index.pl.mdx`**:
- Czym jest katalog.
- Widok listy: filtry (klub, wyszukiwanie), ułożenie kart.
- Stany pustego widoku i błędu.
- Linki do `profile.pl.mdx` i `public-pulse.pl.mdx`.

**Podstrony:**
- `profile.pl.mdx` — co zawiera profil: zdjęcie, biogram, przynależność, frekwencja, historia głosowań, aktywność Public Pulse. Opis linków do rejestru i alertów.
- `public-pulse.pl.mdx` — widok Public Pulse w kontekście interesariuszy *(już dobrze napisany — patrz plik referencyjny)*.

---

### 5.6 `alerts/` — Alerty i ryzyka

**`index.pl.mdx`**:
- Czym są alerty.
- Lista alertów: układ kart, opis karty alertu.
- Pasek boczny: przycisk Create alert, wyszukiwanie.
- Cykl życia alertu (Active → Paused → Deleted).
- Stany pustego widoku i błędu.
- Linki do `creating-alerts.pl.mdx` i `alert-detail.pl.mdx`.

**Podstrony:**
- `creating-alerts.pl.mdx` — formularz alertu krok po kroku: nazwa, opis, słowa kluczowe, widoczność (prywatny/grupowy), ulepszenie AI, ostrzeżenie o duplikatach.
- `alert-detail.pl.mdx` — widok szczegółowy alertu: banner, kontrolki (Pause/Resume/Delete), historia wyzwoleń, panel uprawnień grupowych.

---

### 5.7 `advisor/` — Asystent AI

**`index.pl.mdx`**:
- Czym jest Asystent AI (nie chatbot — agent z ograniczonym korpusem).
- Zakres zastosowań (złożone wyszukiwanie, synteza).
- Tabela modułów kompetencji.
- Zarządzanie głębokością analizy.
- Historia konwersacji i ciągłość pracy.
- Linki do wszystkich 4 podstron.

**Podstrony:**
- `conversations.pl.mdx` — interfejs i praca z asystentem *(już dobrze napisany — patrz plik referencyjny)*.
- `skills.pl.mdx` — szczegółowy opis 6 modułów: jakie pytania obsługuje każdy, przykłady zapytań, czego nie obsługuje.
- `examples.pl.mdx` — minimum 6–8 konkretnych, gotowych przykładów pytań z opisem co asystent zrobi i co zwróci. Grupować wg modułu.
- `best-practices.pl.mdx` — kiedy używać Surface/Balanced/Deep; kiedy oznaczać pliki przez `@`; jak formułować pytania o korelacje; pułapki (zbyt ogólne pytania, pytania poza zakresem).

---

### 5.8 `repository/` — Repozytorium

**`index.pl.mdx`**:
- Czym jest Repozytorium (prywatna biblioteka dokumentów).
- Ogólny opis widoku (lista plików, pasek boczny z filtrem).
- Stany pustego widoku i błędu.
- Linki do `upload.pl.mdx`, `view-and-organize.pl.mdx`, `smart-folders.pl.mdx`.

**Podstrony:**
- `upload.pl.mdx` — jak wgrać plik: drag & drop, ograniczenie formatów (tylko PDF), ograniczenia rozmiaru, zakres dostępu (prywatny/grupowy). Błędy uploadu.
- `view-and-organize.pl.mdx` — przeglądarka plików, metadane w panelu bocznym, wyszukiwanie (debounce 1000ms), udostępnianie, usuwanie.
- `smart-folders.pl.mdx` — czym są smart foldery, jak je tworzyć, jak działają (saved query), ograniczenia.

---

### 5.9 `account-and-settings/` — Konto i ustawienia

**`index.pl.mdx`**:
- Jak otworzyć modal ustawień.
- Przegląd paneli (Konto, Bezpieczeństwo, Preferencje, Analysis, Advisor).
- Linki do podstron.

**Podstrony:**
- `account.pl.mdx` — zdjęcie profilowe, nazwa wyświetlana, e-mail logowania, rola, grupy.
- `security.pl.mdx` — zmiana hasła, zarządzanie 2FA (wymiana aplikacji, backup codes), aktywne sesje, historia logowań.
- `preferences.pl.mdx` — motyw, język, powiadomienia e-mail, ustawienia panelu Analysis, domyślna głębokość Asystenta.

---

## 6. Gdzie i jak opisywać błędy, stany puste i ograniczenia UI

### Zasada ogólna
Każdy ekran opisujemy kompletnie — to oznacza, że użytkownik, który trafi na coś nieoczekiwanego (pusty widok, komunikat błędu, funkcja wyłączona), musi znaleźć odpowiedź w dokumentacji bez kontaktowania się z supportem.

### Sekcja `## Stany pustego widoku i błędu`
- Umieszczamy ją **w każdym pliku** opisującym widok (index lub podstrona).
- Format: lista punktowana; każdy punkt zawiera **komunikat z UI** (kursywa lub inline code) + jednozdaniowe wyjaśnienie + sugestię działania.
- Przykład:
  ```
  - *„No alerts triggered yet"* — żaden skonfigurowany alert nie dopasował jeszcze sygnału. Nie wymaga działania.
  - *„Couldn't load alerts"* — błąd komunikacji z serwerem. Odśwież stronę; jeśli problem powtarza się, skontaktuj się z administratorem.
  ```

### Funkcje oznaczone jako SOON / WIP
- **Opisujemy je inline**, w odpowiednim komponencie / sekcji pliku — nie w osobnej podstronie.
- Zaznaczamy, że element jest widoczny w interfejsie, ale aktualnie niedostępny.
- Nie sugerujemy, że funkcja nie istnieje — informujemy, że jest w przygotowaniu.
- Wzorcowe sformułowanie: `Kafelek **Daily report** jest widoczny na Cockpicie, lecz aktualnie niedostępny — zostanie udostępniony w jednej z kolejnych aktualizacji platformy.`

### Ograniczenia UX i znane braki funkcjonalne
- Opisujemy je **inline**, w ramach sekcji, której dotyczą. Nie tworzymy osobnej podstrony ani zbiorczej listy.
- Wzorzec: krótkie, konkretne zdanie bez tonu krytycznego.
- Przykład z `conversations.pl.mdx`: *„Edycja i ponowne wysłanie wiadomości użytkownika nie jest dziś dostępne."*
- Nie opisujemy które funkcje „powinny" być — tylko opisujemy stan faktyczny.

---

## 7. Sekcja „Zalecany sposób pracy"

Każda sekcja opisująca złożony widok (Advisor, Public Pulse, Live Proceedings, Alerts) powinna kończyć się sekcją `## Zalecany sposób pracy`.

- Numerowana lista kroków (sekwencja, nie alternatywy).
- Kroki powinny prowadzić użytkownika przez typowe zadanie „od zera do wyniku".
- Maks. 7 kroków. Jeśli jest ich więcej — podziel na dwa scenariusze.
- Nie używamy języka marketingowego — kroków nie zaczynamy od „Odkryj…", „Skorzystaj z…".

---

## 8. Linkowanie wewnętrzne

### Format
```md
[Tytuł sekcji](/pl/sciezka/podstrony)
```
Linki zawsze prowadzą do wersji polskiej (`/pl/...`).

### Kiedy linkować
- Pierwsze wzmiankowanie innej sekcji w tekście.
- Na końcu pliku index.mdx — lista wszystkich podstron.
- W opisie kontrolki / funkcji, która otwiera inny widok.

### Kiedy nie linkować
- W nagłówkach.
- Wielokrotnie do tej samej strony w tym samym akapicie.

---

## 9. Zakres pracy agenta i czego nie zmieniać

### Zakres
- Agent **edytuje wyłącznie istniejące pliki** `*.pl.mdx`. Nie tworzy nowych plików, nie zmienia struktury katalogów.
- Jeśli w pliku brakuje wymaganej sekcji (np. `## Stany pustego widoku i błędu`), agent ją **dodaje do istniejącego pliku**.
- Zmiany architektoniczne (tworzenie nowych podstron, zmiana struktury folderów) wymagają osobnej decyzji właściciela projektu.

### Czego nie zmieniać
1. **Frontmatter `title` i `description`** — tylko jeśli są faktycznie błędne (literówka, opis nieadekwatny do treści).
2. **Ścieżki linków wewnętrznych** — zmiana struktury folderów jest decyzją architektoniczną, nie redakcyjną.
3. **Nazwy elementów UI** (nazwy przycisków, zakładek, menu) — muszą być zgodne z tym, co użytkownik widzi w interfejsie. Nie „poprawiamy" nazw elementów UI.
4. **Nazwy własne modułów** (Public Pulse, Cockpit, TOTP, SSO) — nie tłumaczymy.
5. **Treść merytoryczną** (co dana funkcja robi, jakie ma parametry) — agent redaguje styl i strukturę, nie zmienia faktów.

---

## 10. Zasady postępowania przy brakującym kontekście (anti-hallucination)

> **Priorytet absolutny:** Agent nigdy nie wymyśla informacji o funkcjonalności platformy. Jeśli istniejący plik nie zawiera wystarczającego kontekstu do napisania danej sekcji, agent zostawia placeholder i raportuje brak — zamiast wypełniać go domysłami.

### Kiedy brakuje kontekstu

Agent **nie posiada wystarczającego kontekstu** gdy:
- Plik, który edytuje, nie opisuje danej funkcji dostatecznie szczegółowo.
- W istniejącym pliku brakuje informacji o konkretnym elemencie UI, którego agent nie może zweryfikować (np. jakie dokładnie pola ma formularz, jakie są dokładne komunikaty błędów).
- Agent nie jest pewien jak brzmi etykieta konkretnego przycisku / nazwy widoku w interfejsie.
- Sekcja wymaga opisania zachowania, które nie wynika wprost z istniejącej treści pliku.

### Co robić w takiej sytuacji

**1. Zostaw placeholder zamiast wymyślać.**

Wzorzec placeholdera:
```
{/* TODO: brak kontekstu — [krótki opis czego brakuje] */}
```

Przykłady poprawnego użycia:
```
{/* TODO: brak kontekstu — nieznane dokładne komunikaty błędów uploadu */}
{/* TODO: brak kontekstu — nieznana etykieta przycisku potwierdzenia usunięcia */}
{/* TODO: brak kontekstu — nieznane zachowanie filtra przy pustym zapytaniu */}
```

**2. Raportuj brakujące informacje na końcu swojej odpowiedzi.**

Po zapisaniu pliku agent wymienia listę rzeczy, których nie mógł uzupełnić, np.:
> Nie uzupełniłem sekcji `## Stany pustego widoku i błędu` w `upload.pl.mdx` — brak informacji o komunikatach błędów uploadu. Oznaczone placeholderem `{/* TODO */}`.

### Czego absolutnie nie robić

| ❌ Niedopuszczalne | ✅ Poprawne zachowanie |
|---|---|
| Wymyślać treść komunikatu błędu (np. *„Plik jest za duży"*) | Zostawić placeholder i zaraportować brak |
| Zakładać że przycisk nazywa się inaczej niż w źródle | Użyć nazwy z istniejącego pliku lub placeholder |
| Opisywać zachowanie funkcji na podstawie domysłu | Zostawić placeholder |
| Kopiować opis z innej sekcji i dostosowywać go „na oko" | Zostawić placeholder |
| Pisać „prawdopodobnie", „zapewne", „być może" w treści dokumentacji | Zostawić placeholder albo opisać pewny fakt |

### Zasada „pewne fakty tylko"

Każde zdanie w pliku `.pl.mdx` musi opierać się na jednym z:
1. Treści już istniejącej w tym samym pliku (redagujemy, nie wymyślamy).
2. Treści z innego pliku `.pl.mdx` w tym samym projekcie (można przenieść / sparafrazować z podaniem źródła w komentarzu).
3. Struktury pliku wskazanej przez właściciela projektu (np. ten przewodnik).

Jeśli żadne z powyższych nie dostarcza wystarczającego kontekstu — **placeholder**.

---

## 11. Wzorzec pierwszego akapitu i dwa typy pliku

Każdy plik w projekcie należy do jednego z dwóch typów. Typ decyduje o tym jak powinno wyglądać otwarcie pliku.

### Typ A — strona samodzielna (bez podstron)

Stosowany wyłącznie dla **Cockpitu**. Index jest jedyną stroną w katalogu i opisuje cały ekran wyczerpująco.

**Wzorzec otwarcia:**
```
**[Nazwa modułu]** to [jedno zdanie — definicja i cel]. [Opcjonalnie drugie zdanie — co agreguje / co pokazuje].

Dostęp do [Nazwa modułu] zapewnia pozycja **[Ścieżka → W → Menu]** w pasku bocznym.
```

**Przykład (Cockpit):**
```
**Cockpit** to domyślny ekran startowy wyświetlany po uwierzytelnieniu. Agreguje najistotniejsze sygnały — bieżącą aktywność parlamentarną, ostatnie zdarzenia z alertów, działania interesariuszy oraz statystyki repozytorium — w jeden ekran do szybkiego przeglądu.

Ponowne otwarcie Cockpitu jest możliwe w każdej chwili poprzez wybranie pozycji **Cockpit** w pasku bocznym.
```

Po otwarciu następuje bezpośrednio opis komponentów (`### Nazwa komponentu`), bo nie ma podstron do których można odesłać.

---

### Typ B — index przeglądu modułu (ma podstrony)

Stosowany dla wszystkich pozostałych sekcji: Pierwsze kroki, Posiedzenia na żywo, Rejestr głosowań, Interesariusze, Alerty, Asystent AI, Repozytorium, Konto i ustawienia.

**Wzorzec otwarcia:**
```
**[Nazwa modułu]** to [jedno zdanie — definicja i cel]. [Opcjonalnie drugie zdanie rozszerzające].

Dostęp do [widoku/modułu] zapewnia pozycja **[Ścieżka → W → Menu]** w pasku bocznym.
```

Po otwarciu następuje przegląd kluczowych możliwości modułu — **bez wchodzenia w szczegóły** (te są w podstronach). Index kończy się sekcją `## Strony w tej sekcji`.

---

### Wzorzec otwarcia podstrony (nie index)

Podstrona opisuje konkretny ekran lub funkcję. **Nie powtarzamy** definicji modułu ani ścieżki dostępu — użytkownik przyszedł z index.mdx i już to wie.

**Wzorzec:**
```
**[Nazwa ekranu / funkcji]** [jedno zdanie opisujące co robi ten ekran lub narzędzie].
```

**Przykład (podstrona conversations.pl.mdx):**
```
Panel wprowadzania wiadomości znajduje się w dolnej części ekranu i zawiera trzy kluczowe elementy: [...]
```
Lub alternatywnie z pogrubionym lead-em:
```
**[Tytuł ekranu]** umożliwia [co robi]. [Drugie zdanie z kluczowym kontekstem].
```

Podstrona **nie** zawiera sekcji „Strony w tej sekcji" — ta sekcja istnieje wyłącznie w index.mdx.

---

### Linki między sekcjami

Linki do innych sekcji platformy (np. z Alertów do Repozytorium) umieszczamy tylko gdy:
1. Link jest wymieniony w istniejącej treści pliku, lub
2. Istnieje naturalne przejście opisane w tekście (np. „Wybranie karty otwiera widok szczegółowy…").

Jeśli nie jesteś pewien czy link docelowy jest zaimplementowany w aplikacji — **nie dodawaj go**. Wątpliwe linki oznacz placeholderem:
```
{/* TODO: brak kontekstu — sprawdzić czy link /pl/... jest zaimplementowany */}
```

---

## 12. Limity długości pliku

### Wartości graniczne

| Typ pliku | Limit linii treści (bez frontmatter) |
|---|---|
| `index.pl.mdx` (Typ A — Cockpit) | ≤ 80 linii |
| `index.pl.mdx` (Typ B — przegląd modułu) | ≤ 60 linii |
| Podstrona `*.pl.mdx` | ≤ 100 linii |

### Jak postąpić gdy plik jest za długi

Agent **nie tworzy nowych podstron** jako sposobu na skrócenie pliku — to decyzja architektoniczna należąca do właściciela projektu.

Zamiast tego stosuje kolejno:

1. **Zamień akapity opisowe na listy punktowane** — każde zdanie wyliczające cechy, opcje lub zachowania jest lepsze jako punktor niż jako zdanie w środku akapitu.
2. **Usuń zdania powtarzające kontekst** — jeśli coś zostało powiedziane w sekcji wyżej, nie trzeba tego powtarzać w kolejnej sekcji.
3. **Skróć opisy elementów UI do jednozdaniowych definicji** — opis przycisku to jedno zdanie; jeśli wymaga więcej, rozważ czy nie jest to materiał na osobną sekcję `###`.
4. **Połącz bardzo krótkie sekcje H2** — dwie sekcje mające po 2–3 zdania, jeśli są tematycznie pokrewne, mogą być jedną sekcją z podsekcjami H3.

Jeśli po zastosowaniu wszystkich powyższych plik nadal przekracza limit, agent oznacza to w raporcie:
```
> Plik [nazwa] nadal przekracza limit po optymalizacji. Może wymagać podziału na podstrony — decyzja po stronie właściciela projektu.
```

---

## 13. Korekta istniejącego słownictwa i jakość polszczyzny

### Korekta słownictwa — zawsze, automatycznie

Gdy agent edytuje plik i napotka słowo niezgodne ze słownikiem (Sekcja 2), **poprawia je niezależnie od zakresu głównego zadania**. Nie jest to opcjonalne.

Najczęstsze przypadki do korekty:

| Błędna forma w pliku | Poprawna forma |
|---|---|
| „baner" | „banner" |
| „kliknij" / „wybierz" | „wybrać" / „wybranie" |
| „użytkownik może" / „Możesz" | „można" / „wykonuje się" |
| „system" (bez konkretyzacji) | „platforma" / „Persate" / nazwa modułu |
| „interfejs użytkownika" | nazwa konkretnego widoku |
| „funkcjonalność" | „funkcja" |
| „w chwili obecnej" | „aktualnie" / „teraz" |
| „przeprowadzić X" | zweryfikuj → „zweryfikować", skonfiguruj → „skonfigurować" |

### Zasady naturalnej polszczyzny

Dokumentacja musi brzmieć jak napisana przez człowieka po polsku — nie jak tłumaczenie z angielskiego.

**Długość zdań:**
- Zdanie maksymalnie 2 wiersze w edytorze.
- Jeśli zdanie zawiera więcej niż 2 przecinki — rozważ podział lub listę.

**Rzeczowniki vs. czasowniki:**
- Unikamy nominalizacji (rzeczowników odczasownikowych) — zamiast nich używamy czasowników.
- ❌ „Przeprowadzenie weryfikacji danych jest możliwe…"
- ✅ „Można zweryfikować dane…" / „Dane weryfikuje się…"

**Kalek z angielskiego — czego unikać:**
| ❌ Kalka | ✅ Po polsku |
|---|---|
| „bazując na" | „na podstawie" |
| „w oparciu o" | „na podstawie" |
| „mieć sens" | „być zasadne" / „być sensowne" |
| „być dostępnym dla użytkownika" | „być dostępne" / „możesz z niego skorzystać" |
| „to jest miejsce gdzie" | „tu" / „w tym miejscu" |
| „w celu wykonania" | „aby wykonać" |

**Różnorodność otwarcia zdań:**
- Unikamy zdań zaczynających się od tego samego słowa trzy razy z rzędu.
- W szczególności unikamy ciągu zdań „Możesz… Możesz… Możesz…" — przeplatamy formą bezosobową lub zdaniem z podmiotem (np. „Platforma umożliwia…", „Po wybraniu…").

**Spójność formy adresatywnej w obrębie akapitu:**
- W jednym akapicie lub liście trzymamy się **jednej formy**. Nie mieszamy bezpośredniego zwrotu „Ty" z formą bezosobową ani stroną bierną.
- ❌ „Konfiguracja wymaga podania hasła. Następnie wybierz przycisk **Zapisz**, po czym aplikacja zostanie uruchomiona."
- ✅ „Podaj hasło, wybierz **Zapisz** — aplikacja uruchomi się automatycznie."
- Jeśli akapit zaczyna się od formy bezosobowej (np. „Pole tekstowe filtruje…"), nie przeskakuj w środku do „Możesz tu wpisać…".

---

## 14. Wersje angielskie — poza zakresem

Każdy plik `.pl.mdx` ma parę `.mdx` w języku angielskim. Edycja i synchronizacja wersji angielskiej jest **poza zakresem zadań** opisanych w tym przewodniku.

Agent edytuje wyłącznie pliki `*.pl.mdx`. Nie sprawdza, nie porównuje i nie modyfikuje plików `.mdx` (angielskich), nawet jeśli zauważy niezgodności między wersjami.

---

## 15. Checklist dla agenta przed zapisaniem pliku

- [ ] Frontmatter zawiera `title` i `description`.
- [ ] Plik jest Typu A lub B — otwarcie zgodne z wzorcem z Sekcji 11.
- [ ] Opis sekcji wyjaśnia czym jest widok i jak do niego wejść (tylko index i Typ A).
- [ ] Elementy UI są pogrubione (`**Nazwa**`).
- [ ] Komunikaty z UI są kursywą lub inline code.
- [ ] Każdy plik opisujący widok ma sekcję `## Stany pustego widoku i błędu`.
- [ ] Index.mdx kończy się sekcją `## Strony w tej sekcji` z linkami (tylko Typ B).
- [ ] Plik mieści się w limicie linii (Sekcja 12) lub zawiera raport o przekroczeniu.
- [ ] Nie ma zdań pasywnych bez podmiotu.
- [ ] Nie ma ogólnikowych słów (kliknij, funkcjonalność, system) — Sekcja 13.
- [ ] Słownik terminów (Sekcja 2) jest przestrzegany; napotkane błędy w pliku zostały poprawione.
- [ ] Brak kalek z angielskiego i nominalizacji — Sekcja 13.
- [ ] Linki wewnętrzne prowadzą do `/pl/...`; niepewne linki oznaczone placeholderem.
- [ ] Każde zdanie opiera się na pewnym fakcie z istniejącego pliku — brak domysłów.
- [ ] Brakujące informacje są oznaczone placeholderem `{/* TODO: brak kontekstu — ... */}` i zaraportowane.

