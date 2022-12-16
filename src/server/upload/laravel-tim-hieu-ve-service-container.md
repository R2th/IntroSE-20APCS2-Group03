# Introduction
Laravel service container là một công cụ rất mạnh trong việc quản lý các class dependencies và thực hiện xử lý dependency injection. Dependency injection là một cụm từ thể hiện có nghĩa là: các dependencies của class được "injected" vào trong class thông qua hàm khởi tạo hoặc trong một số trường hợp là các phương thức "setter".
Hãy xem ví dụ đơn giản dưới đây:

```php
<?php

namespace App\Http\Controllers;

use App\User;
use App\Repositories\UserRepository;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $users;

    /**
     * Create a new controller instance.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $user = $this->users->find($id);

        return view('user.profile', ['user' => $user]);
    }
}

```

Trong ví dụ trên, ```UserController``` cần lấy thông tin người dùng từ một nguồn dữ liệu. Vì vậy, chúng ta sẽ *inject* vào một service có thể truy suất người dùng. Trong hoàn cảnh này, ```UserRepository``` có thể sử dụng ```Eloquent``` để lấy lại thông tin người dùng từ cơ sở dữ liệu. Tuy nhiên, khi repository được inject, chúng ta có thể dễ dàng trao đổi chúng với implementation khác. Chúng ta cũng dễ dàng "mock", hoặc tạo một dummy implementation của ```UserRepository``` khi testing ứng dụng của bạn.

Sự hiểu biết sâu về Laravel service container là rất cần thiết cho việc phát triển ứng dụng mạnh mẽ,lớn và đóng góp cho core của Laravel.

# Binding
### Binding Basics

