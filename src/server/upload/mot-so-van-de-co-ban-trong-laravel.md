Nội dung bài viết:
1. Exception and Error Handler
2. CSRF Protection
3. Restful Resource Controllers
5. Request & Responses
6. Scope
7. Accessors & Mutators

# Exception and Error Handler
Laravel cho phép quản lý 1 cách tập trung các exception với lớp `app\Exceptions\Handler`. Sử dụng lớp này cho phép chúng ta quản lý lỗi cũng như điều hướng 1 cách phù hợp đến các trang báo lỗi.
## Cấu hình
Để bật / tắt chế độ ghi log lỗi, ta theo dõi tham số `'debug' => env('APP_DEBUG', false),` trong `config/app.php`. Nó lấy giá trị `APP_DEBUG` từ file `.env`.
## Xử lý Exception
### Phương thức `report`
Được sử dụng để ghi lại các exception hoặc gửi chúng đến 1 dịch vụ bên ngoài như là Bugsnag hoặc Sentry. Mặc định thì phương thức `report` chỉ đơn giản truyền exception đến lớp nơi exception xảy ra. Tuy vậy, bạn cũng có thể tự do ghi lại các exception nếu bạn muốn.
* Helper `report`
Khi bạn cần báo cáo exception nhưng vẫn muốn tiếp tục xử lý yêu cầu hiện tại thì ta dùng hàm helper `report` cho phép báo cáo exception 1 cách nhanh chóng mà không cần hiển thị trang lỗi.
```php
public function isValid($value)
{
    try {
       // Validate the value...
    } catch (Exception $e) {
        report($e);

        return false;
    }
}
```
* Bỏ qua exception
Sử dụng thuộc tính `$dontReport` của lớp `app\Exceptions\Handler` là 1 mảng các dạng exception không muốn ghi log.
```php
protected $dontReport = [
    \Illuminate\Auth\AuthenticationException::class,
    \Illuminate\Auth\Access\AuthorizationException::class,
    \Symfony\Component\HttpKernel\Exception\HttpException::class,
    \Illuminate\Database\Eloquent\ModelNotFoundException::class,
    \Illuminate\Validation\ValidationException::class,
];
```
### Phương thức `Render`
Chuyển đổi exception đã cho thành phản hồi HTTP để gửi lại trình duyệt. Mặc định thì các exception này sẽ tạo ra phản hồi. Tuy nhiên, bạn vẫn có thể kiểm tra lại kiểu exception hoặc trả về kiểu phản hồi do bạn tùy chỉnh.
```php
public function render($request, Exception $exception)
{
    if ($exception instanceof CustomException) {
        return response()->view('errors.custom', [], 500);
    }

    return parent::render($request, $exception);
}
```
## HTTP Exception
1 số các exception tương ứng với 1 mã lỗi HTTP. Phương thức `abort` giúp bạn tạo ra các exception.
```php
abort(404);
```
Helper `abort` ngay lập tức đưa ra 1 exception, ngoài ra nó cũng nhận chuỗi để hiển thị cùng với mã lỗi.
```php
abort(403, 'Unauthorized action.');
```
## Tùy chỉnh các trang hiển thị lỗi HTTP
Để hiển thị giao diện lỗi tương ứng với phản hồi HTTP tương ứng ta tạo các file giao diện trong thư mục view. Ví dụ, với lỗi 404 ta tạo file `resources/views/errors/404.blade.php`. Thể hiện của `HttpException` được đưa ra bởi hàm `abort` sẽ được đưa vào view dưới dạng biến `$exception`.
```php
<h2>{{ $exception->getMessage() }}</h2>
```
# CSRF Protection
## Tại sao nên sử dụng CSRF
Làm giả các yêu cầu truy cập từ trang Web khác xảy ra khi kẻ tấn công gửi yêu cầu đến trang đích. Trình duyệt gửi cookie đến trang đích, vì vậy nếu người dùng có quyền trên trang web từ xa thì hành động sẽ được thực hiện. 

Ví dụ: Nếu bạn đã đăng nhập vào Facebook, 1 trang Web bị tấn công có thẻ chạy 1 số đoạn Javascript để đăng nội dung lên tài khoản Facebook. Để điều đó không xảy ra thì chung ta cần sự bảo về của CSRF Middleware.

