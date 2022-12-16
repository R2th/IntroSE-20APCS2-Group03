Trong bài viết lần này, chúng ta sẽ cùng nhau tìm hiểu về autoload trong PHP.

# 1. Modules in PHP

## 1.1 Code in one file
Chúng ta đều biết PHP là scripting language, nghĩa là trong quá trình thực thi một ứng dụng PHP, sẽ không có bước **compile** cái sourcecode PHP sang thành a,b,c,x,y,z gì cả. Thay vào đó, chúng ta sẽ một **intepreter** nó sẽ đọc qua cái sourcecode PHP của chúng ta từ trên xuống và thực thi các dòng lệnh.


Giả sử ta có một đoạn code chứa một [user-defined function](https://www.php.net/manual/en/functions.user-defined.php) như sau, đặt trong file `index.php`:
```php
<?php

function sayHelloWorld()
{
    echo 'Hello, world!';
}

sayHelloWorld();
```

Để chạy nó, ta đơn giản chỉ định cho intepreter của php thực thi file này:

```sh
$ php index.php
```

## 1.2 Code in multiple files
Việc đặt tất cả code trong một file sẽ khiến file ngày càng dài, và tới một mức sẽ rất khó để maintain cũng như scale. Việc chia nhỏ sourcecode ra thành nhiều files trở thành một nhu cầu tất yếu. PHP đã phát triển tính năng để hỗ trợ việc chia nhỏ này :

### 1.2.1. [include](https://www.php.net/manual/en/function.include.php)
 ...after included, all functions and classes defined in the included file have the global scope.
 
 Với include, ví dụ bên trên sẽ được viết lại như sau :
 
 ```php
//common.php
 <?php
 
 function sayHelloWorld()
{
    echo 'Hello, world!';
}
 
 ```
 
 ```php
 //index.php
 <?php
 
 include './common.php'
 
 sayHelloWorld();
 ```

### 1.2.2 [require](https://www.php.net/manual/en/function.require.php)
`require` thì cũng cho ta tính năng giống hệt như `include`, khác là với require, nếu như ta require một file mà nó không tồn tại, thì ứng dụng sẽ bị ngừng lại, trong khi với include, ứng dụng sẽ vẫn chạy tiếp, nếu như nó có thể chạy tiếp :sweat_smile: 


 
### 1.2.3 [require_once](https://www.php.net/manual/en/function.require-once.php) &  [include_once](https://www.php.net/manual/en/function.include-once.php)
`require_once` và `include_once` cũng tương tự như `include` và `require` ở trên, chỉ khác là nếu file đã được require/include rồi, thì nó sẽ không require/include nữa.

# 2. Autoload in native PHP
Giả sử ta có một ứng dụng với 2 files code như này :
```php
//Person.class.php
<?php

class Person
{
    public $name = '';

    function getName()
    {
        return $this->name;
    }
    function setName($newName)
    {
        $this->name = $newName;
    }
}
```

Ta sử dụng nó ở file `index.php`
```php
<?php

require './Person.class.php';

$person = new Person();
$person->setName('You');
echo 'Hello, ' . $person->getName();
```

Mọi thứ trong vẫn rất clean, nhưng thử tượng tượng, chúng ta có khoảng vài chục class cần sử dụng, đều này đồng nghĩa, là một danh sách require rất dài ở mỗi đầu file, kiểu như vầy :

```php
<?php

require './Person.class.php';
require './Car.class.php';
require './House.class.php';
require './Party.class.php';
require './Event.class.php';
require './Dog.class.php';
require './Cat.class.php';
require './Ball.class.php';
require './Park.class.php';
require './Sport.class.php';
require './Friend.class.php';
require './School.class.php';
require './Hospital.class.php';
.
.
.
```

Về mặt lý thuyết thì nó không sai, chỉ là mọi người vẫn tự hỏi là có cách nào ngắn gọn mà vẫn đạt được cùng một kết quả không? Câu trả lời là [spl_autoload_register](https://www.php.net/manual/en/function.spl-autoload-register.php)

## 2.1  [spl_autoload_register](https://www.php.net/manual/en/function.spl-autoload-register.php)
Tính năng mà function này hỗ trợ, rất clean và straightforward. Mỗi khi một class được sử dụng trong file, và intepreter thất bại trong việc tìm thấy định nghĩa của class, nó sẽ gọi cái spl_autoload_register này, để thử thêm một lần nữa.

Ví dụ bên trên của chúng ta sẽ được viết lại như sau :

```php
<?php

function my_autoloader($class) {
    require $class . '.class.php';
}
spl_autoload_register('my_autoloader');

$person = new Person();
$person->setName('You');
echo 'Hello, ' . $person->getName();
```

Đoạn code bên trên được đọc như sau, nếu không tìm thấy class Person, thì hãy thử require file có tên là tên của class *Person* cộng với hậu tố `.class.php`, relative với file hiện tại.

# 3. Composer autoload

Thay vì phải tự implement autoloader, bây giờ chúng ta sẽ sử dụng tính năng autoload được cung cấp bởi [Composer](https://getcomposer.org/). 

*các ví dụ bên dưới đây sẽ giả định là bạn đã có cài đặt composer*
## 3.1 [Autoload file](https://getcomposer.org/doc/04-schema.md#files)
Bây giờ chúng ta hãy thử viết lại ví dụ ban đầu, `sayHelloWorld`, nhưng bằng việc sử dụng composer. Sẽ vẫn là 2 files quen thuộc:

```php
// common.php
<?php

function sayHelloWorld()
{
   echo 'Hello, world!';
}
```
Và sử dụng nó ở file `index.php`
```php
<?php

require './common.php'; //what if we remove this line?

sayHelloWorld();
```

Bây giờ, ta sẽ  **thay thế** dòng `require './common.php` bằng một thứ khác. Đầu tiên, hãy tạo một `composer.json` file với nội dung như sau:

```json
{
    "autoload": {
        "files": [
            "./common.php"
        ]
    }
}
```

Sau đó, chạy câu lệnh:
```
$ composer dump-autoload
```

Lúc này, ta sẽ nhận được một folder `vendor` có cấu trúc như sau:
```
📦vendor
 ┣ 📂composer
 ┃ ┣ 📜ClassLoader.php
 ┃ ┣ 📜LICENSE
 ┃ ┣ 📜autoload_classmap.php
 ┃ ┣ 📜autoload_files.php
 ┃ ┣ 📜autoload_namespaces.php
 ┃ ┣ 📜autoload_psr4.php
 ┃ ┣ 📜autoload_real.php
 ┃ ┗ 📜autoload_static.php
 ┗ 📜autoload.php
 ```
 
 Vì chúng ta đang sử dụng tính năng **autoload file**, nên ta sẽ chỉ quan tâm tới file `autoload_files.php`, thử mở ra xem có gì trong đó nào:
 
 ```php
 // autoload_files.php
 <?php

// autoload_files.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    '71a289382e4ef3720852310b50d116ea' => $baseDir . '/common.php',
);
 ```
 
 Ta sẽ thấy một cái gì đó đại khái là có đường dẫn đi tới `/common.php` file. Bây giờ, để sử dụng, ta sẽ cập nhật lại nội dung của file `index.php` như sau:
 
 ```php
 <?php

require 'vendor/autoload.php';

sayHelloWorld();
 ```
 
 Giờ thì chạy `$ php index.php` cũng sẽ cho ta kết quả tương tự. 
 
 Ta sẽ tự hỏi là nó có khác gì so với cách làm trước? Về tính năng thì y hệt, nó chỉ khác là kể từ đây, mỗi khi muốn load một file mới, ta sẽ cập nhật lại file `composer.json` thay vì file `index.php`. (mỗi cần cập nhật file `composer.json` sẽ phải chạy lại câu lệnh `composer dump-autoload`)
 
#  3.2 [Autoload class](https://getcomposer.org/doc/04-schema.md#classmap)

Để demo cho tính năng autoload class này, đầu tiên ta cần chuẩn bị một folder classes, trong đó chứa file Person.php với nội dung code tương tự như ví dụ ở trên.

```
📦classes
 ┗ 📜Person.php
 ```
 
 Sau đó, chúng ta sẽ cập lại file `composer.json` như sau:
 ```json
 {
    "autoload": {
        "files": [
            "./common.php"
        ],
        "classmap": [
            "./classes"
        ]
    }
}
 ```
 Sau đó, chạy câu lệnh `$ composer dump-autoload`, lúc này, ta hãy mở file `autoload_classmap` xem có gì trong đó:
 
 ```php
 <?php

// autoload_classmap.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'Composer\\InstalledVersions' => $vendorDir . '/composer/InstalledVersions.php',
    'Person' => $baseDir . '/classes/Person.php',
);

 ```
 Ta lại thấy thứ gì đó, đại loại là đường dẫn đi tới file Person.php.
 
 Giờ ta hãy thử sử dụng class Person đó, một điều thú vị là ta không cần phải động gì tới chỗ require, cứ việc dùng cái class Person thôi, mọi thứ đã có composer lo:
 
 ```php
 <?php

require 'vendor/autoload.php';

sayHelloWorld();

$person = new Person();
$person->setName('You');
echo 'Hello, ' . $person->getName();
 ```
 
 Tới đây, sau khi chạy `$ php index.php`, ta sẽ vẫn nhận được kết quả tương tự.
 
#  3.3 [PSR-4](https://getcomposer.org/doc/04-schema.md#psr-4)

*PSR-4 is the recommended way since it offers greater ease of use (no need to regenerate the autoloader when you add classes).*

Sử dụng cái psr-4 này, thì mỗi lần thêm class, ta sẽ không cần phải chạy lại câu lệnh `$ composer dump-autoload`

Đây cũng chính là nội dung chính của bài viết lần này, có thể xem như **the state of the art** của php autoload. Ok, giờ chúng ta bắt đầu trải nghiệm thử tính năng này. Cập nhật lại file `composer.json` có nội dung như sau: (cập nhật xong thì chạy `$ composer dump-autoload`)

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/" 
        }
    }
}
```

Tạo một folder **app**, trong folder app sẽ tạo folder **Models** và trong folder Models sẽ tạo file **Person.php**

```
📦app
 ┗ 📂Models
 ┃ ┗ 📜Person.php
 ```
 Nội dung của file **Person.php** có thể rút gọn như sau:
 ```php
 <?php

namespace App\Models;

class Person
{
    public function __construct()
    {
        die('Person model');
    }
}
```

Trong file index.php, ta thử sử dụng nó:

```php
<?php

require './vendor/autoload.php';

use App\Models\Person as Person;

$person = new Person();
```

Tới đây, mọi thứ vẫn như cũ, chỉ khác một điều, là giờ ta thử tạo thêm folder và file, thì không cần phải chạy lại câu lệnh `$ composer dump-autoload`, việc ta cần làm, là folder theo một quy tắc:
1. Các file trong folder app phải có namespace bắt đầu bằng `App\`
2. Tên folder chứa file phải được chỉ ra ở trên namespace, ví dụ, file nằm trong folder `Models` thì cái namespace nó phải là `App\Models`.

Ví dụ, giờ ta muốn tạo Controllers, thì sẽ làm như sau:

```
📦app
 ┣ 📂Controllers
 ┃ ┗ 📜PersonController.php
 ┗ 📂Models
 ┃ ┗ 📜Person.php
```
Nội dung file `PersonController` sẽ là:

```php
<?php

namespace App\Controllers;

class PersonController
{
    public function __construct()
    {
        die('Person controller');
    }
}
```

Và khi sử dụng:

```php
<?php

require './vendor/autoload.php';

use App\Controllers\PersonController as PersonController;

$person = new PersonController();
```

Và cứ như vậy, ta cứ tạo folder mới, file mới thoải mái, chỉ cần follow theo đúng rules thì mọi việc autoload cứ để composer lo :heart_eyes:

# 4. Conclusion

Ok, tới đây thì chúng ta xem như kết thúc bài viết lần này. Ngày nay thì gần như mọi framework đều follow theo psr-4 để thực hiện autoload, mà cụ thể là đều sử dụng composer. Việc hiểu được cách composer psr-4 autoload hoạt động sẽ giảm bớt cảm giác `magic` khi ta code :rofl: Hẹn gặp lại các bạn trong bài viết tiếp theo.