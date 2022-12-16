# LỜI NÓI ĐẦU
Chào mọi người, đây là bài viết đầu tiên cũng như bắt đầu cho chuỗi bài chia sẻ kiến thức và kinh nghiệm trong quá trình làm việc cá nhân mà mình gặp phải trong suốt khoảng thời gian vừa qua. Các bài viết sắp tới của mình sẽ xoay quanh chủ đề liên quan đến các lĩnh vực **Backend, Blockchain** cũng như **DevOps**, hi vọng thông qua việc chia sẻ kiến thức mình cũng sẽ nhận về các ý kiến đóng góp để cải thiện kỹ năng và nâng cao trình độ trong lĩnh vực CNTT với lượng kiến thức rộng lớn của chúng ta hiện nay.

Trải qua khoảng thời gian chật vật để cấu hình **MongoDB** với **Docker** mình xin bắt đầu chia sẻ chuỗi bài nhằm chia sẻ kiến thức và kinh nghiệm đến mọi người, để có thể hiểu nguyên lý cốt lõi cũng như dễ dàng vận dụng để thiết lập cơ sở dữ liệu khởi chạy trên các máy **VPS - Digital Ocean** cho các dự án của mình. Với loạt bài này mình xin gửi đến 2 phần nội dung:
* **Phần 1 (Standalone)**: giúp các bạn dễ dàng thiết lập một cơ sở dữ liệu MongoDB độc lập một cách cơ bản. 
* **Phần 2 (Replicate Set)**: sẽ được mình gửi đến trong thời gian sắp tới - nhằm giúp mọi người có thể cấu hình một cụm MongoDB nhằm đáp ứng các mục tiêu: *Backup dữ liệu* và *Tăng tính sẵn sàng* cho hệ thống.

