# Risk Monitor v1.2.0 — iPhone dashboard

Mobiele PWA, gehost via GitHub Pages. Openbare RSS-headlines worden automatisch opgehaald door GitHub Actions. App start zonder login en ververst bij het openen.

## Installatie/upgrade
Zie `START_HIER_GITHUB.md`.

## Structuur
- `index.html` — mobiele applicatie, tabs, nieuws, regio's, historiek, instellingen.
- `sw.js` — offline/cachebeheer en upgrades.
- `manifest.webmanifest` + `icons/` — iPhone beginscherm/PWA.
- `.github/workflows/update-news.yml` — automatische controles op `Europe/Brussels`.
- `scripts/update-feed.mjs` — RSS-ophaalprogramma en regelgebaseerde nieuwsscreening.

## Data
- De app leest `data/auto-news.json` uit de bestaande repository. Dit bestand wordt automatisch door GitHub Actions bijgewerkt.
- **Niet overschrijven tijdens upgrade.** Het bestand is bewust weggelaten uit deze ZIP.
- Voorlopig uitsluitend veilige, publieke RSS-gegevens. Elke nieuwskaart bevat de bronlink.
- Gebruikersinvoer blijft lokaal in de browser; zij wordt niet naar GitHub gestuurd.

## Scope
Automatische nieuwssignalen inclusief mogelijke Belgische impact, eerste risicoscreening, Trump apart, onderdrempel-items en historiek. Dit is geen AI-factcheck en vervangt geen officiële veiligheidswaarschuwingen of de bestaande ChatGPT-monitoring.
