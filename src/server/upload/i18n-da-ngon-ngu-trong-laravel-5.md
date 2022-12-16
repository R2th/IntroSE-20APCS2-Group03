- Chào các bạn mình vừa tìm hiểu về chủ để đa ngôn ngữ trong xây dựng ứng dụng ứng dụng web với framwork Larvel hay còn gọi là I18n .Mình đã thực hiện thành công nên muốn chia sẻ với mọi người.
- Để tiếp cận được với nhiều khách hàng trên toàn cầu thì việc sử dụng i18n trong website là rất cần thiết. Trong Laravel  vấn đề i18n được hỗ trợ và xử lý khá đơn giản. Bài viết này mình sẽ giúp các bạn có thể thực hiện i18n trong trang web của chính mình.
# 1. Các thiết lập ban đầu
## 1.1 I18n sử dụng file PHP
Để sử dụng file PHP , Trong thư mục /resources/lang/ thêm các folder chứa các ngôn ngữ mà muốn chuyển đổi ở đây là folder vi và en
![](https://images.viblo.asia/d62451b8-fbe3-4eb3-943f-a0617a29a6d3.png)
Ở đây mình tạo file là language.php, cả 2 folder ban đều tạo các file có tên giống nhau :
* File  /resources/lang/en/language.php
```php
<?php
return [
    'home' => 'HOME PAGE',
    'course' => 'COURSE',
    'schedule' => 'SCHEDULE',
    'news' => 'NEWS',
    'contact' => 'CONTACT',

];
```
* /resources/lang/vi/language.php
```php
<?php
return [
    'home' => 'TRANG CHỦ',
    'course' => 'KHÓA HỌC',
    'schedule' => 'LỊCH KHAI GIẢNG',
    'news' => 'TIN TỨC',
    'contact' => 'LIÊN HỆ',

];
```
Cú pháp để sử dụng trong file view sẽ là:  ```{{ trans('language.home') }}```
```php

<li class="active"> <a href="/home">{{ trans('language.home') }}</a> </li>
```
    
 ## 1.2 I18n sử dụng file Json
 Khi sử dụng với file thì chúng ta sẽ tạo ra 2 folder mới, nhưng khi sử dụng file json thì không cần. Chỉ cần tạo ra 2 file json ngay tại folder ```sources/lang.```
 
 ```javascript
 /resources
    /lang
        en.json
        vi.json
 ```   
*  /resources/lang/vi.json
```php
{
   "home" : "TRANG CHỦ",
    "course" : "CÁC KHÓA HỌC",
    "course_detail" : "CHI TIẾT KHÓA HỌC",
    "schedule" : "LỊCH KHAI GIẢNG",
    "news" : "TIN TỨC",
    "news detail" : "CHI TIẾT TIN TỨC",
    "contact" : "LIÊN HỆ",
    "language" : "Ngôn Ngữ"
    }
```
*  /resources/lang/en.js
```php
{
   "home" : "HOME PAGE",
    "course" : "COURSES",
    "course_detail" : "COURSE DETAIL",
    "schedule" : "SCHEDULE",
    "news" : "NEWS",
    "news detail" : "NEWS DETAIL",
    "contact" : "CONTACT",
    "language" : "Language"
    }
```
Cú pháp dùng trong file view sẽ là :
```php
{{ __('home') }}
{{ __('home, :name', ['name' => 'Awesome Academy']) }}
```
Khi đó ở file view sẽ có dạng như này:
```php
<li class="active"> <a href="/home">{{ __('home') }}</a> </li>
```
# 2. Sử dụng đa ngôn ngữ (I18n)
   Trước tiên thì ta nên cấu hình ngôn ngữ mặc định của website trong file config/app.php
```php
'locale' => 'en', //ngôn ngữ mặc định
'fallback_locale' => 'en', // được sử dụng khi không tìm thấy config locale.
```
Ta cấu hình các thông số trên cho phù hợp và với cách 1 thì để tên folder, còn với cách 2 thì để tên file json. Ví dụ ở trên mình sử dụng file json
## 2.1 Sử dụng session và middleware 
Session để lưu ngôn ngữ hiện tại đang được chọn, middleware để xử lý  lựa chọn của người dùng. 

Tiếp theo, tạo 1 route để xử lý thay đổi.
```php
Route::get('change-language/{language}', 'HomeController@changeLanguage')->name('user.change-language');
```
Đặt 2 link vào đường dẫn tương ứng :
```php
<a href="{!! route('user.change-language', ['en']) !!}">English</a>
     <a href="{!! route('user.change-language', ['vi']) !!}">Vietnam</a>
```
Tạo ra một file changeLanguagecontroller.php, có thể tạo với lệnh `php artisan make:controller changeLanguageController`

Thay đổi nội dung bên trong như sau :
```php
public function changeLanguage($language)
{
    \Session::put('lang', $language);

    return redirect()->back();
}
```
Tiếp theo ta sẽ tạo middware để xử lý cho ứng dụng theo ngôn ngữ người dùng lựa chọn được lưu trong Session. Chạy lệnh sau để tạo ra file Locale  `php artisan make:middleware Locale`.

Sau khi chạy xong sẽ tạo ra một file trong `app/Http/Middleware/Locale.php`Nội dung file này như sau :
```php
public function handle($request, Closure $next)
    {
        if($language=$request->session()->get('lang')){
            \App::setLocale($language);
        }

    return $next($request);
    }
```
* Trong đây sẽ tạo ra một mảng các ngôn ngữ người dùng. Nó sẽ kiểm tra ngôn ngữ đang được lựa chọn lưu ở sesion và thực hiện set lại giá trị tương  ứng qua hàm ```\App::setLocale($language);```
* Để có thể chạy được mỗi khi request ta thêm vào app\Http\kernel.php .
```php
protected $middlewareGroups = [
        'web' => [
            ....
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\Locale::class // Thêm ở đây
        ],
```
* Tiếp tục thêm vào $routeMiddleware trong file app\Http\kernel.php
```php
protected $routeMiddleware = [
        ...
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'locale' => \App\Http\Middleware\Locale::class,// thêm ở đây
    ];
```
* Cuối cùng để toàn bộ route được xử lý qua middleware này, ta đặt nó như sau :
```php
Route::group(['middleware' => 'locale'], function() {
    Route::get('change-language/{language}', 'HomeController@changeLanguage')
        ->name('user.change-language');
});
```
Đến đây là xong rồi. Đây là kết quả của mình. 

![](https://images.viblo.asia/1e48512b-57fb-441e-b48d-3cd5ea70a6c9.png)
Sau khi chuyển sang tiếng anh :
![](https://images.viblo.asia/ae94519a-e6ae-415a-8222-1a0a2525b789.png)

# 3. Kết luận 
Xong rồi, hi vọng bài viết này của mình sẽ giúp ích cho các bạn. Cảm ơn bạn đã đọc !

Bài viết tham khảo từ : https://viblo.asia/p/da-ngon-ngu-i18n-trong-laravel-ByEZkWkAZQ0
và một số trang web khác.