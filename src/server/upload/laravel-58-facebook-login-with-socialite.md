![](https://images.viblo.asia/45a2b0ed-97ec-4d66-9048-3ef197d28d73.jpeg)

XIn chào các bạn, hôm nay mình muốn giới thiệu tới các bạn 1 chức năng khá là phổ biến trên các website TMDT ngày nay, đó là chức năng login tài khoản bằng account Facebook trong laravel 5.8 (nó cũng sẽ tương tự như trong các version 5.7, 5.6).
Với việc login bằng tài khoản Facebook sẽ giúp cho những khách hàng ít times lướt web, cũng như ngại phải ngồi gõ tạo mới tài khoản mỗi khi muốn login vào 1 trang TMDT nào đó để order hàng online, khá là thích
cũng như giúp cho trang web của bạn đa năng hơn trong trải nghiệm người dùng.
Nào bắt đầu thôi !
## Cài Đặt Ứng Dụng
Bước đầu tiên là chúng ta install Laravel về local đã.
```
composer create-project --prefer-dist laravel/laravel FacebookLogin
```
Ở đây mình đặt project của mình với tên là FacebookLogin, các bạn có thể đặt gì là tùy nhé.

## Thiếp Lập Cơ Sỡ Dữ Liệu
Tiếp theo chúng ta duy chuyển tới file .env để thiết lập cơ sỡ dữ liệu

```
  DB_CONNECTION=mysql 
  DB_HOST=127.0.0.1 
  DB_PORT=3306 
  DB_DATABASE=here your database name here
  DB_USERNAME=here database username here
  DB_PASSWORD=here database password here
```
Chú ý: Các bạn chú ý config thông database của mình cho chính xác nhé (các bạn mà làm quen với Laravel rồi thì điều này ko thành vấn đề).

## Install SociaLite Package
```
composer require laravel/socialite
```
Sau khi cài đặt xong gói SociaLite, các bạn vào file config/app.php để config như bên dưới.
```
'providers' => [
      // Other service providers…
  Laravel\Socialite\SocialiteServiceProvider::class,
 ],

'aliases' => [
 // Other aliases…
 'Socialite' => Laravel\Socialite\Facades\Socialite::class,
 ], 
```

##  Tạo App Facebook
Tiếp theo là việc quan trọng khác, đó là việc tạo app trên facebook, các bạn nhấp vào link bên dưới để duy truyển đến 
[đây](https://developers.facebook.com/). 
Việc đăng ký 1 tài khoản cũng easy thôi phải không nào, các bạn cứ điền những thông tin cần thiết và next thôi :), điều quan trọng là sau khi tạo app các bạn nhớ bật public cho ưng dụng lên nhé.
Nó nằm trên góc phải của màn hình.
Lưu ý với các bạn là dạo gần đây cá Url đăng ký trên app của facebook phải là `https:// ` nhé, nếu các bạn ko có thì có thể lên google, search cách tạo domain fake nhé.
![](https://images.viblo.asia/1649c5e1-947f-445b-82f2-2512ebe1932e.png)
Tiếp theo các bạn click vào phần `Sản Phẩm` hay 'PRODUCTS' đối với tiếng anh, ở ngay bên dưới và chọn vào mục FaceBook Login nhé.
![](https://images.viblo.asia/30f32539-a6f0-4d9d-9c5e-74e8370576cd.png)
Và cá bạn vào phần cài đặt và cũng gắn URL của mình vào phần ô input chỗ 'URI chuyển hướng OAuth hợp lệ'
![](https://images.viblo.asia/54f44297-3568-47df-a01c-f39c181477ef.png)
Sau khi tạo xong ứng dụng các bạn quay lại với project của mình, các bạn vào file config/services.php và thêm đoạn code như bên dưới.
```
'facebook' => [
    'client_id' => env('FACEBOOK_APP_ID'),
    'client_secret' => env('FACEBOOK_APP_SECRET'),
    'redirect' => env('FACEBOOK_APP_CALLBACK_URL'),
],
```
Sau đó các bạn quay ra file .env thêm đoạn code như bên dưới.
```
FACEBOOK_APP_ID = 642423652638888
FACEBOOK_APP_SECRET = 91ffb713415e5e11f2a9fdf676jh // Chính là key của app
FACEBOOK_APP_CALLBACK_URL = http://yourDomain/callback/facebook
```
* Lưu ý với các bạn `FACEBOOK_APP_CALLBACK_URL` Chính Url mà các bạn khai báo trong [https://developers.facebook.com/](https://developers.facebook.com/) của các bạn.
## Tạo Migration và Model
Các bạn vào pp/database/create_users_table.php và thêm đoạn code bên dưới.
```
?php
 use Illuminate\Support\Facades\Schema;
 use Illuminate\Database\Schema\Blueprint;
 use Illuminate\Database\Migrations\Migration;
 class CreateUsersTable extends Migration
 {
 /**
 Run the migrations.
 *
 @return void
 */
 public function up()
 {
 Schema::create('users', function (Blueprint $table) {
     $table->increments('id');
     $table->string('name');
     $table->string('email')->unique()->nullable();
     $table->string('provider');
     $table->string('provider_id');
     $table->timestamp('email_verified_at')->nullable();
     $table->string('password')->nullable();
     $table->rememberToken()->nullable();
     $table->timestamps();
 });
 } 
 /**
 Reverse the migrations.
 *
 @return void
 */
 public function down()
 {
 Schema::dropIfExists('users');
 }
 } 
```
Sau đó là vào app/User.php
```
protected $fillable = [

         'name', 'email', 'password', 'provider', 'provider_id'

     ];
```
Tiếp theo các bạn tạo Auth để login trong laravel
```
php artisan make:auth
```
Và đừng quyên chạy `php artisan migrate` để tạo table lên db nhé, nếu trong quá trình chạy migrate gặp lỗi thì các bạn có thể thêm dòng config sau trong file app/providers/AppServiceProvider.php
```
…
 use Illuminate\Support\Facades\Schema; 
….
 function boot()
 {
     Schema::defaultStringLength(191);
 }
 … 
```
## Tạo Route
Tiếp theo các bạn vào file web.php và tạo 2 route như bên dưới.
```
Route::get('/auth/redirect/{provider}', 'SocialController@redirect');
Route::get('/callback/{provider}', 'SocialController@callback');
```

## Tạo Controler
Các bạn chạy cấu lệnh bên dưới để tạo Controller
```
php artisan make:controller SocialController
```
Và thêm đoạn code như bên dưới để tạo ra 2 method redirect và callback
```
<?php
 namespace App\Http\Controllers;
 use Illuminate\Http\Request;
 use Validator,Redirect,Response,File;
 use Socialite;
 use App\User;
 class SocialController extends Controller
 {
 public function redirect($provider)
 {
     return Socialite::driver($provider)->redirect();
 }
 public function callback($provider)
 {
   $getInfo = Socialite::driver($provider)->user(); 
   $user = $this->createUser($getInfo,$provider); 
   auth()->login($user); 
   return redirect()->to('/home');
 }
 function createUser($getInfo,$provider){
 $user = User::where('provider_id', $getInfo->id)->first();
 if (!$user) {
      $user = User::create([
         'name'     => $getInfo->name,
         'email'    => $getInfo->email,
         'provider' => $provider,
         'provider_id' => $getInfo->id
     ]);
   }
   return $user;
 }
 }
```
Sau đó cá bạn duy chuyển ra ngoài Resources/Views/Auth/login.blade.php và thêm code như bên dưới.
```
<hr>
<div class="form-group row mb-0">
 <div class="col-md-8 offset-md-4">
    <a href="{{ url('/auth/redirect/facebook') }}" class="btn btn-primary"><i class="fa fa-facebook"></i> Facebook</a>
</div>
</div>
```
 OK vậy là 1 trang login đơn giản với facebook được thiết thiệp, các bạn chỉ cần view ứng dụng lên và test thử nhé.