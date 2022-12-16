# 1: Docker là gì
Theo document:
> Docker overview
> 
> Estimated reading time: 10 minutes
> 
> Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.
> 
> The Docker platform
Docker provides the ability to package and run an application in a loosely isolated environment called a container. The isolation and security allow you to run many containers simultaneously on a given host. Containers are lightweight because they don’t need the extra load of a hypervisor, but run directly within the host machine’s kernel. This means you can run more containers on a given hardware combination than if you were using virtual machines. You can even run Docker containers within host machines that are actually virtual machines!
> 
> Docker provides tooling and a platform to manage the lifecycle of your containers:
> 
> - Develop your application and its supporting components using containers.
> 
> - The container becomes the unit for distributing and testing your application.
> 
> - When you’re ready, deploy your application into your production environment, as a container or an orchestrated service. This works the same whether your production environment is a local data center, a cloud provider, or a hybrid of the two.

Đoạn trên chắc có lẽ đã giải thích chi tiết được docker là gì rồi, nhưng mình cũng mới học docker trong thời gian ngắn, nên khi mới đọc xong  đoạn trên mình cũng thấy hơi khó hiểu ở một số chỗ, như vậy tại sao chúng ta cần "đóng gói" môi trường. Sau khi mình vào dự án thực tế thì task không phải chỉ mình bạn làm, mà còn rất nhiều người trong dự án cùng đang phát triển. Giả sử mình có một package nó yêu cầu node version 12 nhưng máy bạn khác trong team lại đang cài node version 10 và bùm nó không chạy, thế là bọn mình lại ngồi cả ngày tìm ra xem nó không chạy với ti tỉ lý do. Hay một ví dụ tuy lạ mà quen, tại sao code trên máy thì chạy ngon lành nhưng khi deploy nên server thì chết, các bạn lại phải ngồi mò từng log, tìm mọi cách tái hiện mà ngày báo tiến độ đã dí sát rồi ... Không cần kể thêm thì các bạn cũng đã hình dung nó tồi tệ đến như thế nào rồi đúng không ạ. 

