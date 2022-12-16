Chào các bạn, số tiếp theo về TIP chia sẻ về Docker hôm nay mình cùng tìm hiểu về các chỉ thị quan trọng trong Dockerfile.
![](https://images.viblo.asia/f63d5df4-a9f0-43b2-8285-3c5c79fd3c19.png)
## 1. Dockerfile là gì
Dockerfile là một file text, trong đó chứa các dòng chỉ thị để Docker đọc và chạy theo chỉ thị đó để cuối cùng bạn có một image mới theo nhu cầu của mình.

**Dockerfile –> Docker Image –> Docker Container**
## 2. Các chỉ thị Dockerfile
**#1: FROM –**

**FROM** : mọi Docker file đều có chỉ thị này, chỉ định image cơ sở

Ví dụ 1:
```
#specify a Base Image

FROM ubuntu:latest
```
Ví dụ 2:
```
#specify a Base Image

FROM node:12
```
**#2: MAINTAINER –**

**MAINTAINER** Được sử dụng để nói về người tạo Docker Image

Ví dụ:
```
MAINTAINER support@kienle.com
```
**#3: CMD –**

**CMD** dùng để thực thi lệnh khi chạy container

Ví dụ 1:

```
#To run apache2 in foreground
CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]
```
Ví dụ 2:

```
FROM ubuntu:latest
CMD /bin/bash
```
**#4: RUN –**

**RUN** : chạy các lệnh.

Ví dụ:
```
FROM ubuntu:latest
MAINTAINER support@kienle.com
RUN apt-get update
RUN apt-get install -y apache2
```
Nếu muốn run .sh(shell script) file trong Dockerfile
```
COPY test.sh .
RUN ./test.sh
#OR
RUN /path/to/test.sh
```
**#5: LABEL –**
**LABEL** Được sử dụng để chỉ định thông tin của Docker Image.

Ví dụ:
```
FROM ubuntu:latest
LABEL "author"="Kien Le"
LABEL "Date"="2020-09-29"
```
**#6: EXPOSE –**

**EXPOSE** thiết lập cổng
Ví dụ 1:
```
#To Expose port 80 of Docker container
EXPOSE 80
```
Ví dụ 2:
```
EXPOSE 8080/tcp
```
**#7: ENV –**

**ENV** thiết lập biến môi trường

Ví dụ 1:
```
FROM node:12
ENV workdirectory /usr/node
```
**#8: ADD –**

**ADD**: sao chép dữ liệu
Syntax:
```
ADD <source>... <destination>
```
Ví dụ 1:
```
ADD java/jdk-8u231-linux-x64.tar /opt/jdk/
```
Ví dụ 2:
```
ADD src /home/ubuntu/test/
```
**#9: COPY –**

**COPY** sao chép dữ liệu

Syntax:
```
COPY <source>... <destination>
```
Ví dụ 1:

```
#To Install All dependencies for Node.js App
COPY package*.json ./
RUN npm install 
#To copy all application packages 
COPY . .
```
Ví dụ 2:
```
COPY index.html /var/www/html
```
**#10: ENTRYPOINT –**

**ENTRYPOINT** Được sử dụng để định cấu hình một container mà bạn có thể chạy dưới dạng tệp thực thi.
Ví dụ 1:
```
FROM ubuntu:latest
ENTRYPOINT ["ls"]
```
**#11: VOLUME –**

**VOLUME** gắn ổ đĩa, thư mục
Ví dụ 1:
```
FROM node:12
RUN mkdir /node
WORKDIR /node
RUN echo "Welcome to Node.js" > node
VOLUME /node
```
**#12: USER –  **

USER user chạy trong container

Ví dụ 1:
```
USER admin
To create new user in Dockerfile and login to user.
```

Ví dụ 2:

```
RUN adduser -D admin
USER admin
```

**#13: WORKDIR –**

**WORKDIR** thư mục làm việc

Ví dụ 1:

```
#To Create nodejsapp directory
WORKDIR /nodejsapp
```

**#14: ARG –**

**ARG** Định nghĩa các biến truyền vào khi build

Ví dụ 1:
```
ARG JAVA_PATH=/opt/jdk/jdk1.8.0_251
ENV JAVA_HOME ${JAVA_PATH}
```

**#15: ONBUILD –**

**ONBUILD** Được sử dụng để chỉ định lệnh chạy 
Ví dụ 1:
```
FROM node:12
RUN mkdir -p /usr/node/app
WORKDIR /usr/node/app
ONBUILD COPY package.json /usr/node/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/node/app
CMD [ "npm", "start" ]
```
**#16: STOPSIGNAL –**

**STOPSIGNAL**  Gửi lệnh để container thoát khỏi hệ thông

Ví dụ 1:

```
STOPSIGNAL SIGQUIT
```

**#17: SHELL –**

**SHELL**  Được sử dụng để thiết lập shell mặc định.

Ví dụ:
```
SHELL ["/bin/bash", "-c", "echo hello"]
```

**#18: HEALTHCHECK –**

**HEALTHCHECK** Kiểm tra sức tình trạng container

Ví dụ 1:

```
FROM ubuntu:latest
HEALTHCHECK --interval=60s --timeout=5s \
  CMD curl -f http://fosstechnix.info/ || exit 1
EXPOSE 80
```
**#19: .dockerignore –**

**.dockerignore** lượt bỏ các file không được chạy khi build

```
sudo nano .dockerignore
*.yaml
__pycache__/
.git
.aws
.env
```
## Lời kết
Trên đây là 19 chỉ thị quan trọng hay được sử dụng trong Dockerfile để build images. Chúc các bạn thành công.!