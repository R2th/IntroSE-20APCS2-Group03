###  Giới thiệu

   Trong hướng dẫn này tôi muốn chia sẻ với bạn cách tạo qr code bằng cách sử dụng simple-qrcode trong laravel 5.7. Bạn 
   có thể chỉ cần tạo qr codes với url, text, size, color...
   
   Simple-qrcode là một composer package để tạo qr code trong ứng dụng laravel 5.7. Chỉ cần làm theo các bước dưới đây 
   bạn có thể tạo cho mình những qr code thật đơn giản.
   
### Viết một ứng dụng tạo QR Code đơn giản

**Bước 1: Cài laravel 5.7**

Đầu tiên, bạn chạy lệnh sau để cài đặt laravel 5.7
```
composer create-project --prefer-dist laravel/laravel blog
```
     
**Bước 2: Cài đặt và cấu hình package simple-qrcode**

   Bây giờ chúng ta cài đặt package simple-qrcode bằng cách mở terminal và chạy lệnh
    
```
composer require simplesoftwareio/simple-qrcode
```
    
 Sau đó mở file config/app.php và chỉnh sửa như sau:
 
```
'providers' => [
        ....
    SimpleSoftwareIO\QrCode\QrCodeServiceProvider::class
 ],
 'aliases' => [
        ....
   'QrCode' => SimpleSoftwareIO\QrCode\Facades\QrCode::class
 ],
```
    
   **Bước 3: Tạo Controller và viết route**
   
   Trong terminal gõ lệnh sau:
```
php artisan make:controller QrCodeController
```
     
  Trong file routes/web.php:
```
 Route::get('/qr-code', 'QrCodeController@getQrCode');
```
     
 Trong file QrCodeController.php
```
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeController extends Controller
{
       public function getQrCode()
       {
              $qrCode = QrCode::size(250)->generate('test qr code');
              return view('qrCode', compact('qrCode'));
       }
}  
```
             
   
   **Bước 4: Tạo fiel blade**
   
   Chúng ta cần phải tạo file qrCode.blade.php để hiển thị qr code: 
```
resources/views/qrCode.blade.php
```
```
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

<div class="visible-print text-center">
    <h1>Laravel 5.7 - QR Code Generator Example</h1>

    {!! $qrCode !!}
</div>

</body>
</html>
```
     
  Kết quả ta được như sau 
    
   ![](https://images.viblo.asia/3d28abee-babf-4264-8f01-93722e35c6f2.PNG)
   
   Tham khảo:
   
   https://itsolutionstuff.com/post/laravel-57-qr-code-generator-exampleexample.html