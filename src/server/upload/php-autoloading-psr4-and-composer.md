## Giới thiệu
Rất nhiều PHP developer hiện nay và kể cả phần lớn các framework đều chọn cách viết code theo mô hình lập trình hướng đối tượng. Một trong những best practice, convention khi viết OOP đó là mỗi class sẽ được viết riêng vào 1 file. Nhưng có một vấn đề đối với practice này đó là chúng ta phải `include/require` cả list dài các file class trước khi sử dụng chúng.

Vâng, nhưng đó là vấn đề của PHP < 5, xưa lắm rồi :D Từ PHP 5 trở đi, chúng ta có thể sử dụng feature **autoloading** để tự động load các class khi chúng được gọi. Mục đích của bài viết này là thảo luận về cách hoạt động, cách thực hiện autoload theo cách thông thường và thực hiện autoload bằng Composer.

Một ví dụ đơn giản, thay vì viết:
```php
<?php
include __DIR__ . '/classes/MyClass.php';
include __DIR__ . '/classes/Foo.php';
include __DIR__ . '/classes/Bar.php';
// ...

$obj = new MyClass;
$foo = new Foo;
$bar = new Bar;
// ...
```

Thì chúng ta sẽ dùng autoloading:
```php
<?php
spl_autoload_register(function ($classname) {
    // Hey, PHP! Nếu class mà chưa được khai báo trong file này thì tìm nó trong folder classes nhé!!!
    include __DIR__ . '/classes/' . $classname . '.php';
});

$myClass = new MyClass;
$foo = new Foo;
$bar = new Bar;
```

Các class sẽ tự động được load thay vì phải `include/require` từng file.

## \_\_autoload vs spl\_autoload\_register
Để thực hiện autoloading, chúng ta phải *hướng dẫn* cho PHP cách load các file class đó, vì có nhiều quy tắt đặt tên, cách tổ chức file, folder mà,  mỗi nguời mỗi ý, không nói ra thì làm sao biết??

