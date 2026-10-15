"""v3.0.4: mobile offline browser test for tile-only navigation and retained news UI."""
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).resolve().parent.parent
feed=json.loads((root/'tests/fixture-feed.json').read_text(encoding='utf-8'))
now=datetime.now(timezone.utc).isoformat()
feed['generatedAt']=now
feed['history']=[{'at':now,'added':3,'changed':1,'sourcesOk':5}, {'at':now,'added':2,'changed':0,'sourcesOk':5}]
for row in feed['signals']:
    row['date']=now
    row['firstSeen']=now
    row['lastActivity']='new'
boot="""<script>
const __store={};
Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__store[k]??null,setItem:(k,v)=>{__store[k]=String(v)},removeItem:k=>{delete __store[k]}}});
window.fetch=async url=>String(url).includes('auto-news.json')?new Response(JSON.stringify(__FIXTURE__),{status:200,headers:{'content-type':'application/json'}}):Promise.reject(new Error('Offline fixture'));
</script>""".replace('__FIXTURE__',json.dumps(feed,ensure_ascii=False))
html=(root/'index.html').read_text(encoding='utf-8').replace('<script>',boot+'\n<script>',1)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in [320,375,390,430,768]:
        page=browser.new_page(viewport={'width':width,'height':850},is_mobile=(width<500),has_touch=(width<500))
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.set_content(html,wait_until='domcontentloaded')
        page.wait_for_function("document.getElementById('nImportant').textContent !== '—'",timeout=10000)
        assert page.locator('#newsTabs').count()==0
        assert page.locator('#listenNews').count()==0
        assert page.locator('#audioDock').count()==0
        assert page.locator('[data-jump]').count()==3
        for tab in ('important','trump','below'):
            tile=page.locator(f'[data-jump="{tab}"]')
            tile.click()
            assert tile.get_attribute('aria-pressed')=='true', (width,tab)
            assert page.locator('[data-jump][aria-pressed="true"]').count()==1
            assert page.locator('#newsCards article.card').count()>0, (width,tab)
        assert 'GEEN ALARM' in page.locator('#categoryIntro').inner_text()
        page.locator('#newsSearch').fill('Trump')
        assert page.locator('#newsSearch').input_value()=='Trump'
        page.locator('#newsSearch').fill('')
        page.locator('#briefToggle').click()
        assert page.locator('#briefPanel').is_visible()
        assert page.locator('#briefPanel .brief-action').count()==0
        page.locator('[data-page="settings"]').click()
        assert 'v3.0.4' in page.locator('#page-settings').inner_text()
        assert page.locator('#preferredLanguage').count()==1
        assert 'Engelse audio testen' not in page.locator('#page-settings').inner_text()
        page.locator('[data-page="regions"]').click()
        assert page.locator('#page-regions').is_visible(), (width,errors, page.locator('[data-page=regions]').get_attribute('class'),page.locator('#page-regions').get_attribute('class'))
        page.locator('[data-page="history"]').click()
        assert page.locator('#dossierTiles').is_visible()
        page.locator('[data-page="news"]').click()
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1'), width
        assert not errors, (width,errors)
        print(f'v3.0.4 {width}px: tile navigation, filters, briefing, pages, no audio — OK')
        if width==390:
            page.screenshot(path=str(root/'test_v304_mobile.png'),full_page=True)
        page.close()
    browser.close()
