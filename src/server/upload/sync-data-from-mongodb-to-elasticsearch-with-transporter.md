### Giới thiệu
1. MongoDB là gì?
- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở thuộc NoSQL. Nó được thiết kế theo kiểu hướng đối tượng, các bảng trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ trên bảng không cần tuân theo một cấu trúc nhất định nào cả (điều này rất thích hợp để làm big data).
- MongoDB lưu trữ dữ liệu theo hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON nên truy vấn sẽ rất nhanh.

2. ElasticSearch là gì?
- ElasticSearch là một công cụ tìm kiếm cấp doanh nghiệp (enterprise-level search engine). Mục tiêu là tạo công cụ, nền tảng kỹ thuật tìm kiếm và phân tích thời gian thực nhanh và chính xác, và có thể áp dụng hay triển khai dễ dàng vào các nguồn dữ liệu khác nhau như MS SQL, MySQL, PostgreSQL ... có thể là văn bản (text), thư điện tử(email), pdf ... nói chung là tất cả những thứ có liên quan tới dữ liệu có văn bản.
- Với bản chất của nó, một điều quan trọng cần biết đó là: khi nào thì nên sử dụng ElasticSearch? Bạn không nên chuyển đổi SQL database sang ES. Chúng có những mục đích khác nhau và mỗi cái đều có ưu và nhược điểm riêng. Một số trường hợp nên sử dụng ES:

    - Tìm kiếm text thông thường – Searching for pure text (textual search)
    - Tìm kiếm text và dữ liệu có cấu trúc – Searching text and structured data (product search by name + properties)
    - Tổng hợp dữ liệu – Data aggregation
    - Tìm kiếm theo tọa độ – Geo Search
    - Lưu trữ dữ liệu theo dạng JSON – JSON document storage

3. Transporter 
- Transporter là một công cụ mã nguồn mở để di chuyển dữ liệu trên các kho dữ liệu khác nhau. Các nhà phát triển thường viết các kịch bản một lần cho các nhiệm vụ như di chuyển dữ liệu qua các cơ sở dữ liệu, di chuyển dữ liệu từ các tệp sang cơ sở dữ liệu hoặc ngược lại, nhưng sử dụng một công cụ như Transporter có một số lợi thế.
- Trong Transporter, bạn xây dựng các đường ống (pipeline), xác định luồng dữ liệu từ source (nơi dữ liệu được đọc) đến sink (nơi dữ liệu được ghi). Source và Sink có thể là cơ sở dữ liệu SQL hoặc NoSQL, tệp phẳng hoặc các tài nguyên khác. Transporter sử dụng các adapter, đó là các phần mở rộng có thể cắm được, để giao tiếp với các tài nguyên này và dự án bao gồm một số adapter cho các cơ sở dữ liệu theo mặc định.
- Ngoài việc di chuyển dữ liệu, Transporter cũng cho phép bạn thay đổi dữ liệu khi nó di chuyển qua một đường ống bằng cách sử dụng transformer. Giống như adaptor, có một số transformer theo mặc định. Bạn cũng có thể viết các transformer custom để tùy chỉnh sửa đổi dữ liệu của bạn. Ở đây ta sẽ đi qua việc chuyển và xử lý dữ liệu từ mongodb tới ElasticSearch với custom transformer JavaScript.

### Cài đặt
1. MongoDB
- verify GPG key
```markdown
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```
- tạo file source list mongodb
```shell
$ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```
- update package 
```sql
$ sudo apt-get update
```
- Install MongoDB
```shell
$ sudo apt-get install -y mongodb-org
```
- Start mongodb
```shell
$ sudo systemctl start mongod
```
2. ElasticSearch
- Update package
```sql
$ sudo apt-get update
```
- Download ElasticSearch 
```shell
$ wget https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/deb/elasticsearch/2.3.1/elasticsearch-2.3.1.deb
```
- Install ElasticSearch
```shell
$ sudo dpkg -i elasticsearch-2.3.1.deb
```
- Config ElasticSearch
```markdown
$ sudo nano /etc/elasticsearch/elasticsearch.yml
--------------
. . .
### cluster.name được dùng trong quá trình auto-discovery của Elasticsearch để tự động tìm và add node vào cluster
cluster.name: mycluster1

### tên của node
node.name: node-1
. . .
```

