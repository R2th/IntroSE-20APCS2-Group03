![](https://images.viblo.asia/5e6a33ab-6814-4071-92be-116521b81015.jpg)


Bạn đang muốn xây dựng môi trường cho Laravel project hiện tại của bạn trên server mới và cần cài đặt Nginx và MongoDB trong thời gian nhanh nhất có thể chứ? Thông thường thì nhiều bạn sẽ nói không cần phải gấp quá đâu, mình có thể làm từ từ cũng được. Điều ấy hoàn toàn đúng khi bạn đang chạy 1 project với 1 server.

Nhưng khi bạn đang quản lý nhiều server và project khác nhau thì thời gian dành cho việc deploy hay vãn cảnh và tỉ tê nó sẽ không còn nhiều nữa. :sweat_smile: Tất nhiên mình cũng không khuyến khích phải làm thao tác quá nhanh khi chúng ta mới bắt đầu và bài viết này dành cho các bạn đã có kinh nghiệm xử lý với Laradock rồi nha. Nếu bạn đang muốn tìm hiểu các ưu thế và cách sử dụng Laradock từ cơ bản có thể tham khảo đọc qua bài viết này, mình nói chi tiết để dễ tiếp cận hơn nhé [Cách sử dụng Laradock Dễ Dàng](https://viblo.asia/p/dung-laradock-de-dang-trong-laravel-project-Qbq5QaAE5D8)

Bây giờ chúng ta sẽ bắt tay xây dựng em Server ngon lành cho môi trường Laravel cài đặt Nginx và MongoDB :point_down:

### 1. Cài đặt Docker và Docker Compose

**a. Docker**

Hiện tại mình đang sử dụng Docker version:

`Docker version 20.10.2, build 2291f61`

Câu lệnh cài đặt:

```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

Thêm Key GPG của Docker vào:

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

Tiếp chạy lệnh install:

```
 $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

**b. Docker Compose:**

Mình đang dùng version:

`docker-compose version 1.27.4, build 40524192`

Lệnh cài đặt bạn chạy như sau :

`sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`

Gắn quyền cho folder cài đặt :

`sudo chmod +x /usr/local/bin/docker-compose`

Tiếp đến chúng qua bước số 2 nhé

### 2. Cài đặt Nginx và MongoDB


Trước tiên bạn cần tạo 2 biến môi trường trong file **.env** 

```
PHP_FPM_INSTALL_MONGO=true
WORKSPACE_INSTALL_MONGO=true
```

Phần setting Nginx:

```
### NGINX #################################################

NGINX_HOST_HTTP_PORT=80
NGINX_HOST_HTTPS_PORT=443
NGINX_HOST_LOG_PATH=./logs/nginx/
NGINX_SITES_PATH=./nginx/sites/
NGINX_PHP_UPSTREAM_CONTAINER=php-fpm
NGINX_PHP_UPSTREAM_PORT=9000
NGINX_SSL_PATH=./nginx/ssl/
```

Đặt port cho MongoDB là : **27017**

```
### MONGODB ###############################################

MONGODB_PORT=27017
```


Bạn chạy lệnh dưới đây để build chúng lên:

`docker-compose build nginx mongo`

*(Hình ảnh quá trình Build)*

![](https://images.viblo.asia/e11610ba-cede-409e-8045-b4887e647846.jpg)



Tiếp đến bạn chạy lệnh sau để nó launch môi trường:

`docker-compose up -d nginx mongo`

*(Xem ảnh quá trình Launcher)*

![](https://images.viblo.asia/d14c1cf7-5ba8-46b7-80d0-55b0554ef1c3.jpg)



Tiếp đến bạn cần cài đặt Driver cho MongoDB, mình thường dùng **jenssegers/mongodb** Rất đơn giản như sau:

Bạn chạy lệnh sau nó sẽ cài đặt :

`docker-composer exec workspace bash`

Chỉnh sửa phần config cho **database.php** thông tin đúng với project của bạn (database và pass bạn tự nhập nhé)

```
// modified content
    'connections' =>[
        // ------ add to -------
        'mongodb' =>[
            'driver' =>'mongodb',
            'host' =>env('DB_HOST','localhost'),
            'port' =>env('DB_PORT', 27017),
            'database' =>env('DB_DATABASE','sample_db'),
            'username' =>env('DB_USERNAME','root'),
            'password' =>env('DB_PASSWORD'),
            'options' =>[
                'database' =>``,
            ]
        ],
        // -------------------
        'sqlite' =>[
```

Edit trong file **.env** cho phần thông tin database này :

```
DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=sample_db
DB_USERNAME=root
DB_PASSWORD=
```

Xong rồi bạn chỉ việc chạy lệnh sau để cài driver :

`composer require jenssegers/mongodb`

Thêm service provider trong file *config/app.php*

`Jenssegers\Mongodb\MongodbServiceProvider::class,`

Như vậy đã XONG , bạn hãy thử tạo database trên mongoDB và create table xem nó kết nối đã OK chưa như sau :

`$docker-compose exec mongo bash`
```
# mongo
>use sample_db
>db.test.insert({phonecompany:'hoge', model:'fuga', price: 10});
```

Rồi tiếp đến chạy lệnh **migrate** db nhé 

`php artisan migrate`

Như vậy là quá trình setup Server cho Laravel Project của bạn đã hoàn tất! Rất nhanh phải không nào? Nếu bạn đã quen và có sẵn Docker và Docker compose rồi thì sẽ không phải cài đặt lại, quá trình này sẽ còn nhanh hơn nữa.

### 3. Tổng Kết

Trên đây là các bước thực hiện việc xây dựng Server cài đặt Nginx và MongoDB chỉ trong 5 phút với Laradock. Hy vọng bài viết này mang lại sự hữu ích cho các bạn cần dựng nhanh môi trường để test hoặc deploy production. Nếu bạn có cách làm nhanh hơn hoặc có chút vướng mắc hãy để lại comment để mình và mọi người chia sẻ nhé. :grinning: