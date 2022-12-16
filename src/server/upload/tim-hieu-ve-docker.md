# Docker là gì?
Docker là một phần mềm mã nguồn mở, sử dụng cho việc ảo hóa, để có thể chạy nhiều hệ điều hành trên cùng một host. Không giống như Hypervisiors - được sử dụng tạo ra máy ảo (Virtual machines), việc ảo hóa trong Docker được thực hiện dựa trên system-level, hay còn được gọi là các container.
# So sánh Containers và máy ảo
Một container được chạy nguyên bản trên Linux và có thể chia sẻ và dùng chung tài nguyên máy host với những container khác. Chúng chạy trên những tiến trình riêng biệt, không tiêu tốn quá nhiều bộ nhớ so với thực thi khác -> tính lightweight.

Trái lại, một máy ảo chạy như một hệ điều hành khách, cần quyền truy cập đẩy đủ đến tài nguyên của máy chủ. Vì vậy sẽ tiêu tốn đến nhưng vùng tài nguyên chưa thực sự sử dụng đến.

Ngoài ra, không giống như máy ảo, Docker container có thể giao tiếp với phần cứng của máy host (Ví dụ: Internet adapter có thể tạo ra nhiều Internet adapter ảo khác), Docker container chạy trong một môi trường độc lập, nằm tại tầng trên của hệ điều hành của host.
![](https://images.viblo.asia/c8556586-b8a1-4f78-a8b5-5c248a7b18d4.png)
# Kiến trúc
Docker sử dụng kiến trúc client-server. Docker client gửi yêu cầu để Docker daemon xử lí. Docker daemon đảm nhiệm vai trò thực hiện việc xây dựng, chạy và phân tán Docker container. Docker client và daemon có thể chạy trên cùng hệ thống hoặc tương tác từ xa qua REST API, qua UNIX socket hoặc một mạng giao tiếp.
![](https://images.viblo.asia/fb3376d4-6985-4cde-8725-036be8946407.png)
## Docker registries
Một docker registry có nhiệm vụ lưu trữ các images. Docker Hub là một ví dụ điển hình, nó là một public registry mà mọi người đều có thể sử dụng. Registry mặc định được cấu hình khi cài đặt docker là Docker Hub. Tuy nhiên, bạn có thể tự cấu hình một registry khác để lưu trữ image của bạn. Việc cấu hình registry sẽ quyết định đến nơi lưu trữ image khi sử dụng docker push và image nào được kéo về khi sử dụng docker pull.

Để pull image `alpine` từ registry Docker Hub, ta sử dụng lệnh:

```
docker pull alpine:lastest
```

Ở đây, `alpine` là tên của image và `latest` là tag của image đó, cũng có thể hiểu giống như phiên bản của image.

Để push một image lên registry:

```
docker push my-image:1.0
```
## Docker objects
### Image
Một image là một mẫu, không thể chỉnh sửa, chứa các tập lệnh để tạo nên một Docker container. Nếu bạn nào đã từng cài Window hoặc ubuntu, thì image chính là file mà bạn download về để cài đặt. Thông thường, một image được tạo dựa trên một image khác (image cơ sở), cộng với một vài tùy biến khác. Ví dụ, image của bạn được xây dựng dựa trên image ubuntu, nhưng có cài thêm web server, có thêm source code ứng dụng web của bạn cùng với tất cả những thành phần để có thể chạy được ứng dụng đó như: mysql, redis,...

Thông thường, để build một Docker image chúng ta cần tạo một file `Dockerfile`, ví dụ 1 `Dockerfile`:
```Docker
# Filename: Dockerfile 
FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY
```
Câu lệnh build một image:
```
docker build -t yourusername/repository-name .
```
### Container
Khi chạy một instance của một image được gọi là một container. Bạn có thể tạo, khởi động, tạm dừng, sửa đổi hoặc xóa container bằng Docker API hoặc CLI. Các container dường như độc lập với nhau. Vì vậy, Docker cho phép chạy nhiều container với những ứng dụng và chức năng khác nhau. Cũng giống như chúng ta cài một máy ảo để chạy ứng dụng vậy. Nhưng đối với Docker sử dụng container là ít chi phí hơn.

Để chạy một container từ image ta sử dụng lệnh `docker run`. Ví dụ:
```
docker run -it alpine:latest /bin/bash
```
### Volumes
Volumes là một cơ chế có thể chia sẻ thư mục và dữ liệu từ máy host với container. Bằng việc ánh xạ thư mục hoặc file từ máy host với thư mục hoặc file trong container. Ví dụ: trong máy host có thư mục `/home/deploy/data`, ánh xạ tới thư mục `/data` trong container, khi đó tất cả dữ liệu có trong thư mục `/home/deploy/data` sẽ được chia sẻ, dùng chung với thư mục `/data` có trong container. Khi có thay đổi dữ liệu thì cả máy host và container đều thay đổi, vì chúng đều trỏ chung đến cùng 1 thư mục `/home/deploy/data` trên máy host.

Ngoài ra, chúng ta cũng có thể tự tạo một ổ đĩa do Docker quản lí để chia sẻ dữ liệu. Những thư mục hoặc ổ đĩa được chia sẻ thì dữ liệu trong đó sẽ không bị mất đi khi container bị xóa.
### Network
Docker network là một cơ chế giúp các container độc lập có thể giao tiếp qua lại với nhau, nếu chúng có ít nhất 1 kết nối chung. Một ví dụ đơn giản là ta có 3 container, 1 container chạy ứng dụng web, 1 container chạy mysql, 1 container chạy redis. Mặc định khi chạy 3 container này sẽ là riêng biệt, vậy để container web kết nối được với mysql và redis thì phải cần đến Docker network. Docker network quản lí những network adapter ảo, cho phép tạo nên một mạng lưới giao tiếp giữa các container với nhau mà vẫn đảm bảo giữ được tính độc lập giữa chúng.
# Tổng kết
Như vậy, bài viết này đã trình bày khái niệm về Docker, một số đối tượng cơ bản nhất trong Docker. Docker hỗ trợ chúng ta rất nhiều từ công đoạn từ phát triển và deploy. Giảm được nhiều chi phí, thời gian và đồng thời phân chia ứng dụng thành những container rất dễ dàng trong việc quản lí.