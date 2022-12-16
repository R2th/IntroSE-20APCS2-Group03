### 1. Cấu trúc thư mục 'routes' trong Laravel
Tất cả các tuyển đường đi truy cập vào trang web của chúng ta đều được định nghĩa trong thư mục **routes** .Các file trong thư mục này được tải tự động bởi Laravel.
![](https://images.viblo.asia/908fafba-2e60-4af5-a48c-058410946876.png)

- File **routes/web.php** định nghĩa các tuyến đường dùng cho giao diện web. Những tuyến đường này được đăng gán cho nhóm **web** middleware, các nhóm này cung cấp các đặc điểm như trạng thái session và bảo vệ CSRF.

- File **routes/api.php** định nghĩa những tuyến đường tĩnh(bên phía Server không có trạng thái của Client giữa các requests) và được gán cho nhóm **api** middleware.

- FIle **channels.php** là nơi bạn có thể đăng ký tất cả các kênh [event broadcasting](https://laravel.com/docs/master/broadcasting)  hỗ trợ ứng dụng của bạn (nâng cao).

- File **console.php** bạn có thể định nghĩa các lệnh console đơn giản thông qua Closure trong file này

Trong hầu hết các ứng dụng, bạn sẽ bắt đầu với việc định nghĩa các route trong file **web.php** ,ví dụ như sau: 
```php
Route::get('/index', 'ClientController@index')->name('home');
```
Điều này có nghĩa là khi bạn bắt đầu vào 1 trang web, hàm index() trong ClientController sẽ được gọi và bạn sẽ xử lý dữ liệu load trang trong hàm này.

Hàm **name('home')** sẽ gán tên cho route này ,khi gọi route naỳ chúng ta chỉ cần nhớ tên và đặc biệt khi thay đổi đường dẫn route ta chỉ cần thay đổi 1 lần trong route.

Ví dụ với route name:
```php
//thay vì gọi đến <a href="/index">Home</a>
<a href="{{ route('home') }}">Home</a>
```

### 2. Các phương thức Laravel Route hỗ trợ:
```php
//method GET dùng xử lý những yêu cầu lấy tài nguyên
Route::get($uri, $callback);

//method POST dùng xử lý những yêu cầu tạo mới tài nguyên
Route::post($uri, $callback);

//method PUT dùng xử lý những yêu cầu sửa toàn bộ tài nguyên
Route::put($uri, $callback);

//method PATCH dùng xử lý những yêu cầu sửa 1 phần tài nguyên
Route::patch($uri, $callback);

//method DELETE dùng xử lý những yêu cầu lấy tài nguyên
Route::delete($uri, $callback);

//ví dụ như route::(match/any/group/...) mình sẽ giới thiệu ở những phần dưới đây
Route::options($uri, $callback);
```


Đôi khi bạn cần đăng ký  một route mà phản hôì cho nhiều phương  thức của route, lúc đấy ta sử dụng thương thức **match()** . Hoặc bạn có thể gộp lại phản hồi chung cho bất kỳ phương thức nào cho 1 route bằng cách sử dụng **any** :

```php
Route::match(['get', 'post'], '/', function () {
    //
});

Route::any('/', function () {
    //
});
```

Lưu ý:  Tất các các HTML forms trỏ đến các route sử dụng POST, PUT, PATCH, DELETE được định nghĩa trong **route/web.php** đều phải được đính kèm trường CSRF token. Nếu không request sẽ bị từ chối và trả về trang 404.

```php
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```
Bạn có thể đọc thêm về CSRF Protection [tại đây](https://laravel.com/docs/7.x/csrf)

### 3. Các route chuyển hướng

Nếu bạn đang xác định một tuyến đường chuyển hướng đến một URI khác, bạn có thể sử dụng Route::redirect() :
```php
Route::redirect('/here', '/there');
```

### 4. View routes

Nếu route của bạn chỉ cần trả về 1 view, bạn nên sử dụng Route::view() :

```php
//khi truy cập /welcome trên thanh địa chỉ ,nó sẽ tra về file welcome.blade.php của bạn
Route::view('/welcome', 'welcome');

//có thể truyển thêm 1 mảng vào tham số thứ 3 của route như sau
Route::view('/welcome', 'welcome', ['name' => 'Taylor']);
```

### 5. Tham số trong Route

##### - Tham số bắt buộc :
Tham số bắt buộc trong route phải được đặt trong đấu ngoặc kép '{ parameter }', bạn có thể có bao nhiêu tham số tùy theo yêu cầu sử dụng :
```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```
Khi nhận tham số xử lý trong route , các tham số được lấy lần lượt the thứ tự và tên có thể  không giống tên truyền vào trong route .Trong ví dụ trên thì biến **post** tương ứng với **postId** và **comment** tương ứng với **commentId**


##### - Tham số tùy chọn
Biến tùy chọn được định nghĩa như sau: 
```php
//mặc định nếu bạn không truyền vào gì trong biến name thì name=null
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

////mặc định nếu bạn không truyền vào gì trong biến name thì name='John'
Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```

### 6. Ràng buộc về biểu thức chính quy

Bạn có thể ràng buộc các tham số truyền vào bằng cách dùng hàm **where()** và kết hợp với biểu thức chính quy để chặn các request không mong muốn. Nhưng thường mình sẽ viết 1 **FormRequest** để xử lý các tham số trong request .Cái này tùy mục đích các bạn sử dụng nhé :

```php
Route::get('user/{name}', function ($name) {
    //
})->where('name', '[A-Za-z]+');
```

### 7. Nhóm middleware 

Laravel có cung cấp cho chúng ta phương thức **group()** để nhóm lại các tuyến đương có thể đi chung qua các middleware, có cùng không gian tên (namespace) , tên miền phụ , tiền tố route, có cùng 1 đoạn tên trong route name . Điều này làm cho code chúng ta dễ đọc và dễ quản lý hơn.

##### - Các route đi qua chung middleware

```php
//Các route khai báo trong group() này đều phải đi qua first middleware và second middleware
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // route này sẽ đi qua first & second Middleware trước khi xử lý các logic trong hàm
    });

    Route::get('user/profile', function () {
        // route này sẽ đi qua first & second Middleware trước khi xử lý các logic trong hàm
    });
});
```

##### - Các route có chung không gian tên (namespace)
Khi sử dụng Route này, các Controller hoặc tài nguyên trong cùng 1 namespace có thể gọi trực tiếp đến tên của từng thành phần mà không cần khai báo đến đường dẫn đầy đủ của nó. Nếu chưa biết, bạn có thể tìm hiểu thêm về namespace để hiểu rõ hơn.

```php
Route::namespace('Admin')->group(function () {
    // Controllers Within The "App\Http\Controllers\Admin" Namespace
});
```

##### - Các route có cùng tên miều phụ 

```php
Route::domain('{account}.myapp.com')->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

##### - Các route có chung tiền tố đường dẫn

```php
Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // Khớp với "/admin/users" URL
    });
    
    Route::get('comments', function () {
        // Khớp với "/admin/comments" URL
    });
});
```

##### - Các routes có chung tiền tố khi đặt tên với hàm route name()

```php
Route::name('admin.')->group(function () {
    Route::get('users', function () {
        // Route này sẽ được đặt tên tương ứng là "admin.users"...
    })->name('users');
    
    Route::get('comments', function () {
        // Route này sẽ được đặt tên tương ứng là "admin.comments"...
    })->name('comments');
});
```

Trên đây mình đã chia sẻ cho các bạn về Routing trong Laravel phần 1 , hẹn gặp lại mọi người trong các bài viết tiếp theo.

Tham khảo :https://laravel.com/docs/7.x/routing