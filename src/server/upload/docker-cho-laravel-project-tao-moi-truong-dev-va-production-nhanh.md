Trước khi bắt đầu 1 project cho Website sử dụng Laravel, PHP hay build App service ... Chúng ta cần xây dựng môi trường server cho các trạng thái của project như Dev hay Production, Stagging .... Điều này làm tốn khá nhiều thời gian mà trong lúc "hưng phấn" không thể nhớ nổi mình đã chạy những lệnh gì mà giờ con server lăn ra chết, đây là một trắc trở cho anh em khi tìm kiếm giải pháp khắc phục sau này. Chưa kể việc quản lý nhiều server theo cách thông thường cũng đau não chứ không đơn giản phải không nào.

Ok vậy thì làm thế nào khắc phục những vấn đề trên ngay từ khi chúng ta bắt đầu, nếu như bạn đang áp dụng Docker cho Laravel thuần thục thì chắc chắn bài viết này chỉ cần đọc cho vui nhưng nếu bạn đang tìm giải pháp tốt hơn cho vấn đề của mình đã nêu thì chúng ta cùng nhau đi tiếp nha :D

### 1. Khởi tạo Laravel project 

Chúng ta cần có 1 Laravel project cho dù là project trống cũng không sao hoặc demo nhỏ của bạn đang viết đều được hết.

Đơn giản nhất là anh em kéo source của Laravel về con server là được nhé.

À đến đây bạn không có server thì stop luôn sao? :D Bạn hãy cài luôn trên máy local của mình nha :wink:

Bạn hay create project bằng lệnh composer phải không ? Nhưng hôm nay chúng ta đang tìm hiểu về Docker thì với vài trò của nó cho project cũng gần như của composer với Laravel vậy.
Composer thì install các thư viện cần thiết để dùng còn Docker thì tạo ra môi trường để Laravel có thể chạy được.

Bạn kéo thẳng code của Laravel về nhé:

`curl -L https://github.com/laravel/laravel/archive/v8.5.9.tar.gz | tar xz`

Nhớ trỏ tới folder riêng để test nhé.

Bây giờ đổi tên folder laravel-8.5.9 thành project của bạn.

Mình đổi thành LaraVN như hình dưới:


