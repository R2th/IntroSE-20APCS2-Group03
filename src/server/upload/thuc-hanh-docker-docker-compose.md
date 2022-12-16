Khi sử dụng docker nếu chúng ta cần tạo và quản lý các container, network hay ổ đĩa sẽ phải chạy các lệnh để tạo thủ công, nhưng khi cần tạo nhiều container hoặc nhiều network thì việc tạo thủ công này rất mất thời gian và  việc quản lý Docker trên một hệ thống lớn với rất nhiều các containers khác nhau sẽ rất phức tạp và khả năng sinh ra nhiều lỗi, thật may là có docker compose giải quyết vấn đề này.
# Khái niệm docker compose
![](https://images.viblo.asia/999476ff-bfb8-4f16-bf0d-12f393294c61.png)

### Docker compose
Là công cụ giúp ta thiết lập và quản lý nhiều container, network, volume (gọi chung là các service) và thiết lập cấu hình cho các service một cách nhanh chóng và đơn giản bằng việc chạy theo các chỉ định trong file docker-compose.yml 

**Những tính năng chính của Compose bao gồm:**

* Tạo và quản lý nhiều môi trường độc lập trong một máy host đảm bảo độc lập các phân vùng ổ nhớ tránh say ra xung đột
* Chỉ tạo lại container thay đổi, nhận biết các container không thay đổi và sử dụng lại
* Định nghĩa và sử dụng biến môi trường trong file YAML

### Docker-compose.yml
Là một file lưu [dạng yaml](https://en.wikipedia.org/wiki/YAML), file này lưu các chỉ thị để docker compose đọc file này và thực thi các chỉ thị đó, các chỉ thị như tạo container từ image, tạo network, cấu hình cho các dịch vụ.

ví dụ:  file mysql.yml như sau
``` yml
version: "2.2"

services:
  mysql:
    image: mysql:8
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    mem_limit: ${MYSQL_MEMORY_LIMIT:-1G}
    volumes:
      - ${PATH_DATA:-./data}/mysql:/var/lib/mysql
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:-root}
```
# Thực hành docker compose
Nhiệm vụ thực hành của chúng ta là định nghĩa  docker file để tạo ra các thành phần sau
- Container MySQL
- Container HTTP APACHE
- Container PHP-FPM
- Network (bridge) để các service trên kết nối vào mạng này
- Ánh xạ cổng 9999 của máy host vào cổng 80 của máy chủ HTTP
### Tạo docker-compose.yml
Tạo thư mục mycode bên trong ta tạo file docker-compose.yml với nội dung như sau (mình có comment giải thích trong phần nội dung file)

``` yml
version: "3" #là phiên bản docker composer

#Tạo mạng tên là my-network
networks:
    my-network:
        driver: bridge

# Tạo các dịch vụ (container)
services:

    #Tạo container my-php từ imgae php:latest có kết nối với mạng my-network
    my-php:
        container_name: php-product
        image: 'php:latest'
        hostname: php
        restart: always
        networks:
            - my-network

    #Tạo container my-httpd từ imgae httpd:latest có kết nối với mạng my-network, ánh xạ cổng 9999 của máy host vào cổng 80
    my-httpd:
        container_name: c-httpd01
        image: 'httpd:latest'
        hostname: httpd
        restart: always
        networks:
            - my-network
        ports:
            - "9999:80"
            - "443:443"
            
     #Tạo container my-mysql từ imgae mysql:latest có kết nối với mạng my-network,config các biến môi trường
    my-mysql:
        container_name: myql-product
        image: "mysql:latest"
        hostname: mysql
        restart: always
        networks:
            - my-network
        environment:
            - MYSQL_ROOT_PASSWORD=123abc
            - MYSQL_DATABASE=db_site
            - MYSQL_USER=sites
            - MYSQL_PASSWORD=123abc
```

File trên được chia làm 3 phần

* phần đầu là khai báo phiên bản docker composer, ở đây mình dùng phiên bản 3

* Phần tiếp theo là khai báo tạo các mạng, ở đây mình tạo một mạng tên là my-network kiểu mạng là bridge ( về phần Network bài trước mình có viết các bạn tìm hiểu thêm [tại đây](https://viblo.asia/p/thuc-hanh-docker-bai-3-tao-va-quan-ly-network-trong-docker-ket-noi-container-voi-network-Do7542BQZM6) )

 * Phần tiếp theo là tạo các services, ở đây là tạo 3 services là 3 container (php, httpd, mysql), các service này đều kết nối đến mạng my-network đã tạo trên phần 2
 
     - Container my-php tạo từ imgae php:latest có kết nối với mạng my-network
     - Container my-httpd tạo từ imgae httpd:latest có kết nối với mạng my-network, ánh xạ cổng 9999 của máy host vào cổng 80 và cổng 443 với 443 máy host
     - Container my-mysql tạo từ imgae mysql:latest có kết nối với mạng my-network,config các biến môi trường như MYSQL_ROOT_PASSWORD, MYSQL_DATABASE,MYSQL_USER, MYSQL_PASSWORD

### Run file docker-compose.yml tạo các service

Tạo xong file docker compose, giờ chúng ta sẽ run file này để tạo ra các service đã định nghĩa.

Ta vào thư mục chứa file docker-compose.yml và chạy lệnh

`docker-compose up`

![](https://images.viblo.asia/8ec8a784-34a5-4d48-83b5-915622e1fabb.png)

Vậy là xong rồi, giờ ta bật một terminal khác để kiểm tra xem đã có các container và network theo như mục tiêu đề ra hay chưa

Chạy lệnh `docker ps` và `docker network ls` để xem danh sách container đang chạy và network

![](https://images.viblo.asia/fb950ead-a89e-4285-a489-77edf801d825.png)

Muốn dừng các services đang chạy thì ta dùng lệnh

`docker-compose stop`

Để kết thúc các services đang chạy và xóa  hoàn toàn container ta dùng lệnh 

`docker-compose down`

Theo dõi Logs các services

`docker-compose logs [SERVICES]`

# Kết bài
Sau bài viết này chúng ta cũng đã tìm hiểu những kiến thức và thực hành cơ bản về docker-compose. Cảm ơn mọi người.