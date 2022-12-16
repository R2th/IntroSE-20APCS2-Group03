# Giới thiệu
Đối với nhiều bạn mới ra trường thì API có thể là một khái niệm tương đối mới nên nếu các bạn muốn nắm rõ hơn thì có thể đọc bài viết [này](https://viblo.asia/p/api-la-gi-nhung-dac-diem-noi-bat-cua-web-api-Qpmle9L9lrd).  Khi bạn muốn sử dụng một API, bạn sẽ cần có token để xác thực và Laravel khiến cho việc xác thực này đơn giản hơn rất nhiều với Passport (giống như hộ chiếu thông hành vậy :D). 

## Cài đặt
Đầu tiền hãy chạy `php artisan make:auth`, phần này trong docs không thấy nói tới nhưng nếu không chạy là sẽ lỗi đó :smiley: 
```
php artisan make:auth
```

Các bạn có thể cài đặt `Passport` qua `composer`:
```
composer require laravel/passport
```

`Passpost` sẽ cung cấp cho chúng ta những bảng riêng trong database, vì thế, bạn nên chạy migrate sau khi cài đặt xong `Passport`
```
php artisan migrate
```
Bình thường nếu một project laravel mới tạo và bạn chạy migrate thì sẽ có 3 bảng là `migrations`, `password_resets`, `users`. Nhưng giờ bạn hãy thử nhìn xem chúng ta đang có thêm những bảng mới nào trang database. Những bảng này sẽ lưu lại thông tin client, access token, refresh token,...

Tiếp tới bạn sẽ cần chạy lệnh:
```
php artisan passport:install
```
Lệnh này sẽ tạo các key mã hóa (encryption keys) để tạo ra access token. Ngoài ra, lệnh này cũng tạo ra những client và password sử dụng để truy cập. Sau khi chạy lệnh này, bạn cần thêm trait `Notifiable` vào trong Model `User`

```php
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;
}
```

Tiếp tới, bạn nên gọi phương thức `Passport:routes` ở trong phương thức `boot` của `AuthServiceProvider`. Phương thức này sẽ đăng ký những routes cần thiết
```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
         'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
    }
}

```

Bạn sẽ thấy mình thêm cả 2 dòng 
```php
Passport::tokensExpireIn(now()->addDays(15));
Passport::refreshTokensExpireIn(now()->addDays(30));
```

2 phương thức này sẽ cấu hình vòng đời của token. Nếu không sử dụng 2 phương thức này thì token sẽ hết hạn sau 1 năm (*By default, Passport issues long-lived access tokens that expire after one year*)

Giờ thì bạn hãy bào file `config/auth.php` và thay đổi `driver` của `api`
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```

# Tạo virtual host
Để có thể sử dụng được api thì bạn sẽ phải có đường dẫn cho nó. Ở đây mình sẽ tạo virtual host trên local để bạn sử dụng cho mục đích cá nhân nhé. Nếu bạn muốn public api này thì phải đầu tư vps đó. 

Mình chạy trên môi trường `apache2` nên mình sẽ chỉ hướng dẫn trên `apache2`, `nginx` thật ra cũng sẽ tương tự, chỉ khác ở đoạn cấu hình file config thôi nên các bạn có thể tự tìm hiểu cái này :v 

Đầu tiên mình cần một ServerName ảo. Các bạn gõ:
```
sudo nano /etc/hosts
```

Ở dưới `127.0.0.1 localhost` bạn thêm `127.0.0.1 api.local`. Tiếp tới:
```
sudo nano /etc/apache2/sites-available/api.conf
```

Copy đoạn sau vào
```
<VirtualHost *:80>
	ServerName api.local
 	ServerAlias www.api.local
	DocumentRoot /var/www/html/demo-api-passport/public
	
	<Directory /var/www/html/demo-api-passport/public/>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
    </Directory>
	
	ErrorLog /var/www/html/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Như các bạn thấy thì mình có đoạn `/var/www/html/demo-api-passport/public` thì các bạn sẽ thay đường dẫn tới thư mục public của project nhé. Sau đó chúng ta cần phân quyền cho một vài thư mục:
```
sudo chmod -R 777 /var/www/html/demo-api-passport/storage
sudo chmod -R 755 /var/www/html/demo-api-passport/boostrap
```
Giờ thì vào trình duyệt và gõ: http://api.local. Nếu bạn thấy trang welcome mặc định của laravel thì đã thành công rồi đó. Còn nếu bị lỗi 500 thì hãy kiểm tra trong `/var/www/html/error.log` để xem lỗi gì nhé.

# Tạo controller
Điều đầu tiên là chúng ta sẽ cần một tài khoản trong hệ thống, bạn có thể truy cập trực tiếp và đăng ký một tài khoản mới. Sau đó bạn có thể tạo ra một bảng `posts` hoặc `products` để seed dữ liệu vào (phần này các bạn tự thực hiện nha)

Như các bạn đã thấy, các controller được tạo bởi laravel đều sẽ kế thừa một controller mặc định. Nhưng ở đây mình sẽ không dùng tới controller mà tạo 1 cái khác:
```
php artisan make:controller BaseController
```

Và đây sẽ là code trong `BaseController`, đơn giản là mình sẽ tạo ra 2 phương thức trả về giá trị, 1 khi thành công, 1 khi có lỗi

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 200)
    {
        $response = [
            'status' => false,
            'data' => [],
            'message' => $error,
        ];
        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}

