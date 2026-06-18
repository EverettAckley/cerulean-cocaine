const CACHE_NAME = 'bird-player-v2';

// Note: No forward slashes at the start of these names!
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.png',
  'sw.js',
  'bird1.mp3',
  'bird2.mp3',
  'bird3.mp3'
];

// Install the Service Worker and cache the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept network requests and serve from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
