Slim là một micro framework tuyệt vời cho cho các ứng dụng web, RESTful Api và các website.

Mục đích của chúng là tạo ra một RESTful Api chỉ với routing, logic nghiệp vụ và cơ sở dữ liệu.

Các tiêu chuẩn như PSR và một số các phương pháp sử dụng Slim hữu ích sẽ được giới thiệu trong bài viết này.
## Requirements
* PHP > 7.2
* MySQL > 5.7 hoặc MariaDB
* Apache webserver với mod_rewrite and .htaccess
* Composer
## Cài đặt
Việc cài đặt slim cực kì đơn giản, bạn chỉ cần tạo một folder mới và thiết lập Slim 4 với câu lệnh
> composer require slim/slim:"4.*"

Ở slim 4 việc triển khai PSR-7 đã được tách riêng. Có nghĩa là bên cạnh PSR-7 bạn cũng có thể cài đặt các chuẩn khác như nyholm/psr7. Và nếu bạn vẫn muốn dùng PSR-7 thì bạn sẽ phải cài đặt chúng riêng với câu lệnh:
> composer require slim/psr7

Tiếp theo chúng ta cũng cần implement cả PSR-11 container, cái này sẽ dùng cho `dependency injection` và `autowiring`. Chạy câu lệnh để cài đặt PHP-DI
> composer require php-di/php-di

Ngoài ra với mục đích test (unit test) bạn có thể cài đặt thêm cả phpunit với dev option:
>composer require phpunit/phpunit --dev

Vậy là chúng ta đã cài đặt hầu hết các dependency cơ bản cần thiết nhất cho một dự án của mình. Như vậy là tạm đủ rồi, nếu sau này cần sử dụng thêm gì thì mình sẽ cài thêm sau nhé.

**Lưu ý:** Nếu làm việc với git thì cũng tương tự như Laravel đừng commit folder vendor lên nhé.

## Cấu trúc thư mục
Nếu có một cấu trúc thư mục dự án hợp lý sẽ giúp đơn giản hóa việc thiết lập dự án trên server và ngoài ra còn tăng tính bảo mật cho toàn bộ ứng dụng chính vì vậy phần này chúng ta sẽ đi vào tìm hiểu một kiểu cấu trúc thư mục được recommend nhé.

Tạo cấu trúc thư mục trong thư mục gốc của dự án như sau:

```
├── config/             Nơi chứa tất cả các file config)  
├── public/             Web server files (DocumentRoot)  
│   └── .htaccess       Apache redirect rules  
│   └── index.php       Front Controller  
├── templates/          Twig templates. (giao diện cho slim)  
├── src/                PHP source code (App namespace)  
├── tmp/                Các file tạm (cache and logfiles)  
├── vendor/             Module của composer  
├── .htaccess           Định nghĩa chuyển hướng đến public/ directory  
├── .gitignore          Git ignore  
└── composer.json       Project dependencies và autoloader  
```

Trong ứng dụng web một điều cực kì quan trọng đó là chúng ta phải phân biệc được đâu là phần được public và đâu là phần non-public.

Thư mục `public/` sẽ phục vụ cho ứng dụng của bạn và sẽ có thế được truy cập trực tiếp từ các trình duyệt web, các công cụ tìm kiếm và API client. Tất cả các thư mục khác sẽ không được quyền truy xuất trực tiếp, điều này có thể được thực hiện bằng cách định nghĩa các public folder trong Apache như các root document trong website của bạn.

