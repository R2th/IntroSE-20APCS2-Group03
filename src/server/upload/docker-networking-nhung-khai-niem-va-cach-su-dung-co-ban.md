Chào mọi người, hôm nay chúng ta cùng tìm hiểu về một khía cạnh của Docker - Docker networking

Dù đã tìm hiểu về Docker một thời gian nhưng khi được hỏi về network của docker thì mình vẫn cảm thấy khá khó để giải thích cho cặn kẽ, vì thế nên hôm nay mình viết bài viết này để tổng hợp lại những kiến thức về Docker Network.

## Tổng quan

Một trong những điểm mạnh của Docker đó là tính đóng gói, với Docker chúng ta có thể gói gọn một ứng dụng vào một container thông qua việc build một image.
Đằng sau đó là rất nhiều thứ cấu thành nên tính đóng gói này, một trong số đó là Docker network.

![](https://images.viblo.asia/0034877b-28f3-4be8-af7f-df2a9997e31e.png)

*Docker network sẽ đảm nhiệm nhiệm vụ kết nối mạng giữa các container với nhau, kết nối giữa container với bên ngoài, cũng như kết nối giữa các cụm (swarm) docker containers.*

Với container và service của Docker, bạn có thể kết nối chúng lại với nhau hoặc kết nối chúng với các mạng khác nằm ngoài docker.

> Các container Docker thậm chí không cần phải biết rằng chúng được triển khai trên Docker, hoặc liệu các tiến trình khác mà nó đang giao tiếp với chúng có phải là khối lượng công việc của Docker hay không. Cho dù máy chủ Docker của bạn chạy Linux, Windows hoặc kết hợp cả hai, bạn có thể sử dụng Docker để chạy theo cách không cần quan tâm đến nền tảng đang sử dụng.

Dưới góc nhìn của một beginner docker, bài viết hôm nay mình sẽ tổng hợp về Docker network basic và một vài điểm lưu ý khi sử dụng Docker network mà mình tìm hiểu được (go).

## Các loại network drivers của Docker

Hệ thống network Docker là dạng plugable, sử dụng drivers. Hầu hết các driver được cung cấp mặc định, với các chức năng cốt lõi của các chức năng mạng thông thường.

Docker network có thể cung cấp hầu hết các chức năng mà một hệ thống mạng bình thường cần có.

#### - BRIDGE
Đây là driver mạng default của Docker. Nếu không chỉ định driver thì bridge sẽ là driver mạng mặc định khi khởi tạo.

Khi chúng ta cài đặt Docker, virtual bridge docker0 sẽ được tạo ra, docker tìm một subnet chưa được dùng trên host và gán một địa chỉ cho docker0
```shell
$ ifconfig
docker0   Link encap:Ethernet  HWaddr 02:42:c4:7d:f6:13  
          inet addr:172.17.0.1  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0 
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)

```

Bridge network thường được sử dụng khi cần chạy ứng dụng dưới dạng các container độc lập cần giao tiếp với nhau.
Các container trong cùng mạng có thể giao tiếp với nhau qua địa chỉ IP. Docker không hỗ trợ nhận diện host ở mạng này, vì vậy muốn connect thì phải dùng options links để docker có thể hiểu được địa chỉ của các service.

Bridge là driver tốt nhất cho việc giao tiếp multiple containers ở một host đơn.

#### - HOST
Dùng khi container cần giao tiếp với host và sử dụng luôn mạng ở host, vì sử dụng mạng của máy chủ đang chạy nên không còn lớp mạng nào giữa container với Docker
Host phù hợp khi cần connect từ container ra thẳng ngoài host

#### - OVERLAY
Mạng lớp phủ - Overlay network tạo một mạng phân tán giữa nhiều máy chủ Docker. Kết nối nhiều Docker daemons với nhau và cho phép các cụm services giao tiếp với nhau. Chúng ta có thể sử dụng overlay network để giao tiếp dễ dàng giữa cụm các services với một container độc lập, hay giữa 2 container với nhau ở khác máy chủ Docker daemons.

Nhờ Overlay network, không cần các công việc thiết lập routing giữa các container thông qua hệ điều hành.
Overlay network tạo nên một lớp phủ trên mạng của máy chủ và cho phép container kết nối đến (bao gồm cả các cụm containers) để giao tiếp một cách bảo mật. Docker đảm bảo định tuyến các gói tin đến và đi đúng container đích.

#### - MACVLAN
Mạng Macvlan cho phép chúng ta gán địa chỉ MAC cho container, điều này làm cho mỗi container như là một thiết bị vật lý trong mạng.
Docker daemon định tuyến truy cập tới container bởi địa chỉ MAC. Sử dụng driver macvlan là lựa chon tốt khi các ứng dụng khác cần phải connect đến theo địa chỉ vật lý hơn là thông qua các lớp mạng của máy chủ.

#### - NONE

Với container không cần networking hoặc cần disable đi tất cả mọi networking, chúng ta sẽ chọn driver này. Thường được dùng với mạng tùy chỉnh. Driver này không thể dùng trong cụm swarm.

## Một vài cách sử dụng docker network

**Khởi tạo một docker network**
```shell
$ docker network create [OPTIONS] NETWORK
$ docker network create -d bridge my-bridge-network
```
Trong đó options `-d` là driver, để tạo mạng overlay thì có thể dùng `-d overlay`
Ngoài ra thì còn nhiều options để tùy vào mức độ custom mà chúng ta có thể thêm vào, nhiều số trong này mình không thực sự hiểu hết, chỉ quan tâm một đến vài options
```sql
--gateway: Địa chỉ Ip của Gateway (IPv4 hay IPv6) cho mạng con
--ip-range: Xác định một dải IPs sử  dụng trong mạng
--internal: Hạn chế  access từ bên ngoài vào mạng
--ipv6: Bật IPv6
--subnet: Chọn mạng con
```
**Ví dụ:**
Khởi tạo mạng với driver bridge có subnet 10.11.0.0/16, ip gateway là 10.11.0.1
```shell
$ docker network create -d bridge  --subnet=10.11.0.0/16 --gateway=10.11.0.1  my-bridge-net
```
```shell
$ docker network inspect my-bridge-net
[
    {
        "Name": "my-bridge-net",
        "Id": "877846e542d208a526e6d02025d99332e8d5a07a667003ca457c5477e10e232b",
        "Created": "2020-07-22T08:59:10.373614208+07:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "10.11.0.0/16",
                    "Gateway": "10.11.0.1"
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

**Sử dụng network khi chạy một container**

Sử dụng option --network để chạy một container trên network bridge đó
```python
docker run --network=bridge -itd --name=container1 normal-app:dev
```

**Sử dụng network qua docker-compose**

Khi dùng docker-compose thì nếu không khai báo network, docker sẽ tự động khởi tạo một mạng dành cho app và driver sẽ là bridge.

```shell
$ docker-compose up
Creating network "api_default" with the default driver
```

Lúc này kiểm tra danh sách network sẽ có network mà docker-compose vừa tạo
```shell
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
4bdb10fc8926        api_default         bridge              local
72550e811311        bridge              bridge              local
74548f1aa34c        host                host                local
125591bf59af        none                null                local
bd9d957fec97        normalapp_default   bridge              local
```

Và khi dừng app thì docker sẽ xóa mạng này
```shell
$ docker-compose down
Stopping api_api_1       ... done
Stopping api_redis-api_1 ... done
Stopping api_db_1        ... done
Removing api_api_1       ... done
Removing api_redis-api_1 ... done
Removing api_db_1        ... done
Removing network api_default
```

Nếu muốn khai báo mạng cho từng containers trong một cụm chúng ta có thể dùng 2 cách sau:
- Khai báo driver host cho container app qua network_mode, cách khai báo này có thể thay đổi driver cho container

Trường hợp chúng ta muốn app sử dụng luôn mạng của host mà không dùng mạng docker, hãy khai báo như sau:
``` yaml
services:
  app:
    network_mode: host
```

- Khai báo qua networks trong docker-compose.yml

``` yaml
...
services:
  app:
    networks:
      - api-net
...
networks:
  api-net:
    driver: host
```

**Sử dụng network trong cụm docker swarm**

Docker swarm thường sử dụng file docker-compose.yml để deploy, và trong file này cần lựa chọn mạng `overlay` để docker có thể connect multiple networks host với nhau.

``` yaml
...
services:
  app:
    networks:
      - api-net
...
networks:
  api-net:
    driver: overlay
```

**Xóa network**

```shell
docker network rm my-bridge-network
```

## Kết
Như vậy là mình vừa trình bày về các loại docker network và một vài điểm cần lưu ý khi sử dụng docker network. Cảm ơn mọi người đã theo dõi bài viết. Hy vọng bài viết sẽ có ích cho ai đang tìm hiểu về docker.

Tham khảo: https://docs.docker.com/network