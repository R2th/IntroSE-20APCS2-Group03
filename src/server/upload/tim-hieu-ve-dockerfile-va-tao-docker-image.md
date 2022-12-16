Ở bài viết trước, mình đã giới thiệu qua về công nghệ ảo hóa, **Docker Engine** cũng như cấu trúc của một **container**. Ở phần này mình sẽ giới thiệu qua về **Dockerfile** qua những gì mình tìm hiểu được và cách xây dụng **image** từ chính nó.

# Dockerfile là gì?
**Dockerfile** là một file dạng text không có phần đuôi mở rộng, chứa các đặc tả về một trường thực thi phần mềm, cấu trúc cho **Docker Image**. Từ những câu lệnh đó, Docker sẽ build ra Docker image (thường có dung lượng nhỏ từ vài MB đến lớn vài GB).

# Cú pháp của một Dockerfile
Cú pháp chung của một Dockerfile có dạng:
```
INSTRUCTION arguments
```
- **INSTRUCTION** là tên các chỉ thị có trong Dockerfile, mỗi chỉ thị thực hiện một nhiệm vụ nhất định, được Docker quy định. Khi khai báo các chỉ thị này phải được viết bằng chữ IN HOA.
- Một Dockerfile bắt buộc phải bắt đầu bằng chỉ thị **FROM** để khai báo đâu là image sẽ được sử dụng làm nền để xây dựng nên image của bạn.
- `aguments` là phần nội dung của các chỉ thị, quyết định chỉ thị sẽ làm gì.

**Ví dụ:**
```
FROM alpine:3.4

RUN apk update && \
    apk add curl && \
    apk add git && \
    apk add vim
```

# Các chỉ thị chính trong Dockerfile
## FROM
Chỉ định rằng image nào sẽ được dùng làm image cơ sở để quá trình build image thực thiện các câu lệnh tiếp theo. Các image base này sẽ được tải về từ Public Repository hoặc Private Repository riêng của mỗi người tùy theo setup.

**Cú pháp:**
```
FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```
Chỉ thị **FROM** là **bắt buộc** và phải được để lên phía trên cùng của Dockerfile. 

**Ví dụ:**
```
FROM ubuntu
hoặc
FROM ubuntu:latest
```
## LABEL
Chỉ thị **LABEL** được dùng để thêm các thông tin meta vào **Docker Image** khi chúng được build. Chúng tồn tại dưới dạng các cặp *key* - *value*, được lưu trữ dưới dạng chuỗi. Có thể chỉ định nhiều label cho một Docker Image, và tất nhiên mỗi cặp *key* - *value* phải là duy nhất. Nếu cùng một *key* mà được khai báo nhiều giá trị (value) thì giá trị được khai báo gần đây nhất sẽ ghi đè lên giá trị trước đó.

**Cú pháp:**
```
LABEL <key>=<value> <key>=<value> <key>=<value> ... <key>=<value> 
```
Bạn có thể khai báo metadata cho Image theo từng dòng chỉ thị hoặc có thể tách ra khai báo thành từng dòng riêng biệt.

**Ví dụ:**
```
LABEL com.example.some-label="lorem"
LABEL version="2.0" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
```

Để xem thông tin meta của một Docker Image, ta sử dụng dòng lệnh:
```
docker inspect <image id>
```

**Ví dụ:**
```

```
## MAINTAINER
Chỉ thị **MAINTAINER** dùng để khai báo thông tin tác giả người viết ra file Dockerfile.

**Cú pháp:**
```
MAINTAINER <name> [<email>]
```

