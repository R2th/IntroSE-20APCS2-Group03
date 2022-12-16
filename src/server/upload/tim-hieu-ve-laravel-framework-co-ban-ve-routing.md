Đối với *Laravel Framework*, mỗi khi có một request mới, các web server (như Nginx hoặc Apache) sẽ giao lại việc xử lý cho Laravel ở một file entry point duy nhất (nằm ở thư mục `public/index.php` trong thư mục project). Sau đó, từng request sẽ được Laravel tự động điều hướng đến controller phù hợp, thông qua một tính năng gọi là *Routing*.

Trong bài viết này, mình xin được chia sẻ những kiến thức về bộ định tuyến (routing) trong Laravel mà mình học được trong quá trình tìm hiểu về Laravel Framework.

# File cấu hình các route ở đâu?
Các file cấu hình route đều nằm trong thư mục `routes/` trong project của bạn. Cụ thể, có 2 file mà bạn cần quan tâm bây giờ:
* `routes/web.php` nếu bạn cần cấu hình định tuyến cho các trang web truyền thống
* `routes/api.php` nếu định tuyến bạn muốn tạo là dạng API

Điểm khác biệt cơ bản: `routes/web.php` có các middleware cung cấp các tính năng như session hay bảo vệ trước CSRF, mà những cái này không cần thiết lắm đối với dạng API.  Còn các route trong `routes/api.php` thì các địa chỉ tự động được thêm prefix `/api` vào phía trước.

# Định nghĩa một route
Một route đơn giản nhất có thể được viết như sau:
```php
Route::get('foo', function () {
    return 'Hello World';
});
```
Truy cập thử vào `localhost:8000/foo`, bạn sẽ có:

