Trong bài viết này mình sẽ hướng dẫn tạo mã QR Code một cách rất đơn giản với gem rqrcode

### 1, Cài đặt gem
Giống như mọi cách cài đặt gem khác thêm vào `Gemfile`:

`gem 'rqrcode'`

hoặc cài đặt bằng câu lệnh

`gem install rqrcode`

Tiếp theo thêm vào file `config/application.rb`:

require 'rqrcode'

### 2, Tạo mã QR Code

Mình sẽ tạo một mã QR Code là đường link dẫn đến trang github

Ví dụ:
```
def index
    qrcode = RQRCode::QRCode.new("http://github.com/")

    @svg = qrcode.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6,
      standalone: true
    )
end
```

Câu lệnh RQRCode::QRCode.new("http://github.com/") sẽ tạo ra một mã QR Code với nội dung là đường dẫn tới trang github.
Mình sẽ thử hiển thị mã QRCode này

![](https://images.viblo.asia/343f08d8-22ab-4c7a-9132-44854dfc3111.png)

Nhìn nó trông không giống mã QR Code mà là một chuỗi string @@, mình thử inspect element

![](https://images.viblo.asia/cd420a6c-2917-4bed-bcf7-1ac5c5cb1d56.png)

Trông nó khá giống với một mã QR Code nếu như thay những dấu 'x' bằng ô vuông nhỏ màu đen

Với hàm as_svg sẽ giúp chuyển mã QR Code kia thành định dang svg và có thể sử dụng được, hàm as_svg đi kèm với 1 số option như là:
* offset: độ rông đương bao bên ngoài cho mã QR Code
* color: màu cho mã QR Code
* module_size: độ lớn cho mỗi ô vuông có màu trong mã QR Code

Mình sẽ show thử `<%= @svg %>`

![](https://images.viblo.asia/b0492a47-6d9f-4ff8-bce1-b6697c0b1c7f.png)

Điều này là do hàm as_svg sẽ tạo ra SVG nhưng dưới định dạng string, để hiển thị ảnh svg thì chỉ cần sử dụng `<%= @svg.html_safe %>`

![](https://images.viblo.asia/e7214d0e-efaf-490c-b970-22fa53b16718.png)

Giờ thì chúng ta đã có 1 mã QR Code hoàn chỉnh

Ngoài tạo mã QR Code dưới định dang SVG, gem rqrcode còn có thể tạo QR Code dưới định dạng PNG

Ví dụ:

```
def index
    qrcode = RQRCode::QRCode.new("http://github.com/")

    @png = qrcode.as_png(
      bit_depth: 1,
      border_modules: 4,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: 'black',
      file: nil,
      fill: 'white',
      module_px_size: 6,
      resize_exactly_to: false,
      resize_gte_to: false,
      size: 300
    )
  end
```

Hàm as_png sẽ tạo 1 ChunkyPNG::Image và để sử dụng được thì trong view thì chỉ cần như sau: `<img src="<%= @png.to_data_url %>" />`

Và Kết quả cũng cho 1 mã QR Code giống với như sử dụng as_svg nhưng với định dạng PNG

![](https://images.viblo.asia/da309e30-87ca-47cc-9265-82aa1b054253.png)

### Tài Liệu Tham Khảo

https://github.com/whomwah/rqrcode