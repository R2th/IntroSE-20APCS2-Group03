Trong bài viết này tôi sẽ giới thiệu về tích hợp liên tục - continuous integration, jenkins và docker compose trong ruby on rails và các tác dụng của nó.
## Giới thiệu về Continuous Integration (CI) - Tích hợp liên tục
Continuous Integration viết tắt là CI có nghĩa là tích hợp liên tục. Nó là phương pháp phát triển phần mềm yêu cầu các thành viên của team tích hợp công việc của họ thường xuyên, mỗi ngày ít nhất một lần. Mỗi tích hợp được “build” tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể. Cả team nhận thấy rằng cách tiếp cận này giảm thiểu vấn đề tích hợp và cho phép phát triển phần mềm nhanh hơn.<br>
Các bước trong một kịch bản CI thường như sau:
1. Đầu tiên, developer commit code lên repo.
2. CI server giám sát repo và kiểm tra xem liệu có thay đổi nào trên repo hay không (liên tục, chẳng hạn mỗi phút 1 lần)
3. Ngay khi commit xảy ra, CI server phát hiện repo có thay đổi, nên nó nhận code mới nhất từ repo và sau đó build, chạy unit và integration test
4. CI server sẽ sinh ra các feedback và gửi đến các member của project
5. CI server tiếp tục chờ thay đổi ở repo<br>

