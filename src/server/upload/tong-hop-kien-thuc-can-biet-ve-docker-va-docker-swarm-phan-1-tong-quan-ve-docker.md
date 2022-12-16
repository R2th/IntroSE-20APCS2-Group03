![](https://images.viblo.asia/c17ff5c0-ee67-4c4b-abb4-23f09fe56055.png)

## I. Docker là gì
* Docker là một nền tảng để cung cấp cách để building, deploying và running ứng dụng dễ dàng hơn bằng cách sử dụng các containers (trên nền tảng ảo hóa) để đóng gói ứng dụng. 
* Docker sử dụng công nghệ ảo hóa containerization để triển khai các ứng dụng vào trong container ảo hóa.
* Docker sử dụng nhân kernel linux để chạy các container, trên hệ điều hành Linux, Docker có thể sử dụng trực tiếp nhân của máy host; còn với các hệ điều hành Windows, MacOS – có thể vì lý do bảo mật nên docker không thể trực tiếp xài chung kernel với các hệ điều hành này nên trên các hệ điều hành này docker sẽ tạo ra một máy ảo virtual guest
* với nhân linux để chạy các container.
* Container là đơn vị phần mềm cung cấp cơ chế đóng gói ứng dụng, mã nguồn, thiết lập, thư viện... vào một đối tượng duy nhất. Ứng dụng sau khi được đóng gói có thể hoạt động một cách nhanh chóng và hiệu quả trên các môi trường điện toán khác nhau. Từ đó nó có thể tạo ra một môi trường hoàn hảo nơi mà có mọi thứ để chương trình có thể hoạt động được, không chịu sự tác động từ môi trường của hệ thống cũng như không làm ảnh hưởng ngược lại về phía hệ thống chứa nó.
## II. Thành phần & Lợi ích của Docker
### Thành phần
![](https://images.viblo.asia/fd62b61d-5351-424f-88a9-b55ddf2fb323.png)

Docker gồm có 3 thành phần chính:
* **Docker file**
![](https://images.viblo.asia/23cfd74a-e15d-4a77-9863-096953ca24a7.png)

Là một file dạng text không có phần đuôi mở rộng, chứa các đặc tả về một trường thực thi phần mềm, cấu trúc cho Docker image. Docker image có thể được tạo ra tự động bằng cách đọc các chỉ dẫn trong Dockerfile. Từ những câu lệnh đó, Docker sẽ build ra Docker image 
* **Image**
Là 1 đơn vị đóng gói chứa mọi thứ cần thiết để 1 ứng dụng chạy. Image được tạo thành từ nhiều layer xếp chồng lên nhau, bên trong image là 1 hệ điều hành bị cắt giảm và tất cả các phụ thuộc (dependencies) cần thiết để chạy 1 ứng dụng.
* **Container**
Container là đơn vị phần mềm cung cấp cơ chế đóng gói ứng dụng, mã nguồn, thiết lập, thư viện... vào một đối tượng duy nhất. Ứng dụng sau khi được đóng gói có thể hoạt động một cách nhanh chóng và hiệu quả trên các môi trường điện toán khác nhau. Từ đó nó có thể tạo ra một môi trường hoàn hảo nơi mà có mọi thứ để chương trình có thể hoạt động được, không chịu sự tác động từ môi trường của hệ thống cũng như không làm ảnh hưởng ngược lại về phía hệ thống chứa nó.
![](https://images.viblo.asia/b9579b50-ca69-4603-b9ff-b85b9571128b.png)

Mỗi container bao gồm mọi thứ cần thiết để chạy được nó: code, runtime, system tools, system libraries, setting. Mỗi container như 1 hệ điều hành thực sự, bên trong mỗicontainer sẽ chạy 1 ứng dụng.
## III. Các bước sử dụng Docker
Container nhằm làm cho các ứng dụng trở nên dễ dàng xây dựng, di chuyển và chạy. Quá trình đưa 1 ứng dụng chạy trong container có để được hiểu như sau:
![](https://images.viblo.asia/e1f2ebdb-3bc1-403a-9b9f-6c3cf767cb29.png)

1. Đầu tiên ta bắt đầu với code app và các phụ thuộc của nó
2. Tạo Dockerfile mô tả app, các phụ thuộc và cách run app
3. Bulid Dockerfile thành image
4. Push image mới build vào registry(option)
5. Chạy container từ image

## IV. Docker Swarm là gì? Thành phần Docker Swarm
**Khái niệm:** Docker Swarm là công cụ native clustering cho Docker. Cho phép ta có thể gom một số Docker host lại với nhau thành dạng cụm (cluster) và ta có xem nó như một máy chủ Docker ảo (virtual Docker host) duy nhất. Hỗ trợ việc tạo và quản lý các container hoặc các hệ thống Container Orchestration

![](https://images.viblo.asia/87dc19d2-86d0-4003-a630-a75906b88172.png)

**Thành phần:**
* **Swarm (cluster): **một tập hợp các node có ít nhất một node chính và một số node worker có thể là máy ảo hoặc vật lý.
* **Node:** mỗi node của một Docker Swarm là một Docker Host, có 2 loại node:
* **Manager node:** lên lịch và quản lý các worker node.
* **Worker node:** làm việc và báo cáo lại cho manager node.

## V. Lợi ích & tính năng của Docker Swarm
* **Tận dụng sức mạnh của Containers, scale hệ thống:** container cho phép developer triển khai các ứng dụng hoặc dịch vụ trong môi trường ảo độc lập, một nhiệm vụ trước đây thuộc về máy ảo.
* **Đảm bảo tính khả dụng của dịch vụ cao:** một Docker Swarm có một trình quản lý có thể phân công nhiệm vụ cho các Worker node. Bằng cách triển khai nhiều trình quản lý, developers đảm bảo rằng hệ thống có thể tiếp tục hoạt động ngay cả khi một trong các Manager node bị lỗi. 
* **Cân bằng tải tự động:** Docker swarm lên lịch các tác vụ bằng nhiều phương pháp khác nhau để đảm bảo rằng có đủ tài nguyên cho tất cả containers, giúp đảm bảo khối lượng công việc container được chỉ định chạy trên máy chủ phù hợp nhất để đạt hiệu quả tối ưu.

## Tài liệu tham khảo
[1]. [How node works ](https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/)

[2]. [Docker docs](https://docs.docker.com/get-started/overview/)

[3]. [Docker là gì?](https://topdev.vn/blog/docker-la-gi/)

[4]. [Docker - chưa biết gì đến biết dùng](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)