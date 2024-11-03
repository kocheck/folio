const CACHE_VERSION = "v1";
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

const CACHED_ASSETS = ["/", "/css/main.css", "/js/main.js", "/offline.html"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHED_ASSETS))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => response || fetch(event.request))
            .catch(() => {
                if (event.request.mode === "navigate") {
                    return caches.match("/offline.html");
                }
            })
    );
});
