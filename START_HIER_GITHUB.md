# Risk Monitor v1.3.0 installeren via GitHub (bestaande app behouden)

**Release-kandidaat; v1.2.0 blijft de goedgekeurde fallback totdat de automatische Argos-run op GitHub en de iPhone-weergave bevestigd zijn.**

## Upgraden zonder opnieuw installeren

1. Bewaar desgewenst een kopie van je GO-versie v1.2.0 (ZIP) en exporteer eventuele handmatige items op de iPhone via Instellingen.
2. Pak `Risk_Monitor_PWA_v1.3.0_NL_Argos.zip` uit op je Windows-computer.
3. Open dezelfde GitHub-repository `geopolitieke-risk-monitor` → **Code** → **Add file** → **Upload files**.
4. Upload de **inhoud** van het pakket naar de repository-root; behoud de mapstructuur. Upload zeker `index.html`, `sw.js`, `scripts/update-feed.mjs`, `scripts/translate-feed.py`, `requirements-translate.txt`, `tests/`, `.github/workflows/update-news.yml` en de iconen/manifest. Maak geen extra bovenliggende map aan.
5. **Het actuele bestand `data/auto-news.json` niet verwijderen of vervangen.** Het zit niet in de ZIP; je bestaande nieuws- en controlehistoriek blijft staan.
6. Bevestig op branch `main` met commitbericht `release: Risk Monitor v1.3.0 NL Argos`.
7. Open **Actions** → **Risk Monitor - nieuws ophalen en publiceren** → **Run workflow** → branch `main` → groene knop **Run workflow**.
8. Controleer of deze stappen groen zijn: `RSS feeds verwerken`, `Basistests vertaalmodule`, `Argos Translate installeren`, `Nieuwe headlines automatisch naar Nederlands vertalen`, `Publiceer GitHub Pages`.
9. Ga onder **Code → data → auto-news.json**. Verwacht `schemaVersion: "1.3.0"` en `translation.status` met `ok`, `partial` of `up_to_date`. Bij `model_unavailable` of `translation_failed` is de vertaalstap nog niet operationeel, maar nieuws blijft bereikbaar. `signals[...].translation.title` bevat de NL tekst voor vertaalde items.
10. Open je gepubliceerde GitHub Pages-adres eerst in Safari, ververs, controleer dat **v1.3.0** zichtbaar is, sluit daarna de beginscherm-app helemaal af en open opnieuw. Bij een vertaald bericht staat `Automatisch vertaald · Argos` met de knop **Toon origineel**.

## Let op

- Bestaande headlines worden maximaal 70 per run verwerkt, nieuwste eerst. De eerste uitvoering kan daarom deels Nederlandstalig zijn. Bij volgende runs komt de rest aan de beurt.
- De eerste workflowrun downloadt Python-afhankelijkheden en het taalmodel; daardoor kan hij aanzienlijk langer duren. De modelcache versnelt latere runs. Cache mag door GitHub worden verwijderd en dan wordt opnieuw gedownload.
- De geplande runs blijven rond **08:10 en 18:10 Belgische tijd**. De separate ChatGPT-waarschuwingen blijven rond **08:00 en 18:00** bestaan.
- Er is geen DeepL-account, vertaal-API-sleutel of betaald AI-abonnement nodig. GitHub Actions heeft eigen gebruikslimieten en storingen zijn mogelijk.
- Automatische vertalingen kunnen fout zijn; **Toon origineel** en de oorspronkelijke bronlink blijven altijd beschikbaar.
- Automatische RSS-scores zijn **voorlopige signalen, geen onafhankelijk gecontroleerde dreigingsbeoordelingen**.

## Wanneer deze release GO wordt

Na een groene GitHub Action-run met beschikbare Nederlandse vertalingen, correcte tabbladen, geen horizontaal scrollen en behoud van de iPhone-historiek. Tot dan blijft v1.2.0 de formele GO-versie.
