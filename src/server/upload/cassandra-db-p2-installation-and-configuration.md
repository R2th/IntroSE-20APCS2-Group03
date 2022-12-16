**Chào mọi người, trong phần 1 chúng ta đã hiểu được sơ bộ các thành phần của Cassandra và cơ chế hoạt động của nó. 
Trong phần này mình sẽ giới thiệu cách triển khai một cụm database Casssandra với các bước cài đặt và cấu hình chi tiết.**

# Môi trường triển khai

Trong phạm vi series này, mình sẽ triển khai Cụm Cassandra trên 3 máy chủ Centos 7 là 3 máy ảo VMWare.
Cassandra sẽ được cài dưới dạng OS Service (cài qua gói của yum trên Centos). Các bạn hoàn toàn có thể thử cài trên docker hoặc K8S tuy nhiên trong phạm vi bài viết này thì mình không đề cập tới
Và để việc cài đặt được thuận tiện thì bước planning cũng là rất quan trọng, dù là hệ thống lab. Các bạn cần chuẩn bị sẵn các thông tin sau trước khi thực hiện cài đặt:
- Hostname/IP của các node
- Phân vùng lưu trữ dữ liệu 
Trong bài lab này, mình đã chuẩn bị các máy chủ như sau:

| <div align="center">STT</div> | <div align="center">Máy chủ</div> | <div align="center">IP</div> | <div align="center">Port</div>  | <div align="center">Thư mục data</div> | <div align="center">Thư mục cấu hình</div> |
| -------- | -------- | -------- | -------- | -------- | -------- |
| <div align="center">1</div> |  cassandra1     | 192.168.10.31 | 9042 | /data/cassandra/ | /etc/cassandra/conf/ (mặc định của cassandra)|
| <div align="center">2</div> |  cassandra2     | 192.168.10.32 | 9042 | /data/cassandra/ | /etc/cassandra/conf/ (mặc định của cassandra)|
| <div align="center">3</div> |  cassandra3     | 192.168.10.33 | 9042 | /data/cassandra/ | /etc/cassandra/conf/ (mặc định của cassandra)|

# Yêu cầu cài đặt
Các máy chủ này cần có kết nối Internet, và bạn phải có quyền sudo để thực hiện cài đặt và cấu hình các service và các file cấu hình.
Các máy chủ đã được cài đặt Centos7, đặt hostname và IP theo quy hoạch.
# Cài đặt service (trên cả 3 máy chủ)
### Cài đặt java
```bash
sudo dnf update -y
sudo dnf install java-1.8.0-openjdk-devel
java -version
```
### Thêm cassandra package vào yum repo 
```bash
sudo tee /etc/yum.repos.d/cassandra.repo <<EOF
[cassandra]
name=Apache Cassandra
baseurl=https://www.apache.org/dist/cassandra/redhat/311x/
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://www.apache.org/dist/cassandra/KEYS
EOF
```

### Download và cài đặt cassandra package
```bash
sudo dnf -y install cassandra
```

### Cấu hình OS service cho cassandra 
```bash
sudo tee /etc/systemd/system/cassandra.service<<EOF
[Unit]
Description=Apache Cassandra
After=network.target
[Service]
PIDFile=/var/run/cassandra/cassandra.pid
User=cassandra
Group=cassandra
ExecStart=/usr/sbin/cassandra -f -p /var/run/cassandra/cassandra.pid
Restart=always
[Install]
WantedBy=multi-user.target
EOF
```
***Lưu ý:***

