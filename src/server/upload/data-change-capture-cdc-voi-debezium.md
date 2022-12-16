# Mở đầu
Làm việc với hệ thống database từ trước đến nay vẫn luôn là công việc khó khăn và bạc đầu, dạo gần đây mình có cơ hội làm việc với một giải pháp mới cho database sử dụng để phát hiện ra sự thay đổi từ một database và sao chép dữ liệu đó sang một database khác cùng loại hoặc khác loại. Để xử lý bài toán này mình sử dụng giải pháp có tên như title - **C**hange **D**ata **C**apture hay nói gắn gọn là CDC.

![image.png](https://images.viblo.asia/c53b8610-22bb-47f8-a6fe-785e70072ba2.png)

# Change Data Capture là gì?
Đúng như cái tên của nó là **bắt sự thay đổi dữ liệu**, đây là kỹ thuật sử dụng để chúng ta bắt được những sự thay đổi về dữ liệu chứa trong database. Việc bắt được sự thay đổi về dữ liệu sẽ giúp chúng ta xử lý được kha khá các bài toán trong việc xử lý dữ liệu, những bài toán này thế nào cũng ta sẽ tìm hiểu trong phần tiếp theo.

Để mà có thể bắt được sự thay đổi dữ liệu này thì có rất nhiều các khác nhau, nguyên thủy nhất ta có thể sử dụng cơ chế TRIGGER trong các database đã hỗ trợ sẵn để bắt các ACTION về update, insert, delete,... Hoặc nhẹ nhàng hơn chúng ta có thể sử dụng các công cụ để làm việc này, điển hình có công cụ **Debezium** đang nổi bật nhất.

# Lợi ích của CDC
Lợi ích đầu tiên mà chắc ai cũng thấy đó là việc **sao chép dữ liệu sang các hệ thống khác**, nếu nói về lợi ích này có thể 1 số bạn sẽ nói rằng: Các hệ thống database đều hỗ trợ các cơ chế replica rồi thì sử dụng luôn chứ cần gì phải sử dụng một tool bên ngoài cho rức đầu mà kém ổn định? Okay, đúng! Nếu bạn chỉ cần sao chép dữ liệu từ các database cùng loại (MySQL => MySQL, Mongo => Mongo) thì sử dụng luôn tính năng của database là tốt nhất. Tuy nhiên giờ nếu bạn muốn sao chép dữ liệu từ MySQL qua MongoDB hay từ MySQL qua PostgreSQL thì sẽ không có cơ chế đó. Trong bài toán này CDC sẽ đứng giữa để phát hiện sự thay đổi ở Database cần theo dõi và xử lý dữ liệu, sao đó có thể dùng code để xử lý và đẩy dữ liệu và hệ thống cần sao chép dữ liệu.

![image.png](https://images.viblo.asia/5c9f3624-39bf-40f7-bdd1-166b4bdacd27.png)

Một lợi ích khác cũng không kém phần quan trọng đó là **khả năng Backup dữ liệu**. Các sự kiện thay đổi dữ liệu sẽ được lưu trữ lại chính vì vậy nếu có chăng không may database của bạn bị drop vào lúc 9h sáng, bạn có thể lấy bản backup lúc 3h sáng và apply lại những thay đổi đã được lưu lại từ 3h đến 9h. Theo lý thuyết nếu bạn không miss bất cứ event nào thì dữ liệu của bạn sẽ được phục hồi đầy đủ như trước lúc bị drop. Quá đã đúng không :))))

