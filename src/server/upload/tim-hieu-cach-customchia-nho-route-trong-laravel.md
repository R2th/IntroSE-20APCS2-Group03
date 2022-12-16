Khi code project ta thường chia nhỏ module ra cho dễ quản lí và bảo trì source code sau này. Ví dụ: Trong folder `views` chia thành 2 folder nhỏ là `Admin` chứa các file blade cho user có quyền admin (CRUD) và `Page`  chứa các file blade cho user có quyền là user normal hoặc vãng lai.

Trong folder `routes` cũng chia thành 2 file nhỏ là `web.php` cho web và `api.php` cho API. Vậy nếu trong folder này bạn muốn có thêm 1 file `admin.php` chỉ để phục vụ cho phần điều hướng đến admin thì được không nhỉ? Hoàn toàn được bạn nhé, mời bạn cùng mình tìm hiểu trong bài viết này. :dancer:  Ok, go.

![](https://images.viblo.asia/185de3ee-e67d-4534-b8a5-3f27b0bc5608.png)

# RouteServiceProvider có gì?
Bạn vào file RouteServiceProvider theo đường dẫn app/Providers/RouteServiceProvider.php và nhìn vào hàm map của class này

```php
public function map()
{
    $this->mapApiRoutes();

    $this->mapWebRoutes();
}
```

Hàm này có chức năng mapping các file route vào service provider để ta có thể sử dụng được các route đã định nghĩa trong folder routes.
Cụ thể nó gọi đến 2 hàm khác là `mapApiRoutes` dùng để map route từ file `api.php`  và `mapWebRoutes` từ `web.php`, cùng xem 2 method đấy có gì.

Hàm `mapWebRoutes`
```php
protected function mapWebRoutes()
{
    Route::middleware('web')
         ->namespace($this->namespace)
         ->group(base_path('routes/web.php'));
}
```

* **middleware('web')** => Các route được định nghĩa trong web.php sử dụng `middleware web`.
* **namespace($this->namespace)** => với `$this->namespace` đã được khai báo trong class RouteServiceProvider `protected $namespace = 'App\Http\Controllers';`, nghĩa là các route được define trong web.php sử dụng namespace `App\Http\Controllers`.
* **group(base_path('routes/web.php')** => Gom nhóm các route trong routes/web.php thành một group.

Tương tự với hàm `mapApiRoutes`

```php
protected function mapApiRoutes()
{
    Route::prefix('api')
         ->middleware('api')
         ->namespace($this->namespace)
         ->group(base_path('routes/api.php'));
}
```

Hàm này khác 1 chỗ với `mapWebRoutes` là `prefix('api')` => Các route được định nghĩa trong api.php đều có prefix là api. Đó là lý do tại sao khi viết API thì ta phải truy cập vào route có prefix `api` phía trước.

# Custom Route
Ok, từ những thứ vừa tìm hiểu ở phía trên thì bây giờ ta thử giải quyết vấn đề đã nêu ra từ đầu bài: `Vậy nếu trong folder này bạn muốn có thêm 1 file admin.php chỉ để phục vụ cho phần điều hướng đến admin thì được không nhỉ?`

Thứ tự thực hiện gồm:

**1. Tạo file routes/admin.php**: Bạn tự làm nhé

**2. Tạo hàm `mapAdminRoutes` trong class RouteServiceProvider** `để map routes có`
* prefix là `admin`
* namespace là `App\Http\Controllers\Admin`
* Gom nhóm các route từ `routes/admin.php`

Nó sẽ trông như thế này:
```php
protected function mapAdminRoutes()
{
    Route::prefix('admin')
        ->namespace('App\Http\Controllers\Admin')
        ->group(base_path('routes/admin.php'));
}
```

Để cho nhanh thì mình làm ntn. Còn trong project nếu muốn thì bạn làm cho quy củ nhá: định nghĩa property namespaceAdmin, middleware...


**3. Gọi hàm `mapAdminRoutes` trong hàm `map của class RouteServiceProvider`**

```php
public function map()
{
    $this->mapApiRoutes();

    $this->mapWebRoutes();

    $this->mapAdminRoutes();
}
```

Giờ test xem nó đã chạy đúng theo như lý thuyết chưa thôi nào.

**4. Test**
* Tạo `AdminController.php` có namespace là `App\Http\Controllers\Admin`  trong App\Http\Controllers\Admin, định nghĩa hàm `index() return ra chuỗi 'Admin Dashboard'`.
* Định nghĩa route trong routes/admin.php call đến hàm `index()` trong `AdminController.php`.

`AdminController.php`

```php
<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function index()
    {
        return 'Admin Dashboard';
    }
}
```

`routes/admin.php`

```php
<?php
Route::get('/', 'AdminController@index');
```

Giờ chúng ta thử `php artisan serve` rồi vào `http://localhost:8000/admin` xem nó như thế nào nhé.

Và đây là kết quả:

![](https://images.viblo.asia/23311cd7-d521-4362-a27c-a25d4645509d.png)

Vậy là nó trả ra chuỗi 'Admin Dashboard' từ hàm `index() trong AdminController` đúng như các bước mình đã làm rồi.

# Kết luận
Trên đây mình đã giới thiệu với bạn cách custom Route trong Laravel như thế nào. Hi vọng từ bài viết này bạn áp dụng vào các project thực tế của mình. Nếu có thắc mắc và góp ý bạn comment phía dưới nhé. Cảm ơn bạn :blush:

Tham khảo: https://laravel-news.com/laravel-route-tips-to-improve-your-routing