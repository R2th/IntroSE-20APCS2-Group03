Docker là một open platform cung cấp cho người sử dụng những công cụ và service để người sử dụng có thể đóng gói và chạy chương trình của mình trên các môi trường khác nhau một cách nhanh nhất.

## Docker là gì và để làm gì?

Docker là một nền tảng để cung cấp cách để building, deploying và running ứng dụng một cách dễ dàng trên nền tảng ảo hóa. Có nhiều công nghệ Container khác như Solaris Zones, BSD jails, và LXC. Nhưng tại sao Docker lại phát triển, phổ biến nhanh chóng? Đây là những nguyên nhân: **Ease of use, Speed, DockerHub, Modularity and Scalability**.

Docker có nhiều lợi ích mà bạn nên sử dụng:

- Tốn ít dung lượng bộ nhớ, tài nguyên so với ảo hoá hệ điều hành
- Cài đặt dễ dàng, nhanh, chính xác so với cấu hình thủ công
- Chia sẻ được file cấu hình: **Dockerfile, docker-compose.yml**

Để cài đặt, bạn xem hướng dẫn tại đây: [Install Docker](https://www.docker.com/get-started) và thực hiện một số lệnh như sau để kiểm tra xem đã có trên máy chưa:

Kiểm tra version của docker:

```
docker version
```

Thông tin về docker:

```
docker info
```

Tạo thử một container:

```
docker run hello-world
```

## Các lệnh Linux đủ dùng cho Docker

Một số lệnh xem thông số hệ thống:

| Lệnh           | Ý nghĩa                                        |
| -------------- | :--------------------------------------------- |
| `uname`        | Hiển thị thông tin hệ thống                    |
| `lshw`         | Hiển thị thông tin phần cứng                   |
| `clear`        | Clear màn hình terminal                        |
| `htop`         | Thấy bộ nhớ sử dụng, bộ nhớ trống              |
| `ip addr show` | Kiểm tra địa chỉ ip của container              |
| `whoami`       | Kiểm trang xem đang là đối tượng người dùng gì |

File/ Folder

| Lệnh     | Ý nghĩa                                                |
| -------- | :----------------------------------------------------- |
| `pwd`    | Hiển thị thư mục hiện thời                             |
| `ls`     | Hiển thị các thư mục và file có trong thư mục hiện tại |
| `cat`    | Xem nội dung của file                                  |
| `mkdir`  | Tạo thư mục mới                                        |
| `rm`     | Remove                                                 |
| `touch`  | Tạo file                                               |
| `cp`     | Copy                                                   |
| `tree`   | Xem cấu trúc thư mục                                   |
| `mv`     | Move                                                   |
| `echo`   | Ghi vào file                                           |
| `locate` | Tìm file                                               |

## Thế nào là Docker image, Docker container.

Để dễ tưởng tượng, bạn hãy coi Image như là một class, chứa các phương thức và thuộc tính. Còn container như một object của class (instance).

Còn hiểu theo kiểu của Docker thì image là một package chứa tất tần tật những thứ cần thiết cho ứng dụng như thư viện, biến môi trường, mã nguồn, file cấu hình…Chỉ cần `run` image một cái là sẽ `build` ra container tương ứng phục vụ cho ứng dụng của bạn, mọi hoạt động trong container này sẽ không ảnh hưởng đến container khác, và sau khi sử dụng nếu không cần thiết có thể xóa bỏ. Những demo dưới đấy

Để pull một image từ registry:

```
docker pull alpine:latest
```

Tạo một container từ image

```
docker run -it -d --name demo-alpine --rm alpine:latest /bin/ash
```

Trong đó:

- `run` để tạo một container
- `-it` để gõ lệnh vào trình terminal
- `-d` báo rằng container này sẽ chạy ngầm
- `--name demo-alpine` tên định danh của container
- `--rm` container sẽ xoá khi kết thúc
- `alpine` tên của image
- `latest` tag của image
- `/bin/ash` trình giống tương tự bash shell

Phân biệt giữa container và image
![Container](https://raw.githubusercontent.com/thaycacac/thaycacac.github.io/master/img/post/docker.png)

Container như một stack, ở dưới cùng của stack chính là lõi (kernel), là bên trên nó là các image layer và các image layer read-only, tức là bạn không thể xử lý, chỉnh sửa ở các image layer này. Khi bạn tạo ra một container nghĩa là bạn sẽ tạo ra một image layer ở trên cùng được gọi là writable, tức là bạn có thể thao tác trên lớp này. Và các lớp này sẽ references với nhau theo thứ tự từ trên xuống dưới.

Thông thường thì các container sẽ được chạy ngầm và nếu bạn muốn truy cập vào terminal của nó thì, hoặc logs ra quá trình chạy để xem lỗi.

```
docker run -d --name web -p 80:80 nginx:alpine
```

Trong đó:

- `-p 80:80` là gắn cổng 80 của container sang cổng 80 của local

Muốn vào terminal của container vừa tạo:

```
docker exec -it web /bin/ash
```

Muốn logs ra quá trình chạy:

```
docker logs web
docker logs --tail
```

Kiểm tra sự thay đổi từ khi tạo ra container:

```docker
docker diff web
```

Kiểm tra kích thước của file:

```docker
docker ps --format '{{Name}} {{Size}}'
```

Tìm kiếm image:

```
docker images | grep alpine
```

Kiểm tra lịch sử của image:

```
docker history image_id
```

Kiểm tra thuộc tính của image:

```
docker image inspect image_id
```

Copy một file từ local sang container và ngược lại:

```
docker cp index.html web:/usr/share/nginx/html/
```

Ánh xạ thư mục host và container

```
docker run -d --name web -p 80:80 -v ${pwd}:/user/share/nginx/html nginx:alpine
```

## Đóng gói Docker image

Để đóng gói một container thành một image:

```docker
docker commit -a 'thaycacac' -m 'new image' al thaycacac/alpinenew:v1
```

## Docker file

Tỷ dụ nếu bạn muốn dùng script để tạo ra một dockerfile, từ dockerfile này sẽ tạo ra một docker images. Dockerfile rất là nhỏ và nên biết bash script để chạy thử trước khi viết dockerfile. Ví dụ viết một dockerfile

```docker
FROM apline:latest

LABEL maintainer="Thaycacac<thaycacac@gmail.com>"

RUN apk update\
&& apk add vim htop...

ENTRYPOINT ["fish"] //fish sẽ khởi động ngay khi container được tạo
```

Một số lệnh trong dockerfile

- `FROM` xây dựng container kế thừa từ Docker image khác, ví dụ:
  ```docker
  FROM scratch // là một image rỗng
  ADD rootfs.tar.xz // thêm file rootfs.tar.xz
  CMD ["/bin/sh"] // chạy lệnh này
  ```
- `LABEL`, `MAINTAINER` thông tin người bảo trì dockerfile
- `COPY` copy file từ host vào image
- `ADD` tải file từ internet, ví dụ:
  ```docker
  FROM alpine:latest
  ADD https://fishshell.com/file/2.7.0/fish-2.7.0.tar.gz/
  RUN tar -xzvf /fish-2.7.0.tar.gz
      && rm /fish-2.7.0.tar.gz
  ```
- `RUN`
  - Chỉ chạy khi docker build
  - CÓ thể tạo ra read only layer trong image
  - Dockerfile có thể chưa nhiều RUN
  - Để tối ưu nên gộp lại thành một lệnh
- `CMD`
  - Chạy khi docker run
  - Chỉ tác động đến writable layer của container
  - Dockerfile chỉ có một lệnh CMD
  - 1 CMD có thể gộp nhiều lệnh nhỏ
  - CMD có thể bị thay thế (overwrite) khi chạy docker run
- `ENTRYPOINT`
  - Chạy khi docker run
  - Không thể overwrite bằng lệnh mới, mà chỉ customize, thêm tham số

## Docker compost

Là file .yml (thường là docker-compose.yml) chứa cấu hình của container, hiểu theo kiểu căn chung cư của mình thì nó như bản vẽ thiết kế , gồm chi tiết các vật dụng cần thiết, sơ đồ đường điện, nước. giúp cho căn nhà hoạt động đúng với chức năng và mong muốn của người dùng.