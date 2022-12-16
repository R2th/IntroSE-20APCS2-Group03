Khi ghé thăm một website trong tình trạng không có kết nối mạng sử dụng trình duyệt Chrome, chắc hẳn mọi người đều quen thuộc với hình ảnh chú khủng long với dòng thông báo "*There is no Internet connection*". Người dùng có xu hướng cho rằng, một ứng dụng web sẽ có độ tin cậy thấp hơn so với 1 ứng dụng native bởi 1 lẽ: họ không thể sử dụng khi không có kết nối mạng. 

Cho đến nay, lập trình viên có thể sử dụng **App Cache** để tạo ra một trải nghiệm ngoại tuyến cho người dùng, nhưng đây không phải một cách tối ưu và được áp dụng rộng rãi. Vì một vài lí do, lập trình viên cảm thấy khó trong việc áp dụng **App Cache** vào các dự án thực tế.

May thay, một tiêu chuẩn web mới được ra đời: **Service Worker**, có khả năng thay thế **App Cache** bằng việc cung cấp quyền kiểm soát kết nối mạng chi tiết hơn sử dụng Javascript. 

Hiện tại, chúng ta đã quen với việc sử dụng **Service Worker** để hiển thị một trang lỗi đơn giản được tùy biến theo nhu cầu cá nhân khi người dùng quay trở lại trang web trong tình trạng không có kết nối. 

> Ngoài lề: Đã bao giờ bạn tự hỏi, liệu một phản hồi ngoại tuyến sẽ được liên kết tới một mã trạng thái HTTP không? Tôi thì không nghĩ rằng có tồn tại một mã trạng thái đối với "*No network connection*". Nếu tiềm năng của **Service Worker** được nhận thức đầy đủ, thì về mặt lý thuyết, các nhà phát triển web có thể tạo ra trải nghiệm người dùng phong phú hơn, mặc kệ vấn đề kết nối Internet. Nhưng, chúng ta đang nói đến một phản hồi ngoại tuyến duy nhất - phản hồi mà người dùng nhận được khi request của họ không thể hoàn thành, liên quan tới các trạng thái như *Not found*, *Moved permanently*, *Site offline for maintainance*. Tựu chung lại là một request không bao giờ có thể tới được server.

Để thực hiện, chúng ta sử dụng **Service Worker** để cache lại offline assets trong lần truy cập đầu tiên. Sau đó, khi truy cập lại trong tình trạng ngoại tuyến, **Service Worker** sẽ render offline page đã được cache. Điều này hoàn toàn thực tế, bởi **Service Worker** hoạt động như một mối liên lạc giữa trình duyệt và server nằm ngoài vòng đời của trang web. Lưu ý rằng, **Service Worker** không có sẵn đối với mọi loại trình duyệt, cho nên cách tiếp cận này có thể không hoạt động với tất cả mọi người dùng.

# Chuẩn bị assets
Trước tiên, chúng ta cần setup một offline page. Chúng ta có thể đơn giản sử dụng một template HTML được xây dựng sẵn giống như cách chúng ta tạo ra các trang lỗi 404 hay 500. Hoặc cũng có thể setup một route cho một controller để xử lý vấn đề này một cách dynamic.

# Thêm vào file Service Worker
Việc chúng ta cần làm là cache lại trang HTML chúng ta vừa tạo ra trên phía client trong lần truy cập đầu tiên để nó có sẵn trong những lần truy cập tiếp theo. Tất nhiên, chúng ta có thể thêm các liên kết đến các nguồn CSS, JavaScript và hình ảnh bên ngoài trong các trang ngoại tuyến của mình, và nhớ là phải cache lại các tài nguyên đó.

File script service worker cần phải nằm ngoài ```application.js``` hoặc các bundled assets. Nó có thể nằm ở bất cứ chỗ nào mà ```Sprocket``` có thể load. Ở đây tạm thời chúng ta sẽ thêm nó vào ```app/assets/javascripts/serviceworker.js```. 

Vì nó không được gói lại cùng với ```application.js``` chúng ta cần setting để Rails có thể precompile file script service worker một cách riêng biệt
```ruby
# config/initializers/assets.rb

Rails.application.config.assets.precompile += %w[serviceworker.js]
```

# Định nghĩa sự kiện "install"
Vì **Service Worker** được điều khiển dựa trên các sự kiên, chúng ta sẽ định nghĩa các callbacks cho 3 sự kiện chính trong vòng đời của 1 service worker: *install*, *activate* và *fetch*.

Sự kiện ```install``` sẽ được thực thi chỉ lần đầu tiên khi mà service worker được request, hoặc bất kì lúc nào mà nó được update và deploy lại trước khi được ```active```

```js
var version = 'v1::';

self.addEventListener('install', function onInstall(event) {
  event.waitUntil(
    caches.open(version + 'offline').then(function prefill(cache) {
      return cache.addAll([
        '/offline.html',
        // etc
      ]);
    })
  );
});
```

