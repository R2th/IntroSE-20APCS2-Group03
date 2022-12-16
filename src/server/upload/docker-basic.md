# Giới thiệu
  Docker là một công cụ tạo môi trường được "đóng gói" (còn gọi là Container) trên máy tính mà không làm tác động tới môi trường hiện tại của máy.
Một số developer thường tạo sẵn các môi trường này, và upload lên mạng để mọi người lấy về dùng, và mấy cái này gọi là các Images
## Docker làm được gì
### Giả lập môi trường server trên máy local
 Một trong những vấn đề khi lập trình đó là khi chạy trên máy local thì ngon lành nhưng khi deploy dự án lên server thì tạch ... ! Nguyên nhân thì có rất nhiều nhưng cũng có thể là do sự khác nhau môi trường giữa server và local . Khi đó Docker cung cấp cho chúng ta giải pháp tạo ra một môi trường giống hệt của server và có thể chạy thử trên đó 
 ### Setup môi trường
  Khi làm việc với nhiều dự án khác nhau , bạn sẽ gặp một vấn đề đó là phải cài đặt quá nhiều thứ vào máy ... Và nếu không may trong quá trình cài đặt dự án mới mà lại bị conflict với dự án cũ bạn sẽ mất rất nhiều thời gian để tìm hiểu là fix lỗi ! Trong trường hợp này bạn chỉ cần phải tạo một Docker container cho dự án mới  sau đó bạn có thể thoải mái code, setup các môi trường mà không sợ làm ảnh hưởng đến các dự án khác trong máy 
### Chia sẻ các container
 Docker cho phép bạn tạo ra và chia sẻ các conrainer . Từ đó bạn có thể chia sẻ môi trường lập trình với các thành viên trong dự án giúp giảm thời gian trong việc cài đặt môi trường  
# Các thành phần cơ bản
## Image
 Image là file nền của một hệ điều hành, một nền tảng , ngôn ngữ . Từ image bạn có thể tạo ra các container . Image là dạng chỉ đọc (read only)  Để xem các image có trong máy bạn chạy lệnh 
 ```
 $ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              690ed74de00f        6 months ago        960 B
 ```
 Lệnh này sẽ liệt kê toàn bộ các image và các thông số của nó ! Như tag , image ID , created ... 
 Để tải thêm các image bạn có thể lên Docker Hub tìm image cần dùng sau đó chạy lệnh sau để tải image về .
 ```
 $ docker pull {author_name}/{image_name}
 ```
## Container
Là một máy ảo được cấu thành từ Image có một lớp gọi là "writable-file-layer" lớp này có tác dụng lưu lại các thay đổi trong container (setup, add file ....)
Các container này sẽ dùng các tài nguyên của hệ thống vì vậy việc chạy , khởi động sẽ rất nhẹ nhàng nhanh gọn . 
Để xem các container đang chạy bạn dùng lệnh 
```
$ docker ps                     
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
3c0c3a545087        centos              "bin/bash"          19 seconds ago      Up 18 seconds                           nauseous_bartik
```
Ngoài ra bạn có thể dùng lệnh "$ docker ps -a"  để xem các container đã dừng
# Cài đặt
Trong bài viết này mình sẽ hướng dẫn các cài đặt docker trên ubuntu .
1 . Thiết lập docker repository
```
$ sudo apt-get update
$ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
2. Cài đặt Docker CE
```
$ sudo apt-get update
$ sudo apt-get install docker-ce
```
Như vậy là hoàn thành xong bước cài đặt , đơn giản phải không nào ! Để kiểm tra lại xem docker của bạn đã hoạt động chưa .. Bạn có thể chạy lệnh 
```
$ docker 
```
# Build image docker
Ở đây mình sẽ tạo một image cài đặt nginx
Đầu tiên cần tạo 1 file Dockerfile
```
FROM ubuntu  # Sử dụng image ubuntu
MAINTAINER duytung99, duytung.gmail.com # Tên tác giả
RUN apt-get update # Chạy câu lệnh
RUN apt-get install -y nginx 
```
Sau đó để tạo image chúng ta chạy câu lệnh 
```
docker build -t duytung99/nginx:1.0 .
```
Để kiểm tra image được tạo chạy lệnh 
```
$ docker image
...
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
mysql                  5.7                 5d4d51c57ea8        3 weeks ago         374MB
ruby                   2.4.1               e7ca4a0b5b6d        6 months ago        684MB
```
# Kết luận
Hy vọng bài viết này sẽ giúp các bạn có cái nhìn trực quan nhất về docker và có thể áp dụng docker vào trong dự án của mình ! Thank for reading !