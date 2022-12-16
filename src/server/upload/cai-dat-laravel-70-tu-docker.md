##### Chuẩn bị
* docker
* php:7.4-fpm

##### Source code
Trong default.conf thiết lập đường dẫn đọc source dự án

Sửa lại file Dockerfile để cài thêm các thư viện ngoài từ image php-fpm
```go
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd
```

```php
server {
    listen 80;
     root /var/www/html/e_learning/public;
 ...
```
Trong thư mực html, cài đặt Laravel bằng compose như sau:

VScode - Terminal:
```bash
cd html
composer create-project --prefer-dist laravel/laravel:^7.0 e_learning
```

##### VScode - Terminal:
``` shell
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```
##### Web
http://localhost/

##### Kiểm tra kết nối cơ sở dữ liệu
Edit file .env
```python
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=user
DB_PASSWORD=password
````

##### VScode - Terminal:
```bash
php artisan migrate
```
#### Phpmyadmin check

![image.png](https://images.viblo.asia/5a25e67e-9972-4bb7-ae04-58cbe747f736.png)

#### Cleanup
php artisan migrate:reset