Hôm nay mình sẽ giới thiệu với mọi người về Middleware trong Laravel và ở đây là phiên bản 5.7

### Middleware là gì?
Theo wikipedia:
> Middleware là phần mềm máy tính với nhiệm vụ kết nối các thành phần phần mềm hoặc các ứng dụng với nhau. Phần mềm loại này bao gồm một tập các dịch vụ cho phép sự tương tác giữa các tiến trình chạy trên một hoặc nhiều máy khác nhau. Công nghệ middleware đã được phát triển để cung cấp khả năng hoạt động tương hỗ, phục vụ cho các kiến trúc phân tán thường được để hỗ trợ và đơn giản hóa các ứng dụng phân tán phức tạp.

Thì đối với Laravel nó cũng hoàn toàn như vậy.

### Cấu trúc file
Tất cả các file được đặt trong thư mục app/Http/Middleware
![](https://images.viblo.asia/753d3d60-0573-45d0-9c26-b07a6f7c9abc.png)

### Tạo Middleware trong Laravel
Để tạo một middleware, trong Laravel đã cung cấp cho chúng ta một lệnh:
```
php artisan make:middleware MiddelwareName
```
> Trong đó: MiddlewareName là tên của middleware các bạn muốn tạo.

VD: Tạo một Middleware
```
php artisan make:middleware CheckLevel
```

Nếu nhận được thông báo : **Middleware created successfully**. thì đã tạo thành công middleware.

Middleware mặc định sẽ phải nằm trong thư mục: app/Http/Middleware.

Tiếp đó các bạn mở file vừa tạo ra sẽ thấy có dạng:
![](https://images.viblo.asia/3d781d9f-f8ef-45ec-8316-d210725e8693.png)

### Sử dụng Middleware
Mọi xử lý trong middleware đều nằm trong handle function. Mọi người xem qua ví dụ cho dễ hiểu nhé:

VD: Mình muốn user vừa đăng nhập phải có status = 1 mới được vào admin:
```
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckLevel
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
        if(Auth::check()&&Auth::user()->status = 1)
        {
            return $next($request);
        }else{
            return redirect('/');
        }

    }
}
```

Xem VD: trên chắc mọi người cũng hiểu về cách hoạt động của nó rồi nhỉ!

### Đăng ký Middleware
Các phần trên mới chỉ là tạo ra middleware và viết code cho nó nhưng chưa sử dụng được, giờ nếu muốn sử dụng được middleware trong project thì chúng ta cần phải đăng ký middleware bằng các kiểu middleware sau đây:

**Global Middleware**

Global middleware là một middel là một middleware mà bất cứ HTTP request nào muốn thực hiện được cũng bắt buộc phải qua nó.

Để đăng ký **global middleware** bạn sẽ phải vào: **app/Http/Kernel.php** tìm đến đoạn:
![](https://images.viblo.asia/c54cb586-ace6-4bd5-a23c-b5337b6ad395.png)

Đăng ký với cú pháp:
```
\App\Http\Middleware\MiddlewareName::class
```

> Trong đó : MiddlewareName là tên middleware các bạn muốn thêm.

VD: Mình muốn thêm middleware CheckLevel ở VD trên:
```
protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\CheckLevel::class,
    ];
```

**Route middleware**

Khác với global middleware Route middleware chỉ sử dụng được khi bạn gọi nó ở trong Route.

Để đăng ký Route middleware thì mọi người cũng cần phải vào app/Http/Kernel.php tìm đến đoạn:

```
/**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
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

Đăng ký với cú pháp:

```
'Name'=> \App\Http\Middleware\MiddlewareName::class
```

Trong đó:

- Name: Là tên các bạn muốn đặt cho middleware.

- MiddlewareName là tên của Middleware các bạn muốn thêm.

VD: Mình sẽ thêm middleware CheckLevel vào Route middleware.

```
'Checklevel'=>\App\Http\Middleware\CheckLevel::class,
```

Sau khi đăng ký xong middleware các bạn có thể sử dụng nó với route như sau:

```
Route::get('admin/profile', function () {
    //
})->middleware('Checklevel');
```

Hoặc với nhiều middleware:

```
Route::get('admin/profile', function () {
    //
})->middleware('Middleware1','Middleware2');
```

Hoặc cũng có thể sử dụng tên đầy đủ của Middleware như sau:

```
use App\Http\Middleware\CheckLevel;

Route::get('admin/profile', function () {
    //
})->middleware(CheckLevel::class);
```

**Middleware Groups**

Với loại middleware này chúng ta có thể gộp các middleware thành các nhóm để gọi cho nhanh.

Để khai báo nhóm middleware chúng ta tìm đến đoạn:

```
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
            // \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:60,1',
            'bindings',
        ],
    ];
```

Mặc định của Laravel đã có 2 nhóm middleware là web và api.

Các bạn muốn đăng ký thêm middleware thì đăng ký theo cú pháp tương tự như mặc định của Laravel.

Và sử dụng trong Route với cú pháp:
```
Route::get('/', function () {
    //
})->middleware('web');
```

Hoặc
```
Route::group(['middleware' => ['web']], function () {
    //
});
```

**Sorting Middleware**

Bạn có thể đăng ký Middeware theo mức độ ưu tiên:

```
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

### Lời kết
Qua bài này mình đã hướng dẫn mọi người làm việc với middleware trong Laravel. Tuy nhiên nó còn có 2 loại middleware nữa mình không giới thiệu ở đây vì rất ít khi sử dụng, ai quan tâm có thể xem [ở đây](https://laravel.com/docs/5.7/middleware#middleware-parameters).

Bất kỳ thắc mắc hay yêu cầu gì thì các bạn comment phía dưới, mình sẽ giải đáp ạ. Cảm ơn các bạn đã theo dõi bài viết của mình.

Hẹn gặp lại các bạn vào bài viết tiếp theo. Thân!

**Tham khảo** : https://laravel.com/docs/5.7/middleware, https://toidicode.com/middleware-trong-laravel-51.html