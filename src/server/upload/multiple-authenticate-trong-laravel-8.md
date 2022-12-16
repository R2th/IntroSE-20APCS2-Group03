*Như các bạn biết mỗi một hệ thống website thông thường sẽ có một hệ thống cho **Admin** quản trị và một hệ thống dành cho **User** thông thường sử dụng, chính vì thế các website rất cần sử dụng **Multiple Authenticate**. Hãy cùng mình tìm hiểu cách xây dựng chúng trong Laravel nhé!*

# I. Chuẩn bị Project
## 1. Tạo project
Tạo một project laravel bằng composer với câu lệnh

```shell
composer create-project --prefer-dist laravel/laravel multiple-auth
```

## 2. Cơ sở dữ liệu
###  a. File `.env`
Mở project lên và thực hiện chỉnh sửa file `.env` để kết nối cơ sở dữ liệu. Ở đây mình dùng **`mysql`**
```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<database_name>
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

Trong đó, 
- `<database_name>` là tên cơ sở dữ liệu của bạn tạo ra ở **mysql**, 
- `<username>` là tên đăng nhập để truy cập vào database, thông thường `<username>` là `root`.
- `<password>` là mật khẩu để truy cập vào database, thông thường `<password>` trống, nếu bạn có đặt mật khẩu thì thay thế bằng mật khẩu bạn đã cấu hình.

###  b. Cấu trúc các bảng
Để sử dụng được multiple authenticate chúng ta cần hai bảng admins và users để lưu thông tin đăng nhập cho hai loại đối tượng này.

#### Admins
Tạo bảng `admins` bằng cách dùng migration

```shell
php artisan make:migration create_admins_table --create=admins
```

Chạy câu lệnh trên để tạo một migration mới cho bảng **`admins`** và thêm các cột gồm: **id, email, password, timestamps**

```php
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }
```

#### Users
Bảng **`users`** cũng có cấu trúc tương tự với bảng **`admin`** nên chúng ta có thể dùng mặc định của laravel đã tạo ra.

Chạy câu lệnh `migrate` để tạo các bảng
```shell
php artisan migrate
```

### c. Seed dữ liệu

Mở file **`database\seeders\DatabaseSeeder.php`** và sửa

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        DB::table('admins')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
            ]
        ]);

        DB::table('users')->insert([
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'password' => bcrypt('admin123'),
            ]
        ]);
    }
}
```

Chạy lệnh sau để seed dữ liệu

```shell
php artisan db:seed
```
## 3. Tạo và cấu hình Models
Trong thư mục **`app\Models`** có sẵn file **`User.php`** và tạo thêm file **`Admin.php`**  tương ứng với hai bảng trên.

**app/Models/Admin.php**

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'admins';

    protected $guarded = 'admin';

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}

```

**app/Models/User.php**

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}

```
# II. Multiple Authenticate
Vậy là đã xong phần chuẩn bị cơ bản. Bây giờ chúng ta sẽ thực hiện làm nhiều luồng xác thực cho trang web.
## 1. Guard
Trong Laravel, Authentication có thể định nghĩa được nhiều guard, mỗi guard tương ứng với một thành phần xác thực khác nhau. Với demo này mình cần hai cái đối tượng là user và admin.

Mở file **`config\auth.php`** ra và chúng có thể thấy guard được config ở trong đây. Laravel đã làm sẵn cho chúng ta 2 guard user và api, bây giờ chúng ta làm thêm một cái cho admin nữa là được.

Tìm đến phần **`guards`** và sửa thành như sau:

```php
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],
```

Đoạn code trên thì guard cho **`user`** được config mặc định là **`web`**.

Tiếp theo, kéo xuống phần **`providers`** và sửa:

```php
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class, 
        ],
    ],
```
## 2. Routes
Thông thường các **route** của hai trang này có thể viết chung một file route là **`web.php`** cũng được nhưng theo mình nghĩ thì chúng ta nên tách thêm một cái file route dành riêng cho admin thì sẽ dễ dàng sử dụng hơn.

Trong folder route tạo một file **`admin.php`** và config để các route được khai báo trong file này có thể chạy được đúng cách.

Mở file **`app/Providers/RouteServiceProvider.php`** và sửa như sau:

```php
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));

            Route::middleware('web')
                ->prefix('admin')
                ->namespace($this->namespace)
                ->group(base_path('routes/admin.php'));
        });
    }
```

Trên đây mình đã định nghĩa một nhóm route có prefix là admin nằm trong file **`routes/admin.php`** rồi, như vậy trong file **`route/admin.php`** thay vì địng nghĩa đường link `admin/login` thì mình chỉ cần định nghĩa chúng với đường link `/login` tương tự như bên web.

