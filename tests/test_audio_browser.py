"""PWA English MP3 player browser simulation; tests API/UI, not iPhone loudspeaker."""
from pathlib import Path
from datetime import datetime, timezone
import json
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
feed = json.loads((root/'tests/fixture-feed.json').read_text(encoding='utf-8'))
now = datetime.now(timezone.utc).isoformat()
for item in feed['signals']:
    item['date'] = now
    item['firstSeen'] = now
feed['briefing'] = {'period': 'Avondcontrole'}

boot = '''<script>
const __state = {};
Object.defineProperty(window, 'localStorage',{configurable:true,value:{getItem:k=>__state[k]??null,setItem:(k,v)=>__state[k]=String(v),removeItem:k=>delete __state[k]}});
window.__playCalls = [];
HTMLMediaElement.prototype.play = function(){window.__playCalls.push({src:this.src,lang:document.getElementById('preferredLanguage').value}); this.dispatchEvent(new Event('playing')); return Promise.resolve()};
HTMLMediaElement.prototype.pause = function(){return undefined};
window.fetch = async url => String(url).includes('auto-news.json')?new Response(JSON.stringify(__DATA__),{status:200,headers:{'content-type':'application/json'}}):Promise.reject(Error('offline fixture'));
</script>'''.replace('__DATA__',json.dumps(feed,ensure_ascii=False))
html = (root/'index.html').read_text('utf-8').replace('<script>',boot+'\n<script>',1)
# Fake only the base URL in offline about:blank browser tests. Production uses location.href.
html = html.replace('new URL(kind===\'test\'?\'./icons/\'+file:\'./data/audio/\'+file,location.href)', 'new URL(kind===\'test\'?\'./icons/\'+file:\'./data/audio/\'+file,\'https://example.org/\')')
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in [320,375,390,430]:
        page=browser.new_page(viewport={'width':width,'height':850},is_mobile=True,has_touch=True)
        errors=[]
        page.on('pageerror',lambda e: errors.append(str(e)))
        page.set_content(html,wait_until='domcontentloaded')
        page.wait_for_function("document.getElementById('nImportant').textContent !== '—'")
        # English audio independent of selected Dutch news language.
        page.locator('#listenNews').click()
        page.wait_for_function("window.__playCalls.length>=1")
        assert 'important_en.mp3' in page.evaluate('window.__playCalls.at(-1).src')
        assert page.evaluate('window.__playCalls.at(-1).lang') == 'nl'
        assert page.locator('#audioDock').is_visible()
        assert page.locator('#englishAudio').get_attribute('controls') is not None
        page.locator('#audioClose').click()
        assert page.locator('#audioDock').is_hidden()
        # Trump category and language settings both work.
        page.locator('[data-tab="trump"]').click()
        page.locator('#listenNews').click()
        assert 'trump_en.mp3' in page.evaluate('window.__playCalls.at(-1).src')
        page.locator('[data-page="settings"]').click()
        page.locator('#preferredLanguage').select_option('en')
        page.locator('summary').filter(has_text='Engelse audio testen').click()
        page.locator('#ttsTest').click()
        assert 'speech-test-en.mp3' in page.evaluate('window.__playCalls.at(-1).src')
        page.locator('#ttsStop').click()
        page.locator('[data-page="news"]').click()
        page.locator('#briefToggle').click()
        page.locator('#briefPanel .brief-action').click()
        assert 'briefing_en.mp3' in page.evaluate('window.__playCalls.at(-1).src')
        assert not errors, (width,errors)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),width
        print('English audio mobile simulation:',width,'OK')
        page.close()
    browser.close()
