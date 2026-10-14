# Risk Monitor v3.0.0 — upgrade in GitHub

1. Open de HTML-installer in Firefox op Windows en klik op **Maak en download ZIP-pakket**.
2. Pak de lokaal gemaakte ZIP uit.
3. Open je bestaande repository `Ohkwahe/geopolitieke-risk-monitor` in GitHub, branch **main**. Maak geen nieuwe repository.
4. Kies **Code → Add file → Upload files**. Upload de *inhoud* van het pakket (niet de buitenste map). Controleer dat `index.html`, `sw.js`, `.github/workflows/update-news.yml`, `scripts/*`, `tests/*` en `manifest.webmanifest` vervangen worden.
5. Omdat GitHub verborgen mappen soms moeilijk uploadt: open daarna `Code → .github → workflows → update-news.yml`. Controleer expliciet of de nieuwe stappen `Maak automatische ochtend- of avondbriefing`, `Optionele AI-duiding` en `Optionele iPhone-signalen via ntfy` zichtbaar zijn. Indien niet: gebruik in GitHub het potloodje om het bestand te vervangen door de versie uit het pakket.
6. Klik **Commit changes** op `main`.
7. Open **Actions → Risk Monitor - nieuws ophalen en publiceren → Run workflow → main**. Controleer een groene uitvoering. Je hoeft AI- of ntfy-secrets niet in te stellen voor de standaardwerking.
8. Open via Safari de GitHub Pages-site, ververs en controleer `v3.0.0`. Sluit de oude iPhone-PWA volledig af en open opnieuw. *Verwijder de app niet*: lokale favorieten/instellingen blijven dan behouden.
9. Controleer de briefing, de 3 tabbladen, vertaling en 'Toon origineel', de tijdsfilter, de kaart-dossiers, voorlezen en de historiek.

**Bij problemen**: bewaar v2.4.0 als terugvalversie, noteer de laatste GitHub Actions-stap die mislukt, en wijzig nog geen API- of betaalinstellingen.

**Nieuwsdata**: het pakket bevat bewust geen live bestand `data/auto-news.json`. GitHub Actions beheert dat zelf. De workflow zal pas de eerste briefing toevoegen bij een succesvolle nieuwe run.
