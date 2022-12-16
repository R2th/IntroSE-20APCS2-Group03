Chào các bạn, khi bắt đầu tìm hiểu về **Laravel** chắc hẳn các bạn không thể bỏ qua một số khái niệm cơ bản 
như *Routing, Middleware, Controllers, Model, Requests, Responses, Views*.

Trong bài biết này mình sẽ giới thiệu một số khái niệm cơ bản về Routing.

Mục đích và chức năng của routing trong Laravel là định tuyến các Request của người dùng đến một function nào đó, hoặc một đoạn logic xử lý Request của người dùng.

### Vị trí mặc định của các file route
Tất cả các file route trong project Laravel đều được đặt trong thư mục *routes/*.
Khi cài đặt project Laravel mặc định đã có các tệp: 
    - routes/web.php: Định nghĩa các route cho giao diện web của bạn
    - routes/api.php: Định nghĩa các route cho api
### Các phương thức trong Route
Các route hỗ trợ các phương thức giao tiếp giữa browser và server thông qua HTTP:
```
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);
```
Ngoài ra laravel còn hỗ trợ chúng ta định nghĩa route xử lý nhiều phương thức với chung một response trả về là ***match*** và ***any***:
```
Route::match(['get', 'post'], '/', function () {
    //
});

Route::any('/', function () {
    //
});
```
### CSRF Protection
Mỗi khi chúng ta sử dụng bất kỳ một biểu mẫu trỏ đến các tuyến hỗ trợ POST, PUT hoặc DELETE chúng ta đều phải đính kèm một csrf protection trong request gửi lên, nếu không request sẽ bị từ chối.
```
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```
### Route Parameters
Đôi khi chúng ta cần sử dụng URI để gửi các tham số cần thiết, ở trong laravel để lấy được tham số đó chúng ta có thể định nghĩa như sau:
```
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```
Chúng ta có thể xác định nhiều tham số trên một route như sau:
```
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```
Các tham số route luôn được định nghĩa trong cặp dấu **{}**, và không được chưa các ký tự đặc biệt.

Ngoài ra chúng ta còn có thể định nghĩa thông số tùy chọn cho tham số, chúng ta chỉ cần khai báo thêm **?** sau tên của tham số vd:
```
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});
```
### Ràng buộc biểu thức chính quy
Chúng ta có thể hạn chế định dạng của tham số nhận vào bằng một biểu thức chính quy, ở Laravel đã hỗ trợ chúng ta làm điều đó với phương thức **where**:
```
Route::get('user/{name}', function ($name) {
    //
})->where('name', '[A-Za-z]+');

Route::get('user/{id}', function ($id) {
    //
})->where('id', '[0-9]+');

Route::get('user/{id}/{name}', function ($id, $name) {
    //
})->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```
### Đặt tên cho route
Các bạn có thể đặt tên cho một route cụ thể và mục đích của việc đặt tên này để chúng ta có thể truy cập đến url của route một cách nhanh hơn:
```
Route::get('user/profile', function () {
    //
})->name('profile');
```
Để rõ ràng hơn chúng ta cùng xem một vd sau sẽ thấy lợi ích của việc đặt tên cho route:
```
// Generating URLs...
$url = route('profile');

// Generating Redirects...
return redirect()->route('profile');
```
Sau khi đặt tên chúng ra có thể lấy ra địa chỉ url hoặc redirect về route đó.

Trên đây là một số khái niệm cơ bản về route trong Laravel, để có thể hiểu rõ hơn một số khái niệm khác các bạn có thể tham khảo
*      https://laravel.com/docs/6.x/routing