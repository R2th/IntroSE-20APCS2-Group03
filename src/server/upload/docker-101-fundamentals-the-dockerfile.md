Bài viết được dịch từ [Docker 101: Fundamentals & The Dockerfile](https://medium.com/@paigen11/docker-101-fundamentals-the-dockerfile-b33b59d0f14b)

![](https://images.viblo.asia/18b7c2a8-df11-4e5b-9ca6-556db78e7f75.jpeg)

Bạn, cũng như tôi, có thể đã được nghe cái tên Docker trước đó rất nhiều lần. Cũng có thể đồng nghiệp hoặc bạn bè của bạn là một phan cuồng của nó,  kẻ mà có thể cập nhật mọi kiến thức về Docker ngay mà khi nó ra một phiên bản nào đó, và họ không thể ngừng khi người ta nhắc tới Docker đối với họ, họ sống như một tín đồ cuồng đạo vậy. Tại sao Docker lại có thể khiến họ trở nên như vậy ?? Hôm nay tôi sẽ cố gắng làm sáng tỏ Docker cho bạn. Biết đâu, một vài năm tới chúng ta sẽ có một tôn giáo mới mang tên "Docker" =))

Chúng ta sẽ làm rõ ít nhất 3 phần chính, như là bài nhập môn cơ bản đối với bất cứ tín đồ nào bước chân vào cửa của sự khai sáng vậy.
* Docker (và  Dockerfile),
* Docker Compose, và
* Docker Swarm

Nào, bắt đầu thôi. Tôi sẽ giải thích `Docker` thực sự là gì theo những gì tôi hiểu.

### 1. Docker là gì ?

Trên trang chủ [https://www.docker.com/](https://www.docker.com/) mô tả đơn giản Docker là:
> “the world’s leading software containerization platform” — Docker, Docker Overview
> 
Có thể hiểu rằng "Docker là một nền tảng container hóa phần mềm hàng đầu thế giới"

Đọc qua đoạn đó bạn đã hiểu ? Có vẻ không rõ ràng lắm và ngay cả tôi đọc một vài lần cũng chưa hiểu nổi. Vì thế tôi tìm ra một định nghĩa có vẻ tường minh và dễ hiểu hơn nhiều tại OpenSource.com: 

> Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. — OpenSource.com, What is Docker?

Hiểu đơn giản, Docker là một công cụ được thiết kế để có thể dễ dàng tạo, deploy và chạy các ứng dụng bên trong một thứ được gọi là `containers`. Containers là nơi cho phép lập trình viên đóng gói ứng dụng của mình và tất cả các thành phần mà ứng dụng đó cần như các thư viện, config và các phụ thuộc liên hệ của ứng dụng đó. Sau cùng tất cả được đóng gói lại, và khi cần, với một vài bí kíp cờm man lai đơn giản, môi trường cho ứng dụng đã sẵn sàng để chúng ta có thể tập trung vào việc chính "code dạo" :v:


### 2. Tại sao lại sử dụng Docker ?

Tôi không thể nhớ nổi đã bao nhiêu lần tôi nghe đồng nghiệp cũng như các câu hỏi trên diễn đàn (kể cả tôi) than rằng "Nó hoạt động trên máy local của tôi, tôi không biết tại sao nó không chạy được trên máy của bạn (hoặc trên server)" 

Đó chính là lý do Docker được sinh ra để tránh khỏi những khó khăn đó khi mà bạn làm việc trong một sprin của dự án trong một vài ngày hoặc vài tuần, và khi bạn trở lại, deploy trên hệ thống, ứng dụng không chạy :). Một trong những lý do đơn giản nhất đó chính là 
do các thành phần phụ thuộc của hệ thống cần thiết để chạy một ứng dụng như phiên bản phần mềm, các gói thư viện của hệ thống không được lưu trong các config như `package.json`, `build.gradle` hoặc ngay cả ở trong `manifest.yml`.



