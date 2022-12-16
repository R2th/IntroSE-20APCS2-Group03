Chào mọi người, bài viết hôm nay chúng ta cùng tìm hiểu về Docker swarm và cách deploy ứng dụng của bạn lên một Swarm Manager.

### Docker swarm là gì


>Docker Swarm là một nhóm các máy chạy Docker và tập hợp lại với nhau thành một cluster. Không như docker engine, sau khi các máy này tập hợp vào Swarm, mọi câu lệnh Docker sẽ được thực thi trên Swarm manager.

>Các máy tham gia vào swarm được gọi là worker node. Các node này chỉ có khả năng cung cấp khả năng hoạt động chứ không có quyền quản lý các node khác.

>Docker Swarm có khả năng khởi chạy các container trên nhiều máy (cluster - máy ảo hoặc máy vật lý) hoặc trên một máy duy nhất (standalone)

> Docker Swarm là một phần mềm hỗ trợ việc tạo và quản lý các container hoặc các hệ thống Container Orchestration. Nó là một cluster nơi mà người dùng quản lý các Docker Engines hoặc các node nơi mà các service được deploy và chạy.




### Những tính năng nổi bật của Docker Swarm

- Quản lý cụm (cluster) với Docker Engine:
> Sử dụng Docker Engine CLI để tạo ra một cụm Docker engine - nơi bạn có thể triển khai các dịch vụ ứng dụng mà không cần một phần mềm điều phối bổ sung để quản lý.

- Thiết kế phân cấp:
> Với Docker engine, bạn có thể phân cấp các nodes với vai trò manager hay worker. Điều này giúp bạn tạo một mô hình phân cấp chỉ từ một image duy nhất.

- Declarative service model:
> Docker Engine sử dụng cách tiếp cận khai báo để cho phép bạn xác định trạng thái mong muốn của các service khác nhau trong các stack ứng dụng của bạn.

- Scaling:
> Đối với mỗi service, bạn có thể khai báo số lượng task bạn muốn chạy. Khi tăng hoặc giảm tỷ lệ, swarm sẽ tự động điều chỉnh bằng cách thêm hoặc xóa các task để đạt trạng thái mong muốn.

- Điều hòa trạng thái ứng dụng:
> Swarm liên tục theo dõi trạng thái trong cluster và điều hòa sự khác biệt giữa trạng thái thực tế và trạng thái mong muốn của bạn. Khi một trong các node replicas gặp sự cố thì swarm sẽ tự động khởi tạo thêm replicas để thay thể các replicas bị sự cố.

- Multi-host networking:
> Bạn có thể chỉ định network sử dụng cho các service của mình. Swarm tự động gán địa chỉ cho các container trên network này khi khởi tạo hoặc cập nhật ứng dụng.

- Service discovery:
> Các node Swarm manager gán cho mỗi service trong cluster một DNS duy nhất và load balancing cho các container đang chạy.

- Load balaning:
> Bạn có thể xuất các cổng trong node cho bộ cân bằng tải bên ngoài. Còn nội bộ, swarm cho phép bạn chỉ định cách phân phối request đến các containers trong các node.

- Bảo mật:
> Mỗi node trong cluster thực thi mã hóa và xác thực lẫn nhau bằng giao thức TLS để bảo mật thông tin liên lạc giữa chính nó và tất cả các node khác. Bạn có tùy chọn sử dụng chứng chỉ self-signed root hoặc chứng chỉ từ CA gốc tùy chỉnh.

- Cập nhật rollbackalble:
> Tại thời điểm giới thiệu, bạn có thể áp dụng các bản cập nhật service cho các node tăng dần. Trình quản lý swarm cho phép bạn kiểm soát độ trễ giữa triển khai dịch vụ đến các nhóm nút khác nhau. Nếu xảy ra lỗi, bạn có thể rollback phiên bản trước của dịch vụ.



Giới thiệu vậy đủ rồi, cùng bắt đầu tìm hiểu các bước triển khai Docker swarm nào!

Bài viết này mình sẽ demo cách deploy một ứng dụng Ruby on Rails lên Swarm manager.

Các bước triển khai ứng dụng trong bài viết này bao gồm:

1. Deploy database host
2. Khởi tạo cụm swarm gồm node manager và các node workers
3. Deploy Rails app lên manager và scaling app

### Một vài setup cần thiết:

- Install Docker machine:


```shell
base=https://github.com/docker/machine/releases/download/v0.16.0
curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine
sudo install /tmp/docker-machine /usr/local/bin/docker-machine
```
- Install Virtual box:

```shell
apt-get install virtualbox
docker-machine create --driver virtualbox default
```


### Deploy database host

Vì service mình sử dụng web app nên cần có host chạy database, mình sẽ chạy một swarm riêng để dùng làm host cho database.

Vì đặc thù của database là không phân tán nên chúng ta chỉ chạy một node trong swarm là node manager.

```shell
docker-machine create database
docker-machine ssh database
docker swarm init --advertise-addr <IP Machine database>
```
Khởi tạo machine thành công, hãy thoát ra máy local để tạo docker-compose.yml cho database.
```shell
mkdir database
cd database
nano docker-compose.yml
```

```yaml
version: "3"

services:
  db:
    image: "mysql:5.7"
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_PASSWORD: '<your setup password>'
      MYSQL_ROOT_PASSWORD: '<your setup password>'
    volumes:
      - /var/lib/mysql57-data:/var/lib/mysql
```

Tạo volumes cho mysql container sử dụng:

```shell
docker run -it -v /:/myroot mysql /bin/sh -c "mkdir -p /myroot/var/lib/mysql57-data/"
```

Để deploy cần copy file docker-compose.yml lên node database, sau đó ssh vào node để deploy service này.

```shell
docker-machine ssh database
mkdir app
exit
```
Copy file docker-compose.yml lên node database:

```shell
cd database
docker-machine scp docker-compose.yml database:~/app/
```
Deploy stack:
```shell
docker-machine ssh database
docker stack deploy -c ~/app/docker-compose.yml database-node
```

Kiểm tra node status bằng lệnh:

```shell
docker@database:~$ docker node ls
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
x3ryt93xvze76fh2b0c6x2fl6 *   database            Ready               Active              Leader              19.03.5

```

Xem service status

```shell
docker@database:~$ docker service ls                                                                                                          
ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
i9z2gjchszor        database-mysql_db   replicated          1/1                 mysql:5.7           *:3306->3306/tcp

docker@database:~$ docker service ps i9z2gjchszor --no-trunc                                                                                  
ID                          NAME                      IMAGE                                                                               NODE                DESIRED STATE       CURRENT STATE             ERROR                                                                                            PORTS
ruo8ysfdegbzc4qvdxsdonje1   database-mysql_db.1       mysql:5.7@sha256:5779c71a4730da36f013a23a437b5831198e68e634575f487d37a0639470e3a8   database            Running             Running 11 seconds ago                                                                                                     

```

### Khởi tạo cụm swarm gồm node manager và các node worker

