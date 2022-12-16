# JMX Connector 
**Java Management Extensions (JMX)** cung cấp cho chúng ta những thông tin về **máy ảo Java (JVM)** và những phần mềm chạy trong `JVM` như: số thread running, bao nhiêu instance của một class được tạo ra,.... . Và `JMX connector` được sử dụng để query những thông tin JMX trong Preto server.
Để cấu hình `JMX Connector`,  chúng ta tạo file `etc/catalog/jmx.properties` với nội dung:
```
connector.name=jmx
```
### Presto CLI
Query
``` shell
$ ./presto --server localhost:8080 --catalog jmx --schema jmx 
```
Chúng ta sẽ nhận được response:
```
presto:jmx> 
```
### JMX Schema
Để lấy danh sách các schema trong `jmx`, dùng query sau:

Query
```
presto:jmx> show schemas from jmx; 
```
Result
```
      Schema 
-------------------- 
 information_schema  
 current
 ```
 ### Hiển thị các table
 Để xem những `table` ở `schema` hiện tại, sử dụng câu lệnh:
 
Query 1
```
presto:jmx> show tables from jmx.current; 
```
Result
```
                                    Table                   
------------------------------------------------------------------------------
 com.facebook.presto.execution.scheduler:name = nodescheduler
 com.facebook.presto.execution:name = queryexecution
 com.facebook.presto.execution:name = querymanager
 com.facebook.presto.execution:name = remotetaskfactory
 com.facebook.presto.execution:name = taskexecutor
 com.facebook.presto.execution:name = taskmanager
 com.facebook.presto.execution:type = queryqueue,name = global,expansion = global
 ………………
 ……………….
 ```
Query 2
```
presto:jmx> select * from jmx.current.”java.lang:type = compilation"; 
```
Result
```
node               | compilationtimemonitoringsupported |      name   |         objectname         | totalcompilationti
--------------------------------------+------------------------------------+--------------------------------+----------------------------+-------------------
ffffffff-ffff-ffff-ffff-ffffffffffff | true | HotSpot 64-Bit Tiered Compilers | java.lang:type=Compilation |       1276
```
Query 3
```
presto:jmx> select * from jmx.current."com.facebook.presto.server:name = taskresource";
```
Result
```
 node                 | readfromoutputbuffertime.alltime.count 
 | readfromoutputbuffertime.alltime.max | readfromoutputbuffertime.alltime.maxer
 --------------------------------------+---------------------------------------+--------------------------------------+--------------------------------------- 
 ffffffff-ffff-ffff-ffff-ffffffffffff |                                   92.0 |                          1.009106149 | 
```

# HIVE Connector
Với  **Hive connector** chúng ta có thể query dữ liệu được lưu trữ trong **Hive**.
Điều kiện tiên quyết:
* Đã cài đặt `Hadoop` và `Hive`
* Khởi động `Hive metastore` với câu lệnh:
    ```
    hive --service metastore
    ```
    `Presto` sử dụng Hive metastore để lấy thông tin chi tiết của các bảng trong `Hive`.
### Cấu hình
Tạo file `hive.properties` dưới thư mục `etc/catalog` với những câu lệnh:
```
$ cd etc 
$ cd catalog 
$ vi hive.properties  

connector.name = hive-cdh4 
hive.metastore.uri = thrift://localhost:9083
```
### Tạo cơ sở dữ liệu
Tạo một database trong `Hive` sử dụng câu lệnh sau:
Query
```
hive> CREATE SCHEMA tutorials; 
```
### Tạo bảng
```
hive> create table author(auth_id int, auth_name varchar(50), 
topic varchar(100) STORED AS SEQUENCEFILE;
```
### Insert dữ liệu
Câu lệnh sau sẽ được sử dụng để `insert` những bản ghi vào trong bản đã tạo ở trên:
```
hive> insert into table author values (1,’ Doug Cutting’,Hadoop),
(2,’ James Gosling’,java),(3,’ Dennis Ritchie’,C);
```
### Start Presto CLI
Query 
```
$ ./presto --server localhost:8080 --catalog hive —schema tutorials; 
```
Response
```
presto:tutorials >
```
### Liệt kê các Schema
Query
```
presto:tutorials > show schemas from hive;
```
Result
```
default  

tutorials 
```
### Liệt kê các bảng
Query
```
presto:tutorials > show tables from hive.tutorials; 
```
Result
```
author
```
### Lấy dữ liệu trong bảng
Query
```
presto:tutorials > select * from hive.tutorials.author; 
```
Result
```
auth_id  |   auth_name    | topic 
---------+----------------+-------- 
       1 | Doug Cutting   | Hadoop 
       2 | James Gosling  | java 
       3 | Dennis Ritchie | C
```


