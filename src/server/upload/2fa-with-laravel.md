Nhân việc công ty yêu cầu mọi người phải cài đặt xác thực hai bước (2FA) cho tài khoản Github để nâng cao tính bảo mật. Nhưng Github lại không hỗ trợ SMS đầu số của Việt Nam. Nên chúng ta phải sử dụng phương thức thứ hai của Github, đó là sử dụng Authenticator của Google để verify. Mình thấy chức năng này thật sự là hay ho. Nên mới tìm hiểu về nó và viết bài viết này. Trọng tâm của bài viết này không đi sâu về Google Authenticator làm việc như thế nào mà chỉ đơn giản là làm sao để xây dựng một ứng dụng hỗ trợ việc xác thực hai bước để nâng cao tính bảo mật và bảo vệ người dùng website của chúng ta bằng Google Authenticator. Chúng ta cùng đi tìm hiểu từng bước để xây dựng một ứng dụng đơn giản có hỗ trợ 2FA nhé. Mình chọn Laravel 5.7 để làm việc. Nào, bắt đầu thôi.

# Chuẩn bị

Đầu tiên, chúng ta cần tạo một project Laravel:

```
composer create-project laravel/laravel laravel-2fa
```

Sau khi tạo xong, chúng ta thực hiện tạo database và cài đặt các thông số tương ứng trong file `.env`:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<Database name>
DB_USERNAME=<Database username>
DB_PASSWORD=<Database password>
```

OK, trong demo này chúng ta không sử dụng gì nhiều nên sẽ dùng mặc định luôn hai migrations của Laravel là `CreateUsersTable` và `CreatePasswordResetsTable`, nhưng sau khi cài đặt cấu hình database xong, chúng ta chưa chạy migrate vội mà sẽ tạo một migration để thêm một cột là `secret_code` cho từng user để lưu mã bí mật do Authenticator (gọi tắt cho ứng dụng Google Authenticator cho nhanh nhá :smile:) tạo ra. Mã bí mật này sẽ sử dụng để kiểm tra cho các lần đăng nhập tiếp theo của user.

```
php artisan make:migration AddSecretCodeToUsers --table users
```

Thực hiện thêm cột trong file `database/migrations/<timestamp>_add_secret_code_to_users.php`:

```PHP
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSecretCodeToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string("secret_code")->nullable()->after("remember_token");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn("secret_code");
        });
    }
}
```

Xong, lúc này chúng ta có thể chạy migrate bằng lệnh:

```
php artisan migrate
```

Để thực hiện khởi tạo các bảng cần thiết. Vậy là đã xong phần database, bây giờ chúng ta sẽ sang phần **Register** và **Login**. Chúng ta sử dụng luôn Auth của Laravel. Để thực hiện việc này, đầu tiên bạn cần chạy lệnh:

```
php artisan make:auth
```

Để Laravel sinh ra các file và cấu hình cần thiết cho chúng ta sử dụng. Vậy là phần cơ bản đã xong. Bây giờ bạn có thể chạy thử ứng dụng bằng lệnh:

```
php artisan serve
```

Và thử truy cập vào http://localhost:8000 rồi **Register** và **Login** xem sao :grimacing:

# Thực hiện

Sau khi đã chuẩn bị xong các phần cơ bản. Bây giờ chúng ta bắt tay vào phần chính. Đó là phần cho phép người dùng bật chế độ 2FA và thực hiện kiểm tra 2FA khi user đó đăng nhập. Đầu tiên, chúng ta tạo controller thực hiện việc cho phép người dùng đã đăng nhập thực hiện bật 2FA:

```
php artisan make:controller TwoFaceAuthsController
```

Sau đó, chúng ta cài Google Authenticator package:

```
composer require phpgangsta/googleauthenticator
```

Sau khi cài đặt xong, chúng ta mở file `app/Http/Controllers/TwoFaceAuthsController.php` ra và thực hiện code nghiệp vụ. Phần này chỉ là hiển thị barcode được sinh ra từ secret code và một input cho người sử dụng nhập vào sau khi sử dụng ứng dụng Google Authenticator quét được và nhập vào. Chúng ta kiểm tra xem dữ liệu người dùng nhập vào có hợp lệ không. Nếu hợp lệ thì thực hiện lưu secret code vào bảng user để thực hiện kiểm tra những lần sau. Flow làm việc như sau:

1. Hiển thị barcode được tạo từ secret code kèm một input
2. Người dùng thực hiện sử dụng ứng dụng Google Authenticator quét barcode và nhập mã được sinh ra bởi ứng dụng
3. Kiểm tra xem mã người dùng nhập có hợp lệ hay không. Nếu hợp lệ, update secret code vào database để sử dụng cho những lần đăng nhập tiếp theo
4. Nếu người dùng nhập mã không hợp lệ (nghĩa là họ không có ứng dụng Google Authenticator), báo lỗi và quay về trang chủ

Đầu tiên, tạo secret code và QR code để cho người dùng có thể scan:

```PHP
public function __construct()
{
    $this->middleware("auth");
}

