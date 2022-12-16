Đứng ở phương diện của một Developer, chúng ta có thể sử dụng Docker để thiết lập môi trường ảo cho một dự án nào đó, mà không cần tốn quá nhiều công sức cài đặt hoặc làm ảnh hưởng tới máy tính hiện tại. Với những người mới tiếp xúc với docker như mình, đôi khi chưa hiểu rõ tại sao lại có file **Dockerfile**, **docker-compose.yml**, tại sao đã cài `docker` rồi lại cần cài thêm `docker-compose`. Hi vọng bài viết phần nào giải đáp các thắc mắc đó.
# 1. Docker là gì và tại sao nên sử dụng nó

Docker đã có quá nhiều trên Viblo và các bậc tiền bối đã giải thích quá rõ về kỹ thuật, khái niệm, công dụng của nó, các bạn có thể tham khảo. 

**Note**: *Trước khi phân biệt docker và docker-compose, bạn nên tìm hiểu trước về các khái niệm: images, container, các lệnh xem image, container, tạo + xóa images, xóa + tạo container*: 

https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-ByEZkWrEZQ0

# 2. Docker

Hãy bắt đầu từ 1 người mới nghe về docker. Nó giúp triển khai, cài đặt môi trường ảo cho dự án. Nó sẽ chạy dựa trên container trong máy. Ta sẽ tạo thử một container bằng Docker. Có 2 cách để tạo container bằng Docker

## 2.1. Build thành image và sau đó chạy container từ image

Cách này sẽ tiến hành lưu các câu lệnh chạy, các image và **Dockerfile** (không có phần mở rộng). Như vậy **Dockerfile là để chạy bằng Docker**. 
Ví dụ thiết lập môi trường có PHP5, nginx. Đường dẫn thư mục như sau:

