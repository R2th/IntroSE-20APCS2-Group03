Chào mọi người , hôm nay mình lại đến tháng đây :)  Trong bài hôm nay mình sẽ hướng dẫn sử dụng laradock cho dự án laravel, đầu tiên chúng ta nói qua về laradock và tại sao lại dùng nó nhé ^ ^
#     Laradock là gì? 
Vừa mới đọc qua tên mọi người đã có thể ngờ ngờ ra được rồi đúng không,
> laradock = laravel + docker
> 
Tức là dùng docker để triển khai một dự án laravel, ai làm dev cũng đã từng nghe qua hoặc đã từng sử dụng docker rồi đúng không? và chắc chắn lập trình viên nào cũng thấy sự tiện lợi của nó trong lúc làm dự án. 
Sau một thời gian mình sử dụng thì mình có rút ra được một vài lý do nên dùng docker như sau:
    
1. Với sự hỗ trợ của docker, việc coding, testing, deploying trở nên đơn giản hơn.
2. Khả năng di động (portable): môi trường develop được dựng lên bằng docker có thể chuyển từ người này sang người khác mà không làm thay đổi cấu hình ở trong. Trong kỹ thuật, được gọi là provisioning.
3. Application-centric: docker được dùng trên nhiều môi trường, đặc biệt tương thích trên môi trường develop, hướng đến việc coding thuận tiện nhất.
4. Versioning: docker được tích hợp VCS-git, để tracking các dòng lệnh thiết lập, hay đánh dấu version.
5. Component re-use: nghĩa là docker có khả năng sử dụng lại resource trước đó, bằng cách đánh dấu những resources giống nhau bằng một mã ID. Các môi trường được dựng lên sau đó sẽ kiểm tra các mã ID trước đó, nếu trùng docker sẽ sử dụng lại.
6. Sharing: với Docker Hub (public registry), các developer có thể tìm và sử dụng các môi trường được dựng sẵn.

Nó còn rất nhiều lý do nên dùng nữa nhưng như thế này là đủ để mình mầy mò vọc vẹc nó rồi phải không :)))
  
Ok không dài dòng nữa, mình bắt tay vào cài đặt luôn nhé
##    Install Laradock
Nghe install thì nghe có vẻ kinh khủng lắm nhưng thực ra chỉ là lên git tải source của nó về thôi mà hehe :D
```js
git clone https://github.com/laradock/laradock.git
```
Khi tải về  rồi thì chúng ra review qua nó 1 tý nhé, trong thư mục laradock có rất nhiều thứ mà nó đã làm sẵn cho ta như:
+ Proxy server: nginx, apache, caddy ...
+ DB: Mysql, mariadb, mongo, postgre ...
+ Workspace: Đã cài đặt sẵn PHP, là nơi mà các bạn có thể chạy các câu lệnh của php artisan. Để lựa chọn phiên bản php, sửa biến PHP_VERSION trong file env. Hơn nữa, bạn có thể thay đổi các lựa chọn trong file .env để cài đặt các gói vào trong workspace container, tiêu biểu như composer và npm. Việc này giúp bạn không cần phải cài đặt những gói đó lên máy tính của mình, việc cài đặt sẽ trong container và bạn cần phải exec vào trong workspace để chạy những lệnh đó. Tùy thuộc vào nhu cầu sử dụng mà các bạn có thể bật nó lên.

Nếu như không có laradock thì đa số các dev thường tạo những dockerfile tự tạo image hoặc tải nhưng image có sẵn trên mạng rồi, nhưng như thế chúng ta lại mất thời gian config, rồi tìm tòi đúng không, lớ ngớ config ko đúng khéo còn làm mất nhiều thời gian hơn ấy ,

Laradock hiểu được điều đó, nên nó đã tạo cho chúng ta rất nhiều thứ, chạy được nhiều môi trường, nhiều ngôn ngữ khác nhau mà không cần phải config dài dòng
Các bạn có thể thấy số lượng service mà laradock cung cấp là khá nhiều. Bản thân mình cũng chưa bao giờ xài hết tất cả các container này của laradock nhưng nếu bạn có nhu cầu thì cứ việc start container lên mà tận hưởng thôi.


-----


## B1. Tạo file .env

Sau khi tải về và review thành công , giờ thì chúng ta tạo 1 file .env bằng cách copy từ thằng env-example nhé!
```
cp env-example .env
```
Tại file .env này chính là nơi config các biến, các đường dẫn cho các container, khi config xong xuôi mình chỉ cần câu lệnh:
```
sudo docker-compose up -d [services]
```
-d để chạy background nhé, nhưng lần đầu thì mọi người không cần -d nhé, để xem nó chạy như thế nào, lỗi ở đâu thì còn biết.

## B2. Config
### Thay đổi đường dẫn mặc định của code

Mặc định, code sẽ được để ngoài thư mục laradock, một site thì không sao, nhưng với nhiều site, bạn sẽ có 1 mớ hổ lốn folder bên ngoài đấy. Gói gọn nó vào 1 folder web thôi.
Vào file .env, chỉnh biến:
> APP_CODE_PATH_HOST=../web

Lúc này thì pull code laravel vào trong thư mục web thôi.

### Đổi đường dẫn chứa data
Thay đổi đường dẫn chứa data ở biến DATA_PATH_HOST nếu bạn có nhu cầu. Đây sẽ là nơi chứa data của mariadb.

### Chỉnh phiên bản php
PHP_VERSION=7.2 là mặc định. Bạn có thể chọn các phiên bản khác (7.2 - 7.1 - 7.0 - 5.6)

