Chào mọi người, bài viết này mình muốn giới thiệu về 1 package không phải xa lạ gì với PHP Developer đó là phpdotenv. Cùng theo dõi bài viết của mình nhé :)
## Phpdotenv là gì?
Chắc hẳn trong khi code, bạn sẽ gặp trường hợp cần setting các biến môi trường (environment) cho các môi trường khác nhau mà không muốn đẩy biến môi trường này lên github đúng không? VD: Thông tin Database hay AWS chẳng hạn...
Vậy phpdotenv sẽ hỗ trợ bạn làm việc này một cách trơn tru mà không phải lo lắng gì cả.

Link github: [phpdotenv (PHP dotenv)](https://github.com/vlucas/phpdotenv)
## Cài đặt
Install with composer
```
php composer.phar require vlucas/phpdotenv
```
## Cách sử dụng
### Sử dụng cơ bản
File `.env`
```
URL = "http://example.com"
```
File `sample.php`
```
<? php

require_once  './vendor/autoload.php' ;

// The argument specifies the directory where the ".env" file is located 
$ dotenv  =  new  Dotenv\Dotenv(DIR); 
$ dotenv->load();

echo  getenv('URL');    // http://example.com 
echo  $_ENV['URL'];     // http://example.com 
echo  $_SERVER['URL'];  // http://example.com
```
### Thêm comments vào file .env
Thêm comment bằng dấu `#`

`.env`
```
# comment 1
URL = "http://example.com" # comment 2
```
`sample.php`
```
<? php

require_once './vendor/autoload.php' ;

$ dotenv  =  new Dotenv\Dotenv(DIR); 
$ dotenv->load();

echo  $_ENV['URL'];     //http://example.com
```
Sử dụng các biến môi trường trong file như một biến thông thường bằng dấu `${}`

`.env`
```
SUBDOMAIN = "hoge"
URL = "http://${SUBDOMAIN}.example.com"
```
`sample.php`
```
<? php

require_once  './vendor/autoload.php' ;

$dotenv  =  new Dotenv\Dotenv(DIR); 
$dotenv->load();

echo $_ENV['URL'];     //http://hoge.example.com
```
### Sử dụng file khác ngoài .env
Bạn có thể sử dụng file khác mặc định bằng cách thêm biến thứ hai khi tạo mới một đối tượng `Dotenv`

`hoge.env`
```
URL = "http://hoge.example.com"
```
`sample.php`
```
<? php
require_once  './vendor/autoload.php' ;

// Specify the file name as the second argument 
$dotenv = new Dotenv\Dotenv(DIR , 'hoge.env'); 
$dotenv->load();

echo $_ENV['URL'];     //http://hoge.example.com
```
### Overwrite trong phpdotenv
Trong trường hợp 2 file đều có biên môi trường giống nhau, khi sử dụng biến môi trường trong file sau sẽ không thể ghi đè lên biến môi trường của file trước.

File `.env`
```
SUBDOMAIN = "hoge"
URL = "http://${SUBDOMAIN}.example.com"
HOGE = ".env"
```
File `.env2`
```
SUBDOMAIN = "fuge"
URL = "http://${SUBDOMAIN}.example2.com"
FUGE = ".env2"
```
#### Action default
```
<? php

require_once  './vendor/autoload.php' ;

$dotenv = new Dotenv\Dotenv(DIR); 
$dotenv->load();

$dotenv = new Dotenv\Dotenv(DIR , ".env2"); 
$dotenv->load();

print_r($_ENV);

/*
Array
(
    [SUBDOMAIN] => hoge
    [URL] => http://hoge.example.com
    [HOGE] =>.env
    [FUGE] =>.env2
)
*/
```
Các biến môi trường trong file `hoge.env` và `fuge.env` đã được đọc, nhưng SUBDOMAIN và URL không được ghi đè

#### Action overwrite
Nếu bạn muốn ghi đè các biến môi trường hãy sử dụng phương thức `overload()`
```
<? php

require_once  './vendor/autoload.php' ;

$dotenv = new Dotenv\Dotenv(DIR); 
$dotenv->load();

$dotenv = new Dotenv\Dotenv(DIR, ".env2"); 
$dotenv->overload();

print_r($_ENV);

/*
Array
(
    [SUBDOMAIN] => fuge
    [URL] => http://fuge.example2.com
    [HOGE] =>.env
    [FUGE] =>.env2
)
*/
```
Các biến môi trường trong file `hoge.env` và `fuge.env` đã được đọc và SUBDOMAIN và URL đã được ghi đè.

### Các loại biến môi trường 
Các biến dưới đây đều được coi là string
```
SAMPLE_1="true"
SAMPLE_2=true
SAMPLE_3="1"
SAMPLE_4=1
```
### Required trong phpdotenv
`phpdotenv` có một phương thức required. Ví dụ dưới đây sẽ throw `Dotenv\Exception\ValidationException` nếu SAMPLE_1 không được khai báo
```
<? php

require_once './vendor/autoload.php' ;

$dotenv = new Dotenv\Dotenv(DIR); 
$dotenv->load(); 
$dotenv->required('SAMPLE_1');
```
Bạn có thể chỉ định một mảng
```
// throw an exception if both environment variables are not set 
$dotenv->required (['SAMPLE_ 1' ,  'SAMPLE_2']);
```
Hoặc chỉ định thêm method đằng sau
```
// If SAMPLE_1 is a number => OK 
$dotenv->required('SAMPLE_1')->isInteger();
```
```
// If SAMPLE_1 is numeric and 100 or 101 => OK 
$ dotenv->required('SAMPLE_1')->isInteger()->allowedValues([100 , 101]); 
```
Phương thức `required` có thể được sử dụng khi ứng dụng của bạn muốn kiểm tra nội dung một cách chặt chẽ.

Như vậy mình đã giới thiệu cho các bạn cách quản lý các biến môi trường với backage phpdotenv. Cảm ơn mọi người đã theo dõi bài viết của mình :))