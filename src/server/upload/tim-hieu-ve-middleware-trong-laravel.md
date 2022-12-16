Chào các bạn, để tiếp tục với series tìm hiểu về Laravel hôm nay mình sẽ cùng các bạn tìm hiểu về Middleware trong Laravel.
## Giới thiệu chung
Middleware cung cấp một cơ chế thuận tiện để lọc các request HTTP vào ứng dụng của bạn. Ví dụ Laravel cung cấp sẵn một middleware xác thực người dùng, nếu người dùng chưa được xác thực thì ứng dụng sẽ chuyển hướng về màn hình login người lại nếu người dùng đã xác thực thành công ứng dụng sẽ cho phép request tiếp tục vào ứng dụng.
Tất cả các middleware Laravel đều được đặt trong thư mục *app/Http/Middleware*.
## Định nghĩa một middleware
Để tạo một middleware mới chúng ta có thể sử dụng lệnh artisan: **make:middleware**
```
php artisan make:middleware CheckAge
```
Lệnh này sẽ tạo một class *CheckAge* trong thư mục *app/Http/Middleware*. Trong middleware này, tôi sẽ chỉ cho phép truy cập vào route nếu age lớn hơn 200. Nếu không, tôi sẽ chuyển hướng người dùng quay lại.
```
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
Như bạn thấy, nếu age nhỏ hơn hoặc bằng 200, middleware sẽ trả lại một HTTP chuyển hướng tới client; ngược lại, request sẽ được gửi tiếp để xử lý. Để truyền request vào sâu hơn trong ứng dụng (cho phép middleware "vượt qua"), đơn giản chỉ cần gọi callback $next với $request.
Tốt nhất hãy hình dung middleware như một chuỗi các "lớp" HTTP requests phải vượt qua trước khi vào ứng dụng. Mỗi lớp sẽ được kiểm tra request và thậm chí có thể từ chối request hoàn toàn.
## Before & After Middleware
Việc middleware chạy trước hay chạy sau một request phụ thuộc vào middleware đó. Ví dụ, middleware sau sẽ thực hiện một số tác vụ trước khi request được chương trình xử lý:
```
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
Tuy nhiên, middleware này sẽ thực hiện việc của nó after request được xử lý bởi chương trình:
```
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
## Registering Middleware
### Global Middleware
Nếu bạn muốn một middleware có thể thực thi trong mọi HTTP request tới ứng dụng của bạn, đơn giản chỉ cần liệt kê tên class middleware trong thuộc tính *$middleware* của class *app/Http/Kernel.php*.
### Assigning Middleware To Routes
Nếu bạn muốn gán middleware cho route cụ thể, đầu tiên bạn cần thêm middleware đó là 1 key trong file *app/Http/Kernel*.php. Mặc định, thuộc tính *$routeMiddleware* chứa một số class middleware có sẵn trong Laravel. Để thêm middleware của bạn, đơn giản chỉ là thêm nó vào dach sách và gán từ khóa bạn chọn. Ví dụ:
```
// Within App\Http\Kernel Class...

protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
];
```
Mỗi middleware được định nghĩa trong HTTP kernel, bạn có thể sử dụng phương thức *middleware* để chỉ định middleware cho một route:
```
Route::get('admin/profile', function () {
    //
})->middleware('auth');
```
Bạn cũng có thể chỉ định nhiều middleware cho route:
```
Route::get('/', function () {
    //
})->middleware('first', 'second');
```
Khi chỉ định middleware cho route, bạn cũng có thể sử dụng tên đầy đủ của class middleware:
```
use App\Http\Middleware\CheckAge;

Route::get('admin/profile', function () {
    //
})->middleware(CheckAge::class);
```
### Middleware Groups
Đôi khi có thể bạn muốn nhóm một vài middleware lại trong một key để thực hiện gán vào route dễ dàng hơn. Bạn có thể sử dụng thuộc tính *$middlewareGroups* của HTTP kernel.
Ngoài ra, Laravel đi kèm với các nhóm middleware web và api có chứa các middleware phổ biến mà bạn có thể áp dụng cho giao diện người dùng trên các route web và các api của mình:
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
Middleware group được gán vào routes và controller sử dụng cú pháp tương tự như với middleware đơn lẻ. Một lần nữa, middleware group làm đơn giản trong việc gán các middleware vào trong một route:
```
Route::get('/', function () {
    //
})->middleware('web');

Route::group(['middleware' => ['web']], function () {
    //
});
```
## Middleware Parameters
Middleware cũng có thể nhận thêm các tham số truyền vào. Ví dụ, nếu ứng dụng của bạn cần xác thực có "role" cụ thể trước khi thực hiện một thao tác nào đó, bạn có thể tạo một *CheckRole* middleware để nhận tên của role như một tham số.
Thêm các tham số middleware sẽ được truyền vào middleware ngay sau tham số *$next* của hàm handle:
```
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
Tham số middleware có thể được khai báo trên route bằng cách phân chia tên middleware và tham số bởi dấu `:`. Nhiều tham số thì cần được phân chia bởi dấy phẩy:
```
Route::put('post/{id}', function ($id) {
    //
})->middleware('role:editor');
```
## Terminable Middleware
Đôi khi một middleware có thể cần thực hiện sau khi HTTP response đã được gửi xong cho trình duyệt. Ví dụ, *session* middleware có trong Laravel ghi dữ liệu session cho storage sau khi response được gửi tới trình duyệt. Nếu bạn định nghĩa một phương thức *terminate* vào trong middleware, nó sẽ tự động được gọi sau khi response được gửi tới trình duyệt.
```
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
Phương thức terminate có thể nhận cả request và response. Mỗi khi bạn định nghĩa terminable middleware, bạn cần thêm vào danh sách global middleware trong file *app/Http/Kernel.php*.
Khi bạn gọi hàm *terminate* trong middleware, Laravel sẽ giải quyết instance mới cho middleware từ service container. Nếu bạn muốn sử dụng cùng một middleware instance khi mà phương thức handle và terminate được gọi, hãy đăng ký middleware vào trong *container* sử dụng phương thức *singleton*.

Tham khảo : https://laravel.com/docs/6.x/middleware