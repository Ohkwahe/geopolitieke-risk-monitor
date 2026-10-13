# Geopolitieke Risk Monitor — v1.1.0

Mobiel dashboard met twee strikt gescheiden gegevensstromen:

1. **ChatGPT-waarschuwingen** (bestaande geplande taak circa 08:00 en 18:00, onafhankelijk van deze code). Die beoordeelt nieuws volgens de met de gebruiker overeengekomen prioriteitsdrempels en stuurt alleen een bericht bij wezenlijke verandering.
2. **Automatische RSS-signalen** (nieuwe GitHub Actions workflow circa 08:10 en 18:10 Europe/Brussels). Biedt automatische nieuwsheadlines zonder kosten, maar GEEN handmatig of AI-geverifieerde escalatieanalyse, risicoscore of alarmmelding.

`index.html` toont automatisch opgehaalde signalen in een eigen kaartsectie. De reeds bestaande secties voor handmatig beoordeelde items, Trump, 'Niet melden', tijdlijn en regio's blijven bestaan.

### Installatie
Lees `START_HIER_GITHUB.md` voor de exacte stappen om een bestaande GitHub Pages-repository op v1.1.0 bij te werken. Behoud de bestaande app op je iPhone en exporteer voor de zekerheid lokaal ingevoerde records vóór wijzigingen.

### Werking
- De GitHub Action downloadt RSS met Node 22 en verwerkt headlines met een beperkt, transparant geopolitiek trefwoordenfilter; geen LLM, geen API-key.
- Bronnen: BBC, Guardian, DW, VN, Raad van de EU. Uitvallende bronnen worden vermeld, andere bronnen kunnen gewoon verder worden verwerkt.
- JSON-historiek wordt in de repository bewaard (`data/auto-news.json`), maximaal 250 signalen over 30 dagen; de eerste run verwerkt grofweg de jongste 72 uur.
- GitHub Actions publiceert de volledige site direct naar GitHub Pages. Daarom moet de Pages-source op **GitHub Actions** staan, niet 'Deploy from a branch'.
- De PWA haalt `auto-news.json` bij het openen en via de refreshknop op met cache-omzeiling. Er is een duidelijk verouderingssignaal na 36 uur zonder succesvolle bronupdate.
- Privé en lokaal geïmporteerde ChatGPT-data blijven in dezelfde `localStorage`-sleutel bewaard als v1.0.0. Er wordt niets terug naar GitHub geüpload door de iPhone.

### Veiligheids- en kwaliteitswaarschuwing
Nieuws op basis van RSS kan onvolledig, dubbel of feitelijk onjuist zijn. Een RSS-link of headline bewijst niet dat een concrete veiligheidsdreiging bevestigd is. De automatische feed krijgt bewust geen 0–14-score en geen 'Belangrijk'-badge, zodat onbeoordeelde signalen niet als gevalideerde dreiging worden gepresenteerd. De ChatGPT-taak blijft onafhankelijk en kan andere nieuwsselecties of conclusies hebben.

### Versionering
`1.1.0`: nieuwe automatische feature, bestaande v1.0.0 lokale database blijft leesbaar. Zie `RELEASE_NOTES.md`.