Trong cấu hình trên tham số ExecStart không set thư mục cấu hình thì cassandra là sẽ tự động tìm tới file **cassandra.yml**  trong thư mục mặc định: **/etc/cassandra/conf/**
Nếu bạn muốn đổi thư mục cài đặt khác mặc định thì cần chỉ định thêm tham số "-d /path-to-config-file" trong ExecStart

### Tạo thư mục lưu data và phân quyền 
```bash
sudo mkdir -p /data/cassandra/ 
sudo mkdir -p /data/cassandra/commitlog 
sudo mkdir -p /data/cassandra/data
sudo mkdir -p /data/cassandra/hints
sudo mkdir -p /data/cassandra/saved_caches
sudo chown -R cassandra:cassandra /data/cassandra/
```

### Cấu hình một số tham số quan trọng trong file /etc/cassandra/conf/cassandra.yaml
***Note: Nếu bạn sử dụng file cấu hình khác với mặc định thì cập nhật lại đường dẫn tương ứng***
```yml
cluster_name: mycluster #Tên cluster của bạn. Tham số này cần cài giống nhau trên tất cả các node
num_tokens: 256 #Hiểu đơn giản là số lượng partition của mỗi node
hints_directory: /data/cassandra/hints
data_file_directories:
    - /data/cassandra/data
commitlog_directory: /data/cassandra/commitlog
saved_caches_directory: /data/cassandra/saved_caches
seed_provider:
  - class_name: org.apache.cassandra.locator.SimpleSeedProvider
    parameters:
    - seeds: "192.168.10.31,192.168.10.32,192.168.10.33" #List các IP của các node trong cluster
listen_address: 192.168.10.31 # Là IP của node tương ứng.
rpc_address: 192.168.10.31 # Là IP của node tương ứng.
endpoint_snitch: GossipingPropertyFileSnitch
broadcast_rpc_address: 192.168.10.31 # Là IP của node tương ứng.
authenticator: PasswordAuthenticator
authorizer: org.apache.cassandra.auth.CassandraAuthorizer
role_manager: CassandraRoleManager
```

### Cấu hình thông tin rack trong file /etc/cassandra/conf/cassandra-rackdc.properties
```yml
dc=mydc #Điền thông tin tên DC của bạn vào đây
rack=myrack #Điền thông tin tên Rack của bạn vào đây
prefer_local=true
```

### Start cassandra service
```bash
sudo systemctl daemon-reload
sudo systemctl start cassandra
```
**Sau khi start trên tất cả các node thì kiểm tra trạng thái các node bằng lệnh sau trên máy chủ bất kỳ:**
```bash
[root@cassandra1 ~]# nodetool status
Datacenter: mydc
================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address        Load       Tokens       Owns (effective)  Host ID                               Rack
UN  192.168.10.31  4.71 MiB   256          100.0%            96ac2d78-ac2f-439b-87b3-f306396da4ff  myrack
UN  192.168.10.32  4.72 MiB   256          100.0%            3e5e7407-444f-4f5a-832d-f58e121220a1  myrack
UN  192.168.10.33  4.71 MiB   256          100.0%            ceda5c0b-7dde-4c48-be0f-58e14d30672b  myrack
```

# Kết nối vào Cassandra database
Để kết nối vào DB thì các nhanh và đơn giản nhất là dùng **cqlsh** để kết nối, mặc định đã được cài đặt khi bạn cài Cassandra.
User/pass mặc định khi cài là cassandra/cassandra, bạn có thể đổi và cấu hình bảo mật theo nhu cầu. Phần này mình sẽ có topic riêng để nói chi tiết hơn.
```bash
[sysadmin@cassandra1 ~]$ sudo cqlsh 192.168.10.31 -u cassandra -p cassandra
Connected to CassandraCluster at 192.168.10.31:9042.
[cqlsh 5.0.1 | Cassandra 3.11.12 | CQL spec 3.4.4 | Native protocol v4]
Use HELP for help.
cassandra@cqlsh>
```
**Tại đây bạn có thể xem thông tin các keyspace:**
```sql
cassandra@cqlsh> SELECT * FROM system_schema.keyspaces;

 keyspace_name      | durable_writes | replication
--------------------+----------------+-------------------------------------------------------------------------------------
        system_auth |           True | {'class': 'org.apache.cassandra.locator.SimpleStrategy', 'replication_factor': '1'}
      system_schema |           True |                             {'class': 'org.apache.cassandra.locator.LocalStrategy'}
                ks1 |           True | {'class': 'org.apache.cassandra.locator.SimpleStrategy', 'replication_factor': '3'}
 system_distributed |           True | {'class': 'org.apache.cassandra.locator.SimpleStrategy', 'replication_factor': '3'}
             system |           True |                             {'class': 'org.apache.cassandra.locator.LocalStrategy'}
      system_traces |           True | {'class': 'org.apache.cassandra.locator.SimpleStrategy', 'replication_factor': '2'}
                ks2 |           True | {'class': 'org.apache.cassandra.locator.SimpleStrategy', 'replication_factor': '3'}

(7 rows)
```
**Để tạo mới một keyspace:**
```sql
CREATE KEYSPACE ks1 WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'}  AND durable_writes = true;
```
*Trong đó eplicationfactor là số replica cho partition.*


**Xem thông tin chi tiết của một keyspace:**
```sql
cassandra@cqlsh> DESCRIBE KEYSPACE "ks1";

CREATE KEYSPACE ks1 WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'}  AND durable_writes = true;

CREATE TABLE ks1.mytbl1 (
    id int PRIMARY KEY,
    address text,
    firstname text,
    hobby text,
    lastname text
) WITH bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
    AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND crc_check_chance = 1.0
    AND dclocal_read_repair_chance = 0.1
    AND default_time_to_live = 0
    AND gc_grace_seconds = 864000
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair_chance = 0.0
    AND speculative_retry = '99PERCENTILE';
```


**Tạo một table trong keyspace vừa tạo bên trên:**
```sql
CREATE TABLE ks1.mytbl1 (  
id int PRIMARY KEY,  
firstname text,  
lastname text,    
address text,
hobby text,
);
```

**Xem danh sách các table trong một keyspace:**
```sql
cassandra@cqlsh> SELECT keyspace_name,table_name,bloom_filter_fp_chance,compaction,memtable_flush_period_in_ms FROM system_schema.tables WHERE keyspace_name = 'ks1';

 keyspace_name | table_name | bloom_filter_fp_chance | compaction                                                                                                                | memtable_flush_period_in_ms
---------------+------------+------------------------+---------------------------------------------------------------------------------------------------------------------------+-----------------------------
           ks1 |     mytbl1 |                   0.01 | {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'} |                           0

(1 rows)
```


**Xem thông tin thống kê của một table:**
```bash
[root@cassandra1 ~]# nodetool tablestats ks1.mytbl1
Total number of tables: 38
----------------
Keyspace : ks1
        Read Count: 1
        Read Latency: 1.127 ms
        Write Count: 0
        Write Latency: NaN ms
        Pending Flushes: 0
                Table: mytbl1
                SSTable count: 1
                Space used (live): 223473
                Space used (total): 223473
                Space used by snapshots (total): 0
                Off heap memory used (total): 7096
                SSTable Compression Ratio: 0.4088160049960831
                Number of partitions (estimate): 5000
                Memtable cell count: 0
                Memtable data size: 0
                Memtable off heap memory used: 0
                Memtable switch count: 0
                Local read count: 1
                Local read latency: NaN ms
                Local write count: 0
                Local write latency: NaN ms
                Pending flushes: 0
                Percent repaired: 0.0
                Bloom filter false positives: 0
                Bloom filter false ratio: 0.00000
                Bloom filter space used: 6416
                Bloom filter off heap memory used: 6408
                Index summary off heap memory used: 640
                Compression metadata off heap memory used: 48
                Compacted partition minimum bytes: 61
                Compacted partition maximum bytes: 86
                Compacted partition mean bytes: 84
                Average live cells per slice (last five minutes): NaN
                Maximum live cells per slice (last five minutes): 0
                Average tombstones per slice (last five minutes): NaN
                Maximum tombstones per slice (last five minutes): 0
                Dropped Mutations: 0
----------------
```

***Tổng kết: Qua topic này các bạn đã có thể dựng cho mình một cụm Cassandra database gồm 3 node chạy replica với nhau để tăng tính dự phòng. Ngoài ra cũng đang biết cách để bước đầu tạo các keyspace, table và các thao tác kiểm tra các thông tin cơ bản của hệ thống.***

***Trong bài tiếp theo mình sẽ tiếp tục hướng dẫn các thao tác sử dụng và quản trị chi tiết hơn***