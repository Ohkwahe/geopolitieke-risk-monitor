# Risk Monitor v3.0.4 – onderhoudsiteratie

Deze versie vereenvoudigt de bestaande iPhone PWA en verwijdert de trage audiogeneratie.

## Gewijzigd
- Engelse audio, audiobalk, audioknoppen en geluidstest verwijderd.
- De GitHub Actions-workflow installeert geen eSpeak NG / FFmpeg meer en genereert geen MP3.
- De drie tellende nieuwstegels zijn nu de enige navigatie voor Belangrijk, Trump – VS en Onder drempel. Dubbele tabbladen zijn verwijderd.
- Geselecteerde tegel krijgt een duidelijke actieve weergave.
- Versienummer en serviceworker-cache verhoogd naar **v3.0.4**.

## Bewust ongewijzigd
RSS-collector, automatische planning, Argos-vertaling, tekstbriefing, zoek- en nieuwsfilters, bronverwijzingen, risicoscores, dossiers, historiek, persoonlijke gelezen/bewaarde items, optionele meldingen en AI-koppelingen.

**BELANGRIJK:** `data/auto-news.json` wordt niet meegeleverd. Laat de bestaande feed en historiek in GitHub staan. Verwijder op je iPhone ook geen websitegegevens, zodat je bewaarde artikelen en voorkeuren behouden blijven.

## Status
Releasekandidaat v3.0.4. Geautomatiseerde browsertests beschikbaar; echte test op iPhone na publicatie nodig.
