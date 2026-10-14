"""v2.3 mobile smoke for change navigation. Uses synthetic facts and no network."""
from playwright.sync_api import sync_playwright
from pathlib import Path
from datetime import datetime, timezone
import json
root=Path(__file__).resolve().parent.parent
feed=json.loads((root/'tests/fixture-feed.json').read_text())
now=datetime.now(timezone.utc).isoformat()
for i,item in enumerate(feed['signals']):
    item['date']=now
    item['firstSeen']=now
    item['lastActivity']=['new','updated','related','unchanged'][i%4]
    item['reviewStatus']='unverified'
    item['reviewBasis']='single_media_report'
feed['schemaVersion']='2.3.0'
feed['previousControlAt']=now
feed['history']=[{'at':now,'added':2,'changed':0,'sourcesOk':5},
                 {'at':now,'added':1,'changed':1,'sourcesOk':5}]
boot="""<script>
const __local={};
Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__local[k]??null,setItem:(k,v)=>{__local[k]=String(v)},removeItem:k=>{delete __local[k]}}});
window.__sampleFeed = __FEED__;
window.fetch = async function(url){ if (String(url).includes('auto-news.json')) return new Response(JSON.stringify(window.__sampleFeed), {status:200, headers:{'content-type':'application/json'}}); throw new Error('Network disabled'); };
</script>""".replace('__FEED__',json.dumps(feed,ensure_ascii=False))
html=(root/'index.html').read_text().replace('<script>',boot+'\n<script>',1)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in (320,375,390,430):
        context=browser.new_context(viewport={'width':width,'height':840},is_mobile=True,has_touch=True)
        page=context.new_page();errors=[];page.on('pageerror',lambda x:errors.append(str(x)))
        page.set_content(html,wait_until='domcontentloaded')
        page.wait_for_function("document.getElementById('nImportant').textContent !== '—'")
        assert not errors,(width,errors)
        assert page.evaluate('document.body.scrollWidth <= innerWidth'),width
        assert page.locator('#changeStrip').is_visible(),width
        assert page.locator('#listenNews').count()==1
        assert '1 nieuw' in page.locator('#changeSummary').inner_text()
        page.locator('[data-tab="important"]').click()
        allcount=page.locator('#newsCards article').count()
        page.locator('#onlyChanged').click()
        assert page.locator('#onlyChanged').get_attribute('aria-pressed')=='true'
        assert page.locator('#newsCards article').count()<=allcount
        if page.locator('#newsCards article').count():
            assert page.locator('#newsCards article .activity-label').count()>=1
            page.locator('#newsCards article .details-toggle').first.click()
            assert 'Niet onafhankelijk geverifieerd' in page.locator('#newsCards article .detail.open').first.inner_text()
        page.locator('#onlyChanged').click()
        assert page.locator('#onlyChanged').get_attribute('aria-pressed')=='false'
        page.locator('[data-tab="trump"]').click()
        assert page.locator('#newsCards article').count()>=1
        page.locator('[data-tab="below"]').click()
        assert page.locator('#newsCards article').count()>=1
        page.locator('[data-page="settings"]').click()
        assert page.locator('#preferredLanguage').count()==1
        assert 'v2.3.0' in page.locator('#page-settings').inner_text()
        context.close()
        print('v2.3.0 mobile OK',width)
    browser.close()
