Trong kiến trúc cloud (hay microservices), các ứng dụng được chia thành những khối độc lập nhỏ hơn để có thể dễ dàng develop, deploy và maintain. Hãy thử tưởng tượng bạn có một kiến trúc cloud có nhiều service và nhiều request mỗi giây, bạn phải đảm bảo rằng không có bất cứ một request nào bị mất và web service của bạn luôn luôn sẵn sàng tiếp nhận request mới thay vì locked bởi đang xử lí request trước đó cũng như phải đảm bảo rằng các service giao tiếp với nhau một cách trơn tru và hiệu quả.

Vậy bạn làm thế nào? Câu trả lời đó chính là **Message Broker**!
## Message broker là gì?
**Message broker** (hay còn gọi là **integration broker** hoặc **interface engine**) là một module trung gian trung chuyển *message* từ người gửi đến người nhận. Nó là một mô hình kiến trúc (architentural pattern) để kiểm tra, trung chuyển và điều hướng *message*; làm trung gian giữa các ứng dụng với nhau, tối giản hóa giao tiếp giữa các ứng dụng đó và để tăng hiệu quả tối đa cho việc tách ra các khối nhỏ hơn. Nhiệm vụ chính của một **Message broker** là tiếp nhận những *message* từ các ứng dụng và thực hiện một thao tác nào đó. Hãy cùng nhìn vào sequence diagram dưới đây:

