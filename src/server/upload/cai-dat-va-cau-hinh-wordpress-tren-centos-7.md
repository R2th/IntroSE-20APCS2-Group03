![](https://images.viblo.asia/eb82447a-1ad8-42e5-87ee-6b01c1a1d42e.png)

Trong bài viết này, chúng ta hãy cùng tìm hiểu cách cài đặt WordPress trên hệ điều hành CentOS 7. Bài viết này dựa trên quá trình setup blog https://duongtiendat.com của mình
## WordPress là gì?
WordPress là một phần mềm nguồn mở  được viết bằng ngôn ngữ PHP và sử dụng hệ quản trị cơ sở dữ liệu MySQL; cũng là bộ đôi ngôn ngữ lập trình website thông dụng nhất hiện tại. WordPress được ra mắt lần đầu tiên vào ngày 27/5/2003 bởi tác giả Matt Mullenweg và Mike Little.

Fun fact:
* Trên thế giới, có khoảng 25 bài viết được đăng lên các website sử dụng WordPress mỗi giây.
* Số lượng website làm bằng WordPress chiếm 27% tổng số lượng website trên thế giới.
* Trong số 100% các website sử dụng mã nguồn CMS, WordPress chiếm 60%.
* Phiên bản WordPress 4.0 đạt hơn 16 triệu lượt tải chỉ sau khoảng hai tháng.
* WordPress đã được dịch sang 169 ngôn ngữ khác nhau, bao gồm phiên bản Tiếng Việt được dịch đầy đủ.
* Chỉ tính các giao diện (hay còn gọi là theme) miễn phí trên thư viện WordPress.org thì đã có hơn 2.700 themes khác nhau

## Chuẩn bị
* PHP (WordPress hiện nay có thể chạy trên phiên bản PHP 7.3)
* MySQL 5.6 hoặc MariaDB 10.0
* Web Server: Apache hoặc Nginx 

> :warning: Bài viết này mình sẽ sử dụng Nginx để setup. Nếu bạn chưa cài Nginx có thể làm theo hướng dẫn cài đặt Nginx của mình ở bài viết dưới đây:
> https://viblo.asia/p/cai-dat-va-cau-hinh-subdomain-tren-nginx-centos-7-vyDZOxjklwj

### PHP
Để cài đặt được WordPress chúng ta sẽ cần thêm một vài module khác của PHP. Nếu PHP của chưa có các module này hãy chạy dòng lệnh dưới đây để cài đặt:
```
sudo yum install php-cli php-fpm php-mysql php-json php-opcache php-mbstring php-xml php-gd php-curl
```
Ta sẽ config cho PHP fpm sử dụng Nginx, edit file `/etc/php-fpm.d/www.conf`
```
sudo nano /etc/php-fpm.d/www.conf
```
Mình sẽ sửa lại những dòng dưới đây
```
...
user = nginx
...
group = nginx
...
listen = /run/php-fpm/www.sock
...
listen.owner = nginx
listen.group = nginx
```
Cấp quyền root cho thư viện PHP
```
sudo chown -R root:nginx /var/lib/php
```
Bật và khởi động PHP fpm
```
sudo systemctl enable php-fpm
sudo systemctl start php-fpm
```
### MySQL
Tiếp theo, chúng ta sẽ thiết lập database và account cho database WordPress

Truy cập vào mysql
```
mysql -u root -p
```
```
// Tạo một database để lưu trữ dữ liệu trên Wordpress
mysql> CREATE DATABASE wordpress CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
// Tạo một account database cho WordPress và cấp quyền account đó
mysql> GRANT ALL ON wordpress.* TO 'wordpressuser'@'localhost' IDENTIFIED BY 'change-with-strong-password';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

Như vậy, khâu chuẩn bị trước khi cài đặt Wordpress của chúng ta đã hoàn tất
## Download WordPress
Trước khi download, mình sẽ tạo một thư mục chưa mã nguồn WordPress
```
sudo mkdir -p /var/www/html/duongtiendat.com
```
Bước tiếp theo, chúng ta sẽ tải phiên bản mới nhất của WordPress về
```
cd /tmp
wget https://wordpress.org/latest.tar.gz
```
Khi download xong, ta hãy giải nén và chuyển các file đó vào thư mục vừa tạo
```
tar xf latest.tar.gz
sudo mv /tmp/wordpress/* /var/www/html/duongtiendat.com/
```
Và hãy nhớ cấp quyền cho thư mục này luôn nhé
```
sudo chown -R nginx: /var/www/html/duongtiendat.com
```
## Cấu hình Nginx cho Website WordPress
Ở đây mình có sẵn domain [duongtiendat.com](https://duongtiendat.com) và sẽ config vào domain này
Trước tiên, mình sẽ tạo một file config có tên `duongtiendat.com.conf`
```
sudo nano /etc/nginx/conf.d/duongtiendat.com.conf
```
Nội dung file config
```
server {
        ## Your website name goes here.
        server_name duongtiendat.com;
        ## Your only path reference.
        root /var/www/html/duongtiendat.com/;
        ## This should be in your http block and if it is, it's not needed here.
        #index index.html;
        index index.php index.html;

        location = /favicon.ico {
                log_not_found off;
                access_log off;
        }

        location = /robots.txt {
                allow all;
                log_not_found off;
                access_log off;
        }

        location / {
                # This is cool because no php is touched for static content.
                # include the "?$args" part so non-default permalinks doesn't break when using query string
                try_files $uri $uri/ /index.php?$args;
        }

        location ~ \.php$ {
                #NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
                include fastcgi.conf;
                fastcgi_intercept_errors on;
                fastcgi_pass 127.0.0.1:9000;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
                expires max;
                log_not_found off;
        }
}
```
Sau khi đã save, ta kiểm tra trạng thái config nginx
```
sudo nginx -t
```
Nếu output successful, ta hãy restart nginx để apply config đó
```
sudo systemctl restart nginx
```
Để hoàn tất việc cài đặt, ta cần phải thiết lập một vài thông số trên Website

Nếu ở trên local bạn hãy truy cập vào http://localhost của máy

Ở đây mình sẽ truy cập vào domain của mình  [https://duongtiendat.com](https://duongtiendat.com)
Chọn ngôn ngữ cần dùng

![](https://images.viblo.asia/65b24005-cb59-4f99-ba11-89106ca3e8c9.jpg)
WordPress sẽ yêu cầu bạn cần nhập database name, account, host.... mà ta đã chuẩn bị ở bước đầu tiên

![](https://images.viblo.asia/62ceada8-bbb4-42a6-a098-b25b54b2af60.jpg)

![](https://images.viblo.asia/86a42734-a571-4d63-a132-bf82825aaad8.jpg)

Sau khi đã điền xong, ta chọn Run the Installation
![](https://images.viblo.asia/1e055714-0cc1-45c5-a21e-3408d084767c.jpg)

Và giờ công đoạn cuối cùng là tạo một account cho Website WordPress :sweat_smile:

![](https://images.viblo.asia/35d25590-20ab-4d9a-b2aa-52d9ffe0520b.jpg)

![](https://images.viblo.asia/70094ff8-d151-4581-93bf-fe51b52e699c.PNG)

![](https://images.viblo.asia/35b03f57-f794-4686-843e-e9ea2f0f6ed2.PNG)

Sau khi đã cài theme, tùy biến lại và up một vài post. Mình đã có một blog nho nhỏ  :sweat_smile: :sweat_smile:

https://duongtiendat.com

![](https://images.viblo.asia/3e6260f6-050c-4b8e-bce8-0bdd6d9ec3f0.PNG)
## Nguồn tham khảo
https://wordpress.org

https://thachpham.com/wordpress/wordpress-tutorials/wordpress-la-gi-va-gioi-thieu.html

https://linuxize.com/post/how-to-install-wordpress-with-nginx-on-centos-7/