![image.png](https://images.viblo.asia/fc10eed3-4ae5-4fb9-9bbe-4e4c0b65b67e.png)

# GIỚI THIỆU

## MongoDB
MongoDB là một cơ sở dữ liệu nổi tiếng và được ưa chuộng sử dụng rộng rãi hiện nay thuộc nhóm cơ sở dữ liệu NoSQL. Với các đặc tính nổi bật, giúp các nhà phát triển dễ dàng tiếp cận, triển khai và mở rộng hệ thống của mình trên cơ sở dữ liệu một cách nhanh chóng và dễ dàng:
* **Flexibility**: cấu trúc dữ liệu linh hoạt, không ràng buộc cứng các fields dữ liệu từ đầu.
* **Scalability**: dễ dàng mở rộng theo chiều ngang.
* **Querying**: hỗ trợ query nhanh vì tiêu giảm bớt các mối quan hệ ràng buộc cũng như cơ chế caching.
* **Indexed**: hỗ trợ bộ Index xử lý đa dạng cho các nhu cầu khác nhau. 

## Docker

Docker Container là một đơn vị ảo cô lập và nhất quán để chạy ứng dụng và tất cả các cấu hình phụ thuộc cần thiết. Hãy tưởng tượng một tệp zip lớn sẽ bao gồm mọi thứ cần thiết để chạy ứng dụng của bạn trên bất kỳ hệ điều hành hoặc phần cứng nào. Docker là một công cụ để khởi chạy các vùng chứa đó.

![image.png](https://images.viblo.asia/1f482352-a830-4555-86c1-717d4aee34e8.png)

Từ đó, chúng ta có thể nhận thấy các lợi ích tuyệt vời của việc sử dụng Docker:
* **Consistency (Tính nhất quán):** bằng cách sử dụng công nghệ Container, bạn có thể đảm bảo rằng mọi người trong nhóm của bạn sử dụng các cấu hình và thời gian chạy giống hệt nhau. Bạn cũng giảm thiểu đáng kể sai sót khi triển khai vì môi trường Production sẽ phù hợp với môi trường Staging của bạn.
* **Lightweight (Trọng lượng nhẹ):** Docker container khởi động nhanh và tiêu tốn tài nguyên ít hơn rất nhiều so với máy ảo.
* **Ephemeral (Không bền vững):** Mọi thay đổi trong hệ thống tệp vùng chứa sẽ bị hủy khi kết thúc. Sự không bền vững này đảm bảo một môi trường trong sạch ở mọi sự khởi chạy ứng dụng.

## MongDB run in Docker Container?

Với việc ngầm xem Docker Container như một máy chủ vật lý VPS thông thường, chúng ta hoàn toàn có thể triển khai bất kỳ dịch vụ hay ứng dụng nào lên Container và MongoDB cũng không ngoại lệ. Với việc sử dụng sẵn các Base Imgae trên **Docker Hub**, được cộng đồng maintain và phát triển hoặc tự custom lại cho mình một Image mới với các config tuỳ chỉnh. Với các loại Image mongodb này chúng ta sẽ triển khai một Container Docker được build dựa trên Imgae MongoDB  thông qua một file config được gọi là **docker-compose.yaml**

# Tutorials

## Step 1: Tạo folder setup trên VPS

Cấu trúc folder bao gồm:
* Thư mục rỗng */data* (vùng chứa dữ liệu mount từ trong Docker Container ra ngoài máy chủ VPS - tránh mất dữ liệu khi restart Docker Container)
* Thư mục rỗng */log* (vùng chứa log mount từ Docker Container ra ngoài máy chủ VPS)
* Thư mục */config*: (chứa file mongod.conf)
    - File: mongod.conf (tệp cấu hình MongoDB)
* File *docker-compose.yaml* (tệp cấu hình MongoDB với Docker Container)

## Step 2: Cấu hình MongoDB
Thông thường, file config mặc định sẽ nằm trong /etc/mongodb/mongod.conf. Với việc khởi tạo nội dung file mongod.conf và mount vào trong Docker Container, ta sẽ tiến hành thay đổi một số thông số so với file default bao gồm:
* Thiết lập author: tăng cường bảo mật cho DB
* Thiết lập IP cho phép call từ: anywhere (0.0.0.0) - thay vì local:127.0.0.1 (nhằm tạo kết nối trực tiếp từ bên ngoài đến Container)
```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

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
#  engine:
#  wiredTiger:

# how the process runs
processManagement:
 # fork: true  # fork and run in background
 # pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.


security:
 authorization: "enabled"
 # keyFile: /etc/secret.kf
#operationProfiling:

#replication:
 # replSetName: "marketplace_nft"
#sharding:

## Enterprise-Only Options

#auditLog:

#snmp:
```

## Step 3: Cấu hình file Docker-compose.yaml
Chúng ta cần mount các thông tin cần thiết vào Container trước khi khởi chạy nên cần thông qua một file Docker-compose.yaml cung cấp các cấu hình nâng cao cho Docker Container.
```
version: "3.9"
services:
  mongodb:
    image: mongo:5.0.6
    container_name: gateway_MBCtest_DB
    ports:
      - "27016:27017"
    volumes:
      - "./config/mongod.conf:/data/configdb/mongod.conf:ro"
      - "./data:/data/db"
      - "log:/var/log/mongodb"
    command: ["/usr/bin/mongod", "-f", "/data/configdb/mongod.conf"]
    restart: always
volumes:
  log: null
```
Các thông số cần quan tâm trong docker-compose file bao gồm: 
* image: chỉ định base image để build container
* container_name: tên container khởi chạy
* ports: mapping port từ bên ngoài vào bên trong Docker container (hạn chế dùng port mặc định để giảm thiểu các cuộc tấn công)
* volumes: mount data giữa VPS và Container
* command: lệnh khởi chạy tự động khi bắt đầu start Container 
* restart: lệnh yêu cầu services luôn tái khởi động khi down - tăng tính sẵn sàng.

## Step 4: Build và Start Docker Container
Chạy lệnh sau để thiết lập MongoDb bên trong Docker Container với các config đã thiết lập bên trên

``` docker-compose up -d --build --force-recreate ```

## Step 5: Kiểm tra Container đang chạy
``` docker ps ```

## Step 6: Exec vào bên trong Container 
``` docker exec -it container_id bash ```

## Step 7: Tiến hành thiết lập Database
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

* Thiết lập user Admin:

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

## Step 8: Mở tường lửa trên máy chủ VPS
``` sudo ufw allow 27016 ```

## Step 9: Tiến hành kết nối đến URL Connection
Cuối cùng chúng tả có thể dễ dàng kết nối và tương tác với MongoDb thông qua URL Connection
```mongodb://anhkolamgidauanhthe:kjghjewht4t643yghbvf54egdsgds@IP_VPS:27016/database_test?authSource=admin```

## Step 10: Để lại 1 like và 1 follow cho mềnh ^^

# LỜI KẾT

Bài viết đã giới thiệu đến các bạn các kiến thức và hướng dẫn cần thiết để giúp mọi người có thể dễ dàng thiết lập mongoDB chạy trong Docker Container. Nội dung đã mang đến bao gồm:
* Các khái niệm: MongoDB, Docker
* Cách triển khai: được hướng dẫn chi tiết thông qua Tutorials
* Các kinh nghiệm cá nhân: đã được mình truyền tải lồng ghép xuyên suốt bài viết

Hi vọng có thể nhận được các ý kiến đóng góp và hẹn gặp lại mọi người vào Phần 2 (Replicate Set) của loạt bài này trong tương lai :)))