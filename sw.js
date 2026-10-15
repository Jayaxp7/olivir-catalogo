/* Service worker do Catálogo Olivir: deixa o app abrir sem internet.
   Mude VERSION quando quiser forçar a atualização do cache. */
var VERSION = 'olivir-v1';
var SHELL = ['./', 'index.html', 'catalogo.html', 'config.js', 'favicon.svg', 'manifest.webmanifest', 'icons/icon-192.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) {
      return Promise.all(SHELL.map(function (u) { return c.add(new Request(u, { cache: 'reload' })).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function networkFirst(req) {
  return new Promise(function (resolve) {
    var done = false;
    var fromCache = function () {
      return caches.match(req, { ignoreSearch: true }).then(function (r) { return r || (req.mode === 'navigate' ? caches.match('index.html') : undefined); });
    };
    var t = setTimeout(function () { fromCache().then(function (r) { if (r && !done) { done = true; resolve(r); } }); }, 4000);
    fetch(req).then(function (res) {
      clearTimeout(t);
      if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      if (!done) { done = true; resolve(res); }
    }).catch(function () {
      clearTimeout(t);
      fromCache().then(function (r) { if (!done) { done = true; resolve(r || Response.error()); } });
    });
  });
}

function cacheFirst(req) {
  return caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) {
      if (res && (res.ok || res.type === 'opaque')) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === self.location.origin) { e.respondWith(networkFirst(req)); return; }
  if (url.hostname === 'www.gstatic.com' && url.pathname.indexOf('/firebasejs/') === 0) { e.respondWith(cacheFirst(req)); return; }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { e.respondWith(cacheFirst(req)); return; }
});
