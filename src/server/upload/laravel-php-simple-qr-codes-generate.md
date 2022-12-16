![](https://images.viblo.asia/ca693ae9-32eb-40f6-bc57-fba6cf41f818.jpeg)
## QR code là gì?
QR-code là mã có thể đọc được bằng máy bao gồm một mảng các ô vuông đen và trắng, thường được sử dụng để lưu trữ URL hoặc thông tin khác để đọc bằng camera trên điện thoại thông minh.
Trong hướng dẫn này, mình sẽ chia sẻ với bạn cách tạo  mã qr trong laravel 5.7 & 5.8. Bạn có thể chỉ cần tạo  mã qr với văn bản, kích thước, màu sắc, màu nền, định dạng như png, eps, svg.
Ví dụ này cũng hoạt động với phiên bản laravel 5.8, 5.7 & 5.6.

Simple-qrcode là package để tạo mã qr trong ứng dụng laravel 5.7. Trong ví dụ này, mình sẽ chỉ cho bạn cách gửi sms và email với mã qr được tạo, bạn cũng có thể tạo mã qr cho địa lý, số điện thoại, tin nhắn văn bản bằng cách sử dụng Simple-prcode.
## Install Laravel Fresh Project
Việc đầu tiên đương nhiên là phải install fw Laravel về local của chúng ta rồi.
```
composer create-project --prefer-dist laravel/laravel LaravelQR
```

## Install simple-qrcode Package
Tiếp theo là việc install package simplae-prcode, các bạn thêm đoạn code như bên dưới.
```
composer require simplesoftwareio/simple-qrcode
```

Sau khi install thành công, các bạn di chuyển vào thư mục config/app.php và thêm đoạn mã như bên dưới.
```
//config/app.php

'providers' => [
 ….
 SimpleSoftwareIO\QrCode\QrCodeServiceProvider::class
 ],

'aliases' => [
 ….
 'QrCode' => SimpleSoftwareIO\QrCode\Facades\QrCode::class
 ],
```

## Test Qr Code
Bây giờ bắt tay vào code nhé.
Đầu tiên các bạn định nghĩa 1 route trong file web.php.
```
Route::get('qrcode', function () {
     return QrCode::size(300)->generate('A basic example of QR code!');
 });
```

** Hàm size () được sử dụng để chỉ định kích thước của QR. Khi bạn khi check qua route / qrcode
![](https://images.viblo.asia/b8b9dafe-04dc-499b-b017-75890d317d09.png)

### Tạo mã QR có color.
Cũng trong file web.php các bạn tạo 1 route như bên dưới.
```
Route :: get ('qrcode-with-color', function () { 
     return \ QrCode :: size (300) 
                     -> backgroundColor (255,55,0) 
                     -> tạo ('Một ví dụ đơn giản về mã QR'); 
});
```

### Mã QR có hình ảnh:
```
Route::get('qrcode-with-image', function () {
         $image = \QrCode::format('png')
                         ->merge('images/laravel.png', 0.5, true)
                         ->size(500)->errorCorrection('H')
                         ->generate('A simple example of QR code!');
      return response($image)->header('Content-type','image/png');
 });
```

### Email QR code :
```
Route::get('qrcode-with-special-data', function() {
     return \QrCode::size(500)
                 ->email('info@abc.com', 'Welcome to viblo!', 'This is !.');
 });
```

### QR Code Phone Number :
Simple-qrcode cũng hỗ trợ việc quét mã qr để lấy số điện thoại hoặc sms
```
QrCode::phoneNumber('111-222-6666');
```
QR Code Text Message
```
QrCode::SMS('111-222-6666', 'Body of the message');
```
## Kết luận.
Bài viết của mình đến đây là kết thúc rồi, mong rằng với bài chia sẽ nhở này sẽ giúp ích được phần nào cho các bạn trong các dự án liên quan tới qr-code.
Các bạn lưu ý, đây chỉ là ví dụ nhỏ của mình nên mình tạo tất cả mã code trên route, các bnaj có thể tách ra cho vào controller tương ứng nhé.
Cảm ơn các bạn đã theo dõi.

Link tham khảo: https://www.tutsmake.com/laravel-php-simple-qr-codes-generate/?fbclid=IwAR35xqSw4MTslZn7VczlY42335OOBKhxqbouKlPJ-YTk0rsKrQ32oCKig2U