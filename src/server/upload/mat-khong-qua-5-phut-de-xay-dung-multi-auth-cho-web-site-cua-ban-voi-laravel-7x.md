### Lời mở đầu.
Nay muốn giới thiệu với các bạn về các xây dựng nhiều auth trên laravel 7. Tác dụng của nó để làm gì?

Nó có tác dụng xác thực nhiều auth trên cùng 1 web site. Cụ thể như mình thấy các web site cho anyuser thì chúng ta thường tách ra web site quản trị riêng ra với web site cho any user. Trước đây thì chúng ta tự mình xây dựng để phân biệt được chúng nhưng bây giờ thì laravel đã support chúng ta để xử lý công việc đó 1 cách rất đơn giản chắc không mất qúa 5p để có thể xậy dựng được nó.

Các bạn không tin có thể làm theo các bước dưới đây nhé.

### Bước: 1 Tạo một project Laravel.
Tạo project bằng lệnh.

`laravel new multiauth`

sau khi chạy thành công thì chúng ta dùng package UI của laravel để dựng layout cho các màn auth.

```cmd
composer require laravel/ui

php artisan ui bootstrap --auth
```

sau đó chúng ta chậy lênh sau.

`npm install && npm run dev `
 
### Bước: 2 Bây giờ chúng ta sẽ migrate 2 bảng cho admin vào user nhé.
 
Trước tiên chúng ta phải tạo bảng admins và Model bằng lệnh sau.

`php artisan make:model Models/Admin -m`

và ví dụ bảng admins của chúng ta sẽ như sau:
```php

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminsTable extends Migration 
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
           	$table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
```

Còn model chúng ta sẽ phải khai báo name cho auth như sau.
```php
<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $guard = 'admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
   }
```

với user tạo tương tự như bên admin chúng ta phải khai báo guard cho user như sau:
```php
<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $guard = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
   }
```

Và sau đo chúng ta chạy migrate nó bằng lệnh.

`php artisan migrate`

Bây giờ chúng ta cần sửa đổi  auth.php. thêm các phương thức xác thực config/auth.php.

```php
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
        'admin-api' => [
            'driver' => 'token',
            'provider' => 'admins',
        ],
        
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],
        
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
        
    ],
```

### Bước 3: Như vậy chúng ta đã gần như là xong rồi giờ chỉ cần tạo Controller và UI để kiểm tra thôi. yayay

Trước tiên chúng ta cần tạo 1 trang để đăng nhập admin.
```
.../views/admin/auth/admin_login.blade.php
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset=UTF-8>
  <meta name=viewport content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin=anonymous>
  <title>Admin</title>
</head>
<body>
  <div >
   <div >
     <div ></div>
     <div >
      <div >
        <div >
         <form id="sign_in_adm" method="POST" action="{{ route('admin.login.submit') }}">
           {{ csrf_field() }}
         <h1>Admin Login</h1>
         <div >
           <input type=email name=email placeholder="Email Address" value="{{ old('email') }}" required autofocus>
         </div>
         @if ($errors->has('email'))
         <span ><strong>{{ $errors->first('email') }}</strong></span>
         @endif
         <br>
         <div >
           <input type=password name=password placeholder="Password" required>
         </div>
         <br>
         <div >
           <button type=submit >SIGN IN</button>
         </div>
         </form>
        </div>
      </div>
     </div>
     <div ></div>
   </div>
  </div>
</body>
</html>
```

tạo thêm 1 trang dashboard để chuyến hướng khi chúng ta đăng nhập thành công.
```
.../views/admin/dashboard.blade.php
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset=UTF-8>
  <meta name=viewport content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin=anonymous>
  <title>Admin Dashboard</title>
</head>
<body>
    <div >
      <div >
        <div ></div>
        <div >
          <div >
            <div >
              <h1>Welcome To Admin Dashboard</h1>
            </div>
          </div>
          <a href="/admin/logout">Logout</a>
        </div>
        <div ></div>
      </div>
    </div>
</body>
</html>
```

