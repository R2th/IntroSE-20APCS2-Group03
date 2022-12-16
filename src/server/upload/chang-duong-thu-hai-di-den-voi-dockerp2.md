## 1. Lời mở đầu
Xin chào tất cả mọi người :grin: đến hẹn lại lên, đến với bài chia sẻ ngày hôm nay mình lại nối tiếp bài chia sẻ của lần trước thôi.

Nếu các bạn chưa đọc bài lần trước có thể vào link dưới để đọc nhé https://viblo.asia/p/chang-duong-dau-tien-di-den-voi-docker-YWOZrQRYKQ0

Đến với bài hôm nay thì mình xin chia sẻ các bạn tiếp về chủ đề docker thôi nó sẽ là 1 list danh sách tìm hiểu từ docker, lý thuyết đến thực hành. Phần 2 này thì mình xin chia sẻ các bạn tìm hiểu về Docker Image các câu lệnh thao tác với image, start 1 container cũng như stop nó.

## 2. Tìm hiểu docker image
Docker Image có thể được so sánh với một mẫu được sử dụng để tạo Docker Container. Chúng là các khối xây dựng từ Docker Container.
![](https://images.viblo.asia/fe4d19c5-085e-49bd-beec-a27512579098.png)

Docker cho phép mọi người (hoặc công ty) tạo và chia sẻ phần mềm thông qua  Docker Images. Ngoài ra, bạn không phải lo lắng về việc liệu máy tính của bạn có thể chạy phần mềm trong  Docker Images hay không - một Docker Container luôn có thể chạy nó . 

Các bạn có thể sử dụng Docker Images từ trang https://hub.docker.com/ hoặc bạn có thể tự tạo riêng cho mình một Docker Images theo yêu cầu riêng của từng người.

Để xây dựng hình ảnh của riêng bạn, bạn tạo Dockerfile với cú pháp đơn giản để xác định các bước cần thiết để tạo hình ảnh và chạy nó. Mỗi hướng dẫn trong Dockerfile tạo một lớp trong hình ảnh. Khi bạn thay đổi Dockerfile và xây dựng lại hình ảnh, chỉ những lớp đã thay đổi mới được xây dựng lại. Đây là một phần của những gì làm cho hình ảnh rất nhẹ, nhỏ và nhanh, khi so sánh với các công nghệ ảo hóa khác.

Chúng mình cùng đi tìm hiểu câu lệnh thao tác với Docker Image nhé

Đầu tiên chúng ta phải biết trong lệnh Docker Image gồm những gì, chúng ta chạy lệnh dưới để xem nhé
```
docker image
```
![](https://images.viblo.asia/4e14c6ee-a2b1-4ef7-9b80-0b0f775e5719.png)

Tất cả những câu lệnh chúng ta thao tác với Docker Image đã hiện ra việc của chúng ta là thử từng câu lệnh xem chức năng của nó là gì nhỉ. Chú ý khi bạn muốn trợ giúp câu lệnh nào thì các bạn gõ lệnh docker và thêm `--help` vào cuối câu lệnh nhé, sẽ show ra trợ giúp chúng ta.

Lệnh kiểm tra danh sách docker image:
```
docker images
```
![](https://images.viblo.asia/6ccf861e-d84f-4f5a-93e8-8ad9eaa79a07.png)
Các bạn có thể nhìn thấy có 2 docker image là ubuntu và centos. Mỗi docker image gồm các thuộc tính
- REPOSITORY: Tên của image
- TAG: Đây là phiên bản của docker image
- IMAGE ID: Mỗi image có duy nhất 1 id để phân biệt
- CREATED: Số ngày kể từ khi image được tạo
- SIZE: Kích thước ảo của image


Lệnh kéo docker image từ kho lưu trữ trên respository  về để dùng. Các bạn cũng có thể chỉ định phiên bản của docker image khi chúng ta kéo về bằng cách chỗ version các bạn điền (phiên bản cụ thể ví dụ 10/ hoặc laster là phiên bản mới nhất)
```
docker image pull ten-docker-image:version
```
Lệnh xóa docker image
```
docker image rm ImageID/ImageName
```

## 3. Tìm hiểu container
Một container là một ví dụ có thể chạy được của một hình ảnh. Bạn có thể tạo, bắt đầu, dừng, di chuyển hoặc xóa một container bằng API Docker hoặc CLI. Bạn có thể kết nối một container với một hoặc nhiều mạng, đính kèm bộ lưu trữ vào nó hoặc thậm chí tạo một hình ảnh mới dựa trên trạng thái hiện tại của nó.

Theo mặc định, một container được cách ly tương đối tốt với các container khác và máy chủ của nó. Bạn có thể kiểm soát cách cô lập mạng, bộ lưu trữ hoặc các hệ thống con cơ bản khác từ các repository khác hoặc từ máy chủ.

Một repository được xác định bởi hình ảnh của nó cũng như bất kỳ tùy chọn cấu hình nào bạn cung cấp cho nó khi bạn tạo hoặc khởi động nó. Khi một container được gỡ bỏ, mọi thay đổi về trạng thái của nó không được lưu trữ trong bộ lưu trữ liên tục sẽ biến mất.

```
docker container
```
![](https://images.viblo.asia/c2f0f098-a604-4a5c-849f-9c5daaeffc93.png)

Cũng tương tự như docker image tất cả những câu lệnh chúng ta thao tác với Docker Container đã hiện ra việc của chúng ta là thử từng câu lệnh xem chức năng của nó là gì nhỉ. Chú ý khi bạn muốn trợ giúp câu lệnh nào thì các bạn gõ lệnh docker và thêm `--help` vào cuối câu lệnh nhé, sẽ show ra trợ giúp chúng ta.


Lệnh tạo 1 container
```
docker run -it --name NAME -h HOST ImageId/ImageName
```
Kiểm tra container nào đang chạy
```
docker ps
```
![](https://images.viblo.asia/56ed8c63-ed3a-4878-afd9-b7187968c956.png)
- CONTAINER ID: id của container
- IMAGE: đây là tên của docker image mà container này dang dùng
- COMMAND: file run container
- CREATED: Số ngày kể từ khi container được tạo
- STATUS: trạng thái start/stop của container
-  PORTS: Port chạy container
-  NAMES: Tên của container

Kiểm tra container nào đang stop
```
docker ps -a
```
Lệnh stop container 
```
docker stop containerName/containerId
```
Khi chúng ta ở ngoài container đang chạy mà chúng ta muốn trở lại container đang chạy thì
```
docker attack containerName/containerId
```
Khi muốn xóa container đang stop 
```
docker rm containerName/containerId
```
Khi muốn xóa container đang chạy 
```
docker rm containerName/containerId -f
```

Ok đến đây là mình cũng giới thiệu qua một số câu lệnh mà chúng ta hay thao tác khi dùng với container cũng như docker image rùi, nhưng câu lệnh khác các bạn có thể lên trang chủ tìm hiểu thêm nhé.

## 3. Kết luận
Thật tuyệt vời phải không nào. Mỗi ngày chúng ta cố gắng tìm hiểu về một thứ một chút là chúng ta có thể tiến lên phía trước tuy chậm nhưng ko đứng yên. Cám ơn các bạn đã đọc trải nghiệm bài chia sẻ cửa mình. Hẹn gặp lại các bạn trong lần chia sẻ tháng tới nhé ! :rocket::rocket:

Tài liệu:

https://hub.docker.com/
https://www.tutorialspoint.com/