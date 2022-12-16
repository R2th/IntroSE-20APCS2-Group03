Nếu là 1 PHP developer, thì cụm từ **Composer** (Công cụ mới tiện lợi cho PHP nhằm mục đích tập trung và hợp lý hóa việc quản lý package hay library) chắc hẳn không còn xa lạ với mọi người. <br>
Nhưng liệu bạn đã thực sự hiểu cách composer hoạt động trong PHP. <br>
Hãy dành ra ít phút cùng mình tiìm hiểu về cách thức hoạt động của  Composer’s autoloader and namespaces nhé <3 <br>
##### Ready? Go! :D
### Setup Composer and Download Packages
Đầu tiên, download composer về máy của bạn:
```
$ curl -s https://getcomposer.org/installer | php
```
Tạo 1 file composer.json và thêm 1 vài packages vào đó. Các packages có thể được tìm thấy tại packagist.org các bạn nhé:
```
{
    "require": {
        "symfony/validator":         "2.1.*",
        "doctrine/dbal":             "2.2.*",
        "monolog/monolog":           "dev-master",
        "jtreminio/test-extensions": "dev-master"
    },
    "minimum-stability": "dev"
}
```
Chạy cài đặt, điều này sẽ tạo môi trường ban đầu thiết lập và tải xuống các packages được yêu cầu:
```
$ ./composer.phar install
```
### What’s Been Created
Bây giờ bạn sẽ có file `composer.json`, `composer.lock` và `composer.phar`, cũng như một folder `vendor` chứa:
```
vendor/composer
vendor/jtreminio
vendor/symfony
vendor/autoload.php
```
File `vendor/autoload.php` về cơ bản là một  fake loader (nó gọi `vendor/composer/autoload_real.php`). Mình bỏ qua nó đi =)<br>
Bên trong `vendor/bin` là PHPUnit bin (BẠN ĐANG TESTING, ĐÚNG KHÔNG ?). Chúng được tạo bởi package phpunit/PHPUnit mà package `jtreminio/test-extensions` yêu cầu đó bạn<br>
### The autoload_namespaces.php file
Bây giờ, mở `vendor/composer/autoload_namespaces.php` và bạn sẽ thấy:
```
<?php
// ...

    return array(
        'jtreminio\\TestExtensions'     => $vendorDir . '/jtreminio/test-extensions/src/',
        'Symfony\\Component\\Validator' => $vendorDir . '/symfony/validator/',
        'Symfony\\Component\\Finder\\'  => $vendorDir . '/symfony/finder/',
        'Monolog'                       => $vendorDir . '/monolog/monolog/src/',
        'Doctrine\\DBAL'                => $vendorDir . '/doctrine/dbal/lib/',
        'Doctrine\\Common'              => $vendorDir . '/doctrine/common/lib/',
    );
```
Đây là những namespaces có sẵn của bạn. Là namespaces mà ứng dụng của bạn có thể sử dụng (nếu đây là autoloader duy nhất mà bạn đang sử dụng). Nếu namespace không được liệt kê ở đây, bạn không thể autoload class đó.<br>
Dấu gạch chéo ngược kép nhằm mục đích escaping - composer chèn dấu chéo ngược kép để nó không thoát khỏi dấu nháy đơn. Nó có thể được thay đổi theo cách thủ công thành một backspace duy nhất, nhưng Đừng làm điều đó. Không bao giờ chỉnh sửa bất kỳ tệp nào bên trong folder vendor.<br>
Nếu bạn xóa hoặc thêm bất kỳ namespaces nào theo cách thủ công, vào lần tiếp theo bạn chạy update ./composer.phar, tất cả các thay đổi của bạn sẽ bị mất đi. Các namespaces này được đặt thông qua file composer.json. Bạn cũng có thể custom namespaces, mà mình sẽ chỉ cho bạn ở cuối bài viết này.<br>
### Hurry it up!
Đây là: file `index.php` của ứng dụng của bạn (hoặc bất cứ thứ gì) cần require file `vendor/autoload.php`:<br>
```
<?php
// ...

require_once __DIR__.'/vendor/autoload.php';
```
Và bây giờ bạn có thể gọi bất kỳ namespace nào được xác định bởi composer!<br>
```
<?php
// ...

$foo = new \Monolog\Logger('foo');
```
Vậy điều vi diệu ở đây là gì???<br>
Trong file `vendor/composer/autoload_namespaces.php`:
```
<?php
// ...

return array(
    'jtreminio\\TestExtensions'     => $vendorDir . '/jtreminio/test-extensions/src/',
    'Symfony\\Component\\Validator' => $vendorDir . '/symfony/validator/',
    'Symfony\\Component\\Finder\\'  => $vendorDir . '/symfony/finder/',
    'Monolog'                       => $vendorDir . '/monolog/monolog/src/',
    'Doctrine\\DBAL'                => $vendorDir . '/doctrine/dbal/lib/',
    'Doctrine\\Common'              => $vendorDir . '/doctrine/common/lib/',
);
```
Nhìn vào dòng cụ thể này: `'Monolog' => $vendorDir . '/monolog/monolog/src/',`<br>
Monolog là namespace và $vendorDir . '/monolog/monolog/src/' là nơi có thể tìm thấy namespace này. Tất cả namespace trong trường hợp này là folder name. Kiểm tra folder directory của bạn. Class Logger () được tìm thấy trong `vendor/monolog/monolog/src/Monolog/Logger.php`.<br>
`vendor/monolog/monolog/src/` là đường dẫn đến namespace, Monolog là base namespace và Logger.php chứa class Logger.<br>
Còn những namespaces khác thì sao?<br>
```
<?php
// \TestExtensions\TestExtensions

// PHP Code
$bar = new \jtreminio\TestExtensions\TestExtensions();

// Namespace Identifier
'jtreminio\\TestExtensions' => $vendorDir . '/jtreminio/test-extensions/src/',

// Maps to
vendor/jtreminio/test-extensions/src/jtreminio/TestExtensions/TestExtensions.php
```
```
<?php
// \Symfony\Component\Validator

// PHP Code
$baz = new \Symfony\Component\Validator\Validator();

// Namespace Identifier
'Symfony\\Component\\Validator' => $vendorDir . '/symfony/validator/',

// Maps to
vendor/symfony/validator/Symfony/Component/Validator/Validator.php
```
Khá đơn giản đúng không nào^^
```
<?php
// \Symfony\Component\Finder

// PHP Code
$qux = new \Symfony\Component\Finder\Finder();

// Namespace Identifier
'Symfony\\Component\\Finder\\' => $vendorDir . '/symfony/finder/',

// Maps to
vendor/symfony/finder/Symfony/Component/Finder.php
```
```
<?php
// \Doctrine\DBAL

// PHP Code
$qwe = new \Doctrine\DBAL\Connection();

// Namespace Identifier
'Doctrine\\DBAL' => $vendorDir . '/doctrine/dbal/lib/',

// Maps to
vendor/doctrine/dbal/lib/Doctrine/DBAL/Connection.php

// * Won’t actually run because classes are either abstract
//   or require constructor arguments.
```
### Bonus Round: Custom Namespaces
Mở file `composer.json` và làm cho nó trông giống như sau:
```
{
    "require": {
        "symfony/validator":         "2.1.*",
        "doctrine/dbal":             "2.2.*",
        "monolog/monolog":           "dev-master",
        "jtreminio/test-extensions": "dev-master"
    },
    "minimum-stability": "dev",
    "autoload": {
        "psr-0": {
            "Brony":        "src/",
            "Brony\\Tests": "tests/",
        }
    }
}
```
Chạy `./composer.phar` update và checkout `vendor/composer/autoload_namespaces.php`. Bạn sẽ thấy hai dòng này ở đâu đó trong mảng đó:
```
<?php
// ...

    'Brony\\Tests' => $baseDir . '/tests/',
    'Brony'        => $baseDir . '/src/',
```
Vậy đó, người anh em :D. Custom namespace của riêng bạn đã hoàn thành. Cấu trúc ứng dụng cuối cùng của bạn sẽ trông như thế này:
<br>
```
/src/     // The "Brony" namespace
/vendor/  // Contains all composer packages
/tests/   // The "Brony/Tests" namespace
index.php // Calls the autoloader
```
Have fun out there!<br>
##### Link tham khảo: https://jtreminio.com/blog/composer-namespaces-in-5-minutes/