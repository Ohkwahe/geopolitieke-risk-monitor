/** v3 smoke: builds feed from local offline RSS fixtures and runs optional steps disabled. */
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'risk-v300-'));const feeds=path.join(dir,'feeds');
try{
 await fs.mkdir(feeds);
 const date=new Date().toUTCString();
 const sources=['BBC_News','The_Guardian','Deutsche_Welle','UN_News','Raad_van_de_EU'];
 for(let i=0;i<sources.length;i++){
  const xml=`<rss><channel><item><title>Ukraine Russia NATO new ceasefire discussions announced</title><description>Security diplomacy and energy situation ${i}</description><pubDate>${date}</pubDate><link>https://example.org/${sources[i]}/a</link></item></channel></rss>`;
  await fs.writeFile(path.join(feeds,sources[i]+'.xml'),xml);
 }
 const run=(script,env={})=>{
  const x=spawnSync(process.execPath,[path.join(root,'scripts',script)],{cwd:dir,encoding:'utf8',env:{...process.env,RISK_MONITOR_FEEDS_DIR:feeds,RISK_AI_ENDPOINT:'',RISK_AI_MODEL:'',RISK_AI_KEY:'',RISK_NTFY_TOPIC:'',...env}});
  assert.equal(x.status,0,x.stdout+'\n'+x.stderr);
 };
 run('update-feed.mjs');run('prepare-briefing.mjs');run('ai-enrichment.mjs');run('notify-ntfy.mjs');run('validate-feed.mjs');
 const d=JSON.parse(await fs.readFile(path.join(dir,'data/auto-news.json'),'utf8'));
 assert.equal(d.schemaVersion,'3.0.0');assert.equal(d.briefing.verified,false);
 assert.equal(d.briefing.kind,'headline_selection_unverified');
 assert(d.briefing.important.length<=6);assert(d.signals.every(s=>s.reviewStatus==='unverified'));
 assert(d.signals.every(s=>s.verified===false));
 console.log('v3 pipeline OK; AI/push disabled by default; no verified claims');
}finally{await fs.rm(dir,{recursive:true,force:true})}
