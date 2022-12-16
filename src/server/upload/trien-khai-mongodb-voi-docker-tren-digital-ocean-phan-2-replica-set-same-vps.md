# LỜI NÓI ĐẦU
Chào mọi người, sau quá trình làm việc và tích luỹ mình bắt đầu viết blog chia sẻ kiến thức và kinh nghiệm trong quá trình làm việc cá nhân mà mình gặp phải. Các bài viết của mình sẽ xoay quanh chủ đề liên quan đến các lĩnh vực **Backend, Blockchain** cũng như **DevOps**, hi vọng thông qua việc chia sẻ kiến thức mình cũng sẽ nhận về các ý kiến đóng góp để cải thiện kỹ năng và nâng cao trình độ trong lĩnh vực CNTT với lượng kiến thức rộng lớn của chúng ta hiện nay.

Trải qua khoảng thời gian chật vật để cấu hình **MongoDB** với **Docker** mình thực hiện chuỗi bài nhằm chia sẻ kiến thức và kinh nghiệm đến mọi người, để có thể hiểu nguyên lý cốt lõi cũng như dễ dàng vận dụng để thiết lập cơ sở dữ liệu khởi chạy trên các máy **VPS - Digital Ocean** cho các dự án của mình. Với loạt bài này mình dự định gửi đến 2 phần nội dung:
* **Phần 1 (Standalone)**: mình đã chia sẻ cách đây không lâu - giúp các bạn dễ dàng thiết lập một cơ sở dữ liệu MongoDB độc lập một cách cơ bản. 
* **Phần 2 (Replicate Set - same VPS)**: và đây chính là phần 2 - nhằm giúp mọi người có thể cấu hình một cụm MongoDB nằm trên cùng máy chủ VPS, nhằm đáp ứng các mục tiêu: *Chia tải* cho hệ thống và *Thử nghiệm tính năng Transaction MongoDB*.

Tuy nhiên, mình xin tách thêm 1 phần nữa, để nói chi tiết và rõ ràng hơn cấu hình cụm MongoDB trên nhiều máy chủ VPS khác nhau:
* **Phần 3 (Replicate Set - multi VPS)**: sẽ được tiếp tục chia sẻ trong thời gian tới - giúp mọi người có thể cấu hình một cụm MongoDB nằm trên nhiều máy chủ VPS, nhằm đáp ứng các mục tiêu: *Backup dữ liệu* và *Tăng tính sẵn sàng* cho hệ thống khi một máy chủ VPS gặp sự cố.