![](https://images.viblo.asia/3ddf0984-8f46-4a57-b218-5e1cc7ed9006.jpg)

```shell
docker-machine create manager
docker-machine create worker1
docker-machine create worker2
docker-machine create worker3
```

Kiểm tra các machine được tạo:

```shell
chicken@chicken-Inspiron-3542:~/demo/demo_deploy/api$ docker-machine ls
NAME       ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
manager    -        virtualbox   Running   tcp://192.168.99.101:2376           v19.03.4   
worker1    -        virtualbox   Running   tcp://192.168.99.102:2376           v19.03.4   
worker2    -        virtualbox   Running   tcp://192.168.99.103:2376           v19.03.4   
worker3    -        virtualbox   Stopped                                       Unknown    
```

ssh vào host manager:


```
docker-machine ssh manager
```
Để khởi tạo swarm mode trên host này, chạy lệnh sau:


```
docker swarm init --advertise-addr <IP of Machine manager> 
```

Sau đó sinh token để các node khác tham gia vào swarm mode này:

```
docker swarm join-token worker
```

Sau đó lần lượt ssh vào các node worker còn lại để join vào swarm:

```shell
docker-machine ssh worker1
docker swarm join --token <token> <host>:<port>
```
Tương tự với worker2 và worker3

Kiểm tra lại các node trong swarm:

```shell
docker@manager:~/app$ docker node ls                                                                                                          
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
kpihuvdzsz4z79pp5hrr7n3jx *   manager             Ready               Active              Leader              19.03.4
ae13bxmfhtoye7k39gv8n5rgb     worker1             Ready               Active                                  19.03.4
9bbfcbg3a98lwkkwa5ib5r8c7     worker2             Ready               Active                                  19.03.4

```

Như vậy chúng ta đã khởi tạo thành công một node manager và 2 node worker cho 1 swarm.

Để triển khai ứng dụng của bạn lên swarm này, chúng ta cần chuẩn bị các service và deploy nó lên node manager.


### Deploy main app

Như vậy database đã chạy thành công, tiếp theo chúng ta sẽ triển khai ứng dụng ruby on rails lên swarm chính.

Hãy chuẩn bị một service cho ứng dụng của bạn, để có service chúng ta cần có file docker-compose.yml cũng như image của ứng dụng để khai báo trong file này.

Nếu các bạn chưa biết cách tạo image cho ứng dụng Rails thì có thể tham khảo bài viết này:
https://viblo.asia/p/dockerize-rails-app-using-docker-and-docker-compose-924lJW765PM

Ở demo này mình sử dụng một image Ruby on Rails app, và đã push nó lên docker hub.

```shell
mkdir web-app
cd web-app
nano docker-compose.yml
```

```yaml
version: "3"

services:
  api:
    image: uytran12/api-product:dev
    command: bash -c "rm -f tmp/pids/server.pid && bundle install && rake db:create db:migrate && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/usr/src/app
    build: .
    environment:
      MYSQL_HOST: '<your database node ip address>'
      # địa chỉ ip của node database đã deploy, dùng lệnh docker-machine ls để lấy ip
    ports:
      - "3000:3000"
    restart: always
    networks:
      - my-net
    deploy: 
      mode: replicated
networks: 
  my-net:
    driver: overlay
```

Để triển khai ứng dụng lên swarm này, chúng ta cần làm tương tự như với swarm cho database.

```shell
docker-machine ssh manager
mkdir app
exit
```

```shell
cd app
docker-machine scp docker-compose.yml manager:~/app/
docker-machine ssh manager
docker stack deploy -c ~/app/docker-compose.yml rails-app
```

Như vậy chúng ta đã triển khai thành công rails app lên node manager.

Chúng ta có thể scale ứng dụng lên nhiều node worker:

```shell
docker service scale rails-app_api=3
```

> Docker sẽ phân phối các bản replicas lên các node tham gia vào swarm bao gồm cả manager cũng như worker, trường hợp mà một trong số các replicas xảy ra sự cố, swarm manager sẽ khởi tạo thêm các replicas nhằm mục đích duy trì số lượng replicas đã được khai báo.

```shell
docker@manager:~/app$ docker service ls                                                                                                       
ID                  NAME                MODE                REPLICAS            IMAGE                      PORTS
sg59dyoj7fh6        rails-app_api       replicated          3/3                 uytran12/api-product:dev   *:3000->3000/tcp
```

Kiểm tra app đã chạy trên các ip của manager cũng như các workers

![](https://images.viblo.asia/c643901a-f0f6-4944-9262-7a5c662178b4.png)

![](https://images.viblo.asia/074fcd0a-00f0-4654-82ce-69e15cc6f257.png)

![](https://images.viblo.asia/06cae094-f918-415e-8429-4a8d8ef8e05b.png)

Như vậy ứng dụng của chúng ta đã được scale lên 3 node trong swarm. 


Cơ chế swarm load balancing cơ bản như sau:

Khi bạn truy cập cổng 8080 trên bất kỳ node nào, Docker định tuyến request của bạn đến một container đang hoạt động. Trên các node của swarm, lưới định tuyến biết cách điều hướng lưu lượng truy cập và ngăn chặn bất kỳ xung đột cổng nào xảy ra.


Trường hợp request đến ip của node bị sự cố, routing của swarm sẽ chuyển tiếp request đó đến swarm loadbalancer để phân bổ request đó đến các node khác trong mạng swarm.  Hình sau mô tả sơ đồ ingress network phân bổ các request.

![](https://images.viblo.asia/ae954e08-0311-4c50-88bc-45256e091519.png)


### Một vài lưu ý nếu quá trình triển khai bị lỗi:

- Lỗi certificate expired khi kiểm tra service list

```
Unable to query docker version: Get https://192.168.99.100:2376/v1.15/version: x509: certificate is valid for ...
```
Chạy lệnh

```
docker-machine regenerate-certs <node name>
```

- Lỗi unable to bind volume khi deploy stack:

```
"invalid mount config for type "bind": bind source path does not exist"
```

Chạy lệnh:
```shell
docker run -it -v /:/myroot <image>:<tag> /bin/sh -c "mkdir -p /myroot/<volumes of service>/"
```

### Kết
Như vậy mình vừa trình bày về Docker swarm và cách triển khai ứng dụng Ruby on Rails lên docker swarm để có thể scale và load balancing cho ứng dụng.

Nếu lúc chạy có lỗi hay còn thắc mắc gì hãy comment phía dưới nhé.

Cảm ơn mọi người đã theo dõi bài viết.