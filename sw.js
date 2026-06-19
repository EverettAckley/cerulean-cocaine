// Bumped to v5 to force phone to download the new code and files
const CACHE_NAME = 'bird-player-v5';

// List every single .mp3 file name EXACTLY as it appears on GitHub
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

self.addEventListener('install', event => {
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Add all files, explicitly including index.html to ensure it's cached.
        // Caching should be done with exact names, including spaces.
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Deletes any old cache versions to free up space
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); 
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