## PSR-4 autoloading
Một điều quan trọng nữa là chúng ta phải có một trình PSR-4 autoloader hoạt động.
 Trong bước tiếp theo chúng ta sẽ thực hiện việc định nghĩa `src\` folder như thư mục gốc cho `App\` namespace.
 
 Thêm autoload setting trong file `composer.json`
 
 ```composer.json
 "autoload": {
    "psr-4": {
        "App\\": "src/"
    }
},
"autoload-dev": {
    "psr-4": {
        "App\\Test\\": "tests/"
    }
}
 ```
 File `composer.json` hoàn chỉnh sẽ trông như thế này:
 ```
 {
    "require": {
        "php-di/php-di": "^6.0",
        "slim/psr7": "^1",
        "slim/slim": "^4.4"
    },
    "require-dev": {
        "phpunit/phpunit": "^8.4"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "App\\Test\\": "tests/"
        }
    },
    "config": {
        "process-timeout": 0,
        "sort-packages": true
    }
}
 ```
 Cuối cùng nhớ chạy `composer update` để các thay đổi bên trên có hiệu lực nhé.
##  Apache URL rewriting
Để chạy được ứng dụng slim với apache, chúng ta phải thêm một số quy tắc rewrite url để redirect web traffic đến front controller đã được chỉ định.

Front controller chính là file `index.php` và điểm truy cập vào ứng dụng.
Tại file `.htaccess` trong thư mục `public\` và thêm vào nội dung sau:

```
# Redirect to front controller
RewriteEngine On
# RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [QSA,L]
```
Lưu ý  bạn không được đổi chỉ thị RewriteRule. Nó phải chính xác như hình trên (bởi với cấu trúc thư mục như đã nói ở trên, front controller chính là file index.php).

Tại fie `.htaccess` ở thư mục gốc của dự án thêm nội dung
```
RewriteEngine on
RewriteRule ^$ public/ [L]
RewriteRule (.*) public/$1 [L]
```
Bước thứ 2 này cực kì quan trọng để chạy ứng dụng Slim trong một thư mục con và ở môi trường phát triển.

Trong file front controller (index.php tại thư mục public), bạn tiếp tục thêm những nội dung sau:
```
<?php

(require __DIR__ . '/../config/bootstrap.php')->run();
```

Front controller chính là điểm vào của ứng dụng và xử lý tất cả các request đến ứng dụng bằng cách phần luồng các request đó thông qua một single handler object.

## Configuration

### Setting file
Như đã nói ở trên thì folder config chính là nơi sẽ chứa tất cả các config file. Tệp `config/settings.php` là tệp cấu hình chính cũng là nơi cấu hình môi trường. 

Trong thư mục config tạo file `settings.php` với nội dung:
```
<?php

// Should be set to 0 in production
error_reporting(E_ALL);

// Should be set to '0' in production
ini_set('display_errors', '1');

// Timezone
date_default_timezone_set('Europe/Berlin');

// Settings
$settings = [];

// Path settings
$settings['root'] = dirname(__DIR__);
$settings['temp'] = $settings['root'] . '/tmp';
$settings['public'] = $settings['root'] . '/public';

// Error Handling Middleware settings
$settings['error'] = [

    // Should be set to false in production
    'display_error_details' => true,

    // Parameter is passed to the default ErrorHandler
    // View in rendered output by enabling the "displayErrorDetails" setting.
    // For the console and unit tests we also disable it
    'log_errors' => true,

    // Display error details in error log
    'log_error_details' => true,
];

return $settings;
```
Một lưu ý tất cả những nơi config việc hiển thị error log nên để  là false trên môi trường production bởi lẽ nó rất dễ dẫn đến rủi ro về việc lộ key cũng như các thông tin khác trong dự án.
### Bootstrap file
Quá trình khởi động ứng dụng được bắt đầu khi có request được gửi đến. 

Quá trình sẽ bao gồm trình composer autoloader và tiếp tục với việc buil container, tạo ứng dụng và đăng ký routes, middleware.

Tiếp tục tạo file `bootstrap.php` trong thư mục config với nội dung
```
<?php

use DI\ContainerBuilder;
use Slim\App;

require_once __DIR__ . '/../vendor/autoload.php';

$containerBuilder = new ContainerBuilder();

// Set up settings
$containerBuilder->addDefinitions(__DIR__ . '/container.php');

// Build PHP-DI Container instance
$container = $containerBuilder->build();

// Create App instance
$app = $container->get(App::class);

// Register routes
(require __DIR__ . '/routes.php')($app);

// Register middleware
(require __DIR__ . '/middleware.php')($app);

return $app;
```
### Setup Route
Tạo một file `routes.php`
```
<?php

use Slim\App;

return function (App $app) {
    // empty
};
```
Nội dung của function chính là phần định nghĩa các định tuyến xử lý phân luồng đến các controller.
### Middleware

Tạo một file để load phần xử lý global middleware.
```config/middleware.php
<?php

