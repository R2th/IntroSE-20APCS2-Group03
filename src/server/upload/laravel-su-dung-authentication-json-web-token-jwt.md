Chào các bạn, mình đã trở lại rồi đây. Ở bài viết lần trước, mình đã giới thiệu cho các bạn về Json Web Token và cách thức hoạt động của nó. Các bạn có thể xem lại [**ở đây**](https://viblo.asia/p/bao-mat-web-voi-json-web-token-jwt-4P856QvRlY3) để hiểu rõ hơn về phần lý thuyết trước nhé.<br>

Trong bài viết này, mình sẽ hướng dẫn các bạn viết API phục vụ cho việc đăng ký, đăng nhập với JWT Authentication (Laravel 8). Mình sẽ cùng nhau tìm hiểu cách bảo vệ các RESTful APIs của chúng ta bằng việc sử dụng thư viện [**tymondesigns/jwt-auth**](https://github.com/tymondesigns/jwt-auth).<br>
# **1. Giới thiệu**<br>
Tại sao lại cần phải bảo mật API? Thật đơn giản, nó cũng giống như việc bạn đi vào một khách sạn vậy, muốn vào một căn phòng nào đó của khách sạn thì trước hết bạn phải qua lễ tân. Tại đây lễ tân sẽ tiến hành kiểm tra chứng mình thư, thẻ căn cước,... để xác thực được danh tính của bạn. Thì API cũng như vậy, trước ghi đáp ứng request mà bạn gửi lên, server cũng cần phải kiểm tra "chứng minh thư" của bạn để xác thực rõ xem bạn là ai, bạn đến từ đâu  :)<br>

Trong bài viết này mình xin giới thiệu đến các bạn một cô lê tân vô cùng xinh đẹp, khá lớn tuổi nhưng làm việc vẫn rất hiệu quả và ổn định - JWT (Json Web Token)<br>
# **2. Cài đặt Project**<br>
**Đầu tiên, ta hãy cùng nhau tạo ra 1 project laravel nhé.**<br>
Cài đặt thông qua composer:<br>
`$ composer create-project laravel/laravel jwt-auth`<br>

Nếu bạn có Laravel installer, bạn có thể chạy lệnh sau:<br>
`$ laravel new jwt-auth`<br>

**Tiếp theo đó, config lại file .env để kết nối đến cơ sở dữ liệu**<br>
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jwt
DB_USERNAME=root
DB_PASSWORD=MẬT_KHẨU_MYSQL
```
**Đưa bảng users có sẵn của laravel vào database:**<br>
`$ php artisan migrate`<br>
# **3. Cài đặt và cấu hình package JWT Authentication**<br>
Để cài đặt JWT dùng câu lệnh composer sau:<br>
`$ composer require tymon/jwt-auth:^1.0.2`<br>

*Lưu ý: Nếu sử dụng **composer require tymon/jwt-auth** thì nó sẽ tải bản 0.5.12 và bạn sẽ gặp lỗi này*:<br>
```
    - Root composer.json requires tymon/jwt-auth ^0.5.12 -> satisfiable by tymon/jwt-auth[0.5.12].
    - tymon/jwt-auth 0.5.12 requires illuminate/support ~5.0 -> found illuminate/support[v5.0.0, ..., 5.8.x-dev] but these were not loaded, likely because it conflicts with another require.
```
Mở file config/app.php và thêm provider sau vào mảng providers:
```php
'providers' => [
    ....
    ....
    Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
],
```
Thêm các facades sau vào mảng aliases:
```php
'aliases' => [
    ....
    'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
    'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class,
    ....
],
```
Tiếp đó, sử dụng lệnh sau để public các file JWT Auth từ trong vendor sang config/jwt.php: <br>
`$ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"`

Như các bạn đã biết, để mã hóa chuỗi token, ta phải sử dụng một khóa bí mật (secret key). Sử dụng lệnh sau để tạo secret key:<br>
`php artisan jwt:secret`

Kiểm tra file .env, ta thấy một chuỗi bí mật ngẫu nhiên được sinh ra:<br>
`JWT_SECRET=RAdSX8gnctMMhuLO7nG7XtlE9Ijq4thvp3NlvlvdUdj8buZ76qd19O3jm7SeUZlM`<br>

# **4. Thiết lập model User**<br>
Lớp User sẽ implement interface Tymon\JWTAuth\Contracts\JWTSubject. Khi đó ta phải override lại 2 phương thức sau:
* `getJWTIdentifier()`
* `getJWTCustomClaims()` 

Khi đó lớp User sẽ như sau:

```php
<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }
}
```

# **5. Cấu hình Auth Guard**<br>
Bây giờ, chúng ta cần thiết lập JWT Auth Guard để bảo vệ quá trình xác thực của ứng dụng Laravel. Laravel guard mặc định sử dụng driver sesion. Ta sẽ thiết lập guard mặc định thành api và api guard sử dụng driver jwt.
Sửa trong file **config/auth.php** như sau:
```php
<?php

return [

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],


    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
            'hash' => false,
        ],
    ],
```

# **6. Tạo authentication controller**<br>
Tạo một JWT authentication controller để xây dựng các logic cho quá trình xác thực. Sử dụng lệnh sau để tạo AuthController:
`$ php artisan make:controller AuthController`

Đặt đoạn code sau vào file AuthController.php. Mình sẽ giải thích các phương thức ở dưới nha.
```php
<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function changePassWord(Request $request) {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $userId = auth()->user()->id;

        $user = User::where('id', $userId)->update(
                    ['password' => bcrypt($request->new_password)]
                );

        return response()->json([
            'message' => 'User successfully changed password',
            'user' => $user,
        ], 201);
    }
}
```
* Trong hàm khởi tạo, chúng ta sử dụng middleware auth:api. Khi đó các hàm bên trong lớp AuthController sẽ không thể được truy cập mà không có một token hợp lệ. Ta cũng có thể truyền vào tên các hàm muốn loại trừ khỏi middleware. Và ở đây, dĩ nhiên khi người dùng truy cập đến login hoặc register thì không cần phải check middleware rồi.
* Trong phương thức login(), ta sử dụng cơ chế Auth của JWTAuth . User sẽ post thông tin gồm email và password. JWTAuth sẽ check nếu thông tin đăng nhập đúng thì sẽ tạo một token và gửi lại cho phía client. Phía client có thể lưu lại chuỗi token này ở local storage để sử dụng trong các lần thao tác với API tiếp theo. Ngược lại, server sẽ trả về lỗi nếu người dùng không được tìm thấy trong cơ sở dữ liệu. Ở đây, trước khi xác thực người dùng, mình có sử dụng Validator để validate các input mà người dùng gửi lên. Các bạn cũng có thể tạo FormRequest để validate nha.
* Phương thức register() được sử dụng để tạo user mới. Đầu tiên, các giá trị người dùng như tên, email và mật khẩu được validate. Nếu thông tin đăng kí hợp lệ, server sẽ ra tạo một JWT để cung cấp quyền truy cập hợp lệ cho người dùng.
* Phương thức logout() sẽ kiểm tra xem token có hợp lệ không. Nếu đúng thì xóa chúng đi. Nói là xóa nhưng thật ra nó chỉ cho token vào 1 blackList để nếu đã logout ra rồi thì sẽ không sử dụng được token cũ để thao tác vs API nữa.
* Phương thức refresh() tạo lại một token mới. Nó làm mất hiệu lực người dùng hiện đang đăng nhập nếu người đó sử dụng token cũ. 
* Phương thức userProfile() hiển thị dữ liệu của người dùng đã đăng nhập.
# **6. Tạo các authentication routes**<br>
Mở file **routes/api.php** và thêm vào các route sau:
```php
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/change-pass', [AuthController::class, 'changePassWord']);    
});
```
# **6. Test các api vừa tạo bằng postman**<br>
* **Register API**
![](https://images.viblo.asia/ec6b1de3-4e37-4077-bd09-38c4dde4641a.png)
Kết quả trả về:
![](https://images.viblo.asia/0eb8a174-9afb-4b3f-8d76-2e5b6786fa43.png)
* **Login API**
![Screen Shot 2021-08-11 at 22.07.46.png](https://images.viblo.asia/b8d6b30c-f916-4621-ae1d-4c780778979d.png)
Kết quả trả về:
![](https://images.viblo.asia/e60dda31-60e5-473b-9666-0173a09c6856.png)
Như các bạn đã thấy, khi login thành công, server sẽ trả về một chuỗi access_token, phía client có thể lưu chuỗi token này ở local storage, cookie,... Và sau đó mình sẽ sử dụng chuỗi token này để gửi request đến các API của server. Thế tại sao khi mình gửi request đến API register và login thì không cần gửi kèm access token, mà server vẫn phản hồi ok vậy nhỉ? Chắc bạn bạn còn nhớ ở phần middleware, mình đã loại trừ hai hàm login và register khỏi middleware auth:api. Còn với các API khác, mọi request của user gửi lên đều phải đi qua middleware này, nó sẽ check xem bạn có gửi chuỗi token hợp lệ hay không thì mới cho đi qua đó!!!<br>
* **Hãy nhớ thêm header field "Authorization: Bearer Token" cho các API User Profile, Token Refresh, Change Password và Logout.**<br>
![Screen Shot 2021-08-11 at 22.26.44.png](https://images.viblo.asia/95faa874-30bb-423b-91cc-21c6e1bdff95.png)
* **Logout API**<br>
![Screen Shot 2021-08-11 at 22.42.22.png](https://images.viblo.asia/0dd760c5-d96b-4587-b3d9-a9664dc6dbd2.png)
* **User Profile API**
![Screen Shot 2021-08-11 at 22.31.18.png](https://images.viblo.asia/a95a1c4e-9f93-4caf-aa63-db310e402ade.png)
* **Token Refresh API**
![](https://images.viblo.asia/0d935aea-7402-4396-af7f-4d2bc09d70e5.png)
Như vậy một chuỗi token mới được sinh ra, và bạn sẽ không thể dùng chuỗi token cũ để gửi request lên được, vì đơn giản nó đã hết hạn rồi :v: 
* **Change Password API**
![Screen Shot 2021-08-11 at 22.48.17.png](https://images.viblo.asia/67b5146f-93c1-47b2-b2d7-1aac7691945e.png)
# **7. Kết luận**<br>
Bài viết khá dài dòng nhỉ, mình viết hơi vội mong mọi người thông cảm ạ. Ở bài viết lần sau, mình sẽ hướng dẫn mọi người tự tạo ra một chuỗi token chay để hiểu rõ hơn về bản chất của JWT. Cảm ơn mọi người đã đọc bài viết ạ <3 <br>
Và đây là link github của phần demo JWT mình đã giới thiệu bên trên: https://github.com/vuminhhieu1311/jwt-auth