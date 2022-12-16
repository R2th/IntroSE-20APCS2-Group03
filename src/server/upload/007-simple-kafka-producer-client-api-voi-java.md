© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Cùng set up Kafka cluster với 3 brokers trên môi trường local để practice với Producer và hiểu rõ hơn về Kafka storage architecture.

## 1) Start Kafka cluster

Mở terminal và cd đến Kafka dir, bắt đầu cuộc hành trình. Cd đến config/ và clone ****server.properties**** ra 2 file đặt tên lần lượt là **server-1.properties**, ****server-2.properties****.

```shell
$ cp config/server.properties config/server-1.properties && \
    cp config/server.properties config/server-2.properties
```

Với prod env, mỗi broker là một physical machine/virtual machine/container nên không cần sửa các config liên quan đến port và data dir. Tuy nhiên chúng ta chạy multi brokers trên cùng host nên cần có chút thay đổi. 

Với **server-1.properties**, tìm config key và sửa như sau:

```shell
broker.id=1

listeners=PLAINTEXT://:9093

log.dirs=/home/admin/kafka_2.13-2.8.0/data/kafka-1
```

File **server-2.properties**:

```shell
broker.id=2

listeners=PLAINTEXT://:9094

log.dirs=/home/admin/kafka_2.13-2.8.0/data/kafka-2
```

