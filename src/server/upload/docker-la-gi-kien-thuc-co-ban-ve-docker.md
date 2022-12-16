### I. Tại sao phải dùng Docker ?

Việc setup và deploy application lên một hoặc nhiều server rất vất vả từ việc phải cài đặt các công cụ, môi trường cần cho application đến việc chạy được ứng dụng chưa kể việc không đồng nhất giữa các môi trường trên nhiều server khác nhau. Chính vì lý do đó Docker được ra đời để giải quyết vấn đề này.

### II. Docker là gì ?
Docker là một nền tảng cho developers và sysadmin để develop, deploy và run application với container. Nó cho phép tạo các môi trường độc lập và tách biệt để khởi chạy và phát triển ứng dụng và môi trường này được gọi là container. Khi cần deploy lên bất kỳ server nào chỉ cần run container của Docker thì application của bạn sẽ được khởi chạy ngay lập tức.

### III. Lợi ích của Docker
* Không như máy ảo Docker start và stop chỉ trong vài giây.
* Bạn có thể khởi chạy container trên mỗi hệ thống mà bạn muốn.
* Container có thể build và loại bỏ nhanh hơn máy ảo.
* Dễ dàng thiết lập môi trường làm việc. Chỉ cần config 1 lần duy nhất và không bao giờ phải cài đặt lại các dependencies. Nếu bạn thay đổi máy hoặc có người mới tham gia vào project thì bạn chỉ cần lấy config đó và đưa cho họ.
* Nó giữ cho word-space của bạn sạch sẽ hơn khi bạn xóa môi trường mà ảnh hưởng đến các phần khác.

### IV. Cài đặt
Link download: tại [đây](https://docs.docker.com/install/)

Chọn bản cài đặt tương ứng với hệ điều hành của bạn và tiến hành cài đặt theo hướng dẫn đối với Linux còn Windows và MacOS thì bạn chỉ cần tải bản cài về và cài đặt như mọi application khác.

Sau khi cài đặt xong để kiểm tra xem cài đặt thành công hay không ?

* Mở command line:
```
$ docker version
$ docker info
$ docker run hello-world
```


### V. Một số khái niệm

![](https://images.viblo.asia/99c936d5-36dc-4928-921a-30e1b4338983.png)

* **Docker Client:** là cách mà bạn tương tác với docker thông qua command trong terminal. Docker Client sẽ sử dụng API gửi lệnh tới Docker Daemon.
* **Docker Daemon:** là server Docker cho yêu cầu từ Docker API. Nó quản lý images, containers, networks và volume.
* **Docker Volumes:** là cách tốt nhất để lưu trữ dữ liệu liên tục cho việc sử dụng và tạo apps.
* **Docker Registry:** là nơi lưu trữ riêng của Docker Images. Images được push vào registry và client sẽ pull images từ registry. Có thể sử dụng registry của riêng bạn hoặc registry của nhà cung cấp như : AWS, Google Cloud, Microsoft Azure.
* **Docker Hub:** là Registry lớn nhất của Docker Images ( mặc định). Có thể tìm thấy images và lưu trữ images của riêng bạn trên Docker Hub ( miễn phí).
* **Docker Repository:** là tập hợp các Docker Images cùng tên nhưng khác tags. VD: golang:1.11-alpine.
* **Docker Networking:** cho phép kết nối các container lại với nhau. Kết nối này có thể trên 1 host hoặc nhiều host.
* **Docker Compose:** là công cụ cho phép run app với nhiều Docker containers 1 cách dễ dàng hơn. Docker Compose cho phép bạn config các command trong file docker-compose.yml để sử dụng lại. Có sẵn khi cài Docker.
* **Docker Swarm:** để phối hợp triển khai container.
* **Docker Services:** là các containers trong production. 1 service chỉ run 1 image nhưng nó mã hoá cách thức để run image — sử dụng port nào, bao nhiêu bản sao container run để service có hiệu năng cần thiết và ngay lập tức.


### VI. Dockerfile

Dockerfile là file config cho Docker để build ra image. Nó dùng một image cơ bản để xây dựng lớp image ban đầu. Một số image cơ bản: python, unbutu and alpine. Sau đó nếu có các lớp bổ sung thì nó được xếp chồng lên lớp cơ bản. Cuối cùng một lớp mỏng có thể được xếp chồng lên nhau trên các lớp khác trước đó.

Các config :
* **FROM** — chỉ định image gốc: python, unbutu, alpine…
* **LABEL** — cung cấp metadata cho image. Có thể sử dụng để add thông tin maintainer. Để xem các label của images, dùng lệnh docker inspect.
* **ENV** — thiết lập một biến môi trường.
* **RUN** — Có thể tạo một lệnh khi build image. Được sử dụng để cài đặt các package vào container.
* **COPY** — Sao chép các file và thư mục vào container.
* **ADD** — Sao chép các file và thư mục vào container.
* **CMD** — Cung cấp một lệnh và đối số cho container thực thi. Các tham số có thể được ghi đè và chỉ có một CMD.
* **WORKDIR** — Thiết lập thư mục đang làm việc cho các chỉ thị khác như: RUN, CMD, ENTRYPOINT, COPY, ADD,…
* **ARG** — Định nghĩa giá trị biến được dùng trong lúc build image.
* **ENTRYPOINT** — cung cấp lệnh và đối số cho một container thực thi.
* **EXPOSE** — khai báo port lắng nghe của image.
* **VOLUME** — tạo một điểm gắn thư mục để truy cập và lưu trữ data.

### VII. Tạo Demo
Tạo file Dockerfile
```
FROM golang:1.11 AS builder
WORKDIR /go/src/docker-demo/
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o docker-demo .
FROM alpine:latest
WORKDIR /root/
COPY — from=builder /go/src/docker-demo .
CMD [“./docker-demo”]
```


Tạo file main.go
```
package main
import (
   “fmt”
)
func main() {
   fmt.Println(“Learning Docker”)
}
```


Tiến hành build file Dockerfile
```
$ docker build .
```

![](https://images.viblo.asia/d02b37f2-39f1-4372-9e10-37ea9cf1c88e.png)

```
$ docker run 4cc010d9d657
```

Kết quả in ra dòng chữ **Learning Docker** đã được code trong file main.go

![](https://images.viblo.asia/c32ad64b-7409-4622-abd4-a7e1f85fc2fb.png)

### VII. Các lệnh cơ bản trong docker ### 
* List image/container:

 ```
$ docker image/container ls
```


* Delete image/container: 
```
$ docker image/container rm <tên image/container >
```


* Delete all image hiện có:
```
$ docker image rm $(docker images –a –q)
```

* List all container hiện có:
```
$ docker ps –a
```

* Stop a container cụ thể:
```
$ docker stop <tên container>
```

* Run container từ image và thay đổi tên container:
```
$ docker run –name <tên container> <tên image>
```

* Stop all container:
```
$ docker stop $(docker ps –a –q)
```

* Delete all container hiện có:
```
$ docker rm $(docker ps –a –q)
```

* Show log a container:
```
$ docker logs <tên container>
```

* Build một image từ container:
```
$ docker build -t <tên container>
```

* Tạo một container chạy ngầm:
```
$ docker run -d <tên image>
```

* Tải một image trên docker hub:
```
$ docker pull <tên image>
```

* Start một container:
```
$ docker start <tên container>
```