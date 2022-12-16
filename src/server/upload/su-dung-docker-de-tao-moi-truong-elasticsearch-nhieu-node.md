Bài viết này sẽ sẽ có thể tạo được cluster elasticsearch với nhiều node

### Môi trường
* Mac OS X El Capitan(10.11.6)
* docker-machine version 0.10.0, build 76ed2a6
* VirtualBox 5.1.14 r112924 (Qt5.6.2)


### Point
* sử dụng docket-machine và khởi động 3 server
* deploy ở chế độ public ở mỗi server deploy
* sử dụng chế độ host ở network driver của docker

### Các bước thực hiện
#### Chuẩn bị server
#### Tạo host content
ở virtualBox khởi động 3 content host

```
$ docker-machine create --driver virtualbox elasticsearch1
$ docker-machine create --driver virtualbox elasticsearch2
$ docker-machine create --driver virtualbox elasticsearch3
```

#### Tăng memory map của content host lên max

```
$ docker-machine ssh elasticsearch1 sudo sysctl -w vm.max_map_count=262144
$ docker-machine ssh elasticsearch2 sudo sysctl -w vm.max_map_count=262144
$ docker-machine ssh elasticsearch3 sudo sysctl -w vm.max_map_count=262144
```

### Khởi động elasticsearch và kiểm tra các thao tác
#### Khởi động elasticsearch


| Tên biến môi trường | Giá trị của tham số | Giải thích |
| -------- | -------- | -------- |
| network.host	 | _eth1:ipv4_ | ở chế độ host khởi động content NIC của host sẽ được mapping tất cả nhưng mà option này nếu không chỉ định IP address của eth0 của elasticsearch sẽ được chỉ định default  |
| discovery.zen.ping.unicast.hosts	|phân biệt IP address của host | Chỉ định rõ ràng host nào tham gia cluster|
| discovery.zen.minimum_master_nodes  | 2 |số node/2 + 1|
| xpack.security.enabled | false | ở lần này không cần thiết |
| xpack.monitoring.enabled | false | ở lần này không cần thiết |
| xpack.watcher.enabled	 | false | ở lần này không cần thiết |
| xpack.graph.enabled | false | ở lần này không cần thiết |
| xpack.ml.enabled | false | ở lần này không cần thiết |
| ES_JAVA_OPTS	 | -Xms512m -Xmx512m	 | chỉ định java-heap khi sử dụng elasticsearch |

Ngoài ra cũng có 1 số option dưới đây

| Option | Giải thích |
| -------- | -------- | -------- |
|  -d | khởi động chế độ detached |
| --network="host" | chỉ định host cho network mode |
| -p 9200:9200 | public service host của elasticsearch |
| -p 9300:9300 | public port giao tiếp giữa các node của elasticsearch |


### khởi động node 1
```
$ eval $(docker-machine env elasticsearch1)
$ docker run -d \
  -e "network.host=_eth1:ipv4_" \
  -e "discovery.zen.ping.unicast.hosts=$(docker-machine ip elasticsearch2),$(docker-machine ip elasticsearch3)" \
  -e "discovery.zen.minimum_master_nodes=2" \
  -e "xpack.security.enabled=false" \
  -e "xpack.monitoring.enabled=false" \
  -e "xpack.watcher.enabled=false" \
  -e "xpack.graph.enabled=false" \
  -e "xpack.ml.enabled=false" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  --network="host" \
  -p 9200:9200 \
  -p 9300:9300 \
  docker.elastic.co/elasticsearch/elasticsearch:5.4.0
```

### khởi động node 2
```
$ eval $(docker-machine env elasticsearch2)
$ docker run -d \
  -e "network.host=_eth1:ipv4_" \
  -e "discovery.zen.ping.unicast.hosts=$(docker-machine ip elasticsearch1),$(docker-machine ip elasticsearch3)" \
  -e "discovery.zen.minimum_master_nodes=2" \
  -e "xpack.security.enabled=false" \
  -e "xpack.monitoring.enabled=false" \
  -e "xpack.watcher.enabled=false" \
  -e "xpack.graph.enabled=false" \
  -e "xpack.ml.enabled=false" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  --network="host" \
  -p 9200:9200 \
  -p 9300:9300 \
  docker.elastic.co/elasticsearch/elasticsearch:5.4.0
```

### khởi động node 3
```
$ eval $(docker-machine env elasticsearch3)
$ docker run -d \
  -e "network.host=_eth1:ipv4_" \
  -e "discovery.zen.ping.unicast.hosts=$(docker-machine ip elasticsearch1),$(docker-machine ip elasticsearch2)" \
  -e "discovery.zen.minimum_master_nodes=2" \
  -e "xpack.security.enabled=false" \
  -e "xpack.monitoring.enabled=false" \
  -e "xpack.watcher.enabled=false" \
  -e "xpack.graph.enabled=false" \
  -e "xpack.ml.enabled=false" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  --network="host" \
  -p 9200:9200 \
  -p 9300:9300 \
  docker.elastic.co/elasticsearch/elasticsearch:5.4.0
```

### kiểm tra status của cluster
Sau khi khởi động 3 node rồi hãy thử kiểm tra status của các node
```
$ curl $(docker-machine ip elasticsearch1):9200/_cat/health?v
epoch      timestamp cluster        status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1496326996 14:23:16  docker-cluster green           3         3      0   0    0    0        0             0                  -                100.0%
$ curl $(docker-machine ip elasticsearch1):9200/_cluster/health?pretty
{
  "cluster_name" : "docker-cluster",
  "status" : "green",
  "timed_out" : false,
  "number_of_nodes" : 3,
  "number_of_data_nodes" : 3,
  "active_primary_shards" : 0,
  "active_shards" : 0,
  "relocating_shards" : 0,
  "initializing_shards" : 0,
  "unassigned_shards" : 0,
  "delayed_unassigned_shards" : 0,
  "number_of_pending_tasks" : 0,
  "number_of_in_flight_fetch" : 0,
  "task_max_waiting_in_queue_millis" : 0,
  "active_shards_percent_as_number" : 100.0
}
```

Nếu kiểm tra được các yếu tố sau thì OK
* status là green
* số node là 3
*  số data node là 3


### Thử kiểm tra index
tạo thử index
```
$ curl -XPUT $(docker-machine ip elasticsearch1):9200/test?pretty
{
  "acknowledged" : true,
  "shards_acknowledged" : true
}
```

Vì là có cấu trúc cluster nên ở IP nào cũng có thể kiểm tra được index trên
hãy kiểm tra thử

**Node1**
```
$ curl $(docker-machine ip elasticsearch1):9200/_cat/indices?v
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   test  0iOZud02QHqPMkcDemgdWg   5   1          0            0      1.2kb           650b
```

**Node2**
```
$ curl $(docker-machine ip elasticsearch2):9200/_cat/indices?v
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   test  0iOZud02QHqPMkcDemgdWg   5   1          0            0      1.2kb           650b
```

**Node3**
```
$ curl $(docker-machine ip elasticsearch3):9200/_cat/indices?v
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   test  0iOZud02QHqPMkcDemgdWg   5   1          0            0      1.2kb           650b
```

### Tổng kết
Như các bước ở trên đã cài đật được cluster với nhiều node elasticsearch
Ngoài ra thì cloud-aws cũng có thể sử dụng để tạo ra môi trường tương tự như trên

Tham khảo: https://qiita.com/tsukapah/items/1df305026f55cdc77b4b