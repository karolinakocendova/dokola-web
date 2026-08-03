# Festival Dokola 2026 — web

Jednoduchý statický web. Žádná databáze, žádný build — stačí nahrát soubory na hosting k tvojí doméně.

## Soubory
- `index.html` — hlavní stránka (one-pager pro návštěvníky)
- `pro-vystavovatele.html` — podstránka pro firmy s cirkulárním řešením
- `pro-skoly.html` — podstránka pro školy
- `pro-partnery.html` — podstránka pro partnery
- `shared.css` — společný styl (sdílí všechny stránky)

## Jak nasadit
Nahraj všech 5 souborů do kořene webhostingu (přes FTP, nebo nahrát ve správci hostingu). `index.html` se otevře automaticky jako úvodní stránka. Žádné další kroky.

## Co doplnit, až budeš mít info

**Logo Dokola**
Teď je v navigaci textové „Dokola" s kroužkem. Až budeš mít logo:
- najdi `<a href="index.html" class="brand">` a nahraď text za `<img src="logo.png" alt="Festival Dokola">`

**GoOut — vstupenky a rezervace**
Na webu jsou tlačítka „Připravujeme". Až spustíš GoOut:
- v `index.html` najdi `Odkaz na GoOut připravujeme` a `Připravujeme vstupenky`
- na podstránkách najdi `Přihláška připravujeme`
- nahraď je odkazem, např.: `<a href="https://goout.net/..." class="btn btn-primary">Koupit vstupenky</a>`

**Speakeři**
V `index.html` sekce „Speakeři a hosté" má 4 placeholder karty se `?`. Pro každého:
- nahraď `?` za `<img src="foto.jpg" alt="Jméno">`
- vyplň jméno a roli

**Partneři**
Sekce „Partneři festivalu" má placeholder boxy „Logo partnera". Nahraď za `<img src="logo-partnera.png" alt="...">`.

**Časy v programu**
V programu jsou pomlčky `—` místo časů. Až budeš mít harmonogram, nahraď `<span class="t tbd">—</span>` za např. `<span class="t">10:00</span>`.

## Barvy (kdyby ses chtěla hrabat)
Všechny v `shared.css` nahoře v `:root` — týrkysová, oranžová, krémová, tmavá. Změna na jednom místě se promítne všude.
