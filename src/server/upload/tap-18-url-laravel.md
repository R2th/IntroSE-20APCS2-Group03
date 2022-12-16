Hello, chào mừng các bạn đã quay trở lại với series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Trong tập ngày hôm nay, chúng ta sẽ cùng nhau tìm hiểu một component nhẹ nhàng, đó là "URL". Nghe tên là đã thấy quá quen thuộc rồi đúng không, chính vì vậy mình sẽ bắt tay vào hướng dẫn các bạn các cú pháp luôn.

# I. Cơ bản (The basic)
## 1. Khởi tạo URL cơ bản (Generating basic URL)
Method `url` sẽ giúp chúng ta tạo các URL tùy chỉnh cho ứng dụng. Việc khởi tại URL sẽ tự động thêm các scheme (HTTP hoặc HTTPS) và host từ request hiện tại. Tham số của `url` chính là URI.

```PHP:routes/web.php
Route::get('url', function() {
    return url('test');
});
```

![](https://images.viblo.asia/146da8c3-be86-4284-888b-b415b429c610.JPG)

Bạn cũng có thể truyền biến vào method `url` như sau:

```PHP:routes/web.php
Route::get('/posts/{post}', function($post) {
    return url("posts/{$post}");
});
```

![](https://images.viblo.asia/f9d15ed7-8c6a-44a8-892e-61e8bf856143.JPG)

> **Lưu ý:** Khi truyền biến vào method `url` phải sử dụng cặp dấu `""`.
> 
## 2. Truy cập URL hiện tại (Accessing the current URL)
Nếu như không truyền bất kỳ tham số nào vào `url`, lớp `Illuminate\Routing\UrlGenerator` sẽ được trả về. Lúc này bạn có thể gọi các phương thức để lấy thông tin về URL hiện tại.

```PHP
// Lấy URL hiện tại không bao gồm chuỗi query
echo url()->current();

// Lấy URL hiện tại bao gồm chuỗi query
echo url()->full();

// Lấy URL đầy đủ của request trước
echo url()->previous();
```

Bạn có thể gọi các phương thức này thông qua `URL` facade.

```PHP
use Illuminate\Support\Facades\URL;

echo URL::current();
```

Ngoài ra còn nhiều method nữa trong `Illuminate\Routing\UrlGenerator`, bạn có thể tự mình tìm hiểu thêm.

# II. URL của route được đặt tên (URL for named route)
Về phần này chắc mình cũng đã có lấy ví dụ trong các tập trước, với method `route` ta có thể lấy URL của các named route. Chẳng hạn mình có một named route như sau:

```PHP
Route::get('/home', function() {
    //
})->name('home');
```

Giờ để lấy URL của route này ta chỉ cần sử dụng phương thức `route`.

```PHP
echo route('home'); // http://localhost:8000/home
```

Nếu named route của bạn có chứa tham số trên URI thì bạn vẫn có thể truyền dữ liệu để tạo URL.

```PHP
Route::get('posts/{post}', function() {
    //
})->name('post');
```

```PHP
echo route('post', ['post' => 1]); // http://localhost:8000/posts/1
```

Bạn cũng có thể truyền một model object để framework tự động tách lấy key cần tham chiếu.

```PHP
echo route('post', ['post' => $post]);
```

Bạn có thể dễ dàng truyền URL vào thẻ `form` trong blade view chẳng hạn:

```PHP
<form action="{{ route('post', ['post' => $post])" method="POST">
    //
</form>
```

# III. Signed URL
Nói một chút về "Signed URL", đây là một dạng URL được đăng ký tồn tại trong một thời gian nhất định, bao gồm các mã token. Thường được ứng dụng để làm liên kết đổi mật khẩu, xác thực thông tin hoặc đơn giản là chuỗi token xác thực trong mỗi request admin-side.

Laravel cho phép chúng ta dễ dàng tạo một "signed URL" với các named route. Các signed URL này có mã token nối với query `signature` xác minh rằng URL này là duy nhất. Ví dụ giờ chúng ta đăng ký singed URL cho route đổi mật khẩu người dùng. Với method `signedRoute` của `URL` facade, ta có thể dễ dàng đăng ký một signed URL cho bất cứ named route nào.

```PHP
use Illuminate\Support\Facades\URL;

URL::signedRoute($nameRoute, $dataParameters);
```

Method `signedRoute` này sẽ nhận hai tham số:
* Tham số thứ nhất chính là name route mà bạn muốn tạo signed URL.
* Tham số thứ hai (tùy chọn) là các dữ liệu truyền cho tham số URI của route.

Nếu ứng dụng bạn cần quy định thời gian tồn tại cho các signed URL thì bạn có thể sử dụng method `temporarySignedRoute`.

```PHP
use Illuminate\Support\Facades\URL;

URL::temporarySignedRoute($nameRoute', now()->addMinutes($minutes), $dataParameters);
```

Khác với `signedRoute`, phương thức này sẽ thêm một tham số thời gian tồn tại của signed URL dưới dạng datetime. Bạn có thể sử dụng các method `addSeconds`, `addHours`... để tùy biến giới hạn thời gian.

Bây giờ chúng ta sẽ bắt tay vào thử nghiệm, ta sẽ tạo hai route sau:

```PHP:routes/web.php
use Illuminate\Support\Facades\URL;

Route::get('/create', function() {
    return URL::signedRoute('change_password', ['user' => 1]);
});

Route::get('change_password/{user}', function($user) {
    return 'Change password user ' . $user;
})->name('change_password')->middleware('signed');
```

Với route `/create` ta dùng để tạo signed URL. Tại named route `change_password`, các bạn để ý mình đã đăng ký middleware `signed`. Nếu bạn thắc mắc không biết middleware này ở đâu thì bạn có thể mở file `app/Http/Kernel.php` và quan sát tại mảng `$routeMiddleware`.

```PHP
protected $routeMiddleware = [
    'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
];
```

Middleware này có công dụng sẽ kiểm tra xem URL truy cập vào route có phải là một signed URL xác thực hay không, nếu khớp thì nó sẽ cho phép truy cập route, còn không thì nó sẽ trả về trang lỗi 403.

Chẳng hạn giờ bạn thử truy cập đường dẫn http://localhost:8000/change_password/1 xem, chắc chắn sẽ nhận được như thế này:

![](https://images.viblo.asia/2979c5fd-3f90-40c2-8fde-626e95b43e15.JPG)

Lý do là bạn đã đăng ký middleware `signed` cho named route này nên khi URL không có mã token xác thực thì nó sẽ không cho phép bạn truy cập.

Bậy giờ hãy thử tạo signed URL thông qua route `/create`, ta sẽ nhận được đường dẫn để có thể truy cập named route `change_password`.

![](https://images.viblo.asia/53e687c5-4726-41bb-871f-546262e8c590.JPG)

Như bạn thấy, phía sau có kèm thêm query `signature` với giá trị là một mã token nào đó. Giờ hãy thử truy cập đường dẫn này, ta sẽ có thể vào được route `change_password`.

![](https://images.viblo.asia/1eb5b79d-7c81-4f01-9115-43725070df0f.JPG)

Ngoài ra, nếu bạn muốn tùy chọn kết quả tra về nếu như chứng thực sai thì có thể làm như sau:

```PHP:routes/web.php
use Illuminate\Http\Request;

Route::get('/change_password/{user}', function (Request $request) {
    if (! $request->hasValidSignature()) {
        // Chưa xác thực
    }

    // ...
})->name('change_password');
```

Như vậy thay vì trả về lỗi 403 mặc định, bạn có thể tùy chỉnh theo ý của mình.

> **Lưu ý:** Signed URL của từng named route chỉ khởi tạo một lần trong phiên làm việc trình duyệt đối với mỗi người dùng.

# IV. URL của controller action (URL for controller action)
Với method `action`, bạn chỉ cần truyền controller action đã định nghĩa, nó sẽ trả về URL đầy đủ của route chứa controller action đó. Bạn có thể truyền controller action theo dạng chuỗi `Namespace\NameController@method` hoặc dưới dạng mảng.

Dạng chuỗi:

```PHP
$url = action('HomeController@index');
```

> **Lưu ý:** Bạn không cần phải thêm namespace `App\Http\Controllers` trước các controller khi truyền tham số nếu truyền theo dạng chuỗi.

Dạng mảng:

```PHP
use App\Http\Controllers\HomeController;

$url = action([HomeController::class, 'index']);
```

Nếu route bạn có chứa tham số, bạn có thể làm như sau:

```PHP
$url = action('UserController@profile', ['id' => 1]);
```

Chẳng hạn mình có route như sau:

```PHP
Route::get('/home', 'HomeController@index');
```

Bây giờ mình muốn lấy URL của route đó thông qua controller action, mình có thể làm thế này:

```PHP
echo action('HomeController@index'); // http://localhost:8000/home
```

# V. Giá trị mặc định
Nếu bạn muốn gán giá trị mặc định cho một tham số nào đó trên toàn bộ route thì bạn có thể sử dụng method `defaults` của `URL`facade. Chẳng hạn ứng dụng của bạn đa ngôn ngữ, mỗi đường dẫn trong ứng dụng sẽ có dạng `http://myapp.com/{locale}/...`. Bây giờ bạn muốn sẽ tự động gán giá trị `{locale}` đó trong tất cả các route.

Ví dụ mình có route sau:

```PHP:routes/web.php
Route::get('/{locale}/post', function() {
    return 'My post';
})->name('post');
```

Việc mình cần làm bây giờ là gán giá trị mặc định cho `{locale}`. Bạn có thể thiếp lập trong middleware, ở đây mình sẽ tạo middleware `SetDefaultLocaleForUrls` với nội dung sau:

```PHP:app/Http/Middleware/SetDefaultLocaleForUrls.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\URL;

class SetDefaultLocaleForUrls
{
    public function handle($request, Closure $next)
    {
        URL::defaults(['locale' => config('app.locale')]);

        return $next($request);
    }
}
```

Sau đó bạn khai báo nó là route middleware tại `app/Http/Kernel.php`.

```PHP:app/Http/Kernel.php
protected $routeMiddleware = [
    'locale' => \App\Http\Middleware\SetDefaultLocaleForUrls::class,
];
```

Như vậy, khi sử dụng method `route` cho named route `post`, bạn không cần phải truyền giá trị cho `{locale}` nữa. Ta có thể test bằng cách thêm route sau:

```PHP:routes/web.php
Route::get('/try', function() {
    return route('post');
})->middleware('locale');
```

Đây là kết quả: 

![](https://images.viblo.asia/78db7785-70d8-43d6-a984-42567f84ae78.JPG)

---- 

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