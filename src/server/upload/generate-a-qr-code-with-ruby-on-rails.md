# Introduction
Bạn đã bao giờ nghĩ đến việc tổ chức một event nhỏ mang tính 4.0 chưa? Nếu bạn đã trả lời có cho câu hỏi này, thì bạn có nhiều khả năng quan tâm đến việc kiếm tiền và bán vé. Một cách để xác minh rằng ai đó đã mua vé là qua QR Code.
Bây giờ tôi sẽ hướng dẫn bạn build một web Ruby on Rails có thể generate QR code bằng `gem rqrcode`

RQRCode là một thư viện để tạo và hiển thị QR code thành nhiều định dạng khác nhau. Nó có một giao diện đơn giản với tất cả các tùy chọn QR code tiêu chuẩn. Nó được chuyển thể từ thư viện Javascript bởi Kazuhiko Arase.
# Installation
Mặc định bạn đã biết install ruby và rails nhé.

Thêm `gem 'rqrcode'` vào Gemfile trong ứng dụng của bạn.
Hoặc có thể cài đặt thủ công bằng command line `gem install rqrcode`.

Tạo một model là `Ticket` với attribute là `code` và action `show`.

Setup route cho Ticket:   `resources :tickets, only: :show`
# Basic usage example
```
require 'rqrcode'

qr = RQRCode::QRCode.new('http://github.com')
result = ''

qr.qrcode.modules.each do |row|
  row.each do |col|
    result << (col ? 'X' : 'O')
  end

  result << "\n"
end

puts result
```
# Advanced Options
Đây là các tùy chọn tạo QR Code khác nhau được cung cấp bởi rqrqcode_core.

> string - the string you wish to encode
> 
> size   - the size of the qrcode (default 4)
> 
> level  - the error correction level, can be:
>   * Level :l 7%  of code can be restored
>   * Level :m 15% of code can be restored
>   * Level :q 25% of code can be restored
>   * Level :h 30% of code can be restored (default :h)
> 
> mode   - the mode of the qrcode (defaults to alphanumeric or byte_8bit, depending on the input data):
>   * :number
>   * :alphanumeric
>   * :byte_8bit
>   * :kanji
Ví dụ : qrcode = RQRCodeCore::QRCode.new('VUONG', size: 1, level: :m, mode: :alphanumeric)
# Render types
Tạo sample data bằng seed :
```
10.times do
  Ticket.create! code: SecureRandom.hex
end
```
## as SVG
Basic
```
require 'rqrcode'

qrcode = RQRCode::QRCode.new("26946d181d1d45717d186d492843dedc")

# NOTE: showing with default options specified explicitly
svg = qrcode.as_svg(
  offset: 0,
  color: '000',
  shape_rendering: 'crispEdges',
  module_size: 6,
  standalone: true
)
```

Rails
```
def show
    @ticket = Ticket.find_by params[:id]

    qr_code = RQRCode::QRCode.new(@ticket.code)

    @svg = qr_code.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6
    )
  end
```

Output

![](https://images.viblo.asia/b2abb8c7-5fa0-4cb9-8eed-aaf62a73b3b2.png)

## as ANSI
Basic
```
require 'rqrcode'

qrcode = RQRCode::QRCode.new("26946d181d1d45717d186d492843dedc")

svg = qrcode.as_ansi(
  light: "\033[47m", dark: "\033[40m",
  fill_character: '  ',
  quiet_zone_size: 4
)
```

Rails
```
  def show
    @ticket = Ticket.find_by params[:id]

    qr_code = RQRCode::QRCode.new(@ticket.code)

    @svg = qr_code.as_ansi(
      light: "\033[47m", dark: "\033[40m",
      fill_character: '  ',
      quiet_zone_size: 4
    )
  end
```

Output
![](https://images.viblo.asia/b2abb8c7-5fa0-4cb9-8eed-aaf62a73b3b2.png)

## as PNG
Basic
```
require 'rqrcode'

qrcode = RQRCode::QRCode.new("26946d181d1d45717d186d492843dedc")

png = qrcode.as_png(
  bit_depth: 1,
  border_modules: 4,
  color_mode: ChunkyPNG::COLOR_GRAYSCALE,
  color: 'black',
  file: nil,
  fill: 'white',
  module_px_size: 6,
  resize_exactly_to: false,
  resize_gte_to: false,
  size: 120
)

IO.binwrite("/tmp/qrcode.png", png.to_s)
```

Rails
```
  def show
    @ticket = Ticket.find_by id: params[:id]

    qr_code = RQRCode::QRCode.new(@ticket.code)

    png = qr_code.as_png(
      bit_depth: 1,
      border_modules: 4,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: 'black',
      file: nil,
      fill: 'white',
      module_px_size: 6,
      resize_exactly_to: false,
      resize_gte_to: false,
      size: 120
    )

    IO.binwrite("./tmp/qrcode.png", png.to_s)
  end
```

Output
![](https://images.viblo.asia/9de8cea5-4f6d-40b4-a588-afed461d6424.png)

## On the console
Basic
```
require 'rqrcode'

qr = RQRCode::QRCode.new('vuongvuong', size: 4, level: :h)

puts qr.to_s
```

Output
![](https://images.viblo.asia/a433ab2a-4e06-4e84-aafb-1c1c34c7b0e3.png)

# API Documentation
http://www.rubydoc.info/gems/rqrcode

# Resources
https://github.com/whomwah/rqrcode

https://medium.com/@m.gould16/generate-a-qr-code-server-side-with-ruby-on-rails-f9e6e84488a8