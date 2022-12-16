Trong các tính năng như liên hệ, đăng ký, bình luận bài viết, yêu cầu khảo sát… đôi khi chúng ta cần xác thực xem các hành động nhập dữ liệu là do người dùng thật sự hay do một robot nào đó. Đặc biệt khi càng ngày tình trạng spam diễn ra mạnh mẽ việc xác thực này là cần thiết. Có rất nhiều cách xác thực như gửi email, sms, captcha… tuy nhiên, với những nơi cần xác định xem là người dùng hay robot nhanh thì captcha là giải pháp tốt nhất.

## **Captcha là gì?**

Captcha (Completely Automated Public Turing test to tell Computers and Humans Apart) tạm dịch là Phép thử Turing công cộng hoàn toàn tự động để phân biệt máy tính với người được Đại học Carnegie Mellon công bố. Captcha là một quá trình máy tính yêu cầu người dùng hoàn thành một kiểm tra đơn giản để đánh giá, bất kỳ người nào nhập vào lời giải đúng được xem là con người.

Một hệ thống tích hợp captcha sẽ có các đặc điểm sau:
. Đa số con người có thể giải được captcha một cách dễ dàng.
. Các thuật toán kết hợp xử lý máy tính không thể giải được.
Google reCaptcha là một dịch vụ của Google tích hợp được vào bất kỳ chỗ nào muốn xác định xem hành động nào đó là do con người hay máy tính tạo ra. Khi bạn lướt web, chắc chắn bạn đã từng gặp những ô captcha với chữ loằng ngoằng.
![](https://images.viblo.asia/1b1c6ac5-ed81-451c-9b55-cc2d385ec2be.jpg)

Các cải tiến mới đây giúp cho Google reCaptcha đã dần trở lên vô hình với người dùng, các thuật toán mới giúp cho Google xác định được hành vi do con người hay máy tính một cách chính xác mà không cần đến những ký tự loằng ngoằng như trước, trừ khi Google không thể xác định được, các cách thức xác định cũ như nhập chữ, click hình ảnh liên quan chủ đề mới được sử dụng.
![](https://images.viblo.asia/0e46658d-df65-48ac-a46e-63547a57e071.gif)


## **Tích hợp Google reCAPTCHA xác định người hay máy trong các ứng dụng Laravel**


## **Đăng ký Google reCAPTCHA**

Trước tiên, bạn cần có một tài khoản Google để tạo [Google reCAPTCHA cho website](https://www.google.com/recaptcha/admin#list), vào trang đăng ký click vào Get reCAPTCHA. Điền thông tin vào form đăng ký.
![](https://images.viblo.asia/6db9beac-e8aa-4ba1-a20b-f95e941ffac0.PNG)

Như vậy bạn đã tạo ra một reCAPTCHA để sử dụng cho website. Chúng ta sẽ thấy Site key và Secret key được sử dụng để tích hợp reCAPTCHA.
![](https://images.viblo.asia/3a4600c5-848a-4407-9f97-2273c59fbc3d.PNG)

**Thiết lập cấu hình, tạo class xử lý reCAPTCHA**

Hai khóa được tạo ra trong bước đăng ký reCAPTCHA sẽ được đưa vào ứng dụng Laravel thông qua .env hoặc config/app.php

```php
GOOGLE_RECAPTCHA_KEY=6Leil3AUAAAAABdYLqrP_Io7NluMnMcqQrz6vGR1
GOOGLE_RECAPTCHA_SECRET=6Leil3AUAAAAAJafuG7aCdwlppsNeSxqWSDJhHdC
```

Các key ở trên chỉ là demo, bạn nên tạo key riêng cho reCAPTCHA của bạn.Form đăng ký có email chúng ta có thể dùng xác thực qua email đảm bảo hơn, tuy nhiên có nhiều website muốn người dùng đăng ký nhanh không cần qua bước xác thực email lằng nhằng mà chỉ cần xác định đúng là người không phải máy thôi. Chúng ta tạo view cho trang đăng ký (resource/views/auth/register.blade.php):


Chỉnh sửa (resource/views/layouts/app.blade.php)
```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->

    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>

```
OK. giờ vào localhost:8000/register, ta được:
![](https://images.viblo.asia/416609d1-ee79-4ccf-b411-5f457c206e08.PNG)


Nó đã hiện lên rất ok, tiếp theo chúng ta sẽ xử lý phần post dữ liệu form đăng nhập. Chúng ta sẽ tạo thêm một phương thức Laravel Validate để kiểm tra kết quả Google reCAPTCHA trả về, nếu là máy chúng ta sẽ thông báo lên “Form đăng ký không dành cho robot”. Tạo thư mục Validators trong thư mục app và tạo một file ReCaptcha.php với nội dung:
```php
<?php
namespace App\Validators;

use GuzzleHttp\Client;

class ReCaptcha
{
    public function validate($attribute, $value, $parameters, $validator){
        $client = new Client();
        $response = $client->post(
            'https://www.google.com/recaptcha/api/siteverify',
            ['form_params'=>
                [
                    'secret'=>env('GOOGLE_RECAPTCHA_SECRET'),
                    'response'=>$value
                 ]
            ]
        );
        $body = json_decode((string)$response->getBody());
        return $body->success;
    }
}
```
Trong class ReCaptcha chúng ta có sử dụng class Client trong gói guzzlehttp/guzzle, thực hiện cài đặt gói này vào project, chạy composer:
```

composer require guzzlehttp/guzzle
```
Tiếp theo chúng ta đăng ký validator vừa tạo vào hệ thống để sử dụng, thêm vào phương thức boot() của app\Providers\AppServiceProvider.php:
```php
public function boot()
{      
   Validator::extend('recaptcha', 'App\Validators\Recaptcha@validate');
}

```
Sau đó thêm message lỗi khi kiểm tra reCAPTCHA vào file resources/lang/en/validation.php
```
'recaptcha'=>'Form đăng ký không dành cho robot'
```
Trong phương thức validator() của RegisterController (app\Http\Controllers\Auth\RegisterController.php) thêm kiểm tra kết quả Google reCAPTCHA:
```php
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
            'g-recaptcha-response'=>'required|recaptcha',
        ]);
    }
```

Ok, vậy là đã tích hợp xong Google reCAPTCHA vào form đăng ký trong Laravel.