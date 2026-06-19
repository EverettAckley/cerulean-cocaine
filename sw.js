// Bumped to v3 so the phone knows to grab the new files
const CACHE_NAME = 'bird-player-v3';

// Exact file names from your image
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.png',
  'sw.js',
  'Cerulean Mixtape.mp3',
  'Sibly Cerulean Chitter Full.mp3',
  'Sibly Cerulean Song 1.mp3',
  'Sibly Cerulean Song 2.mp3',
  'Sibly Cerulean Song 3.mp3',
  'Sibly Cerulean Song 4.mp3',
  'Sibly Cerulean Song 5.mp3'
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
