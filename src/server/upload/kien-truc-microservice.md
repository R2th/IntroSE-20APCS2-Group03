### 1. Đề bài

Bạn đang phát triển một ứng dụng doanh nghiệp:
- Hỗ trợ nhiều loại client khác nhau bao gồm browser, app mobile, và cung cấp API cho bên thứ ba.
- Tích hợp với các ứng dụng khác thông qua web service hoặc message broker;
- Xử lý các HTTP request bằng cách thực thi logic nghiệp vụ; truy cập cơ sở dữ liệu; trao đổi thông tin với các hệ thống khác; trả về HTML/JSON/XML;
- Gồm có các thành phần logic tương ứng với chức năng của ứng dụng. Các thành phần có thể chịu tải khác nhau và cần được scale một cách thích hợp và độc lập.
### 2. Giải pháp
Sắp xếp ứng dụng như một tập hợp các service được kết hợp với nhau một cách lỏng lẻo.
1. Các service giao tiếp bằng cách sử dụng các giao thức như HTTP/REST hoặc AMQP - do đó, các dữ liệu trao đổi là hang hàng với nhau;
2. Các dịch vụ được phát triển và deploy một cách độc lập - nó cho phép một team phát triển và deploy một service mà không cần phải phối hợp với các service và team khác.
3. Mỗi service có database của riêng của nó - để tách biệt khỏi các service khác.
4. Các giao tiếp nghiệp vụ được thực hiện như một chuỗi các giao dịch nội bộ (service-to-service) thông qua event channels hoặc message brokers.
### 3. Sơ đồ khái niệm
Ứng dụng microservice bao gồm các thành phần sau:
- **API Gateway** nhận tất cả các API từ các client, sau đó định tuyến chúng đến service thích hợp.
- **Ứng dụng Web** triển khai giao diện web cho người dùng.
- Các backend service bao gồm **Service A** và **Service B** - chúng là các đơn vị thực thi logic nghiệp vụ với database của riêng chúng và giao tiếp thông qua một **[message broker](https://viblo.asia/p/message-broker-la-gi-so-luoc-ve-rabbitmq-va-ung-dung-demo-djeZ1PVJKWz)**.

![](https://miro.medium.com/max/2400/1*kSLJKEl3X-gKNTpO1l7SQg.png)
*<div align="center">Sơ đồ khái niệm kiến trúc Microservice.</div>*
### 4. Kiến trúc microservice không có server (serverless) trong thực tế (AWS)
Ví dụ dưới đây là một e-learning platform được triển khai dưới dạng microservice với một serverless backend.
#### Mô tả các thành phần
1. **Cognito** xử lý đăng ký, đăng nhập và kiểm soát truy cập của người dùng.
2. **CloudFront** *cache* dữ liệu web **S3** tĩnh.
3. **API Gateway** xử lý các lệnh gọi API. Sử dụng “Lambda Authorizers” của API Gateway, nó kết nối một hàm Lambda xử lý `Authorization` header và trả về một IAM policy. API Gateway sau đó sử dụng policy đó để xác định xem nó có hợp lệ với tài nguyên hay không và định tuyến yêu cầu hoặc từ chối nó. API Gateway lưu trữ IAM policy trong một khoảng thời gian, vì vậy bạn cũng có thể phân loại đây là mẫu “Khóa xác thực”. API Gateway phân phối log đến **CloudWatch**.
4. **Lambda** xử lý mọi thứ cần thiết để chạy và scale quy mô thực thi để đáp ứng nhu cầu thực tế với tính khả dụng cao. Lambda hỗ trợ một số ngôn ngữ lập trình và nó có thể được gọi trực tiếp từ bất kỳ ứng dụng web hoặc mobile app nào. Lambda được tích hợp với API Gateway. Các lệnh gọi đồng bộ từ API Gateway tới AWS Lambda cho phép các ứng dụng hoạt động như không có máy chủ (severless). AWS Lambda lưu trữ dữ liệu động trong **DynamoDB** - cơ sở dữ liệu thuộc dạng NoSQL - và dữ liệu tĩnh trong **S3** Bucket.
5. **MQ Broker** - chịu trách nhiệm giao tiếp bất đồng bộ giữa các microservice.
6. **RDS** lưu trữ dữ liệu người dùng và dữ liệu nghiệp vụ khác.

![](https://miro.medium.com/max/2400/1*q4HVAG9lia4R4iPkopNMow.png)
*<div align="center">Nền tảng e-learning kiến trúc microservice không máy chủ (serverless).</div>*

### 5. Lợi ích
1. **Cho phép phân phối và triển khai liên tục các ứng dụng lớn, phức tạp.**
   * Mỗi service là tương đối nhỏ nên dễ đọc và dễ thay đổi hơn - bảo trì dễ dàng hơn.
   * Service nhỏ hơn và nhanh hơn để kiểm tra - kiểm tra dễ dàng hơn.
   * Các service có thể được deploy độc lập - deploy dễ dàng hơn.
   * Effort phát triển được quản lý bởi nhiều team có tổ chức. Mỗi team sở hữu và chịu trách nhiệm về một hoặc nhiều service. Mỗi team có thể phát triển, thử nghiệm, deploy và mở rộng quy mô dịch vụ của mình một cách độc lập với tất cả các team khác. Phát triển dễ dàng và dễ mở rộng hơn.
2. **Mỗi microservice tương đối nhỏ.**
   * Developer dễ đọc hiểu hơn
   * IDE load nhanh hơn giúp làm việc hiệu quả hơn
   * Ứng dụng khởi động nhanh hơn, giúp làm việc hiệu quả hơn và tăng tốc độ deploy
3. **Mỗi một microservice được độc lập.** <br>
Nếu một service bị lỗi, các dịch vụ khác sẽ không bị ảnh hưởng và tiếp tục xử lý các yêu cầu. Trong khi đó, một thành phần hoạt động sai của một kiến trúc nguyên khối có thể làm hỏng toàn bộ hệ thống.
4. **Không phải bó buộc với một loại công nghệ.** <br>
Khi phát triển một service mới, bạn có thể chọn một công nghệ mới. Tương tự, khi thực hiện những thay đổi lớn đối với một service hiện có, bạn có thể viết lại nó bằng cách sử dụng một công nghệ mới.
### 6. Hạn chế
1. **Phức tạp hơn so với việc xây dựng một hệ thống phân tán**
   * Các developer phải thực hiện cơ chế giao tiếp giữa các service và đối ứng với những phần giao tiếp bị lỗi.
   * Phát triển những yêu cầu nghiệp vụ rộng khắp nhiều service là rất khó khăn và đòi hỏi sự phối hợp cẩn thận giữa các team với nhau.
   * Kiểm tra sự tương tác giữa các service khó hơn so với hệ thống tập trung.
   * Các công cụ/IDE dành cho developer được định hướng để xây dựng các ứng dụng tập trung và không cung cấp những sự hỗ trợ rõ ràng để phát triển các ứng dụng phân tán.
2. **Độ phức tạp khi deploy** <br>
Khi deploy production, cũng có sự phức tạp trong hoạt động của việc deploy và quản lý một hệ thống bao gồm nhiều service khác nhau.
3. **Tăng sức tiêu thụ bộ nhớ** <br>
Kiến trúc microservice thay thế N ứng dụng nguyên khối bằng NxM service. Nếu mỗi service chạy trong JVM (Java virtual machine hoặc môi trường khác) của riêng nó, điều này thường là cần thiết để cô lập các ứng dụng, thì tổng chi phí sẽ gấp M lần. Hơn nữa, nếu mỗi service chạy trên máy ảo riêng của nó (ví dụ: EC2), cụ thể như Netflix, chi phí thậm chí còn cao hơn.
### 7. Khi nào bạn nên sử dụng nó?
Chắc chắn không phải là một ý tưởng hay cho phiên bản đầu tiên của ứng dụng, vì đơn giản là bạn không gặp vấn đề gì đến nỗi cần cách tiếp cận này giải quyết. Sử dụng một kiến trúc phân tán, phức tạp sẽ làm chậm quá trình phát triển. Đây có thể là một vấn đề lớn đối với các công ty khởi nghiệp trong khi thách thức lớn nhất thường là làm thế nào để phát triển nhanh chóng mô hình kinh doanh và ứng dụng đi kèm. Việc phân rã chức năng có thể khiến việc phát triển trở nên khó khăn hơn nhiều. Tuy nhiên, sau này, khi thách thức là làm thế nào để mở rộng quy mô và bạn cần phân rã chức năng, các phần phụ thuộc có thể gây khó khăn cho việc phân rã ứng dụng nguyên khối của bạn thành một tập hợp các dịch vụ.
### 8. Tổng kết
1. Ý tưởng **cốt lõi** của kiến trúc microservice là chia backend thành một tập hợp các service được kết hợp một cách lỏng lẻo, được phát triển, deploy, thử nghiệm và mở rộng một cách độc lập.
2. **Lợi ích là** 
   * Cho phép phân phối và deploy liên tục các ứng dụng lớn, phức tạp;
   * Không phải bó buộc với một loại công nghệ; 
   * Bảo trì đơn giản hơn; 
   * Tăng tính khả dụng khi có vấn đề xảy ra.
3. **Hạn chế là**
   * Tăng độ phức tạp của việc phát triển và deploy;
   * Tăng tiêu thụ bộ nhớ.
4. **Áp dụng** mô hình kiến trúc microservice trong giai đoạn phát triển sau này, khi mà việc mở rộng quy mô trở thành vấn đề quan trọng nhất.
### Nguồn tham khảo
- [Microservices Architecture](https://levelup.gitconnected.com/microservices-architecture-74c26df8688)