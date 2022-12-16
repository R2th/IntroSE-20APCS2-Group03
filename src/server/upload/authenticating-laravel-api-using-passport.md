### Introduction
Quy trình xác thực và bảo mật là rất quan trọng trong quá trình xây dựng và quản lý ứng dụng ngày nay. Trong hướng dẫn này,chúng ta sẽ cùng tìm hiểu vể các xác thực Laravel APIs Using Passport. Api được biết là xác thực người dùng bằng cách sử dụng session giữa các request. Với Laravel framework các api đã xác thực đơn giản hơn bằng cách xử dụng Laravel passport một package của Oauth2.
 ### Setup a Laravel project
 ```
 composer create-project --prefer-dist laravel/laravel laravel_passport_api
 #or
 laravel new laravel_passport_api
 ```
Cài đặt package `laravel/passport`
```
composer require laravel/passport

```
Tiếp theo chúng cần update .env file và thêm connection tới databse và chạy migrate để tạo các table cần thiết.
```
php artisan migrate

```
Sau khi chạy bạn có thể thấy được kết quả như sau:
```
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (6.69 seconds)
Migrating: 2014_10_12_100000_create_password_resets_table
Migrated:  2014_10_12_100000_create_password_resets_table (2.07 seconds)
Migrating: 2016_06_01_000001_create_oauth_auth_codes_table
Migrated:  2016_06_01_000001_create_oauth_auth_codes_table (3.06 seconds)
Migrating: 2016_06_01_000002_create_oauth_access_tokens_table
Migrated:  2016_06_01_000002_create_oauth_access_tokens_table (3.66 seconds)
Migrating: 2016_06_01_000003_create_oauth_refresh_tokens_table
Migrated:  2016_06_01_000003_create_oauth_refresh_tokens_table (2.88 seconds)
Migrating: 2016_06_01_000004_create_oauth_clients_table
Migrated:  2016_06_01_000004_create_oauth_clients_table (1.51 seconds)
Migrating: 2016_06_01_000005_create_oauth_personal_access_clients_table
Migrated:  2016_06_01_000005_create_oauth_personal_access_clients_table (0.38 seconds)
Migrating: 2020_11_19_000000_create_failed_jobs_table
Migrated:  2020_11_19_000000_create_failed_jobs_table (0.55 seconds)
```
### Configuring Passport
Để triển khai xác thực api chúng ta cần sử dụng `HasApiTokens`  passport cung cấp cho models của ứng dụng.

Update App/User.php models
```
<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

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
Tiếp theo sẽ gọi `Passport::routes()` trong `boot()` tại file `app/Providers/AuthServiceProvider.php`
```
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
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


        //
    }
}

```
Sau khi thiếp lập xong, bước tiếp theo là đặt passport mặc định là phương thức xác thực cho API. Chúng ta sẽ sửa file `config/auth.php`
```
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

### Building a Simple API Authentication System using Passport
Bây giờ chúng ta đã có passport được cài đặt và cấu hình trong project. chúng ta cần tạo UserController để đăng ký và login đến ứng dụng.
Cập nhật file `routes/api.php` 
```
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@signup');
```
Tạo controller bằng việc run command sau:
```
php artisan make:controller UserController
```
Command ở trên sẽ tạo file `UserController.php` trong App/Http/Controllers. Mở nó ra và thêm phương thức signup and login
```

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
    public function signup(Request $request) 
    { 
        $request->validate([ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'confirm_password' => 'required|same:password', 
        ]);
        $data = $request->all(); 
        $data['password'] = bcrypt($data['password']); 
        User::create($data); 
        return response()->json(['message'=> 'user created successfully'],201); 
    }
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
                'message' => 'Authorization failed'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'message' => 'Authorization Granted',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }



}

``` 

Run server ứng dụng bởi command:
```
php artisan serve

```
### Test result
Register [POST]: 127.0.0.1:8000/api/auth/register
![](https://images.viblo.asia/e7509032-9cc4-4346-a9f5-4a679962d9af.png)
Login [POST]: 127.0.0.1:8000/api/auth/login
![](https://images.viblo.asia/b537e9e2-53f6-4721-9a98-212c71908e49.png)

Bài viết của mình đến đây là hết hẹn gặp lại các bạn tại các bài viết tiếp theo. :)

### Tài liệu tham khảo:

https://laravel.com/docs/8.x/passport
https://codesource.io/authenticating-laravel-apis-using-passport/