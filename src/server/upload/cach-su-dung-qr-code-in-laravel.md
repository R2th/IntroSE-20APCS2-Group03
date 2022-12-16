# QR code là gì?
**QR-code** là mã có thể đọc được bằng máy bao gồm một mảng các ô vuông đen và trắng, thường được sử dụng để lưu trữ URL hoặc thông tin khác để đọc bằng camera trên điện thoại thông minh. 

Tìm hiểu thêm QR code qua bài viết này 
[Tìm hiều về BarCode, QR Code](https://viblo.asia/p/tim-hieu-ve-barcode-qr-code-m68Z0RLj5kG)

# QR code trong laravel
Trong laravel tôi tìm thấy nhiều package để render QR code. Tuy nhiên tìm thấy một package thực sự tốt [simple-qrcode](https://github.com/SimpleSoftwareIO/simple-qrcode)

[Document](https://www.simplesoftware.io/docs/simple-qrcode)

## Install package

Đầu tiên, thêm Simple QrCode package vào require trong file composer.json của bạn:
```
"require": {
    "simplesoftwareio/simple-qrcode": "~2"
}
```

sau đó, run command

`composer update`

hoặc bạn có thể dùng command sau để thay thế cách trên:
```
composer require simplesoftwareio/simple-qrcode
```

Đôi với Laravel <= 5.4 ta cấu hình Service Provider, trong file config/app.php ta đăng kí trong mảng providers
```
SimpleSoftwareIO\QrCode\QrCodeServiceProvider::class
```

và thêm Aliases
```
'QrCode' => SimpleSoftwareIO\QrCode\Facades\QrCode::class
```
và trong mảng aliases

run `composer dumpautoload` để reload lại composer auto laod cache
## Cách sử dụng cơ bản
* Bạn có thể tạo QR code nhanh chóng chứa chuối string bằng cách sử dụng method `QrCode::generate("string")`
* Thêm 1 qr-code route trong file routes/web.php để test:
```
Route::get('qr-code', function () {
    return QrCode::size(500)->generate('Welcome to kerneldev.com!');
});
```

* size() method giúp chúng ta thay đổi size của QR code.
* truy cập route của bạn để xem kq(vd: localhost/qr-code). Bạn có thể  scan QR code bằng smartphone và bạn sẽ nhìn thấy text được hiển thị

![](https://images.viblo.asia/0998d669-0b87-405f-83ca-956971bf3476.png)

* Hoặc bạn có thể hiển thị QR code trong laravel blade template:

```
{!! QrCode::generate('Welcome to kerneldev.com!'); !!}
```
## Thay đổi màu của QR code
Bạn có thể dùng hai method color(red, green, blue) and backgroundColor(red, green, blue) để thay đổi màu nền và mã của QR code.
```
Route::get('qr-code', function () { 
    return QrCode::backgroundColor(255, 255, 0)->color(255, 0, 127)
                   ->size(500)->generate('Welcome to kerneldev.com!'); 
});
```

![](https://images.viblo.asia/61fee0c0-ded7-48a8-9ccd-b008cca50544.png)

* Chú ý: nhiều bộ đọc khó khăn khi gặp QR code màu nên khuyên bạn nên dùng với phiên bản đen trắng mặt định nếu bạn muốn mã QR code của mình hoạt động hầu hết với các máy quét

## Chèn image vào bên trong QR code
Bạn cũng có thể chèn một hình ảnh vào giữa QR code của mình bằng phương thức merge('filename.png') và method này chỉ có thể chấp nhận các file .png và bạn cũng cần format response back png.

```
Route::get('qr-code', function () {
        $pngImage = QrCode::format('png')->merge('ss.png', 0.3, true)
                        ->size(500)->errorCorrection('H')
                        ->generate('Welcome to kerneldev.com!');
 
        return response($pngImage)->header('Content-type','image/png');
});
```

![](https://images.viblo.asia/94a51a69-aace-4f53-9c6b-40e7012b0a19.png)

Bạn cũng có thể render trong blade template như sau:
```
<img src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->merge('ss.png', 0.3, true)
                        ->size(500)->errorCorrection('H')
                        ->generate('Welcome to kerneldev.com!')) !!} ">
```

* Chú ý: mặc định merge() function tìm kiếm file trong thư mục public nên hãy chắc rằng bạn đã để image ở đó

## Encoding data đặc biệt trong QR code của bạn
* Email: Tự động điền địa chỉ email, chủ đề và nội dung của email.

Cú pháp:
```
QrCode::email($to_address, $subject, $body);
```

Ví dụ:
```
//Specify email address, subject and the body
QrCode::email('sapnesh@kerneldev.com', 'Thank you for the QR code tutorial.', 'This was awesome!.');
 
//Specify subject and the body, let user enter the to_address
QrCode::email(null, 'Hi  there.', 'This is the message body.');
 
//Specify just email address
QrCode::email('sapnesh@kerneldev.com');
```

* Phone number: Mở ứng dụng điện thoại và quay số điện thoại được chỉ định.

cú pháp:
```
QrCode::phoneNumber($number);
```

ví dụ:

```
QrCode::phoneNumber('776-004-1698');
```

 
* SMS (Text messaege): Mở ứng dụng nhắn tin và điền số điện thoại hoặc nội dung tin nhắn.

cú pháp:
```
QrCode::SMS($number, $message);
```

ví dụ:

```
//Specify just the phone number to send the message to
QrCode::SMS('555-555-5555');
 
//Specify phone number as well as the message
QrCode::SMS('555-555-5555', 'Body of the message');
```


* Geo co-ordinates: Hiển thị vị trí được chỉ định trong một ứng dụng map.

cú pháp:
```
QrCode::geo($latitude, $longitude);
```

ví dụ:

```
QrCode::geo(13.3499, 74.798059);
```

Bài viết được dịch từ https://www.kerneldev.com/2018/09/07/qr-codes-in-laravel-complete-guide/