# Coding convention
* Trước khi tìm hiểu xem PHP Code Sniffer là gì thì các bạn cần phải nắm được coding convention là gì đã.
* Coding convention là tập hợp những quy ước cụ thể khi viết code mà lập trình viên cần tuân theo. Việc tuân thủ những quy ước này sẽ giúp code dễ đọc, dễ quản lý.bảo trì, nâng cấp.
* Đối với các bạn sinh viên còn trên ghế nhà trường thì có lẽ khái niệm này còn khá mới mẻ, nhưng khi ra trường và bắt đầu làm việc tại các công ty thì việc tuân thủ coding convention sẽ là điều bắt buộc và khó có thể tránh khỏi.
* Tùy công ty sẽ có những quy chuẩn coding convention khác nhau nhưng hầu hết sẽ dựa trên các chuẩn phổ biến trên thế giới.
* Đối với PHP thì hiện nay có 2 chuẩn phổ biến nhất đó là PSR1 và PSR2. Để tìm hiểu kỹ về hai chuẩn này mọi người có thể truy cập link dưới, còn trong bài này mình xin phép không đề cập sâu.
    * PSR1: https://www.php-fig.org/psr/psr-1/
    * PSR2: https://www.php-fig.org/psr/psr-2/
#      PHP Code Sniffer
## PHP Code Sniffer là gì?
* PHP Code Sniffer (hay còn gọi là phpcs) là một cộng cụ phục vụ lập trình viên trong việc check các coding convention. Đó là lý do vì sao mình giới thiệu về coding convention trước.
* PHP Code Sniffer bao gồm 2 tập lệnh PHP:
    *  Tập lệnh `phpcs` là tập lệnh chính mã hóa các tệp PHP, Javascript, CSS để phát hiện các vi phạm coding convention.
    *  Tập lệnh  `phpcbf` để tự động sửa các phần code vi phạm tiêu chuẩn coding convention.
*  Đây là 1 công cụ phát triển thiết yếu để đảm bảo mã của bạn sạch sẽ, tuân thủ các coding convention mà bạn không phải mất thời gian rà soát lại code để check.
## Cài đặt
* Cách dễ nhất để cài đặt là tải các file PHAR bằng mỗi câu lệnh sau:
    ```
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
### Composer
* Nếu bạn dùng composer, bạn có thể cài đặt PHP Code Sniffer bằng câu lệnh sau:
    ```
    composer global require "squizlabs/php_codesniffer=*"
    ```
*   Hãy chắc chắn bạn có thư mục bin của composer. Giá trị mặc định là `~/.composer/vendor/bin/`, nhưng bạn có thể kiểm tra giá trị này bằng cách chạy lệnh:
    ```
    composer global config bin-dir --absolute
    ```
* Hoặc bạn có thể thêm PHP Code Sniffer trong file `composer.json` của bạn. Ví dụ :
    ```php
    {
        "require-dev": {
            "squizlabs/php_codesniffer": "3.*"
        }
    }
    ```
* Thế là bạn có thể chạy PHP Code Sniffer từ thư mục `vendor/bin` :
    ```
    ./vendor/bin/phpcs -h
    ./vendor/bin/phpcbf -h
    ```
### Git Clone
* Bạn cũng có thể tải xuống PHP Code Sniffer và chạy các lệnh `phpcs` và `phpcbf` bằng cách clone từ Git
    ```
    git clone https://github.com/squizlabs/PHP_CodeSniffer.git
    cd PHP_CodeSniffer
    php bin/phpcs -h
    php bin/phpcbf -h
    ``` 
##     Sử dụng
* Chuẩn PEAR là chuẩn mặc định mà PHP Code Sniffer dùng để kiểm tra. Để kiểm tra 1 file có tuân thủ chuẩn PEAR hay không, bạn chỉ cần chỉ định vị trí của file:
    ```
    phpcs /path/to/code/myfile.php
    ```
*    Hoặc nếu bạn muốn kiểm tra toàn bộ thư mục, bạn có thể chỉ định vị trí thư mục thay vì file:
```
    phpcs /path/to/code-directory
```
*  Còn nếu bạn muốn kiểm tra theo chuẩn khác, thì hãy sử dụng `--standard`:
    ```
    phpcs --standard=PSR2 /path/to/code-directory
    ```
*   Câu lệnh trên sẽ kiểm tra thư mục code của bạn theo chuẩn PSR2
## Ví dụ
* Ví dụ kết quả trả về khi thực hiện check 1 file theo chuẩn mặc định:
    ```
    $ phpcs /path/to/code/myfile.php

    FILE: /path/to/code/myfile.php
    --------------------------------------------------------------------------------
    FOUND 5 ERROR(S) AFFECTING 2 LINE(S)
    --------------------------------------------------------------------------------
      2 | ERROR | Missing file doc comment
     20 | ERROR | PHP keywords must be lowercase; expected "false" but found "FALSE"
     47 | ERROR | Line not indented correctly; expected 4 spaces but found 1
     51 | ERROR | Missing function doc comment
     88 | ERROR | Line not indented correctly; expected 9 spaces but found 6
    --------------------------------------------------------------------------------
    ```
*  Ví dụ kết quả trả về khi thực hiện check 1 thư mục theo chuẩn mặc định:
    ```
    $ phpcs /path/to/code

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

    FILE: /path/to/code/yourfile.php
    --------------------------------------------------------------------------------
    FOUND 1 ERROR(S) AND 1 WARNING(S) AFFECTING 1 LINE(S)
    --------------------------------------------------------------------------------
     21 | ERROR   | PHP keywords must be lowercase; expected "false" but found
        |         | "FALSE"
     21 | WARNING | Equals sign not aligned with surrounding assignments
    --------------------------------------------------------------------------------
    ```
#     Tài liệu tham khảo
* https://github.com/squizlabs/PHP_CodeSniffer