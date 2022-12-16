Ở [phần trước](https://viblo.asia/p/tim-hieu-ve-microservices-phan-1-microservices-la-gi-63vKjVjyK2R) mình đã có bài viết tổng quát về Microservices. Trong bài viết này, chúng ta sẽ đi đến một bài toán cụ thể hơn, đó là vấn đề **communication trong microservices**.

Một trong những khó khăn lớn nhất khi chuyển đổi hệ thống từ monolithic qua microservices có lẽ là sự thay đổi cách thức giao tiếp.

Phụ thuộc vào tính chất của serivce, người ta thường dùng 3 communication styles chính:

*  Remote Procedure Invocation
*  Messaging
* Domain-specific protocol

### 1. Remote Procedure Invocation (RPI)

Sử dụng RPI để liên lạc giữa các service, client sử dụng một request/reply-based protocol để tạo request đến service.

Xem xét ví dụ cụ thể sau: 

![](https://images.viblo.asia/c247ce56-e3bd-45fa-95a3-e209d4ba5863.png)

Service Order và Payment exposed các API để client hoặc các service khác gọi đến nó. Khi client call REST API request để thực hiện một Order. Order service nhận request xử lý business logic rồi gọi tới Payment Service qua API để thực hiện Payment. Mô hình trên là loại mô hình kết nối Point-To-Point, các service kết nối trực tiếp với nhau thông qua API end-point. 

Một vài pattern cho RPI:

* [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
* [gRPC](https://www.grpc.io/)
* [Apache Thrift](https://thrift.apache.org/)

Việc sử dụng RPI là rất phổ biến vì chúng có những lợi ích:

* Đơn giản và quen thuộc
* Việc request/reply khá dễ dàng
* Hệ thống trở nên đơn giản do không cần các message broker cho gửi nhận request/response

Tuy nhiên chúng cũng có vài nhược điểm: 

* Thông thường chỉ hỗ trợ request/reply mà không hỗ trợ notifications, request/async response, publish/subscribe, publish/async response
* Client và service sẽ phải luôn có sẵn trong suốt thời gian tương tác

### 2. Messaging

Sử dụng asynchronous messaging để giao tiếp giữa các serivces. Các services trao đổi message qua các kênh message.

Tiếp tục với bài toán của RPI:

![](https://images.viblo.asia/562f9b20-4123-407e-bbba-79cc53ca2707.png)

Trong mô hình này, các Microservice không giao tiếp trực tiếp với nhau mà thông qua hệ thống Message Queue, giao tiếp bất đồng bộ.

* *Order Microservice publish một message đến Message queue theo một topic nào đó.*
* *Payment Microservice và các Microservice sẽ subscribe các message theo một topic cụ thể. Ví dụ Payment Microservice subscribe message topic “ABC” thì chỉ khi Order Microservice gửi message ABC thì nó mới nhận.*

Cơ chế này tương tự như cách bạn gửi thư từ A đến B. A sẽ không đem thư đến tận nơi cho B mà gửi qua bưu điện, ghi rõ địa chỉ người nhận. Bưu điện đóng vai trò như một Message Broker để phát thư đến người nhận theo địa chỉ đã cho.

Cụ thể, chúng ta có một vài pattern về asynchronous messaging:

* [Apache Kafka](http://kafka.apache.org/)
* [RabbitMQ](https://www.rabbitmq.com/)

Sử dụng messaging pattern có các ưu điểm sau:

* Hỗ trợ nhiều kiểu giao tiếp như request/reply, notifications, request/async response, publish/subscribe, publish/async response
* Vì chúng là asynchronous nên tách biệt người gửi và người nhận, và message broker sẽ lưu tin nhắn đến khi người nhận có thể xử lý.

Tuy nhiên chúng cũng có nhược điểm:

* Hệ thống trở nên phức tạp hơn vì cần message broker

### 3. Domain-specific protocol

Trong một vài trường hợp đặc biệt chúng ta không thể sử dụng RPI hay Messaging mà thay vào đó cần dùng domain-specific protocol cho việc giao tiếp giữa các services.

Một vài ví dụ cụ thể về domain-specific protocol:

* Email protocols như: SMTP, IMAP
* Media streaming protocols như: RTMP, HLS, và HDS