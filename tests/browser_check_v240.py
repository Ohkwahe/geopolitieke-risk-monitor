"""Offline iPhone-size test of the new short briefing and provenance filter."""
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).resolve().parent.parent
feed=json.loads((root/'tests/fixture-feed.json').read_text(encoding='utf-8'))
now=datetime.now(timezone.utc).isoformat()
for i,item in enumerate(feed['signals']):
    item['date']=now
    item['firstSeen']=now
    item['lastActivity']='new'
    item['sourceAudit']={'state':'primary_statement' if i==0 else 'similar_reporting' if i==1 else 'single_report','sourceNames':[item.get('source','X')],'verified':False,'explanation':'Publicatie is geen onafhankelijke bevestiging.'}
    item['official']=(i==0)
feed['schemaVersion']='2.4.0'
feed['history']=[{'at':now,'added':3,'changed':0,'sourcesOk':5}, {'at':now,'added':1,'changed':0,'sourcesOk':5}]
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
        assert page.locator('#briefPanel').is_hidden()
        page.locator('#briefToggle').click()
        assert page.locator('#briefPanel').is_visible(),width
        assert page.locator('#briefPanel .brief-link').count()>=1,width
        page.locator('#briefPanel .brief-link').first.click()
        page.locator('#newsCards article .details-toggle').first.click()
        assert 'Controleer het bronspoor' in page.locator('#newsCards article .detail.open').first.inner_text(),width
        page.locator('.extra-filters summary').click()
        page.locator('#sourceFilter').select_option('primary_statement')
        assert page.locator('#sourceFilter').input_value()=='primary_statement'
        assert page.locator('#newsCards article').count()<=1,width
        assert not errors,(width,errors)
        assert page.evaluate('document.body.scrollWidth <= innerWidth'),width
        # navigation and other existing behavior
        page.locator('[data-jump="trump"]').click()
        page.locator('[data-jump="below"]').click()
        page.locator('[data-page="settings"]').click()
        assert 'v3.0.4' in page.locator('#page-settings').inner_text()
        print('v2.4.0 brief/audit mobile OK',width)
        page.close()
    browser.close()
