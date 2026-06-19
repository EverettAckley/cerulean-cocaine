const CACHE_NAME = 'bird-player-v4';

// Use %20 to represent spaces, avoiding URL mismatches in the cache
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.png',
  'sw.js',
  'Cerulean%20Mixtape.mp3',
  'Sibly%20Cerulean%20Chitter%20Full.mp3',
  'Sibly%20Cerulean%20Song%201.mp3',
  'Sibly%20Cerulean%20Song%202.mp3',
  'Sibly%20Cerulean%20Song%203.mp3',
  'Sibly%20Cerulean%20Song%204.mp3',
  'Sibly%20Cerulean%20Song%205.mp3'
];

self.addEventListener('install', event => {
  // Forces the new Service Worker to take over immediately
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Deletes any old cache versions (like v1, v2, v3) to free up space
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
  // Tell the active clients to use the new cache immediately
  self.clients.claim(); 
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // ignoreSearch helps prevent mismatches if query parameters get added
    caches.match(event.request, { ignoreSearch: true })
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
