# Update Risk Monitor v1.6.0
1. Open HTML-installer in Firefox en maak het ZIP-bestand.
2. Pak het ZIP uit. Upload **inhoud** naar bestaande GitHub-repository op branch `main`; bestanden overschrijven.
3. Controleer de verborgen `.github/workflows/update-news.yml` en mappen `scripts` en `tests`.
4. Upload het levende bestand `data/auto-news.json` **niet** uit eigen back-ups en verwijder het niet. Het upgradepakket bevat het niet.
5. Start eenmalig `Actions → Risk Monitor - nieuws ophalen en publiceren → Run workflow`.
6. Na geslaagde workflow Safari-website vernieuwen; sluit en heropen beginschermapp. Controleer `v1.6.0`.
7. Test Historiek → trendgrafiek, Instellingen → signaaldrempel en de drie nieuwstabbladen.

Let op: geen pushmelding vanuit de PWA. De bestaande ChatGPT-taak met 08:00/18:00 is onafhankelijk.
