Laravel 8 vừa mới được phát hành với một loạt các thay đổi cũng như chức năng.  Một trong những thay đổi đó là việc loại bỏ route namespace mặc định.

Mặc dù thay đổi này có tính tương thích ngược, nghĩa là những dự án cũ đã sử dụng Laravel 7.x có thể dễ dàng chuyển sang Laravel 8.x mà không cần thay đổi bất cứ điểu gì, tuy nhiên các dự án mới được áp dụng Laravel 8 ngay từ đầu lại phải quan tâm đến điều này

Rất nhiều developers phải đối mặt với vấn đề trong việc tạo một Project laravel 8, họ cố gắng load `routes` và gặp phải một vài `Exception`  điển hình như

```
Target class [PostController] does not exist.
```

Vấn đề này không phải là lỗi do code, tuy nhiên 99,9% các hướng dẫn về Laravel hiện tại đều không phù hợp trong trường hợp này bởi vì hầu hết chúng đều dựa vào `namespace` mặc định để đưa ra.

## Thay đổi
Cho đến Laravel 7 thì `RouteServiceProvider.php` đều có phần mã sau

```RouteServiceProvider.php
$protected $namespace = 'App\Http\Controllers';

Route::middleware('web')
    ->namespace($this->namespace)
    ->group(base_path('routes/web.php'));
```

Đoạn code trên nói cho Laravel rằng khi load `routes` được định nghĩa trong file `routes/web.php` thì sẽ mặc định sử dụng `web` middleware và namespace là `App\Http\Controllers`. Cụ thể hơn, nghĩa là mỗi lần bạn khai báo một route mới trong file `routes/web.php` sử dụng cú pháp như bên dưới, Laravel sẽ tìm kiếm các controller trong folder `App\Http\Controllers` :
```
Route::get('posts', 'PostController@index');s
```
*Larvel sẽ sử dụng controller `App\Http\Controllers\PostController.php`*


Tuy nhiên khi đến với Laravel 8, khi bạn khai báo routes sử dụng cú pháp như vậ Laravel sẽ không tìm kiếm controller trong thư mục `App\Http\Controllers` nữa. Vấn đề chính là ở đây

## Làm sao để fix

Vâng như ở trên thì chúng ta đã biết với Laravel 8, sẽ không có default namespace chính vì vậy Laravel sẽ không biết tìm controller của bạn ở đâu. Có ba cách để bạn nói với Laravel biết điều này:
1. Thêm namespace mặc định cũng tương tự như Laravel 7 đã là trước đó.
2. Sử dụng đưỡng dẫn đến controller kèm cả namespace khi khai báo một route mới.
3. Sử dụng cú pháp action (recommended)

### Thêm namespace thủ công
Việc này cực kì đơn giản. Chỉ cần đến file `RouteServiceProvider.php` và bạn sẽ nhìn thấy đoạn code dưới đây:

```RouteServiceProvider.php
public function boot()
{
    $this->configureRateLimiting();
    
    $this->routes(function () {
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
            
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));
    });
}
```

Tất cả những gì bạn phải làm là thêm 3 dòng code như dưới đây và Laravel sẽ có thêm default namespace tương tự như Laravel 7:

```RouteServiceProvider.php
protected $namespace = 'App\Http\Controllers';

public function boot()
{
    $this->configureRateLimiting();
    
    $this->routes(function () {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
            
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    });
}
```
Chúng ta vừa làm gì? Chúng ta khai báo biến `$namespace` và sử dụng nó làm namespace mặc định cho cả web và api routes.

Nếu bạn chạy ứng dụng một lần nữa, mọi thứ sẽ hoạt động lại bình thường.

### Khai báo route sử dụng namespace đầy đủ
Nếu sử dụng phương pháp này bạn sẽ phải áp dụng chco tất cả các routes của bạn, nhưng ý tưởng của nó rất đơn giản: thêm vào đằng trước tên controller của bạn bằng namespace của chính nó. Xem ví dũ dưới đây là bạn sẽ hiểu ngay thôi

```
Route::get('posts', 'App\Http\Controllers\PostController@index');
```
Lại tiếp tục thử chạy lại  app của mình nhé.

### Sử dụng cú pháp action

Đây là một giải pháp được khuyên dùng vì sẽ được các IDE hỗ trợ tốt hơn vì nó có thể xem được chính xác là class nào đã được sử dụng. Thay vì sử dụng cú pháp khai báo bằng string như thông thường chúng ta có thể sử dụng có pháp action này bằng cách chỉ định class và method để sử dụng trong một array

Khi sử dụng cú pháp string
```
Route::get('posts', 'PostController@index');
```

Thay vì đó sử dụng cú pháp action
```
Route::get('posts', [PostController::class, 'index']);
```

Lưu ý chúng ta phải gọi đến `PostController::class` thay vì sử dụng string `'PostController'` như vậy nó sẽ trả về `'App\Http\Controllers\PostController'`. Giá trị thứ hai được truyền vào array chính là tên của phương thức chúng ta sẽ sử dụng trong controller.

Một lần nữa hãy thử chạy lại ứng dụng của bạn và mọi thứ sẽ họat động tốt.


## Kết luận
Với một vài cách như trên hi vọng rằng project của bạn sẽ không phải gặp lỗi namespace nữa và hoạt động tốt.

Tài liệu tham khảo:
> https://medium.com/@litvinjuan/how-to-fix-target-class-does-not-exist-in-laravel-8-f9e28b79f8b4