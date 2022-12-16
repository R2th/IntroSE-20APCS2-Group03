`Laravel` là một framework PHP miễn phí và mã nguồn mở theo mô hình MVC. Nó là một framework PHP rất phổ biến giúp giảm chi phí phát triển và cải thiện chất lượng code. Sử dụng Laravel , các nhà phát triển có thể tiết kiệm hàng giờ thời gian phát triển và giảm hàng ngàn dòng code so với PHP thuần. Vì Laravel tái sử dụng các `components` của các `frameworks` khác nhau trong việc thiết kế ứng dụng web.
Do thiết kế của Laravel tái sử dụng những Component từ nhiều framework khác nhau, nên kết quả trở nên phức tạp nhưng ứng dụng hơn.Bộ sưu tập lớn các câu hỏi phỏng vấn chắc chắn sẽ giúp bạn tìm được một công việc tuyệt vời.
![](https://images.viblo.asia/32ba464e-a61c-40cd-8671-d705e52db824.jpg)
# I. Kiến Thức
## 1. Laravel framework là gì ?
Nó là một framework PHP miễn phí, mạnh mẽ và mã nguồn mở theo mô hình MVC. Nó là một framework PHP rất phổ biến giúp giảm chi phí phát triển và cải thiện chất lượng code
## 2. Phiên bản mới nhất của laravel là gì?
Phiên bản hiện tại là 5.7. Nó được phát hành vào tháng 8 năm 2018. Bài mình đang viết là tháng 02/2019 =))
##  3. Làm thế nào chúng ta có thể cài đặt Laravel bởi composer?
1. Tải xuống `composer` từ https://getcomposer.org/doad/ (nếu bạn không có `composer` trên máy tính của mình)
2.  Mở cmd lên chạy lệnh `composer create-project laravel/laravel project name "5.6"`
Nếu bạn không đề cập đến bất kỳ phiên bản cụ thể nào, thì nó sẽ cài đặt với phiên bản mới nhất.
## 4. Middleware trong Laravel là gì?
Trong `Laravel` Middleware như một người trung gian giữa `request` và `response`.  Middleware là một loại cơ chế lọc HTTP `request`. 
Ví dụ: Nếu người dùng không được xác thực và nó đang cố truy cập dashboard thì `Middleware` sẽ chuyển hướng người dùng đó đến trang đăng nhập.
```php
// Syntax
php artisan make:middleware MiddelwareName
// Example
php artisan make:middleware UserMiddelware
Now UserMiddelware.php file will create in app/Http/Middleware
```
## 5. Các khái niệm cơ bản trong laravel là gì?
* Blade Templating
* Routing
* Eloquent ORM
* Middleware
* Artisan(Command-Line Interface)
* Security
* In built Packages
* Caching
* Service Providers
* Facades
* Service Container

## 6. Migration trong laravel là gì? Làm thế nào để sử dụng chúng?

Nó là một kiểu kiểm soát phiên bản cho cơ sở dữ liệu của chúng ta. Nó cho phép chúng ta sửa đổi và chia sẻ lược đồ cơ sở dữ liệu của ứng dụng một cách dễ dàng.
Một file `migration` chứa 2 methods `up` và `down()` . Hàm `up()` sử dụng để thêm 1 bảng, cột, indexes của cơ sở dữ liệu và hàm `down()` sử dụng để `reverse` (đảo ngược) các hành động thực hiện bởi hàm `up()`
```php
You can generate a migration & its file with the help of  make:migration .
Syntax : php artisan make:migration blog
A current_date_blog.php file will be create in  database/migrations 
```
## 7.Service providers trong laravel là gì?
`Service providers` có một vị trí trung tâm của toàn bộ ứng dụng Laravel. `Service providers` là một công cụ mạnh mẽ để quản lí các `class dependencies` và thực hiện quá trình `dependency injection`. Service provider nói với Laravel `bind` các thành phần khác nhau vào `Service container` của laravel.
Bạn có thể sử dụng lệnh `php artisan make: provider ClientsServiceProvider ` trên command để tự tạo ra một `service provider`.
Nó sẽ cung cấp cho chúng ta 2 `function` là: `register()` và  `boot()`.
## 8. Lumen là gì?
Đây là giải pháp hoàn hảo để phát triển các `microservices` và  `fast API` dựa trên Laravel. Đó là một dự án mới được tạo ra bởi Taylor Otwell. Nó được xây dựng cho microservice, không nhiều cho các ứng dụng giao tiếp với người dùng.
Bạn phải sử dụng lệnh này để cài đặt lumem
`composer global require "laravel/lumen-installer=~1.0"`.
## 9.Cấu hình cho Laravel 5.7 là gì?
* Nó cần PHP >= 7.1.3
* Nó cần OpenSSL PHP Extension
* Nó cần PDO PHP Extension
* Nó cần Mbstring PHP Extension
* Nó cần Tokenizer PHP Extension
* Nó cần XML PHP Extension
* Nó cần Ctype PHP Extension
* Nó cần JSON PHP Extension
* Nó cần BCMath PHP Extension etc
## 10. Làm thế nào chúng ta có thể tắt bảo vệ CRSF cho một Route cụ thể?
Chúng ta có thể thêm URL cụ thể hoặc Route trong biến `$except` trong file `app\Http\Middleware\VerifyCsrfToken.php`
```php
class VerifyCsrfToken extends BaseVerifier {
      protected $except = [
            'Pass here your URL',
      ];
}
```
## 11. Laravel sử dụng template engine nào?
Laravel sử dụng **Blade Template Engine**.  Nó là một templating engine đơn giản và mạnh mẽ được cung cấp bởi Laravel.
## 12. Facade trong laravel là gì ? Làm sao để sử dụng nó ?
Facade là 1 kiểu class, class này cung cấp 1 `static interface` cho services. Facade giúp truy cập 1 `service` trực tiếp từ `container`. Nó được định nghĩa trong Illuminate\Support\Facades, nhờ đó chúng ta có thể dễ dàng sử dụng.
```php
use Illuminate\Support\Facades\Cache;

     Route::get('/cache', function () {
     return Cache::get('PutkeyNameHere');
});
```
## 13. Làm thế nào để tạo 1 helper trong Laravel ?
1.  Tạo một `app/helpers.php` trong thư mục ứng dụng
2.  Thêm 
```php
"files": [
    "app/helpers.php"
]
```
trong biến `autoload` của file `composer.json `.

