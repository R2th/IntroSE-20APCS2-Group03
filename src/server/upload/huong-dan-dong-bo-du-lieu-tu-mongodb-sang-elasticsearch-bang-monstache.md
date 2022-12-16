# Giới thiệu
Xin chào, trong bài viết này mình sẽ trình bày thẳng vào cách setup để đồng bộ dữ liệu luôn, mình sẽ bỏ qua các khái niệm cơ bản vì tất cả đều đã có trên doc rồi. Mình sẽ sử dụng 2 database, thứ nhất là dùng DB chính là Mongodb, còn Elastic chỉ dùng để lưu trữ dữ liệu phục vụ cho mục đích tìm kiếm do một Elastic có một số nhược điểm như không có transaction, CRUD không thể nhanh bằng các loại DB khác do phải đánh lại index.

Tool để đồng bộ dữ liệu mình suggest sử dụng [monstache](https://rwynn.github.io/monstache-site/) hoặc [mongoosastic](https://github.com/mongoosastic/mongoosastic) (cho dự án sử dụng nodejs), tuy nhiên mongoosatic có bug nhỏ khi chúng ta đặt tên field là `type` dẫn đến lỗi code khi đồng bộ data, hy vọng họ sớm fix :v

Trong bài viết này mình sẽ sử dụng monstache để đồng bộ. Monstache là một tool đồng bộ được viết bằng Go. Monstache cung cấp cho bạn khả năng sử dụng Elasticsearch để thực hiện các tìm kiếm phức tạp và tổng hợp dữ liệu MongoDB của bạn theo thời gian thực một cách nhanh chóng.
# Cài đặt
Đầu tiên các bạn tạo các thư mục và các file như sau:
```
📁 config-management
    docker-compose.yml
    create-certs.yml
    instances.yml
    .env
📁 monstache
    📁 filter
    📁 transform
    📁 logs
    config.toml
```
Chỉnh sửa file `.env` để tạo các biến môi trường:
```:config-management/.env
COMPOSE_PROJECT_NAME=oc

CERTS_DIR=/usr/share/elasticsearch/config/certificates

DB_URI="uri mongodb cua ban"

ELASTIC_URL="https://es01:9200"
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=
ES_VERSION="7.13.3"
```
Bây giờ chúng ta sẽ setup `docker-compose.yml`, trong đây chúng ta sẽ sử dụng multi node, bạn cũng có thể sử dụng single node bằng cách thêm vào `environment` dòng sau `- discovery.type=single-node` và bỏ `cluster.name`, `discovery.seed`, `cluster.initial_master_nodes`, nhưng lưu ý là chỉ nên dùng single node trên môi trường test nhé:
```yml:config-management/docker-compose.yml
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:$ES_VERSION
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.license.self_generated.type=basic
      - xpack.security.enabled=true
      - xpack.security.http.ssl.enabled=true
      - xpack.security.http.ssl.key=$CERTS_DIR/es01/es01.key
      - xpack.security.http.ssl.certificate_authorities=$CERTS_DIR/ca/ca.crt
      - xpack.security.http.ssl.certificate=$CERTS_DIR/es01/es01.crt
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.certificate_authorities=$CERTS_DIR/ca/ca.crt
      - xpack.security.transport.ssl.certificate=$CERTS_DIR/es01/es01.crt
      - xpack.security.transport.ssl.key=$CERTS_DIR/es01/es01.key
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data01:/usr/share/elasticsearch/data
      - certs:$CERTS_DIR
    ports:
      - 9200:9200

  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:$ES_VERSION
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.license.self_generated.type=basic
      - xpack.security.enabled=true
      - xpack.security.http.ssl.enabled=true
      - xpack.security.http.ssl.key=$CERTS_DIR/es02/es02.key
      - xpack.security.http.ssl.certificate_authorities=$CERTS_DIR/ca/ca.crt
      - xpack.security.http.ssl.certificate=$CERTS_DIR/es02/es02.crt
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.certificate_authorities=$CERTS_DIR/ca/ca.crt
      - xpack.security.transport.ssl.certificate=$CERTS_DIR/es02/es02.crt
      - xpack.security.transport.ssl.key=$CERTS_DIR/es02/es02.key
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data02:/usr/share/elasticsearch/data
      - certs:$CERTS_DIR

  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:$ES_VERSION
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.license.self_generated.type=basic
      - xpack.security.enabled=true
      - xpack.security.http.ssl.enabled=true
      - xpack.security.http.ssl.key=$CERTS_DIR/es03/es03.key
      - xpack.security.http.ssl.certificate_authorities=$CERTS_DIR/ca/ca.crt
      - xpack.security.http.ssl.certificate=$CERTS_DIR/es03/es03.crt
      - xpack.security.transport.ssl.enabled=true
      - xpack.security.transport.ssl.verification_mode=certificate
      - xpack.security.transport.ssl.certificate_authorities=$CERTS_DIR/ca/ca.crt
      - xpack.security.transport.ssl.certificate=$CERTS_DIR/es03/es03.crt
      - xpack.security.transport.ssl.key=$CERTS_DIR/es03/es03.key
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data03:/usr/share/elasticsearch/data
      - certs:$CERTS_DIR
      
  monstache:
    image: rwynn/monstache:6.7.2
    container_name: oc_monstache
    working_dir: /app/monstache
    command: -f ./config.toml
    environment:
      - MONSTACHE_LOG_DIR=logs
      - MONSTACHE_MONGO_URL=${DB_URI}
      - MONSTACHE_ES_URLS=${ELASTIC_URL}
      - MONSTACHE_ES_USER=${ELASTIC_USERNAME}
      - MONSTACHE_ES_PASS=${ELASTIC_PASSWORD}
    volumes:
      - ../monstache:/app/monstache
    ports:
      - "8080:8080"
    restart: unless-stopped

volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local
  certs:
    driver: local
```

Giải thích một chút, bạn cần kiểm tra memory được phân bổ cho docker trước nhé, ở đây mình set `ES_JAVA_OPTS=-Xms512m -Xmx512m` tức 512m cho mỗi node, tốt nhất là docker được phân bổ tối thiếu 4gb.

Tiếp theo là phần secure cho ES, chúng ta sẽ sử dụng extension xpack:
- `xpack.license.self_generated.type=basic`: generate và apply basic license hỗ trợ Transport Layer Security (có 2 option là basic và trial)
- `xpack.security.http.ssl.enabled=true`: bật Transport Layer Security để mã hóa client communications.
- `xpack.security.transport.ssl.enabled=true`: mã hóa thông tin giao tiếp giữa các node.
- `xpack.security.transport.ssl.verification_mode=certificate`: cho phép sử dụng self-signed certificates bằng cách không xác thực hostname.

Chỉnh sửa file `instaces.yml`, trong file này chúng ta sẽ định nghĩa những instances chúng ta cần tạo certificate
```yml:config-management/instances.yml
instances:
  - name: es01
    dns:
      - es01
      - localhost
    ip:
      - 127.0.0.1

  - name: es02
    dns:
      - es02
      - localhost
    ip:
      - 127.0.0.1

  - name: es03
    dns:
      - es03
      - localhost
    ip:
      - 127.0.0.1
```
Chỉnh sửa file `create-certs.yml`, file này dùng để chạy container tạo certificates cho ES:
```yml:config-management/create-certs.yml
version: '2.2'

services:
  create_certs:
    image: docker.elastic.co/elasticsearch/elasticsearch:${ES_VERSION}
    container_name: create_certs
    command: >
      bash -c '
        yum install -y -q -e 0 unzip;
        if [[ ! -f /certs/bundle.zip ]]; then
          bin/elasticsearch-certutil cert --silent --pem --in config/certificates/instances.yml -out /certs/bundle.zip;
          unzip /certs/bundle.zip -d /certs;
        fi;
        chown -R 1000:0 /certs
      '
    working_dir: /usr/share/elasticsearch
    volumes:
      - certs:/certs
      - .:/usr/share/elasticsearch/config/certificates

volumes:
  certs:
    driver: local
```

Okay, sau khi sửa xong, chúng ta sẽ tiến hành chạy docker dể tạo certificate bằng lệnh sau:
```
$ docker-compose -f create-certs.yml run --rm create_certs
$ docker-compose -f docker-compose.yml up -d es01 es02 es03
```

Tiếp theo là tạo basic auth để có thể truy cập được vào REST Api của ES:
```
$ docker exec es01 /bin/bash -c "bin/elasticsearch-setup-passwords auto --batch --url https://es01:9200"
```
bạn lưu lại các account vừa được tạo, và sửa lại `.env`
```config-management/.env
ELASTIC_PASSWORD="elastic password vừa nhận được"
```
Như vậy là chúng ta đã xong việc setup docker, tiếp theo là config monstache
```nginx:monstache/config.toml
# connection settings

# if you need to seed an index from a collection and not just listen and sync changes events
# you can copy entire collections or views from MongoDB to Elasticsearch
direct-read-namespaces = ["db.col1", "db.col2"]

# if you want to use MongoDB change streams instead of legacy oplog tailing use change-stream-namespaces
# change streams require at least MongoDB API 3.6+
# if you have MongoDB 4+ you can listen for changes to an entire database or entire deployment
# in this case you usually don't need regexes in your config to filter collections unless you target the deployment.
# to listen to an entire db use only the database name.  For a deployment use an empty string.
change-stream-namespaces = ["db.col1", "db.col2"]

# additional settings

# compress requests to Elasticsearch
gzip = true
# generate indexing statistics
stats = false
# index statistics into Elasticsearch
index-stats = false
# use the following user name for Elasticsearch basic auth
elasticsearch-max-conns = 10
# use the following PEM file to connections to Elasticsearch
# elasticsearch-pem-file = "/path/to/elasticCert.pem"
# validate connections to Elasticsearch
# elastic-validate-pem-file = true
# propogate dropped collections in MongoDB as index deletes in Elasticsearch
dropped-collections = true
# propogate dropped databases in MongoDB as index deletes in Elasticsearch
dropped-databases = true
# do not start processing at the beginning of the MongoDB oplog
# if you set the replay to true you may see version conflict messages
# in the log if you had synced previously. This just means that you are replaying old docs which are already
# in Elasticsearch with a newer version. Elasticsearch is preventing the old docs from overwriting new ones.
replay = false
# resume processing from a timestamp saved in a previous run
resume = true
# do not validate that progress timestamps have been saved
resume-write-unsafe = false
# override the name under which resume state is saved
resume-name = "default"
# use a custom resume strategy (tokens) instead of the default strategy (timestamps)
# tokens work with MongoDB API 3.6+ while timestamps work only with MongoDB API 4.0+
resume-strategy = 1
verbose = false
# do not exit after full-sync, rather continue tailing the oplog
exit-after-direct-reads = false

########################################
# xác định collection được mapping từ mongodb sang ES
[[mapping]]
namespace = "db.col1" # bạn sửa lại thành tên collection của bạn nhé
index = "index1" # tên index

########################################
# Lọc các bản ghi trước khi đánh index (nếu bạn không cần lọc thì có thể bỏ qua phần này)
# đọc thêm tại đây https://rwynn.github.io/monstache-site/advanced/#filtering
[[filter]]
path = "filter/base.js"

########################################
# script có thể dùng để chỉnh sửa dữ liệu, drop bản ghi
[[script]]
namespace = "db.col1"
routing = true
path = "transform/base.js"
```

Trong config trên mình có sử dụng filter và scrip, cho nên sẽ cần tạo file `filter/base.js` và `transform/base.js`:
```js:filter/base.js
module.exports = function (doc) {
  return !doc.deleted; // không đánh index cho các bản ghi bị xóa mềm
};
```
```js:transform/base.js
module.exports = function (doc) {
  return _.pick(
    doc,
    '_id',
    ... // những trường bạn muốn lấy
  );
};
```
Các bạn có thể code trực tiếp vào file config bằng cách sau:
```nginx:monstache/config.toml
...
[[script]]
namespace = "db.col1"
routing = true
script = """
module.exports = function (doc) {
  return _.pick(
    doc,
    '_id',
    ... // những trường bạn muốn lấy
  );
};
"""
```

Done, bây giờ chúng ta sẽ chạy monstache trong docker:
```
$ docker-compose -f docker-compose.yml up -d monstache
```
bạn có thể kiểm tra log trong thư mục `monstache/logs` nhé, chừng nào có dòng `Direct reads completed` có nghĩa là bạn đã đồng bộ dữ liệu cũ xong, dữ liệu mới sẽ được sync realtime từ Mongodb sang ES.
```js:monstache/logs/info
INFO 2021/07/11 07:06:14 Started monstache version 6.7.2
INFO 2021/07/11 07:06:14 Go version go1.15.5
INFO 2021/07/11 07:06:14 MongoDB go driver v1.4.4
INFO 2021/07/11 07:06:14 Elasticsearch go driver 7.0.22
INFO 2021/07/11 07:06:14 Successfully connected to MongoDB version 4.4.6
INFO 2021/07/11 07:06:14 Successfully connected to Elasticsearch version 7.13.3
INFO 2021/07/11 07:06:14 Sending systemd READY=1
INFO 2021/07/11 07:06:14 Listening for events
INFO 2021/07/11 07:06:14 Watching changes on collection db.col1
INFO 2021/07/11 07:06:14 Resuming stream 'db.col1' from collection monstache.tokens using resume name 'default'
INFO 2021/07/11 07:09:58 Direct reads completed
```

# Tổng kết
Trên đây là cách setup Elasticsearch multi node và Monstache để đồng bộ dữ liệu từ mongodb, hy vọng sẽ hữu ích cho bạn. Happy coding !!! <3 <3 <3