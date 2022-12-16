Chào mọi người, hôm nay chúng ta sẽ tìm hiểu về khái niệm **Service worker** :four_leaf_clover:
# Service worker
> `Service worker` là một script được browser(trình duyệt) chạy ngầm và tách biệt với trang web cài đặt nó 

`Service worker` cung cấp những feature không cần tương tác với web page hay người dùng như :

* Xử lý những `network requests` (`cache responses`)
* Xử lý `push notification`
* `Background sync`

`Service worker` không thể access trực tiếp vào  `DOM`, thay vào đó, `service worker` giao tiếp với những pages được quản lý bằng việc `response` những `message` được gửi bởi `postMessage`, từ đó những pages này sẽ sửa đổi `DOM` theo yêu cầu

Hiện nay hầu hết các trình duyệt hiện nay đều đã hỗ trợ Service worker (trừ `IE` :upside_down_face:)

![](https://images.viblo.asia/db0115ab-4a7d-4af3-92a8-87fb9858a967.png)

# Service worker life cycle
Lifecycle của `service worker` tách biệt với `web page`

![](https://images.viblo.asia/3245b1ee-a6b1-440f-a950-314f3e57295e.png)

Để `install` `service worker` cho trang web, đầu tiên cần `register` nó, việc `register` được thực hiện trong phần `javascript` ở trang web. Sau khi `register` thành công, `browser` sẽ tiến hành chạy ngầm bước `install service worker`

Khi `install` thành công sẽ tới bước `activate`, sau khi `activated` thành công, `service worker` sẽ quản lý tất cả các page nằm trong `scope` được `register`. Lúc này `service worker` sẽ xử lý những `fetch` hay `message event` xuất hiện khi có `network request` tới hay `message` được gửi từ `web page`
##  Register service worker
```javascript
window.addEventListener('load', () => {
  if('serviceWorker' in navigator) {
    console.log('Service worker supported');

    // Register service worker
    console.log('Service worker register ...');
    navigator.serviceWorker
      .register('../service_worker_page.js')
      .then(registration => console.log('Service worker registered') )
      .catch(error => console.console.log('Register failed: ' + error) );
  } else {
    console.log('Service worker not supported');
  }
});
```

Ở bước `register`, cần kiểm tra `browser` có hỗ trợ `service worker` hay không(trong biến `navigator`), sau đó `register` bằng `serviceWorker` `object` trong `navigator`, tham số truyền vào là đường dẫn tới file `script service worker`

Hàm `register` sẽ kiểm tra xem `service worker` đã được `register` hay chưa, nếu chưa thì mới tiến hành `register`,  trả về một `promise` chứa biến `registation`(1 `object` của `ServiceWorkerRegistration`)

`service worker scope` phụ thuộc vào location nó được `register`, ở ví dụ trên là `/service_worker_page.js`, nghĩa là nó được `register` ở `root` của `domain`, lúc này `service worker` có thể nhận mọi `fetch events` trong toàn bộ `domain`.
Nếu `service worker` được `register` ở vị trí khác (e.g. `/admin/sw.js`) thì service worker chỉ có thể nhận `fetch events` trong những pages có url bắt đầu với `/admin/index`, `/admin/users`, ...
## Install + Activate service worker
Như đã nói ở trên, sau khi `register` thành công, `browser` sẽ tiến hành chạy ngầm bước `install service worker` ở đoạn `script` được `register`, và bước `activate` được thực hiện ngay sau đó:

```javascript
// service_worker_page.js

self.addEventListener('install', (e) => {
  console.log('Service worker installed');
});

self.addEventListener('activate', (e) => {
  console.log('Service worker activated');
});
```

`self` ở đây là 1 object của `ServiceWorkerGlobalScope`:
```javascript
ServiceWorkerGlobalScope {clients: Clients, registration: ServiceWorkerRegistration, serviceWorker: ServiceWorker, onactivate: null, onfetch: null, …}
```

Sau khi `activate` `service worker` thành công, có thể kiếm tra lại trạng thái hoạt động của `service worker`:

![](https://images.viblo.asia/05a82085-9408-4383-b0fb-8f558bd7c02f.png)


---

Ta sẽ tìm hiểu kĩ hơn qua cơ chế `caching` của `service worker`:
# Cache response
Một trong những `feature` của `service worker` chính là xử lý những `network requests` được gửi đi, `cache response` lại và sử dụng lại khi cần(tăng tốc độ load page, hiển thị dữ liệu được cache tới người dùng khi mất kết nối mạng (`progessive web app`))

Ở bước `install service worker`, những `response(html, js, css)` cần thiết sẽ được `cache` lại (trong `CacheStorage`):
```javascript
var cacheName = 'static-assets-v1';
var cacheUrls = ['/', 'css/index.css', 'js/index.js'];

self.addEventListener('install', (e) => {
  console.log('Service worker installed');

  // Cache assets
  e.waitUntil(caches.open(cacheName).then((cache) => {
    cache.addAll(cacheUrls);
  }));
});
```

`cacheUrls` chứa những `request` tới `server` muốn được `cache` lại, các `response` trả về từ `server` sẽ được `cache` lại trong `CacheStorage`:

![](https://images.viblo.asia/21f0ffb7-7ecd-40b1-858a-723fd037e22c.png)

Sau đó những `network request`  được gửi đi (`html, js, css, ...`) sẽ `trigger` ra `fetch event` và được `handle` bởi `service worker`:
```javascript
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((response) => {
    if(response) {
     // return response from cache
      console.log(`request: ${e.request.url} - response: ${response}`);
      return response;
    }
    
    // fetch new response from server
    return fetch(e.request);
  }));
});
```
Với những `request` (được lưu trong `e.request`) mà `response` đã được `cache` lại sẽ được trả thẳng về `browser`, 
đối với những `request` mới sẽ được `fetch` mới tới `server` (ta cũng có thể `cache` những `request` mới này lại)

Ngay cả khi bị mất kết nối mạng, `browser` vẫn có thể hiển thị cho người dùng `data` được `cache` lại trước :

![](https://images.viblo.asia/d7a94365-f8f0-404f-8ab9-29544e5fdd48.png)
---
Vừa rồi là tìm hiểu của mình về `Service worker`, cảm ơn mọi người đã theo dõi :sunflower: