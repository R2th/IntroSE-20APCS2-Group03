# Tìm hiểu về Facade trong Laravel
## 1. Static method
Các thuộc tính, phương thức trong lớp khai báo với từ khóa `static` là một đặc tính hữu dụng trong PHP. Về cơ bản, phương thức / thuộc tính tĩnh (static) thì nó có thể truy cập trực tiếp mà không phải tạo đối tượng của lớp.

Ví dụ về static method và non-static method.
```php
class Math
{
    private $firstNumber;

    public function __construct(int $firstNumber)
    {
        $this->firstNumber = $firstNumber;
    }

    public function add(int $secondNumber)
    {
        return $sum = $this->firstNumber + $secondNumber;
    }

    public static function mul(int $firstNumber, int $secondNumber)
    {
        return $firstNumber * $secondNumber;
    }
}

$math = new Math(10);
$addResult = $math->add(5);
//15
$mulResult = Math::mul(10,5);
//50
```

## 2. Magic methods
Trong quá trình code, chúng ta sử dụng rất nhiều lần các phương thức như `__construct()`, `__call()`,… Các phương thức này chính là magic method. Vậy magic method là các phương thức đặc biệt để tùy biến các các sự kiện trong php. Có thể hiểu đơn giản là nó cung cấp thêm cách để giải quyết một vấn đề nào đó trong phạm vi class. Magic method được dùng để xử lý các đối tượng trong lập trình hướng đối tượng, dưới đây là ví dụ về 2 magic methods thường dùng.

```php
class Math
{
    private $firstNumber;
    
    public function __construct(int $firstNumber)
    {
        $this->firstNumber = $firstNumber;
    }

    public function __destruct()
    {
        echo 'this Object has been destroyed';
    }
}
```

Trước khi tìm hiểu rõ hơn về Facade, ta hãy tìm hiểu trước về magic method là `__callStatic()`. Khi gọi đến một static method chưa được khai báo bị lỗi “Call to undefined method”, nhưng nếu ta đã có phương thức `__callStatic()` trong class, PHP sẽ tự động gọi tới đó (`__callStatic()` chỉ có áp dụng với các static method), tương tự `__call()` chỉ áp dụng được với các non-static method.

```php
class Math
{
    private $firstNumber;

    public function __construct(int $firstNumber)
    {
        $this->firstNumber = $firstNumber;
    }

    public function __destruct()
    {
        echo 'this Object has been destroyed';
    }

    public static function __callStatic($name, $arguments)
    {
        echo "Undefined static method called";
    }
}

Math::undefinedMethod();
//Undefined static method called
```

## 3. Facades
Facades là một trong những tính năng rất hữu dụng trong laravel với Facades, chúng ta có thể truy cập đến hầu hết các tính năng của laravel
Ví dụ về sử dụng facades:
`Auth::id()`, `Auth::user()`, `Route::get(),…`

Để hiểu rõ hơn, hãy vào xem file `config/app.php`

```php
'aliases' => [

        'App' => Illuminate\Support\Facades\App::class,
        'Artisan' => Illuminate\Support\Facades\Artisan::class,
        'Auth' => Illuminate\Support\Facades\Auth::class,
        'Blade' => Illuminate\Support\Facades\Blade::class,
        'Broadcast' => Illuminate\Support\Facades\Broadcast::class,
        'Bus' => Illuminate\Support\Facades\Bus::class,
        'Cache' => Illuminate\Support\Facades\Cache::class,
        'Config' => Illuminate\Support\Facades\Config::class,
        'Cookie' => Illuminate\Support\Facades\Cookie::class,
        'Crypt' => Illuminate\Support\Facades\Crypt::class,
        'DB' => Illuminate\Support\Facades\DB::class,
        'Eloquent' => Illuminate\Database\Eloquent\Model::class,
        'Event' => Illuminate\Support\Facades\Event::class,
        'File' => Illuminate\Support\Facades\File::class,
        'Gate' => Illuminate\Support\Facades\Gate::class,
        'Hash' => Illuminate\Support\Facades\Hash::class,
        'Lang' => Illuminate\Support\Facades\Lang::class,
        'Log' => Illuminate\Support\Facades\Log::class,
        'Mail' => Illuminate\Support\Facades\Mail::class,
        'Notification' => Illuminate\Support\Facades\Notification::class,
        'Password' => Illuminate\Support\Facades\Password::class,
        'Queue' => Illuminate\Support\Facades\Queue::class,
        'Redirect' => Illuminate\Support\Facades\Redirect::class,
        'Redis' => Illuminate\Support\Facades\Redis::class,
        'Request' => Illuminate\Support\Facades\Request::class,
        'Response' => Illuminate\Support\Facades\Response::class,
        'Route' => Illuminate\Support\Facades\Route::class,
        'Schema' => Illuminate\Support\Facades\Schema::class,
        'Session' => Illuminate\Support\Facades\Session::class,
        'Storage' => Illuminate\Support\Facades\Storage::class,
        'URL' => Illuminate\Support\Facades\URL::class,
        'Validator' => Illuminate\Support\Facades\Validator::class,
        'View' => Illuminate\Support\Facades\View::class,

    ],
```

Tại đây, rất nhiều cái tên quen thuộc như App, DB, Auth,… Laravel đã khai báo sẵn một loạt các class alias. Mục đích của việc này để chúng ta có thể sử dụng khi code với cái tên ngắn gọn thay vì phải viết đầy đủ cả namespace. 

