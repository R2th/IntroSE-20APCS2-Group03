## Chém gió tí về Laravel Request Lifecycle

Khi sử dụng bất cứ công cụ nào trong "thế giới thực", bạn sẽ cảm thấy tự tin hơn nếu như bạn hiểu được công cụ đó hoạt động như thế nào. Phát triển ứng dụng cũng không khác gì mấy. Khi bạn hiểu được các công cụ phát triển hoạt động thế nào, bạn sẽ cảm thấy thoải mái và tự tin hơn khi sử dụng chúng. Bất kể bạn học thứ gì bạn cũng cần phải nắm chắc **Lifecycle** thứ đó nếu có nhé: `vuejs`, `vuex`, `redux`,...

Mục tiêu của bài viết này là hướng dẫn cho bạn một cái nhìn lớn ở tầng cao tổng quát về "cách hoạt động" của **Laravel framework**. Bằng cách hiểu hơn về mọi thứ quanh framework, thì bạn sẽ cảm thấy ít "ma thuật" và tự tin hơn trong quá trình phát triển ứng dụng.

Nếu bạn không hiểu các thuật ngữ lúc này, đừng buồn! Hãy đọc bài viết này [**Thuật ngữ Laravel thường được sử dụng**](https://chungnguyen.xyz/go/r1TUQN "Thuật ngữ Laravel thường được sử dụng")

Hãy thử cố gắng nắm bắt cơ bản và hiểu biết của bạn sẽ tốt dần khi mà bạn thực hiện khám phá sâu hơn Laravel sau này.

## Tìm hiểu Laravel Request Lifecycle - Vòng đời một ứng dụng Laravel framework

Bạn có biết khi bạn đặt tay lên bàn phím gõ: "**<a>https://chungnguyen.xyz</a>**" điều gì sẽ xảy ra hay không? Ok đi nhé 😝😝

Đầu tiên **Laravel** đặt `root document` trỏ vào thư mục `public`, `root document` trong `apache` gọi là `DocumentRoot`, trong `nginx` gọi là `root`, (apache, nginx là web server cho bạn nào chưa biết nhé). Như vậy file đầu tiên được khởi chạy đó chính là `public\index.php`, ta hãy cùng xem file này nhé, mình sẽ bỏ mấy cái linh tinh đi

```php

    <?php

    // 1\. Load autoload từ composer
    require __DIR__.'/../vendor/autoload.php';

    // 2.1 Create The Application - Tạo ứng dụng $app
    $app = require_once __DIR__.'/../bootstrap/app.php';

    // 2\. Tạo nhân cho Laravel framework
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );

    $response->send();

    $kernel->terminate($request, $response);

```


Rồi nhé, đọc file index cũng tạm hiểu sơ qua như thế này

1.  đầu tiên yêu cầu (`require`) một file `autoload.php` nào đó
2.  sau đó tạo biến `$app` từ `bootstrap/app.php`
3.  sau đó `$app` tạo ra một cái nhân/lõi (`$kernel`)
4.  cái nhân đó xử lý (`handle()`) một cái `$request` (yêu cầu) được một phản hồi (`$response`)
5.  sau đó phản hồi `send()` đi
6.  và nhân đóng lại/kết thúc (`terminate()`).

😱😱😱 Đến đây bạn phải thốt lên, dễ ẹt phải không nào, thì đúng là **Laravel dễ học** nên mới tạo đế chế mạnh như ngày hôm nay chứ hehe

Bây giờ đi sâu hơn chút nha

## 1\. Load autoload từ composer

Thực hiện load file `vendor\autoload.php` file này khởi tạo Auto Loader để load ra các thư viện/package được install từ composer ra.

## 2\. Tạo nhân cho Laravel framework

```php

    $app = require_once __DIR__.'/../bootstrap/app.php';

```


Đoạn code này load file `bootstrap\app.php` hãy cùng xem file app.php có gì nhé

```php

    <?php

    $app = new Illuminate\Foundation\Application(
        dirname(__DIR__)
    );

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


### 2.1 Create The Application - Tạo ứng dụng $app

```php

    $app = new Illuminate\Foundation\Application(
        dirname(__DIR__)
    );

```


Một biến `$app` được khởi tạo từ `vendor\laravel\framework\src\Illuminate\Foundation\Application.php`, __construct trong Application sẽ chạy gồm có:

*   **setBasePath**: tạo ra global các đường dẫn `app_path()`, `base_path()`, `config_path()`, `database_path()`, `public_path()`,  `resource_path()`, `storage_path()`, ...
*   **registerBaseBindings**: khởi tạo container để chứa các dependencies trong ứng dụng
*   **registerBaseServiceProviders**: tiến hành đăng ký các service cơ bản **EventServiceProvider **(quản lý sự kiện), **LogServiceProvider **(quản lý log), **RoutingServiceProvider **(quản lý định tuyến)
*   **registerCoreContainerAliases**: đăng ký các bí danh cho Core Container

![](https://chungnguyen.xyz/image/posts/laravel/laravel-request-lifecycle-web-laravel-hoat-dong-nhu-the-nao-01.png)

### 2.2 Bind Important Interfaces

Tiếp theo, Laravel tiến hành ràng buộc một số Interfaces (giao diện) quan trọng vào container (vùng chứa) để dùng khi cần. Các nhân (kernel) phục vụ các yêu cầu gửi đến ứng dụng này từ cả web và CLI.

```php

    // khi truy cập https://chungnguyen.xyz
    $app->singleton(
        Illuminate\Contracts\Http\Kernel::class,
        App\Http\Kernel::class
    );

    // khi console command: php artisan sitemap:create
    $app->singleton(
        Illuminate\Contracts\Console\Kernel::class,
        App\Console\Kernel::class
    );

    // debug Exception Handler
    $app->singleton(
        Illuminate\Contracts\Debug\ExceptionHandler::class,
        App\Exceptions\Handler::class
    );

```


![](https://chungnguyen.xyz/image/posts/laravel/laravel-request-lifecycle-web-laravel-hoat-dong-nhu-the-nao-02.png)

### 2.3 Tạo nhân xử lý cho ứng dụng

```php

    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

```


Ứng dụng ($app) sẽ tiến hành tạo (`make()`) `Illuminate\Contracts\Http\Kernel::class` để tạo ra nhân xử lý ($kernel), trải qua một chuỗi quá trình phức tạp, $kernel sẽ được sinh ra 🌼

Nếu bạn truy cập

*   từ trình duyệt web (http): `app\Http\Kernel.php` được sinh ra
*   từ dòng lệnh console: `app\Console\Kernel.php` được sinh ra

Trong bài viết này chúng ta sẽ đi sâu hơn vào http kernel nhé 🛩️

`app\Http\Kernel.php` kế thừa từ `vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php` và kernel tiến hành nạp thông tin middleware và các bootstrappers chuẩn bị, sẽ được kích hoạt ở bước sau:

```php

    Kernel {#29 ▼
      // load middleware, middleware groups, route middleware
      #middleware: array:5 [▼
        0 => "App\Http\Middleware\CheckForMaintenanceMode"
        1 => "Illuminate\Foundation\Http\Middleware\ValidatePostSize"
        2 => "App\Http\Middleware\TrimStrings"
        3 => "Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull"
        4 => "App\Http\Middleware\TrustProxies"
      ]
      #middlewareGroups: array:2 [▼
        "web" => array:6 [▼
          0 => "App\Http\Middleware\EncryptCookies"
          1 => "Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse"
          2 => "Illuminate\Session\Middleware\StartSession"
          3 => "Illuminate\View\Middleware\ShareErrorsFromSession"
          4 => "App\Http\Middleware\VerifyCsrfToken"
          5 => "Illuminate\Routing\Middleware\SubstituteBindings"
        ]
        "api" => array:2 [▼
          0 => "throttle:60,1"
          1 => "bindings"
        ]
      ]
      #routeMiddleware: array:9 [▼
        "auth" => "App\Http\Middleware\Authenticate"
        "auth.basic" => "Illuminate\Auth\Middleware\AuthenticateWithBasicAuth"
        "bindings" => "Illuminate\Routing\Middleware\SubstituteBindings"
        "cache.headers" => "Illuminate\Http\Middleware\SetCacheHeaders"
        "can" => "Illuminate\Auth\Middleware\Authorize"
        "guest" => "App\Http\Middleware\RedirectIfAuthenticated"
        "signed" => "Illuminate\Routing\Middleware\ValidateSignature"
        "throttle" => "Illuminate\Routing\Middleware\ThrottleRequests"
        "verified" => "Illuminate\Auth\Middleware\EnsureEmailIsVerified"
      ]
      #middlewarePriority: array:6 [▼
        0 => "Illuminate\Session\Middleware\StartSession"
        1 => "Illuminate\View\Middleware\ShareErrorsFromSession"
        2 => "App\Http\Middleware\Authenticate"
        3 => "Illuminate\Session\Middleware\AuthenticateSession"
        4 => "Illuminate\Routing\Middleware\SubstituteBindings"
        5 => "Illuminate\Auth\Middleware\Authorize"
      ]
      #app: Application {#2 ▶}
      #router: Router {#25 ▶}
      #bootstrappers: array:6 [▼
        // khởi chạy sau này
        0 => "Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables"
        1 => "Illuminate\Foundation\Bootstrap\LoadConfiguration"
        2 => "Illuminate\Foundation\Bootstrap\HandleExceptions"
        3 => "Illuminate\Foundation\Bootstrap\RegisterFacades"
        4 => "Illuminate\Foundation\Bootstrap\RegisterProviders"
        5 => "Illuminate\Foundation\Bootstrap\BootProviders"
      ]
    }

