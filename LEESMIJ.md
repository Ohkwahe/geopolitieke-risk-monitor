# Risk Monitor v3.0.0 — Complete Intelligence Platform

**Status: releasekandidaat.** Gebaseerd op v2.4.0 (laatste beschikbare bronpakket); behoudt de goedgekeurde configuratie en lokale opslag van eerdere versies.

De app heeft drie tabbladen (Belangrijk, Trump – VS, Onder drempel), RSS-verzameling, Nederlandse vertaling, voorlopige 0–14-screening, Belgische themarelevantie, bronsporen, dossiers, kaart, historiek, zoeken, favorieten, gelezen-status, periode- en taalvoorkeur.

Nieuw in v3.0.0:
- Ochtend-/avondbriefing op basis van de headlinefeed; leesbaar en voorleesbaar op de telefoon.
- Dossierkoppelingen vanuit de kaart naar de historiek.
- Optionele **AI-duiding** via een zelf aangesloten HTTPS chat/completions-modeldienst. Standaard UIT. Het model verifieert geen feiten en verandert geen basisscores.
- Optionele nieuwsnotificaties via **ntfy-app** op iPhone. Standaard UIT; instellen via GitHub Secrets. **Niet** hetzelfde als native PWA Web Push.
- Veiligheidscontroles voor de briefing en optionele AI-output; sterke validatie zonder bronverificatie te claimen.

## Essentiële grenzen

1. Zonder eigen AI-modelprovider bevat deze release *geen volwaardige AI-analyse of automatische onafhankelijke factcheck*. De standaard blijft een regelgebaseerde nieuwsvoorselectie.
2. Headlines, vertalingen, geautomatiseerde notities en meerdere vergelijkbare mediaberichten bewijzen niet dat een gebeurtenis feitelijk klopt. Raadpleeg originele en officiële bronnen.
3. Optionele ntfy-berichten zijn **onbevestigde nieuwssignalen**, geen onmiddellijke veiligheidswaarschuwing. De bestaande ChatGPT-controles blijven afzonderlijk functioneren.
4. Met publieke GitHub Pages zijn het dashboard en gepubliceerde nieuwsdata publiek toegankelijk. Zet nooit persoonlijke geheimen of API-tokens in de publicatiemap.

## Upgrade

Gebruik `START_HIER_GITHUB.md`. Upload de inhoud van het installatiepakket naar dezelfde repository op `main`. Het pakket bevat GEEN `data/auto-news.json` en overschrijft geen live data. Bewaar je bestaande lokale instellingen/favorieten; verwijder de geïnstalleerde iPhone-app niet.

## Versiebeheer

MAJOR.MINOR.PATCH = 3.0.0. `RELEASE_NOTES.md` bevat wijzigingen; `BUILDINFO.json` identificeert build en compatibiliteit.
