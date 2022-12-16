# Giới thiệu
Laravel vẫn đang là một framework rất mạnh của PHP và được cộng đồng sử dụng đông đảo hiện nay, tuy nhiên nếu chúng ta đang xây dựng các microservices thì chưa chắc đã phù hợp bởi lượng modules trong Laravel là khá nhiều, dẫn đến tốc độ không được tối ưu như mong muốn, vì vậy mà chính tác giả của Laravel - ông `Taylor Otwell` đã tạo ra thêm một microframework dựa trên Laravel đó là **Lumen**.

**Lumen** được xây dựng chủ yếu phục vụ các microservices - các dịch vụ nhỏ, được tách riêng ra và dùng để giao tiếp với các ứng dụng lớn hơn, có thể là Laravel application.

**Lumen** được xây dựng từ core của Laravel vì vậy, khi cài đặt project lên trên máy, bạn sẽ thấy cấu trúc thư mục khá tương đương bao gồm như `Eloquent`, `Caching`, `Queues`, `Validation`, `Midleware`... tuy nhiên, vì chỉ là một microframework nên nó cũng được lược bỏ khá nhiều các thành phần khác, nên khi muốn sử dụng chúng ta cũng nên tìm hiểu kỹ xem có phù hợp không.

## Vậy điểm mạnh của **Lumen** là gì mà tại sao nó lại được sử dụng ?

Lumen được sinh ra nhầm tối ưu hiệu suất của ứng dụng. Một số điểm khác đáng chú ý của Lumen so với Laravel
* **Cấu hình**: Sử dụng Lumen sẽ không có thư mục config chứa các config của hệ thống như Laravel, thay vào đó mọi cấu hình của project chúng ta có thể cấu hình thông qua file `.env`
* **Router**: Lumen sử dụng FastRouter thay vì sử dụng Symfony router, nên nó cũng cho một hiệu suất tốt hơn, tuy nhiên nó sẽ không được đầy đủ các tính năng như Symfony router
* **Số lượng request**: Lumen cũng cho bạn khả năng xử lý nhiều request/s hơn so với Laravel và tốc độ response cũng có vẻ nhỉnh hơn Laravel

Đây là mình nghĩ là các sự thay đổi đáng chú ý của microservices này, giờ thử đi cài đặt và tìm hiểu xem nó có khác gì không nhé các bạn.
# Cài đặt
Cài đặt thì khá đơn giản rồi, nó cũng sử dụng composer để cài như Laravel
```bash
composer create-project --prefer-dist laravel/lumen blog
```
cài xong rồi thì chạy thoai
```
php -S localhost:8000 -t public
```

Điểm khác khi cài đặt Lumen đó chính là `APP_KEY` không tự động được sinh ra trong quá trình cài đặt project mà chúng ta phải tự gen bằng tay :).

# Tìm hiểu các tính năng cơ bản
## 1. Routing
 Trong Lumen, chúng ta sẽ khai báo các router ở trong `routes/web.php`, việc sử dụng cũng khá đơn giản, ví dụ
 ```php
 $router->get('/welcome', function () {
    return 'Hello world';
});
 ```
Ở đây, chúng ta sử dụng biến `$router` đã được `type-hint` sẵn trong project, các bạn vào `bootstrap/app.php` sẽ thấy đoạn code khai báo biến này rồi gọi tới file `routes/web.php`.
```php:app.php
$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});
```
### Available Router Methods
Routing trong Lumen cũng hỗ trợ các phương thức HTTP có sẵn giống như trong Laravel
```php
$router->get($uri, $callback);
$router->post($uri, $callback);
$router->put($uri, $callback);
$router->patch($uri, $callback);
$router->delete($uri, $callback);
$router->options($uri, $callback);
```
### Route Parameters
Tham số trên URL cũng là một thứ không thể thiếu, và trong Lumnen cũng vậy
```php
$router->get('user/{id}', function ($id) {
    return 'User '.$id;
});
```
### Specify route names for controller actions
Chúng ta có thể chỉ định route với controller xử lý nó, mình thấy khá giống với cách khai báo router trong Laravel version `5.8` thì phải
```php
$router->get('profile', [
    'as' => 'profile', 'uses' => 'UserController@showProfile'
]);
```
### Route group
Route group cho phép chúng ta chia sẻ các thuộc tính như `middleware`, `namespace` hay `prefix` cho một nhóm các router cùng sử dụng, tiết kiệm được các khoản trùng lặp code.
#### Middleware
Để sử dụng `middleware` chúng ta sử dụng từ khóa `middleware` trong một mảng các thuộc tính
```php
$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/', function () {
        // code
    });

    $router->get('user/profile', function () {
        // code
    });
});
```
#### Prefix
Thuộc tính `prefix` dùng để khai báo tiền tố cho mỗi router trong một nhóm các router.

Ví dụ :
```php
$router->group(['prefix' => 'admin'], function () use ($router) {
    $router->get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```
#### Namespaces
Thuộc tính `namespaces` dùng để khai báo một nhóm các router được chỉ được với một nhóm của controller. Ví dụ :
```php
$router->group(['namespace' => 'Admin'], function() use ($router)
{
    // Using The "App\Http\Controllers\Admin" Namespace...

    $router->group(['namespace' => 'User'], function() use ($router) {
        // Using The "App\Http\Controllers\Admin\User" Namespace...
    });
});
```
## 2. Middleware
Middleware là một phần quan trọng trong các ứng dụng web, nó có vai trò đứng giữa mỗi các request của người dùng đến hệ thống, kiểm tra xem request đó có hợp lệ hay không rồi mới được truy cập tiếp

