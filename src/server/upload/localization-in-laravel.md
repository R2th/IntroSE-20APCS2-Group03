# Localization in Laravel

Ngày nay, để tiếp cận và đáp ứng nhu cầu sử dụng của nhiều loại khách hàng, đa phần các website đều phải sử dụng đa ngôn ngữ. Với những ai đã biết và sử dụng Laravel để phát triển website thì có thể thấy rằng vấn đề đa ngôn ngữ được hỗ trợ và giải quyết cực kì dễ dàng.

Trong bài viết này, mình sẽ giới thiệu với các bạn cách để làm chức năng đa ngôn ngữ một cách dễ dàng và ít tốn thời gian nhất.
## 1. Giới thiệu
Laravel's Localization cung cấp những cách để nhận và hiển thị chuỗi dưới nhiều ngôn ngữ, giúp dễ dàng sử dụng tính năng đa ngôn ngữ trong ứng dụng, Các chuỗi đa ngôn ngữ có thể được lưu dưới dạng file .php hoặc file json bên trong thư mục `resources/lang`
Ngôn ngữ mặc định của ứng dụng được lưu trữ trong file `app.php` trong thư mục `config` với giá trị mặc định là `locale = "en"` . Bạn cũng có thể thay đổi thay đổi ngôn ngữ đang sử dụng bằng cách sử dụng hàm `setLocale` thông qua facade `App`:
```
Route::get('welcome/{locale}', function ($locale) {
    App::setLocale($locale);
    //
});
```

## 2. Các cách thiết lập

###     1. Sử dụng file PHP
Đầu tiên, ta cần thêm các subfolder vào bên trong thư mục `resource/lang` cho những ngôn ngữ mà ứng dụng bạn đang phát triển hỗ trợ. Ví dụ dưới đây mình tạo 2 subfolder là `en` và `vi` để chứa file ngôn ngữ của tiếng anh và tiếng việt
```
/resources
    /lang
        /en
            messages.php
        /vi
            messages.php
```
Trong các thư mục bạn đặt tên file php sao cho thích hợp, nội dung các file như sau:
`resources\lang\en\messages.php`

```
<?php
return [
    'welcome' => 'Welcome To My Website!',
];
```

`resources\lang\vi\messages.php`

```
<?php
return [
    'welcome' => 'Chào mừng bạn đến với website!',
];
```

Từ đây, bạn có thể sử dụng các dòng trong các file ngôn ngữ bằng cách sử dụng hàm helper `__()` của Laravel theo cú pháp: `__(<tên file> . <tên key>)`
Ở ví dụ trên sẽ là : `(messages.welcome)` . Trên file blade ta có thể sử dụng: `{{ __(messages.welcome) }}` , và kết quả trả về phụ thuộc vào ngôn ngữ bạn cấu hình hiện tại.
Còn cấu hình như nào hồi sau sẽ rõ nha. :3 
Đôi khi ta muốn truyền tham số vào chuỗi ngôn ngữ bằng cách sử dụng  `:` . Ví dụ như bạn có thể định nghĩa `welcome` với 1 placeholder `name` như sau:
`'welcome' => 'Welcome, :name',`
Để thay thế placeholder khi hiển thị chuỗi, pass mảng gồm các giá trị cần truyền thông qua tham số thứ 2 của hàm `__` :
`__('messages.welcome', ['name' => 'Tuanne'])`

