Chào các bạn,mình đã quay trở lại, và trong bài viết này, mình sẽ giới thiệu cho các bạn về performance testing dành cho hệ thống microservice theo mô hình event-driven
Trước khi vào nội dung chính, mình xin giới thiệu qua một số khái niệm trước:
### I. Performance testing là gì?
Performance testing là một thực hành kiểm thử được thực hiện để xác định cách hệ thống thực hiện theo mức độ đáp ứng và độ ổn định trong một khối lượng công việc cụ thể.
Nói ở mức độ dễ hiểu thì performance testing là giả lập cách hệ thống hoạt động ở mức độ cao, xem hệ thống có hoạt động hiệu quả, trơn tru hay lỗi ở đâu không, để khi sản phẩm chạy production chạy ngon lành khi lượng request từ người dùng tăng cao

### Vậy còn Microservice là gì và nó khác gì với mô hình Monolithic truyền thống?
Mình không đi sâu giới thiệu Microservice và Monolithic vì có rất nhiều bài đã giới thiệu về 2 mô hình này rồi, trong bài này mình chỉ giới thiệu qua về Microservice là điểm khác biệt của mô hình này với mô hình truyền thống Monolithic.
Mỗi mô hình trên có những ưu và nhược điểm riêng phù hợp với từng bài toán và trường hợp triển khai cụ thể. Mô hình truyền thống Monolithic bị giới hạn khi hệ thống mở rộng quy mô bởi tính chặt chẽ trong mô hình vừa là điểm lợi vừa là điểm hại.
Không giống với mô hình Monolithic là toàn bộ project được viết và đóng gói trong cùng một package, khá khó khăn trong việc bảo trì và mở rộng hệ thống, cũng như hệ thống bị phụ thuộc bởi một stack công nghệ duy nhất. Mô hình Microservice phân tách các chức năng thành các service riêng biệt, mỗi service sẽ chịu trách nhiệm cụ thể và chỉ tập trung vào nhiệm vụ đó, các service được phát triển độc lập mang lại cho hệ thống tính linh hoạt, dễ dàng mở rộng và bảo trì.
Microservice có một số mô hình phát triển phổ biến:
- 1 là dùng Restful thuần túy, sử dụng format JSON (hoặc Protobuf, Avro…). Các service gọi service khác đồng bộ hoặc bất đồng bộ.
- 2 là theo mô hình Event-driven, sử dụng các hệ thống message - queue như RabbitMQ, Kafka… để tương tác giữa các microservice thông qua việc gửi và nhận sự kiện. Cách này là bất đồng bộ hoàn toàn.
- 3 là dùng Event Sourcing Pattern, phân tách phần đọc & ghi.
Mô hình 2 khá phổ biến và được triển khai rất nhiều trong các hệ thống lớn bởi sự linh hoạt của nó. Khác với mô hình 1 các service gọi nhau thông qua API Restful, trong mô hình 2 các service giao tiếp với nhau thông qua message - queue làm phát sinh vấn đề: Làm cách nào để kiểm thử hệ thống Microservice theo mô hình event-driven khi không thể truy cập qua HTTP request cũng như không thể truy cập trực tiếp từ bất kỳ giao diện web nào?

Chúng ta cùng đi phân tích các hoạt động xảy ra trong một giao dịch chuyển tiền bao gồm các thành phần và giao diện như sau: ứng dụng web, Rest API, một microservice, một message broker và một CSDL NoSQL:
1. Người dùng đăng nhập vào ứng dụng web
2. Người dùng thực hiện giao dịch
3. Message được gửi đến topic TRANSACTION INITIATED trong message broker thông báo khởi tạo giao dịch
4. Tất cả các queue đã subscribe nhận được tin nhắn trên, hệ thống có một service RecordCreator sẽ bắt được tin nhắn và xử lý
5. Một giao dịch được tạo trong database và gửi tin nhắn đến topic RECORD CREATED trong message broker thông báo giao dịch đã được tạo
6. Service FILECREATOR sẽ lấy tin nhắn và tạo file data

