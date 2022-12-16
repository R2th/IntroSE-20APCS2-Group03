![](https://images.viblo.asia/c639a790-89cb-41a5-969e-b4796a86e085.png)

Khả năng mở rộng là một đặc điểm của một hệ thống thể hiện khả năng chịu tải dưới một khối lượng công việc đáng kể. Một hệ thống tốt là hệ thống có khả năng duy trì và tăng cường mức độ hoạt động của nó tùy theo nhu cầu mở rộng.

MongoDB hỗ trợ mở rộng theo chiều ngang (horizontal scaling) thông qua Sharding, phân phối dữ liệu thông qua nhiều máy chủ và tạo điều kiện cho các hoạt động đọc ghi với các bộ dữ liệu lớn. 

Cùng tìm hiểu xem cài đặt một hệ thống MongoDB có khả năng chịu tải xem như thế nào nhé!

Nhìn vào hình trên thì có 3 thành phần chính:
- Shard: Một shard chứa một tập nhỏ các data đã được sharded
- MongoS: Thực chất đây là một Query Router tương tác giữa ứng dụng và Sharded Cluster
- Config Servers: Lưu trữ metadata và cấu hình cài đặt cho Cluster

Bài viết sẽ setup Sharded Cluster bao gồm 2 shard, mỗi shard sẽ gồm 1 Master và 1 Replica, 1 Config Server và 1 Router Server. 

![](https://images.viblo.asia/e8053281-6af6-468e-a25b-8aea2a027b55.png)


### 1. Tạo thư mục chứa data

Tạo thư mục data

```
$ mkdir data
```
    
Tạo các thư mục con chứa data trong thư mục `data` gồm các thư mục cho các MongoD, cổng 27030, 27031, 27032, 27033
```
$ cd data/
$ mkdir mongod.data.27030 mongod.data.27031 mongod.data.27032 mongod.data.27033
```

Tạo thư mục cho MongoC, cổng 27040
```
$ mkdir mongoc.data.27040
```
    
### 2. Tạo thư mục chứa configs

Tạo thư mục `configs` cùng cấp với thư mục `data`
    
```
$ mkdir configs
```
    
Tạo các thư mục con chứa configs trong thư mục `configs` vừa tạo 
```
$ cd configs/
```

2.1 Tạo config cho MongoD
```
$ touch mongod.conf.27030 mongod.conf.27031 mongod.conf.27032 mongod.conf.27033
```

2.2 Tạo config cho MongoC
```
$ touch mongoc.conf.27040
```

2.3 Tạo config cho MongoS
```
$ touch mongos.conf.27050
```

### 3. Setup cụm Replica

#### 3.1 Tạo cụm replica set cho `rs0`
- Chạy mongod với port 27030

Sửa lại nội dung file config `mongod.conf.27030`

```
storage:
  dbPath: /your_path/data/mongod.data.27030
sharding:
  clusterRole: shardsvr
replication:
  replSetName: rs0 # Đối với port 27030 với 27031 thì giá trị sẽ là rs0 vì chúng là 1 cụm
net:
  bindIp: 127.0.0.1 # Do đang setup ở local nên host sẽ là 127.0.0.1, nếu triển khai trên nhiều servers cần điền địa chỉ private IP vào
  port: 27030 # Port để chạy MongoD
```
      
Chạy mongod
```
$ mongod --config /your_path/configs/mongod.conf.27030
```
      
      
- Chạy mongod với port 27031

Sửa lại nội dung file config `mongod.conf.27031`

```
storage:
  dbPath: /your_path/data/mongod.data.27031
sharding:
  clusterRole: shardsvr
replication:
  replSetName: rs0
net:
  bindIp: 127.0.0.1
  port: 27031
```
      
Chạy mongod
```
$ mongod --config /your_path/configs/mongod.conf.27031
```
      
Kết nối vào MongoD port 27030 (chỉ định làm master)

```
$ mongo --port 27030 
rs.initiate({ _id: "rs0", members: [ { _id: 0, host: "localhost:27030" }]})
rs.add("localhost:27031") # Thêm MongoD port 27031 vào cùng một cụm rs0
```

![](https://images.viblo.asia/8615eff4-84fa-4f5c-a9b4-29b674e0d974.png)

![](https://images.viblo.asia/fa9ea698-cab6-4588-9a91-133394583325.png)
      
#### 3.2 Tạo cụm replica set cho `rs1`
- Chạy mongod với port 27032

Sửa lại nội dung file config `mongod.conf.27032`

```
storage:
  dbPath: /your_path/data/mongod.data.27032
sharding:
  clusterRole: shardsvr
replication:
  replSetName: rs1
net:
  bindIp: 127.0.0.1
  port: 27032
```

Chạy mongod
```
$ mongod --config /your_path/configs/mongod.conf.27032
```

- Chạy mongod với port 27033

Sửa lại nội dung file config `mongod.conf.27033`

```
storage:
  dbPath: /your_path/data/mongod.data.27033
sharding:
  clusterRole: shardsvr
replication:
  replSetName: rs1
net:
  bindIp: 127.0.0.1
  port: 27033
```

Chạy mongod
```
$ mongod --config /your_path/configs/mongod.conf.27033
```
    
Kết nối vào MongoD port 27032 (chỉ định làm master)

```
$ mongo --port 27032 
rs.initiate({ _id: "rs1", members: [ { _id: 0, host: "localhost:27032" }]})
rs.add("localhost:27033") # Thêm MongoD port 27033 vào cùng một cụm rs1
```
    
### 4. Setup MongoC    

Sửa file `mongoc.conf.27040` đã tạo với nội dung như sau:

```
storage:
  dbPath: /your_path/data/mongoc.data.27040
sharding:
  clusterRole: configsvr
replication:
  replSetName: configsvr
net:
  bindIp: 127.0.0.1
  port: 27040
```

Để chạy MongoC dùng lệnh sau
```
$ mongod --config /your_path/configs/mongoc.conf.27040
```

Kết nối vào MongoC port 27040
```
$ mongo --port 27040 
rs.initiate({ _id: "configsvr", configsvr: true, members: [ { _id: 0, host: "localhost:27040" }]})
```
    
![](https://images.viblo.asia/f062b53a-22eb-4f4f-84b1-38fe43c6b703.png)
    
### 5. Setup MongoS
    
Sửa file `mongos.conf.27050` đã tạo với nội dung như sau:
```
sharding:
  configDB: configsvr/localhost:27040
net:
  bindIp: 127.0.0.1 # Do đang setup ở local nên host sẽ là 127.0.0.1, nếu triển khai trên nhiều servers cần điền địa chỉ private IP vào
  port: 27050
```
    
Để chạy MongoS dùng lệnh sau
```
$ mongos --config /your_path/configs/mongos.conf.27050
```
    
Connect đến MongoS và add các shards rs0 rs1 đã cài đặt ở trên
```
$ mongo --port 27050
rs.addShard("rs0/localhost:27030")
rs.addShard("rs1/localhost:27032")
```

![](https://images.viblo.asia/0096e99d-0927-4e22-90ff-308324ca6528.png)

![](https://images.viblo.asia/697bec3e-ecdc-4c20-bb09-1d1adca1d734.png)
    
### 6. Shard Database

Tiếp theo chúng ta enable cho database cần phải shard
    
```
sh.enableSharding("demo-sharding")
```
    
![](https://images.viblo.asia/a4e30a86-0bfb-48ab-9d52-cf4628e4b3de.png)

Add shard cho collection

![](https://images.viblo.asia/6f6ad29b-d739-4f87-9a8a-9c5319811540.png)

Đến đây là kết thúc cài đặt Sharded Cluster MongoDB, để kiểm tra, chạy 2 lệnh sau sẽ ra các thông tin về tất cả các shards

```
use demo-sharding
db.stats()
db.printShardingStatus()
```
    
Cảm ơn các bạn đã theo dõi bài viết!

### Tài liệu tham khảo
1. https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/
2. https://www.linode.com/docs/guides/build-database-clusters-with-mongodb/