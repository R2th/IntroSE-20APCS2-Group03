![](https://images.viblo.asia/342ef51a-78fa-4e86-99cc-e611098dc797.png)
# 1. Giới thiệu gem barby :
- `Barby` là 1 gem giúp chúng ta generate barcode với những kiểu (`symbology`) khác nhau và, cung cấp những phương thức export (`outputter`) để export barcode được generate ra những định dạng khác nhau.
- Gem `barby` được chia thành 2 component chính là `Barby::Barcode` và `Barby::Outputter`.
- `Barby::Barcode` chịu trách nhiệm xử lý logic, convert chuỗi kí tự thành `bars and spaces`, các class đại diện cho các kiểu barcode (`symbology`) khác nhau đều kế thừa từ class `Barby::Barcode`.
- `Barby::Outputter` chịu trách nhiệm export barcode được sinh ra nhờ `Barby::Barcode` thành các kiểu định dạng khác nhau, các class đại diện cho các định dạng khác nhau đều kế thừa từ class `Barby::Outputter`.

# 2. Cài đặt và sử dụng:
## a. Cài đặt gem barby:
- Để sử dụng gem `barby` trong project,  ta thêm gem `barby` vào Gemfile và chạy `bundle install`.
```
gem "barby"
```
- Sau khi cài đặt thành công gem `barby`, ta có thể sử dụng hầu hết các `symbology` kế thừa từ `Barby::Barcode` và `outputter` kế thừa từ `Barby::Outputter`.
- Tuy nhiên có 1 số `symbology` và `outputter` để sử dụng được thì ta phải cái đặt thêm 1 số dependencies khác.
- Ví dụ để sử dụng `symbology` của QR Code (class `Barby::QrCode` kế thừa class `Barby::Barcode`)  ta phải cài đặt thêm gem `rqrcode`, hay để sử dụng `outputter` của PNG (class `Barby::PngOutputter` kế thừa class `Barby::Outputter`) ta phải cài đặt thêm gem `chunky_png`
- Trong ví dụ lần này, mình sẽ sử dụng 1 số `symbology` sau: `Barby::Code25`, `Barby::Ean13` và `Barby::Ean8` cùng với `outputter` là  `Barby::PngOutputter`.
## b. Sử dụng các loại symbology khác nhau:
- Để tạo các loại `symbology` khác nhau, ta cần include file `barby` và file thự viện tương ứng với `symbology` muốn tạo.
-  Ví dụ để tạo barcode với `symbology` là `Barby::Code25` ta có thể thực hiện như sau:
```
require "barby"
require "barby/barcode/code_25"

barby = Barby::Code25.new "123456"
barby = Barby::Code25.new "abcdef"
barby = Barby::Code25.new "123abc"
barby = Barby::Code25.new "123abc"
barby = Barby::Code25.new ""
barby = Barby::Code25.new nil
```
- Tất cả các phép khởi tạo trên đều hợp lệ.
- Để tạo barcode với `symbology` là `Barby::Ean13`, ta có thể thực hiện như sau:
```
require "barby"
require "barby/barcode/ean_13"

barby = Barby::EAN13.new "012345678912"
barby = Barby::EAN13.new "0123456789123"
barby = Barby::EAN13.new "01234567891a"
```
- Chỉ có phép khởi tạo thứ nhất là hợp lệ, các phép khởi tạo còn lại đều không hợp lệ.
```
ArgumentError: data not valid
```
- Nguyên nhân là `Barby::EAN13` chỉ nhận data hợp lệ là 1 chuỗi 12 kí tự là số, bạn có thể thm khảo tại [đây](https://github.com/toretore/barby/blob/master/lib/barby/barcode/ean_13.rb#L54).
- Tương tự `Barby::EAN8`chỉ nhận data hợp lệ là là 1 chuỗi 7 kí tự là số, bạn có thể thm khảo tại [đây](https://github.com/toretore/barby/blob/master/lib/barby/barcode/ean_8.rb#L8). 
- Các bạn cần chú ý điều này khi khởi tạo các loại `symbology` khác nhau.
## c. Sử dụng các loại outputter khác nhau:
- Tương tự như `symbology`, để tạo các loại `outputter` khác nhau, ta cần include file `barby` và file thự viện tương ứng với `outputter` muốn tạo.
- Ví dụ để tạo `outputter` là `Barby::PngOutputter` ta có thể thực hiện như sau:
```
require "barby"
require "barby/outputter/png_outputter"

barby_outputter = Barby::PngOutputter.new barby
blob = barby_outputter.to_png
```
- Hàm `to_png` sẽ trả về 1 chuỗi `blob` chứa barcode đã được generate , ta có thể ghi chuỗi `blob` này ra file và lưu lại như sau:
```
File.open("barcode.png", "wb") do |f|
  f.write blob
 end
```
- Hàm `to_png` có thể nhận thêm các tham số `x_dim`, `margin`, `height`.
- Với các loại `outputter` khác thì `to_png` có thể được thay thề bằng các hàm khác như `to_ascii`, `to_html`, ....

# 3. Tài liệu và source code tham khảo:
- Github: https://github.com/toretore/barby
- Demo: https://github.com/LeTanThanh/barcode_barby
![](https://images.viblo.asia/366bb10d-9be1-4078-bc9e-a628738a2405.gif)