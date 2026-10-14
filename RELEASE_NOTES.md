# Risk Monitor v3.0.2 — GitHub CI Fix

**Type:** PATCH / releasekandidaat; gebaseerd op v3.0.1.

## Probleem
De workflow gebruikte `python -m unittest discover -s tests -p 'test_*.py'`. Sinds v3.0.1 stond `tests/test_speech_browser.py` ook in dat patroon. Het bestand importeerde bij laden Playwright, dat niet in de GitHub-teststap is geïnstalleerd. Dit veroorzaakte `ModuleNotFoundError: No module named 'playwright'` bij *Basistests vertaalmodule*.

## Herstel
- Alleen `test_translate.py` wordt door de translation-teststap ontdekt.
- `test_speech_browser.py` is veilig te importeren en draait de browsercheck alleen bij rechtstreeks uitvoeren met Playwright.
- Versie/bouwinformatie bijgewerkt naar v3.0.2.
- Nieuwscollector, vertaallogica, voice-logica, schemas, bronconfiguratie en GitHub-planning ongewijzigd.

## GO-check
GitHub → Actions → workflow handmatig uitvoeren → stap *Basistests vertaalmodule* toont 5 geslaagde tests → volledige workflow groen → website opent, nieuws en vertalingen werken.
