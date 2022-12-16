![](https://images.viblo.asia/8106819e-a220-4407-b785-b470d7d7069d.png)
## I. Tình huống
Mình xin bắt đầu bằng một trường hợp thế này cho dễ hiểu nhé các bạn:
Giả dụ bạn đang có action `update` trong `UserController` cần truyền vào param là `$id`
```
<?php
namespace App\Http\Controllers;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        return view('index');
    }
}
```
Trên view `edit.blade.php` mình có đoạn` <script>` như sau:
```
<script>
    var id = ...;
    link = 'user/update/' + id;
    window.location = link;
</script>
```
Route của bạn như sau:
```
Route::put('uer/update/{id}', ['as' => 'user.update', 'uses' => 'UserController@update']);
```

> Tình huống ở đây là gì, bạn không thích sử dụng cái `link = 'user/update/' + id;` vì như thế trông thật khó coi, bạn muốn bằng cách bào đó có thể sử dụng được route của laravel trong trường hợp như thế này, kiểu như link = {{ route('user.update', ['id' => id]) }} Vậy giờ ta làm sao, làm sao một biến của Js lại có thể táng được vào trong khối scrip nhể ??? Và giải pháp trong trường hợp này là dùng [laroute](https://github.com/aaronlord/laroute) . Để mình minh họa bằng hình ảnh nhể :man_detective:
![](https://viblo.asia/uploads/77694d1e-263b-409b-b1ef-4c5cea75ee15.png)
Chỗ biến js id ở 1 giờ mình cần nhét vào khối `{{ 2 }}` kia.
## II. Sử dụng
Bạn cài đặt như [link này](https://github.com/aaronlord/laroute) nhé.
Sau khi bạn chạy lệnh `php artisan vendor:publish --provider='Lord\Laroute\LarouteServiceProvider'` như trong [hướng dẫn](https://github.com/aaronlord/laroute#configure-optional) thì sẽ sinh ra một thư mục `app/config/packages/lord/laroute/config.php` đây chính là thư mục để bạn config cho laroute.
Giả sử giờ trong file web.php mình có định nghĩa vài action như sau:
```
<?php

Route::get('/', function () {
    return view('welcome');
});

Route::post('post/update/{id}', 'PostController@update')->name('post.update');
Route::get('post/index', 'PostController@index')->name('post.index');
```
OK! Giờ bạn chạy tiếp câu lệnh:
`php artisan laroute:generate`
Nó sẽ tạo ra file `public/js/laroute.js` đây chính là file mà bạn cần include vào trang mà bạn muốn viết controller vào trong js. Chúng ta cùng xem qua nó chút nhé:
![](https://viblo.asia/uploads/5bfaa236-3dc2-44f9-b151-f615fc0a0bb6.png)
Tất cả những route mà bạn viết trong file web.php của laravel sẽ đều được định nghĩa trong file laroute.js này. 
Giờ trong trang `index.blade.php` bạn chỉ cần thêm file laroute.js vào là ok rồi :))) 
`<script src="/js/laroute.js"></script>`
Rồi sau đó gọi đến controller `PostController@delete` như sau:
Với cách sử dụng `action`
`laroute.action('PostController@update', {id: 3});`
Với cách sử dụng `route`
`laroute.route('post.update.{id}', { id : 3 });`
Đó mọi thứ thật dễ dàng phải không.
> Một chú ý thêm, khi bạn có thay đổi trong file web.php thì bạn hãy chạy câu lệnh `php artisan laroute:generate` để nó gen lại cái action tương ứng vào trong `laroute.js` nhé
## III. Kết luận
Các bạn có thể sử dụng laroute với nhiều mục đích khác nhau. Với mình chỉ là để có thể viết được cú pháp của laravel vào trong js. Tuy nhiên các bạn có thể sử dụng nó để tạo ra một ứng dụng single page. Mình hy vọng bài viết này sẽ giúp ích cho các bạn. Xin cảm ơn !