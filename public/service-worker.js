const CACHE_NAME = 'el-impostor-v1'
const RUNTIME_CACHE = 'el-impostor-runtime'

// Files to cache on install
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Handle API requests differently
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).then(response => {
        const cache = caches.open(RUNTIME_CACHE)
        cache.then(c => c.put(event.request, response.clone()))
        return response
      }).catch(() => {
        return caches.match(event.request)
      })
    )
    return
  }

  // For everything else, try network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseClone = response.clone()
        
        // Cache successful responses
        if (response.status === 200) {
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, responseClone)
          })
        }
        
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then(response => {
          if (response) {
            return response
          }
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html')
          }
          return new Response('Offline', { status: 503 })
        })
      })
  )
})

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
