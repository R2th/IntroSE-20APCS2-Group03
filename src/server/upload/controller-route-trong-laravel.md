# Giới thiệu
- Trong mô hình MVC thì **C - Controller** chuyên đảm nhận việc xử lý logic cho yêu cầu của người dùng.
- Khi các bạn vào 1 trang web nào đó ví dụ [code.viblo.asia](code.viblo.asia) thì bạn đã gửi 1 yêu cầu tới một **Controller** để nó đưa bạn đến giao diện của trang web đó.

# Controller
## 1. Tạo một controller
- Trong laravel thì để tạo một controller thì bạn sử dụng lệnh:
```
php artisan make:controller ten_controller
```
- Kết quả:
```php
<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
 
class ten_controller extends Controller
{
   //
}
```
- Ở đây bạn có thể định nghĩa ra các function để xử lý logic bà bạn mong muốn.
- Nhưng nên định nghĩa như nào? Nên định nghĩa gì ở đây?
- Thì dưới đây là một ví dụ:

```php
<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
 
class ten_controller extends Controller
{
   public function index()
    {
        return 'hello world';
    }
}
```

- Khi bạn khi báo một hàm là **index** thì mặc định khi bạn gọi đến **controller** này function index sẽ được chạy.
- Ngoài **index** ra thì cũng có một hàm sẽ mặc định chạy khi bạn gọi **controller** là **__invoke**:
```php
<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
 
class ten_controller extends Controller
{
      /**
     * Provision a new web server.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        //
    }
}
```

- Để có function này bạn chỉ cần thêm option **--invokable** khi tạo controller:
```
php artisan make:controller ten_controller --invokable
```

## 2. Resource Controllers
- Giống với **Controller** bình thương nhưng khi bạn tạo **Resource Controllers** thì bạn sẽ nhận được các function có sẵn là **index, create, show, edit, update, delete**
```
php artisan make:controller HomeController --resource
```
- Chính vì vậy mà **resource controller** rất hữu dụng khi bạn cần thực thi CRUD một tài nguyên nào đó. Ngoài ra khi khai báo **resource controller** bạn cũng không cần tạo từng đường dẫn đến từng function mà chỉ cần sử dụng **resource** là được.

# Routes
- Khi bạn đã có **controller** thì tất nhiên phải có một cái gì đó để dẫn đến đó rồi. Nhìn tiêu đề thì bạn cũng đã biết đó là gì rồi 😅.
- Để khai báo **routes** thì bạn cần thư mục **routes**

![image.png](https://images.viblo.asia/53a8a4c4-314c-4807-a681-56423ef099ba.png)

- Ở đây bạn sẽ thấy 4 file nhưng bạn chỉ cần để ý đến 2 file là **api.php và web.php**.
- Với **api.php** thì bạn sẽ định nghĩa các `api` ở đây. Còn **web.php** để định nghĩa các **routes** trên đường dẫn web.
## 1. Các phương thức trong Routes
- Trong laravel hỗ trợ các phương thức:
```php
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);
```
- Trong đó $url: đường dẫn route và $callback : là một hành động được thực hiện.
## 2. Tham số tùy chọn
- Bạn cũng có thể truyền tham số ở trong URL bằng cách đặt chúng giữa **{}** là được:
```php
Route::get('user/{id}', function($id) {
      echo "ID của user là : " . $id;
});
```
- Tất nhiên là bạn cũng có thể truyền nhiều tham số trên một URL chứ không chỉ một:
```php
Route::get('user/{id}/{name}/{comment}', function($id, $name, $comment) {
      echo "ID của user là : " . $id;
      echo "<br>Tên của user là : " . $name;
      echo "<br> Comment của user: " . $comment;
});
```
## 3. resource routes
- Như ở trên phần **controller** cũng có nhắc đến thì tác dụng của nó rất đơn giản đó là thay vị bạn phải khai báo 1 đống các **routes** thì bạn chỉ cần khai báo 1 **routes** cho tất cả chúng:
```php
Route::resource('home', PostController::class);
```
- Bạn sẽ nhận được các routes tương ứng:

![image.png](https://images.viblo.asia/7e46a966-6086-4c84-8ff2-34851136503c.png)

## 4. Tên routes
- Như bạn cũng thấy ở trên ảnh có một cột là **tên route** thì để khai báo tên của một route thì bạn chỉ cần:
```php
Route::get('/post', PostController@show)->name('posts');
```
## 5. Group routes
- Bạn có thể nhóm nhiều route có chung hành vi vào một nhóm:
```php
Route::get('admin/posts', 'PostController@index');
Route::get('admin/posts/create', 'PostController@create');
Route::post('admin/posts/store', 'PostController@store');
Route::get('admin/posts/{id}/edit', 'PostController@edit');
```
- Thành:
```php
Route::group(['prefix' => 'admin'], function () {
    Route::get('posts', 'PostController@index');
    Route::get('posts/create', 'PostController@create');
    Route::post('posts/store', 'PostController@store');
    Route::get('posts/{id}/edit', 'PostController@edit');
    Route::patch('posts/{id}', 'PostController@update);
    Route::patch('posts/{id}', 'PostController@destroy');
});
```

- Tất nhiên chung một **Controller** cũng được.

# Kết lại
- Bài viết này giới thiệu cho bạn những thứ cở bản nhất để tạo một **controller** và cách gọi đến controller đó thông qua **routes**.
- Mong rằng chúng sẽ giúp ích được cho mọi người.