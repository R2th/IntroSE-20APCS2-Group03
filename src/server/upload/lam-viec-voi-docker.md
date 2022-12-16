### Docker là gì?
Là một platfrom ở tầng OS (operating system) có thể tinh chỉnh được, phục vụ cho việc chạy ảo hóa các dịch vụ/ ứng dụng một cách nhanh chóng.

Virtual Machines thường dùng để triển khai ứng dụng ngày xưa và việc này mất rất nhiều thời gian. Khi chuyển sang Docker thì thời gian triển khai một ứng dụng nằm trong docker container được rút ngắn đi rất nhiều.
**Tính tiện dụng**
Docker có rất nhiều tính tiện dụng, khả năng ứng dụng cao với các ưu điểm như sau:
* Tính tiện lợi, nhanh chóng, nếu như trước đây triển khai service/application trên VMs tốn vài chục phút thì bây giờ với Docker chỉ còn vài phút.
* Tiết kiệm tài nguyên (resource). Mỗi docker container sử dụng bao nhiêu resource thì sẽ tốn bấy nhiêu, không sử dụng thì sẽ được trả về cho máy chủ host.
* Hệ thống có mức độ tự động mở rộng cao hơn để đáp ứng nhu cầu người dùng. Việc khởi tạo và tắt đi một docker container diễn ra khá dễ dàng và dựa trên các metric của hệ thống.
* Thứ tư là dễ dàng tự động hóa(automate) việc quản lý các docker container thông qua Kubernetes hoặc Docker Swarm. - Chẳng hạn khi có 1 docker container chết đi thì hệ thống sẽ tự động khởi tạo 1 docker container tương tự như vậy trong cluster và trả về thông báo.
**Cách Docker hoạt động**
Chỉ cần viết 1 dockefile(một file text tổng hợp nhiều dòng lệnh) để config và tạo nên image, sau đó khởi chạy nó là ta đã tạo được một docker container. Tất cả thư viện và module sẽ được cài sẵn trong docker container này. Khi khởi tạo một docker container thì services được đóng gói bên trong cũng được khởi tạo theo.
Dockerfile có các config như sau:
* FROM - Chỉ định gốc: python, golang, ubuntu, alpine...
* LABEL - Cung cấp metadata cho image. Có thể sử dụng để add thông tin maintainer. Để xem các label của images, dùng lệnh docker inspect.
* ENV - Thiết lập một biến môi trường.
* RUN - Có thể tạo một lệnh khi build image. Được sử dụng để cài đặt các package vào container.
* COPY - Sao chép các file và thư mục vào container.
* ADD - Sao chép các file và thư mục vào container.
* CMD - Cung cấp một số lệnh và đổi số cho container thực thi. Các tham số có thể được ghi đè và chỉ có một CMD.
* WORKDIR - thiết lập thư mục đang làm việc cho các chỉ thị khác như: RUN, CMD, ENTRYPOINT, COPY, ADD...
* ARG - Định nghĩa giá trị biến được dùng trong lúc build image.
* ENTRYPOINT - cung cấp lệnh và đổi số cho một container thực thi.
* EXPOSE - khai báo port lắng nghe của image.
* VOLUME - tạo một điểm gắn thư mục để tury cập và lưu trư data

Một ứng dụng phần mềm sẽ có nhiều services khác nhau như: đăng nhập, xác thực, API, notification... Mỗi service chạy trên một docker container khác nhau. Nếu một docker container chết đi thì những container khác vẫn sẽ chạy bình thường và không chịu ảnh hưởng.

