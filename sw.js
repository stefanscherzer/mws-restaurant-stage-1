var staticCacheName = 'restaurants-v3';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/serviceworker.js',
        '/js/main.js',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        '/js/sidebar.js',
        // injector:images
        '/img/10_large_1x.jpg',
        '/img/10_large_2x.jpg',
        '/img/10_medium_1x.jpg',
        '/img/10_medium_2x.jpg',
        '/img/10_small.jpg',
        '/img/1_large_1x.jpg',
        '/img/1_large_2x.jpg',
        '/img/1_medium_1x.jpg',
        '/img/1_medium_2x.jpg',
        '/img/1_small.jpg',
        '/img/2_large_1x.jpg',
        '/img/2_large_2x.jpg',
        '/img/2_medium_1x.jpg',
        '/img/2_medium_2x.jpg',
        '/img/2_small.jpg',
        '/img/3_large_1x.jpg',
        '/img/3_large_2x.jpg',
        '/img/3_medium_1x.jpg',
        '/img/3_medium_2x.jpg',
        '/img/3_small.jpg',
        '/img/4_large_1x.jpg',
        '/img/4_large_2x.jpg',
        '/img/4_medium_1x.jpg',
        '/img/4_medium_2x.jpg',
        '/img/4_small.jpg',
        '/img/5_large_1x.jpg',
        '/img/5_large_2x.jpg',
        '/img/5_medium_1x.jpg',
        '/img/5_medium_2x.jpg',
        '/img/5_small.jpg',
        '/img/6_large_1x.jpg',
        '/img/6_large_2x.jpg',
        '/img/6_medium_1x.jpg',
        '/img/6_medium_2x.jpg',
        '/img/6_small.jpg',
        '/img/7_large_1x.jpg',
        '/img/7_large_2x.jpg',
        '/img/7_medium_1x.jpg',
        '/img/7_medium_2x.jpg',
        '/img/7_small.jpg',
        '/img/8_large_1x.jpg',
        '/img/8_large_2x.jpg',
        '/img/8_medium_1x.jpg',
        '/img/8_medium_2x.jpg',
        '/img/8_small.jpg',
        '/img/9_large_1x.jpg',
        '/img/9_large_2x.jpg',
        '/img/9_medium_1x.jpg',
        '/img/9_medium_2x.jpg',
        '/img/9_small.jpg',
        '/img/icon.png',
        // endinjector
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function (error) {
        console.log('response failed with ' + error);
      });
    }
  }));
});