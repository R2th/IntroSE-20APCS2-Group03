## Giới thiệu chung
Tiếp tục với chủ đề Traefik, hôm nay mình sẽ làm một bài demo nho nhỏ deploy Traefik trong Swarm mode. Nếu bạn chưa biết Traefik là gì, hãy đọc bài viết [Tổng quan về Traefik](https://viblo.asia/p/XL6lAA8Dlek) của mình trước nhé. Bài viết hôm nay sẽ sử dụng các kiến thức sau:
- Cơ bản về traefik + docker
- Docker Swarm cơ bản
- Docker Machine + Virtualbox

Bài viết này sử dụng Ubuntu làm hệ điều hành, các bạn đọc bài này nếu thực hiện trên môi trường khác lưu ý giúp mình nhé. Nội dung tổng quan bài viết mình sẽ đi vào giới thiệu qua về Docker Swarm, Docker Machine. Sau đó mình bắt tay vào thực hành infrastructure với Docker, Traefik và Swarm mode. Giúp bạn scale service web.
- Dựng các VPS ảo trên máy local với Docker Machine
- Thiết lập Swarm mode cho các VPS ở trên
- Deploy Traefik + web service trong swarm mode

## Docker Swarm là gì?
Chúng ta sẽ giả thuyết rằng ta có 3 con VPS mỗi còn này có một IP address của riêng nó. Tất cả các VPS sẽ hỗ trợ load balancer cho nhau và  cùng phục vụ một cho chung một hệ thống web. Chúng ta chỉ cần thực hiện các lệnh deploy với docker trên một con VPS chính (tạm gọi là manager), nó sẽ quản lý những con VPS còn lại (gọi nó là worker). Vậy làm sao để làm được như vậy? Chúng ta sẽ cần nhờ tới sự trợ giúp đắc lực của Docker Swarm. Khi bật Swarm mode, chúng ta có thể gom nhóm các VPS lại các cụm máy chủ, mình gọi là clusters hay swarm clusters - bao gồm một server manager và các workers đi kèm.

> Nếu chỉ có một VPS, chúng ta vẫn có thể chạy docker ở Swarm mode được. Manager lúc này sẽ đảm nhiệm mọi thứ. (worker = 0)

Như vậy, Docker Swarm sẽ giúp mình nhóm các máy chủ lại và thực hiện lệnh chỉ trên server manager, những server worker cũng sẽ thay đổi theo. Nó quá hữu ích khi ta muốn scale hệ thống khi bạn muốn tăng thêm hay giảm đi số lượng container của một service.

![](https://docs.docker.com/engine/swarm/images/ingress-routing-mesh.png)

Không chỉ vậy, Docker Swarm còn giúp bạn thực hiện load balancing. Tất các các cluster đều được đặt trong một network gọi là ingress network. Routing mesh của swarm như hình trên, sẽ đưa tất cả các request sẽ đi qua ingress network tới Swarm Loadbalancer, bộ balancer này sẽ phân bổ request tới các container của các service ở các server (cả manager + worker) cùng chung một mạng swarm.

## Các khái niệm trong Swarm
Trong Swarm có một số khái niệm mà bạn cần nắm được gồm:
- Container: Cái này bạn biết khi tìm hiểu docker rồi ha. Một container là một instance của docker image khi được chạy.
- Service: Một thành phần khác nhau của một ứng dụng được gọi là service. VD: Storage service để lưu trữ, Redis service để cache... Một service sẽ đẩm nhiệm một vai trò riêng ứng với một docker image. Vậy nên, khi run, service sẽ là tập hợp các containers đảm nhiệm một vai trò riêng: storage service, redis, mysql... Chúng ta dùng service để scale số lượng containers cần chạy của nó.
- Stack: Chúng ta tập hợp nhiều service liên quan đến nhau phối lại tạo ra một stack. Khác với service, stack sẽ điều phối tất cả các thành phần của toàn bộ ứng dụng. (Vì stack quản lý tập các service mà)
- Node: Một host hay vps của chúng ta join vào cùng một mạng swarm sẽ được gọi là một node. Node này có role là manager hoặc worker. Trong đó, manager là node chính dùng để khởi tạo swarm, thực hiện các lệnh thay đổi, các worker sẽ thay đổi service theo các lệnh được thực hiện trên manager.

Việc *chia để trị* app thành nhiều thành phần: service, stack cũng giống như việc phân cấp bộ máy quản lý của một công ty sẽ giúp chúng ta dễ quản lý app hơn khi scale, hay khi theo dõi uptime của các service... Các bạn có thể tìm hiểu thêm các bài viết khác về Docker trên Viblo để hiểu sâu hơn.

## Docker Machine
Docker Machine là một tool trong docker platform, nó thực sự quá hữu ích cho việc học tập về docker, docker swarm. Bởi lẽ, nó giúp ta giả lập các server để thực hành các kiến thức đã học. Docker Machine cung cấp một bộ cli api giúp chúng ta tạo và quản lý các server ảo dễ dàng. Các bạn đọc thêm và cài đặt theo hướng dẫn [tại đây](https://docs.docker.com/machine/overview/).

Mình sẽ dùng docker machine để tạo 3 hosts (vps) ảo trên máy local để thực hành các kiến thức về swarm mà không cần các host thật. Mình sẽ dùng driver Virtualbox để tạo các machine (hay host ảo). Một số command cơ bản được sử dụng gồm:
- Tạo một machine
```bash
> docker-machine create --driver virtualbox machine_name
```
- SSH vào một machine
```bash
> docker-machine ssh machine_name
```
- Xem ip của một machine
```bash
> docker-machine ip machine_name
```
- Xem danh sách machine đang có
```bash
> docker-machine ls
```

## Thực hành với swarm
### Tạo các machine
Chúng ta sẽ tạo một machine đóng vai trò là manager, 2 machines với vai trò là worker. Thao tác lệnh docker-machine như sau:

```bash
> docker-machine create --driver virtualbox manager
> docker-machine create --driver virtualbox worker1
> docker-machine create --driver virtualbox worker2

```

Việc tạo sẽ tốn ít phút. Sau đó, hãy kiểm tra lại bằng việc xem danh sách machines:
```bash
> docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
manager   -        virtualbox   Running   tcp://192.168.99.100:2376           v18.09.0   
worker1   -        virtualbox   Running   tcp://192.168.99.101:2376           v18.09.0   

```

Chúng ta dễ thấy trạng thái running của chúng và ip mà chúng được trỏ vào.

### Khởi tạo Swarm
Bạn thấy ở trên, ip con máy manager của mình là `192.168.99.100`. Bây giờ active swarm mode bằng việc SSH vào manager thực hiện lệnh khởi tạo.

Các SSH như sau:
```bash
> docker-machine ssh manager
```

SSH xong chúng ta khởi tạo swarm với ip là IP của con manager:
```bash
> docker swarm init --advertise-addr 192.168.99.100
Swarm initialized: current node (rh9krtfftxhjvb25t7k6y8gxs) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0t08e9l15ta4refv1y7jms78er7iguz8wsdrdjunkitylh5wrf-63zl0jxp7retpn7ov6sequk3e 192.168.99.100:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

```

Thông báo chỉ ra rằng chúng ta tạo thành công, để thêm các worker vào swarm thì chạy command join với cái `join-token` nó đưa cho. Nếu bạn lỡ xóa terminal hoặc quên, thì bạn có thể xem lại join-token cho worker bằng cách thực hiện lệnh sau trên manager:

```bash
> docker swarm join-token worker
docker swarm join --token SWMTKN-1-0t08e9l15ta4refv1y7jms78er7iguz8wsdrdjunkitylh5wrf-63zl0jxp7retpn7ov6sequk3e 192.168.99.100:2377
```

Nếu muốn join vào swarm dưới dạng một manager nữa thì:
```bash
> docker swarm join-token manager
docker swarm join --token SWMTKN-1-0t08e9l15ta4refv1y7jms78er7iguz8wsdrdjunkitylh5wrf-71idqhdh53pmw66xzk86iqz49 192.168.99.100:2377
```

Sau tất cả, việc còn lại để join các worker vào swarm chỉ là SSH vào từng woker và chạy command join vừa lấy vừa rồi.
```bash
> docker swarm join --token SWMTKN-1-0t08e9l15ta4refv1y7jms78er7iguz8wsdrdjunkitylh5wrf-63zl0jxp7retpn7ov6sequk3e 192.168.99.100:2377
```

Để kiếm tra xem bạn đã active swarm mode thành công chưa, hãy chạy lệnh:
```
> docker info
...
Swarm: active
 NodeID: rh9krtfftxhjvb25t7k6y8gxs
 Is Manager: true
 ClusterID: wa5yunqrzc1rnuuw32ndqumda
 Managers: 1
 Nodes: 2
 Default Address Pool: 10.0.0.0/8  
 SubnetSize: 24
....
```

Bạn để ý sẽ thấy một đoạn Swarm như bên trên. Trong đó hiện rõ: `Swarm: active` kèm các thông tin khác như số Manager, số Node đang có (mỗi Node tương ứng với một host).

Xem danh sách các node đang có trong Swarm bằng cách thực hiện lệnh trên manager:

```bash
> docker node ls
```


### Deploy stack và service
Vì traefik các bạn có thể sử dụng để làm reverse-proxy cho nhiều services của nhiều app trên cùng một server. Nên chúng ta sẽ tách nó thành một stack riêng biệt không đụng trạm gì tới bọn khác.

Như vậy, trong bài này chúng ta sẽ có hai stack cơ bản gồm:
1. `reverse-proxy`: Chứa traefik service, làm reverse proxy.
2. `web`: Chứa web service để chúng ta test. Service này mình sẽ dùng image `containous/whoami:latest` đã dùng trong bài trước [Traefik + Let's Encrypt tự động tạo SSL miễn phí](https://viblo.asia/p/1VgZvEdmKAw).

Trong bài này, và cả trọng thực tế, để ngắn gọn dễ quản lý, mọi người thường sử dụng syntax của`docker-compose` để tạo file định nghĩa cho các stack. Lưu lại và dùng ở các lần thay đổi sau khi cần.

#### Reverse-proxy stack
Tạo file `reverse-proxy.yml` định nghĩa `reverse-proxy` stack:
```yaml
version: '3.5'

services:
  traefik:
    image: traefik:1.7
    command:
      - --docker
      - --docker.swarmMode
      - --docker.exposedByDefault=false
      - --docker.watch
      - --docker.domain=traefik.lc
    ports:
      - 80:80
    networks:
      - reverse-proxy-net
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    deploy:
      placement:
        constraints:
          - node.role==manager
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=reverse-proxy-net"
      - "traefik.port=8080"
      - "traefik.frontend.rule=Host:traefik.lc"

networks:
 reverse-proxy-net:
   name: reverse-proxy-net
   driver: overlay
```

Stack trên define một service traefik, service này có constraint (ràng buộc) là chỉ deploy trên node là manager. Dashboard của traefik mình chạy dưới domain `traefik.lc`. Bây giờ chỉ cần deploy stack bằng lệnh sau:
```bash
> docker stack deploy -c reverse-proxy.yml reverse-proxy
Creating network reverse-proxy-net
Creating service reverse-proxy_traefik
```

> Khi update lại stack, bạn chỉ cần sửa file yml rồi chạy lại lệnh deploy bên trên để docker update lại stack.

Kiểm tra lại:
```bash
> docker stack ls
NAME                SERVICES            ORCHESTRATOR
reverse-proxy       1                   Swarm

> docker service ls
ID                  NAME                    MODE                REPLICAS            IMAGE               PORTS
1zhia5gfdf6d        reverse-proxy_traefik   replicated          1/1                 traefik:1.7         *:80->80/tcp
```

#### Web stack
Bây giờ, deploy web stack, mình sẽ định nghĩa stack đơn giản như sau `web.yml`:

```yaml
version: '3.5'

services:
  web-app:
    image: containous/whoami:latest
    networks:
      - reverse-proxy-net
      - web-net
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=reverse-proxy-net"
    deploy:
      replicas: 4

networks:
  reverse-proxy-net:
    external: true
  web-net:
    name: web-net
    driver: overlay

```

Trong đó, mình sẽ tạo service `web-app`, chạy dưới domain `whoami.lc` port 80. Kết quả:

```bash
> docker stack deploy -c web.yml web
Creating network web-net
Creating service web_web-app

> docker stack ls
NAME                SERVICES            ORCHESTRATOR
reverse-proxy       1                   Swarm
web                 1                   Swarm

> docker service ls
ID                  NAME                    MODE                REPLICAS            IMAGE                      PORTS
1zhia5gfdf6d        reverse-proxy_traefik   replicated          1/1                 traefik:1.7                *:80->80/tcp
5iv47pz3ivaf        web_web-app             replicated          4/4                 containous/whoami:latest 

> docker service ps 5iv47pz3ivaf
ID                  NAME                IMAGE                      NODE                DESIRED STATE       CURRENT STATE           ERROR               PORTS
wymsgq2eskep        web_web-app.1       containous/whoami:latest   manager             Running             Running 3 minutes ago                       
llnzx1nn7x5z        web_web-app.2       containous/whoami:latest   worker1             Running             Running 3 minutes ago                       
cmeeybax15il        web_web-app.3       containous/whoami:latest   manager             Running             Running 3 minutes ago                       
b9k916yii2ye        web_web-app.4       containous/whoami:latest   worker1             Running             Running 3 minutes ago 
```

Mình tạm thời đang tắt thằng worker2 cho máy đỡ nặng (laptop hơi cùi mọi người thông cảm). Chúng ta có thể thấy, swarm sẽ tự động phân bổ 4 container của web app vào 2 machine đang có là manager và worker1. Mỗi machine 2 container.

#### Kiểm tra kết quả web-app
1. **Cách 1**: dùng lệnh trên máy thật nha các bạn (không phải trong machine của docker-machine):
```bash
> curl -H Host:whoami0.traefik http://$(docker-machine ip manager)
```

2. **Cách 2**, dùng browser:

Các bạn thêm domain ảo là `traefik.lc` và `whoami.lc` vào `/etc/hosts` để DNS và có thể truy cập từ browser như Chrome, Firefox để xem kết quả. Domain trỏ vào ip của machine manager.

```
192.168.99.100 traefik.lc whoami.lc
```

Cả hai cách đều cho kết quả có dạng:
```
Hostname: f3138d15b567
IP: 127.0.0.1
IP: 10.0.0.5
IP: 10.0.0.4
IP: 172.18.0.3
GET / HTTP/1.1
Host: whoami.lc
User-Agent: curl/7.55.1
Accept: */*
Accept-Encoding: gzip
X-Forwarded-For: 10.255.0.2
X-Forwarded-Host: whoami.lc
X-Forwarded-Proto: http
X-Forwarded-Server: 77fc29c69fe4
```

Trong đó, hostname các bạn sẽ thấy hostname thay đổi theo hostname của container mà nó được swarm load balancer đến. Việc share dữ liệu giữa các server về file storage, các bạn dùng NFS (network file system với linux), với session, cache, các bạn dựng thêm service redis để làm trung gian trung chuyển nhé!

Bài viết của mình tới đây là kết thúc. Xin cảm ơn các bạn đọc đã quan tậm. Mọi đóng góp, thắc mắc hay khích lệ cho bài viết vui lòng thả một comment xuống bên dưới giúp mình. Đừng quên upvote/clip bài... hay chia sẻ tới mọi người xung quanh trên facebook nhé. 

Bài viết tiếp theo của mình xoay quanh Traefik với chủ đề: ***"Implement Traefik + Elasticsearch - Logstash - Kibana để lưu log cho hệ thống"***  sẽ được publihsh vào cuối tháng 12 này. Thân mời mọi người đón đọc. Nếu bạn thấy các bài viết của mình hay và hữu ích, nhấn follow mình để nhận thông báo các bài viết mới của mình sớm nhất. Cảm ơn mọi người một lần nữa! ^^

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***