Xin chào tất cả mọi người. Hôm nay mình sẽ hướng dẫn các bạn sử dụng middleware trong laravel 5.8.

# Giới thiệu
Middleware cung cấp một cơ chế thuận tiện để lọc các HTTP Request vào ứng dụng của bạn. Ví dụ: Laravel bao gồm một Middleware xác minh người dùng truy cập vào ứng dụng của bạn. Nếu người dùng không được xác thực, Middleware sẽ chuyển hướng người dùng đến màn hình đăng nhập. Ngược lại, nếu người dùng được xác thực, Middleware sẽ cho phép Request tiếp tục vào ứng dụng.

Middleware có thể được viết để thực hiện thêm các nhiệm vụ khác bên cạnh việc xác thực. Middleware CORS chịu trách nhiệm thêm các tiêu đề thích hợp cho tất cả các response rời khỏi ứng dụng của bạn. Middleware log có thể thực hiện ghi log cho tất cả các request tới ứng dụng.

Vài middleware đã có sẵn trong Laravel framework, bao gồm middleware cho bảo trì, xác thực, phòng chống CSRF và còn nữa. Tất cả những middleware này nằm trong thư mục `app/Http/Middlware`.

# Tạo Middleware
Để tạo một middleware mới, các bạn hãy sử dụng câu lệnh Artisan: `make:middleware`
`php artisan make:middleware CheckAge`

Lệnh này sẽ tạo một class CheckAge trong thư mục `app/Http/Middleware`. . Trong middleware này, chúng ta sẽ chỉ chp phép truy cập vào route nếu giá trị age lớn hơn 200. Nếu không, chúng ta sẽ chuyển hướng người dùng quay lại 'home' URL.
```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckAge
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
        if ($request->age <= 200) {
            return redirect('home');
        }

        return $next($request);
    }
}
```

Như các bạn đã thấy, nếu giá trị age đã cho nhỏ hơn hoặc bằng 200, middleware sẽ trả lại một HTTP chuyển hướng tới client; ngược lại, request sẽ được gửi tiếp để xử lý. Để truyền request vào sâu hơn trong ứng dụng (cho phép middleware "vượt qua"), đơn giản chỉ cần gọi callback $next với $request. 
Tốt nhất là hãy hình dung middleware là một chuỗi các "layers" trên HTTP request cần phải đi qua trước khi đi vào trong chương trình. Mỗi layer sẽ thực hiện kiểm tra request và thậm chí có thể huỷ từ chối request hoàn toàn.

## Before và After Middleware
Việc một middleware chạy trước hay sau một request phụ thuộc vào chính middleware nó. Ví dụ, middleware dưới đây sẽ thực hiện vài tác vụ **trước khi** request được chương trình xử lý:
```php
<?php

namespace App\Http\Middleware;

use Closure;

class BeforeMiddleware
{
    public function handle($request, Closure $next)
    {
        // Perform action

        return $next($request);
    }
}
```

Tuy nhiên, middleware này sẽ thực hiện nhiệm vụ của mình sau khi request được ứng dụng xử lý:
```php
<?php

namespace App\Http\Middleware;

use Closure;

class AfterMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Perform action

        return $response;
    }
}
```

# Đăng kí Middleware

## Global Middleware
Nếu bạn muốn một middleware chạy trong mỗi HTTP Request đến ứng dụng của bạn, đơn giản chỉ cần thêm tên class của middleware đó vào trong thuộc tính `$middleware` của class `app/Http/Kernel.php`.

## Thiết lập middleware cho route
Nếu bạn muốn gán middleware cho các route cụ thể, trước tiên bạn cần phải thêm middleware vào trong biến `$routeMiddleware` trong file `app/Http/Kernel.php` và đặt cho nó một key:
```php
// Within App\Http\Kernel Class...

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
];
```

Sau khi đã được khai báo trong HTTP Kernel, bạn có thể sử dụng `khoá middleware` để thiết lập thông số cài vào trong route:
```rust
Route::get('admin/profile', function () {
    //
})->middleware('auth');
```

Bạn cũng có thể chỉ định nhiều middleware cho route
```rust
Route::get('/', function () {
    //
})->middleware('first', 'second');
```

Khi gán middleware, bạn cũng có thể sử dụng tên class đầy đủ của middleware muốn :
```rust
use App\Http\Middleware\CheckAge;

Route::get('admin/profile', function () {
    //
})->middleware(CheckAge::class);
```

