Một trong những lý do Docker là một nền tảng rất mạnh mẽ là bởi lẽ bạn có thể kết nối các container hay các service của chúng với nhau một cách dễ dàng, hoặc có thể kết nối với những service không phải Docker. Các container hay service của docker cũng không cần phải biết chúng được deploy trên Docker, hay là các service hoạt động với chúng có phải là service Docker hay không. Bất kể các host chạy trên Linux, Windows hay là sự kết hợp của cả hai, chúng ta đều có thể sử dụng Docker để quản lý chúng - có nghĩa là Docker không hề phụ thuộc vào nền tảng nào cả. Docker có thể mang lại cho chúng ta tất cả những điều trên một phần là nhờ vào hệ thống networking mà nó xây dựng. Trong bài viết này chúng ta sẽ cùng nhau đi tìm hiểu về các khái niệm và nguyên tắc cơ bản hình thành nên hệ thống networking trong Docker, cách sử dụng các loại hình network trong docker (các driver) như thế nào, từ đó giúp bạn có thế có cái nhìn rõ hơn trong việc thiết kế và triển khai ứng dụng bằng việc tận dụng hết những khả năng của docker network.


### Các thành phần cần biết trong docker networking

Docker networking được cấu thành từ ba thành phần chính quan trọng nhất:
1. Container network model (CNM): là một hướng dẫn thiết kế chi tiết hay có thể coi là một chuẩn thiết kế networking cho hệ thống container, nó định nghĩa những block cơ bản cần thiết để cấu thành nên Docker network
2. `libnetwork`: là một bản implementation của CNM, và được sử dụng bởi Docker, được viết bằng ngôn ngữ Go và implement đầy đủ những thành phần cốt lõi của CNM.
3. Các drivers: là các bản implement custom của mô hình CNM cho các mô hình mạng khác nhau, giúp chúng ta ứng dụng trong từng trường hợp sử dụng khác nhau.