![](https://images.viblo.asia/e827f0e6-4509-4fd1-96cf-ad0e62b02d8a.png)
Giống như Jon Snow, mỗi Docker container đều là một điều kì diệu mà lúc sinh ra nó chưa biết nó có thể làm được gì, tất cả chỉ là một máy Linux trống không. 

Sau khi có một container, chúng ta bắt đầu nói với nó tất cả những điều nó cần biết, các ràng buộc nó cần tải và cài đặt để phục vụ cho ứng dụng của chúng ta. Tất cả sẽ được thiết lập với câu thần chú `Dockerfile`

Với cách làm việc như thế, có thể nói đơn giản rằng Docker đã loại bỏ các phỏng đoán (việc phải tốn hàng giờ để tìm kiếm cách giải quyết) của việc deploy ứng dụng của chúng ta. Bởi vì Docker luôn luôn khởi động như một cỗ máy hới, tách biệt với máy local của chúng ta và các liên kết phụ thuộc, các gói và thư viện sẽ được thêm vào khi khởi động Docker. Mọi thứ. Đơn giản. Và Thời gian là những thứ chúng ta có thể trông thấy từ ngay lần đầu sử dụng.

Với Docker, không có môi trường các phiên bản phụ thuộc khác nhau được cài đặt. Không có môi trường thiếu phụ thuộc hoàn thoàn. Với Docker không có gì là vô nghĩa cả.

### 3. Docker Tools

Trước khi đi sâu vào Dockerfile, chúng ta sẽ đi qua một bộ công cụ được sử dụng trong Docker.

![](https://images.viblo.asia/9d92d1bb-0e50-4da7-a1e4-20be3a76eb47.png)

Docker cung cấp 4 công cụ chính để có thể hoàn thành công việc:
1. [Docker Engine](https://docs.docker.com/engine/)
2. [Docker Compose](https://docs.docker.com/compose/overview/)
3. [Docker Machine*](https://docs.docker.com/machine/overview/)
4. [Docker Swarm](https://docs.docker.com/engine/swarm/)


**Docker Engine** 

> The Docker Engine is Docker’s “powerful open source containerization technology combined with a work flow for building and containerizing your applications.” — Docker, About Docker Engine
> 

Nghe có vẻ kì diệu nhưng thực ra nó kì diệu thật. Docker Engine chứa mọi thứ để có thể tạo ra một Docker images từ một file Dockerfile hay một file docker-compose.yml bằng cách sử dụng một vài command đơn giản thông qua Docker CLI, nó sẽ nói chuyện với các công cụ này những gì cần phải làm. Việc của chúng ta là tạo các file config và các dòng lệnh đơn giản.

**Docker Compose**

>“is a tool for defining and running multi-container Docker applications” — Docker, Overview of Docker Compose
>

Có thể hiểu rằng khi ứng dụng của bạn được tạo thành từ nhiều dịch vụ, cơ sở dữ liệu và các quan hệ phụ thuộc. `docker-compose.yml` cho phép cấu hình tất cả các dịch vụ bên trong của bạn chỉ với một câu lệnh đơn giản. 

**Docker Machine**
>“Docker Machine is a tool that lets you install Docker Engine on virtual hosts, and manage the hosts with docker-machine commands.” — Docker, Docker Machine Overview

Docker machine là một công cụ hỗ trợ chúng ta có thể làm chủ Docker một cách nhanh chóng. Docker Machine sẽ tạo các máy ảo và cài Docker Engine lên chúng và cuối cùng nó sẽ cấu hình Docker Client để giao tiếp với Docker Engine một cách bảo mật


**Docker Swarm**

>“creates a swarm of Docker Engines where you can deploy application services. You don’t need additional orchestration software to create or manage a swarm” — Docker, Swarm Mode Overview
>

Docker swarm giúp chúng ta có thể gom các Docker Engine lại với nhau lại và chúng ta có thể dễ dàng kiểm soát nó gioongsnhw một vitua Docer Engine vậy.


*Vậy là chúng ta đã giới thiệu qua các công cụ mà chúng ta có lẽ sẽ phải làm quen nhiều để có thể hiểu sâu hơn về Docker. Tiếp theo chúng ta sẽ nói về `Docerfile`*

> Docker là một công cụ vô cùng mạnh mẽ, và sức mạnh của nó được khai thác và sử dụng nhờ câu thần chú mang tên `Docerfile`
> 

> A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.- Docker, Dockerfile Reference
> 

Docker fie là một file text mà trong đó chứa tất cả các đoạn script dùng để build các image trong container. Dockerfile giúp chúng ta đơn giản tiến trình từ lúc bắt đầu đến lúc kết thúc việc khởi tạo một Docker Engine.

Điều đầu tiên Dockerfile cần đó là một `base image`. Một `base image` nói cho container biết rằng nó cần cài đặt những gì như là hệ điều hành, phần mềm, các phụ thuộc. — Ubuntu, RHEL, SuSE, Node, Java, etc..

Tiếp đó, bạn cần phải cung cấp một bản hướng dẫn cài đặt. Tất cả những thứ mà Docker container cần để có thể biết về: biến môi trường, các cài đặt phụ thuộc, nơi lưu tập tin, ...

Cuối cùng, bạn cần phải nói cho container rằng nó cần làm gì. Thông thường, nó sẽ chạy các cài đặt và lệnh cụ thể ho ứng dụng được chỉ định trong hướng dẫn thiết lập.

Một vài ví dụ khi tạo Dockerfile

**Node Dockerfile: **
```
# creates a layer from the node:carbon Docker image
FROM node:carbon
# create the app directory for inside the Docker image
WORKDIR /usr/src/app
# copy and install app dependencies from the package.json (and the package-lock.json) into the root of the directory created above
COPY package*.json ./
RUN npm install
# bundle app source inside Docker image
COPY . .
# expose port 8080 to have it mapped by Docker daemon
EXPOSE 8080
# define the command to run the app (it's the npm start script from the package.json file)
CMD [ "npm", "start" ]
```


**Java Dockerfile**

```
# creates a layer from the openjdk:8-jdk-alpine Docker image
FROM openjdk:8-jdk-alpine
# create the directory for where Tomcat creates its working directories
VOLUME /tmp
# copy the project JAR file to the container renamed as 'app.jar'
COPY build/libs /app
# execute that JAR in the entry point below
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/java-example.jar"]
```

**Python Dockerfile**
```
# creates a layer from the ubuntu:16.04 Docker image 
FROM ubuntu:16.04
# adds files from the Docker client’s current directory
COPY . /app
# builds the application with make 
RUN make /app
# specifies what command to run within the container
CMD python /app/app.py
```

Các câu lệnh không thực sự khó hay phức tạp, các câu giải thích tôi nghĩ nên giữ nguyên tiếng Anh sẽ giúp một phần sau này bạn có thể tra cứu về các lỗi của nó khi có một vấn đề xảy ra với Dockerfile của bạn.

Trên đây tôi đã giới thiệu các khái niệm cơ bản về Docker. Hi vọng sẽ giúp bạn hiểu được một phần về thứ công cụ kì diệu này. Rất vui nếu bạn để lại bình luận, nó sẽ giúp chúng ta phát triển hơn. Chúc bạn thành công! Gluck.