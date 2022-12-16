Xin chào anh em , gặp lại anh em trong bài viết chia sẻ lần này trong series **Laravel và những điều thú vị** mình muốn chia sẻ những điều mình đã tìm hiểu được về **Service Provider** trong Laravel. Như các bạn biết đấy, bài viết lần trước mình đã chia sẻ về [Service Container](https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8). Thì bài viết này mình muốn chia sẻ về **Service Provider** trong Laravel - trung tâm của việc khởi tạo tất cả các ứng dụng trong Laravel. Chúng mình cùng đi tìm hiểu nó nhé.
# 1. Service Provider là gì ?
Như mình cũng nói ở trên rồi, `Service Provider` nó là trung tâm của việc khởi tạo tất cả các ứng dụng trong Laravel, các thành phần `core` sẽ được khởi tạo từ `Service Provider`.

Chúng ta để ý đến file app/config/app.php các bạn sẽ thấy ngay đoạn khai báo này
```PHP
/*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'providers' => [

        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,

    ],
```
Các bạn có thấy quen không, mỗi lần chúng ta mà cài đặt package nào qua composer thì chúng ta cũng phải khải báo `Service Provider` trong mảng `providers` này. Tất cả những service provider này sẽ được load vào trong ứng dụng, những đôi khi chỉ một số mới được load khi service được yêu cầu.Nói chúng định nghĩa `Service Provider` trong [documentation](https://laravel.com/docs/5.6/providers) nó còn mơ hồ quá. Chuyển sang tí cách dùng để giải thích nhá.
<br> Các bạn có thấy `App\Providers\AppServiceProvider::class` được khai báo trong mảng `providers` trong file app/config/app.php không ? Nó chính là một `Service Provider` đó. Thay vì luôn luôn phải sử dụng `app()->bind() app()->instance() app()->singleton()`, thì bây giờ việc bindings trong file app/config/app.php thì sẽ được truyền vào dưới dạng tên class để Laravel có thể tự động tìm tới Service Provider tương ứng và bind chúng vào Container. Các Service Provider là nơi sẽ thực hiện việc khai báo service và bind vào trong Service Container.
## Chú ý
Các bạn có thể tìm vào thư mục app/boostrap/app.php thì các bạn sẽ thấy đoạn code sau đây:
```PHP
$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
```
Chỉ có duy nhất file này mới thực hiện binding trực tiếp các service , còn đâu ngoài ra bạn sẽ không tim thấy còn chỗ nào bind trực tiếp như này nữa đâu. Tất cả đều được đăng ký tên class để thực hiện việc binding trong mảng `providers` trong file config/app.php.
# 2. Class abstract ServiceProvider
Chúng ta thử cùng tìm hiểu một ServiceProvider nhé. 
```PHP
<?php

namespace Illuminate\Redis;

use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;

class RedisServiceProvider extends ServiceProvider
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
        $this->app->singleton('redis', function ($app) {
            $config = $app->make('config')->get('database.redis');

            return new RedisManager(Arr::pull($config, 'client', 'predis'), $config);
        });

        $this->app->bind('redis.connection', function ($app) {
            return $app['redis']->connection();
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['redis', 'redis.connection'];
    }
}
```
Nào chúng ta cùng đi phân tích về `RedisServiceProvider` chút nhé
 Các bạn có thấy `RedisServiceProvider` extends từ abstract class `ServiceProvider`. Ta tìm thấy abstract class `ServiceProvider` thì thấy có hàm `register()` nên tất cả việc binding đều phải viết trong hàm này.
 <br>
 Tiếp theo ta thấy biến `$defer = true;` trong class . Biến này có ý nghĩa rằng nếu ta gán cho nó giá trị bằng `true` thì quá trình binding sẽ không được thực hiện khi service không được gọi. Ví dụ như là khi bạn dùng câu lệnh `App::make('redis')` thì quá trình binding mới được thực hiện , một instance RedisManager mới được tạo ra. Và từ lần gọi sau thì instance RedisManager có trong Service Container rồi nên cứ gọi ra mà dùng thôi. Tại sao chúng ta nên khai báo `$defer = true`??? Đó chính là để tăng hiệu năng cho ứng dụng của bạn, chỉ gọi khi cần thiết chứ không load bừa phứa lên rồi để đấy không sử dụng . Điều này khiến hiệu năng ứng dụng của bạn kém hơn.
 <br>Cuối cùng là hàm `provider()` - hàm này sẽ cho Laravel biết là provider của bạn sẽ trả về service gì.
 # 3. Thuộc tính bindings và singletons
 Ở các phiên bản Laravel 5.3 trở về trước không có 2 thuộc tính này, nhưng ở phiên bản Laravel 5.6 thì xuất hiện thêm 2 thuộc tính này. Nếu như chúng ta muốn binding nhiều nhiều thì thay vì chúng ta viết các `app()->bind() app()->singleton()` thì chúng ta có thể khai báo như sau:
 ```PHP
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
 Khi Service Provider được load bởi Laravel thì Laravel sẽ tự động check những thuộc tính `$bindings $singletons` này để tự động binding. Đây là một điểm thuận tiện cho phiên bản Laravel 5.6.
# 4. Phương thưc boot()
Nếu như bạn muốn đăng ký một `view composer` thì bạn sẽ viết trong hàm `boot()`
```PHP
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
Hàm này sẽ được gọi khi tất cả các Service Provider được đăng ký xong.
# 5. Kết luận
Vậy qua trên mình cũng chia sẻ những gì mình đã tìm hiểu được về `Service Provider` trong Laravel. Mong rằng bài viết của mình cũng một phần nào làm sáng tỏ một chút về `Service Provider`. Cảm ơn các bạn đã đọc bài chia sẻ của mình.
# 6. Tham khảo
https://laravel.com/docs/5.6/providers
<br>https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-provider-zb7vDVJnMjKd