```event.waitUntil``` đảm bảo rằng sự kiện ```install``` phải thành công để hoàn thành việc cài đặt service worker. Chúng ta sử dụng ```caches.open``` để trả về việc thêm các static offline assets tới một bộ nhớ đệm được đặt tên có liên kết tới site của chúng ta và trình duyệt của người dùng. Cache API cung cấp một bộ nhớ bên phía client-side cho các cặp request/response, tương tự như một bộ nhớ đệm HTTP được tích hợp.

# "fetch" hoặc fallback
**Service Worker** có thể ngăn chặn bất kỳ external network request nào từ trình duyệt của người dùng, kể cả với các máy chủ cross-origin trong sự kiện ```fetch```
```js
self.addEventListener('fetch', function onFetch(event) {
  var request = event.request;

  if (!request.url.match(/^https?:\/\/example.com/) ) { return; }
  if (request.method !== 'GET') { return; }

  event.respondWith(
    fetch(request).                                      // first, the network
      .catch(function fallback() {
        caches.match(request).then(function(response) {  // then, the cache
          response || caches.match("/offline.html");     // then, /offline cache
        })
      })
  );
});
```
Đoạn code trên sẽ lọc ra các request đến máy chủ có phương thức GET. Thực hiện ```return``` trong trường hợp request url không match hoặc request method không phải GET sẽ được hiểu đơn giản là cho phép trỏ thẳng tới server. Để có thể cung cấp 1 offline fallback, trước hết sẽ thực hiện fetch request gửi tới. Nếu request không được hoàn thành thì catch handler sẽ được thực thi bằng cách thử xem request có được cache hay chưa , nếu chưa sẽ trả về offline page đã được cache lại trước đó.
# Dọn dẹp trong quá trình "activate"
Sự kiện ```active``` rất hữu ích để dọn sạch bộ nhớ cache cũ, khi mà offline page hoặc bất kì tài nguyên nào có sự thay đổi.
```js
// var version = "v2::";

self.addEventListener('activate', function onActivate(event) {
  event.waitUntil(
    caches.keys().then(function deleteOldCache(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return key.indexOf(version) !== 0;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```
Nếu như nhà phát triển deloy service worker với 1 mã phiên bản khác, quá trình cài đặt sẽ được thực thi lại để cache lại các tài nguyên tĩnh cho offline page. Trong quá trình ```activate```, bất kì tên bộ đệm nào không khớp với mã phiên bản sẽ bị loại bỏ.

# Đăng ký cho worker
Việc tiếp theo cần làm sau khi đã chuẩn bị đầy đủ cho service worker của chúng ta, đó là thực hiện ```register``` cho worker được định nghĩa trong bất kì file nào đã được include trong ```application.js```
```js
// app/assets/application.js

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js');
}
```
Mấu chốt ở đây là đoạn script này cần có sẵn ở scope mong muốn service worker hoạt động. Nói cách khác, đặt file worker ở đường dẫn được precompile ```/assets/serviceworker.js``` sẽ khá là vô nghĩa khi chúng ta không thể chặn các request đến root path.

# Thêm thắt một số yếu tố trung gian
Để mọi thứ có thể hoạt động được với Rails asset pipeline, chúng ta có thể dùng gem ```serviceworker-rails```
```ruby
# Gemfile

gem "serviceworker-rails"
```
```ruby
# config/initializers/serviceworker.rb

Rails.application.configure do
  config.serviceworker.routes.draw do
    match "/serviceworker.js"
  end
end
```
Bất kì request nào đến đường dẫn ```/serviceworker.js``` sẽ match với asset có tên đó. Nếu đoạn script service worker nằm trong một nested directory thì có thể sử dụng như sau:
```ruby
match "/serviceworker.js" => "nested/directory/serviceworker.js"
```
Để nắm rõ hơn cách thức config các bạn có thể đọc trong file [README](https://github.com/rossta/serviceworker-rails/blob/master/README.md) của thư viện này.

# Kết quả
Ở đây chúng ta có một demo cho một offline page sau khi đã qua tất cả các bước cài đặt như trên. Các bạn hãy truy cập vào, disable network và trải nghiệm thử tại [đây](https://serviceworker-rails.herokuapp.com/offline-fallback/). 
Và đây là [source code trên github](https://github.com/rossta/serviceworker-rails-sandbox).

# Debugging
Trình duyệt Chrome cung cấp công cụ hỗ trợ debug cho service worker nằm trong tab ```Sources``` của DevTools. Khá là hữu ích khi có thể vọc sâu vào vòng đời của 1 service worker, khi mà nó khác nhiều so với các tài nguyên Javascript thông thường. For example: hard refresh thôi là chưa đủ để trình duyệt tiến hành cài đặt và update worker - trình duyệt sẽ để cho worker hiện hành active khi mà bạn còn đang mở bất kì tab nào trên trình duyệt. Bạn cần phải điều hướng đến một host khác rồi back lại, hoặc đóng và mở lại tab. 
Function ```self.skipWaiting``` sẽ cho phép service worker mới chiếm quyền kiểm soát ngay lập tức khi quá trình cài đặt vẫn đang diễn ra khi người dùng sử dụng.
```js
self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});
```


-----
*(Bài viết được tham khảo tại https://rossta.net/blog/offline-page-for-your-rails-application.html)*