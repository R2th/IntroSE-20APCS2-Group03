Xin chào mọi người, ngày hôm nay mình xin phép quay lại với một bài viết về môi trường development khi phát triển ứng dụng. Và mình xin chia sẻ một chút kiến thức về Docker - một công cụ tuyệt vời cho việc phát triển hay scale (mở rộng) ứng dụng. Với chút kiến thức ít ỏi của mình hy vọng giúp được phần nào để các bạn hiểu đôi chút cơ bản và bắt đầu sử dụng Docker. Chúng ta cùng vào bài viết nhé!

# 1. Giới thiệu
![](https://images.viblo.asia/6765a027-b4fb-4c64-9bdc-c100f770cdce.png)

Với việc phát triển ứng dụng thông thường, chúng ta thường chạy trực tiếp trên máy thật (host) để build ứng dụng. Và một ứng dụng chúng ta không chỉ có một service mà cần nhiều service hay package gồm các ngôn ngữ khác nhau để có thể xây dựng hoàn chỉnh. Với từng service, package đó chúng ta phải cài đặt tỉ mỉ đảm bảo ghi rõ từng version của package hay ngôn ngữ sử dụng để có thể tương thích và hoạt động êm xuôi được. 

Mỗi khi bàn giao cho khách hàng hay cho các developer khác để bảo trì ứng dụng, họ sẽ phải cài lại từng package đó, nhưng không thể tránh được trường hợp cài sai version hay confict, và phải mất quá nhiều thời gian cho việc set-up môi trường. Docker ra đời đã giải quyết được bài toán đó, công cụ này mang lại cho chúng ta sự tiện lợi khi tất cả những thứ cần thiết của ứng dụng được đóng gói (images) và containerization (theo cách triển khai container của docker) để việc maintain, build ứng dụng trở nên nhanh chóng hơn bao giờ hết.


### Kiến trúc của docker: 
![](https://images.viblo.asia/90d0d67e-29ee-4003-87c4-81b68f568ee8.png)

Docker hoạt động trên kiến trúc client-server.
- Với Client là nơi mà người dùng tương tác để gửi requests tới Docker Daemon (DOCKER_HOST) thông qua CLI (Command line interface) để thực hiện các thao tác như build, pull, run images.
- Server : Docker daemon lắng nghe các request từ client và tiến hành các thao tác đó, quản lý các images, containers, networks và volumes. Docker daemon.
- Trong hình chúng ta có thêm Registry: đây là nơi lưu trữ các images khi đã build và hiện tại có một nơi lưu trữ public cho mọi người đấy là docker hub.
# 2. Cài đặt.
- Đầu tiên để sử dụng, chúng ta cần cài đặt docker. Ở trang chủ cũng đã hướng dẫn cài đặt nên mình không nêu chi tiết từng bước,  mọi người vào link này xem nhé : https://docs.docker.com/engine/install/ubuntu/
# 3. Các khái niệm cơ bản (image và container). 
## 3.1. Images
- Images là một file read-only, không thể thay đổi được, nó chứa các thư viện, công cụ, dịch vụ hay packages, những cấu hình để chạy và cần thiết để tạo nên ứng dụng. Chúng ta cũng không thể start hoặc run images giống như container và có thể tạo được image cho chính mình hoặc lấy images đã public trên registry để về và customize thành một image gồm những công cụ cần thiết cho riêng mình. 


Để tạo ra một image, chúng ta cần tạo một Docker File. Docker dựa vào file này để sử dụng và build ra images. Docker file bao gồm tất cả các instruction (hướng dẫn) để docker build ra một image. Bây giờ chúng ta sẽ demo tạo một image chứa ubuntu nhé. 
```
FROM ubuntu:18.04

LABEL maintainer="pviethieu@gmail.com" 

RUN apt-get update && apt-get -y install apache2

EXPOSE 80
```

Ở trên mình có một file Dockerfile đơn giản để build một image gồm ubuntu và cài đặt apache2 vào . Trong file này chúng ta nhìn thấy các Instruction: 

- **FROM**: đây là nơi khai báo ra image base, mình lấy phiên bản ubuntu:18.04 để sử dụng. 
- **LABEL**: nơi đưa ra các metadata hay thông tin của image, có thể là version, maintainer ...
- **RUN**: Ở đây sẽ thực thi command ở top layer của images. tức là một khi chúng ta tạo ra một images mới thì lúc này chúc ta đang ở layer mới. Tóm lại nó sẽ thực thi command khi build images.
- **EXPOSE** : thông thường apache2 chạy trên cồng 80. Vì vậy chúng ta sẽ sử dụng cổng 80 trên ubuntu có thể chạy đc apache2. Và khi muốn sử dụng chúng ta cần gắn thêm thẻ -p và gán cổng cho chúng khi tạo container từ image này

Ngoài ra trong Dockerfile chúng ta còn có 
- **CMD**: CMD được dùng để thực thi câu lệnh khi chúng ta sử dụng images hay start container. 
```
CMD ["executable","param1","param2"] 
CMD ["param1","param2"] (sử dụng cho việc truyền tham số cho ENTRYPOINT)
CMD command param1 param2
```
- **ENTRYPOINT**:  ENTRYPOINT thường dùng để thực thi nhiều câu lệnh trong quá trình start container. Thường trong ENTRYPOINT sẽ chọn file shell script để lấy ra những câu lệnh được thực thi.
- WORKDIR: sử dụng để định nghĩa thư mục đang làm việc cho container. bất kỳ câu lệnh trong khi thực hiện RUN, CMD,  ... đều sẽ được thực thi ngay trong thư mục này.
- Ngoài ra chúng ta còn có các instruction khác như ADD, COPY, ... Mình có dẫn link trang chủ chi tiết hơn tại đây : https://docs.docker.com/engine/reference/builder/

Sau khi cấu hình xong file Dockerfile này, chúng ta chạy lệnh dưới để build image nhé : 
```
$ docker build -t docker-apache2 .
```
- Với ```-t``` để gắn tag cho image. 
```
Sending build context to Docker daemon   2.56kB
Step 1/4 : FROM ubuntu:18.04
18.04: Pulling from library/ubuntu
92dc2a97ff99: Pull complete 
be13a9d27eb8: Pull complete 
c8299583700a: Pull complete 
Digest: sha256:4bc3ae6596938cb0d9e5ac51a1152ec9dcac2a1c50829c74abd9c4361e321b26
Status: Downloaded newer image for ubuntu:18.04
 ---> 329ed837d508
Step 2/4 : LABEL maintainer="pviethieu@gmail.com"
 ---> Running in 64bef33f08eb
Removing intermediate container 64bef33f08eb
 ---> 93afda6024d0
Step 3/4 : RUN apt-get update && apt-get -y install apache2
 
 ...
 
Removing intermediate container 000eeb497905
 ---> 2efcc7312083
Step 4/4 : EXPOSE 80
 ---> Running in 9798427c060c
Removing intermediate container 9798427c060c
 ---> 9289f9d24416
Successfully built 9289f9d24416
Successfully tagged docker-apache2:latest

```
Kiểm tra lại xem image đã sử dụng được chưa : List các image:

```
$  docker images -a
```
hoặc
```
$ docker image ls
```
```
REPOSITORY                                                 TAG                 IMAGE ID            CREATED             SIZE
docker-apache2                                             latest              9289f9d24416        3 hours ago         195MB
<none>                                                     <none>              2efcc7312083        3 hours ago         195MB

```

Xóa một image: 

```
$ docker rmi <id_image | name_image> 
```

```
$ docker image rm <id_image | name_image> 
```


Vậy chúng ta đã build thành công một image. Vậy cái image này làm gì thì chúng ta sẽ tiếp tục với phần container nhé.
## 3.2. Container
Để sử dụng được tiện ích của Docker thì phần quan trọng nhất không thể thiếu cùng với Images đấy chính là Container. Chúng ta đã có image đóng gói lại công cụ cần thiết. vậy để sử dụng images chúng ta cần chạy container sử dụng image đó lên.
```
$ docker run -it --name "apachelinux" -p 8080:80 docker-apache2 
```

Với "apachelinux" là tên của container chúng ta đặt tùy chọn.
-  -p thể hiện port để chúng ta config post ở máy thật và gán cho container. Container mình sử dụng image docker-apache2 vừa tạo ở trên với port 80. Mình ánh xạ cổng 8080 bên ngoài máy thật (host) để với cổng 80 trên docker.
-  -it  : để chạy container và dùng với terminal.  

![](https://images.viblo.asia/0a84daf7-8853-46e4-a6d9-b31e06ae4a9a.png)
 
 Sau đấy chúng ta sẽ vào được container dùng image ubuntu và thử chạy ```service apache2 start``` và nhận kết quả nhé : 
 ![](https://images.viblo.asia/989b884c-92ad-4289-9a82-93bd7342121f.png)

Lưu ý: đang trong terminal nếu  gõ exit thì container sẽ stop. vì vậy nếu muốn thoát terminal mà container vẫn chạy mọi người nhấn Ctrl+p, Ctrl + q nhé. 

Để xem các container đang chạy chúng ta sử dụng : 

``` $ docker ps ```
``` 
CONTAINER ID        IMAGE                                       COMMAND                  CREATED             STATUS              PORTS                               NAMES
def3ba1d8a87        docker-apache2                              "/bin/bash"              12 minutes ago      Up 12 minutes       0.0.0.0:8080->80/tcp                apachelinux
```

Xem tất cả các container đang chạy và đã stop 

``` $ docker ps -a```

``` 
CONTAINER ID        IMAGE                                       COMMAND                  CREATED             STATUS              PORTS                               NAMES
def3ba1d8a87        docker-apache2                              "/bin/bash"              12 minutes ago      Up 12 minutes       0.0.0.0:8080->80/tcp                apachelinux
20c8aa9108b1        ubuntu-nginx                                "/build/start.sh /bi…"   9 days ago          Exited (0) 9 days ago                                         intelligent_wozniak
```

Container đang chạy, thực thi câu lệnh và chạy vào container đó ta sử dụng:
```
$ docker exec <param> <id_container | name_container> command 
```
Vd: mở terminal khi có container đã start: 

```
$ docker exec -it <id_container | name_container> bin/bash
```
```
$ docker ps

CONTAINER ID        IMAGE                                                    COMMAND                  CREATED             STATUS              PORTS                                         NAMES
8712a127bc73        docker_demo_my-php                                       "docker-php-entrypoi…"   16 hours ago        Up 51 minutes       9000/tcp                                      php-product
46a08731dfce        mysql:latest                                             "docker-entrypoint.s…"   16 hours ago        Up 51 minutes       3306/tcp, 33060/tcp                           mysql-product
51b866b7026b        httpd:latest                                             "httpd-foreground"       16 hours ago        Up 51 minutes       0.0.0.0:9998->80/tcp, 0.0.0.0:4433->443/tcp   c-httpd01
```

``` 
$  docker exec -it c-httpd01 bash

root@httpd:/usr/local/apache2# 
```
Xóa một container: 

```
$ docker rm <id_container | name_container> 
```
Xóa một image: 
```
$ docker image rm <id_image | name_image> 
```
||
```
$ docker rmi <id_image  | name_image>
```

Với tag ```-f``` : bạn có thể xóa container hoặc image ngay cả khi container hoặc image có container đang running.

# 4. Tổng kết.
Với bài viết này, mình đã giới thiệu một số kiến thức cơ bản và quan trọng trong docker cũng như một số câu lệnh thường sử dụng với docker. Hi vọng với kiến thức này mọi người có thể tiếp tục phát triển skill của mình với docker để dễ dàng làm việc với những dự án lớn cần sử dụng tới nó. Hẹn gặp lại trong các bài viết tời của mình tiếp tục về chủ đề  docker. 
Thanks for reading !!