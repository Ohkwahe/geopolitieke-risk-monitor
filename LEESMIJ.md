# Geopolitieke Risk Monitor v1.3.0 – Nederlandse vertaling

Mobiele webapp voor een bestaande publieke GitHub Pages-repository. Met deze iteratie worden Engelse RSS-nieuwskoppen en korte samenvattingen vertaald naar het Nederlands via **Argos Translate** binnen GitHub Actions. Geen DeepL of API-sleutels nodig.

## Inhoud

- `index.html`, `sw.js`, `manifest.webmanifest`, `icons/`: iPhone-webapp.
- `.github/workflows/update-news.yml`: geplande RSS-collector, Python-vertaler, publicatie.
- `scripts/update-feed.mjs`: nieuwsselectie + ongewijzigde regelgebaseerde scoring op oorspronkelijke teksten.
- `scripts/translate-feed.py`: vertaal alleen items zonder actuele NL-cache (maximaal 70 per run).
- `requirements-translate.txt`: vastgelegde Argos-versie.
- `tests/test_translate.py`: unittests met nagebootste vertaalengine.
- `tests/browser_smoke.py`, `tests/fixture-feed.json`: visuele testfixture (niet automatisch uitgevoerd op GitHub).
- `START_HIER_GITHUB.md`: nauwkeurige updatestappen.
- `RELEASE_NOTES.md`: changelog.

## Belangrijke waarschuwingen

* **NIET** het bestaande `data/auto-news.json` overschrijven of verwijderen. Deze ZIP bevat dat live bestand bewust niet.
* De vertaler wordt op GitHub uitgevoerd, niet op de iPhone. De Nederlandse gegevens worden openbaar via GitHub Pages; ze zijn afgeleid van openbare RSS-berichten.
* Een slechte vertaling mag nooit tot een andere dreigingsscore leiden; classificatie gebeurt vóór vertaling op de Engelse bron.
* Vertalingen worden volgens een exacte bronhash hergebruikt. Als de oorspronkelijke tekst verandert, wordt opnieuw vertaald.
* Als installatie/download van Argos mislukt, blijft de originele tekst leesbaar en verschijnt de status in Instellingen. De workflow kan dan toch slagen omdat nieuws altijd beschikbaar moet blijven.
* v1.2.0 is GO; deze release is voorlopig een te toetsen kandidaat.

## Teststatus

Lokale Python-tests met een vervangende vertaalengine en geautomatiseerde mobiele Chromium-tests geslaagd. De echte Argos-download + modelinstallatie moet nog op jouw GitHub Actions-run bevestigd worden (in deze offline bouwwerkruimte niet beschikbaar).
