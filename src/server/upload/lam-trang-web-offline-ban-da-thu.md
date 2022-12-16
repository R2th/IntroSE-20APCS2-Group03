### Giới thiệu
Xin chào các bạn. Chắc bạn đã đọc tiêu đề và đã thắc mắc, một trang web offline ư. Tất nhiên rồi, trong bài viết này mình sẽ hướng dẫn các bạn làm một trang web có thể đọc offline được dựa trên cơ chế caching của trình duyệt nhé.

Mình xin lưu ý chỉ chạy offline được trên trình duyệt nào có hỗ trợ ServiceWorkers. Các bạn hãy tham khảo các trình duyệt có hỗ trợ nhé ở đây nhé [Service Workers ](https://caniuse.com/#feat=serviceworkers)


### ServiceWorkers là gì?
Service Workers (SW) là một script ở phía trình duyệt chạy ở dưới background, không phụ thuộc vào website.  SW thường được dùng cho các offline webapp hay PWA. 

Service Workers có những đặc điểm sau:
- Không liên kết với một trang cụ thể
- Không truy cập đến DOM
- Có thể dừng khi không sử dụng và chạy khi cần thiết.
- Chỉ hỗ trợ HTTPS
    
Với Service Worker chúng ta có thể:
- Làm cho trang web chạy nhanh hơn (Load trước một số data) và có thể chạy offline.
- Thực hiện một số tính năng ở background như: đẩy thông báo, load data trước.

Để kiểm tra trình duyệt có hỗ trợ service woker và đăng ký thì
```
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function(reg){
              console.log("SW registration succeeded. Scope is "+reg.scope);
          }).catch(function(err){
              console.error("SW registration failed with error "+err);
          });
      }
```
Service worker hoạt động dựa trên các sự kiện cơ bản sau: install, active và fetch
- **install**: là sự kiên dùng để cài đặt SW các link cần caching sẽ đăng ký ở sự kiện này.
- **active**: là sự kiện sau khi đã đăng ký thành công và SW đã chạy. Nó sẽ làm nhiệm vụ dọn dẹp bộ nhớ, xóa cache cũ chẳng hạn, ...
- **fetch**: là sự kiện khi vào những link mà mình đã đăng ký ở trên. Thay vì gửi request lên server để lấy nội dung nó sẽ lấy từ cache để trả về cho trình duyệt.

Có lẽ đến đây thì bạn đã hiểu phần nào về  Service Worker rồi. Bây giờ chúng ta sẽ bắt đầu làm một web offline nhé.
 
 
### Các bước thực hiện
Đầu tiên đương nhiên các bạn cần 1 website gồm file html, css, js, ... Gồm 1 trang web có thể chạy bình thường khi các bạn deploy. 
Ở đây mình có các file như sau: 

#### 1. Chuẩn bị source code
**index.html**: file hiển thị của trang web
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Offline Website</title>
    <link rel="stylesheet" href="./style.css">
  </head>

  <body>
    <div id="app">
      <div class="main">You need offline to watch content</div>
    </div>
    <script src="./script.js"></script>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
          .then(function(reg){
              console.log("SW registration succeeded. Scope is "+reg.scope);
          }).catch(function(err){
              console.error("SW registration failed with error "+err);
          });
      }
    </script>
  </body>
</html>
```

**style.css**: style một chút cho đồng hồ

```
/* reset */
html {
  font-family: sans-serif;
  font-weight: bold;
}

body {
  padding: 0;
  margin: 0;
}

.main {
  display: flex;
  justify-content: center;
  text-align: center; 
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url('./background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
}

.main .title {
  width: 100%;
  font-size: 40px;
  text-align: center;
}


.main .clock {
  font-kerning: none;
  font-size: 165.47pt;
  text-align: center;
}

.main .date {
  text-align: center;
  font-size: 40pt;
}
```

**script.js**: File này dúng để hiển thị đồng hồ ở chế độ offline

```
var clockInterval = null;
var onlineText = 'You need offline to watch content';
var clockTemplate = `
  <h3 class="title">A Offline Website</h3>
  <div id="clocktext" class="clock"></div>
  <div id="datetext" class="date"></div>
`;

function runClock() {
  const clockElement = document.querySelector('#clocktext');
  const dateElement = document.querySelector('#datetext');
  clockInterval = setInterval(function() {
    const date = new Date();
    const dateTimeFormat = date.toLocaleDateString('vi-VN',
      {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        day: 'numeric', month: 'numeric', year: 'numeric'
      }
    ).split(', ');
    clockElement.innerHTML = dateTimeFormat[0];
    dateElement.innerHTML = dateTimeFormat[1];
  }, 1000);
}

function online() {
  document.querySelector('.main').innerHTML = onlineText;
}

function offline() {
  document.querySelector('.main').innerHTML = clockTemplate;
  runClock();
}

if (navigator.onLine) online();
else offline();

window.ononline = online;

window.onoffline = offline;
```

**service-worker.js**: đây là file service-worker dùng để chạy và kéo các file đă đăng ký caching về. Nó chạy độc lập trên trình duyệt không phụ thuộc vào website.

```
const cacheName = 'my-precache-v1';
const PRECACHE_URLS = [
  'index.html',
  'background.jpg',
  'script.js',
  'style.css',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(PRECACHE_URLS))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
```

**background.jpg**: Và 1 file ảnh để làm background.

#### 2. Deploy

Mình đã cung cấp source của web ở trên và để **service worker** hoạt động thì đầu tiên website phải được chạy lên localhost hoặc là phải ở https. Nếu không trình duyệt sẽ không đăng ký được service woker và web của chúng ta sẽ không chạy được ở chế độ offline.

Các bạn có thể dùng bất cứ cách nào để có thể deploy được nhưng trong bài này mình sẽ dùng http-server để chạy trên localhost. Nếu muốn chạy trên internet các bạn có thể tìm hiểu thêm ngrok. Rồi giờ các bạn hãy tiếp tục làm theo mình nào.

Trước tiên máy tính các bạn phải có môi trường [NodeJs](https://nodejs.org/en/). Sau đó cài http-server bằng lệnh `npm install -g http-server`.
Sau đó vào thư mục chứa source của bạn và chạy `http-server -p 8080` vậy là code của bạn đã chạy trên [localhost:8080](http://localhost:8080/index.html)

![](https://images.viblo.asia/567297b3-c8ca-4c98-addb-1329451d4323.gif)

Đây là website sau khi chạy thành công.
Các bạn thử tắt wifi hay tắt server thử xem :D  Wow web vẫn chạy bình thường.  Có thể chạy được cả online và offline. 

![](https://images.viblo.asia/43d7c2b0-4889-4fb1-a3ae-59d7ae2d2aac.png)
Các bạn xem console mà hiện như vậy có nghĩa là đã đăng ký được service worker. 

![](https://images.viblo.asia/f2fa364a-1fef-4033-881b-89920063a1b7.png)
Vào đây để xem service worker đã start được hay chưa.

![](https://images.viblo.asia/34fe38b0-290c-4f7f-a1c4-d002f6a00b5b.png)

Và đây là các file đã cache được

### Kết luận

Trên đây mình đã giới thiệu sơ qua cho các bạn cách để làm 1 trang web offline như thế nào. Và Service Workers là gì.
Hy vọng bài viết này giúp ích được cho các bạn :)))))