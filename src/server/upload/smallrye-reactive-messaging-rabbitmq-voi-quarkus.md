# Mở đầu
RabbitMQ không còn là chủ đề mới lạ với anh em lập trình, tuy nhiên trong bài biết này mình giới thiệu tới mọi người kết nối tới RabbitMQ bằng smallrye trong Quarkus.

Trong bài viết này mình sẽ không đi quá sâu vào RabbitMQ mà chỉ tập trung vào triển khai 1 ứng dụng sử dụng RabbitMQ trong Quarkus.
# Setup một Rabbitmq Broker
Trong bài viết này mình sẽ sử dụng docker để setup RabbitMQ trên local.
```
docker run -d -p 5672:5672 -p 15672:15672 --name loca-rabbit rabbitmq:3.7-management
```
sau khi cài đặt RabbitMQ thành công các bạn truy cập với địa chỉ http://localhost:15672, theo mặc định thì thông tin đăng nhập là `guest/guest`.
![Screen Shot 2022-03-19 at 23.06.41.png](https://images.viblo.asia/72a30c19-1362-47d7-8b69-8b8f55f2753b.png)
Nếu bạn truy cập thấy được giao diện như hình là đã setup thành công một Rabbitmq Broker, tiếp theo chúng ta sẽ kết nối rabbitmq bằng Quarkus.
# Setup ứng dụng quarkus.
Để setup 1 ứng dụng quarkus nhanh chóng, các bạn truy cập https://code.quarkus.io/ để tiếp hành tạo nhé.
Lưu ý là nhớ tích vô Extensions `SmallRye Reactive Messaging - RabbitMQ Connector` nhé
![Screen Shot 2022-03-19 at 23.14.51.png](https://images.viblo.asia/141b5903-7900-4378-8ed6-98df4880472a.png)

Nếu bạn đã có sắn ứng dụng Quarkus rồi bạn có thể dùng mvnw hoặc thêm dependency trực tiếp vô file pom.xml trong dự án của mình.

mvnw:
```
./mvnw quarkus:add-extensions -Dextensions="quarkus-smallrye-reactive-messaging-rabbitmq"
```
dependency
```
<dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-smallrye-reactive-messaging-rabbitmq</artifactId>
</dependency>
```

Trong file application.properties các bạn tiến hành cấu hình thông số để kết nối tới RabbitMQ.
```
rabbitmq-host=localhost
rabbitmq-port=5672
rabbitmq-username=guest
rabbitmq-password=guest
```
# Publish Message to RabbitMQ
## Publish to Exchange
Mình sẽ tận dụng luôn file GreetingResource mặc định khi tạo project để làm demo đơn giản hướng dẫn để mọi người dễ hiểu.
Tiếp tục trong file application.properties các bạn thêm đoạn code sau
```
mp.messaging.outgoing.queuedemo.connector=smallrye-rabbitmq
mp.messaging.outgoing.queuedemo.exchange.name=exchange-demo
mp.messaging.outgoing.queuedemo.default-routing-key=routingkey
```
Trong đó
`mp.messaging.outgoing` là prefix cố định của thư viện
`queuedemo` là tên của các chanel
`connector` được hiểu là gắn trình quản lý kết nối, ở đây mình sử dụng smallrye-rabbitmq
`exchange.name` là tên của exchange
`default-routing-key` là routing key dùng để binding dữ liệu tới queue.
![Screen Shot 2022-03-19 at 23.58.43.png](https://images.viblo.asia/bd9d9626-c6df-454f-b6a4-c416fb6e0559.png)

Trong file GreetingResource.java của mình
```
package vanhanh.hpi;

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.UUID;

@Path("/hello")
@ApplicationScoped
public class GreetingResource {
    @Channel("queuedemo")
    Emitter<String> queuedemoEmitter;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        String uuid = String.valueOf(UUID.randomUUID());
        queuedemoEmitter.send(uuid);
        return uuid;
    }
}
```
Mình đã sử dụng annotation Channel("queuedemo") để khởi tạo 1 chanel để kết nối tới  RabbitMQ broker, mình tiến hành khai báo Emitter với kiểu dữ liệu là String( các bạn có thể hiểu là mình sẽ bắn lên RabbitMQ 1 đoạn String có content_type: text/plain, nếu các bạn dùng 1 Object thì dữ liệu nhận sẽ là 1 String Json có content_type: application/json).
Giờ mình sẽ dùng curl để publish message lên thử, các bạn có thể dùng curl như mình để kiểm tra thử
```
curl -X 'GET' \
  'http://localhost:8080/hello' \
  -H 'accept: text/plain'
```
![Screen Shot 2022-03-20 at 00.07.54.png](https://images.viblo.asia/5e9a6705-a610-448e-9deb-b3b82e28603e.png)
Sau khi chạy curl trên các bạn sẽ thấy 1 exchange có tên là `exchange-demo` được tạo.

## Bindings Exchange to queue
Dữ liệu sau khi được đẩy lên Exchange các bạn cần binding qua queue để có thể comsumer được data.
![Screen Shot 2022-03-20 at 00.12.59.png](https://images.viblo.asia/d34b4271-9383-4e9b-a9a1-1dff46fd7244.png)
Các bạn tiếp hành tạo 1 queue bất kỳ, sau đó tại mục `Bindings` các bạn điền vào giống như hình phía trên, sau đó các bạn thử lại với curl phía trên, lúc này queue của các bạn có thể nhận được data thử exchange bind qua rồi nhé.
Lưu ý routing key phải khớp với routingkey khai báo trong application.properties thì mới nhận được nhé.
Một Exchange có thể binding data tới nhiều queue và một queue cũng có thể khai báo nhiều binds với nhiều routing key khác nhau để nhận data từ nhiều exchange.


# Comsumer
Comsumer hay còn gọi Processor là quá trình tiếp nhận message từ RabbitMQ, để nhận được message từ RabbitMQ mình tiếp hành thêm 1 dòng sau vào file application.properties.
```
mp.messaging.incoming.queuedemo.queue.name=queu-demo
```
Dòng này có tác dụng kéo message từ queue `queu-demo` về để xử lý.
Mình tạo 1 file tên DemoProcessor.java để nhận các message từ RabbitMQ
```
@ApplicationScoped
public class DemoProcessor {
    @Incoming("queuedemo")
    public CompletionStage<Void> process1(Message<String> messageUuid) throws InterruptedException {
        System.out.println("comsumer data: " + messageUuid.getPayload());
        return messageUuid.ack();
    }

        @Incoming("queuedemo")
    public void process2(String uuid) throws InterruptedException {
        System.out.println("comsumer data: " + uuid);
    }
}
```
Trong đoạn code phía trên mình có 2 function là `process1` và `process2`, 2 hàm này có tác dụng như nhau nhưng cách triển khai khác nhau, tùy phong các của bạn mà chọn ra 1 trong 2 để dùng nhé.
# Kết luận
Vậy là xong rồi, hẹn gặp lại các bạn trong các bài sau.