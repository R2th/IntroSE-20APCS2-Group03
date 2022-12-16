# Tại sao nên sử dụng captcha
Trong các tính năng như liên hệ, đăng ký, bình luận bài viết, yêu cầu khảo sát… việc xác thực xem các hành động nhập dữ liệu là do người dùng thực hiện hay do một robot nào đó là rất cần thiết để tránh tình trạng spam diễn ra ngày càng mạnh mẽ. Và captcha là giải pháp nhanh nhất để xác định xem là người dùng hay robot thực hiện thao tác so với các cách xác thực như gửi email, sms,...
# 1. Captcha là gì?(Completely Automated Public Turing test to tell Computers and Humans Apart)
* Theo truyền thống captcha là một hình ảnh với dòng các chữ khó phân tích bởi một chương trình tự động, người dùng phải nhập lại dòng chữ giống với chữ trên hình ảnh để chứng minh họ không phải là cái máy. 
* CAPTCHA là một công cụ xác thực trên website để đảm bảo website không bị SPAM bằng một công cụ tự động.
* CAPTCHA truyền thống có thể đáp ứng được yêu cầu đặt ra, nhưng đôi khi khá phiền phức, các dòng chữ CAPTCHA đôi khi rất khó đọc để nhập chính xác đối với người dùng.
* Một hệ thống tích hợp captcha sẽ có các đặc điểm sau:
    - Đa số con người có thể giải được captcha một cách dễ dàng.
    - Các thuật toán kết hợp xử lý máy tính không thể giải được.
* Hình ảnh capcha:

![](https://images.viblo.asia/ea504ad6-499f-4120-afe9-890c56e21489.jpg)

# 2. reCaptcha
* reCAPTCHA là một dịch vụ CAPTCHA của Google miễn phí, có thể tích hợp được vào bất kỳ chỗ nào muốn xác định xem hành động là do con người hay máy tính tạo ra, giúp website chống lại SPAM, các đăng ký độc hại, hoặc các hình thức tấn công khác, nơi mà các chương trình tấn công cố gắng che giấu bản thân bằng cách tạo ra các hành vi giống con người. 
* Điểm cải tiến so với captcha truyền thống: các thuật toán mới giúp cho Google reCaptcha xác định được hành động do con người hay robot thực hiện một cách chính xác mà không cần đến những ký tự loằng ngoằng nieenjcaptcha truyền thống, trừ khi Google không thể xác định được, các cách thức xác thực cũ như nhập chữ, click hình ảnh liên quan chủ đề mới được sử dụng.
* reCAPTCHA với giao diện đơn giản, có thể dễ dàng thêm vào blog, forum hoặc website của bạn,...
![](https://images.viblo.asia/70d11609-e1f2-4edf-84d5-d4dc2ce146ce.gif)

* Nguyên tắc hoạt động của reCAPCHA:

![](https://images.viblo.asia/3f3e6353-54a5-4da7-88eb-90d8de90bfc4.png)
# 3. Tích hợp Google reCAPTCHA trong các Laravel
## 3.1 Đăng ký site key và secret key

* Đăng ký tại trang sau:  https://www.google.com/recaptcha/admin  (Bạn cần tài khoản google để đăng ký reeCAPTCHA)
![](https://images.viblo.asia/0721b94e-d7d0-4523-a9c9-98627a30b627.png)
* Hoặc có thể dùng site key và secret key TEST do Google cung cấp, nhưng khi public bạn phải đăng ký nhé!
```
    site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
    secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

## 3.2 Tạo project Laravel
Chạy artisan command sau:
```
    composer create-project --prefer-dist laravel/laravel recaptcha
```
Chú ý: Nếu bạn đã có project Laravel rồi thì bỏ qua bước này nhé!

## 3.3 Tạo database recaptcha
![](https://images.viblo.asia/0806193f-839f-4c26-8828-6eb78bc66cc9.png)
Sau khi tạo xong, chỉnh sửa lại thông tin database. Mở file .env:
```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=recaptcha
    DB_USERNAME=root
    DB_PASSWORD=
```
## 3.4 Run migrate
* Mở file: recaptcha\app\Providers\AppServiceProvider.php
* Tại function boot() thêm dòng sau để chạy migrate khỏi bị lỗi
```php
    public function boot()
    {
        \Schema::defaultStringLength(191);
    }
```
Chạy artisan command sau:
```
    php artisan migrate
```
## 3.5 Cài gói guzzlehttp
* Để xác minh phản hồi của người dùng, chúng ta cần gửi request đến Google API.
* Trong class ReCaptcha chúng ta có sử dụng class Client trong gói guzzlehttp/guzzle.
* Thêm gói này vào composer
```
    cd recaptcha
    composer require guzzlehttp/guzzle
```
## 3.6 Khai báo site key và secret key Google reCaptcha
* Mở file .env và thêm dòng sau vào cuối file (hoặc thêm hai khóa này vào qua config/app.php)
```
    GOOGLE_RECAPTCHA_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
    GOOGLE_RECAPTCHA_SECRET=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```
## 3.7 Tích hợp reCaptcha vào validate form đăng ký
Chạy artisan command sau:
```
    php artisan make:auth
```
Mở file recaptcha\resources\views\layouts\app.blade.php, tại phần <head> tag thêm đoạn script sau:
```php
     <script src="https://www.google.com/recaptcha/api.js" async defer></script>
```
 Mở file: recaptcha\resources\views\auth\register.blade.php, thêm tag Google reCaptcha vào:
    
```php
    @extends('layouts.app')

    @section('content')
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}" aria-label="{{ __('Register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <!-- Google reCaptcha -->
                        <div class="g-recaptcha" id="feedback-recaptcha" data-sitekey="{{ env('GOOGLE_RECAPTCHA_KEY')  }}"></div>
                        <!-- End Google reCaptcha -->

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    @endsection
```

Chạy thử: http://localhost/recaptcha/public/register ta sẽ có kết qủa như sau:

![](https://images.viblo.asia/444cae13-e2c7-4bd3-9494-c4cc4a1f2ccb.png)

## 3.8 Validate phía Server
* Sau khi tích vào nút I'm not a robot, đợi load xong và nhấn nút Register sẽ gửi request lên Server để xử lý.
* Tạo mới reCaptcha validate rule

```
    php artisan make:rule ValidRecaptcha
```

* Mở file: recaptcha\app\Http\Controllers\Auth\RegisterController.php, tại function validatại() thêm dòng sau: 
```
    'g-recaptcha-response' => ['required', new \App\Rules\ValidRecaptcha]
```

```php
    protected function validator(array $data)
        {
            return Validator::make($data, [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'g-recaptcha-response' => ['required', new \App\Rules\ValidRecaptcha]
            ]);
        }
```

* Tiến hành định nghĩa rule cho class ValidRecaptcha (recaptcha\app\Rules\ValidRecaptcha.php)
```php
     <?php

    namespace App\Rules;

    use Illuminate\Contracts\Validation\Rule;
    use GuzzleHttp\Client;

    class ValidRecaptcha implements Rule
    {
        /**
         * Create a new rule instance.
         *
         * @return void
         */
        public function __construct()
        {
            //
        }

        /**
         * Determine if the validation rule passes.
         *
         * @param  string  $attribute
         * @param  mixed  $value
         * @return bool
         */
        public function passes($attribute, $value)
        {
            // Khoi tao Http Client
            $client = new Client([
                'base_uri' => 'https://google.com/recaptcha/api/'
            ]);

            // Gui du lieu len cho Google reCAPTCHA xu ly.
            $response = $client->post('siteverify', [
                'query' => [
                    'secret' => env('GOOGLE_RECAPTCHA_SECRET'),
                    'response' => $value
                ]
            ]);

            // Google reCaptcha tra ve ket qua dung/sai.
            return json_decode($response->getBody())->success;
        }

        /**
         * Get the validation error message.
         *
         * @return string
         */
        public function message()
        {
            // Message thong bao khi ket qua tra ve la sai
            return 'ReCaptcha verification failed.';
        }
    }
```

# Kết luận
* Vậy là mình vừa giới thiệu và demo Google reCAPTCHA xong rồi, qua bài viết ta thấy việc sử dụng nó cũng rất đơn giản phải không nào. Nếu cảm thấy có ích với bạn thì hãy upvote cho mình nhé!
* Cảm ơn các bạn đã theo dõi bài viết!!!

Source code mình đã up lên Github: https://github.com/tuandungit/laravel-recaptcha