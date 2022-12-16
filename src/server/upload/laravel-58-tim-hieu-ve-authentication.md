> Bài này chúng ta sẽ cùng tìm hiểu về cách sử dụng Authentication trong laravel 5.8 nhé. 😃

## Introduction

Laravel giúp cho việc thực hiện việc xác thực vô cùng đơn giản. Trong thực tế, hầu hết mọi thứ đã được cấu hình cho bạn mà bạn đéo thể tưởng tượng nổi (out of the box). Các file cấu hình xác thực được đặt tại `config/auth.php`, bao gồm một số hướng dẫn tùy biến rõ ràng cho việc tinh chỉnh cách xử lí của các dịch vụ authentication.

Tại phần lõi của nó, các cơ sở của Laravel's authentication được tạo bởi các "guards" và "providers". Guards định nghĩa cái cách mà các user được xác thực cho mỗi request. Ví dụ, Laravel mang theo một `session` guard cái mà duy trì trạng thái bằng cách sử dụng session storage và cookies và một `token` guard, cái mà xác thực user bằng cách sử dụng một "API token" cái mà được truyền cùng mỗi request.

Providers định nghĩa cách mà user được truy xuất từ lưu trữ không đổi (persistent storage) của bạn. Laravel hỗ trợ cho việc truy xuất các user sử dụng Eloquent và Query Builder.

### Database Considerations

Mặc định, Laravel bao gồm một Eloquent model `App\User` trong thư mục `app`. Model này có thể sử dụng với Eloquent authentication driver mặc định.

Khi xây dựng database schema cho model `App\User`, đảm bảo rằng độ dài cột password tối thiểu là 60 kí tự, mặc định với 255 kí tự.

Bạn cũng nên xác nhận table `user` ( hoặc một table khác tương đương ) gồm một giá trị nullable, cột `remember_token` 100 kí tự. Cột này sẽ được dùng để lưu một token cho session "remember me" khi đang được duy trì bởi ứng dụng của bạn.

## Authentication Quickstart

Laravel mang tới 2 authentication controllers tuyệt vời, được đặt trong namespace `App\Http\Controllers\Auth`. `RegisterController` được sử dụng để đăng ký người dùng mới. `ForgotPasswordController`  xử lý các liên kết email để đặt lại mật khẩu và `ResetPasswordController` kiểm chứa logic để đặt lại mật khẩu.
Mỗi bộ điều khiển này sử dụng một đặc điểm để bao gồm các phương thức cần thiết của chúng. Đối với nhiều ứng dụng, bạn sẽ không cần phải sửa đổi các bộ điều khiển này.

### Routing

Laravel cung cấp một cách nhanh chóng để sinh ra toàn bộ các route và view cần thiết cho authentication chỉ với 1 command:
```
    php artisan make:auth
```
Command này nên được dùng trên các ứng dụng mới và sẽ cài đặt các view đăng kí và đăng nhập cũng như các route cho toàn bộ việc xác thực đầu cuối. Một `HomeController` cũng sẽ được sinh ra, phục vụ các request post-login tới ứng dụng. Tuy nhiên, bạn có thể tự do tùy chỉnh hoặc xóa controller này dựa trên sự cần thiết trong ứng dụng của bạn.

### Views

Như đã đề cập ở phần trên, command `php artisan make:auth` cũng sẽ tạo toàn bộ các view cần thiết cho việc xác thực và đặt chúng trong thư mục `resources/views/auth`.

Command `make:auth` cũng tạo một thư mục `resources/views/layouts` bao gồm các layout cơ bản cho ứng dụng. Toàn bộ những view này sử dụng framework Bootstrap CSS, nhưng bạn tự do tùy chỉnh nếu bạn thích.

### Authenticating

Bây giờ bạn có các route và view chuẩn bị cho các authentication controllers, bạn đã sẵn sàng để đăng kí và xác nhận những user mới cho ứng dụng. Bạn chỉ đơn giản truy cập ứng dụng thông qua trình duyệt. Các authentication controller đã sẵn sàng gồm các logic (thông qua trait của chúng) để xác nhận những user đã tồn tại và lưu những user mới vào database.

