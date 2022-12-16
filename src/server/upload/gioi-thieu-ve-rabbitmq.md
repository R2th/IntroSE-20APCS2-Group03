# 1. Overview
Việc tách rời các thành phần phần mềm là một trong những phần quan trọng nhất trong thiết kế phần mềm. Có một cách để đạt được điều này là sử dụng các hệ thống tin nhắn, cung cấp một giao tiếp không đồng bộ giữa các thành phần (services). Trong bài viết này, chúng ta sẽ đề cập đến một trong những hệ thống như vậy: RabbitMQ. 

RabbitMQ là một nhà môi giới tin nhắn implements **Advanced Message Queuing Protocol [(AMQP)](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)**. Nó cung cấp các thư viện cho nhiều ngôn ngữ lập trình để có thể trao đổi dữ liệu giữa các ứng dụng có nền tảng khác nhau, chẳng hạn như tin nhắn được gửi từ ứng dụng .Net có thể được đọc bởi ứng dụng Node.js hoặc ứng dụng Java.

Ngoài việc sử dụng để tách các thành phần phần mềm, RabbitMQ có thể được sử dụng cho:
* Thực hiện các thao tác ở tầng nền
* Thực hiện các thao tác không đồng bộ

# 2. Messaging Model
Đầu tiên, để có một cái nhìn khách quan, rõ hơn về cách hoạt động của messaging. 

Nói một cách đơn giản, có hai ứng dụng tương tác với một hệ thống nhắn tin: nhà sản xuất(Producer) và người tiêu dùng(Consumer). Nhà sản xuất là những người gửi tin nhắn cho nhà môi giới và người tiêu dùng nhận tin nhắn từ nhà môi giới này. Thông thường, các chương trình này (các ứng dụng) đang chạy trên các máy khác nhau và RabbitMQ hoạt động như một phần mềm trung gian giao tiếp giữa chúng. 

Trong bài viết này, chúng ta sẽ thảo luận về một ví dụ đơn giản với hai dịch vụ sẽ giao tiếp bằng RabbitMQ. Một trong những dịch vụ sẽ xuất bản tin nhắn lên RabbitMQ và dịch vụ còn lại sẽ tiêu thụ.

# 3. Setup
Để bắt đầu, hãy cài đặt RabbitMQ theo hướng dẫn thiết lập [tại đây.](https://www.rabbitmq.com/download.html)

Sử dụng Java client để tương tác với RabbitMQ server, cấu hình Maven cho client như sau:
```
<dependency>
    <groupId>com.rabbitmq</groupId>
    <artifactId>amqp-client</artifactId>
    <version>4.0.0</version>
</dependency>
```
Sau khi chạy RabbitMQ theo hướng dẫn trên, chúng ta kết nối nó với Java client như sau:
```
ConnectionFactory factory = new ConnectionFactory();
factory.setHost("localhost");
Connection connection = factory.newConnection();
Channel channel = connection.createChannel();
```
Chúng ta sử dụng ConnectionFactory để thiết lập kết nối với máy chủ, nó cũng đảm nhiệm giao thức (AMQP) và xác thực. Ở đây chúng ta kết nối với máy chủ trên localhost, chúng ta có thể sửa đổi tên máy chủ bằng cách sử dụng chức năng setHost.
<br>
Chúng ta có thể sử dụng setPort để đặt cổng nếu cổng mặc định không được sử dụng bởi RabbitMQ Server; cổng mặc định cho RabbitMQ là *15672*:
```
factory.setPort(15678);
```
Chúng ta có thể đặt tên người dùng và mật khẩu:
```
factory.setUsername("user1");
factory.setPassword("MyPassword");
```
# 4. Producer
Hãy xem xét một kịch bản đơn giản trong đó một ứng dụng web cho phép người dùng thêm sản phẩm mới vào trang web. Bất cứ khi nào sản phẩm mới được thêm vào, chúng ta cần gửi email cho customers.
Đầu tiên, hãy định nghĩa một hàng đợi:
```
channel.queueDeclare("products_queue", false, false, false, null);
```
Mỗi khi người dùng thêm một sản phẩm mới, chúng ta sẽ xuất bản một thông báo vào hàng đợi:
```
String message = "product details"; 
channel.basicPublish("", "products_queue", null, message.getBytes());
```
Cuối cùng, chúng ta đóng channel và kết nối:
```
channel.close();
connection.close();
```
Thông báo này sẽ được sử dụng bởi một service khác, chịu trách nhiệm gửi email cho customers.

# 5. Consumer
Để phía consumer có thể cùng sử dụng, chúng ta sẽ khai báo cùng một hàng đợi:
```
channel.queueDeclare("products_queue", false, false, false, null);
```
Ở đây, chúng ta xác định consumer sẽ xử lý tin nhắn từ hàng đợi không đồng bộ:
```
Consumer consumer = new DefaultConsumer(channel) {
    @Override
     public void handleDelivery(
        String consumerTag,
        Envelope envelope, 
        AMQP.BasicProperties properties, 
        byte[] body) throws IOException {
  
            String message = new String(body, "UTF-8");
            // process the message
     }
};
channel.basicConsume("products_queue", true, consumer);
```
# 6. Conclusion
Bài viết này bao gồm các khái niệm cơ bản về RabbitMQ và thảo luận về một ví dụ đơn giản sử dụng nó.
Việc thực hiện đầy đủ của hướng dẫn này có thể được tìm thấy trong [GitHub project.](https://github.com/eugenp/tutorials/tree/master/rabbitmq)


### Nguồn: 
https://www.baeldung.com/rabbitmq