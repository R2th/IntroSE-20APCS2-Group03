> Là một developer khi join vào một dự án mới chắc hẳn ai cũng từng có những lúc phải dành ra cả ngày chỉ để cài đặt môi trường cho dự án mới. Hay vào một ngày đẹp trời bạn đến công ty và nhận được tin phải sang support chữa cháy cho một dự án, clone được source code về cài đủ thứ thư viện cuối cùng đến khi build thì gặp conflict giữa các thư viện, không biết giải quyết thế nào. Lúc này Docker chính là giải pháp cứu cánh cho bạn. Vậy Docker là gì? Cài đặt và cách sử dụng thế nào? Các bạn hãy cùng mình tìm hiểu ngay sau đây.

### 1: Docker là gì?
* **Định nghĩa**

Docker là một công cụ được thiết kế để giúp tạo, triển khai và chạy các ứng dụng dễ dàng hơn bằng cách sử dụng các [container](https://opensource.com/resources/what-are-linux-containers?intcmp=7016000000127cYAAQ). Các [container](https://opensource.com/resources/what-are-linux-containers?intcmp=7016000000127cYAAQ) cho phép lập trình viên đóng gói một ứng dụng với tất cả các phần cần thiết, chẳng hạn như thư viện, database...vv và gửi tất cả ra dưới dạng một gói.

* **Các thành phần chính**

– Docker Engine : là thành phần chính của Docker, như một công cụ để đóng gói ứng dụng

– Docker Hub : là dịch vụ cloud để chia sẻ ứng dụng và tự động hóa chuỗi các công việc liên tục, có thể thao tác pull/push với các images

* **Một số khái niệm**

–Docker images : là một “read-only template”. Chẳng hạn, một image chứa hệ điều hành Ubuntu đã cài đặt sẵn Apache và ứng dụng web

– Docker registries : Là kho chứa images. Người dùng có thể tạo ra các images của mình và tải lên đây hoặc tải về các images được chia sẻ

– Docker container : hoạt động giống như một thư mục (directory), chứa tất cả những thứ cần thiết để một ứng dụng có thể chạy được. Mỗi một docker container được tạo ra từ một docker image. Các thao tác với một container : chạy, bật, dừng, di chuyển, và xóa

– Dockerfile : là một file chứa tập hợp các lệnh để Docker có thể đọc và thực hiện để đóng gói một image theo yêu cầu người dùng

– Orchestration : là các công cụ, dịch vụ dùng để điều phối và quản lý nhiều containers sao cho chúng làm việc hiệu quả nhất.

### 2: Cài đặt Docker (Cài trên Ubuntu 16.04)
Bước 1: 
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
Bước 2: 
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
Bước 3: 
```
sudo apt-get update
```
Bước 4: 
```
apt-cache policy docker-ce
```
Bước 5: 
```
sudo apt-get install -y docker-ce
```
Kiểm tra xem docker đã hoạt động hay chưa, các bạn run lệnh sau:

```
sudo systemctl status docker
```

kết quả sẽ là :

```
Output
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-10-18 20:28:23 UTC; 35s ago
     Docs: https://docs.docker.com
 Main PID: 13412 (dockerd)
   CGroup: /system.slice/docker.service
           ├─13412 /usr/bin/dockerd -H fd://
           └─13421 docker-containerd --config /var/run/docker/containerd/containerd.toml
```

### 3: Cài đặt Docker Compose (Cài trên Ubuntu 16.04)

Bước 1: 
```
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```
Bước 2: 
```
sudo chmod +x /usr/local/bin/docker-compose
```
Kiểm tra version docker compose các bạn run lệnh sau:

```
docker-compose --version
```

kết quả sẽ là :

```
Output
docker-compose version 1.18.0, build 8dd22a9
```

### 4: Tạo và run một ứng dụng Spring boot với Docker

Đầu tiên các bạn clone source code Spring boot với lệnh git sau:
```
git clone https://github.com/spring-guides/gs-spring-boot-docker.git
```
sau đó cd vào thư mục gs-spring-boot-docker/initial
```
cd gs-spring-boot-docker/initial
```
sửa file Application.java 
```
sudo nano src/main/java/hello/Application.java
```
copy đoạn code sau vào file Application.java
```
package hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application {

    @RequestMapping("/")
    public String home() {
        return "Hello Docker World";
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```
tạo mới một file Dockerfile
```
$ sudo nano Dockerfile
```
Set quyền cho file vừa tạo
```
sudo chmod -R 777 Dockerfile
```
sửa  file Dockerfile và thêm vào đoạn code sau
```
FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","hello.Application"]
```
cuối cùng build và run project với lệnh sau:

```
./gradlew build && java -jar build/libs/gs-spring-boot-docker-0.1.0.jar
```
sử dụng trình duyệt truy cập vào http://localhost:8080/ bạn sẽ thấy message "Hello Docker World".


Như vậy mình vừa giới thiệu sơ qua cho các bạn Docker là gì, cài đặt và cách sử dụng cơ bản. Mong rằng bài  viết sẽ giúp ích cho các bạn trong việc tìm hiểu và làm quen với Docker.

Bài viết có tham khảo tài liệu từ các nguồn:

https://fullstackstation.com/docker-la-gi/

https://spring.io/guides/gs/spring-boot-docker/

https://opensource.com/resources/what-docker