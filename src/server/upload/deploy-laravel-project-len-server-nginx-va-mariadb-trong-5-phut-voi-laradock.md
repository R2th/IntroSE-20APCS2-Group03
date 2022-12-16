Hôm nay mình sẽ tiếp tục gửi đến các bạn bài viết về cách Deploy một dự án Laravel lên một server mới và bạn cần setup tất cả môi trường cần thiết cho việc khởi chạy dự án trơn tru ngay lần đầu tiên. Thông thường công việc sẽ có rất nhiều thứ cần phải làm và lệnh cài đặt, tuy nhiên các bạn đã làm quen với những bài viết trước đây của mình về Laradock chắc hẳn đã có sẵn câu trả lời cho vấn đề này rồi. Tuy nhiên phải làm sao để công việc này có thể hoàn tất nhanh hơn mà chỉ mất 5 phút , bạn hãy theo dõi trong bài viết này để setup server NGINX và MariaDB với Laradock nhé.

### 1. Chuẩn bị Laradock và cấu hình Container

Đầu tiên bạn cần phải cài đặt sẵn Docker và có phần template của file cấu hình các container cần thiết.

Rất đơn giản bạn hãy pull source của laradock trên github về:

`git clone https://github.com/laradock/laradock.git`

Như vậy bạn đã có toàn bộ cấu hình của tất cả các service cũng như môi trường để phát triển dự án PHP rồi đó, lúc này tùy thuộc vào nhu cầu riêng mà bạn lựa chọn từng cấu hình phù hợp mà thôi. Nhìn chung sẽ không có sự phức tạp nếu như bạn đã từng cấu hình nó một cách thủ công trước đây.

*(Hình ảnh sau khi pull Laradock)*

