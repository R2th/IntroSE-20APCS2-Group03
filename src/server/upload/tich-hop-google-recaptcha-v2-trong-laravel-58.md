![](https://images.viblo.asia/90e9447a-ba5f-401b-a2e0-7634a3c29814.jpeg)
Trong bài viết này,  Mình sẽ triển khai cách xác thực người người dùng bằng Recaptcha trong Laravel 5.8. Mình sẽ viết từng bước hướng dẫn cách sử dụng google captcha bằng cách install package 'anhskohbo / no-captcha' trong ứng dụng laravel 5.8. Và các bạn có thể đơn giản sử dụng mã xác nhận lại google trong mẫu đăng ký của mình.

Google ReCaptcha là một hệ thống giống như captcha, cung cấp bảo mật chống lại tin tặc và robot dò mã hoặc yêu cầu cuộn tròn. Nó đảm bảo rằng người dùng máy tính là một con người. Đây là hệ thống captcha tốt nhất và được sử dụng nhiều nhất hiện có khi người dùng chỉ cần nhấp vào nút kiểm tra và trong một số trường hợp, thì là chọn một số hình ảnh tương tự liên quan đến câu hỏi conman.

Trong ví dụ này, Mình sẽ tạo biểu mẫu đăng ký đơn giản và triển khai mã captcha của google. trước khi sử dụng mã Google captcha, Mình sẽ cài đặt package "anhskohbo / no-captcha" cho google captcha. Bạn chỉ cần làm theo vài bước và bạn sẽ nhận được mã xác nhận lại google trong ứng dụng laravel 5.8 của mình, nào let's go !.

### Các bước triển khai cơ bản.
 Step 1 : Download Laravel 5.8
 Step 2: Install anhskohbo/no-captcha Package
 Step 3: Update Google API Key
 Step 4: Add Route
 Step 5: Create CaptchaController
 Step 6: Create View File
 
##  Download Project Laravel.
Phần này là đương nhiên rồi, chúng ta muốn tạo dự án trên FW laravel thì chúng ta cần phải download FW về local của mình. Các bạn chạy cậu lệnh bên dưới để download.
```
composer create-project --prefer-dist laravel/laravel LaravelCaptcha
```
Sau khi đã download dự án về máy thành công, các bạn di chuyển tới file .env để config lại data cho phù hợp với thông tin data trên mysql của các bạn.
```
DB_CONNECTION=mysql 
DB_HOST=127.0.0.1 
DB_PORT=3306 
DB_DATABASE=here your database name here
DB_USERNAME=here database username here
DB_PASSWORD=here database password here
```

## Install Google Captcha Package
Tiếp theo các bạn chạy câu lệnh bên dưới để install package anh anhskohbo/no-captcha.
```
composer require anhskohbo/no-captcha
```

## Update Google API Key
Tiếp theo các bạn hay click vào link mà mình để bên dưới [Để Tạo Google reCaptcha cho website của bạn](https://www.google.com/recaptcha/admin/create#list)
![](https://images.viblo.asia/e5970d32-91cb-4c68-8bf6-886dd0d32ca8.png)
Các bạn hãy điền những thông thick hợp vào các form đăng ký sau đó nhấn Submit.

![](https://images.viblo.asia/c32a303c-17a4-4668-a3f8-4cd7514daa18.png)
Trang kế tiếp sau khi Submit sẽ như thế này.

Tiếp theo các bạn copy dòng code bên dưới vào file .env và thay các thông số key tương ứng với ảnh trên.
```
NOCAPTCHA_SITEKEY=secret_site_key
NOCAPTCHA_SECRET=secret_key
```
Để chắc chắn project đã nhận service này các bạn nên chạy thêm `php artisan composer dumpautoload`.

## Add Route.
Tiếp theo chúng ta di chuyển vào file routes/web.php và thêm đoạn code bên dưới vào.
```
Route::get('captcha-form', 'CaptchaController@captchaForm');
Route::post('store-captcha-form', 'CaptchaController@storeCaptchaForm');
```

## Create CaptchaController.
Trước tiên chúng ta ra 1 file CaptchaController.
```
php artisan make:controller CaptchaController
```
Và thêm đoạn code này vào file controller mới tạo.
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator, Redirect, Response;
use App\User;

class CaptchaController extends Controller
{
    public function captchaForm()
    {
        return view('captchaform');
    }
    public function storeCaptchaForm(Request $request)
    {
        request()->validate([
            'name' => 'required',
            'email' => 'required',
            'mobile_number' => 'required',
            'g-recaptcha-response' => 'required|captcha',
        ]);

        dd('successfully validate');
    }
}
```

## Create view.blade.
Tiếp theo là giai đoạn cuối, các bạn vào resources/view và tạo cho mình 1 file captchaform.balde.php và thêm đoạn code vày vào.
```
<!doctype html>
<html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Laravel 5.8 Google Recatpcha Verification</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/additional-methods.min.js"></script>
  <style>
   .error{ color:red; }
  </style>
</head>

<body>

<div class="container">
    <h2 style="margin-top: 10px;" class="text-center">Laravel 5.8 Google Recatpcha Verification</h2>
    <br><br><br>
    <div class="row justify-content-center">
    <div class="col-md-8">
    <a href="" class="btn btn-secondary">Back to Post</a>
    <br><br>

    @if ($message = Session::get('success'))
    <div class="alert alert-success alert-block">
        <button type="button" class="close" data-dismiss="alert">×</button>
          <strong>{{ $message }}</strong>
    </div>
    <br>
    @endif

    <form id="captcha-form" method="post" action="{{url('store-captcha-form')}}">
      @csrf
      <div class="form-group">
        <label for="formGroupExampleInput">Name</label>
        <input type="text" name="name" class="form-control" id="formGroupExampleInput" placeholder="Please enter name">
        <span class="text-danger">{{ $errors->first('name') }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email Id</label>
        <input type="text" name="email" class="form-control" id="email" placeholder="Please enter email id">
        <span class="text-danger">{{ $errors->first('email') }}</span>
      </div>
      <div class="form-group">
        <label for="mobile_number">Mobile Number</label>
        <input type="text" name="mobile_number" class="form-control" id="mobile_number" placeholder="Please enter mobile number">
        <span class="text-danger">{{ $errors->first('mobile_number') }}</span>
      </div>
      <div class="form-group">
        <label for="captcha">Captcha</label>
          {!! NoCaptcha::renderJs() !!}
          {!! NoCaptcha::display() !!}
        <span class="text-danger">{{ $errors->first('g-recaptcha-response') }}</span>
      </div>
      <div class="form-group">
       <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </form>
</div>
</div>
</div>

</body>
</html>
```
## Test demo.
Các bạn bật serve lên ,
```
php artisan serve
If you want to run the project diffrent port so use this below command 
php artisan serve --port=8080
```

Sau đo chạy vào route: `http://localhost:80/captcha-form` để kiểm nghiệm nhé. Ở đây mình port 80 là port mặc đinh khi bật serve, còn các bạn để port bao nhiêu thì thay đổi trên URL cho hợp lý nhé.
![](https://images.viblo.asia/27801847-6ac2-4fe4-a2ef-f31c4540013a.png)
Đại khai view của chungs ta sẽ trông như thế này.
sau khi các bạn nhấp vào phần check book I'm not a robot và điền các thông tin và submit sẽ thấy được dòng chữ ' "successfully validate" do chúng ta đã dd() trong CaptchaController.. các bạn có thể tùy chỉnh phần nó nếu xác thực thành công thì redirect vào dashboard chẳng hạn...vv..

## Tổng Kết:
Thế là mình đã hướng dẫn cho các bạn xong cách làm thế nào để xác thực người dùng bằng google reCaptCha bằng cách install package 'anhskohbo/no-captcha' trong laravel rồi nhé.
Chúc các bạn thành công nhé.