#### Path Customization

Khi một user được xác nhận thành công, họ sẽ được chuyển sang URI '/'. Bạn có thể tùy biến địa chỉ chuyển hướng post-authentication bằng cách định nghĩa thuộc tính `redirectTo` trong LoginController, RegisterController, ResetPasswordController &VerificationController:
```
    protected $redirectTo = '/';
 ```

Tiếp theo, bạn có thể sửa đổi RedirectIfAuthenticated middleware's để xử lý chuyển hướng người dùng


Nếu đường dẫn chuyển hướng cần logic cần tùy chỉnh, bạn có thể xác định phương thức redirectTo thay vì thuộc tính redirectTo:
```
protected function redirectTo()
{
    return '/path';
}
```

#### Username Customization
Bởi mặc định, Laravel sử dụng email cho authentication.Nếu bạn muốn tùy chỉnh bạn có thể định nghĩa username method trong LoginController:
```
public function username()
{
    return 'username';
}
```

Guard Customization
Bạn cũng có thể tùy biến "guard" cái mà sử dụng để xác thực user. Để bắt đầu, định nghĩa một thuộc tính `guard` trong LoginController, RegisterController, and  ResetPasswordController. 
Phướng thức sẽ trả về một thể hiện của guard.
```
use Illuminate\Support\Facades\Auth;

protected function guard()
{
    return Auth::guard('guard-name');
}
```

#### Validation / Storage Customization

Để thay đổi các trường trong form được yêu cầu khi người dùng đăng kí với ứng dụng của bạn, hoặc tùy biến các bản ghi user mới được chèn vào database như thế nào, bạn có thể chỉnh sửa class `RegisterController `. Class này chịu trách nhiệm việc valite và tạo user mới của ứng dụng.

Phương thức `validator` của `RegisterController ` bao gồm các luật validate cho user mới của ứng dụng. Bạn hoàn toàn tự do tùy chỉnh các phương thức này nếu bạn muốn.

Phương thức `create` của `RegisterController ` chịu trách nhiệm cho việc tạo bản ghi mới `App\User` trong database sử dụng . Bạn tự do chỉnh sửa những phương thức này cho phù hợp database.

### Retrieving The Authenticated User

Bạn có thể truy cập người dùng đã được xác thực thông qua facade `Auth`:

```
use Illuminate\Support\Facades\Auth;

// Get the currently authenticated user...
$user = Auth::user();

// Get the currently authenticated user's ID...
$id = Auth::id();
```

Ngoài ra, mội khi user đã được xác thực, bạn có thể truy cập thông qua môt instance `Illuminate\Http\Request`. Hãy nhớ, các class gợi ý sẵn sẽ tự động được thêm vào trong các phương thức của controller:
```
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Update the user's profile.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update(Request $request)
    {
        // $request->user() returns an instance of the authenticated user...
    }
}
```
#### Kiểm tra việc xác thực của User

Để xác định user đã đăng nhập vào ứng dụng của bạn hay chưa, bạn có thể sử dụng phương thức `check` trên face `Auth`, cái mà sẽ trả về `true` nếu user đã được xác thực:
```
    if (Auth::check()){
        // The user is logged in...
    }
```

### Protecting Routes

Route middlewarecó thể được sử dụng để cho phép chỉ những user đã được xác thực truy cập vào các route đã cho. Laravel mang tới middleware `auth`, cái mà được định nghĩa trong `app\Http\Middleware\Authenticate`. Toàn bộ những gì bạn cần là đính kèm middleware vào định nghĩa (khai báo) của route.

```

Route::get('profile', function () {
    // Only authenticated users may enter...
})->middleware('auth');
```

If bạn sử dụng controller, bạn có thể gọi phương thức `middleware` từ contructor của controller thay vì đính kèm nó
```
    public function __construct()
    {
        $this->middleware('auth');
    }
```
#### Redirecting Unauthenticated Users

