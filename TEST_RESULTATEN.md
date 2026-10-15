# Testverslag – Risk Monitor v3.0.4

## Automatisch
- Javascript-syntaxis gecontroleerd met Node.js.
- Node-regressietests voor RSS, nieuwsscreening, wijzigingen, release en nieuwstegels.
- Python unittest voor Nederlandse vertaalmodule.
- Browserregressie op 320, 375, 390, 430 en 768 pixels met gesimuleerde RSS-data, inclusief tegelkeuze, filters, briefing, instellingen, regio’s en historiek.
- Oudere v2.2/v2.3/v2.4 browserregressies blijven geslaagd.
- iPhone fysiek niet getest; gegevens niet online gepubliceerd.

## Nog uit te voeren na upload
- GitHub Actions-run op `main` succesvol.
- Scherm / tabselectie in Safari en iPhone-PWA.
- Nieuwsfeed blijft automatisch verversen; bestaande historiek en lokale favorieten blijven behouden.

Deze versie is een onderhoudsreleasekandidaat totdat bovenstaande live controles zijn uitgevoerd.
