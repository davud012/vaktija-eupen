/* Service Worker: pamti stranicu na uređaju, da radi i bez interneta.
   Speichert die Seite auf dem Gerät, damit sie auch ohne Internet läuft.
   Uvijek prvo internet (da dođu nove verzije), tek bez interneta sačuvana kopija.
   Immer zuerst Internet (damit Updates ankommen), nur ohne Internet die gespeicherte Kopie. */
var CACHE = "vaktija-v5";
var OSNOVA = ["./", "index.html", "vaktija.js", "slike/logo.png", "lib/mqtt.min.js", "prijevod-veza.js", "slike/blende.webp"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(OSNOVA); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  // Stare kopije brisati / Alte Kopien löschen
  e.waitUntil(caches.keys().then(function (k) {
    return Promise.all(k.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // Provjera nove verzije i tačnog vremena uvijek ide na internet
  // Update- und Zeitprüfung immer direkt ans Internet
  if (/[?&]v=/.test(url.search)) return;
  e.respondWith(
    // "no-cache": uvijek pitati server da li ima novije (brzo, šalje se samo ako se promijenilo)
    // "no-cache": immer beim Server nachfragen, ob es Neueres gibt (schnell, nur bei Änderung neu geladen)
    fetch(e.request, { cache: "no-cache" }).then(function (odgovor) {
      if (odgovor.ok) { var kopija = odgovor.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, kopija); }); }
      return odgovor;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
