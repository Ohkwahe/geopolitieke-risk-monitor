// Risk Monitor v1.1.0 — network-first for app HTML and live RSS JSON.
const CACHE='geopolitieke-risk-monitor-v1.1.0';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())
));
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('geopolitieke-risk-monitor-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
  const u=new URL(event.request.url);
  const live=u.pathname.endsWith('/index.html')||u.pathname.endsWith('/auto-news.json')||u.pathname.endsWith('/');
  if(live)event.respondWith(fetch(event.request).then(r=>{
    if(r.ok){const copy=r.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(event.request,copy)))}
    return r;
  }).catch(()=>caches.match(event.request)));
  else event.respondWith(caches.match(event.request).then(old=>old||fetch(event.request)));
});
