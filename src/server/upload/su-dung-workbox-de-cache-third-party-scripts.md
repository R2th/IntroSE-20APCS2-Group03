Bài viết trước tôi đã giới thiệu các bạn về những giải pháp để loại bỏ [render-blocking resources của web](https://viblo.asia/p/loai-bo-render-blocking-resources-RQqKLogr57z). Để tiếp tục về chủ đề cải thiện performance và google speed score, bài viết này tôi sẽ giới thiệu đến các bạn việc làm thế nào để load third party hiệu quả bằng web worker và workbox. Như chúng ta đã biết hầu hết các website ngày này đều có sử dụng các third party nhằm mục đích tracking người dùng như Google Ttag manager, Yahoo tag manager,.., tương tác mạng xã hội Facebook, Twiter,.., nhúng trình phát video,..Quả thực việc tích hợp này mang lại rất nhiều tiện ích, chức năng tuyệt với cho website. Tuy nhiên, chúng cũng có ảnh hưởng đáng kể đến tốc độ tải trang và trải nghiệm người dùng. Vì vậy, việc làm thế nào để hạn chế tác động của chúng là rất cần thiết. 

# Xác định các third party trong sử dụng trong hệ thống
Về cơ bản đối với lập trình viên thì hầu hết các mã code của third party script họ đều biết đển nên việc xác định các third party script là không khó khăn nhiều. Tuy nhiên để liệt kê một cách đầu đủ bạn có thể sử dụng tool của chrome để làm việc đó một cách nhanh chóng và chính xác hơn.
- Mở website cần cải thiện trên trình duyệt chrome
- Open **Chrome Dev Tool**
- Vào phần **More tools**
- Chọn **Lighthouse**
- Click button **Generate report**

Các bạn có thể thấy mục **Reduce the impact of third party code** cùng với thời gian chúng block main thread (quá trình thực hiện load page)

![](https://images.viblo.asia/803769b5-1405-4aa6-9993-793c24a61db9.png)


Với những thông tin ở đây bạn có thể đưa ra đánh giá những third party nào ảnh hưởng lớn đến việc tải trang, cần cải thiện cái nào, dung lượng của chúng là bao nhiêu,..

Ngoài ra bạn cũng thể vào mục tab **Network -> JS** để xác định những scripts này, tuy nhiên do ở đây có nhiều các loại tài nguyên khác dễ dẫn đến việc thiếu xót.

# Những giải pháp để load third party script hiệu quả
Có nhiều cách để cải thiện load third party
- Load script bất đồng bộ, sử dụng ```defer```, ```async``` -  Hầu hết các third party đã thực làm việc này
- Thành lập kết nối sớm cho third party, sử dụng ```preconnect``` hoặc ```dns-prefetch```
```html
<link rel="preconnect" href="http://example.com">
<link rel="dns-prefetch" href="http://example.com">
```
Có một số trình duyệt chưa hỗ trợ 2 thuộc tính này
- Third-party CDN hosting - Thực hiện hosting third party trên một server do mình quản lý
- Self-host third-party scripts - Lưu third party script trong source code của web
- Sử dụng woker và wokbox để cache third party script

Với **Third-party CDN hosting** thì chi phí sẽ là vấn đề nếu tài chính của bạn không dư dả, với **Self-host third-party scripts** thì không cập nhật được những code mới nhất của third party. Do vậy tôi không đi sâu tìm hiểu 2 giải pháp này. **Web Worker** và **Workbox** phần nào đó khắc phục được những nhược điểm của hai giải pháp trên. Trong bài viết này tôi chỉ tập trung về việc sử dụng worker và workbox để cache resource nhằm mục đích cái thiện cải thiện việc load các resources này.

# Cache third party với web worker và workbox
### Web worker
> A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction

Web worker là khái niệm mới với bản thân tôi. Tôi hiểu nôm na là: Web worker là một công nghệ giúp cho chia tách main thread (công việc render html, evaluate js, css,..) và các worker thread (các công việc khác không liên quan đến main thread) . Chúng ta cũng có thể coi nó như multi thread trong lập trình desktop, worker giúp bạn chia thành nhiều thread công việc giúp giảm tải cho main thread và cải thiện performance. 

![](https://images.viblo.asia/a1eb7cc0-8021-4614-b2d4-d798f4c216fc.jpg)
<div align="center"><b>Giao tiếp giữa Main thread và Worker thread</b></div>

#####

#### Tạo một web worker
Worker đơn giản là một script js, bạn có thể viết bất kỳ logic nào trong đó, ví dụ:
```js
//worker.js
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();
```
#### Đăng ký một web worker
- Sau khi tạo script worker bạn cần tiến hành đăng ký nó trong page
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js');
}
```

Đầu tiên, chúng ta kiểm tra xem trình duyệt có hỗ trợ worker hay không trước khi tiến hành đăng ký nó. Lưu ý là vị trí file ```worker.js``` đặt ở đâu sẽ quyết định phạm vi mà nó control. Ví dụ bạn đặt ở root của web thì nó có thể cache toàn bộ tài nguyên của page cho dù các file ở các thư mục js, css, images hay các third party khác. Nếu bạn đặt ở thu mục ```public/js``` chẳng hạn, nó chỉ có thể control tất cả các file trong thư mục ```public/js``` và thư mục con của nó. Điều này là quan trọng khi bạn muốn xác định phạm vi tài nguyên sẽ được cache.

- Cải tiến cách đăng ký web worker
```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/worker.js');
  });
}
```
Thông thường thì thời điểm để worker làm việc tốt nhất khi page đã thực hiện việc load page, do vậy bạn bạn nên đăng ký nó khi sự kiện load xảy ra.

Để có thể tìm hiểu sâu hơn về woker bạn có thể đọc thêm ở các tài liệu sau:<br>
https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers<br>
https://developers.google.com/web/fundamentals/primers/service-workers

### Workbox
#### Giới thiệu

Workbox là một thư viện để hỗ trợ bạn viết và quản lý service worker và với CacheStorage API. Service workers và Cache Storage API khi sử dụng cùng nhau sẽ cho phép control các tài nguyên như: HTML, CSS, JS, images,.. sử dụng trên page của bạn sẽ được sử dụng ra sao (ví dụ lấy từ network hay từ cache), thậm chí chúng còn cho phép bạn trả về nội dung được cache khi offline.

Các bạn có thể tìm hiểu sâu hơn ở page https://developers.google.com/web/tools/workbox/guides/get-started

#### Cache script và stylesheet
```js
//worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;

