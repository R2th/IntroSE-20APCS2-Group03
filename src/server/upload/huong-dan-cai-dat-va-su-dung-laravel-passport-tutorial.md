# Mở đầu
Laravel Passport được xây dựng dựa trên League OAuth2 server được phát triển bởi Andy Millington và Simon Ham.
# Cài đặt
- Cài đặt Passport qua trình quản lý gói Composer:
```
composer require laravel/passport
```
Laravel Passport cung cấp sẵn một số migration class để tạo các bảng cần thiết để lưu trữ authorization codes, access tokens, refresh tokens, personal access tokens, thông tin về clients (danh sách các file migration có thể xem tại đây). Để cài đặt các bảng cần thiết cho Laravel Passport, chúng ta dùng lệnh sau:
```
php artisan migrate
```
Tiếp theo, bạn nên thực hiện `passport:install` lệnh Artisan. Lệnh này sẽ tạo các khóa mã hóa cần thiết để tạo mã thông báo truy cập an toàn
```
php artisan passport:install
```

Sau khi chạy `passport:install`, hãy thêm `Laravel\Passport\HasApiTokens` vào `App\Models\User`
```
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
 
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

Cuối cùng, trong `config/auth.php` tệp cấu hình ứng dụng của bạn, bạn nên xác định một api bảo vệ xác thực và đặt driver tùy chọn thành `passport`
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
Cấu hình vòng đời của Token
Theo mặc định, Passport phát hành mã thông báo truy cập lâu dài sẽ hết hạn sau một năm. Nếu bạn muốn định cấu hình thời gian tồn tại của mã thông báo dài hơn / ngắn hơn, bạn có thể sử dụng phương thức ``tokensExpireIn, `refreshTokensExpireIn` và `personalAccessTokensExpireIn` trong `App\Providers\AuthServiceProvider`
```
/**
 * Register any authentication / authorization services.
 *
 * @return void
 */
public function boot()
{
    $this->registerPolicies();
 
    Passport::tokensExpireIn(now()->addDays(15));
    Passport::refreshTokensExpireIn(now()->addDays(30));
    Passport::personalAccessTokensExpireIn(now()->addMonths(6));
}
```
Create Api Routes
```
<?php
use Illuminate\Http\Request;
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('user', 'AuthController@user');
    });
});
```
Create Controller
Đầu tiên chúng ta sẽ tạo file `AuthController.php` trong thư mục Controller
```
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
class AuthController extends Controller
{
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
# Nguồn tham khảo
https://laravel.com/docs/8.x/passport