1 giải pháp phổ biến là thêm CSRF token vào các form. Bởi vì, không thể đọc được token nên kẻ tấn công không thể thực hiện các yêu cầu đó nữa.
## CSRF Middlleware trong Laravel 5
Mặc định, Laravel cho phép middlleware VerifyCsrfToken cho tất cả các yêu cầu.
Tuy nhiên, trong 1 số trường hợp bạn không muốn sự ảnh hương của middleware này, bạn có thể thêm các URI vào thuộc tính `$except` của `VerifyCsrfToken`.
```php
protected $except = [
        'stripe/*',
        'http://example.com/foo/bar',
        'http://example.com/foo/*',
    ];
```
# Restful Resource Controllers
Tạo Resource Controllers:
```bash
php artisan make:controller PhotoController --resource
```
Đăng ký ở route:
```php
Route::resource('photos', 'PhotoController');
```
Các thao tác được xử lý khi sử dụng resource controller:

![](https://images.viblo.asia/d07f94b7-4bf7-40c7-a18d-3b7666c8cd58.png)

Nếu bạn muốn sử dụng model biding:
```bash
php artisan make:controller PhotoController --resource --model=Photo
```
Vì form không thể tạo các yêu cầu PUT, PATCH, DELETE nên ta cần sử dụng phương thức để giả mạo chúng. Từ Laravel 5.6, bạn có thể sử dụng `@method('DELETE')` ở blade thay vì `{{ method_field('DELETE') }}`.

**API Resource Routes**
Khai báo resource route sử dụng cho API, không dùng `create` và `edit`.
```php
Route::apiResource('photo', 'PhotoController');
```
# Request và Response
## Request
Laravel Request cung cấp dữ liệu về các yêu cầu HTTP cũng như cho phép thao tác với các yêu cầu này. Chúng ta có thể tạo 1 instance của HTTP Request thông qua dependency injection.
```php
    public function store(Request $request)
    {
        $name = $request->input('name');
    }
```
Một số phương thức:
* `$request->path()` trả về thông tin đường dẫn
* `$request->is()` kiểm tra đường dẫn có phù hợp với mẫu đưa ra
* `$request->url()` trả về đường dẫn của URL không có query string
* `$request->fullurl()` trả về đường dẫn của URL, có cả query string
* `$request->method()` trả về tên của yêu cầu HTTP
* `$request->isMethod('post')` kiểm tra yêu cầu có phù hợp với tên đưa vào
## Response
Mỗi request từ trình duyệt khi gửi lên máy chủ Web xử lý xong sẽ trả về 1 response cho trình duyệt hiển thị các nội dung người dùng.
# Scope
Scope dùng khi muốn thực hiện cùng 1 số điều kiện ràng buộc truy vấn với 1 hoặc nhiều các truy vấn. Để đơn giản, trong Laravel ta có thể định nghĩa các scope và sử dụng lại chúng trong định nghĩa model.
## Global Scope
```php
<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AgeScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('age', '>', 200);
    }
}
```
Để sử dụng ta cần ghi đè phương thức `boot` trong model.
```php
// App\User
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new AgeScope);
        
        // Or use Anonymous Global Scopes
        static::addGlobalScope('age', function (Builder $builder) {
            $builder->where('age', '>', 200);
        });
    }
```
Loại bỏ Global Scope trong truy vấn:
```php
User::withoutGlobalScope(AgeScope::class)->get();
```
## Local Scope
Viết ngay tại model, tên scope phải có dạng tiền tố `scope`.
```php
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }
```
Sử dụng:
```php
$users = App\User::popular()->active()->orderBy('created_at')->get();
```
**Dynamic Scopes**: Truyền tham số vào scope.

```php
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
```
# Accessors & Mutators
> Accessors and mutators dùng để định dạng các gía trị thuộc tính của Eloquent.
## Accessor
Gọi đến khi truy xuất 1 thuộc tính của đối tượng. Tên hàm phải có dạng `[get][tên thuộc tính][Attribute]`.

Ví dụ: Chuyển đổi ký tự đầu tiên của trường `first_name` thành chữ hoa.
```php
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
```
## Mutators
Thay đổi dữ liệu trước khi lưu vào CSDL.
```php
    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = strtolower($value);
    }
```
# Tạm kết
Những nội dung mình đưa vào bài viết chủ yếu là các kiến thức cơ bản trong Laravel. Mình hầu hết chỉ đưa ra khái niệm và cách sử dụng cơ bản. Các bạn để hiểu rõ chi tiết thì có thể đọc thêm ở [trang chủ](https://laravel.com/).