**Ví dụ:**
```
MAINTAINER NamDH <namduong3699@gmail.com>
```
Hiện nay, theo tài liệu chính thức từ bên phía [Docker](https://docs.docker.com/engine/reference/builder/#maintainer-deprecated) thì việc khai báo **MAINTAINER** đang dần được thay thế bằng **LABEL maintainer** bới tính linh hoạt của nó khi ngoài thông tin về tên, email của tác giả thì ta có thể thêm nhiều thông tin tùy chọn khác qua các thẻ metadata và có thể lấy thông tin dễ dàng với câu lệnh `docker inspect ...`.

**Ví dụ:**
```
LABEL maintainer="namduong3699@gmail.com"
```

## RUN 
Chỉ thị **RUN** dùng để chạy một lệnh nào đó trong quá trình build image và thường là các câu lệnh Linux. Tùy vào image gốc được khai báo trong phần **FROM** thì sẽ có các câu lệnh tương ứng. Ví dụ, để chạy câu lệnh update đối với Ubuntu sẽ là `RUN apt-get update -y` còn đối với CentOS thì sẽ là `Run yum update -y`. Kết quả của câu lệnh sẽ được commit lại, kết quả commit đó sẽ được sử dụng trong bước tiếp theo của Dockerfile. 

**Cú pháp:**
```
RUN <command>
RUN ["executable", "param1", "param2"]
```

**Ví dụ:**
```
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
-------- hoặc --------
RUN ["/bin/bash", "-c", "echo hello"]
```

Ở cách thức `shell form` bạn có thể thực hiện nhiều câu lệnh cùng một lúc với dấu `\`:
```
FROM ubuntu
RUN apt-get update
RUN apt-get install curl -y
```

hoặc 

```
FROM ubuntu
RUN apt-get update; \
    apt-get install curl -y
```

## ADD
Chỉ thị **ADD** sẽ thực hiện sao chép các tập, thư mục từ máy đang build hoặc remote file URLs từ `src` và thêm chúng vào filesystem của image `dest`.

**Cú pháp:**
```
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

Trong đó:
- **src** có thể khai báo nhiều file, thư mục, ...
- **dest** phải là đường dẫn tuyệt đối hoặc có quan hệ chỉ thị đối với WORKDIR.

**Ví dụ:**
```
ADD hom* /mydir/
ADD hom?.txt /mydir/
ADD test.txt relativeDir/
```

Bạn cũng có thể phân quyền vào các file/thư mục mới được copy:
```
ADD --chown=55:mygroup files* /somedir/
ADD --chown=bin files* /somedir/
ADD --chown=1 files* /somedir/
ADD --chown=10:11 files* /somedir/
```

## COPY
Chỉ thị **COPY** cũng giống với **ADD** là copy file, thư mục từ `<src>` và thêm chúng vào `<dest>` của container. Khác với **ADD**, nó không hỗ trợ thêm các file remote file URLs từ các nguồn trên mạng.

**Cú pháp:**
```
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

## ENV
Chỉ thị **ENV** dùng để khai báo các biến môi trường. Các biến này được khai báo dưới dạng *key* - *value* bằng các chuỗi. Giá trị của các biến này sẽ có hiện hữu cho các chỉ thị tiếp theo của Dockerfile.

**Cú pháp:**
```
ENV <key>=<value> ...
```

**Ví dụ:**
```
ENV DOMAIN="viblo.asia"
ENV PORT=80
ENV USERNAME="namdh" PASSWORD="secret"
```

Ngoài ra cũng có thể thay đổi giá trị của biến môi trường bằng câu lệnh khởi động container:
```
docker run --env <key>=<value>
```

**ENV** chỉ được sử dụng trong các command sau:
- ADD
- COPY
- ENV
- EXPOSE
- FROM
- LABEL
- STOPSIGNAL
- USER
- VOLUME
- WORKDIR

## CMD 
Chỉ thị **CMD** định nghĩa các câu lệnh sẽ được chạy sau khi container được khởi động từ image đã build. Có thể khai báo được nhiều nhưng chỉ có duy nhất **CMD** cuối cùng được chạy.

**Cú pháp:**
```
CMD ["executable","param1","param2"]
CMD ["param1","param2"] 
CMD command param1 param2
```

**Ví dụ:**
```
FROM ubuntu
CMD echo Viblo
```


## USER
Có tác dụng set `username` hoặc `UID` để sử dụng khi chạy image và khi chạy các lệnh có trong `RUN`, `CMD`, `ENTRYPOINT` sau nó.

**Cú pháp:**
```
USER <user>[:<group>]
hoặc
USER <UID>[:<GID>]
```

**Ví dụ:**
```
FROM alpine:3.4
RUN useradd -ms /bin/bash namdh
USER namdh
```

# Tạo image với Dockerfile
Phần trên mình đã đi qua được cấu trúc cũng như các chỉ thị chính của một Dockerfile. Bây giờ chúng ta sẽ thực hành build một image bằng cách viết một Dockerfile đơn giản. Lưu ý rằng trước khi bắt đầu, hãy chắc chắn rằng máy của bạn đã được cài đặt sẵn **Docker**. Nếu chưa, bạn có thể tham khảo hướng dẫn cài đặt [ở đây](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04). 

## Tạo Dockerfile
### Ví dụ 1
Ở bước này, chúng ta sẽ tạo một đường dẫn mới cho Dockerfile.
```
mkdir myproject && cd myproject
```
Tiếp theo là tạo Dockerfile, lưu ý rằng tên của `Dockerfile` phải đúng là "Dockerfile" và không có phần đuôi mở rộng cho loại file này. Nếu không đặt tên đúng, khi build hệ thống sẽ báo lỗi là không tìm thấy file.
```
touch Dockerfile
```
Sau khi đã tạo xong Dockerfile, ta tiền hành nhập các chỉ thị:
```
FROM alpine
CMD ["echo", "Hello world!"]
```
Như bạn thấy, nội dung của Dockerfile ở trên chỉ chứa 2 chỉ thị **FROM** và **CMD**, CMD chứa câu lệnh `echo`  và sẽ in ra màn hình dòng chữ "Hello world!" khi mà container được khởi động từ image đã build từ Dockerfile này. Ta tiến hành tạo image với câu lệnh:
```
docker build -t <tên image> .
```
Cuối cùng, ta chạy lệnh `docker run <imageID>` để tạo và chạy container. Kết quả thu được sẽ là dòng chữ "Hello world!" được in ra trên màn hình.

### Ví dụ 2


# Tham khảo
https://cuongquach.com/tim-hieu-dockerfile-build-docker-image.html
https://docs.docker.com/engine/reference/builder/
https://lifesup.com.vn/blog/dockerfile/