Rất vui lại được gặp các bạn trong series "[Hành trình chinh phục Laravel framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" của mình. Ngày hôm nay, chúng ta sẽ cùng tìm hiểu về component "Response" của Laravel. Thì đây cũng là một component khá đơn giản, chủ yếu là học cú pháp và các tính năng của nó. Chính vì vậy, mình sẽ không nói về "Response" nữa mà đi thẳng vào bài luôn nhé!

# I. Tạo response (Creating response)
## 1. Chuỗi và mảng (String and array)
Tất cả các route và controller nên trả về một response để gửi cho trình duyệt người dùng. Laravel cung cấp cho chúng ta nhiều cách khác nhau để trả về response. Một response đơn giản nhất là trả về chuỗi từ route hoặc controller. Framework sẽ tự động chuyển chuỗi về HTTP response đầy đủ.

```PHP
Route::get('/', function() {
    return 'Home page';
});
```

Ngoài việc trả về chuỗi từ route hoặc controller , bạn có thể trả về một mảng. Framrwork sẽ tự động chuyển mảng đó về JSON response.

```PHP
Route::get('/', function() {
    return [1, 2, 3];
});
```

![](https://images.viblo.asia/4c43efec-2c41-4a72-a717-1c2bf366483d.JPG)

## 2.  Đối tượng response (Response object)
Thông thường thì bạn sẽ không trả về các chuỗi hoặc mảng đơn giản trong ứng dụng. Thay vào đó bạn sẽ trả về lớp khởi tạo đầy đủ `Illuminate\Http\Response` hoặc view.

Trả về lớp khởi tạo đầy đủ `Response` cho phép chúng ta tùy chỉnh mã trạng thái (status code) của HTTP response và header. Lớp `Response` này kế thừa từ class `Symfony\Component\HttpFoundation\Response`, cung cấp nhiều method cho việc xây dựng HTTP response.

Chẳng hạn:
```PHP
Route::get('home', function () {
    return response('Hello World', 200)
                ->header('Content-Type', 'text/plain');
});
```

Ta đã thiết lập status code HTTP response là 200 thông qua tham số thứ hai của method `response`. Ngoài ra còn đính kèm header `Content-Type: text/plain` bằng phương thức `header` kế tiếp.

## 3. Đính kèm header vào response (Attaching header to response)
Hãy nhớ rằng tất cả các method response có thể kết nối được, cho phép bạn xây dựng bất kỳ trường hợp response nào. Chẳng hạn bạn có thể thêm hàng loạt header với method `header` trước khi trả về người dùng.

```PHP
return response($content)
            ->header('Content-Type', $type)
            ->header('X-Header-One', 'Header Value')
            ->header('X-Header-Two', 'Header Value');
```

Hoặc thay vì kết nối nhiều method như vậy, bạn có thể sử dụng method `withHeaders` để truyền nhiều header dưới dạng mảng.

```PHP
return response($content)
            ->withHeaders([
                'Content-Type' => $type,
                'X-Header-One' => 'Header Value',
                'X-Header-Two' => 'Header Value',
            ]);
```

## 4. Cache controll middleware
Laravel cung cấp `cache.headers` middleware, cung cấp cú pháp nhanh để thiết lập `Cache-Controll` header cho một nhóm route. Nếu `etag` được liệt kê trong cú pháp thì hàm băm MD5 của response sẽ tự động đặt cho ETag identifier.

```PHP
Route::middleware('cache.headers:public;max_age=2628000;etag')->group(function() {
    Route::get('privacy', function () {
        // ...
    });

    Route::get('terms', function () {
        // ...
    });
});
```

 Nếu bạn nào vẫn chưa biết gì về `Cache-Control` thì có thể tìm hiểu trên Google.  Ở đây mình chỉ tản mạn một chút về công dụng của nó là để:
 * Tối ưu tốc độ tải trang (cache các ảnh lớn, file JS, file CSS...)
 * Tăng tính bảo mật (chẳng hạn tránh trường hợp sau khi người dùng logout hệ thống nhưng khi nhấn nút "Back" của trình duyệt thì vẫn hiển thị các nội dung khi đăng nhập)

## 5. Đính kèm cookie cho response (Attaching cookie to response)
Với method `cookie` trên response object cho phép chúng ta dễ dàng đính kèm một cookie đến response. Chẳng hạn:

```PHP
return response($content)
                ->header('Content-Type', $type)
                ->cookie('name', 'value', $minutes);
```

Method `cookie` này cũng nhận các tham số đặc biệt khác như `setcookie` của PHP.

```PHP
->cookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)
```

## 6. Cookie và mã hóa (Cookie and encryption)
Theo mặc định thì tất cả cookie tạo bởi Laravel đều được mã hóa khi đăng ký để user không thể thay đổi và đọc được chúng. 

![](https://images.viblo.asia/2bd860b7-ca64-4116-a554-6dff52878488.JPG)

Nếu bạn muốn tắt mã hóa một cookie nào đó trong ứng dụng, bạn có thể liệt kê nó trong `$except` của middleware `App\Http\Middleware\EncryptCookies`.

```PHP:app/Http/Middleware/EncryptCookie.php
protected $except = [
    'name',
];
```

![](https://images.viblo.asia/11175f95-1882-4d0d-a41d-3e16930e56a1.JPG)
# II. Chuyển hướng (Redirect)
## 1. Chuyển hướng đến URI (Redirecting to URI)
Redirect response khởi tạo từ lớp `Illuminate\Http\RedirectResponse`, chứa các header thích hợp để xây dựng một redirect response. Có rất nhiều cách để khởi tạo lớp `RedirectResponse`, nhưng có lẽ đơn giản nhất là sử dụng global helper function `redirect`.

```PHP
Route::get('dashboard', function () {
    return redirect('home/dashboard');
});
```

Cú pháp này chắc quá quen thuộc với các bạn rồi, tham số mà method `redirect` nhận đó chính là URI cần đến.

Thỉnh thoảng bạn muốn khi người dùng submit form mà bị lỗi thì chuyển về trang trước để người dùng kiểm tra lại. Cách giải quyết thì trong các tập trước mình đã có nói đến rồi, ở tập này mình chỉ nhắc lại. Chúng ta sẽ sử dụng method `back`, cùng với `withInput` để đáp ứng yêu cầu trên.

```PHP
return back()->withInput();
```

## 2. Chuyển hướng đến route được đặt tên (Redirecting to named route)
Khi bạn gọi method `redirect` mà không truyền tham số vào, một lớp khởi tạo `Illuminate\Routing\Redirector` sẽ được trả về. Do đó, ta có thể gọi bất kỳ method nào từ lớp `Redirector` đó. Chẳng hạn để redirect đến named route, bạn chỉ cần kết nối theo phương thức `route`.

```PHP
return redirect()->route('name_route');
```

Ví dụ mình đăng ký hai route như sau:

```PHP:routes/web.php
Route::get('/', function() {
    return redirect()->route('home');
}); 

Route::get('/home', function() {
    return 'Home page';
})->name('home');
```

Như bạn thấy, khi mình truy cập route `/` thì sẽ redirect đến route có name là `home`.

Nếu URI route của bạn chứa tham số, bạn có thể truyền dữ liệu thông qua tham số thứ hai dưới dạng mảng. Chẳng hạn:

```PHP
Route::get('/', function() {
    return redirect()->route('profile', ['id' => 1]);
}); 

Route::get('/profile/{id}', function($id) {
    return 'Profile '. $id;
})->name('profile');
```

Đây là kết quả khi truy cập đường dẫn http://localhost:8000:

![](https://images.viblo.asia/c8b231f0-71e7-42ae-b150-00a5473dac53.JPG)

Ngoài ra bạn cũng có thể truyền dữ liệu dưới dạng object model nếu bạn đang chuyển hướng đến URI có tham số dạng ID. Giá trị ID sẽ được xuất tự động

```PHP
return redirect()->route('profile', [$user]);
```

Nếu bạn không muốn truyền giá trị ID theo mặc định, bạn có thể thay đổi bằng cách khai báo phương thức `getRouteKey` ở trong file model để thay đổi key ID mặc định. 

```PHP
public function getRouteKey()
{
    return $this->slug;
}
```

Hiện giờ do chúng ta chưa tìm hiểu về "Eloquent ORM" nên không thể test được, các bạn có thể tự kiểm chứng khi đã tìm hiểu vào các tập sau.

## 3. Chuyển hướng đến controller action (Redirecting to controller action)
Bạn có thể tạo chuyển hướng đến route chứa controller action thông qua method `action`. Việc của bạn là chỉ cần truyền tên controller và tên method chứa trong route muốn chuyển đến. Nhớ rằng bạn không cần phải viết đầy đủ namespace `App\Http\Controllers` vì `RouteServiceProvider` đã tự động load cho bạn rồi.

Ví dụ giờ mình đăng ký hai route sau:

```PHP:routes/web.php
Route::get('/', function() {
    return redirect()->action('HomeController@show');
}); 

Route::get('/home', 'HomeController@show');
```

Tiếp theo là tạo controller `HomeController` và định nghĩa method `show` như sau:

```PHP:app/Http/Controllers/HomeController.php
public function show()
{
    return 'Home page';
}
```

Giờ bạn hãy thử truy cập route `/` xem, chắc chắn nó sẽ chuyển hướng bạn đến route `/home`.

> **Lưu ý:** Các controller action khai báo trong `action` yêu cầu đã được đăng ký trong route nào đó, nếu không sẽ xuất hiện lỗi.
> 
> ![](https://images.viblo.asia/17a03402-4d96-4cd0-9c09-6b94e7014960.JPG)

## 4. Chuyển hướng đến tên miền bên ngoài (Redirecting to external domain)
Nếu bạn muốn chuyển hướng ứng dụng đến một tên miền khác thì có thể sử dụng method `away` với tham số là URL đầy đủ cần đến.

```PHP
return response()->away('https://google.com');
```

## 5. Chuyển hướng với flash session (Redirecting with flash session)
Redirect đến một URL mới và flash session thường được thực hiện cùng một lúc. Chẳng hạn bây giờ mình đăng ký hai route như sau:

```PHP:routes/web.php
Route::get('/', function() {
    return redirect('home')->with('name', 'Lê Chí Huy');
}); 

Route::get('/home', function() {
    return view('home');
});
```

Tại action của route `/`, ta thực thi chuyển hướng đến URI `/home`, đồng thời thực hiện flash session với method `with`. Sau khi chuyển hướng thì flash session data được thiết lập, lúc này bạn chỉ cần lấy nó ra và sử dụng thôi. Mình sẽ tạo blade view `home` với nội dung sau:

```PHP:resources/views/home.blade.php
<h1>
    @if (session('name'))
        Welcome, {{ session('name') }}
    @else
        Welcome
    @endif
</h1>
```

Như ở trên thì mình thực kiện câu điều kiện để kiểm tra xem có tồn tại flash session với tên là `name` hay không thông qua method `session`. Để render cái flash session `name` thì mình cũng sử dụng global helper `session` với tham số là tên của flash session cần lấy. Từ đó bạn có thể rút ra được nếu không tồn tại flash session thì method `session` sẽ trả về `false`.

Bây giờ chúng ta test xem nó đã hoạt động OK chưa. Như xử lý logic ở trên thì nếu vào đường dẫn http://localhost:8000/home thông qua redirect thì nó sẽ in ra màn hình như thế này:

![](https://images.viblo.asia/b7e817c9-cad6-4661-876c-db732205ac2c.JPG)

Còn nếu vào URL http://localhost:8000/home trực tiếp thì ta sẽ được kết quả:

![](https://images.viblo.asia/ea224470-2919-4f90-9841-346f9332e26f.JPG)

# III. Các loại response khác (Other response types)
Method `response` có thể dùng để khởi tạo các loại response khác khi bạn không truyền bất kỳ tham số nào vào nó. Lúc này method `response` sẽ trả về lớp khởi tạo `Illuminate\Contracts\Routing\ResponseFactory`.

## 1. View response
Nếu bạn cần kiểm soát trạng thái của response cũng như header mà vẫn muốn trả về nội dung cho user thì bạn có thể làm như sau:

```PHP
return response()
            ->view('hello', $data, 200)
            ->header('Content-Type', $type);
```

Còn nếu như bạn không cần thay đổi status code HTTP hay tùy chỉnh gì header thì việc chỉ khai báo method `view` nên được lựa chọn.

## 2. JSON response
Phương thức `json` sẽ tự động set `Content-type: application/json`, chuyển đổi các mảng về dạng JSON sử dụng phương thức `json_encode` của PHP.

```PHP
return response()->json([
    'name' => 'Lê Chí HUy',
    'state' => 'VN'
]);
```

![](https://images.viblo.asia/3f29af43-7a75-4a79-b795-981e5febd2ef.JPG)

Nếu muốn tạo JSONP response, bạn có thể sử dụng phương thức `json` cùng với `withCallback`.

```PHP
return response()
            ->json(['name' => 'Abigail', 'state' => 'CA'])
            ->withCallback($request->input('callback'));
```

Về JSONP thì có lẽ một số bạn vẫn chưa biết, mình xin tản mạn một chút là nó dùng để thực thị lấy dữ liệu từ máy chủ trong một tên miền khác thông qua hàm callback tự định nghĩa. Bạn có thể tìm hiểu thêm trên Google.

## 3. Download file
Method `download` thường được sử dụng để tạo một response bắt buộc người dùng download một file tại đường dẫn nhất định.

```PHP
return response()->download($pahtFile, $nameFile, $headers);
```

Method này chấp nhận tham số thứ hai để thay đổi tên file khi người dùng download. Ngoài ra ta có thể truyền thêm mảng cấu hình các header thông qua tham số thứ ba.

>**Lưu ý:** Mặc định method `download` sẽ được gán base path `public` cho đường dẫn fle donwload.

Chẳng hạn bây giờ mình muốn download file `resources/views/welcome.blade.php` mặc định của Laravel. Các bạn thử đăng ký route sau giống mình:

```PHP:routes/web.php
Route::get('/download', function() {
    return response()->download('../resources/views/welcome.blade.php');
});
```

Bây giờ thử chạy route đó xem, ta sẽ thu được kết quả như thế này:

![](https://images.viblo.asia/21bc37d9-ee62-4cbc-af8e-17fe51703571.JPG)

Nếu bạn muốn một cái tên khác khi download, có thể thêm tham số thứ hai như sau:

```PHP:routes/web.php
Route::get('/download', function() {
    return response()->download('../resources/views/welcome.blade.php', 'other_name.php');
});
```

![](https://images.viblo.asia/4732660f-01df-416c-9fff-544693a8f917.JPG)

Kết qua trên thấy được blade view `welcome.blade.php` đã được rename thành `other_name.php` rồi đấy.

Như đã nói ở trên, bạn có thể truyền mảng header tại tham số thứ ba của method `download`.

```PHP
return response()->download($pathFile, $nameFile, $headers);
```

Bạn có thể khai báo các header theo dạng cấu trúc mảng.

```PHP
$headers = [
    'X-Header-One' => 'Header value 1',
    'X-Header-Two' => 'Header value 2',
    // ...
];
```

> **Lưu ý:** Nếu muốn thêm tham số header mà không thay đổi tên file donwload thì tại tham số thứ hai khai báo giá trị `null`.
> ```PHP
> return response()->download($pathFile, null, $headers);
> ```
> 
Ngoài ra bạn có thể xóa file ngay sau khi người dùng download bằng cách sử dụng method `deleteFileAfterSend`.

```PHP
return response()->download($pathFile, $nameFile, $headers)->deleteFileAfterSend();
```

## 4. Streamed download
Nếu bạn muốn người dùng download một nội dung nào đó mà chưa được ghi vào file nào trong hệ thống của bạn thì có thể dùng method `streamDownload`.

Phương thức `streamDownload` sẽ nhận ba tham số:
* Tham số thứ nhất là một Closure có nhiệm vụ thực hiện xử lý để `echo` nội dung cho file.
* Tham số thứ hai là tên file download.
* Tham số thứ ba (tùy chọn) là các thiết lập header.

```PHP
return response()->streamDownload(Closure, $nameFile, $headers);
```

Bạn có thể tạo route này để test:

```PHP:routes/web.php
Route::get('/stream', function() {
    return response()->streamDownload(function() {
        echo 'Lê Chí Huy';
    }, 'users.txt');
});
```

Các bạn cứ chạy xem kết quả thì sẽ hình dung ra ngay.

![](https://images.viblo.asia/1df5c252-a380-4069-b8a6-ff4aac433f5a.JPG)

Nội dung của file `users.txt` sau khi tải về sẽ là:

```TXT:users.txt
Lê Chí Huy
```

> **Lưu ý:** Bắt buộc phải dùng lệnh `echo` thì nội dung mới ghi được trên file download. Nội dung của file chỉ được là dạng text.

## 5. File response 
Nếu bạn muốn trả về response của các image, pdf... để hiển thị trên trình duyệt người dùng thay vì tải về, bạn có thể sử dụng method `file`. Method này chấp nhận tham số thứ nhất là path file cần hiển thị, tham số thứ hai tùy chọn chứa mảng thiết lập header response.

```PHP
return response()->file($pathFile, $headers);
```

> **Lưu ý:** Base path của đường dẫn file trong method `file` cũng là `public` giống như method `download`.

Chẳng hạn mình sẽ thêm một ảnh trong folder `public`.

![](https://images.viblo.asia/d36e86f0-9875-486b-8722-5f5dc3aafd0a.png)

Sau đó mình đăng ký một route như sau:

```PHP:routes/web.php
Route::get('/image', function() {
    return response()->file('image.jpg');
});
```

Và đây là kết quả:

![](https://images.viblo.asia/d9b02d49-d9de-4e6e-820a-6971994cd422.JPG)

# IV. Reponse macro
Trước khi nói phần này thì chúng ta cùng tìm hiểu chút về thuật ngữ "Macro", vì xuyên suốt series có thể ta sẽ gặp rất nhiều. Hiểu nôm na thì "Macro" định nghĩa một lệnh riêng lẽ, trong đó sẽ thực hiện các chuỗi lệnh nào đó để trả về kết quả, đại loại là khá giống với function.

Nếu bạn thích tự định nghĩa một loại response tùy chỉnh để sử dụng trong nhiều route và controller, bạn có thể sử dụng phương thức `macro` của `Response` facade. Bạn có thể tạo một service provider với tên `ResponseMacroServiceProvider` chẳng hạn, tại method `boot` bạn sẽ thực hiện việc định nghĩa các custom response.

Chẳng hạn mình muốn tạo một response để có thể trả về chuỗi in hoa, mình sẽ đăng ký với `macro` như sau:

```PHP:app/Providers/ReponseMacroServiceProvider.php
use Illuminate\Support\Facades\Response;

public function boot()
{
    Response::macro('caps', function ($value) {
        return Response::make(strtoupper($value));
    });
}
```

Như bạn thấy chúng ta sẽ sử dụng hai method `Response::macro` và `Response::make`.

Với method `Response::macro`: dùng để định nghĩa một custom response
* Tham số thứ nhất sẽ là tên của custom response.
* Tham số thứ hai sẽ là một Closure, nhận dữ liệu truyền về qua `$value`.

Với method `Response::make`: dùng để tạo response, nó sẽ nhận tham số là các chuỗi xử lý `$value` trước khi được trả về.

Ok, vậy ta đã có thể sử dụng response `caps` như những các loại response khác.

```PHP:routes/web.php
Route::get('caps/{str}', function($str) {
    return response()->caps($str);
});
```

Nhớ đừng quên liệt kệ service provider vừa tạo trong `config/app.php` nhé.

![](https://images.viblo.asia/75f8ff43-1cb4-4b22-9114-53d90c84a07d.JPG)

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