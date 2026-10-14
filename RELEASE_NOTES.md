# Risk Monitor – Release Notes

## v2.4.0 — 14 oktober 2026 — Releasekandidaat

### Toegevoegd
- **Kort overzicht van deze rubriek:** optionele, standaard ingeklapte leeslijst met maximaal vijf bestaande nieuwsheadlines. Tik op een kop om het originele nieuwskaartje te bereiken. Geen automatische inhoudelijke conclusie of AI-samenvatting.
- **Bronspoor in berichtdetails:** oorsprong (officiële instelling, overeenkomstige mediaheadlines of één nieuwsbron), eerste waarneming, eventuele wijziging, geobserveerd aantal bronnen en oorspronkelijke links.
- **Filter op type bron:** verborgen onder een klein uitklapveld zodat het nieuws centraal blijft. De keuze blijft bewaard op hetzelfde toestel.
- `sourceAudit`-metadata per item in `data/auto-news.json`; validator en tests toetsen dat onafhankelijk geverifieerd nooit automatisch op `true` staat.

### Behouden
- Nieuws eerst, tabs Belangrijk/Trump–VS/Onder drempel, tijdsfilter, taalkeuze en vertaalknop, favorieten, gelezen-status, regio's, conflictdossiers, historiek, voorlezen en Nederlandse vertaling.
- Twee geplande GitHub Actions-controles. Geen wijziging aan de scheduler, API's of tokens.
- Bestaande live feed, opgeslagen voorkeuren en lokale items. Het archief bevat bewust geen `data/auto-news.json`.

### Grenzen
- Dit is **nog geen AI-factcheck**. Verificatie betekent niet dat een officiële mededeling alle beweringen bewezen heeft, noch dat overeenkomstige koppen onafhankelijk bevestiging zijn.
- De briefing zet bestaande titels onder elkaar en formuleert geen nieuwe geopolitieke feiten, causaliteit of aanbevelingen.
- ChatGPT-taakmeldingen blijven gescheiden van GitHub en dit dashboard. Geen zelfstandig mobiel pushalarm.
