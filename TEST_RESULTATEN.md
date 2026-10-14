# Testresultaten v3.0.1 — Speech Fix

- JavaScript-parsercheck via Node: geslaagd.
- Simulatie van NL/EN toestelstemmen: eerste `speak()` direct vanuit de knop; geen voorafgaande `cancel()`: geslaagd.
- Nederlandstalige en Engelstalige stemkeuze: geslaagd.
- Uitspraakcyclus `onstart`, `onend`, `onerror`, stop en foutweergave: geslaagd.
- Voorleesknop bij nieuwsberichten: geslaagd met gesimuleerde stem.
- Mobiel: 320, 375, 390 en 430 px zonder horizontaal scrollen: geslaagd.
- Collector-/analyse-/vertaalregressie: geslaagd (5/5 vertaaltests, offline fallback verwacht).
- De echte hoorbare geluidsuitvoer op iPhone Safari en iOS PWA **niet fysiek getest**. Voor GO moet de gebruiker geluidsproef en nieuwsvoorlezen op eigen iPhone bevestigen.
- GitHub Actions/automatische data ongewijzigd, dus geen nieuwsrun vereist voor deze update.