## Tạo nhóm middleware
Đôi khi bạn muốn nhóm một số middleware bằng một khóa duy nhất để có thể gán vào route dễ dàng hơn. Bạn có thể làm điều này bằng cách sử dụng `$middlewareGroups` của HTTP kernel.

Về cơ bản, Laravel cung cấp sẵn hai nhóm middleware thường sử dụng mà bạn có thể muốn áp dụng cho web UI hay API:
```php
/**
 * The application's route middleware groups.
 *
 * @var array
 */
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],

    'api' => [
        'throttle:60,1',
        'auth:api',
    ],
];
```

Các nhóm middleware có thể gán cho các route và controller action sử dụng cú pháp tương tự như với từng middleware riêng. Việc sử dụng nhóm middleware sẽ làm cho việc gán các middleware vào trong một route trở nên tiện hơn:
```rust
Route::get('/', function () {
    //
})->middleware('web');

Route::group(['middleware' => ['web']], function () {
    //
});
```

`*Tip: Nhóm middleware web được tự động áp dụng vào trong file routes.php qua RouteServiceProvider.*`

## Sắp xếp Middleware
Đôi khi, bạn cần middleware của mình để thực thi theo một thứ tự cụ thể nhưng không có quyền kiểm soát thứ tự của chúng khi chúng được gán cho route. Trong trường hợp này, bạn có thể chỉ định mức độ ưu tiên của middleware bằng cách sử dụng  `$middlewarePriority` ở trong : `app/Http/Kernel.php`:
```php
/**
 * The priority-sorted list of middleware.
 *
 * This forces non-global middleware to always be in the given order.
 *
 * @var array
 */
protected $middlewarePriority = [
    \Illuminate\Session\Middleware\StartSession::class,
    \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    \App\Http\Middleware\Authenticate::class,
    \Illuminate\Session\Middleware\AuthenticateSession::class,
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    \Illuminate\Auth\Middleware\Authorize::class,
];
```

# Middleware Parameters
Middleware cũng có thể nhận các tham số truyền vào. Ví dụ, nếu chương trình cần xác nhận user đã được xác thực có "role" cụ thể trước khi thực hiện một thao tác nào đó, bạn có thể tạo ra `CheckRole` để nhận tên của role như một tham số.

Các tham số của middleware sẽ được truyền vào thành tham số của hàm handle ngay sau tham số `$next`:
```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (! $request->user()->hasRole($role)) {
            // Redirect...
        }

        return $next($request);
    }

}
```

Tham số cho middleware cũng có thể được khai báo trên route bằng cách phân cách tên middleware và tham số bởi dấu :. Nhiều tham số phân cách nhau bởi dấu phẩy , :
```rust
Route::put('post/{id}', function ($id) {
    //
})->middleware('role:editor');
```

# Terminable Middleware
Đôi khi một middleware cần thực hiện chỉ sau khi HTTP response đã được gửi xong cho trình duyệt. Ví dụ, "session" middleware đi kèm với Laravel cung cấp session data cho storage sau khi response được gửi tới trình duyệt. Để làm được việc này, cần phải tạo một middleware kiểu "kết thúc" bằng cách thêm vào hàm `terminate` vào trong middleware:
```php
<?php

namespace Illuminate\Session\Middleware;

use Closure;

class StartSession
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

    public function terminate($request, $response)
    {
        // Store the session data...
    }
}
```

Hàm `terminate` sẽ nhận cả request và response. Khi mà bạn khai báo một terminable middleware, bạn phải thêm nó vào trong danh sách global middleware trong `app/Http/Kernel.php`.

Khi gọi hàm `terminate` trong middleware, Laravel sẽ thực hiện resolve một instance mới cho middleware từ *service container*. Nếu bạn muốn sử dụng cùng một instance khi mà `handle` và `terminate` được gọi, đăng kí middleware vào trong container sử dụng hàm `singleton`.

Đây là Series bài viết đầu tiên của mình về Laravel, nếu có sai sót mong các bạn góp ý và thông cảm. Bất kỳ thắc mắc hay yêu cầu gì thì các bạn comment phía dưới, mình sẽ giải đáp ạ. Cảm ơn các bạn đã theo dõi bài viết của mình.

Hẹn gặp lại các bạn vào bài viết tiếp theo. Thân!

**Tham khảo**: https://laravel.com/docs/5.8/middleware