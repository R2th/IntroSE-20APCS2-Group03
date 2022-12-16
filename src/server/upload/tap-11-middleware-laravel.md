Hi, rất vui được gặp lại các bạn. Để tiếp tục series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" thì trong tập này mình sẽ nói về một component rất hay sử dụng trong Laravel, đó chính là "Middleware". Thuật ngữ này chúng ta đã gặp rất nhiều trong các tập trước, vì vậy ngày hôm nay mình sẽ đào sâu "Middleware" để các bạn có một cái nhìn tổng quan hơn về nó.

# I. Giới thiệu (Introduction)
Middleware cung cấp cho chúng ta cơ chế dễ dàng để có thể lọc các request HTTP đến ứng dụng. Mình sẽ lấy lại một ví dụ đã từng đề cập, chẳng hạn ứng dụng của bạn có chức năng login, khi client vào đường dẫn `/setting` thì hệ thống sẽ kiểm tra xem đã tồn tại session/cookie user chưa (tức là đã đăng nhập hay chưa). Nếu có đăng nhập thì tiếp tục cho request thực thi và xuất ra trang setting, còn nếu không thì redirect về `/login`. Công việc trên sẽ do các middleware đảm nhận.

Các core middleware của Laravel và kể các các middleware do bạn tạo ra đều nằm trong thư mục `app/Http/Middleware`.

# II. Khởi tạo middleware (Create middleware)
Để tạo một middleware mới, sử dụng lệnh Artisan `make:middleware`.

> php artisan make:middleware CheckAge

Sau khi lệnh thực thi, ta sẽ thấy file `CheckAge.php` đã được tạo trong thư mục `app/Http/Middleware`. Bây giờ chúng ta mở file đó lên và quan sát, ta chỉ thấy vỏn vẹn một method `handle`.

```PHP:app/Http/Middleware/CheckAge.php
/**
 * Handle an incoming request.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Closure  $next
 * @return mixed
 */
public function handle($request, Closure $next)
{
    return $next($request);
}
```

Đầu tiên ta hãy phân tích các tham số trong method `handle` trước. Với `$request` ta có thể lấy được các thuộc tính của request hiện tại như các giá trị tham số trong URI, tên route, phương thức HTTP... Còn về `$next`, nó sẽ có dạng là một Closure, bạn chỉ hiểu đơn giản nó dùng để cho phép request HTTP "qua cửa", tức là cho phép request HTTP đi tiếp để xử lý, cú pháp là `$next($request)`.

Để hiểu hơn về cách hoạt động, ta sẽ đi vào một ví dụ cụ thể. Bây giờ mình tạo một route như sau:

```PHP:routes/web.php
Route::get('age/{age}', function ($age) {
    return $age;
});
```

Route trên có thể hiểu rằng khi ta truyền giá trị cho tham số `age` thì sẽ thực thi in dữ liệu ra trình duyệt. Giả sử giờ mình muốn khi nào `age` lớn hơn hoặc bằng 18 thì mới được in ra màn hình. Còn nếu chưa đủ thì sẽ báo "Bạn chưa đủ 18 tuổi". Lúc này ta sẽ áp dụng middleware `CheckAge` để xử lý.

Bạn có thể thêm middleware cho một route bất kì với phương thức `middleware` cùng với tham số là tên class middleware đó.

```PHP:routes/web.php
use App\Http\Middleware\CheckAge;

Route::get('age/{age}', function ($age) {
    return $age;
})->middleware(CheckAge::class);
```

Sau đó chúng ta quay lại file middleware `CheckAge` để tiến hành code xử lý trong method `handle`. Để kiểm tra xem `age` có lớn hơn hoặc bằng 18 hay không thì ta phải lấy được giá trị của `age` trong middleware. Như đã đề cập ở trên, các giá trị tham số URI sẽ được lấy thông qua `$request`.

```PHP
public function handle($request, Closure $next)
{
    if ($request->age <= 18) {
        return response('Bạn chưa đủ 18 tuổi');
    }
    
    return $next($request)
}
```

Như vậy là ta đã có thể đáp ứng yêu cầu trên rồi đấy, các bạn có thể nạp server và truy cập route với 2 trường hợp tham số `age` để test.

Các bạn có để ý chỗ đoạn `return response('Bạn chưa đủ 18 tuổi');` không? Tại sao mình không dùng `return` thôi mà phải `return` hàm `response` cho rắc rối? Bây giờ các bạn thử bỏ hàm `response` đi và chỉ `return` string kia thôi xem sao nhé! Vâng, một lỗi đã xuất hiện:

