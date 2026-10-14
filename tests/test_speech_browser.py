"""Simulated SpeechSynthesis regression; validates call sequence, UI and errors, not real iOS sound."""
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
import json
root=Path(__file__).resolve().parent.parent
feed=json.loads((root/'tests/fixture-feed.json').read_text('utf-8'))
now=datetime.now(timezone.utc).isoformat()
for item in feed['signals']:
    item['date']=now;item['firstSeen']=now
    item['translation']={'status':'translated','language':'nl','title':'Nederlandse testtitel','summary':'Dit is de Nederlandse test samenvatting.'}
feed['history']=[{'at':now,'added':1,'changed':0},{'at':now,'added':2,'changed':1}]
boot='''<script>
const __store={};
Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__store[k]??null,setItem:(k,v)=>{__store[k]=String(v)},removeItem:k=>delete __store[k]}});
window.__speechLog=[];window.__speechError=false;window.__speechAutoEnd=true;
class MockUtterance {constructor(text){this.text=text;this.lang='';this.volume=1;this.rate=1}}
Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:MockUtterance});
const __synth={speaking:false,pending:false, getVoices(){return [{lang:'nl-BE',name:'Nederlands teststem'},{lang:'en-US',name:'English test voice'}]},
 addEventListener(){},cancel(){window.__speechLog.push('cancel');this.speaking=false;this.pending=false},
 speak(u){window.__speechLog.push('speak:'+u.lang+':'+u.text);this.speaking=true;
 setTimeout(()=>{if(!this.speaking)return;u.onstart?.();if(window.__speechError){this.speaking=false;u.onerror?.({error:'synthesis-failed'});return;}if(window.__speechAutoEnd)setTimeout(()=>{if(!this.speaking)return;this.speaking=false;u.onend?.()},40)},10);
 }};
 Object.defineProperty(window,'speechSynthesis',{configurable:true,value:__synth});
window.fetch=async url=>String(url).includes('auto-news.json')?new Response(JSON.stringify(__DATA__),{status:200,headers:{'content-type':'application/json'}}):Promise.reject(Error('offline fixture'));
</script>'''.replace('__DATA__',json.dumps(feed,ensure_ascii=False))
html=(root/'index.html').read_text('utf-8').replace('<script>',boot+'\n<script>',1)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width in [320,375,390,430]:
  page=browser.new_page(viewport={'width':width,'height':820},is_mobile=True,has_touch=True)
  errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
  page.set_content(html,wait_until='domcontentloaded')
  page.wait_for_function("document.getElementById('nImportant').textContent !== '—'")
  # Test voice runs from a click and NEVER cancel immediately ahead of first utterance.
  page.locator('[data-page="settings"]').click()
  page.locator('summary').filter(has_text='Voorlezen testen').click()
  page.locator('#ttsTest').click()
  page.wait_for_function('window.__speechLog.some(x=>x.startsWith("speak:"))')
  calls=page.evaluate('window.__speechLog')
  assert calls[0].startswith('speak:nl-BE:'), calls
  assert 'cancel' not in calls[:1],calls
  page.wait_for_function('document.getElementById("ttsStatus").textContent.includes("voltooid")')
  assert 'teststem' in page.locator('#ttsVoices').inner_text()
  # Test English voice routing.
  page.locator('#preferredLanguage').select_option('en')
  page.locator('#ttsTest').click()
  page.wait_for_function('window.__speechLog.some(x=>x.startsWith("speak:en-US:"))')
  page.wait_for_function('document.getElementById("ttsStatus").textContent.includes("voltooid")')
  # Error messages actually appear.
  page.evaluate('window.__speechError=true')
  page.locator('#ttsTest').click()
  page.wait_for_function('document.getElementById("ttsStatus").textContent.includes("synthesis-failed")')
  # stop controls
  page.evaluate('window.__speechError=false; window.__speechAutoEnd=false')
  page.locator('#ttsTest').click()
  page.wait_for_function('document.getElementById("ttsStatus").textContent.includes("speelt af")')
  page.locator('#ttsStop').click()
  assert 'gestopt' in page.locator('#ttsStatus').inner_text()
  # Regular headlines play when clicked.
  page.locator('[data-page="news"]').click()
  page.locator('#listenNews').click()
  page.wait_for_function('window.__speechLog.filter(x=>x.startsWith("speak:")).length>=5')
  assert not errors,(width,errors)
  assert page.evaluate('document.body.scrollWidth<=innerWidth'),width
  print('Speech UI + simulated engine:',width,'OK')
  page.close()
 browser.close()
