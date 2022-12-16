## Elasticsearch là gì?
Elasticsearch là một  NoSQL database, một search engine phân tán, dựa trên phần mềm Lucene. Elasticsearch có nhiều công cụ với giao diện web HTTP và hỗ trợ dữ liệu JSON. Elasticsearch là một công cụ tìm kiếm phổ biến nhất hiện nay.

Elasticsearch cung cấp công cụ tìm tiếm và phân tích gần như là thời gian thực, áp dụng với mọi kiểu dữ liệu - văn bản có cấu trúc hoặc phi cấu trúc, số, thông tin địa lý... Elasticsearch sẽ tự lưu trữ và đánh chỉ mục chúng để tìm kiếm hiệu quả. Vì Elasticsearch là một search engine phân tán nên bạn có thể dễ dàng mở rộng khi dữ liệu mở rộng.

## Ưu điểm và nhược điểm 
#### 1. Ưu điểm
* Tốc độ tìm kiếm của Elasticsearch rất nhanh chóng và linh hoạt (đúng như tên gọi)
* Elasticsearch có thể chạy trên mọi nền tảng nhờ vào máy ảo Java và dễ dàng mở rộng
* Elasticsearch là công cụ tìm kiếm *near realtime*, dữ liệu nhanh chóng có thể tìm kiếm được sau khi thêm vào hệ thống
* Dễ dàng backup toàn bộ hệ thống
* Hỗ trợ nhiều loại dữ liệu
* **Opensource**

#### 2. Nhược điểm
* Vấn đề *split-brain* khi kết nối của các node với master có vấn đề
* Elasticsearch là một NoSQL, nó không hỗ trợ database transaction
* Ngoài việc search thì hiệu suất của các thao tác khác đối với dữ liệu của Elasticsearch không thực sự tốt, có thể mất mát dữ liệu đối với luồng dữ liệu lớn
* Vì Elasticsearh sẽ đánh `index` cho các dữ liệu được thêm vào nên nó không phù hợp với hệ thống cập nhật dữ liệu thường xuyên

## Ứng dụng
#### 1. Database
Elasticsearch là một NoSQL database, vì thế chúng ta hoàn toàn có thể sử dụng nó như một database. Nó có đầy đủ các chức năng CRUD cơ bản cần thiết để làm một database. 

Nhưng như những **nhược điểm** đã nêu ở phần trên, Elasticsearch có thể sử dụng được với những usecase hệ thống nhỏ. Nhưng đối với những hệ thống lớn, dữ liệu được cập nhật thường xuyên và luồng dữ liệu hàng lớn, Elasticsearch hoàn toàn không phù hợp.
#### 2. Search engine
Đây chính là mục đích mà nó được tạo ra, Elasticsearch được sử dụng phổ biến như là một công cụ tìm kiếm. 
* **Logging and Log Analysis**:
     Elasticsearch là một platform phổ biến nhất cho logging. Elasticsearch giúp bạn không phải căng mắt tìm kiếm trong hàng ngìn dòng log trên nhiều hệ thống khác nhau.
* **Tìm kiếm văn bản**:
    Elasticsearch có thể được dùng để tìm kiếm văn bản thuần túy với cụm từ được cung cấp chính xác nhất. Rất nhiều tên tuổi lớn đang sử dụng công cụ tìm kiếm này, có thể kể đến như Microsoft, Github, Wikipedia, Facebook, Linkedin, Stackoverflow, Viblo...
 * **Tìm kiếm sản phẩm**: 
     Chúng ta có thể sử dụng Elasticsearch để tìm kiếm các sản phẩm trong hệ thống theo tên hoặc theo các trường dữ liệu bất kỳ khác vì Elasticsearch hỗ trợ rất nhiều kiểu dữ liệu có cấu trúc.
* **AutoComplete**:
Vì thời gian tìm kiếm của Elasticsearch rất nhanh nên chúng ta có thể tích hợp nó như một công cụ gợi ý autocomplete, tăng độ trải nhiệm của người dùng.

