> [Phần 2](https://viblo.asia/p/laravel-8-tim-hieu-ve-service-container-phan-2-Do754z9eZM6)


> Bài viết này sẽ giới thiệu với các bạn về Laravel Service Container và cách chúng inject, resolve.
# Giới thiệu
Laravel service container là một công cụ mạnh mẽ để quản lý các dependencies của lớp và thực hiện dependency injection. Dependency injection là một cụm từ đặc biệt, về cơ bản có nghĩa là: các dependencies được "đưa" vào lớp thông qua hàm constructor hoặc trong một số trường hợp là các phương thức "setter".


Hiểu biết sâu sắc về Laravel service container là điều cần thiết để xây dựng một ứng dụng lớn, mạnh mẽ, cũng như để contribute Laravel core.


Dưới đây là một ví dụ về Service Container:
```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Models\User;

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
Lớp ```UserController``` cần truy xuất user từ database. Bạn sẽ "đưa" vào lớp một service có khả năng thực hiện công việc này. Cụ thể trong ví dụ trên, lớp ```UserRepository``` sử dụng **Eloquent** để lấy thông tin user từ database.


## Tự động giải quyết cấu hình
Nếu một lớp không có dependencies hoặc chỉ phụ thuộc vào các lớp cụ thể khác (không phải interface), container không cần được hướng dẫn về cách giải quyết lớp đó. Ví dụ: bạn có thể đặt code sau trong file route / web.php của mình:
```php
<?php

class Service
{
    //
}

Route::get('/', function (Service $service) {
    die(get_class($service));
});
```
Trong ví dụ này, khi gọi đến route ```/``` của ứng dụng sẽ tự động giải quyết lớp ```Service``` và đưa nó vào route handler của bạn. Do đó, bạn có thể tận dụng lợi thế của việc sử dụng dependency mà không phải lo lắng về các file cấu hình bị cồng kềnh.

Nhiều lớp bạn viết khi xây dựng ứng dụng Laravel sẽ tự động nhận các dependencies của chúng thông qua container, bao gồm **controllers**, **event listeners**, **middleware**,... Ngoài ra, bạn có thể nhập gợi ý dependecy trong phương thức ```handle``` của các công việc được xếp hàng đợi. Một khi bạn đã trải nghiệm sức mạnh cấu hình tự động của dependencies injection, bạn sẽ cảm thấy không thể phát triển ứng dụng nếu không có nó.
## Khi nào sử dụng Container?
Do không cần tự quyết định cấu hình, bạn thường sẽ nhập gợi ý các dependencies vào routes, controllers, event listeners và các nơi khác mà không cần tương tác thủ công với container. 

Ví dụ: bạn có thể nhập gợi ý đối tượng ```Illuminate \ Http \ Request``` trong định nghĩa route để có thể dễ dàng truy cập request hiện tại. 
```
use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    // ...
});
```
Trong nhiều trường hợp, nhờ tính năng chèn dependencies tự động và facades, bạn có thể xây dựng các ứng dụng Laravel mà không cần tự binding hoặc giải quyết bất cứ thứ gì từ container. Vậy khi nào bạn sẽ cần tương tác thủ công với container? Hãy xem xét hai tình huống.
1. Nếu bạn viết một lớp implements một interface và bạn muốn nhập gợi ý interface đó trong một route hoặc phương thức khởi tạo lớp, bạn phải cho container biết cách giải quyết interface đó.
2. Nếu bạn đang viết một Laravel package mà bạn định chia sẻ với các developers Laravel khác, bạn có thể cần phải bind các services của package vào container.

 # Resolving
 Trong một service provider, bạn luôn có quyền truy cập vào container thông qua thuộc tính``` $this->app```. Nếu bạn muốn tương tác với container bên ngoài một service provider, bạn có thể thông qua **facade**.
 
 ## make()
 Bạn có thể sử dụng phương thức ```make``` để giải quyết một instance từ container. Phương thức ```make``` nhận tên của lớp hoặc interface mà bạn muốn giải quyết:
 ```php
 use App\Services\Transistor;

$transistor = $this->app->make(Transistor::class);
```
Nếu một số dependencies không thể giải quyết được thông qua container, bạn có thể inject chúng vào bằng cách chuyển chúng sang dạng một mảng liên kết rồi truyền vào phương thức ```makeWith```. Ví dụ: bạn có thể truyền thủ công tham số hàm khởi tạo ```$id``` theo yêu cầu của service **Transition**:
```php
use App\Services\Transistor;

