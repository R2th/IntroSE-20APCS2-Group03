## Giới thiệu

[Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) là một file JSON (manifest.json), file này giúp trình duyệt đọc được nội dung Web App của chúng ta. Mình hiểu nôm nay là tệp kê khai.

Một tệp kê khai (manifest) bao gồm những nội dung chính như `name`, `icons`, `start_url`, v.v.

## Tạo manifest

Tạo một tệp kê khai (manifest) hoàn chỉnh cho Progressive Web App (PWA) bao gồm những nội dung chính sau:

```JSON
{
  "short_name": "Maps",
  "name": "Google Maps",
  "icons": [
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/maps/?source=pwa",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/maps/",
  "theme_color": "#3367D6"
}
```

## Sử dụng manifest

Sau khi hoàn thành việc tạo một tệp kê khai (manifest),  bạn thêm nội dung bên dưới vào tất cả các pages trong ứng dụng Web App của mình.
```HTML
<link rel="manifest" href="/manifest.json">
```

## Phân tích manifest properties

**short_name** / **name**

Trong tệp kê khai (manifest), bạn phải cung cấp ít nhất một trong hai thuộc tính là `short_name` hoặc `name`. Nếu sử dụng cả hai, `short_name` sẽ được sử dụng trên màn hình chính (home screen), trình khởi chạy (launcher) hoặc những nơi khác mà không gian có thể bị giới hạn. `name` được sử dụng trên [app install prompt](https://developers.google.com/web/fundamentals/app-install-banners/).

```
"short_name": "Maps",
"name": "Google Maps"
```

**icons**

Khi người dùng thêm trang Web của bạn vào màn hình chính của họ, bạn có thể set những icons để trình duyệt sử dụng. Các biểu tượng này được sử dụng ở những nơi như màn hình chính (home screen), trình khởi chạy ứng dụng (app launcher), trình chuyển đổi tác vụ (task switcher), màn hình splash, v.v.

`icons` là một mảng (array) các đối tượng hình ảnh (image objects), mỗi đối tượng nên bao gồm một thuộc tính đường dẫn `src`, thuộc tính kích thước `sizes`, và loại hình ảnh `type`.

```
"icons": [
  {
    "src": "/images/icons-192.png",
    "type": "image/png",
    "sizes": "192x192"
  },
  {
    "src": "/images/icons-512.png",
    "type": "image/png",
    "sizes": "512x512"
  }
]
```

**start_url**

`start_url` cho trình duyệt biết ứng dụng của chúng ta bắt đầu từ đâu khi nó được khởi chạy (launched), đồng thời chặn những ứng dụng start trên bất kỳ trang nào mà người dùng sử dụng khi họ thêm ứng dụng của bạn vào màn hình chính.

`start_url` nên điều hướng (direct) người dùng thẳng vào ứng dụng của bạn. 

```
"start_url": "/?utm_source=a2hs"
```

**background_color**

Thuộc tính `background_color` được sử dụng cho [splash screen ](https://developers.google.com/web/fundamentals/web-app-manifest/#splash-screen) khi ứng dụng của bạn khởi chạy lần đầu.

**display**

Khi ứng dụng của bạn khởi chạy, bạn có thể tuỳ chỉnh (customize) browser UI theo ý muốn. Ví dụ, bạn có thể làm ẩn thanh địa chỉ (address bar) và trình duyệt chrome (browser chrome). Hay đối với games, bạn sẽ muốn ứng dụng full toàn màn hình.

```
"display": "standalone"
```

**orientation**

Bạn có thể thực thi một hướng màn hình cụ thể, đó là advantage cho các ứng dụng hoạt động chỉ trong một hướng, chẳng hạn như games. Người dùng thích màn hình của họ luôn nằm ngang.

```
"orientation": "landscape"
```

**scope**

`scope` xác định tập hợp các URL trong ứng dụng của bạn, và được sử dụng để quyết định thời điểm bạn rời khỏi ứng dụng. `scope` kiểm soát cấu trúc url bao gồm tất cả các điểm vào (entry points) và thoát (exit points) trong ứng dụng web. `start_url` phải nằm trong `scope`.

```
"scope": "/maps/"
```

Một số điểm cần lưu ý:

* Nếu bạn không include `scope` trong tệp kê khai (manifest), default `scope` sẽ được áp dụng, `scope` sẽ là thư mục trong ứng dụng Web App của bạn được served.
* Giá trị của `scope` có thể là đường dẫn tương đối (relative path `../`) hoặc đường đường dẫn cấp cao hơn (higher level path `/`).
* `start_url` phải nằm trong `scope`.
* `start_url` liên quan đến đường dẫn được định nghĩa bên trong thuộc tính `scope`.
* Một `start_url` bắt đầu với `/` sẽ luôn luôn là root của ứng dụng.

**theme_color**

`theme_color` thiết lập màu sắc của thanh công cụ (tool bar) và trình chuyển đổi tác vụ (task switcher).

```
"theme_color": "#3367D6"
```

## Test manifest

Để verify tệp kê khai (manifest) của bạn được thiết lập chính xác, bạn có thể sử dụng tab **Manifest** trong panel **Application** của Chrome DevTools.

Tại đây bạn có thể nhìn thấy lần lượt các thuộc tính được khai báo trong tệp kê khai (manifest) của bạn. Bạn cũng có thể mô phỏng sự kiện Add to Home Screen (thêm vào màn hình chính) từ đây. 

Mình lấy ví dụ thực tế ngay tại site about-page của mình [sydinh.com](https://sydinh.com/)

![](https://images.viblo.asia/918389ac-a7d5-4552-b2c3-824b4b15d6b3.png)

Nếu bạn muốn có một cách tiếp cận tự động hơn (automated approach) để xác thực tệp kê khai (manifest) ứng dụng web của mình, [Lighthouse](https://developers.google.com/web/tools/lighthouse/) sẽ giúp bạn thực hiện điều đó. Lighthouse (ngọn hải đăng) là công cụ kiểm tra (auditing) ứng dụng web, nó chạy như một tiện ích của Chrome (Chrome Extension) hoặc là NPM module.

Bạn cung cấp cho Lighthouse một URL, nó sẽ chạy kiểm tra trang và sau đó hiển thị kết quả.

Ví dụ page [sydinh.com](https://sydinh.com/)

![](https://images.viblo.asia/48fb6524-619d-49d5-9bd2-dd7403607396.png)

## Kết luận

Trên đây là kiến thức mình lượm nhặt được trong quá trình tìm hiểu về Web App và PWA. 

Các bạn tham khao thêm ở đây nhé: [The Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/).

Chúc các bạn học tốt !