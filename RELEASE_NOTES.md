# Release notes – v3.0.3

## Fixed
- Stop met de stille iPhone-`speechSynthesis`-spraakmotor als primaire voorleesroute.
- Geluidstest gebruikt meegeleverd echt Engels MP3-bestand.
- Nieuws- en briefingknoppen gebruiken gepubliceerde Engelse MP3-bestanden.
- Zichtbare audio-balk met handmatige play/pauze en stop, inclusief foutstatus.
- Service worker vraagt audio steeds vers op.

## New
- Script `scripts/build-english-audio.py` voor vier Engelstalige MP3-briefings.
- Automatische synthese via eSpeak NG en FFmpeg in GitHub Actions (geen API-kosten).
- Tests voor audiogenerator en browserplayer.

## Unchanged
- Nederlandstalige vertaling en weergavekeuze, nieuwsbriefing, bronnen, scores, waarschuwingen, historiek, controles 08:10/18:10.
- `data/auto-news.json` blijft buiten het installatiepakket.

## Known limitations
- Alleen korte, vooraf gegenereerde English headlinebriefings per rubriek, maximaal 6 artikelen.
- eSpeak klinkt elektronisch en is niet vergelijkbaar met AI-spraak.
- iPhone PWA-audio kan afhangen van de iOS-versie; test zowel in Safari als vanaf beginscherm.
- AI-factchecking en zelfstandige geverifieerde veiligheidswaarschuwingen worden niet toegevoegd.
