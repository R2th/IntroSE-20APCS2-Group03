# Giới thiệu
Laravel Facades như `Auth`, `View`, `Mail`, hay các helpers như `auth()`, `view()`,... có nhiều magic ẩn dưới giúp code chúng ta ngắn gọn hơn và làm được việc nhanh hơn. Nhưng vì quá magic nên khá là khó để hiểu sâu hay khi debug, ta chỉ biết dùng nó mà chẳng biết nó hoạt động như thế nào? Rồi trong một project, chỗ thì dùng Facade, chỗ thì dùng helpers lung tung hết cả lên?? 

Đã bao giờ bạn xem code của class `Auth`, thực ra nó là `Illuminate\Support\Facades\Auth`, `Auth` là alias config ở file `config/app.php`, code của nó như thế này:

```php
<?php

namespace Illuminate\Support\Facades;

/**
 * @method static mixed guard(string|null $name = null)
 * @method static void shouldUse(string $name);
 * @method static bool check()
 * @method static bool guest()
 * @method static \Illuminate\Contracts\Auth\Authenticatable|null user()
 * @method static int|null id()
 * @method static bool validate(array $credentials = [])
 * @method static void setUser(\Illuminate\Contracts\Auth\Authenticatable $user)
 * @method static bool attempt(array $credentials = [], bool $remember = false)
 * @method static bool once(array $credentials = [])
 * @method static void login(\Illuminate\Contracts\Auth\Authenticatable $user, bool $remember = false)
 * @method static \Illuminate\Contracts\Auth\Authenticatable loginUsingId(mixed $id, bool $remember = false)
 * @method static bool onceUsingId(mixed $id)
 * @method static bool viaRemember()
 * @method static void logout()
 * @method static \Symfony\Component\HttpFoundation\Response|null onceBasic(string $field = 'email',array $extraConditions = [])
 * @method static null|bool logoutOtherDevices(string $password, string $attribute = 'password')
 * @method static \Illuminate\Contracts\Auth\UserProvider|null createUserProvider(string $provider = null)
 * @method static \Illuminate\Auth\AuthManager extend(string $driver, \Closure $callback)
 * @method static \Illuminate\Auth\AuthManager provider(string $name, \Closure $callback)
 *
 * @see \Illuminate\Auth\AuthManager
 * @see \Illuminate\Contracts\Auth\Factory
 * @see \Illuminate\Contracts\Auth\Guard
 * @see \Illuminate\Contracts\Auth\StatefulGuard
 */
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
}
```

# Facade hoạt động như thế nào
Nếu bạn lần mò vào method `Auth::user()` từ IDE hay editor, thì nó sẽ chỉ bạn đến dòng:

```php
/**
 * @method static \Illuminate\Contracts\Auth\Authenticatable|null user()
 */
```

Bạn tự nghĩ, "ô, wtf?? code đâu??". Có thể bạn đã thừa biết, dòng trên chỉ là 1 một comment trong docblock được sử dụng khi generate document với phpdoc hay để gợi ý cho IDE autocomplete các "magic" method. Nó chỉ là 1 dạng tài liệu. Còn code thật tất nhiên là magic rồi. Magic ở đây chính là PHP Magic Method `__callStatic()`:

`vendor/laravel/framework/src/Illuminate/Support/Facades/Facade.php`

```php
/**
 * Handle dynamic, static calls to the object.
 *
 * @param  string  $method
 * @param  array   $args
 * @return mixed
 *
 * @throws \RuntimeException
 */
public static function __callStatic($method, $args)
{
    $instance = static::getFacadeRoot();

    if (! $instance) {
        throw new RuntimeException('A facade root has not been set.');
    }

    return $instance->$method(...$args);
}
```

Khi bạn gọi `Auth::user()` thì nó sẽ chạy như thế này:

1. Do class `Auth` không có public static method nào là `user()` nên magic method `__callStatic('user')` sẽ được gọi
2. Bên trong Laravel sẽ lấy ra instance `auth` từ service container
3. Gọi method `user()` của instance `auth`

Để biết instance `auth` được bind vào service container ở đâu thì bạn phải xem trong service provider, rất may là nó thường được đặt tên theo convention, ví dụ có Auth Facade thì sẽ có Auth Service Provider => `vendor/laravel/framework/src/Illuminate/Auth/AuthServiceProvider.php`:

```php
$this->app->singleton('auth', function ($app) {
    // Once the authentication service has actually been requested by the developer
    // we will set a variable in the application indicating such. This helps us
    // know that we need to set any queued cookies in the after event later.
    $app['auth.loaded'] = true;

    return new AuthManager($app);
});
```

Vậy instance `auth` ở đây là instance thuộc class `Illuminate\Auth\AuthManager`. Bên trong class này lại có thêm magic method nữa, các bạn có thể đọc code và tìm hiểu thêm :D Tham khảo thêm [loại bài viết **phải đọc**](https://viblo.asia/p/laravel-beauty-tim-hieu-ve-facade-znVGLYLbvZOe) về Laravel :100:

# Contracts (Interface)
`auth` này là service thuộc loại ***core service*** nên nó cũng có thêm alias được khai báo trong `vendor/laravel/framework/src/Illuminate/Foundation/Application.php`:

```php
[
    'auth' => [\Illuminate\Auth\AuthManager::class, \Illuminate\Contracts\Auth\Factory::class],
]
```

Tức là:

```php
app()->make('auth');
app()->make(\Illuminate\Auth\AuthManager::class);
app()->make(\Illuminate\Contracts\Auth\Factory::class);
```

Ba dòng này sẽ cho ra kết quả giống nhau, đều resolved instance thuộc class `Illuminate\Auth\AuthManager`.

Như vậy ta có ý tưởng cho việc sử dụng DI ở đây là inject class `Illuminate\Auth\AuthManager` hoặc theo cách chính xác nhất đó là inject contract (interface) là `\Illuminate\Contracts\Auth\Factory` thay vì concrete (bê tông?) class, giống như code của function `auth()`:

```php
/**
 * Get the available auth instance.
 *
 * @param  string|null  $guard
 * @return \Illuminate\Contracts\Auth\Factory|\Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
 */
function auth($guard = null)
{
    if (is_null($guard)) {
        return app(AuthFactory::class);
    }

    return app(AuthFactory::class)->guard($guard);
}
```

Giải thích có phần nguy hiểm vậy thôi, chứ [Laravel docs - Facades](https://laravel.com/docs/5.8/facades#facades-vs-dependency-injection), [Laravel docs - Contracts](https://laravel.com/docs/5.8/contracts) cũng đã đề cập về vấn đề này :D Việc sử dụng facades hay DI là tùy vào trải nghiệm của từng cá nhân hay team, chúng ta đã sử dụng nhiều đến facade và các helper functions, thử dùng contract để inject dependency xem nó như thế nào?

Một số contracts và facades thường dùng:

| **Contract**                                      | **Facade**     | **Class**                     | **Core Service**              |
|---------------------------------------------------|---------------------------|---------------------------------------------------|------------------------|
| `Illuminate\Contracts\Auth\Access\Gate`           | `Gate`                    | `Illuminate\Contracts\Auth\Access\Gate`           |                        |
| `Illuminate\Contracts\Auth\Factory`               | `Auth`                    | `Illuminate\Auth\AuthManager`                     | `auth`                 |
| `Illuminate\Contracts\Auth\Guard`                 | `Auth::guard()`           | `Illuminate\Contracts\Auth\Guard`                 | `auth.driver`          |
| `Illuminate\Contracts\Auth\PasswordBroker`        | `Password::broker()`      | `Illuminate\Auth\Passwords\PasswordBroker`        | `auth.password.broker` |
| `Illuminate\Contracts\Auth\PasswordBrokerFactory` | `Password`                | `Illuminate\Auth\Passwords\PasswordBrokerManager` | `auth.password`        |
| `Illuminate\Contracts\Broadcasting\Factory`       | `Broadcast`               | `Illuminate\Contracts\Broadcasting\Factory`       |                        |
| `Illuminate\Contracts\Broadcasting\Broadcaster`   | `Broadcast::connection()` | `Illuminate\Contracts\Broadcasting\Broadcaster`   |                        |
| `Illuminate\Contracts\Cache\Factory`              | `Cache`                   | `Illuminate\Cache\CacheManager`                   | `cache`                |
| `Illuminate\Contracts\Cache\Repository`           | `Cache::driver()`         | `Illuminate\Cache\Repository`                     | `cache.store`          |
| `Illuminate\Contracts\Config\Repository`          | `Config`                  | `Illuminate\Config\Repository`                    | `config`               |
| `Illuminate\Contracts\Console\Kernel`             | `Artisan`                 | `Illuminate\Contracts\Console\Kernel`             | `artisan`              |
| `Illuminate\Contracts\Container\Container`        | `App`                     |                                                   |                        |
| `Illuminate\Contracts\Cookie\Factory`             | `Cookie`                  | `Illuminate\Cookie\CookieJar`                     | `cookie`               |
| `Illuminate\Contracts\Events\Dispatcher`          | `Event`                   | `Illuminate\Events\Dispatcher`                    | `events`               |
| `Illuminate\Contracts\Filesystem\Cloud`           | `Storage::cloud()`        |                                                   | `filesystem.cloud`     |
| `Illuminate\Contracts\Filesystem\Factory`         | `Storage`                 | `Illuminate\Filesystem\FilesystemManager`         | `filesystem`           |
| `Illuminate\Contracts\Filesystem\Filesystem`      | `Storage::disk()`         | `Illuminate\Contracts\Filesystem\Filesystem`      | `filesystem.disk`      |
| `Illuminate\Contracts\Foundation\Application`     | `App`                     | `Illuminate\Foundation\Application`               | `app`                  |
| `Illuminate\Contracts\Hashing\Hasher`             | `Hash`                    | `Illuminate\Contracts\Hashing\Hasher`             | `hash`                 |
| `Illuminate\Contracts\Mail\Mailer`                | `Mail`                    | `Illuminate\Mail\Mailer`                          | `mailer`               |
| `Illuminate\Contracts\Notifications\Factory`      | `Notification`            | `Illuminate\Notifications\ChannelManager`         |                        |
| `Illuminate\Contracts\Queue\Factory`              | `Queue`                   | `Illuminate\Queue\QueueManager`                   | `queue`                |
| `Illuminate\Contracts\Queue\Queue`                | `Queue::connection()`     | `Illuminate\Queue\Queue`                          | `queue.connection`     |
| `Illuminate\Contracts\Redis\Factory`              | `Redis`                   | `Illuminate\Redis\RedisManager`                   | `redis`                |
| `Illuminate\Contracts\Routing\Registrar`          | `Route`                   | `Illuminate\Routing\Router`                       | router                 |
| `Illuminate\Contracts\Routing\ResponseFactory`    | `Response`                | `Illuminate\Routing\ResponseFactory`              |                        |
| `Illuminate\Contracts\Routing\UrlGenerator`       | `URL`                     | `Illuminate\Routing\UrlGenerator`                 | `url`                  |
| `Illuminate\Contracts\Session\Session`            | `Session::driver()`       | `Illuminate\Session\Store`                        | `session.store`          |
| `Illuminate\Contracts\Translation\Translator`     | `Lang`                    | `Illuminate\Translation\Translator`               | `translator`           |
| `Illuminate\Contracts\Validation\Factory`         | `Validator`               | `Illuminate\Validation\Factory`                   | `validator`            |
| `Illuminate\Contracts\Validation\Validator`       | `Validator::make()`       | `Illuminate\Validation\Validator`                 |                        |
| `Illuminate\Contracts\View\Factory`               | `View`                    | `Illuminate\View\Factory`                         | `view`                 |
| `Illuminate\Contracts\View\View`                  | `View::make()`            | `Illuminate\View\View`                            |                        |
|                                                   |                           | `Illuminate\Log\LogManager`                       | `log`                  |
|                                                   |                           | `Illuminate\Http\Request`                         | `request`              |
|                                                   |                           | `Illuminate\Routing\Redirector`                   | `redirect`             |
|                                                   |                           | `Illuminate\Database\Connection`                  | `db.connection`        |
|                                                   |                           | `Illuminate\Database\DatabaseManager`             | `db`                   |


# Ví dụ
Chúng ta sẽ lấy code ở repo [laravel-test-example](https://github.com/tuanpht/laravel-test-example/) để thực hiện refactor, vì nó đã được viết unit test với tỷ lệ coverage là ~90% =)) nên có thể yên tâm refactor mà không làm ảnh hưởng đến behavior hay function của hệ thống.

![](https://images.viblo.asia/78e93ec9-31be-4ac9-86c2-d44e6d1849db.png)


```sh
git clone https://github.com/tuanpht/laravel-test-example/
code laravel-test-example
```

Nếu bạn dùng vscode bạn có thể tìm kiếm theo regex này để tìm những chỗ đang dùng facade: `[A-Z][a-z]+::\w+\(`.

Bắt đầu với class `app/Http/Middleware/RedirectIfAuthenticated.php`:

Before:
```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory;

class RedirectIfAuthenticated
{
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            return redirect('/home');
        }

        return $next($request);
    }
}
```

After:
```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory;

class RedirectIfAuthenticated
{
    protected $authFactory;

    public function __construct(Factory $authFactory)
    {
        $this->authFactory = $authFactory;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->authFactory->guard($guard)->check()) {
            return redirect('/home');
        }

        return $next($request);
    }
}
```

Diff:

```diff
 namespace App\Http\Middleware;

 use Closure;
-use Illuminate\Support\Facades\Auth;
+use Illuminate\Contracts\Auth\Factory;

 class RedirectIfAuthenticated
 {
+    protected $authFactory;
+
+    public function __construct(Factory $authFactory)
+    {
+        $this->authFactory = $authFactory;
+    }
+
     public function handle($request, Closure $next, $guard = null)
     {
-        if (Auth::guard($guard)->check()) {
+        if ($this->authFactory->guard($guard)->check()) {
             return redirect('/home');
         }
```

Tests vẫn pass! Vì thực ra chưa có test case cho class này =))

Tiếp tục là đến class `app/Http/Controllers/Web/RegisterController.php` có 2 chỗ sử dụng `Mail` facade, ta có thể refactor như sau:

```diff
 use App\Http\Requests\Web\RegisterRequest;
 use App\Services\Web\UserService;
-use Illuminate\Support\Facades\Mail;
 use App\Mail\UserRegistered;
 use Illuminate\Http\Request;
+use Illuminate\Contracts\Mail\Mailer;

 class RegisterController extends Controller
 {
     protected $userService;

-    public function __construct(UserService $userService)
+    protected $mailer;
+
+    public function __construct(UserService $userService, Mailer $mailer)
     {
         $this->userService = $userService;
+        $this->mailer = $mailer;
     }

     /**
@@ -39,7 +42,7 @@ class RegisterController extends Controller

         $user = $this->userService->create($inputs);

-        Mail::to($user)->send(new UserRegistered($user->getKey(), $user->name));
+        $this->mailer->to($user)->send(new UserRegistered($user->getKey(), $user->name));

         return redirect()->action([static::class, 'showRegisterSuccess']);
     }
@@ -68,7 +71,7 @@ class RegisterController extends Controller
         $user = $this->userService->findByEmail($request->input('email'));

         if ($user && !$user->hasVerifiedEmail()) {
-            Mail::to($user)->send(new UserRegistered($user->getKey(), $user->name));
+            $this->mailer->to($user)->send(new UserRegistered($user->getKey(), $user->name));
         }

         return redirect()->action([static::class, 'showFormVerification'])->with('resent', true);
```

Lần này thì tất nhiên test failed vì ta đã thay đổi constructor của class. Fix the tests!

```diff
 use App\Models\User;
+use Illuminate\Support\Testing\Fakes\MailFake;
 use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

 class RegisterControllerTest extends TestCase
@@ -21,13 +22,17 @@ class RegisterControllerTest extends TestCase
     /** @var UserService|\Mockery\MockInterface */
     private $userService;

+    /** @var MailFake */
+    private $mailer;
+
     public function setUp(): void
     {
         parent::setUp();

         $this->userService = Mockery::mock(UserService::class);
+        $this->mailer = new MailFake;

-        $this->registerController = new RegisterController($this->userService);
+        $this->registerController = new RegisterController($this->userService, $this->mailer);
     }

     public function testShowFormRegister()
@@ -60,11 +65,10 @@ class RegisterControllerTest extends TestCase
             ->shouldReceive('create')
             ->with($filteredInputs)
             ->andReturn(new User($filteredInputs));
-        Mail::fake();

         $response = $this->registerController->register($request);

-        Mail::assertQueued(UserRegistered::class);
+        $this->mailer->assertQueued(UserRegistered::class);
         $this->assertInstanceOf(RedirectResponse::class, $response);
         $this->assertEquals(
             action([RegisterController::class, 'showRegisterSuccess']),
@@ -121,11 +125,10 @@ class RegisterControllerTest extends TestCase
             ->shouldReceive('findByEmail')
             ->with($inputs['email'])
             ->andReturn($fakeUser);
-        Mail::fake();

         $response = $this->registerController->resendVerificationLink($request);

-        Mail::assertQueued(UserRegistered::class);
+        $this->mailer->assertQueued(UserRegistered::class);
         $this->assertInstanceOf(RedirectResponse::class, $response);
         $this->assertEquals(
             action([RegisterController::class, 'showFormVerification']),
```

Ở đây có thể dùng Mockery, sau đó setup expectation cho các method `to()`, `send()` nhưng nó sẽ phức tạp hơn chút nên mình không đề cập ở đây =)) Giải pháp ở bài này là sử dụng class `MailFake` do Laravel cung cấp để hỗ trợ việc testing, khá tiện, code cũng không phải thay đổi nhiều.