Khi đính kèm middleware `auth` vào một route, bạn cũng có thể chỉ định guard nào sẽ được dùng để thực thi việc xác thực, login named route. Bạn có thể tùy chỉnh redirectTo function trong  app/Http/Middleware/Authenticate.php file:
```
/**
 * Get the path the user should be redirected to.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return string
 */
protected function redirectTo($request)
{
    return route('login');
}
```
### Specifying A Guard

Guard được chỉ định nên tương ứng với một trong các key trong mang `guards` của file cấu hình `auth.php`.
```
public function __construct()
{
    $this->middleware('auth:api');
}
```
### Login Throttling

Nếu bạn đang sử dụng lớp `LoginController ` được tích hợp trong Laravel, `Illuminate\Foundation'Auth\ThrottlesLogins` trait có thể được dùng để điều chỉnh các nỗ lực đăng nhập vào ứng dụng của bạn. Mặc định, người dùng sẽ không thể đăng nhập trong 1 phút nếu họ thất bại trong việc cung cấp thông tin chính xác một vài lần. Việc điều phối (throttling) này là duy nhất với một username / e-mail và địa chỉ IP của họ:

##Manually Authenticating Users

Tất nhiên, bạn không bắt buộc phải sử dụng các authentication controller trong Laravel. Nếu bạn lựa chọn xóa những controller này, bạn sẽ cần phải quản lí việc xác thực user bằng cách sử dụng các class Laravel xác thực trực tiếp. Đừng lo lắng, nó là chắc chắn rồi!

Chúng ta sẽ truy cập vào các Laravel's authentication services thông qua facade `Auth`, vì vậy chúng ta cần đảm bảo import facade `Auth` tại đầu class. Tiếp theo, hãy kiểm tra phương thức `attempt`:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return redirect()->intended('dashboard');
        }
    }
}
```

Phương thức `attempt` chấp nhận một mảng các cặp key / value như là tham số đầu tiên. Các giá trị trong mảng sẽ được dùng để tìm user trong database. Vì vậy trong ví dụ trên, user sẽ được lấy ra bởi giá trị của cột `email`. Nếu tìm thấy user, hashed password được lưu trong database sẽ được dùng để so sánh với giá trị hashed `password` mà được truyền vào phương thức thông qua mảng. Nếu 2 hashed passowrd trùng hợp, một session sẽ được bắt đầu cho user.

Phương thức `attemp` sẽ trả về `true` nếu xác thực thành công. Ngược lại là false.

Phương thức `intended` trên redirector sẽ chuyển hướng user tới URL họ vừa cố gắn truy cập trước khi bị bắt bởi authentication filter. Một fallback URI có thể được cho trước vào phương thức này trong trường hợp đích đến dự kiến không có.

#### Specifying Additional Conditions

Nếu muốn, bạn cũng có thể thêm những điều kiện mở rộng vào truy vấn xác thực. Ví dụ, chúng ta có thể xác nhận xem user đã được đánh dấu như "active":
```
    if (Auth::attempt(['email' => $email, 'password' => $password, 'active' => 1])) {
        // The user is active, not suspended, and exists.
   }
   ```

#### Accessing Specific Guard Instances

Bạn có thể chỉ định các guard instance bạn thích để làm việc bằng cách dùng phương thức `guard` trên facade `Auth`. Điều này cho phép bạn quản lí việc xác thực cho những thành phần khác nhau trong ứng dụng bằng cách sử dụng trọn vẹn các model có khả năng xác thực tách biệt hoặc các table user.

Tên của guard truyền vào phương thức `guard` nên tương ứng với một trong các guard được cấu hình trong file `auth.php`:
```
    if (Auth::guard('admin')->attempt($credentials)) {
        //
    }
```
#### Logging Out

Để đăng xuất người dùng khỏi ứng dụng của bạn, bạn có thể sử dụng phương thức `logout` trên facade `Auth`. Việc này sẽ xóa toàn bộ thông tin xác thực trong session của user:
```
    Auth::logout();
```
### Remembering Users

Nếu bạn muốn cung cấp chức năng "remember me" trong ứng dụng, bạn có thể truyền một giá trị boolean như tham số thứ 2 vào phương thức `attempt`, cái mà sẽ giữ cho người dùng đã được xác thực vô thời hạn, hoặc tới khi họ đăng xuất thủ công. Tất nhiên, table `users` phải có một cột tring `remember_token`, cái mà sẽ được dùng để lưu token "remember me".
```
    if (Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
        // The user is being remembered...
    }