Định nghĩa các route cho admin trong file **`routes/admin.php`**

```php
<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\HomeController;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/login', [LoginController::class, 'login'])->name('admin.login');
Route::middleware('auth:admin')->group(function (){
    Route::get('/', [HomeController::class, 'index'])->name('dashboard');
});
```

Với route này khi bạn truy cập đường dẫn /admin nó sẽ tìm tới controller app/Controller/Admin/HomeController và thực hiện các hành động trong hàm index. Middleware phải là auth:admin (middleware này thực hiện với guard là admin).

Định nghĩa các route cho admin trong file **`routes/web.php`**

```php
<?php

use App\Http\Controllers\User\Auth\LoginController;
use App\Http\Controllers\User\HomeController;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/login', [LoginController::class, 'login'])->name('login');
Route::middleware('auth')->group(function (){
    Route::get('/', [HomeController::class, 'index'])->name('home');
});

```

Phần route user cũng như vậy nhưng chỉ cần dùng middleware auth là được rồi, mặc định của laravel sẽ thực hiện với guard web (trỏ vào user).
## 3. Controllers
### a. Admin
Tạo LoginController cho guard admin bằng lệnh
```shell
php artisan make:controller Admin/Auth/LoginController
```

Sửa file **`app\Http\Controllers\Admin\Auth\LoginController.php`** như dưới đây

```php
<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if ($request->getMethod() == 'GET') {
            return view('admin.auth.login');
        }

        $credentials = $request->only(['email', 'password']);
        if (Auth::guard('admin')->attempt($credentials)) {
            return redirect()->route('dashboard');
        } else {
            return redirect()->back()->withInput();
        }
    }
}
```

Tạo HomeController cho guard admin bằng lệnh
```shell
php artisan make:controller Admin/HomeController
```

Sửa file **`app\Http\Controllers\Admin\HomeController.php`** như dưới đây

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::guard('admin')->user();
        echo 'Xin chào Admin, '. $user->name;
    }
}

```
### b. User
Tạo LoginController cho guard user bằng lệnh
```shell
php artisan make:controller User/Auth/LoginController
```

Sửa file **`app\Http\Controllers\User\Auth\LoginController.php`** như dưới đây

```php
<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if ($request->getMethod() == 'GET') {
            return view('user.auth.login');
        }

        $credentials = $request->only(['email', 'password']);
        if (Auth::attempt($credentials)) {
            return redirect()->route('home');
        } else {
            return redirect()->back()->withInput();
        }
    }
}

```

Tạo HomeController cho guard user bằng lệnh

```shell
php artisan make:controller User/HomeController
```

Sửa file **`App\Http\Controllers\User\HomeController.php`** như dưới đây

```php
<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        echo 'Xin chào User, '. $user->name;
    }
}

```
## 4. Giao diện Login

Dựng giao diện cho các trang mà nãy giờ chúng ta gọi đến trong controller. Trong bài viết này mình chỉ dựng giao diện đơn giản. Mỗi bạn có một cách riêng có thể tự dựng hoặc dùng themes tùy mọi người.

Tạo file giao diện login cho guard admin trong **`resoures/view/admin/auth/login.blade.php`**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
</head>
<body>
<form method="POST" action="{{ route('admin.login') }}">
    @csrf
    <h1>Admin</h1>
    <input type="text" name="email" placeholder="Nhập địa chỉ email">
    <input type="password" name="password" placeholder="Nhập mật khẩu">
    <button type="submit">Đăng nhập</button>
</form>
</body>
</html>

```

Tương tự tạo file giao diện login cho guard user trong **`resoures/view/user/auth/login.blade.php`**

```html
<!DOCTYPE html>
<html>
<head>
    <title>User Login</title>
</head>
<body>
<form method="POST" action="{{ route('login') }}">
    @csrf
    <h1>User</h1>
    <input type="text" name="email" placeholder="Nhập địa chỉ email">
    <input type="password" name="password" placeholder="Nhập mật khẩu">
    <button type="submit">Đăng nhập</button>
</form>
</body>
</html>

```

# III. Tổng kết
Chạy lệnh sau và mở trình duyệt để test thành quả nào

```shell
php artisan serve
```

Như vậy là mình vừa hướng dẫn xong các bạn cách xây dựng Multiple Authenticate trong Laravel. Hy vọng bài viết này có thể giúp ích cho mọi người :hearts::hearts::hearts:

# IV. Tài liệu tham khảo
> https://pusher.com/tutorials/multiple-authentication-guards-laravel

> https://viblo.asia/p/multiple-authenticate-trong-laravel-XL6lANJm5ek