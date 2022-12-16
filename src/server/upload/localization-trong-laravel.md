### 1. Localization là gì ?
Trong máy tính, quốc tế hóa (internationalization) và địa phương hóa (localization) là các thuật ngữ chỉ việc phát triển một phần mềm máy tính ở các ngôn ngữ khác nhau, các khu vực khác nhau cũng như yêu cầu kỹ thuật khác nhau phục vụ cho một quốc gia/khu vực mà ta nhắm đến.

Tính năng Localization trong Laravel cung cấp một cách thuận tiện để truy xuất các chuỗi bằng các ngôn ngữ khác nhau, cho phép bạn dễ dàng hỗ trợ nhiều ngôn ngữ trong ứng dụng của mình.

Laravel cung cấp 2 cách để quản lý các chuỗi dịch:
1. Cách đầu tiên ,các chuỗi ngôn ngữ có thể được lưu trữ trong các tệp trong thư mục *resources/lang*. Trong thư mục này, có thể có các thư mục con cho mỗi ngôn ngữ được ứng dụng hỗ trợ. Đây là cách tiếp cận mà Laravel sử dụng để quản lý các chuỗi dịch cho các tính năng Laravel được tích hợp sẵn, chẳng hạn như thông báo lỗi xác thực:

```php
/resources
    /lang
        /en
            messages.php
        /es
            messages.php
```

2. Cách thứ 2 ,các chuỗi dịch có thể được xác định trong các tệp JSON được đặt trong thư mục *resources/lang*. Khi thực hiện phương pháp này, mỗi ngôn ngữ được ứng dụng của bạn hỗ trợ sẽ có một tệp JSON tương ứng trong thư mục này. Cách tiếp cận này được khuyến nghị cho các ứng dụng có số lượng lớn các chuỗi có thể dịch được:

```php
/resources
    /lang
        en.json
        es.json
```

Trong bài viết này ,mình sẽ giới thiệu về cách thứ 2 mà mình hay dùng.

### 2. Cài đặt Localization cho ứng dụng.

##### Bước 1. Tạo các file ngôn ngữ với đuôi *.json* nằm trong thư mục *resources/lang/*
Ở đây mình hiện tại sử dụng 2 ngôn ngữ là tiếng Việt và tiếng Anh:
```php
/resources
    /lang
        en.json
        vi.json
```

1. Cấu trúc file vi.json :
```php
{
    "login" : "Đăng nhập",
    "register" : "Đăng ký",
    "dashboard" : "Trang chính"
}
```
2. Cấu trúc file vi.json :
```php
{
    "login" : "Login",
    "register" : "Register",
    "dashboard" : "Dashboard"
}
```


##### Bước 2. Tạo 1 route để xử lý hành động chuyển ngôn ngữ của người dùng

```php
Route::get('lang/{lang}','LangController@changeLanguage')->name('lang');
```

Trong hàm *changeLanguage* ta định nghĩa như sau:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LangController extends Controller
{
    //khai báo các ngôn ngữ mà website đang hỗ trợ
    private $langActive = [
        'vi',
        'en',
    ];

    public function changeLanguage(Request $request, $lang)
    {
        //nhận request chuyển ngôn ngữ, lưu vào trong session.
        if (in_array($lang, $this->langActive)) {
            $request->session()->put(['lang' => $lang]);

            return redirect()->back();
        }
    }
}
```


##### Bước 3. Tạo 1 middleware để xử lý các request gửi lên ứng dụng  qua câu lện artisan :
```php
php artisan make:middleware LangMiddleware
```

sau đó ta đăng ký cho middleware vừa tạo bằng cách theem vào file kernel.php :

```php
/**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            //other middleware
            ...
            //register LangMiddleware
            \App\Http\Middleware\LangMiddleware::class,
        ],
```


##### Bước 4. Trong file middleware LangMiddleware ta định nghĩa như sau :
```php
<?php

namespace App\Http\Middleware;

use Closure;
use App;

class LangMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($lang = $request->session()->get('lang')) {
            App::setlocale($lang);
        }

        return $next($request);
    }
}
```


##### Bước 5. Sau đó ta chỉ cần thêm link chứa route dẫn tới trang thay đổi ngôn ngữ là được :
```php
<div class="col-md-2 d-flex flex-row-reverse">
    <a href="{{ route('lang', ['lang' => 'vi']) }}"><button class="btn btn-info btn-sm" id="lang-btn">VI</button></a>
    <a href="{{ route('lang', ['lang' => 'en' ]) }}"><button class="btn btn-info btn-sm" id="lang-btn">EN</button></a>
</div>
```

Trên đây mình đã giới thiệu cho mọi người cách dùng Localization để chuyển đa ngôn ngữ cho trang web cực kì đơn giản. Hẹn gặp mọi người trong các bài viết tiếp theo.

Tham khảo :https://laravel.com/docs/8.x/localization