# Release Notes — Risk Monitor

## v1.4.0 (2026-10-13) — Releasekandidaat

Type: MINOR, omdat er nieuwe gebruikerszichtbare functies zijn.

### Added
- Conservatieve groepering van bijna identieke cross-source headlines, met afzonderlijk bewaarde bronlinks en originele data.
- Transparant zichtbaar bronbewijs per nieuwskaart (officiële publicatie / meerdere gelijkaardige koppen / één bron).
- Foutdiagnose voor onbereikbare RSS-bronnen, en groepsaantallen in Instellingen en Historiek.
- Vastleggen van tussentijds gewijzigde RSS-titels/samenvattingen.
- `scripts/validate-feed.mjs` en `tests/test_collector.mjs` voor automatische controles.

### Fixed
- `ARGOS_PACKAGE_DIR` vervangen door de correct gedocumenteerde `ARGOS_PACKAGES_DIR` voor hergebruik van de modelcache.
- GitHub Actions cachepad en Argos-modelinstallatielocatie zijn gelijkgetrokken.
- Eerdere vertalingen worden niet opnieuw vertaald wanneer de Engelse tekst onveranderd is.

### Changed
- GitHub-job heeft `timeout-minutes: 35`.
- Prioritaire signalen heten expliciet 'Prioritaire controle', niet een bevestigd alarm.
- De bronbetrouwbaarheid en Belgische impact blijven indicaties, niet onafhankelijk geverifieerde feiten.

### Regression
- Nederlandse vertaling en origineel, tabbladen, periodeselectie, regio's, historie, PWA-cache, lokaal opgeslagen data ongewijzigd.

## v1.3.0 (2026-10-13) — GO
Automatische Nederlandse vertaling met Argos Translate en knop 'Toon origineel'.

## v1.2.0 — GO
Mobiele rendering-fix, tabbladen en voorlopige regelgebaseerde analyse.
