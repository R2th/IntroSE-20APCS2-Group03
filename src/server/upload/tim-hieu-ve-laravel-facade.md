# Introduction

Hẳn đối với bất cứ ai từng làm việc với Laravel framework đều đã sử dụng đến Facade. Đây có lẽ là một trong các tính năng hữu ích nhất cho quá trình phát triển phần mềm của bạn. 
Với một cú pháp đơn giản gọn nhẹ, nó có thể sử dụng hiệu quả ngay cả khi ta không thực sự hiểu rõ cách hoạt động của chúng. Tuy nhiên, cũng chính vì vậy, nhiều người có thể hiểu lầm về cách làm việc của Facades. Trong bài viết này chúng ta sẽ đi vào tìm hiểu chi tiết về Facades và cách chúng thực sự hoạt động.

# Mục lục

I. What is Facade?

II. How to use it?

III. How does it work?

IV. Tổng kết

# I. What is Facade?

Facade là một Design Pattern sử dụng trong lập trình hướng đối tượng. Giống như mặt tiền của một tòa nhà, facade trong lập trình có thể hiểu như một giao diện thay cho các kiến trúc phức tạp bên trong một hệ thống. Qua đó cho phép:
- Dễ dàng đọc và sử dụng bằng cách ẩn các cài đặt phức tạp của thư viện dưới một lớp giao diện đơn giản.
- Giảm sự phụ thuộc giữa các khối lệnh nhờ sự tương tác thông qua giao diện thay vì chính hệ thống.
- Đóng gói các API phức tạp thành một hệ thống gọn gàng.

Facade trong Laravel cung cấp cho chúng ta một giao diện các phương thức "tĩnh" đơn giản dễ hiểu tới tính năng của các service trong Laravel như Auth, Mail, Notification,v.v... nhưng đồng thời duy trì tính mềm dẻo và khả năng kiểm thử của một phương thức non-static.

# II. How to use it?

Tất cả các Facade của Laravel được định nghĩa trong namespace `Illuminate\Support\Facades` và có thể sử dụng như sau:

```php
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

Bên cạnh đó, Laravel cũng bao gồm các Helper giúp thực hiện tác nhiệm vụ đơn giản tương ứng như facade.

VD:
```php
return View::make('home');
// sẽ tương tự với
return view('home');
```

Danh sách các Facade của Laravel:

|Facade | Class | Service Container Binding|
| --------- | -------- | -------- | 
|App      | Illuminate\Foundation\Application | `app`|
|Artisan | Illuminate\Contracts\Console\Kernel | `artisan`|
|Auth     | Illuminate\Auth\AuthManager | `auth`|
|Auth (Instance) | Illuminate\Contracts\Auth\Guard | `auth.driver`|
|Blade | Illuminate\View\Compilers\BladeCompiler | `blade.compiler`|
|Broadcast | Illuminate\Contracts\Broadcasting\Factory |  |
|Broadcast (Instance) | Illuminate\Contracts\Broadcasting\Broadcaster |  |
|Bus | Illuminate\Contracts\Bus\Dispatcher |  |
|Cache | Illuminate\Cache\CacheManager | `cache`|
|Cache (Instance) | Illuminate\Cache\Repository | `cache.store`|
|Config | Illuminate\Config\Repository | `config`|
|Cookie | Illuminate\Cookie\CookieJar | `cookie`|
|Crypt | Illuminate\Encryption\Encrypter | `encrypter`|
|DB | Illuminate\Database\DatabaseManager | `db`|
|DB (Instance) | Illuminate\Database\Connection | `db.connection`|
|Event | Illuminate\Events\Dispatcher | `events`|
|File | Illuminate\Filesystem\Filesystem | `files`|
|Gate | Illuminate\Contracts\Auth\Access\Gate |  |
|Hash | Illuminate\Contracts\Hashing\Hasher | `hash`|
|Http | Illuminate\Http\Client\Factory |  |
|Lang | Illuminate\Translation\Translator | `translator`|
|Log | Illuminate\Log\LogManager | `log`|
|Mail | Illuminate\Mail\Mailer | `mailer`|
|Notification | Illuminate\Notifications\ChannelManager |  |
|Password | Illuminate\Auth\Passwords\PasswordBrokerManager | `auth.password`|
|Password (Instance) | Illuminate\Auth\Passwords\PasswordBroker | `auth.password.broker`|
|Queue | Illuminate\Queue\QueueManager | `queue`|
|Queue (Instance) | Illuminate\Contracts\Queue\Queue | `queue.connection`|
|Queue (Base Class) | Illuminate\Queue\Queue |  |
|Redirect | Illuminate\Routing\Redirector | `redirect`|
|Redis | Illuminate\Redis\RedisManager | `redis`|
|Redis (Instance) | Illuminate\Redis\Connections\Connection | `redis.connection`|
|Request | Illuminate\Http\Request | `request`|
|Response | Illuminate\Contracts\Routing\ResponseFactory |  |
|Response (Instance) | Illuminate\Http\Response |  |
|Route | Illuminate\Routing\Router | `router`|
|Schema | Illuminate\Database\Schema\Builder |  |
|Session | Illuminate\Session\SessionManager | `session`|
|Session (Instance) | Illuminate\Session\Store | `session.store`|
|Storage | Illuminate\Filesystem\FilesystemManager | `filesystem`|
|Storage (Instance) | Illuminate\Contracts\Filesystem\Filesystem | `filesystem.disk`|
|URL | Illuminate\Routing\UrlGenerator | `url`|
|Validator | Illuminate\Validation\Factory | `validator`|
|Validator (Instance) | Illuminate\Validation\Validator |  |
|View | Illuminate\View\Factory | `view`|
|View (Instance) | Illuminate\View\View |  |

# III. How does it work?

Trong ví dụ nêu trên ta thấy hàm `get()` của Facade Cache được gọi như một phương thức tĩnh: `Cache::get('key')`.

Mặc dù nhìn qua, Facade có vẻ chỉ đơn thuần là các phương thức tĩnh được gọi thông qua các class như `Mail`, `Auth`, `Cache`, v.v... Nhưng thực tế, khi chúng ta nhìn vào bất cứ class cài đặt nào trong danh sách nêu trên ta đều nhận thấy chúng hoàn toàn là các phương thức bình thường.

VD: Phương thức `get()` của Facade Cache thực chất được cài đặt như sau.
```php
namespace Illuminate\Cache;

