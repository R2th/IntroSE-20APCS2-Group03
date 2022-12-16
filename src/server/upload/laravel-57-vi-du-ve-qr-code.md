Trong hướng dẫn này, tôi muốn chia sẻ với bạn cách tạo mã QR bằng cách sử dụng `simple-qrcode` trong laravel 5.7. bạn có thể tạo mã QR với url, văn bản, kích thước, màu sắc, màu nền, định dạng như png, eps, svg.

Simple-qrcode là gói soạn thảo để tạo mã QR trong ứng dụng laravel 5.7 của bạn. Simple-qrcode cung cấp để gửi sms và email với mã QR được tạo. bạn có thể tạo mã QR cho số điện thoại, ngày sinh, mật khẩu bằng cách sử dụng gói qrcode.

Bắt đầu làm theo vài bước để biết được ví dụ này:
# Cài đặt Laravel 5.7
Đầu tiền vẫn là phải cài đặt laravel với câu lệnh quen thuộc:
```
composer create-project --prefer-dist laravel/laravel blog
```
Xong chúng ta sẽ sang bước hai.
# Cài đặt package simple-qrcode
Ở bước này chúng ta cài đặt package cho laravel.
```
composer require simplesoftwareio/simple-qrcode
```
Sau đó chúng ta cần config cho nó trong file config/app.php như sau:
```php
'providers' => [
	....
	SimpleSoftwareIO\QrCode\QrCodeServiceProvider::class
],

'aliases' => [
	....
	'QrCode' => SimpleSoftwareIO\QrCode\Facades\QrCode::class
],
```
# Tạo Route
Trong bước này chúng ta sẽ tạo một route như sau:

`routes/web.php`
```php
<?php

Route::get('qr-code', function () {
  \QrCode::size(500)
            ->format('png')
            ->generate('viblo.asian', public_path('images/qrcode.png'));
   
  return view('qrCode');
});
```
`size ()` được sử dụng để chỉ định kích thước của mã QR. Theo mặc định, kích thước khá nhỏ nên chúng ta sẽ chỉ định kích thước là 500.

Chúng ta có thể thay đổi màu cho QR code:
```php
<?php

Route::get('qr-code-g', function () {
  \QrCode::backgroundColor(255, 255, 0)->color(255, 0, 127)
            ->size(500)
            ->format('png')
            ->generate('viblo.asian', public_path('images/qrcode.png'));
   
  return view('qrCode');
});
```
# Tạo blade view
Bây giờ chúng ta cần tạo một blade để hiển thị QR code:

`resources/views/qrCode.blade.php`

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
    
<div class="visible-print text-center">
	<h1>Laravel 5.7 - Ví dụ về QR code</h1>
     
    {!! QrCode::size(500)->generate('viblo.asian'); !!}
</div>
    
</body>
</html>
```
# Mã hóa dữ liệu trong mã QR của bạn
Bạn có thể mã hóa mã QR theo các định dạng khác nhau, hầu hết người scan mã QR có thể đề xuất các hành động dựa trên loại mã hóa mã QR mà bạn đã mã hóa.
### E-mail
Cấu trúc:
```php
QrCode::email($to_address, $subject, $body);
```
ví dụ:
```php
QrCode::email('example@gmail.com', 'cam on da su dung.', 'Awesome!.');
 
QrCode::email(null, 'Xin chao', 'Day la body.');
 
QrCode::email('example@gmail.com');
```

### Phone Number
Cấu trúc:
```php
QrCode::phoneNumber($number);
```
Ví dụ:
```php
QrCode::phoneNumber('8431112223');
```
### SMS 
Cấu trúc:
```php
QrCode::SMS($number, $message);
```
Ví dụ:
```php
QrCode::SMS('032222223123', 'Body of the message');
```
### Geo co-ordinates:
Cấu trúc:
```php
QrCode::geo($latitude, $longitude);
```
Ví dụ:
```php
QrCode::geo(13.3499, 74.798059);
```

Trên đây là cách tạo mã QR, hi vọng sẽ giúp ích được cho các bạn.

# Tài liệu tham khảo
https://github.com/SimpleSoftwareIO/simple-qrcode