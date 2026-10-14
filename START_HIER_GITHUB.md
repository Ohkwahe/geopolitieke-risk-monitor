# Risk Monitor v1.4.0 installeren op jouw bestaande GitHub

**Geen nieuwe repository of nieuwe app op de iPhone aanmaken.** Hou v1.3.0 als terugvalversie.

1. Download/maak ZIP via de meegeleverde HTML-installer en pak het uit op Windows.
2. Open je bestaande repository op GitHub → **Code** → **Add file → Upload files**.
3. Upload de inhoud van het pakket op de branch `main`, **niet de bovenliggende map**. Neem `index.html`, `sw.js`, `manifest.webmanifest`, `requirements-translate.txt`, `scripts/`, `tests/` en `icons/` mee. Commit als `release: Risk Monitor v1.4.0 RC`.
4. Controleer onder **Code** of het verborgen bestand `.github/workflows/update-news.yml` daadwerkelijk is bijgewerkt. GitHub/Windows kan verborgen mappen bij slepen overslaan. Zo nodig: open dat bestand op GitHub, klik op **Edit** (potlood) en plak de inhoud uit het meegeleverde `.txt`-bestand (als apart download beschikbaar) of het bestand uit het uitgepakte ZIP. Commit.
5. **Belangrijk: upload of overschrijf NOOIT je bestaande `data/auto-news.json`.** Het upgradepakket bevat dit bestand niet; GitHub behoudt je levende nieuwsdata en historiek.
6. Ga naar **Actions** → `Risk Monitor - nieuws ophalen en publiceren` → **Run workflow** op `main`. Controleer de nieuwe jobs `Test RSS-verwerking en nieuwsregels`, `Argos-modelcache herstellen`, `Nieuwe headlines automatisch naar Nederlands vertalen`, `Controleer gegenereerd nieuwsbestand` en `Publiceer GitHub Pages`.
7. Controleer onder `Argos-modelcache herstellen`: de eerste v1.4.0-run toont mogelijk `Cache not found`, dat is normaal door de nieuwe cache sleutel. Controleer bij de volgende run dat hij cache terugvindt. De eerste run mag langer duren.
8. Open eerst de GitHub Pages-site in Safari; vernieuw. Controleer `v1.4.0`. Open daarna de bestaande iPhone-app opnieuw zonder het beginschermicoon te verwijderen.
9. Test: (a) NL + Toon origineel, (b) Belangrijk / Trump – VS / Onder drempel, (c) details-bronlinks, (d) onder Instellingen het aantal beschikbare RSS-feeds en gegroepeerde berichten, (e) geen horizontaal scrollen.

### Als de workflow rood wordt

Ga naar **Actions → mislukte uitvoering → update-and-publish** en kopieer de exacte naam van de rode stap en de foutmelding. Eventueel kun je in GitHub `History`/`Commits` terug naar de laatste GO (v1.3.0). Verwijder nooit zomaar de map `data`.

### Aandachtspunt bij caching

De nieuwe Argos-cache werkt zodra er één succesvolle run het en→nl-model in de cache heeft opgeslagen. Als de cache vervolgens niet gevonden wordt, kijk in de logs van `Argos-modelcache herstellen` en de vertaalstap. De maximale jobduur is 35 minuten; bij overschrijden verschijnt een GitHub-fout en geen nieuwe publicatie.
