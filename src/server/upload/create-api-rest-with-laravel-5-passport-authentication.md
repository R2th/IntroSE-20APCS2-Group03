Chào các bạn, ở bài này, mình xin chia sẻ với các bạn về cách authenticate trong laravel sử dụng passport.
Cùng bắt đầu nào. Đầu tiên chúng ta tạo project laravel vơis lệnh terminal sau:
## Bước 1: Install Laravel
```bash
composer create-project --prefer-dist laravel/laravel passport-auth
```

## Bước 2: Install Laravel Passport Package
```bash
composer require laravel/passport
```

## Bước 3: Run migration
Passport sẽ tạo những migration mà app của bạn cần để lưu trữ clients và access tokens:
```bash
php artisan migrate
```

## Bước 4: Generate keys
Lệnh command dưới đây sẽ tạo key được mã hoá và tạo access tokens. Nó sẽ tạo "personal access" và "password grant":
```bash
php artisan passport:install
```

Sau khi chạy lện xong, bạn thêm: `Laravel\Passport\HasApiTokens` trait vào model App\User

## Bước 5: Passport Config
```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;
}
```

Tiếp theo, chúng ta cần gọi `Passport::routes` vào method `boot` trong `AuthServiceProvider`
```php
<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];
    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
    }
}
```

Cuối cùng, trong `config/auth.php` bạn chỉnh sửa lại như sau:
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```

## Bước 6: Create API Routes
Chúng ta sẽ tạo api routes. Larave cung cấp routes/api.php để viết web services route.
```php
<?php

use Illuminate\Http\Request;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
```

## Bước 7: Create Controller
In last step we have to create new controller and four api method. So let’s create AuthController and put bellow code:
Tiếp theo chúng ta cần tạo `AuthController` với 4 method:
```bash
php artisan make:controller AuthController
```

Controller vừa tạo có nội dung như sau:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
```

Now we are ready to run our example so run bellow command to quick run:
Bây giờ, chúng ta đã sẵn sàng để chạy thử. Run command:
```bash
php artisan serve
```

## Tests
Bây giờ chúng ta sẽ test trên Postman
> Trong Api này, chúng ta sẽ set 2 header:
```
Content-Type: application/json
X-Requested-With: XMLHttpRequest
```

![](https://cdn-images-1.medium.com/max/800/1*L_0N9wW3rS2plp4gYm9SLA.jpeg)

Signup

![](https://cdn-images-1.medium.com/max/800/1*thPhuhyi05AJhb8lxwfChg.png)

Login

![](https://cdn-images-1.medium.com/max/800/1*8x2u4vfwRVuR1rATYpn7Eg.png)

Logout
![](https://cdn-images-1.medium.com/max/800/1*swCTkLj840Dywb5o3SKUFQ.png)

User
![](https://cdn-images-1.medium.com/max/800/1*VJjrHFpkyA-z3o0TrIG4dw.png)

> Cám ơn các bạn đã đọc bài viết. chúc các bạn thành công!

Bài viết này tham khảo từ: [Medium](https://medium.com/modulr/create-api-authentication-with-passport-of-laravel-5-6-1dc2d400a7f)