### Sử dụng file Json
Cách sử dụng file php thường được áp dụng trong các ứng dụng nhỏ lẻ, ít sử dụng và hiển thị nhiều ngôn ngữ, nhưng với những ứng dụng, website lớn hơn thì sao ?
Với ứng dụng lớn hơn thì việc sử dụng đến đa ngôn ngữ rất nhiều, bởi vậy việc tạo các file với keyword ngắn trở nên bất tiện và khó nhớ hơn. Bởi vậy Laravel đã cung cấp thêm cho chúng ta một cách để viết đa ngôn ngữ dễ dàng hơn, đó là sử dụng file json thay vì file php. Điểm khác nhau đầu tiên giữa 2 loại là file php cần tạo thư mục có tên tương ứng với tên ngôn ngữ, và lấy nó là tên locale, ngược lại với cách sử dụng json file thì chỉ cần tạo 2 file json tương ứng với ngôn ngữ mà ứng dụng của bạn hỗ trợ là được. Một điểm lợi nữa và là điểm mấu chốt khiến mình nghĩ cách này tiện lợi hơn rất nhiều đó là file php yêu cầu keyword ngắn và viết liền ( điều này khiến mỗi lần muốn viết lại phải đau đầu nghĩ sao cho keyword phù hợp và tối ưu ) trong khi file json chỉ cần sử dụng toàn bộ chuỗi, hoặc thậm chí đoạn văn làm keyword. Điều này khiến lập trình viên cảm thấy dễ chịu hơn nhiều bởi khi nhìn trên file blade ta cũng có thể biết được đoạn chuỗi đó nói về cái gì.
Để sử dụng cách này, ta cần phải tạo các file ngôn ngữ với đuôi `.json` như sau:
```
/resources
    /lang
        en.json
        vi.json
```
File en.json:
`/resources/lang/en.json`

```
{
    "Welcome to my website!": "Welcome to my website!"
}
```
File vi.json
`/resources/lang/en.json`

```
{
    "Welcome to my website!": "Chào mừng bạn đến với website!"
}
```

Việc hiển thị ra blade thì vẫn dùng hàm helper `__` tương tự như trên nha mình không nói lại nữa. :3 
## 3. Website sử dụng localization 
Ở trên mình đã nói qua về localization trong Laravel, sau đây mình xin phép hướng dẫn cách để làm chứ năng đa ngôn ngữ cho website sử dụng Session và middeware:
Đầu tiên bạn cần tạo 1 route để xử lí thực thi khi người dùng chuyển ngôn ngữ:
```
Route::get('change-language/{language}', 'HomeController@changeLanguage')->name('change-language');
```
Trong hàm changeLanguage ta viết như sau:
```
$lang = $request->language;
$language = config('app.locale');
if ($lang == 'en') {
    $language = 'en';
}
if ($lang == 'vi') {
    $language = 'vi';
}
Session::put('language', $language);
return redirect()->back();
```
Tiếp theo bạn tạo 1 middleware tên là `Localization` thông qua câu lệnh:
`php artisan make:middleware Localization`
Nhớ thêm vào Kelnel.php middleware mình vừa tạo đó  nhé :3 
```
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'admin'    =>   \App\Http\Middleware\GoToAdminPage::class,
        'localization' => \App\Http\Middleware\Locale::class,
    ];
```

Trong file middleware `Localization.php`
```
class Locale
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
           $language = Session::get('language', config('app.locale'));
           switch ($language) {
            case 'en':
                $language = 'en';
                break;
            
            default:
                $language = 'vi';
                break;
        }
        App::setLocale($language);
        
        return $next($request);
    }
}
```

Rồi đặt tất cả các route cần sử dụng đa ngôn ngữ vào bên trong middeware này:
```
Route::group(['middleware' => 'localization'], function () {
    Route::get('/', function () {
        return view('welcome');
    });
    Route::get('change-language/{language}', 'HomeController@changeLanguage')->name('change-language');
});
```
Vậy là xong. :3 . Việc cuối cùng bạn cần làm là thêm đường link dẫn tới trang thay đổi ngôn ngữ hoặc selection dẫn tới trang mong muốn là được :
```
<a href="{!! route('change-language', ['en']) !!}">English</a>
<a href="{!! route('change-language', ['vi']) !!}">Vietnam</a>
```
Hy vọng qua bài viết của mình có thể giúp bạn hình dung được cách hoạt động cũng như làm được chức năng đa ngôn ngữ một cách dễ dàng.