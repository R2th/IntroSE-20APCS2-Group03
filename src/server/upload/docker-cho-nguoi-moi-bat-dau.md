# Docker là gì?
**Docker** là một nền tảng mà nguồn mở cho việc phát triển và chạy ứng dụng. Với Docker, chúng ta có thể dễ dàng đóng gói và chạy ứng dụng trong một môi trường cô lập gọi là **container**.
* Cụ thể là: Giả sử bạn mớ mua một cái máy tính mới cần chạy lại project Laravel cũ của mình để có thể code tiếp. Thông thường bạn sẽ phải cài php, mysql, apache, npm, ... Tưởng chừng việc cài đặt chúng thật đơn giản nhưng khi tiến hành cài đặt môi trường thì bạn lại gặp lỗi tùm lum, fix hết lỗi này lại đến lỗi khác. Nhưng với Docker, chỉ cần vài bước đơn giản là bạn có thể tạo ra được một môi trường ảo hóa chứa đầy đủ những thứ cần thiết để có thể chạy project đó rồi. Hơn nữa giả sử có một người khác muốn code project đó với bạn thì chỉ cần đưa cho họ **Dockerfile** là họ có thể dễ dàng tạo được môi trường chạy ứng dụng để code rồi.
# Docker vs Hypervisor (máy ảo)
Đọc qua cách mình giải thích ở trên chắc hẳn bạn sẽ nghĩ rằng **Docker** là máy ảo. Nhưng không hẳn là như vậy, **Docker** và **Hypervisor** có một điểm khác biệt rất lớn đó là các **container** của **Docker** sử dụng chính hệ điều hành của host để chạy còn máy ảo thì chạy một hệ điều hành riêng biệt. Chính điểm khác biệt này làm cho **Docker** trở nhẹ nhàng và nhanh hơn rất nhiều so với máy áo. 
<br>

Các **container** chạy cần bao nhiêu tài nguyên thì được cung cấp bấy nhiêu. Trong khi máy ảo khi cài đặt ta phải cung cấp tài nguyên ở cứng và ram từ máy thật cho máy ảo. Giả sử ta cung cấp 4GB ram cho máy ảo mà máy ảo chỉ dùng 1GB ram => **lãng phí**.

| Hypervisor | Docker | 
| -------- | -------- |
| ![](https://images.viblo.asia/2cf3191d-8495-477c-b09d-df402cfbfb01.png)     | ![](https://images.viblo.asia/b8782b07-438d-4763-aafc-ed392d75df34.png)
# Docker Image và Docker Container
**Docker Image** là khuân mẫu hay khung xương để tạo ra **container**. Thông thường một **image** sẽ dựa trên các **image** có sẵn với một số tùy chỉnh. Ví dụ bạn có thể xây dựng một **image** dựa trên `ubuntu image` để chạy Apache web server.
<br>

**Docker Container** là một `instance` của **image**. Ta có thể create, start, stop, move, hoặc xóa một **container** bằng **Docker API** hoặc **CLI**.
<br>

Hiểu theo lập trình hướng đối tượng thì **image** là `class` còn **container** chính là các `instance` được tạo nên từ class đó. 
# Docker File
### 1. Dockerfile

**Dockerfile** là một file dạng text, không có đuôi mở rộng chứa tập hợp các câu lệnh giúp thiết lập cấu trúc cho **image**.
Sử dụng `docker build` để build ra **docker Image** .

![](https://images.viblo.asia/00c8e543-4ceb-46f7-8ea3-79e1e7bf7c20.png)
### 2. Cách viết Dockerfile
Ta có một Dockerfile đơn giản sau:

![](https://images.viblo.asia/f8acfa54-4a7a-47e8-a023-b9ccae470305.png)

`FROM `: xác định xem ta sử dụng image gốc nào. Cụ thể ở đây là image **node:12-alpine**
<br>

`WORKDIR`: Xác định thư mục làm việc cho `RUN, CMD, ENTRYPOINT và ADD`
<br>

`COPY` :  copy file, thư mục từ host vào image (chính là `WORKDIR`)
<br>

`RUN`: thực thị câu lệnh trong quá trình build image. Cài đặt yarn.
<br>

`CMD`: thực thi câu lệnh trong quá trình chạy container (Mỗi Dockerfile chỉ có một câu lệnh CMD), ở đây ta thực hiện chạy file index.js.
<br>

Giả sử khi khởi động container ta muốn chạy nhiều ứng dụng một lúc thì như thế nào? Rất đơn giản lúc này ta cần dùng đến `ENTRYPOINT` => `ENTRYPOINT`: dùng để thực thi một số câu lệnh trong quá trình khởi động container, những lệnh này được viết trong file có đuôi `.sh`

Một số câu lệnh khác như:
<br>
`EXPOSE`: chỉ định port mà container sẽ lắng nghe khi chạy

`ADD`: copy file, thêm file vào file system của image.

`ENV`: tạo biến môi trường. VD: `ENV MY_NAME="Kim So Hyun"

`MOUNT`: mount thư mục máy host vào container

# Docker Hub
### 1. Docker hub là gì
**Docker hub** là nơi lưu trữ và chia sẻ các image của **Docker**.
### 2. Cách tạo một Docker Image trên Docker Hub
##### Bước 1: Tạo một tài khoản trên [Docker hub](https://hub.docker.com/) và tiến hành đăng nhập
<br>

##### Bước 2: Tạo một repository trên **Docker hub**
1. Chọn tạo repository trên Docker Hub sau khi đăng nhập
2. Chọn user sau đó đặt trên cho repo. Ở đây của mình là: `anhdacono/my-private-repo`
3. Chọn `Private`
4. Chọn `Create`

![](https://images.viblo.asia/be1810d5-91f4-4753-8075-8586cc1a650e.png)

##### Bước 3: Tải và cài đặt docker
1. Để tải và cài đặt Docker bạn có thể xem [ở đây](https://docs.docker.com/engine/install/ubuntu/)
2. Sau khi đã cài đặt xong bạn mở terminal và chạy lênh:
```
docker login
// Điền tên tài khoản và mật khẩu
// Đăng nhập thành công terminal hiện ra thông báo
Login Succeeded
```
##### Bước 4: Build và đẩy một Docker Image lên Docker Hub
1. Tạo **dockerfile**
```
 cat > Dockerfile
 FROM busybox
 CMD echo "Hello world! This is my first Docker image."
```
2. Tiến hành build **docker image**: 
```
docker build - < Dockerfile -t anhdacono/my-private-repo(username các bạn có thể tùy chỉnh)
```
4. Test xem docker image build thành công hay chưa:
```
docker run anhdacono/my-private-repo
// Kết quả như dưới là thành công
Hello world! This is my first Docker image.
```
4. Đẩy **docker image** lên **docker hub**
```
docker push anhdacono/my-private-repo
```
Kết qủa như hình là thành công:

![](https://images.viblo.asia/ea811011-9107-4bdd-a56b-8cf02c331014.png)
![](https://images.viblo.asia/ac642006-a1bd-4d67-8b71-4e0d1d03e016.png)

# Tổng kết
Như vậy qua tìm hiểu ta đã biết:
* Docker là gì?
* Docker image và docker comtainer khác nhau như thế nào?
* Tìm hiểu về Dockerfile và cách viết ra mộ Dockerfile đơn giản
* Dockerhub là gì? và cách để tạo một Docker image trên Docker Hub
# Tài liệu tham khảo
https://docs.docker.com/get-started/

https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0