![](https://images.viblo.asia/2f2eabef-1986-4eba-baee-b0d7aae60499.png)


### 2. Cài đặt Docker


Setup Repository:

```
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

Thêm Key GPG của Docker vào:

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

Kiểm tra lại xem đã được verified chưa:

`sudo apt-key fingerprint 0EBFCD88`

```
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

INSTALL DOCKER ENGINE

```
 $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Sau khi hoàn tất việc cài đặt bạn có thể chạy thử lệnh docker --version để xem phiên bản mình đang dùng và nó đã chính xác chưa:

`Docker version 20.10.2, build 2291f61`

Ok như vậy là bạn đã cài xong Docker Engine rồi.


**Bước tiếp theo: Cài Docker Compose**

Sử dụng bản mới nhất theo command sau :

`sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`


Cấp quyền cho thư mục chứa docker-compose vừa cài đặt :

`sudo chmod +x /usr/local/bin/docker-compose`

Tương tự chạy lệnh kiểm tra version đã cài đặt:

`docker-compose version 1.27.4, build 40524192`

Như vậy là quá trình cài đặt Docker trên máy Local hay Server đã hoàn tất!

### 3. Cài đặt thư viện cho Laravel

Thông thường sẽ chạy lệnh `composer install` phải không bạn ?

Nhưng giờ đây composer đã có đâu. Ok nếu bạn gõ lệnh composer install do quen tay mà vẫn chạy được là do "ăn gian" nha.

Theo đúng phần 1 ở trên là Local hay server đều Fresh chưa có gì nhé :D

Cũng khá đơn giản thôi bạn, vì chúng tương tự nhau thôi. Thay vì chạy trực tiếp composer thì nó sẽ tạo ra 1 container, tiếp đến chính container này sẽ chạy lệnh composer install vào thư mục trên máy và thực thi nó cho project laravel.

`sudo docker run --rm -v $(pwd):/app composer/composer install`

Rất đơn giản phải không nào. *(Xem hình dưới - Kết quả sau khi chạy với docker)*

![](https://images.viblo.asia/9e8f25f6-b32d-4a3d-afd9-da1b61d2a523.png)

**Kết quả:**

Bạn sẽ thấy xuất hiện thư mục vendor giống như việc chạy bằng composer install.

### 4. Dùng docker để khởi tạo môi trường thuận tiện hơn



**Chuẩn bị:** Tạo mới 4 file sau 

**docker-compose.yml** : Định nghĩa tất cả các service môi trường sẽ được cho trong này

**app.dockerfile**: service app cho docker compose ở file .yml

**web.dockerfile**: web service cho compose ở trên

**vhost.conf**: chứa config cho web service 

Thử 1 chút nhé :D 

- Cài đặt service php7.2- fpm bằng docker

**Bước 1:** Thêm định nghĩa sau vào file docker-compose.yml

```
version: '3'

services:

# The Application

app:

build:

context: ./

dockerfile: app.dockerfile

working_dir: /var/www

volumes:

- ./:/var/www/

# The Web Server

web:

build:

context: ./

dockerfile: web.dockerfile

working_dir: /var/www

ports:

- 8080:80
```


**Bước 2:** Thêm vào trong file app.dockerfile

Là các command cài đặt service bạn cần

```
FROM php:7.2-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev \

mysql-client libmagickwand-dev --no-install-recommends \

&& pecl install imagick \

&& docker-php-ext-enable imagick \

&& docker-php-ext-install mcrypt pdo_mysql
```

**Bước 3:** Định nghĩa web service trong file **web.dockerfile**

```
FROM nginx:1.10.3

ADD vhost.conf /etc/nginx/conf.d/default.conf
```

**Bước 4:** Cấu hình nginx cho server trong file **vhost.conf**

```
server {

listen 80;

index index.php index.html;

root /var/www/public;

location / {

try_files $uri /index.php?$args;

}

location ~ \.php$ {

fastcgi_split_path_info ^(. \.php)(/. )$;

fastcgi_pass app:9000;

fastcgi_index index.php;

include fastcgi_params;

fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

fastcgi_param PATH_INFO $fastcgi_path_info;

sendfile off;

}

}
```

**Xong phần setup cho service FPM rồi đó.**

Bây giờ chúng ta cài thêm MYSQL cho server phải không nào ?

Chỉ việc khai báo thêm vào file **docker-compose.yml** là xong

`docker-compose.yml`

```
# The Database

database:

image: mysql:5.6

volumes:

- dbdata:/var/lib/mysql

environment:

- "MYSQL_DATABASE=homestead"

- "MYSQL_USER=homestead"

- "MYSQL_PASSWORD=secret"

- "MYSQL_ROOT_PASSWORD=secret"

ports:

- "33061:3306"

volumes:

dbdata:
```

Cuối cùng bạn chạy lệnh : `docker-compose up`

Và chờ đợi quá trình setup hoàn tất. Truy cập vào domain hay localhost trên browser để xem kết quả nhé.

Từ giờ trở đi bạn muốn cài môi trường cho bao nhiêu con server giống nhau thì copy nguyên 4 file trên vào thư mục project và chạy 1 lệnh duy nhất là : `docker-compose up`

Ở các môi trường khác nhau như production hay development có khác nhau về domain bạn chỉ cần thay trong file vhost.conf là được rồi. Thêm hay bớt service nào thì bạn chỉnh sửa trong file **docker-compose.yml**

Như vậy rất tiện phải không nào :D

### 5. Tổng kết 

Với bài chia sẻ trên đây mong muốn những bạn đang cần nâng cao tốc độ cài đặt môi trường khi đang phải làm việc nhiều server , môi trường web, app có nhiều chồng chéo nhau sẽ tìm ra giải pháp hiệu quả. Rất mong ai đó sẽ tìm thấy sự hữu ích từ bài viết và nếu có bổ sung hay chia sẻ gì bạn để lại comment phía dưới cho mình và mọi người cùng biết nhé. Happy Coding - New Year 2021 :1234: