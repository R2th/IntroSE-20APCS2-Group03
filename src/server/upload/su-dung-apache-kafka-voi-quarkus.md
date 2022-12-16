# Kafka là gì
[Kafka](https://en.wikipedia.org/wiki/Apache_Kafka) là gì? – Đó là hệ thống message pub/sub phân tán (distributed messaging system). Bên pulbic dữ liệu được gọi là producer, bên subscribe nhận dữ liệu theo topic được gọi là consumer. Kafka có khả năng truyền một lượng lớn message theo thời gian thực, trong trường hợp bên nhận chưa nhận message vẫn được lưu trữ sao lưu trên một hàng đợi và cả trên ổ đĩa bảo đảm an toàn. Đồng thời nó cũng được replicate trong cluster giúp phòng tránh mất dữ liệu.
<br>
![Screen Shot 2022-03-21 at 23.05.07.png](https://images.viblo.asia/ff89a4b1-a716-45ec-a100-1abf75887ae0.png)
<br>

Ở bài viết này mình sẽ trình bày cách sử dụng Apache Kafka trong Quarkus<br>

**Yêu cầu**
* JDK 1.8+ installed with JAVA_HOME configured appropriately
* Apache Maven 3.6.2+
* Docker Compose to start a development cluster

 **Docker**<br>
 
 Đây là image mà mình sử dụng để start kafka cho bài viết này.
```
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:6.0.0
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    networks:
      - kafka

  kafka:
    image: confluentinc/cp-enterprise-kafka:6.0.0
    hostname: kafka
    restart: "always"
    container_name: kafka
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: |
         PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: |
         PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
    networks:
      - kafka

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    restart: "no"
    ports:
      - "9080:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: "kafka"
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: "kafka:9092"
    networks:
      - kafka

networks:
  kafka: 
    external:
      name: kafka

```

# Tạo Project
Tạo project ở trang chủ của Quarkus [tại đây](https://code.quarkus.io), nhập group id và artifact id.<br>
 Bạn tìm và thêm 2 extension là:
* SmallRye Reactive Messaging - Kafka Connector
* RESTEasy Jackson

![Screen Shot 2022-03-21 at 23.16.04.png](https://images.viblo.asia/03836e73-193a-45da-87f0-97e0d2dd9b03.png)

Click ```Generate your application``` để tải xuống , sau đó unzip và mở bằng IDE yêu thích của bạn.

Tại file ```pom.xml``` bạn sẽ thấy 2 extension ```quarkus-smallrye-reactive-messaging-kafka``` và ```quarkus-resteasy-jackson``` đã được thêm vào.


Hmm ngoài lề một chút, dạo này giá xăng hiện tại tăng chóng mặt nên mình sẽ viết ứng dụng gửi message kèm nâng giá xăng lên nhé :D

Tạo Class Gas pojo như sau:
```
package practice.kafka;

public class Gas {
    public String name;
    public double price;

    public Gas() {
    }

    public Gas(String name, double price) {
        this.name = name;
        this.price = price;
    }
}
```

Tạo thêm một Class GasProcessor để nâng giá xăng như sau:

```
package practice.kafka;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GasProcessor {

    private static final double CONVERSION_RATE = 1.5;

    public Gas process(Gas gas) {
        gas.price = gas.price * CONVERSION_RATE;
        return gas;
    }
}
```
Chúng ta nhận vào giá gốc sau đó thay đổi giá cả và gửi chúng lại cho Kafka.<br>
Để làm được chúng ta sẽ cần cài đặt JSON serialization.

Với extension ```quarkus-resteasy-jackson``` cung cấp cho chúng ta ```ObjectMapperSerializer``` sử dụng cho việc serialize tất cả các pojo thông qua Jackson,
nhưng đối với ```deserializer``` thì Generic, nên cần phải phân lớp.

Để deserializer cần tạo Class với tên là GasDeserializer kế thừa từ ObjectMapperDeserializer.
```
package practice.kafka;

import io.quarkus.kafka.client.serialization.ObjectMapperDeserializer;

public class GasDeserializer extends ObjectMapperDeserializer<Gas> {
    public GasDeserializer(){
        super(Gas.class);
    }
}

```

Cấu hình để sử dụng Jackson serializer, deserializer và kết nối máy chủ Kafka trong file ```application.properties```
```
kafka.bootstrap.servers=http://localhost:29092

# Configure the Kafka source (we read from it)
mp.messaging.incoming.gas-in.connector=smallrye-kafka
mp.messaging.incoming.gas-in.topic=gas
mp.messaging.incoming.gas-in.value.deserializer=practice.kafka.GasDeserializer

# Configure the Kafka sink (we write to it)
mp.messaging.outgoing.gas-out.connector=smallrye-kafka
mp.messaging.outgoing.gas-out.topic=gas
mp.messaging.outgoing.gas-out.value.serializer=io.quarkus.kafka.client.serialization.ObjectMapperSerializer
```

Mình sẽ tạo thêm một Class API ví như Producer để tạo ra messages gửi lên cho Kafka.
```
package practice.kafka;

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.concurrent.CompletionStage;

@Path("gas")
@ApplicationScoped
public class GasResource {

    @Inject
    GasProcessor gasProcessor;

    @Inject
    @Channel("gas-out")
    Emitter<Gas> gasEmitter;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response increasePrice(Gas gas){
        gas = gasProcessor.process(gas);
        CompletionStage<Void> ack = gasEmitter.send(gas);
        return Response.ok().entity(ack).build();
    }
}
```
Ở đây mình sẽ sử dụng annotation ```@Channel``` để khai báo đầu ra của message.<br>
Sử dụng ```Emitter``` để gửi message lên máy chủ Kafka.

Sau khi đã có producer gửi message, thì tiếp theo mình cũng sẽ tạo thêm một Class Consume để nhận message từ Kafka.
```
package practice.kafka;

import org.eclipse.microprofile.reactive.messaging.Incoming;

public class GasConsume {

    @Incoming("gas-in")
    public void outputGas(Gas gas){
        System.out.printf("Gas price has been increased to %s",gas.price);
    }
}
```
Với annotation ```@Incoming``` khai báo đầu nhận message từ Kafka.

À để sử dụng API dễ dàng hơn thì ta  sử dụng swagger, bạn copy bỏ vào file ```pom.xml``` nhé:
```
<dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-smallrye-openapi</artifactId>
</dependency>
```

Chạy câu lệnh để cài đặt extension trong file pom.xml
```
mvn clean install
```
Để khởi động ứng dụng
```
mvn quarkus:dev
```

Gọi thử API gas
```
curl -X 'POST' \
  'http://localhost:8080/gas' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Xăng 95",
  "price": 18000
}'
```

Và giá xăng đã tăng gấp rưỡi từ 18000 thành 27000 :(

![Screen Shot 2022-03-22 at 01.10.25.png](https://images.viblo.asia/3eb91132-0265-470c-aa3f-6121538b0511.png)
<br>

# Kết Luận
Vậy với bài tóm tắt trên, các bạn có thể sử dụng Apache Kafka với Quarkus một cách cơ bản và nhanh chóng.

Nếu có thể bài sau mình sẽ trình bày cách sử dụng Avro Schema Registry với Kafka và Quarkus.

Cảm ơn mọi người, chúc mọi người nhiều sức khoẻ <3

# References
https://quarkus.io/guides/kafka

# Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.
 
Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình `duy.nguyenduc@hoang-phuc.net`.

Cảm ơn các bạn đã đọc.