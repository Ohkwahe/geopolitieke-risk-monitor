/** Risk Monitor v1.1.0 — publicly available RSS headline collector.
 * No AI, no war-risk prediction, no automatic confirmation of events.
 * Run by GitHub Actions only. Uses Node.js standard library. */
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const SOURCES = [
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
  { name: 'Deutsche Welle', url: 'https://rss.dw.com/xml/rss-en-all' },
  { name: 'UN News', url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
  { name: 'Raad van de EU', url: 'https://www.consilium.europa.eu/en/rss/pressreleases.ashx' }
];
const PATH = 'data/auto-news.json';
const MAX_AGE_MS = 30 * 864e5;
const INITIAL_AGE_MS = 72 * 36e5;
const ONE_FEED_LIMIT = 90;
const LIMIT = 250;
const ENTITY = {amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘',hellip:'…'};
const decode = s => String(s || '').replace(/&#(x[\da-f]+|\d+);|&([\w-]+);/gi, (m,n,e) => {
  if (n) { const cp = n[0].toLowerCase()==='x' ? parseInt(n.slice(1),16):parseInt(n,10); return cp>0&&cp<=0x10ffff ? String.fromCodePoint(cp) : m; }
  return ENTITY[e] || m;
});
const clean = s => decode(String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const tag = (xml, name) => {
  const re = new RegExp('<(?:[\\w-]+:)?'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w-]+:)?'+name+'>','i');
  const m = xml.match(re); return m ? clean(m[1]) : '';
};
const entryLink = xml => {
  const basic = tag(xml,'link'); if (basic.startsWith('http')) return basic;
  const match = xml.match(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*\/?\s*>/i);
  return match ? decode(match[1]) : '';
};
function parseXml(xml) {
  const blocks = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(x => x[1]);
  if (!blocks.length) blocks.push(...[...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)].map(x => x[1]));
  return blocks.slice(0, ONE_FEED_LIMIT).map(x => ({
    title:tag(x,'title'), summary:tag(x,'description')||tag(x,'summary')||'',
    link:entryLink(x), date:tag(x,'pubDate')||tag(x,'published')||tag(x,'updated')
  })).filter(x => x.title && x.link.startsWith('https://'));
}
const term = (s, re) => re.test(s);
const RELEVANT = /\b(ukrain\w*|russi\w*|kremlin|nato|otan|iran\w*|israel\w*|palestin\w*|gaza|lebanon|hezbollah|houthi\w*|saudi\w*|yemen|taiwan\w*|china|chinese|beijing|north korea|pyongyang|kim jong|nuclear|missile\w*|military|troops|airstrike\w*|warfare|war\b|armed conflict|ceasefire|sanction\w*|cyberattack\w*|sabotage|defen[cs]e|belgium|belgian|trump|white house|tariff\w*|pentagon|naval|bombardment|drone strike\w*|invasion|peace talk\w*|hostages)\b/i;
const URGENT = /\b(war|missile|airstrike|bombardment|drone|invasion|ceasefire|sanction|nuclear|troops|military|attack|threat|security|cyberattack|sabotage|tariff|conflict)\b/i;
function classify(text) {
  if (term(text, /\b(trump|white house)\b/i) && !term(text, /\b(russia|ukraine|nato|iran|israel|gaza|taiwan|china|korea|missile|troops|war|middle east)\b/i))return {region:'amerika',topic:'trump'};
  if (term(text,/\b(ukrain\w*|russi\w*|kremlin|nato|otan|belgium|belgian|eu council|european union)\b/i))return {region:'europa',topic:'conflict'};
  if (term(text,/\b(iran\w*|israel\w*|palestin\w*|gaza|lebanon|hezbollah|houthi\w*|saudi\w*|yemen|syria|middle east)\b/i))return {region:'midden-oosten',topic:'conflict'};
  if (term(text,/\b(taiwan\w*|china|chinese|beijing|korea|pyongyang|kim jong|japan|philippines)\b/i))return {region:'azie',topic:'conflict'};
  if (term(text,/\b(sudan|congo|sahel|somalia|africa)\b/i))return {region:'afrika',topic:'conflict'};
  if (term(text,/\b(trump|washington|white house|us military|american)\b/i))return {region:'amerika',topic:'trump'};
  return {region:'overig',topic:'conflict'};
}
function safeHttp(url) {
  try { const u=new URL(url); return (u.protocol==='https:' && u.username==='' && u.password==='') ? u.href : null; }
  catch { return null; }
}
async function loadOld() {
  try {const data=JSON.parse(await fs.readFile(PATH,'utf8'));return Array.isArray(data.signals)?data.signals:[];} catch{return []}
}
async function fetchFeed(source) {
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
  try {const r=await fetch(source.url,{redirect:'follow',signal:controller.signal,headers:{'User-Agent':'RiskMonitor-PersonalNewsMonitor/1.1 (+GitHub Actions)','Accept':'application/rss+xml, application/xml, text/xml, */*'}});
    if (!r.ok) throw Error('HTTP '+r.status);const xml=await r.text();if(xml.length>4_000_000)throw Error('Feed te groot');
    return parseXml(xml).map(entry=>({...entry,source:source.name}));
  } finally {clearTimeout(timeout)}
}
const now=new Date(); const current=now.getTime();const existing=await loadOld();
const map=new Map(existing.filter(x=>x?.id&&new Date(x.date).getTime()>=current-MAX_AGE_MS).map(x=>[x.id,x]));
const status=[];let successful=0,newCount=0;
for (const source of SOURCES) {
  try {const entries=await fetchFeed(source); if (!entries.length)throw Error('Geen geldige feeditems');successful++;
    for (const e of entries) {
      const text=e.title+' '+e.summary;if (!RELEVANT.test(text))continue;
      const date=new Date(e.date),at=date.getTime();if (!Number.isFinite(at) || at>current+3600000 || at<current-MAX_AGE_MS)continue;
      // First publication ignores old feed backlog. Later polls retain relevant last 30 days.
      if (!existing.length && at<current-INITIAL_AGE_MS)continue;
      const link=safeHttp(e.link);if (!link)continue;
      const id='RSS-'+crypto.createHash('sha256').update(link).digest('hex').slice(0,22);
      if (map.has(id))continue;
      const info=classify(text);map.set(id,{id,date:date.toISOString(),region:info.region,topic:info.topic,
        title:e.title.slice(0,220),summary:e.summary.slice(0,360),source:e.source,url:link,
        firstSeen:now.toISOString(),status:'automatic_unverified'});newCount++;
    }
    status.push({name:source.name,ok:true,items:entries.length});
  }catch(e){console.warn(source.name+': '+e.message);status.push({name:source.name,ok:false,error:String(e.message).slice(0,120)})}
}
if(!successful)throw new Error('Geen enkele betrouwbare bron kon worden opgehaald; bestaande gegevens blijven onveranderd.');
const signals=[...map.values()].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,LIMIT);
await fs.mkdir('data',{recursive:true});
const result={schemaVersion:'1.1.0',type:'automated_headline_feed',generatedAt:now.toISOString(),
  sourcesOk:successful,sourcesTotal:SOURCES.length,newCount,notice:'Automatische headlines en RSS-samenvattingen, NIET onafhankelijk geverifieerd. Geen AI-risicoscore, geen veiligheidswaarschuwingen.',
  sources:status,signals};
await fs.writeFile(PATH,JSON.stringify(result,null,2)+'\n','utf8');
console.log(`Risk Monitor: ${successful}/${SOURCES.length} bronnen, ${newCount} nieuwe signalen, ${signals.length} totaal.`);