![](https://images.viblo.asia/66e36109-d603-4a9a-814d-f2a83ea3d3bb.JPG)

Nhìn thì thấy thông báo lỗi này rất mơ hồ, nó nói một vấn đề không liên quan đến đoạn code trên. Không, thực ra là có đấy. Bây giờ bạn thử dump cái hàm `response` bằng cách thay dòng `return 'Bạn chưa đủ 18 tuổi';` thành `dd(response('Bạn chưa đủ 18 tuổi'));` và quan sát:

![](https://images.viblo.asia/3bb4e3b3-b9a3-4e0c-a8e8-7400de7646bb.JPG)

Nó sẽ trả về một object chứa thuộc tính `headers`, đó là lý do vì sao khi bạn chỉ `return` string thì bị lỗi. Từ đó ta có thể rút ra một lưu ý:

> Khi thực hiện một số công việc nào đó trong middleware thì sau khi kết thúc bạn phải `return` một object chứa thuộc tính `headers`. 

Một số hành động trả về object chứa thuộc tính `headers`:
|  Hành động |  Cú pháp | 
| -------- | -------- | -------- |
| Cho phép HTTP request tiếp tục   | `return $next($request)`     |
| Trả về kết quả | `return response($data)` |
| Chuyển hướng đến một URI| `return redirect($URI)` |
| ... | ... |

Chẳng hạn:

```PHP
public function handle($request, Closure $next)
{
    if ($condition) {
        // Some jobs
        // ...
        
        return redirect('home'); // http://localhost:8000/home
    }

    // Some jobs
    // ...
    
    return $next($request);
}
```

> **Lưu ý:** Bạn có thể type-hint bất kì service provider nào trong container trong phương thức `__construct` của middleware, vì các service đã load trước khi middleware được gọi.

Cách hoạt động của middleware trên là chạy trước request, tức là nó được gọi ra trước khi request được gửi tới controller/action. Đôi khi trong thực tiễn, ta cần một chức năng gì đó mà request chạy trước middleware, nghĩa là sau khi request đã được xử lý ở controller/action thì mới gọi middleware ra. Laravel đã cung cấp hai cách thức hoạt động đó là: Before và after middleware.

## 1. Before middleware

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

## 2. After middleware
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

# II. Đăng ký middleware (Registering middleware)
Laravel cho phép ta đăng ký các middleware ở file `app/Http/Kernel.php`.

> **Lưu ý:** Phải thêm dấu `\` trước namespace mỗi class khi khai báo vì các middleware không cùng cấp với `App\Http\Kernel:class`. 

## 1. Global middleware
Nghe tên thì các bạn cũng đoán chắc nó sẽ hoạt động như thế nào rồi. Nó sẽ được autoload khi có một HTTP request gửi đến, không cần phải khai báo ở route. Bạn có thể liệt kê danh sách các global middleware ở `$middleware`.

```PHP:app/Http/Kernel.php
protected $middleware = [
    \App\Http\Middleware\TrustProxies::class,
    \App\Http\Middleware\CheckForMaintenanceMode::class,
    \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
    \App\Http\Middleware\TrimStrings::class,
    \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
];
```

Trong đây Laravel đã liệt kê sẵn một số middleware cốt lõi như kiểm tra xem có đang ở chế độ bảo trì (`CheckForMaintenanceMode`), hay trim string các request (`TrimStrings`), hay chuyển chuỗi trống sang `null` (`ConvertEmptyStringsToNull`)...

## 2. Route middleware
Nếu global middleware được load sau mỗi request thì đối với route middleware chỉ được gọi khi request đi vào route tương ứng. Mặc định, các route middleware được liệt kê ở `$routeMiddleware`. Bạn quan sát sẽ thấy cấu trúc mảng nó có khác biệt so với `$middleware`.

```PHP:app/Http/Kernel.php
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

Nhớ lại thì cú pháp này khá giống trong mảng `aliases` ở `config/app.php`. Vâng, ở đây cũng vậy, ta có thể alias các namespace dài này thành nhưng tên ngắn gọn để dễ dàng đăng ký ở route.

Cũng như ở global middleware, Laravel cung cấp cho chúng ta một số route middleware, nhưng mình sẽ nói về các middleware này ở những tập sau.

Lấy ví dụ đoạn code phần trên, thay vì phải đăng ký middleware cho route thế này:

```PHP:routes/web.php
use App\Http\Middleware\CheckAge;

Route::get('age/{age}', function ($age) {
    return $age;
})->middleware(CheckAge::class');
```

Ta có thể:

```PHP:routes/web.php
Route::get('age/{age}', function ($age) {
    return $age;
})->middleware('CheckAge');
```

Cuối cùng chỉ cần liệt kê middleware `CheckAge` vào trong `$routeMiddleware` như thế này là được:

```PHP:app/Http/Kernel.php
protected $routeMiddleware = [
    // ..
    
    'CheckAge' => \App\Http\Middleware\CheckAge::class,
];
```

## 3. Nhóm middleware
Đôi khi bạn muốn gom các middleware một nhóm dưới dạng key chung để dễ dàng đăng ký cho route. Tất cả việc bạn cần làm là khai báo chúng trong `$middlewareGroups`.

```PHP:app/Http/Kernel.php
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

Như đã thấy, Laravel cung cấp sẵn cho chúng ta 2 nhóm middleware đó là `web` và `api`. 
* `web`: giao diện người dùng
* `api`: REST API

Về cú pháp đăng ký nhóm middleware cho route cũng tương tự như đăng ký một middleware riêng lẻ.

```PHP
Route::get('/', function () {
    //
})->middleware('web');

Route::group(['middleware' => ['web']], function () {
    //
});
```

> **Lưu ý:** Mặc định `RouteServiceProvider` đã đăng ký middleware `web` cho tất cả các route trong `routes/web.php`.

## 4. Sắp xếp middleware (Sorting middleware)
Đôi khi các middleware của bạn cần được gọi theo thứ tự, nhưng khi đăng ký trong route lại không có tác vụ này. Chính vì điều đó, Laravel cung cấp cho chúng ta `$middlewarePriority` để sort các middleware theo thứ tự ưu tiên xử lý từ trên xuống.

```PHP:app/Http/Kernel.php
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

# III. Tham số middleware
Middleware có thể nhận các tham số tùy chọn. Chẳng hạn mình muốn trước khi xử lý request `/post` thì phải kiểm tra xem user có phải là tác giả bài viết không, nếu có thì mới xuất ra màn hình.

Đầu tiên ta khởi tạo một middle `Role` bằng lệnh Artisan:

> php artisan make:middleware Role

Sau đó đăng ký middleware vừa tạo tại `$routeMiddleware`:

```PHP:app/Http/Kernel.php
protected $routeMiddleware = [
    // ...
    
    'role' => \App\Http\Middleware\Role::class,
];
```

Tiếp theo ta sẽ định nghĩa route như sau:

```PHP:routes/web.php
Route::get('/post', function () {
    return 'Body post';
})->middleware('role:editor');
```

Như các bạn thấy, tại method `middleware`, tham số truyền vào không phải là tên alias của route middleware nữa mà có thêm dấu `:` cùng với giá trị `editor`. Điều này có nghĩa ta đã truyền thành công tham số vào middleware `Role` rồi đấy. Việc cần làm cuối cùng là lấy giá trị `editor` đó ở middleware và code xử lý thôi.

Các bạn có thể tham khảo đoạn xử lý ở middleware `Role` của mình:

```PHP:app/Http/Middleware/Role.php
public function handle($request, Closure $next, $role)
{
    if ($role != 'editor') {
        return response('Bạn không đủ quyền truy cập');
    }

    return $next($request);
}
```

Tại method `handle`, ta sẽ khai báo thêm `$role` để nhận giá trị tham số được truyền từ route. Việc còn lại đơn giản rồi, ta chỉ code xử lý logic là xong.

Các bạn có thể tự test để kiểm chứng kết quả nhé!

# IV. Terminable middleware
Đôi khi một middleware cần thực hiện công việc gì đó sau khi HTTP response được trả về. Ví dụ như middleware session trong Laravel lưu dữ liệu session sau khi response được trả về trình duyệt.

Nếu bạn định nghĩa phương thức `terminate` trong middleware và server web có sử dụng FastCGI (cái này các bạn có thể google để tìm hiểu nó) thì `terminate` sẽ tự động được gọi sau khi response được trả về.

```PHP
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

Phương thức `terminate` này sẽ nhận cả request và response, khi bạn đã khởi tạo một terminable middleware bạn nên đăng ký nó ở route hoặc global middleware.

Khi gọi method `terminate` trong middleware, framework sẽ resolve một middleware instance mới từ service container. Nếu bạn muốn sử dụng một middleware instance khi các method `handle` và `terminate` được gọi thì bạn nên đăng ký middleware với container thông qua method `singleton`.

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