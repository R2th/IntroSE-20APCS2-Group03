Chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về Controller trong Laravel và cách sử dụng Controller trong Laravel.
## 1. Giới thiệu
Thay vì định nghĩa tất cả logic xử lý request của bạn ở file `routes.php`, thì bạn có thể muốn quản lý việc này bằng cách sử dụng các lớp Controller. Các Controller có thể nhóm các request HTTP có logic liên quan vào cùng một lớp. Các Controller được chứa tại thư mục `app/Http/Controllers`.
## 2. Controller cơ bản
### Xác định controller
Dưới đây là một ví dụ về controller trong laravel. Chúng ta nên lưu ý rằng tất cả các class controller mở rộng đều nên kế thừa class Controller do Laravel cung cấp.
```
<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
Bạn có thể xác định một route đến một action của controller như sau:
```
Route::get('user/{id}', 'UserController@show');
```
Bây giờ, khi một yêu cầu khớp với địa chỉ URI của route phương thức `show` trên class `UserController` sẽ được gọi, các tham số route cũng sẽ được chuyền vào phương thức.
### Controller && Namespaces
Bạn cần lưu ý rằng chúng ta không cần ghi đi đủ địa chỉ controller khi định nghĩa một route. Chúng ta chỉ cần định nghĩa tên controller theo sau namespace `App\Http\Controller`, bởi vì `RouteServiceProvider` tải các tệp route và các controller trong route đó đã được chỉ định theo sau namespace  `App\Http\Controller`.
Nếu bạn muốn gộp các controller của mình trong một thư mục con sau namespace `App\Http\Controller`, bạn chỉ cần gọi thêm name của thư mục đó trong route như sau:
```
Route::get('foo', 'Photos\AdminController@method');
```
## 3. Controller Middleware
Middleware có thể được gán cho controller trong route của bạn như sau:
```
Route::get('profile', 'UserController@show')->middleware('auth');
```
Tuy nhiên, sẽ là tiện lợi hơn nếu như định nghĩa middleware từ trong hàm contructor của controller. Sử dụng method middleware từ trong controller của bạn, bạn có thể dễ dàng gán middleware cho controller. Bạn thậm chí có thể hạn chế middleware cho một vài method cụ thể trong lớp controller:
```
class UserController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');

        $this->middleware('log')->only('index');

        $this->middleware('subscribed')->except('store');
    }
}
```
## 4. Resource Controllers
Những resource controller làm cho việc xây dựng các RESTful controller xung quanh các nguồn tài nguyển trở nên dễ dàng hơn. Ví dụ như, bạn có thể muốn tạo một controller xử lý những HTTP request liên quan đến "photos" được lưu trữ trong ứng dụng của bạn. Sử dụng câu lệnh Artisan make:controller, chúng ta có thể nhanh chóng tạo ra controller:

```
php artisan make:controller PhotoController --resource
```
Câu lệnh Artisan sẽ tạo ra file controller tại `app/Http/Controllers/PhotoController.php`. Controller sẽ bao gồm method cho các hoạt động của tài nguyên sẵn có.

Tiếp theo, bạn có thể muốn đăng ký một định tuyến đa tài nguyên cho controller:

```
Route::resource('photo', 'PhotoController');
```
Khai báo định tuyến duy nhất này tạo ra nhiều định tuyến để xử lý đa dạng các loại hành động RESTful cho tài nguyên "photo". Tương tự như vậy, controller được tạo ra sẽ có sẵn vài method gốc rễ cho từng hành động, bao gồm cả ghi chú thông báo cho bạn những URI và những HTTP method (POST, GET, PUT, PATCH, DELETE) nào chúng xử lý.

Bạn có thể đăng ký nhiều resource controller như sau:
```
Route::resources([
    'photos' => 'PhotoController',
    'posts' => 'PostController'
]);
```

Vì các biểu mẫu HTML không thể thêm các method `PUT`, `PATCH`, `DELETE` bạn sẽ cần thêm trường  `_method` để giả mạo các hành động này từ HTTP. Hoặc sử dụng @method trong blade Laravel:
```
<form action="/foo/bar" method="POST">
    @method('PUT')
</form>
```

### Định tuyến resource một phần
Khi khai báo một route resource bạn có thể chỉ định cho nó sử dụng một phần resource bằng phương thức `only` hoặc `except`:
```
Route::resource('photo', 'PhotoController', ['only' => [
 'index', 'show'
]]);

