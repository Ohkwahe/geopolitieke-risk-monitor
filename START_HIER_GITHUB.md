# INSTALLATIE – Risk Monitor v3.0.4

1. Maak voor de zekerheid een back-up van de huidige GitHub-repository of maak een nieuwe onderhoudsbranch.
2. Pak `Risk_Monitor_v3.0.4_GitHub_Upgrade.zip` **lokaal uit**. Upload niet het ZIP-bestand als bestand naar de repository.
3. Open GitHub → `Ohkwahe/geopolitieke-risk-monitor` → **Add file → Upload files**.
4. Sleep de **inhoud** van de uitgepakte map (alle bestanden én submappen inclusief verborgen `.github/workflows`) naar GitHub. Bevestig dat de paden behouden blijven en vervang de gelijknamige bestanden. Eventueel moet je `.github/workflows/update-news.yml` afzonderlijk via de editor vervangen.
5. **NIET wijzigen/verwijderen:** `data/auto-news.json`, `data/notification-state.json`, andere bestanden onder `data/` en je GitHub Secrets of Pages-instellingen. Live data zit bewust NIET in de ZIP.
6. **Wél verwijderen indien nog aanwezig:** `scripts/build-english-audio.py`, `icons/speech-test-en.mp3`, `tests/test_audio_browser.py`, `tests/test_audio_generator.py` en `tests/test_speech_browser.py`. Verwijder eventuele oude gegenereerde `data/audio/`-MP3's pas na back-up en controle dat het geen andere bestanden betreft.
7. Commit naar je gekozen branch en controleer de workflow. Na GO/test kun je de branch naar `main` brengen. De geplande workflow draait alleen op `main`.
8. GitHub Actions → `Risk Monitor - nieuws ophalen en publiceren` → **Run workflow**. Controleer dat `Tests` en `Publiceer GitHub Pages` groen zijn, en dat de audio-stap ontbreekt.
9. Controleer `BUILDINFO.json` (v3.0.4) en open de webapp via Safari en de iPhone-beginschermknop. Tik op alle drie nieuwstegels en controleer de bijhorende artikelen, bronlinks, historiek en je bewaarde items.

**Let op:** als de browser weigert een volledige map te uploaden, gebruik in GitHub voor elk gewijzigd tekstbestand de editor of gebruik GitHub Desktop op een eigen toestel. Upload geen uitgepakte `data/`-map uit een oudere versie.
