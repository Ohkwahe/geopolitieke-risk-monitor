# Risk Monitor v3.0.3 – English Audio Fix

**Status:** releasekandidaat. De werkelijke audioweergave op de iPhone moet nog bevestigd worden.

## Waarom deze correctie

De vorige versies gebruikten `speechSynthesis` van iOS Safari. Omdat dat bij de gebruiker ook na een eerdere correctie stil bleef, gebruikt deze release echte Engelse MP3-bestanden.

- Standaardtaal voor de *tekst* blijft instelbaar op Nederlands of Engels.
- Gesproken audioberichten zijn **altijd Engels**, ongeacht de teksttaal.
- De app speelt gewone MP3-bestanden af met een zichtbare, bedienbare audiobalk.
- De test-MP3 zit in het installatiepakket, zodat je geluid meteen kunt testen.
- Nieuws-MP3's worden door GitHub Actions gemaakt bij iedere RSS-controle (eSpeak NG en FFmpeg, offline, gratis).
- De Engelse stem klinkt eenvoudiger/robotischer dan een commerciële AI-stem.
- Headlines worden uit de originele RSS-teksten voorgelezen; de audiobestanden zijn vooraf gegenereerd en volgen niet alle persoonlijke filters of taalweergave van de app.
- Bij een probleem toont de app een fout en een rechtstreekse Safari-testlink.

**Zonder extra API-sleutel of abonnement.** De automatische nieuwsanalyse en feitencontrole blijven ongewijzigd; voorgelezen koppen zijn niet onafhankelijk geverifieerd.

## GitHub-upgrade

Zie `START_HIER_GITHUB.md`. Bestaande `data/auto-news.json` en historiek niet overschrijven.

## Beperkingen

Safari en iOS-PWA's kunnen audioproblemen hebben. Een browsertest bewijst niet dat je iPhone luidspreker daadwerkelijk geluid geeft. De ingebouwde Safari-testlink helpt dit te onderscheiden. Nieuwe nieuws-audio verschijnt pas na een geslaagde GitHub-actie met de stap **Engelse audio voorbereiden**.
