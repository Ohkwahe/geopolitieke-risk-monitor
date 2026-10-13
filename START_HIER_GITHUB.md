# Risk Monitor v1.1.0 — van GitHub naar je iPhone

## Wat verandert er?
- De bestaande ChatGPT-waarschuwingen rond 08:00 en 18:00 **blijven lopen**.
- GitHub Actions haalt apart RSS-nieuws op rond **08:10 en 18:10 Belgische tijd**.
- Je iPhone-dashboard toont die automatisch onder **Automatische nieuwssignalen**. Bij het openen ververst de app de gegevens via GitHub Pages.
- **Dit zijn nieuwsheadlines, geen door ChatGPT geverifieerde escalatieanalyses.** Ze krijgen geen 0–14-score. De reeds aanwezige risicoanalyses en de rubriek 'Niet melden' blijven beschikbaar voor handmatige import.

## Upgraden vanaf v1.0.0 — zonder terminal

1. **Bewaar eventueel je oude gegevens**: open de huidige app op je iPhone, tik onderaan op **Beheer** (tandwiel), dan **Exporteer JSON**. Dat is alleen nodig als je al nieuws handmatig hebt opgeslagen. Verwijder de app niet.
2. Pak de nieuwe ZIP uit op je Windows-pc.
3. Open je **bestaande** GitHub-repository voor Risk Monitor en ga naar het tabblad **Code**.
4. Kies **Add file → Upload files** en sleep **de inhoud** van de uitgepakte map naar GitHub: `index.html`, `sw.js`, `manifest.webmanifest`, `icons/`, `data/`, `scripts/` en **`.github/`**. Bevestig het overschrijven van eerdere appbestanden. Upload NIET het ZIP-bestand zelf.
5. Onderaan: commit met bijvoorbeeld `Release v1.1.0 - automatische RSS-feed` naar branch `main`.
6. Ga naar **Settings → Pages**. Zet onder **Build and deployment → Source** de instelling van `Deploy from a branch` op **GitHub Actions**. Dit is essentieel: wijzigingen die door een workflow met `GITHUB_TOKEN` worden gecommit, starten geen branch-based Pages-build.
7. Ga naar het tabblad **Actions**. Open de workflow **Risk Monitor - nieuws ophalen en publiceren**.
8. Kies **Run workflow → Branch main → Run workflow** om de eerste update **handmatig** te starten. Wacht tot de workflow groen is; er kan een kleine vertraging ontstaan door GitHub-infrastructuur.
9. Controleer in de repository dat `data/auto-news.json` nu een `generatedAt`-tijd bevat. Ga naar de bestaande GitHub Pages-link van de app, ververs de pagina. Onder **Automatische nieuwssignalen** verschijnt de actuele feed. De eerste run verzamelt berichten uit ongeveer de voorbije 72 uur.
10. Open op je iPhone de GitHub Pages-link een of twee keer in **Safari**, herlaad die, en open vervolgens je icoon op het beginscherm. De tab **Beheer** heet voortaan **Instellingen** (tandwiel). Je hoeft de bestaande iPhone-snelkoppeling normaal niet te verwijderen.

### Als er niets verschijnt
- **Actions is rood**: open die run, klik op de mislukte stap en lees de fout. Een feed die tijdelijk niet antwoordt wordt overgeslagen; als *alle* feeds falen, stopt de run zonder oude data te wissen.
- **Permission denied / 403 bij `git push`**: controleer repository **Settings → Actions → General → Workflow permissions** en zorg dat workflows indien toegestaan naar de repository mogen schrijven. De workflow zelf vraagt reeds `contents: write`.
- **Pages fout**: bevestig dat Pages Source **GitHub Actions** is en dat je repository GitHub Actions toestaat.
- **Geen nieuwe headlines**: misschien zijn er momenteel geen passende artikelen, of alle feeds waren niet beschikbaar. Bekijk de bronstatus in de app.
- **Oude schermen op iPhone**: open de Pages-site in Safari, herlaad twee keer; eventueel sluit en heropen de PWA. Verwijder de app niet zomaar want eerder lokaal opgeslagen data kunnen verloren gaan.

## Bronnen
Publieke RSS van BBC News, The Guardian, Deutsche Welle, UN News en de Raad van de EU. Er worden korte koppen, feed-samenvattingen en bronlinks verwerkt, geen volledige artikelen.

## Technische grenzen
- Geen OpenAI API-sleutel of betaalde API nodig.
- Er is **geen rechtstreekse koppeling** van ChatGPT geplande taken naar GitHub; de RSS-aanvoer is technisch een eigen tweede stroom. Automatisch dezelfde diepgaande 0–14-risicobeoordeling en de volledige 'Niet melden'-log van ChatGPT in de app tonen vereist later een authentieke, afzonderlijke gegevensbrug/analyseservice.
- RSS-artikelen zijn **automatische signalen, geen bevestiging dat een gebeurtenis plaatsvond**. De app toont dit duidelijk.
- GitHub Actions is niet altijd klokvast en geplande workflows van inactieve publieke repositories kunnen na 60 dagen automatisch worden uitgezet. Controleer periodiek de controle-tijd.
- Je repository en GitHub Pages-site zijn publiek: sla geen wachtwoorden, API-sleutels of privégegevens op in de feed.

## Bestandsstructuur
```
index.html
sw.js
manifest.webmanifest
icons/
data/auto-news.json
scripts/update-feed.mjs
.github/workflows/update-news.yml
START_HIER_GITHUB.md
LEESMIJ.md
RELEASE_NOTES.md
```
