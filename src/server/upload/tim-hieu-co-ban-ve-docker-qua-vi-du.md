Trong bài viết này mình sẽ giới thiệu cho các bạn về docker, cùng tìm hiểu các khái niệm và một số lệnh chính.<br>
### Khái niệm
Đầu tiên, chúng ta phải hiểu được khái niệm docker là gì, dùng để làm gì??? Docker là một platform giúp chúng ta develop, deploy and run application trong các container.<br>
Lợi thế của docker là giúp chúng ta triển khai ứng dụng mà không phải phụ thuộc vào môi trường, bới vì đơn giản, môi trường mà chúng ta triển khai nó nằm trong các container, được dựng lên bởi các image, nhờ có các image đó mà chúng ta có thể tạo ra được bất kỳ container nào có setup môi trường như ý muốn tại bất cứ đâu.<br>
Vậy container và image trong docker là gì? tại sao nó lại làm được như vậy? HIểu đơn giản thì container là một runtime instance của image, image là một executeable package bao gồm mọi thứ chúng ta cần để run một application như code, runtime, các thư viện, các biến môi trường, và cả các file config. Ví dụ chúng ta có 1 image môi trường ubuntu thì sẽ khởi tạo ra một container ubuntu, 1 môi trường mysql thì sẽ khởi tạo ra được container môi trường mysql...<br>
Khi nói về docker thì ta thường so sánh với máy ảo, vậy chúng có gì khác nhau? Cùng tìm hiểu thông qua bức ảnh sau:<br>
![](https://images.viblo.asia/2749742d-dd5c-4ef8-a5d2-6ff672017315.png)<br>
Một container được run, nó sẽ chỉ bao gồm các cấu hình của ứng dụng, thư viện, ... và được chia sẻ nhân với máy chủ hiện tại cùng với các container khác, nó được chạy bởi các process riêng rẽ, không tốn nhiều bộ nhớ và rất nhẹ.<br>
Khác với container, máy ảo khi khởi chạy sẽ  chạy một hệ điều hành guest với quyền truy cập ảo vào tài nguyên máy chủ thông qua một trình ảo hóa, và nó sẽ cung cấp một môi trường gồm nhiều tài nguyên hơn một ứng dụng cần.<br>
Thôi, không lan man nữa, nói tóm lại chúng ta hiểu docker cho phép chúng ta chạy ứng dụng trên các môi trường được chỉ định sẵn ở bất cứ đâu bên trong các container, image có nhiệm vụ tạo ra các container đó.<br>
### Cài đặt
Có thể cài đặt docker trên nhiều môi trường như: linux, macOS, Windows... các bạn tham khảo cách [cài đặt trên trang chủ của docker](https://docs.docker.com/install/)<br>
### Một số lệnh cơ bản
Sau khi cài đặt docker thành công chúng ta có thể check version:
```
~$ docker -v
Docker version 18.09.7, build 2d0083
```
Lưu ý, thao tác với docker yêu cầu quyền root, bạn có thể add user với quyền root docker hoặc gõ lệnh `sudo -s` để thao tác với user root.<br>
Cùng tìm hiểu một số lệnh cơ bản:<br>
* List các image đang có: `docker image ls`<br>
* Pull image từ Docker Hub về local: `docker pull <image name>`<br>
* Xóa một image: `docker image rm <image name>`<br>
* List các container: `docker container ls -a` hoặc `docker ps -a`<br>
* List các container đang running: `docker container ls` hoặc `docker ps`<br>
* Stop 1 container: `docker stop <container name>`<br>
* Start 1 container: `docker start <container name>`<br>
* Xóa 1 container: `docker rm <container name>`<br>

Để trực quan hơn, chúng ta cùng thao tác các lệnh cơ bản thông qua ví dụ:<br>
Pull một image tên là `hello-world` từ Docker Hub:
```
~# docker pull hello-world

Using default tag: latest
latest: Pulling from library/hello-world
1b930d010525: Pull complete 
Digest: sha256:6540fc08ee6e6b7b63468dc3317e3303aae178cb8a45ed3124764528bcc1d20f
Status: Downloaded newer image for hello-world:latest
```
Tiếp theo, cùng kiểm tra các image đang có:
```
~# docker image ls

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              fce289e99eb9        7 months ago        1.84kB
```
Run image `hello-world` vừa được pull về với container tên là `my-example`:
```
:~# docker run --name my-example hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
Kiểm tra các container đang có, ta sẽ thấy một container có tên `my-example` từ image `hello-world`:
```
~# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS                          PORTS                               NAMES
802073ed319a        hello-world         "/hello"                 About a minute ago   Exited (0) About a minute ago                                       my-example
```
Xóa container vừa được tạo ra:
```
~# docker container rm my-example 
my-example
```
Kiểm tra lại container ta sẽ thấy container có tên `my-example` đã được xóa:
```
~# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
```
### Sử dụng Dockerfile để deploy ứng dụng Java Spring-boot
Phần tiếp theo chúng ta cùng tìm hiểu cách sử dụng Dockerfile để deploy ứng dụng Java Spring-boot. Đầu tiên, chúng ta cùng tạo một ứng dụng Java Sring-boot cơ bản với 1 API để test:<br>
Trước hết cùng tìm hiểu khái niệm về Dockerfile: Dockerfile chứa tập hợp các lệnh để docker có thể đọc hiểu và thực hiện để đóng gói thành một image theo yêu cầu người dùng.<br>
Trong ví dụ này chúng ta sẽ xây dựng ứng dụng Java Spring-boot và deploy ứng dụng trên môi trường Java-8.<br>
Cấu trúc thư mục:<br>
```
demo/
├── src/
|   └── main/
|       ├── java
|       |   └── demo
|       |       ├── controller
|       |       |   └── TestController.java
|       |       └── DemoApplication.java
|       └── resources
|           └── application.properties
├── Dockerfile
└── pom.xml
```
File pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.1.7.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>demo</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>demo</name>
	<description>Demo project for Spring Boot</description>

	<properties>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```
File `TestController.java` mô tả API test: `GET - http://localhost:8080/test`
```
package demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }
}
```
File DemoApplication.java
```
package demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
```
File Dockerfile
```
FROM openjdk:8-jre

EXPOSE 8080

ADD ./target/demo-0.0.1-SNAPSHOT.jar /demo.jar

ENTRYPOINT ["java", "-jar", "demo.jar"]
```
Giải thích về file Dockerfile:<br>
* `FROM openjdk:8-jre`: base của image được tạo ra lấy từ image có tên `openjdk:8-jre`, nếu trên local của bạn không có image này thì docker sẽ tìm kiếm và pull image đó từ [Docker Hub](https://hub.docker.com/). Sau khi tìm kiếm thành công, docker sẽ pull image có môi trường jdk8 - jre về local và sẵn sàng xây dựng container với môi trường đó.<br>
* `EXPOSE 8080`: Container tạo ra sẽ expose ra port 8080.<br>
* `ADD ./target/demo-0.0.1-SNAPSHOT.jar /demo.jar` Lệnh copy file `demo-0.0.1-SNAPSHOT.jar` trong thư mục `target` sau khi package ứng dụng vào trong container với tên `demo.jar`.<br>
* `ENTRYPOINT ["java", "-jar", "demo.jar"]`: Lệnh thực thi execute file demo.jar được copy ở trong container.<br>

Sau khi tạo cấu trúc project như trên, đầu tiên chúng ta cần package ứng dụng bằng lệnh maven: `mvn clean install`.<br>
Tiếp theo chúng ta tiến hành build image từ Dockerfile tại folder chứa Dockerfile:
```
# docker build -t demo-app:v1 -f Dockerfile .

Sending build context to Docker daemon  16.99MB
Step 1/4 : FROM openjdk:8-jre
 ---> a61f05af7983
Step 2/4 : EXPOSE 8080
 ---> Running in c63458a5f732
Removing intermediate container c63458a5f732
 ---> af6aca65f50f
Step 3/4 : ADD ./target/demo-0.0.1-SNAPSHOT.jar /demo.jar
 ---> 9c496d3410eb
Step 4/4 : ENTRYPOINT ["java", "-jar", "demo.jar"]
 ---> Running in 7a0c9921a4c8
Removing intermediate container 7a0c9921a4c8
 ---> 19dd6e96cf7b
Successfully built 19dd6e96cf7b
Successfully tagged demo-app:v1
```
Như vậy chúng ra vừa xây dựng xong 1 image có tên `demo-app` và tag name là `v1`. Chúng ta có thể kiểm tra lại image vừa build:
```
# docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
demo-app            v1                  19dd6e96cf7b        2 minutes ago       263MB
```
Nhắc lại, image này được khởi tạo từ image gốc là `openjdk:8-jre` có môi trường java và chúng ta với copy gói jar vào trong đó. Khi run image, docker sẽ tạo ra container có môi trường `openjdk:8-jre` và có gói jar demo.jar được copy vào thư mục gốc của container, sau đó sẽ tiến hành run gói demo.jar bằng lệnh `java -jar demo.jar`.<br>
Run image bằng lệnh sau:
```
docker run --name demo-container -it -p 8080:8080 demo-app:v1 
```
Lệnh trên có ý nghĩa: Run image demo-app:v1 bằng container có tên demo-container, mapping port 8080 trong container với port 8080 trên local.<br>
Sau khi run app thành công chúng ta có thể thoát cửa sổ terminal mà không stop container bằng cách nhấn phím `ctrl + P + Q`<br>
Cùng kiểm tra các container đang chạy, ta sẽ thấy container có tên demo-container đang ở trạng thái status=Up:
```
# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
c419c09241fc        demo-app:v1         "java -jar demo.jar"     3 minutes ago       Up 3 minutes        0.0.0.0:8080->8080/tcp              demo-container
```
Do chúng ta đã mapping port 8080 trên máy local vào port 8080 trên container nên có thể dễ dàng check được API được run trong container:
```
~# curl -X GET http://localhost:8080/test
true
```
Stop container đang chạy:
```
~# docker stop demo-container 
demo-container
```
Kiểm tra lại các container ta sẽ thấy container demo-container vẫn tồn tại nhưng có status là `Exited`, tức là container đó đã bị stop:
```
~#docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                       PORTS                               NAMES
c419c09241fc        demo-app:v1         "java -jar demo.jar"     5 minutes ago       Exited (143) 5 seconds ago                                       demo-container
```
Start lại container bằng cách:
```
~# docker start demo-container 
demo-container
```
Để xóa container trên, bạn cần stop container và sử dụng lệnh `docker container rm demo-container`
```
~# docker stop demo-container 
demo-container
~# docker container rm demo-container 
demo-container
```
Xóa image đã build bằng lệnh:
```
~# docker image rm demo-app:v1 
Untagged: demo-app:v1
Deleted: sha256:19dd6e96cf7bf98aab3041188942fb5ff287994a3b765c65565772ee7a92bfc6
Deleted: sha256:9c496d3410ebf649e6eb456e0df2517e13565f947c2eb30c564319fd122231f3
Deleted: sha256:edff43eb4defd8e60ae3b89091fb997da19876ba89eaddb91754e9c3e10f2021
Deleted: sha256:af6aca65f50f5b1e5d56ca43d0019e6f789bda6fa18b285980c7012e4d0e3ece
```
### Kết luận
Như vậy, qua bài viết mình đã giới thiệu về docker và một số lệnh cơ bản để sử dụng docker để deploy một ứng dụng đơn giản. Hy vọng bài viết giúp được các bạn hiểu về docker, cách sử dụng cơ bản và phần nào giúp ích các bạn trong học tập cũng như trong công việc. Cảm ơn các bạn theo dõi!!!