3.  Sau đó update composer bằng `composer dump-autoload` và ` composer update`.
## 14. Sử dụng middleware trong laravel như thế nào?
Trong `Laravel` Middleware như một người trung gian giữa `request` và `response`.  Middleware là một loại cơ chế lọc HTTP `request`. 

1.  Chúng ta có thể tạo 1 middelware với lệnh `php artisan make:middleware UsersMiddleware`
2.  Ở đây `UsersMiddleware` là tên của Middleware. Sau khi chạy lệnh này nó sẽ tạo ra một file `UsersMiddleware.php` trong đường dẫn `app/Http/Middleware`.
3.  Sau đó chúng ta phải đăng kí `middleware` vừa tạo `kernel.php ` trong đường dẫn `app/Http`.
```php
'Users' => \App\Http\Middleware\UsersMiddleware::class,
```
4. Bây giờ chúng ta có thể gọi `middleware` Users ở những chỗ chúng ta cần như controller hoặc route.
```php
//Controller
public function __construct() { 
    $this->middleware('Users');
}

//Route
Route::group(['middleware' => 'Users'], function () { 
    Route::get('/', 'HomeController@index'); 
});
```
## 15. Một Artisan là gì?
Artisan là một kiểu `command line interface"` sử dụng trong Laravel. Nó cung cấp rất nhiều lệnh hữu ích cho bạn trong khi phát triển ứng dụng của bạn.
Một số lệnh artisan phổ biến 
* php artisan list
* php artisan --version
* php artisan help
* php artisan make:controller
* php artisan make:model
* php artisan make:migration
* php artisan make:middleware
* php artisan make:auth
* php artisan make:mail
* php artisan make:provider
## 16. Service container là gì?
Service Container là một công cụ mạnh mẽ được sử dụng để quản lý các `class dependencies` và thực hiện `dependency injection`. Nó còn được gọi là `container IoC`.
## 17. Làm thế nào chúng ta có thể cấu hình một Mail trong laravel?
Laravel cung cấp API rõ ràng và đơn giản trên thư viện phổ biến `SwiftMailer` với các drivers cho `SMTP`, `Mailgun`, `SparkPost`, `Amazon SES` và gửi email. Laravel đang cho phép chúng tôi gửi `Mail quickly` thông qua các dịch vụ local hoặc trên nền tảng đám mây.

