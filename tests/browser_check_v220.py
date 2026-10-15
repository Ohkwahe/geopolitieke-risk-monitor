from playwright.sync_api import sync_playwright
from pathlib import Path
import json, os, shutil, tempfile, threading
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from datetime import datetime,timezone
root=Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory() as td:
    webroot=Path(td)
    for file in ('index.html','manifest.webmanifest','sw.js'):
        shutil.copy2(root/file,webroot/file)
    shutil.copytree(root/'icons',webroot/'icons')
    (webroot/'data').mkdir()
    doc=json.loads((root/'tests/fixture-feed.json').read_text())
    now=datetime.now(timezone.utc).isoformat()
    doc['generatedAt']=now
    docs=[('oekraine-rusland','Rusland – Oekraïne','claim','Claim of betwiste uitspraak'),('vs-beleid','VS-beleid','statement','Uitspraak of verwachting'),('china-taiwan','China – Taiwan','news_report','Nieuwsbericht'),('soedan','Soedan','official_source','Officiële mededeling')]
    for i,article in enumerate(doc['signals']):
        article['date']=now
        article['firstSeen']=now
        dossier=docs[i%len(docs)]
        article['dossier']={'id':dossier[0],'label':dossier[1]}
        article['evidence']={'kind':dossier[2],'label':dossier[3],'explanation':'Een voorbeelddossier zonder bevestiging.'}
    doc['history']=[{'at':now,'added':5,'changed':1,'sourcesOk':5,'grouped':0,'dossierCounts':{'oekraine-rusland':3,'vs-beleid':2}}]
    (webroot/'data/auto-news.json').write_text(json.dumps(doc))
    handler=partial(SimpleHTTPRequestHandler,directory=td)
    httpd=ThreadingHTTPServer(('127.0.0.1',0),handler)
    thread=threading.Thread(target=httpd.serve_forever,daemon=True);thread.start()
    url=(webroot/'index.html').as_uri()
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
        for w in (320,375,390,430):
            context=browser.new_context(viewport={'width':w,'height':850},is_mobile=True,has_touch=True,device_scale_factor=1)
            page=context.new_page();errs=[];page.on('pageerror',lambda exc:errs.append(str(exc)))
            boot = """<script>
const __local={};
Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__local[k]??null,setItem:(k,v)=>{__local[k]=String(v)},removeItem:k=>{delete __local[k]}}});
window.__sampleFeed = __FEED__;
window.fetch = async function(url){ if (String(url).includes('auto-news.json')) return new Response(JSON.stringify(window.__sampleFeed), {status:200, headers:{'content-type':'application/json'}}); throw new Error('Disabled network'); };
</script>""".replace('__FEED__',json.dumps(doc))
            page.set_content((root/'index.html').read_text().replace('<script>',boot+'\n<script>',1),wait_until='domcontentloaded')
            page.wait_for_function("document.getElementById('nImportant').textContent !== '—'",timeout=10000)
            assert not errs,(w,errs)
            dims=page.evaluate('({body:document.body.scrollWidth, viewport:innerWidth})')
            assert dims['body']<=dims['viewport'],(w,dims)
            page.locator('[data-jump="below"]').click()
            assert page.locator('#newsCards article').count()>=1
            page.locator('#newsSearch').fill('nonexiststhissearchq')
            assert page.locator('#newsCards article').count()==0
            page.locator('#newsSearch').fill('')
            page.locator('[data-jump="important"]').click()
            if page.locator('#newsCards article').count():
                page.locator('#newsCards article .card-action').first.click()
                assert page.locator('#newsCards article .card-action').first.get_attribute('aria-pressed')=='true'
                page.locator('#onlySaved').click()
                assert page.locator('#onlySaved').get_attribute('aria-pressed')=='true'
                assert page.locator('#newsCards article').count()>=1
                page.evaluate('window.__savedLocal = {...__local}')
                # Persistence is tested by recreating the document with the saved values.
                snapshot=page.evaluate('window.__savedLocal')
                reloaded=boot.replace('const __local={};','const __local='+json.dumps(snapshot)+';')
                page.set_content((root/'index.html').read_text().replace('<script>',reloaded+'\n<script>',1),wait_until='domcontentloaded')
                page.wait_for_function("document.getElementById('nImportant').textContent !== '—'",timeout=10000)
                assert page.locator('#newsCards article .card-action').first.get_attribute('aria-pressed')=='true'
            page.locator('[data-page="history"]').click()
            assert page.locator('#dossierTiles button').count()>=2,(w,page.locator('#dossierTiles').inner_text())
            page.locator('#dossierTiles button').first.click()
            assert page.locator('#dossierTiles button.active').count()==1
            page.locator('[data-page="settings"]').click()
            assert page.locator('#preferredLanguage').count()==1
            assert page.locator('#resetRead').count()==1
            context.close()
            print('Mobiele browser',w,'px OK')
        browser.close()
    httpd.shutdown()
