# Testresultaten Risk Monitor v1.2.0

Uitgevoerd op 13 oktober 2026 in testomgeving met uitsluitend fictieve RSS-testkoppen.

- JavaScript in `index.html`: syntactisch gevalideerd (Node.js 22).
- `scripts/update-feed.mjs`: syntactisch gevalideerd; verwerkt mock RSS van 5 bronnen.
- RSS met HTML, Markdown en entities: omgezet naar leesbare platte tekst.
- Herhaalde feedrun zonder nieuwe artikels: 0 nieuwe; historiek +1; bestaand nieuws blijft behouden.
- Chromium Playwright iPhone/small-mobile simulatie: breedtes 320, 375, 390 en 430 px; daarnaast 768 px.
- **Geen horizontaal scrollen**, geen JavaScript-paginafouten.
- 3 tabbladen tonen automatische RSS-items volgens de gekozen categorie, ook Trump-items onder drempel.
- Uitklapbare details, bronlinks, historiek en regiofilters getest.
- Upgrade gebruikt bestaande `geopolitieke_monitor_v1_data` lokale opslag; DEMO-invoer wordt verborgen.

Niet getest: daadwerkelijke GitHub Pages-publicatie in het account van de gebruiker, de echte GitHub Actions-run, Safari op een fysiek iPhone-toestel, en de bereikbaarheid van publieke RSS-bronnen vanuit GitHub Actions. De bestaande v1.1.0 GitHub-workflow was door de gebruiker als groen bevestigd.
