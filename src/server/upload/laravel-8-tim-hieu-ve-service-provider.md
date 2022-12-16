# Giới thiệu
Các service trong ứng dụng Laravel đều được khởi động thông qua Service Provider. Cụ thể, quá trình khởi động service ở đây là đăng ký các Service Container binding, event listener, middleware hay route... Mỗi component sẽ có một service provider làm nhiệm vụ đăng ký key (sau khi binding) hoặc kích hoạt một số hàm (sau khi framework boot).


Để thấy rõ hơn điều này, bạn hãy mở file **config/app.php**. Bạn sẽ thấy một mảng `providers` chứa tất cả các lớp service provider sẽ được load. Có một số component có sẵn trong Laravel như mailer, cache, queue sẽ mặc định được thêm sẵn provider trong mảng. 


Sau đây, mình sẽ hướng dẫn các bạn tự viết một service provider và đăng ký provider với ứng dụng Laravel.

# Tự viết Service Provider

Mọi service provider đều kế thừa từ lớp  `Illuminate\Support\ServiceProvider`. Mỗi service provider có thể implement 2 phương thức là `register` và `boot`. Bạn cũng có thể tạo một provider mới bằng cách sử dụng artisan:
```php
php artisan make:provider NewServiceProvider
```

## register
Trong phương thức `register`, bạn chỉ nên bind các lớp trong service container. Nếu bạn cố đăng ký event listener, route hay bất kỳ thứ gì khác trong `register`, bạn có thể gặp lỗi do vô tình sử dụng service có provider chưa được load.


```php
<?php

namespace App\Providers;

use App\Services\Riak\Connection;
use Illuminate\Support\ServiceProvider;

class RiakServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
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
Trong ví dụ trên, `register` trả về một implementation của `App\Services\Riak\Connection` trong service container. Bạn có thể đọc thêm về service container tại đây [https://viblo.asia/p/laravel-8-tim-hieu-ve-service-container-phan-1-bWrZnz0QZxw]


Nếu bạn muốn `register` nhiều container binding đơn giản, bạn có thể sử dụng thuộc tính bindings và singleton thay vì `register` từng binding một. Khi provider được load, nó sẽ tự động check 2 thuộc tính này và `register` các binding.
```php
<?php

namespace App\Providers;

use App\Contracts\DowntimeNotifier;
use App\Contracts\ServerProvider;
use App\Services\DigitalOceanServerProvider;
use App\Services\PingdomDowntimeNotifier;
use App\Services\ServerToolsProvider;
use Illuminate\Support\ServiceProvider;

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
        ServerProvider::class => ServerToolsProvider::class,
    ];
}
```

## boot
Phương thức `boot` được gọi sau khi tất cả các service provider khác đã được đăng ký. Dưới đây là một ví dụ đăng ký view composer với `boot`
```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
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
        View::composer('view', function () {
            //
        });
    }
}
```
Bạn có thể dùng key của dependency đã được bind trong `boot`. Trong ví dụ dưới đây, service provider sẽ tự động inject dependency tương ứng với key **serialized**
```php
use Illuminate\Contracts\Routing\ResponseFactory;

/**
 * Bootstrap any application services.
 *
 * @param  \Illuminate\Contracts\Routing\ResponseFactory  $response
 * @return void
 */
public function boot(ResponseFactory $response)
{
    $response->macro('serialized', function ($value) {
        //
    });
}
```

# Đăng ký provider
Mọi service provider đều được đăng ký trong file **config/app.php** thông qua mảng **providers**. Bạn chỉ cần thêm provider của mình vào mảng này.
```php
'providers' => [
    // Other Service Providers

    App\Providers\ComposerServiceProvider::class,
],
```

# Deferred Provider
Deferred provider (provider "chậm") là provider sẽ chỉ được load khi có request gọi đến service tương ứng. Nếu provider của bạn chỉ đăng ký cho các binding trong service container, việc đăng ký này sẽ bị hoãn cho đến khi một trong số các binding đó thực sự được dùng đến.
Việc hoãn đăng ký này giúp cải thiện performance của ứng dụng, do nó không cần load file trong mọi request.


Laravel compile và lưu các deferred provider cùng với tên lớp service container tương ứng. Chỉ khi bạn resolve service thì Laravel mới load service provider đó.


Để hoãn load một provider, bạn chỉ cần implement interface `\Illuminate\Contracts\Support\DeferrableProvider` và ghi đè phương thức `provides`. `provides` trả về các service container bingding được đăng ký bởi provider:
```php
<?php

namespace App\Providers;

use App\Services\Riak\Connection;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class RiakServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register any application services.
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

# Nội dung liên quan
Bạn có thể tìm hiểu thêm các nội dung liên quan (Service Container, Facade) để hiểu rõ hơn về bài viết này. 

# Tài liệu tham khảo
https://laravel.com/docs/8.x/providers#deferred-providers
https://laracasts.com/series/laravel-6-from-scratch/episodes/41