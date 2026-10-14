/** End-to-end collector tests. Temporary feeds; never touches production data. */
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const home=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(home,'..');
const temp=await fs.mkdtemp(path.join(os.tmpdir(),'risk-monitor-v140-'));
const feeds=path.join(temp,'feeds');const data=path.join(temp,'data');
await fs.mkdir(feeds);await fs.mkdir(data);
const names=['BBC_News','The_Guardian','Deutsche_Welle','UN_News','Raad_van_de_EU'];
const title='Ukraine and Russia leaders discuss NATO energy security agreement';
const timestamp=new Date().toUTCString();
const xml=(name,description)=>`<?xml version="1.0"?><rss><channel><item><title>${title}</title><description>${description}</description><pubDate>${timestamp}</pubDate><link>https://example.org/${name}/1</link></item></channel></rss>`;
try{
  for(const name of names){await fs.writeFile(path.join(feeds,name+'.xml'),xml(name,'First statement on regional security'));}
  const run=(script)=>{
    const x=spawnSync(process.execPath,[path.join(root,'scripts',script)],{cwd:temp,env:{...process.env,RISK_MONITOR_FEEDS_DIR:feeds},encoding:'utf8'});
    assert.equal(x.status,0,x.stdout+'\n'+x.stderr);
  };
  run('update-feed.mjs');run('prepare-briefing.mjs');run('validate-feed.mjs');
  let a=JSON.parse(await fs.readFile(path.join(data,'auto-news.json'),'utf8'));
  assert.equal(a.sourcesOk,5);
  assert.equal(a.newCount,5);
  assert.equal(a.quality.groupedSimilarItems,4);
  assert.equal(a.signals.filter(s=>!s.duplicateOf).length,1);
  assert(a.signals.every(s=>s.verified===false));
  assert(a.signals.every(s=>s.score.reliability<=2));
  run('update-feed.mjs');run('prepare-briefing.mjs');run('validate-feed.mjs');
  a=JSON.parse(await fs.readFile(path.join(data,'auto-news.json'),'utf8'));
  assert.equal(a.newCount,0);
  assert.equal(a.updatedCount,0);
  assert.equal(a.history.length,2);
  await fs.writeFile(path.join(feeds,'BBC_News.xml'),xml('BBC_News','New statement about an updated agreement'));
  run('update-feed.mjs');run('prepare-briefing.mjs');run('validate-feed.mjs');
  a=JSON.parse(await fs.readFile(path.join(data,'auto-news.json'),'utf8'));
  assert.equal(a.updatedCount,1);
  assert.equal(a.history.at(-1).changed,1);
  console.log('Collector v1.4.0: OK — grouping, 2nd run no duplicates, content updates, source status, validation');
}finally{await fs.rm(temp,{recursive:true,force:true});}
