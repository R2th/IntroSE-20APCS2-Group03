Chào các bạn, hôm nay mình quay trở lại với series về Laravel và hôm này mình sẽ giới thiệu về csrf trong Laravel. 
## 1. Introduction
CSRF là viết tắt của Cross-site request forgeries là yêu cầu giả mạo trên nhiều trang web, còn được gọi là tấn công bằng một cú nhấp chuột. Theo đó các hacker có thể giả mạo người dùng đã được xác thực gửi đi các request đến server. 
Hãy tưởng tượng hệ thống của bạn có một route **/user/email** với method POST sử dụng để thay đổi email của người dùng đã xác thực. Nếu không có csrf  protection một trang web độc hại có thể tạo một biểu mẫu HTML trỏ đến route **/user/email** và gửi email của chính họ để thay thế email của bạn:
```
<form action="https://your-application.com/user/email" method="POST">
    <input type="email" value="malicious-email@example.com">
</form>

<script>
    document.forms[0].submit();
</script>
```
Họ chỉ cần tìm cách để bạn truy cập trang web của họ khi bạn đang truy cập ứng dụng của mình là họ có thể thay đổi email của họ.
## 2. Preventing CSRF Requests
Laravel tự động tạo một token csrf cho mỗi phiên của người dùng đang hoạt động do ứng dụng quản lý. Token này được sử để xác thực rằng người dùng được xác thực là người đã request đến ứng dụng của bạn. 
Token csrf của phiên hiện tại có thể được truy cập thông qua phiên làm việc của request hoặc method *csrftoken* : 
```
use Illuminate\Http\Request;

Route::get('/token', function (Request $request) {
    $token = $request->session()->token();

    $token = csrf_token();

    // ...
});
```
Bất cứ khi nào bạn cần tạo một biểu mẫu (form) trong ứng dụng của mình, bạn nên thêm một trường  *_token* ẩn trong form để middleware csrf của laravel có thể xác thực được yêu cầu của bạn. Để thuận tiện khi sử dụng Blade template bạn có thể sử dụng @CSRF để generate ra trường token ẩn:
```
<form method="POST" action="/profile">
    @csrf

    <!-- Equivalent to... -->
    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
</form>
```
Middleware **App\Http\Middleware\VerifyCsrfToken** đã được bao gồm trong group web middleware theo mặc định, sẽ tự động xác minh rằng *token* đầu vào khớp với *token* được lưu trữ trong phiên. Khi hai *token* này khớp với nhau ứng dụng laravel của bạn sẽ biết rằng người được xác thực là người đã gửi request.
## 3. Excluding URIs From CSRF Protection
Đôi khi bạn muốn loại bỏ một số urI khỏi  CSRF protection. Bạn có thể loại bỏ một số route khỏi CSRF protection bằng cách thêm url vào thuộc tính *$except* của middleware *VerifyCsrfToken*:
```
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'stripe/*',
        'http://example.com/foo/bar',
        'http://example.com/foo/*',
    ];
}
```
## 4. X-CSRF-TOKEN
Ngoài việc kiểm tra token CSRF dưới dạng một tham số POST. Middleware *App\Http\Middleware\VerifyCsrfToken*  cũng sẽ kiểm tra *X-CSRF-TOKEN* trong header request. Ví dụ: bạn có thể lưu trữ mã thông báo trong *meta* HTML :
```
<meta name="csrf-token" content="{{ csrf_token() }}">
```
Sau đó bạn có thể sử dụng thư viện Jquery để tự động thêm token vào tất cả các header request. Điều này cung cấp khả năng bảo vệ CSRF đơn giản, thuận tiện cho các ứng dụng sử dụng AJAX:
```
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```
## 5. X-XSRF-TOKEN
Laravel lưu trữ token csrf hiện tại trong một *XSRF-TOKEN* cookie mã hóa đi kèm với mỗi response bởi framework. Bạn có thể sử dụng giá trị cookie để đặt X-XSRF-TOKEN header request.

Cảm ơn các bạn đã quan tâm đến bài viết của mình.

Tài liệu tham khảo: https://laravel.com/docs/8.x/csrf.