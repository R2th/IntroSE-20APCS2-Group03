Laravel có một hệ thống Auth cực kì linh hoạt, với một vài dòng command bạn có thể có các hàm Login, Register hoàn chỉnh và sẵn sàng. Hôm nay mình sẽ cùng các bạn đào sâu thêm một chút và xem những thứ chúng ta có thể tự mình custom nhé.

# 1. Vô hiệu chức năng đăng kí
Nếu như ứng dụng của bạn đã có người dùng được đăng kí trước, hoặc người dùng chỉ được thêm mới bởi người quản trị hệ thống và không có cách đăng kí trực tiếp thì sao? Bạn sẽ muốn vô hiệu chức năng đăng kí của ứng dụng.
<br>
<br>
**Kể từ Laravel 5.7 trở đi**, để vô hiệu hóa chức năng đăng kí, bạn chỉ cần thêm tham số sau vào trong **routes/web.php**:

```php
Auth::routes(['register' => false]);
```
Sau đó bạn sẽ không nhìn thấy đường dẫn Register ở góc trên bên phải trong thanh điều hướng trong trang mặc định laravel nữa , và route **/register** cũng sẽ trả về trang 404.

# 2. Bật xác thực email
Một tính năng mới trong Laravel 5.7 là [xác thực email](https://laravel.com/docs/5.7/verification), với một trường mới trong database là **user.email_verified_at**. Mặc định chức năng xác thực email bị vô hiệu hóa, nhưng các trường cần thiết và các route thì đều đã được tạo sẵn, chỉ là bị ẩn đi.
<br>
<br>
Để bật chức năng này, bạn cần thêm tham số sau vào trong **routes/web.php**:
```php
Auth::routes(['verify' => true]);
```
Một điều nữa là hãy chắc chắn bạn đã chạy **php artisan make:auth** để tạo các trang view cần thiết cho người dùng sau khi họ click vào link xác thực.
<br>
<br>
Cuối cùng, nếu bạn cần một số route chỉ cho phép đối với người dùng đã được xác thực, sử dụng **verified** middleware:
```php
Route::get('profile', function () {
    // Only verified users may enter...
})->middleware('verified');
```

# 3. Vô hiệu reset password
Mặc định **php artisan make:auth** sẽ tạo các trang Bootstrap đăng kí, đăng nhập cùng với một trang dùng để reset mật khẩu nếu bạn quên mật khẩu.
<br>
<br>
Tuy nhiên nếu bạn muốn vô hiệu hóa tính năng này và thêm vào các cơ chế khôi phục mật khẩu của riêng bạn, thêm tham số sau vào **routes/web.php**:
```php
Auth::routes(['reset' => false]);
```
**Mẹo nhỏ:** Bạn có thể gộp câu lệnh này chung với những câu lệnh mình đã giới thiệu bên trên và có:
```php
Auth::routes([
  'register' => false,
  'verify' => true,
  'reset' => false
]);
```

Về bản chất thực sự thì các route này đều được khai báo trong một method trong **vendor/laravel/framework/src/Illuminate/Routing/Router.php**:
```php
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

    // Email Verification Routes...
    if ($options['verify'] ?? false) {
        $this->emailVerification();
    }
}
```
#  4. Điều hướng sau khi đăng kí
Mặc định người dùng đăng kí mới sẽ được điều hướng tới URL **/home**. Tuy nhiên nếu bạn muốn thay đổi nó thì bạn có thể sửa trong file **app/Http/Controllers/Auth/RegisterController.php**, bạn chỉ cần thay đổi đường dẫn của biến **$redirectTo**:
```php
class RegisterController extends Controller
{
    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';
```
Tuy nhiên trong trường hợp bạn có nhiều logic phức tạp hơn là URL tĩnh, ví dụ như bạn muốn điều hướng tới nhiều URL dựa trên role của người dùng thì bạn có thể viết một method riêng trong class với tên là **redirectTo()**:
```php
protected function redirectTo()
{
    if (auth()->user()->role_id == 1) {
        return '/admin';
    }
    return '/home';
}
```
Method trên sẽ override thuộc tính **$redirectTo** kể cả khi nó có giá trị.
# 5. Thay đổi trường quy tắc validation
Mặc định Auth có 4 trường:
* name
* email
* password
* confirm password

Tất cả chúng đều được đặt rule là **required**, và những rule này được định nghĩa trong **app/Http/Controllers/Auth/RegisterController.php**:
```php
protected function validator(array $data)
{
    return Validator::make($data, [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
    ]);
}
```
Vì vậy nếu bạn muốn thay đổi bất kì rule nào, như yêu cầu password phức tạp hơn là chỉ 6 kí tự, chỉ cần chỉnh sửa phương thức **validator()**.

# 6. Vô hiệu tự động đăng nhập sau khi đăng kí
Một tính năng mặc định khác mà bạn có thể muốn thay đổi là tự động đăng nhập tức thì sau khi đăng kí thành công. Tuy nhiên, bạn có thể sẽ muốn điều hướng người dùng đến một trang thông báo thành công, hoặc đến trang yêu cầu xác thực và muốn họ đăng nhập sau khi xác thực.
<br><br>
Để làm điều này, bạn cần override phương thức **register()** của trait **RegistersUsers**.
<br><br>
Controller mà chúng ta nói ở trên là **RegisterController** sử dụng một Trait quan trọng là:
```php
class RegisterController extends Controller
{
    use RegistersUsers;
    // ... all other code of controller
```

Trait này thực hiện tất cả công việc để thực hiện việc đăng kí, đây là một phần core của framework, nằm ở **vendor/laravel/framework/src/Illuminate/Foundation/Auth/RegistersUsers.php**:

```php
trait RegistersUsers
{
    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        $this->guard()->login($user);

        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
    }
    
    // ... A few other methods
}
```

Để vô hiệu tự động đăng nhập, bạn cần xóa dòng sau:

```php
$this->guard()->login($user);
```

Tuy nhiên một điều quan trọng mình khuyến cáo là bạn **không nên sửa trực tiếp core của Laravel hay bất kì thứ gì bên trong /vendor**. Thay vào đó chúng ta có thể dùng cách khác là override phương thức trên và đặt vào trong **RegisterController** như sau:
```php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{

    // ... Other methods

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        return $this->registered($request, $user)
            ?: redirect($this->redirectPath());
    }
}
```

**Chú ý**: đừng quên khai báo thêm 2 dòng lệnh sau:
```php
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
```
Cuối cùng bạn nên quan tâm đến phương thức/thuộc tính **redirectTo** như đã nói ở bên trên để người dùng có thể được điều hướng đến đúng trang mong muốn.

# 7. Thêm mục vào form đăng kí
Ví dụ điển hình nhất của việc này đó là thêm một trường **surname** (họ) vào thông tin đăng kí của người dùng. Cần một số bước để thực hiện việc này:
### Bước 1: Thêm trường vào trong database.
Chỉ cần thêm dòng lệnh sau vào migration **create_users_table**:
```php
$table->string(‘surname’);
```
### Bước 2: Thêm trường vào fillable trong model User
Mặc định **app/User.php** như sau:
```php
protected $fillable = [
    'name', 'email', 'password',
];
```
Bạn cần thêm một phần tử **surname** vào trong mảng trên.
### Bước 3: Thêm trường vào form hiển thị
Bạn cần chỉnh sửa **resources/views/auth/register.blade.php** để thêm ô input cho trường surname của chúng ta, đơn giản chỉ cần copy-paste đoạn code input của trường name xuống ngay dưới, sửa đổi name thành surname.
```html
<div class="form-group row">
    <label for="surname" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

    <div class="col-md-6">
        <input id="surname" type="text" class="form-control{{ $errors->has('surname') ? ' is-invalid' : '' }}" name="surname" value="{{ old('surname') }}" required autofocus>

        @if ($errors->has('surname'))
            <span class="invalid-feedback" role="alert">
                <strong>{{ $errors->first('surname') }}</strong>
            </span>
        @endif
    </div>
</div>
```

### Bước 4: Tạo method create()

Công việc của bạn rất đơn giản, chỉ cần thêm một dòng code liên kết với surname vào method **RegisterController** như sau:
```php
protected function create(array $data)
{
    return User::create([
        'name' => $data['name'],
        'surname' => $data['surname'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
    ]);
}
```
Vậy là chúng ta đã hoàn thành thêm trường mới vào form đăng kí.

# 8. Đăng nhập với Username thay vì Email
Mặc định email là trường quan trọng nhất đối với người dùng, nó được sử dụng với **unique**, tức là định danh email được dùng để phân biệt các user với nhau. Giờ nếu như bạn muốn sử dụng một trường khác để đăng nhập, ví dụ như **username** thì sao?
<br><br>
Đầu tiên, bạn **phải tạo thêm trường mới vào trong database, model và view** như hướng dẫn bên trên.
<br><br>
Tiếp theo, hãy lướt qua một lượt **app/Http/Controllers/Auth/LoginController**, đặc biệt là trait sau:
```php
class LoginController extends Controller
{
    use AuthenticatesUsers;
    // ... All other code
```
Nếu bạn vào sâu hơn trong **/vendor/laravel/framework/src/Illuminate/Foundation/Auth/AuthenticatesUsers.php** bạn sẽ thấy method sau:
```php
/**
 * Get the login username to be used by the controller.
 *
 * @return string
 */
public function username()
{
    return 'email';
}
```
Bạn có thể thấy dễ dàng trường đăng nhập chỉ là một hằng được return bởi một method. Và nó được sử dụng trong validation và authentication:
```php
protected function validateLogin(Request $request)
{
    $request->validate([
        $this->username() => 'required|string',
        'password' => 'required|string',
    ]);
}
```
Vì vậy rất đơn giản bạn chỉ cần override lại method này vào trong **LoginController**, giống như trong hướng dẫn trước:
```php
class LoginController extends Controller
{
    use AuthenticatesUsers;
    // ... All other code

    public function username()
    {
        return 'username';
    }
}
```
# Tổng kết
Trên đây là một số custom cơ bản của Laravel Registration mình đã tìm hiểu được, với các tip trên các bạn có thể kết hợp và đào sâu hơn để custom các chức năng khác. Nếu có thắc mắc các bạn hãy để lại bình luận bên dưới nhé.