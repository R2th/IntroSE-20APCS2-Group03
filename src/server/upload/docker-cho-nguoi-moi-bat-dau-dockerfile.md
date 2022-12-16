Xin chào mn, hôm nay chúng ta sẽ đi chi tiết hơn về cách sử dụng Docker, nếu các bạn chưa nắm rõ lí thuyết cơ bản về Docker thì hãy dành ít phút để đọc lại phần **[Giới thiệu docker](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-gioi-thieu-gAm5yr9LKdb)** và **[Cài đặt Docker](https://viblo.asia/p/docker-cho-nguoi-moi-bat-dau-cai-dat-bJzKmrkEZ9N)** nhé. Bây giờ thì cùng tiếp tục với Dockerfile nào :grinning:

## Dockerfile là gì vậy ?
Đơn giản hóa 1 chút, dockerfile là 1 file không đuôi dạng text, chứa tập các lệnh để thiết lập cấu trúc cho 1 docker image.

![](https://images.viblo.asia/f2bcf576-d450-4bfc-9964-9d7fe036b490.png)
Docker có thể thực hiện đóng gói thành Docker container dựa theo tùy chỉnh mong muốn thông qua Dockerfile

## Viết Dockerfile như thế nào ?
![](https://images.viblo.asia/ae96d082-0b5f-48e2-a8eb-bdac43ac89d2.png)
Đầu tiên chúng ta sẽ tạo ra 1 file text đặt tên là Dockerfile, viết xong Dockerfile thì ta sẽ build để tạo image -> container và cuối cùng  là tạo ra máy ảo để khởi chạy ứng dụng trên máy ảo đó.
```
~$ touch Dockerfile
```

Tiếp tục ta sẽ tạo ra 1 folder để chứa mã nguồn ( có thể là php, java, html, ...) , ở đây mình đặt tên là App, chúng ta sẽ dùng editor để viết code trong này, các thay đổi trong editor sẽ được cập nhật ngay lập tức lên máy ảo. 

Sau cùng là tạo 1 file  start.sh để chứa những câu lệnh được chạy khi bật container (có thể dùng để start nginx, redis, mysql ...).
```
~$ touch start.sh
```
Mở file start.sh vừa tạo ở trên bằng một editor bất kỳ và edit lại thành
```
#!/bin/bash
```
Một file bash script phải luôn bắt đầu bằng #!/bin/bash để biểu thị rằng tập lệnh sẽ chạy với bash script chứ không phải bất kỳ shell nào khác.

Ok, và đó là các file và folder mà chúng ta cần chuẩn bị. Nếu đã xong thì tiếp túc tới với giai đoạn tiếp theo nhé.
### Thiết lập images cha 
Chúng ta đều biết để 1 ứng dụng chạy được trên 1 máy tính thì nó cần có 1 trình quản lí đó là hệ điều hành đúng không ạ. Giờ hãy coi image mà chúng ta đang xây dựng là 1 thiết bị phần cứng chưa có phần mềm nào trong đó cả, nên để nó có thể hoạt động thì điều đầu tiên chúng ta phải làm đó là tạo ra 1 hệ điều hành cho nó.  Tương đương, ta sẽ khai báo 1 images cha cho image này,  images cha sẽ chứa ubuntu:16.04 hoặc centos:7 ( tùy vào yêu cầu ) như thế này :
```
FROM ubuntu:16.04
MAINTAINER KienPH<thanhcong@gmail.com>
```
Khi Docker đọc tới câu lệnh này, nó sẽ tự động tìm xem image ubuntu:16.04 này đã tồn tại trong máy chưa, nếu chưa thì Docker sẽ tự động pull image này về từ [Docker Hub](https://hub.docker.com/). Trong đó ubuntu là tên của image, 16:04 là tag ( có thể hiểu đơn giản là phiên bản).

MAINTAINER : optional dùng để đặt tên cho tác giả của Dockerfile
### Cài đặt ứng dụng
Bây giờ chúng ta sẽ thiết lập các ứng dụng trên môi trường `ubuntu:16.04 ` này dựa theo 1 số lệnh sau :

- **RUN** : Để thực thi một câu lệnh nào đó trong quá trình build images
- **CMD** : Để thực thi một câu lệnh trong quá trình bật container.
- **ENTRYPOINT**: Để thực thi nhiều câu lệnh trong quá trình start container, những câu lệnh này sẽ được viết trong file .sh

Mỗi Dockerfile chỉ có một câu lệnh CMD, nếu như có nhiều hơn một câu lệnh CMD thì chỉ có câu lệnh CMD cuối cùng được sử dụng. Nếu muốn khởi động nhiều ứng dụng khi start container thì ta sẽ sử dụng ENTRYPOINT

Ví dụ :
```
# Update ubuntu
RUN apt-get update

# Install nginx
RUN set -x \
    && apt-get update \
    && apt-get install -y nginx

# Install mysql server
RUN set -x \
    && echo "mysql-server mysql-server/root_password password root" | debconf-set-selections \
    && echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections \
    && apt-get install -y mysql-server
```
Tùy chọn -y  tương đương việc tự động lựa chọn yes trong khi cài đặt packet
### Cấu hình

- **EXPOSE**: Container sẽ lắng nghe trên các cổng mạng được chỉ định khi chạy
- **ADD** : Copy file, thư mục, remote file thêm chúng vào filesystem của image.
- **COPY** : Copy file, thư mục từ host machine vào image. Có thể sử dụng url cho tập tin cần copy.
- **WORKDIR** : Định nghĩa directory cho **CMD**
- **VOLUME** : Mount thư mục từ máy host vào container.


Ta sẽ mở file start.sh lên và thêm vào các lệnh sau:
```
service nginx start
service mysql start

exec $@
```
Tiếp tục quay lại file **Dockerfile** và thêm vào 
```  
ENV APP_PATH /venv
WORKDIR $APP_PATH  //các lệnh CMD sẽ được chứa trong thư mục venv

ENV TZ=Asia/Ho_Chi_Minh
RUN set -x \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone      // thiết lập timezone cho máy ảo
    
COPY start.sh /venv    //đưa file start.sh từ máy host vào trong image

RUN set -x \
    && chmod a+x /venv/*   // cấp quyền thực thi cho các file bên trong thư mục venv

ENTRYPOINT ["/venv/start.sh"]  //Trỏ tới file start.sh để chạy được nhiều lệnh

EXPOSE 80  // Container sẽ lắng nghe các event trên cổng 80
```

Tổng hợp lại chúng ta sẽ được 2 file hoàn chỉnh như dưới đây

File start.sh 
```
#!/bin/bash

service nginx start
service mysql start

exec $@
```

File Dockerfile
```
FROM ubuntu:16.04

# Attached information
MAINTAINER KienPH<thanhcong@gmail.com>

# Configure the main working directory. This is the base
# directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
ENV APP_PATH /venv
WORKDIR $APP_PATH

# Set the timezone.
ENV TZ=Asia/Ho_Chi_Minh
RUN set -x \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

RUN set -x \
    && apt-get update \
    && apt-get install -y nginx

RUN set -x \
    && echo "mysql-server mysql-server/root_password password root" | debconf-set-selections \
    && echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections \
    && apt-get install -y mysql-server

COPY start.sh /venv

RUN set -x \
    && chmod a+x /venv/*

ENTRYPOINT ["/venv/start.sh"]

EXPOSE 80
```

Done, bây giờ  trong thư mục App ta sẽ tạo 1 file helloworld.html để lát nữa ta sẽ test thử nhé
```
<h1>Hello World</h1>
```

### Sử dụng Dockerfile
Ở mục trên thì cơ bản chúng ta đã viết xong Dockerfile và cấu hình 1 số lệnh đơn giản, hiện tại ta sẽ tiến hành  build image từ Dockerfile đã viết.

Sử dụng câu lệnh sau :
```
sudo docker build -t <image_name> .
```
- image_name do bạn tự đặt 
- trong lệnh trên thì sau image_name phải có dấu .


![](https://images.viblo.asia/e2a3a0e1-4902-4d94-806a-d77a12a1a3cc.png)
![](https://images.viblo.asia/538394d9-9ab1-4171-97b1-700e6802c31f.png)


Các bạn có thể thấy Docker sẽ thực thi lần lượt câu lệnh trong Dockerfile. Nếu có thông báo successfully tức là thành công.

Hoặc các bạn cũng có thể kiểm tra kết quả build image bằng lệnh 
```
docker images
```
![](https://images.viblo.asia/aedeea58-a0fc-4e96-a10e-f753d03ce68f.png)

Nếu thấy có image tên là demo_image là build thành công image rồi đó .

Tiếp theo ta sẽ tạo 1 container từ image vừa build xong, sử dụng lệnh :
```
sudo docker run -v <forder_in_computer>:<forder_in_container> -p <port_in_computer>:<port_in_container> -it <image_name> /bin/bash
```
Trong đó : 
- v : Thể hiện việc mount volume, dữ liệu từ thư mục từ máy thật có thể được truy cập từ thư mục của máy ảo.
- p: Cổng mạng từ máy thật để dẫn tới cổng mạng của máy ảo đang chạy
- t: Chạy container và mở terminal bằng /bin/bash


Ví dụ :
```
sudo docker run -v  ~/Desktop/DemoDocker/App:/var/www/html -p 7000:80 -it demo_image /bin/bash
```
![](https://images.viblo.asia/4957f6b4-c4bb-4a1b-9748-155f88b2b00c.png)
Sau đó vào trình duyệt chrome gõ localhost:7000 và xem kết quả: 
![](https://images.viblo.asia/4248cc6f-4ea1-4513-9857-398c37d65e3e.png)


Done, vậy là chúng ta vừa cùng nhau đi từ cách viết Dockerfile để tạo image, rồi từ image để tạo ra được 1 container đơn giản. Hy vọng bài viết hữu ích cho mn. Cám ơn mn đã dành thời gian cho mình :grinning: