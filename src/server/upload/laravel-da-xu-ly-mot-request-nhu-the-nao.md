## 1. Mở đầu
Laravel là một framework hoạt động theo mô hình MVC (Model - View - Controller). Có thể hiểu trong mô hình này, một `request` đầu tiên sẽ chạy đến `Router`, sau đó nó tiếp tục đến Controller(C), Controller sẽ có thể tiếp tục xử lý tại Model (M) và trả dữ liệu ra View (V). Trong Laravel framework, một `request` nhìn về cơ bản hay có thể gọi là bề nổi theo cách hiểu đơn giản thì sẽ chạy theo cách nói ở trên. Tuy nhiên, mình rất muốn biết bên dưới của nó thực sự chứa đựng những gì. Vì vậy thời gian vừa qua mình cũng bớt chút thời gian để tìm đọc hiểu cũng như nghiên cứu một chút về vòng đời của một request trong Laravel framework mà mình chia sẻ tại bài này. 
Cảm ơn các bạn đã bớt chút thời gian đọc bài của mình. Nếu có vấn đề gì mọi người hãy để lại comment nhé. 
## 2. Nội dung
Trước hết mình xin được nói lại một chút về `request` mà mình vẫn hay dùng. Khi một `request` được hiểu là bắt đầu từ `Router` thì cùng xem, trên đoạn đường gian khổ để có được một `response`, nó phải trải qua những gì. Chúng ta sẽ tìm hiểu chi tiết hơn ở ngay dưới đây thôi. Mọi thứ sẽ được bắt đầu trong app của bạn từ `public/index.php`.
#### 2.1. Auto Loader
```php
require __DIR__.'/../vendor/autoload.php';
```
Đầu tiên nó sẽ gọi đến file `autoload.php`. Nó sẽ tự động load tất cả các package/library được đăng ký bởi `Composer` trong quá trình sử dụng.
<br>
Bạn có thể tìm hiểu thêm về cơ chế `autoloading` tại bài viết [PHP Autoloading, PSR4 and Composer](https://viblo.asia/p/php-autoloading-psr4-and-composer-V3m5Wy0QZO7)
#### 2.2. Khởi tạo một instance từ Laravel Application
```php
$app = require_once __DIR__.'/../bootstrap/app.php';
```
Dòng đầu tiên:
```php
$app = new Illuminate\Foundation\Application(
    realpath(__DIR__.'/../') //đây chính là đường dẫn chứa application hiện tại của chúng ta
);
```
Để xem trong này có những gì nào:
```php
public function __construct($basePath = null)
{
    if ($basePath) {
        $this->setBasePath($basePath);
    }

    $this->registerBaseBindings();

    $this->registerBaseServiceProviders();

    $this->registerCoreContainerAliases();
}
```
Đầu tiên trong `__constructor` nó nhận vào một cái `$basePath = null`, sau đó nó sẽ kiểm tra sự tồn tại của `$basePath` này và sẽ tạo ra các global path cho các thư mục như `base, lang, config, public, storage, database, resources, bootstrap` mà chúng ta vẫn sử dụng. <br>
Ví dụ:
```php
$this->instance('path.config', $this->configPath());

public function configPath($path = '')
{
    return $this->basePath.DIRECTORY_SEPARATOR.'config'.($path ? DIRECTORY_SEPARATOR.$path : $path); // define ('DIRECTORY_SEPARATOR', "/");
    // => chính là thư mục config trong application của bạn đó.
}
```
Vậy tại sao nói nó tạo ra các global đường dẫn ??? Đã bao giờ các bạn sử dụng các hàm như `config_path`, `public_path, ...` chưa. <br>Tất cả các hàm này đều tạo ra một instance với cái tên `'path.name'`, trùng với các thư mục trong application của bạn. Và chúng được tạo ra bởi các hàm trong file `helpers.php`. <br>
```php
if (! function_exists('config_path')) {
    /**
     * Get the configuration path.
     *
     * @param  string  $path
     * @return string
     */
    function config_path($path = '')
    {
        return app()->make('path.config').($path ? DIRECTORY_SEPARATOR.$path : $path);
    }
}
```
Khi bạn gọi `config_path()`, mặc định Laravel sẽ tạo ra một `instance` của cái tên `path.config`. Mà hàm này chính là đường dẫn đến file folder `config` đã nói ở trên. <br>
Hàm `$this->registerBaseBindings();` sẽ tạo một instance của `'app'` và một instance của class `Container::class` bằng chính cái  class `Illuminate\Foundation\Application.php` này. 
```php
$this->instance('app', $this);

$this->instance(Container::class, $this);
```
Mở cái class `Container.php` kia ra mình có thấy rất nhiều các methods quen thuộc liên quan đến khái niệm về `Service Container` như `bind`, `singleton`. Để hiểu hơn về 2 khái niệm này các bạn có thể tìm hiểu tại một số bài viết như: 
- [Laravel beauty - Tìm hiểu về service container](https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB) của anh Trần Đức Thắng.
- [Laravel service container in depth tips to customize your application](https://viblo.asia/p/laravel-service-container-in-depth-tips-to-customize-your-application-RQqKLnqNl7z) của anh Nguyễn Ngọc Vịnh

Và cuối cùng là khởi tạo một instance của `PackageManifest`. Trong bài này chúng ta không cần quan tâm nhiều lắm đâu nhé. 
<br> Tiếp  theo:
```php
$this->registerBaseServiceProviders();
```
Laravel sẽ đăng kí các `Service Provider` cơ bản cho application. Tưởng tượng như project của chúng ta sẽ luôn luôn cần có những cái cơ bản, cái gốc để nó có thể hoạt động được. Chúng ta có thể thấy Laravel đăng ký các provider như `Event, Log, Routing`:
```php
$this->register(new EventServiceProvider($this));

$this->register(new LogServiceProvider($this));

$this->register(new RoutingServiceProvider($this));
```
Cuối cùng trong hàm `__constructor` là:
```php
$this->registerCoreContainerAliases();
```
Mình sẽ mở 1 đoạn trong hàm này và xem nó có gì nhé:
```php
public function registerCoreContainerAliases()
{
    foreach ([
        'app'                  => [\Illuminate\Foundation\Application::class, \Illuminate\Contracts\Container\Container::class, \Illuminate\Contracts\Foundation\Application::class,  \Psr\Container\ContainerInterface::class],
        'auth'                 => [\Illuminate\Auth\AuthManager::class, \Illuminate\Contracts\Auth\Factory::class],
       // ...
    ] as $key => $aliases) {
        foreach ($aliases as $alias) {
            $this->alias($key, $alias);
        }
    }
}
```
Hàm này có tác dụng đăng ký các tên cho các class trong Laravel Application. Ví dụ như `'app'` sẽ được gán cho `\Illuminate\Foundation\Application::class`, `\Illuminate\Contracts\Container\Container::class`, `\Psr\Container\ContainerInterface::class]`. <br>
Ví dụ khi bạn gọi `app()->make('hash')` thì `'hash'` chính là `\Illuminate\Hashing\HashManager::class`. <br>
Bước tiếp theo, Laravel sẽ đăng kí binding cho class `Http\Kernel` và `Console\Kernel` cùng với đó là một class Exception, mục tiêu là để phục vụ cho việc handle `Request` và handle các lỗi khi xảy ra từ `Http` và giao diện `Console`. (`Terminal`). <br>Sau khi binding xong , `$app` này sẽ được trả về.
```php
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

return $app;
```
#### 2.3. Tạo  Http Kernel
```php
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
```
Ở trên chúng ta thấy Laravel binding class `Illuminate\Contracts\Http\Kernel::class` bằng một `App\Http\Kernel::class`. Vậy hàm này sẽ trả về cho chúng ta một instance của `Illuminate\Contracts\Http\Kernel::class`, chính là  `App\Http\Kernel.php`
#### 2.4. Handle Request
`Http Kernel` này sẽ xử lý `$request` và `$response` là kết quả của quá trình xử lý:
```php
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
```
Giờ chúng ta cùng tìm hiểu xem Laravel của chúng ta thực sự đã làm những gì để xử lý một request nhé.
Chúng ta hãy mở class `App\Http\Kernel` ra. Trong này có rất nhiều `groupMiddleware` khác nhau. Nếu để ý bạn có thể thấy có một nhóm `globalMiddleware`, một `middlewareGroup` và một `routeMiddleware`, nhiệm vụ của chúng là dùng để lọc các `request` chạy đến application của bạn, sau đó xử lý như thế nào tiếp theo sẽ là do phần xử lý bên trong của middleware đó. 
<br>
Nhóm `globalMiddleware` là phần mà mỗi request đều phải đi qua nó. Ví dụ như middleware `\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class`
```php
protected function transform($key, $value)
{
    return is_string($value) && $value === '' ? null : $value;
}
```
Hàm này chắc các bạn cũng hiểu rồi phải không. <br> Bạn mở class mà Kernel kế thừa ra tại  `Illuminate\Foundation\Http\Kernel`. <br>
Kéo xuống phần hàm `handle($request)` ta thấy có đoạn 
```php
$response = $this->sendRequestThroughRouter($request);
```
Mở hàm `sendRequestThroughRouter($request)` và 2 hàm dưới luôn nhé. Tại nó gần nhau :D
```php
protected function sendRequestThroughRouter($request)
{
    $this->app->instance('request', $request); // Đăng ký request hiện tại với Laravel Service Container với tên `'request'`

    Facade::clearResolvedInstance('request'); // Loại bỏ request facade khác

    $this->bootstrap(); // Load các bootstrapper

    return (new Pipeline($this->app)) //Đẩy request qua các middleware và cuối cùng là đẩy request lên router
                ->send($request)
                ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
                ->then($this->dispatchToRouter());
}

public function bootstrap()
{
    if (! $this->app->hasBeenBootstrapped()) {
        $this->app->bootstrapWith($this->bootstrappers());
    }
}

/**
 * Get the route dispatcher callback.
 *
 * @return \Closure
 */
protected function dispatchToRouter()
{
    return function ($request) {
        $this->app->instance('request', $request);

        return $this->router->dispatch($request);
    };
}
```
Đến đây, gần như quá trình handle một `request` đã xong. Quay lại hàm `handle($request)` tại `Illuminate\Foundation\Http\Kernel.php`, sau khi dispatch request lên router và đã được xử lý, nó sẽ dispatch một event bao để báo rằng request đã được xử lý, hàm này gồm 2 tham số quen thuộc là `$request` và `$response`. 
```php
$this->app['events']->dispatch(
    new Events\RequestHandled($request, $response)
);

return $response // cuối cùng là phải return cái $response này
```
#### 2.5. Kết thúc
Sau khi có `$response` nó sẽ được trả về cho người dùng
```php
$response->send();
```
Quá trình handle một request được kết thúc, cuối cùng là đóng Kernel và kết thúc.
```php
$kernel->terminate($request, $response);
```
## 3. Vi vu
Có lẽ đọc từ nãy đến giờ cũng khá là lan man rồi. Giờ mình sẽ tổng hợp lại về nội dung chính về vòng đời của một request trong Laravel.
- Auto Loader.
- Khởi tạo ứng dụng, đăng ký các global_path, provider cơ bản, các bí danh cho các class.
- Binding class Kernel, Exception.
- Tạo Kernel.
- Đăng ký Service Provider
- Send request qua middleware => send request tới router
- Gửi response về cho người dùng
- Kết thúc

Đã bao giờ bạn nghĩ mỗi dòng code trong Laravel bạn đang sử dụng để handle request từ đâu mà dùng được chưa, ví dụ
```php
app()->handle('')
//or
use Client;
public function handle(Client $client)
...
```
hay gần như bất cứ đoạn code nào khác. Tất cả chúng đều được tạo ra, đều được khởi tạo một cách rất **tuần tự** và hoàn hảo. <br> Và thành phần quan trọng nhất trong quá trình handle một request trong Laravel chính là **Service Provider**.
<br>
## 4. Kết
Bài viết của mình đến đây xin được dừng lại. Mình không biết có quá lan man hay làm cho các bạn không hiểu hay không. :D Nếu có vấn đề gì hãy comment lại cho mình biết nhé. Bài tới mình sẽ viết về <b>Service Provider</b> trong Laravel.  Cảm ơn mọi người đã theo dõi.