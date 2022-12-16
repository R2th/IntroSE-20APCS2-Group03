Trước đây mình đã từng giới thiệu một số các bài viết về log management như:

* [**Exception monitor with Sentry**](https://viblo.asia/p/exception-monitor-with-sentry-eW65GEdPZDO)
* [**Quản lý log ứng dụng với ELK Stack (Elasticsearch, Logstash và Kibana)**](https://viblo.asia/p/quan-ly-log-ung-dung-voi-elk-stack-elasticsearch-logstash-va-kibana-Qbq5QJzmKD8)
* [**Quản lý log ứng dụng với GrayLog 2**](https://viblo.asia/p/quan-ly-log-ung-dung-voi-graylog-2-924lJOGY5PM)

Và hôm nay, mình sẽ tiếp tục giới thiệu tiếp một bài viết về log management nhưng đặc biệt là dành riêng cho thằng Laravel. Đó là [**Larametrics**](https://larametrics.com/). 

Larametrics cũng đơn giản chỉ là một thư viện hỗ trợ hiển thị log ứng dụng của Laravel như các thư viện khác ([**laravel-log-viewer**](https://github.com/rap2hpoutre/laravel-log-viewer), [**laravel-logger**](https://github.com/jeremykenedy/laravel-logger), ...). Ngoài việc đó, nó còn giúp chúng ta làm một số việc như:

* Báo về email khi một log `notice` hay `info` được ghi
* Cảnh báo chúng ta qua Slack và email khi một `error` log được ghi
* Thông báo cho chúng ta biết khi model Admin được sử dụng (như create hay delete)
* Thông báo cho chúng ta khi một ai đó truy cập vào một route nào đó (ví dụ: `/auth/login`)

Để có thể dễ hình dung. Chúng ta cùng đi thực hiện một demo xem sao nhé :D! Yêu cầu đơn giản như sau:

* PHP 5.6.4+
* Laravel 5.2+
* Thư viện [**guzzlehttp/guzzle**](https://github.com/guzzle/guzzle) nếu như bạn sử dụng chức năng notifications


# Let's start

Giờ chúng ta đi khởi tạo một project Laravel đơn giản bằng lệnh:

```
composer create-project --prefer-dist laravel/laravel larametrics-demo
```

hoặc

```
laravel new larametrics-demo
```

> Mặc định là bạn đã cài Laravel installer theo hướng dẫn [**ở đây**](https://laravel.com/docs/5.7#installing-laravel) rồi

Sau khi tạo project xong, chúng ta thực hiện tạo database cho ứng dụng bằng lệnh:

```
mysql -u<MySQL Username> -p<MySQL password> -e "CREATE DATABASE larametrics CHARACTER SET utf8 COLLATE utf8_general_ci;"
```

Tiếp đó, chúng ta vào thư mục `larametrics-demo` và sửa các thông số kết nối tới database trong file `.env`. Xong, chúng ta thực hiện sang phần cài đặt thư viện Larametrics cho ứng dụng:

```
composer require aschmelyun/larametrics
```

Tiếp, bạn cần phải thêm provider của Larametrics vào `config/app.php`
```php
'providers' => [
    // Other providers
    Aschmelyun\Larametrics\LarametricsServiceProvider::class,
```

Sau khi cài xong thư viện, chúng ta lấy file config của Larametrics:

```
php artisan vendor:publish --provider="Aschmelyun\Larametrics\LarametricsServiceProvider"
```

Chạy migrate để tạo một số bảng cần thiết:

```
php artisan migrate
```

Tiếp theo, thực hiện thêm routes cho Larametrics tại file `routes/web.php`

```php
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Other routes
// ...

\Aschmelyun\Larametrics\Larametrics::routes();
```

> Mặc định, khi thêm Larametrics routes, nó có thể được truy cập tại `/metrics`. Nếu muốn (hoặc trường hợp sử dụng trên production), bạn có thể nhét nó vào một middleware nào đó (ví dụ như middleware `auth`) để thực hiện xác thực người dùng trước khi có thể truy cập vào trang, ví dụ:
> ```php
> // routes/web.php
> Route::group(['middleware' => 'auth', 'prefix' => 'admin'], function() {
>    \Aschmelyun\Larametrics\Larametrics::routes();
> });
> ```

Vậy là xong. Giờ chúng ta thử nghiệm phát nhóe.  Đầu tiên là log ứng dụng, thực hiện tạo thử một controller để test:

```
php artisan make:controller HomesController
```

Sau đó bạn thực hiện thêm method `index` cho HomesController tại `app/Http/Controllers/HomesController.php`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomesController extends Controller
{
    public function index(Request $request)
    {
        $percentage = 1 / 0;
        return view("welcome");
    }
}

```

Update lại root route trong file `routes/web.php` sang:

```php
Route::get("/", "HomesController@index");
```

Thực hiện chạy server:

```
php artisan serve
```

và bạn thử truy cập địa chỉ: http://localhost:8000. OK, bạn sẽ dính lỗi `Division by zero`. Oke, chủ đích của chúng ta mà :D. Giờ bạn truy cập vào http://localhost:8000/metrics để xem. Kết quả bạn sẽ nhận được như sau:

![](https://images.viblo.asia/e9cf0a94-5978-4a26-8c96-cb230915cfc7.png)

Bạn có thể click vào **View Details** để xem chi tiết :D!  Giờ chúng ta đi thử nghiệm quả log model nhé. Dùng luôn cái Auth (có bao gồm Register/Login) của thằng Laravel.

```
php artisan make:auth
```

Giờ bạn thực hiện vào đường dẫn: http://localhost:8000/register và thực hiện đăng ký. Sau khi đăng ký xong, bạn quay lại Larametrics để xem kết quả :D

![](https://images.viblo.asia/1a0047a4-48c0-42e2-827f-e13a6498193b.png)

Ngon rồi phải không ạ :D? Giờ chúng ta đi thử phần notification nhá. Bạn cần có tài khoản tại [**MailTrap**](https://mailtrap.io), thực hiện edit `MAIL_USERNAME` và `MAIL_PASSWORD` trong file `.env` cho phù hợp với thông tin mà MailTrap cung cấp rồi khởi động lại Artisan server. Truy cập vào http://localhost:8000/metrics/notifications và thực hiện thêm một notification để test:

![](https://images.viblo.asia/b59a59d3-ac77-4764-a500-df96d4f17564.png)

Click **Save Notifications** để lưu lại và thực hiện về http://localhost:8000 để phát sinh lỗi `Division by zero`. Quay qua tab MailTrap để check email:

![](https://images.viblo.asia/04a6971a-04e5-4e9b-a45b-74c7b211d7af.png)

Rất ngon mà không sợ nóng :rofl:!

# Lời kết

Khi bạn đọc đến dòng này, có nghĩa là bài viết này đã kết thúc rồi :smiley:! Vậy là mình đã giới thiệu và demo xong thư viện Larametrics cho Laravel. Mình hy vọng với bài viết này nó sẽ có ích cho các bạn ở một tương lai không xa. Hẹn gặp lại mọi người ở những bài viết tiếp theo. Chào thân ái :wave:!