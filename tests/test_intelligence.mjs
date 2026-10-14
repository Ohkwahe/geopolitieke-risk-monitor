/** Regression for explicitly unverified dossier + claim classification. No internet requests. */
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'risk-monitor-v220-'));
try{
 const feeds=path.join(temp,'feeds');await fs.mkdir(feeds);
 const dt=new Date().toUTCString();
 const definitions=[
  ['BBC_News','Russia claims Ukraine missile attack threatens NATO','BBC_News'],
  ['The_Guardian','Trump announces new tariffs on European imports','The_Guardian'],
  ['Deutsche_Welle','Taiwan reports Chinese military exercises','Deutsche_Welle'],
  ['UN_News','UN warns of humanitarian crisis in Sudan','UN_News'],
  ['Raad_van_de_EU','EU announces new sanctions related to Russia','Raad_van_de_EU']
 ];
 for(const [filename,title] of definitions){await fs.writeFile(path.join(feeds,filename+'.xml'),`<rss><channel><item><title>${title}</title><description>International security and diplomacy</description><pubDate>${dt}</pubDate><link>https://example.org/${filename}/1</link></item></channel></rss>`)}
 const run=()=>spawnSync(process.execPath,[path.join(root,'scripts/update-feed.mjs')],{cwd:temp,env:{...process.env,RISK_MONITOR_FEEDS_DIR:feeds},encoding:'utf8'});
 const result=run();assert.equal(result.status,0,result.stderr);
 const data=JSON.parse(await fs.readFile(path.join(temp,'data','auto-news.json'),'utf8'));
 assert.equal(data.schemaVersion,'2.2.0');assert.equal(data.signals.length,5);
 for(const item of data.signals){assert(item.dossier?.label);assert(item.evidence?.explanation);assert.equal(item.verified,false);assert.equal(item.method,'rule_based_screening')}
 const claim=data.signals.find(x=>x.source==='BBC News');assert.equal(claim.evidence.kind,'claim');assert.equal(claim.dossier.id,'oekraine-rusland');
 const official=data.signals.find(x=>x.source==='Raad van de EU');assert.equal(official.evidence.kind,'official_source');
 const trump=data.signals.find(x=>x.source==='The Guardian');assert.equal(trump.topic,'trump');
 assert(data.history[0].dossierCounts);
 // Subsequent reprocessing should not duplicate entries.
 const repeat=run();assert.equal(repeat.status,0,repeat.stderr);
 const after=JSON.parse(await fs.readFile(path.join(temp,'data','auto-news.json'),'utf8'));
 assert.equal(after.newCount,0);assert.equal(after.signals.length,5);
 console.log('Intelligence v2.2.0 OK — dossier, claim, official source, Trump, idempotence');
}finally{await fs.rm(temp,{recursive:true,force:true})}