## Refactor with Rector
Tương tự với các class khác. Làm bằng tay thủ công để hiểu thêm chứ thật ra có tool tự động refactor được một số task common này đó là [Rector - Upgrade Your Legacy App to a Modern Codebase](https://github.com/rectorphp/rector). Giới thiệu qua thì đây là tool chuyên hỗ trợ việc refactor code tự động bằng việc phân tích source code, tương tự như một số [static code analysis tools](https://viblo.asia/p/php-static-code-analysis-tools-4dbZNxNy5YM), một số tính năng:

- Đổi tên classes, methods, properties, namespaces or constants
- Upgrade PHP code từ version lên 7.4
- Migrate từ Nette sang Symfony
- Áp dụng PHP 7.4 typed property
- Refactor Laravel facades to DI
- Trả nợ kỹ thuật =))
- ...

Mình thử install bằng composer nhưng bị conflict với Laravel nên thử dùng docker:

```bash
docker run -it --rm -v $(pwd):/project --entrypoint "/bin/bash" rector/rector:latest
cd /project
/rector/bin/rector process app --set laravel-static-to-injection --dry-run
```

=> [Kết quả chạy](https://gist.github.com/tuanpht/f453d03bfdbc0181b636b81efcd44d97#file-rector-refactor-facade-diff)

Tool thì nó cũng là phần mềm, mà đã là phần mềm thì phải có bug. Nên vẫn cần review lại và cải thiện, ví dụ một số refactor mà Rector đang dùng là concrete class => chuyển sang interface tương ứng...

=> [Update kết quả](https://gist.github.com/tuanpht/f453d03bfdbc0181b636b81efcd44d97#file-manual-diff)

- Không thể áp dụng DI vào constructor của Service Provider vì nó chỉ chấp nhận một tham số là `\Illuminate\Contracts\Foundation\Application $app`
- Không dùng được DI trong Model class
- Interface `Illuminate\Contracts\Routing\UrlGenerator` không có method `temporarySignedRoute()` thay vào đó phải dùng concrete class `Illuminate\Routing\UrlGenerator`
- Với class Mailable `UserRegistered`, để thuận tiện khi gọi thì sẽ không dùng constructor DI, thay vào đó sẽ inject vào method `build(UrlGenerator $urlGenerator)` vì nó được gọi bởi service container (tương tự như method `handle()` của [Queue Job](https://laravel.com/docs/5.8/queues#class-structure))
    ```php
    $this->mailer->to($user)->send(new UserRegistered($user->getKey(), $user->name));
    ```

    See `vendor/laravel/framework/src/Illuminate/Mail/Mailable.php`:
    ```php
    /**
     * Send the message using the given mailer.
     *
     * @param  \Illuminate\Contracts\Mail\Mailer  $mailer
     * @return void
     */
    public function send(MailerContract $mailer)
    {
        return $this->withLocale($this->locale, function () use ($mailer) {
            Container::getInstance()->call([$this, 'build']);

            return $mailer->send($this->buildView(), $this->buildViewData(), function ($message) {
                $this->buildFrom($message)
                    ->buildRecipients($message)
                    ->buildSubject($message)
                    ->runCallbacks($message)
                    ->buildAttachments($message);
            });
        });
    }
    ```

## Using PHPCS?
Trong project cũng có thể thiết lập thêm convention là không sử dụng facade hay helpers, sử dụng custom snifffs được chia sẻ ở repo: https://github.com/vladyslavstartsev/laravel-strict-coding-standard

Cách sử dụng:
```bash
composer require --dev vladyslavstartsev/laravel-strict-coding-standard
```

Sau đó thêm rule vào file `phpcs.xml` của dự án:
```xml
<?xml version="1.0"?>
<ruleset name="Project convention">
    <rule ref="LaravelStrictCodingStandard.Laravel.DisallowUseOfGlobalFunctions"/>
    <rule ref="LaravelStrictCodingStandard.Laravel.DisallowUseOfFacades">
        <properties>
            <property name="laravelApplicationInstancePath" type="string" value="../bootstrap/app.php"/>
        </properties>
    </rule>
</ruleset>
```

VD:
```bash
$ ./vendor/bin/phpcs app/Mail/UserRegistered.php -s

FILE: /home/ubuntu/Projects/laravel-test-example/app/Mail/UserRegistered.php
-------------------------------------------------------------------------------------------------------------
FOUND 2 ERRORS AFFECTING 2 LINES
-------------------------------------------------------------------------------------------------------------
 43 | ERROR | It is strongly discouraged not to use URL Laravel Facade, switch to constructor injection
    |       | (LaravelStrictCodingStandard.Laravel.DisallowUseOfFacades.LaravelFacadeInstanceUsage)
 45 | ERROR | Laravel function now() has been deprecated, it is highly recommended not to use it
    |       | (LaravelStrictCodingStandard.Laravel.DisallowUseOfGlobalFunctions.LaravelGlobalFunctionUsage)
-------------------------------------------------------------------------------------------------------------
```

## DI trong Blade view?
Vậy còn blade view, làm sao để tránh không sử dụng facade hay global helper? 

Laravel cũng support sử dụng DI trong blade, sử dụng directive `@inject` https://laravel.com/docs/7.x/blade#service-injection

```php
@inject('authFactory', 'Illuminate\Contracts\Auth\Factory')

<div>
    Welcome, {{ $authFactory->guard('web')->user()->name }}.
</div>
```

# Kết luận
Rốt cuộc là làm thế này để làm gì??

Vấn đề với facade là nó làm cho logic code gắn chặt vào framework, khó để extends hay customize. Thực ra rất ít khi "người ta" thay đổi framework hay customize lại core service, nhưng cứ liệt kê ra đây cho bạn nào thích mày mò sâu hơn =))

Vì sử dụng facade liên quan nhiều đến magic methods nên rất khó để IDE có thể support autocomplete hiệu quả, phải cần đến package bổ sung như [IDE helper](https://github.com/barryvdh/laravel-ide-helper).

Lợi ích rõ nhất của việc dùng DI đó là chúng ta biết được class phụ thuộc vào những class hay interface nào khác, dễ dàng track xem các method được gọi, IDE và code editor support tốt hơn vì variable đã được [type-hinting](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration) (cũng là 1 bước để tiến tới *more strongly type* :grinning:) trong contructor.

Các framework lớn khác thường áp dụng DI đó là Symfony và Magento 2, ở đó sẽ có file config dạng yaml hay xml để bind interface và class (mình sẽ nói trong series về Magento :thinking:), rất dễ để biết được ứng với interface được inject là concrete class nào và cũng dễ dàng để thay thế hay extend core service. Còn việc track down facade, service provider, alias của Laravel để tìm ra class implement function tương ứng thì hơi khó so với người mới bắt đầu.

Dùng DI thì code nó có chút dài dòng hơn vì phải khởi tạo trong constructor, nhưng nếu bạn cảm thấy constructor có quá nhiều dependencies thì đó là do class của bạn đang làm quá nhiều việc, đến lúc refactor. Laravel docs cũng có note:

> However, some care must be taken when using facades. The primary danger of facades is class scope creep. Since facades are so easy to use and do not require injection, it can be easy to let your classes continue to grow and use many facades in a single class. Using dependency injection, this potential is mitigated by the visual feedback a large constructor gives you that your class is growing too large. So, when using facades, pay special attention to the size of your class so that its scope of responsibility stays narrow.

> Tạm dịch: Tuy nhiên bạn phải chú ý khi dùng facade. Vì rất là dễ dàng để sử dụng facade mà không cần thông qua injection, nó có thể khiến phạm vi class càng phình to, class làm quá nhiều việc. Nếu sử dụng DI, nguy cơ này có thể dễ dàng được feedback bằng việc constructor càng trở nên dài dòng. Vì vậy, khi dùng facade hãy chú ý đến phạm vi và chức năng của class để đảm bảo nó không làm quá nhiều việc.

Thói quen dùng facade của Laravel có lẽ khó mà thay thế được bởi, nhưng hy vọng bài viết giúp bạn có thêm chút kiến thức và tiến tới mục đích làm được những project tầm cỡ, đa dạng hơn để còn có điều kiện nâng cao trình độ, kinh nghiệm :D

# References
- https://laravel.com/docs/5.8/facades
- https://laravel.com/docs/5.8/contracts
- https://github.com/rectorphp/rector/
- https://www.tomasvotruba.com/blog/2019/03/04/how-to-turn-laravel-from-static-to-dependency-injection-in-one-day/
- https://www.freecodecamp.org/news/moving-away-from-magic-or-why-i-dont-want-to-use-laravel-anymore-2ce098c979bd/
- https://github.com/vladyslavstartsev/laravel-strict-coding-standard
- https://github.com/Dealerdirect/phpcodesniffer-composer-installer