$transistor = $this->app->makeWith(Transistor::class, ['id' => 1]);
```
 Nếu bạn đang ở bên ngoài service provider và bạn không có quyền truy cập vào biến ```$app```, bạn có thể sử dụng **App facade** để giải quyết một instance từ container:
 ```php
 use App\Services\Transistor;
use Illuminate\Support\Facades\App;

$transistor = App::make(Transistor::class);
```
Nếu bạn muốn container instance tự inject vào một lớp đang được container giải quyết, bạn có thể type-hint lớp ```Illuminate \ Container \ Container``` trong phương thức khởi tạo của lớp:
use Illuminate\Container\Container;
```php
/**
 * Create a new class instance.
 *
 * @param  \Illuminate\Container\Container  $container
 * @return void
 */
public function __construct(Container $container)
{
    $this->container = $container;
}
```

## Automatic Injection
Bạn có thể type-hint dependency trong phương thức khởi tạo của một lớp được container giải quyết, bao gồm controllers, event listeners, middleware,... Ngoài ra, bạn có thể type-hint dependency trong phương thức ```handle``` của [queued jobs](https://laravel.com/docs/8.x/queues). Trong thực tế, đây là cách hầu hết các đối tượng sẽ được giải quyết bởi container.


Ví dụ: bạn có thể type-hint một repository trong phương thức khởi tạo của controller. Repository sẽ tự động được resolve và inject vào lớp:
```php
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UserController extends Controller
{
    /**
     * The user repository instance.
     *
     * @var \App\Repositories\UserRepository
     */
    protected $users;

    /**
     * Create a new controller instance.
     *
     * @param  \App\Repositories\UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Show the user with the given ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
```

 # Method Invocation & Injection
 Đôi khi bạn muốn gọi một phương thức trên một instance trong khi vẫn cho phép container tự động inject các dependencies của phương thức đó. Ví dụ, cho lớp sau:
 ```php
 <?php

namespace App;

use App\Repositories\UserRepository;

class UserReport
{
    /**
     * Generate a new user report.
     *
     * @param  \App\Repositories\UserRepository  $repository
     * @return array
     */
    public function generate(UserRepository $repository)
    {
        // ...
    }
}
```
Bạn gọi phương thức ```generate``` thông qua container như sau:
```php
use App\UserReport;
use Illuminate\Support\Facades\App;

$report = App::call([new UserReport, 'generate']);
```
Phương thức ```call``` của container được dùng để gọi một closure trong khi đang tự động inject các dependencies của nó
The call method accepts any PHP callable. The container's call method may even be used to invoke a closure while automatically injecting its dependencies:
```php
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\App;

$result = App::call(function (UserRepository $repository) {
    // ...
});
```
 # Container Events
 Service container kích hoạt một sự kiện mỗi khi nó giải quyết một đối tượng. Bạn có thể lắng nghe sự kiện này bằng cách sử dụng phương thức ```resolving``:
 ```php
 use App\Services\Transistor;

$this->app->resolving(Transistor::class, function ($transistor, $app) {
    // Called when container resolves objects of type "Transistor"...
});

$this->app->resolving(function ($object, $app) {
    // Called when container resolves object of any type...
});
```
Như bạn có thể thấy, đối tượng đang được giải quyết sẽ được truyền vào callback, cho phép bạn bổ sung thuộc tính của đối tượng trước khi nó được gửi tới thành phần sử dụng nó.
 # PSR-11
Laravel service container implements interface **PSR-11**. Do đó, bạn có thể type-hint container interface **PSR-11** để có một instance của Laravel container:
```php
use App\Services\Transistor;
use Psr\Container\ContainerInterface;

Route::get('/', function (ContainerInterface $container) {
    $service = $container->get(Transistor::class);

    //
});
```
Một ngoại lệ được sinh ra nếu không thể giải quyết được identifier đã cho. Nếu identifier không bao giờ bị ràng buộc, ngoại lệ sẽ là instance của ```Psr \ Container \ NotFoundExceptionInterface```. Nếu identifier đã bị ràng buộc nhưng không thể được giải quyết, ngoại lệ sẽ là instance của ```Psr \ Container \ ContainerExceptionInterface```.

# Tham khảo
https://laravel.com/docs/8.x/container


> [Phần 2](https://viblo.asia/p/laravel-8-tim-hieu-ve-service-container-phan-2-Do754z9eZM6)