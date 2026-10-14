# Risk Monitor v2.3.0 — Nieuw sinds controle & voorlezen

**Status:** releasekandidaat, nog niet GO. Gebaseerd op v2.2.0. Gebruik de v2.2.0- of eerder goedgekeurde versie als terugvaloptie totdat je op je iPhone test.

## Kernwijzigingen

- In Nieuws: compacte regel `Laatste controle: X nieuw · Y bijgewerkt` (vanaf twee controlemomenten).
- Knop **Toon wijzigingen**: filtert nieuwsitems die deze controle nieuw, aangepast of opnieuw door een andere bron opgepikt zijn. De bestaande tabs, zoekfunctie, favorieten en periodefilter blijven werken.
- Op berichtniveau subtiele labels `Nieuw sinds controle`, `Bericht bijgewerkt`, `Nieuwe bronvermelding`.
- In **details**: expliciete verificatiestatus; overeenkomende headlines uit twee media zijn nog **geen onafhankelijke feitencontrole**.
- **▶ Luister naar koppen**: leest maximaal 6 recente items in het geselecteerde tabblad voor, waar mogelijk in de voorkeurstaal, met de spraakfunctie van de browser. Stoppen is mogelijk; er wordt geen audio geüpload.
- JSON-contract v2.3.0: `previousControlAt`, `lastActivity`, `lastActivityAt`, `reviewStatus`, `reviewBasis`.
- Bugfix: de Argos-vertaler schrijft niet langer `schemaVersion: 1.4.0` over het modernere nieuwsbestand heen.
- Nieuwe regressietests voor wijzigingen en mobiele bediening.

## Beperkingen

- Dit is **geen autonome AI-factcheck**. De collector gebruikt transparante regels en bronvermeldingen. Risicoscores blijven indicatief en geen kansberekening.
- "Nieuwe bronvermelding" betekent overeenkomende berichtgeving, **niet bevestiging van de claim**.
- Audio is afhankelijk van de spraakfunctie en geïnstalleerde stemmen op je iPhone; uitspreekkwaliteit kan verschillen en audio begint uitsluitend na tikken.
- ChatGPT-waarschuwingen blijven onafhankelijk van deze GitHub-feed.
- GitHub Actions behoudt 08:10 / 18:10 Europe/Brussels; opstart en publicatie kunnen vertraagd zijn.

## Installatie

Zie `START_HIER_GITHUB.md`. Het live bestand `data/auto-news.json` zit bewust niet in het pakket.

## Beveiliging en kosten

- Geen nieuwe accounts, cloud-AI, API-tokens, of betaalde diensten nodig.
- GitHub Pages blijft openbaar; persoonlijke gelezen-/bewaardvoorkeuren blijven lokaal op het iPhone-toestel.
- Externe RSS-inhoud verschijnt als platte tekst; links vereisen een geldig webadres.
