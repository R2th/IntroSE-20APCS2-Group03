Chả là dự án hiện tại mình tham gia đang làm về AngularJS. Trong quá trình tìm hiểu thêm về AngularJS nói riêng thì bên cạnh đó mình cũng tìm hiểu luôn cả Angular4 do hiện tại Angular4 đang rất được ưa chuộng và phần lớn hiện nay các Angular-er đã chuyển dần sang Angular (Angular và AngularJS khác nhau thế nào thì các bạn có thể tìm hiểu thêm [tại đây](https://blog.upstate.agency/whats-the-angle-between-angularjs-and-angular-f0224d1f628f). Phần sau mình sẽ giới thiệu cho các bạn về cách jwt làm việc với Angular4

Có rất nhiều bài viết nói về định nghĩa của JWT nên mình cũng sẽ không nhắc lại, các bạn có thể xem thêm [tại đây](https://viblo.asia/p/tim-hieu-ve-json-web-token-jwt-7rVRqp73v4bP). Bài viết này mình sẽ trình bày chủ yếu về thực hành.
### Phần I: Viết API và kiểm tra API bằng Postman

### B1: Tạo project laravel.
`composer create-project --prefer-dist laravel/laravel api`
### B2: Cầu hình và  cài đặt package JWT theo [ hướng dẫn](https://github.com/tymondesigns/jwt-auth/wiki)
- Chú ý thiết lập middleware trong app/Http/Middleware/Kernel.php
```
 protected $routeMiddleware =
   [
     ...
    'jwt.auth' => \Tymon\JWTAuth\Middleware\GetUserFromToken::class,
    'jwt.refresh' => \Tymon\JWTAuth\Middleware\RefreshToken::class,
    ]
```
### B3: Cấu hình routes/api.php
     Route::post('auth/login', 'Api\AuthController@login'); 
     Route::post('auth/refresh', 'Api\AuthController@refresh');
     Route::get('auth/logout', 'Api\AuthController@logout');
     Route::group(['middleware' => 'jwt.auth', 'namespace' => 'Api\'], function() {
         Route::get('auth/me', 'AuthController@profile');
     });

### B4: Tạo seeder User.

    factory(App\User::class)->create([
            'name' => 'your_name',
            'email' => 'your_email',
        ]);
### B5: Exception
 ```
public function render($request, Exception $exception)
    {
        if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json(['error' => 'token_expired'], $exception->getStatusCode());
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json(['error' => 'token_invalid'], $exception->getStatusCode());
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
            return response()->json(['error' => $exception->getMessage()], $exception->getStatusCode());
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){
            return response()->json(['error' => 'token_has_been_blacklisted'], $exception->getStatusCode());
        }
        return parent::render($request, $exception);
    }
```
Ý nghĩa của các error thế nào thì các bạn có thể xem phần check bằng Postman để hiểu rõ hơn.
  
### B6: Controller
- Tạo app/Http/Controller/Api/AuthController.php với các method đã được khai báo ứng với route nhé
```
<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\JWTAuth;
class AuthController extends Controller
{
    /**
     * @var JWTAuth
     */
    private $jwtAuth;

    public function __construct(JWTAuth $jwtAuth)
    {
        $this->jwtAuth = $jwtAuth;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = $this->jwtAuth->attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        $user = $this->jwtAuth->authenticate($token);
        return response()->json(compact('token', 'user'));
    }

    public function refresh()
    {
        $token = $this->jwtAuth->getToken();
        $token = $this->jwtAuth->refresh($token);
        return response()->json(compact('token'));
    }

    public function logout()
    {
        $token = $this->jwtAuth->getToken();
        $this->jwtAuth->invalidate($token);
        return response()->json(['logout']);
    }
    
    public function profile()
    {
        if (!$user = $this->jwtAuth->parseToken()->authenticate()) {
            return response()->json(['error' => 'user_not_found'], 404);
        }
        return response()->json(compact('user'));
    }
}
```
### B7: Bây giờ thì test api nhận được từ server trên Postman.
 - Mình sẽ dùng câu lệnh của laravel để run server:
`php artisan serve --port=8001`
- Cách cài đặt và hướng dẫn sử dụng [Postman](https://viblo.asia/p/postman-goi-api-chua-bao-gio-de-dang-nhu-vay-AoDGYNDQRvg)
- Các bạn hãy config lại trong file config/jwt.php để sửa 2 mục này để việc test nhanh gọn hơn.
```
'ttl' => 1, // token hoạt động trong 1' - sau lần login đầu tiên
'refresh_ttl' => 1, //refresh lại token và sử dụng thêm 1'
```
1. Login
* Check login với email = `your_email` (seeder) và password = `secret` (trong params)
- Trong postman chọn phương thức POST với link theo route tương ứng.
![](https://images.viblo.asia/005893ca-6457-48ba-915c-2c0fcb2c6a79.png)
2. Xem profile 
![](https://images.viblo.asia/3448a9c8-0252-4990-b3bb-2957c98881cf.png)
Các bạn có thể thấy server bắn ra exception `token_expired` do quá thời hạn token, vậy chúng ta phải refresh token bằng cách vào postman và khởi tạo lại token bằng phương thức refresh ứng với route đã tạo (`Cách refresh token bằng Postman cũng giống với get profile và chỉ đổi lại tên route`). Sau đó vào lại profile và ta sẽ nhận được kết quả
![](https://images.viblo.asia/e6c6bae2-ceec-4ef1-b90e-f2db2ed74471.png)
3. Token invalid
Nếu bạn điền sai token thì server sẽ bắn ra exception 'token_invalid'
![](https://images.viblo.asia/729c3ae3-437d-4e69-ad93-8960e08ba2d7.png)
4. Logout
Cách hoạt động cũng giống profile và refresh token và kết quả
![](https://images.viblo.asia/dc7f5918-ab2f-4b6e-8ecb-4e0309287636.png)
5. Một vài lỗi exception khác
- `A token is required` khi logout.  (chưa có token)
- `token not provided ` khi get profile.  (chưa có token)
- `token_has_been_blacklisted`khi gửi lại token cũ
### Kết thúc 
Đây là phần server trả API, phần sau mình sẽ viết cách hoạt động của Angular4 với JWT. Hẹn gặp lại các bạn vào bài viết lần sau.
Bạn có thể tải source code trên [github](https://github.com/sonhip94/api) và đừng ngại lên [đây](https://unipos.me/) gõ  `@tran.thanh.son +$x #ThanksGreatPost` nếu bạn thấy bài viết này bổ ích nhé (y)
```
if ($x <= 120 && $x >= 10) {
    return true;
}
 return false;
```