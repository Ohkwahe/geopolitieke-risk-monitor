# Release notes — v3.0.0

## Nieuw

- Automatisch gegenereerde ochtend-/avondbriefing op basis van gecontroleerd verzamelde headlines, niet op basis van geverifieerde feiten.
- Voorlezen van briefing vanuit uitklapbaar nieuwsoverzicht, met stopknop en lokale speech synthesis.
- Doorklikbare conflictdossiers onder de bestaande regiokaart.
- Optionele AI-duiding voor maximaal vier nieuwe belangrijke berichten per run; alleen bij expliciete configuratie in GitHub Secrets. Geen wijziging van risicoscores of verificatiestatus.
- Optionele ntfy-nieuwssignalen bij score ≥10/14, alleen met expliciet ingestelde geheime topicnaam. Werkt via afzonderlijke ntfy-app; native webpush niet inbegrepen.
- Nieuwe releasevalidatie en mobiele browsertest.

## Behouden

- Nederlandstalige Argos-vertaling en taalvoorkeur, originele bronlinks, drie nieuwstabbladen, opgeslagen nieuwsperiode, zoek/filterfuncties, favorieten/gelezen-status, trend- en historische dossiers.
- GitHub Actions-runs volgens bestaande Belgische planning en afzonderlijke ChatGPT-meldingen.
- Behoud van `data/auto-news.json` bij installatie: niet opgenomen in upgradepakket.

## Grenzen en vervolg

- Geen ingebouwde gratis en onafhankelijk controlerende AI-factchecker. Modelduiding blijft afhankelijk van een apart gekozen provider en diens voorwaarden.
- Geen native iOS-PWA-pushbackend of automatische overdracht van ChatGPT-notificaties naar GitHub. ntfy is een optionele externe meldingsroute.
- Vóór GO op gebruikerstoestel: één echte GitHub Actions-run, Nederlandse weergave, voorlezen, dossiers en optionele diensten indien ingesteld controleren.
