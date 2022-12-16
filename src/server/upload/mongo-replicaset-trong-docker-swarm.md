Chào các bạn, Trong bài viết trước mình đã hướng dẫn 1 cách dễ nhất để triển khai Mongo Replicaset với Docker. Các bạn có thể xem lại bài viết ở https://viblo.asia/p/trien-khai-replication-trong-mongodb-voi-docker-gDVK2rEXKLj .
Tuy nhiên trong thực tế 1 dự án với Mongo Replicaset chúng ta sẽ cần nhiều hơn thế, Với việc Docker Swarm hay kubernetes ngày càng được triển khai rộng rãi thì việc deploy các dự án trở nên dễ dàng hơn với các devOps. Trong khuôn khổ bài viết này mình sẽ trình bày một ví dụ cơ bản để triển khai Mongo Replicaset sử dụng Docker Swarm. Nếu bạn có bất cứ thắc mắc gì về những kiến thức liên quan có thể cmt dưới bài viết, mình sẽ cố gắng giải đáp một cách nhanh nhất. 
Để bắt đầu một cách tốt nhất chúng ta hãy đọc qua về Deploy, Docker Swarm, Mongo,  .Còn bây giờ bắt đầu thôi !!!
![image.png](https://images.viblo.asia/dc7d2bb5-a9ba-402a-af5c-9395803fc7ba.png)
Ở bài trước mình đã triển khai container bằng việc tạo thủ công nên hôm nay chúng ta sẽ sử dụng luôn với file docker-compose.yml 
Ở đây mình sẽ triển khai trên 2 máy ảo Vmware với địa chỉ ip lần lượt là **vps1: 192.168.233.143** và  **vps2: 192.168.233.144**
# 1. Thiết lập Docker Swarm
![image.png](https://images.viblo.asia/5442202e-da86-4eeb-b5e5-a388f09bc298.png)
   Login vào máy vps1. Thiết lập docker swarm bằng lệnh:
   `docker swarm init --advertise-addr=192.168.233.143`
    Đây chính là địa chỉ ip của vps1. sau khi lệnh được chạy docker swarm sẽ trả cho ta 1 lệnh bao gồm token để các máy thành viên có thể tham gia vào swarm được tạo
    
```
Swarm initialized: current node (sfysjr8wstldv2wrmgqcrpozt) is now a manager.

To add a worker to this swarm, run the following command:

docker swarm join --token SWMTKN-1-55dzaz2ijle1dhivalkl5cnwhoadp6h8ae0p7fhjsakmanvkpbi3l-5ib6sjrd3w0wdhfsnt8g8jhdgf 192.168.233.143:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

sử dụng đoạn mã  
`docker swarm join --token SWMTKN-1-55dzaz2ijle1dhivalkl5cnwhoadp6h8ae0p7fhjsakmanvkpbi3l-5ib6sjrd3w0wdhfsnt8g8jhdgf 192.168.233.143:2377` 
vừa được cung cấp để chạy một máy khác xin gia nhập vào swarm
Login vào vps2, chạy đoạn mã trên. Sau đó quay lại vps1 kiểm tra xem swarm đã add được node thành công chưa
```
root@vps1-vmwarevirtualplatform:/home/vps1# docker node ls
ID                            HOSTNAME                     STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
wigqau5pl65hke8w77evmw7hx *   vps1-vmwarevirtualplatform   Ready     Active         Leader           20.10.17
ulx7xkl5ovpk2bl1navo205g0     vps2-vmwarevirtualplatform   Ready     Active                          20.10.11
```
 Như vậy là swarm đã có 2 node chính là 2 máy vps1 và vps2, dưới sự quản lí của máy vps1 làm node Leader
 Bây giờ ta sẽ đi triển khai Mongo Replicaset trên swarm vừa được tạo này
 
# 2. Start mongo replicaset trong Docker Swarm
Login vào vps1
lần lượt chạy các lệnh sau để đánh label cho 2 máy vps1 và vps2 ( các thao tác chạy trên node Leader):

`docker node update --label-add mongo.replica = 1 wig`

wig là id của máy vps1, tương tự ta đánh label cho vps2

`docker node update --label-add mongo.replica = 2 ulx`

Tiếp theo, Mình tạo 1 file **docker-compose.yml**
```
version: '3.7'
services:
  mongo-rs0-1:
    image: "mongo:4.2"
    command: mongod --replSet rs0
    ports:
      - "27018:27017"
    volumes:
      - ./mongo-rs0-1/data:/data/db
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.labels.mongo.replica == 1

  mongo-rs0-2:
    image: "mongo:4.2"
    command: mongod --replSet rs0
    ports:
      - "27019:27017"
    volumes:
      - ./mongo-rs0-2/data:/data/db
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.labels.mongo.replica == 1

  mongo-rs0-3:
    image: "mongo:4.2"
    command: mongod --replSet rs0
    ports:
      - "27020:27017"
    volumes:
      - /data/mongo-rs0-3/data:/data/db
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.labels.mongo.replica == 2

  setup-rs:
    image: "anhtdq/setupmongorep:latest"
    deploy:
      placement:
        constraints:
          - node.labels.mongo.replica == 1
```

Chúng ta đặt các thông số như với các file docker-compose bình thường. Nếu có thời gian mình sẽ làm 1 bài về các thông số trong DockerFile cũng như docker-compose. Ở đây chúng ta để ý đến trường deploy.
    - replicas: Số container chạy cho service
    - placement.constraints: Chị định vị trí chạy của service, trong đây ta sẽ hạn chế cho service được chạy trong máy cụ thể (vps1 hoặc vps2 đã được đánh label từ trước)
 với file docker-compose này sẽ tạo ra 3 service chạy mongo  với tùy chọn replica set. 2 serverce mongo-rs0-1, mongo-rs0-2 chạy ở máy vps1 và mongo-rs0-3 chạy ở máy vps2
 - image anhtdq/setupmongorep:latest là image on dockerhub mình viết setup tự động đăng kí member cho mongo chạy ở replicaset
Nếu không thêm service này, các bạn có thể hoàn toàn vào từng container sau khi được tạo để setup member replicaset cho mongo như bài viết trước mình đã hướng dẫn.

cd vào thư mục chưa docker-compose.yml và hãy nhớ tạo các thư mục để ánh xạ dữ liệu trong volumes.
Chạy lệnh:

`docker stack deploy -c docker-compose.yml mongostack`

để start stack mongo
Sẽ mất một chút thời gian để docker tải các image từ docker hub và thiết lập
Kiểm tra thiết lập
```
root@vps1-vmwarevirtualplatform:/home/vps1# docker stack ls
NAME         SERVICES   ORCHESTRATOR
mongostack   4          Swarm
```

```
root@vps1-vmwarevirtualplatform:/home/vps1# docker stack services mongostack
ID             NAME                     MODE         REPLICAS   IMAGE                         PORTS
kbhwg0fce6k6   mongostack_mongo-rs0-1   replicated   1/1        mongo:4.2                     *:27018->27017/tcp
18kfdlzrp7yq   mongostack_mongo-rs0-2   replicated   1/1        mongo:4.2                     *:27019->27017/tcp
u5q3grhg8im7   mongostack_mongo-rs0-3   replicated   1/1        mongo:4.2                     *:27020->27017/tcp
zcu69rcsv4te   mongostack_setup-rs      replicated   1/1        anhtdq/setupmongorep:latest  
```

Vậy là cả 4 service đều đã chạy. Ta kiểm tra cá container đang chạy trên máy vps1.
```
root@vps1-vmwarevirtualplatform:/home/vps1# docker ps
CONTAINER ID   IMAGE                         COMMAND                  CREATED          STATUS          PORTS       NAMES
97772a47c366   anhtdq/setupmongorep:latest   "/bin/bash ./setup.sh"   26 seconds ago   Up 20 seconds   27017/tcp   mongostack_setup-rs.1.l3dhcwxy1yl6ngfo2fsnkhg61
72b4f9fe98c5   mongo:4.2                     "docker-entrypoint.s…"   4 minutes ago    Up 4 minutes    27017/tcp   mongostack_mongo-rs0-2.1.yee1s4l1mot8l7af409tgd3x6
372959ee55bd   mongo:4.2                     "docker-entrypoint.s…"   5 minutes ago    Up 5 minutes    27017/tcp   mongostack_mongo-rs0-1.1.n8aezi4vzs8o5w0dm7zgx4jw0
```
tương tự với ta đăng nhập vào máy vps2 để kiểm tra
```
root@vps2-vmwarevirtualplatform:/home/vps2# docker ps
CONTAINER ID   IMAGE       COMMAND                  CREATED         STATUS         PORTS       NAMES
801b6951d85d   mongo:4.2   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   27017/tcp   mongostack_mongo-rs0-3.1.gv3q9ti4dcshv88ae6fmahjek
```
3 container chạy mongo với 2 container chạy trên máy vps1 và 1 container chạy trên máy vps2
Trở về máy 1, kiểm tra xem mongo đã được config menber chưa. Vào container đang chạy service mongo-rs0-1 bằng lệnh

`docker exec -it 72b bash`

(72b là các số đầu id của container ta muốn vào) và sau đó connect shell tới mongo
```
root@vps1-vmwarevirtualplatform:/home/vps1# docker exec -it 72b bash
root@72b4f9fe98c5:/# mongo
MongoDB shell version v4.2.20
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f4f81ed2-e3a3-411a-8d6f-9cba4366d40d") }
MongoDB server version: 4.2.20
Server has startup warnings: 
2022-06-10T07:25:19.957+0000 I  STORAGE  [initandlisten] 
2022-06-10T07:25:19.957+0000 I  STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2022-06-10T07:25:19.957+0000 I  STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2022-06-10T07:25:21.078+0000 I  CONTROL  [initandlisten] 
2022-06-10T07:25:21.078+0000 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2022-06-10T07:25:21.078+0000 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2022-06-10T07:25:21.078+0000 I  CONTROL  [initandlisten] 
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).

The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

rs0:PRIMARY> 
```
Như vậy ta đa thấy rs0 đã đc config thành primary trong mongo replicat. Ta sẽ chạy rs.config() để kiểm tra các member

```
"members" : [
        {
                "_id" : 0,
                "host" : "mongo-rs0-1:27017",
                "arbiterOnly" : false,
                "buildIndexes" : true,
                "hidden" : false,
                "priority" : 1,
                "tags" : {

                },
                "slaveDelay" : NumberLong(0),
                "votes" : 1
        },
        {
                "_id" : 1,
                "host" : "mongo-rs0-2:27017",
                "arbiterOnly" : false,
                "buildIndexes" : true,
                "hidden" : false,
                "priority" : 1,
                "tags" : {

                },
                "slaveDelay" : NumberLong(0),
                "votes" : 1
        },
        {
                "_id" : 2,
                "host" : "mongo-rs0-3:27017",
                "arbiterOnly" : false,
                "buildIndexes" : true,
                "hidden" : false,
                "priority" : 1,
                "tags" : {

                },
                "slaveDelay" : NumberLong(0),
                "votes" : 1
        }
],

```
Ok Ngon rồi =)))
Như vậy ta vừa triển khai  Mongo Replicaset  có 3 member chạy trên 2 máy khác nhau. Việc sử dụng Docker Swarm hay kubernetes làm cho việc chuyển đổi dự  phòng trên Mongo càng được cải thiện hơn với việc các container được đảm bảo liên tục, chứ chết thì nó nắm cổ lên chạy lại.
# P/s 
 - Đây chỉ là những tìm hiểu của mình trong quá trình tìm tòi để triển khai dự án sắp tới. Tuy nó chưa đầy đủ nhưng hoàn toàn có thể áp dụng vào 1 dự án thật. Tất nhiên trong dự án thật chúng ta sẽ cần thêm các yếu tố bảo mật với mongo-repset hay network với docker
 - Chúng ta hoàn toàn có thêm 1 service nhỏ để test chạy như 1 dự án thực tế bao gồm mongo + server ( Mình có một nodejs app nhỏ trên docker hub với image anhtdq/webtest các bạn có thể pull về để thêm vào)
 - User Docker everywhere =)))