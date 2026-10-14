# Installatie Risk Monitor v2.3.0 — op bestaande GitHub Pages

1. Open `Risk_Monitor_v2.3.0_HTML_Installer.html` in Firefox op je Windows-pc.
2. Klik **Maak en download ZIP-pakket** en pak het lokaal gemaakte ZIP-bestand uit.
3. Open de **bestaande** repository `Ohkwahe/geopolitieke-risk-monitor`, branch `main`.
4. Open **Code → Add file → Upload files** en upload de *inhoud* van het pakket. Controleer of `.github/workflows/update-news.yml` werkelijk mee vervangen is. Dit verborgen pad raakt bij uploads soms overgeslagen.
5. Controleer specifiek de nieuwste `index.html`, `sw.js`, `scripts/update-feed.mjs`, `scripts/translate-feed.py`, `scripts/validate-feed.mjs` en `tests/test_change_tracking.mjs`.
6. Kies **Commit changes** op `main`. Laat `data/auto-news.json` ongemoeid: dit live bestand zit niet in het pakket.
7. Ga naar **Actions → Risk Monitor - nieuws ophalen en publiceren → Run workflow → main**. De run moet groen worden.
8. In **Code → data → auto-news.json** verschijnen na afloop `schemaVersion: 2.3.0`, `previousControlAt` en activiteitslabels in de berichten.
9. Open je gepubliceerde website in Safari, herlaad en controleer het versienummer v2.3.0. Sluit daarna de beginscherm-app op de iPhone volledig en open ze opnieuw.

## Controle op iPhone

- In Nieuws verschijnt na minstens twee controles `Laatste controle: ... nieuw · ... bijgewerkt`.
- Tik **Toon wijzigingen** en opnieuw **Toon alle nieuws**.
- Controleer `Nieuw sinds controle`, `Bericht bijgewerkt` of `Nieuwe bronvermelding` waar van toepassing.
- Tik **▶ Luister naar koppen**; de iPhone zou de bovenste nieuwsitems uit de gekozen rubriek moeten uitspreken. Tik **■ Stop voorlezen** om te stoppen.
- Controleer `Belangrijk`, `Trump – VS`, `Onder drempel`, taalkeuze, periode, zoekfunctie, favorieten en Historiek.
- Bij een melding zonder wijzigingen mogen er geen nieuwe labels verschijnen. De huidige nieuwsfeed blijft gewoon beschikbaar.

## Bij fouten

- Rood kruis: open de betreffende GitHub Actions-stap voor de foutmelding.
- Oud scherm op iPhone: herlaad eerst de GitHub Pages-site in Safari, daarna de PWA volledig sluiten en heropenen; wis geen lokale opslag.
- Geen geluid: controleer stiltemodus/volume, Safari-weergave en of het toestel een passende stem beschikbaar heeft. Spraak vereist een expliciete tik en browserondersteuning.

**Status:** v2.3.0 is pas GO na de controles op jouw iPhone.
