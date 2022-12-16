Yo, hôm nay mình sẽ giới thiệu về `Clickjacking`, nó là gì, cách nó hoạt động ra sao và cách ngăn chặn nó .... nhé :v

# Khái niệm
> Clickjacking là một hình thức tấn công đánh lừa người dùng nhấp chuột vô ý vào một đối tượng trên website. Khi nhấp chuột vào một đối tượng trên màn hình, người dùng nghĩ là mình đang click vào đối tượng đó nhưng thực chất họ đang bị lừa click vào một đối tượng khác > đã bị làm mờ hay ẩn đi.
> Kẻ tấn công có thể sử dụng kỹ thuật tấn công này cho nhiều mục đích. Đánh cắp tài khoản người dùng, lừa click vào quảng cáo để kiếm tiền, lừa like page hoặc nguy hiểm hơn là cài một webshell lên máy chủ web.
# Cách hoạt động
Giả sử mình có 1 cái video super hot về ... Ngọc Trinh chẳng hạn :) đang rất hot, ai cũng muốn xem :). Vẫn là Mal - đực rựa phá hoại, hắn thấy rằng đây là một cơ hội tốt để trôm ít coin :) site của mình đang chạy có tên là `www.bach.com`, Mal có thể build 1 website của hắn có link same same trang của mình, và thêm iframe có đường dẫn tới site của mình ... ha. :)

```html
<html>
  <head>
    <style>
      body {
        position: relative;
        margin: 0;
      }

      iframe {
        border: none;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <iframe src="www.bach.com/video-ngoc-trinh">
    </iframe>
  </body>
</html>
```

Tiếp theo, Mal thêm 1 thẻ `div`  với `z-index` lên trên iframe và bao bọc nó bởi đường dẫn `xxx` :).

```html
<html>
  <head>
    <style>
      ...

      ...

      div {
        z-index: 100;
      }
        
      a {
        display: block;
      }
    </style>
  </head>
  <body>
    <iframe src="www.bach.com/video-ngoc-trinh">
    </iframe>
    <div>
        <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.buttholebalm.com&p[title]=Itchy"></a>
    </div>
  </body>
</html>
```
Bây giờ bất kỳ ai click xem video Ngọc Trinh trên trang của Mal thì đều bị chuyển tới trang mà Mal đã chỉ định RIP :).

## Rủi do
- Với kĩ thuật này, Mal có thể lấy cắp thông tin đăng nhập của bạn thông qua 1 cái form fake trông có vẻ **giống giống** trang thật.
- Lừa người dùng mở web-cam hoặc microphone bằng cách hiển thị các yếu tố vô hình trên trang cài đặt Adobe Flash.
- Phát tán `worms` trên các trang mạng xã hội.
- Phát tán `malware` bằng cách chuyển hướng người dùng tới link download chương trình độc hại.
- Quảng cáo lừa đảo.

## Ngăn chặn
`Clickjacking` tấn công bằng cách bao bọc trang web mà người dùng tin tưởng bởi `iframe`, sau đó render ẩn phần tử này lên trên cùng. Để chắc chắn trang web của bạn đang không bị lạm dụng bởi `Clickjacking`, bạn cần chắc rằng iframe chỉ được sử dụng cho những trang an toàn. Bạn có thể đưa cho trình duyệt `instructions directly` thông qua **HTTP headers**, hoặc với trình duyệt cũ hơn thì sài `client-side JavaScript`**`(frame-killing)`**.

### X-Frame-Options
`X-Frame-Options HTTP header` có thể dùng để biểu thị có hoặc không cho phép trình duyệt render các thẻ như `<frame>, <iframe>, <object>`. Nó được thiết kế đặc biệt để chống `clickjacking`. Bạn có thể tham khảo tại [đây](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).

### Content Security Policy
Đây là một phần của chuẩn `HTML 5` giúp cung cấp phạm bi bảo vệ rộng hơn `X-Frame-Options` header. Nó được thiết kế như là cách để liệt kê các tên miền có thể sử dụng tài nguyên như là `stylesheets`, `fonts`, `script` được phép nhúng.

Để kiểm soát phần được phép nhúng, bạn có thể sử dụng `frame-ancestors`:

```css
// không cho phép hiển thị trong frame
Content-Security-Policy: frame-ancestors 'none'

// chỉ được hiển thị trên chính website gốc
Content-Security-Policy: frame-ancestors 'self'

// được phép hiển thị trên các website được chỉ định
Content-Security-Policy: frame-ancestors *uri*
```

### Frame-Killing
Trên các trình duyệt cũ, cách thường được sử dụng để bảo vệ người dùng khỏi `clickjacking` là thêm `frame-killing JavaScript snippet` vào pages.

```html
<style>
  /* Hide page by default */
  html { display : none; }
</style>
```
```js
<script>
  if (self == top) {
    // Everything checks out, show the page.
    document.documentElement.style.display = 'block';
  } else {
    // Break out of the frame.
    top.location = self.location;
  }
</script>
```
hoặc với php:
```php
header("X-Frame-Options: DENY");
header("Content-Security-Policy: frame-ancestors 'none'", false);
```
Giải thích một chút: Khi trang web load, đoạn code trên sẽ kiểm tra domain của trang gốc có khớp với domain của cửa sổ trình duyệt hay không, nếu pass qua bước check thì được phép hiển thị.
# Tổng kết
Trên đây là những điều cơ bản về `Clickjacking`, hy vọng bài viết sẽ giúp ích cho bạn đọc. Happy coding ! <3