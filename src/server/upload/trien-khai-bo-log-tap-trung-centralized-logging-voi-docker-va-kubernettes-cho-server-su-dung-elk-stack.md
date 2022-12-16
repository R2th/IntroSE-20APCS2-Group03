`ELK stack` bao gồm `Elasticsearch`, `Logstash` và `Kibana`, trong đó `Logstash` thu thập logs trong các ứng dụng của bạn đưa về lưu trữ trong `Elasticsearch` và `Kibana` sẽ trình diễn chúng trên một giao diện thân thiện với bạn hơn. Ngoài ra để thu thập logs cho `Kuberbernettes` thì mình sử dụng thêm `Fluentd`.

![](https://images.viblo.asia/becdea9c-be76-4328-971f-d8eccc83c940.jpeg)

## I. Thu thập logs từ Docker
### Điều kiện cần
Để thuận tiện cho Logstash có thể thu thập logs từ các Docker Container,  đầu tiên hãy sửa logging driver của Docker nằm ở `/etc/docker/daemon.json` về sử dụng `syslog`:

```json
{
  "log-driver": "syslog",
  "log-opts": {
    "syslog-address": "tcp://127.0.0.1:9600"
  }
}
```

> Trong đó tcp://127.0.0.1:9600 tương ứng là giao thức TCP để truyền tin đến Logstash được đặt ở IP 127.0.0.1 và port là 9600.
> 
> Tìm hiểu thêm ở: [Configure logging drivers](https://docs.docker.com/config/containers/logging/configure/)
### Triển khai ELK stack bằng Docker Stack
Docker Stack file và config của ELK mình sử dụng như bên dưới:

[Github repository](https://github.com/daothaison/docker-elk)

``` yaml:docker-stack.yml
version: '3.3'

services:

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.1
    ports:
      - "9200:9200"
      - "9300:9300"
    configs:
      - source: elastic_config
        target: /usr/share/elasticsearch/config/elasticsearch.yml
    volumes:
      - /u01/elasticsearch/data:/usr/share/elasticsearch/data
    environment:
      ES_JAVA_OPTS: "-Xms512m -Xmx512m"
      ELASTIC_PASSWORD: changeme
      ES_HEAP_SIZE: 1g
      MAY_LOCKED_MEMORY: unlimited
      node.max_local_storage_nodes: 20
    networks:
      - elk
    deploy:
      mode: replicated
      replicas: 1

  logstash:
    image: docker.elastic.co/logstash/logstash:7.4.1
    ports:
      - "5000:5000"
      - "9600:9600"
    configs:
      - source: logstash_config
        target: /usr/share/logstash/config/logstash.yml
      - source: logstash_pipeline
        target: /usr/share/logstash/pipeline/logstash.conf
    environment:
      LS_JAVA_OPTS: "-Xmx256m -Xms256m"
    networks:
      - elk
    deploy:
      mode: replicated
      replicas: 1
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.4.1
    ports:
      - "8601:5601"
    configs:
      - source: kibana_config
        target: /usr/share/kibana/config/kibana.yml
    networks:
      - elk
    deploy:
      mode: replicated
      replicas: 1
    depends_on:
      - elasticsearch

configs:
  elastic_config:
    file: ./elasticsearch/config/elasticsearch.yml
  logstash_config:
    file: ./logstash/config/logstash.yml
  logstash_pipeline:
    file: ./logstash/pipeline/logstash.conf
  kibana_config:
    file: ./kibana/config/kibana.yml

networks:
  elk:
    driver: overlay
```
Chúng ta sẽ deploy thông qua Docker Stack bằng command.

```bash
$ docker stack deploy --compose-file=docker-stack.yaml elk
// --compose-file chính là đường dẫn đến stack file
// elk là  tên của serivce.
```

#### Lưu ý đối với containter Elasticsearch

``` yaml
version: '3.3'

services:

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.1
    ports:
      - "9200:9200"
      - "9300:9300"
    configs:
      - source: elastic_config
        target: /usr/share/elasticsearch/config/elasticsearch.yml
    volumes:
      - /u01/elasticsearch/data:/usr/share/elasticsearch/data
    environment:
      ES_JAVA_OPTS: "-Xms512m -Xmx512m"
      ELASTIC_PASSWORD: changeme
      ES_HEAP_SIZE: 1g
      MAY_LOCKED_MEMORY: unlimited
      node.max_local_storage_nodes: 20
    networks:
      - elk
    deploy:
      mode: replicated
      replicas: 1
```
  
- Container của Elasticsearch sẽ mount thư mục `/u01/elasticsearch/data` từ ngoài máy host vào trong container, thư mục này cần được cấp quyền cho elasticsearch sử dụng được nên cần phải sửa chown cho nó

```bash
$ sudo chown -R 1000:1000 /u01/elasticsearch/data
```

- `Elasticsearch` expose ra 2 cổng `9200, 9300` và sẽ join vào Docker network `elk` để có thể giao tiếp với các container khác trong cùng network
#### Lưu ý với container Logstash

```yaml
...

  logstash:
    image: docker.elastic.co/logstash/logstash:7.4.1
    ports:
      - "5000:5000"
      - "9600:9600"
    configs:
      - source: logstash_config
        target: /usr/share/logstash/config/logstash.yml
      - source: logstash_pipeline
        target: /usr/share/logstash/pipeline/logstash.conf
    environment:
      LS_JAVA_OPTS: "-Xmx256m -Xms256m"
    networks:
      - elk
    deploy:
      mode: replicated
      replicas: 1
    depends_on:
      - elasticsearch
```

File config cho Logstash nằm trong thư mục `logstash/` gồm config để giao tiếp với `Elasticsearch` và `pipeline` để cấu hình luồng logs input và output của Logstash.

``` yaml
input {
    syslog {
        type => syslog
        port => 9600
    }
}

 Add your filters / logstash plugins configuration here
filter {
    grok {
        match => {
            "message" => "..." // Thêm regex pattern match với log của bạn vào đây
        }
        add_field => {
            "type" => "message_full"
        }
    }
    if "_grokparsefailure_sysloginput" in [tags] {
      drop {}
    }
}

output {
    elasticsearch {
        hosts => "elasticsearch:9200"
        user => "elastic"
        password => "changeme"
    }
}

```

Trong phần config pipeline có phần filter sử dụng `grok` để lọc log gửi về từ `Docker container`. `Grok` sẽ tìm field tên là `message` và thực hiện extract thông tin trong `message` đó thành 1 object có giá trị, dễ hiểu để sử dụng ở trên `Kibana`. Trong ví dụ, nếu bạn sử dụng `Grok pattern` này

```erlang
// Pattern
(?<time>(<%{WORD}>%{MONTH} %{MONTHDAY} %{TIME} %{WORD}\[%{WORD}\])): %{TIMESTAMP_ISO8601:timestamp} \| %{LOGLEVEL:log_level}.*\| (?<detail>(%{WORD} \| %{WORD} \| %{WORD})) \| (?<container>(.+?)) \| (?<project_name>(\@%{WORD}.%{WORD}@)) \|(?<correlation_id>(.+?))\|(?<client_ip>(.+?))\| (?<msg>(\[.*\].*))
```
```markdown
// Message log chạy qua Logstash
<30>Nov 19 11:35:32 c3e4e76fc8bb[31175]: 2019-11-19T04:35:32.224Z | INFO  | VDS | AppLog | Java | 3324.container-0-C-1 | @project.name@ | 111112vwsdf  | 129.0.0.1 | [Consumer clientId=consumer-2, groupId=anonymous.2ff2fs2d-965a-4b1e-a873-ea27d6ce9fc9] Group coordinator 10.0.244.255:9000 (id: 1111111 rack: null) is unavailable or invalid, will attempt rediscovery
```

```json
// Output nhận được sẽ là
{
  "time": [
    "<30>Nov 19 11:35:32 c3e4e76fc8bb[31175]"
  ],
  "timestamp": [
    "2019-11-19T04:35:32.224Z"
  ],
  "log_level": [
    "INFO"
  ],
  "detail": [
    " | AppLog | Java"
  ],
  "container": [
    "3324.container-0-C-1"
  ],
  "project_name": [
    "@project.name@"
  ],
  "correlation_id": [
    " 111112vwsdf  "
  ],
  "client_ip": [
    " 129.0.0.1 "
  ],
  "msg": [
    "[Consumer clientId=consumer-2, groupId=anonymous.c75c47ea-965a-4b1e-a873-ea27d6ce9fc9] Group coordinator  10.0.244.255:9000 (id: 1111111 rack: null) is unavailable or invalid, will attempt rediscovery "
  ]
}
```
Tham khảo thêm [Grok pattern debugger tại đây ](https://grokdebug.herokuapp.com/) .
#### Kibana

``` yaml
...
kibana:
    image: docker.elastic.co/kibana/kibana:7.4.1
    ports:
      - "8601:5601"
    configs:
      - source: kibana_config
        target: /usr/share/kibana/config/kibana.yml
    networks:
      - elk
    deploy:
      mode: replicated
      replicas: 1
    depends_on:
      - elasticsearch
```

`Kibana` sẽ expose cổng `5601` ra cổng `8601` trên máy host để có thể truy cập tới được.
##### Sử dụng Kibana
- B1: User đăng nhập mặc định là elastic, mật khẩu là changeme . tại địa chỉ http://127.0.0.1:8601/
- B2: Tạo` index pattern` để hiển thị log từ `Logstash`
        Điền `logstash-*` vào ô Index pattern -> Next step
- B3: Chọn @timestamp -> Create index pattern

- B4: Xem logs được đổ về ở http://127.0.0.1:8601/app/kibana#/discover?_g=()
Ở đây bạn chọn vào nút +Add filter sau đó điền các giá trị như trong hình bên dưới để lọc logs theo tên project. Giá trị Value này là 1 Regex pattern match với các message có chứa thông tin @project.name@.

## II. Thu thập logs từ trong Kubernetes.
### Sử dụng Fluentd.

![](https://images.viblo.asia/fd921e76-ae34-4ed3-b34f-23d6100d9ed0.png)

`Fluentd` là một ứng dụng hoàn toàn miễn phí và open-source giúp bạn có thể lấy được log ở web server và xử lý log data đó. Dữ liệu log lấy đươc rất có thể từ nginx, apache hoặc đơn giản là từ các gói tin tcp hay các message của http. Để thu thập logs từ Kubernettes mình sẽ triển khai `Fluentd` bằng object là `DaemonSet`.
`DaemonSet` thường được sử dụng để triển khai 1 service trên tất cả các `Pod`

#### Tạo namespace kube-logging

```yaml
kind: Namespace
apiVersion: v1
metadata:
  name: kube-logging
```

tạo namespace bằng lệnh 
```bash
$ kubectl apply -f kube-logging.yaml
```
#### Tạo Daemonset Fluentd

``` yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: fluentd
  namespace: kube-logging
  labels:
    app: fluentd
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fluentd
  labels:
    app: fluentd
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - namespaces
  verbs:
  - get
  - list
  - watch
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: fluentd
roleRef:
  kind: ClusterRole
  name: fluentd
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: fluentd
  namespace: kube-logging
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: kube-logging
  labels:
    app: fluentd
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      serviceAccount: fluentd
      serviceAccountName: fluentd
      tolerations:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1.4.2-debian-elasticsearch-1.1
        env:
          - name:  FLUENT_ELASTICSEARCH_HOST
            value: "IP..." //Public IP của Elasticsearch đã cài ở trên
          - name:  FLUENT_ELASTICSEARCH_PORT
            value: "9200"
          - name:  FLUENT_ELASTICSEARCH_USER
            value: "elastic"
          - name:  FLUENT_ELASTICSEARCH_PASSWORD
            value: "changeme"
          - name: FLUENT_ELASTICSEARCH_SCHEME
            value: "http"
          - name: FLUENTD_SYSTEMD_CONF
            value: disable
        resources:
          limits:
            memory: 512Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
```

Thực hiện tạo DaemonSet bằng command 
``` bash
$ kubectl apply -f fluentd.yaml
```

Trong file cấu hình của fluentd có đoạn cấu hình: 
``` yaml
containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1.4.2-debian-elasticsearch-1.1
        env:
          - name:  FLUENT_ELASTICSEARCH_HOST
            value: "IP..." //Public IP của Elasticsearch đã cài ở trên
          - name:  FLUENT_ELASTICSEARCH_PORT
            value: "9200"
          - name:  FLUENT_ELASTICSEARCH_USER
            value: "elastic"
          - name:  FLUENT_ELASTICSEARCH_PASSWORD
            value: "changeme"
          - name: FLUENT_ELASTICSEARCH_SCHEME
            value: "http"
          - name: FLUENTD_SYSTEMD_CONF
            value: disable
```

Fluentd sẽ gửi logs về cho Elasticsearch trên server IP thông qua port 9200 được config ở Docker stack bên trên.
Logs sẽ được hiển thị bên trong http://127.0.0.1:8601/

## Tạm kết

Trên đây mình vừa đưa ra cấu hình cho ELK và Fluentd để thu thập logs từ Docker và Kubernettes. Tuy nhiên bộ config trên chưa thực sự tối ưu trên môi trường production khi số lượng container, pod đồng thời gửi logs về hệ thống Logs tập trung này nhiều lên, trong bài viết tới, mình sẽ chỉ ra những điểm cần thay đổi, cấu hình cho khả năng scaling của hệ thống.