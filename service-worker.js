// ============================================================================
// KINETIQ SERVICE WORKER
// Enables offline functionality and app-like experience
// ============================================================================

const CACHE_NAME = 'kinetiq-v2.4.0';
const RUNTIME_CACHE = 'kinetiq-runtime-v2';

// Base path for GitHub Pages
const BASE_PATH = '/kinetiq/';

// Files to cache on install
const STATIC_ASSETS = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'app.js',
  BASE_PATH + 'data.js',
  BASE_PATH + 'style.css',
  BASE_PATH + 'auth.js',
  BASE_PATH + 'achievements.js',
  BASE_PATH + 'onboarding.js',
  BASE_PATH + 'supabase-config.js',
  BASE_PATH + 'manifest.json',
  BASE_PATH + 'icons/kinetiq-icon.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        console.log('[Service Worker] Files to cache:', STATIC_ASSETS);
        
        // Cache files one by one to see which fails
        return Promise.all(
          STATIC_ASSETS.map((url) => {
            return cache.add(url)
              .then(() => {
                console.log('[Service Worker] ✅ Cached:', url);
              })
              .catch((error) => {
                console.error('[Service Worker] ❌ Failed to cache:', url, error);
              });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Installed successfully');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated successfully');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Skip Supabase API calls (always need fresh data)
  if (url.hostname.includes('supabase.co')) {
    return;
  }
  
  // For app assets: Cache First, then Network
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Cache the new response
              return caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, response.clone());
                  return response;
                });
            });
        })
        .catch(() => {
          // Offline and no cache - return offline page or fallback
          console.log('[Service Worker] Fetch failed, offline mode');
        })
    );
    return;
  }
  
  // For everything else: Network First, then Cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => {
              cache.put(request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // No cache either - return error or fallback
            console.log('[Service Worker] No cache available for:', request.url);
          });
      })
  );
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});

console.log('[Service Worker] Loaded and ready');
