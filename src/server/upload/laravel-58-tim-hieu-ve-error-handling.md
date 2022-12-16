>  Bài này chúng ta sẽ cùng tìm hiểu về cách sử dụng Error Handling. trong laravel 5.8 nhé. 😃
# Error Handling
## Introduction

Khi bạn bắt đầu  làm việc với một project Laravel mới, việc xử lý error và exception đã được cấu hình sẵn cho bạn. Lớp App\Exceptions\Handler là nơi tất cả các ngoại lệ được kích hoạt bởi ứng dụng của bạnđược kích hoạt bởi ứng dụng của bạn. Chúng ta sẽ đi sâu hơn vào lớp này trong suốt bài viết này.
## Configuration

Các nội dung chi tiết lỗi trong ứng dụng của bạn hiển thị trên trình duyệt được điều khiển bởi cấu hình `debug` trong file cấu hình `config/app.php`. Mặc định, cấu hình này thiết lập dựa trên giá trị biến môi trường `APP_DEBUG`, lưu trong file `.env`.

Trong môi trường phát triển nội bộ, bạn nên set giá trị `APP_DEBUG` thành `true`. Trong môi trường production, giá trị này luôn luôn phải là `false`.

## The Exception Handler

Cơ bản, Laravel hỗ trợ các chế độ log này `single`, `daily`, `syslog`, và `errorlog`. Ví dụ, nếu bạn muốn ghi log file hàng ngày, thay vì ghi vào một file, bạn đơn giản chỉ cần thiết lập giá trị `log` trong file `config/app.php`:
``
    'log' => 'daily'
``
Khi sử dụng chế độ `daily`, Laravel sẽ chỉ lưu trữ log files của 5 ngày. Nếu bạn muốn điều chỉnh số lượng file lưu trữ, bạn có thể thêm vào cấu hình `log_max_files` vào trong `app.php`:
```
    'log_max_files' => 30
```
#### Tuỳ chọn cấu hình Monolog

Nếu bạn muốn điều khiển toàn bộ quy trình Monolog cấu hình trên ứng dụng, bạn có thể sử dụng phương thức `configureMonologUsing`. Bạn nên gọi xử lý này trong file `bootstrap/app.php` ngay trước khi biến `$app` được trả về:
```
    $app->configureMonologUsing(function($monolog) {
        $monolog->pushHandler(...);
    });

    return $app;
```
## The Exception Handler
### The Report Method
Tất cả các exception được xử lý bởi `App\Exception\Handler` class. Class này chứa hai phương thức: `report` và `render`. Chúng ta sẽ tìm hiểu các phương thức này.
Phương thức `report` được sử dụng để log các exception hoặc gửi chúng tới các dịch vụ bên ngoài. Mặc định, `report` đơn giản chỉ đẩy exception về class cơ sở nơi mà exception được log lại. Tuy nhiên, bạn có thể tuỳ ý log exception theo cách bạn muốn.

Ví dụ, nếu bạn cần report nhiều kiểu exception bằng nhiều cách khác nhau, bạn có thể sử dụng toán tử kiểm tra `instanceof` của PHP:
```
    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        if ($e instanceof CustomException) {
            //
        }

        return parent::report($e);
    }
```
### Global Log Context 
Nếu nó có sẵn, Laravel sẽ tự động thêm ID người dùng hiện tại vào mọi thông điệp nhật ký của exception dưới dạng dữ liệu contextual. Bạn có thể xác định dữ liệu theo context toàn cầu của riêng mình bằng cách ghi đè phương thứ  App\Exceptions\Handler của ứng dụng. Thông tin này sẽ được bao gồm trong mọi context tường trình của ngoại lệ được viết bởi ứng dụng của bạn:

```
/**
 * Get the default context variables for logging.
 *
 * @return array
 */
protected function context()
{
    return array_merge(parent::context(), [
        'foo' => 'bar',
    ]);
}
```

### The report Helper
Sometimes you may need to report an exception but continue handling the current request. The  report helper function allows you to quickly report an exception using your exception handler's report method without rendering an error page:
Đôi khi bạn có thể cần báo cáo một exception nhưng vẫn  tiếp tục xử lý yêu cầu hiện tại.Helper cho phép bạn xử lý report một ngoại lệ bằng phương thức report của trình xử lý exeption mà không hiển thị trang lỗi:

