# Risk Monitor v1.2.0 — 13 oktober 2026

## Nieuw
- Mobiele kaarten met tekst zonder HTML-/Markdown-tags, lange woorden en horizontaal scrollen.
- De 3 nieuwstabbladen werken op dezelfde automatisch geüpdatete nieuwsdata: **Belangrijk**, **Trump – VS** en **Onder drempel**.
- Nieuwsgroepen voor **Te beoordelen** worden bij Belangrijk weergegeven, met heldere voorlopige status.
- RSS-bronnen automatisch regelgebaseerd ingedeeld: escalatie 0–4, mogelijke België-impact 0–4, nieuwheid 0–3, bronbetrouwbaarheid 0–3.
- Afzonderlijke Trump-categorie zonder dubbeling met conflicten wanneer een conflict expliciet wordt vermeld.
- Historiek van succesvolle controles en nieuwsitems, nieuwe-items-telling.
- Regiofilter, uitklapbare context, korte achtergrond over Belgische gevolgen, controleerbare bronlinks.
- Betere PWA-caching voor iPhone-upgrades zonder opnieuw installeren.
- Behoud van eerdere lokale importgegevens (DEMO-items blijven verborgen).
- Alleen GitHub Actions + openbare RSS-bronnen; geen API-sleutels en geen betaalde AI-provider.

## Eerlijke beperkingen
- Automatische rubricering is **regelgebaseerde screening**, **niet** de volledige onafhankelijke AI-analyse die je in ChatGPT ontvangt.
- RSS-berichttekst en mogelijke Belgische impact worden **niet** onafhankelijk geverifieerd. Scores zijn signaalprioriteiten, geen oorlogskansen.
- Geen automatische overdracht van je bestaande ChatGPT-taken naar GitHub. Dat vereist een aparte gekoppelde dienst.
- Geen automatische pushmeldingen vanuit de webapp. De bestaande ChatGPT-notificaties blijven afzonderlijk.
- Geen automatische Nederlandstalige vertaling van Engelstalige RSS-bronnen.
- Historiek van controles begint vanaf de eerste v1.2.0 workflow-run.

## Technisch
- `index.html` geheel herzien met tekst-only weergave en veilige uitklapbare bronlinks.
- `scripts/update-feed.mjs` uitgebreid met categorisering, scores, vergelijking van overeenkomstige headlines en een compacte historie.
- `.github/workflows/update-news.yml` blijft geconfigureerd voor circa 08:10 en 18:10 in `Europe/Brussels`.
- `sw.js`: cacheversie v1.2.0 en network-first voor app/data.
- `data/auto-news.json` **niet** in upgrade-ZIP: laat bestaande live gegevens intact.
