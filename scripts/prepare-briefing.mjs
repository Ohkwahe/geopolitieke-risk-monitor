/** Build a factual headline-based briefing after translation; no AI verification. */
import fs from 'node:fs/promises';
const PATH='data/auto-news.json';
const data=JSON.parse(await fs.readFile(PATH,'utf8'));
const items=(data.signals||[]).filter(x=>x?.id&&!x.duplicateOf);
const now=new Date(data.generatedAt||Date.now());
const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Brussels',hour:'2-digit',hourCycle:'h23'}).format(now));
const period=hour<13?'Ochtendcontrole':'Avondcontrole';
const within=x=>{let d=Date.parse(x.firstSeen||x.date);return Number.isFinite(d)&&d>=now.getTime()-36*3600000};
const sort=(a,b)=>Number(b.total||0)-Number(a.total||0)||Date.parse(b.date)-Date.parse(a.date);
const important=items.filter(x=>x.topic!=='trump'&&['important','review'].includes(x.category)).sort(sort);
const trump=items.filter(x=>x.topic==='trump').sort(sort);
const below=items.filter(x=>x.category==='below').sort((a,b)=>Date.parse(b.firstSeen||b.date)-Date.parse(a.firstSeen||a.date));
const headlineIds=list=>list.filter(within).slice(0,6).map(x=>x.id);
data.schemaVersion='3.0.0';
data.briefing={createdAt:now.toISOString(),period,kind:'headline_selection_unverified',verified:false,
 counts:{important:important.length,trump:trump.length,below:below.length},
 important:headlineIds(important),trump:headlineIds(trump),below:headlineIds(below),
 disclaimer:'Geselecteerde RSS-koppen. Geen onafhankelijke feitencontrole of officieel veiligheidsalarm.'};
data.quality={...data.quality,aiEnrichment:data.quality?.aiEnrichment||'not_configured',pushService:'not_configured'};
await fs.writeFile(PATH,JSON.stringify(data,null,2)+'\n');
console.log('Headlinebriefing klaar:',period,JSON.stringify(data.briefing.counts));
