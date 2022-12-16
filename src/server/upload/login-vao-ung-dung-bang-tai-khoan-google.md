![](https://images.viblo.asia/b9165940-cc19-4c60-832f-4ace24913dbe.jpeg)
Xin chào các bạn!
Hôm nay mình xin chia sẽ với các bạn 1 ứng dụng nhỏ mà trong bất kỳ 1 trang admin nào cũng ko thể thiếu, đó là chức năng longin để xác thực tài khoản người dùng trước khi họ truy cập vào hệ thống.
Nhưng hôm nay chúng ta sẽ không login theo kiểu thồng thường là tạo 1 form đăng nhập để người dùng có thể tự nhập user và password như kiểu thông thường, mà mình muốn cùng các bạn chia cách login vào 1 ứng dụng qua tài khoản google của các bạn.
Hiện này để có thể tạo thêm nhiều sự tiện lợi cho người dùng, cũng như việc giúp người dùng ko phải tạo quá nhiều tài khoản và phải nhớ từng account để truy cập và từng hệ thống.
Các ứng dụng website đã tạo ra nhiều tiện ích cho việc tạo tài quản như việc bạn có thể login bằng tài khoản goole, facebook hoặc github..vv. Điều này ko những giúp cho người dùng ko cần mất thêm thời gian cho việc tạo 1 tài khoản mới và rồi phải nhớ tới nó mỗi lúc muốn đăng nhập vào hệ thống.
Và hôm nay mình sẽ cùng các bạn làm 1 ứng dụng login nhỏ thông qua tài khoản google của chính các bạn, chúng ta sẽ cùng tạo ứng dụng này dựa trên nên tảng của framework Laravel nhé..Let's go.

# Các Bước Cần Thực Hiện
1. Cài đặt ứng dụng laravel 6
2. Thiết lập cơ sở dữ liệu
3. Cài đặt package hỗ trợ
4. Cách lấy được tài khoản từ google
5. Tạo Route
6. Tạo Controller & phương thức
7. Tạo view
8. Chạy máy chủ phát triển
9. Phần kết luận

## 1. Cài đặt ứng dụng laravel 6.
Để bắt đầu tất nhiên là chúng ta cần down laravel về local của các bạn, ở đây mình sẽ down bản mới nhất về.
Các bạn có thể tư gõ hoặc copy dòng lệnh bên dưới của mình cho nhanh.
```
composer create-project --prefer-dist laravel/laravel blog
```
* Đối với các bạn mới làm quen với laravel, thì muốn chạy câu lệnh trên terminal (ubuntu), CMD (window) thì các bạn nhớ cài đặt [composer](https://getcomposer.org/) về mầy trước đã nhé.

## 2. Thiết lập cơ sở dữ liệu.
Bước tiếp theo, sau khi đã down laravel về máy, các bạn mở file .env lên và thiết lập 1 số thông tin.
```
DB_CONNECTION=mysql 
 DB_HOST=127.0.0.1 
 DB_PORT=3306 
 DB_DATABASE=here your database name here
 DB_USERNAME=here database username here
 DB_PASSWORD=here database password here
```
* CHú ý bước này cần thiết lập các thông tin đúng với cơ sỡ dữ liệu của các bạn có trên phpmyadmin nhé.

## 3. Cài đặt package.
Trong bước này chúng ta sẽ cài đặt 1 package đã được laravel hỗ trợ để chúng ta có thể connect tới google.
```
composer require laravel/socialite
```
Sau khi cài đặt thành công gói xã hội, chúng ta cần định cấu hình aliese và nhà cung cấp trong config / app.php
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

## 4. Cách lấy được tài khoản từ google.
Trước hết, chúng ta cần phải có ID CLIENT và CLIENT SECRET để thêm nút đăng nhập google xã hội trong dự án dựa trên laravel, hãy truy cập https://console.developers.google.com/ và tạo một ứng dụng mới. 
Nếu các bạn nếu ko quen tạo thì có thể search google nhé, có hướng dẫn rất nhiều, bài viết này mình ko tiện chỉ từng bước ở đây :)).
Sau khi tạo thành công một ứng dụng trong Google và nhận thông tin đăng nhập từ bảng điều khiển của Google, các ban vào file config / service.php và thêm đoạn cấu hình bên dưới:
```
'google' => [
    'client_id' => 'xxxx',
    'client_secret' => 'xxx',
    'redirect' => 'http://127.0.0.1:8000/callback/google',
  ], 
```
Tiếp theo các bạn di chuyển tới file App/User.php và thay thay đổi như đoạn code bên dưới.
```
protected $fillable = [
         'name', 'email', 'password', 'provider', 'provider_id'
     ];
```

Tiếp tục vào các bạn vào app/database/create_users_table.php và thay đổi lại đoạn code như bên dưới.
```
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
```
Sau có các bạn cần tạo auth cho việc đăng nhập.
```
php artisan make:auth
```
Và chạy câu lệnh để việc tạo data base được thực thi.
```
php artisan migrate
```
nếu trong quá trình chạy bị lỗi thì các bạn vào file app/providers/AppServiceProvider.php và thêm dòng code như bên dưới.
```
...
use Illuminate\Support\Facades\Schema;
 
....
function boot()
{
    Schema::defaultStringLength(191);
}
... 
```

## 5. Tạo route.
các bạn di chuyển tới routes/web.php và tạo các route như bên dưới.
```
 Route::get('/auth/redirect/{provider}', 'SocialController@redirect');
 Route::get('/callback/{provider}', 'SocialController@callback');
```

## 6. Tạo COntroller.
Kế đến chúng ta tạo Controller.
```
php artisan make:controller SocialController
```
Sau khi tạo thành công truy cập app / controls / SocialControll.php và đặt đoạn mã dưới đây:
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
1. Socialite::driver('$provider')->redirect() được gọi, đoạn xử lý này làm nhiệm vụ redirect user tới trang xác thực của Google.
2. Sau khi xác thực thành công sẽ redirect về Authorization callback URL và thực hiện lấy dữ liệu của user.
3. Lưu thông tin user và đăng nhập.
Bây giờ chũng ta di chuyển tới Resources/Views/Auth, và tạo 1 balde register.blade.php, chúng ta sẽ tạo ra 1 nut login bằng google
```
<hr>
<div class="form-group row mb-0">
<div class="col-md-8 offset-md-4">
<a href="{{ url('/auth/redirect/google') }}" class="btn btn-primary"><i class="fa fa-google"></i> Google</a>
</div>
</div>
```
di chuyển tới Resources/Views/Auth/login.blade.php và thêm đoạn code bên dưới.
```
<hr>
<div class="form-group row mb-0">
<div class="col-md-8 offset-md-4">
<a href="{{ url('/auth/redirect/google') }}" class="btn btn-primary"><i class="fa fa-google"></i> Google</a>
</div>
</div>
```

## 8. Chạy server
Các bạn chạy dòng lệnh bên dưới để chạy serve.
```
 php artisan serve
```
Nếu port các bạn cấu hình ko phải mặc định là cổng 80, thì chúng ta sẽ chạy lên câu lệnh như bên dưới.
```
 http://127.0.0.1:8000/login
 hoặc câu lệnh
 http://localhost/blog/public/login
```

## 9. Phần kết luận.
Vậy là xong, mình vừa chia sẽ với các bạn 1 ứng dụng nhỏ trong việc login bằng tài khoản google trong laravel, chúc các bạn thành công.
Ở bài sau mình sẽ chia với các bạn việc login bằng tài khoản github.