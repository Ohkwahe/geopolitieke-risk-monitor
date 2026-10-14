# Testresultaten Risk Monitor v2.3.0

- Collector-regressietest: **geslaagd**, met dubbele koppen, herhaalde runs en gewijzigde RSS-inhoud.
- Intelligence-classificatietest: **geslaagd**, inclusief claimlabel, officiële publicatie en Trump-indeling.
- Nieuwe wijzigingstest `tests/test_change_tracking.mjs`: **geslaagd** (nieuwe items, onveranderde tweede run, gewijzigde kop/samenvatting en zichtbaarheid bij gegroepeerde items).
- Python-vertaling: **5 tests geslaagd** met testengine; geen echte Argos-run in deze lokale test.
- Mobiele Chromium-test: **geslaagd** voor 320, 375, 390 en 430 px, zonder horizontale overloop; nieuwe filter, wisseling van tabbladen, details en Instellingen.
- Browsergebaseerd voorlezen: aanwezigheid van knop/JavaScript bevestigd; **echt geluid op iOS nog niet getest**.
- GitHub Actions en live publicatie: **nog te testen** op gebruikersrepository.
- Live actualiteit, onafhankelijk geverifieerde claims en professionele AI-analyse: **niet getest en niet aanwezig**.
- HTML-installer: **geslaagd** in Chromium; lokaal gegenereerd ZIP-bestand heeft exact dezelfde SHA-256 als het afzonderlijk gecontroleerde upgradepakket (23 bestanden).
