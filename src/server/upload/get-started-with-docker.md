# Orientation and setup
## Docker concepts
Docker là một nền tảng cho các developer và hệ thống để phát triển, deploy và run các ứng dụng với các container. Việc sử dụng các Linux container để deploy các ứng dụng được gọi là *containerization*. Các container không phải là mới, nhưng việc sử dụng chúng để dễ dàng deploy các ứng dụng là. 

Containerization ngày càng phổ biến vì container là:
* Flexible: Ngay cả các ứng dụng phức tạp nhất cũng có thể được chứa.
* Lightweight: Container tận dụng và chia sẻ kernel host.
* Interchangeable: Bạn có thể deploy các bản cập nhật và nâng cấp nhanh chóng.
* Portable: Bạn có thể xây dựng cục bộ, deploy lên cloud và run mọi nơi.
* Scalable: Bạn có thể tăng và tự động phân phối các bản sao container.
* Stackable: Bạn có thể xếp các service theo chiều dọc và on-the-fly.
## Images and containers
Một container được khởi chạy bằng cách chạy một image. Image là một gói thực thi bao gồm mọi thứ cần thiết để chạy một ứng dụng - mã, thời gian chạy, thư viện, biến môi trường và tệp cấu hình.

Một container là một thể hiện thời gian run của một image - những gì image trở thành trong bộ nhớ khi được thực thi (nghĩa là một image có trạng thái hoặc một user process). Bạn có thể thấy một danh sách các container đang run của mình bằng lệnh `docker ps`, giống như bạn làm trong Linux.
## Containers and virtual machines
Một container chạy natively trên Linux và chia sẻ kernel của máy chủ với các container khác. Nó chạy một process riêng biệt, không chiếm nhiều bộ nhớ hơn bất kỳ thực thi nào khác, làm cho nó nhẹ.

Ngược lại, một máy ảo (VM) chạy một hệ điều hành khách Guest đầy đủ với quyền truy cập ảo vào tài nguyên máy chủ thông qua một trình ảo hóa. Nói chung, VM cung cấp một môi trường có nhiều tài nguyên hơn hầu hết các ứng dụng cần.
![](https://images.viblo.asia/8bed89be-eb46-4361-8865-9762ef53c34a.png)
![](https://images.viblo.asia/a9cc9969-218f-413c-b0b7-caafbf66d8c9.png)
## Prepare your Docker environment
Cài đặt phiên bản maintain của Docker Community Edition (CE) hoặc Enterprise Edition (EE) trên nền tảng được hỗ trợ.

> Để tích hợp full Kubernetes.
> 
> Kubernetes trên Docker Desktop cho Mac có sẵn trong 17.12 Edge (mac45) hoặc 17.12 Stable (mac46) trở lên.
> 
> Kubernetes trên Docker Desktop cho Windows chỉ khả dụng trong 18.02 Edge (win50) và chỉ các edge channel cao hơn.
> 
Mọi người có thể cài đặt docker theo hướng dẫn [tại đây ](https://docs.docker.com/engine/installation/)
### Test Docker version
Chạy `docker --version` và đảm bảo rằng bạn có phiên bản Docker được hỗ trợ:
```
docker --version

Docker version 17.12.0-ce, build c97c6d6
```
Chạy `docker info` hoặc (`docker version` không có --) để xem chi tiết hơn nữa về cài đặt docker của bạn:
```
docker info

Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 17.12.0-ce
Storage Driver: overlay2
...
```
Để tránh lỗi permission (và việc sử dụng `sudo`), hãy thêm người dùng của bạn vào `docker`
group. Chi tiết xem [tại đây](https://docs.docker.com/install/linux/linux-postinstall/)
### Test Docker installation
Kiểm tra xem cài đặt của bạn có hoạt động không bằng cách chạy Docker image đơn giản, hello-world:
```
docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
ca4f61b1923c: Pull complete
Digest: sha256:ca0eeb6fb05351dfc8759c20733c91def84cb8007aa89a5bf606bc8b315b9fc7
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```
List image hello-world đã được tải xuống máy của bạn:

`docker image ls`

List container hello-world (được sinh ra bởi image) exit sau khi hiển thị thông báo của nó. Nếu nó vẫn run, bạn sẽ không cần  `--all` option:
```
docker container ls --all

CONTAINER ID     IMAGE           COMMAND      CREATED            STATUS
54f4984ed6a8     hello-world     "/hello"     20 seconds ago     Exited (0) 19 seconds ago
```
## Recap and cheat sheet
```
## List Docker CLI commands
docker
docker container --help

## Display Docker version and info
docker --version
docker version
docker info

## Execute Docker image
docker run hello-world

## List Docker images
docker image ls

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq
```
## Conclusion of part one
Containerization làm cho CI / CD liền mạch. Ví dụ:
* các ứng dụng không có phụ thuộc hệ thống
* cập nhật có thể được push đến bất kỳ phần nào của ứng dụng phân tán
* mật độ tài nguyên có thể được tối ưu hóa.

Với Docker, việc mở rộng ứng dụng của bạn là vấn đề xoay vòng các tệp thực thi mới, không chạy các máy chủ VM nặng.
# Tài liệu tham khảo
https://docs.docker.com/get-started/