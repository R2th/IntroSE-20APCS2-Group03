## 1. Xây dựng dự án cơ bản
- Trong bài đăng viết, chúng ta sẽ hướng dẫn bạn cách tích hợp từng bước OAuth của mạng xã hội thông qua Laravel Socialite. <br>
- Chúng ta sẽ tạo một dự án demo không chỉ là bản demo mà còn có thể sử dụng trong product.<br>
- Chúng ta sẽ bắt đầu tạo 1 dự án: <br>
`$ laravel new demoSocialite` 
- Sau khi tạo dự án, chúng ta sẽ tạo cơ sở dữ liệu và thiết lập .env cho nó.
```
// Create database with command line
$ createdb demoSocialite
```
- Thêm cấu hình, ví dụ như mình đang sử dụng mysql nên .env của mình sẽ như sau:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=demoSocialite
DB_USERNAME=root
DB_PASSWORD=
```
## 2. Install dependencies & auth
- Để giữ mọi thứ đơn giản, mình sẽ sử dụng bootstrap trong dự án này, chúng ta có thể thay đổi thành bất kỳ thư viện nào mà bạn muốn.
```
# Switch to project folder
$ cd demoSocialite
$ composer require laravel/ui
$ php artisan ui bootstrap
$ npm install && npm run dev
$ php artisan ui:auth
# Start dev server to check everything works fine
# You should see LOGIN and REGISTER on the top right side in index
$ php artisan serve
```
## 3. Install Socialite
```
$ composer require laravel/socialite
```
## 4. Migration
- Trong bước này, chúng ta sẽ sửa đổi các cột nhỏ cho bảng `users`. 
- Trước tiên, ta sẽ cài đặt một packet bắt buộc để support chúng ta đơn giản hơn trong quá trình thay đổi bảng `users`.
```
$ composer require doctrine/dbal
```
- Chúng ta sẽ tạo 1 file migration để tiến hành edit theo cú pháp bên dưới:
```
$ php artisan make:migration edit_columns_in_users_table
```
- Để hiểu tại sao chúng ta thay đổi cấu trúc bảng, chúng ta nên xem qua những mục tiêu chúng ta mong muốn ở list các yêu cầu phía dưới: <br>
  

-----

* Tiến hành có thể SoftDeletes có nghĩa là người dùng có thể đăng ký, xóa tài khoản của mình và đăng ký lại nhưng chúng ta muốn giữ lại tất cả dữ liệu mà SoftDeletes hỗ trợ. Do đó, email KHÔNG thể là duy nhất nhưng chúng tôi vẫn cần một khóa duy nhất khác để tránh tạo email trùng lặp nếu họ không xóa tài khoản của mình trong lớp cơ sở dữ liệu.

* Đăng nhập bằng Socialite  có nghĩa là người dùng KHÔNG phải cung cấp mật khẩu, do đó, mật khẩu sẽ không có giá trị (nullable).
* Support OAuth của nhiều Socialite và nếu email giống nhau, chúng ta nên hợp nhất một số thông tin vào record.
* Bạn có thể bật xác minh hoặc không. Codebase sẽ support nhiều case khác nhau.<br>

-----


Bạn có thể tham khảo phần setting bên dưới của mình để tiến hành setup 1 users table theo mong muốn.
Đây là bảng users mặc định ban đầu.<br>
```
// Default migration
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```
Và bên dưới là phần thêm 1 số thuộc tính cần thiết mà mình đã trình bày ở bên trên:
```
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropUnique(['email']);
        $table->string('password')->nullable()->change();
        $table->json('social')->nullable();
        $table->softDeletes();
        $table->unique(['email', 'deleted_at']);
    });
}
public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropUnique(['email', 'deleted_at']);
        $table->dropSoftDeletes();
        $table->dropColumn(['social']);
        $table->string('password')->change();
        $table->string('email')->unique()->change();
    });
}
```
Trong phương thức down(), chúng ta cũng đặt logic rollback. Trong thực tế, cần đảm bảo rằng mỗi bước có thể quay ngược trở lại tốt. Đây là hầu hết những người mới bắt đầu hay quên. Sau khi mọi thứ hoàn tất, bây giờ, chúng ta có thể migrate database.
```
$ php artisan migrate
```
## 5. Model
- Vì chúng ta thêm `SoftDeletes` và `social`, chúng ta phải chỉnh sửa model `app/User.php `của mình. Chúng ta thêm cho `$casts` và hàm `setEmailAttribute`.
```
use Illuminate\Database\Eloquent\SoftDeletes;
// ...
// If you want to support verify you can add implements
class User extends Authenticatable
{
  use Notifiable;
  use SoftDeletes;
  
