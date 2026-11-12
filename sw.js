
const CACHE_NAME = "upfc-pwa-v2";

const APP_PREFIX = "/UPFRUIT/";

const APP_SHELL = [
  APP_PREFIX,
  APP_PREFIX + "index.html",
  APP_PREFIX + "manifest.json",
  APP_PREFIX + "config.js",
  APP_PREFIX + "favicon.ico",
  APP_PREFIX + "icons/icon-192.png",
  APP_PREFIX + "icons/icon-512.png",
  APP_PREFIX + "icons/apple-touch-icon.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    })
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.startsWith("upfc-pwa-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // दूसरे domain की requests को intercept न करें
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, copy);
          });
        }

        return response;
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          return cached || caches.match(APP_PREFIX + "index.html");
        });
      })
  );
});
