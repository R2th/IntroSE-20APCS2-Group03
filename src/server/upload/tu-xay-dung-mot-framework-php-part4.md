# Templating

Template engine có tác dụng giúp làm sạch đi những đoạn code PHP nằm trong View nên tách biệt code và html giúp dễ nhìn và dễ bảo trì hơn. Bản thân php cũng được coi là một template enginer, tuy nhiên cách thức viết code và cách xử lý mà nó hỗ trợ không được uyển chuyển và khó khăn đọc hơn so với các nền tảng khác. Một số template php thường được sử dụng như Blade của Laravel, Smarty, Twig …

ví dụ dùng php thuần + html
```php
<html>
  <body>
  hello <?php echo 'Name' ?>
  </body>
</html>

```

ví dụ dùng blade template
```php
<html>
  <body>
  hello {{ $name }}
  </body>
</html>
```

**Blade template **

ở bài viết này mình sẽ sử dụng blade template được sử dụng trong project laravel, document bạn có thể tìm thấy ở đây [Blade Template](https://laravel.com/docs/5.8/blade)

để tạo example thì ta cần làm các bước sau 
 + tích hợp thư viện
 + thêm route
 + thêm controller xử lí
 + thêm view

## Tích hơp thư viện

cách tính hợp blade template vào dự án, ta chạy command sau để cài đặt thư viện:

```
composer require jenssegers/blade
```

tài liệu hướng dẫn sử dụng thì tham khảo ở đây [https://github.com/jenssegers/blade](https://github.com/jenssegers/blade)

thêm đoạn code sau vào file app/Dependencies.php, lí do và ý nghĩ thêm đoạn code này thì mình đã giải thích ở các part trước:

```php
$injector->define('Jenssegers\Blade\Blade', [
    ':viewPaths' => __dir__ . '/../views',
    ':cachePath' => __dir__ . '/../storage/cache',
    ':container' => null,
]);

$injector->share('Jenssegers\Blade\Blade');

```
ý nghĩa các tham số 

**viewPaths**: thư mục gốc chứa template

**cachePath**: thư mục chứa cache nơi chứa code template sẽ được render ra theo php thuần

## Tạo router


thêm đoạn code sau vào file `routes/web.php`

```
$router->addRoute('GET', '/test-blade', 'App\Controllers\BladeController@testBlade');
```

## Tạo controller

thêm mới file app\Controllers\BladeController.php

```php
<?php

namespace App\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Jenssegers\Blade\Blade;

class BladeController
{
    public function __construct(Response $response, Blade $blade) {
        $this->response = $response;
        $this->blade = $blade;
    }

    public function testBlade()
    {
        $data['name'] = 'world';
        $rs = $this->blade->make('test-blade', $data)->render();
        $this->response->setContent($rs);
    }
}

```

`$rs = $this->blade->make('test-blade', $data)->render();` **test-blade** tên view hiển thị

`$data['name'] = 'world';` biến sẽ được truyền qua view

## Tạo view hiển thị

view tạo phải được tạo ở folder đã khai báo ở trên

```php
    ':viewPaths' => __dir__ . '/../views',
```

và tên đuôi file sẽ là `.blade.php`

như ví dụ trên ta sẽ tạo 1 file trong thư mục `views/test-blade.blade.php` với nội dung

```php
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    Hello {{ $name }}
</body>
</html>
```

`{{ $name }}` hiển thị dữ liệu tương ứng khi truyền qua view `$data['name'] = 'world';`

## Kết quả

đây là kết quả ![](https://images.viblo.asia/94669900-6c60-46dd-8bdd-09b01dc627c3.png)

github source : [https://github.com/trangianhuan/build_mvc](https://github.com/trangianhuan/build_mvc)

part 5 to continue...