## Thao tác sử dụng cơ bản
#### 1.Cài đặt
Bạn có thể cài đặt Elasticsearch cùng với Kibanna (Giao diện quản lý cho Elasticsearch) rất dễ dàng với Docker
```bash
// Elasticsearch
$ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.12.1
$ docker run --name kibana --net elasticnet -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.12.1
// Kibana
$ docker pull docker.elastic.co/kibana/kibana:7.12.1
$ docker run -d --name kibana --net elasticnet -p 5601:5601 docker.elastic.co/kibana/kibana:
```
Hoặc sử dụng Docker-compose
```yml
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic

  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data02:/usr/share/elasticsearch/data
    networks:
      - elastic

  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic

  kib01:
    image: docker.elastic.co/kibana/kibana:7.12.1
    container_name: kib01
    ports:
      - 5601:5601
    environment:
      ELASTICSEARCH_URL: http://es01:9200
      ELASTICSEARCH_HOSTS: '["http://es01:9200","http://es02:9200","http://es03:9200"]'
    networks:
      - elastic

volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local

networks:
  elastic:
    driver: bridge
```

Sau khi chạy thành công (với file docker-compose.yml ở trên), container của một master node es01, 2 slaves es02, es03 và kibana được tạo như dưới đây:
```bash
$ docker-composer ps
---------------------------------------------------------------------------------------------------
Name               Command               State                         Ports                       
---------------------------------------------------------------------------------------------------
es01    /bin/tini -- /usr/local/bi ...   Up      0.0.0.0:9200->9200/tcp,:::9200->9200/tcp, 9300/tcp
es02    /bin/tini -- /usr/local/bi ...   Up      9200/tcp, 9300/tcp                                
es03    /bin/tini -- /usr/local/bi ...   Up      9200/tcp, 9300/tcp                                
kib01   /bin/tini -- /usr/local/bi ...   Up      0.0.0.0:5601->5601/tcp,:::5601->5601/tcp  
```
Nếu có lỗi `es0x exist with code 78`, hãy chạy câu lệnh sau để tăng Virtual memory 
```bash
$ sudo sysctl -w vm.max_map_count=262144
```

Bây giờ, bạn có thể truy cập vào Kibana tại địa`http://localhost:5601`, Kibana cung cấp cho bạn rất nhiều tiện ích để làm việc với Elasticsearch
![](https://images.viblo.asia/1eba82d0-924b-4997-b992-e1559807045f.png)

![](https://images.viblo.asia/4f52036a-f644-4063-95aa-725d52e135d5.png)

***Một số  Query DSL cơ bản***

Tạo index
```sql
PUT /students?pretty
```
![](https://images.viblo.asia/25aa3276-9c05-46dd-97d2-d422e03efc6a.png)

Tạo bản ghi
```sql
POST /human/_doc/1
{
  "name": "Văn A",
  "university": "HUST",
  "Age": 22
}
```
![](https://images.viblo.asia/7a3d5970-de05-451f-ae58-e43f3b31091e.png)
Tìm kiếm tất cả index
```sql
GET /students/_search
{
    "query": {
        "match_all": {}
    }
}
```
![](https://images.viblo.asia/1d1c44a0-8299-4d59-800d-59ff5ec40a57.png)
Tìm kiếm bằng trường dữ liệu
```sql
GET /students/_search
{
    "query": {
        "match": {
          "name":"Văn D"
        }
    }
}
```
![](https://images.viblo.asia/7f508b32-4248-4857-9074-a754b269dc6c.png)


## Lời kết
Mình cùng các bạn vừa tìm hiểu những kiến thức cơ bản về Elasticsearch, ưu nhược điểm để có thể áp dụng hợp lý, cũng như cách cài đặt Kibana. Cảm ơn các bạn đã quan tâm bài viết!  

## Tham khảo
[elastic.co](https://www.elastic.co/guide/)    
[javatpoint](https://www.javatpoint.com/elasticsearch)    
[hackernoon](https://hackernoon.com/elastic-stack-a-brief-introduction-794bc7ff7d4f)