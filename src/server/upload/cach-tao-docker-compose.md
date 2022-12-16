![](https://images.viblo.asia/05c1a1cc-2653-4480-8ec1-6b62110044bf.png)


**Tại sao lại sử dụng Docker-compose???**

Như đã biết, chúng ta đã định cấu hình và tạo image, chúng ta đã tạo các vùng chứa và liên kết chúng với nhau. Nếu bạn làm việc với 2 hoặc 3 container thì nó có thể thực hiện được. 

Tuy nhiên, nếu bạn cần thiết lập môi trường của 1 project với nhiều container chứa hơn thì việc đó sẽ trở nên rất tẻ nhạt để đi qua tất cả các bước thủ công mỗi lần.

Vậy làm sao có thể giải quyết được bài toán này được nhỉ?:sob:  ... Thật may mắn :shamrock::shamrock::shamrock: Ông trời đã sinh ra `Docker` sao lại còn sinh ra `Docker-compose` thiên tài hơn này nữa cơ chứ  :kissing_heart::kissing_heart::kissing_heart:

Trong bài viết này cùng tìm hiểu cách sử dụng nó như nào nhé!

### **Docker-compose là gì?**

* Docker-compose là 1 công cụ để định nghĩa và chạy nhiều container trên ứng dụng Docker.
* Cho phép bạn tạo 1 file cấu hình YML, nơi mà bạn sẽ định nghĩa các services trên ứng dụng của bạn và định nghĩa tất cả các bước, cấu hình cần thiết để xây dựng các image, up các container và liên kết chúng với nhau. Cuối cùng, 1 khi tất cả điều này được thực hiện hì bạn sẽ chỉ cần thiết lập tất cả với 1 câu lệnh duy nhất.
* Ưu điểm: giúp tự động tải các image, thiết lập cấu hình tốt hơn rất nhiều so với Docker.
### **Các câu lệnh thường dùng**
* Build các images (nếu cần tạo):
   ```
    $ docker-compose build
   ```
* Chạy container và build image
    ```
    $ docker-compose up --build -d
   ```
* Khởi chạy các services bên trong background
   ```
    $ docker-compose up -d
   ```
* Help
   ```
    $ docker-compose --help
   ```
* Dừng và loại bỏ các container, network, image và volume.
   ```
    $ docker-compose down
   ```
   Ví dụ: `docker-compose down -v`.
   
   Một số tùy chọn hữu ích:
   - `--rmi type`: Xóa image.
   - `-v, --volumes`: Xóa các volumes được đặt tên được khai báo trong phần `volume` của file compose và các volumes ẩn danh được đính kèm vào các `container`.
   - `--remove-orphans`: Xóa các `container` cho các service không được xác định trong tệp `compose`
* Liệt kê tất cả các container
   ```
    $ docker  ps -a
   ```
* Xóa container:
   ```
    $ docker rm <container_name> -f
   ```
* Liệt kế tất cả các image:
   ```
    $ docker images
   ```
* Xóa images:
   ```
    $ docker rmi <image_id> -f
   ```
> Note: `'-f'`: dùng để buộc xóa, ngay cả khi `container` đang chạy hoặc image đang được sử dụng.
### **Các bước tiến hành**
**1. Tạo 1 Dockerfile**

Giống như khi chạy 1 docker, bạn cần tạo 1 `Dockerfile` để chỉ định cách tạo `image` và `container` cho chương trình của bạn.

Ví dụ:
```
FROM php:5.6-apache
RUN apt-get update && \
        curl \
        vim \
        libmemcached-dev \
        libz-dev \
        libpq-dev \
        libjpeg-dev \
        
# Customize apache config
COPY ./mydomain.conf  /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

RUN usermod -u 1000 www-data
RUN chown -R www-data:www-data /var/www/html
```
**2. Tạo 1 docker-compose.yml**

Để xác định ứng dụng gồm nhiều container của bạn, bạn sử dụng tệp `docker-compose.yml` trong thư mục gốc của dự án. 

Ví dụ:
```yml
version: '3'

services:
   mariadb:
     image: mariadb:5.5
     port:
       - "3306:3306"
     volumes:
       - database_data:/var/lib/mysql
     environment:
       MYSQL_ROOT_PASSWORD: root
       MYSQL_DATABASE: database_test
       MYSQL_USER: test
       MYSQL_PASSWORD: test@123
     network:
       - nets
   web:
     depends_on:
       - mariadb
      build:
       context: .
     ports:
       - "8000:80"
     networks:
       - nets
volumes:
    database_data:
 networks:
     nets:
```
Lưu file `docker-compose.yml`. Sau đó chạy lệnh tại đường chỉ dẫn chứa file `.yml`: `docker-compose up -d`.

**Giải thích cú pháp của file docker-compose.yml**

* File `docker-compose.yml` được tổ chức gồm 4 phần:

|  | Ý nghĩa |
| -------- | -------- |
| version    | Version của file `docker-compose`     |
| services    | chứa các `container`. Với mỗi service là tên của một `container`     |
| volumes    | Gắn đường dẫn trên `host machine` được sử dụng trên `container`     |
| networks    | Sử dụng để cấu hình `network` cho ứng dụng     |

* Với `services` có một số thành phần sau:

|            | Ý nghĩa       |
| ------------------------- | ---------------------- | 
| image     | Chỉ ra `image` sẽ được dùng để build `container`.Tên `image` được chỉ định khi build một `image` trên `máy host` hoặc download từ `Docker Hub`     | 
| port     | Kết nối port của `máy host` đến port của `container`     | 
| volumes     | Gắn đường dẫn trên `host machine` được sử dụng trên `container`     | 
| enviroment  | Định nghĩa các biến môi trường được truyền vào Docker     | 
| depends_on | Chọn các `service` được dùng là `dependency` cho `container` được xác định trong `service` hiện tại.     | 
| build     | Chỉ ra vị trị đường dẫn đặt `Dockerfile`     | 



### **Tổng kết**
Vừa rồi mình đã hướng dẫn các bạn làm sao để sử dụng được `docker-compose`. Qua bài này của mình, mong rằng các bạn có cái nhìn rõ nét hơn vì sao lại có sự kết hợp giữa `Dockerfile` và `docker-compose.yml`.  Đây có thể là 1 khung tạo mà mình cảm thấy khá đơn giản và dễ hiểu khi mình bắt đầu tiếp cận với Docker và Docker Compose. Tuy nhiên, mình cảm thấy rằng học Docker khá là rộng nên là 1 bài viết này có lẽ sẽ không thể giúp các bạn hiểu hết về tất cả về Docker nhưng nếu giúp cho các bạn hiểu phần nào đó về Docker thì đó lại là 1 niềm vui nho nhỏ đối vối mình vì đây là bài viết đầu tiên của mình :laughing::laughing::laughing:

Cảm ơn các bạn đã đọc bài viết đầu tay của mình ạ!