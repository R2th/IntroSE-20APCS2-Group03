# 1. Giới thiệu
Ở phần trước của series về docker chúng ta đã tìm hiểu về những kiến thức cơ bản về docker, cách để viết Dockerfile, build một image, run một container..., các bạn có thể đọc lại bài viết [tại đây](https://viblo.asia/p/docker-va-nhung-dieu-can-biet-XL6lAVjR5ek).  Trong bài hôm nay chúng ta sẽ tìm hiểu về docker-compose, một công cụ không thể thiếu của những người dùng docker.

Docker compose được hiểu đơn giản là một công cụ dùng để liên kết các container lại với nhau. Ví dụ một project laravel thì các bạn phải run nhiều container khác nhau như là php, mysql, nginx, phpmyadmin chẳng hạn thì khi đó điều chúng ta cần là kết nối các container lại với nhau và docker compose là công cụ giúp bạn thực hiện điều đó.

Các bạn có thể cài đặt docker-compose theo như trên documents của trang docker hoặc nếu là linux thì có thể cài đặt theo các câu lệnh dưới đây:
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```shell
sudo chmod +x /usr/local/bin/docker-compose
```
Sau khi chạy hai lệnh trên thì có thể chạy lệnh dưới để kiểm tra xem đã cài đặt thành công chưa và version bao nhiêu.
```shell
docker-compose --version
```
Và đây là output nhận được
```
docker-compose version 1.29.2
```
# 2. Bài toán và xác định hướng đi
Bài toán đặt ra là chúng ta cần có những gì để có thể chạy được một project laravel bằng docker.

Để chạy được một project laravel thì chúng ta phải sử dụng một container php, một container database ở bài này mình sử dụng mysql, và một container webserver có thể là apache hoặc nginx trong bài này thì mình sử dụng nginx. Ngoài ra các bạn có thể sử dụng thêm container phpmyadmin để quản lý cơ sở dữ liệu trên giao diện. Phía dưới là các container và các image mình chọn, các bạn có thể tùy thuộc vào phiên bản laravel bạn muốn sử mà chọn phiên bản php, ở đây mình đều sử dụng những image gần như là mới nhất trên dockerhub.

* PHP: php:8.1-fpm-alpine
* Mysql: mysql:8.0.29-oracle
* Nginx: nginx:stable
* Phpmyadmin: phpmyadmin/phpmyadmin:latest

Cấu trúc thư mục của project như sau
```
├── laravel
├── mysql
├── nginx
├── docker-compose.yml
```
# 3. Viết docker compose và dockerfile
Trong file docker-compose.yml chúng ta sẽ khai báo các services và thông tin cần thiết, sau đó tiến hành viết cho từng services một.
```yml
version: '3'

services:
  nginx:

  php:
  
  mysql:
  
  phpmyadmin:
  
```

Chúng ta cùng bắt đầu với từng services thôi nào.
### Nginx

```yml
  nginx:
    image: 'nginx:stable'
    ports:
      - "8080:80"
    volumes:
      - ./laravel:/var/www/html
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
```

* **Image** là nơi khai báo image sử dụng cho services và như đã nói ở trên thì nginx sử dụng image `nginx:stable`.
* **Ports** là nơi khai báo các cổng để maping với nhau, ví dụ như ở trên chúng đa đang map cổng 8080 ở máy host (máy thật) tới cổng 80 của container (máy ảo). Khi truy cập vào cổng 8080 thì nó sẽ được maping à trỏ tới cổng 80 của container.
* **Volumes** là nơi khai báo các điểm kết nối để chia sẻ dữ liệu với nhau giữa máy thật và máy ảo. Ở trên thì chúng ta đã kết nối folder laravel của máy thật vào trong folder var/www/html của máy ảo, chia sẻ file config của nginx tới máy ảo.

Như ở trên đã nói thì chúng ta cần phải viết một file config có tên là default.conf trong thư mục nginx và mount nó tới máy ảo. Phần này thì các bạn có thể search trên google theo format `config nginx laravel docker` hoặc làm theo mình như dưới dây. Một vài điểm cần lưu ý khi cấu hình là đường dẫn thư mục root, fastcgi_pass và port listen để điều chỉnh sao cho phù hợp với 
```
server {
    listen 80;
    index index.php index.html;
    server_name localhost;
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/html/public;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
}
```

### PHP
```yml
  php:
    build:
      context: ./laravel
      dockerfile: Dockerfile
    volumes:
      - ./laravel:/var/www/html
    ports:
      - "9000:9000"
```
Đối với service php thì chúng ta sẽ phải sử dụng Dockerfile để build vì chúng ta cần cài đặt thêm compose và extension để kết nối với mysql. Ở trên chúng ta sử dụng build với context là folder laravel và sau khi build xong thì chúng ta cũng sẽ kết nối source code của laravel vào trong máy ảo thông qua volume. Dưới đây là Dockerfile của php:
```dockerfile
FROM php:8.1-fpm-alpine
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```
Chúng ta build một image từ image `php:8.1-fpm-alpine` sau đó cài đặt các extension và composer.
### Mysql
```yml
  mysql:
    image: mysql:8.0.29-oracle
    ports:
      - "3307:3306"
    volumes:
      - ./mysql:/var/lib/mysql
    environment: 
      MYSQL_DATABASE: laravel
      MYSQL_USER: pocadi
      MYSQL_PASSWORD: pocadi123
      MYSQL_ROOT_PASSWORD: pocadi123
```
Đối với mysql thì cần lưu ý tới ports để tránh kết nối phải port đã được sử dụng trên máy thật. Các bạn có thể xem các port đã được sử dụng trên máy và tránh ra, ở đây mình dùng port 3307 để tránh port 3306 hay dùng mysql trên máy thật. Và cũng như các service khác thì chúng ta cũng kết nối và chia sẻ dữ liệu giữa máy ảo và máy thật. Ở trên mình có đề cập tới cấu trúc thư mục thì có một folder là mysql, đó là nơi để lưu trữ dữ liệu ở máy thật. Khi các container bị tắt đi và bật lại thì dữ liệu ở đó sẽ được kết nối và chia sẻ tới máy ảo để sử dụng, tránh trường hợp tắt container là mất hết dữ liệu. Ngoài ra thì các bạn cần setup các biến môi trường cần thiết cho mysql ở service và cả trong file env của project laravel.
### Phpmyadmin
```yml
  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    ports:
      - "8081:80"
    environment:
      - PMA_HOSTS=mysql
      - PMA_PORT=3306
      - PMA_USER=pocadi123
      - PMA_PASSWORD=pocadi123
```
Với phpmyadmin thì cũng giống như đối với mysql chúng ta cần lưu ý port và kết nối tới một port chưa được sử dụng, ngoài ra thì cũng cần setup các biến môi trường cho phpmyadmin, các biến này lấy trên service mysql để phpmyadmin có thể truy cập và quản lý dữ liệu.

Vậy là chúng ta đã viết xong các services cho file docker-compose.yml, và dưới đây là file hoàn chỉnh:
```yml
version: '3'

services:
  nginx:
    image: nginx:stable
    ports:
      - "8080:80"
    volumes:
      - ./laravel:/var/www/html
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
  php:
    build:
      context: ./laravel
      dockerfile: Dockerfile
    volumes:
      - ./laravel:/var/www/html
    ports:
      - "9000:9000"
  mysql:
    image: mysql:8.0.29-oracle
    ports:
      - "3307:3306"
    volumes:
      - ./mysql:/var/lib/mysql
    environment: 
      MYSQL_DATABASE: laravel
      MYSQL_USER: pocadi
      MYSQL_PASSWORD: pocadi123
      MYSQL_ROOT_PASSWORD: pocadi123
  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    ports:
      - "8081:80"
    environment:
      - PMA_HOSTS=mysql
      - PMA_PORT=3306
      - PMA_USER=pocadi123
      - PMA_PASSWORD=pocadi123
```

# 4. Chạy các container và debug
Đầu tiên chúng ta cần build các image của các image. Sử dụng lệnh dưới đây để pull hoặc build các image về máy.
```
docker-compose build
```
Lệnh này chỉ cần chạy một lần duy nhất. Sau khi chúng ta đã có các image cho từng service thì chúng ta tiến hành chạy các container.
```
docker-compose up -d
```
Sau khi chạy xong lệnh trên thì chúng ta sẽ có được 4 container nginx, php, mysql, phpmyadmin.

Tới đây chúng ta vẫn chưa thể truy cập ứng dụng laravel của mình, mà cần phải truy cập vào service php và chạy các lệnh cơ bản của laravel để có thể chạy project. Để truy cập vào một service thì chúng ta sử dụng lệnh `docker-compose exec service-name sh`. Và ở đây service cần truy cập là `php`.

Sau khi truy cập chúng ta tiến hành chạy:  `composer install` `php artisan key:generate` `php artisan migrate`. 
Sau khi chạy xong các lệnh trên thì chúng ta vào http://localhost:8080 để kiểm tra xem project đã chạy chưa, và đây là kết quả : 
![image.png](https://images.viblo.asia/1e8650ba-f1a9-4883-8a5a-f3b059f73315.png)

### Một số lỗi hay gặp phải
Các lỗi hay gặp phải thường là lỗi về quyền, các bạn có thể sử dụng hai câu lệnh `docker ps` để hiển thị danh sách các container đang chạy (hoặc `docker ps -a` nếu thiếu container nào đó), và sử dụng lệnh `docker logs <container-id>` để hiển thị lỗi của container và debug. 

Ngoài ra khi sử dụng command project laravel để tạo file ví dụ như model hoặc controller thì nên chạy bên ngoài container để tránh các vấn đề về quyền.
# 5. Tổng kết
Vậy là chúng nhau đã cùng nhau xây dựng một project chạy laravel bằng docker. Cảm ơn các bạn đã theo dõi, mong bài viết sẽ mang lại những kiến thức bổ ích. Hẹn gặp lại các bạn ở các phần tiếp theo của series về docker của mình.