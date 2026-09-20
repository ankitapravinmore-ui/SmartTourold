// SmartTour360 Offline Service Worker
const CACHE_NAME = 'smarttour360-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.jpg'
];

const OFFLINE_EMERGENCY_DATA = {
  version: '2026.2',
  helplines: [
    { name: 'National Emergency Number', number: '112', type: 'All-in-One' },
    { name: 'National Tourist Helpline (24x7 Multi-lingual)', number: '1363', type: 'Tourist Support' },
    { name: 'Jaipur Tourist Police Station', number: '0141-2601934', type: 'Police' },
    { name: 'Women Helpline', number: '1090', type: 'Safety' },
    { name: 'SMS Hospital Emergency Trauma Center', number: '0141-2518224', type: 'Medical' }
  ]
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SmartTour360 SW] Pre-caching offline emergency assets');
      return cache.addAll(STATIC_ASSETS).catch(err => console.warn(err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/emergency')) {
    event.respondWith(
      new Response(JSON.stringify(OFFLINE_EMERGENCY_DATA), {
        headers: { 'Content-Type': 'application/json' }
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html') || caches.match('/');
        }
      })
  );
});
