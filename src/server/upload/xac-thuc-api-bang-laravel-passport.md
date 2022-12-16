### Install Laravel

Bước đầu tiên, chúng ta tạo một ứng dụng Laravel mới bằng cách mở Terminal và chạy lệnh sau:

```php
laravel new auth
```

### Install Laravel Passport Package

Laravel Passport cung cấp một OAuth2 server đầy đủ để triển khai ứng dụng Laravel của bạn trong vài phút.

```php
composer require laravel/passport
```

### Run Migration

Passport migration sẽ tạo ra các bảng mà ứng dụng của bạn cần để lưu trữ clients và access tokens.

```php
php artisan migrate
```

### Generate keys

Lệnh này sẽ tạo ra các encryption keys cần thiết để tạo ra access tokens. Ngoài ra, lệnh này sẽ tạo ra "personal access" và "password grant" clients và sẽ được sử dụng để tạo ra access tokens.

```php
php artisan passport:install
```

Sau khi chạy lệnh này, hãy thêm `Laravel\Passport\HasApiTokens` trait vào trong model `App\User`. Trait cung cấp 1 vài phương thức trợ giúp cho model của bạn, các phương thức này cho bạn xác thực user's token và scopes:

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

### Passport Config

Tiếp theo, bạn nên gọi `Passport::route` trong phương thức `boot` của `AuthServiceProvider`. Phương thức này sẽ đăng ký các routes cần thiết để lấy và thu hồi access tokens, clients, and personal access tokens.

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

Cuối cùng, trong file config `config/auth.php` bạn nên thiết lập driver của api authentication guard thành passport. Ứng của bạn sau khi config sẽ sử dụng `TokenGuard` của Passport mỗi khi có api request xác thực đến.

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

### Create API Routes

Chúng ta sẽ tạo api routes, Laravel cung cấp file `routes/api.php` để viết web services route. Chúng ta sẽ thêm route mới của api trong file này.

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

### Create Controller

Bước cuối cùng, chúng ta sẽ tạo controller mới và 4 phương thức ứng với các routes khai báo ở bước trước. Chúng ta sẽ tạo `AuthController` với đoạn code sau:

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

API của chúng ta đã sẵn sàng, cùng bật server lên để thử nhé.

```php
php artisan serve
```

### Tests

Bây giớ chúng ta có thể test api bằng Postman, bạn có thể xem các hình ảnh minh họa dưới đây

> Chú ý: trong api này bạn phải thiết lập 2 headers dưới đây

```php
Content-Type: application/json
X-Requested-With: XMLHttpRequest
```

![](https://images.viblo.asia/1fd82e0f-0887-4d75-9460-43c7afbf1370.jpeg)

Signup

![](https://images.viblo.asia/fd493ac3-1fac-4712-901b-aba39637c325.png)

Login

![](https://images.viblo.asia/2ecba1a7-8f46-4849-9732-928c6ca1ec9d.png)

Logout

![](https://images.viblo.asia/e2e23761-5275-434d-94e2-19d8d948eaaf.png)

User

![](https://images.viblo.asia/87916dee-2cd4-45cc-95de-4e266fa7a39b.png)

Nguồn: https://medium.com/modulr/create-api-authentication-with-passport-of-laravel-5-6-1dc2d400a7f