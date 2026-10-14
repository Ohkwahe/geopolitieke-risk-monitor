# Risk Monitor v1.4.0 — Releasekandidaat

**Baseline:** v1.3.0 (GO op 13 oktober 2026). **Status v1.4.0:** testen op eigen GitHub/iPhone vóór GO.

Deze versie optimaliseert de bestaande gratis nieuwsmonitor. **Er is geen betaalde AI-API, nieuw account of automatische ChatGPT-naar-GitHub-koppeling.** Alle automatische RSS-scores blijven indicatieve *regelgebaseerde signalen*, geen onafhankelijk geverifieerde veiligheidswaarschuwingen.

## Nieuw

- Correcte Argos-omgeving `ARGOS_PACKAGES_DIR`; de taalmodellen worden nu op dezelfde locatie opgeslagen als de GitHub-cache (`~/.cache/risk-monitor-argos-models`). Een nieuwe cache wordt bij de eerste v1.4.0-run aangemaakt. Pip blijft gecachet.
- `timeout-minutes: 35`: een vastgelopen workflow kan niet uren blijven lopen.
- Automatische regressietests en datavalidatie vóór het publiceren.
- Vrijwel identieke headlines van verschillende bronnen binnen 24 uur worden voorzichtig tot één zichtbare nieuwskaart gegroepeerd. Onder 'Details en bronnen' blijven de aparte bronlinks staan; alle originele records blijven in JSON.
- Meer bronduiding: officiële publicatie, één nieuwsbron of vergelijkbare nieuwskoppen uit meerdere bronnen. Dit is geen onafhankelijke factcheck.
- Duidelijke bronfouten en aantal gegroepeerde berichten onder Instellingen; controlehistoriek toont nieuwe, gewijzigde en gegroepeerde items.
- Als het originele RSS-bericht wijzigt zonder dat de link wijzigt, wordt het bronrecord bijgewerkt en wordt de vertaling waar nodig opnieuw gegenereerd.

## Wat blijft behouden?

De Nederlandse vertaling via Argos, 'Toon origineel', dezelfde drie tabbladen en 0–14-indicaties, automatische checks rond 08:10/18:10, Belgische aandachtspunten, lokale items en historiek. Bestaande persoonlijke items in de iPhone-browseropslag worden niet gemigreerd of gewist. De ChatGPT-waarschuwingen (08:00/18:00) zijn een aparte bestaande taak en blijven ongewijzigd.

## Belangrijke beperkingen

- **Geen AI of menselijke verificatie:** overeenkomst tussen headlines is niet hetzelfde als bevestiging van feiten. De app stuurt geen noodmeldingen en houdt de afzonderlijke ChatGPT-waarschuwingen niet automatisch bij.
- De vertaling kan fouten bevatten; bronartikel en originele tekst zijn altijd raadpleegbaar.
- Bij onvoldoende bronnen of vertaalproblemen toont de app de beperkte status. Als alle RSS-feeds falen, publiceert de workflow niets nieuws.
- GitHub Actions-tijden zijn niet gegarandeerd exact en de eerste Argos-run kan langer duren. De cache werkt pas als de installatie en de Actions-cacheopslag op GitHub geslaagd zijn.
- GitHub Pages en het publieke JSON-nieuwsbestand zijn openbaar. Voer geen persoonlijke geheime gegevens in die je vervolgens naar de repository uploadt.

**Installatie:** zie `START_HIER_GITHUB.md`. **Testresultaten:** zie `TEST_RESULTATEN.md`.
