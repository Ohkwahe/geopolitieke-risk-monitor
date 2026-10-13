# Risk Monitor v1.2.0 op bestaande GitHub Pages publiceren

**Geen nieuwe repository aanmaken. De bestaande iPhone-app mag blijven staan.**

1. Open GitHub op de Windows-pc, repository `geopolitieke-risk-monitor`.
2. Download en pak `Risk_Monitor_PWA_v1.2.0_Mobile_Fix.zip` uit.
3. Ga naar Code → Add file → Upload files en upload **de inhoud** van de uitgepakte map (inclusief `index.html`, `sw.js`, `scripts/update-feed.mjs` en het workflowbestand onder `.github/workflows/`).
4. Bestanden met dezelfde naam mogen worden vervangen. Commit op branch `main` met bericht `release: Risk Monitor v1.2.0`.
5. **Belangrijk:** laat het bestaande bestand `data/auto-news.json` ongemoeid. Dat bestand staat bewust niet in de upgrade-ZIP en bevat je live historiek.
6. Ga naar Actions → `Risk Monitor - nieuws ophalen en publiceren` → `Run workflow` → kies `main` → Run workflow.
7. Controleer groen vinkje en open onder Code → data → `auto-news.json`: `schemaVersion: "1.2.0"` en `generatedAt` ingevuld.
8. Open op de iPhone eerst de GitHub Pages-website in Safari, ververs de pagina, controleer onderaan/bovenaan v1.2.0. Sluit daarna de bestaande Risk Monitor op beginscherm volledig af en start hem opnieuw. In het uiterste geval Safari-websitegegevens vernieuwen, maar **verwijder niet meteen de PWA** als je lokale imports wil behouden.
9. Test `Belangrijk`, `Trump – VS`, `Onder drempel`, `Regio's` en `Historiek`.

**Als uploaden van `.github` niet lukt:** Ga op GitHub naar `.github/workflows/update-news.yml` en controleer of die nog aanwezig is. Het bestaande v1.1.0-workflowbestand werkt ook met de nieuwe scriptversie (zelfde uitvoerlocatie).

**Automatisch:** Nieuws wordt rond 08:10 en 18:10 Belgische tijd opgehaald. GitHub kan vertragen. ChatGPT-controles blijven rond 08:00 en 18:00 apart actief.

**Beperkingen:** Nieuwe risicoscores zijn een automatische vuistregel, geen AI-factcheck; nieuwsaanvoer is geen bevestigd veiligheidsalarm. De ChatGPT-beoordelingen kunnen voorlopig niet rechtstreeks door de geplande ChatGPT-taak in dit GitHub-repository worden geschreven.
