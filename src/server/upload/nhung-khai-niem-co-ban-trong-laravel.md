## Giới thiệu
Trong bài viết này, mình sẽ giới thiệu tóm tắt nhất về những khái niệm cơ bản trong framework Laravel. Nội dung chính bao gồm:
* Middleware 
* CSRF Token
* Localization
* Authentication với Authorization
* Helpers 
* Eloquent với Query Builder 
* Eager Loading
* Scope 
* Accessors và Mutator
* Traint


## Middleware
### 1. Khái niệm
Middleware là một thành phần trung gian nữa client và server, dùng để xử lý, lọc các HTTP request đi vào ứng dụng. Nếu request hợp lệ sẽ cho đi tiếp, còn không sẽ bị dừng lại hoặc redirect sang một trang khác.
### 2. Sử dụng trong Laravel
**Khai báo một middleware** 
```
php artisan make:middleware CheckAdmin
```
```PHP
<?php

namespace App\Http\Middleware;

use Closure;

class CheckAdmin
{
    public function handle($request, Closure $next)
    {
        // Request sẽ được xử lý trong function handle()
    }
}
```

**Đăng ký middleware**
 Tất cả các middleware được đăng ký trong file `App\Http\Kernal.php`. Nếu bạn muốn middleware được chạy ở mọi request thì sẽ khai báo trong `$middleware` property. Còn nếu muốn gán middleware cho một route xác định thì khai báo trong `$routeMiddleware` property. 
 ```PHP
protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'can' => \Illuminate\Foundation\Http\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    'admin' => \App\Http\Middleware\Admin::class,
];
 ```
 
##  CSRF Token
Laravel sẽ cung cấp một cách đơn giản để bảo về ứng dụng khỏi tấn công [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) - Tấn công mạo danh. CSRF là loại tấn công mà hacker đánh lừa trình duyệt,  sử dụng phiên làm việc của người dùng để gửi request lên ứng dụng Web.

Laravel sẽ tự động tạo một CSRF "token" cho mỗi hoạt động của user được quản lý bởi ứng ụng. Token này sẽ được tự động xác nhận khi user gửi request tới ứng dụng, nếu xác thực đúng thì mới được thực hiện.
- Rất đơn giản để thực hiện, chỉ cần sử dụng `@csrf` trong form HTML
```HTML
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```

## Localization
Laravel's localization (i18n) là một các tiện lợi để sử dụng đa ngôn ngữ trong ứng dụng. Các ngôn ngữ sẽ được chứa trong folder `resources/lang` 

```
/resources
    /lang
        /en
            messages.php
        /es
            messages.php
```

Các ngôn ngữ chỉ cần trả về dạng key - value của một array: 
```php
<?php

return [
    'welcome' => 'Welcome to our application',
];
```

Bạn có thể chuyển đổi ngôn ngữ bằng cách sử dụng `setLocate` method của App facade
```php
Route::get('welcome/{locale}', function ($locale) {
    App::setLocale($locale);
});
```
Để hiển thị ngôn ngữ, bạn có thể sử dụng các cách sau:
```php
echo __('messages.welcome');

{{ __('messages.welcome') }}

@lang('messages.welcome')

@trans('messages.welcome')
```

## Authentication với Authorization
Authentication: là quá trình xác thực, định danh một tào khoản vào hệ thống. Nếu không có bước này, hệ thống sẽ không biết người đang truy cập là ai để có các phản hồi phù hợp. Ví dụ: Kiểm tra người dùng đó đã đăng nhập hay chưa

Authorization: sau khi xác thực được danh tính người dùng, thì bước tiếp theo phải xem người dùng đó có quyền được làm gì trong ứng dụng (phân quyền). Ví dụ: thực hiện phân quyền để không cho user này có thể thực hiện xóa bài viết của user khác.

## Helpers
Là những function có thể sử dụng ở mọi nơi trên ứng dụng như là hàm `url()`,  `dd()`, `session()`, `back()`, ... Ngoài ra, chúng ta còn có thể tự tạo các helpers function. 

Khai báo file khởi tạo helpers bên trong autoload ở file `composer.json`
```php
"autoload": {
    "files": [
        "app/helpers.php"
    ],
    "classmap": [
        "database/seeds",
        "database/factories"
    ],
    "psr-4": {
        "App\\": "app/"
    }
},
```
Sau đó, bạn cần chạy dump autoload:
```php
composer dump-autoload
```
Khởi tạo function 
```php
if (!function_exists('total')) {
    function total($arrayCart) {
        // ...
    }
}
```
Bây giờ chỉ cần gọi tới hàm đó, thực hiện truyền các tham số như 1 hàm bình thường.

## Eloquent với Query Builder 
### 1. Bảo mật
- Eloquent có tính bảo mật hơn Query Builder trong việc phòng chống SQL Injection
### 2. Tính dễ sử dụng
- Eloquent ORM dễ sử dụng hơn trong việc truy xuất, thay đổi cơ sở dữ liệu, cú pháp ngắn gọn, đơn giản hơn QueryBuilder.
- Eloquent ORM dễ dàng kết nối với database hơn QueryBuilder.
- Về độ phức tạp của một câu SQL mà Eloquent ORM chưa thể đáp ứng thì chúng ta phải sử dụng DB::raw hoặc QueryBuilder.
### 3. Hiệu suất
- QueryBuilder có hiệu suất truy vấn dữ liệu nhanh hơn Eloquent ORM bởi vì Eloquent phải thêm một lớp trong ứng dụng và yêu cầu nhiều truy vấn SQL. Đối với các database mà có ít bản ghi hiệu suất của chúng không có quá là nhiều sự chênh lệch, vậy nên đối với những database này tôi khuyên các bạn nên sử dụng Eloquent ORM vì cú pháp đơn giản và ngắn gọn của chúng.



