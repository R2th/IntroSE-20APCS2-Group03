Chào tấc cả các bạn. Khi chúng ta mở trình duyệt Google Chrome hoặc Firefox thì sẽ có xuất hiện thông báo từ google, facebook hoặc là youtobe... Mà không cần mở trang các trang web đó lên. Để có thể làm được như vậy thì thằng mà chúng ta sẽ tìm hiểu sau đây là Service Worker có thể đáp ứng được và giải quyết được việc đó. Vậy...
## JavaScript Service Worker là gì?
Service Worker là một script mà trình duyệt chạy ở dưới background, tách khỏi trang web và giúp thực hiện các tính năng không cần đến trang web, hay tương tác người dùng. Service Worker có một số đặc điểm quan trọng là:

Không liên kết với một trang cụ thể
Không truy cập đến DOM
Có thể dừng khi không sử dụng và chạy khi cần thiết.
Chỉ hỗ trợ HTTPS
Với Service Worker chúng ta có thể:

Làm cho trang web chạy nhanh hơn và có thể chạy offline
Thực hiện một số tính năng ở background như: push message và background synchronization.
Có lẽ đến đây thì bạn đã hiểu phần nào về JavaScript Service Worker rồi. Tiếp theo, chúng ta sẽ tìm hiểu về cách sử dụng nó.
## Đăng ký JavaScript Service Worker
Giả sử, tôi có một trang web đơn giản và cấu trúc các tệp tin như sau:
```
index.html
service_worker.js
main.js
style.css
```
Lúc này, tôi sẽ đăng ký Service Worker trong file main.js:
```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service_worker.js')
  .then(reg => {
    console.log('Registered service worker');
  }).catch(err => {
    console.log('Register service worker failed', err);
  });
}
```
Có một số lưu ý quan trọng khi đăng ký Service Worker là:

Vị trí của file service_worker.js quyết định đến URL của các trang mà nó điều khiển. Ở đây, tôi đặt file service_worker.js cùng thư mục với index.html. Có nghĩa là Service Worker sẽ quản lý URL của toàn bộ trang web. Ngược lại, nếu tôi đặt nó ở một thư mục khác, giả sử là: /apps/service_worker.js thì Service Worker sẽ chỉ quản lý các URL bắt đầu từ /apps/.
Hàm đăng ký .register trả về một Promise.
Trang đăng ký Service Worker phải là HTTPS.
Service Worker phải nằm trên cùng trang web đăng ký nó (same origin). Vì vậy, bạn không thể đặt file service_worker.js ở một nơi khác, rồi sử dụng importScripts() được.
Tôi có tham khảo được một ví dụ mẫu về cách triển khai JavaScript Service Worker như sau:
```
const PRECACHE = 'my-precache-v1';
const RUNTIME = 'my-runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  'style.css',
  'main.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
```
Sau khi đăng ký thành công, Service Worker sẽ được download về phía client và thực hiện những việc sau đây.
## Service Worker - Install
Đoạn code dùng để install Service Worker:
```
const PRECACHE = 'my-precache-v1'; 
const RUNTIME = 'my-runtime'; // A list of local resources we always want to be cached. 
const PRECACHE_URLS = [ 
  'index.html', 
  './', // Alias for index.html 
  'style.css', 
  'main.js' 
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});
```
Mục đích của của việc install là để lưu một số resources được định nghĩa ở array PRECACHE_URLS vào bộ nhớ đệm cache với tên định nghĩa bởi **PRECACHE. ** Sau khi lưu xong hết tất cả các resources cần thiết, hàm self.skipWaiting() dùng để dừng công việc hiện tại lại và chuyển ngay sang công việc tiếp theo.
## JavaScript Service Worker - activate
Đoạn code dùng để active Service Worker là:
```
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});
```
Mục đích của công việc activate này là để xóa đi bộ nhớ đệm cache cũ, và giữ lại cache mới nhất, cuối cùng là kích hoạt Service Worker. Giả sử ban đầu bạn có hai cache là: PRECACHE = my-precache-v1 và RUNTIME. Bây giờ, bạn muốn thay đổi resources. Làm sao để cập nhật được những resources mới này vào cache? Bạn cần thay đổi tên của PRECACHE, ví dụ là: my-precache-v2. Lúc này currentCaches = ['my-precache-v2', RUNTIME]. Bây giờ chỉ cần dùng filter để lọc ra tên của cache không có trong currentCaches:
```
cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
```
Cuối cùng là kích hoạt Service Worker sử dụng self.clients.claim(). Bạn có thể kiểm tra lại bằng cách nhấn Ctrl Shift I hoặc F12 (tùy thuộc trình duyệt) để vào phần Công cụ dành cho nhà phát triển:
![](https://images.viblo.asia/886d59a2-5efb-4f95-b2fe-5f5ce1a51585.png)https://images.viblo.asia/886d59a2-5efb-4f95-b2fe-5f5ce1a51585.png
Theo như hình trên thì bạn có thể thấy là Service Worker đã được kích hoạt (activated) và đang chạy (running).
## JavaScript Service Worker - fetch
Đoạn code xử lý lệnh fetch:
```
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
```
Đoạn code trên có thể mô tả thành lời như sau:

1. Khi có request từ phía client (trình duyệt): Nếu url không thuộc cùng origin (không cùng trang web) thì bỏ qua.
2. Ngược lại, kiểm tra trong bộ nhớ đệm cache xem đã có response tương ứng với request chưa. Nếu tồn tại, thì trả về response đó cho trình duyệt.
3. Ngược lại, gửi request đó lên server, rồi lấy response trả về.
4. Clone response đó và lưu vào RUNTIME cache để phục vụ cho lần request tiếp theo, rồi sau đó trả về response đó cho trình duyệt.
## Kết luận
Trên đây là những kiến thức cơ bản về JavaScript Service Worker mà tôi tìm hiểu được, và còn rất nhiều vấn đề liên quan khác cần nghiên cứu thêm. Bài viết sau t sẽ chia sẻ demo về Push Notifications trong ứng dụng rails với Service Worker.
Cảm ơn tấc cả mọi người!
Tham khảo bài viết: https://developer.mozilla.org/en-US/Apps/Fundamentals/Offline