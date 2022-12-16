# HTTP (Request/Response)

PHP đã có sẵn vài thứ để làm việc với HTTP dễ dàng hơn. Ví dụ có các superglobals chứa các nội dung request
```
$GLOBALS
$_SERVER
$_REQUEST
$_POST
$_GET
$_FILES
$_ENV
$_COOKIE
$_SESSION
```

Điều này là tốt nếu bạn muốn một đoạn script nhỏ mở lên và chạy, hay một cái gì đó không khó để bảo trì. Tuy nhiên, nếu bạn muốn viết "mã sach", có thể bảo trì, viết code theo nguyên lí [SOLID](https://kipalog.com/posts/Tim-hieu-nhanh-SOLID-than-thanh), thì bạn cần có một lớp interface mà bạn có thể sử dụng trong ứng dụng của mình

Một vài package mà bạn có thể chọn:

[ Symfony HttpFoundation](https://github.com/symfony/HttpFoundation), [Nette HTTP Component](https://github.com/nette/http), [Aura Web](https://github.com/auraphp/Aura.Web), [sabre/http](https://github.com/fruux/sabre-http)

ờ bài này mình chọn Symfony HttpFoundation:

command line cài đặt thông qua composer

```
composer require symfony/http-foundation
```

khi đó file composer.json sẽ được update lại:
```
{
    "name": "root/build_mvc",
    "require": {
        "symfony/http-foundation": "^4.3"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}

```

ok.. bắt tay vào cấu hình nà:

ngó sơ qua đây tí [Document Http Foundation](https://symfony.com/doc/current/components/http_foundation.html)  ..one.. two minute.. wào nhiều chữ phết :joy: .. bỏ qua mấy cái dư thừa đi ta chỉ quan tâm tới 2 thứ trước đã :upside_down_face::

**1. Request**
```
use Symfony\Component\HttpFoundation\Request;

$request = Request::createFromGlobals();

```

or
```
$request = new Request(
    $_GET,
    $_POST,
    [],
    $_COOKIE,
    $_FILES,
    $_SERVER
);
```
2 cách để ta chọn khởi tạo request

**2. Response**

source code [Response](https://github.com/symfony/symfony/blob/4.3/src/Symfony/Component/HttpFoundation/Response.php) ngó qua để biết cách khai báo nà :kissing_heart:

```
use Symfony\Component\HttpFoundation\Response;

$response = new Response(
    'Content return',
    Response::HTTP_OK,
    ['content-type' => 'text/html']
);

```

rồi ghép vào code thoai

```
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$request = Request::createFromGlobals();

$response = new Response();

// set content 
$response->setContent('Content return');
// set content-type trả về
$response->headers->set('Content-Type', 'text/plain');
$response->prepare($request);
// phải gọi thằng này thì nó mới send cho client nghen
$response->send();
```

test phát nào:
![](https://images.viblo.asia/323ca48f-e946-4649-bca7-321d3027671d.png)

ta hoàn toàn có thể sử dụng php thuần để cho ra kết quả tương tự bằng đoạn code sau:
```
header("Content-Type: text/plain; charset=UTF-8", FALSE, 200);
echo 'Content return';
 
```

link nghiên cứu [header](https://www.php.net/manual/en/function.header.php)
# Routing

Routing hiểu đơn giản là chỗ để biết request này sẽ được controller nào xử lý.

Khi người dùng gửi request  => request này được route xử lí => từ route sẽ chỉ dẫn tiếp cho request này đi đến đâu hoặc cũng có thể trả lời ngay tại route.

Route dịch ra có nghĩa là tuyến đường, nghe chẳng có tý gì liên quan đến lập trình nhưng ta có thể hiểu rằng route nó nằm vai trò chỉ đường cho yêu cầu (request) đi đến đâu. Ta có thể hiểu nôm na như sau: khi index.php nhận được request từ người dùng, nó sẽ đưa request này cho route, từ route sẽ chỉ dẫn tiếp cho request này đi đến đâu hoặc cũng có thể trả lời ngay tại route.

Trong bài viết này với cài đặt hiện tại thì mọi xử lí đều trả cùng một response
```
http://localhost:8000/java-anti-virus
http://localhost:8000/ozawa
http://localhost:8000/tokuda
```

response

```
Content return
```

Thay đổi nó thoai :stuck_out_tongue_winking_eye:

Mình sẽ sử dụng [FastRoute](https://github.com/nikic/FastRoute) trong bài viết này. Còn nhiều package mà bạn có thể chọn theo yêu thích của riêng bạn :v 

Ví dụ : [symfony / Routing](https://github.com/symfony/Routing), [Aura.Router](https://github.com/auraphp/Aura.Router), [Fuelphp/routing](https://github.com/fuelphp/routing), [Klein](https://github.com/klein/klein.php)

Command line cài đặt:

```
composer require nikic/fast-route
```

Requires PHP 7.1 or newer.

**Chú ý** version require mỗi thư viện cài đặt

Vào đọc document thì nó bày cách cho chúng ta cài đặt như nhau:

```php
<?php

require '/path/to/vendor/autoload.php';

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->addRoute('GET', '/users', 'get_all_users_handler');
    // {id} must be a number (\d+)
    $r->addRoute('GET', '/user/{id:\d+}', 'get_user_handler');
    // The /{title} suffix is optional
    $r->addRoute('GET', '/articles/{id:\d+}[/{title}]', 'get_article_handler');
});

// Fetch method and URI from somewhere
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string (?foo=bar) and decode URI
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // ... 404 Not Found
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // ... 405 Method Not Allowed
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        // ... call $handler with $vars
        break;
}
```

Ta fix lại đoạn này, mục đích của nó là định nghĩa các route và ai sẽ xử lí chúng:
```php
$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->addRoute('GET', '/users', 'get_all_users_handler');
    // {id} must be a number (\d+)
    $r->addRoute('GET', '/user/{id:\d+}', 'get_user_handler');
    // The /{title} suffix is optional
    $r->addRoute('GET', '/articles/{id:\d+}[/{title}]', 'get_article_handler');
});
```

fix:
```php
$dispatcher = \FastRoute\simpleDispatcher(function (\FastRoute\RouteCollector $router) {
    include '../routes/web.php';
});
```

tạo file web.php trong thư mục routes, ta test 2 loại xử lí route chính: là closure function và controller

```php
<?php declare (strict_types = 1);

$router->addRoute('GET', '/con-heo-con', function(){
    echo 'đi bằng hai chân';
});

$router->addRoute('GET', '/con-chim-non', 'App\Controllers\TestController@bird');

```

Tạo thêm file controller trong thư mục app\Controllers để xử lí router:

```php
<?php

namespace App\Controllers;

class TestController
{
    public function bird()
    {
        echo 'Trên cành cây';
    }
}

```

Đây là phần lấy parameter để check route:

```php
// Fetch method and URI from somewhere
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string (?foo=bar) and decode URI
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
```

Mapping lại cho đúng với project nào
```php
$routeInfo = $dispatcher->dispatch($request->getMethod(), $request->getPathInfo());
```

Bắt đầu xử lí router nà
```php
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

            $class = new $className;
            $class->$method($vars);
        } else {
            $handler = $routeInfo[1];
            $vars = $routeInfo[2];
            call_user_func($handler, $vars);
        }

        break;
}
```

Toàn bộ code trên ta  vứt vào app/bootstrap.php.. cùng xem lại nào:

```php
<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$request = Request::createFromGlobals();

$response = new Response();

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

            $class = new $className;
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

Test thôi:

![](https://images.viblo.asia/f5b03cc6-67e3-4e49-a1b3-2f6bd8e39cd5.png)

![](https://images.viblo.asia/8736f1d7-15b4-4d1a-938f-ab1450ddd91c.png)

Xong phần routing

part 3 to continue...