Lợi ích của việc sử dụng CI sẽ là:
* Giảm thiểu rủi ro nhờ việc phát hiện lỗi và fix sớm, tăng chất lượng phần mềm nhờ việc tự động test và inspect (đây cũng là một trong những lợi ích của CI, code được inspect tự động dựa theo config đã cài đặt, đảm bảo coding style, chẳng hạn một function chỉ được dài không quá 10 dòng code …)
* Giảm thiểu những quy trình thủ công lặp đi lặp lại (build css, js, migrate, test…), thay vì đó là build tự động, chạy test tự động
* Sinh ra phần mềm có thể deploy ở bất kì thời gian, địa điểm
## Jenkins
### Jenkins là gì ?
* Jenkins là 1 open source continuous integration tool được viết trên Java. Dự án được forked từ Hudson sau khi xảy ra tranh chấp với Orcale.
* Jenkins cung cấp continous integration service cho phát triển phần mềm. Nó là hệ thống chạy trên servlet container như Apache Tomcat.
* Jenkins giúp giám sát thực hiện việc thực thi các jobs như build project hay chạy các jobs.
![](https://images.viblo.asia/2c2ff898-48f3-4d42-b9a6-4d91c0babdb0.jpg)
### Cài đặt Jenkins
* Môi trường cài đặt:
```ruby
OS: Ubuntu 14
Java Runtime Enviroment (JRE): 1.8
Git: 1.9.1
```
* Tạo tài khoản Git Account
* Configure SSH Keys. GitHub sử dụng SSH keys để thiết lập secure connection giữa máy tính của bạn với GitHub server. Tham khảo cách add SSH keys: https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/
* Forking dự án mẫu để thực hành
* Bắt đầu cài đặt Jenkins
```ruby
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```
Sau khi installed xong jenkins, bắt đầu acess Jenkins theo url mặc định: localhost:8080
### Config Jenkins Build Job
1. Tại màn hình dashboard, click create New Item. 
![](https://images.viblo.asia/e04a59e8-5663-4bf8-be0c-2faa5076b3d3.jpg)
2. Trong màn hình tiếp theo, nhập Item name, trong ví dụ này, tôi đã đặt tên cho nó là Helloworld. Chọn tùy chọn ‘Freestyle project’
![](https://images.viblo.asia/9a9faca5-8c35-4f0c-b7a1-07f74ac62c42.jpg)
3. Màn hình sau đây sẽ xuất hiện, trong đó bạn có thể chỉ định các chi tiết của công việc.<br>
![](https://images.viblo.asia/0fddd72e-5272-4961-ad41-a60df243de20.jpg)
4. Chúng ta cần xác định vị trí của các tệp cần được xây dựng. Trong ví dụ này, chúng tôi sẽ giả sử rằng kho lưu trữ git cục bộ (E: \ Chương trình) đã được thiết lập có chứa tệp ‘HelloWorld.java. Do đó cuộn xuống và nhấp vào tùy chọn Git và nhập URL của kho git cục bộ.
5. Bây giờ hãy vào phần Build và nhấp vào Add build step → Execute Windows batch command<br>
6. Trong cửa sổ Command , nhập các lệnh sau và sau đó nhấp vào nút Save.
```ruby
Javac HelloWorld.java
Java HelloWorld
```
7. Sau khi lưu, bạn có thể nhấp vào tùy chọn Build Now để xem bạn đã xác định thành công công việc chưa.
8. Khi bản dựng được lên lịch, nó sẽ chạy. Phần Build history sau đây cho thấy quá trình xây dựng đang diễn ra.
![](https://images.viblo.asia/63a382fb-36b0-4cb4-8e94-3b62c7fcb369.jpg)
9. Khi quá trình xây dựng hoàn tất, trạng thái của bản dựng sẽ hiển thị nếu bản dựng thành công hay không. Trong trường hợp của tôi, bản dựng sau đã được thực hiện thành công. Nhấp vào số 1 trong lịch sử Xây dựng để hiển thị chi tiết về bản dựng.
![](https://images.viblo.asia/09805f08-42f1-4f28-b855-8cdc185b366d.jpg)
10. Nhấp vào liên kết Console Output để xem chi tiết về bản dựng
## Docker Compose
Compose là một công cụ tuyệt vời không chỉ dùng cho development, testing, staging environments, mà còn ứng dụng trong CI workflows. Cài đặt Compose có thể sử dụng link từ trang chủ của Docker, Inc. [tại đây](https://docs.docker.com/compose/install/) <br>
Những tính năng chính của Compose bao gồm:

* Thiết lập và cấu hình đa môi trường container hoàn toàn độc lập nhau trên cùng một máy chủ
* Bảo lưu các phân vùng bộ nhớ khi container được tạo ra
* Chỉ tạo lại container nào có config thay đổi trong khi vẫn bảo lưu dữ liệu của container
* Cho phép định nghĩa các biến variables trong file YML để tùy chỉnh cho các môi trường dev và product.<br>

Để sử dụng Compose thông thường có ba bước sau:
1. Tạo Dockerfile cho mỗi môi trường container của từng service mình muốn. Dockerfile là bắt buộc để khởi tạo container.
2. Tạo file docker-compose.yml để định nghĩa mối liên kết giữa các containers với nhau.
3. Chạy lệnh docker-compose up để khởi động Compose và chạy toàn bộ ứng dụng.<br>
Để làm sáng tỏ tính ứng dụng của Docker Compose, dưới đây tôi sẽ trình bày ví dụ về các lệnh cơ bản trong file docker-compose.yml và cách thức liên kết các containers với nhau
### Example: Cấu trúc cơ bản của file YML trong Compose
Các lệnh trong file docker-compose.yml cũng tương tự như các lệnh mà Docker thực hiện. Đầu tiên hãy tạo một project như sau:
```ruby
composetest/
   commander/
      Dockerfile
   docker-compose.yml
```
Bên trong folder commander ta có một file Dockerfile như sau để khởi tạo một container chạy redis commander, đây là một service dùng để visualize redis database:
```ruby
# create a nodejs container with minimum requirements
FROM node:0.12.2

# download and install redis-commander
RUN curl -L https://github.com/joeferner/redis-commander/tarball/v0.3.2 | tar zx
RUN npm install -g redis-commander

# Run this command everytime this container start up
ENTRYPOINT [ "redis-commander" ]
CMD [ "--redis-host", "redis" ]

EXPOSE 8081
```
Và Docker-compose.yml:
```ruby
Version: ‘3’
services: 
  backend:
    image: “redis:3”
    restart: always

  frontend: 
    build: commander
    links: 
    - backend:redis  
    ports: 
    - 8081:8081 
    restart: always
```
File Compose trên đây xác định việc khởi tạo 2 services, backend và frontend. Backend service sử dụng public Redis image từ Docker Hub registry. Frontend service:
* Sử dụng image của redis-commander đã được đĩnh nghĩa trong folder commander
* Links với backend service bằng alias redis
* Kết nối cổng 8081 trên container với cổng 8081 của máy chủ.<br>
Tiếp theo ta build và run app với Compose bằng lệnh:
```ruby
$ docker-compose up
```
Compose sẽ lấy về Redis image, build và khởi tạo service đã được định nghĩa sẵn. 
Nhập đường dẫn http://localhost:8081 vào trình duyệt trên máy chủ, ta sẽ thấy app đang chạy. Redis Commander chính là User Interface của Redis database backend.<br>
Câu lệnh "docker-compose up" chính là gộp của hai lệnh sau:
```ruby
docker build -t commander commander
docker run -d --name frontend -p 8081:8081 --link backend:redis commander
```
Như vậy, với mỗi service mới được thêm vào hoặc chỉnh sửa, ngoài việc tạo Dockerfile cho service thì chỉ cần thêm vào trong docker-compose.yml, service mới sẽ được liên kết dễ dàng với database/service hiện tại. Để kết thúc các services đang chạy, sử dụng lệnh:
```ruby
$ docker-compose stop
```
Và để xóa hoàn toàn container và data volume sử dụng bởi Redis container:
```ruby
$ docker-compose down --volumes
```
## Kết luận
Trên đây là những khái niệm cơ bản về CI, Jenkins và Docker Compose. Hi vọng qua bài viết các bạn sẽ hiểu rõ hơn về tích hợp liên tục trong Ruby on Rails với Jenkins và Docker Compose cũng như ứng dụng tuyệt vời của nó.