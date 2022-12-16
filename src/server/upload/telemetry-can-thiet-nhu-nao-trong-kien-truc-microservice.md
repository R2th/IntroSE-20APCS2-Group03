Ngày này, chúng ta đang triển khai mọi hệ thống lên nền tảng đám mây `Cloud`, chúng ta đang dần chuyển đổi những ứng dụng sử dụng kiến trúc `centralized architecture` với UI, database đóng gói trong 1 khối (monolith) thành các ứng dụng được phân tán, chia nhỏ từng thành phần độc lập trong kiến trúc Microservice. `Telemetry` là một thành phần quan trọng trong hệ thống sử dụng kiến trúc Microservice. 

**Telemetry** là tự động chẩn đoán, truyền tải dữ liệu từ `remote sources`, trong `DevOps` , **telemetry** như một bác sĩ cho hệ thống, nó chẩn đoán và đưa ra thông báo tới chúng ta. **Telemetry** đảm nhiệm các công việc:

- Monitoring
- Cảnh báo và thống kê dữ liệu
- Theo dõi các hệ thống phân tán
- Log tập trung

## Monitoring
Nhiệm vụ tiên quyết của **Telemetry** là phải nắm được thông tin về hệ thống khi nó đang hoạt động. Việc monitor kiến trúc microservices không hề dễ dàng, nó gồm rất nhiều `middleware servers`, `container cache`, nhiều `database cluster` không chung port. Chúng ta từng sử dụng cái plugin như `Nagios` và `Sensu` để giải quyết vấn đề này. Tuy nhiên ngày nay bạn phải thay đổi từ quá trình phát triển để các service có thể gắn **Telemetry** vào kiến trúc ứng dụng.

## Cảnh báo và thống kê dữ liệu
Cảnh báo thường được sử dụng dưới dạng các `Data model` được gọi là `Time Series`, các data model này thường sử dụng `OpenTSDB` hoặc `Apache Cassandra` làm nơi lưu trữ. Những database này được gọi là InfluxDB, chúng rất dễ sử dụng tuy nhiên chúng cũng mang lại khó khăn cho chúng ta trong quá trình mở rộng.

Thống kê dữ liệu không chỉ là một đồ thị đơn giản, việc thống kê sẽ hiển thị qua hàng tá đồ thị, một trong những lựa chọn tốt nhất cho chúng ta đó là `Grafana`. Chúng sẽ hiện thị tất cả những thông tin tập hợp vào trong một cửa sổ dashboard, từ những thông tin đó, bạn có thể sử dụng để tìm ra các issues, đánh giá performance của hệ thống và các incidents tiềm ẩn. Ngoài Grafana, một cách rất phổ biến nữa là sử dụng Toán cao cấp vào tiên đoán và hiển thị thông tin từ **Telemetry**, `Atlas` đang được sử dụng ở Netflix áp dụng giải pháp này. `Atlas` được build từ `Scala`, `Akka` và `Spray`.

> **Atlas** simplifies requirements capture, management, and tracking so teams can respond with agility to shifting business priorities and customer expectations. This software delivery and testing tool removes communication bottlenecks between business and development teams to speed up the delivery process in Agile development.

## Theo dõi các hệ thống phân tán
Việc theo dõi các hệ thống phân tán là xem xét toàn bộ các `immutable event` xảy ra trong hệ thống, thông qua theo dõi các Stream. Các giải pháp cho vấn đề này thường chung concept được gọi là `retention`. Thường thì nó sẽ lưu toàn bộ các `events` xảy ra trong hệ thống, phân loại và so sánh chúng với nhau. Trong kiến trúc microservice, ứng dụng monolithic truyền thống được chia nhỏ ra thành các thành phần có thể deploy độc lập. Một ứng dụng dần trở thành một nhóm các microservice, khi bạn có hàng trăm, hàng ngàn các microservice nhỏ cùng hoạt động, sẽ không dễ dàng cho bạn nắm được các service nào đang gọi đến nhau, một request đang đi từ services nào đến service nào.

Để giải quyết vấn đề này, một kỹ thuật được đưa ra là `Distributed Tracing`.` Distributed Tracing` là một phương thức để profile và monitor ứng dụng, đặc biệt là những ứng dụng sử dụng kiến trúc microservices. Nó giúp xác định chính xác service nào khi nó xảy ra lỗi và điều gì đang gây ảnh hưởng tới performance của ứng dụng. `Riemann` được xây dựng xoay quanh ý tưởng Stream. 

> **Riemann is an event stream processor.**
> 
> Every time something important happens in your system, submit an event to Riemann. Just handled an HTTP request? Send an event with the time it took. Caught an exception? Send an event with the stacktrace. Small daemons can watch your servers and send events about disk capacity, CPU use, and memory consumption. Every second. It's like top for hundreds of machines at once.
Riemann filters, combines, and acts on flows of events to understand your systems.

Tham khảo thêm:
[Reimann](http://riemann.io/concepts.html)
![](https://images.viblo.asia/9ef6bcb3-7a77-4504-b95b-537a7a7a8d1a.png)

Ngoài ra [Jaeger Tracing cũng là một giải pháp theo dõi các services trong một hệ thống Microservice.](https://viblo.asia/p/cai-dat-jaeger-tracing-de-theo-doi-cac-services-trong-mot-he-thong-microservice-4P856NA95Y3).
![](https://images.viblo.asia/caeca84d-c717-43b1-bfff-31e8ca7f11ae.png)


## Log tập trung 
Khi bạn triển khai các ứng dụng được đóng gói trong `Container`  như `Docker` hoặc `Virtualization`, bạn thường có rất nhiều servers và các `container` đó đòi hỏi nó luôn phi trạng thái (Stateless). Bạn không thể lưu lại logs trong File Storage như trước nữa, thay vào đó là các giải pháp lưu trữ logs tập trung như `ELK` hay `Graylog. `ELK stack` bao gồm `Elasticsearch, Logstash và Kibana, trong đó `Logstash` thu thập logs trong các ứng dụng của bạn đưa về lưu trữ trong `Elasticsearch` và `Kibana` sẽ trình diễn chúng trên một giao diện thân thiện với bạn hơn.
![](https://images.viblo.asia/becdea9c-be76-4328-971f-d8eccc83c940.jpeg)