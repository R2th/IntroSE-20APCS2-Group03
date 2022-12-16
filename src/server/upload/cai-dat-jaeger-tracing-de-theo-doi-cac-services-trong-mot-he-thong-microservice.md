Kiến trúc Microservice ngày càng trở nên phổ biến và trở thành lựa chọn hàng đầu trong quá trình phát triển phần mềm. Trong kiến trúc microservice, ứng dụng monolithic truyền thống được chia nhỏ ra thành các thành phần có thể deploy độc lập. Một ứng dụng dần trở thành một nhóm các microservice, khi bạn có hàng trăm, hàng ngàn các microservice nhỏ cùng hoạt động,  sẽ không dễ dàng cho bạn nắm được các service nào đang gọi đến nhau, một request đang đi từ services nào đến service nào.

Để giải quyết vấn đề này, một kỹ thuật được đưa ra là `Distributed Tracing`. `Distributed Tracing` là một phương thức để profile và monitor ứng dụng, đặc biệt là những ứng dụng sử dụng kiến trúc microservices. Nó giúp xác định chính xác service nào khi nó xảy ra lỗi và điều gì đang gây ảnh hưởng tới performance của ứng dụng.

`Jaeger Tracing` là một hệ thống distributed tracing được phát triển bởi `Uber`. Nó được sử dụng để giám sát và xử lý sự cố.
 
## Triển khai trên Docker Swarm
![](https://images.viblo.asia/caeca84d-c717-43b1-bfff-31e8ca7f11ae.png)


Bộ Jaeger Tracing backend gồm 3 thành phần chính là:
- Jaeger Agent
- Jaeger Collector: Collector sẽ thu thập từ Agent về  và lưu vào DB ( Ở đây chúng ta dùng Elasticsearch, và Jaeger mới chỉ support sử dụng Elasticsearch ver 6.x)
- Jaeger Query/ UI

File cấu hình jaeger-stack.yaml

``` yaml
---
version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:6.8.4
    hostname: elasticsearch
    networks:
      - elastic-jaeger
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
    environment:
      - bootstrap.memory_lock=true
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
    volumes:
      - esdata1:/usr/share/elasticsearch/data
      - eslog:/usr/share/elasticsearch/logs
      - ./config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml

  jaeger-collector:
    image: jaegertracing/jaeger-collector
    ports:
      - "14267:14267"
      - "14268:14268"
      - "9411:9411"
      - "14250:14250"
    hostname: jaeger-collector
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
    networks:
      - elastic-jaeger
    command: ["--es.server-urls=http://elasticsearch:9200"]
    environment:
      SPAN_STORAGE_TYPE: "elasticsearch"
    depends_on:
      - elasticsearch
  
  jaeger-agent:
    image: jaegertracing/jaeger-agent
    ports:
      - "5775:5775/udp"
      - "5778:5778"
      - "6831:6831/udp"
      - "6832:6832/udp"
    depends_on:
      - jaeger-collector
      - elasticsearch
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
    hostname: jaeger-agent
    networks:
      - elastic-jaeger
    command: ["--collector.host-port=jaeger-collector:14267"]

  jaeger-query:
    image: jaegertracing/jaeger-query:1.8
    ports:
      - "16686:16686"
    depends_on:
      - jaeger-collector
      - elasticsearch
    deploy:
      mode: replicated
      replicas: 1
      restart_policy:
        condition: on-failure
    networks:
      - elastic-jaeger
    environment:
      SPAN_STORAGE_TYPE: "elasticsearch"
      QUERY_BASE_PATH: "/ui"
    command: ["--es.server-urls=http://elasticsearch:9200", "--es.sniffer=false", "--log-level=debug"]
volumes:
  esdata1:
  eslog:

networks:
  elastic-jaeger:
```

File cấu hình cho `Elasticsearch` `config/elasticsearch.yml`:
```yaml
################################### Production Configuration ###################################
### Author: Greg Dooper
### Description: Parameters recommended from documentation

network :
    host : 0.0.0.0


################################### Cluster ###################################

# Cluster name identifies your cluster for auto-discovery. If you're running
# multiple clusters on the same network, make sure you're using unique names.
#
cluster.name: opentrace


#################################### Paths ####################################

# Path to directory containing configuration (this file and logging.yml):
#
#path.conf: /path/to/conf

# Path to directory where to store index data allocated for this node.
#
path.data: /usr/share/elasticsearch/data/

# Path to where plugins are installed:
#
#path.plugins: /path/to/plugins


################################## Discovery ##################################

# Discovery infrastructure ensures nodes can be found within a cluster
# and master node is elected. Multicast discovery is the default.

# Set to ensure a node sees N other master eligible nodes to be considered
# operational within the cluster. This should be set to a quorum/majority of 
# the master-eligible nodes in the cluster.
#

discovery.type: single-node
discovery.zen.ping.unicast.hosts: ["0.0.0.0"]
discovery.zen.minimum_master_nodes: 1

################################## Documentation Recommended Parameters ################################

indices.fielddata.cache.size: 40%


################################## Security ################################

# Uncomment if you want to enable JSONP as a valid return transport on the
# http server. With this enabled, it may pose a security risk, so disabling
# it unless you need it is recommended (it is disabled by default).
#
#http.jsonp.enable: true

################################## Shield ##################################

# This grants anonymous users superuser access to Elasticsearch
# THIS SHOULD ONLY BE USED FOR DEVELOPMENT
xpack.security.enabled: false
```


Deploy thông qua Docker stack sử dụng command
```
docker stack deploy --compose-file=jaeger-stack.yaml jaeger
```

### Jaeger Collector
`Jaeger Collector` nhận các trace từ `Jaeger Agent` và đưa đúng qua một pipeline. Trong `pipeline` sẽ xác mình trace, đánh chỉ mục chúng, thực hiện việc chuyển đổi trace đó sang dạng thông tin có giá trị hơn và cuối cùng lưu chúng vào `Elasticsearch`.

Container Jaeger Collector sẽ expose ra các cổng tới máy host để các service khác sử dụng.
``` yaml
ports:
      - "14267:14267"
      - "14268:14268"
      - "9411:9411"
      - "14250:14250"
```
Tuy nhiên bên trong network elastic-jaeger, các service vẫn giao tiếp với nhau qua cổng mặc định của chúng.

Do chúng ta sử dụng Elasticsearch để làm DB nên khi dựng container lên phải define rõ  `--es.server-urls`.
``` yaml
command: ["--es.server-urls=http://elasticsearch:9200"]
```



### Jaeger Agent
`Jaeger Agent` là một `network daemon` có nhiệm vụ nhận các log được gửi thông qua UDP từ ứng dụng và gửi nó tới `Collector`. Nó được thiết kế để triển khai trên tất các các máy chủ như một thành phần của infrastructure. `Jaeger Agent` tóm tắt các routing và phát hiện các nút thắt từ phía client.

Đây là service chính tương tác với phần Client để nhận thông tin của ứng dụng nên nó sẽ expose ra các cổng
```
ports:
      - "5775:5775/udp"
      - "5778:5778"
      - "6831:6831/udp"
      - "6832:6832/udp"
```
```yaml
command: ["--collector.host-port=jaeger-collector:14267"]
```
Config dùng để thông báo tới Agent host-port  của Jaeger Collector.
###  Jaeger Query
Là nơi tương tác với DB để lấy dữ liệu và hiển thị lên UI.

Sử dụng Jaeger UI

Truy cập http://127.0.0.1:16686/ui/search => Chon dự án cần trace và chọn Find traces

![](https://images.viblo.asia/d00f9eea-32c1-4719-b199-ccd5cd237dcc.png)