# Risk Monitor v2.2.0 installeren via GitHub

1. Open de **HTML-installer** op je Windows-computer in Firefox.
2. Klik **Maak en download ZIP-pakket**. Pak het ZIP-bestand uit.
3. Open je **bestaande** GitHub-repository `geopolitieke-risk-monitor`, branch `main` (niet opnieuw aanmaken).
4. Ga naar **Code → Add file → Upload files** en upload de *inhoud* van de uitgepakte map. Zorg dat ook de verborgen map `.github/workflows` mee gaat.
5. Controleer of `index.html`, `sw.js`, `scripts/update-feed.mjs`, `tests/test_intelligence.mjs` en `.github/workflows/update-news.yml` in de juiste mappen staan.
6. Kies **Commit changes** op `main`.
7. Ga naar **Actions → Risk Monitor - nieuws ophalen en publiceren → Run workflow → main** en controleer of de run groen wordt. De stappen kunnen langer duren door Argos.
8. Open de GitHub Pages-URL in Safari, vernieuw de pagina en controleer versie **v2.2.0**. Sluit daarna de beginscherm-app volledig en open opnieuw.

## Snelle iPhone-test

- Zoek op een woord uit een nieuwsbericht; wis de zoekopdracht.
- Bewaar een artikel en zet **Bewaard** aan. Sluit en heropen de app; het artikel moet bewaard blijven.
- Markeer een artikel als gelezen; test **Ongelezen**.
- Test **BE/EU-context** (dit betekent niet dat impact is bevestigd).
- Ga naar **Historiek → Ontwikkelingen per dossier**, tik op een dossier en controleer bronnen.
- Test dat taalkeuze, tijdsfilter, Trump en Onder drempel nog werken.
- Controleer dat nieuwe artikelen een type bronmelding tonen; oude berichten krijgen dat label na een succesvolle v2.2.0-feedrun.

## Let op

`data/auto-news.json` zit **niet** in het pakket. Je bestaande live-data blijft behouden. De app laat oude lokale voorkeuren ongemoeid.

Bij problemen: `Actions → laatste run → mislukte stap` of controleer dat de verborgen `.github`-map werkelijk is bijgewerkt. Laat v2.1.0 als terugvalversie beschikbaar.
