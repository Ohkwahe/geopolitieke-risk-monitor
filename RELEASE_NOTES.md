# Risk Monitor — Release Notes

## v2.3.0 — 14 oktober 2026 — RC

### Added
- Per-controle wijzigingen (`new`, `updated`, `related`, `unchanged`) inclusief tijdstip van vorige controle.
- Compacte vernieuwingssamenvatting en filter `Toon wijzigingen` in de nieuwsweergave.
- Activiteitslabels per artikel, ook bij nieuwe vergelijkbare berichtgeving over een reeds gegroepeerd artikel.
- Extra bronduiding in de uitklapbare details: nooit automatisch als onafhankelijk geverifieerd.
- Browsergebaseerd voorlezen van maximaal zes koppen met hun korte samenvatting in geselecteerde rubriek.
- Regressietests voor de collector, data-validatie en mobiele interacties.

### Changed
- `schemaVersion` van de nieuwsfeed nu `2.3.0` inclusief na automatische vertaling.
- Service worker-cache-id naar v2.3.0; bestaande lokale voorkeuren blijven ongemoeid.
- Volledige originele bronlinks behouden; geen onafhankelijke factcheck of pushalarm.

### Not included
- Geen nieuwe automatische AI-modeldienst; geen verifieerbare feitencontrole zonder aanvullende betrouwbare input.
- Geen automatische integratie van ChatGPT-taken naar GitHub, geen zelfstandige mobiele pushmeldingen.

### Compatibility
- Voortbouwen op v2.2.0. Historische data en oude `data/auto-news.json` zijn leesbaar; eerste v2.3.0-run voegt metadata toe.
- `data/auto-news.json` is uitgesloten van het upgradepakket.
