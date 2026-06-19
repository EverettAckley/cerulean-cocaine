// Bumped to v7 to force the app to grab the new JPEG icon, new app name, and code fixes
const CACHE_NAME = 'bird-player-v7';

const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.jpeg',
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
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
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