  // ...
  
  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
      'email_verified_at' => 'datetime',
      'social' => 'array',
  ];
  
  // BTW: in most of case you should keep email in lowercase
  public function setEmailAttribute($value)
  {
      $this->attributes['email'] = strtolower($value);
  }
}
```
## 6. Get key and secret from platform

- Trước khi chúng ta chuyển sang bước tiếp theo, bạn nên đăng ký các dịch vụ mà bạn muốn cung cấp như Facebook, Twitter, LinkedIn, v.v. Vì họ có các cách khác nhau để lấy thông tin đăng nhập, vì vậy hãy google nó, tạo ứng dụng và lấy khóa . 
- Sau khi bạn nhận được khóa và bí mật, bạn có thể thiết lập trong .env, vui lòng thêm các dịch vụ bạn muốn. Chúng ta lưu khóa và bí mật ở đây vì chúng là dữ liệu nhạy cảm sessions và một khi chúng thay đổi, bạn có thể dễ dàng thay đổi chúng. 
-  URL callback mà chúng ta xác định trước ở đây, chúng tôi sẽ tạo sau trong phần Router.
```
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_CALLBACK_URL=/login/facebook/callback
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=/login/google/callback
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_CALLBACK_URL=/login/linkedin/callback
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
TWITTER_CALLBACK_URL=/login/twitter/callback
```
## 7. Configuration
- Trong `config/services.php`, chúng ta nên setting các service mà mình cần sử dụng. Chúng ta sẽ setting phần này sao cho những phần bạn setting map với file cấu hình .env của các bạn để dễ dàng quản lý thông tin, cũng như đảm bảo tính chất bảo mật cao.
- Ví dụ như phần setting bên dưới đều lấy thông tin từ file .env của các bạn.
```
// ....
'ses' => [
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
],
'facebook' => [
    'client_id' => env('FACEBOOK_CLIENT_ID'),
    'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
    'redirect' => env('FACEBOOK_CALLBACK_URL'),
    'scopes' => ['email', 'public_profile'],
],
'google' => [
    'client_id' => env('GOOGLE_CLIENT_ID'),
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'redirect' => env('GOOGLE_CALLBACK_URL'),
    'scopes' => [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
    ],
],
'linkedin' => [
    'client_id' => env('LINKEDIN_CLIENT_ID'),
    'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
    'redirect' => env('LINKEDIN_CALLBACK_URL'),
    'scopes' => ['r_emailaddress', 'r_liteprofile'],
],
'twitter' => [
    'client_id' => env('TWITTER_CLIENT_ID'),
    'client_secret' => env('TWITTER_CLIENT_SECRET'),
    'redirect' => env('TWITTER_CALLBACK_URL'),
    'sc
```
## 8. Routing
- Hãy nhớ rằng chúng ta đã thiết lập URL callback trong `.env`, bây giờ, chúng ta cần hai route, để biết thêm thông tin về phần này, bạn có thể tham khảo phần route ở trang chủ [laravel](https://laravel.com/docs/8.x/routing) . Hãy sửa đổi các `route/web.php` sao cho phù hợp. <br>
```
Auth::routes(); // NOTE: If you want to verify you can add ['verify' => true]
Route::get('/login/{provider}', 'Auth\LoginController@redirectToProvider')
    ->name('social.login');
Route::get('/login/{provider}/callback', 'Auth\LoginController@handleProviderCallback')
    ->name('social.callback');
```
## 9. Controller
- Chúng ta sẽ bắt đầu ở `app/Http/Controllers/Auth/RegisterController.php` và tiến hành chỉnh sửa thêm `validate` sao cho phù hợp.
- Bởi vì chúng ta đã sửa đổi bảng cơ sở dữ liệu, vì vậy chúng tôi cũng nên thay đổi một chút.
```
protected function validator(array $data)
{
    return Validator::make($data, [
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,NULL,id,deleted_at,NULL'],
        'password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);
}
```
- Tiếp theo, chúng ta sẽ kế thừa `app/Http/Controllers/Auth/LoginController.php` để làm phần `Socialite`.
```
namespace App\Http\Controllers\Auth;
// ...
use Socialite;
use App\User;
class LoginController extends Controller
{
    // ...
public function redirectToProvider(string $provider)
    {
        try {
            $scopes = config("services.$provider.scopes") ?? [];
            if (count($scopes) === 0) {
                return Socialite::driver($provider)->redirect();
            } else {
                return Socialite::driver($provider)->scopes($scopes)->redirect();
            }
        } catch (\Exception $e) {
            abort(404);
        }
    }
public function handleProviderCallback(string $provider)
    {
        try {
            $data = Socialite::driver($provider)->user();
            
            return $this->handleSocialUser($provider, $data);
        } catch (\Exception $e) {
            return redirect('login')->withErrors(['authentication_deny' => 'Login with '.ucfirst($provider).' failed. Please try again.']);
        }
    }
public function handleSocialUser(string $provider, object $data)
    {
        $user = User::where([
            "social->{$provider}->id" => $data->id,
        ])->first();
if (!$user) {
            $user = User::where([
                'email' => $data->email,
            ])->first();
        }
if (!$user) {
            return $this->createUserWithSocialData($provider, $data);
        }
$social = $user->social;
        $social[$provider] = [
            'id' => $data->id,
            'token' => $data->token
        ];
        $user->social = $social;
        $user->save();
return $this->socialLogin($user);
    }
public function createUserWithSocialData(string $provider, object $data)
    {
        try {
            $user = new User;
            $user->name = $data->name;
            $user->email = $data->email;
            $user->social = [
                $provider => [
                    'id' => $data->id,
                    'token' => $data->token,
                ],
            ];
            // Check support verify or not
            if ($user instanceof MustVerifyEmail) {
                $user->markEmailAsVerified();
            }
            $user->save();
return $this->socialLogin($user);
        } catch (Exception $e) {
            return redirect('login')->withErrors(['authentication_deny' => 'Login with '.ucfirst($provider).' failed. Please try again.']);
        }
    }
public function socialLogin(User $user)
    {
        auth()->loginUsingId($user->id);
return redirect($this->redirectTo);
    }
}.
```
## 10. View
- Cuối cùng, chúng ta có thể thêm URL đăng nhập vào `resource/views/auth/login.blade.php` và hoàn tất.
```
@foreach(['facebook', 'twitter', 'google', 'linkedin'] as $provider)
    <a class="btn btn-link" href="{{ route('social.login', ['provider' => $provider]) }}">Login with {{ ucwords($provider) }}</a>
@endforeach
@if ($errors->any())
    <div class="alert alert-danger">
        @foreach ($errors->all() as $error)
            <div>{{ $error }}</div>
        @endforeach
    </div>
@endif
```
## 11. Nguồn và tài liệu tham khảo:
- Laravel: https://laravel.com/docs/8.x/routing
- Medium: https://medium.com/
- socialite: https://github.com/laravel/socialite