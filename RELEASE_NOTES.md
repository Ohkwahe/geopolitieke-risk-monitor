# Release notes — v3.0.1 (Speech Fix)

## Reparaties
- Eerste spraakopdracht start zonder onnodige `speechSynthesis.cancel()`; eerste `speak()` gebeurt rechtstreeks in de klikhandler.
- Actieve `SpeechSynthesisUtterance` blijft in geheugen tot einde/fout.
- Kortere gesproken tekstblokken, stemkeuze voor NL/EN met fallback, en duidelijke `onstart`/`onerror`-meldingen.
- Nieuwe, inklapbare geluidsdiagnose onder Instellingen met knop **Test voorleesstem**, stopknop en stemmenlijst.
- Briefing en nieuwsvoorlezen gebruiken dezelfde gecorrigeerde speler.
- Nieuw serviceworker-cache-ID zodat iPhone de nieuwe versie kan ophalen.

## Scope
- Geen aanpassingen aan GitHub Actions, RSS, Argos of opgeslagen nieuwsgegevens.
- Geen betaalde diensten. Alle bestaande instellingen blijven opgeslagen.
- **De fysieke geluidstest op de iPhone moet nog worden bevestigd.** Browser-simulaties kunnen geen werkelijke geluidsuitvoer bewijzen.
