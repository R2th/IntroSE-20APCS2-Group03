# Introduction

Service providers là vị trí trung tâm của tất cả các ứng dụng Laravel bootstrapping. Ứng dụng của bạn, cũng như các core service của Laravel được "bootstrapped" thông qua service providers.

<br>

Nhưng, "bootstrapped" nghĩa là gì? Nói chung, chúng ý là **đăng ký**, bao gồm đăng kí các liên kết tới service container, event listeners, middleware, và thậm chí các route. Service providers là trung tâp để cấu hình ứng dụng của bạn.

<br>

Nếu bạn mở file ```config/app.php``` đi kèm trong Laravel, bạn sẽ thấy một mảng ```providers```. Tất cả những service provider class này sẽ được load vào trong ứng dụng. Tất nhiên, nhiều trong số đó được gọi là "deferred" providers, nghĩa là chúng không phải được load trong mọi request, chỉ khi có service nào yêu cầu thì mới được gọi đến.

<br>

Trong phần tổng quát này, bạn sẽ học cách viết service providers của riêng bạn và đăng kí chúng với Laravel.

<br>

# Writing Service Providers

Tất cả các service providers đều kế thừa từ class ```Illuminate\Support\ServiceProvider```. Hầu hết service providers chứa phương thức ```register``` và ```boot```. Trong phương thức ```register```, bạn nên **only bind things into the** [service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2). Bạn đừng bao giờ cố gắng đăng kí bất kì các event listeners, routes hay bất kì chức năng nào khác vào trong phương thức ```register```.

<br>

Artisan CLI có thể dễ dàng sinh ra một provider mới thông qua lệnh ```make:provider```:

<br>

```
php artisan make:provider RiakServiceProvider
```

### The Register Method

Như đã đề cập ở trước, bên trong phương thức ```register```, bạn chỉ bind mọi thứ vào trong [service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2). Bạn đừng bao giờ cố gắng đăng ký bất kỳ event listeners, routes hay bất kì các chức năng nào khác vào trong phương thức ```register```. Nếu không, bạn vô tình có thể sử dụng một service được cung cấp bởi một service provider mà chưa được load.

<br>


Hãy xem một ví dụ service provider cơ bản bên dưới. Trong bất kỳ phương thức nào của service provider, bạn luôn có quyền truy cập vào thuộc tính ```$app```, nó cung cấp quyền để truy cập vào service container:

<br>


```
<?php

namespace App\Providers;

use Riak\Connection;
use Illuminate\Support\ServiceProvider;

class RiakServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Connection::class, function ($app) {
            return new Connection(config('riak'));
        });
    }
}
```

<br>

Service provider này chỉ định nghĩa 1 phương thức ```register```, và sử dụng phương twhcs đó để  define một implementation của ```Riak\Connection``` trong service container. Nếu bạn không hiểu service container hoạt động như thế nào, hãy xem [tài liệu](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2) này.

<br>

**The** *```bindings```* **And** *```singletons```* **Properties**

<br>

Nếu service provider của bạn đăng ký nhiều rằng buộc đơn giản, bạn có thể muốn sử dụng thuộc tính ```bindings``` và ```singletons``` thay vì đăng ký thủ công từng container binding. Khi service provider được load bởi framework, nó sẽ tự động kiểm tra cá thuộc tính này và đăng ký các binding của chúng:

<br>

```
<?php

namespace App\Providers;

use App\Contracts\ServerProvider;
use App\Contracts\DowntimeNotifier;
use Illuminate\Support\ServiceProvider;
use App\Services\PingdomDowntimeNotifier;
use App\Services\DigitalOceanServerProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        ServerProvider::class => DigitalOceanServerProvider::class,
    ];

    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        DowntimeNotifier::class => PingdomDowntimeNotifier::class,
    ];
}
```

### The Boot Method


Vậy nếu như chúng ta muốn đăng kí một [view composer](https://laravel.com/docs/5.6/views#view-composers) vào trong service provider thì sao? Điều này có thể thực hiện bên trong phương thức ```boot```. **Phương thức này được gọi sau khi tất cả các service providers đã được đăng kí**, nghĩa là bạn có thể truy cập vào trong tất cả các services đã được đăng kí vào trong framework:

<br>

```
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('view', function () {
            //
        });
    }
}
```

<br>

**Boot Method Dependency Injection**

<br>

Bạn có thể type-hint dependencies cho service provider của bạn ở phương thức ```boot```. [Service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2) sẽ tự động inject bất cứ dependencies nào bạn cần:

<br>

```
use Illuminate\Contracts\Routing\ResponseFactory;

public function boot(ResponseFactory $response)
{
    $response->macro('caps', function ($value) {
        //
    });
}
```

# Registering Providers

Tất cả các service provider được đăng kí bên trong file cấu hình ```config/app.php```. File này chứa một mảng ```providers``` nơi mà bạn có thể liệt kê tên class của các service providers. Mặc định, một tập hợp các core service provider của Laravel nằm trong mảng này. Những provider này làm nhiệm vụ khởi tạo các thành phần core của Laravel, ví dụ như mailer, queue, cache, và các thành phần khác.

<br>

Để đăng ký provider của bạn, thêm nó vào mảng:

<br>

```
'providers' => [
    // Other Service Providers

    App\Providers\ComposerServiceProvider::class,
],
```

# Deferred Providers
Nếu provider của bạn chỉ đăng ký các bindings trong [service container](https://viblo.asia/p/laravel-tim-hieu-ve-service-container-maGK7jWD5j2), bạn có thể chọn trì hoãn việc đăng kí của mình cho tới khi nào cần thiết. Việc trì hoãn quá trình load một provider sẽ cải thiện performance cho ứng dụng, vì nó không load từ filesystem cho mọi request.

<br>

Laravel biên dịch và lưu một danh sách tất cả các services cung cấp bởi deferred service providers, cùng với tên class service provider của nó. Khi đó, chỉ khi nào bạn cần resolve một trong những service này thì Laravel mới thực hiện load service provider.

<br>

Để trì hoàn việc load một provider, set thuộc tính ```defer``` thành ```true``` và định nghĩa một phương thức ```provides```. Phương thức ```provides``` sẽ trả về  binding service container mà provider này đăng kí:

```
<?php

namespace App\Providers;

use Riak\Connection;
use Illuminate\Support\ServiceProvider;

class RiakServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Connection::class, function ($app) {
            return new Connection($app['config']['riak']);
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [Connection::class];
    }

}
```

<br>

Tài liệu: https://laravel.com/docs/5.6/providers