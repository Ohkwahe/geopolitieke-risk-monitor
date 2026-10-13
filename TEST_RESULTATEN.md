# Risk Monitor v1.3.0 — testresultaten

Datum: 2026-10-13

- 5 Python-unit-tests: **OK**. Getest: Nederlandse velden toegevoegd, origineel/score ongewijzigd, bronhash-cache, vertaling na gewijzigde bron, fallback bij model-/vertaalfout, begrenzing per run.
- RSS-integratietest met 5 opgeslagen openbare feedfixtures: **OK** (8 testitems, alle 5 feeds verwerkt).
- Chromium/Playwright mobiel: **OK** bij 320, 375, 390, 430 en 768 pixels; geen horizontale scroll, categorie-tabs werken, knop Toon origineel schakelt naar Engelse testkop en terug, vertaalstatus Instellingen aanwezig.
- JavaScript Node-syntax: **OK**.
- NIET hier getest: daadwerkelijke Argos-modeldownload en echte machinevertaalkwaliteit (deze runtime bevat het Argos-model niet en heeft geen uitvoerbare netwerktoegang tot de package index). Test op GitHub Actions noodzakelijk vóór GO.
- De gebruikte headlines in testfixtures zijn **fictieve TESTDATA** en geen actuele nieuwsfeiten.