Route::resource('photo', 'PhotoController', ['except' => [
 'create', 'store', 'update', 'destroy'
]]);
```

### Đặt tên các định tuyến tài nguyên

Mặc định, tất cả các hành động của controller tài nguyên đều có tên; tuy nhiên, bạn có thể ghi đè những tên đó bằng cách truyền thêm chuỗi names tuỳ theo lựa chọn của bạn:

```
Route::resource('photo', 'PhotoController', ['names' => [
 'create' => 'photo.build'
]]);
```

### Đặt tên tham số của định tuyến tài nguyên

Mặc định,Route::resource sẽ tạo những tham số cho các định tuyến tài nguyên của bạn dựa trên tên tài nguyên. Bạn có thể dễ dàng ghi đè cho từng resource cơ bản bằng cách truyền parameters trong chuỗi tuỳ chọn. Chuỗi parameters nên là một mảng kết hợp giữa tên tài nguyên và tên tham số:

```
Route::resource('user', 'AdminUserController', ['parameters' => [
 'user' => 'admin_user'
]]);
```

Ví dụ trên sẽ tạo ra những URI sau cho định tuyến show của tài nguyên:

`/user/{admin_user}`

## 5. Dependency Injection & Controllers

### Constructor Injection

Service container của Laravel được dùng để xử lý tất cả các controller của Laravel. Kết quả là, bạn có thể "type-hint" bất cứ thành phần phụ thuộc nào mà controller của bạn cần vào trong constructor của controller. Các thành phần phụ thuộc sẽ được tự động xử lý và được thêm vào trong "instance" của controller:

```
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UserController extends Controller
{
 /**
  * The user repository instance.
  */
 protected $users;

 /**
  * Create a new controller instance.
  *
  * @param  UserRepository  $users
  * @return void
  */
 public function __construct(UserRepository $users)
 {
     $this->users = $users;
 }
}
```

### Method Injection
Ngoài constructor injection, bạn cũng có thể "type-hint" các thành phần phụ thuộc trong các method của controller. Ví dụ, hãy "type-hint" instance của `Illuminate\Http\Request` vào một trong những method của ta:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->name;

        //
    }
}
```
Nếu như method của controller của bạn cũng chờ đợi đầu vào từ tham sổ của định tuyến, thì đơn giản là liệt kê các đối số của định tuyến vào phía sau các thành phần phụ thuộc khác. Ví dụ, nếu định tuyến của bạn được định nghĩa như sau:

`Route::put('user/{id}', 'UserController@update');`
Bạn vẫn có thể "type-hint"` Illuminate\Http\Request `và truy cập vào tham số định tuyến của bạn id bằng cách định nghĩa method controller của bạn như sau:

```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
   /**
    * Update the specified user.
    *
    * @param  Request  $request
    * @param  string  $id
    * @return Response
    */
   public function update(Request $request, $id)
   {
       //
   }
}
```

## 6. Route Caching
Nếu như ứng dụng của bạn chỉ sử dụng các định tuyến dạng controller, thì bạn có thể sử dụng phần nâng cao của bộ nhớ đệm định tuyến của Laravel. Sử dụng bộ nhớ đệm định tuyến sẽ giảm mạng thời gian cần để đăng ký tất cả các định tuyến trong ứng dụng của bạn. Trong một vài trường hợp, việc đăng ký định tuyến của bạn có thể nhanh hơn đến 100 lần! Để tạo ra bộ nhớ định tuyến, bạn chỉ cần chạy lệnh Artisan route:cache:

`php artisan route:cache`
Đó là tất cả! File bộ nhớ đệm định tuyến của bạn sẽ được sử dụng thay cho file app/Http/routes.php. Nhớ rằng, nếu bạn thêm bất cứ route mới nào thì bạn cần phải tạo mới bộ nhớ đệm định tuyến. Do đó, bạn chỉ nên chạy câu lệnh route:cache trong quá trình phát triển dự án.

Để xoá file bộ nhớ đệm định tuyến mà không tạo file mới, sử dụng câu lện route:clear:

`php artisan route:clear`

Như vậy mình đã giới thiệu cơ bản về controller trong Laravel. 
Tài liệu tham khảo: https://laravel.com/docs/5.8/controllers#controllers-and-namespaces