![](https://images.viblo.asia/1a2589fa-06a3-45c1-9d57-bdf14fedf273.png)

Nội dung Dockerfile:
```
FROM php:5.6-apache

COPY src/ /var/www/html/
EXPOSE 80
```
Buil thành image

`$ docker build -t php-image .`

Tùy chọn `-t` giúp bạn có thể chọn tên cho image bạn tạo ra. Tùy chọn "." cuối cùng cho biết file Dockerfile đang ở cùng đường dẫn.

Sau khi build thành công thành image, bạn thể có chạy container:

`$ docker run -p 80:80 -d --name php-container php-image`

Với `-p` là thiết lập cổng, `-d` là ẩn quá trình chạy, `--name` cho phép đặt tên container 
Bạn có thể sử dụng lệnh `docker ps` để xem các container nào đang chạy.

## 2.2. Chạy luôn container mà không cần file nào

Nếu như cách 1 nó sẽ build image và tạo container chạy theo các image trong đó thì có một cách khác để chạy container là chạy trực tiếp bằng cách truyền tên image trực tiếp vào câu lệnh. Ví dụ như chạy mysql container.

`docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=secret -d mysql:latest`

Tùy chọn `--name` để chọn tên cho container,` -e` để thiết lập thông số, mysql:latest sẽ là tên image. Đầu tiên nó sẽ tìm trong máy của bạn xem có image nào tên là `mysql:latest` chưa, nếu chưa, nó sẽ lên Docker Hub down về và sử dụng. 

Cách này chỉ sử dụng được cho các container không yêu cầu thêm câu lệnh, cấu hình như Mysql. Như apache và php ở trên bạn cần tạo link liên kết (lênh CMD), kích hoạt cổng `EXPOSE 80`.

**Tóm lại về Docker**
* Chạy theo các image trong file **Dockerfile**
* Có thể chạy trực tiếp container không cần file có trước.
* **Khó khăn khi chạy nhiều container**. Như bạn đã thấy, chạy mysql phải thêm tùy chọn `-e`, chạy nginx phải thêm tùy chon `-p `để thiết lập các cấu hình, các tham số gây khá phức tạp. Thử tưởng tượng chạy nhiều container, sẽ phải chạy rất nhiều câu lệnh `docker run` và thiết lập nhiều thông số

# 3. Docker compose
Các bước trước, chúng ta đã làm tất cả bằng tay. Chúng ta đã định cấu hình và tạo image, chúng ta đã tạo các vùng chứa và **liên kết** chúng với nhau. Nếu bạn làm việc với hai hoặc ba container, nó có thể thực hiện được, mặc dù chúng ta đã dành khá nhiều thời gian cho việc này. Tuy nhiên, nếu bạn cần thiết lập môi trường với nhiều container chứa hơn, nó sẽ trở nên rất tẻ nhạt để đi qua tất cả các bước thủ công mỗi lần.

May mắn thay, có cách tốt hơn để thực hiện việc này. `Docker-compose` là một công cụ tuyệt vời để định nghĩa và chạy nhiều container trên ứng dụng Docker. Nó cho phép bạn tạo 1 file cấu hình `YAML`, nơi mà bạn sẽ định nghĩa các services trên ứng dụng của bạn và định nghĩa tất cả các bước, các cấu hình cần thiết để xây dựng các image, up các container và liên kết chúng với nhau. Cuối cùng, một khi tất cả điều này được thực hiện, bạn sẽ chỉ cần thiết lập tất cả với một lệnh duy nhất.

Như vậy Docker compose giúp ta tự động tải các image, thiết lập cấu hình tốt hơn rất nhiều so với docker. Nó sẽ cần một file cấu hình `docker-compose.yml` để chạy theo các image và cấu hình trong đó. Thử xem nội dung file `docker-compose.yml` có gì:
```
version: '2'
services:
  application:
    image: euclid1990/ubuntu-server
    volumes:
      - ./blog:/var/www/html/blog
  mariadb:
    image: mariadb
    ports:
      - "3696:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
      MYSQL_USER: guest
      MYSQL_PASSWORD: 123456Aa@
    volumes:
      - ./mariadb:/var/lib/mysql
  php:
    image: php:7.2-fpm
    ports:
      - "9696:9000"
    volumes_from:
      - application
    links:
      - mariadb:mysql
    tty: true
  nginx:
    image: nginx
    ports:
      - "8696:80"
    links:
      - php
    volumes_from:
      - application
    volumes:
      - ./logs/nginx/:/var/log/nginx
      - ./nginx_conf:/etc/nginx/conf.d
```
Build các images (nếu cần tạo) 

`$ docker-compose build`

Thậm chí bạn có thể chạy luôn các container và build image

`$ docker-compose up --build -d`

Nó sẽ tự tạo và lấy các image trên Docker Hub cho bạn chỉ bằng một câu lệnh đơn giản. Đơn giản hơn rất nhiều là chạy từng container như Docker.

Ta có thể thây file này chia các container một cách rõ ràng: application, mariadb, php, nginx và có cấu hình cổng và tài khoản mysql luôn. Chi tiết các tham số có ý nghĩa gì, các bạn có thể tham khảo tại bài viblo https://viblo.asia/p/docker-compose-dung-moi-truong-cho-ung-dung-laravel-WrJvYEYJvVO.

# Tóm lại:
* Docker quản lý và cài đặt từng container theo các câu lệnh trong **Dockerfile**. Khi chạy nhiều container hoặc cần cấu hình trong container sẽ khá phức tạp.
* Docker có vẻ thích hợp quản lý images và container hơn.
* Docker compose là một công cụ tuyệt vời hỗ trợ cài đặt nhiều container và thiết lập các cấu hình cho các container. Docker compose chạy theo các cấu hình trong **docker-compose.yml**.
* Đôi khi có thể kết hợp cả file **Dockerfile** trong `docker-compose` để cài đặt tiện ích hơn (có thể xem trong link github với tham số `build` trong file **docker-compose.yml**.

# Tài liệu tham khảo
Viblo về Docker: 
* https://viblo.asia/p/docker-compose-dung-moi-truong-cho-ung-dung-laravel-WrJvYEYJvVO
* https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-ByEZkWrEZQ0

So sánh docker và docker-compose

* https://dev.zavrel.net/docker-and-docker-compose-for-php-development-with-github-and-digital-ocean-deployment-98df55002f3c

Link project triển khai bằng docker-compose:
* https://github.com/minhnv2306/docker-fuel