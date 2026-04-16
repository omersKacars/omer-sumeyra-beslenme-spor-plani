const CACHE_NAME = "spor-beslenme-cache-v3";
const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./home.html",
  "./styles.css",
  "./app.js",
  "./diyet-filters.js",
  "./manifest.webmanifest",
  "./spor.html",
  "./spor-haftalik.html",
  "./spor-zaman.html",
  "./spor-beslenme.html",
  "./spor-agirlik.html",
  "./diyet.html",
  "./diyet-kahvalti.html",
  "./diyet-aksam.html",
  "./diyet-smoothie.html",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // HTML isteklerinde ağ öncelikli git ki güncel tasarım hemen gelsin
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put("./index.html", responseClone.clone());
            cache.put("./home.html", responseClone);
          });
          return response;
        })
        .catch(() => caches.match("./home.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          // Ağ yoksa ve istek HTML ise ana sayfayı dön
          if (event.request.mode === "navigate") {
            return caches.match("./home.html");
          }
        })
      );
    })
  );
});

