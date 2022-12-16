Laravel mặc định có hỗ trợ việc đăng nhập trên trình duyệt bằng session rất rõ ràng, tuy nhiên với sự phát triển của chiếc smartphone thì việc các ứng dụng phải chạy cả trên điện thoại là điều cần thiết. Khi đó chúng ta cần đến chức năng đăng nhập bằng api cho người dùng có thể đăng nhập tài khoản và sử dụng. Hiện tại Laravel đang hỗ trợ 2 cách để authentication cho API là **Token** và **Laravel Passport**. Bài viết hôm nay chúng ta sẽ cùng tìm hiểu cơ bản về 2 phương pháp này nhé.

### Laravel API Token
Ở bài viết này chúng ta sẽ mặc định dùng bảng `users` làm bảng chính đăng nhập nhé.
Đầu tiên chúng ta cần config trong file `config/auth.php` :
```
'api' => [
    'driver' => 'token',
    'provider' => 'users',
],
```
Trước khi sử dụng api token, chúng ta cần tạo cột  `api_token`  trong bảng `users` để lưu token của người dùng 
```
Schema::table('users', function ($table) {
    $table->string('api_token', 80)->after('password')
                        ->unique()
                        ->nullable()
                        ->default(null);
});
```
 Bây giờ chúng ta có thể thêm token cho người dùng khi họ bắt đầu đăng kí tài khoản:
```
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

/**
 * Create a new user instance after a valid registration.
 *
 * @param  array  $data
 * @return \App\User
 */
protected function create(array $data)
{
    return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'api_token' => Str::random(60),
    ]);
}
```
Sau khi đã thiết lập token cho người dùng thành công, chúng ta cần yêu cầu mỗi request đến server của người dùng cần phải truyền vào token: 
```
use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function(Request $request) {
    return $request->user();
});
```
Cuối cùng để truyền token vào mỗi request chúng ta có 3 cách :

**Query String**
```
$response = $client->request('GET', '/api/user?api_token='.$token);
```
**Request Payload**
```
$response = $client->request('POST', '/api/user', [
    'headers' => [
        'Accept' => 'application/json',
    ],
    'form_params' => [
        'api_token' => $token,
    ],
]);
```
**Bearer Token**
```
$response = $client->request('POST', '/api/user', [
    'headers' => [
        'Authorization' => 'Bearer '.$token,
        'Accept' => 'application/json',
    ],
]);
```

### Laravel Passport
Laravel Passport là 1 package được phát triền bên ngoài được xây dựng dựa trên [League OAuth2 server](https://github.com/thephpleague/oauth2-server)  và hiện nay được Laravel khuyên dùng hơn API Token. Vì là một package bên ngoài nên để cài đặt chúng ta cần dùng đến `composer`:
```
composer require laravel/passport
```
Package có sinh ra một số bảng trong database để hỗ trợ cho việc lưu `client và access token`:
```
php artisan migrate
```
Tiếp theo, bạn cần chạy 
```
php artisan passport:install
```
Lệnh này sẽ tạo các khóa mã hóa cần thiết để tạo mã thông báo truy cập an toàn. Ngoài ra, lệnh sẽ tạo các ứng dụng khách `personal access` và `password grant` sẽ được sử dụng để tạo mã thông báo truy cập.
Bên cạnh đó package tạo ra 1 `trait` cung cấp một số hàm và phương thức cho phép chúng ta có thể tạo token, lấy token ... cho user.
Thêm `Laravel\Passport\HasApiTokens` trait vào model `User` nhé :
```
<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
}
```
Tiếp theo chúng ta cần thêm `Passport::routes` vào `AuthServiceProvider`. Phương thức này sẽ khởi tạo những routes cần thiết liên quan đến token.
```
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
Cuối cùng chúng ta cần config trong `config/auth`: 
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
Như vậy chúng ta đã hoàn thành việc thiết lập sử dụng `Laravel Passport` cho việc authentication API. Để tìm hiểu thêm chi tiết các bạn có thể tham khảo trong: https://laravel.com/docs/5.8/passport

Hy vọng những chia sẻ cơ bản trên có thể giúp ích cho mọi người đang gặp vấn đề với Laravel Authentication API.