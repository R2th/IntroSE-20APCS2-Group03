# Introduction
Ngay khi khởi tạo một project, Laravel đã cung cấp cho chúng ta rất nhiều các tính năng hữu ích để thiết kế hệ thống của mình. Tuy nhiên, vẫn có vô số các tình huống mà chỉ những hàm có sẵn là không đủ. Để có thể mở rộng được các class có sẵn đó thông qua kế thừa, ta sẽ cần phải làm nhiều bước phức tạp. Giải quyết vấn đề trên, Laravel cung cấp cho người dùng Macroable trait. Trong bài viết này chúng ta sẽ đi vào tìm hiểu:
* I. What is a Macroable Class
* II. How to use Macroable in Laravel
* III. Digging Deeper
# I. What is a Macroable Class
Macroable là một trait trong Laravel, các class có thể mở rộng sử dụng Macros được gọi là Macroable class. Macros cung cấp cho lập trình viên một phương thức đơn giản cho phép ta mở rộng một lớp đã tồn tại của Laravel với các hàm do bản thân định nghĩa.

# II. How to use Macroable in Laravel
## 1. How to use
Để cho phép lập trình viên dễ dàng thêm phương thức các class đã tồn tại, Laravel cung cấp hai phương thức:
- `static void macro(string $name, object|callable $macro)`
- `static void mixin(object $mixin, bool $replace = true)`

### a. Thêm một hàm mới sử dụng Macro
Phương thức `macro()` cho phép chúng ta thực hiện đăng ký các hàm mới cho Macroable Class. Các hàm này sẽ được viết trong phương thức `boot()` của ServiceProvider (VD: AppServiceProvider). `macro()` nhận vào hai giá trị đầu vào trong đó: giá trị thứ nhất là tên hàm đăng ký, giá trị thứ hai là một callback function định nghĩa hàm chúng ta muốn đăng ký.

**VD:** Thực hiện thêm hàm `prefix` vào class Support Str của Laravel.
```php
namespace App\Providers;

use ...

class AppServiceProvider extends ServiceProvider
{
    ...
    public function boot() {
        Str::macro('prefix', function ($string, $prefix) {
            return $prefix . $string;
        });
    }
    ...
}
```

### b. Thêm nhiều hàm mới sử dụng Mixin
Trong trường hợp chúng ta có nhiều hàm muốn thêm, việc viết hàng loạt các khai báo macro trong AppServiceProvider khiến ServiceProvider của chúng ta trở nên quá lớn và việc quản lý chỉnh sửa trở nên khó khăn. Thay vào đó, Laravel cho phép lập trình viên mix các hàm của một Object vào Macroable Class sử dụng `mixin()`.

Tương tự như, `macro()` ta thực hiện khai báo `mixin()` trong hàm `boot()` của ServiceProvider. Tuy nhiên thay vì truyền vào tên và hàm callback tương ứng ta thực hiện truyền vào một đối tượng của class ta muốn mix vào Macroable Class. Laravel sau đó sẽ thực hiện tách các phương thức và đăng ký vào danh sách các Macros.

**VD:** Thực hiện tạo và mix class StrMixin vào class Support Str của Laravel.
```php
use ...

class StrMixin
{
    ...
    public function prefix($string, $prefix) {
        return $prefix . $string;
    }

    public function suffix($string, $suffix) {
        return $string . $suffix;
    }
    ...
}
# =====================================================
# Trong AppServiceProvider

namespace App\Providers;

use ...

class AppServiceProvider extends ServiceProvider
{
    ...
    public function boot() {
        Str::mixin(new StrMixin());
    }
    ...
}
```

### c. Xử lý hàm trùng lặp
Trong quá trình thêm các hàm mới, ta có khả năng sẽ sinh ra các Macros trùng lặp trong. Mặc định Laravel sẽ thực hiện ghi đè các hàm trùng lặp với hàm chúng ta định nghĩa. Trong trường hợp ta không muốn ghi đè các hàm đã tồn tại với hàm trong Mixin ta có thể truyền thêm giá trị boolean vào tham số thứ hai **replace**.

**VD:**
```php
    Str::mixin(new StrMixin(), false);
```

## 2. Các Macroable Class trong Laravel
* Illuminate\Auth\RequestGuard
* Illuminate\Auth\SessionGuard
* Illuminate\Cache\Repository
* Illuminate\Console\Command
* Illuminate\Console\Scheduling\Event
* Illuminate\Cookie\CookieJar
* Illuminate\Database\Eloquent\FactoryBuilder
* Illuminate\Database\Eloquent\Relations\Relation
* Illuminate\Database\Grammar
* Illuminate\Database\Query\Builder
* Illuminate\Database\Schema\Blueprint
* Illuminate\Filesystem\Filesystem
* Illuminate\Foundation\Testing\TestResponse
* Illuminate\Http\JsonResponse
* Illuminate\Http\RedirectResponse
* Illuminate\Http\Request
* Illuminate\Http\Response
* Illuminate\Http\UploadedFile
* Illuminate\Mail\Mailer
* Illuminate\Routing\PendingResourceRegistration
* Illuminate\Routing\Redirector
* Illuminate\Routing\ResponseFactory
* Illuminate\Routing\Route
* Illuminate\Routing\Router
* Illuminate\Routing\UrlGenerator
* Illuminate\Support\Arr
* Illuminate\Support\Collection
* Illuminate\Support\LazyCollection
* Illuminate\Support\Str
* Illuminate\Support\Testing\Fakes\NotificationFake
* Illuminate\Translation\Translator
* Illuminate\Validation\Rule
* Illuminate\View\Factory
* Illuminate\View\View
# III. Digging Deeper
Để dễ dàng thêm các hàm tự định nghĩa vào class có sẵn, các class nên trên sử dụng trait `Illuminate\Support\Traits\Macroable`. Trait bao gồm các hàm:
- `static void macro(string $name, object|callable $macro)` : Đăng ký macro mới.
- `static void mixin(object $mixin, bool $replace = true) ` : Mix một object vào class.
- `static bool hasMacro(string $name)` : Kiểm tra Macro đăng ký hay chưa.
- `static mixed __callStatic(string $method, array $parameters)` / `static mixed __call(string $method, array $parameters)` : Gọi hàm Macro được đăng ký.

**Luồng hoạt động:**
1. Ta thực hiện đăng ký một hàm mới thông qua `macro()` hoặc `mixin()`, hàm callback được đưa vào một mảng static `macros[]`.
2. Khi lập trình viên thực hiện gọi một hàm không tồn tại, PHP sẽ tự chuyển tới hàm `__callStatic()`/`__call()`.
3. Laravel thực hiện kiểm tra hàm chúng ta gọi tới phải nằm trong mảng các Macros đã đăng ký.
4. Nếu hàm tồn tại, hệ thống thực hiện gọi động phương thức đó và trả về kết quả. Nếu không hệ thống trả về `BadMethodCallException`.

# Tổng kết
Vậy qua bài viết trên chúng ta đã biết được: Macroable class là gì, cách sử dụng chúng trong Laravel, các class có thể mở rộng sử dụng Macros và chúng ta cũng đi sâu vào cách mà chúng hoạt động. Xin cảm ơn mọi người dành thời gian để đọc bài viết trên. Nếu mọi người có câu hỏi hay góp ý gì xin hãy comment bên dưới.

# References
* Laravel API Document for Macroable trait: https://laravel.com/api/8.x/Illuminate/Support/Traits/Macroable.html
* CodersTape's blog post for a Full list of Macroable classes: https://coderstape.com/blog/3-macroable-laravel-classes-full-list