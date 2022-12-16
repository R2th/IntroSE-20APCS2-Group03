Sử dụng `Log` file không những rất hữu ích trong việc xem nguồn dữ liệu được chạy như thế nào mà còn rất tiện lợi cho chúng ta khi `debug`. Hôm nay, tôi xin nghiên cứu về tính năng handling errors và logging file của Laravel hỗ trợ.

Khi bạn bắt đâu với một project mới, việc xử lý về error và exception đã được cấu hình cho bạn rồi. Class `App\Exceptions\Handler` là nơi mà tất cả đã được trigger ứng dụng của bạn đang đăng nhập và trả lại cho người dùng. Chúng ta sẽ tìm hiểu sâu hơn về nó trong suốt tài liệu này.
Đối với logging, Laravel tích hợp thư viện Monolog, nó cung cấp rất một loạt các xử lý rất hay. Laravel cấu hình một vài xử lý đó cho bạn, cho phép bạn chọn giữa một hoặc nhiều file log, hoặc viết thông tin error vào hệ thống log.

## **Cấu hình**
### Chi tiết errors
Lựa chọn `debug ` bên trong `config/app.php` cho phép thông tin về error thực sự hiển thị cho người dùng. Mặc định, cấu hình này thiết lập dựa trên biến môi trường `APPDEBUG`, lưu trong file  .env.
Trong môi trường phát triển local, bạn nên đặt giá trị biến `APPDEBUG` thành `true`. Đối với môi trường production, giá trị này phải luôn luôn là `false`. Nếu giá trị này là `true` trên môi trường production, người dùng có thể sẽ thấy được các giá trị cấu hình ứng dụng của bạn.

## Lưu trữ Log
Cơ bản, Laravel hỗ trợ các chế độ `single` files, `daily` files, the `syslog`, và `errorlog`. Để cấu hình cơ chế lưu trữ log của Laravel, bạn có thể chỉnh `log` trong file `config/app.php`. Ví dụ, nếu bạn muốn sử dụng `log` file hàng ngày thay vì log một file, bạn có thể đặt log trong file `app` thành `daily`:
```php
'log' => 'daily'
```

### Giới hạn thời gian file Daily Log
Khi bạn sử dụng chế độ *daily* log, mặc định Laravel chỉ để lại files log năm ngày gần nhất. Nếu bạn muốn thay đổi số ngày đó, bạn cần thêm 1 dòng *logmaxfiles* vào trong file *app*:
```php
log_max_files' => 30
```

## Các mức độ của Log
Khi sử dụng Monolog, nội dung tin nhắn log có thể khác cấp độ với nhau. mặc định, Laravel viết tất cả các cấp độ log được lưu trữ lại. Tuy nhiên, trong môi trường production, bạn có thể giới hạn cấp độ bằng cách thêm `log_level` trong file `app.php`.
Khi tùy biến đã được cấu hình, Laravel sẽ log tất cả những cấp độ cao hơn hoặc bằng cấp độ tùy biến. Ví dụ, mặc định `log_level` của `error` sẽ log nội dung **error, critical, alert**, and **emergency**:

```php
'log_level' => env('APP_LOG_LEVEL', 'error'),
```
## Tùy biến cấu hình Monolog
Nếu bạn muốn điều chỉnh toàn bộ quy trình Monolog trong ứng dụng của bạn, bạn có thể sử dụng phương thức `configureMonologUsing` method. Bạn nên gọi phương thức xử lý này trong file `bootstrap/app.php` ngay trước biến `$app` được trả về:
```php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
});

return $app;
```
## The Exception Handler
### Phương thức report
Tất cả các exception được xử lý bởi class `App\Exceptions\Handler`. Class này chứa 2 phương thức: `report` và `render`. Chúng ta sẽ xem xét chi tiết hai phương thức này. Phương thức `report` được sử dụng để log các exception hoặc gửi chúng tới các dịch vụ ngoài như [Bugsnag](https://www.bugsnag.com/) hoặc [Sentry](https://github.com/getsentry/sentry-laravel). Mặc định, Phương thức `report` đơn giải chỉ đấy các exception về class nơi mà exception được log lại. Tuy nhiên, bạn có thể hoàn toàn tùy biến theo ý bạn muốn.
Ví dụ, nếu bạn cần report nhiều kiểu exception theo nhiều cách khác nhau, bạn có thể sử dụng toán tử kiểm tra của PHP instanceof:
```php
public function report(Exception $exception)
{
    if ($exception instanceof CustomException) {
        //
    }

    return parent::report($exception);
}
```
### Loại bỏ exception theo kiểu
Thuộc tính `$dontReport` của handler chứa một mảng các kiểu exception sẽ không cần log. Ví dụ, exceptions của lỗi 404, cũng như mội vài kểu lỗi khác, sẽ không được lưu vào file log. Bạn có thể thêm kểu exception khác vào mảng nếu cần thiết:
```php
protected $dontReport = [
    \Illuminate\Auth\AuthenticationException::class,
    \Illuminate\Auth\Access\AuthorizationException::class,
    \Symfony\Component\HttpKernel\Exception\HttpException::class,
    \Illuminate\Database\Eloquent\ModelNotFoundException::class,
    \Illuminate\Validation\ValidationException::class,
];
```
### Phương thức Render
Phương thức `render` có tránh nhiệm chuyển đổi một exception thành một HTTP response để trả lại cho trình duyệt. Mặc định, exception được đẩy tới class cơ sở để tạo một response cho bạn. Tuy nhiên, bạn có thể thoải mái trong việc kiểm tra kiểu exception và trả về response tùy biến theo ý của bạn:
```php
public function render($request, Exception $exception)
{
    if ($exception instanceof CustomException) {
        return response()->view('errors.custom', [], 500);
    }

    return parent::render($request, $exception);
}
```
## HTTP Exceptions
Một số exceptions miêu tả mã HTTP từ server. Ví dụ, đây có thể là một lỗi "page not found" (404), một lỗi "unauthorized error" (401) hoặc lỗi 500. Để tạo ra response tương ứng với mã lỗi ở bất kỳ đâu trong ứng dụng, bạn có thể sử dụng phương thức `abort`:
```php
abort(404);
```
Phương thức `abort` sẽ lập tức đẩy ra một exception sẽ được render bởi exception handler. Bạn cũng có thể tùy chọn cung cấp thêm nội dung response:
```php
abort(403, 'Unauthorized action.');
```
### Tùy biến HTTP Error Pages
Laravel làm việc trả về trang lỗi tùy biến tương ứng với mã HTTP status rất dễ dàng. Ví dụ, nếu bạn chỉnh sửa trang lỗi tương ứng với mã 404 HTTP status, chỉ việc tạo một file  `resources/views/errors/404.blade.php`. File này sẽ được gọi ra khi có lỗi 404 HTTP status được sinh ra trong ứng dụng của bạn. Các view nằm trong thư mục này phải trùng với mã lỗi HTTP status. `HttpException` có hàm abort nó sẽ được xem như là một biến` $exception.`

## Logging
Laravel cung cấp một lớp abstraction đơn giản ở trên thư viện [Monolog](https://github.com/seldaek/monolog). Mặc định, Laravel cấu hình tạo ra file log cho ứng dụng cuản bạn trong thư mục `storage/logs`. Bạn có thể viết thêm nội dung vào trong `logs` sử dụng Log [facade](http://giaphiep.com/docs/5.3/facades):
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param    int  $id
     * @return  Response
     */
    public function showProfile($id)
    {
        Log::info('Showing user profile for user: '.$id);

        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
Logger cung cấp 8 cấp độ cơ bản theo định nghĩa [RFC 5424](https://tools.ietf.org/html/rfc5424): **emergency, alert, critical, error, warning, notice, info ** and **debug**.
```php
Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```
### Thông tin theo ngữ cảnh
Một mảng dữ liệu theo ngữ cảnh có thể được truyền vào trong phương thức Log. Các dữ liệu này sẽ được format và hiển thị cùng với nội dung log:
```php
Log::info('User failed to login.', ['id' => $user->id]);
```

### Truy cập vào đối tượng phía dưới Monolog
Monolog có một số hander bổ sung mà bạn có thể sử dụng nó cho việc log. Nếu cần thiết, bạn có thể truy cập vào đối tường phía dưới của Monolog bằng cách:
```php
$monolog = Log::getMonolog();
```
### Nguồn
https://laravel.com/docs/5.4/errors