registerRoute(
({request}) => request.destination === 'script' ||
               request.destination === 'style',
new StaleWhileRevalidate()
);
```

#### Cache images
```js
  //worker.js
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');
  
  const { registerRoute } = workbox.routing;
  const { CacheFirst } = workbox.strategies;
  const {CacheableResponse} = workbox.cacheableResponse;

  registerRoute(
      ({request}) => request.destination === 'image',
      new CacheFirst({
        plugins: [
          new CacheableResponsePlugin({statuses: [0, 200]})
        ],
      })
    );
```

Ở đây sẽ thực hiện cache tất cả images và chỉ những item nào trả về thành công mới được lưu vào cache
#### Cache các url từ CDN
```js
//worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.routing.registerRoute( // Cache yahoo tag manager
    ({url}) => url.origin === 'https://www.googletagmanager.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-tag'
    })
);
```

Code trên sẽ thực hiện cache tất cả các request có origin là https://www.googletagmanager.com, ví dụ: https://www.googletagmanager.com/gtm.js. Đối với google analytics thì chúng ta có thể làm đơn giản hơn.

```js
 importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

 workbox.googleAnalytics.initialize(); 
```

#### Workbox strateries
Có một số chiến lược cache mà workbox giới thiệu, tùy vào trường hợp cụ thể mà chúng ta sẽ quyết định dùng cái nào
- **Cache First**: Lấy dữ liệu từ cache trước cho đến khi cache hết hạn thì mới lấy từ network
- **Cache Only**: Chỉ lấy dữ liệu từ cache.
- **Network First**: Lấy dữ liệu từ network trước, nếu không lấy được từ network thì mới lấy dữ liệu cache
- **Network Only**: Như tên gọi. Chỉ lấy dữ liệu từ network
- **Stale-While-Revalidate**: Lấy từ dữ liệu từ cache. Nếu cache không có thì lấy từ network. Nếu lấy được dữ liệu từ network thì update lại vào cache.

Để hiểu rõ hơn về các chiến lược này, cách bạn có thể tham khảo ở link bên dưới
https://developers.google.com/web/tools/workbox/modules/workbox-strategies

### Triển khai trong một website laravel
#### Tạo một web worker ở root folder (```public/worker.js```)
```js
//worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

