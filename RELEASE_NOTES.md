# Risk Monitor v3.0.4 – Release notes

## Removed
- Engelse MP3-generator en alle bijbehorende UI-knoppen en tests.
- Audio-generatiestap met eSpeak NG en FFmpeg uit GitHub Actions.
- Dubbele tabnavigatie onder de drie bovenste nieuwstegels.

## Improved
- Rubriekselectie rechtstreeks met Belangrijke signalen / Trump – VS / Onder drempel.
- Visuele actieve toestand, compacte mobiele indeling, vers cachegeheugen v3.0.4.
- Onderhoudsregressietest in GitHub Actions.

## Retained
- Alle vijf nieuwsbronnen, vertaling NL/EN, tekstbriefing, zoekfilters, scorelogica, bronlinks, historiek, nieuwsplanning en instellingen.
- Geen wijziging aan live `data/auto-news.json`.
- Geen aanpassingen aan de afzonderlijke ChatGPT-alarmtaak of Bridge PoC.

## Deployment
Handmatig uploaden van **uitgepakte bestanden en mappen** (niet het ZIP-bestand zelf). Daarna verwijder je de oude audiobestanden uit de repository en test je de volgende Actions-run en de mobiele PWA.
