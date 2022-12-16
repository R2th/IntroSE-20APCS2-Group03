© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Trước khi đến với các concept khác trong Kafka, cùng thực hành với Kafka CLI trước cho đỡ quên lý thuyết. Let's begin.

## 1) Starting Kafka

### 1.1) Download

Đầu tiên cần set up môi trường với Kafka stand-alone (single broker). Vì practice với command line nên mình không sử dụng Docker, vã cmd luôn cho tiện.

Đảm bảo đã cài đặt sẵn JDK trên máy nhé, thấp nhất là version 8. 

Sau đó download Apache Kafka [tại đây](https://kafka.apache.org/downloads), hiện tại latest version là 2.8.0. 

Giải nén và bắt đầu cuộc hành trình. Mở terminal, kiểm tra thư mục hiện tại, nếu thấy output như này là ok:

```shell
$ ls
bin    config    libs    LICENSE    NOTICE    site-docs
```

Tiếp theo là add PATH để thực thi cho các câu lệnh cho nhanh:

```shell
vi ~/.bashrc
```

Thêm đường dẫn tới Apache Kafka vào cuối file:

```shell
export PATH=/home/admin/kafka_2.13-2.8.0/bin:$PATH
```

Testart terminal hoặc thực hiện command để reload PATH:

```shell
$ source ~/.bashrc
```

Verify để chắc chắn đã add PATH thành công với câu lệnh:

```shell
$ kafka-topics.sh

Create, delete, describe, or change a topic.
Option                                   Description
------                                   -----------
--alter                                  Alter the number of partitions,
                                           replica assignment, and/or
                                           configuration for the topic.
--at-min-isr-partitions                  if set when describing topics, only
                                           show partitions whose isr count is
                                           equal to the configured minimum. Not
                                           supported with the --zookeeper
                                           option.
```

Mình sử dụng Linux, nếu bạn sử dụng Windows thì search **Edit system environment** để thêm PATH nhé, sau đó cũng kiểm tra tương tự:

```shell
$ kafka-topics.bat
```

### 1.2) Start Zookeeper

Bước tiếp theo, tạo folder data cho Zookeeper tại bất kì chỗ nào bạn muốn, hoặc tạo trong folder Kafka:

```shell
$ mkdir -p data/zookeeper
```

Sau đó sửa config để Zookeeper write snapshot data ra folder vừa tạo:

```shell
$ vi config/zookeeper.properties
```

Tìm dòng config `dataDir=/tmp/zookeeper` và thay thế bằng đường dẫn đến thư mục:

```shell
dataDir=/home/admin/kafka_2.13-2.8.0/data/zookeeper
```

> Có thể không cần làm bước này :joy:, sử dụng default data folder tại `/tmp/zookeeper`.

Start Zookeeper:

```shell
$ zookeeper-server-start.sh config/zookeeeper.properties
```

Zookeeper start mặc định với port 2181, kiểm tra bằng cmd:

```shell
$ netstat -lpnt | grep 2181

tcp        0      0 0.0.0.0:2181            0.0.0.0:*               LISTEN      2995/java
```

Thấy output như trên tức là start thành công, hoặc có thể thực hiện telnet để kiểm tra. Lúc này khi mở folder data zookeeper sẽ thấy folder **version-2**.


### 1.3) Start Kafka

Làm tương tự như đã làm với Zookeeper, tạo folder data:

```shell
$ mkdir -p data/kafka
```

Sửa file config:

```shell
$ vi config/server.properties
```

Thay `log.dirs=/tmp/kafka-logs` thành:

```shell
log.dirs=/home/admin/kafka_2.13-2.8.0/data/kafka
```

Start Kafka:

```shell
$ kafka-server-start.sh config/server.properties
```

Kafka start với port 9092, có thể kiểm tra bằng cmd như với Zookeeper và check folder data.

Không quá phức tạp, tiếp theo cùng practice với Kafka CLI - Command line interface.

## 2) Practice with CLI

### 2.1) Topic

Tạo topic name bất kì với 4 required options:

> - **--bootstrap-server**: địa chỉ của Kafka server.
> - **--topic**: topic name.
> - **--partitions**: số lượng partitions muốn tạo.
> - **--replication-factor**: số lượng replication factor cho mỗi partition. Lưu ý rằng không thể tạo quá số lượng broker trong mạng cluster. Vì việc 1 broker giữ đến 2 bản sau của partition hoàn toàn không có ý nghĩa, do đó với ví dụ này, replication factor chỉ có thể = 1.

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --create \
    --partitions 3 \
    --replication-factor 1

Created topic my-first-topic.
```

Để list toàn bộ topic hiện có, sử dụng **--list** option:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --list

my-first-topic
```

Sử dụng **--describe** options trong trường hợp muốn xem nhiều thông số hơn về topic:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --describe

Topic: my-first-topic   TopicId: NGEHUggpSWGoLhEnJycwYA PartitionCount: 3       ReplicationFactor: 1    Configs: segment.bytes=1073741824
        Topic: my-first-topic   Partition: 0    Leader: 0       Replicas: 0     Isr: 0
        Topic: my-first-topic   Partition: 1    Leader: 0       Replicas: 0     Isr: 0
        Topic: my-first-topic   Partition: 2    Leader: 0       Replicas: 0     Isr: 0
```

Dòng đầu tiên có các thông tin chung về topic như **topic name**, số lượng **partition**, **replication-factor** và các additional config.

Các dòng tiếp theo diễn tả về thông số của từng partition. Nếu để ý sẽ thấy cả 3 thông số Leader, Replicas và Isr đều bằng 0. Vì nó là **broker id**, không phải số lượng. Với các hệ thống có nhiều hơn 1 broker, con số này có thể khác.

Nếu muốn xóa topic, sử dụng option **--delete**:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --delete
```

### 2.2) Producer

Tạo **topic** thành công, bước tiếp theo là tạo **producer** và gửi message với 1 required option:

> - **--bootstrap-server**: list địa chỉ Kafka broker dưới dạng host1:port1,host2:port2. 

```shell
$ kafka-console-producer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic
>
```

Nếu thấy output như trên tức là đã tạo thành công **producer**, tiến hành gửi vài message:

```shell
hello world
this is Kafka CLI practice
this is third message
bye now
```

**Ctrl + C** để terminate producer. Ngoài ra còn có rất nhiều options khác bạn có thể tham khảo document hoặc sử dụng command sau để xem các options:

```shell
$ kafka-console-producer.sh --help
```

Ok, topic **my-first-topic** đã được tạo trước đó, vậy nếu tạo producer gửi message đến topic chưa tồn tại thì chuyện gì sẽ xảy ra, thử xem sao:

```shell
$ kafka-console-producer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-second-topic
>
```

Không có lỗi gì, gửi message xem sao:

```shell
message to this topic
```

Đã có thông báo warning:

```shell
[2021-08-27 01:42:20,224] WARN [Producer clientId=console-producer] Error while fetching metadata with correlation id 3 : {test-new-topic=LEADER_NOT_AVAILABLE} (org.apache.kafka.clients.NetworkClient)
```

Gửi tiếp message khác xem thế nào:

```shell
other message to this topic
```

Không còn warning, cũng không có error. Ngon nghẻ rồi, vậy trong trường hợp producer produce message đến topic chưa tồn tại, Kafka sẽ tự động tạo topic. Dẫn đến 2 question:
> - Message đầu tiên gửi đến có thành công không?
> - Nếu Kafka tự tạo topic thì số lượng partition và replication-factor là bao nhiêu?

Sử dụng option **--describe** để kiểm tra:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092 \
    --topic my-second-topic \
    --describe
    
Topic: my-second-topic  TopicId: 7cXliRBvTqyKxI3p6m_EJg PartitionCount: 1       ReplicationFactor: 1    Configs: segment.bytes=1073741824
        Topic: my-second-topic  Partition: 0    Leader: 0       Replicas: 0     Isr: 0
```

Chỉ có duy nhất một partition, vì không tạo trước nên Kafka sử dụng default config để tạo topic. Chúng ta có thể sửa default config này trong file server.properties:

```shell
$ vi config/server.properties
````

Sửa `num.partitions=1` thành giá trị default mong muốn:

```shell
num.partitions=3
```

Sau đó restart Kafka để apply config mới. Best practice là hãy tạo **topic** trước khi có ý định produce/consume message, nếu không Kafka sẽ sử dụng default config.

### 2.3) Consumer

Phần này sẽ practice Kafka console consumer để verify message đã gửi ở phần trước cũng với 1 required option là **--bootstrap-server**.

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic
```

... chẳng thấy message nào. Nếu start consumer như trên, chúng chỉ có thể consume message từ ngay sau thời điểm được tạo mà không consume các message cũ.

Mở một terminal khác và produce message đến topic này:

```shell
$ kafka-console-producer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic
    
> enter your message here
> some other message
> other message again
```

Lúc này kiểm tra consumer đã thấy nhận được message. 

> Vì sao consumer không đọc toàn bộ message từ đầu? 
> 
> Thử tưởng tượng topic có vài trăm nghìn hoặc hàng triệu message, chúng ta sẽ mất kha khá thời gian xử lý hết trước khi đến message hiện tại. Lý do thứ hai là vì design của Kafka hướng đến hệ thống stream, real-time processing, vì vậy default không đọc lại toàn bộ message của topic.

Tuy nhiên cũng có một vài trường hợp muốn đọc toàn bộ message của Kafka. Để làm điều đó ta thêm option **--from-begining**:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --from-beginning
    
bye now
enter your message here
this is Kafka CLI practice
any one here
some other message
hello world
this is third message
other message again
```

Như vậy consumer đã consume đủ 8 message, nhưng thứ tự có vẻ không chính xác lắm, chả lẽ có bug...

> Chắc chắn là chẳng có bug nào ở đây cả, với [bài trước] ta đã biết message chỉ đảm bảo thứ tự trong cùng một partition. Topic **my-first-topic** có đến 3 partition thì việc toàn bộ message không order là chuyện hết sức bình thường.
>
> Thử lại với topic có 1 partition, chúng ta sẽ thấy toàn bộ các message được order đúng thứ tự như lúc produce.

### 2.4) Consumer group

Tiếp theo cùng practice với consumer group. Mở 2 terminal và tạo các consumer cùng group:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --group my-first-app
```

Tạo producer và produce message tới topic **my-first-topic**:

```shell
$ kafka-console-producer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic
    
>first message
>second message
>third message
>other message
```

Lúc này sẽ thấy các message lần lượt được route đến các consumer khác nhau trong cùng consumer group. Trong quá trình produce message hoàn toàn có thể tạo thêm hoặc xóa bớt consumer trong cùng group mà vẫn đảm bảo message được consume bình thường.

Việc start một consumer trong consumer group chỉ khác với consumer thường là nó nằm trong một group... Nếu muốn đọc toàn bộ message của topic, chỉ cần thêm option **--from-beginning**. Thử với một group **my-second-app**:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --group my-second-app \
    --from-beginning
    
bye now
enter your message here
third message
this is Kafka CLI practice
any one here
some other message
second message
hello world
...
```

Lúc này consumer sẽ consume toàn bộ message của topic từ đầu đến cuối. Thử start một consumer khác thuộc cùng group xem sao:

```shell
kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --group my-second-app \
    --from-beginning
```

Không có message nào mặc dù đã có option **--from-beginning**, vấn đề là gì?

> Bài trước mình đã đề cập đến, sau khi consume message, offset được commit về Kafka. Consumer trước đã đọc toàn bộ message, các consumer khác **thuộc cùng group** không thể consume các message cũ được.
>
> Nếu coi 1 group là 1 application (Java, Golang, Nodejs... whatever), Kafka đã cung cấp cơ chế để consume lại toàn bộ message topic cho consumer group khi start và thực tế ít khi sử dụng. Do đó chẳng có lý do gì một application cần consume lại topic message nhiều lần.

Để kiểm tra các thông tin về consumer group, sử dụng **kafka-consumer-groups** với các options Kafka cung cấp.

List consumer group:

```shell
$ kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --list
    
my-first-app
my-second-app
```

Thêm thêm các thông số của group với option **--describe**:

```shell
$ kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --describe \
    --group my-second-app
    
Consumer group 'my-second-app' has no active members.

GROUP           TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID     HOST            CLIENT-ID
my-second-app   my-first-topic  1          3               3               0               -               -               -
my-second-app   my-first-topic  2          4               4               0               -               -               -
my-second-app   my-first-topic  0          5               5               0               -               -               -
```

Nếu đã terminate toàn bộ các consumer, dòng đầu tiên hiện `Consumer group 'my-second-app' has no active members` không có gì lạ. Hãy xem các thông số phía sau:
> - Column `TOPIC` là topic name. Lưu ý rằng một consumer group có thể consume message từ nhiều **topic** khác nhau.
> - Column `PARTITION` là partition của topic.
> - Column `CURRENT-OFFSET` là offset đã xử lý cho đến thời điểm hiện tại của partition. Offset = 3 nghĩa là đã xử lý 3 message.
> - Column `LOG-END-OFFSET` là tổng số lượng message trong partition.
> - Column `LAG` là số lượng message chưa xử lý. Bằng 0 có nghĩa là đã xử lý hết message.

Produce thêm một vào message đến topic **my-first-topic** và describe lại **my-second-app** group, các thông số `LOG-END-OFFSET` và `LAG` sẽ thay đổi.

```shell
$ kafka-console-producer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic
    
>1
>2
>3
```

```shell
$ kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --describe \
    --group my-second-app
    
Consumer group 'my-second-app' has no active members.

GROUP           TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID     HOST            CLIENT-ID
my-second-app   my-first-topic  1          3               6               3               -               -               -
my-second-app   my-first-topic  2          4               4               0               -               -               -
my-second-app   my-first-topic  0          5               5               0               -               -               -
```

Sau đó, tiến hành start consumer trong **my-second-app** group, nó sẽ consume 3 message bị `LAG`:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --group my-second-app
    
1
2
3
```

### 2.5) Reset offset

Nếu coi 1 group là 1 application (Java, Golang, Nodejs... whatever), Kafka đã cung cấp cơ chế để consume lại toàn bộ message topic cho consumer group khi start và thực tế ít khi sử dụng. Do đó chẳng có lý do gì một application cần consume lại topic message nhiều lần.

Chém vậy chứ cũng có những trường hợp consumer group cần consume lại message từ topic, không phải toàn bộ message thì là vài hoặc một message.
> Ví dụ như crash application hoặc cần đọc lại vài message trước đó để xử lý business logic.

Resetting offset sẽ giúp chúng ta xử lý vấn đề trên. 

Sử dụng các option **--reset-offsets** với **kafka-consumer-groups** để reset offset cho 1 hoặc nhiều topic:

```shell
$ kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --group my-first-app \
    --reset-offsets \
    --to-earliest \
    --execute \
    --topic my-first-topic
    
GROUP              TOPIC                PARTITION  NEW-OFFSET
my-first-app       my-first-topic       0          0
my-first-app       my-first-topic       1          0
my-first-app       my-first-topic       2          0
```

Toàn bộ offset của các partition đã được reset về 0. Restart consumer, expect consumer sẽ consume lại tất cả message từ đầu:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic my-first-topic \
    --group my-first-app
    
bye now
enter your message here
third message
1
2
3
this is Kafka CLI practice
any one here
some other message
second message
hello world
...
```

Nếu muốn reset offset cho consumer group với toàn bộ topic, sử dụng **--all-topics** thay vì specific topic name:

```shell
$ kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --group my-first-app \
    --reset-offsets \
    --to-earliest \
    --execute \
    --all-topics
```

Ngoài ra còn nhiều options khác để reset chính xác đến vị trí offset, tiến lên hoặc lùi xuống sử dụng option **--shift-by {value}**:
> - Value > 0 là tiến lên.
> - Value < 0 là lùi xuống.

![](https://i.imgur.com/NNxbY1X.png)

```shell
$ kafka-consumer-groups.sh \
    --bootstrap-server localhost:9092 \
    --group my-first-app \
    --reset-offsets \
    --shift-by -2 \
    --execute \
    --all-topics
```

Cơ bản như vậy là đủ dùng, nếu muốn đọc thêm về các options có thể sử dụng **--help**:

```shell
$ kafka-consumer-groups.sh --help
```

## 3) Final

Việc sử dụng Kafka CLI giúp có cái nhìn tổng quan và practice với Kafka core: **topic**, **offset**, **partition**, **producer**, **consumer**...

Phần việc sử dụng CLI và monitoring dành cho DevOps hoặc SysAdmin. Chúng ta focus chính vào việc gửi nhận message, define logic code, thỉnh thoảng vào check Kafka UI debug cho vui.

> Việc connect thế nào, produce/consume message ra sao có framework lo hết rồi. Nếu sử dụng Spring thì chỉ cần thêm thắt config, add annotation là xong hết. Tuy nhiên cũng chính sự tiện lợi đó sẽ đánh mất cơ hội để chúng ta tìm hiểu sâu và kĩ hơn về những thứ đang làm.

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

### After credit

Ngoài Kafka CLI, một tool khác mà DevOps hay sử dụng để monitor hoặc debug Kafka là KafkaCat, các bạn có thể tìm hiểu thêm [tại đây](https://github.com/edenhill/kcat).

Một lưu ý nữa, Kafka không cung cấp GUI, dùng terminal cho chuyên nghiệp. Với dân không chuyên như mình thì vẫn khoái dùng UI cho tiện.
> - Doanh nghiệp lớn sẽ sử dụng các Enterprise tool như [Conduktor](https://www.conduktor.io/) hoặc [Offset explorer](https://www.kafkatool.com/purchase.html).
> - Open-source thì có [Kafka UI](https://github.com/provectus/kafka-ui) hoặc [Kafdrop](https://github.com/obsidiandynamics/kafdrop).

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)