```

Nếu bạn "remembering" người dùng, bạn có thể dùng phương thức `viaRemember` để xác định nếu user đã được xác thực bằng cách dùng cookie "remember me":
```
    if (Auth::viaRemember()) {
        //
    }
```
### Other Authentication Methods

Nếu bạn cần đăng nhập một user instance đang tồn tại vào ứng dụng, bạn có thể gọi phương thức `login` với user instance. Đối tượng đã cho phải là một imlementation của `Illuminate\Contracts\Auth\Authenticatable` contract. Tất nhiên, model `App\User` của Laravel đã implement interface này rồi:
```
    Auth::login($user);

    // Login and "remember" the given user...
    Auth::login($user, true);
```
Tất nhiên, bạn có thể chỉ định guard instance bạn muốn sử dụng:
```
    Auth::guard('admin')->login($user);
```
### Authenticate A User By ID

Để đăng nhập một user vào ứng dụng bằng ID của họ, bạn có thể sử dụng phương thức `loginUsingId`. Phương thức này chấp nhận primary key của của user bạn muốn để xác thực:
```
    Auth::loginUsingId(1);

    // Login and "remember" the given user...
    Auth::loginUsingId(1, true);
```
####Authenticate A User Once

Bạn có thể sử dụng phương thức `once` để đăng nhập một user vào ứng dụng cho một single request. Không có session hay cookie được tạo ra, cái có thể hữu ích khi xây dựng stateless API (khác với stateful API, stateless API không lưu trạng thái của từng người dùng truy cập vào ứng dụng). Phương thức `once` có cách dùng tương tự như phương thức `attempt`:
```
    if (Auth::once($credentials)) {
        //
    }
```

## HTTP Basic Authentication

HTTP Basic Authentication cung cấp một cách nhanh chóng để xác thực người dùng của ứng dụng của bạn mà không cần phải thiết lập một trang "login" tách biệt. Để bắt đầu, đính kèm `auth.basic` middleware vào route của bạn. Middleware `auth.basic` được bao gồm trong Laravel framework, vì vậy bạn không cần phải định nghĩa nó:
```
    Route::get('profile', ['middleware' => 'auth.basic', function() {
        // Only authenticated users may enter...
    }]);
```
Một khi middleware đã được đính kèm vào route, bạn sẽ tự động được nhắc nhở về các thông tin khi truy cập vào route trên trình duyệt. Mặc định, middleware `auth.basic` sẽ dùng cột `email` trên các bản ghi user như là "username".

#### A Note On FastCGI

Nếu bạn đang sử dụng PHP FastCGI, HTTP Basic authentication có thể không hoạt động chính xác. Những dòng sau nên được thêm vào trong file `.htaccess` của bạn:
```
    RewriteCond %{HTTP:Authorization} ^(.+)$
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
```
### Stateless HTTP Basic Authentication

Bạn cũng có thể sử dụng HTTP Basic Authentication mà không cần thiết lập một cookie định danh người dùng trong session, cái mà là một thành phần hữu ích cho API authentication. Việc tiếp theo, Định nghĩa một middleware cái mà gọi phương thức `onceBasic`. Nếu không có response nào được trả về bởi phương thức `onceBasic`, request có thể được chuyển vào trong ứng dụng:
```
    <?php

    namespace Illuminate\Auth\Middleware;

    use Auth;
    use Closure;

    class AuthenticateOnceWithBasicAuth
    {
        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */
        public function handle($request, Closure $next)
        {
            return Auth::onceBasic() ?: $next($request);
        }

    }
```
Tiếp theo Đăng kí route middleware và đính kèm nó vào một route:
```
  Route::get('api/user', function () {
    // Only authenticated users may enter...
})->middleware('auth.basic.once');
```
### Logging Out
Để đăng xuất khỏi ứng dụng method  loguot của Auth facade
```
use Illuminate\Support\Facades\Auth;