```

Tiếp tới mình sẽ tạo `PostController`:
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;

class PostController extends BaseController
{
    public function index()
    {
        $posts = Post::all();

        return $this->sendResponse($posts->toArray() , 'Posts retrieved successfully');
    }
}

```

ở trong file `routes/api.php`, các bạn copy đoạn này vào:
```php
<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->group(function () {
    Route::get('posts', 'PostController@index');
});

```

Mình sẽ chỉ demo phương thức lấy tất cả dữ liệu thôi nhé :D, những cái như `create`, `show`, `edit`,.. các bạn tự thực hành nha


# Kiểm tra
Để có thể làm việc với API một cách dễ dàng thì mình sẽ sử dụng phần mềm là Postman, nếu không có thì các bạn cài đặt nhé.

Giờ thứ đầu tiên mình cần chính là token. Các bạn hãy mở Postman lên, kiểu request là POST, đường dẫn bên cạnh là: http://api.local. Để ý những tab ở ngay dưới, các bạn hãy click vào **Body**, tick vào **form-data**, thêm các key - value tương ứng
```
grant_type:password
username: Email mà bạn đăng ký
password: Password mà bạn đăng ký
client_id:2
client_secret:BlIlPkUMjWeAtsZRvTRgXlfGvtqzbFpf0C8dI2Gp
```

Giải thích 1 chút nào, bạn hãy truy cập vào database, tìm tới bảng `oauth_clients`, `id` chính là `client_id`, `name` trong db là 'Laravel Password Grant Client' thì `grant_type` là 'password', `client_secret` chính là `secret` trong db.

Xong xuôi hết thì các bạn hãy ấn **Send** và các bạn sẽ nhận được token bên dưới
![](https://images.viblo.asia/ebf23d75-6c25-45c7-b734-d480d6873ddc.png)

Giờ hãy mở tab mới lên, chọn kiểu request là GET, url: http://api.local/api/posts. Click vào tab **Authorization**, ở **type** chọn Bearer Token và ô input bên cạnh thì bạn copy token nhận ở trên vào rồi ấn **Send** và đây là kết quả:
![](https://images.viblo.asia/66272218-5a5d-462b-b2c5-e4fb96d5b892.png)

Vậy là đã hoàn thành rồi :D

# Kết luận 
Nếu đọc docs của laravel thì các bạn thấy bài viết của mình đã lược bỏ khá nhiều, nhưng mình nghĩ như thế sẽ giúp các bạn dễ dàng tìm hiểu hơn :D. Và như này vẫn chưa xong đâu nhé, vì token chúng ta có thời gian sống nên không chỉ cứ lấy về mà dùng xong tới khi hết hạn lại vào code thay cái mới được. Bài sau mình sẽ hướng dẫn các bạn cách lấy và sử dụng token ở project nhé