const CACHE_VERSION = "v1";
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

const CACHED_ASSETS = [
    { url: "/", revision: "1" },
    { url: "/css/main.css", revision: "1" },
    { url: "/js/main.js", revision: "1" },
    { url: "/offline.html", revision: "1" },
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                CACHED_ASSETS.map((asset) => {
                    return cache.add(
                        new Request(asset.url, { cache: "reload" })
                    );
                })
            );
        })
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

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
