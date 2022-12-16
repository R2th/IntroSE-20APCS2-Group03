Trong một hệ thống thì log là một phần không thể thiếu, đặc biệt với môi trường production. Log ghi lại toàn bộ những hoạt động của hệ thống giúp chúng ta tìm kiếm, phân tích, điều tra lỗi và fix dễ dàng hơn. Với các hệ thống nhỏ thì việc quản lý log của chúng ta dễ dàng có thể log ra một file,... Nhưng với một hệ thống lớn và hệ thống microservices thì sẽ gặp vấn đề trong việc kích thước file log lớn và việc quản lý log sẽ rất khó khăn trong việc phân tích hay điều tra lỗi khi có rất nhiều file log trên các servers. Trong bài viết này mình giới thiệu với các bạn công cụ quản lý log là ELK stack

![image.png](https://images.viblo.asia/d452d37e-54f6-40da-ade8-650bc9b2585f.png)

# ELK là gì?
ELK là một từ viết tắt và tập hợp của 3 open source:
+ **E**lasticsearch: là công cụ phân tích và tìm kiếm
+ **L**ogstash: là một công cụ thu nhập dữ liệu từ nhiều nguồn đầu vào khác nhau, xử lý chúng và chuyển dữ liệu đến các đầu ra được hỗ trợ
+ **K**ibana:  chõ phép người dùng trực quan hóa dữ liệu bằng biểu đồ và đồ thị trong Elasticserach

ELK Stack được thiết kế để cho phép người dùng lấy dữ liệu từ bất kỳ nguồn nào, ở bất kỳ định dạng nào và để tìm kiếm, phân tích và trực quan hóa dữ liệu đó theo thời gian thực
# Kiến trúc ELK Stack
Các stack trong ELK Stack được kết hợp và sử dụng như thế nào cho việc quản lý log, phân tích. Chúng ta sẽ có 2 kiến trúc cho các hệ thống nhỏ và lớn

Các giải pháp cho việc quản lý log và phân tích sẽ có các chức năng chính:
- Aggregation: có khả năng thu thập và gửi logs từ nhiều nguồn dữ liệu
- Processing: có khả năng chuyển đổi log messages thành dữ liệu có ý nghĩa để dễ dàng phân tích
- Storage: có khả năng lưu trữ dữ liệu trong khoảng thời gian dài để cho phép theo dõi, phân tích xu hướng và các trường hợp bảo mật
- Analysis: có khả năng phân tích dữ liệu bằng cách truy vấn và tạo giao diện trực quan và dashboard trên nó

Các thành phần khác nhau trong ELK Stack được thiết kế để tương tác với nhau mà không cần cấu hình thêm quá nhiều
## Kiến trúc ELK Stack đơn giản
Với các hệ thống nhỏ, kiến trúc ELK stack đơn giản cũng đủ cho chúng ta:

![image.png](https://images.viblo.asia/e541d98b-d4a0-4f25-bd83-6aab43fec43f.png)

## Kiến trúc ELK Stack cho dữ liệu lớn
Khi chúng ta làm việc với một lượng lớn dữ liệu chúng ta cần thêm thành phần khác

![image.png](https://images.viblo.asia/5d28055a-c5bb-4c34-8852-5efa158040b0.png)

Trong kiến trúc này chúng ta sử dụng beats để thu thập dữ liệu và Apache Kafka (redis, RabbitMq) cho buffering. Với kiến trúc full-production sẽ có nhiều tính năng hơn, có nhiều Elashticsearch node, có thể có nhiều Logstash instances, một plugin cảnh báo, và một cơ chế lưu trữ

Trước khi mà chúng ta setup ELK stack thì nên hiểu hệ thống chúng ta cần kiến trúc nào. Nó sẽ ảnh hưởng đến việc nơi và cách chúng ta cài đặt stack, cấu hình Elasticserach cluster như thế nào, cách phân bổ tài nguyên,...

Qua các phần trên thì chúng ta đã biết cơ bản về ELK Stack, bây giờ chúng ta sẽ xem chi tiết các thành phần ELK (Elasticsearch, Logstash, Kibana và Beats)
# Elasticsearch là gì?
Elasticsearch là một search engine phổ biển nhất hiện nay. Với ELK Stack thì Elasticsearch là thành phần trung tâm của nó

Elasticsearch là một cơ sở dữ liệu NoSQL. Nó xây dựng dựa trên search engine Apache Lucene và HTTP RESTful API giúp chúng ta thực hiện tìm kiếm nhanh.  Elasticsearch được phát triển bằng java, hộ trỡ nhiều ngôn ngữ như PHP, Python,...

Elasticsearch cũng cho phép chúng ta lưu  trữ, tìm kiếm và phân tích khối lượng lớn dữ liệu. Nó chủ yếu được sử dụng để tìm kiếm. Ngoài ra nó còn cung cấp các phân tích phức tạp và nhiều tính năng nâng cao

**Tính năng:**
- search engine/ search server
- NoSQL database
- Dựa trên Apache Lucene và cung cấp RESTful API
- Cung cấp khả năng mở rộng theo chiều ngang, độ tin cậy và khả năng multitenant cho tìm kiếm real time
- Sử dụng indexing để tìm kiếm nhanh hơn

# Logstash là gì?
Chúng ta không thể phân tích logs trên log mà không có cấu trúc. Hay với dữ liệu logs không có cấu trúc chúng ta muốn phân tích chúng sẽ mất nhiều thời gian và nguồn lực. Logstash sẽ giúp chúng ta giải quyết vấn đề đó.

Logstash là công cụ tổng hợp và xử lý log bằng cách đọc dữ liệu từ một hoặc nhiều nguồn đến để storage hoặc stashing, khi sử dụng ELK Stack chúng ta sử dụng phân tích dữ liệu và chuyển qua cho Elasticsearch. 

**Tính năng:**
- Công cụ data pipeline
- Tập trung xử lý dữ liệu
- Thu thập, phân tích cú pháp và phân tích nhiều loại dữ liệu và sự kiện có cấu trúc/không có cấu trúc
- Cung cấp plugins để kết nối nhiều loại từ các nguồn đầu vào và platforms
# Kibana là gì?
Kibana là công cụ trực quan hóa dữ liệu (cung cấp giao diện) được lưu trong Elasticsearch. Kibana giúp chúng ta dễ dàng tìm kiếm, phân tích và trực quan hóa khối lượng dữ liệu lớn. Các tính năng của dashboard có các biểu đồ tương tác khác nhau và cho phép tùy chỉnh

**Tính năng:**
- Công cụ trực quan
- Cung cấp khả năng phân tích, lập biểu đồ, tóm tắt và debug realtime
- Cung cấp giao diện thân thiện với người dùng
- Cho phép chia sẻ snapshot của log được tìm kiếm
- Cho phép lưu trang dashboard và quản lý nhiều trang dashboard

# Kết luận
Trong bài viết này mình đã giới thiệu với các bạn về ELK Stack và các thành phần trong ELK Stack. Trong bài viết tiếp theo chúng ta cùng cài đặt các thành phần trong ELK và kết nối các thành phần này với nhau. Cảm ơn các bạn đã theo dõi bài viết <3