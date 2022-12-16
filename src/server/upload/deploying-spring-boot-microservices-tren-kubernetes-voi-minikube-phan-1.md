Kubernetes là một hệ thống mã nguồn mở để tự động hóa việc triển khai, mở rộng quy mô và quản lý các ứng dụng chứa trong container (container docker) .<br> Việc học và tận dụng được kubernetes là kỹ năng quý gia mà bạn có thể học đê thành công trong việc triển khai ứng và mở rộng quy mô ứng dụng của mình. 
Mình sẽ hướng dẫn các bạn từng bước để ứng dụng kubenetes vào triển khai ứng dụng của mình. Phần đầu tiên này mình sẽ hướng dẫn các bạn làm quen với docker và deploy ứng dụng sử dụng docker 
# 1. Xây dựng một ứng dụng nhỏ để thực hiện
Chúng ta sẽ build một dứng dựng với Spring Boot. Chúng ta sẽ sử dụng bootstrapping  Spring initializr để xây nhanh khung ứng dụng của mình.<br>
Bước đầu tiền bạn cần truy câp  https://start.spring.io để sinh phần khung cho ứng dụng

![](https://images.viblo.asia/46d9fa37-66b8-4b92-b196-31538e3d25e1.jpg)

Bạn hãy nhập group và name cho ứng ụng:
- GroupId: learnk8s.io
- Name: knote-java
- 
![](https://images.viblo.asia/24671d52-b142-4dd2-a66d-7837a3c07f2c.jpg)

Tiếp theo, đến phần dependencies  và chọn;
- Web -> Spring Web Starter: hỗ trợ web cơ bản trong Spring Boot
- Actuator -> Spring Boot Actuator: cung cấp health endponts để kiểm tra tình trang ứng dụng 
- FreeMarket -> Apache FreeMarket: templateing engine cho HTMLs
- LomboK -> Lombok: thư viện sinh ra các hàm viết sẵn hay dùng như getter, setter ,..

Sau đó kích vào gererate the project để tải file zip chứ khung cho dự án của bạn. Giải nén file và dùng IDE bạn dùng và bật như một project maven .
### Phần front End: 
Vào src/main/resources, tạo thư mục template. Rồi sau đó bạn tạo file index.ftl

{@embed: https://gist.github.com/hoangnt-2197/377b42a0bad9659437d71162621fe5d2}

Tiếp theo tạo thư mục static trong src/main/resources, rồi tạo file app.min.css:

{@embed: https://gist.github.com/hoangnt-2197/110694ce4f03e7bb1859f8ff10d07371}
    
### Phần back end:
Bây giờ trong file src/main/java/io/learnk8s/knote-java/KnoteJavaApplication.java

{@embed: https://gist.github.com/hoangnt-2197/0f8412b0b4a461390222b49a2aa8fe30}

Tạo file src/main/resources/application.properties để config kết nối với mongodb:

{@embed: https://gist.github.com/hoangnt-2197/323505253547b108abb5f9e478835b5d}

Tạo thư mục  src/main/java/io/learnk8s/knote-java/entities. Sau đó tạo class NoteEntity.java

{@embed: https://gist.github.com/hoangnt-2197/ca35324289b27d882a4c8e3c267b4fe2}

Tạo thư mục  src/main/java/io/learnk8s/knote-java/repositories . Sau đó tạo class NotesRepository.java
{@embed: https://gist.github.com/hoangnt-2197/f3b35c2fe68cb6cc87a64a86566bbb2b}

Chúng ta sẽ sử dụng thư  commonmark-java để phân tích notes và render  HTML

{@embed: https://gist.github.com/hoangnt-2197/c87ebda46d1dae7906b1f4b3e72fee9e}

Tạo thư mục  src/main/java/io/learnk8s/knote-java/controller. Sau đó tạo class  KNoteController.java
{@embed: https://gist.github.com/hoangnt-2197/bd2aeb821dc7f0bef7e2285ea28aba86}

Tạo thư mục  src/main/java/io/learnk8s/knote-java/config:
- Tạo class KnoteProperties.java
{@embed: https://gist.github.com/hoangnt-2197/e8e1f73fe6f79fb27dcc5b7dc13a3e3f}

- Tạo class KnoteConfig.java
{@embed: https://gist.github.com/hoangnt-2197/c816e0504a502bb213e287a8418fdacd}

Ở đây ta tạo ra 2 APi: một là lấy danh sách note , hai là lấy danh sách note. Vậy là chúng ta đã hoàn thành xong chức năng của ứng dụng.

### Cài đặt cơ sở dữ liệu 
Bạn có thể cài đặt MongoDB theo hướng dẫn này [official MongoDB documentation](https://docs.mongodb.com/manual/installation/)

Khi cài đặt xong , khởi chạy MongoDB server : 
```
$ mongod
```

Giờ chúng ta chạy ứng dụng : 
```
mvn clean install spring-boot:run
```

Ứng dụng chạy trên cổng 8080. Bạn có thể truy cập vào ứng dụng trên http://localhost:8080 <br>

Thử tạo môt ghi chú(note) và xem nó hiển thị trên trang web . 

# 2. Sử dụng docker để deploy
Cài đặt docker cho máy của bạn : https://docs.docker.com/engine/install/ubuntu/ . Sau khi cài đặt xong bạn hãy tiếp tục các hướng dẫn phía dưới. 

Tạo file  DockerFile ở root project
{@embed: https://gist.github.com/hoangnt-2197/21793c514984758da3393d624e88b9fb}
- 'From' xác định layer cơ sở cho container, trong trường hợp ở đây là OpenJDK11
- 'WORKDIR' đặt thư mục làm việc thành  /opt/. Mọi chỉ dẫn tiếp theo sẽ chạy trong thư mục đó
- 'ENV' được sử dụng để đặt một biến môi trường
- 'COPY' sao chép các tệp jar từ /target/ vào thư mục /opt/ bên trong vùng chứa
- 'ENTRYPOINT' thực thi lệnh java $JAVA_OPTS-jar app.jar bên trong vùng chứa

Giờ chúng ta build một image cho ứng dụng của chúng ta: 
```
$ docker build -t knote-java .
```
- -t knote-java để xác định tên ("tag") cho image của bạn, như ở trên là knote-java
-  . là vị trí của Dockerfile và mã ứng dựng - trong trường hợp này, đó là thư mục hiện tại
Hiểu qua về image: nó là một kho lưu trữ tất cả các tệp sẽ chạy trong container, một image có thể tạo ra nhiều container, một container sẽ tương ứng với một ứng dụng 

![](https://images.viblo.asia/f2f997dc-be1d-47ba-b7de-b84d055d6228.png)

Để kiểm tra danh sách image bạn dùng câu lệnh dưới đây !
```
$ docker images
```

### Giờ chúng ta sẽ chạy ứng dụng của mình bằng docker
Ở đây chúng ta sẽ chạy 2 container , một cho ứng dụng knote của chúng ta và một cho MongoDB. Chúng ta sẽ sử dụng image knote-java để tạo container cho knote và image mongo cho container MongoDB. Image mongo được cung cấp trên Docker hub
Trước tiên chúng ta sẽ tạo một mạng network để kết nối 2 container. Chạy lệnh 
```
docker network create knote
```

Tiếp đó chạy mongo: 
```
$ docker run --name=mongo --rm --network=knote mongo
```
- --name để xác định tên cho container , nếu bạn không định nghĩa một tên rõ ràng thì nó sẽ  sinh ra tự động
-  --rm để tự động xóa bỏ container và xóa bỏ các file hệ thống khi một container của image tồn tại
-  -- network đại diện cho mạng Docker mà cùng chứa sẽ chạy - khi bị bỏ qua, vùng chưa sẽ chạy trong mạng mặc định
-  mông là tên của image
Chú ý răng khi ta chạy docker run, nếu trong máy của chúng ta chưa có image nó sẽ tự động downloads image mongo trên Docker Hub

Giờ chúng ta sẽ chạy knote-java:
```
$ docker run --name=knote-java --rm --network=knote -p 8080:8080 -e MONGO_URL=mongodb://mongo:27017/dev knote-java
```
- p 8080:8080: để publish port 8080 cho container tới port 8080 của máy local. Điều này có nghĩa là, khi bạn truy cập vào ứng dụng qua cổng 8080 trên máy tính của bạn, nó sẽ  request tới cổng 8080 của container Knote. Điều này giúp bạn có thể truy cập vào ứng dụng của mình trên máy local 
- -e để cài đặt biến môi trường bên trong container
- MONGO_URL chính là biến môi trường để ứng dụng chúng ta kết nối với MongoDB . Có một điều chú ý ở đây là sao không phải địa chỉ id như 127.0.0.1 mà lại là mongo. Thì trong docker  có tạo ra mạng dns, để các container có thể kết nối với nhau thông qua tên.
Giờ bạn có thể kiểm tra ứng dụng của mình bằng cách truy cập : http://localhost:8080
### Deploy lên server 
Chú ý bạn cần cài đặt docker cho  server của mình trước!
Chúng ta sẽ push image lên Docker hub:
```
docker tag knote-java <username>/knote-java:1.0.0
```
Chú ý thay đổi <username> bằng tên đăng nhập trên tài khoản DockerHub của bạn. Câu lệnh trên để ta đổi tên image để đẩy lên repository của bạn trên Docker Hub
 Giờ push ảnh lên bằng câu lệnh : 
```
docker push username/knote-java:1.0.0
```
 Và giơ truy cập vào server và chạy các câu lệnh :
```
$ docker network create knote
$ docker run --name=knote-java --rm --network=knote -p 8080:8080 -e MONGO_URL=mongodb://mongo:27017/dev knote-java
$ docker run --name=knote-java --rm --network=knote -p 8080:8080 -e MONGO_URL=mongodb://mongo:27017/dev knote-java:1.0.0
```
Hãy truy cập vào  <server_ip>:8080 để truy cập vào app của bạn !<br>
Như vậy là chúng tã đã hoàn thành xong phần deploy sử dụng docker!<br>
Chú ý nếu bạn không muốn đẩy image lên Docker Hub. Hãy đẩy code của bạn lên github và clone về máy trên server và thực hiện các bước như ở phần chạy ứng dựng bằng docker ở local
Vậy ở bài viết lần này mình đã hướng dẫn các bạn cách deploy ứng dụng bằng docker ! Bài viết tới mình sẽ hướng dẫn các bạn deploy sử dụng kubenetes
 Tài liệu tham khảo : https://learnk8s.io/spring-boot-kubernetes-guide