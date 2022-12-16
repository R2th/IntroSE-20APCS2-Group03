## I. Thành phần của Docker
### 1. Docker Engine
Docker Engine là phần cốt lõi của Docker, như một công cụ để đóng gói ứng dụng, được xây dựng theo kiểu kiến trúc client-server và được cài đặt trên máy Host.

Docker Engine có 3 thành phần:
* **Server:** Docker Daemon dùng để tạo và quản lý các images, containers, networks, volumes.
* **Rest API:** controller cho docker daemon, chỉ ra những gì docker daemon sẽ làm.
* **Client:** Là một công cụ giúp người dùng giao tiếp với Docker host. Người dùng tương tác với docker thông qua command trong terminal (CLI). Docker Client sẽ sử dụng API gửi lệnh tới Docker Daemon.

Có 5 đối tượng lớn trong thế giới của Docker Engine:
#### a. Image
* Dockerfile là một file dạng text không có phần đuôi mở rộng, chứa các đặc tả về một trường thực thi phần mềm, cấu trúc cho Docker image. 
* Docker image có thể được tạo ra tự động bằng cách đọc các chỉ dẫn trong Dockerfile. 
* Từ những câu lệnh đó, Docker sẽ build ra Docker image (thường có dung lượng nhỏ từ vài MB đến lớn vài GB).
![](https://images.viblo.asia/27d1d1ef-a82f-4ff5-82e5-c183cc2e95b8.png)

#### b. Docker file
* Image trong docker còn được gọi là mirror, nó là 1 đơn vị đóng gói chứa mọi thứ cần thiết để 1 ứng dụng chạy.
* Image được tạo thành từ nhiều layer xếp chồng lên nhau, bên trong image là 1 hệ điều hành bị cắt giảm và tất cả các phụ thuộc (dependencies) cần thiết để chạy 1 ứng dụng.
![](https://images.viblo.asia/fd62b61d-5351-424f-88a9-b55ddf2fb323.png)
#### c. Container
* Một image có thể được sử dụng để tạo 1 hoặc nhiều container. 
* Ta có thể create, start, stop, move hoặc delete dựa trên Docker API hoặc Docker CLI.
* Trên hệ điều hành, ta cài đặt container engine là docker. Sau đó, công cụ container sẽ lấy các tài nguyên hệ điều hành và ghép chúng lại thành các cấu trúc riêng biệt được gọi làcontainer.
![](https://images.viblo.asia/2b441e93-b848-437c-98c8-330a2d74b4c9.png)

* **Mỗi container bao gồm mọi thứ cần thiết để chạy được nó:** code, runtime, system tools, system libraries, setting. Mỗi container như 1 hệ điều hành thực sự, bên trong mỗi
* container sẽ chạy 1 ứng dụng.
* Container và VM có sự cách ly và phân bổ tài nguyên tương tự nhưng có chức năng khác nhau vì container ảo hóa hệ điều hành thay vì phần cứng. 
![](https://images.viblo.asia/d87fb74e-5128-48ff-ab1f-4e04c0693fc9.png)

* Các container  có tính portable và hiệu quả hơn.
* Container nhằm làm cho các ứng dụng trở nên dễ dàng xây dựng, di chuyển và chạy. 

Quá trình đưa 1 ứng dụng chạy trong container có để được hiểu như sau:
![](https://images.viblo.asia/e1f2ebdb-3bc1-403a-9b9f-6c3cf767cb29.png)

1. Đầu tiên ta bắt đầu với code app và các phụ thuộc của nó
2. Tạo Dockerfile mô tả app, các phụ thuộc và cách run app
3. Bulid Dockerfile thành image
4. Push image mới build vào registry(option)
5. Chạy container từ image
#### d. Network
Docker network có nhiệm vụ cung cấp private network (VLAN) để các container trên một host có thể liên lạc được với nhau, hoặc các container trên nhiều hosts có thể liên lạc được với nhau (multi-host networking).
#### e. Volume
Docker volume là cơ chế tạo và sử dụng dữ liệu của docker, có nhiệm vụ lưu trữ dữ liệu độc lập với vòng đời của container.

Có 3 trường hợp sử dụng Docker Volume:
1. Giữ lại dữ liệu khi một Container bị xóa.
2. Để chia sẻ dữ liệu giữa máy chủ vật lý và Docker Container.
3. Chia sẻ dữ liệu giữa các Docker Container.
### 2. Docker Registry/Docker Hub
Docker Registry là một dịch vụ máy chủ cho phép lưu trữ các docker image của cá nhân, công ty, team,... Dịch vụ Docker Registry có thể được cung cấp bởi tổ chức thứ 3 hoặc là dịch vụ nội bộ được xây dựng riêng nếu bạn muốn. 
![](https://images.viblo.asia/1bf70fe9-0066-4d6c-be24-8dfd8b9f9b59.png)

Một số dịch vụ Docker Registry phổ biến như:
* Azure Container Registry
* Docker Hub
* Quay Enterprise
* Google Container Registry.
* AWS Container Registry
## II. Chắc năng và vai trò của Docker
### 1. Chức năng
* Docker cho phép phát triển, di chuyển và chạy các ứng dụng dựa vào công nghệ ảo hóa trong linux.
* Tự động triển khai các ứng dụng bên trong các container bằng cách cung cấp thêm một lớp trừu tượng và tự động hóa việc ảo hóa mức (OS)
* Docker có thể được sử dụng trên các hệ điều hành như: Windows, Linux, MacOS.
### 2. Vai trò
* **Linh động:** Dễ dàng triển khai ở nhiều môi trường khác nhau do loại bỏ được sự phụ thuộc của ứng dụng vào tầng OS cũng như cơ sở hạ tầng.
* **Tiết kiệm không gian:** container được xây dựng dựa trên nhiều image có sẵn, từ đó tiết kiệm được nhiều không gian lưu trữ hơn.
* **Đồng nhất:** không có sự sai khác về mặt môi trường khi triển khai ở bất kỳ nơi đâu, tạo ra sự nhất quán khi làm việc theo nhóm.
* **Nhanh:** do chia sẻ host OS nên các container có thể gần như được tạo một cách tức thì, việc khởi động cũng diễn ra nhanh hơn rất nhiều.

## Tài liệu tham khảo
[1]. [How node works ](https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/)

[2]. [Docker docs](https://docs.docker.com/get-started/overview/)

[3]. [Docker là gì?](https://topdev.vn/blog/docker-la-gi/)

[4]. [Docker - chưa biết gì đến biết dùng](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)