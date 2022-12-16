Vào một ngày đẹp trời, bạn tiến hành deploy hệ thống đang sử dụng framework Laravel lên server và phải mất vài phút để **composer tải về** tất cả những **package** bạn đã cài đặt vào project của mình, bạn nghĩ việc này **khá mất thời gian** và muốn cải thiện chúng. Hay chỉ đơn giản bạn mở file composer.json lên và muốn tìm hiểu sự khác biệt giữa các package nằm trong khối **require** và **require-dev** hay tìm hiểu sự khác nhau giữa việc tải về package có sử dụng hậu tố **--dev** và không sử dụng hậu tố 🙄
```json:composer.json
    "require": {
        "php": "^7.3|^8.0",
        "fruitcake/laravel-cors": "^2.0",
        "guzzlehttp/guzzle": "^7.3",
        "laravel/framework": "^8.54",
        "laravel/sanctum": "^2.11",
        "laravel/tinker": "^2.5"
    },
    "require-dev": {
        "facade/ignition": "^2.5",
        "fakerphp/faker": "^1.9.1",
        "laravel/sail": "^1.0.1",
        "mockery/mockery": "^1.4.2",
        "nunomaduro/collision": "^5.0",
        "phpunit/phpunit": "^9.3.3"
    }

```
# 1. Môi trường phát triển
Khi phát triển một phần mềm nói chung, chúng ta luôn cần ít nhất 2-3 môi trường khác nhau phục vụ cho quá trình phát triển phần mềm, tùy thuộc vào quy mô dự án và cách tổ chức của **Project Manager**. Thông thường sẽ có những môi trường sau 
- ***Local Development: Môi trường dành cho Developer phát triển(Code, Selftest)***
- ***Staging: Môi trường cho Dev và QA kiểm thử các tính năng đã phát triển, nếu là dự án làm với khách hàng, cũng có thể là nơi khách hàng kiểm thử.***

- ***Production: Môi trường nơi mà người dùng sẽ truy cập vào hệ thống sau quá trình phát triển và kiểm thử***

Như mình nói ban đầu, đây không phải là một mô hình chuẩn cho tất cả các project, ví dụ như nhiều dự án sử dụng đến 4 môi trường để phân tách giữa khách hàng kiểm thử và team phát triển kiểm thử(***Local Development, Development(Team phát triển kiểm thử), Staging(Khách hàng kiểm thử), Production***). Tuy nhiên, về cơ bản thì sẽ có môi trường thử nghiệm và môi trường thật, nơi mà bạn không được phép thực hiện cách hành vi test.
![](https://images.viblo.asia/6c6c6818-86f5-4c2c-bf8e-bd403c1d3d4a.png)    

 
# 2. Dependencies ở các môi trường

Việc hiểu về các môi trường phát triển giúp bạn sẽ có cái nhìn đúng đắn với trong việc cài đặt các **dependencies** trong project của mình. Ví dụ bạn cần cài thêm package **debugbar** để phục vụ cho việc debug của mình trong quá trình phát triển chẳng hạn.

```shell
composer require barryvdh/laravel-debugbar
```
Bạn sử dụng câu lệnh này để tải về package về project của bạn rồi tiến hành config bình thường, bạn thấy nó đã được khai báo trong composer.json và nằm trong section của require. Mọi thứ có ổn, khi deploy lên các môi trường khác nhau(**Dev, Staging, Production**) bạn chỉ cần chạy **composer install**.


***Khoan !!! Bạn nghĩ lại xem mình có thực sự cần cài debugbar trên môi trường production không 🤭🤔 Đương nhiên là không rồi đúng không nào, debugbar chỉ phục vụ trong quá trình phát triển, khi cài nó nên môi trường Production bạn có để làm lộ các thông tin quan trọng trong file .env như Key AWS ...***

Vậy làm sao để cài đặt package trên chỉ ở môi trường **dev và staging**? Bạn chỉ cần thêm hậu tố **--dev**

```shell
composer require barryvdh/laravel-debugbar --dev
```
 Lúc đó thay vì package nằm trong khối **require** của file **composer.json** thì nó làm trong khối **require-dev**.
# 3. Mục đích sử dụng của package
```
composer require #Tên_Package 
// Or
composer require #Tên_Package --dev
```
Đọc đến đây rồi thì bạn đã đâu đó hiểu được cách làm sao để cài đặt một package chỉ phục vụ trên môi trường dev và staging nhưng không khả dụng trên production rồi đúng không nào.

Tuy nhiên khi quyết định cài đặt một package thì làm sau để quyết định nó nằm trong khối nào? **require** hay **require-dev**. ***Rất đơn giản, bạn hãy nghĩ về mục đích sử dụng của package để quyết định xem nó thuộc về môi trường production hay thuộc về môi trường test***.

* ***Khối require(Môi trường production): Các package liên quan đến việc vận hành của project. Ví dụ như thanh toán, convert ngày giờ ...***
* ***Khối require-dev(Môi trường develop, Staging): Các package liên quan đến việc phát triển(phpcs, phpcodesniffer, phpunit), setup môi trường(sail), debug(debugbar) và những package có tiềm ẩn những lỗ hổng bảo mật***

Như vậy, trên môi trường **Development & Staging** để cài đặt tất cả các package nằm trong khối **require** và **require-dev** bạn chỉ cần chạy ***composer install***. Khi bạn cài đặt trên môi trường **Production**, bạn chỉ mong muốn cài đặt các package nằm trong khối require. Bạn nên chạy với lệnh ***composer install --no-dev***.


# 4. Tổng kết

Qua bài viết bạn đã hiểu thêm về cách để cài đặt package sao cho đúng với mục đích sử dụng. Để đảm bảo chúng ta không phải đợi chờ quá lâu trong các trường hợp không cần thiết.

Trong file composer.json chúng ta có thể phân biệt được khối 
* ***require: Các package cần cài đặt thiết để đảm bảo tất cả các tính năng trong project đều chạy được***.
* ***requrire-dev: Cách package cần cài đặt trong môi trường staging, development để kiểm thử, phục vụ nhu cầu phát triển***.

Chúng ta cũng phân biệt được trong các môi trường khác nhau nên chạy những câu lệnh composer khác nhau
* ***Môi trường Developer & Staging: composer install (Install tất cả package được khai báo trong khối require và require-dev của file composer.json)***
* ***Môi trường Production: composer install --no-dev(Chỉ install package được khai báo trong khối require)***

Chúng ta cũng biết được cách cài đặt package vào từng khối sao cho phù hợp với từng môi trường
* ***require: composer require #Tênpackage***
* ***requrire-dev: composer require #Tênpackage --dev***

### Lưu ý:
Khi cài đặt các package, các bạn nên sử dụng tính năng [auto discovery](https://laravel-news.com/package-auto-discovery) để tránh lỗi liên quan đến việc load các class **ServiceProvider**. Ví dụ nếu các bạn cài đặt **Debugbar** không sử dụng **auto-discovery**, khi đó bạn phải khai báo thủ công trong config/app.php

```php:config/app.php
Barryvdh\Debugbar\ServiceProvider::class,
```

Khi bạn deploy trên **production**, bạn chạy ***composer install --no-dev*** nó chỉ install những package nằm trong khối **require**. Vì vậy app của bạn sẽ không load class  Debugbar đã đăng kí trong **config/app.php** dẫn tới die ứng dụng.

Cảm ơn các bạn đã theo dõi bài viết. Nếu thấy bài viết hữu ích, vui lòng ***upvote*** và ***bookmark*** để tác giả có nhiều động lực ra bài thường xuyên.

#### Chúc các bạn code vui, khỏe, giải trí !!!