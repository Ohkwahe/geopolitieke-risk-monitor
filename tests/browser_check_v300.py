"""Browser regression for v3.0.0 on mobile widths, no live APIs."""
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
import json, re
root=Path(__file__).resolve().parent.parent
feed=json.loads((root/'tests/fixture-feed.json').read_text(encoding='utf-8'))
now=datetime.now(timezone.utc).isoformat()
for i,item in enumerate(feed['signals']):
    item['date']=now; item['firstSeen']=now;item['lastActivity']='new'
    item['sourceAudit']={'state':'primary_statement' if i==0 else 'similar_reporting' if i==1 else 'single_report',
                         'sourceNames':[item.get('source','X')], 'verified':False,'explanation':'Onbevestigd bronspoor'}
    item['official']=(i==0)
    item['dossier']={'id': 'oekraine-rusland' if i<2 else 'china-taiwan', 'label':'Rusland – Oekraïne' if i<2 else 'China – Taiwan'}
feed['schemaVersion']='3.0.0'
feed['briefing']={'createdAt':now,'period':'Avondcontrole','kind':'headline_selection_unverified','verified':False,'important':[]}
feed['history']=[{'at':now,'added':3,'changed':0,'sourcesOk':5},{'at':now,'added':1,'changed':0,'sourcesOk':5}]
boot="""<script>
const __state={};
Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__state[k]??null,setItem:(k,v)=>{__state[k]=String(v)},removeItem:k=>{delete __state[k]}}});
window.fetch=async url=>String(url).includes('auto-news.json')?new Response(JSON.stringify(__DATA__),{status:200,headers:{'content-type':'application/json'}}):Promise.reject(new Error('Offline test'));
</script>""".replace('__DATA__',json.dumps(feed,ensure_ascii=False))
html=(root/'index.html').read_text(encoding='utf-8').replace('<script>',boot+'\n<script>',1)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in [320,375,390,430]:
        page=browser.new_page(viewport={'width':width,'height':850},is_mobile=True,has_touch=True)
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.set_content(html,wait_until='domcontentloaded')
        page.wait_for_function("document.getElementById('nImportant').textContent !== '—'")
        page.locator('#briefToggle').click()
        assert page.locator('#briefPanel').is_visible()
        assert page.locator('#briefPanel .brief-link').count()>0
        assert page.locator('#briefPanel .brief-action').count()==1
        page.locator('[data-tab="trump"]').click()
        page.locator('[data-tab="below"]').click()
        page.locator('[data-page="regions"]').click()
        assert page.locator('#hotspotButtons').is_visible()
        assert page.locator('#hotspotButtons button').count()>=1
        page.locator('#hotspotButtons button').first.click()
        assert page.locator('#page-history').is_visible()
        assert page.locator('#dossierTiles').is_visible()
        page.locator('[data-page="settings"]').click()
        assert 'v3.0.0' in page.locator('#page-settings').inner_text()
        assert page.locator('#preferredLanguage').is_visible()
        assert page.locator('summary').filter(has_text='Meldingen').count()==1
        page.locator('#preferredLanguage').select_option('en')
        assert page.evaluate("localStorage.getItem('risk_monitor_language_v2')")=='en'
        page.locator('[data-page="news"]').click()
        page.locator('#period').select_option('1')
        assert page.evaluate("localStorage.getItem('risk_monitor_period_v2')")=='1'
        assert not errors,(width,errors)
        assert page.evaluate('document.body.scrollWidth <= innerWidth'),width
        print('v3.0.0 mobile OK',width)
        page.close()
    browser.close()