![](https://upload.wikimedia.org/wikipedia/commons/9/91/Message_Broker.png)

*<div align="center">Message Broker pattern sequence diagram</div>*

Như ta có thể thấy, trong quá trình *Initialize*, *Service1* và *Sevice2* init, rồi sau đó *load proxy* và *register* đến Broker. Từ đó, Broker sẽ trung chuyển các *message* đến với proxy đã được *register* từ trước. Pattern này sẽ có những lợi ích sau:
* *Service1* và *Service2* không cần phải biết nhau. Nó chỉ việc gửi *message* đến proxy, rồi từ đó proxy sẽ forward message đến Broker. Rồi từ đó Broker sẽ forward message đến *Service1* và *Service2* mà chúng đã đăng kí nhận message từ trước.
* *Service1* và *Service2* giao tiếp trung gian qua Broker nên dù có khác nhau về ngôn ngữ thì vẫn giao tiếp thành công.
* Với design pattern này, chúng ta có thể setup cơ chế bất đồng bộ (asynchronous). Đối với *Service1* thì nó không cần quan tâm khi nào *message* đến tay *Service2* hay khi nào *Service2* xử lý xong, nó chỉ cần đấy *message* đến **Message Broker** là xong việc. *Service2* sẽ lấy *message* bất cứ khi nào nó muốn. Đặc tính này có thể được tận dụng để xây dựng các hệ thống lưu trữ và xử lý log.

Hiện tại có rất nhiều các *message broker software* có thể kể đến như: **Amazon Web Services (AWS) Simple Queue Service (SQS)**, **Apache Kafka**, **Apache ActiveMQ**. Nhưng phổ biến nhất trong số những cái tên kể trên đó là **RabbitMQ**!
## RabbitMQ là gì?
**RabbitMQ** là một **Message broker** open-source, ban đầu được dùng cho **Advanced Message Queuing Protocol (AMQP)**, sau đó đã được phát triển để hỗ trợ **Streaming Text Oriented Messaging Protocol (STOMP)**, **Message Queuing Telemetry Transport (MQTT)**, và những giao thức khác. Tuy nhiên, trong bài viết này thì mình sẽ không đi sâu vào các protocol nói trên. **RabbitMQ** được viết bằng **Erlang**, một ngôn ngữ không phổ biến nhưng khá phù hợp với các công việc của **Message Broker**. 

**RabbitMQ** và trong *messaging* nói chung sử dụng những thuật như sau:
* **Producing** có nghĩa đơn giản là *gửi*. Ứng dụng gửi *message* được gọi là **Producer**.  

![](https://www.rabbitmq.com/img/tutorials/producer.png)
* **Queue** là một *post box* nằm trong **RabbitMQ**. *Message* di chuyển qua **RabbitMQ** và ứng dụng của bạn nhưng chúng chỉ có thể được lưu trong **queue**. **Queue** được giới hạn trong *memory* và *disk* của host. Về bản chất, nó là một bộ nhớ đệm *message* với dữ liệu lớn. Nhiều **producer** có thể gửi *message* vào một **queue** và nhiều **consumer** có thể nhận data từ một **queue**:

![](https://www.rabbitmq.com/img/tutorials/queue.png)
* **Consuming** có nghĩa tương tự như *nhận*. **Consumer**  là một ứng dụng chủ yếu chờ để nhận *message*:

![](https://www.rabbitmq.com/img/tutorials/consumer.png)

Lưu ý rằng **producer**, **consumer** và **broker** không cần phải phụ thuộc vào cùng một host. Trên thực tế rất hiếm có những ứng dụng như vậy. Một ứng dụng cũng có thể vừa là **producer** và vừa là **consumer**.

## Hello World!
Trong bài viết này, chúng ta sẽ dùng **Bunny Ruby Client** để làm ví dụ về một **producer** gửi *message* và một **consumer** nhận *message* và in ra màn hình. Trong hình dưới đây, **P** là **producer** và **C** là **consumer**, *box* ở giữa là một **queue**:

![](https://www.rabbitmq.com/img/tutorials/python-one.png)

Đầu tiên, ta cài đặt Bunny:
```bash
gem install bunny --version ">= 2.13.0"
```

### Sending
![](https://www.rabbitmq.com/img/tutorials/sending.png)

Chúng ta sẽ viết *message producer* trong `sender.rb` và *message consumer* trong `receiver.rb`. **producer** sẽ kết nối đến **RabbitMQ**, gửi một *message* rồi *exit*.

```ruby
#!/usr/bin/env ruby

require "bunny"

connection = Bunny.new(hostname: "rabbit.local")
connection.start
```
`connection` sẽ lấy một *socket connection*, xử lý version của protocol, xác thực và những thứ khác. Trong ví dụ này, ta sẽ *connect* đến *local*, nếu muốn *connect* đến một *host* khác thì chỉ cần dùng option `:hostname` và chỉ định domain name hoặc địa chỉ IP của nó. Tiếp đến, chúng ta tạo một *channel*, một *queue* để gửi *message*:
```ruby
channel = connection.create_channel # tạo một channel

queue = channel.queue("hello") # tạo queue tên là "hello"

channel.default_exchange.publish("Hello World!", routing_key: queue.name)
puts " [x] Sent \"Hello World!\""
```
**queue** sẽ chỉ được tạo nếu như nó chưa tồn tại, *message* là một *byte array* nên bạn có thể truyền bất cứ thứ gì bạn muốn. Cuối cùng, ta *close connecion*:
```ruby
connection.close
```

### Receiving
Giờ, **consumer** sẽ *listen message* từ **RabbitMQ**. Khác với **producer**, **consumer** sẽ chạy để *listen message* và in chúng ra màn hình.

![](https://www.rabbitmq.com/img/tutorials/receiving.png)

Tương tự như **producer**, ta mở *connection* và *channel*, khai báo *queue*, lưu ý rằng tên của *queue* phải giống *queue* bên `sender.rb`:
```ruby
#!/usr/bin/env ruby

require "bunny"

connection = Bunny.new(hostname: "rabbit.local")
connection.start

channel = connection.create_channel # tạo một channel

queue = channel.queue("hello") # tạo queue với tên giống với sender.rb
```
Ở đây, ta cũng khai báo *queue* để chắc chắn rằng *queue* đã tồn tại trước khi **consumer** *message*.

`Bunny::Queue#subscribe` sẽ *deliver message* từ *queue* và nó cũng là một *callback* được thực thi khi **RabbitMQ** đẩy *message* đến **consumer** một cách bất đồng bộ:
```ruby
begin
  puts " [*] Waiting for messages. To exit press CTRL+C"
  queue.subscribe(block: true) do |_delivery_info, _properties, body|
    puts " [x] Received #{body}"
  end
rescue Interrupt => _
  connection.close

  exit(0)
end
```
Ở đây, để tránh trường hợp `receiver.rb` kết thúc ngay lập tức, `Bunny::Queue#subscribe` dùng một *block* để chờ *thread* được thực thi.

Bây giờ, chạy **consumer**:
```ruby
ruby receiver.rb
```
sau đó chạy **sender**:
```ruby
ruby sender.rb
```
**consumer** sẽ in *message* nó nhận được từ **producer** thông qua **RabbitMQ**. **Consumer** sẽ vẫn tiếp tục chạy để chờ *message*. 

Hãy thử chạy **producer** trên một terminal khác để hiểu rõ hơn nhé!

## Tài liệu tham khảo
* [Benefits of Message Queues](https://aws.amazon.com/message-queue/benefits/)
* [Tìm hiểu về RabbitMQ](https://viblo.asia/p/tim-hieu-ve-rabbitmq-OeVKB8bMlkW#_2-xay-dung-ung-dung-voi-spring-boot-va-rabbitmq-3)
* [Message broker](https://en.wikipedia.org/wiki/Message_broker)
* [RabbitMQ](https://en.wikipedia.org/wiki/RabbitMQ)
* [Những điều cần biết về RabbitMQ](https://medium.com/@buihuycuong/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-v%E1%BB%81-rabbitmq-354a37ecf218)
* [RabbitMQ Tutorials](https://www.rabbitmq.com/tutorials/tutorial-one-ruby.html)