Ví dụ khai báo `'Auth' => Illuminate\Support\Facades\Auth::class `, khi chúng ta sử dụng class Auth,  thực tế ta đã gọi đến class `Illuminate\Support\Facades\Auth`.

Để ý chút ta sẽ thấy tên các class được đăng ký alias đều có namespace chung là `Illuminate\Support\Facades`. Điều này có nghĩa là những class được đăng ký ở đây đều là Facades, và tất cả những class này đều extends một class có tên là Facade.
Từ ví dụ các facades `Auth::id()`, `Auth::user()`, `Auth::logout()`,… Các gọi này chính là gọi các static method, hãy xem trong class Auth ta có những method nào.

```php
class Auth extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'auth';
    }

    /**
     * Register the typical authentication routes for an application.
     *
     * @return void
     */
    public static function routes()
    {
        static::$app->make('router')->auth();
    }
}
```

Có thể thấy trong class Auth không có static method nào là `id()`, `user()`,… cả, nhưng ta thấy class này overrides lại một hàm là `getFacadeAccessor()`, hãy vào thử abstact class Facade xem nó có gì bên trong.

```php
    protected static function getFacadeAccessor()
    {
        return 'auth';
    }
```

Việc định nghĩa hàm `getFacadeAccessor()` sẽ bắt buộc các class extends từ class Facade sẽ phải overrides lại hàm này, nếu không sẽ throw ra Exception.

```php
    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();

        if (! $instance) {
            throw new RuntimeException('A facade root has not been set.');
        }

        return $instance->$method(...$args);
    }
```

Kéo xuống phần dưới cùng của class, ta thấy có magic method là `__callStatic()`. Như đã trình bày ở trên, khi gọi các hàm static của Auth thực tế sẽ được xử lý trong magic method `__callStatic`, ở đây sẽ tạo ra một Facade instance, instance này được resolve ra từ Application Instance $app với hàm `getFacadeRoot();` (Chính là Service Container). Như vậy việc sử dụng facade Auth chính là sử dụng service auth của Service Container.

Ví dụ:
```php
Auth::user();
// Tương đương với 
$auth = app(‘auth’);
$auth->user();
```

Bài viết này hy vọng sẽ giúp bạn hiểu rõ hơn về Facades, cũng như sự ứng dụng của Service Container trong Laravel. Dưới đây là tên các Facade với Class và Service Container tương ứng.

| Facade   | Class | Service Container Binding |
|----------|----------|-------------------------|
|App | Illuminate\Foundation\Application |app|
| Artisan | Illuminate\Contracts\Console\Kernel |artisan|
| Auth | Illuminate\Auth\AuthManager | auth |
| Auth (Instance) | Illuminate\Contracts\Auth\Guard |auth.driver |
| Blade | Illuminate\View\Compilers\BladeCompiler |blade.compiler|
|Broadcast | Illuminate\Contracts\Broadcasting\Factory| |
| Broadcast (Instance)|Illuminate\Contracts\Broadcasting\Broadcaster| |
| Bus | Illuminate\Contracts\Bus\Dispatcher ||
| Cache | Illuminate\Cache\CacheManager |cache|
|Cache| (Instance) Illuminate\Cache\Repository | cache.store|
|Config |Illuminate\Config\Repository| config|
|Cookie |Illuminate\Cookie\CookieJar| cookie|
|Crypt| Illuminate\Encryption\Encrypter |encrypter|
|DB |Illuminate\Database\DatabaseManager| db
|DB |(Instance) |Illuminate\Database\Connection |db.connection
|Event| Illuminate\Events\Dispatcher| events|
|File| Illuminate\Filesystem\Filesystem |files|
|Gate |Illuminate\Contracts\Auth\Access\Gate||
|Hash| Illuminate\Contracts\Hashing\Hasher |hash|
|Lang| Illuminate\Translation\Translator| translator|
|Log| Illuminate\Log\Logger| log|
|Mail |Illuminate\Mail\Mailer| mailer|
|Notification |Illuminate\Notifications\ChannelManager|
|Password| Illuminate\Auth\Passwords\PasswordBrokerManager |auth.password|
|Password |(Instance) Illuminate\Auth\Passwords\PasswordBroker |auth.password.broker|
|Queue |Illuminate\Queue\QueueManager |queue|
|Queue |(Instance)Illuminate\Contracts\Queue\Queue| queue.connection
|Queue |(Base Class) Illuminate\Queue\Queue||
|Redirect |Illuminate\Routing\Redirector |redirect|
|Redis| Illuminate\Redis\RedisManager| redis|
|Redis (Instance) |Illuminate\Redis\Connections\Connection| redis.connection|
|Request| Illuminate\Http\Request |request|
|Response| Illuminate\Contracts\Routing\ResponseFactory||
|Response (Instance)| Illuminate\Http\Response ||
|Route |Illuminate\Routing\Router |router|
|Schema |Illuminate\Database\Schema\Builder||
|Session |Illuminate\Session\SessionManager| session|
|Session |(Instance) Illuminate\Session\Store| session.store|
|Storage |Illuminate\Filesystem\FilesystemManager| filesystem|
|Storage |(Instance) Illuminate\Contracts\Filesystem\Filesystem| filesystem.disk|
|URL |Illuminate\Routing\UrlGenerator |url|
|Validator |Illuminate\Validation\Factory |validator|
|Validator (Instance) |Illuminate\Validation\Validator||
|View |Illuminate\View\Factory |view|
|View (Instance)| Illuminate\View\View||

*Bài viết tham khảo từ nhiều nguồn*