# 1. Docker là gì?
Docker là một nền tảng mở dùng để developing, shipping và running các ứng dụng một cách dễ dàng thông qua việc sử dụng OS-level virtualization để cung cấp các containers.
# 2. Docker và Hypervisors
Sự khác biệt chính giữa docker và hypervisor là về tài nguyên. Nếu như ở hypervisors thì chúng ta cần cung cấp tài nguyên từ ban đầu cho các máy ảo kể cả khi máy ảo không dùng hết tài nguyên thì cũng không thể tái sử dụng tài nguyên đã cho đi. Còn đối với docker thì các máy ảo sẽ được cấp tài nguyên khi cần và cấp vừa đủ cho máy ảo sử dụng để có thể tối ưu tài nguyên.
# 3. Docker Image và Docker Container
Các bạn có thể hiểu docker image là một template dùng để tạo containers thông qua các câu lệnh run các image. Có thể xem containers là các instance của image. 

Containers như các máy ảo và được khởi tạo khi chạy các image, cho phép lập trình viên đóng gói ứng dụng của mình.

**Một số câu lệnh hay dùng của Docker Image**
```shell
# Cấu trúc mẫu
$ docker image COMMAND
```
```shell
# Build một image từ Dockerfile
$ docker image build

# Hiển thị lịch sử của một image
$ docker image history

# Danh sách các image
$ docker image ls

# Pull một image hoặc một repository từ registry
$ docker image pull

# Push một image hoặc một repository từ registry
$ docker image push

# Xóa một hoặc nhiều image
$ docker image rm
```
**Một số câu lệnh hay dùng của Docker Container**
```
# Cấu trúc mẫu
$ docker container COMMAND
```

```shell
# Danh sách các container
$ docker container ls

# Chạy một container
$ docker container run 

# Dừng một hoặc nhiều container đang chạy
$ docker container stop

# Chạy lại một hoặc nhiều container đang stop
$ docker container start

# Cập nhật config cho các container
$ docker container update

# Xoá một hoặc nhiều container
$ docker container rm

# Xóa tất cả các container đang stop
$ docker container prune

# Chạy một câu lệnh trong container đang chạy
$ docker container exec
```

Ngoài ra thì còn rất nhiều câu lệnh khác mà mình không thể liệt kê hết ở đây. 

# 4.Dockerfile
Dockerfile là một file không có đuôi dùng để khai báo các config cho image. Khi chúng ta build một image thì sẽ đọc từ trong Dockerfile và tiến hành build image.

Dockerfile là một tập hợp cái câu lệnh có dạng như dưới đây
```
# Comment
INSTRUCTION arguments
```
Các INSTRUCTION không phân biệt chữ hoa và chữ thường, nhưng để dễ phân biệt với các arguments thì các INSTRUCTION nên được viết dưới dạng UPPERCASE. 

Dưới đây là các INSTRUCTION của Dockerfile.

**FROM**
```shell
FROM ubuntu:18.04
```

FROM là một instruction khởi tạo dùng để khai báo base image. Một file Dockerfile luôn luôn bắt đầu bằng FROM

**RUN**
```shell
RUN apt-get update
RUN apt-get install -y curl python
``` 
RUN được sử dụng để chạy các lệnh và khi chạy thì kết quả sẽ được commit để sử dụng cho các instruction tiếp theo.

**CMD**
```shell
CMD echo "This is a test." | wc -
```
CMD cung cấp một một lệnh và đối số  cho conatiner đang thực thi và một file Dockerfile chỉ có thể có một CMD, nếu có từ 2 CMD trở lên thì CMD cuối cùng sẽ được chạy.
> RUN và CMD không giống nhau. RUN là chạy một lệnh và commit kết quả lệnh đó để cho các instruction sau sử dụng, còn CMD thì chỉ định lệnh dự định cho image.

**LABEL**

LABEL dùng để thêm metadata vào cho image, có thể dùng để thêm một số thông tin về tác giả của image và những thông tin thêm cần thiết. Để xem được label của image thì có thể sử dụng lệnh ```docker image inspect```.
```shell
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates
``` 
**EXPOSE**

EXPOSE dùng để chỉ định các cổng mạng cụ thể khi runtime, có thể cấu hình là cổng trên UDP hoặc TCP, ở trạng thái mặc định thì sẽ là TCP.
```
EXPOSE 80/tcp
EXPOSE 80/udp
```
**ENV**

ENV được dùng để khai báo các biến môi trường nhằm phục vụ cho các instruction trong giai đoạn build stage 
```shell
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
``` 
**ADD**
```shell
ADD [--chown=<user>:<group>] <src>... <dest>
#example
ADD --chown=55:mygroup files* /somedir/
``` 
ADD dùng để sao chép một file mới, thư mục mới hoặc một file remote từ <src> vào trong filesystem của image dựa trên đường dẫn <dest>.
    
