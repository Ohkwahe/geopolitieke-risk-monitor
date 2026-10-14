# GitHub-upgrade v2.4.0

1. Maak bij voorkeur eerst een kopie/backup van je werkende repository. De actieve v2.3.0 was nog een releasekandidaat; v2.4.0 is een doorontwikkeling, geen automatische GO.
2. Download en open `Risk_Monitor_v2.4.0_HTML_Installer.html` op je Windows-pc in Firefox.
3. Klik **Maak en download ZIP-pakket**, pak het ZIP uit en open de map met bestanden.
4. Open GitHub → `Ohkwahe/geopolitieke-risk-monitor` → Code → Add file → Upload files en upload de inhoud (niet de ZIP). Zorg dat `.github/workflows/update-news.yml` mee updatet. Commit naar `main`.
5. **Niet vervangen:** `data/auto-news.json`, want dit bestand bevat je live data en historiek (het zit niet in het upgradepakket).
6. Ga naar GitHub → Actions → **Risk Monitor - nieuws ophalen en publiceren** → **Run workflow**, branch `main`. Controleer groen vinkje.
7. In GitHub → Code → data → `auto-news.json` moet na de run `schemaVersion: "2.4.0"` staan. Open een artikel in het bestand en controleer `sourceAudit` met `verified: false`.
8. Open de GitHub Pages-site op je iPhone in Safari en vernieuw die. Sluit de beginscherm-PWA volledig en open opnieuw. Controleer het versienummer v2.4.0.
9. Open een nieuwssectie → **Kort overzicht van deze rubriek**. Tik een kop en controleer de kaart. Open **Toon details en bronnen** en controleer **Controleer het bronspoor**. Test de bronfilter en bestaande tabbladen.

Let op: de briefing is geen AI-factcheck. Er zijn geen nieuwe pushmeldingen of betalende diensten.
