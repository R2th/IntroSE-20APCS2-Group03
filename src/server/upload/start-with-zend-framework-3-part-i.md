Xin chào các bạn, PHP là ngôn ngữ lập trình web khổ biến nhất hiện nay, chính vì thế mà các framework hỗ trợ cũng không ngừng tăng lên. Trong bài viết lần này mình xin giới thiệu một framework khá hay được sử dụng tương đối phổ biến đó là Zend Framework.
* [How to create new module in Zend Framework 3 (Part II)](https://viblo.asia/p/how-to-create-new-module-in-zend-framework-3-part-ii-ByEZky1o5Q0)
# Giới thiệu
* Zend Framework  là một PHP  Framework mã nguồn mở được xây dựng và phát triển bởi các chuyên gia PHP hàng đầu . 
* Zend Framework  được viết theo chuẩn một mô hình MVC  và 100% hướng đối tượng toàn diện và sử dụng nhiều tính năng mới có trong các phiên bản PHP như namspace, late static binding, lambda và closures. 
* Với một bộ thư viện hỗ trợ đồ sộ và đầy đủ, các developer có thể dễ dàng sử dụng các module có sẵn để xây dựng nhanh chóng một hệ thống website trong một thời gian ngắn.
* Zend Framework là một trong những thư viện PHP được đánh giá là đầy đủ nhất hiện nay và đang được các công ty lớn trong lĩnh vực CNTT trên thế giới ưu chuộng vì ZF rất linh hoạt, bảo mật tốt, cộng đồng rộng lớn, phát triển rất nhanh.
* Một số component được sử dụng phổ biến nhất của Zend Framework, bao gồm Zend_Controller, Zend_Layout, Zend_Config, Zend_Db, Zend_Db_Table và Zend_Registry và Views Helper.
# Cài đặt Zend Skeleton Application
## Cài đặt
* Zend Framework là bộ khung chứa rất nhiều thư viện sử dụng nhiều khái niệm mới, nhiều mô hình lập trình khác nhau, nên trước khi học về ZF bạn cần lưu ý đã học qua các đơn vị kiến thức sau:PHP, HTML, CSS, Bootstrap, OOP, MVC,... 
* Như đã biết Zend Framework (ZF) có rất nhiều thành phần, tùy cách phối hợp giữa các thành phần đó để tạo nên ứng dụng riêng, trong đó Zend Skeleton Application như là một ứng dụng khung của ZF, là một mẫu chuẩn ứng dụng.
* Để học ZF cách tốt là bắt đầu cài đặt và tìm hiểu về Zend Skeleton vì nó chứa các thành phần cơ bản, đơn giản của ZF nhằm mục đích tạo ra một website
* Để cài đặt một ứng dụng Zend bạn có thể làm theo cách cách sau:
    * Clone từ github : [Tại đây](https://github.com/zendframework/ZendSkeletonApplication) , sau khi clone về bạn vào thư mục của dự án và chạy : `composer install ` 
    * Cài đặt thông qua composer :` composer create-project -s dev zendframework/skeleton-application path/to/zend-demo` 
        * Khi cài đặt sẽ xuất hiện câu hỏi sau:

        ```
        Do you want a minimal install (no optional packages)? Y/n?
        ```
        * Nếu bạn chọn "n" nó sẽ bỏ qua việc cài đặt các package và dừng lại ngay, khi đó sẽ không có một số package sẵn được cài đặt,nhưng đừng lo sau này cần đến bạn có thể cài đặt sau.
        * Nếu bạn chọn "y" nó sẽ tiếp tục hỏi
        ```
        Would you like to install the developer toolbar? y/N?
        
        Would you like to install caching support? y/N?
        
        Would you like to install database support (installs zend-db)? y/N?
        
        Would you like to install forms support (installs zend-form)? y/N
        
        
        ```
        * Các bạn có thể chọ "y" hoặc "n" để cài các package.

##  Web Servers
* Có 4 cách để thiết lập web server :
    * Thông qua PHP built-in web server.
    * Thông qua Vagrant.
    * Thông qua docker-compose.
    * Thông qua Apache.
### Sử dụng thông qua Built-in PHP web Server
* Mở teminal vào thư mục gốc của dự án và chạy câu lệnh sau :
```php 
php -S 0.0.0.0:8080 -t public public/index.php
```
* Sau đó truy cập `http://localhost:8080` or `http://<your-local-IP>:8080` giao diện như sau xuất hiện có nghĩa là bạn đã cài đặt thành công ứng dụng.

![](https://images.viblo.asia/c0bb997d-d6b8-4d49-b278-fa3d9f501f0c.png)
### Sử dụng thông qua Vagrant
* Có thể coi Vagrant như là một máy ảo, ở đó cung cấp một môi trường phát triển nhất quán, phù hợp với làm việc nhóm.
*  The skeleton application cung cấp a Vagrantfile dựa trên Ubuntu 14.04 và sử dụng PPA ondrej / php để cung cấp PHP 7.0
*  Chạy câu lệnh sau để bắt đầu sử dụng:
    ```
     $ vagrant up
    ```
*    Khi đã được built và chạy, bạn có thể chạy composer từ máy ảo Vagrant
        ```php
        $ vagrant ssh -c 'composer install'
        
        hoặc
        
        $ vagrant ssh -c 'composer update'
        ```
*  Sau đó truy cập `http://localhost:8080` or `http://<your-local-IP>:8080`
###  Sử dụng thông qua docker-compose
* **Docker** được coi như một thùng chứa. Nó là một sự thay thế cho các máy ảo, vì nó chạy như một lớp trên cùng  của môi trường máy chủ.
* **Docker-compose** là một công cụ để tự động cấu hình của các container và kết hợp các phụ thuộc giữa chúng
* Để thực hiện built một image đầu tiên thực hiện:
```
$ docker-compose up -d --build
```
* Sau đó truy cập `http://localhost:8080` or `http://<your-local-IP>:8080`
### Sử dụng thông qua  Apache Web Server
* Ở đây mặc định bạn đã cài đặt Apache rồi.
* Thiết lập virtual host thường được thực hiện trong phạm vi httpd.conf hoặc thêm / httpd-vhosts.conf.
* Nếu bạn đang sử dụng httpd-vhosts.conf, hãy đảm bảo rằng tệp này được bao gồm bởi tệp httpd.conf chính của bạn.
*  Một số bản phân phối Linux (ví dụ: Ubuntu) gói Apache để các tệp cấu hình được lưu trữ trong / etc / apache2 và tạo một tệp cho mỗi virtual host bên trong thư mục` / etc / apache2 / site-enable`.
*   Trong trường hợp này, bạn sẽ đặt virtual host bên dưới vào tệp:` /etc/apache2/sites-enabled/zend-demo.`
    ```
    <VirtualHost *:80>
        ServerName zend-demo.localhost
        DocumentRoot /path/to/zend-demo/public
        SetEnv APPLICATION_ENV "development"
        <Directory /path/to/zend-demo/public>
            DirectoryIndex index.php
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>
    ```
* Đảm bảo rằng bạn cập nhật `/ etc / hosts` hoặc `c: \ windows \ system32 \ driver \ etc \ hosts` để tệp `zend-demo.localhost` is mapped to 127.0.0.1. Sau đó có thể truy cập `http://zend-demo.localhost`.
* Tiếp theo khởi động lại Apache.
* Nếu bạn thực hiện đúng nó sẽ hiển thị trang web như hình ảnh ở phần sử dụng thông qua Built-in PHP web Server.
* Để kiểm tra xem tệp .htaccess của bạn có hoạt động không, hãy điều hướng đến http: //zend-demo.localhost/1234 và bạn sẽ thấy trang 404 như đã lưu ý trước đó. 
* Nếu bạn thấy lỗi Apache 404 tiêu chuẩn, thì bạn cần sửa lỗi sử dụng .htaccess trước khi tiếp tục.
* Nếu bạn đang sử dụng IIS với Mô-đun Viết lại URL, hãy nhập như sau:
    ```
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [NC,L]
    ```
# Cấu trúc thư mục của Skeleton ZF
* Sau khi cài đặt và cấu hình web server thành công, giờ chúng ta sẽ tìm hiểu về cấu trúc thư mục của Skeleton ZF.
* Zend Framework tùy biến cấu trúc thư mục tự do, tuy nhiên hãy theo nguyên tắc phổ biến đưa ra bởi chương trình khung. Bạn mở thư mục dự án ra, và cơ bản nó tổ chức như hình:

     ![](https://images.viblo.asia/2759c8b7-6c4c-48bc-9524-c613db8472eb.png)
*  Cấu trúc thư mục gồm những phần sau:
    * **config** : chứa các file thiết lập của Website
    * **data** : nơi lưu dữ liệu (ví dụ cache, files ...)
    * **module** : chứa các module ứng dụng (các module mà bạn dùng ZF tạo ra, cơ bản code PHP ứng dụng của bạn ở đây)
    * **public** : lưu trữ những file thường xuyên truy cập bởi người dùng, như css, img, js trong thư mục con:
        * css
        * js
        * img
        * fonts
    *    **vendor** : thư viện dùng bởi Website, đó là các Dependence (thành phần bên thứ 3 bạn dùng tới, các thành phần này được tải về theo cấu hình của composer.json)
# Kết luận
* Trong bài viết này mình đã hướng dẫn các bạn cài đặt thành công một ứng dụng zend cơ bản, ở những bài sau mình sẽ nói về các tạo ra các module riêng.
* Tham khảo : 
    * https://docs.zendframework.com 
    * https://xuanthulab.net/cai-dat-zend-framework-chuong-trinh-dau-tien.html