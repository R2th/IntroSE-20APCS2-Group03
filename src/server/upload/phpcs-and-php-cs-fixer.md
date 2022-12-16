Nếu bạn muốn gặp các vấn đề với code convention và loay hoay tìm một công cụ nào đó hiệu quả giúp bạn tự động kiểm tra, auto fix các lỗi đó, thì bạn hãy ...... lên Google để tìm kiếm giải pháp. Bài viết sau cũng là một gợi ý =))

# PHP CodeSniffer

> PHP_CodeSniffer là tập gồm 2 script PHP, với script chính là `phpcs` mã hóa các tệp PHP, Javascript và CSS để phát hiện cú pháp tiêu chuẩn coding nhất định, và script thứ 2 `phpcbf` tự động sửa các vi phạm tiêu chuẩn code đó. PHP_CodeSniffer là một công cụ phát triển cần thiết để đảm bảo code của bạn nhất quán và sạch sẽ

## Cài đặt

Có rất nhiều cách cài đặt PHPCS, bạn có thể sử dụng 1 số cách sau:
### Globally (manual)
Cách đơn giản nhất để bắt đầu với `PHP_CodeSniffer` là download các file Phar và chạy trưc tiếp
```bash
# Download using curl
curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar
curl -OL https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar

# Or download using wget
wget https://squizlabs.github.io/PHP_CodeSniffer/phpcs.phar
wget https://squizlabs.github.io/PHP_CodeSniffer/phpcbf.phar

# Then test the downloaded PHARs
php phpcs.phar -h
php phpcbf.phar -h
```
### Globally (composer)
Cài đặt qua Composer, bạn có thể cài dưới dạng **global (system-wide)**
```bash
composer global require "squizlabs/php_codesniffer=*"
```
Sau đó hãy chắc chắn rằng thư mục bin của composer đã trong [PATH của bạn](https://viblo.asia/p/back-to-basic-linux-command-line-part-2-m68Z0MXNlkG). Giá trị mặc định của thư mục này là `~/.composer/vendor/bin/`, nhưng bạn có thể check giá trị bạn cần sử dụng bằng lệnh:
```bash
composer global config bin-dir --absolute
```
> Đối với bash thì file đó là .bashrc ở thư mục home từ là `~/.bashrc`, với zsh là file `~/.zshrc.`

Mình dùng `zsh` nên sẽ thêm vào file `.zshrc`
```bash
vi .zshrc
```
Thêm dòng này vào nha:
```bash
export PATH=~/.composer/vendor/bin/:$PATH
```
Sau đó kiểm tra lại bằng `echo $PATH` ra xem đã có chưa:
```
.../home/nguyen.van.minhb/.composer/vendor/bin/:....
```

### Locally
Nếu chỉ cần cài cho project, bạn có thể install trong phạm vi project
```bash
composer require "squizlabs/php_codesniffer=*"
```
Hoặc cập nhật file `composer.json` của bạn
```json
{
    "require-dev": {
        "squizlabs/php_codesniffer": "3.*"
    }
}
```
Lúc này bạn đã có thể chạy phpcs dựa trên đường dẫn vendor trong project
```bash
./vendor/bin/phpcs -h
./vendor/bin/phpcbf -h
```
## [Sử dụng](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Usage)

Để sử dụng, khá đơn giản, sử dụng lệnh `phpcs` kết hợp file, thư mục bạn muốn kiểm tra:
```bash
# Check cú pháp với file
$ phpcs /path/to/code/myfile.php

# Check cú pháp với thư mục
$ phpcs /path/to/code-directory

# Check cú pháp với các tùy chọn config
$ phpcs --standard=PSR2 /path/to/code-directory
```
Một vài tùy chọn khá hữu ích bạn nên thêm trong quá trình sử dụng
```
-n    Do not print warnings (shortcut for --warning-severity=0)
-p    Show progress of the run
-m    Stop error messages from being recorded
       (saves a lot of memory, but stops many reports from being used)
-v    Print processed files
```
Nếu bạn không muốn hiển thị các warning
```
$ phpcs -n /path/to/code/myfile.php

FILE: /path/to/code/myfile.php
--------------------------------------------------------------------------------
FOUND 5 ERROR(S) AFFECTING 5 LINE(S)
--------------------------------------------------------------------------------
  2 | ERROR | Missing file doc comment
 20 | ERROR | PHP keywords must be lowercase; expected "false" but found "FALSE"
 47 | ERROR | Line not indented correctly; expected 4 spaces but found 1
 51 | ERROR | Missing function doc comment
 88 | ERROR | Line not indented correctly; expected 9 spaces but found 6
--------------------------------------------------------------------------------
```
Và bạn nên sử dụng như vậy
```
./vendor/bin/phpcs -np /path/to/code-directory
```

Và fix lỗi convention
```
./vendor/bin/phpcbf -np /path/to/code-directory
```

### Config
Bạn hoàn toàn cấu hình các chuẩn kiểm tra code mà bạn muốn, như sử dụng tab hay space, check các thư muc nào, ignore những file nào, chuẩn nào. Sau khi setting PHPCS, mặc định nó sẽ sử dụng điều kiện PEAR, chuẩn này đã cũ, bạn có thể thay đổi điều này bằng cách sử dụng các standard của công ty Framgia hoặc PRS2
```bash
phpcs --config-set default_standard PSR2 

// Kiểm tra việc setting config
phpcs --config-show
```
Cách thay đổi config như vậy **KHÔNG KHUYẾN KHÍCH**, thay vào đó bạn nên setup `phpcs` cho từng project của bạn, sử dụng các file `.phpcs.xml, phpcs.xml, .phpcs.xml.dist, phpcs.xml.dist`.

### Cài đặt Framgia PHP Standards
Các tiêu chuẩn check code của PHPCS được đặt trong thư mục `~/.composer/vendor/squizlabs/php_codesniffer/src/Standards`. Vì vậy nếu bạn muốn thêm 1 tiêu chuẩn check code, bạn chỉ cần clone nó vào thư mục này:
```bash
// Version 2
cd ~/.composer/vendor/squizlabs/php_codesniffer/CodeSniffer/Standards
git clone -b 0.2 git@github.com:wataridori/framgia-php-codesniffer.git Framgia

// Version 3
cd ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards
git clone git@github.com:wataridori/framgia-php-codesniffer.git Framgia
```
Sử dụng:
```php
phpcs --standard=Framgia /path/to/your/code
```
Khá đơn giản nhỉ :D

## Tích hợp PHPCS vào Sublime text 3

Công việc tiếp theo là bạn nên tích hợp việc check cú pháp này trực tiếp vào các editor để tự động phát hiện lỗi, thay vì cột 1 mạch và lại chạy lệnh `phpcs` =))

