# Vòng đời của service worker.

## Mục tiêu vòng đời của sw.

Một sw có các mục tiêu sau trong vòng đời của nó:

* Làm cho trang web có thể hoạt động offline được (tức không cần tới mạng).
* Cho phép sw mới (khi ta thay đổi cập nhật file sw) sẵn sàng hoạt động mà không làm ảnh hưởng tới sw hiện tại.
* Đảm bảo trang trong phạm vi quản lý của nó sử dụng chung một sw.
* Đảm bảo chỉ một sw hoạt động tại một thời điểm.

## Cài đặt sw

Khi đăng ký và cài đặt sw nó sẽ diến ra như sau:

* Sau khi đăng ký, thì event *install* là event đầu tiên mà sw phát ra, nó chỉ diễn ra một lần duy nhất. (trừ khi ta hủy đăng ký sw)
* Một promise được truyền vào event.waitUntil() để làm tín hiệu cho quãng thời gian đang ký cũng như trang thái thành công hay thất bại của việc đăng ký.
* Mặc định việc fetch các trang web sẽ không diễn ra nếu trang web chưa được request, khi các trang web được request nó sẽ phát ra event fetch để event handler của sw xử lý.
* clients.claim() có thể sử dụng để chiếm quyền điều khiển của các page chưa được điều khiển.

Ví dụ: đăng ký sw

```
<!DOCTYPE html>
An image will appear here in 3 seconds:
<script>
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered!', reg))
    .catch(err => console.log('Boo!', err));

  setTimeout(() => {
    const img = new Image();
    img.src = '/dog.svg';
    document.body.appendChild(img);
  }, 3000);
</script>
```

Đây là code của file sw:

```
self.addEventListener('install', event => {
  console.log('V1 installing…');

  // cache a cat SVG
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('/cat.svg'))
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/cat.svg'));
  }
});
```

Ở trên một ảnh sẽ được cache và khi request từ một url có trùng với url được cache ảnh sẽ được lấy từ cache ra.

### Scope và control

Mặc định scope của sw là *./* tương đối với script URL. Có nghĩa là nếu đăng ký sw ở *//domain/sw_register.js* thì scope mặc định là *//domain/*. Sw chỉ control được các page trong scope của nó. Ta có thể kiểm tra sw nào đang điều khiển page thông qua *navigator.serviceWoker.controller*

### Download, parse, và execute.

Khi ta gọi .register() thì điều đầu tiên file sw sẽ được tải về. Nếu việc download bị lỗi, hoặc file sw lỗi, hoặc có lỗi trong quá trình khởi tạo sw thì sw sẽ bị hủy bỏ.

### Cài đặt

Event install là event đầu tiên của sw sau khi đăng ký sw. Nó được trigger khi sw chạy, và chỉ được gọi một lần duy nhất tương ứng với mỗi sw. Nếu sau đó ta hủy đăng ký hoặc cập nhật sw thì sw mới cũng có event install riêng của nó.

Ở event install này ta có thể dùng để xử lý một số tác vụ liên quan tới việc cache trước khi để sw control các trang. Một promise được truyền vào event.waitUntil() sẽ cho browser biết khi nào và sw có đã được install thành công hay không. Nếu sw không được install thành công thì sw sẽ bị bỏ.

### Activate

Khi sw đã sẵn sàng để control client, thì event activate sẽ được phát ra. Lúc này ta có thể dùng nó để xử lý các event như push và sync.

### clients.claim

Ta có thể chiếm quyền điều khiển của các clients chưa được controll thông qua clients.claim() với sw khi đã được activate.

## Update sw

Update sw có thể được tóm tắt như sau:

* Một update được trigger khi:
	* Điều hướng đến một trang khác nhưng vẫn trong phạm vi điều khiển của sw
	* Khi thực hiện xử lý các event push hoặc sync
	* Khi gọi .register() vói url của sw thay đổi.

* Khi kiểm tra update sw, browser sẽ bỏ qua việc caching header của file sw.
* Một sw được xem là update nếu nó có sự thay đổi so với file sw cũ của browser tính đến từng byte.
* Update sẽ chạy song song với file sw cũ và có cho riêng mình sự kiện install.
* Nếu sw mới xảy ra lỗi trong quá trình cài đặt thì nó sẽ bị loại bỏ còn sw cũ vẫn có hiệu lực điều khiển các page của nó.
* Một khi được cài đặt thành công, sw mới sẽ chưa tiếp quản việc điều khiển page luôn mà nó sẽ chờ cho đến khi sw cũ không còn điều khiển page nào nữa.
* self.skipWaiting() cho phép sw mới bỏ qua việc chờ này.

Giả sử nếu đoạn code sw ở trên thay đổi như sau:

```
const expectedCaches = ['static-v2'];

self.addEventListener('install', event => {
  console.log('V2 installing…');

  // cache a horse SVG into a new cache, static-v2
  event.waitUntil(
    caches.open('static-v2').then(cache => cache.add('/horse.svg'))
  );
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the horse SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/horse.svg'));
  }
});
```

### Cài đặt

Ở event này ta định nghĩa một cache mới cửa sw mới, cho phép lưu dữ liệu mới mà không ghi đè lên cache cũ của sw cũ.

### Chờ sw cũ kết thúc

Sau khi cài đặt thành công sw mới sẽ tạm hoãn việc activate cho đến khi sw cũ không còn điều khiển page nào nữa. Chú ý việc refresh trang sẽ không làm sw cũ mất hiệu lực, ta có thể tắt tất cả các trang và bật lại thì sw mới sẽ được tiếp nhận điều khiển page.

### Activate

Khi sw cũ đã mất hiệu lực là lúc sw mới sẽ có quyền điều khiển page. Lúc này ta có thể thực hiện các tác vụ liên quan tới sync cache.

### Bỏ qua việc chờ.

Ta có thể bỏ qua việc chờ của sw mới bằng *self.skipWaiting()* trong event install của sw mới.

```
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    // caching etc
  );
});
```

### Update thủ công

Mặc định browser sẽ tự động kiểm tra update sw. Tuy nhiên ta có thể trigger update thủ công bằng cách:

```
navigator.serviceWorker.register('/sw.js').then(reg => {
  // sometime later…
  reg.update();
});
```

# Tài liệu tham khảo.
1. https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle