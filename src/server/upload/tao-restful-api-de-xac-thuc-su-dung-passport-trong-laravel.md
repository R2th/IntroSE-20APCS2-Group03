Ngày nay API còn được biết như là [Web Services](https://o7planning.org/vi/10773/restful-web-service-la-gi). Web Services rất quan trọng khi bạn tạo web hoặc đang phát triển mobile app. Bạn sẽ cần tạo API cho người lập trình mobile app. Như chúng ta biết thì Laravel ngày phổ biến hơn có lẽ bởi tạo API. Nhưng nếu bạn là người mới bắt đầu và bạn không biết API, web services là gì, thì đây là nơi thích hợp. Trong bài viết này, mình sẽ cho cho bạn cách tạo API và xác thực 1 cách đơn giản nhất.
# Passport là gì?
Laravel đã sẵn có việc thực hiện authentication qua login form, nhưng về APIs thì sao? APIs thường sử dụng tokens để authenticate người dùng và không duy trì session giữa các lần request. Laravel sử dụng [Laravel Passport](https://laravel.com/docs/5.8/passport) để làm API authentication, nó cung cấp đầy đủ OAuth2 server để thực hiện ứng dụng của bạn trong khoảng 1 phút. Passport dược xây dựng trên [League OAuth2 server](https://github.com/thephpleague/oauth2-server) của tác giả Alex Bilbie.

Để hiểu rõ hơn cũng như cách sử dụng như nào, mình sẽ đi luôn vào ví dụ để bạn có cái nhìn cơ bản về nó. Mình sẽ tạo 1 project xử lí các việc sau:
- Login API 
- Register API
- Details API

# Bắt tay học step by step!


### Step 1: Create project Laravel

Trong bước đầu tiên này, tiến hành tạo project Laravel:

```php
composer create-project --prefer-dist laravel/laravel rest-api-use-passport
```
    
### Step 2: Install Package
```php
composer require laravel/passport
```

Sau khi cài đặt Package thành công, mở tệp **config/app.php** và thêm [Service Providers](https://laravel.com/docs/5.8/providers)

```php
# config/app.php

'providers' =>[
     Laravel\Passport\PassportServiceProvider::class,
],
```

### Step 3: Run Migration - Install

Sau khi đã đăng ký **Service Providers**, chúng ta sẽ tạo bảng trong database bằng cách chạy lệnh [Migration](https://laravel.com/docs/5.8/migrations)

```php
php artisan migrate
```

Tiếp theo, chúng ta cần cài đặt **Passport**:
```php
php artisan passport:install
```

### Step 4: Passport Configuration

```php
# app/User.php

<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

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

```php
# app/Providers/AuthServiceProvider.php

<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

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

```php
# config/auth.php

<?php
return [
...
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
...
];
```

### Step 5: Create API route

Trong bước này, chúng ta sẽ tạo **API [routes](https://laravel.com/docs/5.8/routing)**. Laravel đã cung cấp file **api.php** cho việc viết route của **Web Service**. Mọi chuyện đã quá dễ dàng, chúng ta chỉ việc viết các **route** cần thiết vào file này thôi.

```php
# routes/api.php

<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'api\UserController@login');
Route::post('register', 'api\UserController@register');
Route::group(['middleware' => 'auth:api'], function() {
    Route::post('details', 'api\UserController@details');
});
```

### Step 6: Create the Controller

Trong bước cuối này chúng ta tạo [controller](https://laravel.com/docs/5.8/controllers) có tên **UserController**. Có nhiều cách tạo, bạn có thể tạo 1 thư mục tên "api" rồi new 1 **controller** tên **UserController**. Nhưng cách này khá thủ công, mình thì hay dùng câu lệnh mà Laravel đã cung cấp:
```php
php artisan make:controller api/UserController
```
Khi đã tạo thành công rồi, ta bắt tay vào công việc xử lí cho từng hàm đã gọi ở Route nào.
```php
# api/UserController.php

<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {
        if (Auth::attempt(
            [
                'email' => request('email'),
                'password' => request('password')
            ]
        )) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->accessToken;

            return response()->json(
                [
                    'success' => $success
                ],
                $this->successStatus
            );
        }
        else {
            return response()->json(
                [
                    'error' => 'Unauthorised'
                ], 401);
        }
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'c_password' => 'required|same:password',
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'error' => $validator->errors()
                ], 401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['name'] = $user->name;

        return response()->json(
            [
                'success' => $success
            ],
            $this->successStatus
        );
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();

        return response()->json(
            [
                'success' => $user
            ],
            $this->successStatus
        );
    }
}
```
Ở function **register()**, các bạn có thể tạo 1 [Form Request](https://laravel.com/docs/5.8/validation#form-request-validation) để xử lí vì lí do lười lười chút nên mình xin viết gộp luôn ạ :sweat_smile:. Và khi đã hoàn thành 6 bước trên, chúng ta tiến hành chạy thử:
```php
php artisan serve
```
và bây giờ mình sẽ sử dụng **[Postman](https://www.getpostman.com/)** để kiểm tra xem xem điều kì diệu gì sẽ xảy ra

**[Validation](https://laravel.com/docs/5.8/validation) of Register API**

![](https://images.viblo.asia/9683c716-9eda-40ee-a835-d109a7b35bd9.png)

**Register API:**

![](https://images.viblo.asia/0ef7a18c-337e-46f9-977c-9fc0fcb905c8.png)

**Login API:**

![](https://images.viblo.asia/88b24eaa-ddeb-4104-8de7-ecd80fe2b219.png)

Để kiểm tra được **Details API**, bạn phải set các header được liệt kê bên dưới:
```php
'header' => [
    'Authorization' => 'application/json',
    'Content-Type' => 'Bearer '. $accessToken,
    'Accept' => 'application/json'
]
```

**Details API:**

![](https://images.viblo.asia/a7bc0c42-75d1-46e2-9326-6952cd53046d.png)

**Link Project đầy đủ**: https://github.com/tienquanptit/Restful-API-Use-Passport-Laravel 
# Kết luận

Ok bài của mình hôm nay đến đây thôi. Cũng lâu rồi mình mới động lại Laravel nên đây cũng là bài mình ôn lại kiến thức cơ bản. Qua bài này mong rằng sẽ giúp các bạn mới học hay đang tìm hiểu về Passport có thể hiểu và biết cách sử dụng trong dự án.

Cảm ơn các bạn đã đọc bài viết của mình! (bow) (bow) (bow)

Tham khảo: 

https://laravel.com/docs/5.8/

https://viblo.asia/p/laravel-passport-JQVGVZKyGyd

https://medium.com/techcompose/create-rest-api-in-laravel-with-authentication-using-passport-133a1678a876