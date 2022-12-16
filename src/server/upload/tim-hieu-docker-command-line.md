Như hứa hẹn ở [bài trước](https://viblo.asia/p/Do754e1JKM6), trong bài viết này, mình sẽ chia sẻ tiếp về Docker Command Line nha :)

Hiện tại. việc sử dụng docker đã dần trở nên quen thuộc và cho thấy được hiệu quả của nó so với việc cài đặt môi trường theo cách cổ điển. Vì vậy, việc thông thạo docker cũng dần trở nên cần thiết, tựa như việc bạn cần phải thông thạo Git command vậy. Thế thì tại sao chúng ta lại không tìm hiểu về Docker Command Line nhỉ ?

### docker images
- Sử dụng để hiển thị danh sách images
```
$ docker images [OPTIONS] [REPOSITORY[:TAG]]
```
```
$ docker images 
REPOSITORY                            TAG                 IMAGE ID            CREATED             SIZE
haihachan/2020-09-test                latest              721106855c17        7 days ago          1.23MB
latest                                latest              721106855c17        7 days ago          1.23MB
```
Một số options:
- ` --all , -a`: Hiển thị tất cả images, kể cả images ẩn
- `--digests`: Hiển thị thông tin Digest của images
- `--filter , -f`: Lọc images theo điều kiện
    ```
    $ docker images --filter=reference='busy*:*libc'

    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    busybox             uclibc              e02e811dd08f        5 weeks ago         1.09 MB
    busybox             glibc               21c16b6787c6        5 weeks ago         4.19 MB
    ```
- `--format`: Hiển thị danh sách images theo format chỉ định
    ```
    $ docker images --format "{{.ID}}: {{.Repository}}"

    77af4d6b9913: <none>
    b6fa739cedf5: committ
    ```
- `--quiet , -q`: Chỉ hiển thị danh sách ID

### docker search
Dùng để tìm kiếm images
```
$ docker search [OPTIONS] TERM
```

Một số options:
* `--filter , -f`: Lọc images theo điều kiện
* `--automated`: Only show automated builds
    ```
    $ docker search --filter is-automated=true progrium/busybox

    NAME                 DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
    progrium/busybox                                                     50                   [OK]

    $ docker search --automated progrium/busybox

    NAME                 DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
    progrium/busybox                                                     50                   [OK]
    ```
* `--format`: Định dạng output, tương tự lệnh `docker images`
    ```
    $ docker search --format "{{.Name}}: {{.StarCount}}" nginx

    nginx: 5441
    jwilder/nginx-proxy: 953
    richarvey/nginx-php-fpm: 353
    ```
* `--limit`: Giới hạn kết quả output
* `--no-trunc`: Không xóa output
* `--stars , -s`:  Chỉ hiển thị nếu images đủ start
    ```
    $ docker search --filter is-official=true --filter stars=3 busybox

    NAME                 DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
    progrium/busybox                                                     50                   [OK]
    radial/busyboxplus   Full-chain, Internet enabled, busybox made...   8                    [OK]
    ```

### docker pull
Để pull một images, chúng ta sẽ sử dụng lệnh
```
$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```
Một số options:
* `--all-tags , -a`: Download tất cả các tagged images trên repository
* ` --disable-content-trust`: Mặc định là `true`, Bỏ qua việc xác thực image
* `--platform`: Set platform nếu server là một multi-platform

### docker push
Push image lên Docker Hub, bạn chỉ có thể push sau khi đã commit và tạo tag (có vẻ giống git ha :))
```
$ docker push [OPTIONS] NAME[:TAG|@DIGEST]
```
Một số options:
* ` --disable-content-trust`: Mặc định là `true`, Bỏ qua việc xác thực image

### docker build

Lệnh này dùng để build docker file image

```
$ docker build [OPTIONS] PATH | URL | - < <docker_file_path>
```

- PATH: đường dẫn tới thư mục chứa docker file của image
    ```
    $ docker build ~/home/my-docker-image/
    ```
- URL: link đường dẫn tới nguồn chứa source code của image, ví dụ như link github/gitlab,...
    ```
    $ docker build https://github.com/docker/rootfs.git#container:docker
    ```
