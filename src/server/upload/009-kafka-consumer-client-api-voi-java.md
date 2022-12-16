© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Tiếp tục series, cùng practice với **Kafka consumer** với bài toán đơn giản.

## 1) Scenario

Thực tế, một hệ thống với Kafka có thể hoạt động với mô hình dưới đây:

![](https://i.imgur.com/UvjwWKd.png)

- **Event generating service**: là service produce message tới Kafka.
- **Data validation service**: consume message, thực hiện validate, dựa trên result để produce message tương ứng tới topic.
- **Data reconciliation application**: nếu message invalid, DRA consume message, tiến hành correct message và produce valid message với Kafka.
- **Other service**: cuối cùng message valid được đẩy tới next service để xử lý các business logic phù hợp với yêu cầu.

Với bài toán trên, ta sử dụng **Data validation service** làm ví dụ cho phần consumer:
- Đầu vào là các hóa đơn, producer produce data đến **invoice-topic**.
- Consumer consume message từ **invoice-topic** và xử lý, nếu valid sẽ chuyển tiếp đến **valid-invoice-topic**, ngược lại produce đến **invalid-invoice-topic**.

![](https://i.imgur.com/TPV9Lb8.png)

## 2) Practice

Có bài toán rồi, quẩy thôi. Thêm dependency Kafka client và Jackson để xử lý JSON data:

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
     <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.12.5</version>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.20</version>
    </dependency>
</dependencies>
```

Gradle:

```shell
dependencies {
    implementation 'org.apache.kafka:kafka-clients:2.8.0'
    implementation 'org.slf4j:slf4j-simple:1.7.32'
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.12.5'
}
```

### 2.1) Custom serializer với JSON:

Với bài toán này, cùng practice tạo một custome serializer/deserializer với JSON type như sau.

Serializer:

```java
public class JsonSerializer<T> implements Serializer<T> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public byte[] serialize(String topic, T data) {
        if (data == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsBytes(data);
        } catch (Exception e) {
            throw new SerializationException("Error serializing JSON message", e);
        }
    }

}
```

Deserializer:

```java
public class JsonDeserializer<T> implements Deserializer<T> {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private Class<T> className;
    public static final String KEY_CLASS_NAME_CONFIG = "key.class.name";
    public static final String VALUE_CLASS_NAME_CONFIG = "value.class.name";

    @SuppressWarnings("unchecked")
    @Override
    public void configure(Map<String, ?> props, boolean isKey) {
        if (isKey) {
            className = (Class<T>) props.get(KEY_CLASS_NAME_CONFIG);
            return;
        }
        className = (Class<T>) props.get(VALUE_CLASS_NAME_CONFIG);
    }

    @Override
    public T deserialize(String topic, byte[] data) {
        if (data == null) {
            return null;
        }
        try {
            return objectMapper.readValue(data, className);
        } catch (Exception e) {
            throw new SerializationException(e);
        }
    }

}
```

### 2.2) Tạo Invoice POJO

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Invoice {

    private String invoiceNumber;
    private String storeId;
    private long created;
    private double totalAmount;
    private boolean valid;

}
```

### 2.3) Consumer

Tạo consumer và produce, sau đó consume message và produce đến topic tương ứng. Để đơn giản, chúng ta sử dụng luôn field `valid` để check message:

```java
@Slf4j
public class ValidatorConsumer {

    @SuppressWarnings("InfiniteLoopStatement")
    public static void main(String[] args) {

        final var consumerProps = new Properties();
        consumerProps.put(ConsumerConfig.CLIENT_ID_CONFIG, "validation-consumer");
        consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
        consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        consumerProps.put(JsonDeserializer.VALUE_CLASS_NAME_CONFIG, Invoice.class);

        final var consumer = new KafkaConsumer<String, Invoice>(consumerProps);
        consumer.subscribe(List.of("invoice-topic"));

        final var producerProps = new Properties();
        producerProps.put(ProducerConfig.CLIENT_ID_CONFIG, "validation-producer");
        producerProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
        producerProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        producerProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        final var producer = new KafkaProducer<>(producerProps);

        while (true) {
            final var records = consumer.poll(Duration.ofMillis(100));
            records.forEach(r -> {
                if (!r.value().isValid()) {
                    producer.send(new ProducerRecord<>("invalid-invoice-topic", r.value().getStoreId(), r.value()));
                    log.info("Invalid record - {}", r.value().getInvoiceNumber());
                    return;
                }
                producer.send(new ProducerRecord<>("valid-invoice-topic", r.value().getStoreId(), r.value()));
                log.info("Valid record - {}", r.value().getInvoiceNumber());
            });
        }
    }

}
```

### 2.4) Producer

Cuối cùng, tạo producer để produce message đến **invoice-topic**:

```java
public class InvoiceProducer {

    public static void main(String[] args) {

        final var random = new Random();
        final var props = new Properties();
        props.put(ProducerConfig.CLIENT_ID_CONFIG, "producer");
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092,localhost:9093");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        try (var producer = new KafkaProducer<String, Invoice>(props)) {
            IntStream.range(0, 1000)
                    .parallel()
                    .forEach(i -> {
                        final var invoice = Invoice.builder()
                                .invoiceNumber(String.format("%05d", i))
                                .storeId(i % 5 + "")
                                .created(System.currentTimeMillis())
                                .valid(random.nextBoolean())
                                .build();
                        producer.send(new ProducerRecord<>("invoice-topic", invoice));
                    });
        }
    }

}
```

### 2.5) Tạo topic

Tạo **invoice-topic** với 2 partitions:

```shell
$ kafka-topics.sh \
    --bootstrap-server localhost:9092,localhost:9093 \
    --partitions 2 \
    --replication-factor 3 \
    --topic invoice-topic \
    --create
```

Sau đó start **Producer** và **Consumer** và tận hưởng thành quả thôi.

## 3) Scale Kafka consumer với group.id

Thực tế, các bài toán không chỉ đơn thuần check choác như trên mà phức tạp hơn nhiều. Như vậy, trong trường hợp có rất nhiều **producer** nhưng chỉ có một **consumer** thì không ổn. Lúc này **consumer** trở thành bottle-neck của hệ thống, khiến cho application không còn tính chất **real-time**.

![](https://i.imgur.com/M9pkBjs.png)

Trong trường hợp này, cách thông dụng nhất là scale **consumer** để handle đồng thời nhiều message hơn bằng cách sử dụng [consumer group](https://viblo.asia/p/LzD5dMmzKjY#_32-consumer-group-6) đã giới thiệu ở bài trước.

```java
consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "validator-group");
```

Sau khi thêm properties, start 2 **consumer** và tiến hành produce message chúng ta sẽ thấy các message được route đến cả 2 **consumer**. 

> Nếu thêm 1 **consumer** nữa, lúc này có 2 partition và 3 consumer, tuy nhiên chỉ 2 consumer nhận được message. Nếu chưa hiểu nguyên nhân có thể đọc lại phần trước về [**consumer group**](https://viblo.asia/p/LzD5dMmzKjY#_32-consumer-group-6).

[Download source code here](https://github.com/datbv/tutorials/tree/main/kafka).

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

### After credit

Như vậy chúng ta đã đi qua toàn bộ về Apache Kafka core concept & practice. Các bài toán trong thực tế đôi khi sẽ phức tạp hơn nhiều lần. Ví dụ:
- Read data từ database và produce đến Kafka.
- Aggregate data từ 2 topic sau đó mới thực hiện business logic.
- ...

Chỉ sử dụng core concept với producer/consumer đơn giản như trên thì cũng được, mỗi tội cần thêm hơi nhiều code và phải đảm bảo fault tolerance. Do vậy, Kafka sinh ra thêm các concept khác để xử lý từng bài toán cụ thể khác nhau:
- Kafka connect concept.
- Kafka stream concept.
- Kafka SQL concept.

Cùng đón chờ trong các bài viết tiếp theo.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)