![](https://images.viblo.asia/f3a8f78f-b2b4-4bd4-93e7-a33372eb15e0.png)


#### Container network model (CNM)

![](https://images.viblo.asia/4ba392fe-134f-4da7-8b02-ec0aaccf23c2.png)

Tất cả những gì của Docker network đều bắt đầu từ design guide của nó - CNM, như đã giới thiệu ở trên thì nó định nghĩa các thành phần/block cơ bản trong docker network, gồm 3 block chính:
- Sandbox: là một stack network độc lập, nó bao gồm Ethernet interfaces, các bảng định tuyến (routing table), và DNS config.
- Endpoint: là một virtual network interface, cũng giống như các network interface hoạt động trên máy tính của chúng ta, nhiệm vụ của nó là tạo kết nối mạng. Trong thiết kế của CNM, nhiệm vụ của các endpoint là connect các sandbox đến network (block cuối trong CNM)  
- Network: là một phần mềm implement tính năng của switch (hay còn được gọi là 802.1d bridge), nhiệm vụ của nó là gom nhóm và tách biệt một tập các endpoint cần giao tiếp với nhau.

Chúng ta sẽ đi vào ví dụ thực tế để có thể hiều rõ hơn quan hệ của các thành phần trong CNM với các containers như thế nào. Trong hình dưới đây, ta có thể nhìn thấy các container (A, B) đều có sandbox được đặt trong nó để cung cấp khả năng kết nối mạng.

![](https://images.viblo.asia/92d37559-9b13-44a3-a752-eab4b388f9ee.png)

Container B có 2 network interface (chính là các endpoint) và kết nối với các network A và B. Hai container có thể giao tiếp với nhau vì chúng cùng được kết nối tới network A, trong khi 2 endpoints của container B không thể giao tiếp với nhau vì chúng không cùng nằm trên một mạng. Vì endpoint giống như là các network adapter, cho nên mỗi endpoint chỉ có thể kết nối tới một mạng duy nhất, nên nếu một container muốn kết nói tới nhiều mạng một lúc thì nó cần nhiều hơn 1 endpoint (như trường hợp của container B trong ví dụ trên). Chúng ta cũng có thể thấy trong ví dụ trên, container A và B cùng hoạt động trên cùng một docker host, thế nhưng network stack của chúng hoàn toàn tách biệt trong OS thông qua sandbox.

#### Libnetwork

`libnetwork` là một bản implementation của CNM, nó là một open-source viết bằng Go, cross-platform và được sử dụng bởi Docker.

Từ thời kì đầu của Docker, tất cả phần implement của CNM được nằm trong docker daemon, nhưng cho tới khi nó trở nên quá to và không tuân theo quy tắc thiết kế module theo chuẩn Unix, nó đã được tách ra thành một thư viện riêng biệt và dó là cách mà `libnetwork` được hình thành.

Ngoài việc implement các thành phần có trong CNM, nó còn có các chức năng khác như service discovery, ingress-base container load balancing (cơ chế load balancing trong docker swarm), network control plane, management plane (giúp quản lý network trên docker host).

#### Drivers

`libnetwork` có thể coi như là một lớp trừu tượng định nghĩa các thành phần trong CNM, chức năng quản lý networking cho docker host, còn các driver chính là các bản implement cụ thể cho từng mục đích sử dụng khác nhau. Hay nói các khác chính driver mang đến khả năng kết nối thực sự và tách biệt các mạng với nhau. Mối tương quan giữa driver và `libnetwork` được thể hiện trong hình dưới đây.


Trong Docker đã có tích hợp sẵn một số driver, được gọi là các native drivers hay local drivers:

- Trên Linux bao gồm: bridge, overlay, macvlan.
- Trên Window bao gồm: nat, overlay, transparent, 12bridge.

Một số driver của bên thứ ba phát trên cũng có thế được sử dụng trong docker, chúng được gọi là remote drivers. Một số cái tên tiêu biểu có thể kể đến như: calico, contiv, kuryv...

Mỗi một driver kể trên chịu trách nhiệm cho việc tạo, quản lý, xóa bỏ các resource trên các network thuộc loại của nó. Ví dụ overlay driver sẽ chịu trách nhiệm tạo, thêm, xóa bỏ các resource trong các overlay network.

Các driver định nghĩa ở trên cũng có thể hoạt động đồng thời cùng lúc để có thể build nên những mô hình cấu trúc phức tạp phục vụ nhu cầu của người dùng. Trong phần tiếp theo của bài viết này, chúng ta sẽ đi vào tìm hiểu một số loại driver phổ biến thường được sử dụng trong docker.


### Single-host bridge network

Đây là loại mô hình mạng đơn giản nhất trong docker network. Như tên gọi của nó, loại mạng single-host bridge network được tạo và quản lý bởi `bridge` driver trên Linux, nhưng với Window thì driver này tên là `nat` (mô hình và cách hoạt động y hệt như nhau).

Với `bridge` driver, các network hoạt động trong mode này sẽ chỉ kết nối được với các container trong cùng một host, và nó mô phỏng hoạt động của một layer 2 switch ([802.1d bridge](https://en.wikipedia.org/wiki/IEEE_802.1D))

Hình dưới đây mô phỏng việc 2 docker host có container chạy trên `bridge` network cùng tên là `mynet` nhưng không thể kết nối được với nhau bởi vì chúng thực sự ở hai mạng khác nhau trên hai host khác nhau.

`brigde` driver là driver mặc định khi bạn tạo một network với lệnh `docker network create` mà không chỉ định driver cho nó. Khi cài đặt docker thành công, chúng ta luôn có sẵn một bridge network được tạo sẵn. Đối với Linux, network đó tên là `bridge`, còn trên Windows, network đó tên là `nat`. (Hình dưới)

![](https://images.viblo.asia/f02c09e8-d9ff-47db-9e73-bb9c5469d276.png)

Chúng ta có thể sử dụng lệnh `docker network inspect [tên network]` để biết thêm thông tin về network vừa được tạo.

```ruby
hungnv@hungnv:~$ docker network inspect mynetwork
[
    {
        "Name": "mynetwork",
        "Id": "0dd0064ef821e2c8d6bbddb7f179d53168aadd943a52e5c9763db227b48e4f70",
        "Created": "2021-03-14T20:47:19.797031178+07:00",
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

`bridge` network được xây dựng dựa trên linux bridge đã tồn tại trong kiến trúc của Linux kernel trong vòng hơn 15 năm qua, có nghĩa là nó có hiệu năng sử dụng rất cao và vô cùng ổn định. 

Chúng ta có thể inspect network `bridge` có sẵn trên Linux khi chúng ta cài đặt docker

```ruby
hungnv@hungnv:~$ docker network inspect bridge | grep bridge.name
            "com.docker.network.bridge.name": "docker0",
```

và có thể dùng lệnh `ip link show` để list ra network device

```ruby
hungnv@hungnv:~$ ip link show docker0
4: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default 
    link/ether 02:42:dc:1a:f3:58 brd ff:ff:ff:ff:ff:ff
```

Ta có thể thấy ở đây là bridge network mặc định của docker map với linux bridge tên là `docker0` nằm trong Linux kernel, từ đó có thể map đến một Ethernet interface trên docker host thông qua mapping port.

![](https://images.viblo.asia/78de9d1c-d970-4fdf-bcf2-8bce82d0f8be.png)

Quay trở lại ví dụ với `mynetwork` là network bridge chúng ta đã tạo lúc nãy, cùng sử dụng lệnh `brctl` để liệt kê các brigde đang tồn tại trên hệ thống. Chúng ta có thể thấy kết quả ở dưới, ngoài `docker0` là bridge của network mặc định, thì `br-0dd0064ef821` là bridge map với network `mynetwork` chúng ta đã tạo. 

```ruby
hungnv@hungnv:~$ brctl show
bridge name	bridge id		STP enabled	interfaces
br-0dd0064ef821		8000.0242d94afdc4	no		
docker0		8000.0242dc1af358	no
```

Bây giờ chúng ta sẽ thử tạo một container sử dụng network `mynetwork`.

```ruby
$ docker container run -it --name c1 --network mynetwork alpine sh
```

Bạn có thể chạy inspect lại một lần nữa để chắc chắn rằng container vừa tạo đã hoạt động trên network `mynetwork`

```docker
$ docker network inspect --format '{{json .Containers}}' mynetwork 
{"676356b3770e05fedc645aa0ba83701cbb2c8023f1a22efcca56789dbc46983d":{"Name":"c1","EndpointID":"0a457a8390f87e93cf32db6e620258df169f6dd6fbe0b23fe357e0611f97502d","MacAddress":"02:42:ac:12:00:02","IPv4Address":"172.18.0.2/16","IPv6Address":""}}
```

Chạy lại câu lênh `brctl show` một lần nữa, ta sẽ thấy bridge mới tạo được gắn với interface (endpoint) của container

```ruby
$ brctl show
bridge name	bridge id		STP enabled	interfaces
br-0dd0064ef821		8000.0242d94afdc4	no		veth70c1a60
docker0		8000.0242dc1af358	no
```

Chúng ta có thể chạy thêm một container khác và ping tới container cũ thông qua tên của nó. Ví dụ:

```ruby
$ docker container run -it --name c2 --network mynetwork alpine sh
/ # ping c1
PING c1 (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.203 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.182 ms
^C
--- c1 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.182/0.192/0.203 ms
```

Như vậy, với các container được tạo và sử dụng chung một network bridge có thể kết nối trực tiếp đến nhau mà không cần thông qua một cơ chế mapping port hay address nào cả. Thêm vào đó, chúng ta có thể thực hiện ping trực tiếp đến tên của container như một hostname là do tất cả các containers được tạo mới đều được đăng ký với một DNS service được tích hợp sẵn trong docker, vì thể chúng có thể mapping tên của container với ip của chúng nếu hai container cùng chạy trên cùng một network.

Một lần nữa verify lại bridge của `mynetwork` được map thêm với endpoint của container `c2` vừa tạo

```ruby
$ brctl show
bridge name	bridge id		STP enabled	interfaces
br-0dd0064ef821		8000.0242d94afdc4	no		veth0c33fd9
							veth70c1a60
docker0		8000.0242dc1af358	no	
```

### Multi-hosts overlay network

Mình dự định sẽ có một bài viết riêng để giải thích hoạt động của mô hình mạng overlay hay `overlay` driver của docker, nên phần này của bài viết sẽ giải thích ý tưởng ngắn gọn và mục đích chính của overlay network nhé các bạn.

Overlay network có thể hoạt động trên multi-hosts. Nó cho phép một network có thể trải rộng trên nhiều docker host khác nhau, vì vậy các container trên các docker hosts đó có thể giao tiếp với nhau thông qua layer 2.

Ovelay network là network mặc định khi chúng ta chạy docker với swarm mode (chạy một cluster gồm nhiều docker host), và nó có thể scale một cách rất dễ dàng, bằng việc chỉ cần chạy một vài command đơn giản.

Để tạo một network overlay, chúng ta chỉ cần chạy lệnh `docker network create` với options driver là `-d overlay`.

Mình sẽ làm một ví dụ để ta có thể thấy trực quan được cách hoạt động của overlay network. Một lưu ý quan trọng là overlay network chỉ có thể tạo được khi docker host của bạn đã được join swarm, hoặc đã được init mode swarm. Ở phần này mình sẽ không giải thích chi tiết các lệnh của swarm nhé, ta sẽ chú ý vào kết quả khi chạy container thông qua overlay network

Vì vậy mình sẽ chọn thực hiện ví dụ của mình thông qua [Play with docker](https://labs.play-with-docker.com/).

Ở đây mình tạo 2 instances docker:

Sau khi tạo xong, tại instance có tên là node1 (trong ảnh), mình sẽ init swarm mode bằng cách chạy lệnh:

```ruby
docker init swarm --advertise-addr=192.168.0.18
```

Sau khi docker host này đã trở thành manager của một swarm, nó sẽ in ra màn hình câu lệnh join swarm cho worker node. Copy lệnh này và chạy tại node2 để join swarm.

```ruby
docker swarm join --token SWMTKN-1-3owjly8x6t5icj6sehmmapit1pp10kwvw2ls4f078oe47jqtrg-aovwwsmc58r2jibrgob20c3sq 192.168.0.18:2377
```

Sau khi đã có hai node join cùng một swarm, ở node 1 là node manager, ta sẽ tạo một network với `overlay` driver, chú ý là phải có thêm `--attachable` để có thể tạo container chạy trên network này.

```
docker network create -d overlay --attachable myoverlaynetwork
```

Sau khi đã có network overlay, ta sẽ tiến hành tạo 2 container như ở ví dụ trong phần `bridge` network, nhưng lần này là ở 2 host khác nhau (node1 và node 2):

```ruby
docker container run -it --name [c1 hoặc c2] --network myoverlaynetwork alpine sh
```

Sau khi  tạo xong, chúng ta có thể đứng từ container trên bất kỳ node nào và ping container còn lại, ta có thể thấy là lệnh ping được thực hiện thành công, có nghĩa là container đã được kết nối với nhau từ 2 host mà không cần phải sử dụng bất cứ phương thức mapping port hay address nào cả, đây chính là một trong những điều tạo nên sức mạnh của docker swarm hay kubernetes.

![](https://images.viblo.asia/b06e86c6-9df3-46ca-9f27-daa8917c0847.png)

![](https://images.viblo.asia/bf27e7a9-1d01-4df4-a2e7-c36b963e7028.png)


### Host networking

`host` network mode không hề tách biệt network stack của container với network của host chạy docker có nghĩa là các container chạy mode này và docker host sẽ cùng chia sẻ một network [namespace]https://docs.docker.com/get-started/overview/#the-underlying-technology . Ví dụ, nếu bạn chạy một container và bind nó với cổng 80 và sử dụng `host` mode networking hay là `host` driver, ứng dụng trong container đó thực tế sẽ có thể truy cập thông qua cổng 80 với IP của docker host.

Chính vì container share cùng network namespace với nên khi bạn sử dụng `host` network, bạn sẽ không thể sử dụng port mapping khi chạy `docker run` hay sử dụng docker-compose.

`host` mode có thể sử dụng để tối ưu hóa hiệu suất làm việc của hệ thống vì nó không cần sử dụng cơ chế NAT để giao tiếp giữa container với request từ bên ngoài docker host. 

`host` mode chỉ có thể được sử dụng trên host chạy Linux, nên với các host chạy trên Windows, Windows Server hay Mac bạn sẽ không thể tạo được network chạy mode này.

-----

### Kết luận

Như vậy là trong bài viết lần này, mình đã giới thiệu đến các bạn các thành phần của docker networking, các driver và mục đích sử dụng của từng loại. Hi vọng là sau bài viết này, các bạn đã có cái nhìn rõ hơn, hiểu rõ hơn ứng dụng của từng loại hình network khi triển khai sản phẩm của mình với docker. Ở những bài viết sau về chủ đề docker, mình sẽ giới thiệu thêm về các khía cạnh khác trong docker networking mình đã có đề cập đến mà chưa có thời gian trình bày cụ thể ra ở đây như: ingress load balancing hay service directory...


#### Tham khảo:

1. https://docs.docker.com/network/
2. https://www.amazon.com/Docker-Deep-Dive-Nigel-Poulton/dp/1521822808