- Bạn cũng có thể dùng cú pháp `- <` cùng đường dẫn tới file docker image để thực thi lệnh này
    ```
     $ docker build - < ~/home/my-docker-image/Dockerfile
    ```
- Một số options:
    * `--file | -f` : Chỉ định file mà bạn muốn build
    ```
    $ docker build -f Dockerfile.debug
    ```
    * `--tag | -t`: Chỉ định tag mà bạn muốn build. Bạn cũng có thể build đồng thời nhiều images
    ```
    $ docker build -t whenry/fedora-jboss:latest -t whenry/fedora-jboss:v2.1
    ```
    * `--output | -o`: Chỉ định ghi lại đầu ra khi build images
    Ví dụ mình sẽ chỉ định bản build lưu ra file zip `out.tar`.
    ```
    $ docker build -o - . > out.tar
    ```

### docker run
Lệnh run image thành container.
```
$ docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```
Một số tùy chọn:
* `--name` Đặt tên cho container
    ```
    $ docker run --name test -it debian
    $ docker ps -a | grep test
    d6c0fe130dba        debian:7            "/bin/bash"         26 seconds ago      Exited (13) 17 seconds ago 
    ```
* `-w`: Chỉ  định thư mục được thực thi lệnh. Mặc định là bên trong container
    ```
    $ docker  run -w /path/to/dir/ -i -t  ubuntu pwd
    ```
* `-a`: Cho phép lệnh liên kết với STDIN, STDOUT hoặc STDERR của vùng chứa, giúp bạn có thể thao tác với output và input khi cần thiết.
* `--restart`: Chính sách restart lại container. Có 4 chính sách là: `no`, `on-failure[:max-retries]`,`unless-stopped` và `always`
    ```
    $ docker run --restart=always redis
    ```
* `--network`: Kết nối container với internet
    ```
    $ docker run -itd --network=my-net busybox
    ```
### docker rename
Đơn giản là bạn muốn đổi tên container thôi
```
$ docker rename CONTAINER NEW_NAME
```

 ### docker kill
 Lệnh ngừng một hoặc nhiều container đang chạy.
 ```
 $ docker kill [OPTIONS] CONTAINER [CONTAINER...]
 ```

### docker stop
Để dừng một hoặc nhiều container đang chạy
```
$ docker stop [OPTIONS] CONTAINER [CONTAINER...]
```
Option: `--time , -t`: Mặc định là 10s, sau thời gian này, nếu không thể stop thì container sẽ bị kill.
### docker start
Lệnh start lại 1 hoặc nhiều contaner đã dừng
```
$ docker start [OPTIONS] CONTAINER [CONTAINER...]
```
### docker restart
Lệnh restart lại một hoặc nhiều container đã stop
```
$ docker restart [OPTIONS] CONTAINER [CONTAINER...]
```
Option: `--time , -t`: Mặc định là 10s, sau thời gian này, nếu không thể restart thì container sẽ bị stop.

### docker diff
Lệnh để kiểm tra các thay đổi đối với tệp hoặc thư mục trên hệ thống tệp của container
```
$ docker diff CONTAINER
```
```
$ docker diff 1fdfd1f54c1b

C /dev
C /dev/console
C /dev/core
C /dev/stdout
C /run
A /run/nginx.pid
C /var/lib/nginx/tmp
A /var/lib/nginx/tmp/client_body
```

### docker history
```
$ docker history [OPTIONS] IMAGE
```
Một số options:
* `--format`:  Định nghĩa định dạng output
    ```
    $ docker history --format "{{.ID}}: {{.CreatedSince}}" busybox

    f6e427c148a7: 4 weeks ago
    <missing>: 4 weeks ago
    ```
* `--human , -H`: Mặc định là `true`, in ra thông số có thể đọc hiểu bằng ngôn ngữ tự nhiên
* `--quiet , -q`: Chỉ hiển thị danh sách IDs

### docker rm
Lệnh xóa 1 hoặc nhiều contaniers
```
$ docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

### docker rmi
Lệnh xóa 1 hoặc nhiều images
```
$ docker rmi [OPTIONS] IMAGE [IMAGES...]
```