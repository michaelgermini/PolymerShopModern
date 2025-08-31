// PolymerShop Service Worker
const CACHE_NAME = 'polymershop-v2.0.0';
const STATIC_CACHE_NAME = 'polymershop-static-v2.0.0';
const DYNAMIC_CACHE_NAME = 'polymershop-dynamic-v2.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/electronics-placeholder.svg',
  '/images/clothing-placeholder.svg',
  '/images/home-placeholder.svg',
  '/images/sports-placeholder.svg',
  '/images/default-placeholder.svg',
  // Add more static assets as needed
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/products',
  '/api/categories',
  // Add your API endpoints here
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🛠️ Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activated and old caches cleaned');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests
    if (request.destination === 'document') {
      // HTML pages - Network first, then cache
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Clone the response for caching
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
            return response;
          })
          .catch(() => {
            // If network fails, try cache
            return caches.match(request)
              .then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse;
                }
                // If no cache, return offline page
                return caches.match('/index.html');
              });
          })
      );
    } else if (request.destination === 'image' || request.destination === 'script' || request.destination === 'style') {
      // Static assets - Cache first, then network
      event.respondWith(
        caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, fetch from network
            return fetch(request)
              .then((response) => {
                // Cache the response for future use
                const responseClone = response.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone));
                return response;
              });
          })
      );
    } else {
      // Other requests - Network first, then cache
      event.respondWith(
        fetch(request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
            return response;
          })
          .catch(() => {
            return caches.match(request);
          })
      );
    }
  } else {
    // External requests (images from Unsplash, etc.)
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If not cached, fetch and cache
          return fetch(request)
            .then((response) => {
              // Only cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone));
              }
              return response;
            })
            .catch(() => {
              // If external request fails, return a placeholder
              console.log('🌐 External request failed:', request.url);
              return new Response('', { status: 404 });
            });
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered:', event.tag);

  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartData());
  }

  if (event.tag === 'background-sync-favorites') {
    event.waitUntil(syncFavoritesData());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('🔔 Service Worker: Push notification received');

  let data = { title: 'PolymerShop', body: 'New updates available!' };

  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body,
    icon: '/images/polymershop-icon-192.png',
    badge: '/images/polymershop-icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/polymershop-icon-192.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Service Worker: Notification clicked');

  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Helper functions for background sync
async function syncCartData() {
  try {
    console.log('🔄 Syncing cart data...');
    // Implement cart sync logic here
    // This would typically send pending cart changes to server
  } catch (error) {
    console.error('❌ Cart sync failed:', error);
  }
}

async function syncFavoritesData() {
  try {
    console.log('🔄 Syncing favorites data...');
    // Implement favorites sync logic here
  } catch (error) {
    console.error('❌ Favorites sync failed:', error);
  }
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

async function syncContent() {
  try {
    console.log('🔄 Periodic content sync...');
    // Implement content sync logic here
    // Could refresh product data, check for new products, etc.
  } catch (error) {
    console.error('❌ Content sync failed:', error);
  }
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    calculateCacheSize().then((size) => {
      event.ports[0].postMessage({ cacheSize: size });
    });
  }
});

// Calculate total cache size
async function calculateCacheSize() {
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();

      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return totalSize;
  } catch (error) {
    console.error('❌ Failed to calculate cache size:', error);
    return 0;
  }
}

// Clean up cache when storage is low
self.addEventListener('storagechange', (event) => {
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then((estimate) => {
      const usedPercentage = (estimate.usage / estimate.quota) * 100;
      if (usedPercentage > 90) {
        console.log('⚠️ Storage usage high, cleaning cache...');
        cleanupCache();
      }
    });
  }
});

async function cleanupCache() {
  try {
    const cacheNames = await caches.keys();

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();

      // Remove old entries (keep only recent ones)
      const entriesToDelete = keys.slice(50); // Keep only the 50 most recent

      await Promise.all(
        entriesToDelete.map(request => cache.delete(request))
      );
    }

    console.log('🧹 Cache cleaned up');
  } catch (error) {
    console.error('❌ Cache cleanup failed:', error);
  }
}