Và docker có một số thứ rất hay ho và này nọ mang tên dockerfile và docker-compose, chi tiết mình sẽ giải thích sau nhưng các bạn có thể hiểu các bạn có thể dựng một kịch bản sẵn mà mỗi lần các bạn chỉ cần up nó thì nó sẽ build cho các bạn một máy ảo với môi trường như mong muốn
![](https://images.viblo.asia/9caa1765-97fc-48de-9c26-c1e37227d7a9.gif)



# 2: Một số khái niệm cơ bản mà bạn cần nằm lòng

![](https://images.viblo.asia/886bf83b-f928-46f1-9568-a1483b370436.png)

Docker Engine là công cụ Client - Server hỗ trợ công nghệ container để xử lý các nhiệm vụ và quy trình công việc liên quan đến việc xây dựng các ứng dụng dựa trên container. Engine tạo ra một quy trình daemon phía máy chủ lưu trữ images (đa phần được quản lý tại https://hub.docker.com/) chạy môi trường ảo hóa containers, và các networks, share vùng nhớ chung volumes. Daemon cũng cung cấp giao diện dòng lệnh phía máy khách (CLI) cho phép người dùng tương tác với daemon thông qua giao diện lập trình ứng dụng Docker. 
Ở trên mình có đề cập đến các từ khóa quan trọng như:

* **Image**:  là thành phần để đóng gói ứng dụng và các thành phần mà ứng dụng phụ thuộc để chạy. Và image được lưu trữ ở trên local hoặc trên một Registry thường là docker-hub.

* **Containers**: là một instance của một image, khi các bạn chạy từ một image nên container các bạn sẽ cần ảo hóa, ghi thêm các thành phần để tạo nên container. Bạn có thể create, start, stop, move or delete container dựa trên Docker API hoặc Docker CLI

* **Network**: cho phép kết nối các container lại với nhau. Kết nối này có thể trên 1 host hoặc nhiều host.

* **volume**: là phần dữ liệu được tạo ra (thường thì sẽ ở máy host) và share cho các container cùng sử dụng. Các bạn có thể hiểu mình có một folder cấu hình nginx và khi mình tạo các máy ảo mình muốn chúng có cùng môi trường config này

* **docker-hub**: là Registry lớn nhất của Docker Images. Có thể tìm thấy images và lưu trữ images của riêng bạn trên Docker Hub nó hoàn toàn miễn phí. Mình thấy nó cũng khá tương tự như git :D, bà chị sư tử có viết một bài [tìm hiểu](https://viblo.asia/p/tim-hieu-ve-docker-hub-va-cach-tao-1-docker-image-Do754e1JKM6) nếu bạn muốn tìm hiểu sâu hơn.

# 3: Một số lệnh cơ bản khi sử dụng docker
### Đầu tiên bạn cài đặt docker cho ubuntu
Đầu tiên các bạn nên update lại ubuntu của mình đã cho chắc :D

```
sudo apt-get update
```

Bạn sẽ cần chạy các lệnh này để cho phép hệ điều hành của mình truy cập kho lưu trữ Docker qua HTTPS.

```
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

**apt-transport-https**: Cho phép trình quản lý gói truyền tệp và dữ liệu qua https

**ca-certificate**: Cho phép hệ thống (và trình duyệt web) kiểm tra chứng chỉ bảo mật

**curl**: Đây là một công cụ để truyền dữ liệu

**software-properties-common**: Thêm tập lệnh để quản lý phần mềm

Thêm key chính thức của Docker:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add –
```

Thêm Repositories stable:

```
sudo add-apt-repository \ "deb [arch=amd64] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) \ stable"
```

sau đó các bạn có thể test xem mình đã cài đặt được docker chưa bằng lệnh
```
docker -v
```

### Các lệnh cơ bản mà mình hay sử dụng

list image:

```
docker images
```

để search các image:
```
docker search keyword
```
(chú ý: các phiên bản ở phần tags)

để pull	image nào thì
```
docker pull keyword:phiên bản(hoặc mới nhất thì là latest)
```
Xóa image nào đó
```
docker image rm keyword:phiên bản (hoặc có thể sử dụng id)
```
Để tạo và chạy một container:
```
docker run thamso Image command thamsolenh
```
VD:
```
docker run -it name_image --name "name_container" -h name_host keyword:latest (hoặc là id_image)
```
Chú ý: **exit**  để đóng container nếu bạn đang bên trong container đó

**-it** là tham số, ở đây tham số i có nghĩa là container có thể nhận tương tác, tham số t là có thể kết nối với terminal

**--name**: đặt name cho container này

**-h**: đặt name cho host này

**keyword:latest**: là images ta dùng để tạo ra container


Để kiểm tra xem container nào đang chạy sử dụng lệnh
```
docker ps
```
Để kiểm tra các container nào đang có kể cả không chạy sử dụng
```
docker ps -a
```
Khởi chạy một container đang dừng
```
docker start name_container(hoặc id_container)
```
Nếu muốn quay lại, truy cập vào một container vẫn đang chạy thì sử dụng lệnh
```
docker attach name_container(id_container)
```
thoát khỏi container đang chạy, mà không exit container đấy
```
ctrl + p + q
```
Nếu đang đứng ngoài máy host mà muốn dừng container đó thì dùng lệnh:
```
docker stop name_container
```
Nếu không sử dụng container đấy nữa có thể xóa đi
```
docker rm name_container
```
Nếu container đấy đang chạy mà muốn xóa nó dùng lệnh
```
docker rm -f name_container 
```

Nếu chúng ta đang đứng ở máy host muốn chạy một lệnh vào container mà không muốn truy cập vào container đấy thì chúng ta sử dụng lệnh
```
docker exec name_container command(lệnh muốn thực thi)
```

**Lưu trữ container thành một image**

Chú ý: Muốn commit một container nào thành image thì container đấy phải dừng (docker ps -a)
```
docker commit name_container new_name_image
```
Xong  kiểm tra lại bằng lệnh docker images để xem images mới đã được tạo ra hay chưa

Từ image build thành một file: Tới đường dẫn muốn image file ở đó
```
docker save --output name_file.tar name_image(hoặc id_image)
```
Xóa image:
```
docker image rm id_image -f
```


Chạy file image.tar để build image đã đóng thành file đấy bằng lệnh
```
docker load -i name_file.tar
```

đổi tên image và tag của nó:
```
docker tag id_image new_name_image
```

# 4: Ví dụ basic với docker
Ở đây mình sẽ cài php theo 2 hướng đó là cài đặt theo lệnh và cài đặt theo docker file.

### Cài bằng lệnh
- Kéo image php về bằng lệnh: 
```
docker pull php:7.3-fpm
```

- kiểm tra xem đã kéo thành công chưa: 
```
docker images
```

- Tạo ra một network chia sẻ: 
```
docker network create --driver bridge www-net
```

- Tạo folder: **mycode/www/index.html**

- Tạo container: 
```
docker run -d --name c-php -h php -v ~/Documents/dockertest/mycode/www:/home/mycode/ --network www-net php:7.3-fpm
```

với 

**-d**: cho biết container tạo xong được chạy nên luôn

**--name c-php**: name của container

**-h php**: host name của container này là php

**-v ~/Documents/dockertest/mycode/www:/home/phpcode/**: Ánh xạ thư mục(volume) từ ~/Documents/dockertest/mycode/www(đường dẫn tuyệt đối) máy host sang /home/phpcode/  của container

**--network www-net**: Sử dụng mạng network www-net
php:7.3-fpm: Phiên bản php được chỉ định chạy

- Truy cập vào container 
```
docker exec -it c-php bash
```
(với c-php name container)

- vào **mycode/www/** trên máy host và tạo một file **.php** để test

- sau đó trong terminator của container run lệnh chạy file php đấy: 
```
php name_file.php
```
**Chú ý**: Nhớ vào thư mục được share trong container ở trên: **/home/phpcode**

- Hoặc có thể check bằng lệnh: **php -version**

- Chúng ta có thể sửa, các file trong thư mục **~/Documents/dockertest/mycode/www** và nó sẽ được cập nhập **/home/phpcode/** 

- Sau khi xong chúng ta có thể sử dụng lệnh 
```
docker ps -a
```
để kiểm tra.
![](https://images.viblo.asia/293ca565-1d77-48dd-be86-0f3eeec2477a.png)


Như hình trên, một container có tên **c-php** được tạo ra, chạy với lệnh script mặc định **docker-php-entrypoint**, dịch vụ **PHP-FPM** chạy và lắng nghe ở cổng **9000**. Script mặc định này mô tả trong một file Dockerfile

```
docker inspect image_name_or_id (docker inspect php:7.3-fpm)
```
Trong image php:7.3-fpm chúng ta chú ý thông tin 
![](https://images.viblo.asia/44e87615-e6f2-4726-8aa2-42677b547158.png)

**"Entrypoint": [ "docker-php-entrypoint"],**

Vì Entrypoint quy định các lệnh chạy mặc định khi tạo - chạy container, nên bạn thấy script docker-php-entrypoint được chạy

### Cài bằng docker file

trước khi cài đặt mình có một số thông tin các bạn cần lắm như sau:

**FROM** : mọi Docker file đều có chỉ thị này, chỉ định image cơ sở

**COPY ADD** : sao chép dữ liệu (set từ vị trí của Dockerfile)

**ENV** : thiết lập biến môi trường

**RUN** : chạy các lệnh.

**VOLUME** : gắn ổ đĩa, thư mục

**USER** : user

**WORKDIR** : Định nghĩa directory cho CMD

**EXPOSE** : thiết lập cổng

**ENTRYPOINT**: container sẽ mặc định chạy tiến trình nào

**CMD**: thiết lập tham số cho ENTRYPOINT

**COPY**: Copy một file từ host machine tới docker image. Có thể sử dụng URL cho tệp tin cần copy, khi đó docker sẽ tiến hành tải tệp tin đó đến thư mục đích.

Tạo ra một file với name **Dockerfile** với nội dung

```docker
FROM php:7.3-fpm

RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo_mysql

WORKDIR /home/nguyen.trung.thanh/Documents/dockertest/mycode/sites/site1
```

Lệnh build dockerfile:
```
docker build -t myimage:v1 -f Dockerfile .
```

**-t** là name và tags của nó

**-f** chỉ định file docker sẽ chạy

**.** đường dẫn của thư mục, vì chạy luôn tại thư mục chứa dockerfile nên chỉ để là . 
# 5: Kết luận
Đọc tới đây chắc các bạn cũng đã hình dung được Docker là gì cũng như cách sử dụng, hoạt động của nó rồi đúng không ạ :). Nếu thấy bài viết hay đừng quên để lại 1 like và comment nhé thank !!!
![](https://images.viblo.asia/7b655f48-8bcb-4fb7-8e53-82a2d417bc51.png)