![](https://images.viblo.asia/3cee7c03-3986-4d32-9b46-015cf58dc182.png)
Luồng giao dịch chuyển tiền trong kiến ​​trúc Microservice


### III. Kiểm thử chức năng cho Microservice

Trước khi đi đến phần kiểm thử performance cho microservice, chúng ta hãy nói qua về kiểm thử chức năng cho Microservice trước nhé 
Trong ví dụ trên, mỗi microservice được kích hoạt khi một sự kiện xảy ra và tất cả các tương tác đều dựa trên các message. Để test service RecordCreator, hãy gửi một message đến message broker và xác thực dữ liệu đã được thêm vào cơ sở dữ liệu NoSQL. Điều này xác thực chức năng của service có hoạt động hay không.

Nếu chức năng duy nhất của microservice là gửi tin nhắn đến các hàng đợi khác, thì hãy đăng ký nhiều hàng đợi cho cùng một topic. Sử dụng một hàng đợi dành riêng cho chức năng dự định và một “test queue” khác để kiểm tra xem tin nhắn có được chuyển tiếp bởi message broker hay không

### IV. Kiểm thử performance cho Microservice

Kiểm thử chức năng cho Microservice đảm bảo chất lượng của service yêu cầu. Tuy nhiên, một ứng dụng tốt cần đạt cả các yêu cầu về chức năng, hiệu suất và bảo mật. Ngoài ra, trong kiến trúc Microservice, cần kiểm tra hiệu năng của tất cả các thành phần trong ứng dụng: các service con, API, database, ứng dụng web cũng như toàn bộ ứng dụng. Việc kiểm thử hiệu năng của những thành phần riêng lẻ giúp đánh giá mức độ chịu tải và hiệu suất của toàn bộ hệ thống.

Hãy cùng xem cách chúng ta có thể thực hiện kiểm thử hiệu suất cho hệ thống Microservice theo mô hình event-driven. Dưới đây là danh sách các thành phần và công cụ liên quan đến performance test cho service RecordCreator:
- Thành phần: AWS SNS/SQS, NoSQL database
- Công cụ:
               
    - JMeter: Một ứng dụng java được thiết kế để test chức năng và đo lường hiệu suất của ứng dụng đang được thử nghiệm
   - influxDB: Một CSDL dạng time series mã nguồn mở
   - Grafana: Công cụ thống kê và phân tích số liệu trực quan. Nó thường được sử dụng để hiển thị time series data cho cơ sở hạ tầng và phân tích ứng dụng.
   - Cloudwatch: AWS Cloudwatch là một dịch vụ giám sát cho các tài nguyên trong AWS và các ứng dụng chạy trên nền tảng AWS

Phạm vi kiểm thử:
Kiểm thử hiệu suất bao gồm nhiều phần khác nhau: load test, stress test và soak test… Tuy nhiên trong ví dụ này, chúng ra sẽ thực hiện một kiểm thử load test trong một khoảng thời gian cố định để hiểu thông lượng (số tin nhắn được xử lý) của một service

Giả định rằng:
- Microservice được deploy trên một EC2 instance và kích hoạt Cloudwatch cho EC2 và SQS queue
- Kích thước message phù hợp với yêu cầu kích thước message của SQS
- AWS SQS được đăng ký với một topic SNS hợp lệ
- Việc kiểm thử được thực hiện trên một EC2 độc lập
- influxDB instance có sẵn và các tham số trong file influxdb.conf được cập nhật để support Graphite như tham số đầu vào
- Grafana dashboard instance có sẵn

Cấu hình kiểm thử:
Để kiểm thử hiệu năng của service RecordCreator, hãy gửi một số lượng lớn tin nhắn đến AWS SNS topic sử dụng JMeter. Sau đó tính toán thông lượng dịch vụ với sự trợ giúp của các số liệu SQS như NumberOfMessagesSent, NumberOfMessagesDeleted, ApproximateNumberOfMessagesVisible từ AWS Cloudwatch và số liệu thời gian phản hồi dựa trên chênh lệch timestamp của thông báo từ AWS SQS và transaction được tạo trong NoSQL database. Một điểm cần lưu ý ở đây là, một tin nhắn hợp lệ chỉ bị xoá khỏi SQS khi microservice xử lý và nhận tin nhắn trước khi nó hết thời gian hiển thị.
Tham khảo chi tiết các thông số thống kê Cloudwatch cho AWS SQS tại đây:
- NumberOfMessagesSent: Số lượng tin nhắn thêm vào queue
- NumberOfMessagesDeleted: Số lượng tin nhắn xoá khỏi queue
- ApproximateNumberOfMessagesVisible: Số lượng tin nhắn có sẵn để lấy trong queue

Các bước thực hiện:
1. Tạo một class java lấy transactionId và gửi tin nhắn đến AWS SNS topic
2. Extend class java này với AbstractJavaSamplerClient để giúp nó tương thích với Java request sampler của Jmeter
3. Bây giờ convert file java sang file jar và đặt nó trong thư mục lib/ext của thư mục cài đặt JMeter kèm với các file dependent jar
4. Mở JMeter và tạo một test plan mới, thêm một thread group vào plan để cấu hình số lượng người dùng(threads), trong suốt thời gian thực thi test và đếm vòng lặp
5. Thêm một thành phần biến ngẫu nhiên vào thread group. Điều này giúp tạo các unique transactionId
6. Thêm JavaRequestSampler và chọn tên class có trong file jar (đã tạo trong bước 3) từ dropdown. Truyền transactionId (tạo ở bước 5) làm param cho class file
7. Thêm một backend listener cho JavaRequest Sampler và chọn inplementation như GraphiteBackendListenerClient(JMeter > 2.9). Cấu hình các tha số và trỏ nó đến influxDB instance. Điều này giúp chúng ta có thể lưu các số liệu time series vào influxDB, lần lượt được xem trên Grafana dashboard
8. Để thực hiện kiểm thử load test trong thời gian cố định, trong thread group, chọn số lượng thread = 6, thời gian là 1200 giây và đếm vòng lặp forever
9. Thực hiện test và nó sẽ điền các thông báo trong hàng đợi SQS mong muốn, được subscribe vào SNS topic như được chỉ định trong class java
10. Mở cloudwatch và theo dõi queue, nếu microservice mà bạn đang kiểm tra hoạt động, nó sẽ xử lý tất cả các message đến.
11. Chúng ta có thể thấy kết quả realtime trong Grafana bằng cách tạo một dashboard lấy số liệu time series từ influxDb and CloudWatch
Thông qua JMeter, chúng ta tiếp tục gửi message đến SNS topic và những tin nhắn này được forward đến SQS queue. Một microservice lắng nghe theo queue mong muốn sẽ phân tích message đến và hoàn thành task. Một khi task hoàn thành, tin nhắn sẽ được xác nhận và xoá khỏi hàng đợi. NumberOfMessagesDeleted từ AWS Cloudwatch cung cấp cho chúng ta thông lượng của microservice

### V. Kiểm thử hiệu suất trực quan
Thêm Cloudwatch và influxDB làm nguồn dữ liệu cho Grafana instance. Kết quả JMeter được gửi tới influxDB thông qua Graphite listener và số liệu Cloudwatch từ AWS sau đó được xem trong Grafana dashboard bằng cách định cấu hình các bảng cần thiết. Số liệu như Number of threads được cấu hình từ influxDB và các số liệu khác như NumberOfMessagesSent, NumberOfMessagesDeleted, ApproximateNumberOfMessagesVisible, EC2 CPUUtilization, ECS CPUUtilization, and ECS MemoryUtilization từ Cloudwatch.

Cài đặt plugin Jolokia trên server và gửi số liệu JVM để hiểu hành vi hệ thống bao gồm các thông số sử dụng bộ nhớ heap, số lượng service thread trong quá trình kiểm thử hiệu năng. Tính năng bổ sung này giúp chúng ta có thể xem được hiệu suất thời gian thực của hệ thống thông qua Grafana dashboard. Lưu ý, AWS Cloudwatch gửi các số liệu tới Grafana dashboard 5 phút 1. Để gửi dữ liệu từng phút, chế độ detailed monitoring trong instance cần được kích hoạt.

![](https://images.viblo.asia/382738c1-2e2c-4a65-b022-1737a8b43c0e.png)
Grafana panel indicating number of JMeter Threads

![](https://images.viblo.asia/125bd365-3407-4472-9f7f-243cfacd275c.png)
Grafana panel indicating number of messages sent, deleted and visible in AWS SQS

![](https://images.viblo.asia/845462af-8c96-4492-ba3e-cb3d66d49916.png)
Grafana panels indicating total messages sent and service throughput

![](https://images.viblo.asia/00ed494f-f7f5-4466-b39e-c2eed9bdf668.png)
Grafana panels indicating CPU utilization and memory utilization

Việc kiểm thử hiệu năng cũng có thể được thực hiện trong Docker container và được tích hợp cho microservice CI/CD pipeline để tạo điều kiện cho các service có thể triển khai, kiểm thử và mở rộng một cách độc lập.

### VI. Kết luận

Kiến trúc microservice đang dần trở nên khá phổ biến trong việc phát triển ứng dụng hiện nay bởi tính dễ dàng mở rộng và bảo trì, phù hợp với những hệ thống lớn. Để có một ứng dụng tốt, hệ thống cần đảm bảo được cả về chức năng lẫn hiệu suất và tính bảo mật, điều này làm cho việc kiểm thử hiệu năng khá quan trọng trước khi tung sản phẩm ra production.
Mỗi service trong mô hình microservice cần được kiểm thử và xác thực hiệu suất một cách kỹ lưỡng để xác định độ ổn định và chịu tải của service đó cũng như của toàn bộ ứng dụng.

Tham khảo: https://medium.com/capital-one-tech/performance-testing-of-event-driven-microservices-f5de74305985