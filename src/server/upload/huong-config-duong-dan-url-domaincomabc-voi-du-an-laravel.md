# Mở đầu
Hôm nay mình sẽ giới thiệu đến các bạn một vấn đề mà mình thường hay gặp khi triển khai ứng dụng cho khách hàng. Thay vì url có dạng http://example.dev/ như bình thường thì khách hàng lại muốn http://example.dev/abc . Thật ra có rất nhiều cách để làm cái này nhưng tùy mỗi tình huống mình sẽ dùng những cách khác nhau. 
## Cấu trúc thư mục của Laravel
![](https://images.viblo.asia/3f74f65b-485f-4dfd-a93b-128656d43ac2.png)
Vì phạm vi bài này đang nói đến config url nên mình xin tập trung vào một vài folder và file sau:
+ **public**: Là  nới chứa file **index.php**, là nơi nhận các yêu cầu gởi đến ứng dụng và cấu hình **autoloading**. Ngoài ra đây là nơi chứa các images, Js, Css của hệ thống bạn. Bên trong file public thì khi triển khai bạn cần lưu ý đến file **.htaccess**. Nếu bạn đã từng làm việc với web thuần thì file này có mục đích là **Rewrite Url** ( tức là alias đường dẫn để tránh lộ đường dẫn file).
+ **server.php**: Mục đích của file này là build-in 1 web server bằng lệnh : `php artisan server` thì bạn đang thực thi file này nên nó thường được dùng ở phát triển mà không dùng ở production.

> Vậy mình sẽ config như thế nào? Theo như mình biết thì sẽ có 2 cách hay dùng đó là Thay thư mục public bằng thư mục abc hoặc Tạo đường dẫn thư mục public/abc. Nào chúng ta cùng tìm hiểu nào!
###  Thay thư mục public bằng thư mục abc
Đây là cách làm đơn giản chỉ cần bạn thay tên thư mục là xong.
Và ở file config domain (mình dùng appache nên nó như sau)
`sudo vim /etc/apache2/sites-enabled/abc.conf`

````
<VirtualHost *:80>
    DocumentRoot /var/www/html
    SetEnv HTTPS on
    ServerName example.dev
    ErrorLog /var/log/apache2/error_example.log
    CustomLog /var/log/apache2/access_example.log combined
    <Directory "/var/www/html">
        Options -Indexes
        AllowOverride All

        Order allow,deny
        allow from all
    </Directory>
</VirtualHost>

````
Các bạn có thấy là mình không có dẫn đến `/var/www/html/public` như bình thường mà chỉ đến `/var/www/html` vì như vậy thì khi bạn trỏ đến `http://example.dev/abc` thì web bạn mới chạy được (easy phải không :D)

> Nhưng nó chỉ thích hợp cho các dự án là API thuần không có view. Vì như các bạn biết `asset()` và `public_path()` điều bắt đầu từ public 

Vậy nếu các bạn muốn tưowng thích thì các bạn hãy ghi đè các function này [ tham khảo](https://stackoverflow.com/questions/32810231/add-public-to-asset-path-in-laravel)
Mình thì thấy các này cũng được nhưng ghi đè lại hàm của vendor thì mình lại không thích lắm :D

### Tạo đường dẫn thư mục public/abc
**Bước 1**:  Tạo đường dẫn **public/abc** và coppy toàn bộ vào folder này :D

![](https://images.viblo.asia/22eaecb5-41be-4835-854b-f4019a2862c8.png)

Ở đây bạn thấy có file .htaccess. 
- File ở `public/.htaccess` : 
````
RewriteEngine On
RewriteRule ^$ /abc [L]
````
=> cái này nó sẽ tự động chuyển đến `http://example.dev/abc` khi bạn truy cập  `http://example.dev/`

- File `public/abc/.htaccess` : mục đích củng chỉ là rewirte lại các url thôi :D
````
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    RewriteEngine On

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
</IfModule>

````
- File `server.php`:
````
<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(__DIR__.'/public/abc'.$uri)) {
    return false;
}

require_once __DIR__.'/public/abc/index.php';

````
## Kết luận
Hy vọng với cách làm này thì các bạn có thể triển khai dự án tốt hơn :D Hẹn gặp lại :D