```
public function isValid($value)
{
    try {
        // Validate the value...
    } catch (Exception $e) {
        report($e);

        return false;
    }
}
```
### Ignoring Exceptions By Type

Thuộc tính `$dontReport` của handler xử lý exception chứa một mảng các kiểu exception sẽ không cần log. Mặc định, exception của lỗi 404 sẽ không được lưu vào trong log file. Bạn có thể thêm các kiểu exception vào trong mảng này nếu thấy cần thiết.
```
/**
 * A list of the exception types that should not be reported.
 *
 * @var array
 */
protected $dontReport = [
    \Illuminate\Auth\AuthenticationException::class,
    \Illuminate\Auth\Access\AuthorizationException::class,
    \Symfony\Component\HttpKernel\Exception\HttpException::class,
    \Illuminate\Database\Eloquent\ModelNotFoundException::class,
    \Illuminate\Validation\ValidationException::class,
];
```
### The Render Method

Phương thức `render` chịu trách nhiệm chuyển đổi một exception thành một mẫu HTTP response để trả lại cho trình duyệt. Mặc định, exception được đẩy tới class cơ sở để tạo response cho bạn. Tuy nhiên, bạn hoàn toàn tự do trong việc kiểm tra kiểu exception hoặc trả về response tuỳ ý riêng của bạn:
```
/**
 * Render an exception into an HTTP response.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Exception  $exception
 * @return \Illuminate\Http\Response
 */
public function render($request, Exception $exception)
{
    if ($exception instanceof CustomException) {
        return response()->view('errors.custom', [], 500);
    }

    return parent::render($request, $exception);
}
```

### Reportable & Renderable Exceptions
Instead of type-checking exceptions in the exception handler's report and render methods, you may define report and render methods directly on your custom exception. When these methods exist, they will be called automatically by the framework:****

Thay vì kiểm tra kiểu của exception trong report của phương thức xử lý exoption và phương thức kết xuất, bạn có thể xác định report và xuất trực tiếp trên expction tùy chỉnh của mình. Khi các phương thức này tồn tại, chúng sẽ được gọi tự động theo khung:
```
<?php

namespace App\Exceptions;

use Exception;

class RenderException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response(...);
    }
}
```

## HTTP Exceptions

Một số exception mô tả mã lỗi HTTP từ server. Ví dụ, đó có thể là một lỗi "page not found" (404), một lỗi "unauthorized error" (401) hoặc lỗi 500. Để sinh ra response cho mã lỗi tại bất kì vị trí trên ứng dụng, sử dụng:
```
    abort(404);
```
Phương thức `abort` sẽ lập tức đẩy ra một exception sẽ được render bởi exception handler. Bạn có thể tuỳ chọn cung cấp thêm nội dung response:
```
    abort(403, 'Unauthorized action.');
```
Phương thức này có thể được sử dụng bất cứ lúc nào trong lifecycle của request.

### Custom HTTP Error Pages

Laravel làm cho việc trả về trang lỗi tuỳ chọn cho các mã lỗi HTTP một cách dễ dàng. Ví dụ, nếu bạn muốn chỉnh sửa trang lỗi riêng cho trang HTTP 404, tạo một file resources/views/errors/404.blade.php. File này sẽ được gọi ra khi có lỗi 404 được sinh ra trong ứng dụng của bạn.
Các views nằm trong thư mục này nên được đặt tên trùng với mã lỗi HTTP tương ứng.
Ví dụ HttpException được đưa ra bởi hàm hủy bỏ sẽ được chuyển đến dạng xem dưới dạng biến ngoại lệ $exception:
```
<h2>{{ $exception->getMessage() }}</h2>
```
You may publish Laravel's error page templates using the vendor:publish Artisan command. Once the templates have been published, you may customize them to your liking:
Bạn có thể xuất bản các mẫu trang lỗi của Laravel bằng cách sử dụng vendor:publish  Artisan comand. Khi các mẫu đã được xuất bản, bạn có thể tùy chỉnh chúng:
```
php artisan vendor:publish --tag=laravel-errors
```
Bài viết của mình đến đây là hết hẹn gặp lại các bạn ở các bài viết tiếp theo. 😄

Tài liệu tham khảo:

https://en.wikipedia.org/wiki/Laravel

https://laravel.com/docs/5.8/errors