**Docker Compose**
Docker Compose là một công cụ dùng để định nghĩa và chạy các chương trình Docker sử dụng nhiều container (multi-container). Với Docker Compose, chúng ta sử dụng một file YAML để thiết lập các service cần thiết cho chương trình. Cuối cùng với một câu lệnh, chúng ta sẽ có thể create, start, stop tất cả các services từ thiết lập đó.
Sử dụng Compose thường có ba bước sau:
1. Khai báo các môi trường của chương trình trong Dockerfile.
2. Khai báo các service cần thiết cho chương trình trong file *docker-compose.yml* để các service có thể chạy cùng nhau trong một môi trường.
3. Chạy câu lệnh docker-compose up để start Compose và chạy chương tirnh2
Compose có những câu lệnh cho phép quản lí lifecycle của chương trình:
Start, Stop và Build lại service.
Xem status của các service đang chạy.
Xem log output của các service đang chạy.
Chạy lệnh một lần (one-off command) trong một service
Lợi ích của Compose gồm có: Tạo ra nhiều môi trường độc lập trong một host, chỉ tạo lại các container đã thay đổi, điều chỉnh các biến sử dụng cho các môi trường.
**Một số khái niệm**
* Docker Client: Là cách mà bạn tương tác với docker thông qua command trong terminal. Docker Client sẽ sử dụng API gửi lệnh tới Docker Daemon.
* Docker Daemon: Là server Docker cho yêu cầu từ Docker API. Nó quản lý images, containers, networks và volume.
* Docker Volumes: Là cách tốt nhất để lưu trữ dữ liệu liên tục cho việc sử dụng và tạo apps.
* Docker Registry: Là nơi lưu trữ riêng của Docker Images. Images được push vào registry và client sẽ pull Images từ registry. Có thể sử dụng registry của riêng bạn hoặc registry của nhà cung cấp như: AWB, Google, Cloud Microsoft Azure.
* Docker Hub: là Registry lớn nhất của Docker Images(mặc định). Có thể tìm thấy images và lưu trư images của riêng bạn trên Docker Hub.
* Docker Repository: là tập hợp các Docker Images cùng tên nhưng khác tags.
* Docker Networking: Cho phép kết nói các container lại với nhau. Kết nối này có thể trên 1 host hoặc nhiều host.
* Docker Compose: như mình đã nói ở trên.
* Docker Swarm: Để phối hợp triển khai container.
* Docker Services: Là các containers trong production. 1 service chỉ run 1 image nhưng nó mã hóa cách thức để run image - sử dụng port nào, bao nhiêu bản sao container run để service có hiệu năng cần thiết và ngay lập tức.
* Dockerfile: như mình nói ở trên.
 ![image.png](https://images.viblo.asia/2091db65-1871-4a7c-bf67-bdd70f122b17.png)
### Cài đặt Docker
Cài đặt Docker thì không quá khó(riêng với windows thì yêu cầu bạn phải có wsl2) nên mình sẽ để link trực tiếp ở đây luôn nhé: https://docs.docker.com/get-docker/
Ở đây mình sẽ để một số lệnh để các bạn có thể kiểm tra xem mình đã cài đặt thành công docker hay chưa:
```
 docker version
 docker info
 docker run hello-world
```
Các bạn có thể demo qua trang này nhé https://github.com/docker/labs/tree/master/beginner/

**Quy trình thực thi của một hệ thống sử dụng Docker**
![image.png](https://images.viblo.asia/3a567ef1-df63-4bcf-836e-7f212fa20d98.png)
Có 3 bước chính Build -> Push và Pull, Run
1. Build
    Đầu tiên tạo một dockerfile, Dockerfile này sẽ được Build tại một máy tính đã cài Docker Engine. Sau khi build ta sẽ được một Container, trong Container này chứa ứng dụng kèm bộ thư viện của chúng ta.
2. Push
    Sau khi có được Container, ta push Container này lên cloud và lưu tại đó
3. Pull, Run
    Nếu một máy tính khác muốn sử dụng Container của chúng ta vừa tạo thì máy sẽ thực hiện việc pull container về máy đó, tất nhiên máy phải có cài Docker Engine. Sau đó ta thực hiện Run Container và sử dụng code chứa trong Container đó.
### Tóm lại
Docker cần thiết khi:
* Chúng ta cần triển khai kiến trúc Microservice, xây dựng ứng dụng và cần scale một cách linh hoạt.
* Giảm thời gian để config máy local và server cùng một môi trường để chạy được ứng dụng. Chúng ta chỉ cần build 1 lần và chạy ở nhiều nơi.
* Khi sản phẩm công ty cần một cách tiếp cận mới về xây dựng, đẩy lên server thực thi ứng dụng một cách nhanh chóng dễ dàng.

Đây là một bài viết tổng hợp khá nhiều thông tin về Docker, hy vọng bạn cảm thấy hữu ích, have a nice day <3

Bài viết đã tham khảo:

Docker là gì? Tìm hiểu về Docker:  https://topdev.vn/blog/docker-la-gi/

Docker là gì ? Kiến thức cơ bản về Docker:  https://viblo.asia/p/docker-la-gi-kien-thuc-co-ban-ve-docker-maGK7qeelj2

Những điều phải biết về docker compose, cách sử dụng và các lưu ý:  https://bizflycloud.vn/tin-tuc/nhung-dieu-phai-biet-ve-docker-compose-cach-su-dung-va-cac-luu-y-20200821120351358.htm#:~:text=Docker%20Compose%20l%C3%A0%20m%E1%BB%99t%20c%C3%B4ng,t%E1%BB%AB%20c%C3%A1c%20thi%E1%BA%BFt%20l%E1%BA%ADp%20%C4%91%C3%B3.