![image.png](https://images.viblo.asia/0ea9ddf0-1039-4172-b4df-83445fab8e42.png)

Tiếp tục với lợi ịch đầu tiên, sau khi ta sao chép dữ liệu sang hệ thống khác ta **có thể sử dụng hệ thống này cho việc testing** thay vì tương tác trực tiếp trên hệ thống database thật. Không hiếm có những chuyện trong quá trình test Developers chạy những câu query tốn hàng phút để xử lý, thậm chí tệ hơn có thể gây ra lock hệ thống. Vấn đề này nhẹ thì gây giảm hiệu năng hệ thống, nặng thì gây crash luôn. CDC cũng là một cách giúp chúng ta giảm thiểu đi các trường hợp thế này sẽ xảy ra.

![image.png](https://images.viblo.asia/22a4a1cc-c33c-476d-a0b2-18d5cb2c6450.png)

Ngoài ra CDC còn hỗ trợ cho một số bài toán đặc thù của từng hệ thống hay xử lý dữ liệu Big Data, bạn nào từng ứng dụng CDC vào các bài toán này rồi chia sẻ với mình ở dưới nhé.

# Debezium - CDC Tool
Nói lý thuyết hoài mà không có tý ví dụ để xem thì có ích gì đâu, chính vì thế mình sẽ giới thiệu công cụ mà đã có thời gian làm việc và thấy khá ngon, công cụ này là Debezium. Debezium cốt lỗi của nó sử dụng Kafka để tạo ra các messages tương ứng với các events thay đổi dữ liệu. Debezium sử dụng các Connector để kết nối đến các hệ thống database và bắt ra sự thay đổi, **hiện tại Debezium 1.9 hỗ trợ MySQL, PostgreSQL, MongoDB, Oracle, SQL Server, DB2, Cassandra, Vitess.** Bạn có thể xem hướng dẫn cho từng connector tại document chính thức: https://debezium.io/documentation/reference/2.0/connectors/index.html

Đây là mô hình của Debezium, trước hết ta còn có source DB - nơi chúng ta theo dõi sự thay đổi dữ liệu. Kafka Connect đóng vai trò phát hiện ra các thay đổi và push event vào trong Kafka Apache. Sau đó dữ liệu có thể được đẩy ra các sink tùy theo nhu cầu sử dụng.
![image.png](https://images.viblo.asia/6baa45d5-205b-4540-b9a1-d36b9fb0ef92.png)

Trong phần này mình sẽ mô tả các bước cài đặt của MySQL, loại database chắc mọi người làm việc nhiều nhất.

Đối với MySQL, Debezium sẽ dựa vào binlog để có thể phát hiện ra sự thay đổi về dữ liệu, chính vì vậy đối với hệ thống cần monitor thì bạn cần enable tính năng binlog này và chắc chắn user dùng để kết nối đến cần có quyền đọc binlog.

Mình làm việc với Kubernetes nhiều nên công cụ này mình sẽ hướng dẫn mọi người dựng trên K8s, đối với các môi trường khác như VM hay Docker thì về cơ bản cũng có các thành phần tương tự.

Debezium khi chạy trên K8s sẽ sử dụng Strimzi Operator (đây là một Operator cho Kafka). Đầu tiên ta tạo một namespace riêng cho ứng dụng này: 

 `kubectl create ns debezium-example`
 
 Sau đó ta cần cài đặt Strimzi Operator
 
`curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.20.0/install.sh | bash -s v0.20.0`

Tạo Secret cho database demo
```yaml
cat << EOF | kubectl create -n debezium-example -f
apiVersion: v1
kind: Secret
metadata:
  name: debezium-secret
  namespace: debezium-example
type: Opaque
data:
  username: ZGViZXppdW0=
  password: ZGJ6
EOF
```

Tạo User và phân quyền cho Debezium
```yaml
cat << EOF | kubectl create -n debezium-example -f
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: connector-configuration-role
  namespace: debezium-example
rules:
- apiGroups: [""]
  resources: ["secrets"]
  resourceNames: ["debezium-secret"]
  verbs: ["get"]
EOF
```

```yaml
$ cat << EOF | kubectl create -n debezium-example -f
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: connector-configuration-role-binding
  namespace: debezium-example
subjects:
- kind: ServiceAccount
  name: debezium-connect-cluster-connect
  namespace: debezium-example
roleRef:
  kind: Role
  name: connector-configuration-role
  apiGroup: rbac.authorization.k8s.io
EOF
```

Giờ đến phần quan trọng, chúng ta sẽ khởi tạo một cụm Kafka phục vụ cho việc lưu trữ changes event. Cấu hình dưới sẽ tạo 1 pod kafka tương ứng 1 broker và 1 pod zookeeper.
```yaml
$ cat << EOF | kubectl create -n debezium-example -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: debezium-cluster
spec:
  kafka:
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
      - name: tls
        port: 9093
        type: internal
        tls: true
        authentication:
          type: tls
      - name: external
        port: 9094
        type: nodeport
        tls: false
    storage:
      type: jbod
      volumes:
      - id: 0
        type: persistent-claim
        size: 100Gi
        deleteClaim: false
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      default.replication.factor: 1
      min.insync.replicas: 1
  zookeeper:
    replicas: 1
    storage:
      type: persistent-claim
      size: 100Gi
      deleteClaim: false
  entityOperator:
    topicOperator: {}
    userOperator: {}
EOF
```

Tiếp theo ta triển khai một database MySQL để test thử, user và pass của DB này là **mysqluser - msqlpw**
```yaml
cat << EOF | kubectl create -n debezium-example -f -
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  ports:
  - port: 3306
  selector:
    app: mysql
  clusterIP: None
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  selector:
    matchLabels:
      app: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - image: quay.io/debezium/example-mysql:1.9
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: debezium
        - name: MYSQL_USER
          value: mysqluser
        - name: MYSQL_PASSWORD
          value: mysqlpw
        ports:
        - containerPort: 3306
          name: mysql
EOF
```

Giờ ta sẽ triển khai các thành phần với vai trò kết nối đến MySQL và detect changes. Đầu tiên ta cần tạo KafkaConnect để thực hiện công việc detect changes:
```yaml
$ cat << EOF | kubectl create -n debezium-example -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaConnect
metadata:
  name: debezium-connect-cluster
  annotations:
    strimzi.io/use-connector-resources: "true"
spec:
  version: 3.1.0
  replicas: 1
  bootstrapServers: debezium-cluster-kafka-bootstrap:9092
  config:
    config.providers: secrets
    config.providers.secrets.class: io.strimzi.kafka.KubernetesSecretConfigProvider
    group.id: connect-cluster
    offset.storage.topic: connect-cluster-offsets
    config.storage.topic: connect-cluster-configs
    status.storage.topic: connect-cluster-status
    # -1 means it will use the default replication factor configured in the broker
    config.storage.replication.factor: -1
    offset.storage.replication.factor: -1
    status.storage.replication.factor: -1
  build:
    output:
      type: docker
      image: 10.110.154.103/debezium-connect-mysql:latest
    plugins:
      - name: debezium-mysql-connector
        artifacts:
          - type: tgz
            url: https://repo1.maven.org/maven2/io/debezium/debezium-connector-mysql/{debezium-version}/debezium-connector-mysql-{debezium-version}-plugin.tar.gz
EOF
```

Sau đó ta triển khai thêm các KafkaConnector để kết nối đến MySQL được gắn vào KafkaConnect đã tạo ở trên 
```bash
cat << EOF | kubectl create -n debezium-example -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaConnector
metadata:
  name: debezium-connector-mysql
  labels:
    strimzi.io/cluster: debezium-connect-cluster
spec:
  class: io.debezium.connector.mysql.MySqlConnector
  tasksMax: 1
  config:
    tasks.max: 1
    database.hostname: mysql
    database.port: 3306
    database.user: ${secrets:debezium-example/debezium-secret:username}
    database.password: ${secrets:debezium-example/debezium-secret:password}
    database.server.id: 184054
    database.server.name: mysql
    database.include.list: inventory
    database.history.kafka.bootstrap.servers: debezium-cluster-kafka-bootstrap:9092
    database.history.kafka.topic: schema-changes.inventory
EOF
```

Như vậy là đã setup xong và giờ ta có thể giám sát được sự thay đổi trong database. Ta chạy câu lệnh này để listen messages trong kafka
```bash
kubectl run -n debezium-example -it --rm --image=quay.io/debezium/tooling:1.2  --restart=Never watcher -- kcat -b debezium-cluster-kafka-bootstrap:9092 -C -o beginning -t mysql.inventory.customers
```

Mở một terminal khác, Giờ ta sẽ truy cập vào DB và tiến hành thêm một bản ghi để test thử:
```bash
kubectl run -n debezium-example -it --rm --image=mysql:8.0 --restart=Never --env MYSQL_ROOT_PASSWORD=debezium mysqlterm -- mysql -hmysql -P3306 -uroot -pdebezium
```
Add thêm một bản ghi:
```sql
sql> update customers set first_name="Sally Marie" where id=1001;
```

Nếu các bạn nhìn thấy có message dạng JSON như sau thì việc setup đã thành công:
```json
{
...
  "payload": {
    "before": {
      "id": 1001,
      "first_name": "Sally",
      "last_name": "Thomas",
      "email": "sally.thomas@acme.com"
    },
    "after": {
      "id": 1001,
      "first_name": "Sally Marie",
      "last_name": "Thomas",
      "email": "sally.thomas@acme.com"
    },
    "source": {
      "version": "{debezium-version}",
      "connector": "mysql",
      "name": "mysql",
      "ts_ms": 1646300467000,
      "snapshot": "false",
      "db": "inventory",
      "sequence": null,
      "table": "customers",
      "server_id": 223344,
      "gtid": null,
      "file": "mysql-bin.000003",
      "pos": 401,
      "row": 0,
      "thread": null,
      "query": null
    },
    "op": "u",
    "ts_ms": 1646300467746,
    "transaction": null
  }
}
```

Message events thông báo ra sẽ có 3 mục chính gồm source (nguồn chứa dữ liệu, ví dụ file binlog bao nhiêu), before (dữ liệu trước khi thay đổi) và after (dữ liệu sau khi thay đổi). Từ mục before và after ta sẽ phát hiện được là dữ liệu đã thay đổi thế nào (sửa, xóa hay cập nhật)

Ngoài ra Debezium còn có khả năng làm rất nhiều công việc khác như tự động replica changes giữa 2 DB khác nhau,...


# Kết
Trong quá trình cài mình gặp khá nhiều vấn đề :v, một phần do chưa có nhiều kinh nghiệm với Kafka. Nếu các bạn cài đặt gặp lỗi thì bạn không cô đơn đâu :)))) Lỗi gì bạn có thể comment để mình hỗ trợ. Hy vọng bài viết này đã giúp bạn có thêm 1 vài kiến thức về Change Data Capture.

Một số source mình tham khảo:

https://luminousmen.com/post/change-data-capture
https://www.striim.com/tutorial/streaming-data-integration-using-cdc-to-stream-database-changes/