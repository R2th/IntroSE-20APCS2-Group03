# RabbitMQ là gì?
RabbitMQ là một message broker (MOM - Message-Oriented Middleware), sử dụng giao thức AMQP (Advanced Message Queue Protocol). RabbitMQ là một phần mềm trung gian được sử dụng như là phương tiện liên lạc giữa các ứng dụng, dịch vụ với nhau. ![rabbitmq-workflow-example-1.png](https://images.viblo.asia/5fed27c2-7c88-43ff-ab2c-d3d06d0e3654.png)
Đây là kiến trúc cơ bản của một message queue:
* Producer : là ứng dụng client, tạo message và publish tới broker.
* Consumer : là ứng dụng client khác, kết nối đến queue, subscribe (đăng ký) và xử lý (consume) message.
* Broker (RabbitMQ) : nhận message từ Producer, lưu trữ chúng an toàn trước khi được lấy từ Consumer.

### Minh họa cách thức hoạt động của RabbitMQ như sau:

![rabbitmq-workflow-example-2-1024x487.png](https://images.viblo.asia/be2f4e19-f5ac-4766-a675-a9ca8bfa88c6.png)

1.  User gửi yêu cầu tạo PDF đến web application.
2.  Web application (Producer) gửi tin nhắn đến RabbitMQ bao gồm dữ liệu từ request như tên và email.
3.  Một Exchange chấp nhận các tin nhắn từ Producer và định tuyến chúng đến Queue (hàng đợi) để tạo PDF.
4.  Ứng dụng xử lý PDF (Consumer) nhận Message từ Queue và bắt đầu xử lý PDF.

Các thuật ngữ cần nắm trong mô hình message queue:
* Producer: Phía bên đảm nhận việc gửi message. Bạn có thể xem đây là người cần gửi thư cho một ai đó.
* Consumer: Phía bên đảm nhận việc nhận message. Bạn có thể xem đây là người nhận được thư mà ai đó gửi tới.
*  Message: Thông tin dữ liệu truyền từ Producer đến Consumer. Đây chính là thư được gửi đi chứa nội dung gửi, nó có thể là thư tay, hàng hóa, bưu phẩm…
*  Queue: Nơi lưu trữ messages. Bạn có thể xem đây là một hòm lưu trữ thư với cơ chế, ai gửi trước thì được chuyển phát trước (First in first out)
*  Connection: Kết nối giữa ứng dụng và RabbitMQ broker. Đây có thể coi là các bưu điện đặt tại các tỉnh thành, khi bạn gửi thư thì bạn sẽ phải ra bưu điện đúng không nào
*   Exchange: Là nơi nhận message được publish từ Producer và đẩy chúng vào queue dựa vào quy tắc của từng loại Exchange. Để nhận được message, queue phải được nằm (binding) trong ít nhất 1 Exchange.. Có thể hiểu đây là một khu vực kho tổng hợp tất cả các thư mà mọi người gửi thư tới được tổng hợp, phân loại khu vực, gửi hàng loạt hay không…
*   Binding: Đảm nhận nhiệm vụ liên kết giữa Exchange và Queue. Có thể xem đây là quá trình chuyển thừ hòm lưu trữ thư vào kho phân loại.
*   Routing key: Một key mà Exchange dựa vào đó để quyết định cách để định tuyến message đến queue. Khi kiểm tra địa chỉ trên mỗi bức thư thì Routing key chính là địa chỉ người nhận, khi này việc phân loại thư trong kho sẽ phân loại dựa theo địa chỉ này để đưa tới từng khu vực bưu điện đích.
*   AMQP (Advance Message Queuing Protocol): là giao thức truyền message được sử dụng trong RabbitMQ.
*   User: Gồm username và password giúp truy cập vào RabbitMQ dashboard hoặc tạo connection. Có thể xem đây là những nhân viên bưu điện, họ có thể theo dõi, phân loại, can thiệp, hỗ trợ trong quá trình gửi bưu phẩm.
*  Virtual host/Vhost: Cung cấp những cách riêng biệt để các ứng dụng dùng chung một RabbitMQ instance. Hãy xem đây là những bưu cục chi nhánh rải trên khắp đất nước để thuận tiện cho người gửi cũng như người nhận.

Một điều lưu ý ở đây, tuy là mô hình message-oriented nhưng các ứng dụng, dịch vụ không làm việc trực tiếp với message mà chỉ làm việc qua Exchange. Exchange được phân thành nhiều loại (tham khỏa ở đây), trong bài viết này mình chỉ sử dụng Direct Exchagne (Default Exchange) để demo cho các bạn hiểu cách hoạt động trong RabbitMQ nhé.

Bắt tay tạo một mô hình message queue đơn giản thôi nào ! Mình sẽ tạo một RabbitMQ server bằng docker, và tạo ra Publisher và Consumer bằng Nodejs dùng để kết nối với RabbitMQ server vừa tạo

Nhập lệnh dưới đây để chạy rabbitmq server trên docker 
```
docker run --name rabbitmq -p 5672:5672 rabbitmq
```
Docker sẽ tạo RabbitMQ server từ RabbitMQ image với port mặc định là 5672.

Sau khi tạo RabbitMQ server thành công, chúng ta sẽ tạo publisher và consumer bằng nodejs:
Tạo ra 2 file consumer.js và publisher.js với code lần lượt là

```js:publisher.js
const amqp = require("amqplib")
connect();
async function connect(){
    try {
        const connection = amqp.connect("amqp://localhost:5672");
        const channel = await (await connection).createChannel();

        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from("Hi it works"))
        console.log("jobs sent successfully")


    }
    catch(ex) {
        console.error(ex)
    }
}
```
```js:consumer.js
const amqp = require("amqplib")
connect();
async function connect(){
    try {
        const connection = amqp.connect("amqp://localhost:5672");
        const channel = await (await connection).createChannel();

        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from("Hi it works"))
        console.log("jobs sent successfully")


    }
    catch(ex) {
        console.error(ex)
    }
}
```

Chạy lần lượt câu lệnh "node publisher.js" và "node consumer.js" sẽ nhận được kết quả 
![image.png](https://images.viblo.asia/50316b41-36a2-408d-b363-892811778f58.png)

Đầu tiên chúng ta tạo ra client là publisher kết nối với rabbitmq server và gửi message tới queue có tên là Jobs, tiếp theo consumer sẽ nhận tất cả các message mà có trong queue đó. Khi chúng ta tắt và mở lại thì consumer nhận và in ra 
![image.png](https://images.viblo.asia/dda18482-661f-4fb6-9a5e-44f86dcbc7b0.png)
Như vậy consumer sẽ nhận tất cả những message có trong queue và hiển thị như trên. Những message cũ vẫn được hiện thị vì chúng ta chưa đá nó ra khỏi queue. Thêm câu `channel.ack(message)` vào trong consumer.js để sau khi xử lí message xong chúng ta dequeue nó. 

![image.png](https://images.viblo.asia/23210ee4-0db5-4938-9759-fec284601507.png)

Trong thực tế , việc xử lý message sẽ phức tạp hơn rất nhiều, mục đích bài viết chỉ cho các bạn cách tiếp nhận và xử lý message một cách đơn giản nhất. hy vọng qua bài biết này, chúng ta có thể hiểu cách hoạt động của RabbitMQ cũng như cách thức truyền và nhận message giữa các ứng dụng. Thật đơn giản đúng không 😆