Hầu như tất cả các service container binding của bạn sẽ được đăng Ký trong [service providers](https://laravel.com/docs/5.4/providers), vì vậy, hầu hết những ví dụ này sẽ minh hoạ cách sử dụng container trong bối cảnh đó.

<br>

**Simple Bindings**

<br>

Bên trong một service provider, bạn luôn luôn có quyền truy cập vào trong container thông qua thuộc tính ```$this->app```. Chúng ta có thể đăng kí liên kết sử dụng phương thức ```bind```, và truyền vào tên của class hay interface mà chúng ta muốn đăng kí cùng với ```Closure``` thực hiện trả về  instance của class đó:
```php
$this->app->bind('HelpSpot\API', function ($app) {
    return new HelpSpot\API($app->make('HttpClient'));
});
```
Lưu ý rằng chúng ta nhận được container như một đối số truyền vào cho resolver. Sau đó thì chúng ta có thể thực hiện resolve các sub-dependencies con của đối tượng mà đang được xây dựng.

<br>

**Binding A Singleton**

<br>

Phương thức ```singleton``` thực hiện liên kết một class hoặc interface vào container mà chỉ cần thực hiện duy nhất một lần. Khi một singleton binding được giải quyết, cùng một object instance sẽ được trả về trong các subsequent calls vào container:
```php
$this->app->singleton('HelpSpot\API', function ($app) {
    return new HelpSpot\API($app->make('HttpClient'));
});
```

<br>

**Binding Instances**

<br>

Bạn cũng có thể  bind một instance đang tồn tại vào trong container bằng cách sử dụng phương thức  ```instance```. Instance đó sẽ luôn luôn được trả về trong các lần gọi sau vào container:
```php
$api = new HelpSpot\API(new HttpClient);

$this->app->instance('HelpSpot\Api', $api);
```

<br>

**Binding Primitives**

<br>

Thỉnh thoảng bạn có một class nhật một vài injected class khác, nhưng cũng cần một inject giá trị nguyên thủy như một số nguyên. Bạn có thể dễ dàng sử dụng binding để inject bất kỳ giá trị nào vào trong class nếu cần:
```php
$this->app->when('App\Http\Controllers\UserController')
          ->needs('$variableName')
          ->give($value);
```

### Binding Interfaces To Implementations

<br>

Một tính năng tuyệt vởi của service container là nó có khả năng bind một interface thành một implementation. Ví dụ, giả sử chúng ta có interface ```EventPusher``` và một implementation  ```RedisEventPusher```. Khi đã có code của implementation ```RedisEventPusher``` cho interface, chúng ta có thể đăng ký nó với service container như sau:
```php
$this->app->bind(
    'App\Contracts\EventPusher',
    'App\Services\RedisEventPusher'
);
```
Câu lệnh này sẽ nói với container nó sẽ inject ```RedisEventPusher``` khi một class nào đó cần một implementations từ interface ```EventPusher```. Chúng ta có thể type-hint interface ```EventPusher``` interface trong một constructor, hay bất cứ vị trí nào mà dependencies có thể được inject bởi service container:
```php
use App\Contracts\EventPusher;

/**
 * Create a new class instance.
 *
 * @param    EventPusher  $pusher
 * @return  void
 */
public function __construct(EventPusher $pusher)
{
    $this->pusher = $pusher;
}
```

### Contextual Binding

<br>

Đôi khi bạn sẽ có hai class triển khai từ cùng một interface nhưng bạn muốn inject các implementations khác nhau vào các class. Ví dụ, hai controllers có thể phụ thuộc vào implementations khác nhau của  ```Illuminate\Contracts\Filesystem\Filesystem``` [contract](https://laravel.com/docs/5.4/contracts). Laravel cung cấp một interface đơn giản và liền mạch cho việc khai báo hành vi này:
```php
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\VideoController;
use Illuminate\Contracts\Filesystem\Filesystem;

$this->app->when(PhotoController::class)
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('local');
          });

$this->app->when(VideoController::class)
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('s3');
          });
```

### Tagging

<br>

Thỉnh thoảng, bạn cần giải quyết tất cả các "category" của binding. Ví dụ, có lẽ bạn đang xây dụng một tập hợp báo cáo mà sẽ nhận một mảng danh sách các implementations khác nhau của interface ```Report```. Sau khi đăng ký ```Report``` implementations, bạn có thể gán chúng vào một tag sử dụng phương thức ```tag```:
```php
$this->app->bind('SpeedReport', function () {
    //
});

$this->app->bind('MemoryReport', function () {
    //
});

$this->app->tag(['SpeedReport', 'MemoryReport'], 'reports');
```

Khi service đã được tag, bạn có thể dễ dàng resolve chúng qua phương thức ```tagged```:
```php
$this->app->bind('ReportAggregator', function ($app) {
    return new ReportAggregator($app->tagged('reports'));
});
```

# Resolving
**The ```make``` Method**

<br>

Bạn có thể sử dụng phương thức ```make``` để resolve một class instance ra khỏi container. Phương thức  ```make``` nhận tên class hay interface bạn muốn thực hiện resolve:

```php
$api = $this->app->make('HelpSpot\API');
```

Nếu bạn đang ở ví trị mà code của bạn không truy cập được biến ```$app```, bạn có thể sử dụng helper global ```resolve```:

```php
$api = resolve('HelpSpot\API');
```

Nếu một số  dependencies của class của bạn không thể  resolve được thông qua container, bạn có thể  inject chúng bằng cách chuyển chúng thành mảng liên kết qua phương thức ```makeWith```:

```php
$api = $this->app->makeWith('HelpSpot\API', ['id' => 1]);
```

<br>

**Automatic Injection**

<br>

Ngoài ra, và cũng quang trọng, bạn có thể đơn giản "type-hint" dependency vào trong hàm constructor của class nó sẽ được resolved bởi container, gồm [controllers](https://laravel.com/docs/5.4/controllers), [event listeners](https://laravel.com/docs/5.4/events), [queue jobs](https://laravel.com/docs/5.4/queues), [middleware](https://laravel.com/docs/5.4/middleware), và còn nữa. Trong thực tế, đây là cách giải quyết đối tượng của bạn sẽ được giải quyết bởi container.

Ví dụ, bạn có thể type-hint một repository được định nghĩa bởi ứng dụng trong hàm khởi tạo constructor của controller. Repository này sẽ tự động được resolv và inject vào class:
```php
<?php

namespace App\Http\Controllers;

use App\Users\Repository as UserRepository;

class UserController extends Controller
{
    /**
     * The user repository instance.
     */
    protected $users;

    /**
     * Create a new controller instance.
     *
     * @param    UserRepository  $users
     * @return  void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Show the user with the given ID.
     *
     * @param    int  $id
     * @return  Response
     */
    public function show($id)
    {
        //
    }
}
```

<br>

# Container Events

<br>

Service container sẽ bắn ra các event mỗi khi nó thực hiện resolves một đối tượng. Bạn có thể listen các event qua phương thức ```resolving```:
```php
$this->app->resolving(function ($object, $app) {
    // Called when container resolves object of any type...
});

$this->app->resolving(HelpSpot\API::class, function ($api, $app) {
    // Called when container resolves objects of type "HelpSpot\API"...
});
```

Như bạn có thể thấy, đối tượng đang được resolve sẽ truyền lại vào trong hàm callback, cho phép bạn thiết lập các thuộc tính bổ sung nào vào trong object trước khi được trả lại cho bên sử dụng nó.

Tài liệu: https://laravel.com/docs/5.4/container