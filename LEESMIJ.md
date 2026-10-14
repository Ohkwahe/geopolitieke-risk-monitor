# Risk Monitor v2.2.0 – Intelligence & Monitoring

**Status: releasekandidaat, nog geen GO.** Basis: de op 14 oktober 2026 aangeleverde v2.1.0 (News First). v2.1.0 blijft de terugvalversie.

## Wat zit erin?

- Zoekbalk voor titels, samenvattingen, vertalingen, regio's en bronnen.
- Nieuwskaarten als **gelezen** markeren en **bewaren**. Filters Bewaard, Ongelezen en BE/EU-context.
- Status van gelezen/bewaard lokaal opgeslagen op **dit toestel** (geen cloudsync).
- Conflictdossiers onder *Historiek*, met artikelen per onderwerp en bij voldoende data een verschil in artikelaantallen sinds de vorige controle.
- Meer transparante automatische tekstaanduidingen: **claim**, **uitspraak/verwachting**, **officiële publicatie** of **nieuwsbericht**. Die etiketten zijn geen factcheck.
- Nieuwheidsscore daalt als een artikel al 24–48 uur in de feed zit (tenzij bron inhoudelijk bijwerkt). De scores blijven **voorlopige trefwoordscores**, geen geverifieerde veiligheidsalarmen.
- Belgische context: bestaande thematische screening behouden, nu ook snel te filteren op expliciete Belgische vermelding of EU-context; **geen bewijs van impact**.
- Aanvoer om ongeveer 08:10 en 18:10 via GitHub Actions, vertaling met Argos, bestaande ChatGPT-meldingen blijven **apart**.

## Grenzen

**Geen autonome AI-analyse of externe factchecking actief.** Zonder een eigen AI-verwerkingsdienst, model en bronverificatie kan deze gratis GitHub-collector geen betrouwbare inhoudelijke geopolitieke analyse leveren. Er is daarom geen gratis AI-model stilzwijgend toegevoegd, en er wordt niets naar een betaalde dienst verstuurd.

**Geen push vanuit de PWA.** De ChatGPT-taken zijn niet gekoppeld aan de JSON-feed; de data zijn onafhankelijke stromen.

**Publieke GitHub Pages:** de gepubliceerde nieuwsfeed is publiek leesbaar. Alleen favorieten/gelezen-status worden lokaal op je apparaat opgeslagen.

## Installatie

Zie `START_HIER_GITHUB.md`. Het meegeleverde pakket bevat **geen** `data/auto-news.json` en overschrijft je actuele historie bij het uploaden niet. Een volgende GitHub-run voegt nieuwe gestructureerde velden toe aan het bestaande bestand.

## Testen

De Node collector-tests, Python-vertaaltests en gesimuleerde mobiele Chromium-tests slagen. Werkelijke Argos-modelinstallatie en weergave in iOS Safari moeten op de eindinstallatie bevestigd worden. Test nooit met fictieve feiten op je publieke site.
