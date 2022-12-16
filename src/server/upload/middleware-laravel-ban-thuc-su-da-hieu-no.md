# Middleware là gì?

<div align="left">middleware là phần nằm giữa các resquest từ người dùng đến hệ thống nó  
sẽ kiểm xem các request có thoả mãn các điều kiện do mình cung cấp hay không.
Giả sử chúng ta có 1 điều kiện để áp dụng cho nhiều function thì tránh việc phải thêm điều kiện vào từng function thì laravel đã cung cấp 1 cách dễ dàng hơn đó là sử dụng middleware để gom những router cần phải kiểm tra điều kiện lại để code ngắn gọn hơn.</div>

# Tạo middleware

Để tạo một middleware mới, sử dụng câu lệnh Artisan make:middleware:

```
php artisan make:middleware AgeMiddleware
```

Câu lệnh này sẽ tạo class AgeMiddleware bên trong thư mục app/Http/Middleware. Trong middleware này, chúng ta sẽ chỉ cho phép truy cập vào route nếu như giá trị age < 18. Nếu không, thì sẽ chuyển hướng users trở lại "home" URI.

```PHP
<?php

namespace App\Http\Middleware;

use Closure;

class AgeMiddleware
{
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->age < 18) {
            return redirect('home');
        }

        return $next($request);
    }

}
```

# Before / After Middleware

Việc một middleware chạy trước hay sau một request phụ thuộc vào chính nó. Ví dụ, middleware dưới đây sẽ thực hiện vài tác vụ trước khi request được chương trình xử lý:
```PHP
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

Tuy nhiên, middleware này sẽ thực hiện việc của nó sau khi request được xử lý bởi chương trình:

```PHP
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

# Đăng kí middleware
## Global Middleware
Nếu bạn muốn một middleware có thể được thực thi trong mỗi HTTP request tới chương trình, đơn giản chỉ cần thêm tên class của middleware đó vào trong thuộc tính $middleware của class app/Http/Kernel.php.

## Thiết lập middleware cho route
Nếu bạn muốn thiết lập middleware cho một số route cụ thể, bạn đầu tiên cần phải thêm middleware vào trong biến $routeMiddleware trong file app/Http/Kernel.php và đặt cho nó một key:
```PHP
protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
];
```
Sau khi đã được khai báo trong HTTP Kernel, bạn có thể sử dụng khoá middleware để thiết lập thông số cài vào trong route:
```PHP
Route::get('admin/profile', ['middleware' => 'auth', function () {
    //
}]);
```
Sử dụng một array để thực hiện gán nhiều middleware vào trong route:
```PHP
Route::get('/', ['middleware' => ['first', 'second'], function () {
    //
}]);
```

## Tạo nhóm middleware
Sẽ có lúc bạn muốn thực hiện nhóm một vài middleware lại vào trong một khoá để có thể thực hiện gán vào route dễ dàng hơn. Bạn có thể làm như vậy bằng cách sử dụng thuộc tính $middlewareGroups của HTTP kernel.

Về cơ bản, Laravel cung cấp sẵn hai nhóm middleware thường sử dụng mà bạn có thể muốn áp dụng cho web UI hay API:

```PHP
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
    ],

    'api' => [
        'throttle:60,1',
        'auth:api',
    ],
];
```

Các nhóm middleware được gán vào route và controller action sử dụng cú pháp tương tự như với từng middleware riêng. Việc sử dụng nhóm middleware sẽ làm cho việc gán các middleware vào trong một route trở nên tiện hơn:
```PHP
Route::group(['middleware' => ['web']], function () {
    //
});
```

# Middleware Parameters
Middleware cũng có thể nhận các tham số truyền vào. Ví dụ, nếu chương trình cần xác nhận user đã được xác thực có "role" cụ thể trước khi thực hiện một thao tác nào đó, bạn có thể tạo ra RoleMiddleware để nhận tên của role như một tham số.

Các tham số của middleware sẽ được truyền vào thành tham số của hàm handle ngay sau tham số $next:

```PHP
<?php

namespace App\Http\Middleware;

use Closure;

class RoleMiddleware
{
    /**
     * Run the request filter.
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

Tham số cho middleware cũng có thể được khai báo trên route bằng cách phân cách tên middleware và tham số bởi dấu :. Nhiều tham số phân cách nhau bởi dấu phẩy ,: