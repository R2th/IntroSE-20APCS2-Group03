# 1. Giới thiệu
Là một lập trình viên, ai ai cũng muốn trang bị những công nghệ mới nhất, xịn xò nhất, hot nhất, nổi bật giữa những công nghệ nằm trên top trending ấy mà hôm nay mình muốn giới thiệu tới các bạn là Docker. 

![](https://images.viblo.asia/fad7cf1a-772f-43e4-9042-e96d5d903b2b.png)

# 2. Containerization và Hypervisor
## Hypervisor là gì ?
`Hypervisor` là một công nghệ ảo hóa ở tầng `hardware` (phần cứng), có thể liệt kê ra một vài ứng dụng như là `VMWare, Virtual box, Bluestack`...

Ưu điểm của việc sử dụng `hypervisor` chính là rất dễ sử dụng, chỉ cần cài ứng dụng lên máy và chúng ta sẽ có cafi được nhiều các hệ điều hành khác nhau trên máy rồi. Tuy nhiên có lợi thì ắt phải có hại, mà có vẻ đối với `hypervisor` lại có nhiều hại hơn
* Lãng phí tài nguyên: khi cài đặt chúng ta cần phải chia sẻ ổ cứng hay RAM từ máy thật sang máy ảo,
* Thời gian khởi động rất lâu : Hồi còn đi học đại học thì mỗi lần chạy máy ảo (VMware) trên máy thì là một sự cực hình với mình, nó quá lâu =))

Chính vì những nhược điểm trên mà sau này đã cho ra mắt công nghệ `Containerization`.
## Containerization là gì ?
`Containerization` là công nghệ ảo hóa ở tầng OS (hệ điều hành), công nghệ được sử dụng ở đây chính là Docker. 

Cũng giống với `Hypervioser` thì `Containerization` cũng cho chúng ta có thể cài được nhiều máy ảo trên máy thật. Sự khác biệt là chúng dúng chung luôn tài nguyên với máy thật mà không phải chia chác gì cả. Dùng bao nhiêu thì cấp bấy nhiêu, dùng xong thì giải phóng.
# 3. Docker là gì ? 
Docker là một `open platform` cung cấp cho chúng ta các công cụ, serivce giúp chúng ta đóng gói và chạy chương trình của mình trên các môi trường khác nhau một cách nhanh, gọn, nhẹ.

Docker được viết bằng ngôn ngữ Go. Docker sẽ công cấp cho chúng ta một không gian để làm việc là `containers`.

Giả sử bạn có một project muốn gửi cho bạn bè ( ví dụ người mà không biết quá nhiều về lập trình) để chạy thử trên máy họ, người ta không cần biết bạn cài những công nghệ nào vào project để chạy, vì chúng ta đã gói gọn các công nghệ trong docker rồi, việc chúng ta cần làm là đưa cho họ vài câu lệnh để chạy là xong, quả là tiện.

# 4. Dùng docker khi nào ?
Giả sử, một ngày nào đó chúng ta được xếp vào một dự án rất lớn, sử dụng rất nhiều công nghệ ví dụ như :
* PHP
* Laravel
* PostgreSQL
* Redis
* MongoDB
* Laravel Echo và ti tỉ các package khác được sử dụng
* Rồi lại mỗi thứ nó lại là một version khác nhau 

Mới vào dự án thôi mà việc cài đặt thôi đã cảm thấy "***ối dồi ôi***" rồi, việc cài đặt có thể thấy là khá phức tạp, chưa kể đến là máy bạn không có nhiều bộ nhớ để lưu trữ các package cũng như công nghệ trên :joy:.  

Hay một trường hợp khác, bạn đang có một project X ở máy chạy ngon lành cành đào rồi thì bỗng dưng lại cần cài đặt project Y lên máy, rất dễ xảy ra những xung đột liên quan đến các version package các kiểu...

Đến đây thì chúng ta có thể nên nghĩ tới sử dụng Docker để giải quyết bài toán cài đặt này, giúp chúng ta tiết kiệm tối đa quá trình cài đặt, giảm tải lượng tài nguyên được sử dụng. 
## Lợi ích của việc sử dụng docker
* Nhanh và nhẹ
* Dễ dàng mở rộng ứng dụng
* Giảm chi phí cơ sở hạ tầng
* Tiện lợi hơn, tiết kiệm thời gian hơn trong quá trình cài đặt
* Dễ dàng lựa chọn version của các công nghệ (mysql, php...). Tùy vào mục đích nhu cầu sử dụng bạn có thể cài đặt version bạn muốn
* Cộng đồng phát triển lớn
* Có thể tái sử dụng

Và một lí do mà chúng ta nên yên tâm sử dụng docker hơn vì chính ông lớn Google cũng đang sử dụng docker hằng ngày, chứng tỏ tác dụng của nó là không hề nhỏ =))
# 5. Các khái niệm cơ bản
Về cơ bản nhất, trước tiên chúng ta cần nắm được vài khái niệm này trước
* Docker image
* Dockerfile
* Docker hub
* Docker Container


