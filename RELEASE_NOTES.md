# Release Notes — Risk Monitor v2.2.0

**Datum:** 2026-10-14
**Status:** Release candidate; v2.1.0 blijft GO-baseline zolang v2.2.0 niet is bevestigd.

## Added
- Mobiele zoekfunctie en filters Bewaard, Ongelezen en BE/EU-context.
- Bewaar-knop en gelezenstatus met toestelgebonden opslag.
- Conflictdossiers onder Historiek met bronartikelen per onderwerp.
- Herkenning van toegeschreven claims, uitspraken/verwachtingen en officiële publicaties (uitsluitend patroonherkenning).
- Per dossier verloop van artikeleenheden tussen controles indien beide momentopnamen beschikbaar zijn.
- Extra collectorregressietest voor dossiers, statements en bronlabels.

## Changed
- De nieuwheidsscore kijkt naar de eerste detectie; na 24 uur neemt de score af, na 48 uur wordt ze nul. Deze score is geen maatstaf voor dreiging.
- Historiek bevat nu `dossierCounts`; feedcontract heeft schemaVersion `2.2.0`.
- Service-worker-cache naar v2.2.0; voorkeuren taal en tijdsperiode behouden.

## Unchanged
- RSS-bronnen, automatiseringstijden, Argos Translate, ChatGPT-meldingen, wereldkaart, tabbladen en de nieuwsgerichte inrichting van v2.1.0.
- Risicoscore maximaal 14, uitsluitend voorlopige screening.

## Niet inbegrepen
- Autonome, onafhankelijke AI-factchecking of veilig inhoudelijk gevalideerde risicoanalyse.
- Directe ChatGPT→GitHub-synchronisatie, automatische veiligheids-pushmeldingen.
- Synchronisatie van gelezen/bewaard tussen toestellen.
