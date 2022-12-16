Nếu như các bạn quá quen thuộc với các chuẩn PSR-1, PSR-2 là các chuẩn code convention thì dường như lại không ai để ý mấy đến chuẩn autoload file PSR-0 và PSR-4. Hai chuẩn này là chuẩn load file được sử dụng trong `composer`, trong bài viết mình sẽ lấy ví dụ để so sánh 2 chuẩn này.

***Note:***
* Bài viết mang tính chất bổ sung ví dụ về PSR-0 và PSR-4 cho bài viết [chi tiết này](https://viblo.asia/p/php-autoloading-psr4-and-composer-V3m5Wy0QZO7)
* Bài viết chỉ là các ví dụ để "chứng minh": "*Sự khác biệt chủ yếu của PSR-0 so với PSR-4 đó là, PSR-0 không có khái niệm **namespace prefix** nên cấu trúc namespace sẽ tương ứng với cấu trúc thư mục chứa class*"

# 1. Giới thiệu

* Các chuẩn PSR-1 và PSR-2 các bạn có thể tham khảo tại đây [đây](https://viblo.asia/p/cac-convention-thuong-gap-khi-moi-bat-dau-training-php-tai-framgia-bJzKmgq6l9N)
* Autoaloading là gì?: Bạn có để ý là khi đọc về PHP thuần, muốn sử dụng source code từ file khác, người ta cần `include` or `require`, làm một cách thủ công. Đó là vì bạn chưa biết autoload @@. Autoload sẽ thực hiện một cách tự động `require`, `include` cho bạn thông qua các `magic method`, các `function`. Chi tiết bạn có thể xem các magic method nào và hàm nào có thể đọc tại [đây](https://viblo.asia/p/cac-convention-thuong-gap-khi-moi-bat-dau-training-php-tai-framgia-bJzKmgq6l9N) - quá chi tiết (len)
* Nếu bạn đọc ở đâu đó, người ta khuyên bạn sử dụng `composer` thì nên sử dụng PSR-4 và quên đi PSR-0 đi, vì sao lại vậy, ta thử xem xét ví dụ sau nhé

* Đường dẫn các thư mục (mình giữ nguyên thư mục của bài Viblo mình thao khảo). Ta sẽ xem xét việc `require` các file trong các đường dẫn Controllers, Models, Views vào `index.php` như thế nào với 2 chuẩn kia nhé :D
```
.
├── composer.json
├── index.php
└── src
    ├── Controllers
    │   └── HomeController.php
    ├── Models
    │   └── User.php
    └── Views
        └── home.php
```

# 2. PSR-0
Nếu sử dụng PSR-0, không cho phép sử dụng **namespace prefix**, vì vậy bạn phải tạo đường dẫn đúng cho thư mục của bạn.

File `HomeController.php`:
```php
<?php
namespace Controllers;

use Models\User;

class HomeController 
{
    public function actionIndex()
    {
        return (new User)->list();
    }
}
```
File `User.php`
```php
<?php
namespace Models;

class User
{
    public function list()
    {
        // TODO: get actual data
        return [1, 2, 3];
    }
}
```
File `composer.json`
```php
{
    "autoload": {
        "psr-0": {
            "Controllers\\HomeController": "src/",
            "Models\\User" : "src/"
        }
    }
}
```
File `index.php`
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Controllers\HomeController;

$homeCtrl = new HomeController;

print_r($homeCtrl->actionIndex());
```
Tiến hành chạy autoload:

`$ composer dump-autoload`

Chạy file index.php để test

`$ php index.php`

Và tất nhiên kết quả là OK. Tuy nhiên bạn để ý thấy file composer.json khá phức tạp. 

Bây giờ bài toán đặt ra là giả sử giờ bạn muốn thêm 1 lớp có đường dẫn khác các đường dẫn sẵn có, chẳng hạn Repositories như sau:
```
.
├── composer.json
├── index.php
└── src
    ├── Controllers
    │   └── HomeRepository.php
    ├── Repositories
    │   └── HomeController.php
    ├── Models
    │   └── User.php
    └── Views
        └── home.php
```
File `HomeRepository.php`
```php
<?php
namespace Repositories;

class HomeRepository 
{
    public function hello()
    {
    	echo "Hello, I am Minh";
    }
}
```
Lúc đó, bạn cần cập nhật `composer.json` lại như sau đê file index.php có thể sử dụng được:
```php
{
    "autoload": {
        "psr-0": {
            "Controllers\\HomeController": "src/",
            "Models\\User" : "src/",
            "Repositorirs\\Repository": "src/",        }
    }
}
```
Thêm 10 lớp hay 100 lớp, cập nhật `composer.json` mệt phết nhể :3.
# 3. PSR-4
Để khắc phục nhược điểm phải cập nhật `composer.json` như trên, giờ ta sẽ chuyển sang dùng chuẩn PSR-4 với **namespace prefix** để giải quyết vấn đề.
File composer.json sử dụng PSR-4 sẽ như sau:
```php
{
    "autoload": {
        "psr-4": {
            "Viblo\\": "src/"
        }
    }
}
```
Với các lớp được viết lại (sử dụng namespace prefix: **Viblo**)

File `HomeController.php`:
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

File `User.php`
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
Khi đó thêm với HomeRepository, chỉ cần đặt `namespace prefix` Viblo cho lớp này là được mà không cần cập nhật `composer.json` => đơn giản và thuận tiện hơn khá nhiều.

File `HomeRepository.php `sẽ như sau:
```php
<?php
namespace Viblo\Repositories;

class HomeRepository 
{
    public function hello()
    {
    	echo "Hello, I am Minh";
    }
}
```

File `index.php` để test sẽ như sau:
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Viblo\Controllers\HomeController;
use Viblo\Repositories\HomeRepository;

$homeCtrl = new HomeController;
$homeRps = new HomeRepository;

print_r($homeCtrl->actionIndex());
$homeRps->hello(); // Hello, I am Minh - vì đã được load thành công
?>
```

# Tổng kết
Qua ví dụ trên hi vọng các bạn có thể thấy được sự khác biệt khá rõ rệt của PSR-0 và PSR-4 và hãy quên PSR-0 đi :3
# Tài liệu tham khảo
* Autoloading :https://viblo.asia/p/php-autoloading-psr4-and-composer-V3m5Wy0QZO7
* PSR 1+ PSR 2: https://viblo.asia/p/cac-convention-thuong-gap-khi-moi-bat-dau-training-php-tai-framgia-bJzKmgq6l9N