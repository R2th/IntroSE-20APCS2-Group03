# Error Handler
=> xử lí lỗi khi có lỗi xảy ra trong project , hiển thị chi tiết lỗi, trace, detail request header.. giúp chúng ta debug nhanh chóng và dễ dàng

cài đặt 
```
composer require filp/whoops
```

thêm vào file bootstrap.php

```php
$environment = 'dev';

/**
* Register the error handler
*/
$whoops = new \Whoops\Run;
if ($environment !== 'prod') {
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
} else {
    $whoops->pushHandler(function($e){
        echo 'internal server error';
    });
}
$whoops->register();

```

ở đây mình tạo biến environment để check xem nếu đang ở chế độ development thì hiển thị lỗi cho dev dễ fix

nếu là môi trường production chỉ nên hiển thị trang thông báo lỗi chung chung để phía user không thấy được lỗi.. đề phòng "hacker" tấn công hệ thống thông qua các lỗi hiển thị

ví dụ:
trong file TestController.php ta thêm dòng code  `4/0;` để bắn ra lỗi
```
public function bird()
    {
        4/0;
        echo 'Trên cành cây';
    }
```
Khi chưa cài thư viện handle lỗi
![](https://images.viblo.asia/18b79c10-e16a-43a0-8638-4e38cc372d7c.png)

Sau khi cài
![](https://images.viblo.asia/25895089-be99-4bba-a591-5dfa216dec67.png)

Đấy giao diện rất là trực quan, nhìn vào là biết ngay lỗi ở đâu :laughing:
# Dependency Injection
bài này mình ko nói về khái niệm này nữa

Chúng ta sẽ implement package này [Auryn](https://github.com/rdlowrey/Auryn) document của nó ở đây [Docs](https://github.com/rdlowrey/Auryn/blob/master/README.md)

```
composer require rdlowrey/auryn
```

tạo thêm file `Dependencies.php` trong thư mục app
```php
<?php
$injector = new \Auryn\Injector;


$injector->define('Symfony\Component\HttpFoundation\Request', [
    ':query' => $_GET,
    ':request' => $_POST,
    ':attributes' => [],
    ':cookies' => $_COOKIE,
    ':files' => $_FILES,
    ':server' => $_SERVER,
    ':content' => null,
]);

$injector->share('Symfony\Component\HttpFoundation\Response');

$injector->alias('App\Contracts\BirdServiceInterface', 'App\Services\BirdService');

return $injector;

```


Các bạn đọc thêm docs để hiểu thêm về [alias](https://github.com/rdlowrey/Auryn/blob/master/README.md#type-hint-aliasing), [share](https://github.com/rdlowrey/Auryn/blob/master/README.md#instance-sharing) và [define](https://github.com/rdlowrey/Auryn/blob/master/README.md#injection-definitions)

define hiểu đơn giản như set parameter, or bind class

share: dùng chung object kiểu như Singleton

alias: kiểu như là interfaceA này sẽ đc khởi tạo bởi servicesA nào đấy

ok.. đọc lại đoạn code trên cũng hiểu phần nào chức năng của nó rồi nhỉ :v

next:

sửa lại code ở file app\boostrap.php ở những part trước để implement cái mới nà:

thay
```php
$request = Request::createFromGlobals();

$response = new Response();
```

bằng:
```php
$request = $injector->make('Symfony\Component\HttpFoundation\Request');
$response = $injector->make('Symfony\Component\HttpFoundation\Response');
```

thay
```php
$class = new $className;
$class->$method($vars);
```

bằng
```php
$class = $injector->make($className);
$class->$method($vars);
```

file app\boostrap.php sau khi sửa sẽ như sau
```php
<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$environment = 'dev';

/**
* Register the error handler
*/
$whoops = new \Whoops\Run;
if ($environment !== 'prod') {
    $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
} else {
    $whoops->pushHandler(function($e){
        echo 'internal server error';
    });
}
$whoops->register();


$injector = include('Dependencies.php');

$request = $injector->make('Symfony\Component\HttpFoundation\Request');
$response = $injector->make('Symfony\Component\HttpFoundation\Response');

$dispatcher = \FastRoute\simpleDispatcher(function (\FastRoute\RouteCollector $router) {
    include '../routes/web.php';
});

$routeInfo = $dispatcher->dispatch($request->getMethod(), $request->getPathInfo());

switch ($routeInfo[0]) {
    case \FastRoute\Dispatcher::NOT_FOUND:
        $response->setContent('404 - Page not found');
        $response->setStatusCode(404);
        break;
    case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $response->setContent('405 - Method not allowed');
        $response->setStatusCode(405);
        break;
    case \FastRoute\Dispatcher::FOUND:
        $response->setStatusCode(200);
        if(gettype($routeInfo[1]) === 'string'){
            $rInfo = explode('@', $routeInfo[1]);

            $className = $rInfo[0];
            $method = $rInfo[1];
            $vars = $routeInfo[2];

            $class = $injector->make($className);
            $class->$method($vars);
        } else {
            $handler = $routeInfo[1];
            $vars = $routeInfo[2];
            call_user_func($handler, $vars);
        }

        break;
}

$response->prepare($request);
$response->send();

```

Tiếp theo tạo  app\Contracts\BirdServiceInterface.php
```php
<?php

namespace App\Contracts;

interface BirdServiceInterface
{
    /**
     * @return string
     */
    public function fly();
}

```

... và App\Services\BirdService.php
```php
<?php

namespace App\Services;

use App\Contracts\BirdServiceInterface;

class BirdService implements BirdServiceInterface
{
    public function fly()
    {
        return 'fly fly fly';
    }
}

```

sửa file app\Controllers\TestController.php;
```php
<?php

namespace App\Controllers;

use App\Contracts\BirdServiceInterface;
use Symfony\Component\HttpFoundation\Response;

class TestController
{
    public function __construct(Response $response, BirdServiceInterface $birdService) {
        $this->birdService = $birdService;
        $this->response = $response;
    }

    public function bird()
    {
        $rs = $this->birdService->fly();
        $this->response->setContent($rs);
    }
}

```

nhờ cấu hình ở trên file app\Dependencies.php

`$injector->alias('App\Contracts\BirdServiceInterface', 'App\Services\BirdService');`

sẽ tìm  BirdServiceInterface và khởi tạo bằng BirdService

kết quả:

![](https://images.viblo.asia/a77917d9-368b-445b-a1ba-293aaea2d420.png)

part 4 to continue...