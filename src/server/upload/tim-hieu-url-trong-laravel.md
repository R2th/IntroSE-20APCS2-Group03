# Giới thiệu
Laravel cung cấp một vài `helpers` để hổ trợ chúng ta trọng việc tạo ra URL trong khi xây dựng ứng dụng. Chúng rất hữu ích trong việc tạo liên kết giữa các template trong ứng dụng , gọi API hoặc giúp chuyển hướng trong trang web dễ dàng hơn.
# Basic
### Tạo url cơ bản
Hàm helper `url` có thể được sử dụng để tạo url cho ứng dụng của bạn. Url được tạo ra sẽ tự động được thêm HTTP/HTTPS và host từ request hiện tại.
```
$post = App\Post::find(1);

echo url("/posts/{$post->id}"); // http://example.com/posts/1
```
### Truy cập và lấy thông tin của URL hiện tại
Nếu không truyền tham số cho hàm helper `url`, một đối tượng của `Illuminate\Routing\UrlGenerator` sẽ được tạo ra cho phép bạn lấy thông tin của URL hiện tại.
```
// Get the current URL without the query string...
echo url()->current();

// Get the current URL including the query string...
echo url()->full();

// Get the full URL for the previous request...
echo url()->previous();
```
Các phương thức trên cũng có thể được truy cập thông qua `URL facade`.
```
use Illuminate\Support\Facades\URL;

echo URL::current();
```
# Sử dụng Named Routes để quản lý URL
Hàm helper `route` có thể được sử dụng để tạo ra URL cho named routes. Named routes cho phép bạn tạo ra URL mà không quan tâm đến URL được định nghĩa trên route. Vì các route được quản lý bởi name nên nếu URL của route thay đổi, không cần phải thay đổi lại ở những nơi đang sử dụng route.

Ví dụ :
```
Route::get('/post/{post}', function () {
    //
})->name('post.show');
```
Sử dụng hàm route để gọi route đã định nghĩa.
```
echo route('post.show', ['post' => 1]); // http://example.com/post/1
```

Bạn có thể truyền param là 1 đối tượng của Eloquent models. Hàm `route` sẽ tự động hiểu rằng khóa chính của đối tượng đó là param.
```
echo route('post.show', ['post' => $post]);
```
Bạn củng có thể truyền nhiều tham số hơn.
```
Route::get('/post/{post}/comment/{comment}', function () {
    //
})->name('comment.show');

echo route('comment.show', ['post' => 1, 'comment' => 3]); // http://example.com/post/1/comment/3
```

### Signed URLs
Signed URLs là 1 helper giúp chúng ta chứng thực xem request gửi lên server có hợp lệ hay không. 
Laravel cho phép bạn dễ dàng tạo các  "URL signed" cho các named routes. Các URL này có hàm băm để tạo ra 1 chuỗi gọi là "signature" được nối vào chuỗi truy vấn trên URL cho phép Laravel xác minh rằng URL chưa được sửa đổi kể từ khi được tạo . Signed URLs rất hữu ích cho các route có thể truy cập công khai nhưng cần 1 lớp bảo vệ để ngăn chặn các thao tác trên URL.

Ví dụ: Bạn muốn tạo ra URL dùng để  hủy đăng kí email cho khách hàng `.../user/1/unsubscribe`, và tất nhiên link này có thể truy cập trên trình duyệt. Nhưng nếu người dùng thay đổi ID của user trên đường link thì sẽ dẩn đến những user khác củng bị unsubscribe. Vì vậy chúng ta cần dùng `Signed URLs` để chứng thực xem URL đó có phải là giả mạo hay không.

Để tạo một signed URL to a named route, chúng ta sử dụng hàm `signedRoute` của URL facade.
```
use Illuminate\Support\Facades\URL;

return URL::signedRoute('unsubscribe', ['user' => 1]);
```
Nếu bạn muốn tạo ra một  signed route URL tạm thời và có thời gian hết hạn. Bạn có thể sử dụng hàm `temporarySignedRoute`.
```
use Illuminate\Support\Facades\URL;

return URL::temporarySignedRoute(
    'unsubscribe', now()->addMinutes(30), ['user' => 1]
);
```

### Validating Signed Route Requests
Để xác đinh request đến có chứa signature hợp lệ hay không, chúng ta có thể sử dụng hàm `hasValidSignature`.
```
use Illuminate\Http\Request;

Route::get('/unsubscribe/{user}', function (Request $request) {
    if (! $request->hasValidSignature()) {
        abort(401);
    }

    // ...
})->name('unsubscribe');
```

Ngoài ra, chúng ra củng có thể sử dụng middleware `Illuminate\Routing\Middleware\ValidateSignature` cho route.
Thêm middleware vào `$routeMiddleware` trong file `App\Http\Kernel.php`. 
```
protected $routeMiddleware = [
    'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
];
```
Sau đó bạn có thể thêm middleware cho route.
```
Route::post('/unsubscribe/{user}', function (Request $request) {
    // ...
})->name('unsubscribe')->middleware('signed');
```
Nếu request đến không có signed hợp lệ, middleware sẽ tự động trả về  lỗi 403.
# URLs For Controller Actions
Hàm `action` sẽ tạo ra 1 URL cho controller action.
```
use App\Http\Controllers\HomeController;

$url = action([HomeController::class, 'index']);
// hoặc có tham số truyền vào.
$url = action('UserController@profile', ['id' => 1]);
```
# Default Values
Đối với 1 số ứng dụng, ạn có thể muốn sử dụng các tham số mặc đinh trong toàn bộ request ngay trên URL. Ví dụ như nhiều route cùng sử dụng 1 param là {locale}
```
Route::get('/{locale}/posts', function () {
    //
})->name('post.index');
```

Sẽ rất bất tiện và khó thay đổi khi luôn phải truyên locale mỗi khi sử dung hàm `route`. Do đó, chúng ta có thể sử dụng hàm `URL::defaults` để xác định giá trị mặc định cho tham số locale sẽ luôn được thêm vào trong request hiện tại. Bạn có thể gọi phương thức này trong midleware.
```
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\URL;

class SetDefaultLocaleForUrls
{
    public function handle($request, Closure $next)
    {
        URL::defaults(['locale' => $request->user()->locale]);

        return $next($request);
    }
}
```

> Các bạn có thể xem đầy đủ hơn tại [đây](https://laravel.com/docs/5.8/urls)