![](https://images.viblo.asia/b99c9c30-c7cd-4178-a1c5-229ef52f5523.png)

## Docker image
`Docker image` có thể hiểu như là một khuôn mẫu để tạo ra `container`, nó sẽ tạo ra `container` khi chạy một `image` nào đó. Một `image` sẽ định nghĩa môi trường và những thứ có bên trong môi trường đó (thư viện, biến môi trường hay các file cấu hình...).

Chúng ta có thể tự tạo ra riêng một image của mình hoặc là lấy images của người khác về dùng cũng được nếu nó public.

Ví dụ như chúng ta có thể tạo một image bên trong bao gồm có
* Ubuntu 18.04
* Ruby
* Ruby on Rails

## Docker container
Người ta thường hay liên tưởng `image` và `container` giống như trong lập trình hướng đối tượng. Nếu `image` là class, thì `container` chính là thực thể của class đó.

Từ một `image` chúng ta có thể tạo ra hàng chục `container` khác nhau. 

Chúng ta có thể hiểu `container` chính là một máy ảo, nhưng tốc độ của nó thì nhanh hơn rất nhiều. Nếu như bạn bật nhiều chương trình máy ảo như VMware lên thì tình trạng treo máy rất dễ xảy ra, nhưng khi bạn chạy cả chục con `container` lên thì máy bạn vẫn cứ là bình thường.

Chúng ta có thể start, stop, move, delete, create container thông qua việc sử dụng Docker API hoặc là Docker CLI.

## Docker hub
Đơn giản `Docker hub` là nơi dùng để lưu trữ các image, giống như Github hay Gitlab chứa source code vậy. Chúng ta có thể pull hoặc push `image` lên `Docker hub` để lưu trữ cũng như public cho cộng đồng sử dụng.

## Dockerfile
`Dockerfile` là một file dạng text, không có đuôi, bên trong file này chứa một tập các câu lệnh để tạo ra `docker image`.

Một số lệnh cơ bản trong `Dockerfile`
* **FROM <image gốc> : <phiên bản>**: Đây là lệnh bắt buộc trong `Dockerfile` nhằm để chỉ `image` này được build từ đầu ra (từ image gốc nào).
*  **RUN <câu lệnh>**: Dùng để thực thi một câu lệnh nào đó trong quá trình `build image`, có thể có nhiều lệnh RUN trong một Dockerfile
* **CMD <câu lệnh>**: Trong Dockerfile chỉ tồn tại duy nhất một lệnh `CMD`, lệnh này dùng để thực thi câu lệnh trong quá trình `bật container`
* **LABEL**: dùng để cung cấp meta data cho image, có thể dùng để thêm thông tin của maintainer. Để xem thông tin `LABEL` sử dụng lệnh `docker image inspect`
* **EXPOSE**: lệnh này để cho docker biết container sẽ lắng nghe trên các cổng mạng được chỉ định khi chạy
* **ENV <key>=<value>**:  được dùng để định nghĩa biến môi trường trong container
* **ADD <src> <dest>**: dùng để copy một thư mục ở local hoặc một remote file nào đó (định nghĩa bằng <src>) vào một thư mục nào đó trong container
* **ENTRYPOINT <câu lệnh>**: định nghĩa những lệnh sẽ được thực thi trong quá trình `container chạy`, những câu lệnh này thường được viết trong file `.sh`
* **VOLUME**: được sử dụng để mount thư mục từ local vào trong container
* **WORKDIR**: thiết lập thư mục đang làm việc cho các chỉ thị khác như `CMD, RUN, ENTRYPOINT, COPY, ADD`
* **ARG**: định nghĩa biến được dùng trong quá trình build image
    
### Tạo Dockerfile đơn giản
Trước tiên để sử dụng được docker chúng ta phải đi đến phần cài đặt rồi, các bạn có thể xem ở đây [https://docs.docker.com/install/](https://docs.docker.com/install/).

Sau khi cài xong chạy lệnh để kiểm tra xem docker đã được cài đặt trên máy chưa
```bash
docker -v
=> Docker version 19.03.8, build afacb8b7f0
 ```
 Như thế này thì là yên tâm sử dụng rồi.
    
 Tiếp theo bạn tạo một file `Dockerfile` với nội dung như này
 ```html:Dockerfile
 FROM ubuntu

MAINTAINER quangphu

WORKDIR /app

RUN apt-get update

COPY . .

CMD ["/script.sh"]
 ```
 và một file `script.sh`
 ```
 #! bin/sh

echo quang phu day
 ```
    
 Mình sẽ giải thích qua một chút các lệnh ở `Dockerfile`.
    
*  FROM ubuntu: cái này để định nghĩa image gốc của image mình tạo là ở môi trường nào (môi trường này đã phải được build thành image rồi nhé). Image ở đây mình sử dụng là `ubuntu`, lấy trên `Docker hub`, là phiên bản offical nên các bạn yên tâm không có mã độc gì trong này đâu nhé.
*  MAINTAINER quangphu: cái này thì là để định nghĩa tác giả của image
* WORKDIR /app : cái này là thư mục sẽ được tạo trong image tên là `app` và chuyển phiên làm việc của mình vào thư mục này. Lệnh này tương đương với lệnh `mkdir /app && cd /app` trong ubuntu nhé bà con.
* COPY . . : hai dấu chấm có nghĩa là copy tất cả code các kiểu ở trong thư mục hiện tại bạn đang làm việc ở host vào bên trong thư mục `/app` của `container`.
*  CMD ["/script.sh"] : chạy lệnh khi khởi tạo container từ image
    
OK, giờ chúng ta build image dùng lệnh sau nhé
```bash
docker build -t learn-docker:v1 .
 ```
    
Trong đó `docker build` là lệnh mặc định để build image. Flag `-t` có nghĩa là tạo 1 tên của image + version, ở đây mình đặt là `learn-docker` với phiên bản là `v1`. Cuối cùng là dấu chấm `.` để docker tìm file `Dockerfile` ở folder hiện tại rồi chạy.
```bash
Sending build context to Docker daemon  3.072kB
Step 1/6 : FROM ubuntu
 ---> 4dd97cefde62
Step 2/6 : MAINTAINER quangphu
 ---> Using cache
 ---> 997979fcea02
Step 3/6 : WORKDIR /app
 ---> Running in 7b110e0675fb
Removing intermediate container 7b110e0675fb
 ---> ec89d5cdae01
Step 4/6 : RUN apt-get update
 ---> Running in d33c3ca46157
Fetched 17.2 MB in 16s (1089 kB/s)
Reading package lists...
Removing intermediate container d33c3ca46157
 ---> 253e11c7f719
Step 5/6 : COPY . .
 ---> 0ce67f80f433
Step 6/6 : CMD ["/script.sh"]
 ---> Running in 54bba7d3d874
Removing intermediate container 54bba7d3d874
 ---> 81762f231711
Successfully built 81762f231711
Successfully tagged learn-docker:v1
```
Như vậy là đã build thành công được image rồi, để kiểm tra image sử dụng lệnh `docker images`.
```bash
REPOSITORY                                        TAG                 IMAGE ID            CREATED             SIZE
learn-docker                                      v1                  81762f231711        5 seconds ago       100MB
```
Cơ bản đã xong được phần tạo image, ngoài ra chúng ta có thể thêm, sửa xóa image tùy thích, các câu lệnh các bạn lên trang chủ của docker để tìm hiểu nhé.
    
# Các khái niệm khác 
1. **Docker toolbox**  : đây là tool của docker được sử dụng trên MacOS và WIndows
2.  **Docker Engine** : Docker engine hoạt động như một ứng dụng client-server, Docker engine cung cấp cho chúng ta function để có thể làm việc được với docker image hay docker container. Để sử dụng các function này chúng ta có thể sử dụng Rest API hoặc CLI của docker. (`docker run ...`)
3. **Docker Trusted Registry** : Docker Trusted Registry giống như Docker hub nhưng là ở một phiên bản private tuy nhiên chúng ta sẽ mất phí. Nếu công ty nào đó cần bảo mật, private image thì sẽ dùng đến registry này.
4. **Docker machine** : là công cụ giúp cài đặt docker engine lên môi trường máy ảo một cách tự động.
5. **Docker swarm** : Có thể hiểu là nó là một thằng trung gian giữa bạn và các docker host, nó sẽ tập trung các docker host về một khối. Khi làm việc chúng ta sẽ làm việc với cái virtual host mà docker swarm tạo ra.
6. **Docker registry** : Tương tự với docker trusted registry nhưng là một phiên bản không mất phí, open source (github registry...)
7. **Docker cloud** : là hệ thống Paas cho phép bạn dễ dàng triển khai các app của mình lên môi trường cloud.
8. **Docker daemon** : Docker daemon chạy trên các máy host. Người dùng sẽ không tương tác trực tiếp với các daemon, mà thông qua Docker client. Docker sử dụng kiến trúc client-server. Docker client sẽ liên lạc với các Docker daemon, các Docker daemon sẽ thực hiện các tác vụ build, run và distribuing các Docker container. Cả Docker client và Docker daemon có thể chạy trên cùng 1 máy, hoặc có thể kết nối theo kiểu Docker client điều khiển các docker daemon giao tiếp với nhau thông qua socket hoặc RESTful API.
9. **Docker client** : Là giao diện người dùng của Docker, nó cung cấp cho người dùng giao diện dòng lệnh và thực hiện phản hồi với các Docker Daemon.  
    
# Tái bút
Bài viết cũng đã khá dài, trên đây là những kiến thức mình tìm hiểu cũng như sưu tầm lại được. Hy vọng sẽ giúp ích phần nào đó cho các newbie.
    
Nếu hay hãy tặng mình 1 upvote để mình lấy tinh thần nhé.