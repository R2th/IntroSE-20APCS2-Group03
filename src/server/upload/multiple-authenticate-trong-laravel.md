*Như các bạn biết mỗi một hệ thống website thông thường sẽ gốm một phần dành cho admin quản lý và một phần dành cho user thông thường sử dụng, chính vì vậy các website sẽ rất cần sử dụng multiple authenticate. Hãy cùng tìm hiểu cách xây dựng chúng trong laravel nhé!*
# Chuẩn bị Project
## Tạo project
Tạo một project laravel bằng composer với câu lệnh
> composer create-project --prefer-dist laravel/laravel multiple-authenticate
> 
## Cở sở dữ liệu
### .evn
Mở project lên và thực hiện thao tác chỉnh sửa file .env để kết nối cơ sở dữ liệu
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```
### Cấu trúc các bảng
Để tìm hiều cách sử dụng multiple authenticate chúng ta chỉ cần đến hai bảng admins, và users để lưu thông tin đăng nhập cho hai loại đối tượng này

**admin**
Tạo bảng admins bằng cách dùng migration
> php artisan make:migration create_admins_table --create=admins
> 
Chạy câu lệnh trên để tạo một migration mới cho bảng admins gồm các cột: id, email, password, timestamps
```

    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('name');
            $table->string('password');
            $table->timestamps();
        });
    }

```
**users**

Bảng users cũng có cấu trúc tương tự với bảng admin, ta chỉ cần dùng mặc định của laravel là được rồi.

Chạy câu lệnh 
> php artisan migrate
> 
Để tạo bảng nhé
### Models
Trong thư mục app\models tạo hai file Admin.php và User.php tương ứng với hai bảng trên
```app/Models/Admin.php
    namespace App\Models;

    use Illuminate\Notifications\Notifiable;
    use Illuminate\Foundation\Auth\User as Authenticatable;

    class Admin extends Authenticatable
    {
        use Notifiable;

        protected $guard = 'admin';

        protected $fillable = [
            'name', 'email', 'password',
        ];

        protected $hidden = [
            'password', 'remember_token',
        ];
    }
```

Tương tự với model User
```app/Models/User.php
    namespace App\Models;

    use Illuminate\Notifications\Notifiable;
    use Illuminate\Foundation\Auth\User as Authenticatable;

    class Admin extends Authenticatable
    {
        use Notifiable;

        protected $guard = 'admin';

        protected $fillable = [
            'name', 'email', 'password',
        ];

        protected $hidden = [
            'password', 'remember_token',
        ];
    }
```
## Multiple authenticate
Vậy là đã xong phần cơ bản. Bây giờ chúng ta đi vào thực hiện làm nhiều luồng xác thực cho web của mình nào.
### guard
Trong laravel authentication sẽ định nghĩa được nhiều guard, mỗi guard tương ứng với một thành phần xác thực khác nhau. Với vị dụ này thì mình cần hai cái users và admins. Mở file config\auth.php ra, guard được config ở trong đây. Để ý nhé laravel đã làm sẵn cho mình users và api (cái này dành cho api rồi) giờ mình làm thêm một cái cho admin nữa là được.

Tìm đến phần guards và sửa thành như sau:
```
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],
```
Với đoạn code này thì guard cho user là web nhé.

Rồi bây giờ định nghĩa thêm cái provider admins nữa. Kéo tiếp xuống phần providers và sửa:
```
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class, 
        ],
    ],

