Bài viết này sẽ giúp các bạn biết được cơ bản cách dùng JWT trong laravel version 5.7
# Cài đặt project
Trước hết sử dụng câu lệnh composer để cài đặt một project laravel
> composer create-project --prefer-dist laravel/laravel jwt-laravel
>
Tiếp theo đó, config lại file .env để kết nối đến cơ sở dữ liệu
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=YOUR_DB_NAME
DB_USERNAME=YOUR_MYSQL_USERNAME
DB_PASSWORD=YOUR_MYSQL_PASSWORD
```
Ví dụ dưới đây sẽ sử dụng cấu trúc database user có sẵn của laravel
> php artisan:migrate
> 
# Cài đặt JWT
## Cài đặt
Để cài đặt JWT dùng câu lệnh composer sau: 
> composer require tymon/jwt-auth:dev-develop --prefer-source
> 
## Thêm JWT Service provider và Facade:
Mở file config/app.php, tìm mảng providers và thêm jwt-auth provider:
> Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
> 
Tiếp tục tìm đến mảng aliases và thêm jwt-auth facade như sau:
> 'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
> 
## Config
Pulish file config của jwt:
> php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
> 
Và tạo key cho jwt:
> php artisan jwt:secret
> 
Nó sẽ tự động sinh ra key JWT_SECRET trong file .env
# Sử dụng JWT trong laravel
## Models
Khi người dùng đăng nhập thành công, một token sẽ được sinh ra và trả về cùng model user. Model user sẽ implement  JWTSubject. Update lại model user như dưới đây
```
namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

```
## Form Request
Chúng ta validate sử dụng form request. Tạo form request cho việc đăng ký:
> php artisan make:request RegisterFormRequest
> 
File tạo mới sẽ nằm trong thư mục app\Http\Requests. Với những thông tin đăng ký: tên người dùng (name) bắt buộc, là một chuỗi có độ dài max 255 ký tự. Email bắt buôc có format của một email và không được trùng với các email khác đã tồn tại. Password bắt buộc là một chuỗi ký tự độ dài tối thiểu là 1 và tối đã là 6:
```
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterFormRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:10',
        ];
    }
}

```
## Controller
Tạo controller với nhiệm vụ đăng ký, login, logout và reset password
> php artisan make:controller AuthController
> 
Mở file app\Http\Controllers\AuthController.php và update chúng:
```
<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterFormRequest;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class AuthController extends Controller
{
    public function register(RegisterFormRequest $request)
    {
        $params = $request->only('email', 'name', 'password');
        $user = new User();
        $user->email = $params['email'];
        $user->name = $params['name'];
        $user->password = bcrypt($params['password']);
        $user->save();

        return response()->json($user, Response::HTTP_OK);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!($token = JWTAuth::attempt($credentials))) {
            return response()->json([
                'status' => 'error',
                'error' => 'invalid.credentials',
                'msg' => 'Invalid Credentials.'
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(['token' => $token], Response::HTTP_OK);
    }

    public function user(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            return response($user, Response::HTTP_OK);
        }

        return response(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json('You have successfully logged out.', Response::HTTP_OK);
        } catch (JWTException $e) {
            return response()->json('Failed to logout, please try again.', Response::HTTP_BAD_REQUEST);
        }
    }

    public function refresh()
    {
        return response(JWTAuth::getToken(), Response::HTTP_OK);
    }
}
```
## Route
Update lại file api.route

Route::post('signup', 'AuthController@register');
Route::post('login', 'AuthController@login');

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('auth', 'AuthController@user');
    Route::post('logout', 'AuthController@logout');
});

Route::middleware('jwt.refresh')->get('/token/refresh', 'AuthController@refresh');
# Kiểm tra với postman.
Sử dụng postman để kiểm tra
Đăng ký user
![](https://images.viblo.asia/dc0ccd5b-b751-4ea6-82f7-2d9b89d48fdc.png) 

Đăng nhập
![](https://images.viblo.asia/8d4cdb49-8c28-4989-a052-7be4b9a6f8fc.png)

Kiểm tra thông tin user
![](https://images.viblo.asia/3cc6ea4d-defc-4bb7-912c-11b409500463.png)

Refresh token
![](https://images.viblo.asia/d8647b1a-1b1f-4a65-b66f-f09a17925d67.png)

Đăng xuất
![](https://images.viblo.asia/e58ea09b-4db2-49b3-b669-be381fb8906f.png)

# Tài liệu tham khảo
> https://medium.com/@nshakib/laravel-5-6-framework-and-jwt-json-web-tokens-package-scratch-839b1071c1db