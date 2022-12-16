Mình nghĩ rằng tất cả chúng ta đã từng gặp phải tình huống là có một file `route.php` chứa rất nhiều router, đặc biệt là các project lớn. Điều này gây khó chịu khi mà cần đọc hoặc chỉnh sửa các router, do vậy ta cần tìm ra một giải pháp để giải quyết vấn đề này.

Ban đầu, mình nghĩ đến việc sử dụng cách group các router method và accept một file như cách mà Laravel giải quyết các router trong `RouteServiceProvider`

```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}
```

Mình đã nhóm các router liên quan đến user thành một file route riêng là `users.php`, sau đó duplicate `mapApiRoutes` thành `mapUsersRoutes` và điều hướng đến file `users.php`.

```php
/**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        $this->mapUsersRoutes();
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapUsersRoutes()
    {
        Route::prefix('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/users.php'));
    }
```

Rõ ràng, đây không phải là giải pháp tốt nhất bởi vì bất cứ khi nào chúng ta bắt đầu tạo một file mới, chúng ta lại sẽ phải đăng ký nó như ở trên. Vì vậy, mình sẽ cải thiện ý tưởng ban đầu này.

Mình đã nghĩ đến việc chia file route thành các khu vực phổ biến trên toàn bộ application, vì mình nghĩ rằng tất cả các route của chúng ta không thể nằm ngoài phạm vi này: authenticated, guest và public.

Và mình đã cấu trúc lại thư mục chứa các router như sau:
![](https://images.viblo.asia/606fd1cf-7c08-4d8f-b6dd-bf29ffb54d98.png)

Thoạt nhìn, bạn có thể nghĩ rằng "tốt, nó không thay đổi nhiều, ta sẽ ánh xạ lại các file này". Nhưng, thực sự thì chúng ta có thể sử dụng một function gọi là [`glob`](https://www.php.net/manual/en/function.glob.php) mà php cung cấp, và đây một giải pháp tối ưu hơn, vì chúng ta không phải kết hợp với các giải pháp của Laravel.

`glob` chấp nhận một pattern và có thể tìm thấy tên file theo đường dẫn khớp với pattern của chúng ta. Do đó các router của chúng ta được cấu trúc theo các thư mục cụ thể, giờ đây chúng ta có thể tìm thấy tất cả các file trong các thư mục này và đăng ký chúng vào các middleware tương ứng.

```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        $this->mapPublicRoutes();
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapPublicRoutes()
    {
        foreach (glob(base_path('routes/web/public/*.php')) as $file) {
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group($file);
        }
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}
```

Bây giờ, mỗi khi chúng ta tạo một file route mới, vòng `foreach` trong function `mapPublicRoutes` sẽ nhận thêm nó vì nó là một pattern phù hợp (file nằm trong đúng thư mục và nó có phần mở rộng `.php`, vì vậy nó phù hợp với pattern của chúng ta). 

Ok giờ chúng ta sẽ test xem nó có hoạt động chính xác không. Trong file `users.php` ta định nghĩa 1 router như sau:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('users', 'UserController@index');

```

Trong `UserController` ta định nghĩa 1 function index lấy danh sách user:

```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();

        return response()->json($users);
    }
}
```

Và test lại bằng post man:
![](https://images.viblo.asia/18727cfd-7bf8-4dec-ba1a-534733a29272.png)

Router hoạt động đúng, vậy nhưng, làm thế nào những tập tin này được đăng ký?

Nếu bạn đã xem lifecycle của Laravel, bạn sẽ hiểu rằng các service provider là một phần trong lifecycle của Laravel request, chúng ta có thể sử dụng tính năng này để đăng ký router một cách linh hoạt hơn.

## Nguồn:
https://dev.to/secmohammed/how-to-separate-your-routes-at-laravel-conveniently-286a?fbclid=IwAR2YMdyyiimIK_AwQOCRngcxNt1vMrd5pe7BjOQ2OqsmjxIXsAmFN3hnyU8