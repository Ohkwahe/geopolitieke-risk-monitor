# Testresultaten — Risk Monitor v1.4.0

Getest lokaal op 2026-10-13, met kunstmatige RSS-voorbeelden (geen actueel nieuws).

| Onderdeel | Resultaat |
| --- | --- |
| Node JavaScript syntaxcheck collector en validator | GO |
| Collector 5/5 offline RSS-fixtures | GO |
| Bijna identieke headlines uit verschillende bronnen gegroepeerd | GO |
| Originele bronrecords en URL's behouden | GO |
| Bij tweede run geen dubbele nieuwe records | GO |
| Gewijzigde RSS-samenvatting gedetecteerd | GO |
| Bronbetrouwbaarheid blijft maximaal 2, auto-verified=false | GO |
| Datacontract validator | GO |
| Python vertaaltests (gesimuleerde vertaaldienst) | 5/5 GO |
| Browser (Chromium) 320, 375, 390, 430 en 768 px | GO |
| Geen horizontaal scrollen, tabbladen, NL/EN-wissel, instellingen | GO |
| Echte GitHub Actions-cache, Argos-model-hergebruik | NOG TE CONTROLEREN NA INSTALLATIE |
| Live RSS-kwaliteit en GitHub Pages publicatie | NOG TE CONTROLEREN NA INSTALLATIE |

**Betekenis:** lokaal testgeslaagd; niet automatisch GO voor de productie-installatie. v1.3.0 blijft de laatste formeel door de gebruiker gevalideerde versie totdat v1.4.0 op GitHub/iPhone bevestigd is.
