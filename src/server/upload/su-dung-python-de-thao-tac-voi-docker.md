## Docker là gì?
Docker là nền tảng cung cấp cho các công cụ, service để các lập trình viên và người quản trị hệ thống có thể phát triển, thực thi, chạy các ứng dụng với containers. Việc sử dụng các Linux containers để triển khai ứng dụng được gọi là containerization. Việc sử dụng container giúp dễ dàng hơn trong việc triển khai ứng dụng.

Để hiểu hơn về `Docker`, bạn có thể tham khảo [Series Tìm hiểu về Docker.](https://viblo.asia/s/tim-hieu-ve-docker-vElaBka45kw) Trong bài này, mình sẽ chia sẻ về cách sử dụng Python đẻ tương tác với `Docker`.

## Công cụ sử dụng

Các công cụ mình sử dụng trong bài chia sẻ này gồm:

- Docker version 18.06.1-ce, build e68fc7a

```
Client:
 Version:           18.06.1-ce
 API version:       1.38
 Go version:        go1.10.3
 Git commit:        e68fc7a
 Built:             Tue Aug 21 17:24:56 2018
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.06.1-ce
  API version:      1.38 (minimum version 1.12)
  Go version:       go1.10.3
  Git commit:       e68fc7a
  Built:            Tue Aug 21 17:23:21 2018
  OS/Arch:          linux/amd64
  Experimental:     false

```
- Python 3.5
- [Docker SDK for Python lastest stable version](https://github.com/docker/docker-py): Là thư viện Python cho Docker Engine API. Nó sẽ giúp bạn dùng được mọi thứ mà `docker` command có thể, từ bên trong ứng dụng Python, từ việc chạy `containers`, quản lý `containers`, quản lý `Swarm`, v..v

Các công cụ đề u có documentation dễ hiểu, giúp bạn dễ dàng cài đặt và sử dụng.

## Sử dụng Python tương tác với Docker.
### Tạo đối tượng client

Để tương tác với `Docker daemon`, bạn cần khởi tạo 1 instance cho client. `Docker SDK` hỗ trợ thông qua việc bạn gọi hàm `from_env()`. Nó sẽ trả về cho bạn 1 `DockerClient` được cấu hình giống với client mà bạn chạy khi dùng `Docker command`.

``` python
import docker
client = docker.from_env()
```

Ngoài ra bạn có thể tự cấu hình đường dẫn URL đến Docker server, ví dụ như:
```
import docker
client = docker.DockerClient(base_url='unix://var/run/docker.sock')
```
- param base_url: sẽ chỉnh dụng URL ddeessn Docker server, bạn có thể sử dụng `socket` hoặc `tcp://127.0.0.1:1234`

Khi đã có client, lúc này ứng dụng đã sẵn sàng để tương tác với Docker rồi.

### Quản lý Docker containers

#### 1. Chạy container
Để chạy container bạn cần sử dụng method `run` có sẵn ở bên trong `client.containers`. Mặc định khi gọi tới method `run(image, command=None, **kwargs)`, nó sẽ đợi cho tới khi container hoàn tất việc chạy và trả về logs, tương tự như command `docker run`.

Khi bạn định nghĩa thêm tham số `detach=True` cho method `run()`, thì client sẽ chạy container và ngay lập tức trả về cho bạn 1 `Container` object, hiểu đơn giản là client sẽ chạy container ngầm, tương tự `docker run -d`.

Ví dụ:
- Chạy container:

```
import docker
client = docker.DockerClient(base_url='unix://var/run/docker.sock')
client.containers.run('alpine', 'echo hello world')

# b'hello world\n'
```

- Chạy container ngầm, nhận lại 1 Container object:

``` python
import docker
client = docker.DockerClient(base_url='unix://var/run/docker.sock')
container = client.containers.run(
                'mysql:5.7',
                detach=True,
                command=['checkpoint.sh'],
                volumes= 
                    {
                        '/home/dao.thai.son/workspace': {'bind': '/home/dao.thai.son/workspace', 'mode': 'rw'}
                    },
                stdin_open=True,
                tty=True,
                network='Docker-network',
            )
```

Ở ví dụ trên , trong method `run()` mình có sử dụng thêm vài tham số với mục đích là connect container nữa tạo vào 1 `Docker Network` có tên là *Docker-network*, mount 1 thư mục từ bên ngoài máy host vào trong container này và cho quyền đọc ghi ở trên đó. Ngoài ra, `Docker SDK của Python` cũng support đầy đủ các option khác, tương tự như khi bạn sử dụng Docker command, bạn có thể tham khảo ở [đây](https://docker-py.readthedocs.io/en/stable/containers.html).

#### 2. Hiển thị danh sách container.

Giống với lệch `docker ps`, để list danh sách các containers, Docker SDK cung cấp hàm `list()` với các tham số:

- **all** hiển thị tất cả container.
- **limit**: giới hạn số container được trả về.
- **since**: hiển thị các container được tạo kể từ ID hoặc name đến nay, bao gồm cả các container không hoạt động.

``` python
import docker
client = docker.DockerClient(base_url='unix://var/run/docker.sock')
client.containers.list()
# Chỉ hiển thị những containers đang hoạt động.
# [<Container: 59393789eb>, <Container: f68c2e1a4d>]

client.containers.list(all=True)
# Toàn bộ các containers bao gốm cả container không hoạt động.
#[<Container: 59393789eb>, <Container: f68c2e1a4d>, <Container: ada4090789>, <Container: 8d6ec0d901>, <Container: 0b517ebfcd>, <Container: 34d342691e>] 
```

#### 3. Tương tác với container.
Với `Docker Container object` được trả về khi chạy container, ta có thể dễ dàng tương tác với container đó.

``` python
import docker
client = docker.DockerClient(base_url='unix://var/run/docker.sock')
container = client.containers.run(
                'mysql:5.7',
                detach=True,
                command=['checkpoint.sh'],
                volumes= 
                    {
                        '/home/dao.thai.son/workspace': {'bind': '/home/dao.thai.son/workspace', 'mode': 'rw'}
                    },
                stdin_open=True,
                tty=True,
                network='Docker-network',
            )
print(container.status)
# running

container.kill(9) # Kill container đang chạy đó bằng việc gửi đến nó 1 signal SIGKILL.

container.restart() # Khởi động lại container.
```

Bạn cũng có thể  chạy command bên trong container, tương tự như lệnh `docker exec`.

``` python
import docker
client = docker.DockerClient(base_url='unix://var/run/docker.sock')
container = client.containers.run(
                'Ubuntu:16.04',
                detach=True,
                command=['/bin/bash'],
                volumes= 
                    {
                        '/home/dao.thai.son/workspace': {'bind': '/home/dao.thai.son/workspace', 'mode': 'rw'}
                    },
                stdin_open=True,
                tty=True,
                network='Docker-network',
            )
output = container.exec_run('ls -la', workdir='/home/dao.thai.son/workspace', tty=True, stream=True)
for line in output[1]:
    print(line.decode('utf-8'), end="\n")
    
# total 56436
# drwxr-xr-x 42 dao.thai.son domain^users     4096 Th11 13 10:48 .
# drwxr-xr-x 55 dao.thai.son domain^users     4096 Th11 15 07:43 ..
# drwxr-xr-x  3 dao.thai.son domain^users     4096 Th06 21 14:31 build
# drwxr-xr-x  4 dao.thai.son domain^users     4096 Th05 23 07:24 c

```

Mặc định `exec_run()` sẽ trả về 1 tuple gồm `exit_code` kiểu int và `output` kiểu str.
Mình sẽ giải thích 1 chút về các params trong `exec_run()` mà mình sử dụng:

- 'ls -la': chính là command mà bạn muốn chạy bên trong container
- workdir: Chỉ định work directory mà command sẽ thực hiện tại đó
- tty: hỗ trợ TTY
- stream=True: Trả về log dạng stream.

Ngoài ra còn có thể dùng các params:

- stdout, stderr, stdin: attach với stdout, stderr, stdin
- socket: Trả về 1 connection socket cho phép tùy biến quá trình đọc ghi.
- environment: 1 dict hoặc list str là các biến môi trường cần sử dụng.

### Quản lý images

Chúng ta có thể quản lý images trên server thông qua các methods trong `client.images`:
- Build image từ Dockerfile bằng method `build()`, `path` đến thư mục chứa Dockerfile bắt buộc phải có, hoặc `fileobj` là đối tượng file sử dụng như Dockerfile, `tag` để chỉ định tag cho image được tạo ra.

```
image = client.images.build('path_to_dir_contain_Dockerfile', tag='0.1')
```
- Pull image từ Docker Hub, qua method `pull(repository, tag=None)`, nếu bạn không chỉ định tag cho image này, toàn bộ image sẽ được được pull về. Nếu repository không public, bạn có thể đăng nhập thông qua config chỉ định trong param `auth_config`.

``` python
# Pull image có tag `latest` trên busybox repo
image = client.images.pull('busybox:latest')
# Pull tất cả các tags trên busybox repo
images = client.images.pull('busybox')
```

- Tương tự việc pull, ta cũng có thể push image lên repository ví dụ như Docker Hub bằng việc sử dụng method `push(repository, tag=None, **kwargs)`, nếu `stream=True` thì logs sẽ trả về  từng blocking generator

``` python
for line in cli.push('yourname/app', tag='0.1', stream=True):
    print line
# {"status":"Pushing repository yourname/app (1 tags)"}
# {"status":"Pushing","progressDetail":{},"id":"511136ea3c5a"}
# {"status":"Image already pushed, skipping","progressDetail":{}, "id":"511136ea3c5a"}
```

- Để xem các images hiện có trong server:

``` python
client.images.list()
# [<Image: 'mysql:5.7'>, <Image: 'fteam/laravel-workspace:latest'>, <Image: 'dangminhtruong/dockerlaravel:latest'>, <Image: 'redis:latest'>, <Image: 'f/laravel-php-fpm:latest'>, <Image: 'drone/drone:0.4.2'>]

```

### Theo dõi các sự kiện ở Docker

Để theo dõi các sự kiện xảy ra trên Docker server theo thời gian thực, tương tự khi bạn sử dụng command `docker events`, bạn có thể gọi tới `client.event()` để lấy các sự kiện:

``` python
import docker
import threading

def listen_event(client):
    events = client.events()
    for event in events:
        my_event = json.loads(event.decode('utf-8'))
        _action = my_event['Action']
        _type = my_event['Type']
        _actor = my_event['Actor']

        print("Type:" + _type + " Status:" + _status + " ID:" + _actor['ID'])
            
client = docker.DockerClient(base_url='unix://var/run/docker.sock')

thread = threading.Thread(target=listen_event, args=(client,))
thread.daemon = True
thread.start()

```

## Tạm kết
Sau bài chia sẻ này, hy vọng các bạn đã nắm cơ bản được cách sử dụng `Docker SDK của python` để tương tác với Docker. Mình sẽ làm tiếp các bài chia sẻ về cách tương tác với Docker Network, Docker Swarm trong thời gian tới, hy vọng các bạn tiếp tục đón nhận.