Bạn cần cài 2 package trong Subime Text để được hỗ trợ việc này

> Sublime Linter (package cha)
> 
> SublimeLinter-phpcs (package con, các phần nhỏ của Linter)

Khởi động lại Sublime Text luôn để tận hưởng chức năng siêu mới này nhé :v **(khởi động bằng lệnh mới được ý @@)**
```bash
cd project_path
subl .
```

## Tích hợp PHPCS vào PHPStorm

Để tích hợp check phpcs và các tiêu chuẩn vào PHPStorm, bạn cài đặt theo đường dẫn.

**FIle => Setting => Editor => Inspections => PHP => PHP Code sniffer validation (Có thể ở trong Quality tools)**

Sau đó bạn lựa chọn các cài đặt, hiển thị lỗi ở mức **warning** hay **error** và chọn **Coding standard**
![](https://images.viblo.asia/1797c4d6-3e21-4fe0-9e56-9130ae1c79ca.png)

# [PHP Coding Standards Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

The PHP Coding Standards Fixer (PHP CS Fixer) là một công cụ sửa code của bạn theo các chuẩn, cho dù bạn tuân theo các tiêu chuẩn mã hóa PHP được định nghĩa trong PSR-1, PSR-2, v.v. hay các tiêu chuẩn do cộng đồng khác như Symfony. Bạn cũng có thể xác định các style cho team của mình thông qua các cấu hình
## Cài đặt
### Locally
Siêu đơn giản, tải cái file [php-cs-fixer.phar](https://cs.symfony.com/download/php-cs-fixer-v2.phar) về rồi chạy luôn :D

### Globally (manual)
Đầu tiên bạn tải nó về
```bash
$ wget https://cs.symfony.com/download/php-cs-fixer-v2.phar -O php-cs-fixer
```
Vẫn là tải nhưng xác định thêm version
```bash
$ wget https://github.com/FriendsOfPHP/PHP-CS-Fixer/releases/download/v2.16.1/php-cs-fixer.phar -O php-cs-fixer
```
Cũng là tải nhưng dùng lệnh khác
```bash
$ curl -L https://cs.symfony.com/download/php-cs-fixer-v2.phar -o php-cs-fix![](https://images.viblo.asia/09a62f3a-64c5-4551-9fdc-a16e49fbfc71.gif)
er
```
Then:
```bash
$ sudo chmod a+x php-cs-fixer
$ sudo mv php-cs-fixer /usr/local/bin/php-cs-fixer
```
End, xong rồi đó, test thôi `php-cs-fixer --version`

### Globally (Composer)
Đầu tiên bạn cũng tải nó dưới dạng global
```bash
$ composer global require friendsofphp/php-cs-fixer
```
Thêm vào PATH như phpcs
```bash
$ export PATH="$PATH:$HOME/.composer/vendor/bin"
```
Xong!

## Sử dụng

Không khác `phpcs` là mấy :v 
```bash
$ php php-cs-fixer.phar fix /path/to/dir
$ php php-cs-fixer.phar fix /path/to/file
$ php php-cs-fixer.phar fix /path/to/project --rules=@PSR2
```

See [usage](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/2.18/doc/usage.rst), list of [built-in rules](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/2.18/doc/rules/index.rst), list of [rule sets](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/2.18/doc/ruleSets/index.rst) and [configuration file](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/2.18/doc/config.rst) documentation for more details.

If you need to apply code styles that are not supported by the tool, you can [create custom rules](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/2.18/doc/custom_rules.rst)
## Tích hợp vào Sublime Text 3
> Package: PHP CS Fixer

### Sử dụng
Sau khi đã cài thành công rồi, mỗi lần file bạn bị lỗi, bạn sử dụng như sau:
Ctrl + Shift + P và Tìm kiếm PHP CS Fixer. Thậm chí bạn có thể nhìn thấy tổ hợp phím tắt của nó không, ấn luôn nếu bạn đang ở file lỗi đó cho ngầu như quả bầu :D (trường hợp này là **Ctrl + Alt + F**)
![](https://images.viblo.asia/1dd77972-0416-40e2-b70a-560d8f945ec6.png)

OK, cool ngầu nào
![](https://images.viblo.asia/09a62f3a-64c5-4551-9fdc-a16e49fbfc71.gif)

## Tích hợp cho PHP Storm
Cái này mình chưa thử, bạn có thể tham khảo tại link sau
https://www.jetbrains.com/help/phpstorm/using-php-cs-fixer.html

# Tổng kết
* Phần tích hợp phpcs và php-cs-fixer chỉ có thể cài và hoạt động trên các editor nếu như máy của bạn đã cài phpcs, php-cs-fixer ở dạng global (vì bản chất tích hợp vào editor cũng là chạy các lệnh thủ công thôi)
* Trong quá trình cài, nếu có lỗi, hãy đọc console của Sublime text 3 để fix nhé
 * **PHPCS** và **PHP-CS-Fixer** cho ta biết rằng các ngôn ngữ khác hoàn toàn cũng có các coding standards và cũng có auto fix tương tự, khi code với ngôn ngữ nào, bạn tìm kiếm thử xem nhé :D (JS có **Prettier** thì phải :3)