**COPPY**

COPY cũng dùng để sao chép moojy file, thư mục mới từ src vào trong filesystem của imagr dực trên đường dẫn dest, nhưng COPY khác ADD là COPY không chấp nhận file remote mà chỉ chấp nhận file ở local.

**ENTRYPOINT**
    
   Ở CMD chúng ta đã biết là một Dockerfile chỉ có thể có một CMD, vậy nếu chúng ta muốn khi chạy container có thể thực thi nhiều câu lệnh thì làm như thế nào?
    
 Khi đó chúng ta sử dụng ENTRYPOINT để khai báo các lệnh vào đối số để container thực thi. Các lệnh này thường được viết trong một file có đuôi sh.
 ```shell
ENTRYPOINT ["/docker-entrypoint.sh"]
``` 
```shell
#!/bin/bash
set -e

if [ "$1" = 'postgres' ]; then
    chown -R postgres "$PGDATA"

    if [ -z "$(ls -A "$PGDATA")" ]; then
        gosu postgres initdb
    fi

    exec gosu postgres "$@"
fi

exec "$@"
```
**VOLUME**

VOLUME dùng để chỉ định một điểm gắn kết từ máy host vào container để truy cập và lưu trữ dữ liệu.
```shell
VOLUME /myvol
``` 
**WOKRDIR**
    
WORKDIR dùng để thiết lập thư mục cho các instruction khác như RUN, CMD, ENTRYPOINT, COPY, ADD.
```shell
WORKDIR /path/to/workdir
``` 
**ARG**

ARG dùng để định nghĩa các biến để dùng trong thời gian build image.
```shell
ARG user1=someuser
ARG buildno=1
```
> Không nên truyền vào các biến như secret key hoặc thông tin đăng nhập người dùng, vì các biến này được hiển thị cho tất cả mọi người dùng image. 
# 5. Docker Hub
 
Dockerhub là một Registry lớn của Docker Image. Hiểu đơn giản thì Dockerhub là nơi dùng để lưu trữ và chia sẻ các image của docker.
    
Chúng ta sẽ thử tạo một image và push lên docker-hub.

**Bước 1** Tạo một tài khoản trên docker-hub và tạo một repository. Ở đây thì mình đã tạo sẵn một repository có tên là lesson1
    ![image.png](https://images.viblo.asia/ff3b4e06-2843-4aa3-9480-52f6fd3d2e50.png)
    
 **Bước 2** Tạo và build một image

Đầu tiên chúng ta cần tạo một Dockerfile đơn giản như sau
```shell
FROM busybox
CMD echo "Hello Docker, My name is Polaris."
```
Sau đó chúng ta sử dụng lệnh build để build Dockerfile này.
```shell
quang@quang-Inspiron-14-3467:~/docker/lesson1$ docker build . -t quanglx173330/lesson1:latest
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM busybox
 ---> ec3f0931a6e6
Step 2/2 : CMD echo "Hello Docker, My name is Polaris."
 ---> Running in 279c442d6af3
Removing intermediate container 279c442d6af3
 ---> e239d02ad839
Successfully built e239d02ad839
Successfully tagged quanglx173330/lesson1:latest
``` 
> Để có thể push image lên docker-hub thì chúng ta cần build một image dạng <your_username>/<your_repo>:tag
    
Sau khi build xong image chúng ta sẽ có được một image như dưới đây
```shell
quang@quang-Inspiron-14-3467:~/docker/lesson1$ docker images
REPOSITORY                        TAG           IMAGE ID       CREATED             SIZE
quanglx173330/lesson1             latest        e239d02ad839   9 seconds ago       1.24MB
``` 
**Bước 3** Push image lên trên repository của docker-hub
```shell
quang@quang-Inspiron-14-3467:~/docker/lesson1$ docker push quanglx173330/lesson1:latest
The push refers to repository [docker.io/quanglx173330/lesson1]
d31505fd5050: Layer already exists 
latest: digest: sha256:a52e3329e125efecb5a7445566ed977f84986e38407542f840b5fdb56899e26c size: 527
``` 
Và dưới đây là kết quả sau khi push:
![image.png](https://images.viblo.asia/0465cde9-20ab-4632-ae3a-f279f4ba3cae.png)
# 6. Lời kết
Ở trên là những kiến thức cơ bản nhất về Docker mà mình đã tổng hợp được. Cảm ơn các bạn đã theo dõi bài viết, mong bài viết mang lại cho các bạn những kiến thức hữu ích. Ở phần tiếp theo chúng ta sẽ tìm hiểu về Docker-compose, mời các bạn đón đọc.
## Tài liệu tham khảo
   1. https://docs.docker.com/get-started/ 
   2. https://devopswithdocker.com/