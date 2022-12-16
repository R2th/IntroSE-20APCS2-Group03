Website chạy có mạng thì là điều hiển nhiên rồi đúng không, nhưng còn website chạy khi không có mạng thì sao? Ban đầu nghe yêu cầu này từ phía PM mình cũng thấy hoang mang. Nhưng sau khi research thì mình đã khẳng định là có thể làm được. Mình đã research và biết được thêm về từ khóa Progressive Web App (PWA). Nhưng bài viết hôm nay mình sẽ không đi vào PWA mà sẽ nói về một trong những yêu cầu để tạo nên một PWA - đó là trang web có thể chạy được offline. Và công cụ giúp chúng ta làm được điều này chính là Service Worker

## Khái niệm Service Worker
Service worker là một script được trình duyệt của bạn chạy ngầm, tách biệt với web page. Service worker có thể cache lại các file, các api của bạn. Do đó, nó có thể giúp bạn bắn thông báo, chạy offline, load trang web nhanh hơn. Và trong tương lai, service worker còn có thể làm được nhiều thứ hơn thế nữa (cái này thì trông chờ vào anh google phát triển :smile:). Mình cũng chỉ nói qua một chút vậy thôi, để tìm hiểu sâu hơn thì các bạn vào đây đọc nha: https://developers.google.com/web/fundamentals/primers/service-workers

## Cache file bằng Service Worker
Mình sẽ đi từ những thứ cơ bản nhất trước nhé. Ở ví dụ đầu tiên, mình sẽ chỉ thực hiện cache một web tĩnh lại và chạy nó khi offline nhé. Đầu tiên các bạn clone project này về nhé: https://github.com/hoangdm-2060/demo-offline.

Sau khi clone xong, các bạn hãy chạy
```
npm install
node server.js
```

Giờ thì bạn truy cập trang web qua đường cổng 8081 nhé: http://localhost:8081/

Giờ bạn hãy ngắt kết nối với server bằng cách dùng tổ hợp phím: `Ctrl + C` ở terminal đang chạy node. Khi truy cập vào lại vào trang web thì có phải bạn sẽ thấy `This site can’t be reached`:
![](https://images.viblo.asia/b53cbd47-9cd4-4efd-8aba-c35f15af265e.png)

Vậy giờ làm như thế nào để khắc phục được điều này. Bạn hãy mở file `index.html` lên, bạn sẽ tìm thấy một đoạn script như sau:
```javascript
 if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);
        })
        .catch(err => {
          console.error('Service Worker Error', err);
        });
      });
    }
```
Đầu tiên mình sẽ phải kiểm tra trình duyệt có hỗ trợ service worker hay không, vì không phải trình duyệt nào cũng hỗ trợ đâu nhé. Tiếp tới thì mình sẽ đăng ký file `sw.js` (chút nữa sẽ tạo file này cho các bạn). Cuối cùng là log ra xem việc đăng ký service worker có thành công hay không.

Và giờ hãy tạo file `sw.js`
```javascript
const filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
];

const staticCacheName = 'pages-cache';
```
Đây sẽ là những file mình muốn cache và tên cache của mình. Sau đó, mình sẽ tiến hành lưu các file này lại vào cache

```javascript
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});
```
Giờ bạn hãy chạy lại ```node server.js```, truy cập trang web, dùng tổ hợp phím `ctrl + shift + i`, sau đó mở tab `Application`. Chọn Service Workers và bạn đã thấy mình đăng ký thành công service worker rồi đó
![](https://images.viblo.asia/9a58a9a9-7dde-4c30-9a47-e2718e057b0e.png)

Giờ ờ phần `Cache Storage`, bạn chọn `pages-cache` và sẽ thấy được những file đã cache lại
![](https://images.viblo.asia/8f90323b-ee5f-43f8-8050-3eb76e084794.png)

Vậy là chúng ta đã cache lại được file, nhưng liệu đã chạy được chưa á? Đương nhiên là chưa rồi. Giờ khi đã cache rồi, nếu có những request gửi lên thì chúng ta sẽ trả về response từ cache

```javascript
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(response => {
                    return caches.open(staticCacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            }).catch(error => {
        })
    );
});
```

Đầu tiên chúng ta lắng nghe các request và chặn nó lại. Sau đó sẽ trả về những response mà chúng ta custom cho các request đó. Ở đây chúng ta sẽ kiểm tra trong cache, nếu có dữ liệu đó trong cache thì chúng ta sẽ trả về response của cache đó. Ở đây còn có 1 đoạn là 
```javascript
return fetch(event.request).then(response => {
                    return caches.open(staticCacheName).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
```
Mục đích của đọan này là với những dữ liệu chưa có trong cache, thì chúng ta sẽ thêm vào. Giờ hãy ngắt kết nối với server và thử chạy lại web xem sao. Ngạc nhiên phải không nào :smile:. Chúng ta mới chỉ cache lại trang index, còn với những trang con thì chúng ta chưa làm, bạn sẽ cần phải truy cập vào một lần để dữ liệu đó được cache, sau đó khi ngắt kết nối với server thì mọi thứ sẽ ok :smile: Với những trang lỗi bạn cũng có thể sử dụng `catch` để trả ra trang báo lỗi cho người dùng nhé. 

Bài viết hôm nay đến đây là thôi nha, trong bài sau mình sẽ giới thiệu cho bạn một thứ hay ho hơn :smile: