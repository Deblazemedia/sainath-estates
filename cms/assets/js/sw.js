const CACHE_NAME = 'sainath-cache-v1';
const urlsToCache = [
    '/cms/index.html',
    '/cms/add-new-property.html',
    '/cms/assets/css/bootstrap.min.css',
    '/cms/assets/js/app.js',
    '/cms/assets/js/index.js',
    '/cms/assets/js/jquery.min.js',
    '/cms/assets/js/bootstrap.bundle.min.js',
    '/cms/assets/images/logo.png'
];

// 🔧 Install Service Worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// 🔁 Intercept fetch and serve from cache first
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// 🧹 Clean old caches on activation
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
});