Auth::logout();
```

#### Invalidating Sessions On Other Devices
Laravel cung cấp  cơ chế vô hiệu hóa "logging out"  một user sesion với các thiết bị khác. Trước khi bắt đầu, bạn nên chắc chắn rằng Illuminate\Session\Middleware\AuthenticateSession middlewarelà tham gia un-commented in your app/Http/Kernel.php class' web middleware group:
```
'web' => [
    // ...
    \Illuminate\Session\Middleware\AuthenticateSession::class,
    // ...
],
```
Bạn có thể sử dung logoutOtherDevices method của Auth facade. Phương thức này yêu cầu user cung cấp pasword hiện tại, phần input vào từ form.
```
use Illuminate\Support\Facades\Auth;

Auth::logoutOtherDevices($password);
```
## Adding Custom Guards

Bạn có thể định nghĩa các authentication guard của bạn bằng cách sử dụng phương thức `extend` trên facade `Auth`. Bạn nên đặt lời gọi này tới `provider` cùng với một provider:
```
    <?php

    namespace App\Providers;

    use Auth;
    use App\Services\Auth\JwtGuard;
    use Illuminate\Support\ServiceProvider;

    class AuthServiceProvider extends ServiceProvider
    {
        /**
         * Perform post-registration booting of services.
         *
         * @return void
         */
        public function boot()
        {
            Auth::extend('jwt', function($app, $name, array $config) {
                // Return an instance of Illuminate\Contracts\Auth\Guard...

                return new JwtGuard(Auth::createUserProvider($config['provider']));
            });
        }

        /**
         * Register bindings in the container.
         *
         * @return void
         */
        public function register()
        {
            //
        }
    }
```
Như bạn có thể thấy trong ví dụ trên, callback được truyền vào phương thức `extend` trả về một implementation của `Illuminate\Contracts\Auth\Guard`. Interface này bao gồm vài phương thức bạn sẽ cần để implement để định nghĩa một custom guard.

Một khi custom guard của bạn được định nghĩa, bạn có thể sử dụng guard trong cấu hình `guards`:
```
    'guards' => [
        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
        ],
    ],
```
## Adding Custom User Providers


Nếu bạn đang không sử dụng các cơ sở dữ liệu quan hệ truyền thống để lưu trữ user, bạn sẽ cần phải mở rộng Laravel với authentication user provider của bạn. Chúng ta sẽ dùng phương thức `provider` trên facade `Auth` để định nghĩa một custom user provider. Bạn cần đặt lời gọi tới `provider` trong một service provider
```
    <?php

    namespace App\Providers;

    use Auth;
    use App\Extensions\RiakUserProvider;
    use Illuminate\Support\ServiceProvider;

    class AuthServiceProvider extends ServiceProvider
    {
        /**
         * Perform post-registration booting of services.
         *
         * @return void
         */
        public function boot()
        {
            Auth::provider('riak', function($app, array $config) {
                // Return an instance of Illuminate\Contracts\Auth\UserProvider...
                return new RiakUserProvider($app['riak.connection']);
            });
        }

        /**
         * Register bindings in the container.
         *
         * @return void
         */
        public function register()
        {
            //
        }
    }
```
Sau khi bạn đã đăng kí provider với phương thức `provider`, bạn có thể chuyển sang user provider mới trong file cấu hình `config/auth.php`. Đầu tiên, định nghĩa một `provider` mà sử dụng driver mới của bạn:
```
    'providers' => [
        'users' => [
            'driver' => 'riak',
        ],
    ],
```
Sau đó bạn có thể sử dụng provider này trong cấu hình `guards`:
```
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],
```
### The User Provider Contract

Các implementation `Illuminate\Contracts\Auth\UserProvider` chỉ chịu trách nhiệm cho việc lấy `Illuminate\Contracts\Auth\Authenticatable` implementation khỏi một persistent storage system, như là MySQL, Riak, etc. 2 interface này cho phép các cơ chế Laravel authentication tiếp tục hoạt động bất kể dữ liệu user được lưu trữ như thế nào hoặc kiểu của các lớp sử dụng để đại diện nó.

Hãy nhìn qua contract `Illuminate\Contracts\Auth\UserProvider`:
```
    <?php

    namespace Illuminate\Contracts\Auth;

    interface UserProvider {

        public function retrieveById($identifier);
        public function retrieveByToken($identifier, $token);
        public function updateRememberToken(Authenticatable $user, $token);
        public function retrieveByCredentials(array $credentials);
        public function validateCredentials(Authenticatable $user, array $credentials);

    }

