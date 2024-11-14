const CACHE_VERSION = "v2";
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;

// Add route-based caching strategies
const CACHE_STRATEGIES = {
    assets: "cache-first",
    pages: "stale-while-revalidate",
    api: "network-first",
};

const CACHED_ASSETS = [
    "/",
    "/css/main.css",
    "/js/main.js",
    "/offline.html",
    "/assets/fonts/epicene-display-regular.woff2",
    "/assets/fonts/epicene-display-bold.woff2",
    "/assets/images/logo.svg",
    "/assets/images/favicon.ico",
    "/css/critical.css",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHED_ASSETS))
    );
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    const strategy = getStrategy(url);

    event.respondWith(
        strategy === "cache-first"
            ? cacheFirst(event.request)
            : staleWhileRevalidate(event.request)
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
