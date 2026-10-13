# Risk Monitor – changelog

## v1.1.0 — 2026-10-13
- **NEW:** automatische RSS-feed (GitHub Actions, tweemaal per dag, `Europe/Brussels`, circa 08:10/18:10).
- **NEW:** bronstatus, tijdstip laatste run, verouderingswaarschuwing, handmatige refreshknop in de mobiele app.
- **NEW:** afzonderlijke RSS-signalen zonder risicoscore; bronlink opent oorspronkelijk artikel.
- **NEW:** server-side historiek in `data/auto-news.json` (maximaal 30 dagen/250 signalen), behoud van bestaande persoonlijke lokale data.
- **CHANGE:** tab 'Beheer' heet 'Instellingen'; handmatige import blijft als optionele functie bestaan.
- **CHANGE:** Service Worker gebruikt network-first voor de app-shell en nieuws-JSON om verouderde caches te voorkomen.
- **NOTICE:** geen synchronisatie van ChatGPT-geplande taken, en geen automatische inhoudelijke verificatie van nieuws; ChatGPT-meldingen blijven onafhankelijk.
- **TESTS:** Node-syntaxchecks, XML-mockfeed collectietest, duplicate-check; volledige externe feeds/GitHub Pages kunnen pas op de gekoppelde GitHub-repository getest worden.

## v1.0.0 — 2026-10-12
- Eerste mobiele PWA-release: kaarten, scores, regio's, tijdlijn, Trump en onderdrempel-items, JSON-import/export, lokale opslag.
