![](https://images.viblo.asia/c30525d2-25ee-41f5-bfc5-54f553bdc375.jpeg)

## Kiến trúc hệ thống của chúng ta sẽ như sau

Ý tưởng ở đây là chúng ta sẽ tạo 1 cluster RabbitMQ với 3 node, có 1 reverse proxy đóng vai trò là load balancing đứng giữa làm nhiệm vụ hứng tất cả request gọi vào RabbitMQ cluster của chúng ta.
![](https://images.viblo.asia/f2720e5c-cb23-4d23-9451-57a129823f9e.png)
## RabbitMQ và Docker

Chúng ta sẽ sử dụng docker image RabbitMQ được build sẵn từ Docker Hub. Sử dụng thêm plugin `management-3` để dễ dàng theo dõi và cấu hình RabbitMQ từ giao diện web

Để chạy nhiều container cùng lúc. Chúng ta sử dụng Docker Composer. Nó sẽ giúp chúng ta tổ chức application đơn giản hơn chỉ trong 1 file `docker-composer.yml` duy nhất

Để sử dụng Docker composer, chúng ta định nghĩa 2 thứ

1. Định nghĩa các lệnh chạy để build HAProxy container trong ``Dockerfile``.
2. Định nghĩa những dịch vụ trong ``docker-composer.yml``.

## HAProxy
Giống như Nginx, Kong API gateway. HAproxy là 1 load balancing, reverse proxy rất mạnh mẽ. HAproxy hỗ trợ cả HTTP và TCP protocol. Chúng ta sẽ sử dụng HAproxy làm load balancing cho cluster RabbitMQ

Đầu tiên định nghĩa HAproxy config `haproxy.cfg`

Tạo 1 file tên `haproxy.cfg` copy nội dung bên dưới vào file vừa tạo
```
global
  log     127.0.0.1 alert
  log     127.0.0.1 alert debug
  maxconn 3000

defaults
  log     global
  option  dontlognull
  option  persist
  option  redispatch
  retries 3
  timeout connect 5000
  timeout client  50000
  timeout server  50000

listen haproxy-stats
    bind  *:1936
    mode  http
    stats enable
    stats hide-version
    stats refresh 5s
    stats uri     /haproxy?stats
    stats realm   Haproxy\ Statistics
    stats auth    haproxy:haproxy

listen rabbitmq
    bind    *:5672
    mode    tcp
    option  tcplog
    balance roundrobin
    server  rabbitmq-node-1 rabbitmq-node-1:5672 check inter 5000 rise 3 fall 5
    server  rabbitmq-node-2 rabbitmq-node-2:5672 check inter 5000 rise 3 fall 5
    server  rabbitmq-node-3 rabbitmq-node-3:5672 check inter 5000 rise 3 fall 5
```

Bạn chỉ cần copy nội dung trên vào file `haproxy.cfg` của bạn thôi. Tôi sẽ giải thích thắc mắt ở comment nhé!

Bạn có thể tìm hiểu thêm thông tin về HAproxy tại [đây](https://cbonte.github.io/haproxy-dconv/1.9/configuration.html)

## HAProxy Dockerfile

Tạo HAproxy Dockerfile để build image HAProxy
Tạo file name tên `Dockerfile` và copy nội dung bên dưới vào file
```docker
#HA version 1.9, bạn có thể chọn 1.8, 1.7
FROM haproxy:1.9
#Lệnh copy file haproxy.cfg vào docker image
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
```

File Dockerfile này sẽ:

  1. pull HAproxy docker image 1.9 từ Docker Hub
  2. copy file `haconfig.cfg` của bạn vào image
  4. chạy HAProxy với file config của bạn

Tiếp theo chúng ta cần build docker image:

```bash
$ docker build -t haproxy-server .
```
Bạn có thể kiểm tra bằng lệnh `$ docker images`:
```bash
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
haproxy-server                       latest              840661db1326        21 seconds ago      72.2MB
haproxy                              1.9                 9704a56e28db        37 hours ago        72.2MB
rabbitmq                             3-management        ac759a4f2d38        12 days ago         226MB
```

## Đóng gói tất cả vào Docker Compose
Tạo file name tên `docker-compose.yml`, sau đó copy nội dung bên dưới vào.
```yaml
version: '2'

services:
 rabbitmq-node-1:
  image: rabbitmq:3-management
  container_name: rabbitmq-node-1
  hostname: rabbitmq-node-1
  ports:
   - "15672:15672"
  networks:
   - cluster-network
  volumes:
   - $PWD/storage/rabbitmq-node-1:/var/lib/rabbitmq
  environment:
   - RABBITMQ_ERLANG_COOKIE=cluster_cookie
   - RABBITMQ_DEFAULT_USER=admin
   - RABBITMQ_DEFAULT_PASS=admin 

 rabbitmq-node-2:
  image: rabbitmq:3-management
  container_name: rabbitmq-node-2
  hostname: rabbitmq-node-2
  ports:
   - "15673:15672"
  networks:
   - cluster-network
  volumes:
   - $PWD/storage/rabbitmq-node-2:/var/lib/rabbitmq
  environment:
   - RABBITMQ_ERLANG_COOKIE=cluster_cookie
   - RABBITMQ_DEFAULT_USER=admin
   - RABBITMQ_DEFAULT_PASS=admin

 rabbitmq-node-3:
  image: rabbitmq:3-management
  container_name: rabbitmq-node-3
  hostname: rabbitmq-node-3
  ports:
   - "15674:15672"
  networks:
   - cluster-network
  volumes:
   - $PWD/storage/rabbitmq-node-3:/var/lib/rabbitmq
  environment:
   - RABBITMQ_ERLANG_COOKIE=cluster_cookie
   - RABBITMQ_DEFAULT_USER=admin
   - RABBITMQ_DEFAULT_PASS=admin

 haproxy:
  image: haproxy-server:latest
  container_name: haproxy
  hostname: haproxy
  ports:
    - "5672:5672"
    - "1936:1936"
  networks:
   - cluster-network

networks:
 cluster-network:
  driver: bridge
  ```

File Docker compose của chúng ta có `4 services` và `1 cluster network`:

**rabbitmq-node-1:** 
tạo 1 container dựa trên image RabbitMQ, định nghĩa hostname, exposes các port, network, mout storage ra ngoài và thêm 1 vài environment cho RabbitMQ

TIPS - thư mục `storage` chứa dữ liệu RabbitMQ của node 1 tương tự cho node 2, node 3 được expose từ containers
```
$PWD/storage/rabbitmq-node-1
```
Username/password đăng nhập web admin RabbitMQ là `admin/admin`

**rabbitmq-node-2:** giống node 1

**rabbitmq-node-3:** giống node 1

**haproxy:** 
container dựa trên HAProxy image, exposes port 5672 ra ngoài, mode TCP để các app client giao tiếp với RabbitMQ cluster thông qua HAproxy. Haproxy web admin chạy ở port `"1936"` với thông tin đăng nhập là `haproxy/haproxy`

**cluster-network:**  private internal network tên là "cluster-network" để các container giao tiếp với nhau

Bây giờ chúng ta chạy docker compose với lệnh:

```docker
$ docker-compose -f docker-compose.yml up
```

Bạn có thể kiểm tra bằng lệnh `$ docker ps`:
```
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                                                                     NAMES
42af69cf5d20        rabbitmq:3-management   "docker-entrypoint.s…"   40 seconds ago      Up 38 seconds       4369/tcp, 5671-5672/tcp, 15671/tcp, 25672/tcp, 0.0.0.0:15674->15672/tcp   rabbitmq-node-3
9206d2a533c6        rabbitmq:3-management   "docker-entrypoint.s…"   40 seconds ago      Up 38 seconds       4369/tcp, 5671-5672/tcp, 15671/tcp, 25672/tcp, 0.0.0.0:15672->15672/tcp   rabbitmq-node-1
bbae2f4cf559        rabbitmq:3-management   "docker-entrypoint.s…"   40 seconds ago      Up 38 seconds       4369/tcp, 5671-5672/tcp, 15671/tcp, 25672/tcp, 0.0.0.0:15673->15672/tcp   rabbitmq-node-2
b8d9b4f4dfe3        haproxy-server:latest   "/docker-entrypoint.…"   40 seconds ago      Up 38 seconds       0.0.0.0:1936->1936/tcp, 0.0.0.0:5672->5672/tcp                            haproxy
```
## Tạo cluster RabbitMQ
Khi tất cả mọi thứ đã được chạy, chúng ta bắt đầu cấu hình để join các node rabbitmq thành 1 cluster. Tôi sẽ join node 2, node 3 vào node 1

Kiểm tra status hiện tại của `rabbitmq-node-1` bằng cách gửi lệnh vào container
```
$ docker exec -ti rabbitmq-node-1 bash -c "rabbitmqctl cluster_status"
Cluster status of node 'rabbit@rabbitmq-node-1'
[{nodes,[{disc,['rabbit@rabbitmq-node-1']}]},
 {running_nodes,['rabbit@rabbitmq-node-1']},
 {cluster_name,<<"rabbit@rabbitmq-node-1">>},
 {partitions,[]},
 {alarms,[{'rabbit@rabbitmq-node-1',[]}]}]
```
Stop app`rabbitmq-node-2` bằng lệnh
```
$ docker exec -ti rabbitmq-node-2 bash -c "rabbitmqctl stop_app"
```
Join ``rabbitmq-node-2`` với ``rabbitmq-node-1``

```
$ docker exec -ti rabbitmq-node-2 bash -c "rabbitmqctl join_cluster rabbit@rabbitmq-node-1"
```

Cuối cùng start ``node 2``
```
$ docker exec -ti rabbitmq-node-2 bash -c "rabbitmqctl start_app"
```
Bạn có thể kiểm tra trạng thái của cluster lại để biết node 2 đã joined vào cluster hay chưa:
```
docker exec -ti rabbitmq-node-1 bash -c "rabbitmqctl cluster_status"

Cluster status of node 'rabbit@rabbitmq-node-1'
[{nodes,[{disc,['rabbit@rabbitmq-node-1','rabbit@rabbitmq-node-2']}]},
 {running_nodes,['rabbit@rabbitmq-node-2','rabbit@rabbitmq-node-1']},
 {cluster_name,<<"rabbit@rabbitmq-node-1">>},
 {partitions,[]},
 {alarms,[{'rabbit@rabbitmq-node-2',[]},{'rabbit@rabbitmq-node-1',[]}]}]
```
Thực hiện lại các bước với node 3
```docker
$ docker exec -ti rabbitmq-node-3 bash -c "rabbitmqctl stop_app"
$ docker exec -ti rabbitmq-node-3 bash -c "rabbitmqctl join_cluster rabbit@rabbitmq-node-1"
$ docker exec -ti rabbitmq-node-3 bash -c "rabbitmqctl start_app"
```
Kiểm tra lại node 2, 3 đã join vào cluster node 1 hay chưa:
```
docker exec -ti rabbitmq-node-1 bash -c "rabbitmqctl cluster_status"
Cluster status of node rabbit@rabbitmq-node-1 ...
[{nodes,[{disc,['rabbit@rabbitmq-node-1','rabbit@rabbitmq-node-2',
                'rabbit@rabbitmq-node-3']}]},
 {running_nodes,['rabbit@rabbitmq-node-3','rabbit@rabbitmq-node-2',
                 'rabbit@rabbitmq-node-1']},
 {cluster_name,<<"rabbit@rabbitmq-node-1">>},
 {partitions,[]},
 {alarms,[{'rabbit@rabbitmq-node-3',[]},
          {'rabbit@rabbitmq-node-2',[]},
          {'rabbit@rabbitmq-node-1',[]}]}]
 ```
Tìm hiểu thêm thông tin về RabbitMQ cluster tại [đây](https://www.rabbitmq.com/clustering.html)

## Đăng nhập HAProxy web admin

Đăng nhập tại địa chỉ  `http://localhost:1936/haproxy?stats` với username:password (`haproxy:haproxy`) và `port` được định nghĩa trong file `haproxy.cfg`

![](https://images.viblo.asia/33405016-5ecb-45df-b6d2-45bab729ba15.png)

3 service RabbitMQ được monitor trong giao diện của HAProxy.

![](https://images.viblo.asia/7af4594f-d7b5-4cf1-bb95-83d9342ef868.png)

Admin quản lí của RabbitMQ chạy ở port `15672` http://localhost:15672. Đăng nhập bằng thông tin (`admin:admin`) đã được định nghĩa trong file `docker-compose.yml`

![](https://images.viblo.asia/3a399dea-2765-4f64-bd3b-cc1a6198aa6c.png)

Thông tin các port
![](https://images.viblo.asia/72f9eb5b-dfb0-4ec4-843e-05b9eedd23f7.png)

Github cho ai cần https://github.com/caokhang91/cluster-rabbitmq-haproxy.

TIPS:

* Remove docker image
``$ docker rmi [image ID]``
* Remove toàn bộ container
``$ docker rm $(docker ps -a -q)``
* Remove toàn bộ image
``$ docker rmi $(docker images -q)``
* Stop toàn bộ docker container
``$ docker stop $(docker ps -a -q)``


Chúc các bạn thành công & Feeling free to share.

*Bài viết được tổng hợp từ kiến thức cá nhân của tác giả và tổng hợp lại trên internet.*