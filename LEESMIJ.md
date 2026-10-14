# Risk Monitor v3.0.2 — Workflow Hotfix

Dit pakket corrigeert uitsluitend de mislukte GitHub Actions-stap *Basistests vertaalmodule* uit v3.0.1.

**Oorzaak:** de browser-spraaktest vereist Playwright, maar de unittest-stap installeert die dependency niet. Vertaaltests zijn onafhankelijk van de browsertest.

**Oplossing:** selecteer uitsluitend `test_translate.py`; browsertest alleen bij expliciete uitvoering.

- Geen API-sleutels, betalende diensten of aanvullende afhankelijkheden nodig.
- Data-archief `data/auto-news.json` niet in het pakket.
- `START_HIER_GITHUB.md` bevat de snelle en volledige installatieroute.
