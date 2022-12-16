Laravel là một trong những Framework PHP phổ biến hiện nay, với sự hỗ trợ tuyệt vời cho hầu hết yêu cầu của lập trình viên. Tuy nhiên, bên cạnh những tính năng được viết trong documents thì Laravel còn khá nhiều tính năng ẩn. Trong bài viết này, mình sẽ chia sẽ những mẹo về Laravel mà mình sưu tầm được.

## 1. Invokable Controllers
Nếu muốn tạo một controller chỉ có một action duy nhất, chúng ta có thể sử dụng phương thức \_\_invoke và command để tạo invokable controller.
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
Route:
```php
Route::get('user/{id}', 'ProfileController');
```
Artisan command:
```bash
php artisan make:controller ProfileController --invokable
```

## 2. OrderBy trong Eloquent relationships
Chúng ta có thể sửa dụng OrderBy trong Eloquent relationships để sắp xếp kết quả của relationships.
```php
public function posts()
{
	return $this->hasMany(Post::class)->orderBy('updated_at');
}
```

## 3. Thứ tự migrations
Trong trường hợp muốn sắp xếp lại thứ tự chạy của migrations, chúng ta chỉ cần đổi tên file migrations theo thứ tự mong muốn. Migrations sẽ chạy theo thứ tự bảng chữ cái.
```
2014_10_11_000000_create_posts_table.php
2014_10_12_000000_create_users_table.php
```
```
2014_10_12_000000_create_users_table.php
2019_10_23_000000_create_posts_table.php
```

## 4. Route group trong group
Trong routes, chúng ta có thể sửa dụng  group trong group để nhóm các routes một cách linh hoạt hơn.
```php
Route::group(['prefix' => 'account', 'as' => 'account.'], function() {
	Route::get('login', 'AccountController@login');
	Route::get('register', 'AccountController@register');

	Route::group(['middleware' => 'auth'], function() {
		Route::get('edit', 'AccountController@edit');
	});
});
```

## 5. Artisan command help
Hiển thị thông tin về artisan command
```
php artisan make:model --help
```
```
Description:
  Create a new Eloquent model class

Usage:
  make:model [options] [--] <name>

Arguments:
  name                  The name of the class

Options:
  -a, --all             Generate a migration, factory, and resource controller for the model
  -c, --controller      Create a new controller for the model
  -f, --factory         Create a new factory for the model
      --force           Create the class even if the model already exists
  -m, --migration       Create a new migration file for the model
  -p, --pivot           Indicates if the generated model should be a custom intermediate table model
  -r, --resource        Indicates if the generated controller should be a resource controller
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --env[=ENV]       The environment the command should run under
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

## 6. Default timestamp
Khi tạo migrations, bạn có thể sử dụng ```useCurrent()``` với kiểu ```timestamps()``` để đặt CURRENT_TIMESTAMP là giá trị mặc định.
```php
$table->timestamp('read_at')->useCurrent();
```

## 7. Thiết lập giá trị mặc định khi tạo record qua Model với Observers
```
php artisan make:observer PostObserver
```
```
<?php

namespace App\Observers;

use App\Models\Post;

class PostObserver
{
    public function creating(Post $post)
    {
        $post->user_id = auth()->id();
    }
}
```

## 8. Kiểm tra phiên bản Laravel đang sử dụng
```
php artisan --version
```

## 9. Testing email với laravel.log
Thay đổi config trong file ```.env```
```
MAIL_DRIVER=log
```
Khi đó, các email sẽ được lưu trong file ```storage/logs/laravel.log```

## 10. Auth::routes có gì?
```Auth::routes()``` được định nghĩa trong file ```/vendor/laravel/framework/src/illuminate/Routing/Router.php```
Dưới đây là ```Auth::routes()``` của Laravel 6.3.0
```php
/**
 * Register the typical authentication routes for an application.
 *
 * @param  array  $options
 * @return void
 */
public function auth(array $options = [])
{
    // Authentication Routes...
    $this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
    $this->post('login', 'Auth\LoginController@login');
    $this->post('logout', 'Auth\LoginController@logout')->name('logout');

    // Registration Routes...
    if ($options['register'] ?? true) {
        $this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
        $this->post('register', 'Auth\RegisterController@register');
    }

    // Password Reset Routes...
    if ($options['reset'] ?? true) {
        $this->resetPassword();
    }

    // Password Confirmation Routes...
    if ($options['confirm'] ?? true) {
        $this->confirmPassword();
    }

    // Email Verification Routes...
    if ($options['verify'] ?? false) {
        $this->emailVerification();
    }
}

/**
 * Register the typical reset password routes for an application.
 *
 * @return void
 */
public function resetPassword()
{
    $this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    $this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    $this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    $this->post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');
}

/**
 * Register the typical confirm password routes for an application.
 *
 * @return void
 */
public function confirmPassword()
{
    $this->get('password/confirm', 'Auth\ConfirmPasswordController@showConfirmForm')->name('password.confirm');
    $this->post('password/confirm', 'Auth\ConfirmPasswordController@confirm');
}

/**
 * Register the typical email verification routes for an application.
 *
 * @return void
 */
public function emailVerification()
{
    $this->get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
    $this->get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');
    $this->post('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');
}
```