Nó cho phép chúng ta lưu trữ thông điệp email của chúng ta trong các file view. 
```php
public function sendEmail(Request $request, $id)
    {
        $user = Admin::find($id);

        Mail::send('emails.reminder', ['user' => $user], function ($m) use ($user) {
            $m->from('info@bestinterviewquestion.com', 'Reminder');

            $m->to($user->email, $user->name)->subject('Your Reminder!');
        });
    }

```
## 18. Auth là gì ? Làm sao để sử dụng chúng ?
Laravel Auth là quá trình xác định thông tin đăng nhập của người dùng với cơ sở dữ liệu. Laravel quản lý nó với sự trợ giúp của các `sessions`, Các `sessions` lấy tham số đầu vào như tên người dùng và mật khẩu, để nhận dạng người dùng. Nếu các cài đặt khớp nhau thì người dùng được cho là đã được xác thực. Auth là chức năng được xây dựng do Laravel cung cấp; chúng ta phải sử dụng lệnh `php artisan make: auth` 
Auth được sử dụng để xác định thông tin đăng nhập của người dùng với cơ sở dữ liệu.
## 19. Các tính năng của laravel là gì?
1. Cung cấp một bộ chức năng phong phú như  `Eloquent ORM`, `Template Engine`, `Artisan`, `Migration system for databases` . . .
2. `Libraries` & `Modular` (Thư viện và Mô dun)
3. Chúng hỗ trợ kiến trúc MVC
4. Unit Testing
5. Bảo mật
6. Trang web được xây dựng trong Laravel có khả năng mở rộng và bảo mật hơn.
7. Nó bao gồm các `namspace`và `interface` giúp tổ chức tất cả các tài nguyên.
8. Cung cấp API clean
## 20.Những gì mới trong Laravel 5.7?
* Nova
* Email Verification
* Notifications localization
* Console Testing
* URL Generator & callable
*  Tùy chỉnh link phân trang
* Thay đổi thư mục Resources
* Cải thiện thông báo lỗi cho `dynamic calls`
* New Dump Server
* Guest user gates policies
* Filesystem Read / Write Streams
## 21. Package trong Laravel là gì ?
Package Laravel là một cách chính để thêm chức năng vào Laravel. Packages có thể chứa `routes`, `controllers`, `views` và cấu hình đặc biệt nhằm tăng cường tính ứng dụng ở nhiều project Laravel khác nhau.
Có rất nhiều `Package` có sẵn hiện nay và laravel có một số `Package` chính thức được đưa ra dưới đây:
* Cashier
* Dusk
* Envoy
* Passport
* Socialite
* Telescope
## 22. Validation trong laravel và cách sử dụng ?

Validation là một điều quan trọng nhất trong khi thiết kế một ứng dụng. Nó xác nhận dữ liệu đến. Nó sử dụng  `ValidatesRequests` cung cấp một phương thức thuận tiện để xác thực các yêu cầu HTTP đến với các quy tắc xác thực mạnh mẽ.
Dưới đây là một số Quy tắc xác thực có sẵn trong Laravel được liệt kê:
* Alpha
* Image
* Date Format
* IP Address
* URL
* Numeric
* Email
* Size
* Min , Max
* Unique with database
## 23. Làm sao để kế thừa file view trong Laravel
Với @extends này ('layouts.master'), chúng ta có thể mở rộng master layout này trong bất kỳ tệp xem nào. Trong ví dụ này, layouts là một thư mục được đặt trong `resources/views` có sẵn và file master sẽ ở đó. Bây giờ "master.blade.php" là một layout file.

## 24. Làm thế nào để chuyển hướng từ controller sang view trong laravel ?
Chúng ta có thể sử dụng 
```php
return redirect('/')->withErrors('You can type your message here');
return redirect('/')->with('variableName', 'You can type your message here');
return redirect('/')->route('PutRouteNameHere');
```
## 25. Làm thế nào để tạo một hằng số và sử dụng globally?
Bạn có thể tạo một `constants.php page/file ` trong thư mục cấu hình nếu không tồn tại. Bây giờ bạn có thể đặt biến không đổi có giá trị ở đây và có thể sử dụng với Config :: get ('constants.VaribleName');
```php
return [
    'ADMINEMAIL' => 'info@bestinterviewquestion.com',
];
Now we can display with 

Config::get('constants.ADMINEMAIL');
```
## 27 How to use Ajax in any form submittion?
```javascript
<script type="text/javascript">
    $(document).ready(function() {
       $("FORMIDORCLASS").submit(function(e){
            // FORMIDORCLASS will your your form CLASS ot ID
            e.preventDefault();
       $.ajaxSetup({
            headers: {
                 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                // you have to pass  in between tag
            }
    })
     var formData = $("FORMIDORCLASS").serialize();
    $.ajax({
          type: "POST",
         url: "",
         data : formData,
         success: function( response ) {
              // Write here your sucees message
         }, error: function(response) {
            // Write here your error message
         },
    });
    return false;
   });
});
</script>
```
## 28. Làm sao để bật Log Query trong Laravel ?
* DB::connection()->enableQueryLog();
* $querieslog = DB::getQueryLog();
* dd($querieslog)
```php
DB::connection()->enableQueryLog();
$result = User:where(['status' => 1])->get();
$log = DB::getQueryLog();
dd($log);
```
## 29. Làm sao để lấy route name hiện tại 
```php
request()->route()->getName()
```
## 30. Làm sao để tạo model controller và  migration trong một câu lệnh laravel ? 
```
php artisan make:model ModelNameEnter -mcr
```
## II Tổng kết
Trên đây là 30 câu hỏi mình dịch được từ bài [Laravel Interview Questions and answers]. (https://www.bestinterviewquestion.com/laravel-interview-questions). Vì kiến thức bài này đã dài rồi nên mình xin phép kết thúc ở đây. Các bạn đón đọc phần 2 ở bài tiếp theo nhé.

**Donate cho tác giả** : **[Buy me a coffee](https://www.buymeacoffee.com/su.lowkey)**