```

### Route
 Mình sẽ làm ví dụ hai trang home đơn giản nhé. Trang cho admin sẽ có đường dẫn là `/admin/home`(yêu cầu đăng nhập với admin) và trang cho user là `/user/home` (yêu cầu đăng nhập với user). Thông thường thì các route của hai trang này có thể viết chung một file route là web.php đều được nhưng mình nghĩ nên tách thêm một cái file route dành riêng cho admin thì sẽ dễ dàng sử dụng hơn rất nhiều.
 
 Trong folder route tạo một file admin.php, Nhiệm vụ bây giờ là làm thế nào để các route được khai báo trong file này chạy được đúng cách.
 
 Mở file app/Providers/RouteServiceProvider và thêm đọan code sau
 ```
    protected function mapAdminRoutes()
    {
        Route::prefix('admin')
            ->middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/admin.php'));
    }
 ```
 Trên đây mình đi định nghĩa một nhóm route có prefix là admin nằm trong file routes/admin.php rồi, như vậy trong file route/admin.php thay vì với link `admin/home` thì mình chỉ cần định nghĩa chúng với đường link `/home` tương tự như bên web là được rồi.
 
 Bước cuối cùng để hoàn thiện việc config file route này đó là gọi hàm này trong hàm map(). Hàm map sẽ như sau:
 ```
  public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        $this->mapAdminRoutes();
    }
 ```
 
 Rồi, bây giờ thì có thể đi định nghĩa hai route tới home được rồi, à quên cả route dành cho login nữa nhé:
 ```routes/admin.php
 Route::namespace('Admin')->group(function () {
    Route::get('/login', 'LoginController@showLoginForm');
    Route::post('/login', 'LoginController@login')->name('admin.login');
    Route::group(['middleware' => ['auth:admin']], function () {
        Route::get('/home', 'HomeController@index');
    });
});
 ```
 Với route này khi bạn truy cập đường dẫn /admin/home nó sẽ tìm tới controller app/Controller/Admin/HomeController và thực hiện các hành động trong hàm index. Nhớ là middleware phải là auth:admin nhé (nghĩa là middleware này thực hiện với guard là admin đó).
 
  ```routes/web.php
 Route::namespace('User')->group(function () {
    Route::get('/login', 'LoginController@showLoginForm');
    Route::post('/login', 'LoginController@login')->name('user.login');
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/home', 'HomeController@index');
    });
});
```
Phần user cũng như vậy nhưng chỉ cần dùng middleware auth là được rồi, mặc định của laravel sẽ thực hiện với guard web (trỏ vào user) mà.
### Controllers
Trước hết dựng hai controller login cho admin và user cái đã:
```app\Http\Controllers\Admin\LoginController
<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */

    protected $redirectTo = '/admin/home';
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        $this->middleware('guest:admin')->except('logout');
    }

    public function guard()
    {
        return Auth::guard('admin');
    }

    public function showLoginForm()
    {
        return view('admin.auth.login');
    }
}

```
Phần này hơi dài nhưng hầu hết laravel nó đã làm hết cho minh rồi, bằng cách sử dụng AuthenticatesUsers trait rồi, việc của mình rất đơn giản chỉ là viết lại một số hàm phục vụ cho ý đồ của mình thôi. 

Ví dụ nhé:  
$redirectTo = '/admin/home', cái này chỉnh lại đường link sẽ redirect về sau khi login thành công mà mình không request vào một trang nào trước đó.  
Với function showLoginForm view mặc định laravel trả về là auth.login chỉnh lại thành admin.auth.login (view login dành cho admin)  
À cái quan trọng nhất đó là chuyển sang guard admin trong hàm guard() nhé.

Thực hiện tương tự với user thôi:
```app\Http\Controllers\User\LoginController
<?php
namespace App\Http\Controllers\User;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */

    protected $redirectTo = '/home';
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('user.auth.login');
    }
}

```
Với phần controller cho trang home:
```app\Http\Controllers\User\HomeController

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.home');
    }
```

```app\Http\Controllers\Admin\HomeController
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('user.home');
    }
```

### Giao diện
Dựng giao diện cho các trang mà nãy giờ chúng ta gọi đến. Mình dựng đơn giản nhất cho thể thôi nhé. Còn mỗi bạn sẽ có giao diện của riêng mình sao cho đẹp rồi.
```resoures/view/admin/auth/login.blade.php
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <form method="POST" action="{{ route('admin.login') }}">
        @csrf
        <input type="text" name="email" placeholder="email">
        <input type="password" name="password" placeholder="password">
        <button type="submit">Login</button>
    </form>
</body>
</html>

```

```resoures/view/user/auth/login.blade.php
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <form method="POST" action="{{ route('user.login') }}">
        @csrf
        <input type="text" name="email" placeholder="email">
        <input type="password" name="password" placeholder="password">
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

```resoures/view/admin/home.blade.php
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    Login success {{ auth('admin')->user()->name }} 
</body>
</html>
```

```resoures/view/user/home.blade.php
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    Login success {{ auth()->user()->name }} 
</body>
</html>
```
### Redirect khi chưa login
Về cơ bản thì hệ thống như vậy là đã có thể chạy multile login rồi, nhưng để hoàn thiện hơn, mình nên sửa lại phần redirect khi chưa login chuẩn hơn nhé. Bạn có thể sửa ở Authenticate middleware nhưng mình nên chỉnh trong file app/Exceptions/Handler.php bởi middleware Authenticate nó throw exception là AuthenticationException.

Sửa file app\Exceptions\Handler.php:
```
<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [

    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        $guard = array_get($exception->guards(), 0);
        switch ($guard) {
            case 'admin':
                $login = 'admin.login';
                break;
            default:
                $login = 'user.login';
                break;
        }

        return redirect()->guest(route($login));
    }
}

```

Và cuối cùng vào middleware Authenticated trong thư mục app/Http/Middleware xóa phần redirect trong fucntion redirectTo đi là được (như vậy mới bắt được exception unauthenticated nhé). 

Cuối cùng hãy chạy thử project của mình thôi nào
# Tài liệu tham khảo
> https://www.pusher.com/tutorials/multiple-authentication-guards-laravel/
> 

> https://medium.com/hello-laravel/multiple-authentication-system-laravel-5-4-ac94c759638a
>