# KAFKA Connector
Với **Kafka Connetor** cho phép **Presto** có thể access data từ  **Apache Kafka**
### Điệu kiện:
Đã cài đặt:
* Apache ZooKeeper
* Apache Kafka
### Start Zookeeper
Command:
```
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```
Bây giờ `Zookeeper` được start trên `port 2181`
### Start Kafka
Command
```
bin/kafka-server-start.sh config/server.properties
```
Sau khi start, `Kafka` sử dụng `port 9092`
### TPCH Data
#### Download `TPCH DATA`
Command
```
$  curl -o kafka-tpch 
https://repo1.maven.org/maven2/de/softwareforge/kafka_tpch_0811/1.0/kafka_tpch_ 
0811-1.0.sh 
```
Response:
```
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current 
                                 Dload  Upload   Total   Spent    Left  Speed 
  0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0  
  5 21.6M    5 1279k    0     0  83898      0  0:04:30  0:00:15  0:04:15  129k
  6 21.6M    6 1407k    0     0  86656      0  0:04:21  0:00:16  0:04:05  131k  
 24 21.6M   24 5439k    0     0   124k      0  0:02:57  0:00:43  0:02:14  175k 
 24 21.6M   24 5439k    0     0   124k      0  0:02:58  0:00:43  0:02:15  160k 
 25 21.6M   25 5736k    0     0   128k      0  0:02:52  0:00:44  0:02:08  181k 
 ………………………..
 ```
 Tiếp theo, cấp quyển thực thi cho nó:
 ```
 $ chmod 755 kafka-tpch
 ```
#### Run tpch-kafka
Chạy `tpch-kafka` để load trước một số `topic` với `tpch data` sử dụng câu lệnh:
```
$ ./kafka-tpch load --brokers localhost:9092 --prefix tpch. --tpch-type tiny 
```
Result
```
2016-07-13T16:15:52.083+0530 INFO main io.airlift.log.Logging Logging 
to stderr
2016-07-13T16:15:52.124+0530 INFO main de.softwareforge.kafka.LoadCommand
Processing tables: [customer, orders, lineitem, part, partsupp, supplier,
nation, region]
2016-07-13T16:15:52.834+0530 INFO pool-1-thread-1
de.softwareforge.kafka.LoadCommand Loading table 'customer' into topic 'tpch.customer'...
2016-07-13T16:15:52.834+0530 INFO pool-1-thread-2
de.softwareforge.kafka.LoadCommand Loading table 'orders' into topic 'tpch.orders'...
2016-07-13T16:15:52.834+0530 INFO pool-1-thread-3
de.softwareforge.kafka.LoadCommand Loading table 'lineitem' into topic 'tpch.lineitem'...
2016-07-13T16:15:52.834+0530 INFO pool-1-thread-4
de.softwareforge.kafka.LoadCommand Loading table 'part' into topic 'tpch.part'...
………………………
……………………….
````
### Thêm cấu hình
Thêm cấu hình `Kafka` trên Presto server 
```
connector.name = kafka  

kafka.nodes = localhost:9092  

kafka.table-names = tpch.customer,tpch.orders,tpch.lineitem,tpch.part,tpch.partsupp, 
tpch.supplier,tpch.nation,tpch.region  

kafka.hide-internal-columns = false 
```
### Presto CLI
### Start Presto CLI
Command
```
$ ./presto --server localhost:8080 --catalog kafka —schema tpch;
```
Response
```
presto:tpch>
```
### Liệt kê các bảng
Query
```
presto:tpch> show tables;
```
Result
```
  Table 
---------- 
 customer 
 lineitem 
 nation 
 orders
 part 
 partsupp 
 region 
 supplier 
 ```
#### Describe Customer Table
Query
```
presto:tpch> describe customer; 
```
Result
```
  Column           |  Type   |                   Comment 
-------------------+---------+--------------------------------------------- 
 _partition_id     | bigint  | Partition Id 
 _partition_offset | bigint  | Offset for the message within the partition 
 _segment_start    | bigint  | Segment start offset 
 _segment_end      | bigint  | Segment end offset 
 _segment_count    | bigint  | Running message count per segment 
 _key              | varchar | Key text 
 _key_corrupt      | boolean | Key data is corrupt 
 _key_length       | bigint  | Total number of key bytes 
 _message          | varchar | Message text 
 _message_corrupt  | boolean | Message data is corrupt 
 _message_length   | bigint  | Total number of message bytes 
 ```