# Festival Dokola 2026 — web

Kontext pro Claude Code. Přečti si to před prací na projektu.

## Co to je

Statický web festivalu **Festival Dokola 2026** — dvoudenní festival cirkulární ekonomiky.
- **Termín:** 10.–11. září 2026
- **Místo:** Kampus Hybernská, Praha
- **Pořadatel:** INCIEN (Institut Cirkulární Ekonomiky), letos slaví 11 let
- **Kontakt:** Karolína Kočendová, karolina.kocendova@incien.org, 725 600 876

Festival je jediný svého druhu v ČR. Cílem je dostat cirkulární ekonomiku „z laboratoří a zasedaček mezi lidi" — k rodinám, školám, firmám i novinářům. Klíčová myšlenka celého webu: cirkularita bývá vnímaná jako vědecké/technicistní téma, které se běžného člověka netýká — a festival dokazuje opak.

## Technický stack

**Čistě statický web. Žádný build, žádné závislosti, žádný framework.**
- Ruční HTML + jeden sdílený CSS soubor
- Fonty z Google Fonts (Bricolage Grotesque = display, Instrument Sans = body)
- Trochu vanilla JS inline v každé stránce (mobilní menu + reveal-on-scroll přes IntersectionObserver)
- Nasazuje se nahráním souborů do kořene webhostingu. `index.html` = úvodní stránka.

**Neměň to na framework (React, Vite, apod.), pokud o to výslovně nepožádám.** Cílem je, aby to šlo nahrát na jakýkoliv obyčejný hosting bez build kroku.

## Aktuální stav repozitáře (2026-08-01)

Repo je propojené s GitHubem: https://github.com/karolinakocendova/dokola-web (branch `main`).

