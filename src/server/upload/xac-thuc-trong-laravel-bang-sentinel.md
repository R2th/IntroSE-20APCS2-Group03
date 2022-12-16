# 1. Giới thiệu
Sentinel là hệ thống xác thực và ủy quyền đầy đủ tính năng của PHP 5.4+. Nó cũng cung cấp các tính năng bổ sung như vai trò người dùng và các tính năng bảo mật bổ sung.

Sentinel là một bộ khung bất khả tri của các giao diện với các triển khai mặc định, mặc dù bạn có thể thay thế bất kỳ triển khai nào mà bạn thấy phù hợp.

Gói này tuân theo tiêu chuẩn FIG PSR-4 để đảm bảo khả năng tương tác cao giữa mã PHP được chia sẻ.
Gói này yêu cầu PHP 5.4+ và đi kèm với Laravel 5 Facade và Service Provider để đơn giản hóa việc tích hợp framework tùy chọn.

# 2. Cài đặt
Cách tốt nhất và dễ nhất để cài đặt Sentinel là cài với Composer .
Mở terminal và chạy lệnh:

```composer require cartalyst/sentinel "2.0.*"```

Nếu không, bạn sẽ phải tải xuống tệp composer.phar theo cách thủ công : 

```curl -sS https://getcomposer.org/installer | php```

```php composer.phar require cartalyst/sentinel "2.0.*"```

**Mở tệp config/app.php rồi thêm các dòng dưới vào ```$providers```**:
```php
Cartalyst\Sentinel\Laravel\SentinelServiceProvider::class,
```

Thêm vào `$aliases`:
```php
'Activation' => Cartalyst\Sentinel\Laravel\Facades\Activation::class,
'Reminder'   => Cartalyst\Sentinel\Laravel\Facades\Reminder::class,
'Sentinel'   => Cartalyst\Sentinel\Laravel\Facades\Sentinel::class,
```

**Assets:**

Khi cài đặt đã ok, chạy lệnh này trong terminal:

``` php artisan vendor:publish --provider="Cartalyst\Sentinel\Laravel\SentinelServiceProvider"```

**Migrations**

```php artisan migrate```

Chú ý: Phải xóa bảng User , Reset Password trong db trước khi chạy lệnh ```php artisan migrate```.

**To using, only use in class:**

```php
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use Illuminate\Database\Capsule\Manager as Capsule;
```

# 3. Login, Logout with rule "admin"
Tạo form Request

```php artisan make:request Login```

Trong file Requests\Login.php:

```php
    /**
     * Xác định xem người dùng có được phép thực hiện yêu cầu này hay không.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Nhận các quy tắc xác thực áp dụng cho yêu cầu.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'email' => 'required',
            'password' => 'required|min:6'
        ];
    }
```
**Route:**


```php
Route::get('/login', 'AuthController@getLogin')->name('login');
Route::post('/postLogin', 'AuthController@postLogin')->name('postlogin');
```

Hàm ```postLogin()``` trong file **AuthController.php**:

```php
public function postLogin(Login $request)
    {
        try {
            $remember = (bool) $request->get('remember', false);
            if (Sentinel::authenticate($request->all(), $remember)) {
                return redirect()->intended($this->redirectTo);
            } else {
                $err = "Tên đăng nhập hoặc mật khẩu không đúng!";
            }
        } catch (NotActivatedException $e) {
            $err = "Tài khoản của bạn chưa được kích hoạt";
        } catch (ThrottlingException $e) {
            $delay = $e->getDelay();
            $err = "Tài khoản của bạn bị block trong vòng {$delay} sec";
        }
        return redirect()->back()
            ->withInput()
            ->with('err', $err);
    }
```
**Form login: file auth\login.blade.php**
```php
<form class="" action=" { {  Route('postlogin')}}" method="post">
    @if(session('err'))
        <div class="alert alert-warning" role="alert"> { { session('err')}}</div>
    @endif
     { { csrf_field()}}
    <h3>Đăng nhập</h3>
    <div class="form-group  { {  ($errors->first('email'))?'has-error':''}}">
        <label for="email">E-mail</label> 
        <input type="email" name="email"
            class="form-control" id="email" placeholder="E-mail" value=" { {  old('email')}}">
        @if($errors->first('email'))
            <p class="text-danger"> { { $errors->first('email')}}</p>
        @endif
    </div>
    <div class="form-group  { {  ($errors->first('password'))?'has-error':''}}">
        <label for="password">Mật khẩu</label> 
        <input type="password"
            name="password" class="form-control" id="password"
            placeholder="Mật khẩu">
        @if($errors->first('password'))
            <p class="text-danger"> { { $errors->first('password')}}</p>
        @endif
    </div>
    <div class="checkbox">
        <label> <input type="checkbox" name="remember" value="1"> Ghi nhớ tài khoản
        </label>
    </div>
    <button type="submit" class="btn btn-primary">Gửi</button>
</form>
```
**Thêm Middleware authenticate và role admin**  ```check()```

```php artisan make:middleware Authenticate```

```php artisan make:middleware CheckRoleAdmin```

Trong file Authenticate.php
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use Illuminate\Database\Capsule\Manager as Capsule;

class Authenticate
{

    /**
     * Xử lý yêu cầu đến.
     *
     * @param \Illuminate\Http\Request $request         
     * @param \Closure $next            
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Sentinel::check()) {
            return $next($request);
        }

        return redirect()->route('login')->withErrors('Bạn phải đăng nhập');
    }
}
```

```php
<?php
namespace App\Http\Middleware;

use Closure;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use Illuminate\Database\Capsule\Manager as Capsule;

class CheckRoleAdmin
{

    /**
     * Xử lý yêu cầu đến
     *
     * @param \Illuminate\Http\Request $request         
     * @param \Closure $next            
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Sentinel::getUser()->inRole('admin')) {
            return $next($request);
        }
        return redirect()->route('login')->with('err', 'Bạn không có quyền truy cập');
    }
}
```
Trong file `Kernel.php`: thêm vào  ```$routeMiddleware```:
```php
'auth' => \App\Http\Middleware\Authenticate::class,
'check.admin' => \App\Http\Middleware\CheckRoleAdmin::class
```
Nếu muốn xác thực thêm middleware trong route:

```php
Route::group([
    'prefix' => 'post', 'middleware' => ['auth','check.admin']
], function () {
    Route::get('/index', 'PostController@index')->name('post.index');
    Route::get('/create', 'PostController@create')->name('post.create');
    Route::post('/store', 'PostController@store')->name('post.store');

    Route::post('/{id}/newComment', 'CommentController@create')->name('post.newcomment');

    Route::get('/{id}', 'PostController@getPost')->name('post.getpost');
    Route::post('/{id}/new', 'CommentController@createInPageDetails')->name('post.newcommentdetails');
});
```
Source: Internet