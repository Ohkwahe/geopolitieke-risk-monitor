# Optionele koppelingen — AI-duiding en iPhone-meldingen

**Beide zijn standaard UIT.** Risk Monitor kan zonder koppeling verder gratis RSS-nieuws ophalen, vertalen, groeperen en tonen.

## A. Optionele AI-duiding

Deze module kan beknopte Nederlandstalige notities genereren bij maximaal vier nieuwe signalen met een voorlopige score van minstens 9/14 per run. De analyse is alleen gebaseerd op RSS-koppen en beschrijvingen, en **is geen onafhankelijke factcheck**. Scores worden niet door het model aangepast.

Vereist een afzonderlijke **HTTPS OpenAI-compatible chat/completions endpoint**, een gekozen model en de bijbehorende API-sleutel. De aanbieder kan een tarief rekenen; controleer voorwaarden en kosten VOOR configuratie. Dit pakket biedt geen inbegrepen AI-account of gegarandeerd gratis model.

GitHub repository → **Settings → Secrets and variables → Actions → New repository secret**. Voeg alle drie toe:

- `RISK_AI_ENDPOINT` — volledige HTTPS-URL van de externe provider naar `chat/completions` (geen localhost; een GitHub-runner kan niet direct naar jouw privé-NUC surfen).
- `RISK_AI_MODEL` — modelidentificatie zoals door de aanbieder vereist.
- `RISK_AI_KEY` — de geheime API-sleutel.

Zonder deze drie gegevens wordt geen externe AI-aanvraag gedaan. De sleutel wordt alleen aan de runner gegeven en niet opgenomen in de publieke HTML of JSON. De RSS-koppen en beschrijvingen worden bij activering aan de gekozen aanbieder verstuurd. Alleen notities van maximaal 250 tekens per veld worden aan het publieke `data/auto-news.json` toegevoegd.

**Beperking**: GitHub Models is sinds 30 juli 2026 beëindigd en is dus geen aanbevolen gratis provider. Schakel AI uit door een van de drie secrets te verwijderen. Controleer gebruik op het portaal van de externe provider; Risk Monitor biedt geen afrekenlimiet of kostenbeveiliging van die aanbieder.

## B. Optionele meldingen via ntfy

De bestaande ChatGPT-meldingen blijven ongewijzigd. ntfy is een **andere app** op je iPhone, dus niet native Web Push uit Risk Monitor zelf. De publieke ntfy.sh-server is een derde partij: wie het topic kent, kan berichten lezen. Gebruik geen herkenbare naam en plaats er geen privégegevens in.

1. Installeer de officiële **ntfy**-app op je iPhone vanuit de App Store.
2. Kies lokaal een willekeurig topic van minimaal 20 tekens, bijvoorbeeld gegenereerd met een wachtwoordgenerator. **Gebruik geen voorbeeldtopic uit deze handleiding**.
3. Abonneer je in ntfy op dat topic.
4. Ga naar GitHub-repository → Settings → Secrets and variables → Actions → New repository secret.
5. Maak secret `RISK_NTFY_TOPIC` met exact dezelfde willekeurige topicnaam.
6. Optioneel: maak onder **Variables** `RISK_NTFY_THRESHOLD` (10 t/m 14; standaard 10).
7. Voer handmatig één workflow uit. Alleen bij nieuwe, meermaals gelijkend gerapporteerde signalen boven de drempel kan een melding volgen. Het is een **nieuwssignaal, geen geverifieerd veiligheidsalarm**.
8. Stoppen? Verwijder `RISK_NTFY_TOPIC` uit GitHub Secrets en/of de ntfy-abonnement op je telefoon.

De workflow bewaart alleen reeds gemelde openbare nieuwssignaal-ID's in `data/notification-state.json` om dubbele meldingen te beperken. Er worden geen AI-sleutels of topicnamen gepubliceerd. GitHub Actions kan vertraagd draaien, dus dit is geen realtime alarmsysteem.

## Native PWA Web Push

Voor native iPhone-webpush via het Risk Monitor-icoon zijn onder andere een pushabonnement, een serviceworker, beveiligde sleutelopslag en een bereikbare pushbackend nodig. GitHub Pages alleen levert die backend niet. Daarom is native push **niet** als werkend onderdeel inbegrepen in v3.0.0. Dit pakket doet geen alsof-melding.


## v3.0.3 Engelse audio
GitHub maakt bij de normale nieuwsrun Engelse MP3-bestanden aan via de gratis lokale eSpeak NG-synthese. Dit is onafhankelijk van AI-duiding en ntfy-meldingen. De iPhone leest deze MP3-bestanden via een HTML-audio-element.
