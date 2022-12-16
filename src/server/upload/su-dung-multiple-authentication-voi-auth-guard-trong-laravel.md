Hello mọi người, hôm này mình sẽ chia sẻ cách xác thực nhiều loại users(có thể là users normal, users admin, users superadmin) ở trên nhiều tables khác nhau kết hợp với auth guard.Tùy vào yêu cầu của dự án mà bạn có thể xác thực các loại users khác nhau ở 2, 3 hoặc 4 tables, Ở bài viết này mình sẽ demo ở 2 tables users và admin nhé.<br>
Trường hợp bạn không muốn xác thực người dùng bằng auth guard thì bạn có thể theo dõi bài viết này [Sử dụng multiple authentication login trong laravel](https://viblo.asia/p/su-dung-multiple-authentication-login-trong-laravel-6J3ZgRbgKmB).
Bài viết này mình sẽ demo trên Larave 8, các bạn hãy xem các ví dụ bên dưới nhé.<br>

> Step 1: Setting Auth Config

Hãy cập nhật mảng guards, providers như bên dưới.<br>
**config/auth.php**
```PHP
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ]
    ],
```
Cập nhật code như bên dưới để sử dụng route admin.php.<br>
**App/Providers/RouteServiceProvider.php**
```PHP
    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/admin.php'));
        });
    }

```

> Step 2: Create Models

Trong bước này mình sẽ tạo 2 modes cho User và Admin.<br>
**App/Models/User.php**
```PHP
<?php
namespace App\Models;
  
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
  
class User extends Authenticatable
{
    use HasFactory, Notifiable;
  
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
  
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```

**app/Models/Admin.php**

```php 
<?php
  
namespace App\Models;
  
use Illuminate\Foundation\Auth\User as Authenticatable;
  
class Admin extends Authenticatable
{
  
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
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

> Step 3: Create Route and Controller

Cập nhật route trong file web.php, route này dùng cho xác thực users normal.
**routes/web.php**
```PHP
<?php

use Illuminate\Support\Facades\Route;

Route::get('web-login', 'User\Auth\LoginController@webLogin');
Route::post('web-login', ['as'=>'web-login','uses'=>'User\Auth\LoginController@webLoginPost']);	
```

Tiếp theo mình tạo mới route admin.php, route này dùng cho xác thực users admin.
**routes/admin.php**
```php 
<?php

use Illuminate\Support\Facades\Route;

Route::get('admin-login', 'Admin\Auth\LoginController@adminLogin');
Route::post('admin-login', ['as'=>'admin-login','uses'=>'Admin\Auth\LoginController@adminLoginPost']);

```


Tạo thư mực mới User/Auth trong Controller và  thêm code vào file app/Http/Controller/User/Auth/LoginController.php.<br>
File này sẽ xử lý logic liên quan đến users normal.<br>
**app/Http/Controller/User/Auth/LoginController.php**
```php 
<?php

namespace App\Http\Controllers\User\Auth;

use App\Models\User;
use Validator;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

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
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function webLogin()
    {
        return view('user.webLogin');
    }

    public function webLoginPost(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password')]))
        {
            $user = auth()->user();
            dd($user);
        }else{
            return back()->with('error','your username and password are wrong.');
        }
    }
}

```

Tạo thư mực mới Admin/Auth trong Controller và  thêm code vào file app/Http/Controller/Admin/Auth/LoginController.php<br>
File này sẽ xử lý logic liên quan đến users admin.<br>
**app/Http/Controller/Admin/Auth/LoginController.php**
```php 
<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Models\Admin;
use Validator;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

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
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function adminLogin()
    {
        return view('admin.adminLogin');
    }


    public function adminLoginPost(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (auth()->guard('admin')->attempt(['email' => $request->input('email'), 'password' => $request->input('password')]))
        {
            $user = auth()->guard('admin')->user();
            dd($user);
        }else{
            return back()->with('error','your username and password are wrong.');
        }
    }
}


```

> Step 4: Create Blade

Màn hình login cho users normal.<br>
**resources/views/user/webLogin.blade.php**
```php 
@extends('layouts.app')


@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('web-login') }}">
                        {!! csrf_field() !!}


                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label class="col-md-4 control-label">E-Mail Address</label>


                            <div class="col-md-6">
                                <input type="email" class="form-control" name="email" value="{{ old('email') }}">
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>


                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label class="col-md-4 control-label">Password</label>


                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password">
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-btn fa-sign-in"></i>Login
                                </button>
                                <a class="btn btn-link" href="{{ url('/password/reset') }}">Forgot Your Password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```
Màn hình login cho users admin.<br>
**resources/views/admin/adminLogin.blade.php**
```php 
@extends('layouts.app')


@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('admin-login') }}">
                        {!! csrf_field() !!}


                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label class="col-md-4 control-label">E-Mail Address</label>


                            <div class="col-md-6">
                                <input type="email" class="form-control" name="email" value="{{ old('email') }}">
                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>


                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label class="col-md-4 control-label">Password</label>


                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password">
                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-btn fa-sign-in"></i>Login
                                </button>
                                <a class="btn btn-link" href="{{ url('/password/reset') }}">Forgot Your Password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

```

Cuối cùng chạy và kiểm tra kết quả nhé.<br>

**Demo màn hình login của user normal.**<br>
![](https://images.viblo.asia/d42a130d-8f4c-453a-86e0-fcf207c50e6b.png)

**Demo màn hình login của user admin.**<br>
![](https://images.viblo.asia/dfa629b4-5dd4-4ff3-9811-480bb18b1acb.png)