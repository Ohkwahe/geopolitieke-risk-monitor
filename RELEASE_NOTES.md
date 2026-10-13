# Risk Monitor — releasehistoriek

## v1.3.0 — kandidaat (2026-10-13)

**Nieuw**
- Automatische offline Nederlandse vertaling via Argos Translate (Engels → Nederlands) als stap ná RSS-ophaling en scoring.
- Vertaalcache per bericht met SHA-256-brontekstfingerprint; maximaal 70 nieuwe/oude berichten per uitvoering, recentste eerst.
- Mobiele vertaalde titels en samenvattingen, met per nieuwskaart `Toon origineel` / `Toon Nederlands`.
- Vertaalstatus in Instellingen, inclusief aantal deze ronde en nog te verwerken items.
- Model-/pip-cache in GitHub Actions om overbodige downloads te verminderen.
- Eenheidstests voor vertaling, gewijzigde bron, cache, mislukte vertaling en modelstoring.

**Behouden**
- Alle nieuwsfilters, Trump-tab, onder-drempel-items, risicoscores, Belgische impact, 08:10/18:10-schema, iPhone lokaal opgeslagen handmatige items, bronlinks en historiek.
- Zonder model blijft Engelse bron leesbaar en publicatie bereikbaar.

**Bekende beperkingen**
- Machinevertalingen kunnen nuances en namen verkeerd vertalen.
- Alleen de RSS-titels en samenvattingen worden vertaald. Volledige artikelen blijven bij de oorspronkelijke bron.
- Geen eigen AI-factcheck of automatische koppeling van ChatGPT-beoordelingen aan GitHub.
- Argos-taalmodel is tijdens het ontwikkelen niet end-to-end gedownload/gevalideerd; deze stap wordt pas na een succesvolle GitHub-run GO.

## v1.2.0 — GO

Vorige stabiele release: mobiele layout, drie gekoppelde rubrieken, regelgebaseerde screening, Belgisch impactveld en controlehistoriek.