![](https://images.viblo.asia/bfbf51dc-17bc-4b8c-b61f-d42f5010068c.png)

Thông tin về cấu hình cần biết:

Với những folder tách biệt trong cấu trúc thư mục **laradock** bạn tải về đã phân chia theo từng loại cấu hình riêng, ví dụ:

1. nginx, apache, caddy : môi trường server cần phát triển

2. Mysql, mariadb, mongo, postgre: Loại database mà project sử dụng. Bạn cần dùng loại nào sẽ click vào đó để thiết lập cấu hình cần thiết.

3. Workspace: Nơi để cài đặt php và chạy các câu lệnh **php artisan** Trong workspace container có các service mà khi bạn chuyển sang trạng thái true nó sẽ tiến hành cài đặt lên vì vậy nếu cần thiết bạn hãy sử dụng nó .

Ví dụ về workspace :

![](https://images.viblo.asia/828faad0-31eb-4580-b9a2-910dee4dbdb2.png)


4. PHP_INTERPRETER:  service **php-fpm** này là mặc định hoặc dùng **hhvm**

5. PHP_VERSION=7.3 : Đây là phiên bản php bạn sẽ sử dụng , tuy nhiên có thể thay đổi theo ý thích của bạn.

Ngoài ra còn rất nhiều thứ để bạn có thể tìm tòi và bật config lên thử , tuy nhiên với nhu cầu chung của laravel project thì không cần phải bật hết lên làm gì.

Tiếp đến đổi tên file **.env-example** thành **.env** hiện tại mình đang sử dụng PHP Storm rất tiện cho việc edit text.

### 2. Config cho Laravel project 

Trước hết hãy cho toàn bộ source code chính của bạn vào project laradock ban đầu bạn kéo code về đó.

**Notice: **

Theo kinh nghiệm của mình để tiện cho việc quản lý nhiều source code laravel bạn hãy tạo ra 1 thư mục chung là **backend** hoặc **frontend** tùy theo loại project đó của bạn làm về gì. 
Sau đó cho tất cả chúng vào đó, rồi đặt tên project rõ ràng. Để sau này bạn muốn có nhiều site hoặc nhiều server nó cũng dễ dàng.

Ở đây mình chọn là **frontend** vì nó là web ui example thôi mà.

Sau đó bạn lấy source code về nhé, ở đây mình dùng tạm source chung của laravel example :

`git clone https://github.com/laravel/laravel.git web-example`

(Hình ảnh minh họa) 

![](https://images.viblo.asia/d6262f3d-7b14-4f57-8629-8f85190eb81f.png)

Vậy bạn hãy đổi đường dẫn đến source code như sau:

`APP_CODE_PATH_HOST=../frontend`

### 3. Cấu hình MariaDB 

Mặc định sẽ như này:

```
### MARIADB ###############################################

MARIADB_VERSION=latest
MARIADB_DATABASE=default
MARIADB_USER=default
MARIADB_PASSWORD=secret
MARIADB_PORT=3306
MARIADB_ROOT_PASSWORD=root
MARIADB_ENTRYPOINT_INITDB=./mariadb/docker-entrypoint-initdb.d
```

Chúng ta quan tâm thêm tham số: **MARIADB_ENTRYPOINT_INITDB**

Đây là sự chỉ định khởi tạo mariadb với file sql ban đầu, thường dùng khi back-up server sau này. Hoặc di chuyển server.

Bạn hãy để file db của bạn vào thư mục : *./mariadb/docker-entrypoint-initdb.d*

![](https://images.viblo.asia/6361ca35-80af-42de-8655-465097ff2420.png)

- Tiếp đến hãy tạo config cho site web-example

Bạn hãy truy cập vào folder **nginx/sites** để định nghĩa cho site của bạn, việc tách biệt nhiều site rất quan trọng nên hãy copy từ file default thành tên file config tương ứng.

Ở đây mình để **web-example.conf**

Bạn edit file như sau:

```
server {

    listen 80 web-example;
    listen [::]:80 web-example ipv6only=on;

    # For https
    # listen 443 ssl default_server;
    # listen [::]:443 ssl default_server ipv6only=on;
    # ssl_certificate /etc/nginx/ssl/default.crt;
    # ssl_certificate_key /etc/nginx/ssl/default.key;

    server_name web-example.com;
    root /var/www/web-example/public;
    index index.php index.html index.htm;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

    error_log /var/log/nginx/web-example_error.log debug;
    access_log /var/log/nginx/web-example_access.log;
}
```

SẮP XONG RỒI ĐÓ BẠN

Có bạn thực hiện việc cài đặt này trên máy local cũng không sao, để test trước được bạn cần định nghĩa thêm config trong file **hosts**.

Hãy truy cập tới : `/etc/hosts`

Thêm dòng sau: `web-example.com 127.0.0.1`

- Chỉnh sửa config .env cho `web-example`. Lúc trước bạn config cho toàn bộ project rồi giờ thay đổi config cho từng project.
- Hãy vào đường dẫn của web-example để đổi tên **.env.example** thành **.env** 

Và sửa phần connect db như sau :

```
DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=${MARIADB_DATABASE}
DB_USERNAME=${MARIADB_USER}
DB_PASSWORD=${MARIADB_PASSWORD}
```

Bây giờ đã đến lúc start service lên rồi :

`docker-compose up -d nginx mariadb adminer workspace`

**Notice :**

Cần ghi rõ service nào cần bật lên để tránh việc nó chạy tất cả.

Sau đó hãy dành thời gian pha trà, trả lời tin nhắn của nyc v.v. Đôi khi câu lệnh này sẽ tốn thời gian đến 15p.

Và mọi thứ đã xong, hãy chạy câu lệnh sau để nó lấy các package cần thiết về cho laravel:

`docker-compose exec --user=laradock workspace bash`

Tiếp đến là : `composer install`

`php artisan key:generate`
`php artisan migrate`

Sau khi tạo ra các table trong DB xong là công việc hoàn tất rồi. Mở trình duyệt và gõ : `web-example.com`

*(Kết quả như hình)*

![](https://images.viblo.asia/30323487-b560-4c11-945e-e8f5c03b1dc2.png)

### 4. Tổng kết

Bài viết trên đây chia sẻ về cách deploy project Laravel trên môi trường NGINX và MariaDB, với từng bước làm chi tiết các bạn có thể tự mình chạy thử và deploy thành công dự án hiện tại của mình một cách thuần thục. Mong rằng bài viết hữu ích cho những ai đang cần sử dụng Laradock để đem lại tốc độ nhanh hơn trong công việc, với cách làm này bạn hoàn toàn có thể xử lý được nhiều project cùng lúc trên nhiều server khác nhau. Hẹn gặp lại các bạn trong bài viết tiếp theo nha!