# Start hier – installeren via GitHub

1. Open de meegeleverde HTML-installer op Windows in Firefox; klik **Maak ZIP-pakket**.
2. Pak de ZIP uit. Open je bestaande GitHub-repository `Ohkwahe/geopolitieke-risk-monitor` → **Code** → **Add file** → **Upload files**.
3. Upload de volledige inhoud op `main`: zeker `index.html`, `sw.js`, `icons/speech-test-en.mp3`, `.github/workflows/update-news.yml` en `scripts/build-english-audio.py`. **Upload geen live `data/auto-news.json`.**
4. Klik **Commit changes**. Controleer apart onder **Code → .github → workflows → update-news.yml** dat de stap `Engelse audio voorbereiden (gratis, lokaal)` zichtbaar is. Verborgen `.github`-mappen gaan bij slepen soms niet mee.
5. Ga naar **Actions** → **Risk Monitor - nieuws ophalen en publiceren** → **Run workflow**, branch `main`. Controleer bij de groene run vooral de stap **Engelse audio voorbereiden (gratis, lokaal)**; die mag niet zijn overgeslagen of rood. De overige workflowstappen moeten ook slagen.
6. Open in Safari je GitHub Pages-site en ververs. Controleer **v3.0.3**. Open daarna de iPhone beginscherm-app opnieuw.
7. **Eerste test zonder nieuwsrun:** Instellingen → **Engelse audio testen en geluid oplossen** → **Test Engels geluid**. De test-MP3 is onderdeel van het pakket. Als het stil blijft, klik **Open het testgeluid rechtstreeks in Safari**.
8. **Nieuws-audio:** Nieuws → **Luister in Engels** of **Ochtend-/avondbriefing → Listen in English**. De audiobalk verschijnt met eigen play/pauze.
9. Werkt de Safari-test maar niet de beginscherm-app? Test voorlopig in Safari; dit kan samenhangen met iOS WebKit-PWA audio.

De gewone nieuwstaal (NL/EN), historiek en ChatGPT-notificaties blijven ongewijzigd. Geen extra account of abonnement.