![](https://images.viblo.asia/fcdfb3f2-7d87-4ebd-9ab7-b50e33126fd4.png)

Trong Lumen thì không hỗ trợ tạo file middleware bằng command, do vậy họ có để một file example của file đó trong `app/Http/Middleware` để chúng ta copy nội dung vào file tạo mới

```php:ExampleMiddleware.php
<?php

namespace App\Http\Middleware;

use Closure;

class ExampleMiddleware
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
```
### Global Middleware
Để đăng ký Global Middleware - tức là mỗi request sẽ đều phải đi qua middleware này, thì chúng ta đăng ký chúng ở trong `bootstrap/app.php`
```php:app.php
$app->middleware([
   App\Http\Middleware\ExampleMiddleware::class
]);
```

### Assigning Middleware To Routes
Trước tiên để gán một middleware cho một route cố định, điều đầu tiên chúng ta cần làm là khai báo short-hand name ở trong `bootstrap/app.php`, bên trong method `$app->routeMiddleware()`
```php
$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
]);
```
sau đó gán vào route cụ thể như sau
```php
$router->get('admin/profile', ['middleware' => 'auth', function () {
    //
}]);
```
chúng ta có thể khai báo nhiều middleware cho 1 route băng cách khai báo một mảng middleware
```php
$router->get('/', ['middleware' => ['first', 'second'], function () {
    //
}]);
```
## 3. Controller
Thay vì chúng ta khai báo logic cho từng route ở bên trong `routes/web.php`, thì chúng ta có thể khai báo các controller để xử lý logic các ứng với các router tương ứng

Ví dụ :
```php:routes.php
$router->get('user/{id}', 'UserController@show');
```
Và controller tương ứng
```php:UserController.php
<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
    public function show($id)
    {
        return User::findOrFail($id);
    }
}
```
### Controller Middleware
Ở phần trên chúng ta có nói về việc khai báo middleware cho mỗi route rồi xử lí logic luôn tại đó, chúng ta cũng có thể khai báo middleware ứng với controller với cú pháp chỉ khác đi một chút
```php:routes.php
$router->get('profile', [
    'middleware' => 'auth',
    'uses' => 'UserController@showProfile'
]);
```
### Dependency Injection & Controllers
Service Container cũng được sử dụng để xử lý Controller, chúng ta có thể type-hint bất cứ các thành phần phụ thuộc nào mà controller đó cần ở bên trong magic method `__contruct()` của mỗi file controller.

```php
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UserController extends Controller
{
    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }
```

Ngoài `constructor injection`, chúng ta cũng có thể type-hint bất cứ một thành phần phụ thuộc nào đó vào bên trong các method của controller, ví dụ như `Illuminate\Http\Request`
```php
    public function store(Request $request)
    {
        $name = $request->input('name');
    }
```
## 4. Request
Để lấy đối tượng HTTP Request hiện tại thông qua dependency injection, chúng ta sẽ cần type-hint `Illuminate\Http\Request` vào các phương thức trong controller.

Ví dụ
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $name = $request->input('name');
    }
}
```
### Basic Request Information
Đối tượng Request cho chúng ta một vài các method hữu ích để có thể lấy được thông tin từ request gửi lên
#### $request->path()
Ví dụ một request được gửi tới `http://domain.com/foo/bar` thì phương thức `path()` sẽ trả về giá trị là `foo/bar`
```php
$uri = $request->path();
```
#### $request->is()
Phương thức này dùng để kiểm tra đường dẫn của request có khớp với một `pattern` nào đó không, ví dụ
```php
if ($request->is('category/*')) {
// các đường dẫn có path là `category/` sẽ thỏa mãn điều kiện
}
```
hoặc với một đường dẫn cụ thể 
```php
if ($request->is('category/create')) {
}
```
#### $request->url()
Phương thức này sẽ trả về đường dẫn của URL không chứa các query
```php
$url = $request->url();
// https://viblo.asia/
```
#### $request->fullUrl()
Phương thức này giống với phương thức `url()`, chỉ khác là nó sẽ lấy cả các query
```php
$url = $request->fullUrl();
// https://viblo.asia/search?q=laravel
```
### Retrieving Input
Phổ biến nhất của việc dùng đối tượng Request đó là lấy giá trị từ một form mà người dùng gửi lên

Ví dụ 
```php
$name = $request->input('name');
```
Chúng ta cũng có thể truyền thêm tham số thứ 2 là giá trị mặc định nếu như giá trị trong input ở trên không có
```php
$name = $request->input('name', 'Phu');
```

Để kiểm tra giá trị của input có tồn tại trên một request hay không chúng ta sử dụng phương thức `has`. Ví dụ
```php
if ($request->has('name')) {
    //
}
```

Ngoài ra Lumen cũng có rất nhiều cũng phương thức khác bạn có thể lên trang chủ của nó tìm đọc nhé.

# Kết luận
Bài cũng khá dài rồi, mình cũng đax giới thiệu với các bạn các kiến thức cơ bản của Lumen để mọi người có thể có cái nhìn với framework này, và so sánh với Laravel xem nó có gì khác không, và có vẻ dường như là không =)).

Vậy nên đối với các bạn đã làm việc với Laravel rồi thi việc tiếp cận và sử dụng Lumen framework này rất dễ dàng, chỉ khác là nó ít hỗ trợ tạo file thông qua command hay sẽ ít các chức năng hơn so với Laravel mà thôi.

Nếu bài viết này hữu ích với mọi người hãy tặng mình 1 upvote nhé các pạn :rofl::rofl::rofl: