# Giới thiệu
Trong thời buổi nhà nhà dùng API người người viết API, thì tôi một con người hóng hớt cũng mày mò để thử viết API trên 1 framework khá phổ biến là laravel. Và cũng như đi xe bus thì có ông bán vé kiêm luôn soát vé. Thì API cũng cần 1 ông nào đó để kiểm tra xem bạn đã có vé chưa mà đòi đi xe :D.
Trong bài viết này tôi xin giới thiệu đến 1 ông soát vé tuy lớn tuổi nhưng vẫn làm việc một cách ổn định là JWT (json web token). Do thời lượng chương trình có hạn nên bài viết chỉ có cách ứng dụng jwt vào authen trong laravel (như tên bài viết) chứ không nói về các định nghĩa xem JWT là gì nhé (yaoming).
# Install & Config
Điều đầu tiên chúng ta sẽ làm là tạo ra một ứng dụng `laravel` để thử nghiệm `JWT`. Nếu bạn có `Laravel installer`, bạn có thể chạy lệnh sau:
>  $ laravel new laravel-jwt 

Hoặc nếu bạn dùng composer 
> $ composer global require "laravel/installer"

Tiếp theo là chọn 1 package để hỗ trợ auth 1 cách dễ dàng. Đoạn này giống như chọn ông bán vé xe vậy :D. Sau 1 cú gg search tôi đã chọn `tymon/jwt-auth`. Chạy lệnh dưới để install package
>    $ composer require tymon/jwt-auth:dev-develop --prefer-source

Mở file `config/app.php` và thêm  `provider`  sau vào mảng `providers`:
>    Tymon\JWTAuth\Providers\LaravelServiceProvider::class,

Thêm các `facades` sau vào mảng `aliases`:

>    'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class, 
>    
>    'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class,

Tiếp đó, Ta copy file `config/jwt.php` từ trong `vendor` sang thư mục `app/config ` :
>  $ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

Khi đã xong ta đặt secret jwt-auth bằng cách chạy lệnh sau:
>   $ php artisan jwt:secret

Ta cần làm cho modal `User implement JWT`. Mở tệp `app / User.php `và thay thế nội dung bằng:

```
<?php

    namespace App;

    use Illuminate\Notifications\Notifiable;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Tymon\JWTAuth\Contracts\JWTSubject;

    class User extends Authenticatable implements JWTSubject
    {
        use Notifiable;

        /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $fillable = [
            'name', 'email', 'password',
        ];

        /**
         * The attributes that should be hidden for arrays.
         *
         * @var array
         */
        protected $hidden = [
            'password', 'remember_token',
        ];

        public function getJWTIdentifier()
        {
            return $this->getKey();
        }
        public function getJWTCustomClaims()
        {
            return [];
        }
    }
```
Cuối cùng ta đăng kí middleware trong file `app/Http/Kernel.php` nhé
>  'auth.jwt'  =>  \Tymon\JWTAuth\Http\Middleware\Authenticate::class, // JWT middleware
# Tạo mới Data

 Bỏ qua phần config DB trong file`.env` nhé. Giờ ta sẽ tạo `seeder` để fake data cho user nhé. 

Tạo mới `UserSeeder` bằng lệnh sau
> php artisan make:seeder UserSeeder

Mở file `database/seeds/UserSeeder.php` và thêm dòng code sau vào function `run`: 
> factory(App\User::class, 10)->create();

Ý nghĩa của đoạn này sẽ là tạo 10 record  `User` nhé

Cuối cùng sẽ chạy lệnh run seeder để tạo mới data:
> php artisan db:seed --class=UserSeeder


Và giờ, DB đã có data để cho ta test rồi :D

# Tạo mới Controller
Chạy lệnh sau để tạo mới controller
> php artisan make:controller APIController

Mở file `APIController` và sửa lại
```
<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class APIController extends Controller
{
    /**
     * @var bool
     */
    public $loginAfterSignUp = true;

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $token = null;

        if (!$token = JWTAuth::attempt($input)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }

        return response()->json([
            'status' => true,
            'token' => $token,
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'status' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'status' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }
}

```

Giải thích 1 chút nhé :
Trong `APIController`  có 2 fuction là `login` và `logout` .
Trong function `login` thì sử dụng cơ chế `Auth` của `JWTAuth` . User sẽ post thông tin gồm email và password. JWTAuth sẽ check nếu thông tin đăng nhập đúng thì sẽ tạo ra 1 token mà thông qua token này ta có thể thao tác với API trong các lần tiếp theo.
Trong function `logout` thì ngược lại kiển tra xem token có hợp lệ không. Nếu đúng thì xóa chúng đi. Nói là xóa nhưng thật ra nó chỉ cho token vào 1 `blackList` để nếu đã logout ra r thì sẽ không sử dụng được token cũ để thao tác vs API nữa.

Tiếp đó, mình tạo thêm controller để thao tác với `User` trong DB.
Make controller với lệnh sau
> php artisan make:controller UserController

Trong file này ta thêm vào function `index` như sau :
```
    public function index()
    {
        $users = User::all();

        return response()->json($users, 200);
    }
```
# Tạo mới Router
Mở file `routes/api.php` và thêm vào các route sau :

```
Route::post('login', 'APIController@login');

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('logout', 'APIController@logout');
    Route::get('users', 'UserController@index');
});
```

Ta có thêm `'middleware' => 'auth.jwt'` cho route` logout` và `users` check xem token đăng nhập có hợp lệ không.
# Kết luận

Có câu `Có làm thì mới có ăn..`, chúng ta đã làm rồi. Và bây giờ là lúc `ăn`.  Mở postman ra và cảm nhận bạn nhớ =)).

 **Chú ý** : Trong postman bạn sử dụng URL là `/api/login` tương tự với các route khác nhé.