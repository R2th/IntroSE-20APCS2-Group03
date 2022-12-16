Xin chào anh em, tiếp tục series **Laravel và những điều thú vị về nó** thì hôm nay mình muốn giới thiệu đến anh những kiến thức liên quan đến **Route**. Nếu như khi mình làm một project bằng PHP thuần thì chúng ta sẽ sử file htaccess dùng để cấu hình máy chủ apache , tức là khi người dùng đánh đường dẫn trên browser thì đường dẫn đó sẽ map trong file htaccess để điều hướng đến các page của trang web. Nhưng trong Laravel thì `Route ` sẽ thực hiện điều đó.
# 1.Cấu trúc thư mục
Thì để viết Route trong Laravel thì chúng ta sẽ viết trong routes/web.php - định nghĩa các route cho web, còn routes/api.php để định nghĩa route cho api.
![](https://images.viblo.asia/5c64e436-15f9-4aac-8c3c-061974b621c7.png)
# 2.Cơ bản về Route
Bây giờ chúng ta thử mở file routes/web.php lên để viết thử 1 Route xem nó chạy thử như nào nhé.
```PHP
<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('test-route', function () {
    return "Xin chao cac ban";
});
```
Bây giờ chúng ta gõ đường link `localhost:8000/test-route` nhé
![](https://images.viblo.asia/3a1fef18-e9dd-4c7a-ab56-24e2a0a222d4.png)
## Các phương thức trong Route
Thì mặc định route sẽ hỗ trợ các phương thức như sau:

```PHP
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);
```
Trong đó \$url: đường dẫn route và \$callback : là một hành động nào đó sẽ được thực hiện để trả về.
## Tham số tùy chọn
Nhiều khi chúng ta sẽ cần truyền tham số trên đường dẫn, chúng ta cũng có thể truyền trong route. Ví dụ,chúng ta cần lấy ID của user từ URL, chúng ta có thể viết route như sau:
```PHP
Route::get('user/{id}', function($id) {
      echo "ID của user là : " . $id;
});
```
Ngoài ra chúng ta cũng có thể truyền nhiều tham số trong URL
```PHP
Route::get('user/{id}/{name}/{comment}', function($id, $name, $comment) {
      echo "ID của user là : " . $id;
      echo "<br>Tên của user là : " . $name;
      echo "<br> Comment của user: " . $comment;
});
```
## Tên Route
Tên routes cho phép chúng ta thuận tiện hơn khi chuyển hướng các route cụ thể. Chúng ta có thể đặt tên route bằng cách thêm `name` khi chúng ta định nghĩa route.
```PHP
Route::get('posts', function () { 
    //code
})->name('posts');
```
Hoặc ngoài ra chúng ta cũng có thể chỉ định tên route cho controller.
```PHP
Route::post('posts', 'PostController@store')->name('posts.store');
```
## Sử dụng helper route()
Khi chúng ta đã đặt tên route trong phần định nghĩa route ở trên, chúng ta cũng có thể lấy đường dẫn bằng helper `route()`. Ví dụ: `$url = route('posts.store')`. Hoặc chúng ta cũng có thể chuyển hướng trang bằng cách sử dụng hàm `route()`: `return redirect()->route('posts.list')`.

Khi route được đặt tên và có tham số trên đường dẫn thì chúng ta sẽ sẽ truyền tham số vào trong hàm helper `route()` như sau. Ví dụ chúng ta có route sau :
```PHP
Route::get('user/{id}', function($id) {
      echo "ID của user là : " . $id;
})->name('users.detail');
```
\$url = route('users.detail', ['id' => 10]);
## Nhóm Route
Nhiều khi những route có chung hành vi thì chúng ta sẽ nhóm route vào.
```PHP
Route::group(['namespace' => 'Admin'], function () {
    Route::get('/', function ()    {
        //code
    });

    Route::get('posts', function () {
        //code
    });
});
```
Ở trên chúng ta thấy xuất hiện `namespace` , đừng bối rối vì mình sẽ giới thiệu cho các bạn ngay ở dưới đây.
## Namespaces
Namespace trong Laravel giông như PHP namespace được chỉ định với một nhóm controller.
```PHP
Route::group(['namespace' => 'Admin'], function() {
    // Controllers trong namespace "App\Http\Controllers\Admin"
});

```
## Prefix
Chúng ta zét ví dụ sau
```PHP
Route::get('admin/posts', 'PostController@index');
Route::get('admin/posts/create', 'PostController@create');
Route::post('admin/posts/store', 'PostController@store');
Route::get('admin/posts/{id}/edit', 'PostController@edit');
Route::patch('admin/posts/{id}', 'PostController@update);
Route::patch('admin/posts/{id}', 'PostController@destroy');
```
Các bạn có thấy đặc điểm chung của các route trên không, nó đều bắt đầu bằng admin vì thể để viết gọn lại các URL thì chúng ta sẽ sử dụng `prefix` để URL khi định nghĩa route ngắn gọn dễ nhìn hơn.
```PHP
Route::group(['prefix' => 'admin'], function () {
    Route::get('posts', 'PostController@index');
    Route::get('posts/create', 'PostController@create');
    Route::post('posts/store', 'PostController@store');
    Route::get('posts/{id}/edit', 'PostController@edit');
    Route::patch('posts/{id}', 'PostController@update);
    Route::patch('posts/{id}', 'PostController@destroy');
});
```
# 3.Route Model Binding
Qua các ví dụ trên chắc hẳn bạn cũng hiểu được phần nào về các thành phần cơ bản của route. Chúng ta cùng xét ví dụ nhé
```PHP
Route::get('admin/posts/{id}', 'PostController@getPostDetail');

//trong Controller PostController chúng ta sẽ định nghĩa function getPosstDetail như sau

public function getPostDetail($id)
{
    $post = Post::find($id);//trả về một instance model
}
```
## Implicit Binding
Trong Laravel thì nó sẽ có hỗ trợ tự động giải quyết gợi ý Eloquent models được xác định bên trong route hoặc controller có tên biến phù hợp với tên segment.
```PHP
Route::get('admin/posts/{post}', 'PostController@getPostDetail');
​
//trong Controller PostController chúng ta sẽ định nghĩa function getPosstDetail như sau
​
public function getPostDetail(Post $post)
{
    //code
}
```
Giải thích tí chỗ này nhé: Trong ví dụ trên, Eloquent đã gợi ý biến $post định nghĩa trong route phù hợp với {post} segment trong URL, Laravel tự động đẩy các model Post có ID phù hợp với giá trị tương ứng từ URL. Nếu không tìm thấy trong CSDL của bạn thì nó sẽ trả về lỗi 404 HTTP.

## Explicit Binding
Để đăng ký một explicit binding, sử dụng phương thức model để xác định class cho một than số. Các bạn nên định nghĩa explicit bindings bên trong phương thức `boot` của `RouteSerrviceProvider` class
```PHP
public function boot()
{
    parent::boot();

    Route::model('post', App\Post::class);
}
```
Trong file web.php định nghĩa một route 
```PHP
Route::get('admin/{post}', 'PostController@getPosstDetail');
```

Khi chúng ta rằng buộc tham số {post} trong model App\Post, một instance của Post sẽ được inject vào route. Vì vậy ví dụ như một request đến admin/1 sẽ được hiểu như là lấy ra bài post có id = 1. Nếu instance model không tìm thấy trong CSDL, một response 404 HTTP sẽ tự động được sinh ra.

## Chú ý.
Nếu mà chúng ta tạo bảng mà có khóa chính khác với `id`. Ví dụ thường thường các bạn sẽ đặt khóa chính trong table là `id` nhưng bây giờ mình không muốn đặt là `id` nữa thì sẽ thay đổi như sau. Viết vào trong Eloquent model
```PHP
/**
 * Get the route key for the model.
 *
 * @return  string
 */
public function getRouteKeyName()
{
    return 'post_id';
}
```
# 4. Form
Nếu như bạn không dùng `Laravel Collective` mà các bạn dùng thuần HTML Form thì khi chúng ta định nghĩa một số method `PUT, PATCH, DELETE` thì sẽ không được hỗ trợ để map method với route nào. Vì vậy khi định nghĩa `PUT, PATCH, DELETE` routes mà được gọi từ HTML Form thì chúng ta sẽ cần thêm trường input `hidden` vào form. Giá trị của trường hidden là method sẽ sử dụng phương thức HTTP request nào. Ví dụ
```PHP
<form action="posts/1" method="POST">
    <input type="hidden" name="_method" value="PUT">
    <input type="hidden" name="_token" value="UYZ2pUvpnxytOMB3U28efT78GH7Dl9wupySLRZ0F">
</form>
```
# 5.Kết luận
Vừa rồi thì mình cùng với các bạn tìm hiểu những cái cơ bản nhất về route, nó có thể giúp các bạn mường tượng cách sử dụng route như thế nào. Mình xin kết thúc bài viết ở đây, mọi thắc mắc gì hãy comment phía dưới bài viết cho mình nhé !!
# 6.Tham khảo
https://laravel.com/docs/5.6/routing

https://laravel.com/docs/5.6/helpers#method-route