### Thay đổi cấu hình mariadb
```PHP
MARIADB_DATABASE=default
MARIADB_USER=root
MARIADB_PASSWORD=secret
MARIADB_PORT=3306
MARIADB_ROOT_PASSWORD=root
MARIADB_ENTRYPOINT_INITDB=./mariadb/docker-entrypoint-initdb.d
```

5 biến đầu cũng không có gì nhiều để giải thích. `MARIADB_ENTRYPOINT_INITDB` là nơi chứa file sql mà khi khởi tạo mariadb thì sẽ chạy file sql đó. Nếu bạn có file sql để khởi tạo lúc đầu thì copy vào thư mục `mariadb/docker-entrypoint-initdb.d`. Bạn có thể thay đổi các thông số trên nếu muốn.
## B3. Tạo file laravue.conf
Ta cd vào thư mục nginx.sites nhé.

Thư mục nginx/sites đã có sẵn file default.conf mà bạn có thể dùng luôn cho 1 dự án laravel. 
Ta sẽ chỉnh sửa vài chỗ để mọi thứ có thể chạy ngon lành.

+ Thay các chỗ default_server bằng laravue.local.dev (hay bất kỳ tên nào bạn muốn)
+ Thêm 2 dòng để ghi log truy cập và log lỗi của nginx
+ Để nginx có thể tìm đúng thư mục code, ta điều chỉnh mục root trỏ vào thư mục của code.
Sau đây là ví dụ của file demo.conf hoàn chỉnh:
```php
server {

    # listen 81 default_server;
    # listen [::]:81 default_server ipv6only=on;

    listen 80;

    server_name laravue.local.dev;
    root /var/www/laravue/public;
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

    error_log /var/log/nginx/laravue_error.log;
    access_log /var/log/nginx/laravue_access.log;
}
```
## B4. Thêm server_name vào file /etc/hosts dưới máy local
Bạn cần có quyền root để ghi được file này nhé, thôi thì cứ dùng:
```
sudo nano /ect/hosts
```
cho nhanh nhé :v 
Thêm dòng sau dưới dòng localhost  nhé:
```php
  127.0.0.1      laravue.local.dev
```
Ok xong rồi đúng không, giờ chỉ cẩn trở về đúng thư mục laradock rồi chạy:
```php
docker-compose up -d nginx mariadb adminer workspace
```
Nhớ ghi cụ thể service muốn start lên, nếu không là nó start lên tất cả đó, rồi ok giờ làm cốc cafe rồi nhìn nó tải nhé, phê lắm đấy =))

Cài đặt xong hàng họ nó sẽ như thế này

![](https://images.viblo.asia/7d5bfab8-2654-47b6-99a3-ff2c0e802438.png)

## B5 Truy cập vào workspace
Sau khi đã chạy ngon rồi, mình cần phải chạy các câu lệnh cần thiết như `composer install`, `php artisan key:genarate` đúng không, thế thì chỉ cần exec vào workspace để chạy là được.
```php
sudo docker-compose exec --user=laradock workspace bash
```
Bạn sẽ thấy mình đang ở trong địa chỉ /var/www của workspace, user là laradock. Địa chỉ này sẽ được "volume" ra ngoài thư mục web, tức là mọi thay đổi bạn làm trong /var/www của workspace sẽ thay đổi ở thư mục web bên ngoài.

Tiếp theo cd vào thư mục laravue của mình (cái này là dự án mình đặt tên là laravue nhé, còn của mọi người thì tùy cách đặt tên lúc clone ở thu mục web nhé)
copy file .env.example thành .env cp .env.example .env
Thay đổi nội dung của database:
```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```
thành
```php
DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=default
DB_USERNAME=root
DB_PASSWORD=root
```
DB_DATABASE nó tự tạo khi chạy container mariadb, (nó tránh trường hợp mọi người chưa tạo db trong container mariabd từ trước nhé, còn nếu tạo từ trước rôi thì mình thay bằng db của mình thôi)
rồi ok giờ chạy những thứ mà cần thiết để chạy project laravue như ở máy tính bình thường của mọi người nhé, sau khi cài đặt xong, mọi chạy server_name đã config trong nginx nhé, của mình lên hình rồi nè :) 
![](https://images.viblo.asia/fb62666a-f497-4831-92a5-c7c54dccf866.png)
## B6 Truy cập database bằng Mysql-workbench
Sau khi cài đặt xong , mình truy cập vào db bằng IPAddress của container mariadb nhé, check IPAddress bằng câu lệnh
```php
    sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' Container_Id_laradock_mariadb_1
```

   sau đó mở mysql-workbench connect to `laradock_mariadb_1 Container` với các config sau nhé 
```php
    Host = IPAddress of laradock_mariadb_1 container (ex: 172.0.0.0)
    Port = 3306
    Username = root
    Password = root
```
sau khi lên hình nó sẽ như thế này 
![](https://images.viblo.asia/3fe0255c-edfc-42e1-b6d2-f58693a4c8e6.png)
# Kết Luận

Các bạn đã thấy nó tiện lợi chưa , giờ đã có laradoc các dev có thể làm việc nhanh hơn, team work dễ dàng hơn bởi vì môi trường như nhau, không phải cài cắm gì nữa, không lo sai version hay cái gì nữa hehe
Bài này thế thôi, sang bài sau mình sẽ hướng dẫn các bạn fetch https cho môi trường local, tuy chỉ là hàng china nhưng mà nhìn cũng ra gì phết đấy, ==)))
Tham khảo:
+ https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0
+  https://techtalk.vn/blog/posts/docker-la-gi
+  https://fullstackstation.com/docker-la-gi/