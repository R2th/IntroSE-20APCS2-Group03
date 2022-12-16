Tại sao ta phải tự tạo framework trong khi đã có vô số framework trên mạng? (yaoming)

Mục đích:
* Tìm hiểu thêm về kiến trúc của các framework hiện đại
* Để tự tạo faramework riêng tùy nhu cầu của bạn

Ưu điểm khi tự tạo fw:
* Tính linh hoạt
* Chỉ chọn những gì mình cần
* Quyết định mọi việc làm như thế nào

Từ khi composer ra đời cùng vơi vô vàn package việc xây dựng framework của chúng ta đã được rút ngắn kha khá.. "không nên làm lại một cái bánh xe" :laughing:

Tất cả những gì bạn cần là tải xuống tất cả các package cần thiết từ packagist và đặt chúng lại với nhau để làm cho hệ thống hoạt động... easy nhở (yaoming)

Sau đây là những kiến thức và những thứ cần để làm một framework cơ bản:
*  MVC
*  Composer
*  Front Controller
*  HTTP (Request/Response)
*  Routing
*  Database
*  Template Engine
*  Unit test

# MVC
Có quá nhiều bài viết nói về mô hình MVC rồi.. bài viết này chúng ta ko nói tới nó nữa nhé :)).. nếu chưa thì bạn tham khảo ở đây nhé [What is MVC? ](https://www.google.com/search?q=mvc+là+gì)

Bắt tay vào tạo thư mục nào:
![](https://images.viblo.asia/4eab4a64-a1a0-4a21-9b0b-72c42cbc155e.png)

Trong đó:
* App: nơi đặt Model và Controller của mô hình  MVC, toàn bộ chức năng chính của website sẽ đặt tại đây
* logs: ta sẽ đặt error log tại đây, khi có lỗi dễ dàng tra cứu
* public: Là nơi duy nhất trình duyệt và người dùng truy cập được, ta sẽ cấu hình để ngăn người dùng truy cập vào các thư mục quan trọng vì lý do bảo mật.
* vendor: Cũng là 1 thư mục chứa thư viện, nhưng đây là thư viện bên ngoài, được xây dựng sẵn từ cộng đồng, ta sẽ không chỉnh sửa gì trong này cả
* routes: điều hướng trang web
* views: nơi ta sẽ xây dựng giao diện phía người dùng

# Composer
[Composer](https://getcomposer.org/)  là trình quản lí dependency cho php. 

Với những ai chưa biết cách sử dụng composer => lướt qua đây để biết thêm chi tiết [Document composer](https://getcomposer.org/doc/)

Để sử dụng ta tạo mới một file composer.json trong thưc mục gốc của project. Đây là tập tin cấu hình của composer sẽ được sử dụng để cấu hình dự án của bạn và các dependency của nó. Nó phải là file JSON

Add the following content to the file:
```
{
    "name": "root/build_mvc",
    "require": {
        "nikic/fast-route": "^1.3",
        "symfony/http-foundation": "^4.3"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

Trong đó:

name : là tên của project

require: danh sách những package cần thiết cho dự án

autoload: tự động mapping load file cho dự án

để chạy composer ta chạy lênh `composer install` các thư viện sẽ được tải về và đặt trong thư mục `vendor`

# Front Controller
Front-Controller Pattern là một pattern thông dụng, quy ước là tất cả request PHP phải đi qua 1 file nào đó để tập trung xử lý các tiền xử lý, hậu xử lý trước khi điều hướng đến các controller/action tương ứng. Pattern này thường thấy ở hình thức tất cả các request đều đi qua file /index.php, ở đó sẽ có các xử lý chung như include thư viện, bootstrap hệ thống, tạo registry…

Khi bạn sử dụng Front-controller pattern thì việc Rewrite URL  sẽ thấy mọi việc trông đơn giản hơn nhiều.

Thay vì để file .htaccess lo việc rewrite, bạn hãy để cho PHP lo vụ này, khi đã vào PHP file, bạn sẽ rất thoải mái để rewrite kiểu gì cũng được, phân tích tha hồ bởi có nhiều trường hợp rewrite dùng PHP kèm với website của bạn mới hiệu quả. Do đó, nếu áp dụng pattern này thì file htaccess của bạn chỉ cần 1 dòng rewrite rule sau:

```
Options +FollowSymLinks
Options -Indexes
RewriteEngine on
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?route=$1 [L,QSA]
```


Để bắt đầu Front Controller pattern chúng ta tạo một file `index.php` đặt trong thư mục `public` để mọi request đều sử dụng file này và nó cũng là thư mục để ta cấu hình (document root) ở apache hoặc nginx.

Một số trường hợp thường hay đặt file index.php vào thư mục gốc của dự án chẳng hạn như `build_mvc`. Điều này là không nên, bạn cứ tưởng tưởng một ngày đẹp trời "hacker" thấy được tất cả source code của bạn thì.. có mà vỡ mồm :satisfied:

Vì vậy, thay vì làm điều đó, chúng ta nên tạo một thư mục trong thư mục dự án ở đây mình đặt tên là `public` nơi mà mọi client đều có thể "thấy" và set permisson những thư mục khác ngoài thư mục `public` chỉ có có user mới có quyền xem sửa

Nội dung file `index.php`
```php
<?php

require __DIR__ . '/../vendor/autoload.php';

require __DIR__ . '/../app/bootstrap.php';

```

file app/bootstrap.php
```php
<?php

echo 'Hello World!';

```

test nào.. trỏ tới thư mục `public` bật terminal sau đó chạy lệnh:

```
php -S localhost:8000
```

truy cập vào địa chỉ `localhost:8000` xem thành quả:

![](https://images.viblo.asia/a781ce8b-0ee8-4430-afa2-c6a7cb077941.png)

Part 2 to be continue...