# Geopolitieke Risk Monitor — v1.0.0

## Wat is het?

Een **mobiele, offline-first webapp (PWA)** voor geopolitieke updates: kaarten, scores, regio-overzicht, een historische tijdlijn, apart Trump-nieuws en de rubriek **Niet melden — geen alarm**. Alle gegevens staan lokaal op je toestel. De bestaande ChatGPT-taak voor **08:00 en 18:00 (Belgische tijd)** blijft **ongewijzigd** en stuurt meldingen alleen bij belangrijk nieuws.

**Deze versie haalt niet zelfstandig nieuws op en ontvangt niet automatisch de resultaten van je ChatGPT-automatisering.** Voor echte gegevens importeer je een JSON-bestand of plak je JSON. Een latere synchronisatie vereist een apart te realiseren, beveiligde gegevensbrug of backend. De fictieve DEMO mag niet als actualiteit worden geïnterpreteerd.

## iPhone: snel bekijken

1. Open `Risk_Monitor_v1.0.0_Standalone.html` op een computer om de app lokaal te testen. Op iPhone kan een lokaal HTML-bestand afhankelijk van de gekozen app beperkte opslagfunctionaliteit hebben.
2. Voor betrouwbaar iPhone-gebruik: publiceer de **hele inhoud van deze map** als statische website via HTTPS, bijvoorbeeld via een privé geschikte hostingdienst of GitHub Pages (zie hieronder). Open de link in **Safari op je iPhone**.
3. Kies in Safari **Deel → Zet op beginscherm**. Dan opent de monitor als app, met lokaal opgeslagen data en offline ondersteuning nadat de site voor het eerst is geopend.

## GitHub Pages (optioneel)

- Maak een nieuwe repository (bijvoorbeeld `geopolitieke-risk-monitor`).
- Upload `index.html`, `manifest.webmanifest`, `sw.js` en de `icons/`-map in dezelfde structuur naar de hoofdmap.
- Open **Settings → Pages → Build and deployment**, kies **Deploy from a branch**, branch `main`, folder `/ (root)` en sla op.
- Open de gepubliceerde **https**-URL op je iPhone in Safari. Voeg hem toe aan het beginscherm.
- Let op: GitHub Pages is in de praktijk een **publieke website**, ook als je repository privé zou zijn; publiceer geen persoonlijke of vertrouwelijke updates in de code. De nieuwsitems die je in de app importeert worden enkel lokaal opgeslagen (niet geüpload naar GitHub).

## Importeren

- Ga naar **Beheer → JSON-bestand kiezen** of plak JSON.
- Of kies **Kopieer ChatGPT-importprompt** in de app en plak de prompt bij een bestaande ChatGPT-update om er een importeerbaar JSON-object van te maken.
- Gebruik het bestand `voorbeeld_import_DEMO.json` om de workflow te testen. Het is fictief.
- Je kunt ook handmatig één item toevoegen, of je lokale database weer exporteren.
- Bij opnieuw importeren worden items met hetzelfde `id` overschreven. Andere items blijven bestaan.
- JSON-formaat:

```json
{
  "schemaVersion": "1.0.0",
  "items": [
    {
      "id": "2026-10-12-001",
      "date": "2026-10-12T18:00:00+02:00",
      "region": "europa",
      "topic": "conflict",
      "title": "Feitelijke titel",
      "summary": "Korte feitelijke samenvatting",
      "details": "Optionele toelichting",
      "belgiumImpact": "Bevestigde en mogelijke gevolgen voor België",
      "uncertainty": "Wat nog niet bekend is",
      "belowReason": "Waarom onder de meldingsdrempel (indien van toepassing)",
      "score": { "military": 0, "belgium": 0, "novelty": 0, "reliability": 0 },
      "reviewed": false,
      "trumpSignificant": false,
      "officialCritical": false,
      "sources": [{"title":"Bronnaam","url":"https://example.org/feitelijke-bron"}]
    }
  ]
}
```

Geldige `region`: `europa`, `midden-oosten`, `azie`, `afrika`, `amerika`, `overig`. `topic`: `conflict` of `trump`. Zet Trump-nieuws bij zijn conflict in plaats van `trump` als het rechtstreeks hetzelfde conflict betreft.

## Drempels

- 0–6: niet melden.
- 7–9: te beoordelen; `reviewed:true` markeert als werkelijk belangrijk.
- 10–14: belangrijk (mits bronbetrouwbaarheid ≥2/3).
- `officialCritical:true` met bronbetrouwbaarheid ≥2/3 markeert als belangrijk, ongeacht de score; dit is een **handmatige claim**, niet automatisch geverifieerd.
- `trumpSignificant:true` met `topic:trump` en bronbetrouwbaarheid ≥2/3 markeert als belangrijk, ook bij een lage militaire score.

Een score is een **meldingsprioriteit, geen oorlogskans**. De app valideert niet zelfstandig of een bron onafhankelijk is, of officiële bevestiging bestaat, of een nieuwsfeit correct is.

## Releasenotes

**v1.0.0 — 12 oktober 2026**
- Eerste mobiele release, met vier schermen: Overzicht, Regio's, Tijdlijn, Beheer.
- Scorelogica 0–14 en kritieke uitzonderingen, Trump-segmentatie, niet-melden-sectie.
- Fictieve DEMO, lokale JSON-import/export, handmatige invoer en kopieerbare ChatGPT-importprompt.
- PWA-manifest en offline app-shell; geen externe afhankelijkheden.

## Beperkingen

- Geen livefeed, pushmelding vanuit de app of automatische ChatGPT-sync in deze versie.
- Geen onafhankelijke journalistieke broncontrole binnen de app.
- HTML-standalone op iOS via bestandsvoorvertoning heeft mogelijk beperkingen; HTTPS via Safari is aanbevolen.
- Offline beschikbaarheid vereist eerst laden van de site via HTTPS.
- Lokale gegevens kunnen bij het verwijderen van websitegegevens verdwijnen: maak af en toe een export.
