# Testresultaten v2.2.0

- Node.js `node --check`: **geslaagd** (collector en UI JavaScript).
- Collector: 2 opvolgende runs zonder duplicaten, gewijzigde RSS-inhoud gedetecteerd: **geslaagd**.
- Nieuwe Intelligence-regressietest (vijf feeds, bronlabels, dossiers, Trump en idempotentie): **geslaagd**.
- Python-vertaalmodule: **5 tests geslaagd** (met gesimuleerde vertaalengine, niet de echte Argos-download).
- Headless Chromium-test op **320, 375, 390 en 430 px**: **geslaagd** (geen horizontale overloop; tabbladen, zoekfunctie, bewaren, opgeslagen status, dossiernavigatie en instellingen).
- Browsercontrole gebruikte **synthetische lokale testdata**, geen nieuwsaanspraken over actuele conflicten.
- GitHub Actions-run met echte RSS-feeds en Argos: **nog uit te voeren**.
- iOS Safari en beginscherm-PWA: **nog door gebruiker te bevestigen**.