![Minimal route](https://images.viblo.asia/e7d16e50-66cc-4799-a5f6-a5c0ab693902.png)

Đây là một route rất đơn giản, chỉ trả lại dữ liệu phản hồi luôn mà không thông qua controller.

Còn trong trường hợp bạn đã định nghĩa một controller (trong `app/Http/Controllers/`) và muốn tạo một route điều hướng đến controller đó:
```php
Route::get('/posts', 'PostController@index');
```

# Các HTTP method (verb)
Ngoài GET ra, bạn cũng có thể định nghĩa route cho các HTTP method khác:
```php
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);
```

Hoặc thậm chí nhiều loại HTTP method cùng lúc:
```php
Route::match(['get', 'post'], '/', function () {
    //
});

Route::any('/', function () {
    //
});
```
# Bảo vệ khỏi CSRF
Với các route được định nghĩa trong `routes/web.php`, bạn cần phải để ý thêm cả trường CSRF vào trong các form gửi đi như sau:
```html
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```

# Chuyển hướng
Bạn có thể thiết lập một route cho phép chuyển hướng route đến địa chỉ khác:
```php
// Chuyển hướng (mặc định status code là 302):
Route::redirect('/here', '/there');
// Chuyển hướng vĩnh viễn (status code là 301):
Route::redirect('/here', '/there', 301);
// Cũng tương tự dòng trên (status code là 301):
Route::permanentRedirect('/here', '/there');
```

# Route tĩnh (chỉ trả lại một *view*)
Với các route đơn giản, ta có thể cho nó trả về view luôn mà không cần thông qua một controller.
```php
Route::view('/welcome', 'welcome');
// Ta có thể truyền thêm cả array đến view:
Route::view('/welcome', 'welcome', ['name' => 'Taylor']);
```

# Tham số trong route
Khi phát triển trang Web, bạn sẽ thường xuyên gặp phải trường hợp cần "bắt" các tham số trên URL và sử dụng nó để hiển thị ra nội dung tương ứng. Ví dụ, khi người dùng truy cập `https://example.com/users/1`, bạn cần phải trả về được thông tin của người dùng có id là 1 trong CSDL. Ở Laravel, có 2 loại tham số là bắt buộc và không bắt buộc.

Định nghĩa một route có yêu cầu tham số đơn giản nhất như sau:
```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```

Tuy nhiên, đôi khi bạn có thể muốn định nghĩa một route mà phần tham số có thể có hoặc không (tham số không bắt buộc). Để định nghĩa một route như vậy, bạn chỉ cần thêm dấu *?* vào sau tên tham số như ví dụ dưới đây:
```php
Route::get('welcome/{name?}', function ($name = 'my friend') {
    return 'Welcome, ' . $name . '!';
});
```
Kết quả:
* Nếu bạn truy cập `/welcome` thôi thì route trên sẽ trả về "Welcome, my friend!".
* Nếu bạn truy cập `/welcome/Thang` thì route trên lại trả về "Welcome, Thang!".

# Tiền tố (prefix) cho nhóm route
Laravel cho phép bạn nhóm nhiều route lại với nhau thành một nhóm. Việc nhóm route có rất nhiều ứng dụng, các route cùng nhóm có thể được assign cùng các middleware, namespace, hay cùng một tiền tố (prefix). 

Có rất nhiều trường hợp hay gặp cần dùng prefix. Ví dụ như khi trang web của bạn có các path bình thường `/posts`, `/users`,... cho người dùng, và có đường dẫn riêng cho dashboard dành cho admin sử dụng `/admin/users`, `/admin/posts`,... Trong trường hợp này, bạn nên tạo một nhóm các route dành cho admin và dùng tính năng prefix cho nhóm route đó.

Để tạo một nhóm route với prefix cho *admin* như trên, bạn có thể thêm như sau:
```php
Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // Dành cho path đến "/admin/users"
    });
    
    Route::get('posts', function () {
        // Dành cho path đến "/admin/posts"
    });
});
```
# Resourceful Route
Resourceful Route là tính năng giúp ta tạo ra các route của đầy đủ các HTTP method, tương ứng với các action trong controller tương ứng, với đầy đủ các thao tác lên một loại dữ liệu (đọc, thêm, sửa, xóa,...). Route dạng này giúp bạn tránh khỏi việc phải định nghĩa từng route cho từng thao tác một lên một loại dữ liệu.

Để định nghĩa ra resourceful route như vậy rất đơn giản:
```php
Route::resource('photos', 'PhotoController');

// Bạn cũng có thể định nghĩa nhiều resourceful route một lúc:
Route::resources([
    'photos' => 'PhotoController',
    'posts' => 'PostController'
]);
```

Ví dụ đối với *photos*, đoạn code định nghĩa route trên sẽ tạo ra nhiều route khác nhau, tương ứng với các action của *PhotoController* như sau:

| Verb | URI | Action | Route Name |
| -------- | -------- | -------- | --------- |
| GET|/photos|index|photos.index|
| GET |/photos/create|create|photos.create|
| POST|/photos|store|photos.store|
|GET|/photos/{photo}|show|photos.show|
|GET|/photos/{photo}/edit|edit|photos.edit|
|PUT/PATCH|/photos/{photo}|update|photos.update|
|DELETE|/photos/{photo}|destroy|photos.destroy|

Khi sử dụng Resourceful Route, nếu bạn chỉ muốn định nghĩa một vài loại action nào đó, hoặc loại trừ một vài loại action, thì bạn có thể định nghĩa như sau:
```php
// Chỉ có các route tương ứng với action index, show cần đ
Route::resource('photos', 'PhotoController')->only([
    'index', 'show'
]);

// Loại trừ các action create, store, update, destroy không cần thiết
Route::resource('photos', 'PhotoController')->except([
    'create', 'store', 'update', 'destroy'
]);
```
# Tạm kết
Trên đây là những tính năng cơ bản của Routing trong Laravel. Để tìm hiểu thêm chi tiết hơn về chức năng Routing của Laravel, mong bạn hãy đọc ở [tài liệu chính thức](https://laravel.com/docs/master/routing) của Laravel. Cảm ơn các bạn đã đọc bài viết na!