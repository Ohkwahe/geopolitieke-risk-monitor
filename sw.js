/* Risk Monitor v1.6.0 — network-first, prevents stale installed iPhone PWA */
const CACHE='geopolitieke-risk-monitor-v1.6.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(
 caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
 caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('geopolitieke-risk-monitor-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const url=new URL(request.url);
 const live=url.pathname.endsWith('/')||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/auto-news.json');
 if(live){event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{
   if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}
   return response;
 }).catch(()=>caches.match(request)));return;}
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