Ở đây mình chỉ cài ES trên 1 server nên chỉ cấu hình các tham số mặc định. Để start và run được ES thì các bạn cần cài thêm JRE hoặc JDK trên máy nữa nhé.

- Install Java JRE.
```shell
$ sudo apt-get update
$ sudo apt-get install default-jre
```
- Start ElasticSearch 
```erlang
$ sudo systemctl start elasticsearch
```

3. Transporter
- Download binary 
```markdown
$ wget https://github.com/compose/transporter/releases/download/v0.5.2/transporter-0.5.2-linux-amd64
```
- Move into /usr/local/bin
```shell
$ mv transporter-*-linux-amd64 /usr/local/bin/transporter
$ chmod +x /usr/local/bin/transporter
```

### Config & Using
1. Create data in mongodb 
```javascript
$ mongo
> show databases
local  0.000GB
> use db_test
switched to db db_test
> db.users.save({"firstName": "cuong", "lastName": "tv"});
WriteResult({ "nInserted" : 1 })
> db.users.save({"firstName": "sumi", "lastName": "tran"});
WriteResult({ "nInserted" : 1 })

> db.users.find().pretty();
{
        "_id" : ObjectId("5aea85dd67f043b8ff7743e9"),
        "firstName" : "cuong",
        "lastName" : "tv"
}
{
        "_id" : ObjectId("5aea85df67f043b8ff7743ea"),
        "firstName" : "sumi",
        "lastName" : "tran"
}
```

2. Create pipeline
- Tạo pipeline.js với mongodb là source và elasticsearch là sink
```php
$ transporter init mongodb elasticsearch
```
- Tạo biến environment:
```shell
$ export MONGODB_URI='mongodb://localhost/db_test'
$ export ELASTICSEARCH_URI='http://localhost:9200/db_test'
```
- Run pipeline
```go
$ transporter run pipeline.js
-----------------------------
INFO[0001] adaptor Listening...                          name=sink path="source/sink" type=elasticsearch
INFO[0001] boot map[sink:elasticsearch source:mongodb]   ts=1525321868090936752
INFO[0001] starting with metadata map[]                  name=source path=source type=mongodb
INFO[0001] adaptor Starting...                           name=source path=source type=mongodb
INFO[0001] starting Read func                            db="db_test"
INFO[0001] collection count                              db="db_test" num_collections=1
INFO[0001] adding for iteration...                       collection=users db="db_test"
INFO[0001] done iterating collections                    db="db_test"
INFO[0001] iterating...                                  collection=users
INFO[0001] Establishing new connection to localhost:27017 (timeout=1h0m0s)...
INFO[0001] Connection to localhost:27017 established.
INFO[0001] iterating complete                            collection=users db="db_test"
INFO[0001] Read completed                                db="db_test"
INFO[0001] adaptor Start finished...                     name=source path=source type=mongodb
INFO[0001] adaptor Stopping...                           name=source path=source type=mongodb
INFO[0002] adaptor Stopped                               name=source path=source type=mongodb
INFO[0002] Connections to localhost:27017 closing (2 live sockets).
INFO[0002] Socket 0xc4200e0620 to localhost:27017: closing: Closed explicitly (abend=false)
INFO[0002] Socket 0xc4200e10a0 to localhost:27017: closing: Closed explicitly (abend=false)
INFO[0002] adaptor Stopping...                           name=sink path="source/sink" type=elasticsearch
INFO[0002] received stop, message buffer is empty, closing...
INFO[0002] adaptor Listen closed...                      name=sink path="source/sink" type=elasticsearch
INFO[0002] adaptor Stopped                               name=sink path="source/sink" type=elasticsearch
INFO[0002] closing BulkProcessor                         version=2 writer=elasticsearch
INFO[0006] metrics source records: 2                     path=source ts=1525321873090325939
INFO[0006] metrics source/sink records: 2                path="source/sink" ts=1525321873090331981
INFO[0008] metrics source records: 2                     path=source ts=1525321875500993392
INFO[0008] metrics source/sink records: 2                path="source/sink" ts=1525321875500996263
INFO[0008] exit map[sink:elasticsearch source:mongodb]   ts=1525321875500997052
```
- Vậy là 2 records của mongodb đã được send sang elasticsearch. ta có thể check lại
```go
$ curl $ELASTICSEARCH_URI/_search?pretty=true
--------------------------------
{
  "took" : 254,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 1.0,
    "hits" : [ {
      "_index" : "db_test",
      "_type" : "users",
      "_id" : "5aea85df67f043b8ff7743ea",
      "_score" : 1.0,
      "_source" : {
        "firstName" : "sumi",
        "lastName" : "tran"
      }
    }, {
      "_index" : "db_test",
      "_type" : "users",
      "_id" : "5aea85dd67f043b8ff7743e9",
      "_score" : 1.0,
      "_source" : {
        "firstName" : "cuong",
        "lastName" : "tv"
      }
    } ]
  }
}
```
3. Tạo Transformer
Transformer sửa đổi dữ liệu nguồn trước khi tải nó vào sink. Ví dụ: chúng cho phép bạn thêm trường mới, xóa trường hoặc thay đổi dữ liệu của trường. Transporter đi kèm với một số transformer được xác định trước cũng như hỗ trợ cho các tùy chỉnh.

