# I. Giới thiệu

MongoDB là hệ quản trị CSDL NoSQL phổ biến nhất trên thế giới. Tuy nhiên mặc định Laravel PHP Framework lại không hỗ trợ MongoDB. Vì vậy trong tutorial này, VinaSupport.com sẽ hướng dẫn các bạn cài đặt và tích hợp MongoDB vào project Laravel.

# II. Cài đặt và sử dụng

## 1. MongoDB là gì?

MongoDB là hệ quản trị CSDL NoSQL (Document Database), nơi bạn có thể thực hiện các truy vấn (query), có khả năng mở rộng, mềm dẻo và đặc biệt là miễn phí.

* Phát triển bơi MongoDB Inc.
* Phát hành lần đầu: 11/02/2009
* Phiên bản mới nhất: 4.0.10 / 31/052019
* Repository: github.com/mongodb/mongo
* Ngôn ngữ lập trình: C++, Go, JavaScript, Python
* Hỗ trợ OS: Windows Vista and later, Linux, OS X 10.7 and later, Solaris, FreeBSD
* Website www.mongodb.com

## 2. Cài đặt MongoDB trên Ubuntu

Để cài đặt MongoDB cần 1 máy chủ đã cài sẵn HDH Ubuntu (Ubuntu Desktop hoặc Ubuntu Server), các bạn có thể cài trên local hoặc sử dụng dịch vụ Vultr Cloud VPS mà mình đang sử dụng.

Các bước cài đặt được thực hiện bằng command như sau:

### Bước 1: Import “MongoDB public GPG Key” sử dụng command apt-key

```php
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

### Bước 2: Thêm repo của MongoDB

Với Ubuntu 16.04 LTS:

```php
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

Với Ubuntu 18.04 LTS:

```php
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
```

Để biết phiên bản Ubuntu bạn đang sử dụng là gì thì hay chạy lệnh: lsb_release -dc

### Bước 3: Cập nhật lại packages

```php
sudo apt-get update
```

### Bước 4: Cài đặt MongoDB

Cài bản mới nhất:

```php
sudo apt-get install -y mongodb-org
```

Cài đặt 1 phiên bản bất kỳ:

```php
sudo apt-get install -y mongodb-org=4.0.10 mongodb-org-server=4.0.10 mongodb-org-shell=4.0.10 mongodb-org-mongos=4.0.10 mongodb-org-tools=4.0.10
```

### Bước 5: Khởi động MongoDB

```php
sudo service mongod start
```

Kiểm tra MongoDB đã được cài đặt thành công chưa?

```php
sudo service mongod status
```

![](https://images.viblo.asia/aa601188-5782-4561-8227-fc862cf31ac0.PNG)

## 3. Kết nối và quản lý MongoDB với Robo 3T

Robo 3T (formerly Robomongo) là một phần mềm MongoDB Client GUI chạy trên cả Windows, Linux và MacOS, các bạn có thể download miễn phí ở đây.

Sau khi cài đặt xong, mở Robo 3T lên và tạo 1 kết nối:

![](https://images.viblo.asia/af251420-cf89-4031-a47a-84745acf32fd.PNG)

Trường hợp tạo kết nối trên localhost thì mặc định không phải làm gì cả, Address các bạn để là localhost. Còn trường hợp kết nối từ xa (remote connect) thì phải phải sửa file /etc/mongod.conf như bên dưới để bind tới địa chỉ IP là 0.0.0.0

![](https://images.viblo.asia/8eb48985-b704-4e68-a444-9829f4bef774.PNG)

# III. Cài đặt MongoDB PHP Extension

Để cài đặt mongodb Extension cho PHP, chúng ta sử dụng command sau:

```php
sudo /opt/lampp/bin/pecl install mongodb
```

Sau đó thêm dòng sau vào file php.ini và restart lại httpd

```php
extension=mongodb.so
```

Cài đặt package jenssegers/mongodb cho Laravel
Đâu là thư viện giúp cho Laravel có thể thao tác với MongoDB. Cài đặt thông qua Composer

```php
composer require jenssegers/mongodb
```

![](https://images.viblo.asia/5ac0ba24-ba72-4d20-8c53-d80b24363121.PNG)

Sửa file config/app.php thêm MongoServiceProvider

```php
Jenssegers\Mongodb\MongodbServiceProvider::class,
```

Thêm kết nối vào file config/database.php

```php
'mongodb' => [
    'driver' => 'mongodb',
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', 27017),
    'database' => env('DB_DATABASE', 'homestead'),
    'username' => env('DB_USERNAME', 'homestead'),
    'password' => env('DB_PASSWORD', 'secret'),
    'options' => [
        // here you can pass more settings to the Mongo Driver Manager
        // see https://www.php.net/manual/en/mongodb-driver-manager.construct.php under "Uri Options" for a list of complete parameters that you can use
        'database' => env('DB_AUTHENTICATION_DATABASE', 'admin'), // required with Mongo 3+
    ],
],
```

Chú ý: Trên Ubuntu 16.04 fix lỗi

![](https://images.viblo.asia/438d8358-dd2c-4c02-933b-1cde6f8f793f.png)

Sử dụng các command sau đây để fix lỗi này

```php
strings /opt/lampp/lib/libstdc++.so.6 | grep CXXABI
locate libstdc++.so.6
strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep CXXABI
sudo ln -s /usr/lib/x86_64-linux-gnu/libstdc++.so.6 /opt/lampp/lib/libstdc++.so.6
```

# IV. Kết luận.

Như vậy mình đã giới thiệu xong cách cài MongoDB với Laravel.

Link tham khảo. https://vinasupport.com/cai-dat-va-su-dung-mongodb-voi-laravel/