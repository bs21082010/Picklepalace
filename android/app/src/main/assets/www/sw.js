const CACHE = "mkha-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./languages.js",
  "./products.js",
  "./banner.svg",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);

      if (event.request.mode === "navigate") {
        try {
          const fresh = await fetch(event.request);
          const copy = fresh.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return fresh;
        } catch (err) {
          return cached || caches.match("./index.html");
        }
      }

      const network = fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => null);

      return cached || network;
    })()
  );
});