```
Hàm `retrieveById` thông thường nhận một key đại diện cho user, như là một auto-incrementing ID từ MySQL database. Implementation `Authenticatable` tìm kiếm ID sẽ được lấy và trả về bởi phương thức.

Hàm `retrieveByToken` truy xuất một user bằng `$identifier` của họ và `$token` "remember me", được lưu trong trường `remember_token`. Giống như với phương thức trước, implementation `Authenticatable` implementation sẽ được trả về.

Hàm `updateRememberToken` cập nhật `$user` trường `remember_token` với `$token` mới. Token mới có thể là một token hoàn toàn mới, được gán bởi một đăng nhập "remember me" thành công, hoặc null khi user đăng xuất.

Hàm `retrieveByCredentials` nhận mảng các credentials truyền vào phương thức `Auth:attempt` khi xảy ra đăng nhập vào ứng dụng. Phương thức sau đó "query" underlying persistent storage cho việc tìm kiếm các credentials phù hợp. Cơ bạn, phương thức này sẽ chạy 1 truy vấn với điều kiện "where" trên `$credentials['username']`. Phương thức sau đó trả về một implementation của `UserInterface`.  Phương thức này không nên cố gắng validate hay xác thực mật khẩu.

Phương thức `validateCredentials` so sánh `$user` với `$credentials` để xác thực user. Ví dụ, phương thức này có thể so sánh chuỗi `$user->getAuthPassword()` tới `Hash::make`  của `$credentials['password']`. Phương thức này chỉ validate user's credentials và trả về boolean.

### The Authenticatable Contract

Bây giờ chúng ta đã khám phá từng phương thức trong `UserProvider`, hãy xem qua `Authenticatable` contract. Nhớ rằng, provider nên trả về các implementations của interface này từ phương thức `retrieveById` và `retrieveByCredentials`:
```
    <?php

    namespace Illuminate\Contracts\Auth;

    interface Authenticatable {

        public function getAuthIdentifierName();
        public function getAuthIdentifier();
        public function getAuthPassword();
        public function getRememberToken();
        public function setRememberToken($value);
        public function getRememberTokenName();

    }
    
```
Interface này là đơn giản. Phương thức `getAuthIdentifierName` trả về tên của trường "primary key" của user và `getAuthIdentifier` trả về "primary key" của user. Trong MySQL back-end sẽ là auto-incrementing primary key. `getAuthPassword` trả về password đã được hashed. Interface này cho phép hệ thống xác thực làm việc với bất kì lớp User nào, bất kể ORM nào hay các lớp lưu trữ trừu tượng (storage abstraction layer) nào bạn đang sử dụng. Mặc định, Laravel bao gồm một class `User` trong thư mục `app` cái mà implement interface này, vì vậy bạn có thể tham khảo class này như một ví dụ.

## Events

Laravel xây dựng một loạt events khác nhau trong khi xử lí xác thực. Bạn có thể đính kèm các listener vào những event này trong `EventServiceProvider` của bạn:
```
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Illuminate\Auth\Events\Attempting' => [
            'App\Listeners\LogAuthenticationAttempt',
        ],

        'Illuminate\Auth\Events\Login' => [
            'App\Listeners\LogSuccessfulLogin',
        ],

        'Illuminate\Auth\Events\Logout' => [
            'App\Listeners\LogSuccessfulLogout',
        ],

        'Illuminate\Auth\Events\Lockout' => [
            'App\Listeners\LogLockout',
        ],
    ];
```

Bài viết của mình đến đây là hết hẹn gặp lại các bạn ở các bài viết tiếp theo. 😄

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/Laravel

https://laravel.com/docs/5.8/authentication