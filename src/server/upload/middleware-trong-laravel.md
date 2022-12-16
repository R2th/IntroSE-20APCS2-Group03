# Giới thiệu
Hồi trước khi mới bắt đầu tìm hiểu về framework (Laravel), khi nhìn thấy cái gọi là Middleware mình đã khá hoang mang vì khi học PHP thuần thì chưa từng biết tới khái niệm nay. Nhưng thật ra nó lại rất đơn giản nhưng vô cùng hữu ích. Trong Laravel thì Middleware được tạo ra để lọc các HTTP Request tới ứng dụng của bạn. Không chỉ vậy, Middleware còn có thể thực hiện các nhiệm vụ khác bên cạnh xác thực request. Một CORS Middleware có thể chịu trách nhiệm thêm những header phù hợp tới tất cả những phản hồi rời khỏi ứng dụng của bạn. Một logging Middleware có thể log lại tất cả các request tới ứng dụng của bạn.

Có một vài middleware có sẵn trong laravel, bao gồm xác thực người dùng, csrf,... Bạn có thể tìm thấy chúng trong `app/Http/Middleware`

# Đăng ký middleware
## Tạo
Để tạo một middleware, bạn có thể dùng câu lệnh artisan `php artisan make:middleware`. Ví dụ, mình sẽ tạo 1 Middleware check role_id là 100 mới có thể truy cập

```
php artisan make:middleware CheckRole
```

Và đây là đoạn code ở trong middleware của mình:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
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
        $user = Auth::user();
        if ($user->role_id !== 100) {
            return redirect('home');
        }
        
        return $next($request);
    }
}

```

Ở trong middleware này, mình sẽ xét điều kiện role_id của người dùng đang đăng nhập có là 100 hay không, nếu không thì mình sẽ đưa người dùng đó quay trở lại home.

## Đăng ký

Sau khi tạo middleware thì chúng ta sẽ phải đăng ký trong `app/Http/Kernel.php`. Bạn hãy tìm tới `protected $routeMiddleware`

```php
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

Hãy đặt 1 key cho middleware của mình, ở đây mình sẽ đặt là checkRole;
```php
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
        'checkRole' => \App\Http\Middleware\CheckRole::class,
    ];
```

## Sử dụng
Chúng ta có thể chọn việc sử dụng middleware riêng cho từng route hoặc là group lại, đó là tùy vào yêu cầu của dự án.
Với việc dùng riêng thì như sau:

### Cho Route

```php
Route::get('admin/users', function () {
    //
})->middleware('checkRole');
```

hoặc bạn cũng có thể viết kiểu này:
```php
use App\Http\Middleware\CheckRole;

Route::get('admin/profile', function () {
    //
})->middleware(CheckRole::class);
```

hoặc bạn cũng có thể sử dụng nhiều middleware:

```php
Route::get('admin/profile', function () {
    //
})->middleware('checkRole', 'otherMiddleware');
```

Đối với nhiều routes, bạn có thể viết như này:

```php
Route::middleware('checkRole')->group(function () {
    Route:get('admin/users', Admin\UserController@index);
    Route:get('admin/posts', Admin\PostController@index);
});
```

Trong trường hợp bạn muốn sử dụng middleware cho toàn bộ routes trong `web.php` chẳng hạn thì bạn có thể vào `app\Providers\RouteServiceProvider.php`
```php
protected function mapWebRoutes()
    {
        Route::middleware('web', 'checkRole')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }
```

**Tip nhỏ:** Bạn có thể tạo thêm một file nữa trong thư mực `routes`, ví dụ: `admin.php` để lưu nhưng routes phía admin thay vì đăng ký trong `web.php` và chia thành 2 group, sau đó đăng ký ở trong `app\Providers\RouteServiceProvider.php`. Có thể nhiều người đã biết nhưng mình cũng thấy khá nhiều bạn viết chung. Thực ra cũng không có vấn đề gì nhưng chia nhỏ ra sẽ giúp chúng ta quản lý mọi thứ dễ hơn phải không nào :smile:

### Group Middleware
Nếu bạn muốn nhóm nhiều middleware và định nghĩa chúng bởi 1 key duy nhất thì bạn có thể group chúng lại như sau: 

```php
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

Đây là 1 group middleware mặc định của laravel mình lấy luôn làm ví dụ cho các bạn vì hơi lười tạo một group mới, mong các bạn đừng downvote vì điều này :v 

Cách sử dụng thì các bạn có thể sử dụng như những cách mình viết ở trên nhé.

### Sắp xếp

Nếu bạn cần chỉ định xem middleware nào sẽ chạy trước, middleware nào chạy sao, thì bạn chỉ cần sắp xếp chúng theo thứ tự trừ trên xuống dưới trong `protected $middlewarePriority` ở file `app/Http/Kernel.php`. 
```php
 protected $middlewarePriority = [
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\Authenticate::class,
        \Illuminate\Session\Middleware\AuthenticateSession::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \Illuminate\Auth\Middleware\Authorize::class,
    ];
```


### Truyền tham số
Lại quay lại việc check role_id nào, giờ mình không muốn fix cứng role_id 100 nữa thì làm sao nhỉ, hmmmm. Thì đương nhiên là phải truyền tham số vào middleware rồi, cách làm sẽ như sau nha:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role_id)
    {
        $user = Auth::user();
        if ($user->role_id !== $role_id) {
            return redirect('home');
        }
        
        return $next($request);
    }
}

```

Ở phía routes:

```php
Route::get('admin/users', function () {
    //
})->middleware('checkRole:100');

Route::get('admin/posts', function () {
    //
})->middleware('checkRole:200');
```


# Lời kết:

Đây là những kiến thức cơ bản mà mình đã tổng hợp để giúp các bạn hiểu về middleware. Các bạn có thể tìm vào[ docs](https://laravel.com/docs/5.8/middleware) của Laravel để nắm được một số phần còn lại mà mình không đề cập tới nhé :smile:

Mong rằng bài viết này sẽ giúp ích cho các bạn.