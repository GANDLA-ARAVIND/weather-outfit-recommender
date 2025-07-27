const CACHE_NAME = 'weather-outfit-v4';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/src/assets/fonts/inter.css',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="40" fill="%234B9CEA"/%3E%3Ctext x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E☀%3C/text%3E%3C/svg%3E'
];

// Cache API responses
const API_CACHE_NAME = 'weather-api-cache-v3';
const API_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Handle API requests differently
  if (event.request.url.includes('openweathermap.org')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            const cachedTime = new Date(cachedResponse.headers.get('cached-time'));
            const now = new Date();
            
            // Return cached response if it's still fresh
            if (now.getTime() - cachedTime.getTime() < API_CACHE_TIME) {
              console.log('Serving cached API response');
              return cachedResponse;
            }
          }
          
          // Fetch fresh data
          console.log('Fetching fresh API data');
          return fetch(event.request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              const headers = new Headers(responseClone.headers);
              headers.append('cached-time', new Date().toISOString());
              
              const modifiedResponse = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              });
              
              cache.put(event.request, modifiedResponse.clone());
              return response;
            }
            return response;
          }).catch(() => {
            // Return cached response if network fails
            console.log('Network failed, serving cached response');
            return cachedResponse || new Response('Offline', { status: 503 });
          });
        });
      })
    );
    return;
  }

  // Handle other requests normally
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request).catch(() => {
        // If both cache and network fail, return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Handle background sync tasks
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/manifest.json',
      badge: '/manifest.json',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});