use Slim\App;
use Slim\Middleware\ErrorMiddleware;

return function (App $app) {
    // Parse json, form data and xml
    $app->addBodyParsingMiddleware();

    // Add the Slim built-in routing middleware
    $app->addRoutingMiddleware();

    // Catch exceptions and errors
    $app->add(ErrorMiddleware::class);
};
```
Middleware có thể được thực thi trước khi hoặc sau khi ứng dụng slim thực hiện yêu cầu và trả về response object.

Đoạn code trên thực hiện add thêm một vài middleware như Catch exception, ...
### Container
Slim 4 sử dụng một injection dependencty container để chuẩn bị, quản lý và inject dependency của ứng dụng.

Bạn có thể thêm bất kỳ container library nào implement PSR-11 interface.

Tạo file mới cho mục container `config/container.php` với nội dung:
```
<?php

use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Factory\AppFactory;
use Slim\Middleware\ErrorMiddleware;

return [
    'settings' => function () {
        return require __DIR__ . '/settings.php';
    },

    App::class => function (ContainerInterface $container) {
        AppFactory::setContainer($container);

        return AppFactory::create();
    },

    ErrorMiddleware::class => function (ContainerInterface $container) {
        $app = $container->get(App::class);
        $settings = $container->get('settings')['error'];

        return new ErrorMiddleware(
            $app->getCallableResolver(),
            $app->getResponseFactory(),
            (bool)$settings['display_error_details'],
            (bool)$settings['log_errors'],
            (bool)$settings['log_error_details']
        );
    },
];
```
Với đoạn code trên này bạn đã nói với slim rằng ứng dụng luôn require file `setting.php` bên trên tiếp theo đó set container cũng như error middleware cho toàn bộ ứng dụng.

### Base path
Hầu hết tất cả mọi người sẽ gặp phải lỗi 404 Error (not found) bởi lẽ hiện tại base path chưa được thiết lập chính xác. 

Lý tưởng là root document của máy chủ production trỏ trực tiếp đến thư mục `public`. Nếu ứng dụng slim của bạn nằm trong một thư mục con không trực tiếp nằm trong root document của web browser, bạn phải thiết lập chính xác base path.

Ví dụ: root document là `/var/www/domain.com/htdocs/` tuy nhiên ứng dụng của bạn lại đặt trong thư mục con `/var/www/domain.com/htdocs/my-app/` như vậy bạn phải thiết lập `/my-app` là base path của ứng dụng.

Chính xác hơn: Trong nghĩa cảnh này `sub-directory` chính là sub-directory của dự án và không phải thử mục `public\` . Trong ví dụ này chính là khi ứng dụng không đặt trực tiếp trong root document mà đặt trong thư mục con của nó.

Vì lý do bảo mật, bạn luôn luôn nên đặt front controller của mình (index.php) trong thư mục `public` và tuyệt đối không nên đặt trực tiếp trong thư mục gốc của dự án.

Bạn có thể set base path một cách thủ công như sau:
```
$app->setBasePath('/slim4-tutorial');
```
Tuy nhiên vấn đề ở đây chính là base path có thể khác nhau tùy theo host (dev, testing, staging, prod, ...)

Chính vì vậy `BasePathMiddleware` phát hiện và đặt base path và slim app instance.

Để cài đặt BasePathMiddleware sử dụng câu lệnh composer:
> composer require selective/basepath

Tiếp theo inject nó bằng cách config container:
```
use Selective\BasePath\BasePathMiddleware;
// ...

return [
    // ...

    BasePathMiddleware::class => function (ContainerInterface $container) {
        return new BasePathMiddleware($container->get(App::class));
    },
];
```
Cuối cùng là thêm BasePath middleware này vào stack middleware. Như vậy nghĩa là mỗi khi có request, request sẽ phải đi qua basepath middleware để set lại base path.
 ## Kết luận
Trên đây là những bước cơ bản đầu tiên để tạo một project Slim 4, trong bài sau mình sẽ nói về cách code để xử lý một luồng request hoàn chỉnh.
### Tài liệu tham khảo
> https://odan.github.io/2019/11/05/slim4-tutorial.html