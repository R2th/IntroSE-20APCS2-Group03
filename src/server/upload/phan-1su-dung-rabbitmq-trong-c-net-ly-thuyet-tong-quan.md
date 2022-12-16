Hi mọi người,

Hôm nay mình sẽ chia sẻ về cách sử dụng RabbitMQ trong C# .Net 6. 
Bài viết sẽ giới thiệu các kiến thức cơ bản nhất về RabbitMQ và thực hành sử dụng RabbitMQ trong ứng dụng .NET 6. 

Không để mọi người chờ lâu, cùng bắt đầu nào!

### 1. Message Queue là gì?

![image.png](https://images.viblo.asia/459069f9-412a-4b8c-8d56-129331043de9.png)

- Message queue là một hàng đợi chứa các message, cho phép các ứng dụng có thể giao tiếp với nhau thông qua việc gửi message vào Message Queue như một hộp thư. Message queue đóng vai trò như nơi lưu trữ tạm thời các message khi các ứng dụng đích đến bận hoặc không kết nối.

- Message queue là hàng đợi nên hoạt động theo cơ chế FIFO (first in first out) - message nào vào trước thì được lấy ra trước.

- Hình ở trên minh họa các thành phần của hệ thống message queue.
    - Producer: ứng dụng tạo và gửi message vào Queue. Có thể hiểu là bên gửi.
    - Queue: nơi lưu trữ tạm thời các message, hoạt động theo cơ chế FIFO.
    - Message: thông tin được gửi đi (có thể dạng string, number, object, json...)
    - Cosumer: ứng dụng nhận và xử lý message từ queue.

- Các message queue phổ biến:
    - RabbitMQ
    - Kafka
    - MSMQ
    - Amazon SQS

Ở bài viết này chúng ta sẽ tìm hiểu về RabbitMQ.

### 2. Message broker là gì?
![image.png](https://images.viblo.asia/8ff3b618-7e0a-405a-9b6a-553635cc2ae8.png)

- Message broker (hay còn gọi là integration broker hoặc interface engine) là một module trung gian trung chuyển message từ người gửi đến người nhận. Nhiệm vụ của message broker là tiếp nhận message và thực hiện một thao tác nào đó.

### 3. RabbitMQ là gì?
-    RabbitMQ là một message broker cho phép nhận, lưu trữ và gửi message.
-    RabbitMQ là open source và cross-platform message broker.
-    RabbitMQ được xây dựng bằng ngôn ngữ Erlang.
-    RabbitMQ cung cấp thư viện để tích hợp với nhiều thư viện, framework và ngôn ngữ như: Net, Java, Python, Ruby, Node.Js....
-    RabbitMQ được sử dụng rất phổ biến hiện nay. Các ứng dụng sử dụng RabbitMQ như: WhatsApp, Instagram, ...
![image.png](https://images.viblo.asia/2d544493-7d34-4fcd-a829-8fb551f31cfb.png)

### 4. Các khái niệm chính trong RabbitMQ?
![image.png](https://images.viblo.asia/c93a1680-1988-4a3a-bad7-310437068615.png)

- Publisher/Producer: Ứng dụng gửi message.
- Consumer: Ứng dụng nhận message.
- Queue: nơi lưu trữ tạm thời message, hoạt động theo cơ chế FIFO.
- Message:  thông tin được gửi đi (có thể dạng string, number, object, json...)
- Connection: một tcp connection giữa ứng dụng và message broker.
- Channel: 
    -  Một kết nối ảo trong connection. Các message được pusblish và cosume dựa trên kết nối ảo này.
    -  Ta có thể xem các thông tin trong channel: username, mode, state of channel, unconfirmed, prefetch...
    
![image.png](https://images.viblo.asia/eb259cc4-cff5-42d4-b55a-309383e75c31.png)
- Exchange: Trong RabbitMQ thì message sẽ không gửi trực tiếp tới queue, thay vào đó message sẽ gửi qua exchange sau đó sẽ được routing tới queue phù hợp với header attributes, bindding key, routting pattern...
- Binding: cấu hình giúp thiết lập quan hệ giữa exchange và queue.
- Routing key: giúp cho exchange biết được message nào routing đến queue nào dựa vào key. Key đóng vai trò như địa chỉ của message.
- AMQP  là một advance message queue protocol cho phép gửi và nhận message cho message broker.
- User: để có thể sử dụng rabbitMQ ta cần một user và password, có thể cấu hình các quyền cho từng user trên một virtual host nào đó.
![image.png](https://images.viblo.asia/30ef35dc-7013-4758-8a54-c6521deb5086.png)
- Virtual host: cho phép tạo ra nhiều host trên một RabbitMQ instance. Các virtual host này có exchange, queue, binding, user permission và policy riêng...
![image.png](https://images.viblo.asia/dbf35e07-796d-4159-a790-f1d60f794e5e.png)

### 5. Các loại exchange

Trong RabbitMQ có 4 loại exchange:
 - Direct: route message dựa trên routing key. Các queue sẽ nhận message đúng chính xác routing key đó. Ví dụ như hình ở trên ta có thể dựa vào routing key Mumbai_key để lấy chính xác message đó, hoặc dựa vào routing key Bangalore_key để lấy đúng message cho key đó.

![image.png](https://images.viblo.asia/1bf98517-4986-4d5f-8173-732982c3afa0.png)

- Fanout: route tất cả messages tới tất cả queue ràng buộc tới nó. Như hình dưới tất cả message được gửi tới queue qua exchange với type là Fanout thì tất cả queue sẽ đều nhận message đó.

![image.png](https://images.viblo.asia/b3303afa-35f7-4e39-863f-3a0300ec20a7.png)
- Topic: với exchange type là topic thì các message sẽ route theo một pattern nhất định của queue đó. Ví dụ queue có pattern: *.Bombay.* thì message với routing key User.Bombay.Message sẽ đến queue đó.

![image.png](https://images.viblo.asia/0fc476f2-d323-4703-8b02-e7a31b941fe5.png)

- Header: sử dụng message header attribute cho việc routing.

![image.png](https://images.viblo.asia/8a45f67c-bab7-4e19-91a4-0113fc48665a.png)

### 5. Tổng kết
- Vậy là chúng ta đã đi qua tổng quan lý thuyết về RabbitMQ. Ở phần 2 mình sẽ đi vào phần thực hành sử dụng RabbitMQ trong .net 6.
- Cảm ơn mọi người đã xem bài viết. Chúc mọi người một cuối tuần vui vẻ.
- Nếu có thắc mắc về các phần trong bài này mọi người có thể inbox qua facebook:https://www.facebook.com/FriendsCode-108096425243996 Mình sẽ giải đáp thắc mắc trong tầm hiểu biết. Cảm ơn mọi người


**Tham khảo**:
- https://aws.amazon.com/message-queue/
- https://www.cloudamqp.com/blog/what-is-message-queuing.html
- https://tsh.io/blog/message-broker/
-https://www.tutlane.com/tutorial/rabbitmq/introduction-to-rabbitmq
- https://www.cloudamqp.com/blog/what-is-amqp-and-why-is-it-used-in-rabbitmq.html
- https://www.tutlane.com/tutorial/rabbitmq/rabbitmq-users
- https://www.tutlane.com/tutorial/rabbitmq/rabbitmq-virtual-hosts
- https://www.tutlane.com/tutorial/rabbitmq/rabbitmq-exchanges