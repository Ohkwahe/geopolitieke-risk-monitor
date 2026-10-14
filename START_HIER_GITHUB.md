# v3.0.2 installeren op je bestaande GitHub

## Snelste methode — alleen workflow
1. Open GitHub → Code → `.github/workflows/update-news.yml` en klik op Edit (potloodje).
2. Vervang de regel met `-p 'test_*.py'` door `-p 'test_translate.py'`.
3. Commit naar `main` en start de workflow bij Actions opnieuw. Dit herstelt de fout al, zonder een volledige installatie.

## Volledige v3.0.2-upgrade
1. Open de HTML-installer op Windows in Firefox, klik op **Maak en download ZIP-pakket** en pak het uit.
2. Upload de uitgepakte inhoud naar je bestaande `geopolitieke-risk-monitor` op branch `main`, inclusief `.github` en `tests`.
3. Controleer het bijgewerkte bestand `.github/workflows/update-news.yml`; GitHub overschrijft verborgen mappen soms niet bij het slepen.
4. `data/auto-news.json` zit niet in de upgrade: behoud de bestaande live data.
5. Ga naar Actions → Risk Monitor - nieuws ophalen en publiceren → Run workflow.
6. De vijf vertaaltests moeten groen worden, daarna moet de workflow verder kunnen vertalen en publiceren.
7. Controleer op je iPhone of nieuws normaal verschijnt. Geen nieuwe app-installatie nodig.