Sau đó chúng ta cần tạo controller auth cho admin.

**AdminLoginController.php**
```php
<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Route;
class AdminLoginController extends Controller
{
   
    public function __construct()
    {
      $this->middleware('guest:admin', ['except' => ['logout']]);
    }
    
    public function showLoginForm()
    {
      return view('admin.auth.admin_login');
    }
    
    public function login(Request $request)
    {
      // Validate the form data
      $this->validate($request, [
        'email'   => 'required|email',
        'password' => 'required|min:6'
      ]);
      // Attempt to log the user in
      if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password])) {
        // if successful, then redirect to their intended location
        return redirect()->intended(route('admin.dashboard'));
      } 
      // if unsuccessful, then redirect back to the login with the form data
      return redirect()->back()->withInput($request->only('email', 'remember'));
    }
    
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect('/admin');
    }
}
```

và 1 controller có check middleware là admin

```php
<?php
namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
    }
    /**
     * show dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.dashboard');
    }
}
```

User thì bạn cũng làm tương tự với admin bạn chỉ cần thay đổi các chỗ sau:

với function login bạn cần sửa như nhau:

` if (Auth::guard('user')->attempt(['email' => $request->email, 'password' => $request->password])) `

với logout thì ta cần chọn guard để logout.

 `Auth::guard('user')->logout();`

### Bước 5: Thêm route cho login admin.

```php
Route::prefix('admin')->group(function() {
    Route::get('/login','Auth\AdminLoginController@showLoginForm')->name('admin.login');
    Route::post('/login', 'Auth\AdminLoginController@login')->name('admin.login.submit');
    Route::get('logout/', 'Auth\AdminLoginController@logout')->name('admin.logout');
    Route::get('/', 'Auth\AdminController@index')->name('admin.dashboard');
   }) ;
```

### Bước 6: Điều hướng khi login thành công or chưa login.

Thực tế trong qua trình làm bạn sẽ mắc phải vấn đề xử lý các trường hợp chưa login or login thành công ở các auth khác nhau sẽ phải làm như nào thì dưới đây mình sẽ đưa ra cách xử lý đơn giản nhất.

**TH1: Chưa login thì chúng ta phải xử lý trong Handler như sau.**


```
<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Arr;
class Handler extends ExceptionHandler
{
   
    protected $dontReport = [
      
    ];

    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }

  
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        $guard = Arr::get($exception->guards(), 0);

       switch ($guard) {
         case 'admin':
           $login='admin.login';
           break;

         default:
           $login='login';
           break;
       }

        return redirect()->guest(route($login));
    }
}
```

Ở đây mình đang xử lý nếu guard == admin thì mình sẽ redirect về màn hình login của admin còn trường hợp còn lại tức là của user mình sẽ trỏ đến trang của user.

Th2: Khi bạn login thành công thì mình sẽ xử lý với file **RedirectIfAuthenticated** như sau:

```php
<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        // return $next($request);
        switch ($guard) {
            case 'admin':
              if (Auth::guard($guard)->check()) {
                return redirect()->route('admin.dashboard');
              }
             
            default:
              if (Auth::guard($guard)->check()) {
                  return redirect('/');
              }
              break;
          }
          return $next($request);
    }
}
```


Giờ thì bạn chỉ cần mở server nên và chạy.


### Tổng kết

Vậy ở trên mình đã giới thiệu với các bạn các xác thực nhiều auth trên 1 hệ thống với laravel 7x. Hy vọng nó có thể giúp được 1 chút gì đó nho nhỏ tới cách bạn.

Càm ơn các bạn đã bỏ thời gian đọc bài viết tháng này của mình.

Chúc bạn có 1 ngày vui vẻ.

link thao khảo:

https://laravel.com/docs/7.x/authentication
https://www.codermen.com/index.php/blog/160/how-to-make-multi-auth-in-laravel-7