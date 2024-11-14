const CACHE_VERSION = "v1";
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

const CACHED_ASSETS = [
    "/",
    "/css/main.css",
    "/js/main.js",
    "/offline.html",
    "/assets/fonts/epicene-display-regular.woff2",
    "/assets/fonts/epicene-display-bold.woff2",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHED_ASSETS))
    );
});

self.addEventListener("fetch", (event) => {
    // Skip non-GET requests
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            const networked = fetch(event.request)
                .then((response) => {
                    const cacheCopy = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, cacheCopy));
                    return response;
                })
                .catch(() => caches.match("/offline.html"));
            return cached || networked;
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
