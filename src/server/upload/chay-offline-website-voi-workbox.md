Ở bài trước, mình đã giới thiệu cho các bạn về service worker và cách để có thể chạy offline trang web của bạn. Bài này thì mình sẽ giới thiệu tới bạn 1 thư viện là workbox. Workbox là tập hợp các thư viện và node modules giúp chúng ta dễ dàng cache những tài nguyên của web lại và tận dụng tối đa các tính năng để xây dựng một Progressive Web Apps.

## Cách cài đặt
Bạn có thể cài đặt workbox qua rất nhiều cách: workbox CLI, Gulp or Node, Webpack, CDN. Để rõ hơn thì các bạn hãy tìm hiểu trong này nhé: https://developers.google.com/web/tools/workbox/guides/precache-files/cli. Ở đây mình sẽ đơn giản chỉ dùng CDN thôi (cho nhanh ý mà :smile:). Còn các bạn chọn cách nào thì đó là lựa chọn riêng của mỗi người nhé. Để chạy được workbox, rất đơn giản, mình sẽ chỉ cần dùng cdn trong file `sw.js`
```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
```

## Sử dụng
Giờ thì hãy comment hết đống code ở bài trước lại nhé. Chúng ta sẽ kiểm tra xem workbox có chạy hay không
```javascript
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
```

Nếu trong log của bạn hiện ra như hình thì là thành công rồi đó
![](https://images.viblo.asia/abecc779-c566-4b11-bf6b-0d06df471ed6.png)

Tiếp tới sẽ là việc cache lại các file, chúng ta vẫn sẽ có các file cần cache nhé
```javascript
const filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
];
```

Sau đó chỉnh cần thêm
``` javascript
workbox.precaching.precacheAndRoute(filesToCache);
```

Xem nè, thay vì 1 đống code dài dòng khó hiểu, giờ chúng ta sẽ chỉ cần đúng 1 dòng và workbox đã làm hết phần còn lại. Kiểm tra lại thử xem sao nhé. Trong log của bạn giờ sẽ có thông báo của workbox như sau:
![](https://images.viblo.asia/ea8e1a6c-e19c-4f55-82e6-7da27e60bdce.png)

Và chúng ta đã cache được lại các file
![](https://images.viblo.asia/f43d5d07-e28d-4727-9ded-1aa1e89dfdb3.png)

Nhưng vẫn còn thiếu thiếu gì đó. À, đó mới là những file static chúng ta tự thêm vào, giờ tới những resource mà chúng ta sẽ truy cập vào thì sao. Hãy cùng nhìn đoạn code dưới đây nhé
```javascript
 workbox.routing.registerRoute(
        new RegExp('/'),
        new workbox.strategies.NetworkFirst({
            cacheName: 'pages-cache',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 30 * 24 * 60 * 60
                })
            ]
        })
    );
``` 

### workbox-routing
Đầu tiên bạn sẽ thấy có đoạn
```javascript
workbox.routing.registerRoute
```
Router trong workbox là quá trình của router khi match với 1 request và sau đó xử lý request đó. Method `registerRoute` sẽ nhận tối đa 3 tham số truyền vào `(capture, handler, method)`. `Capture`: Có thể là RegExp, string, module:workbox-routing.Route~matchCallback, hoặc module:workbox-routing.Route), nếu truyền vào capture là một Route, tất cả các đối số khác sẽ bị bỏ qua. `Handler` (Optional): một callback function trả về một Promise, tham số này sẽ là bắt buộc nếu `capture` không phải là Route. `Method` (Optional): Phương thức http của tham số truyền vào trong `capture`. Ngoài ra vẫn còn có những class, method khác mà bạn có thể tìm hiểu thêm: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-routing

Vậy là ở đây, `capture` mình truyền vào sẽ là `new RegExp('/')`. Nó có ý nghĩa gì? Nó nghĩa là mình sẽ cache tất cả mọi request. Ví dụ nếu bạn chỉ muốn cache lại các file js thì sẽ là như này `new RegExp('\\.js$')`. 

### workbox-strategies
Tới phần `handler`, ở đây thì mình có sử dụng `workbox-strategies`. Sẽ có những cách mà chúng ta muốn cache lại những tài nguyên của mình và sử dụng nó. Modules này sẽ cung cấp cho ta một vài cách vô cùng đơn giản:
#### CacheFirst
Workbox sẽ tìm những tài nguyên trong cache trước, nếu không có thì sẽ fetch từ network. Nên sử dụng cho những file ít thay đổi như các resource từ thư viện, font, ...
![](https://images.viblo.asia/bd347cd0-8ae7-4398-a556-a5b5501de760.png)
#### NetworkFirst
Workbox sẽ kiểm tra request từ network trước. Nếu không có thi sẽ lấy từ trong cache ra. Nên sử dụng cho server-side-rendered HTML , api,...
   ![](https://images.viblo.asia/bd347cd0-8ae7-4398-a556-a5b5501de760.png)

#### CacheOnly
Chỉ lấy dữ liệu từ cache. Nên sử dụng khi có những dữ liệu static đã được cache và chỉ cần sử dụng cái đó.
![](https://images.viblo.asia/86b85239-5758-4a03-8765-adc39fa54b34.png)

#### NetworkOnly
Cái này thì không dùng làm offline được rồi, vì nó sẽ chỉ lấy từ network.
![](https://images.viblo.asia/d93fdf01-efa4-43a0-9929-7e70535ee4c5.png)

#### Stale-while-revalidate
Lấy dữ liệu từ cả cache và network. Sử dụng dữ liệu từ cache nếu khả dụng, sau đó sẽ quay trở lại với network. Cập nhập cache với response từ network
![](https://images.viblo.asia/a99b6575-ebda-4684-b211-82a1014231db.png)

Với web thực tế, bạn lấy dữ liệu từ api về thì cứ mạnh dạn cache api lại nhé. Và bạn cũng có thể giới hạn thời gian cache, số request cache, tìm hiểu thêm ở đây nha: https://developers.google.com/web/tools/workbox/guides/using-plugins#workbox_plugins

Bài viết hôm nay xin dừng ở đây. Mong rằng bài viết sẽ giúp ích được cho các bạn :smile: