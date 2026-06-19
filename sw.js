const CACHE_NAME = 'bird-player-v13';

const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon.jpeg',
  'sw.js',
  'Cerulean%20Mixtape.mp3',
  'Sibley%20Cerulean%20Chitter%20Full.mp3',
  'Sibley%20Cerulean%20Song%201.mp3',
  'Sibley%20Cerulean%20Song%202.mp3',
  'Sibley%20Cerulean%20Song%203.mp3',
  'Sibley%20Cerulean%20Song%204.mp3',
  'Sibley%20Cerulean%20Song%205.mp3',
  'Warbler%20Guide%20Chip.mp3',
  'Warbler%20Guide%20Flight%20Guide.mp3',
  'Warbler%20Guide%20Type%20A1.mp3',
  'Warbler%20Guide%20Type%20A2.mp3',
  'Warbler%20Guide%20Type%20A3.mp3',
  'Merlin%20Song%201.mp3',
  'Merlin%20Song%202.mp3',
  'Merlin%20Song%203.mp3',
  'Merlin%20Chirp%20Calls.mp3',
  'Merlin%20Tink%20Calls.mp3',
  'Merlin%20Flight%20Calls.mp3'
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
