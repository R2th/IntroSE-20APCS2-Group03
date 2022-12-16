**Giới thiệu**

Docker là nền tảng phần mềm cho phép bạn dựng, kiểm thử và triển khai ứng dụng một cách nhanh chóng. 
Docker đóng gói phần mềm vào các đơn vị tiêu chuẩn hóa được gọi là `container` có mọi thứ mà phần mềm cần để chạy, trong đó có thư viện, công cụ hệ thống, mã và thời gian chạy. 
Bằng cách sử dụng Docker, bạn có thể nhanh chóng triển khai và thay đổi quy mô ứng dụng vào bất kỳ môi trường nào và biết chắc rằng mã của bạn sẽ chạy được.

Docker cung cấp khả năng đóng gói và chạy một ứng dụng trong một môi trường độc lập được gọi là `container`.Điều này giúp cho bạn có thể chạy nhiều `container` đồng thời trên một máy chủ nhất định.
Các `container` có dung lượng nhẹ và chứa đầy đủ mọi thứ cần thiết để có thể chạy một ứng dụng mà không cần phải cài đặt lại trên máy chủ.

Trên đây là vài giới thiệu cơ bản về Docker vậy thì sử dụng nó để làm gì ?

**Docker có thể làm được gì?**

**1. Fast, consistent delivery of your applications**

Docker hợp lý hóa vòng đời phát triển ứng dụng, cho phép developer làm việc trong môi trường tiêu chuẩn hóa bằng cách sử dụng local container cung cấp đầy đủ các ứng dụng và dịch vụ.
Các container là lựa chọn tốt để triển khai CI/ CD

Ví dụ: Khi muốn triển khai automation test và cho chạy tự động trên server hoặc đơn giản là một bài demo. Thì việc sử dụng Docker lúc này là cần thiết.

**2. Responsive deployment and scaling**

Docker’s container-based platform cho phép công việc có  tính di động cao. 
Docker containers có thể chạy trên laptop, máy vậy lý hoặc máy ảo trong data center, chạy trên cloud...
Dễ dàng quản lý khối lượng công việc, mở rộng hoặc chia nhỏ các ứng dụng và dịch vụ khi cần thiết trong thời gian gần như real time

**3. Running more workloads on the same hardware**

Docker nhẹ và nhanh. Hiệu quả về mặt chi phí.
Docker thích hợp cho các deployment vừa và nhỏ nơi mà cần làm nhiều việc nhưng lại ngốn ít tài nguyên của hệ thống.

**Cấu trúc của Docker**

![](https://images.viblo.asia/e99ddec9-2720-4832-9a9c-03a0530119f7.jpg)

**Docker daemon**

Lắng nghe các request từ API docker và quản lý các đối tượng Docker như images, containers, netwokrs và volumes. Một deamon có thể giao tiếp với các daemon khác để quản lý các Docker services.

**Docker client**

Là các mà người dùng Docker tương tác với Docker. Khi bạn sử dụng những câu lệnh như `docker run`, client sẽ gửi lệnh này đến `dockerd` để thực hiện chúng. Client gửi các câu lệnh đến Docker thông qua API Docker.

**Docker registries**

Là một kho lưu trữ các Docker images. Docker Hud là một public registry nơi tất cả mọi người có thể sử dụng. Docker được cấu hình mặc định tìm kiếm các images trên Docker Hud. Bạn có thể sử dụng registry cá nhân hoặc của các nhà cung cấp(Google Cloud, AWS...)

**Docker objects**

Khi bạn sử dụng Docker, bạn đang tạo và sử dụng images, containers, networks, volumes, plugins,... Phần này là tổng quan ngắn ngọn về một số đối tượng đó.

**Images**
 
 Là một image read-only chứa các source code, libraries,.. và các file cần thiết cho một ứng dụng để chạy. Image chỉ là một template để tạo ra Docker container.
 
 **Containers**
 
 Là một instance của image. Bạn có thể create, start, stop, move, delete một container bằng cách sử dụng Docker API hoặc CLI.
 
 OK sau khi đọc hết bài viết này chúng ta cũng đã phần nào nắm đc cơ bản cũng như một số khái niệm về Docker. 
 Bài viết tiếp theo chúng ta sẽ cùng làm một vài ví dụ nhỏ để hiểu được cách Docker vận hành như thế nào nhé.
 
 Cám ơn bạn đã đọc bài !!!
 
 Nguồn tham khảo tại : https://docs.docker.com/