Start 2 Kafka broker với 2 terminal mới để join vào cụm [Kafka cluster sẵn có](https://hackmd.io/@datbv/B1mBcHkbY#12-Start-Zookeeper).

```shell
$ kafka-server-start.sh config/server-1.properties
```

```shell
$ kafka-server-start.sh config/server-2.properties
```

Kiểm tra với câu lệnh:

```shell
$ zookeeper-shell.sh localhost:2181 ls /brokers/ids

Connecting to localhost:2181

WATCHER::

WatchedEvent state:SyncConnected type:None path:null
[0, 1, 2]
```

Perfect, Kafka cluster đã ready với 3 broker ids: 0, 1, 2.

## 2) Kafka storage architecture

[Bài trước](https://viblo.asia/p/006-thuc-hanh-apache-kafka-voi-kafka-cli-6J3ZgyoL5mB) đã tìm hiểu về **topic**, **partition**, **replication**, tiếp theo cùng xem bí ẩn đằng sau là gì, cách nó lưu trữ các message thế nào.

![](https://i.imgur.com/OXUCj3c.png)

Kafka tạo **log file** cho topic để lưu trữ message. **Log file** này được partition, replicated và segmented thành nhiều phần khác nhau. 

Tạo topic mới với 5 partition và replication-factor = 3:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092,localhost:9093 \
    --partitions 5 \
    --replication-factor 3 \
    --topic new-kafka-topic \
    --create
```

Check data dir của broker bất kì sẽ thấy 5 directories tương ứng với 5 partitions của **new-kafka-topic** được tạo ra:

```shell
$ ls -d data/kafka-0/* | grep new-kafka-topic

data/kafka-0/new-kafka-topic-0
data/kafka-0/new-kafka-topic-1
data/kafka-0/new-kafka-topic-2
data/kafka-0/new-kafka-topic-3
data/kafka-0/new-kafka-topic-4
```

Check data dir của các broker còn lại cũng nhận kết quả tương tự. Vì chúng ta đang để thông số replication-factor = 3, có nghĩa là 1 partition được replicate thành 3 phiên bản ở 3 broker khác nhau. 

> Tạo topic mới **other-kafka-topic** với replication-factor = 2, mỗi partition chỉ có 2 directories nằm rải rác ở broker khác nhau.

![](https://i.imgur.com/NhhFbiM.png)

Mỗi partition được lưu trữ tại một directory:
> - Tạo topic với 3 partitions được lưu trữ tương ứng trên 3 directories.
> - Topic với 10 partitions là 10 directories.

Ngoài ra còn hệ số **replication-factor**, như vậy tổng số lượng replicas của một topic là **replication-factor** * **number of partitions**. Với ví dụ trên **new-kafka-topic** có tổng cộng 3 * 5 = 15 directories để lưu trữ message.

Dĩ nhiên message không được lưu ở directory mà được lưu ở file nằm trong directory. Các file đó dưới dạng extension .log được gọi là **log segment**.

Kiểm tra với cmd:

```shell
$ ls data/kafka-0/new-kafka-topic-0/ | grep log

00000000000000000000.log
```

Hiện tại chưa có message nào nên chỉ thấy một file. Khi số lượng message đạt đến mức nhất định, Kafka tạo một file khác để lưu trữ. Default mỗi **log segment** có size là 1 GB.

**Log segment** file name được đặt tên với message offset đầu tiên của mỗi segment:

```shell
00000000000000000000.log
00000000000000092773.log
00000000000002696461.log
```

Đó là toàn bộ cách Kafka lưu trữ message trong mỗi broker với **directory** và **file**. Tất cả đều clear và dễ hiểu, không có gì bí thuật ở đây.

## 3) Producer

Tạo Java project với Maven hoặc Gradle tùy thuộc sở thích của bạn.

Thêm dependencies sau nếu sử dụng Gradle:

```shell
dependencies {
    implementation 'org.apache.kafka:kafka-clients:2.8.0'
    implementation 'org.slf4j:slf4j-simple:1.7.32'
}
```

Với Maven:

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.kafka</groupId>
        <artifactId>kafka-clients</artifactId>
        <version>2.8.0</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-simple</artifactId>
        <version>1.7.32</version>
    </dependency>
</dependencies>
```

Tạo Producer với các **properties**:

```java
final var props = new Properties();
props.setProperty(ProducerConfig.CLIENT_ID_CONFIG, "java-producer");
props.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
props.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
props.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
```

Có 3 **properties** cần quan tâm:
> - **CLIENT_ID_CONFIG**: optional config, nhằm mục đích tracking nguồn produce message.
> - **BOOTSTRAP_SERVERS_CONFIG**: địa chỉ đích của Kafka cluster để init connection. Sau khi connect thành công, Kafka producer tự động query metadata và connect đến toàn bộ broker trong mạng Kafka cluster. Có thể sử dụng 1, 2 hoặc tất cả broker address theo format **broker-1-hort:broker-1-port,broker-2-hort:broker-2-port**. Best practice là define 2 - 3 address để trong trường hợp bất kì broker nào không connect được, Kafka producer sẽ connect đến broker khác.
> - **KEY_SERIALIZER_CLASS_CONFIG** và **VALUE_SERIALIZER_CLASS_CONFIG**: tất cả message gửi đến Kafka bao gồm key và value. Key có thể null nhưng message gửi đi luôn bao gồm cặp key value. Message gửi đi trong network là byte array, do vậy data cần được serialized thành bytes. Kafka producer API cung cấp sẵn vài serializer thông dụng và chúng ta chỉ cần dùng nó. Nhưng trong thực tế, thường sử dụng custom serializer với JSON bằng cách implement Serializer<T> interface.

Tiếp theo, tạo Producer và gửi 100 messages đến topic. **ProducerRecord<K, V>** cung cấp nhiều arguments để tạo message trong đó có 2 mandatory fields và 4 optional fields:

> - **String topic** (required): topic name.
> - **Object mesage**  (required): message cần gửi.
> - **Integer partition**: partition muốn gửi message đến.
> - **Long timestamp**: timestamp của message với đơn vị millis. Default là System.currentTimeMillis().
> - **Object key**: message key. Message cùng key được route đến cùng partition.
> - **Iterable\<Header> headers**: record header.

```java
// Gửi message đến topic và không define key. 
// Message được route đến partition bất kì của topic.
public ProducerRecord(String topic, V value);

// Gửi message đến topic có define key.
// Các message cùng key được route đến cùng một partition.
public ProducerRecord(String topic, K key, V value);

// Gửi message đến chính xác topic partition.
public ProducerRecord(String topic, Integer partition, K key, V value);
```

```java
try (var producer = new KafkaProducer<String, String>(props)) {
    for (int i = 0; i < 100; i++) {
        final var message = new ProducerRecord<>(
                "new-kafka-topic",     //topic name
                "key-" + i,            // key
                "message: " + i        // value
                );       
        producer.send(message);
    }
}
```

Với đoạn code trên mình sử dụng try-with-resources để producer tự động flush và close resource. Tương đương với:

```java
final var producer = new KafkaProducer<String, String>(props);
for (int i = 0; i < 100; i++) {
    final var message = new ProducerRecord<>(
            "new-kafka-topic",     //topic name
            "key-" + i,            // key
            "message: " + i        // value
    );
    producer.send(message);
}
producer.flush();
producer.close();
```

Phía dưới Kafka client sử dụng buffer và background I/O thread để xử lý. Do đó nếu không flush() thì message chưa được gửi đi ngay hoặc chỉ gửi đi một vài message, không close() có thể dẫn tới resource leak.

> Method close() sẽ tự động trigger flush().

Run code thôi, full class như sau:

```java
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class Producer {

    public static void main(String[] args) {

        final var props = new Properties();
        props.setProperty(ProducerConfig.CLIENT_ID_CONFIG, "java-producer");
        props.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
        props.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        try (var producer = new KafkaProducer<String, String>(props)) {
            for (int i = 0; i < 100; i++) {
                final var message = new ProducerRecord<>(
                        "new-kafka-topic",     //topic name
                        "key-" + i,            // key
                        "message: " + i        // value
                );
                producer.send(message);
            }
        }

    }

}
```

Run consumer CLI để check:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --topic new-kafka-topic \
    --from-beginning
    
message: 1
message: 6
message: 7
message: 8
message: 4
message: 5
...
```

![](https://i.imgur.com/lfi7KR0.png)

## 4) Serializer

Sau khi gọi send() method, message được đưa đến tầng **serializer**. Nhiệm vụ của **serializer** là biến đổi message ở dạng object sang byte[] trước khi gửi đến Kafka cluster.

> Nếu coi quá trình produce message là việc phân phối :crab: đến các quán mát-xa-ge thì **Serializer** sẽ đảm nhận nhiệm vụ đánh bóng, tân trang :crab: theo sở thích mà khách mong muốn.

Kafka cung cấp sẵn nhiều Serializer như:
> - StringSerializer.
> - LongSerializer.
> - DoubleSerializer.
> - FloatSerizalizer....

Chỉ cần khai báo và sử dụng là xong. Trong thực tế các message muốn gửi thường dưới dạng Object, do đó chúng ta có thể tự tạo custom serializer bằng cách implement interface Serializer<T>.

Ví dụ code với object serializer:

```java
class DriverLocation {

    private long driverId;
    private long longitude;
    private long latitude;
}

class DriverLocationSerializer implements Serializer<DriverLocation> {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public byte[] serialize(final String topic, final DriverLocation data) {
        try {
            return objectMapper.writeValueAsString(data).getBytes();
        } catch (Exception e) {
           throw new IllegalArgumentException("Cannot serialize message to json");
        }
    }

}
```

## 5) Partitioner

Sau khi tân trang làm đẹp cho :crab:, một điều phối viên đứng ra làm nhiệm vụ sắp xếp :crab: lên **xe chuyên dụng** để đưa đến địa điểm làm việc. :crab: nào có cùng số đo, ngoại hình loại I thì lên cùng một xe, loại II cùng một xe, loại nào khó quá thì random cho nhanh còn kịp giờ xuất bến.

Mỗi điều phối viên có cách phân chia khác nhau dựa trên nhiệm vụ được giao và tính chất của :crab:. 

Với Kafka, **partitioner** là một điều phối viên tận tụy như vậy. Internally, Kafka sử dụng **DefaultPartitioner** để route message đến các partition:
> - Nếu record được define key mà không define partition, Kafka sẽ hash key và các message cùng key được route đến cùng partition.
> - Nếu record được define destination partition, Kafka route message đến chính xác partition đó.
> - Nếu record không define destination partition và message key, Kafka route message với round-robin sử dụng **StickyPartitionCache**. Nếu muốn tìm hiểu kĩ hơn có thể đọc code của Kafka nhé.

```java
var message = new ProducerRecord<>("topic-name", 
                                   PARTITION,   
                                   "key",    
                                   "message");
```

Nếu không hài lòng với **DefaultPartitioner**, chúng ta có thể customize partitioner bằng cách implement interface **Partitioner**.

```java
class CustomPartitioner implement Partitioner {
    // Implement code here
}
```

Sau đó add thêm config properties khi khởi tạo Producer:

```java
props.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, CustomPartitioner.class.getName());
```

## 6) Message timestamp

**ProducerRecord** có argument liên quan đến message timestamp và nó là optional. Tuy nhiên trong các hệ thống real-time application, vấn đề liên quan đến thời điểm gửi/nhận message là cực kì quan trọng, do đó nếu không explicit define message timestamp, **Producer** sẽ sử dụng **System.currentTimeMillis()** làm giá trị mặc định.

Có 2 loại message timestamp cần quan tâm:
> - **Create time**: thời gian khi message được gửi đi.
> - **Log append time**: thời gian khi Kafka nhận được message.

Khi tạo topic chúng ta sẽ define loại message timestamp mong muốn bằng config:

```shell
message.timestamp.type=CreateTime

message.timestamp.type=LogAppendTime
```

Default Kafka sử dụng  `message.timestamp.type=CreateTime`.  Nếu muốn sử dụng **log append time**, cần thay đổi giá trị thành `LogAppendTime`.

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092,localhost:9093 \
    --partitions 5 \
    --replication-factor 3 \
    --topic log-append-time \
    --config message.timestamp.type=LogAppendTime \
    --create
```

Như vậy dẫn đến 2 trường hợp:
> - Sử dụng `message.timestamp.type=CreateTime`, nếu không define argument timestamp, **Producer** sử dụng default value là **System.currentTimeMillis()**. Nếu define timestamp, producer sử dụng timestamp làm message timestamp và giá trị được giữ nguyên đến khi message được append vào log.
> - Sử dụng `messsage.timestamp.type=LogAppendTime`, việc define timestamp không còn ý nghĩa. Tất cả message khi đến Kafka sẽ được override timestamp trước khi append log.

## 7) Message buffer và Producer I/O thread

Sau khi **partitioner** điều phối :crab: đến **xe chuyên dụng**, tổ lái không xuất phát ngay mà chờ cho đến khi đạt đủ số lượng :crab: nhất định. Tránh trường hợp đi lại nhiều lần, mất thời gian, tốn xăng. 

Tương tự với Kafka, các message chưa được gửi đi ngay mà được đẩy vào message buffer để chờ. Background sẽ có I/O thread làm nhiệm vụ gộp các message ở buffer thành request để gửi đến Kafka cluster.

![](https://i.imgur.com/wdwqfru.png)

Như vậy, **message buffer** đem đến 2 ưu điểm:
> - **Asynchronous**: send() method là async và return ngay lập tức, application có thể tiếp tục thực thi mà không bị block.
> - **Network roundtrip optimization**: background I/O thread sẽ đóng gói nhiều message lại thành một package và gửi đi trong 1 request, giảm roundtrip đến Kafka cluster, tăng throughput.

Chả có gì là hoàn hảo, nó cũng có nhược điểm to không kém. 

Vì muốn tiết kiệm thời gian, xăng dầu và tăng số lượng :crab: có thể chở trong một chuyến hàng, các quái xế cố nán lại thêm tí nào hay tí ấy.
> - Đen đủi thay số lượng :crab: quá đông, các quái xế trở tay không kịp dẫn đến tràn hàng.
> - Mọi người bu nhau vào xem :crab:, **đội quản lý thị trường** lập tức có mặt để giải quyết thì phát hiện :crab: lậu, ập vào thu hồi xử lý. Thế là toi, tưởng ship được nhiều nhưng lại thành không ship được em nào.
> - Các quái xế đã rút kinh nghiệm nếu chờ quá 2 phút hoặc số lượng :crab: vượt quá 5 thì tự động xuất phát.

Message buffer và I/O thread hoạt động tương tự idea trên, sử dụng các config liên quan đến window-size và window-time để control việc send message đến Kafka.

### 7.1) Buffer size

Số lượng message gửi đến quá nhiều mà I/O thread xử lý không kịp dẫn đến tràn buffer. Method send() sau đó sẽ bị block cho đến khi có free space. Trong tình huống này, việc gửi message mất nhiều thời gian, send() method bị block quá lâu sẽ bắn ra TimeoutException. Để xử lý vấn đề này chúng ta cần tăng **buffer size** của producer với config `buffer.memory`. Giá trị default của `buffer.memory` là 32 MB.

Thực hiện tăng `buffer.memory` lên 64 MB bằng cách:

```java
props.setProperty(ProducerConfig.BUFFER_MEMORY_CONFIG, String.valueOf(64 * 1024 * 1024L));
```

### 7.2) Batch size

Message đang nằm trong buffer chờ được gửi đi thì bụp.. mất điện. Toàn bộ message bay theo cú chập điện vừa rồi.. và lost message. Tình huống này thì.. trời cứu.

I/O thread dựa trên `batch.size` để process message trong buffer gửi đến Kafka cluster.

> Khi nhiều message được gửi đến cùng partition, để tiết kiệm roundtrip, các message được nhóm vào một batch. Khi batch đạt đến size nhất định, I/O thread tạo request và gửi batch đi.
>
> Batch size tỉ lệ thuận với throughput và khả năng lost message. Batch size càng nhỏ khả năng lost message càng giảm kéo theo throughput thấp đi. Giá trị default của batch size là 2048 KB.
>
> Nếu muốn message được gửi đi ngay lập tức, chỉ cần set config batch size = 0. Kéo theo throughput và application performance giảm.

```java
props.setProperty(ProducerConfig.BATCH_SIZE_CONFIG, String.valueOf(2048 * 8));
```

Ngoài ra, sử dụng **flush()** để force I/O thread gửi message đến Kafka.

## 8) Retry

I/O thread tạo request để gửi message đến Kafka. Mọi chuyện chưa kết thúc ở đây. Cần đảm bảo message đã đến đích và Kafka broker đã append log thành công. 

Có 2 trường hợp xảy ra sau khi I/O thread send message:
> - Kafka broker sau khi nhận message gửi lại ACK. Nếu append log thành công, Kafka trả về success ack và producer ghi nhận vào hệ thống.
> - Nếu append log fail hoặc chờ quá lâu không thấy phản hồi, I/O thread sẽ retry vài lần cho đến khi thành công. Nếu quá số lần retry sẽ throw exception.

![](https://i.imgur.com/5WPdDNU.png)

Set up retry times với **Producer** bằng config `retries`.

```java
props.setProperty(ProducerConfig.RETRIES_CONFIG, "10");
```

Với bài viết này, chúng ta đã biết cách implement simple producer và các config bằng Java. Bài sau sẽ advance practice với multi-thread producer, các cơ chế ack at least once, at most once...

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)