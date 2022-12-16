### Nếu bạn dùng Nginx, xem [Hướng dẫn deploy project PHP lên VPS sử dụng nginx, php-fpm tại đây](https://vantien.net/lap-trinh/deploy-project-php-len-vps-su-dung-nginx-php-fpm/)
### 
# Mở đầu
Khi hoàn thành một project thì công việc cuối cùng và quan trọng nhất chính là deploy(đại loại như là triển khai lên môi trường thực tế). Với những project mang tính chất học tập thì bạn có thể deploy lên các server miễn phí(như [Heroku](https://www.heroku.com/)). Tuy nhiên vì miễn phí nên nó tồn tại nhiều vấn đề. Chính vì vậy hôm nay mình sẽ hướng dẫn các bạn cách deploy một project Laravel lên VPS Ubuntu.

### VPS là gì?
**VPS (Virtual Private Server)** là dạng máy chủ ảo được tạo ra bằng phương pháp phân chia một máy chủ vật lý thành nhiều máy chủ khác nhau có tính năng tương tự như máy chủ riêng (dedicated server), chạy dưới dạng chia sẻ tài nguyên từ máy chủ vật lý ban đầu đó. Mỗi VPS là một hệ thống hoàn toàn riêng biệt, có một phần CPU riêng, dung lượng RAM riêng, dung lượng ổ HDD riêng, địa chỉ IP riêng và hệ điều hành riêng, người dùng có toàn quyền quản lý root và có thể restart lại hệ thống bất cứ lúc nào.
Ở đây mình dùng VPS với hệ điều hành Ubuntu, RAM 1Gb và Server tại Tokyo:
![](https://images.viblo.asia/47e88399-ab3e-4d15-ad99-f75d2f89d7a3.png)

### VPS lấy ở đâu?
Vì 'hịn' như vậy nên đa phần VPS các bạn phải mua. Có một số nhà cung cấp nổi tiếng trên thế giới mà mình biết là:
- https://www.vultr.com/
- https://digitalocean.com/

Một số nhà cung cấp tại Việt Nam bạn có thể tham khảo như: Viettel, LongVan, NhanHoa,...

# Hướng dẫn deploy
### Đăng nhập
Khi đăng ký VPS xong bạn sẽ được cấp một số thông tin cơ bản dùng để đăng nhập:
* Địa chỉ IP
* Username
* Password

Trên Windows bạn có thể dùng [Putty](https://www.putty.org/) để điều khiển VPS, còn Ubuntu thì chúng ta dùng luôn SSH trên Terminal nhé.
Các bạn dùng lệnh: `ssh username@ip` sau đó nhập password để đăng nhập.
![](https://images.viblo.asia/83229573-6eb7-4c17-a489-4994e4560ffa.png)

### Cài đặt Apache
Sau khi có VPS chúng cần cài đặt môi trường Apache(các bạn cũng có thể dùng Nginx).

Update:
`apt-get update`

Cài đặt Apache:
`apt-get install apache2`

Sau khi cài đặt bạn có thể start và enable Apache bằng cách:

```
systemctl start apache2
systemctl enable apache2
```

### Cài đặt PHP

Thêm PHP vào khi PPA:

`add-apt-repository ppa:ondrej/php`

Update:

`apt-get update`

Chạy lệnh sau để cài PHP 7.2 và các extension cần thiết:

```
apt install php7.2 php7.2-xml php7.2-mbstring php7.2-mysql php7.2-json php7.2-curl php7.2-cli php7.2-common php7.1-mcrypt php7.2-gd libapache2-mod-php7.2 php7.2-zip
```

### Cài đặt Composer và install Laravel

**Composer**

```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/bin/composer
```

**Install Laravel**

Các bạn dùng composer để cài hoặc có thể dùng Git để clone source code vào đường dẫn: **/var/www/html**

`composer create-project laravel/laravel /var/www/html/laravel`

### Cài đặt DocumentRoot

Mở file config của Apache:

`nano /etc/apache2/sites-available/000-default.conf`

Tìm dòng sau:

`DocumentRoot /var/www/html`

Thay thế bằng:

`DocumentRoot /var/www/html/laravel/public`

Sau đó lưu lại rồi restart lại Apache nhé:

`systemctl restart apache2`

### Chỉnh Permission cho project:

```
chown -R www-data:www-data /var/www/html/laravel

chmod -R 755 /var/www/html/laravel/storage
```

### Cài MySQL

Chạy lệnh sau:

```
apt-get install mysql-server
```

Sau đó nhập password:

![](https://images.viblo.asia/04911e3a-c76c-477d-a9f6-5b5a97ca1980.png)

Đăng nhập MySQL với password ở trên:

```
mysql -u root -p
```

![](https://images.viblo.asia/965e4aa3-a213-421a-9bae-b7d40aaf4caf.png)

Thêm database bằng query sau:

```
CREATE DATABASE laravel_test;
```
![](https://images.viblo.asia/428d8cc1-5dfd-4b32-8287-5ed6d6509d08.png)

### Cấu hình .env cho project để connect MySQL:

Sửa file bằng cách:

`nano /var/www/html/laravel/.env`

Sau đó cấu hình giống như dưới local:

![](https://images.viblo.asia/8a46eaa1-c75b-4f11-8635-3f1cd214a0e3.png)

### Tận hưởng:

Truy cập và tận hưởng bằng cách truy cập vào: IP của VPS
![](https://images.viblo.asia/ad0d6dc7-615b-4cba-aea1-9da0098b0c8e.png)

# Kết thúc
Trên đây là toàn bộ các bước để deploy project Laravel lên VPS dùng hệ điều hành Ubuntu. Bài viết có gì sai sót mong mọi người bỏ quá cho. :D



Nguồn: https://vantien.net/huong-dan/huong-dan-deploy-project-laravel-len-vps-ubuntu/

Tham khảo
- [Hugeserver](https://www.hugeserver.com/kb/install-laravel5-php7-apache-ubuntu16/)
- [Bitfumes](https://bitfumes.com/blog/server/connect-to-database)