/** Optional iPhone notifications via ntfy external app. Never claims verified alarm.
 * Only sends new, high-scoring RSS signals; disabled unless topic configured.
 */
import fs from 'node:fs/promises';
const topic=process.env.RISK_NTFY_TOPIC;
const STATE='data/notification-state.json';
if(!topic){console.log('ntfy meldingen UIT (opt-in).');process.exit(0)}
if(!/^[A-Za-z0-9_-]{20,120}$/.test(topic))throw Error('RISK_NTFY_TOPIC moet 20–120 willekeurige tekens bevatten');
const data=JSON.parse(await fs.readFile('data/auto-news.json','utf8'));
let prior={ids:[]};try{prior=JSON.parse(await fs.readFile(STATE,'utf8'))}catch{}
const seen=new Set(Array.isArray(prior.ids)?prior.ids:[]);
const threshold=Math.max(10,Math.min(14,Number(process.env.RISK_NTFY_THRESHOLD)||10));
const candidates=data.signals.filter(x=>!x.duplicateOf&&x.lastActivity==='new'&&x.total>=threshold
 &&x.score?.reliability>=2&&x.sourceAudit?.state!=='single_report'&&!seen.has(x.id));
const msg=candidates.slice(0,3);
if(!msg.length){console.log('Geen nieuwe signalen boven ntfy-drempel.');process.exit(0)}
const title='Risk Monitor · nieuwe signalen (niet geverifieerd)';
const lines=msg.map(x=>`${String(x.title).slice(0,135)} (${x.total}/14 voorlopig)`);
const payload={topic,title,message:lines.join('\n')+'\nBronnen controleren in Risk Monitor.',priority:3,tags:['newspaper'],
 click:'https://'+String(process.env.GITHUB_REPOSITORY||'').split('/')[0]+'.github.io/'+String(process.env.GITHUB_REPOSITORY||'').split('/')[1]+'/'};
if(!process.env.GITHUB_REPOSITORY)delete payload.click;
const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
try{const r=await fetch('https://ntfy.sh/',{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
 if(!r.ok)throw Error('ntfy HTTP '+r.status);
 const ids=[...new Set([...seen,...msg.map(x=>x.id)])].slice(-500);
 await fs.mkdir('data',{recursive:true});await fs.writeFile(STATE,JSON.stringify({ids,updatedAt:new Date().toISOString()},null,2)+'\n');
 console.log('ntfy: signalen verstuurd:',msg.length);
}finally{clearTimeout(timer)}
