# Lời mở đâu.

Với các website trước đây yêu cầu đòi hỏi để chúng hoạt động là luôn phải có mạng, mỗi khi vào website thì cần phaỉ load lại trang toàn bộ trang rất lâu, và các notifications chỉ đến được với người dùng khi họ vẫn còn mới website, khi họ đã rời đi thì không còn cách nào khác để thông báo. Đây là những điểm yếu của công nghệ web trước kia cũng là những điểm mạnh của các native apps. Tuy nhiên giờ đây với các tiêu chuẩn mới PWA (tạm gọi là công nghệ web tiên tiến) đã có thể đưa các điểm yếu trên trở thành hiện thực lên các website. Và một trong những thành phần làm nên điều đó là service worker (sw).

# Giời thiệu về service worker.

## Service worker là gì?

Service worker là một tệp chương trình viết bằng javascript được browser chạy ngầm và tách biệt khỏi trang web, nó mở ra cánh của cho các tính năng không yêu cầu giao diện hoặc tương tác với người dùng ví dụ: đồng bộ ngầm và push notifications... Tương lại service worker có thể hỗ trợ định vị địa lý hoặc đồng bộ định kỳ. Service worker có khả năng bắt và xử lý các request trên mạng và có thể quản lý việc cache các response trả về. Do đó nó hỗ trợ chạy website cả khi không có mạng, push notifications, và load nhanh.

Nói tóm lại service worker có các điểm sau:

* Nó là một file javascript không can thiệp trực tiếp và DOM của website, thay vào đó nó giao tiếp với các page thông quả một giao diện đặc biệt (postMessage), và tương tác với DOM thông qua các page đó.

* SW là proxy mạng có thể lập trình được, tức nó cho phép ta điều khiển cách mà các request được xử lý.

* Nó tắt khi không được dùng đến và sẽ khởi động lại khi cần đến.

* SW sự dụng rộng rãi khái niệm Promises.

## Vòng đời của sw.

Một sw có vòng đời tách biệt khỏi trang web.

Để cài đặt sw của một trang web, ta cần đăng ký nó bằng javascript của trang web. khi đăng ký sw browser sẽ bắt đầu quá trình đăng ký sw ngầm. Trong bước cài đặt sw nếu muốn ta có thể cache các assets tĩnh, khi việc cache này được hoàn thành nghĩa là sw đã được cài đặt. Nếu các tệp không được cache thành công hoặc không được tải thành công thì sw worker sẽ không cài đặt được và sẽ không active. Sau khi cài đặt thành công sw sẽ bước qua giai đoạn active.

Ở giai đoạn active ta có thể tiến hành các thao tác xử lý các cache cũ.

Sau giai đoạn active sw sẽ tiến hành điều khiển web page trong phạm vi của nó. Một khi sw nắm được quyền điều khiển nó sẽ có 2 trạng thái: hoặc sw sẽ kết thúc luôn để tiết kiệm bộ nhớ hoặc nó sẽ xử lý việc tìm và hiển thị các event khi các request mạng hoặc notification diễn ra.

Dưới đây là ảnh về vòng đời của sw:

![](https://images.viblo.asia/9f6cd6fc-3686-4125-8743-c839683f2ed1.png)

## Các điểu kiện cần có để sử dụng sw.

### Sự hỗ trợ của browser

Hầu hết các browser hiện đại hiện nay đều đã bắt đầu hỗ trợ sw như: Chrome, FireFox, Opera, Ms Edge...

### Cần Https

Https là yêu cầu đối với các website khi muốn sử dụng sw. Vì khi sử dụng sw ta có thế cướp các connection, làm giả và thay đổi các response do đó sử dụng https cho sw đảm bảo sự an toàn của các request trên môi trường mạng.

## Đăng ký một sw

Để tiến hành đăng ký và cài đặt sw ta tiến hành quá trình đăng ký sw bằng javascript ở trang web. Điều này thông báo cho browser nơi ta đạt file service worker.

```
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```

Đoạn code trên kiểm tra sự hỗ trợ của browser với sw, nếu có hỗ trợ sẽ đăng ký file sw một khi page được load.

Ta có thể gọi phương thức register() mà không cần quan tâm sw đã được cài đặt hay chưa, browser sẽ biết sw đã được cài đặt hay chưa chạy hoặc không chạy tiếp phương thức trên.

Khi đăng ký sw ta cần chú đến phạm vi của nó. Nó sẽ có phạm vi tự nơi mà nó được đặt vì vậy với đoạn code trên nó sẽ có phạm vi là toàn bộ domain của website.

## Cài đặt sw

Thông thường sau quá trình đăng ký ta đã có thể sử dụng sw nhưng các tính năng như cache, push notification sẽ chưa hoạt động được. Ta cần cài đặt sw trước. Để tiến hành cài đặt thêm cho sw ta sẽ xỷ lý event install của nó.

Trong callback của install event ta có thể:

* Mở một cache mới
* Cache các file cần thiết.
* Xác nhận có hay không các asset được yêu cầu cần được cache.

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```

## Cache và trả về các request
Sau khi đã cài đặt sw và user sử dụng điều hướng hoặc refresh lại trang thì sw sẽ bắt đầu nhận các fetch event. Sau đó sẽ xử lý chúng:

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

Ở trên ta định nghĩa một event fetch và với event.respondWith(), ta truyền vào một promises của caches.match(). Phương thức này sẽ request nhìn vào request và tìm bất kỳ kết quả nào trùng khớp mà sw đã cached từ trước. Nếu có kết quả trùng khớp ta sẽ trả về giá trị, nếu không ta sẽ trả về kết quả của việc gọi phương thức fetch bằng việc tạo một request và trả về dữ liệu lấy được từu request đó trả về. 

## Update service worker

Khi cần update sw ta cần làm theo các bước sau:

* Update file js của sw. Một file js sw được coi là mới nếu file mới và file cũ khác nhau bằng byte.
* SW mới sẽ được đăng ký và event install sẽ được bắn ra.
* Nếu sw cũ còn đang điều khiển trang web thì sw mới sẽ được đưa vào trạng thái awaiting.
* Khi trang web bị tắt (đóng trình duyệt) thì sw cũ sẽ bị hủy và sw mới sẽ chiếm được quyền điều khiển.
* Sau đó event activate của sw mới  sẽ được bắn ra.

Khi update sw một trong những việc cần xử lý là quản lý lại việc cache, xóa bỏ cache cũ và tạo ra cache mới cho sw. Qua trình này diễn ra ở event activate của sw mới.

```
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

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
```

Đoạn code trên sẽ lặp qua cache và xóa đi các cache không nằm trong whitelist.

# Tài liệu tham khảo
1.) https://developers.google.com/web/fundamentals/primers/service-workers/#cache_and_return_requests