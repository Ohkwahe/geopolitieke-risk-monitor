"""Optional manual Playwright smoke test: python tests/browser_smoke.py"""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
base=json.loads((ROOT/'tests'/'fixture-feed.json').read_text(encoding='utf-8'))
for idx,item in enumerate(base['signals']):
    if idx % 2 == 0:
        item['translation']={'status':'translated','language':'nl','sourceHash':'test-fingerprint','title':'NEDERLANDS: '+item['title'],'summary':'NEDERLANDS: '+item.get('summary','')}
base['translation']={'engine':'Argos Translate en→nl','translatedThisRun':4,'pending':2,'status':'partial'}
markup=(ROOT/'index.html').read_text(encoding='utf-8').replace("FEED='./data/auto-news.json'", "FEED='https://example.org/data/auto-news.json'")
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in (320,375,390,430,768):
        page=browser.new_page(viewport={'width':width,'height':844},device_scale_factor=1,is_mobile=(width<500),has_touch=(width<500))
        errors=[]
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.route('https://example.org/data/auto-news.json**',lambda route:route.fulfill(status=200,content_type='application/json',body=json.dumps(base,ensure_ascii=False)))
        page.set_content(markup,wait_until='load')
        page.wait_for_function("document.getElementById('nImportant').textContent !== '—'")
        assert not errors, errors
        size=page.evaluate('({scroll: document.documentElement.scrollWidth, inner: window.innerWidth})')
        assert size['scroll']<=size['inner']+1,(width,size)
        assert page.locator('.card').count(), 'no cards'
        translated=page.locator('.card .original-toggle')
        if translated.count():
            first=translated.first
            card=first.locator('xpath=ancestor::article')
            assert card.locator('h3').inner_text().startswith('NEDERLANDS:'),card.locator('h3').inner_text()
            first.click()
            assert not card.locator('h3').inner_text().startswith('NEDERLANDS:')
            first.click()
            assert card.locator('h3').inner_text().startswith('NEDERLANDS:')
        for tab in ('trump','below'):
            page.locator(f'[data-tab="{tab}"]').click()
            assert page.locator('article.card').count()>0,(tab,width)
        page.locator('[data-page="settings"]').click()
        assert 'Argos Translate' in page.locator('#translateDetail').inner_text()
        if width==390:
            page.locator('[data-page="news"]').click()
            page.locator('[data-tab="important"]').click()
            page.screenshot(path=str(ROOT / 'test_mobiel_v1.3.0.png'),full_page=True)
        print(f'{width}px: OK / geen horizontaal scrollen / NL-EN-knop / tabs / instellingen')
        page.close()
    browser.close()
