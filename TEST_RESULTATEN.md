# Risk Monitor v3.0.0 — testresultaten

Testdatum: 2026-10-14. Testomgeving: lokale Linux/Chromium-simulatie en Node.js/Python; géén live GitHub-run of fysieke iPhone-test.

| Test | Resultaat |
|---|---|
| RSS-collector en bestaande scoreclassificatie | GO |
| Bronovereenkomst, geen automatische feitenverificatieclaim | GO |
| Historiek, verschilherkenning en dubbele berichten | GO |
| Argos-vertaalmodule (5 offline unit tests) | GO |
| Automatische briefinggenerator (offline fixture) | GO |
| Optionele AI- en ntfy-stappen zonder secrets: niet actief, geen fout | GO |
| Feedvalidator controleert schema 3.0.0 en verificatie=false | GO |
| Mobiele frontend op 320, 375, 390, 430 pixels | GO |
| Briefing openklappen en dossiernavigatie | GO |
| Instelling standaardtaal en tijdsfilter onthouden | GO |
| Geen horizontaal scrollen in testbrowser | GO |
| HTML-installer maakt identiek ZIP-pakket | GO |

Nog te testen:
- Werkelijke GitHub Actions-run met Argos op GitHub.
- Nederlandse vertaling, spraakweergave en PWA-verversing op echte iPhone.
- Externe AI-provider: niet ingesteld, dus geen end-to-end modeltest.
- ntfy-push: niet ingesteld, dus geen echte iPhone-notificatietest.

Veiligheidsopmerkingen:
- Regelgebaseerde score is geen oorlogskans of officieel alarm.
- Echte onafhankelijke factchecking is niet geïmplementeerd.
- Geen standaard betaalde API of ntfy-koppeling geactiveerd.
- Bestaande nieuwshistoriek en gebruikersvoorkeuren worden niet uit het upgradepakket overschreven.
