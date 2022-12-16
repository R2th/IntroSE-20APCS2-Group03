© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Chúng ta đã tạo simple producer với single-thread để produce message đến Kafka cluster trong bài viết trước. Lần này, cũng đến với những thứ advance hơn là transaction và các delivery semantics trong producer.

## 1) Producer ack

Sau khi nhận message từ producer, Apache Kafka thực hiện append vào partition log để đảm bảo không mất message. Mặc định, producer chờ ack từ Kafka để biết chắc chắn message được append thành công tại **replication leader**, nếu không sẽ thực hiện retry cho đến khi thành công, không còn nỗi lo mất message. Đó là viễn cảnh đẹp tuyệt vời trong trường hợp **replication leader** hoạt động tốt.

![](https://i.imgur.com/yvpbSzs.png)

Mọi chuyện chưa dừng lại ở đây, thực tế triển khai chúng ta sẽ deploy Kafka cluster với multi-broker và multi-replication, tránh trường hợp chẳng may Kafka broker chứa **replication leader** Quang tèo.

Trong trường hợp **replication leader** tạch, một trong các **ISR** khác đứng lên thay thế để hệ thống tiếp tục hoạt động.

### 1.1) acks=1

Mặc định, producer nhận config **acks** = 1, Kafka sẽ ack lại cho producer ngay sau khi **replication leader** append log thành công mà không cần chờ sync log sang các **ISR**.

![](https://i.imgur.com/MnSrQnc.png)

Lỡ cô không thương, **replication leader** lăn đùng ra chết ngay sau khi ack cho producer. Một ISR khác lên thay thế tuy nhiên nó chưa sync được message producer đã gửi, và **lost message**.

### 1.2) ack=all

Như vậy, trong trường hợp muốn chắc chắn không lost message, việc append log cần được xảy ra ở tất cả các **ISR** trước khi **replication leader** ack lại cho producer. Mô hình như sau:

![](https://i.imgur.com/Fv68WEt.png)

Thứ tự có thể không hoàn toàn chính xác như trên nhưng chắc chắn message cần được append vào toàn bộ replication trước khi trả ack về cho producer. Để thực hiện điều này, producer cần sử dụng config **acks** = all.

```java
props.put(ProducerConfig.ACKS_CONFIG, "all");
```

Với **acks** = all, Kafka đảm bảo không lost message, phù hợp với những bài toán yêu cầu cao tính durability.

### 1.3) acks=0

Nếu bài toán yêu cầu cao về throughput mà không quá quan trọng tính durability thì sử dụng config **acks** = 0. Lúc này, **producer** send message theo kiểu **fire and forget**, không quan tâm việc message có được append thành công hay không.

> Nghe có vẻ hơi **thiếu trách nhiệm** nhưng nó giúp tăng throughput của hệ thống. Producer không cần chờ ack từ Kafka, cứ produce message liên tọi, nhiều nhất có thể :joy:.

## 2) At-least-once & At-most-once

Tiếp tục câu chuyện **ack** và những lần dở khóc dở cười vì **lost message**, nhưng lần này tình huống có khác đôi chút.

Với **acks=all** hoặc **acks=1**, producer chờ ack từ **replication leader** để đảm bảo message được append thành công, nếu không sẽ trigger resend message.

Và cũng chính vì thế, nó dẫn tới một **tính năng** khác là duplicate message.

> Nghe có vẻ không giống **tính năng** cho lắm nhỉ...

Câu chuyện bắt đầu, producer send message đến Kafka. **Replication leader** nhanh chóng append log và sync đến các ISR còn lại, sau đó ack về cho producer. Đúng lúc chuẩn bị gửi ack thì bụp... cá mập cắn cáp.

Producer chờ dài cổ, đã quá timeout nên thực hiện resend message. Lúc này một ISR khác lên thay thế hoặc chính là **replication leader** cũ đã phục hồi, nhận message và cũng append vào log, dẫn tới duplicate message.

> Không những duplicate 2 lần mà có thể nhiều hơn, tùy thuộc vào config retry của producer và thời điểm nhận ack từ **replication leader**.

Do vậy, với **acks=all** hoặc **acks=1** được gọi là **at-least-once delivery semantic**. Không mất message vì sẽ retry cho đến khi nào nhận ack, nhưng có thể dẫn đến tình huống duplicate message vì không có cơ chế nào xác định duplicate.

Ngược lại, với **acks=0**, producer không chờ ack từ **replication leader** nên không đảm bảo chắc chắn message được gửi thành công. Nên được gọi là **at-most-once delivery semantic**.

> Hoặc set config retries=0 để đạt được **at-most-once delivery semantic**. Đảm bảo không có message nào bị duplicate tuy nhiên có thể xảy ra issue lost message.

## 2) Exactly-once - Producer idempotence

Trong trường hợp hoàn hảo nhất, chúng ta luôn muốn message được gửi đi chỉ một lần, đảm bảo nhận thành công và xử lý cũng chỉ một lần duy nhất.

> Exactly-once: không lost message mà cũng không duplicate message.

Kafka cung cấp config để xác định một producer là idempotent:

```java
 props.setProperty(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
```

> **Idempotent** nói về việc một hành động có thể lặp đi lặp lại nhiều lần mà không gây ảnh hưởng gì đến hệ thống. Ví dụ như RESTful API GET method được gọi là idempotent API.

Lúc này, behaviour của producer sẽ lột xác. Có rất nhiều thứ thay đổi bên trong, tựu chung lại với 2 điểm khác biệt chính:
- Internal ID for Producer instance.
- Message sequence number.

Ngay sau khi được khởi tạo, Producer yêu cầu Kafka broker leader cung cấp một unique id để định danh. Tiếp theo, mỗi message được gán một sequence number bắt đầu từ 0.

Sau đó đến bước produce message. Lúc nãy mỗi message được gửi đi đính kèm với **producer id** và **sequence number**. Broker leader sẽ biết message được append thành công cuối cùng có sequence là X. Điều đó có nghĩa message tiếp theo phải có sequence X + 1. Nhờ đó broker có khả năng xác định được lost message và duplicate message.

Perfect, chỉ cần set config và chúng ta đã có một producer hoàn hảo.

**Lưu ý**: idempotence producer chỉ ngăn chặn duplicate message trong trường hợp retry. Không có ý nghĩa với application level: ví dụ như cố tình produce 2 message giống nhau.


## 4) Producer transaction

Nếu đã quen với các relational database thì không còn lại gì với transaction. Transaction nói về việc thực thi một chuỗi các action (insert/delete/update), thành công hết hoặc không. 

**Producer transaction** mang ý nghĩa tương tự, chúng ta cần gửi các message đến nhiều topic khác nhau và mong muốn tất cả đều đến đích, nếu không thì không message nào gửi thành công.

![](https://i.imgur.com/LvIi652.png)

Mở IDE và quẩy thôi. Đầu tiên, tạo 2 topic với cmd:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092,localhost:9093 \
    --partitions 5 \
    --replication-factor 3 \
    --config min.insync.replicas=2 \
    --topic transaction-topic-1 \
    --create
    
$ kafka-topics.sh \
    --bootstrap-server localhost:9092,localhost:9093 \
    --partitions 5 \
    --replication-factor 3 \
    --config min.insync.replicas=2 \
    --topic transaction-topic-2 \
    --create
```

Chú ý 2 điều kiện bắt buộc khi tạo topic support transaction:
- Replication factor >= 3
- min.insync.replicas >= 2

Tiếp theo, cần add thêm config transactional.id cho producer:

```java
props.setProperty(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "demo-transaction-id");
```

**Transaction id** có thể là bất kì giá trị nào nhưng cần unique giữa các producer instance. Nếu cố tình tạo ra nhiều instance với cùng **transaction id** thì chỉ một instance duy nhất có thể hoạt động.

![](https://i.imgur.com/VKa24pb.png)

Nếu vậy, trong trường hợp muốn tạo nhiều **producer instance** để tăng throughput nhưng vẫn có transaction thì **scaling** thế nào nhỉ?
> - Ez game, scale thoải mái với mỗi instance là một **transaction id** khác nhau, y hệt những gì relational database đã làm.
> - Các **transaction id** nên được lưu trữ ở config file hoặc truyền vào từ env variable để dễ dàng scale application.

Tiến hành tạo properties:

```java
final var props = new Properties();
props.setProperty(ProducerConfig.CLIENT_ID_CONFIG, "java-producer");
props.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
props.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
props.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
props.setProperty(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "demo-transaction-id");
```

Tạo Kafka producer với các properties trên:

```java
final var producer = new KafkaProducer<String, String>(props);
```

Tiếp theo là initialize transaction.

```java
producer.initTransactions();
```

**InitTransactions()** sẽ check các điều kiện cần thiết để đảm bảo bất kì transaction nào được tạo ra trước đó đã close. Ví dụ, application đang chạy ngon lành tự nhiên lăn quay ra chết. Sau đó application start lại và cần đảm bảo bất kì transaction nào chưa được complete trước đó sẽ được complete hoặc abort.

Sau đó, toàn bộ code send message sẽ wrap vào giữa 2 method **beginTransaction()** và **commitTransaction()**. Xử lý với try catch block, nếu có exception thì thực hiện rollback transaction.

Full code như sau:

```java
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class TransactionProducer {

    public static void main(String[] args) {
        final var props = new Properties();
        props.setProperty(ProducerConfig.CLIENT_ID_CONFIG, "java-producer");
        props.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
        props.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.setProperty(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "demo-transaction-id");

        final var producer = new KafkaProducer<String, String>(props);
        producer.initTransactions();

        try {
            producer.beginTransaction();
            producer.send(new ProducerRecord<>("transaction-topic-1", "Message to topic 1"));
            producer.send(new ProducerRecord<>("transaction-topic-2", "Message to topic 2"));
            producer.commitTransaction();
        } catch (Exception ex) {
            producer.abortTransaction();
            producer.close();
            throw new RuntimeException(ex);
        }
        producer.close();
    }

}
```

Start consumer để nhận message từ cả 2 topics:

```shell
$ kafka-console-consumer.sh \
    --bootstrap-server localhost:9092 \
    --from-beginning \
    --whitelist "transaction-topic-*"
```

Thực hiện run application và check case success. Sau đó thêm throw exception giữa quá trình send message để kiểm tra case rollback transaction.

**Một vài điều cần chú ý với producer transaction**:

Một producer instance không thể open nhiều transaction tại cùng một thời điểm. Bắt buộc phải commit hoặc abort transaction cũ trước khi begin transaction mới. 

Method **commitTransaction()** sẽ flush toàn bộ các message chưa được gửi đi trước khi commit transaction.

Một producer có thể send() nhiều message trên nhiều thread để tăng throughput và ta cũng có thể apply transaction trên những thread này. Chỉ cần đảm bảo **beginTransaction()** trước khi tất cả thread send message và **commitTransaction()** sau khi các thread thực thi xong.

Quay lại ví dụ trên, nếu **beginTransaction()** và chỉ send 2 message sau đó **abortTransaction()** thì kết quả đúng như mong đợi: cả 2 message không được gửi đi. Nhưng nếu tăng số lượng message lên vài nghìn thì.. **abortTransaction()** không còn tác dụng.

Hãy nhớ đến những config liên quan đến **buffer size** và **batch size** ở [bài trước](https://viblo.asia/p/007-simple-kafka-producer-client-api-voi-java-WAyK86PplxX#_71-buffer-size-7) thì sẽ hiểu ngay vấn đề. Thực tế, số lượng message trong một transaction không quá lớn đủ để trigger I/O thread flush message. Nếu bài toán của bạn thật sự cần điều đó, hãy chú ý tuning thêm với các config trên để đảm bảo chương trình hoạt động chính xác.

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

### After credit

Ngoài các giá trị 0, 1, all. Config **acks** nhận 1 giá trị khác là **-1** tương đương với **all**.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)