```


Global middleware (bất cứ request nào cũng phải đi qua)

*   **CheckForMaintenanceMode**: kiểm tra app đang ở trạng thái bảo trì?
*   **ValidatePostSize**: kiểm tra post size.
*   **TrimStrings**: toàn bộ request string sẽ được strim hết.
*   **ConvertEmptyStringsToNull**: chuyển string thành null hết, kết hợp với TrimStrings là cặp bài trùng.
*   **TrustProxies**: dùng cho load balance, liệt danh sách proxy tin tưởng.

Web group middleware (http request)

*   **EncryptCookies**: mã hóa cookie
*   **AddQueuedCookiesToResponse**: thêm cookie vào response
*   **StartSession**: khởi động session
*   **ShareErrorsFromSession**: chia sẻ lỗi từ session
*   **VerifyCsrfToken**: check csrf token (một lỗi bảo mật)
*   **SubstituteBindings**: route sử dụng Eloquent model bindings, sẽ tự động thay thế paramete thành Eloquent model.

Bootstrappers:

*   **LoadEnvironmentVariables**: kiểm tra và load ra thông tin file môi trường (.env), 
*   **LoadConfiguration**: load toàn bộ config (cache hoặc đọc file)
*   **HandleExceptions**: cấu hình xử lý lỗi
*   **RegisterFacades**: đăng ký các facades cấu hình trong app.php
*   **RegisterProviders**: đăng ký các profivders cấu hình trong app.php
*   **BootProviders**: chạy Application

Toàn bộ middleware và bootstrappers này chưa khởi chạy đâu nhé!!!

## 3\. Hấp tinh Request (Một chương trong hấp tinh đại pháp 📚)

```php

    $response = $kernel->handle(
        // hấp tinh request chỗ này nè
        $request = Illuminate\Http\Request::capture()
    );

```


Toàn bộ request gửi đến server lúc này đều được chụp lại hết, chụp gì thì coi đây

```php

    Request {#42 ▼
      #json: null
      #convertedFiles: null
      #userResolver: Closure {#152 ▶}
      #routeResolver: Closure {#154 ▶}
      +attributes: ParameterBag {#44 ▶}
      // $_POST
      +request: ParameterBag {#50 ▶}
      // $_GET
      +query: ParameterBag {#50 ▶}
      // thông tin server $_SERVER
      +server: ServerBag {#46 ▶}
      // file upload
      +files: FileBag {#47 ▶}
      +cookies: ParameterBag {#45 ▶}
      +headers: HeaderBag {#48 ▶}
      #content: null
      #languages: null
      #charsets: null
      #encodings: null
      #acceptableContentTypes: null
      #pathInfo: "/"
      #requestUri: "/"
      #baseUrl: ""
      #basePath: null
      #method: "GET"
      #format: null
      // session $_SESSION
      #session: Store {#179 ▶}
      #locale: null
      #defaultLocale: "en"
      -isHostValid: true
      -isForwardedValid: true
      basePath: ""
      format: "html"
    }

```


## 4\. 🐲🐲Hàn long thập bát Service Providers 🐉🐉

`vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php`:141

```php

        protected function sendRequestThroughRouter($request)
        {
            $this->app->instance('request', $request);

            Facade::clearResolvedInstance('request');

            // chính nó
            $this->bootstrap();

            return (new Pipeline($this->app))
            ->send($request)
            ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
            ->then($this->dispatchToRouter());
        }

```


Đến lúc này Laravel tiến hành tung ra chiêu thức vô cùng lợi hại **_Hàn long thập bát Service Providers _** =)), những gì ém nãy giờ bung ra hết, toàn bộ **Bootstrappers** (kéo lên mục 2.3 ở trên coi nhé, nội dung mình giải thích hết rồi), trong đó quan trọng nhất chính là **RegisterProviders!!!** (`kernel` thực hiện load tất cả các `service providers` ra). Tất cả các `service providers` được cấu hình trong file `config/app.php` ở mảng `$providers`. Đầu tiên, hàm `register()` sẽ được gọi ở tất cả các `providers`, rồi sau đó, khi mà các `providers` đã được đăng kí đầy đủ, thì hàm `boot` sẽ được gọi. 

`Service providers` chịu trách nhiệm khởi tạo tất cả các thành phần khác nhau của framework, ví dụ như `database`, `queue`, `validation`, và `routing`... Vì chúng thực hiện khởi tạo và cấu hình các chức năng được Laravel cung cấp, `service providers` là **phần quan trọng nhất trong tiến trình khởi tạo của Laravel**.

`Service providers` thực sự là chìa khoá để khởi tạo **Laravel**. Khi đối tượng của ứng dụng được tạo ra, các service providers đã được đăng kí, thì các **request** sẽ được đẩy tới phần đã được khởi tạo của ứng dụng. Đơn giản chỉ vậy thôi!

Nắm bắt rõ ràng cách mà Laravel được xây dựng và khởi tạo thông qua service providers rất là giá trị. Dĩ nhiên là các service providers mặc định được lưu trong thư mục app/Providers.

Mặc định, **AppServiceProvider** là không có gì cả. `Provider` này là nơi hợp lý để thêm vào các phần khởi tạo và liên kết riêng cho ứng dụng của bạn. Dĩ nhiên là đối với các ứng dụng lớn, bạn sẽ muốn tạo vài service providers, mỗi cái sẽ thực hiện khởi tạo một công việc khác nhau.

Nếu viết plugins bạn phải gắn vào provider bằng cách khai báo trong mảng `providers` hoặc `bind` trong `AppServiceProvider`.

## 5\. Điều hướng và xử lý request

```php

    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );

```


Khi mà ứng dụng đã được khởi tạo và các `service providers` đã được đăng kí, `Request` sẽ được đưa xuống cho router.

`vendor\laravel\framework\src\Illuminate\Foundation\Http\Kernel.php`:172

```php

        protected function dispatchToRouter()
        {
            return function ($request) {
                $this->app->instance('request', $request);

                return $this->router->dispatch($request);
            };
        }

```


Router sẽ thực hiện đưa các request này xuống **một route hoặc controller để xử lý**, cũng như thực thi các **middleware** cụ thể riêng cho từng route (global middleware và web http middleware ở mục 2.3 ở trên + middleware đăng ký cho route được thực thi).

Route hoặc controller xử lý trả về `$response` (vendor\symfony\http-foundation\Response.php) cho người dùng.

```php

    $response->send();

```


Và cuối cùng thực hiện đóng (`terminate()`) $kernel.

Tổng kết bằng tấm hình

![](https://chungnguyen.xyz/image/posts/laravel/Laravel-Request-Life-Cycle.png)

Hãy vote bài viết nếu bạn cảm thấy nó hay nhé 👍👍👍  
[From Tự học lập trình](https://tuhoclaptrinh.net/posts/laravel-request-lifecycle-laravel-hoat-dong-nhu-the-nao-ban-biet-chua)

🔚🔚🔚🔚🔚