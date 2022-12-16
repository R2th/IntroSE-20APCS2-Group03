Xin chào tất cả mọi người, vậy là chúng ta đã có thể gặp lại nhau sau phần trước của Docker for Beginner. Phần trước của Docker for Beginner chúng ta đã bàn luận về Docker là gì, Docker mang lại lợi ích gì cho dân dev hay cả như dân system administrator, cùng với đó, ta cũng đã tìm hiểu về một số tính năng cơ bản của Docker như Docker Image và Docker Container và cách để có thể chạy một ứng dụng Rails trong Docker.

<br>
Cho những bạn nào chưa đọc phần một của Docker for Beginner, hãy nhấn vào [link này](https://viblo.asia/p/docker-for-beginner-ByEZkp3ElQ0) nhé 

# Docker Volumes
Docker cho phép bạn `COPY` dữ liệu vào trong image khi bạn build image đó, nhưng trong trường hợp bạn cần một dữ liệu động (có thể thay đổi sau khi build) thì sao? Hay khi bạn muốn dữ liệu trong container của bạn không bị mất khi bạn xóa container đó đi hoặc tắt nó.

<br>
Đó là lý do vì sao Docker tạo ra Docker Volume! Nó cho phép bạn mount dữ liệu từ host vào trong container một cách dễ dàng. 

Các đơn giản nhất để sử dụng volume trong Docker đó là dùng cờ `-v` khi chạy một image. Ví dụ:
```
docker run -it --rm --name my-postgres -v /data/postgres:/var/lib/postgresql/data postgres
```
Trong câu lệnh trên, ta đã mount thư mục `/data/postgres` vào trong thư mục `/var/lib/postgresql/data` bên trong của container. Vậy nên mỗi khi bạn khởi động container `my-postgres`, các dữ liệu bên trong của database sẽ vẫn còn nguyên vẹn. Và bạn có thể xem các dữ liệu đó trong thư mục `/data/postgres` trên máy tính của mình.

<br>
Docker cũng cung cấp một CLI để quản lý volume này tại `docker volume` (bạn có thể chạy `docker volume -h` để xem help của CLI này)

Công cụ này dùng để quản lý các mount point trên host (tức là máy tính của bạn). Ví dụ:
```
docker volume create test-volume
docker volume inspect test-volume
```
Với câu lệnh đầu tiên, ta đã tạo một volume cho Docker, Docker sẽ lưu volume này đến khi bạn khai báo xóa nó

Với câu lệnh thứ hai, ta sử dụng lệnh `inspect` để xem thông tin của `test-volume`, output của lệnh này thường sẽ là như sau:
```
[
    {
        "CreatedAt": "2018-10-31T18:00:00+07:00",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",
        "Name": "my-vol",
        "Options": {},
        "Scope": "local"
    }
]
```
Mountpoint mặc định của Docker nằm ở thư mục `/var/lib/docker/volumes/{volume name}/_data`.

Ngoài ra còn một số thông tin khác trong lệnh inspect này mà chúng ta không đề cập tại đây.
# Docker Networks
Một trong số những lý do làm Docker trở nên mạnh mẽ chính là khả năng mà các container có thế liên kết với nhau hoặc có thể liên kết với các ứng dụng không sử dụng docker. 

Trong mục này ta sẽ nói về cách mà các container có thể liên kết với nhau hoặc các ứng dụng khác nằm ngoài docker.

## Các drive mạng trong Docker
- `bridge`: Là driver mặc đinh được dùng trong Docker, nếu bạn không chỉ định một container chạy trên drive mạng nào thì driver này sẽ được sử dụng. Driver này cho phép container có thể nói chuyện với mạng hoặc máy tính host bằng cách sử dụng host làm cầu nối đến container.
- `host`: Được sử dụng cho một container tách biệt, driver này cho phép container kết nối trực tiếp với hệ thống mạng mà host đang sử dụng. Điều này có nghĩa là nó không dùng host để làm cầu nối nữa mà sẽ là một node mạng ngang hàng với máy host.
- `overlay`: Driver mạng `overlay` cho phép kết nối nhiều dịch vụ Docker với nhau và cho phép Docker Swarm liên lạc với nhau. Bạn cũng có thể sử dụng driver này để thiết lập liên kết giữa Swarm và một container tách biệt.
- `macvlan`: Driver `macvlan` cho phép bạn gán địa của MAC cho một container, làm cho nó trở thành một thiết bị vật lý trong hệ thống mạng. Dịch vụ Docker sẽ điều hướng gói tin đến container bằng địa chỉ MAC của chính. Driver này thích hợp để làm việc với những ứng dụng cũ yêu cài kết nối trực tiếp đến máy thật thay vì điều hướng thông qua Docker trên máy host.
- `none`: Cái tên nói lên tất cả, driver này chỉ định rằng container sẽ không có kết nối mạng. Thường được sử dụng chung với một driver mạng tùy chỉnh.

## Cách các container nói chuyện với nhau
Cũng gần tương tự với một switch, Docker cho phép các container chạy trên cùng một mạng nói chuyện với nhau. Và tất nhiên, nó cũng cho phép các container nói chuyện trực tiếp với máy host.

Docker networks có thể được quản lý bởi CLI `docker network`. Khi khởi động Docker, nó sẽ tạo ra 3 driver mặc định là `bridge`, `host`  và `none`.

Bạn cũng có thể tạo thêm driver bằng lệnh `docker network create test-network`. Như vậy ta đã có một network mới có tên `test-network` sử dụng driver là `bridge` (mặc định).

```
$ docker network inspect test-network
[
    {
        "Name": "test-network",
        "Id": "60eef62b6048d9db84f43a24a0dfdcaddc65d71aca0f0f9ff8029312087f0f1c",
        "Created": "2018-10-31T18:00:00.0000000+07:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
```
# Docker Compose
Docker Compose là một công cụ cho phép ta cấu hình và chạy một ứng dụng sử dụng nhiều container, điển hình như một ứng dụng chạy Rails và một database Postgres.

Với Docker Compose, ta sử dụng file định dạng YAML để cấu hình các dịch vụ mà bạn muốn Docker khởi tạo.

Việc sử dụng Docker Compose khá đơn giản, chỉ bằng 3 bước sau:
- Định nghĩa môi trường của ứng dụng bằng `Dockerfile` để có thể build image mà bạn cần sử dụng
- Định nghĩa các dịch vụ cần thiết trong `docker-compose.yml` để các dịch vụ này có thể khởi động trong một môi trường biệt lập và có thể liên kết với nhau.
- Chạy lệnh `docker-compose up` để Docker Compose khởi động và chạy các dịch vụ mà bạn đã định nghĩa trong `docker-compose.yml`

Một `docker-compose.yml` có dạng như sau:
```
version: '3'
services:
  rails_application:
    build: .
    image: rails_application
    ports:
      - "3000:3000"
    links:
      - redis
      - postgres
  redis:
    image: redis
  postgres:
    image: postgres
```

Trong ví dụ trên, ta đã khai báo 3 ứng dụng chạy trong Docker đó là `rails_application`, `redis` và `postgres`.
Khi đó, ta có thể chạy lệnh `docker-compose up`, Docker sẽ thực hiện các bước sau:

- B1: Tạo một network có tên trùng với tên của ứng dụng (thường là tên của thư mục với postfix là `_default`)
- B2: Tìm kiếm các ứng dụng được liệt kê dưới mục `services`
- B3: Nếu không tìm thấy image được liệt kê đó trên máy local, nó sẽ tìm trên register của docker (mặc định là https://hub.docker.com)
- B4: Nếu servier có lệnh `build`, Docker Compose của service theo như định nghĩa tại mục `build` của service
- B5: Nếu vẫn không tìm thấy image thì Docker thông báo lỗi và ngừng khởi động các service tiếp theo
- B6: Sau đó, Docker sẽ tiến hành chạy image đó và tạo thành một container.
- B7: Lặp lại bước 2 đối với các service tiếp theo

<br>
Bạn cũng có thể sử dụng Docker Volume và Docker Network được nói bên trên để áp dụng cho Docker Compose:

```
version: '3'
services:
  rails_application:
    build: .
    image: rails_application
    ports:
      - "3000:3000"
    networks:
      - redis
      - database
    
  redis:
    image: redis
    volumes:
      - /data/redis:/data
    networks:
      - redis
      
  postgres:
    image: postgres
    volumes:
      - /data/postgres:/var/lib/postgresql/data
    networks:
      - database
      
networks:
  redis:
    name: redis-network
    driver: bridge
  database
    name: database-network
    driver: host
```

Và đến đây là bạn có thể tự mình viết ra một `Dockerfile` và `docker-compose.yml` đơn giản cho dự án của mình cùng với vô vàn lợi ích mà Docker đem lại khi phát triên dự án.

<br>
Happy Coding!