Custom Transformer được viết bằng JavaScript và lưu trong file riêng. Để sử dụng chúng, bạn phải add tham số ở trong file pipeline.js

- Tạo file transform.js
```shell
$ vim transform.js
------------------------
function transform(msg) {
    msg.data.fullName = msg.data.firstName + " " + msg.data.lastName;
    return msg
}
```
- Sửa file pipeline.js
```scala
$ vim pipeline.js
-----------------------
...
t.Source("source", source, "/.*/")
.Transform(goja({"filename": "transform.js"}))
.Save("sink", sink, "/.*/")
```
- Trước khi test lại dữ liệu trên elasticsearch, xóa dữ liệu cũ:
```sql
$ curl -XDELETE $ELASTICSEARCH_URI
```
- check lại dữ liệu lần nữa:
```go
$ curl $ELASTICSEARCH_URI/_search?pretty=true
{
  "error" : {
    "root_cause" : [ {
      "type" : "index_not_found_exception",
      "reason" : "no such index",
      "resource.type" : "index_or_alias",
      "resource.id" : "db_test",
      "index" : "db_test"
    } ],
    "type" : "index_not_found_exception",
    "reason" : "no such index",
    "resource.type" : "index_or_alias",
    "resource.id" : "db_test",
    "index" : "db_test"
  },
  "status" : 404
}
```
- OK. vậy là dữ liệu đã sạch bóng. giờ chạy lại pipeline nào
```markdown
$ transporter run pipeline.js
```
- Kết quả:
```javascript
$ curl $ELASTICSEARCH_URI/_search?pretty=true
{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 1.0,
    "hits" : [ {
      "_index" : "db_test",
      "_type" : "users",
      "_id" : "5aea85df67f043b8ff7743ea",
      "_score" : 1.0,
      "_source" : {
        "firstName" : "sumi",
        "fullName" : "sumi tran",
        "lastName" : "tran"
      }
    }, {
      "_index" : "db_test",
      "_type" : "users",
      "_id" : "5aea85dd67f043b8ff7743e9",
      "_score" : 1.0,
      "_source" : {
        "firstName" : "cuong",
        "fullName" : "cuong tv",
        "lastName" : "tv"
      }
    } ]
  }
}
```
Vậy là trong khi dùng transporter để send liệu vào elasticsearch, transformer đã xử lý dữ liệu (thêm trường fullName). Và chúng ta được kết quả như trên.