- V kořeni projektu **aktuálně chybí `index.html`/`style.css`** — byly to soubory z prvního commitu (`d227479`, jednoduchá testovací hero stránka s nadpisem „Toto je stránka Dokola"), ale v pracovním adresáři byly smazané (git ukazuje `deleted:`, nezacommitované). V historii gitu jsou pořád dostupné přes `git checkout d227479 -- index.html style.css`, kdyby bylo potřeba se k nim vrátit.
- Reálný obsah festivalového webu leží zatím ve složce **`Podklady pro web/`** a čeká na sloučení do kořene:
  - `CLAUDE.md`, `README.md` — původní dokumentace k webu (skoro identická s tímhle souborem)
  - `index-web-dokola.html` (18 KB) — **skutečná hlavní stránka** (one-pager), odpovídá cílovému `index.html`
  - `pro-vystavovatele.html`, `pro-skoly.html`, `pro-partnery.html` — podstránky
  - `shared.css` (18 KB) — veškerý styl
  - Uvnitř jsou i dvě „nepravé" kopie (`index.html` 444 B a `style.css` 530 B) — to jsou duplikáty té staré testovací hero stránky, ne součást festivalového webu.
- Grafické podklady jsou ve složce **`Vizuál/`**: hotové logo (`Dokola - Logo (final).png`, i transparentní a variace verze), sada ikon (`Dokola - Ikony.png`) a pár screenshotů pro referenci. **Logo už tedy existuje** — placeholder v navigaci (`<a class="brand">Dokola</a>`) lze nahradit obrázkem z této složky.
- Finální cílová struktura v kořeni repozitáře by měla být:
  ```
  dokola-web/
  ├── CLAUDE.md
  ├── README.md
  ├── index.html          (= dnešní index-web-dokola.html)
  ├── pro-vystavovatele.html
  ├── pro-skoly.html
  ├── pro-partnery.html
  └── shared.css
  ```
  Přesun/sloučení souborů z `Podklady pro web/` do kořene ještě neproběhl — čeká se na výslovné potvrzení od uživatelky.

## Struktura souborů (cílový stav)

- `index.html` — hlavní stránka, one-pager pro návštěvníky. Sekce: hero → proč (mýtus vs. realita) → co se bude dít → program → speakeři → vstupenky → zapojení (pro koho) → partneři → organizátoři → místo + kontakt → footer
- `pro-vystavovatele.html` — podstránka pro firmy s cirkulárním řešením (výstava, příspěvek 1 000 Kč)
- `pro-skoly.html` — podstránka pro školy (4 způsoby zapojení, program pro třídy)
- `pro-partnery.html` — podstránka pro partnery (4 úrovně: Fandím vám / Chci být součástí / Mám co říct / Mám jiný nápad)
- `shared.css` — VŠECHEN styl je tady. Sdílí ho všechny 4 stránky. Barvy jsou v `:root` nahoře.
- `README.md` — návod na nasazení a doplnění obsahu (pro člověka)

## Design systém

Barvy (v `shared.css` → `:root`):
- `--cream: #F4F1E8` — pozadí
- `--cream-deep: #ECE6D6` — sekundární pozadí
- `--teal: #1B8A7E` / `--teal-deep: #12655C` — hlavní akcentní (týrkysová)
- `--orange: #F26B4D` / `--orange-soft: #F8A48C` — sekundární akcent
- `--ink: #16241F` — text a tmavé sekce

Vizuální styl navazuje na tištěné onepagery festivalu (týrkysová/oranžová/krémová, kruhové motivy). Signature prvek = rotující kruhový text kolem data v heru (odkaz na název „Dokola" = dokola/kruh).

**Pozor na CSS:** styl používá jednu sdílenou tabulku pro 4 stránky. Když upravuješ, dávej pozor na specificitu selektorů (třídy `.section` vs. elementové selektory se můžou přebíjet, hlavně u padding/margin mezi sekcemi). Podstránkové styly jsou v `shared.css` v sekci `/* ===== SUBPAGE STYLES ===== */`.

## Registrace / vstupenky — jak to funguje

Vše půjde přes **GoOut** (jedna platforma pro všechno). Tři kategorie aktivit:
1. **Workshopy** — placené, omezená kapacita → lístek na GoOut
2. **Přednášky, talkshow, komentované prohlídky** — zdarma, ale s rezervací místa (kvůli přehledu o kapacitě + větší docházce)
3. **Swap, otevřená dílna, výstava** — volně přístupné, bez registrace

Na webu jsou zatím tlačítka **„Připravujeme"**, protože GoOut ještě není spuštěn. Až bude, nahradí se odkazem.

## Co je potřeba doplnit (placeholdery)

1. **Logo** — v navigaci je textové „Dokola" s kroužkem (`<a class="brand">`). **Hotové logo už existuje** ve `Vizuál/Dokola - Logo (final).png` (a transparentní verze) — stačí nahradit.
2. **GoOut odkazy** — hledej texty „Připravujeme vstupenky", „Odkaz na GoOut připravujeme", „Přihláška připravujeme". Nahradit reálnými odkazy + třídou `btn-primary`.
3. **Speakeři** — v `index.html` sekce speakeři má 4 karty s `?` v `.spk .ph`. Doplnit foto + jméno + roli.
4. **Partneři** — sekce partneři má boxy „Logo partnera" (`.logo-ph`). Nahradit `<img>` s logy.
5. **Časy v programu** — v programu jsou pomlčky `—` v `<span class="t tbd">`. Nahradit reálnými časy (a odstranit třídu `tbd`).

## Tón obsahu

Česky, tykání kolektivní („ozvěte se nám"), energické a konkrétní, ne korporátní. Onepagery mají „švih" — krátké, úderné věty. Drž ten styl. Cirkularita = praktická a kreativní, ne akademická.

## Čemu se vyhnout

- Nepřidávej build systém ani framework bez vyžádání.
- Neslibuj v obsahu věci, které nejsou potvrzené (konkrétní jména speakerů, konkrétní partnery) — dokud je nedodám.
- Nezaváděj externí JS knihovny, pokud to není nutné.
- Neměň barvy ani fonty bez domluvy — navazují na tištěný vizuál festivalu.
- Nepřesouvej/neslučuj soubory z `Podklady pro web/` do kořene bez výslovného pokynu — probíhá to postupně a vědomě.