![image.png](https://images.viblo.asia/fc10eed3-4ae5-4fb9-9bbe-4e4c0b65b67e.png)

# GIỚI THIỆU

## MongoDB Replica Set
Replica Set MongoDB là một cụm services Mongo khác nhau chạy trên cùng một tập cơ sở dữ liệu (data set) và duy trì cơ sở dữ liệu đó đảm bảo tính bền vững và nhất quán. Với mô hình Replica Set, trong phạm vi bài viết này mình sẽ quan tâm đến hai khái niệm sau đây:
* **Transaction**: Nói một cách đơn giản và dễ hiểu, **Transaction là Giao dịch** :D Hãy thử hình dung, trong trường hợp bạn có một giao dịch chuyển tiền 50 USD từ tài khoản A, đến tài khoản B. Logic xảy ra ở đây phải đảm bảo được việc tài khoản B được cộng 50 USD và tài khoản A bị trừ 50 USD. Và Transaction chính là toán tử được MongoDB xây dựng để đảm bảo tính ACID của dữ liệu, cũng như mối quan hệ chặt chẽ giữa nhiều document khác nhau.
* **CQRS**: Design Pattern tách biệt việc đọc ghi vào bên trong cơ sở dữ liệu. Nhằm *chia tải* và *cải thiện performance* cho quá trình tương tác dữ liệu. 

![image.png](https://images.viblo.asia/357c0ec4-5852-403b-a149-7447132a800b.png)

Cấu trúc một Replica Set cơ bản bao gồm một số node, trong đó một node đóng vai trò Master, và các node khác đóng vai trò Secondary. Khi Master down thì một node Secondary khác sẽ được promote lên làm vai trò Master.

## Tại sao chạy Replica Set MongoDB với Docker Container?

Việc khởi chạy mô hình Replica Set MongoDB bên trong Container Docker mang lại các lợi ích cho việc bảo trì, backup và mở rộng cơ sở dữ liệu một cách dễ dàng và nhanh chóng.

![image.png](https://images.viblo.asia/1f482352-a830-4555-86c1-717d4aee34e8.png)

## Cốt lõi của quá trình thiết lập Replica Set MongoDB trong Docker?

Tiếp tục, chuỗi series từ phần 1, mình đã cung cấp cho mọi người phương thức khởi chạy một MongoDB Standalone bên trong Docker Container. Với phần 2 này, nhiệm vụ của chúng ta là làm sao để các Mongo Container đó có thể *ping* được đến nhau và cùng join vào 1 cụm Replica Set. 

Trước khi bắt đầu, mình sẽ trình bày mindset để mọi người hiểu rõ và hình dung các bước cơ bản cần thực hiện của quá trình thiết lập. Từ đó dễ dàng áp dụng và thay đổi các cấu hình tuỳ biến phù hợp với ứng dụng của mình. Bắt đầu từ mục tiêu ban đầu, chúng ta cần 2 yếu tố để các service MongoDB có thể join vào cùng Replica Set:

* Cùng chia sẻ 1 key chung để xác thực.
* Cùng chung một mạng, có thể nhìn thấy nhau và *ping* đến nhau.

Từ 2 yếu tố trên, mình sẽ hướng dẫn kết nối để thiết lập một Replica Set cơ bản bao gồm 2 node: 1 Master - 1 Slave.

Với Docker Container, 2 yếu tố cần và đủ trên sẽ được mình triển khai qua 2 phương thức sau đây:

* Custom 1 base Image chứa file key xác thực. Các container service MongoDB sẽ được build từ cùng base Image này.
* Cấu hình một subnet để kết nối 2 container có thể *ping* được cho nhau.

Toàn bộ quá trình sẽ được hướng dẫn chi tiết trong phần Tutorials dưới đây.

# Tutorials:

Tutorials bắt đầu với một node Master. Các node Secondary hoặc Arbitor, có thể triển khai tương tự một cách dễ dàng.

## Step 1: Tạo folder setup trên VPS

Cấu trúc folder bao gồm:
* Thư mục rỗng */data* (vùng chứa dữ liệu mount từ trong Docker Container ra ngoài máy chủ VPS - tránh mất dữ liệu khi restart Docker Container)
* Thư mục rỗng */log* (vùng chứa log mount từ Docker Container ra ngoài máy chủ VPS)
* Thư mục */config*: (chứa file mongod.conf)
    - File: mongod.conf (tệp cấu hình MongoDB)
    - FIle: secret.kf (key xác thực)
* File *docker-compose.yaml* (tệp cấu hình MongoDB với Docker Container)

## Step 2: Tạo Dockerfile custom base Image

Tiến hành custom lại baseImage (từ image: mongo:5.0.6) - cấp quyền keyFile cho user mongodb (bên trong Container).
```
FROM mongo:5.0.6

RUN mkdir -p /var/log/mongodb && \
 touch /var/log/mongodb/mongod.log && \
 chown mongodb:mongodb -R /var/log/mongodb && \
 touch /etc/secret.kf && \
 chmod 400 /etc/secret.kf && \
 chown mongodb:mongodb /etc/secret.kf 

CMD ["mongod"]
```

## Step 3: Tạo key chung xác thực

```
openssl rand -base64 768 > secret.kf
```

## Step 4: Cấu hình MongoDB
Thông thường, file config mặc định sẽ nằm trong /etc/mongodb/mongod.conf. Với việc khởi tạo nội dung file mongod.conf và mount vào trong Docker Container, ta sẽ tiến hành thay đổi một số thông số so với file default bao gồm:
* Thiết lập auhor: tăng cường bảo mật cho DB
* Thiết lập authen: keyFile: /etc/secret.kf
* Thiết lập IP cho phép call từ: anywhere (0.0.0.0) - thay vì local:127.0.0.1 (nhằm tạo kết nối trực tiếp từ bên ngoài đến Container)
* Thiết lập ReplicaSet: chỉ định tên Replica Set
```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Where and how to store data.
storage:
  dbPath: /data/db
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# how the process runs
processManagement:
 # fork: true  # fork and run in background
 # pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.


security:
  authorization: "enabled"
  keyFile: /etc/secret.kf
#operationProfiling:

replication:
  replSetName: "marketplace_nft"
#sharding:

## Enterprise-Only Options

#auditLog:

#snmp:
```

## Step 5: Tạo một subnet
Subnet được tạo có dãy IP *10.5.0.0*
``` 
docker network create --subnet 10.5.0.0/24 marketplace
```

## Step 6: Cấu hình file Docker-compose.yaml
Chúng ta cần mount các thông tin cần thiết vào Container trước khi khởi chạy nên cần thông qua một file Docker-compose.yaml cung cấp các cấu hình nâng cao cho Docker Container.

Đồng thời, ở quá trình này tiến hành chỉ định địa chỉ IP *10.5.0.11* cho service MongoDB chạy trong Docker. Việc này sẽ giúp ích cho việc định danh các node Master - Slave trong mô hình ReplicaSet - đặc biệt là khi Docker Container restart thì **IP luôn thay đổi**.
```
version: "3.9"
services:
  mongodb:
    image: mongodb_local:latest
    container_name: mongodb_01
    ports:
      - "27019:27017"
    networks:
      outer:
        ipv4_address: "10.5.0.11"
    env_file:
      - .env
    volumes:
      - ./mongodb_configuration/:/docker-entrypoint-initdb.d/:ro
      - ./mongodb_configuration/init-mongodb.sh:/docker-entrypoint-initdb.d/init-mongodb.sh:ro
      - "./config/mongod.conf:/data/configdb/mongod.conf:ro"
      - "./config/secret.kf:/etc/secret.kf:ro"
      - "./data:/data/db"
      - "log:/var/log/mongodb"
    command: ["/usr/bin/mongod", "-f", "/data/configdb/mongod.conf"]
    restart: always
volumes:
  log: null
networks:
  outer:
    external:
      name: marketplace
```
Các thông số cần quan tâm trong docker-compose file bao gồm: 
* image: chỉ định base image để build container
* container_name: tên container khởi chạy
* ports: mapping port từ bên ngoài vào bên trong Docker container (hạn chế dùng port mặc định để giảm thiểu các cuộc tấn công)
* networks: chỉ định mạng subnet và binding static IP 10.5.0.11 cho Container service.
* volumes: mount data giữa VPS và Container
* command: lệnh khởi chạy tự động khi bắt đầu start Container 
* restart: lệnh yêu cầu services luôn tái khởi động khi down - tăng tính sẵn sàng.

## Step 7: Build và Start Docker Container
Chạy lệnh sau để thiết lập MongoDb bên trong Docker Container với các config đã thiết lập bên trên

``` docker-compose up -d --build --force-recreate ```

## Step 8: Kiểm tra Container đang chạy
``` docker ps ```

## Step 9: Exec vào bên trong Container 
``` docker exec -it container_id bash ```

## Step 10: Tiến hành thiết lập Database Standalone
* Truy cập Mongo:
``` mongo ```
* Thiết lập user Admin:
```use admin```

``` 
db.createUser({ 
    user: "superadmin",
    pwd: "hjwbtg4nkjgnbdsg534536rtfbvgdg",
    roles: [{
    role: "root",
    db: "admin"
    }]
}) 
```

* Thiết lập user readWrite:

``` 
db.createUser({ 
    user: "anhkolamgidauanhthe",
    pwd: "kjghjewht4t643yghbvf54egdsgds",
    roles: [{
    role: "readWrite",
    db: "database_test"
    }]
}) 
```

## Step 11: Lặp lại các bước để tạo Secondary node
Lưu ý chỉ định IP cho Secondary trong dãy IP subnet đã khởi tạo và khác IP với Master.

## Step 12: Cấu hình Replica Set

* Exec vào Master
```docker exec -it container_id bash```
* Truy cập Mongo:
``` mongo ```
* Xác thực user Admin:
```db.auth("superadmin","hjwbtg4nkjgnbdsg534536rtfbvgdg")```

* Tiến hành cấu hình Replica Set:
Quá trình này, tiến hành binding IP Master và add IP Secondary

```
rs.initial()

cf = rs.conf()

cf.members[0].host = "10.5.0.11:27017"

rs.reconfig(cf)

rs.add(10.5.0.12:27017)
```

## Step 13: Mở tường lửa trên máy chủ VPS
``` sudo ufw allow 27016 ```

## Step 14: Tiến hành kết nối đến URL Connection
Cuối cùng chúng tả có thể dễ dàng kết nối và tương tác với MongoDb thông qua URL Connection
```mongodb://anhkolamgidauanhthe:kjghjewht4t643yghbvf54egdsgds@IP_VPS:27016/database_test?authSource=admin```

## Step 15: Để lại 1 like và 1 follow cho mềnh ^^

# LỜI KẾT

Bài viết đã giới thiệu đến các bạn các kiến thức và hướng dẫn cần thiết để giúp mọi người có thể dễ dàng thiết lập ReplicaSet mongoDB chạy trong Docker Container trên cùng 1 máy chủ VPS. Nội dung đã mang đến bao gồm:
* Các khái niệm: ReplicaSet MongoDB, Docker
* Mindset vấn đề: được cô đọng và truyền tải đơn giản, dễ hiểu bản chất của vấn đề giải quyết
* Cách triển khai: được hướng dẫn chi tiết thông qua Tutorials
* Các kinh nghiệm cá nhân: đã được mình truyền tải lồng ghép xuyên suốt bài viết

Hi vọng có thể nhận được các ý kiến đóng góp và hẹn gặp lại mọi người vào Phần 3 (Replicate Set - multi VPS) của loạt bài này trong tương lai với nhiều config ảo ma hơn :)))