Từ thưở mới bắt đầu, PHP 5.0, người ta sử dụng magic function [`__autoload()` ](https://secure.php.net/manual/en/function.autoload.php) để thực hiện ra công văn chỉ đạo cho PHP thực hiện autoload. Tuy nhiên, do có nhiều hạn chế nên bắt đầu từ PHP 5.1 thì PHP đưa ra thêm function [`spl_autoload_register()`](http://www.php.net/manual/en/function.spl-autoload-register.php), khuyên dùng hàm này thay cho `__autoload()` và cho đến phiên bản PHP 7.2.0 thì function `__autoload()` đã bị *DEPRECATED*, sẽ bị xóa trong tương lai gần.

### \_\_autoload
Cụ thể `__autoload()` là một magic function, muốn sử dụng nó bạn định nghĩa nó, tức là bạn phải viết 1 function có tên là `__autoload`, nhận   tham số là tên class muốn load. 
```php
void __autoload (string $class)
```
VD, convention của project là viết các file class vào thư mục `src/classes/`, chúng ta sẽ thực hiện autoload như sau:
- File `src/classes/Foo.php`:
    ```php
    <?php
    class Foo 
    {
        public function __construct() 
        {
            echo 'I am Foo!';
        }
    }
    ```
- File `src/classes/Bar.php`:
    ```php
    <?php
    class Bar 
    {
        public function __construct() 
        {
            echo 'I am Bar!';
        }
    }
    ```
- File `src/index.php`:
    ```php
    <?php
    function __autoload($classname) 
    {
        $filename = __DIR__ . '/classes/' . $classname . '.php';
        include $filename;
    }

    $foo = new Foo;
    $bar = new Bar;
    ```
Với cách này, bạn chỉ có thể có định nghĩa 1 function `__autoload()`, vì thế nếu bạn sử dụng một thư viện nào đó cũng sử dụng function này thì sẽ gây conflict và sẽ có lỗi do định nghĩa 2 hàm trùng tên.

### spl\_autoload\_register
```shell
bool spl_autoload_register ([callable $autoload_function [, bool $throw = TRUE [, bool $prepend = FALSE ]]])
```
Khác với `__autoload()` thì `spl_autoload_register()` là một function thông thường, muốn sử dụng nó thì bạn gọi đến nó chứ không phải định nghĩa nó, và tất nhiên là chúng ta có thể gọi nó nhiều lần.

Như bạn thấy, function này sẽ nhận tham số là một callback function, callback này có nhiệm vụ giống như `__autoload()`. Nếu có nhiều hàm callback autoload, PHP sẽ tạo 1 queue và thực hiện lần lượt theo thứ tự hàm callback được định nghĩa trong lời gọi hàm  `spl_autoload_register()` cho đến khi nó tìm được class, và nếu sau khi chạy qua tất cả autoload mà không tìm thấy class thì sẽ có exception class not found.

VD thay thế cho `__autoload()`:
```php
<?php
/*function __autoload($classname) 
{
    $filename = __DIR__ . '/classes/' . $classname . '.php';
    include $filename;
}*/

spl_autoload_register(function ($classname)  {
    $filename = __DIR__ . '/classes/' . $classname . '.php';
    include $filename;
});

$foo = new Foo;
$bar = new Bar;
```

VD nhiều autoload callback, load class trong 2 thư mục `includes` và `classes`:
```sh
src
├── classes
│   └── MyClass.php
├── includes
├── index.php
```

```php
<?php
$autoloadIncludes = function ($classname) {
    $filename = __DIR__ . '/includes/' . $classname . '.php';
    echo 'Try to load ' . $filename . PHP_EOL;
    if (file_exists($filename)) {
        include $filename;
    }
};

$autoloadClasses = function ($classname) {
    $filename = __DIR__ . '/classes/' . $classname . '.php';
    echo 'Try to load ' . $filename . PHP_EOL;
    if (file_exists($filename)) {
        include $filename;
    }
};

spl_autoload_register($autoloadIncludes);
spl_autoload_register($autoloadClasses);

$myClass = new MyClass;
```
Output khi chạy:
```sh
Try to load /tmp/autoload/src/includes/MyClass.php
Try to load /tmp/autoload/src/classes/MyClass.php
I am MyClass
```
Nếu thay đổi thứ tự autoload callback:
```php
<?php
// ...
spl_autoload_register($autoloadClasses);
spl_autoload_register($autoloadIncludes);

$myClass = new MyClass;
```
Output thế nào chắc các bạn cũng biết được.

Trường hợp class không tồn tại:
```php
<?php
// ...
spl_autoload_register($autoloadClasses);
spl_autoload_register($autoloadIncludes);

$notExistClass = new NotExistClass;
```
=>
```sh
Try to load /tmp/autoload/src/classes/NotExistClass.php
Try to load /tmp/autoload/src/includes/NotExistClass.php
PHP Fatal error:  Uncaught Error: Class 'NotExistClass' not found in /tmp/autoload/src/spl_autoload.php:22
Stack trace:
#0 {main}
  thrown in /tmp/autoload/src/spl_autoload.php on line 22
```

## PSR-4
Việc mỗi người, mỗi dự án có một cách thức thực hiện autoloading làm cho việc chia sẻ dùng lại code giữa các framework, thư viện trở nên phức tạp. Do đó, chuẩn [PSR-4 Autoloader](https://www.php-fig.org/psr/psr-4/) được tạo ra để thống nhất một quy tắc trong việc thực hiện autoloading. Các framework như Laravel, Symfony, Phalcon... đều dùng chuẩn này (tham khảo file `composer.json`). Tiêu chuẩn này mô tả các quy tắc tổ chức namespace trong class, cũng như cách tổ chức tên file, folder của class tương ứng. Trước chuẩn này còn có chuẩn PSR-0, tuy nhiên nó đã lỗi thời, các bạn có thể tự tham khảo và so sánh với chuẩn PSR-4.

Nội dung chính của chuẩn PSR-4 đó là: Quy tắc tổ chức các thư mục code sao cho mọi class (bao gồm class, interface, trait) đều có thể được tham chiếu đến bằng cách viết mã như sau:
```cpp
\<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>
```
- `NamespaceName`: Tiền tố đầu tiên bắt buộc phải có - có thể hiểu là tên vendor.
- `SubNamespaceNames`: Các namespace con (theo sau NamespaceName đầu tiên). Có thể một hoặc nhiều. 

   Các namespace liền kề nhau ở đầu có thể kết hợp tạo thành **namespace prefix** và tương ứng với ít nhất một **base directory**.  Nhưng bắt đầu từ SubNamespace sau **namespace prefix** thì nó phải tương ứng với một thư mục con bên trong **base directory**, tên thư mục phải trùng với tên SubNamespace.
- `ClassName`: Bắt buộc phải có tên file trùng với tên lớp ClassName, nằm trong thư mục con tương ứng với namespace cuối cùng.

Ví dụ về cách tổ chức:
| Tham chiếu đến class | Namespace prefix | Base directory | | Class File Path |
| ---- | ---- | ---- | ---- | ---- |
| `\Acme\Log\Writer\File_Writer` | `Acme\Log\Writer` | `./src/lib/` | => | `./src/lib/File_Writer.php` |
| `\Symfony\Core\Request` | `Symfony\Core` | `./vendor/Symfony/Core/` | => | `./vendor/Symfony/Core/Request.php` |
| `\App\Http\Web\HomeController` | `App` | `./src/` | => | `./src/Http/Web/HomeController.php` |
| `\App\Utility\Class_Name` | `App` | `./src/` | => | `./src/Utility/Class_Name.php` |

Sự khác biệt chủ yếu của PSR-0 so với PSR-4 đó là, PSR-0 không có khái niệm **namespace prefix** nên cấu trúc namespace sẽ tương ứng với cấu trúc thư mục chứa class. Ngoài ra PSR-0 còn sử dụng thêm dấu gạch dưới `_` trong ClassName để thể hiện các thư mục bổ sung chứa class theo sau các tên namespace. Một Lưu ý nữa đó là, dấu `_` chỉ có ý nghĩa đặc biệt trong tên class, còn trong tên của namespace thì không.

VD về cách tổ chức class theo PSR-0:
| Tham chiếu đến class | Code directory | | Class File Path |
| ---- | ---- | ---- | ---- |
| `\Acme\Log\Writer\File_Writer` | `./src/lib/` | => | `./src/lib/Acme/Log/Writer/File/Writer.php` |
| `\Symfony\Core\Request` | `./vendor/` | => | `./vendor/Symfony/Core/Request.php` |
| `\App\Http\Web\HomeController` | `./src/` | => | `./src/App/Http/Web/HomeController.php` |
| `\App\Utility\Class_Name` | `./src/` | => | `./src/App/Utility/Class/Name.php` |
| `\App\Active_Record\Class_Name` | `./src/` | => | `./src/App/Active_Record/Class/Name.php` |

> Ngoài ra còn một yêu cầu đối với autoloader (autoload function, callback) đó là: Autoloader không được ném ra bất cứ exception nào, không được gây ra bất cứ lỗi hay warning nào, và không nên trả về giá trị.

Đó là cách thống nhất viết bố trí code PHP trên các thư mục và theo các namespace. Khi đã viết code tuân thủ theo hướng dẫn này thì các framework khác nhau đều sử dụng một cơ chế tự động nạp tương tự nhau nên việc chia sẻ, tích hợp là rất linh hoạt.

Ví dụ implement một autoloader ([source](https://www.php-fig.org/psr/psr-4/examples/)):
```php
<?php
/**
 *
 * Sau khi đăng ký autoloader, thì dòng sau đây sẽ như một chỉ dẫn cho function
 * load class \Foo\Bar\Baz\Qux từ đường dẫn /path/to/project/src/Baz/Qux.php:
 *
 *      new \Foo\Bar\Baz\Qux;
 *
 * @param string $class The fully-qualified class name.
 * @return void
 */
spl_autoload_register(function ($class) {

    // Namespace prefix
    $prefix = 'Foo\\Bar\\';

    // Base directory tương ứng cho namespace prefix, thư mục src
    $base_dir = __DIR__ . '/src/';

    // Tên Class đầy đủ có chứa Namespace prefix không?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // Không => Không thuộc chuẩn PSR-4 => autoloader này sẽ bị bỏ qua
        return;
    }

    // Lấy phần còn của class name trừ namespace prefix
    $relative_class = substr($class, $len);

    /*
      Tìm đường dẫn đến file class:
      - Thay thế namespace prefix bằng tên base directory
      - Thay thế ký tự namespace separators \ bằng directory separator / (Linux)
      - Thêm ext .php
    */
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // Nếu file tồn tại thì require it
    if (file_exists($file)) {
        require $file;
    }
});
```

## Autoloading với Composer
Để thực hiện autoloading với Composer bạn cần khai báo trong file `composer.json`. Composer hỗ trợ các kiểu autoload PSR-4, PSR-0, classmap và files, các bạn có thể tham khảo [tài liệu gốc](https://getcomposer.org/doc/04-schema.md#autoload).

Ở đây, mình sẽ ví dụ autoload PSR-4 với Composer.

Ví dụ bạn có cấu trúc thư mục như sau:
```sh
.
├── composer.json
├── index.php
└── src
    ├── Controllers
    │   └── HomeController.php
    ├── Models
    │   └── User.php
    └── Views
        └── home.php
```

File `src/Models/User.php`:
```php
<?php
namespace Viblo\Models;

class User
{
    public function list()
    {
        // TODO: get actual data
        return [1, 2, 3];
    }
}
```
Tương tự file `src/Controllers/HomeController.php` sẽ có namespace `Viblo\Controllers`. 
```php
<?php
namespace Viblo\Controllers;

use Viblo\Models\User;

class HomeController 
{
    public function actionIndex()
    {
        return (new User)->list();
    }
}
```

Thư mục Views gồm những file markup PHP, Html nên sẽ không thực hiện autoload.

Tiếp theo, chúng ta có file `composer.json`:
```json
{
    "autoload": {
        "psr-4": {
            "Viblo\\": "src/"
        }
    }
}
```

Sau đó chạy lệnh:
```sh
composer dump-autoload
```
Câu lệnh này sẽ tạo ra file autoloader `vendor/autoload.php`, autoloader này sẽ load các rule được implement trong  `vendor/composer/autoload_*.php`.
```shell
vendor/composer
├── autoload_classmap.php
├── autoload_files.php
├── autoload_namespaces.php
├── autoload_psr4.php
├── autoload_real.php
├── autoload_static.php
├── ca-bundle
├── ClassLoader.php
├── installed.json
├── installers
└── LICENSE
```

Sử dụng `index.php`:
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Viblo\Controllers\HomeController;

$homeCtrl = new HomeController;

print_r($homeCtrl->actionIndex());

// ...
```

### Autoload optimizing
Với các quy tắc PSR-0, PSR-4, autoloader cần phải check sự tồn tại của class file trong filesystem trước khi load class. Việc này có thể làm chậm tốc độc của application một chút, nhưng bù lại nó làm cho việc develop dễ dàng hơn khi bạn thêm một class và có thể sử dụng nó ngay lập tức mà không phải rebuild autoloader.

Vấn đề ở đây là, trong môi trường production, bạn thường muốn app của mình chạy nhanh nhất có thể, vì môi trường này ít khi thay đổi và bạn có thể dễ dàng rebuild lại autoloader khi deploy.

Vì lý do này, Composer cung cấp vài phương pháp để optimize autoloader. Mình sẽ giới thiệu 1 phương pháp thường được sử dụng nhất.

#### Optimization Level 1: Class map generation
##### Làm sao để bật chế độ này?
Có một vài tùy chọn để bạn bật chế độ optimization này:
+ Thiết lập trong file composer.json
  ```json
  "config": {
      "optimize-autoloader": true
  }
  ```
+ Chạy `composer install` hoặc `composer update` với option `-o` hay `--optimize-autoloader`
+ Chạy `composer dump-autoload` với option `-o` / `--optimize`

##### Nó hoạt động như thế nào?
Composer sẽ convert các rule PSR-4/PSR-0 sang classmap rule. Các bạn có thể xem file `vendor/composer/autoload_classmap.php` để kiểm tra. File này sẽ return một array, có key là tên class đầy đủ và value là đường dẫn đến class. Composer đã check sự tồn tại của các class này trước và generate ra classmap, do đó, khi tham chiếu đến class thì autoloader chỉ việc require file vào không cần phải check filesystem nữa.

Với PHP 5.6+, Composer còn thực hiện cache classmap trong `opcache`, làm cho việc load class có thể chạy nhanh nhất có thể.

##### Nhược điểm
Không có nhược điểm thực sự với phương pháp này, và bạn nên luôn luôn dùng nó trong môi trường production.

Một vấn đề nhỏ với ở đây là, nếu class không tồn tại trong classmap, nó sẽ có fallback về PSR-4 rule, tức là tiếp tục follow theo PSR-4 rule và có thể phát sinh filesystem check. 

Để giải quyết vấn đề này Composer cung cấp thêm 2 phương pháp optimize level 2 đó là *Level 2/A: Authoritative class maps* (loại bỏ fallback về PSR-4 rule) và *Level 2/B: APCu cache* (sử dụng `apcu` cache). Hai option level 2 này không thể được sử dụng cùng 1 lúc và cũng ít được sử dụng.

> Ngoài ra còn [1 vấn đề nữa](https://github.com/composer/composer/issues/7417) mình phát hiện trong quá trình tham gia một project, đó là khi sử dụng optimize thì rule PSR-4 sẽ không được đảm bảo về ràng buộc giữa class namespaces và thư mục chứa class. Tức là, vd 1 class là `App\User` nhưng lại được đặt trong thư mục khác, chẳng hạn `app/Http/Models/User.php` thay vì `app/User.php`.  
> 
> Nếu không optimize, sẽ có lỗi class not found khi sử dụng class `App\User` nhưng project này lại để hẳn config optimize-autoloader trong file composer.json nên làm mình không để ý, gây khó hiểu khi đọc code :D 
> 
> Đây cũng không phải là vấn đề lớn và vẫn đang được thảo luận, các bạn có thể theo dõi tại [issue này](https://github.com/composer/composer/issues/7352).

## Kết luận
Có thể nói Autoloading là một feature của "modern" PHP. Hy vọng qua bài viết này các bạn có thể áp dụng nhiều hơn vào các project của mình.

---
Reference:
- https://secure.php.net/autoload
- https://www.php-fig.org/psr/psr-0/
- https://www.php-fig.org/psr/psr-4/
- https://getcomposer.org/doc/04-schema.md#autoload
- https://github.com/composer/composer/issues/7417
- https://github.com/composer/composer/issues/7352