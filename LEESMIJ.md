# Risk Monitor v2.4.0 — Broncontrole & Kort Overzicht

Mobiele GitHub Pages/PWA voor het lezen van actuele geopolitieke headlines.

## Installeren

Gebruik de **HTML-installer**, lokaal openen in Firefox, ZIP laten maken, uitpakken en de inhoud uploaden naar je **bestaande** GitHub-repository op branch `main`. Controleer specifiek `.github/workflows/update-news.yml` en de bestanden in `scripts/`. Vervang de eerder gemaakte workflow niet door een andere planning.

**Bewaar je nieuwsdata:** `data/auto-news.json` zit niet in dit pakket; de GitHub Actions-run werkt dit bestand na het uploaden bij. Verwijder je PWA niet van je iPhone: voorkeuren en lokale lijstjes staan in de browseropslag.

## Gebruiken op iPhone

- **Nieuws → Kort overzicht van deze rubriek:** open/sluit een lijstje van maximaal vijf bestaande artikelen. Tik op een kop om naar de uitgebreide nieuwskaart te springen.
- **Nieuws → Filter op type bron:** uitklapbaar; Alle bronnen / Officiële publicatie / Vergelijkbare mediaberichten / Eén bronartikel. De selectie wordt lokaal onthouden.
- **Nieuwskaart → Toon details en bronnen → Controleer het bronspoor:** wat er daadwerkelijk geobserveerd is, bronlinks en eerste waarneming.
- Andere filters en voorleesknoppen blijven werken.

## Wat de app wel/niet doet

De app verwerkt openbare RSS-headlines en voegt regelgebaseerde metadata toe. Een officiële publicatie is niet gelijk aan onafhankelijk geverifieerde feiten; gelijkaardige nieuwskoppen kunnen een gemeenschappelijke bron volgen. Iedere automatisch aangemaakte beoordeling blijft **niet onafhankelijk geverifieerd**. Risicoscores zijn selectiehulpmiddelen en geen oorlogskansen. Geen betaalde AI-dienst of nieuwe accounts nodig.

## Technisch

`index.html` = mobiele UI; `scripts/update-feed.mjs` = nieuwscollector; `scripts/translate-feed.py` = Argos; `scripts/validate-feed.mjs` = contractcontrole; `.github/workflows/update-news.yml` = geplande uitvoering; `sw.js` = PWA cache. Testen met `node tests/test_intelligence.mjs`, `node tests/test_change_tracking.mjs`, `node tests/test_collector.mjs`, `python -m unittest discover -s tests -p 'test_*.py'` en optioneel `python tests/browser_check_v240.py` met Playwright/Chromium.
