/** Risk Monitor v3.0.0 — public RSS collector and transparent RULE-BASED triage.
 * No AI inference, no independently verified reports, no emergency alerts.
 * Runs in GitHub Actions. Node.js standard library only. */
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const SOURCES = [
  {name:'BBC News',url:'https://feeds.bbci.co.uk/news/world/rss.xml',official:false},
  {name:'The Guardian',url:'https://www.theguardian.com/world/rss',official:false},
  {name:'Deutsche Welle',url:'https://rss.dw.com/xml/rss-en-all',official:false},
  {name:'UN News',url:'https://news.un.org/feed/subscribe/en/news/all/rss.xml',official:true},
  {name:'Raad van de EU',url:'https://www.consilium.europa.eu/en/rss/pressreleases.ashx',official:true}
];
const PATH='data/auto-news.json';
const NOW=new Date();
const T=NOW.getTime();
const DAY=864e5;
const MAX_AGE=30*DAY, FIRST_AGE=3*DAY, MAX_ITEMS=300;
const ENTITIES={amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘',hellip:'…',bull:'•',euro:'€'};
export function textOnly(input='') {
  let s=String(input).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1')
    .replace(/<\/?(?:p|div|br|li|h[1-6])\b[^>]*>/gi,' · ')
    .replace(/<[^>]*>/g,' ')
    .replace(/!\[([^\]]+)\]\(https?:\/\/[^)]+\)/g,'$1')
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g,'$1')
    .replace(/https?:\/\/\S+/gi,'')
    .replace(/(?:^|\s)#{1,6}\s+/g,' ')
    .replace(/[\*`_]{1,3}/g,'');
  for(let i=0;i<2;i++)s=s.replace(/&#(x[\da-f]+|\d+);|&([\w-]+);/gi,(m,n,e)=>{
    if(n){let p=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):parseInt(n,10);return p>0&&p<0x110000?String.fromCodePoint(p):' ';}
    return ENTITIES[e?.toLowerCase()]??' ';
  });
  return s.replace(/<[^>]*>/g,' ').replace(/\s*·\s*(?:·\s*)+/g,' · ').replace(/\bRead more\b/gi,'').replace(/\s+/g,' ').replace(/^[\s·—–-]+|[\s·—–-]+$/g,'').trim();
}
const tag=(xml,name)=>{const r=new RegExp('<(?:[\\w-]+:)?'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w-]+:)?'+name+'>','i');return textOnly(xml.match(r)?.[1]||'');};
function linkFrom(xml){let m=xml.match(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["']/i);let value=m?.[1]||xml.match(/<link(?:\s[^>]*)?>([\s\S]*?)<\/link>/i)?.[1]||'';return value.trim().replace(/&amp;/g,'&');}
const validLink=u=>{try{const x=new URL(u);return x.protocol==='https:'&&!x.username&&!x.password&&x.href.length<2000?x.href:null;}catch{return null;}};
function parseFeed(xml) {
  const raw=[...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)].slice(0,100);
  return raw.map(x=>{let b=x[2];return {title:tag(b,'title'),summary:tag(b,'description')||tag(b,'summary'),date:tag(b,'pubDate')||tag(b,'published')||tag(b,'updated'),url:validLink(linkFrom(b))};}).filter(o=>o.title&&o.url);
}
const RELEVANT=/\b(ukrain\w*|russi\w*|kremlin|nato|otan|iran\w*|israel\w*|palestin\w*|gaza|lebanon|hezbollah|houthi\w*|saudi\w*|yemen|taiwan\w*|china|chinese|beijing|north korea|pyongyang|kim jong|nuclear|missile\w*|military|troops|airstrike\w*|warfare|war\b|armed conflict|ceasefire|sanction\w*|cyberattack\w*|sabotage|defen[cs]e|belgium|belgian|trump|white house|tariff\w*|pentagon|naval|bombardment|drone strike\w*|invasion|peace talk\w*|hostages|sudan|congo|diplomac\w*|security)\b/i;
const CONFLICT=/\b(ukrain\w*|russi\w*|kremlin|nato|otan|iran\w*|israel\w*|gaza|lebanon|hezbollah|houthi\w*|saudi\w*|yemen|taiwan\w*|north korea|pyongyang|missile|invasion|airstrike|troops|sudan|congo)\b/i;
function classify(t){
  let trump=/\b(trump|white house)\b/i.test(t);
  let topic=trump&&!CONFLICT.test(t)?'trump':'conflict';
  let region=/\b(ukrain\w*|russi\w*|kremlin|nato|otan|belgi\w*|european union)\b/i.test(t)?'europa':/\b(iran\w*|israel\w*|gaza|lebanon|houthi\w*|saudi\w*|yemen|syria|middle east)\b/i.test(t)?'midden-oosten':/\b(taiwan\w*|china|chinese|beijing|korea|japan|philippines)\b/i.test(t)?'azie':/\b(sudan|congo|sahel|somalia|africa)\b/i.test(t)?'afrika':trump?'amerika':'overig';
  return {topic,region};
}
const HAS={critical:/\b(nuclear launch|nuclear strike|nuclear attack|nuclear weapon deployed|nato territory attacked|attack on nato|invade nato|direct clash|belgium attacked)\b/i,
  major:/\b(invasion|invades|massive strike|massive attack|missile attack|airstrike|bombardment|war declared|strikes? on|killed|dead|military offensive|nuclear threat|attack on|blockade|troops deployed|sabotage|cyberattack)\b/i,
  moderate:/\b(missile|drone|military drills?|military exercise|forces|air defence|soldiers|security alert|escalat|threatens|mobilis|mobiliz|weapons|warship)\b/i,
  decision:/\b(signed|announced sanctions|introduced sanctions|passes bill|signed executive order|new tariffs|imposes tariffs|approved|enacted|declared|ordered|agreement signed|ceasefire agreed)\b/i,
  talk:/\b(says|claims|warns|may|could|suggests|weighs|considers|talks|negotiation|proposal|calls for|plans)\b/i};
const BELGIUM=/\b(belgi\w*|brussels|antwerp|flanders|flemish|zaventem)\b/i;
const EUROPE=/\b(eu|european union|europe|nato|otan|brussels|eurozone|eur)\b/i;
const ECON=/\b(energy|gas supply|oil supply|strait of hormuz|shipping|trade|tariff|trade war|cyberattack|sanction|pipeline|port|infrastructure|electricity|exports)\b/i;
const EXCLUSION=/\b(opinion|analysis|explainer|podcast|what we know|live blog|live updates|commentary)\b/i;
function clip(s,n){return s.length>n?s.slice(0,n-1).trim()+'…':s;}
function stemTokens(t){return [...new Set(t.toLowerCase().replace(/[^a-zà-ÿ0-9\s]/g,' ').split(/\s+/).filter(w=>w.length>=5&&!/^(about|after|before|amid|since|their|could|would|these|those|which|there|where|under|again|against|between|world|news|latest|while|today|says|russia|ukraine|israel|trump|china|nato)$/.test(w)))];}
function overlap(a,b){const A=new Set(stemTokens(a)),B=new Set(stemTokens(b));let n=0;for(let x of A)if(B.has(x))n++;return n/Math.max(1,Math.min(A.size,B.size));}
function crossSources(item,list){
  let listOfSources=new Set([item.source]);
  for(let other of list){if(other.source===item.source||other.region!==item.region||other.topic!==item.topic)continue;
    if(Math.abs(Date.parse(other.date)-Date.parse(item.date))>48*36e5)continue;
    // Correlation of headline wording is a signal, never proof of factual verification.
    if(overlap(item.title,other.title)>=0.76&&stemTokens(item.title).filter(t=>stemTokens(other.title).includes(t)).length>=4)listOfSources.add(other.source);
  }
  return [...listOfSources];
}
// v1.5.0 — explanation-first indicative Belgian exposure screening.
// Matches are topic indicators, NOT actual incidents in Belgium.
const BELGIUM_DOMAINS=[
 {key:'veiligheid',label:'Militaire veiligheid',re:/\b(nato|otan|military|troops|warship|missile|nuclear|invasion|airstrike|defence|defense)\b/i},
 {key:'cyber',label:'Cyber en sabotage',re:/\b(cyberattack|ransomware|hacking|hackers|sabotage|undersea cable|critical infrastructure)\b/i},
 {key:'energie',label:'Energie',re:/\b(oil|gas supply|energy|pipeline|electricity|strait of hormuz|lng|fuel prices|refinery)\b/i},
 {key:'economie',label:'Economie en handel',re:/\b(tariff|trade|sanction|exports|imports|shipping|port|supply chain|economy|inflation)\b/i},
 {key:'diplomatie',label:'Diplomatie',re:/\b(summit|ceasefire|treaty|talks|negotiation|diplomacy|agreement|peace deal)\b/i}
];
function assessBelgium(o){
 const t=o.title+' '+o.summary;
 const direct=BELGIUM.test(t);
 const european=EUROPE.test(t);
 const domains=BELGIUM_DOMAINS.filter(d=>d.re.test(t)).map(d=>({key:d.key,label:d.label}));
 const level=direct?'directe_vermelding':european?'europese_context':domains.length?'indirect_thema':'niet_vastgesteld';
 return {level,domains,explanation:direct?'België wordt in het bronfragment genoemd. Concrete impact is niet onafhankelijk bevestigd.':european?'Europese context genoemd. Belgische gevolgen zijn niet rechtstreeks vastgesteld.':domains.length?'Mogelijk relevant thema voor België, zonder bevestigde Belgische gevolgen.':'Geen concreet verband met België gevonden in titel of samenvatting.',verified:false};
}
// Conflict dossiers are topical indexes, not verified event clusters.
const TOPIC_DOSSIERS=[
 {id:'oekraine-rusland',label:'Rusland – Oekraïne',re:/\b(ukrain\w*|russi\w*|kremlin|zelensk\w*)\b/i},
 {id:'iran-regio',label:'Iran en de regio',re:/\b(iran\w*|tehran|houthi\w*|hormuz|saudi\w*|yemen)\b/i},
 {id:'israel-palestina',label:'Israël – Palestina',re:/\b(israel\w*|gaza|palestin\w*|hamas|west bank)\b/i},
 {id:'china-taiwan',label:'China – Taiwan',re:/\b(taiwan\w*|beijing|china|chinese)\b/i},
 {id:'korea',label:'Korea',re:/\b(korea|pyongyang|kim jong)\b/i},
 {id:'soedan',label:'Soedan',re:/\b(sudan|khartoum|darfur)\b/i},
 {id:'congo',label:'Congo',re:/\b(congo|kinshasa|goma|m23)\b/i},
 {id:'nato-europa',label:'NAVO en Europa',re:/\b(nato|otan|european union|belgium|brussels)\b/i},
 {id:'vs-beleid',label:'VS-beleid',re:/\b(trump|white house|pentagon|tariff\w*)\b/i}
];
function dossierFor(o){let t=o.title+' '+o.summary;let found=TOPIC_DOSSIERS.find(x=>x.re.test(t));return found?{id:found.id,label:found.label}:{id:'wereld',label:'Wereldwijde ontwikkelingen'};}
// An attributed claim is a claim in a headline, not an independently checked fact.
function evidenceFor(o){
 const t=o.title+' '+o.summary;
 if(/\b(alleges?|claims?|unverified|rumou?r|reportedly|according to|denies?|disputed)\b/i.test(t))return {kind:'claim',label:'Claim of betwiste uitspraak',explanation:'De berichtgeving bevat een toegeschreven of betwiste bewering. Raadpleeg de oorspronkelijke bron.'};
 if(o.official)return {kind:'official_source',label:'Officiële mededeling',explanation:'Een officiële instelling publiceert dit bericht; de daarin vermelde feiten zijn niet onafhankelijk gecontroleerd.'};
 if(/\b(says|warns|announces|plans|considers|may|could|would|expected)\b/i.test(o.title))return {kind:'statement',label:'Uitspraak of verwachting',explanation:'De kop verwijst naar een uitspraak of mogelijke ontwikkeling; dit is niet noodzakelijk een uitgevoerd besluit.'};
 return {kind:'news_report',label:'Nieuwsbericht',explanation:'Dit is een nieuwsbericht, geen zelfstandig geverifieerd feitenrapport.'};
}
function assess(o,seenSourceNames){
  const t=o.title+' '+o.summary;
  let military=HAS.critical.test(o.title)?4:HAS.major.test(o.title)?3:HAS.moderate.test(o.title)?2:/\b(war|conflict|military|nuclear|missile)\b/i.test(t)?1:0;
  if(o.topic==='trump'&&!CONFLICT.test(t))military=0;
  let belgium=BELGIUM.test(t)?3:(EUROPE.test(t)&&ECON.test(t))?2:EUROPE.test(t)||ECON.test(t)?1:0;
  // Broad indirect relevance is not established concrete impact.
  let novelty=2;
  if(HAS.decision.test(o.title)&&!HAS.talk.test(o.title))novelty=3;
  if(EXCLUSION.test(o.title))novelty=0;
  const firstSeen=Date.parse(o.firstSeen||o.date);
  if(Number.isFinite(firstSeen)&&T-firstSeen>48*36e5)novelty=(Number.isFinite(Date.parse(o.lastChangedAt))&&T-Date.parse(o.lastChangedAt)<24*36e5)?1:0;
  else if(Number.isFinite(firstSeen)&&T-firstSeen>24*36e5)novelty=Math.min(novelty,1);
  let reliability=seenSourceNames.length>=2?2:o.official?2:1;
  // Reliability 3 is never assigned automatically: corroboration is not verification.
  const total=military+belgium+novelty+reliability;
  const subjectIsTrump=o.topic==='trump';
  const importantTrump=subjectIsTrump&&novelty===3&&belgium>=1&&reliability>=2;
  const important= !subjectIsTrump&&total>=10&&reliability>=2;
  const pending= !subjectIsTrump&&total>=7&&reliability>=2;
  let category=important||importantTrump?'important':pending?'review':'below';
  // An automatically found article is always a SIGNAL, not a confirmed safety alert.
  let belowReason=reliability<2?'Voorlopig slechts één nieuwsbron; onafhankelijk bevestiging ontbreekt.':novelty===0?'Achtergrondbericht of analyse, geen nieuwe gebeurtenis.':total<7?'Geen voldoende nieuwe of concrete impact voor België.':subjectIsTrump?'Nog geen voldoende onderbouwd belangrijk besluit met Belgische gevolgen.':'Verdere beoordeling vereist.';
  let belgiumImpact=BELGIUM.test(t)?'België wordt expliciet genoemd; feitelijke gevolgen moeten worden gecontroleerd.':(EUROPE.test(t)&&ECON.test(t))?'Mogelijke Europese economische gevolgen; specifieke Belgische impact nog niet vastgesteld.':ECON.test(t)?'Potentieel indirecte gevolgen voor Belgische energie, handel of economie; niet bevestigd.':'Geen rechtstreekse Belgische impact vastgesteld in deze bron.';
  return {score:{military,belgium,novelty,reliability},total,category,belowReason,belgiumImpact,corroboratingSources:seenSourceNames,sourceEvidence:o.official?'official_publication':seenSourceNames.length>=2?'similar_headlines':'single_news_source',method:'rule_based_screening',verified:false};
}
async function loadOld(){try{let d=JSON.parse(await fs.readFile(PATH,'utf8'));return d&&typeof d==='object'?d:{};}catch{return {};}}
async function fetchFeed(source){if(process.env.RISK_MONITOR_FEEDS_DIR){const filename=source.name.replace(/[^A-Za-z0-9]+/g,'_')+'.xml';const xml=await fs.readFile(process.env.RISK_MONITOR_FEEDS_DIR+'/'+filename,'utf8');return parseFeed(xml).map(x=>({...x,source:source.name,official:source.official}));}const a=new AbortController();const timer=setTimeout(()=>a.abort(),12000);try{let r=await fetch(source.url,{signal:a.signal,headers:{'User-Agent':'RiskMonitor-v2.3-NonCommercial (+GitHub Actions)','Accept':'application/rss+xml,application/xml,text/xml,*/*'}});if(!r.ok)throw Error('HTTP '+r.status);let xml=await r.text();if(xml.length>4_000_000)throw Error('Feed te groot');return parseFeed(xml).map(x=>({...x,source:source.name,official:source.official}));}finally{clearTimeout(timer);}}

const old=await loadOld();
const oldSignals=Array.isArray(old.signals)?old.signals:[];
const map=new Map(oldSignals.filter(o=>o?.id&&Date.parse(o.date)>=T-MAX_AGE).map(o=>[o.id,o]));
const previousControlAt=Number.isFinite(Date.parse(old.generatedAt))?old.generatedAt:null;
const changedIds=new Set(), newIds=new Set();
const status=[];let ok=0,added=0,changed=0;
for(let source of SOURCES){try{const entries=await fetchFeed(source);if(!entries.length)throw Error('Feed bevat geen bruikbare items');ok++;
  for(let e of entries){if(!RELEVANT.test(e.title+' '+e.summary))continue;const timestamp=Date.parse(e.date);if(!Number.isFinite(timestamp)||timestamp>T+36e5||timestamp<T-MAX_AGE)continue;if(!oldSignals.length&&timestamp<T-FIRST_AGE)continue;
    const id='RSS-'+crypto.createHash('sha256').update(e.url).digest('hex').slice(0,22);
    const title=clip(textOnly(e.title),220),summary=clip(textOnly(e.summary),420);
    if(map.has(id)){
      const earlier=map.get(id);
      if(earlier.title!==title||earlier.summary!==summary){
        earlier.title=title;earlier.summary=summary;delete earlier.aiAnalysis;earlier.lastChangedAt=NOW.toISOString();changedIds.add(id);changed++;
      }
      continue;
    }
    let c=classify(title+' '+summary);
    map.set(id,{id,title,summary,date:new Date(timestamp).toISOString(),firstSeen:NOW.toISOString(),source:e.source,official:e.official,url:e.url,topic:c.topic,region:c.region,status:'automatic_unverified'});newIds.add(id);added++;
  }
  status.push({name:source.name,ok:true,items:entries.length});
 }catch(err){console.warn(source.name+': '+err.message);status.push({name:source.name,ok:false,error:String(err.message).slice(0,100)});}}
if(!ok)throw Error('Alle nieuwsfeeds zijn onbereikbaar; geen verouderde publicatie overschrijven.');
const entries=[...map.values()].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,MAX_ITEMS);
for(const e of entries){e.title=clip(textOnly(e.title),220);e.summary=clip(textOnly(e.summary),420);e.official=!!(SOURCES.find(s=>s.name===e.source)?.official);Object.assign(e,classify(e.title+' '+e.summary));Object.assign(e,assess(e,crossSources(e,entries)));e.belgiumAssessment=assessBelgium(e);e.dossier=dossierFor(e);e.evidence=evidenceFor(e);
 // Previous-run change detection is computed from real collector differences.
 e.lastActivity=newIds.has(e.id)?'new':changedIds.has(e.id)?'updated':'unchanged';
 e.lastActivityAt=e.lastActivity==='new'?e.firstSeen:e.lastActivity==='updated'?e.lastChangedAt:null;
 e.reviewStatus='unverified';
 e.reviewBasis=e.official?'official_publication':e.corroboratingSources.length>1?'similar_headlines':'single_media_report';
}
// Group only near-identical headlines about the same likely event within 24 hours.
// Keep every original article in JSON; collapse duplicates only in presentation.
// This is string similarity, NEVER factual corroboration or verification.
function deduplicateStories(items){
  for(const x of items){delete x.duplicateOf;delete x.relatedCoverage;}
  let hidden=0;
  for(let i=0;i<items.length;i++){
    const anchor=items[i];if(anchor.duplicateOf)continue;
    for(let j=i+1;j<items.length;j++){
      const other=items[j];if(other.duplicateOf||other.source===anchor.source||other.region!==anchor.region||other.topic!==anchor.topic)continue;
      if(Math.abs(Date.parse(other.date)-Date.parse(anchor.date))>24*36e5)continue;
      const a=new Set(stemTokens(anchor.title)),b=new Set(stemTokens(other.title));
      const common=[...a].filter(x=>b.has(x)).length;
      if(common<4||overlap(anchor.title,other.title)<0.84)continue;
      other.duplicateOf=anchor.id;
      if(!Array.isArray(anchor.relatedCoverage))anchor.relatedCoverage=[];
      anchor.relatedCoverage.push({id:other.id,source:other.source,title:other.title,url:other.url,date:other.date});
      if(anchor.lastActivity==='unchanged'&&other.lastActivity!=='unchanged'){anchor.lastActivity='related';anchor.lastActivityAt=NOW.toISOString();}
      hidden++;
    }
  }
  return hidden;
}
const grouped=deduplicateStories(entries);
// Source audit is an evidence trail, NOT AI verification or confirmation.
// Store only feed-observed evidence and links that were actually collected.
for(const item of entries){
 const related=(Array.isArray(item.relatedCoverage)?item.relatedCoverage:[]).filter(x=>x?.url&&x?.source);
 const sourceNames=[...new Set([item.source,...related.map(x=>x.source)])];
 const state=item.official?'primary_statement':sourceNames.length>=2?'similar_reporting':'single_report';
 const explanation=state==='primary_statement'
   ?'Publicatie van een officiële instelling. Dit bevestigt de publicatie, niet automatisch iedere bewering.'
   :state==='similar_reporting'
     ?'Meerdere media publiceerden vergelijkbare koppen. Onafhankelijke feitencontrole is niet vastgesteld.'
     :'Eén bronartikel beschikbaar. Zoek verdere onafhankelijke bevestiging alvorens conclusies te trekken.';
 item.sourceAudit={state,sourceNames,linkedArticles:1+related.length,
   publishedAt:item.date,firstSeenAt:item.firstSeen,lastChangedAt:item.lastChangedAt||null,
   verified:false,explanation};
}

const past=Array.isArray(old.history)?old.history.filter(x=>x&&Number.isFinite(Date.parse(x.at))).slice(-119):[];
const history=[...past,{at:NOW.toISOString(),added,changed,total:entries.length,grouped,dossierCounts:Object.fromEntries([...new Set(entries.map(e=>e.dossier.id))].map(id=>[id,entries.filter(e=>e.dossier.id===id&&!e.duplicateOf).length])),important:entries.filter(x=>x.category==='important').length,review:entries.filter(x=>x.category==='review').length,below:entries.filter(x=>x.category==='below').length,sourcesOk:ok}].slice(-120);
const result={schemaVersion:'3.0.0',type:'automated_headline_feed',generatedAt:NOW.toISOString(),previousControlAt,sourcesOk:ok,sourcesTotal:SOURCES.length,newCount:added,updatedCount:changed,
 notice:'Automatische regelgebaseerde voorselectie van nieuwsheadlines; GEEN onafhankelijke verificatie, officiële dreigingsscore of AI-analyse. Schattingen zijn geen vastgestelde gevolgen.',
 sources:status,quality:{verifiedReports:0,sourceFailures:SOURCES.length-ok,groupedSimilarItems:grouped,assessment:'rule_based_unverified',belgiumScreening:'topic_matches_not_confirmed_effects',sourceAudit:'observed_rss_links_only'},history,signals:entries};
await fs.mkdir('data',{recursive:true});
await fs.writeFile(PATH,JSON.stringify(result,null,2)+'\n','utf8');
console.log(`Risk Monitor 2.4.0: bronnen ${ok}/${SOURCES.length}, nieuw ${added}, gewijzigd ${changed}, total ${entries.length}, belangrijke signalen ${entries.filter(x=>x.category==='important').length}.`);
