Docker là một công nghệ container hóa cho phép bạn nhanh chóng xây dựng, kiểm tra và triển khai các ứng dụng dưới dạng các thùng chứa di động, tự cung cấp, có thể chạy hầu như mọi nơi. Docker đã trở thành tiêu chuẩn thực tế cho việc triển khai container và nó là một công cụ thiết yếu cho các kỹ sư DevOps.
# 1. Chuẩn bị
Để làm theo hướng dẫn này các bạn cần một VPS sử dụng hệ điều hành CentOS 7. Các bạn có thể tạo máy ảo Vmware hoặc đăng kí vps trên các nhà cung cấp hosting như:
-  **AWS**
 - **GCP**
 -  **Vultr**
 -  **Digitalocean**
# 2. Các bước cài đặt
#### Bước 1: Cài đặt các gói cần thiết
Đầu tiên các bạn cần cập nhật hệ thống vào cài đặt một số gói cần thiết:
``` 
yum -y updateyum -y install yum-utils device-mapper-persistent-data lvm2
```
#### Bước 2: Thêm Docker stable repository
Tiếp theo, chạy lệnh sau sẽ thêm kho lưu trữ Docker vào hệ thống của bạn:

```
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
#### Bước 3: Cài đặt Docker trên CentOS 7
Sau khi thêm kho lưu trữ Docker, hãy sử dụng lệnh bên dưới để cài đặt Docker

```
yum -y install docker-ce
```
#### Bước 4: Khởi động docker
Sau khi Docker được cài đặt hoàn tất, hãy chạy các lệnh sau để khởi động Docker:

```
systemctl start docker
systemctl enable docker
```
Để kiểm tra xem Docker đã hoạt động hay chưa các bạn sử dụng lệnh sau:
```
systemctl status docker
```
#### 3. Cài đặt Docker Compose
Để cài đặt các Docker Compose các bạn sử dụng các lệnh sau

```
curl -L "https://github.com/docker/compose/releases/download/1.27.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
Để kiểm tra phiên bản Docker Compose dùng lệnh
```
docker-compose --version
```
#### 4. Giao diện dòng lệnh
Lệnh Docker CLI có dạng như sau:
```
docker [option] [subcommand] [arguments]
```
#### 5. Docker Images
- Docker image được tạo thành từ một loạt các lớp hệ thống tập tin tạo nên một ứng dụng phần mềm thực thi. Image là một tệp nhị phân bất biến bao gồm ứng dụng và tất cả các thành phần phụ thuộc khác như thư viện, tệp nhị phân và các hướng dẫn cần thiết để chạy ứng dụng.
- Bạn có thể hiểu Docker Images như một ảnh chụp nhanh của Docker Container. Hầu hết các Docker Images có sẵn trên Docker Hub. Docker Hub là dịch vụ được sử dụng để lưu giữ Docker Images.

##### Tìm kiếm Docker Image
Để tìm kiếm Docker Images trên Docker Hub, hãy sử dụng lệnh như sau.
```
docker search image-name
```
###### Ví dụ: để tìm kiếm CentOS image, bạn dùng lệnh như sau:
```
docker search centos
docker_search_centos
```
Hầu hết các Docker Image trên Docker Hub được gắn tag với số phiên bản. Khi không có tag nào được chỉ định, Docker sẽ tải phiên bản mới nhất của Image.
##### Tải Docker Image
Ví dụ: để tải xuống bản chính thức mới nhất của Image CentOS 8, bạn sẽ sử dụng lệnh sau:
```
docker image pull centos
```
Tùy thuộc vào tốc độ Internet của bạn, quá trình tải xuống có thể mất vài giây hoặc vài phút. Khi không chỉ định tag, Docker sẽ tải Image CentOS mới nhất, tại thời điểm viết bài viết này là CentOS 8. Nếu bạn muốn tải xuống một bản phát hành CentOS cũ hơn, hãy thêm tag để chỉ định phiên bản
```
docker image pull centos:7
docker_image_pull
```
Để liệt kê tất cả các Image đã tải về sử dụng lệnh sau:
```
docker image ls
docker_image_ls
 ```
 Xoá Docker image
Nếu vì một số lý do, bạn muốn xóa một Image, bạn có thể làm điều đó với lệnh sau:
```
docker image rm image-name
```
###### Ví dụ để xoá Image centos sử dụng lệnh như sau
```
docker image rm centos
docker-image
```
Lưu ý: Bạn sẽ không thể xoá Image nếu bạn đang chạy Container dựa trên Image đó
 #### 6. Docker Containers
- Một thể hiện của Image được gọi là Container. Container đại diện cho thời gian chạy cho một ứng dụng, quy trình hoặc dịch vụ.
- Bạn có thể hiểu Docker Image là lớp (Class) và Docker container là một thể hiện của một lớp (Class).
- Chúng ta có thể bắt đầu, dừng, loại bỏ và quản lý một container.
#### Start Docker Container
Lệnh sau sẽ khởi động Container CentOS dựa trên Image centos. Nếu bạn run Image centos, Docker sẽ tự động tải xuống Image centos trước khi chạy Container:
```
docker container run centos
```
Switch -it cho phép chúng ta tương tác với container thông qua dòng lệnh. Để bắt đầu một loại container tương tác sử dụng lệnh như sau:
```
docker container run -it centos /bin/bash
```
#### Liệt kê Docker Container
Để liệt kê các container đang hoạt động, sử dụng lệnh như sau:
```
docker container ls
```
Để xem cả Container đang hoạt động và không hoạt động, sử dụng lệnh như sau:
```
docker container ls -a
 ```
 #### Xoá bỏ Docker Container
Để xóa một hoặc nhiều container, sao chép ID container (hoặc ID) và dán chúng sau lệnh docker container rm:
```
docker container rm c55680af670c
```
Cám ơn các bạn đã theo dõi, hẹn gặp lại các bạn vào những bài sau. Thân ái và quyết thắng 🤗
#### Tài liệu tham khảo
#### [#Link1 ](https://vietcalls.com/huong-dan-cai-dat-docker-tren-centos-7/)
#### [#Link2](https://docs.docker.com/engine/install/centos/)