public function index()
{
    $googleAuthenticator = new \PHPGangsta_GoogleAuthenticator();
    // Tạo secret code
    $secretCode = $googleAuthenticator->createSecret();
    // Tạo QR code từ secret code. Tham số đầu tiên là tên. Chúng ta sẽ hiển thị
    // email hiện tại của người dùng. Tham số tiếp theo là secret code và tham số cuối cùng
    // là tiêu đề của ứng dụng. Sử dụng để người dùng biết code này đang sử dụng cho dịch vụ nào
    // Bạn có thể tùy ý sử dụng tham số 1 và 3.
    $qrCodeUrl = $googleAuthenticator->getQRCodeGoogleUrl(
        auth()->user()->email, $secretCode, config("app.name")
    );
    
    // Lưu secret code vào session để phục vụ cho việc kiểm tra bên dưới
    // và update vào database trong trường hợp người dùng nhập đúng mã được sinh ra bởi
    // ứng dụng Google Authenticator
    session(["secret_code" => $secretCode]);

    return view("two_face_auths.index", compact("qrCodeUrl"));
}
```

Tạo view. Phần này khá dài nên bạn có thể xem tại PR này: https://github.com/namnv609/laravel-2fa/pull/4.

![](https://images.viblo.asia/a14d9120-099b-4710-a20a-89fe071303fb.jpg)

Sau khi xong xuôi phần hiển thị QR cho người dùng scan. Chúng ta sẽ sang phần xử lý logic khi người dùng nhập mã sinh ra do ứng dụng. Flow đơn giản là kiểm tra mã người dùng nhập vào với mã được sinh ra bởi secret code. Nếu OK thì chúng ta lưu secret code lại. Còn sai thì hiển thị message báo lỗi:

```PHP
# app/Http/Controllers/TwoFaceAuthsController.php

public function enable(Request $request)
{
    // Validate dữ liệu gửi lên
    $this->validate($request, [
        "code" => "required|digits:6"
    ]);
    
    // Khởi tạo Google Authenticator class
    $googleAuthenticator = new \PHPGangsta_GoogleAuthenticator();
    // Lấy secret code
    $secretCode = session("secret_code");
    
    // Mã người dùng nhập không khớp với mã được sinh ra bởi ứng dụng
    if (!$googleAuthenticator->verifyCode($secretCode, $request->get("code"), 0)) {
        return redirect("home")->with("error", "Invalid code");
    }
    
    // Update secret code cho người dùng
    $user = auth()->user();
    $user->secret_code = $secretCode;
    $user->save();

    return redirect("home")->with("status", "2FA enabled!");
}
```

Vậy là xong phần logic thực hiện enable 2FA. Bây giờ chúng ta sẽ xử lý tiếp phần đăng nhập. Flow đơn giản là nếu người dùng nhập đúng email và password. Kiểm tra xem user đó có `secret_code` không? Nếu có thực hiện hiển thị màn hình nhập code được sinh ra bởi ứng dụng.

Đầu tiên, chúng ta tạo một middleware để thực hiện kiểm tra:

```
php artisan make:middleware TwoFaceVerify
```

Và thực hiện code:

```PHP
# app/Http/Middleware/TwoFaceVerify.php

