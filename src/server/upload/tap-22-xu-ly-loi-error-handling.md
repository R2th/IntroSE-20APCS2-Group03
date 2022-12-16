Chào mừng các bạn đã quay trở lại với series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Tập hôm nay chúng ta sẽ cùng tìm hiểu cơ chế xử lý lỗi trong Laravel. Đây là một component có thể ít bạn quan tâm trong quá trình học framework này, nhưng tin mình đi, nó thật sự hữu ích cho các dự án đấy.

# I. Giới thiệu (Introduction)
Khi bạn bắt đầu với một dự án Laravel, lỗi và xử lý ngoại lệ (exception handler) được cấu hình sẵn cho bạn. Lớp `App\Exceptions\Handle` là nơi kích hoạt bởi ứng dụng, cho phép ghi lại các ngoại lệ và trả về cho người dùng. Chúng ta sẽ cùng nhau tìm hiểu sâu hơn trong tập này.

# II. Cấu hình (Configuration)
Cấu hình `debug` trong file `config/app.php` xác định xem thông báo lỗi có được hiển thị cho người dùng hay không. Mặc định cấu hình này sẽ lấy giá trị của `APP_DEBUG` từ file môi trường `.env`.

Trong quá trình phát triển ứng dụng, bạn nên thiết lập giá trị cho `APP_DEBUG` là `true`, ngược lại, khi ứng dụng đã deloy thì nên để là `false`. Nếu như bạn đặt giá trị `true` khi đã deloy thì nguy cơ để lộ thông tin bảo mật ứng dụng cho phía người dùng cực kỳ cao khi xảy ra lỗi nào đó.

# III. Xử lý ngoại lệ (The exception handler)
## 1. Method "report"
Tất cả các ngoại lệ (exception) được xử lý bởi lớp `App\Exceptions\Handler`. Lớp này chứa hai method chính, đó là `report` và `render`. Mình sẽ làm rõ từng method một. Với method `report` dùng để lưu lại các exception hoặc gửi cho người dùng thông qua các dịch vụ bên ngoài như [Bugsnag](https://bugsnag.com/) hoặc [Sentry](https://github.com/getsentry/sentry-laravel). Mặc định, phương thức `report` sẽ truyền các exception tới lớp cơ sở, nơi các exception sẽ được ghi lại. Tuy nhiên, bạn có thể tự do ghi các exception bất cứ nơi nào bạn muốn.

Ví dụ, bạn muốn report các loại exception khác nhau bằng những cách khác nhau, chúng ta có thể sử dụng toán tử so sánh `instanceof` của PHP.

```cpp:PHP:app/Exceptions/Handle.php
public function report(Exception $exception)
{
    if ($exception instanceof CustomException) {
        // Logging exception
    }

    parent::report($exception);
}
```
*(Về phần logging exception, chúng ta sẽ tìm hiểu ở bài sau)*

Các bản ghi exception sẽ được lưu trữ trong `storage/logs`. Để kiểm thử, các bạn hãy định nghĩa route sau trong `routes/web.php`:

```javascript:PHP:routes/web.php
Route::get('/exception', function() {
    throw new Exception('Test');
});
```

Sau khi chạy xong, ta sẽ nhận một trang lỗi trả về:

![](https://images.viblo.asia/63d3d840-dbe4-414d-999d-018fc4fdcb4a.PNG)

Rồi, giờ hãy truy cập thư mục `storage/logs`, lúc này ta sẽ thấy một file log được tạo ra với nội dung như sau:

![](https://images.viblo.asia/4824a164-3169-4c21-81a6-4137c844006e.PNG)

Nhìn là thấy khiếp rồi đúng không, nhưng ta không cần quan tâm đến nó nhiều lắm, chủ yếu chỉ biết cách hoạt động của nó thôi.

### a. Global log context
Nếu như bạn muốn quản lý các logging này một cách khoa học, để dễ dàng bảo trì hệ thống, cần thêm các thuộc tính để lọc các exception này. Laravel cung cấp cho ta method `context` để có thể thêm vài thông tin cho bản ghi exception. Ta sẽ khai báo nó trong file `app/Exceptions/Handler.php`.

```javascript:PHP:app/Exceptions/Handler.php
protected function context()
{
    return array_merge(parent::context(), [
        'foo' => 'bar',
    ]);
}
```

Lúc này bạn có thể load lại route lúc nãy ta đăng ký và quan sát lại file log.

![](https://images.viblo.asia/1ac94244-ea61-4db9-be06-6b76c7efccbb.PNG)

### b. Method "report" helper
Thỉnh thoảng bạn cần báo cáo một ngoại lệ nhưng vẫn muốn tiếp tục xử lý request hiện tại. Với phương thức `report` helper cho phép bạn có thể báo cáo nhanh một ngoại lệ mà không phải trả về lại cho phía người dùng một trang lỗi nào cả.

```javascript:PHP
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

### c. Bỏ qua các ngoại lệ theo loại (Ignoring exceptions by type)
Thuộc tính `$dontReport` trong trình xử lý ngoại lệ `App\Exceptions\Handler` sẽ chứa mảng liệt kệ các loại ngoại lệ không được ghi lại. Ví dụ, các ngoại lệ lỗi 404, cũng như một số ngoại lệ khác không được ghi lại vào hệ thống. Bạn có thể thêm các ngoại lệ không cần báo cáo như sau:

```go:PHP:app/Exceptions/Handler.php
protected $dontReport = [
    \Illuminate\Auth\AuthenticationException::class,
    \Illuminate\Auth\Access\AuthorizationException::class,
    \Symfony\Component\HttpKernel\Exception\HttpException::class,
    \Illuminate\Database\Eloquent\ModelNotFoundException::class,
    \Illuminate\Validation\ValidationException::class,
];
```

Những exception này các bạn đọc tên class của nó thì cũng hiểu công dụng rồi phải không nào.

## 2. Method "render"
Phương thức này chịu trách nhiệm chuyển đổi một ngoại lệ nhất định thành HTTP response để mà trả về trình duyệt người dùng. Mặc định, các ngoại lệ sẽ được truyền đến lớp cơ sở dùng để khởi tạo response. Tuy nhiên, bạn có thể thoải mái kiểm tra loại ngoại lệ hoặc trả về các response tùy chỉnh theo ý của mình.

```javascript:PHP:app/Exceptions/Handler.php
public function render($request, Exception $exception)
{
    if ($exception instanceof CustomException) {
        return response()->view('errors.custom', [], 500);
    }

    return parent::render($request, $exception);
}
```

## 3. Reportable & Renderable exception
Hậu tố -able trong ngành có thể hiểu như một cái gì đó tách rời, riêng biệt, nhỏ gọn để có thể xử lý, reportable và renderable cũng vậy. Thay vì kiểm tra và xử lý các ngoại lệ trong hai method `report` và `render` mặc định của `App\Exceptions\Handler`, ta có thể định nghĩa hai phương thức này trực tiếp trên các lớp ngoại lệ tùy chỉnh. Khi các phương thức này tồn tại, nó sẽ tự động được gọi bởi framework nên ta chẳng cần phải cấu hình gì cả. Việc của bạn chỉ cần tạo một file exception với nội dung như sau:

```php:PHP:app/Exceptions/CustomException.php
<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    public function report()
    {
        //
    }

    public function render($request)
    {
        //
    }
}
```

Bây giờ chỉ việc gọi nó ra và sử dụng thôi.

```javascript:PHP
throw new App\Exceptions\CustomException('Test');
```

> Bạn có thể type-hint bất kỳ class dependency nào cho các method để thuận tiện cho việc.

# IV. HTTP exception
Một vài exception sẽ mô tả mã lỗi HTTP từ phía server. Ví dụ, nó sẽ là một trang lỗi "Không tìm thấy" (404), một lỗi "Unauthorized" (401) hoặc là một lỗi do developer tạo ra (500). Để tạo các response như vậy từ bất kỳ đâu trong ứng dụng, chúng ta có thể sử dụng global helper `abort`.

```sql:PHP
abort(404);
```

Phương thức `abort` này ngay lập tức sẽ đưa ra một ngoại lệ bởi trình xử lý. Tham số thứ nhất là mã lỗi mà bạn muốn trả về trình duyệt. Bạn có thể tùy chỉnh văn bản trả về qua tham số thứ hai.

```sql:PHP
abort(401, 'Unauthorized action');
```

## Tùy chỉnh trang lỗi HTTP (Custom HTTP error page)
Laravel cấu hình giúp ta có thể dễ dàng tùy chỉnh các trang lỗi HTTP. Ví dụ, nếu bạn muốn tùy chỉnh trang lỗi 404, hãy tạo view `resources/views/errors/404.blade.php`. Trang này sẽ được hiển thị khi ứng dụng của bạn gặp lỗi 404 bất cứ lúc nào, bất kỳ nơi đâu. 

> **Lưu ý:** Tên file view lỗi phải trùng với mã lỗi HTTP.

Lớp khởi tạo `HttpInstance` do method `abort` kích hoạt sẽ truyền vào view biến `$exception`.

```javascript:PHP:resources/views/error/404.blade.php
{{ dd($exception) }}
```

Rồi, giờ hãy thử truy cập ứng dụng với một đường dẫn chưa được đăng ký trong route xem nào.

![](https://images.viblo.asia/265843b8-24e4-4a1a-9e59-18c18247c1b3.PNG)

Ngoài ra, bạn có thể sử dụng các blade view error mặc định do Laravel cung cấp bằng cách sử dụng lệnh Artisan `vendor:publish`.

> php artisan vendor:publish --tag=laravel-errors

Đây là list view mà framework tự động tạo ra:

![](https://images.viblo.asia/765df6b9-044f-4ed4-a973-935018ac723f.PNG)

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