use ...;

class CacheManager implements FactoryContract
{
    ...
    
    protected function get($name)
    {
        return $this->stores[$name] ?? $this->resolve($name);
    }
    
    ...
}
```

Vậy làm thế nào để Laravel có thể thực hiện được điều này? Để dễ dàng hiểu cách hoạt động của một Facade sau đây ta sẽ đi vào một ví dụ cụ thể đối với facade `cache`.

Tìm class `Illuminate\Support\Facades\Cache` ta nhận thấy nó kế thừa abstract class `Illuminate\Support\Facades\Facade` và thực hiện overwrite hàm `getFacadeAccessor()` để trả về tên container tương ứng với facade.

VD:
```php
namespace Illuminate\Support\Facades;

class Cache extends Facade
{
    ...
    
    protected static function getFacadeAccessor()
    {
        return 'cache';
    }
}
```

Dựa vào đó Laravel sẽ xác định được Facade này sẽ làm việc như thế nào. Trong `CacheServiceProvider`, instance của `CacheManager` đã được bind vào container `cache`  sử dụng Service Container. Khi facade được gọi, instance đó sẽ được ressolve thông qua hàm `resolveFacadeInstance()` thay vì phải khởi tạo một cách phức tạp các service cần thiết. Qua đó, ta có thể gọi hàm `get('key')` của `CacheManager` thông qua `Cache` như sau:

Khi người dùng gọi tới hàm static không tồn tại `get('key')` của facade `Cache` như trên, PHP sẽ thực hiện magic method `__callStatic()` nhận vào hai giá trị gồm tên phương thức và tham số truyền vào. 

VD: Khi gọi phương thức `Cache::get('key')` hàm `__callStatic()` sẽ có `$method` là `get` và `$args` là `'key'`.

Tại đây Facade sẽ thực hiện lấy ra instance của service tương ứng và thực hiện gọi tới hàm non-static như một phương thức thông thường.

```php
namespace Illuminate\Support\Facades;

use ...

abstract class Facade 
{
    ...

    public static function getFacadeRoot()
    {
        return static::resolveFacadeInstance(static::getFacadeAccessor());
    }

    ...

    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();

        if (! $instance) {
            throw new RuntimeException('A facade root has not been set.');
        }

        return $instance->$method(...$args);
    }
}
```

Như ta có thể thấy thông qua ví dụ trên, bằng các khéo léo sử dụng magic method `__callStatic()` kết hợp với Service Container, Facade đã cung cấp một giao diện đơn giản dễ sử dụng cho các service của Laravel nhưng vẫn duy trì các ưu điểm của phương thức non-static như khi ta thực hiện DI.

# IV. Tổng kết

Vậy qua đây chúng ta đã đi vào tìm hiểu chi tiết cách hoạt động của Facade, một công cụ vô cùng hữu ích trong phát triển phần mềm sử dụng Laravel framework. Nếu có nội dung chưa rõ ràng mong mọi người góp ý để cải thiện bài viết.

# References

Laravel Documentation Facade: https://laravel.com/docs/8.x/facades#introduction

Laravel Documentation Service Container: https://laravel.com/docs/8.x/container

Facade Pattern: http://wiki.c2.com/?FacadePattern

PHP Magic method: https://www.php.net/manual/en/language.oop5.overloading.php#object.callstatic