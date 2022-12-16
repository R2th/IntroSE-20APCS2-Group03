## Giới thiệu
Từ bản Laravel 7.x trở lên, Laravel đã giới thiệu Sanctum là một official package. Nó cung cấp một hệ thống xác thực đơn giản để phát triển SPA, mobile apps và token-based authentication dành cho APIs. Sanctum cho phép user tạo nhiều API tokens cho tài khoản của họ. Các tokens này có khả năng chỉ định các actions mà user đó có thể thực hiện được khi sử dụng chúng. 

Sanctum giải quyết 2 vấn đề:

1. **API Tokens**
- Sanctum sẽ sinh ra API tokens cho người dùng mà không cần đến sự phức tạp của Oauth. Nó giống như tính năng "access tokens" của GitHub. Hãy tưởng tượng ứng dụng của bạn trong phần cài đặt tài khoản có màn hình nơi user có thể tạo API token cho tài khoản của họ. Bạn có thể sử dụng Sanctum để tạo và quản lý các tokens này. Những tokens này thường có thời gian hết hạn rất dài (tính bằng năm) nhưng user có thể hủy bỏ chúng bất cứ lúc nào. 
- Laravel Sanctum cung cấp tính năng này bằng cách lưu trữ API tokens của user trong một bảng cơ sở dữ liệu duy nhất và xác thực các requests thông qua API token hợp lệ được gắn trên Authorization header.

2. **SPA Authentication**
- Sanctum cung cấp một cách đơn giản để xử lý việc xác thực trong các SPA cần giao tiếp với API được hỗ trợ bởi Laravel. Các SPA này có thể tồn tại trong cùng một kho lưu trữ như ứng dụng Laravel của bạn hoặc có thể là một kho lưu trữ hoàn toàn riêng biệt, chẳng hạn như SPA được tạo bằng Vue CLI.

- Đối với tính năng này, Sanctum không sử dụng bất kỳ loại token nào. Thay vào đó, Sanctum sử dụng các dịch vụ xác thực phiên dựa trên cookie được tích hợp sẵn của Laravel. Điều này cung cấp các lợi ích của CSRF protection, session authentication, cũng như bảo vệ chống rò rỉ thông tin xác thực qua XSS. Sanctum sẽ chỉ cố gắng xác thực bằng cookie khi request bắt nguồn từ giao diện người dùng SPA của bạn.


Phía trên là phần giới thiệu qua về package này. Còn hôm nay, chúng ta sẽ cùng xây dựng một ứng dụng demo đơn giản sử dụng Sanctum nhé.
### 1. Tạo project và cài đặt package Sanctum
Yêu cầu:

* Laravel 7.x trở lên
* Composer
* Postman

Tạo 1 project laravel bằng câu lệnh

```
composer create-project --prefer-dist laravel/laravel:^7.0 sanctum
```

Cài đặt Laravel Sanctum:

```
composer require laravel/sanctum
```

Tiếp theo, publish file config và migration của Sanctum:
```
php artisan vendor:publish --provider=”Laravel\Sanctum\SanctumServiceProvider”
```

Đừng quên migrate database và seed data để test nha

```
php artisan migrate --seed
```

Sử dụng middleware `EnsureFrontendRequestsAreStateful` của Sanctum bằng cách thêm vào trong file `app/Http/Kernel.php`


```php
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
    ...
    protected $middlewareGroups = [
        ...
        
        'api' => [
            EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
```

Hãy thêm trait `HasApiTokens` cho model mà bạn muốn sử dụng. Trong project này mình sử dụng model `User`

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    ...
}
```

### 2. Tạo AuthController
Sanctum tạo API tokens bằng method `createToken`. Chúng sẽ được hash bằng hàm SHA-256 trước khi lưu vào database và chúng ta có thể lấy ra sử dụng thông qua property `plainTextToken`


```php
$token = $user->createToken('token-name');

return $token->plainTextToken;
```

Việc tạo API tokens tất nhiên là dùng để đăng nhập rồi

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'email|required',
                'password' => 'required'
            ]);

            $credentials = request(['email', 'password']);

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'status_code' => 500,
                    'message' => 'Unauthorized'
                ]);
            }

            $user = User::where('email', $request->email)->first();

            if (!Hash::check($request->password, $user->password, [])) {
                throw new \Exception('Error in Login');
            }

            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'status_code' => 500,
                'message' => 'Error in Login',
                'error' => $error,
            ]);
        }
    }
}
```

Chúng ta có thể thu hồi những token này bằng cách xóa trong database nhưng tất nhiên là sử dụng method có sẵn:

```php
// Revoke all tokens...
$user->tokens()->delete();

// Revoke the user's current token...
$request->user()->currentAccessToken()->delete();    

// Revoke a specific token...
$user->tokens()->where('id', $id)->delete();
```

### 3. Tạo route API

Trong laravel, route API sẽ được khai báo trong `routes/api.php`

```php
Route::post('/login', 'AuthController@login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', 'UserController@index');
});
```

Với tất cả các route có sử dụng middleware Sanctum thì khi gửi request sẽ phải bao gồm cả header Authorization dạng

```
Authorization = Bearer [API token]
```

Ví dụ cách cấu hình trong Postman
![](https://images.viblo.asia/9f369202-b1cf-4120-9aa3-05c8a6a1cd66.png)


### 4. Chạy demo 

Chức năng `login`:

![](https://images.viblo.asia/16a55774-217b-4ea9-a704-d37c810594e6.png)


Lúc này chúng ta đã có token để sử dụng cho các chức năng khác.

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::all(),
        ]);
    }
}
```

Test route GET `/users`

![](https://images.viblo.asia/39ee2e8d-d1b6-4af4-b54f-c19fd8a5eec7.png)


## Tổng kết

Trên đây mình đã giới thiệu và demo về package Laravel Sanctum dùng để xác thực Authentication trong việc xây dựng API. Hy vọng bài viết sẽ giúp ích cho các bạn trong quá trình học tập và làm việc.

Cảm ơn các bạn đã đọc bài :*

Nguồn tham khảo:

* https://medium.com/@julianorozco/laravel-7-create-an-api-and-authenticate-it-with-sanctum-3e7f07733f5b
* https://laravel.com/docs/7.x/sanctum