Đây là chuỗi bài viết theo phong thái dễ hiểu, đơn giản, cơ bản, phù hợp với những người bắt đầu với Laravel từ con số 0. 
# Laravel Routing
   Phần này sẽ bao gồm các nội dung sau:
* Cách định nghĩa route.
* Cách truyền tham số trong route tới view
* Phản hồi tới một request bằng hàm xử lý trong controller.
* Giới thiệu đôi chút về php artisan
## Cách định nghĩa route - Basic Routing and Views
Trong một project laravel, thư mục routes là thư mục mà bạn có thể định nghĩa tất cả các đường dẫn (routes) cho trang web của mình. Cú pháp cơ bản như sau:
```php:app/routes/web.php
#Trả về view welcome
Route::get('/', function () {
    return view('welcome');
});
```
Khi mà chúng ta request tới web với phương thức `get` và đường dẫn là `/` (tương ứng với homepage) thì function được khai báo bên trong sẽ được thực thi. Thông thường, bên trong function, sẽ trả về một view tương ứng. Laravel sẽ check các view trong thư mục `resources/views` và trả về view chúng ta truy vấn đến (nếu có). 

Ở đây chúng ta có thể tùy biến các phương thức HTTP, đường dẫn path, xử lý bên trong function và đối tượng return (có thể là string, view, json, biến,...)
```php:app/routes/web.php
Route::get('/', function () {
    return view('welcome');
});

Route::get('/info', function () {
    return view('info');
});
# / is optional

Route::get('string', function () {
    return 'Hello world!';
});

Route::get('json', function () {
    return ['foo' => 'bar'];
});
```
## Cách truyền tham số trong route tới view - Pass Request Data to Views
Chúng ta có thể lấy dữ liệu từ request thông qua query string bằng cách sử dụng helper function request.

Ví dụ đường link là `http://127.0.0.1:8000/info?name=tientt`	 ta có thể lấy dữ liệu như sau:
```php:app/routes/web.php
Route::get('/info', function () {
    $name = request('name');
    return view('info');
});
```
Và để biến đó có hiệu lực ở view ta có thể lập trình như sau:
```php:app/routes/web.php
Route::get('/info', function () {
    $name = request('name');
    return view('info', [
        'name' => $name
    ]);
});
```
Ngoài ra, hãy cùng cân nhắc một cách rút gọn code như sau (refractoring):
```php:app/routes/web.php
Route::get('/info', function () {
    return view('info', [
        'name' => request('name')
    ]);
});
```
Ở view có các cách gọi biến sau:
```php:app/resources/views/info.blade.php
# Cách 1
<?= $name; ?>
# Cách 2
{!! $name !!}
# Cách 3
{{ $name }}
```
Ta sẽ có một số lưu ý ở đây:
* Hai cách đầu tiên sẽ thuần túy in ra nội dung của biến. Vì thế, người dùng có thể truyền 1 đoạn script và đương nhiên là khi request tới link tương ứng, đoạn script sẽ được thực thi ngay lập tức. Điều này khá nguy hiểm và vi phạm các quy chuẩn bảo mật. Vì thế, cách khuyên dùng sẽ là cách 3. Xử lý của dòng lệnh này sẽ escape các đoạn mã lệnh được truyền vào.
* Cách 2 và cách 3 là dòng lệnh thuần cú pháp của laravel, php sẽ không hiểu cú pháp này. Nhưng laravel sẽ tự động render cú pháp tương ứng, phù hợp cho php. Các bạn có thể kiểm tra lệnh php tương ứng ở thư mục `storage/framework/views`.
### Route Wildcards
Chúng ta tiếp tục xét ví dụ tiếp theo về cách sử dụng routing. Hãy cùng xem qua đoạn code sau:
```php:app/routes/web.php
#Ở đây ta thấy {detail} đây được hiểu là tham số Optional (tham số có thể truyền vào 
hoặc không). Nếu ta truyền bất kỳ nội dung nào sau info/ thì đều dẫn tới thực thi các xử lý 
trong hàm. Đồng thời, nếu muốn sử dụng nội dung đó, ta có thể khai báo đối số cho hàm như
code phía dưới ($detail). Với đoạn code này, ta có thể hiểu nhiệm vụ của $detail là 
key quyết định nội dung (trong mảng $details) sẽ được trả về cho view.
Route::get('info/{detail}', function ($detail) {
    $details = [
        'my-first-detail' => 'This is my first detail.',
        'my-second-detail' => 'This is my second detail.'
    ];
# Đoạn code dưới cũng phản ánh một trong những nguyên tắc code quan trọng. Đó là ta luôn phải 
check liệu đối tượng đó có tồn tại ở đâu hay không?, hay có khác NULL hay không, tránh làm 
chết trang web bằng một loạt các thông báo lỗi mà không có nhiều ý nghĩa đối với người dùng. 
Trong trường hợp này, nếu không tồn tại key tương ứng, trang web sẽ trả về mã lỗi kèm với
thông điệp.
    if (!array_key_exists($detail,$details)) {
        abort(404, 'Sorry, that detail was not found.');
    }
    return view('info', [
        'detail' => $details[$detail]
    ]);
});
```
## Phản hồi lại một request bằng hàm xử lý trong controller.
Khi phản hồi một request thay vì là hàm function thì chúng ta có thể dẫn tới một controller kèm với method tương ứng. Dần dần, chúng ta có thể thấy rõ được mô hình MVC được áp dụng trong laravel như thế nào.
Cách thức để khởi chạy method trong controller tương ứng với request:
```php:app/routes/web.php
Route::get('info/{detail}', 'InfosController@show');
```
Code dưới đây sẽ có xử lý tương tự trong phần code ở Route Wildcards:
```php:app/Http/Controllers/InfosController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InfosController extends Controller
{
	public function show($detail)
    {
        $details = [
            'my-first-detail' => 'This is my first detail.',
            'my-second-detail' => 'This is my second detail.'
        ];

        if (!array_key_exists($detail, $details)) {
            abort(404, 'Sorry, that detail was not found.');
        }

        return view('info', [
            'detail' => $details[$detail]
        ]);
    }
}
```
## Về php artisan
Ngoài câu lệnh `php artisan serve` đã rất quen thuộc với mọi người thì php artisan còn có rất nhiều công dụng khác.
Các bạn có thể gõ code `php artisan`để biết được xem công cụ này có thể làm được gì nhé.

Việc áp dụng trong phần này đó chính là cú pháp sinh ra controller bằng lệnh:
`php artisan make:controller InfosController`
> Phần này xin được tạm kết tại đây!
> Nguồn tham khảo: https://laracasts.com/series/laravel-6-from-scratch/