## Eager Loading 
Dùng để giải quyết vấn đề N + 1 query, ví dụ ta query tất cả các bài viết và tất cả bình luận có quan hệ với bài viết. Vậy nếu có N bài viết thì chúng ta phải thực hiện N + 1 lần query (nếu bài viết càng nhiều thì sẽ query càng nhiều).
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function comments()
    {
        return $this->belongsTo('App\Models\Comment');
    }
}
```
```php
$posts = App\Models\Post::all();

foreach ($posts as $post) {
    echo $post->comments->content;
}
```
Đây là cách mà câu lệnh hoạt động
```php
SELECT * FROM posts;

-- Foreach of the posts, another query to select the comments

SELECT * FROM comments WHERE post_id = 1

SELECT * FROM comments WHERE post_id = 2

SELECT * FROM comments WHERE post_id = 3

SELECT * FROM comments WHERE post_id = 4

SELECT * FROM comments WHERE post_id = 5

.....
```
Mỗi lần vòng lặp, ứng dụng sẽ thực hiện 1 query để lấy nội dung comment từ bài post. Để giải quyết vấn đề này, hãy sử dụng Eager Loading.
```php
$posts = App\Models\Post::with('comments')->get();
   
foreach ($posts as $post) {
    $comments = $post->comments;
    // Tiếp tục thực hiện vòng lặp cho comments
}
```
Câu lệnh truy vấn sẽ như sau
```php
 // Select the posts i.e. Post::all();
SELECT * FROM posts;

 // Just One time get all comments with for that posts
SELECT * FROM comments WHERE post_id IN (1, 2, 3, 4, 5, ...);
```

### Eager Loading với nhiều relationships
```php
$posts = Post::with(['comments', 'author'])->get();
```
### Sự khác biệt giữa with() là load()
```php
Post::with('comments')->get();
```
```php
Post::all()->load('comments');
```
Như các bạn thấy thì with sẽ đứng trước từ khóa get, all, first, ... nên nó sẽ mặc định thực hiện 2 câu lệnh truy vấn. Còn load đứng sau get, all, first nên sẽ linh hoạt trong việc thực hiện câu lệnh truy vấn thứ 2.
```php
    $posts =  Post::all();
    if $conditional) {
        $comments = $posts->load('comments');
    }
```
Tùy vào trường hợp ta có thể thực hiện giữa 2 câu lệnh này

## Scope
Scope được sử dụng để tái sử dụng lại các câu lệnh truy vấn trong một model. Nếu có 1 câu lệnh được dùng đi dùng lại nhiều lần, ta có thể tạo thành scope để tái sử dụng và dễ dàng mở rộng.

Ví dụ: Hiển thị các user có role bằng 0:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function scopeRole($query)
    {
        return $query->where('role', 0);
    }
}
```

Để gọi câu lệnh scope chỉ cần thực hiện:
```php
$user = User::role()->get();

// bạn có thể mở rộng câu lệnh này, ví dụ để hiển thị các user có role bằng 0 và gender = 1
$user = User::role()->where('gender', 1)->get();
```

Truyền param cho scope 
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function scopeRole($query, $num)
    {
        return $query->where('role', $num);
    }
}
```

Sử dụng: `$user = User::role(0)->get();`

## Accessors và Mutators
Accessors và Mutators cho phép bạn format các giá trị của Eloquent được lấy ra hoặc thêm vào Model. Ví dụ, bạn muốn mã hóa mật khẩu trước khi thêm vào cơ sở dữ liệu.

### 1. Accessors 
Sẽ được tự động gọi tự động khi thực hiện query, nó sẽ lấy giá trị từ column xác định -> format lại -> hiển thị ra.

Ví dụ: Tạo Accessors cho field full_name của table users
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function getFullNameAttribute($value)
    {
        return ucfirst($value);
    }
}
```

### 2. Mutators
Ngược lại với Accessors, Mutators dùng để format lại giá trị của một column xác định trước khi truyền vào cơ sở dữ liệu

Ví dụ: Tạo Mutators cho feild full_name
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function setFullNameAttribute($value)
    {
        return $this->attributes['full_name'] = strtolower($value);
    }
}
```

## Traint 
Train là class mà tương tự như Abstract Class dùng để khai báo các method, property để các các class khác có thể sử dụng. Nhưng Traint khác với Abstract là nó không dựa trên tính chất thừa kế, các class khác chỉ cần sử dụng từ khóa `use` để sử dụng các method và property của Traint.

## Tổng kết
Còn rất nhiều những kiến thức cơ bản khác về Laravel như Service Container, Service Provider, Facade,... các bạn có thể tham khảo một bài viết rất hay tại [Laravel Beauty: Tìm hiểu về Service container](https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB) này 

Bài viết dựa trên tìm hiểu nhiều nguồn khác nhau: 
[Laravel và những điều cần biết](https://viblo.asia/p/laravel-va-nhung-dieu-can-biet-XQZGxolmvwA)

Kiến thức của mình còn hạn chế, nên có ý kiến gì các bạn có thể bình luận phía dưới để mình có được thêm nhiều kiến thức hơn. Cảm ơn các bạn đã theo dõi :heart_eyes: