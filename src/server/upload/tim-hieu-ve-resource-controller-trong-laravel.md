## Giới thiệu
Trong laravel, việc sử dụng các route post, get, group để gọi đến 1 action của Controller đã là quá quen đối với các bạn sử dụng framework này. 
Trong 1 dự án, làm việc với các action đọc, thêm, xóa, sửa có lẽ là không thể tránh khỏi. Như vậy với mỗi action này, ta sẽ phải viết 1 dòng route::method(). Như thế sẽ dẫn đến việc file route của các bạn sẽ dài và khó đọc. 
Laravel cung cấp cho chúng ta 1 công cụ vô cùng hữu ích để tối ưu hóa code cho việc này, đó chính là Resource controllers.

Để có thể thấy rõ hơn lợi ích khi sử dụng resource controllers, mình sẽ đưa ra 1 ví dụ như sau:
Bạn muốn tạo 1 controller để xử lý tất cả các request cho "Photos" được lưu trữ bởi ứng dụng của bạn. Bạn sử dụng lệnh dưới đây sẽ tạo cho bạn 1 controller như vậy.
```php
php artisan make:controller PhotoController --resource
```
Sau khi chạy lệnh trên, đây là file controller được sinh ra
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

```
## Khai báo
Tiếp theo bạn khai báo route cho controller
```php
Route::resource('photos', 'PhotoController');
```
Chỉ với 1 dòng khai báo như này, là bạn đã khai báo cho tất cả các action trong PhotoController.
Bạn cũng có thể khai báo cho nhiều resource controller cùng 1 lúc bằng cách truyền vào 1 mảng cho phương thức resouce:
```php
Route::resources([
    'photos' => 'PhotoController',
    'posts' => 'PostController'
]);
```
## Các action được xử lý bởi resource controller:


|Phương thức|URI | Hành động|Tên route|
| -------- | -------- | -------- | ------|
| GET     |`/photos` | index   | photos.index|
| GET     |`/photos/create` |	create   | 	photos.create|
| POST     |`/photos` | 	store  | photos.store|
| GET     |`/photos/{photo}` | show   |photos.show|
| GET     |`/photos/{photo}/edit` | edit | photos.edit|
| PUT/PATCH     |`/photos/{photo}` |update   | photos.update|
| DELETE     |`/photos/{photo}` |destroy   |photos.destroy|
## Cách giả method
Ví trong html không có các method PUT, PATCH, DELETE nên bạn sẽ cần dùng lệnh `@method` để có thể gán các method này vào cho bạn.
```html
<form action="/foo/bar" method="POST">
    @method('PUT')
</form>
```
## Partial Resource Routes
Khi khai báo resource route như ban đầu mình hướng dẫn, hệ thống sẽ mặc định sẽ xử lý toàn bộ các action trong đó. Tuy nhiên, nếu bạn chỉ muốn dùng 1 số action nhất định trong đó, bạn có thể khai báo như sau:
```php
Route::resource('photos', 'PhotoController')->only([
    'index', 'show'
]);
```
hoặc 
```php
Route::resource('photos', 'PhotoController')->except([
    'create', 'store', 'update', 'destroy'
]);
```
Hàm `only()` sẽ chỉ sử dụng các action trong mảng bạn truyền vào, còn hàm `except()` sẽ sử dụng tất cả ngoại trừ các action trong mảng truyền vào.

## Ghi đè name routes
Mặc định tất cả các route trong resource controller sẽ có tên như trong bảng bên trên. Tuy nhiên bạn có thể ghi đè tên route bằng cách sau đây:
```php
Route::resource('photos', 'PhotoController')->names([
    'create' => 'photos.build'
]);
```
## Kết luận
Vâỵ là mình đã giới thiệu xong cho các bạn về Resource controller trong laravel. Nếu có thắc mắc hay ý kiến gì các bạn có thể comment bên dưới để mình hoàn thiện bài viết hơn.

Mình xin cảm ơn!