workbox.core.clientsClaim(); // Trigger active status of worker as soon as posible
workbox.core.skipWaiting();

workbox.googleAnalytics.initialize(); // Cache google analalyis scripts

workbox.routing.registerRoute( // Cache yahoo tag manager
    ({url}) => url.origin === 'http://s.yjtag.jp',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'yahoo-tag'
    })
);
```

Ở đây tôi sử dụng import trực tiếp lib từ server của google cho đơn giản, các bạn có thể dùng webpack, hoặc gulp để thay thế.
 ```js
workbox.core.clientsClaim();
workbox.core.skipWaiting();
```
Hai function ```clientsClaim()``` và ```skipWaiting``` nhằm mục đích chuyển trạng thái của worker sang active sớm nhất có thể

```js
workbox.googleAnalytics.initialize();
```

Cache các scripts của google analytics như: https://www.google-analytics.com/analytics.js, ...

```js
workbox.routing.registerRoute( // Cache yahoo tag manager
    ({url}) => url.origin === 'http://s.yjtag.jp',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'yahoo-tag'
    })
);
```

Cache tất cả các script có origin là http://s.yjtag.jp đồng thời group chúng với name ```yahoo-tag```

#### Đăng ký worker tại phần head của html
```js
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('worker.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
</script>
```
#### Kiểm tra kết quả hoạt động
- Vào **Chrome Web Tool -> Application -> Service Wokers**. Nếu thấy thông tin như ảnh bên dưới thì tức là việc đăng ký web worker đã thành công

![](https://images.viblo.asia/8d5936f8-f4c6-436f-8797-599a469d6dc4.png)

- Vào **Chrome Web Tool -> Application -> Cache Storage**. Nếu thấy dữ liệu như ảnh bên dưới tức là cache đã lưu thành công

![](https://images.viblo.asia/0eeb5403-0cee-48d4-a535-0682fbee96f2.png)

- Vào  **Chrome Web Tool -> Network -> JS**. Nếu thấy các file script đã cache có column **Size** là **(Service Woker)** là đã sử dụng cache từ web worker

![](https://images.viblo.asia/f4aed0ff-b055-4ce8-9472-d21bd5f4c206.png)

# Tổng kết
Chúng ta có thể thấy third party scripts rất cần thiết trong phát triển ứng dụng web. Tuy nhiên, chúng cũng mang lại những ảnh hưởng nhất định đới với tốc độ tải trang và điểm đánh giá của google. Trong khi đó, việc cải thiện nó đôi khi là nằm ngoài sự kiểm soát của chúng ta. Có những giải pháp tôi đề cập trong bài viết nhưng không phải chúng sẽ giải quyết được triệt để. Tôi cho rằng việc dùng web worker và workbox để cache những third party scripts là một giải pháp mang lại hiệu quả, cũng như chi phí thấp. Hy vọng bài viết mang đến cho các bạn những điều thú vị. Cảm ơn các bạn đã theo dõi.

**Tham khảo:**

https://developers.google.com/web/fundamentals/primers/service-workers/registration
https://developers.google.com/web/tools/workbox/guides/get-started