<?php

namespace App\Http\Middleware;

use Closure;

class TwoFaceVerify
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
        // Lấy secret_code hiện tại của user
        $secretCode = auth()->user()->secret_code;
        
        // Kiểm tra, nếu có secret_code và chưa có session 2fa_verified
        // Thực hiện redirect tới màn hình nhập Authentication code
        if ($secretCode && !session("2fa_verified")) {
            return redirect()->route("two_face.index");
        }
        return $next($request);
    }
}
```

Tiếp, thêm middleware của chúng ta vào file `app/Http/Kernel.php`:

```PHP
// ...
    protected $routeMiddleware = [
        // ...
        '2fa' => \App\Http\Middleware\TwoFaceVerify::class,
    ];
// ...
```

Tiếp theo, tạo controller thực hiện kiểm tra authentication code:

```
artisan make:controller VerifyTwoFaceController
```

Thực hiện edit file `app/Http/Controllers/VerifyTwoFaceController.php`

```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VerifyTwoFaceController extends Controller
{
    public function index()
    {
        return view("verify_two_face.index");
    }

    public function verify(Request $request)
    {
        $this->validate($request, [
            "code" => "required|digits:6",
        ]);

        $googleAuthenticator = new \PHPGangsta_GoogleAuthenticator();
        $secretCode = auth()->user()->secret_code;

        if (!$googleAuthenticator->verifyCode($secretCode, $request->get("code"), 0)) {
            $errors = new \Illuminate\Support\MessageBag();
            $errors->add("code", "Invalid authentication code");
            return redirect()->back()->withErrors($errors);
        }

        session(["2fa_verified" => true]);
        return redirect("home");
    }
}
```

Tiếp, thực hiện edit lại file routes tại `routes/web.php`. Chuyển các methods sử dụng middleware `auth` vào chung một nhóm và thêm với middleware `2fa` để thực hiện kiểm tra.

```PHP
// ...
Route::group(["middleware" => ["auth", "2fa"]], function() {
    Route::get('/home', 'HomeController@index')->name('home');
    Route::group(["prefix" => "two_face_auths"], function() {
        Route::get("/", "TwoFaceAuthsController@index")->name("2fa_setting");
        Route::post("/enable", "TwoFaceAuthsController@enable")->name("enable_2fa_setting");
    });
});

Route::group(["middleware" => ["auth"], "prefix" => "two_face"], function() {
    Route::get("/", "VerifyTwoFaceController@index")->name("two_face.index");
    Route::post("/verify", "VerifyTwoFaceController@verify")->name("two_face.verify");
});
```

Vậy là xong. Bây giờ bạn hãy bật 2FA lên rồi logout ra và login lại xem sao nhá :smile:

![](https://images.viblo.asia/1b17a4ba-9068-4319-b4d2-afb99808c9f2.jpg)

Video demo:

{@youtube:https://youtu.be/ClHc5R9jstw}

# Lời kết

Đến đây là kết thúc bài viết của mình. Trên đây chỉ là demo đơn giản với mục đích cho mọi người có cái nhìn cơ bản về việc làm sao ứng dụng được xác thực 2 bước vào website của mình. Hy vọng nó sẽ có ích cho các bạn trong tương lai gần. Hẹn gặp lại :wave:

Link source code: https://github.com/namnv609/laravel-2fa

> Original post: https://namnv609.cf/posts/2fa-with-laravel.html